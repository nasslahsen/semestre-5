/*
 * Page « Podcasts » (podcasts.html?m=<module>) : tous les podcasts d'un module sur une page, chapitre par chapitre,
 * pour les écouter sans ouvrir le cours (au téléphone aussi). Les podcasts viennent de module.js (podcasts[<chapitre>]).
 * La position d'écoute est la même que sur la page du chapitre (localStorage « s5-podcast ») ; à la fin d'un épisode,
 * le suivant démarre ; l'écran verrouillé montre le titre (Media Session).
 */
(function () {
  "use strict";
  var P = window.PLATEFORME, R = window.REGISTRE;
  var actifs = R.modules.filter(function (m) { return m.statut === "actif"; });
  var reste = actifs.length, CLEP = "s5-podcast", CLEM = "s5-podcast-module";
  document.getElementById("semestre").textContent = R.semestre;
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function lire(k, d) { try { return JSON.parse(localStorage.getItem(k) || "null") || d; } catch (e) { return d; } }
  function ecrire(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function norm(t) { return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }

  if (!reste) afficher();
  actifs.forEach(function (m) {
    var s = document.createElement("script");
    s.src = P.racine + "modules/" + m.id + "/module.js";
    s.onload = s.onerror = function () { if (--reste === 0) afficher(); };
    document.body.appendChild(s);
  });

  function afficher() {
    // modules qui ont au moins un podcast
    var avec = actifs.filter(function (m) { var M = P.module(m.id); return M && M.podcasts && Object.keys(M.podcasts).length; });
    var nav = document.getElementById("modules"), liste = document.getElementById("liste");
    if (!avec.length) { liste.innerHTML = '<p class="pc-vide">Aucun podcast pour l\'instant.</p>'; return; }
    var demande = new URLSearchParams(location.search).get("m"), dernier = lire(CLEM, "");
    var choisi = avec.filter(function (m) { return m.id === demande; })[0] || avec.filter(function (m) { return m.id === dernier; })[0] || avec[0];
    nav.innerHTML = avec.map(function (m) {
      return '<a href="podcasts.html?m=' + m.id + '" style="--c:' + m.couleur + '"' + (m.id === choisi.id ? ' aria-current="page"' : "") + ">" + esc(m.abrege || m.titre) + "</a>";
    }).join("");
    ecrire(CLEM, choisi.id);
    if (!demande) history.replaceState(null, "", "podcasts.html?m=" + choisi.id);
    montrer(choisi);
  }

  function montrer(reg) {
    var mid = reg.id, M = P.module(mid), pos = lire(CLEP, {});
    document.title = "Podcasts · " + reg.titre;
    document.documentElement.style.setProperty("--jeu", reg.couleur);
    document.documentElement.style.setProperty("--jeu-pale", reg.clair);
    document.documentElement.style.setProperty("--jeu-texte", reg.texte || reg.couleur);
    // épisodes dans l'ordre de la carte : sous-module après sous-module, chapitre après chapitre
    var eps = [], h = "";
    P.sousModules(mid).forEach(function (sm) {
      var chs = sm.chapitres.filter(function (c) { return M.podcasts[c.id]; });
      if (!chs.length) return;
      var nomSm = P.nomSm(mid, sm.id) || sm.titre;
      if (nomSm && P.sousModules(mid).filter(function (x) { return x.chapitres.some(function (c) { return M.podcasts[c.id]; }); }).length > 1) h += '<h2 class="pc-cours">' + esc(nomSm) + "</h2>";
      chs.forEach(function (c) {
        var pod = M.podcasts[c.id], k = eps.length, cle = mid + "/" + c.id;
        var nom = norm(pod.titre) === norm(c.titre) ? "" : pod.titre;
        var t = pos[cle] || 0;
        eps.push({ cle: cle, titre: c.titre, pod: pod, ch: c });
        h += '<article class="pc-ep" id="ep-' + c.id + '">' +
          '<div class="pc-tete"><span class="pc-num">' + esc(P.nomChapitre(mid, c.id)) + "</span>" +
          '<h3>' + esc(c.titre) + "</h3>" +
          '<p class="pc-info">' + [nom ? esc(nom) : "", pod.duree ? esc(pod.duree) : "", pod.langue === "en" ? "en anglais" : "", t > 30 ? "reprise à " + mmss(t) : ""].filter(Boolean).join(" · ") + "</p></div>" +
          '<audio controls preload="none" data-k="' + k + '" src="modules/' + mid + "/" + esc(pod.fichier) + '"></audio>' +
          '<a class="pc-lien" href="' + P.urlChapitre(mid, c.id).replace(P.racine, "") + '">Lire le chapitre</a>' +
          "</article>";
      });
    });
    document.getElementById("liste").innerHTML = '<h1>' + esc(reg.titre) + "</h1>" + h;
    var audios = [].slice.call(document.querySelectorAll(".pc-ep audio"));
    audios.forEach(function (a) {
      var e = eps[+a.dataset.k], dernier = 0;
      a.addEventListener("loadedmetadata", function () { var t = (lire(CLEP, {}))[e.cle]; if (t && t < a.duration - 15) a.currentTime = t; });
      a.addEventListener("play", function () {
        audios.forEach(function (b) { if (b !== a) b.pause(); });
        document.querySelectorAll(".pc-ep").forEach(function (x) { x.classList.remove("en-cours"); });
        a.closest(".pc-ep").classList.add("en-cours");
        if ("mediaSession" in navigator && window.MediaMetadata) {
          navigator.mediaSession.metadata = new MediaMetadata({ title: e.titre, artist: P.nomChapitre(mid, e.ch.id) + " · " + reg.titre, album: "Semestre 5",
            artwork: [{ src: P.racine + "commun/icone.png", sizes: "180x180", type: "image/png" }] });
          navigator.mediaSession.setActionHandler("nexttrack", audios[+a.dataset.k + 1] ? function () { suivant(a); } : null);
          navigator.mediaSession.setActionHandler("previoustrack", audios[+a.dataset.k - 1] ? function () { a.pause(); audios[+a.dataset.k - 1].play(); } : null);
        }
      });
      a.addEventListener("timeupdate", function () {
        if (Math.abs(a.currentTime - dernier) < 5) return;
        dernier = a.currentTime;
        var p = lire(CLEP, {}); p[e.cle] = a.ended ? 0 : Math.floor(a.currentTime); ecrire(CLEP, p);
      });
      a.addEventListener("ended", function () { var p = lire(CLEP, {}); p[e.cle] = 0; ecrire(CLEP, p); suivant(a); });
    });
    function suivant(a) {
      var b = audios[+a.dataset.k + 1];
      if (!b) return;
      a.pause(); b.currentTime = 0; b.play();
      b.closest(".pc-ep").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  function mmss(s) { s = Math.floor(s); return Math.floor(s / 60) + " min " + ("0" + s % 60).slice(-2); }
})();
