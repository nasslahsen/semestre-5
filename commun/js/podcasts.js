/*
 * Page « Podcasts » d'un module (modules/<id>/podcasts.html) : tous les podcasts du module sur une page, chapitre par
 * chapitre, cours après cours, pour les écouter sans ouvrir le cours (au téléphone aussi). Ouverte depuis le choix
 * « Cours / TD / Préparer l'examen / Podcasts » de la carte. Les podcasts viennent de module.js (podcasts[<chapitre>]).
 * La position d'écoute est la même que sur la page du chapitre (localStorage « s5-podcast ») ; un seul épisode joue à
 * la fois ; à la fin d'un épisode, le suivant démarre ; l'écran verrouillé montre le titre (Media Session).
 */
(function () {
  "use strict";
  var P = window.PLATEFORME, mid = P.courant, M = P.module(mid), CLEP = "s5-podcast";
  var demande = new URLSearchParams(location.search).get("sm");
  P.barre(document.getElementById("barre"), { carte: P.urlPlan(mid, demande || undefined) });
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function lire() { try { return JSON.parse(localStorage.getItem(CLEP) || "{}") || {}; } catch (e) { return {}; } }
  function ecrire(v) { try { localStorage.setItem(CLEP, JSON.stringify(v)); } catch (e) {} }
  function norm(t) { return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function mmss(s) { s = Math.floor(s); return Math.floor(s / 60) + " min " + ("0" + s % 60).slice(-2); }

  var pods = (M && M.podcasts) || {}, liste = document.getElementById("liste"), pos = lire();
  // cours (sous-modules) qui ont au moins un podcast, dans l'ordre de la carte
  var sms = P.sousModules(mid).map(function (sm) { return { sm: sm, chs: sm.chapitres.filter(function (c) { return pods[c.id]; }) }; })
    .filter(function (x) { return x.chs.length; });
  if (!sms.length) { liste.innerHTML = '<p class="pc-vide">Pas encore de podcast pour ce module.</p>'; return; }

  var eps = [], h = "";
  sms.forEach(function (x) {
    var nomSm = P.nomSm(mid, x.sm.id) || x.sm.titre;
    if (nomSm && sms.length > 1) h += '<h2 class="pc-cours" id="cours-' + esc(x.sm.id) + '">' + esc(nomSm) + "</h2>";
    x.chs.forEach(function (c) {
      var pod = pods[c.id], k = eps.length, cle = mid + "/" + c.id, t = pos[cle] || 0;
      var nom = norm(pod.titre) === norm(c.titre) ? "" : pod.titre;
      eps.push({ cle: cle, ch: c });
      h += '<article class="pc-ep" id="ep-' + c.id + '">' +
        '<span class="pc-num">' + esc(P.nomChapitre(mid, c.id)) + "</span>" +
        "<h3>" + esc(c.titre) + "</h3>" +
        '<p class="pc-info">' + [nom ? esc(nom) : "", pod.duree ? esc(pod.duree) : "", pod.langue === "en" && P.lang !== "en" ? "en anglais" : "", t > 30 ? "reprise à " + mmss(t) : ""].filter(Boolean).join(" · ") + "</p>" +
        '<audio controls preload="none" data-k="' + k + '" src="' + esc(pod.fichier) + '"></audio>' +
        '<a class="pc-lien" href="chapitres/chapitre-' + c.id + '.html">Lire le chapitre</a>' +
        "</article>";
    });
  });
  liste.innerHTML = h;
  // venu d'un cours précis (podcasts.html?sm=…) : on commence par ses épisodes
  if (demande && sms.length > 1) { var cible = document.getElementById("cours-" + demande); if (cible) cible.scrollIntoView(); }

  var audios = [].slice.call(liste.querySelectorAll("audio"));
  audios.forEach(function (a) {
    var e = eps[+a.dataset.k], dernier = 0;
    a.addEventListener("loadedmetadata", function () { var t = lire()[e.cle]; if (t && t < a.duration - 15) a.currentTime = t; });
    a.addEventListener("play", function () {
      audios.forEach(function (b) { if (b !== a) b.pause(); });
      [].forEach.call(liste.querySelectorAll(".pc-ep"), function (x) { x.classList.remove("en-cours"); });
      a.closest(".pc-ep").classList.add("en-cours");
      if ("mediaSession" in navigator && window.MediaMetadata) {
        navigator.mediaSession.metadata = new MediaMetadata({ title: e.ch.titre, artist: P.nomChapitre(mid, e.ch.id) + " · " + M.titre, album: "Semestre 5",
          artwork: [{ src: P.racine + "commun/icone.png", sizes: "180x180", type: "image/png" }] });
        navigator.mediaSession.setActionHandler("nexttrack", audios[+a.dataset.k + 1] ? function () { suivant(a); } : null);
        navigator.mediaSession.setActionHandler("previoustrack", audios[+a.dataset.k - 1] ? function () { a.pause(); audios[+a.dataset.k - 1].play(); } : null);
      }
    });
    a.addEventListener("timeupdate", function () {
      if (Math.abs(a.currentTime - dernier) < 5) return;
      dernier = a.currentTime;
      var p = lire(); p[e.cle] = a.ended ? 0 : Math.floor(a.currentTime); ecrire(p);
    });
    a.addEventListener("ended", function () { var p = lire(); p[e.cle] = 0; ecrire(p); suivant(a); });
  });
  function suivant(a) {
    var b = audios[+a.dataset.k + 1];
    if (!b) return;
    a.pause(); b.currentTime = 0; b.play();
    b.closest(".pc-ep").scrollIntoView({ behavior: "smooth", block: "center" });
  }
})();
