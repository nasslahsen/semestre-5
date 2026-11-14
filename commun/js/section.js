/*
 * Un chapitre sur une seule grande page qui défile (modules/<id>/chapitres/chapitre-<n>.html,
 * générée par outils/regrouper.js). Pas de bouton entre les sections : on lit d'un trait.
 * À la fin de chaque section, un seul bloc « Jouer » en option : il enchaîne les exercices de la section, par-dessus la page,
 * qui reste à sa place ; sinon on continue de défiler. En fin de chapitre : un bloc pour la révision puis le défi final,
 * puis « Chapitre suivant ».
 * La barre montre la section où l'on est (« 2 / 4 ») ; une section est lue quand on passe sa fin ;
 * « Reprendre » rouvre la page à la section où l'on s'est arrêté.
 * Ancres : s-<section>, n-<notion>, et <notion>-<titre> (même calcul que les anciennes pages, notion par notion),
 * pour que « Revoir dans le cours » vise le même passage. Ouverte dans le jeu (?dans=1) : ni barre ni bas de page.
 */
(function () {
  "use strict";
  var P = window.PLATEFORME, MID = P.courant, MOD = P.module(MID);
  var main = document.querySelector("main"), chid = +main.getAttribute("data-chapitre");
  var integre = /[?&]dans=1/.test(location.search) || window.self !== window.top;
  var ch = P.chapitre(MID, chid);
  var parties = [].slice.call(main.querySelectorAll("section.partie"));
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  if (integre) document.documentElement.classList.add("integre");
  P.reglerLangue(MID, ch.sm); // le cours d'anglais : toute la page en anglais
  document.title = ch.titre + " · " + (P.lang === "en" && P.module(MID).titreEn ? P.module(MID).titreEn : MOD.titre);

  var rang = null;
  if (!integre) {
    var barre = document.createElement("header");
    P.barre(barre, { carte: P.urlPlan(MID, ch.sm, ch.espace === "cours" ? "" : ch.espace), droite: '<span class="rang-barre" aria-live="polite"></span>' });
    document.body.insertBefore(barre, document.body.firstChild);
    rang = barre.querySelector(".rang-barre");
  }
  var etiquette = document.querySelector("[data-etiquette]");
  if (etiquette) etiquette.textContent = P.nomChapitre(MID, ch.id);

  // Podcast du chapitre (module.js, podcasts[<id>]) : un lecteur discret sous le titre, qui reprend où l'on s'était arrêté
  var pod = MOD.podcasts && MOD.podcasts[ch.id], titre1 = main.querySelector("h1");
  if (pod && titre1) {
    var bp = document.createElement("div");
    bp.className = "podcast";
    bp.innerHTML = '<p><small>' + P.t("Écouter le podcast du chapitre") + "</small>" + esc(pod.titre) +
      (pod.duree ? " · " + esc(pod.duree) : "") + (pod.langue === "en" && P.lang !== "en" ? " · en anglais" : "") + "</p>" +
      '<audio controls preload="metadata" src="../' + esc(pod.fichier) + '"></audio>';
    titre1.parentNode.insertBefore(bp, titre1.nextSibling);
    var audio = bp.querySelector("audio"), CLEP = "s5-podcast", cleP = MID + "/" + ch.id, posP = {};
    try { posP = JSON.parse(localStorage.getItem(CLEP) || "{}") || {}; } catch (e) { posP = {}; }
    audio.addEventListener("loadedmetadata", function () { var t = posP[cleP]; if (t && t < audio.duration - 15) audio.currentTime = t; });
    var dernier = 0;
    audio.addEventListener("timeupdate", function () {
      if (Math.abs(audio.currentTime - dernier) < 5) return;
      dernier = audio.currentTime; posP[cleP] = audio.ended ? 0 : Math.floor(audio.currentTime);
      try { localStorage.setItem(CLEP, JSON.stringify(posP)); } catch (e) {}
    });
  }

  // Ancres : celles des anciennes pages, préfixées par la notion (h4 = ancien h2, h5 = ancien h3)
  [].forEach.call(main.querySelectorAll("article.notion"), function (art) {
    var nid = art.id.replace(/^n-/, ""), vus = {};
    [].forEach.call(art.querySelectorAll("h4, h5"), function (t) {
      var a = P.ancre(t.textContent);
      vus[a] = (vus[a] || 0) + 1;
      t.id = nid + "-" + (vus[a] > 1 ? a + "-" + vus[a] : a);
    });
    // Formules clés : regroupées dans une carte, comme sur les anciennes pages
    [].forEach.call(art.querySelectorAll("h4"), function (t) {
      if (t.textContent.trim() !== "Formules clés") return;
      var carte = document.createElement("div"), n = t.nextSibling;
      carte.className = "cles-carte";
      while (n && !/^(H3|H4|NAV|SCRIPT)$/.test(n.nodeName)) { var suivant = n.nextSibling; carte.appendChild(n); n = suivant; }
      t.parentNode.insertBefore(carte, t.nextSibling);
    });
  });

  P.boutonsCopier(main);

  // Labs : chaque étape (<div class="etape-lab">) se coche quand on l'a faite ; une partie est faite quand toutes ses étapes le sont.
  if (ch.espace === "lab" && !integre) {
    parties.forEach(function (partie, k) {
      var sid = ch.sections[k].id, etapes = [].slice.call(partie.querySelectorAll(".etape-lab"));
      P.cocherLab(MID, sid, null, false, etapes.length);
      etapes.forEach(function (et, i) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "coche-lab";
        function maj() {
          var oui = !!P.etapesLab(MID, sid).coches[i];
          b.setAttribute("aria-pressed", oui ? "true" : "false");
          b.innerHTML = P.t(oui ? "Étape faite" : "J'ai fait cette étape");
          et.classList.toggle("faite", oui);
        }
        b.addEventListener("click", function () { P.cocherLab(MID, sid, i, !P.etapesLab(MID, sid).coches[i]); maj(); });
        et.appendChild(b); maj();
      });
    });
  }

  if (!integre) {
    // Section en cours de lecture : celle dont le titre est passé sous la barre en dernier
    var courante = null, attente = null;
    function suivre() {
      var haut = 140, c = parties[0];
      parties.forEach(function (p) { if (p.getBoundingClientRect().top < haut) c = p; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) c = parties[parties.length - 1];
      if (c === courante) return;
      courante = c;
      var k = parties.indexOf(c), s = ch.sections[k];
      rang.textContent = (k + 1) + " / " + parties.length;
      clearTimeout(attente);
      attente = setTimeout(function () {
        P.noterPlan(MID, ch.sm, s.titre === ch.titre ? ch.titre : ch.titre + " · " + s.titre, P.urlSection(MID, s.id).replace(P.racine, ""));
      }, 800);
    }
    addEventListener("scroll", suivre, { passive: true });
    addEventListener("load", suivre);
    suivre();

    // Section lue : quand sa fin apparaît à l'écran
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { P.marquerSection(MID, e.target.getAttribute("data-section")); obs.unobserve(e.target); } });
      });
      [].forEach.call(main.querySelectorAll(".fin-partie"), function (f) { obs.observe(f); });
    }

    // Exercices facultatifs : un seul bloc « Jouer » à la fin de chaque section, qui enchaîne les exercices de ses notions ;
    // en fin de chapitre, un bloc pour la révision puis le défi final. Les exercices sans page de cours (TD) vont avec la dernière section.
    var parId = {};
    ch.niveaux.forEach(function (n) { parId[n.id] = n; });
    function bloc(ids, petit, titre, ou, avant, defi) {
      var b = document.createElement("div");
      b.className = "jouer" + (defi ? " defi" : "");
      b.dataset.niveaux = ids.join(" ");
      b.innerHTML = '<span><small>' + petit + "</small>" + esc(titre) + "</span>" + '<button type="button" class="btn-jouer"></button>';
      b.querySelector("button").addEventListener("click", function () {
        var fait = P.chapitre(MID, ch.id).niveaux.filter(function (n) { return n.fait; }).map(function (n) { return n.id; });
        var k = ids.filter(function (id) { return fait.indexOf(id) < 0; })[0];
        ouvrir(ids, k ? ids.indexOf(k) : 0);
      });
      ou.insertBefore(b, avant || null);
      return b;
    }
    var notions = [].map.call(main.querySelectorAll("article.notion"), function (art) { return art.id.replace(/^n-/, ""); });
    var sansPage = ch.niveaux.filter(function (n) { return !n.revision && !n.boss && notions.indexOf(n.id) < 0; }).map(function (n) { return n.id; });
    // les exercices sans page vont avec la dernière section, avant un éventuel corrigé (section <id>-corrige, toujours en dernier)
    var avecSansPage = parties.length - 1;
    while (avecSansPage > 0 && /-corrige$/.test(ch.sections[avecSansPage].id)) avecSansPage--;
    parties.forEach(function (partie, k) {
      var s = ch.sections[k], ids = s.notions.filter(function (nid) { return parId[nid]; });
      if (k === avecSansPage) ids = ids.concat(sansPage);
      var fin = partie.querySelector(".fin-partie");
      if (ids.length) bloc(ids, P.t("Exercices"), s.titre, fin ? fin.parentNode : partie, fin);
      var cs = cartesDe(s.id);
      if (cs.length) cartesRevision(fin ? fin.parentNode : partie, fin, cs, "s/" + s.id, s.titre);
    });
    var fin = document.createElement("section");
    fin.className = "fin-chapitre";
    fin.innerHTML = "<h2>" + P.t("Fin du chapitre") + "</h2><p>" + P.t("Pour tout mélanger, si tu en as envie : la révision, puis le défi final.") + "</p>";
    var finIds = ch.niveaux.filter(function (n) { return n.revision; }).concat(ch.niveaux.filter(function (n) { return n.boss; })).map(function (n) { return n.id; });
    if (finIds.length) bloc(finIds, P.t("Fin du chapitre"), P.t("Révision et défi final"), fin, null, true);
    var toutes = ch.sections.reduce(function (t, x) { return t.concat(cartesDe(x.id)); }, []);
    if (!toutes.length && MOD.cartesFinChapitre && MOD.arbre && MOD.arbre[ch.sm]) {
      var ca = MOD.arbre[ch.sm].chapitres.filter(function (x) { return x.id === ch.id; })[0];
      toutes = ca && ca.cartes || [];
    }
    if (toutes.length && (MOD.cartesFinChapitre || MOD.cartesSections)) cartesRevision(fin, null, toutes, "c/" + ch.id, P.t("Toutes les cartes du chapitre"));
    // la suite reste dans le même espace : le chapitre de cours suivant, le TD suivant ou le lab suivant
    var NOMS = { cours: ["Chapitre suivant", "Dernier chapitre", "Retour à la carte"], td: ["TD suivant", "Dernier TD", "Retour aux TD"], lab: ["Lab suivant", "Dernier lab", "Retour aux labs"] }[ch.espace].map(function (x) { return P.t(x); });
    var sms = P.chapitresDe(MID, ch.sm, ch.espace), suiv = sms[sms.map(function (c) { return c.id; }).indexOf(ch.id) + 1];
    var bas = document.createElement("nav");
    bas.className = "fin-cours";
    bas.setAttribute("aria-label", P.t("Suite"));
    bas.innerHTML = suiv && suiv.sections.length
      ? '<a class="aller" href="' + P.urlChapitre(MID, suiv.id) + '"><small>' + NOMS[0] + "</small>" + esc(suiv.titre) + "</a>"
      : '<a class="aller" href="' + P.urlPlan(MID, ch.sm, ch.espace === "cours" ? "" : ch.espace) + '"><small>' + NOMS[1] + "</small>" + NOMS[2] + "</a>";
    fin.appendChild(bas);
    main.appendChild(fin);
    function majBlocs() {
      var c = P.chapitre(MID, ch.id), fait = {};
      c.niveaux.forEach(function (n) { fait[n.id] = n.fait; });
      [].forEach.call(document.querySelectorAll(".jouer"), function (b) {
        var tous = b.dataset.niveaux.split(" ").every(function (id) { return fait[id]; });
        b.classList.toggle("fait", tous);
        b.querySelector("button").textContent = P.t(tous ? "Rejouer" : "Jouer");
      });
    }
    majBlocs();

    // Cartes de révision (questions de cours, rappel actif) : un paquet à la fin de chaque section (module.js, cartesSections[<section>],
    // [question, réponse]) et, en fin de chapitre, toutes les cartes du chapitre (à défaut, celles de l'arbre si cartesFinChapitre: true).
    // Une carte à deux faces ; « Je ne savais pas » la remet au bout du paquet ; les ratées passent en premier la fois suivante
    // (localStorage « s5-cartes », par question).
    function cartesDe(sid) { return MOD.cartesSections && MOD.cartesSections[sid] || []; }
    function cartesRevision(ou, avant, cartes, cleDeck, titre) {
      var CLE = "s5-cartes", memo = {};
      try { memo = JSON.parse(localStorage.getItem(CLE) || "{}") || {}; } catch (e) { memo = {}; }
      var cle = MID + "/" + cleDeck;
      function ratees() { var q = memo[cle] || []; return cartes.map(function (x, i) { return i; }).filter(function (i) { return q.indexOf(cartes[i][0]) >= 0; }); }
      function garder(liste) { memo[cle] = liste.map(function (i) { return cartes[i][0]; }); try { localStorage.setItem(CLE, JSON.stringify(memo)); } catch (e) {} }
      var b = document.createElement("div");
      b.className = "jouer-cartes";
      b.innerHTML = "<span><small>" + P.t("Cartes de révision") + " · " + cartes.length + "</small>" + esc(titre) + "</span>" +
        '<button type="button" class="btn-jouer">' + P.t("Réviser") + "</button>";
      ou.insertBefore(b, avant || null);
      var fond = null, file = [], ratesCetteFois = {}, vus = 0, total = 0;
      function rendre(html) { var z = fond.querySelector(".carte-zone"); z.innerHTML = html; if (window.renderMathInElement) renderMathInElement(z, { delimiters: [{ left: "\\(", right: "\\)", display: false }], throwOnError: false }); return z; }
      function suivante() {
        if (!file.length) {
          var r = Object.keys(ratesCetteFois).map(Number);
          garder(r);
          var z = rendre("<p class=\"carte-petit\">" + P.t("Fini") + "</p><p class=\"carte-q\">" + P.t("Tu en savais") + " " + (total - r.length) + " " + P.t("sur") + " " + total + " " + P.t("du premier coup.") + "</p>" +
            '<div class="carte-actions">' + (r.length ? '<button type="button" class="carte-btn second" data-a="ratees">' + P.t("Refaire les ratées") + " (" + r.length + ")</button>" : "") +
            '<button type="button" class="carte-btn" data-a="fermer">' + P.t("Revenir au cours") + "</button></div>");
          z.querySelector('[data-a="fermer"]').onclick = fermerCartes;
          var bR = z.querySelector('[data-a="ratees"]'); if (bR) bR.onclick = function () { lancer(r); };
          return;
        }
        // une carte à deux faces : la question devant ; toucher la carte la retourne (la réponse au dos), puis on dit si on savait
        var i = file[0], q = cartes[i];
        var z = rendre('<p class="carte-petit">' + (vus + 1) + " / " + total + "</p>" +
          '<button type="button" class="carte-flip" aria-label="' + P.t("Retourner la carte") + '">' +
          '<span class="carte-face avant"><span class="carte-q">' + esc(q[0]) + '</span><span class="carte-indice">' + P.t("Touche la carte pour la retourner") + "</span></span>" +
          '<span class="carte-face dos"><span class="carte-r">' + esc(q[1]) + "</span></span></button>" +
          '<div class="carte-actions" hidden><button type="button" class="carte-btn non" data-a="non">' + P.t("Je ne savais pas") + '</button><button type="button" class="carte-btn oui" data-a="oui">' + P.t("Je savais") + "</button></div>");
        var flip = z.querySelector(".carte-flip"), act = z.querySelector(".carte-actions");
        flip.onclick = function () {
          var dos = flip.classList.toggle("retournee");
          if (dos) act.hidden = false;
        };
        act.querySelector('[data-a="oui"]').onclick = function () { file.shift(); vus = Math.min(vus + 1, total); suivante(); };
        act.querySelector('[data-a="non"]').onclick = function () { file.push(file.shift()); ratesCetteFois[i] = true; suivante(); };
      }
      function lancer(ordre) {
        if (!fond) {
          fond = document.createElement("div");
          fond.className = "fenetre-cartes";
          fond.innerHTML = '<div class="carte-boite" role="dialog" aria-label="' + P.t("Cartes de révision") + '"><button type="button" class="carte-fermer">' + P.t("Fermer") + '</button><div class="carte-zone"></div></div>';
          fond.querySelector(".carte-fermer").onclick = fermerCartes;
          document.body.appendChild(fond);
        }
        file = ordre.slice(); ratesCetteFois = {}; vus = 0; total = file.length;
        fond.classList.add("on");
        document.documentElement.classList.add("jeu-ouvert");
        suivante();
      }
      function fermerCartes() { fond.classList.remove("on"); document.documentElement.classList.remove("jeu-ouvert"); }
      function toutes() {
        var r = ratees(), reste = cartes.map(function (x, i) { return i; }).filter(function (i) { return r.indexOf(i) < 0; });
        lancer(r.concat(reste));
      }
      b.querySelector("button").addEventListener("click", toutes);
      // depuis « Mon suivi » : la page s'ouvre avec ?cartes=<paquet> et ce paquet démarre aussitôt (les ratées seulement s'il y en a)
      if (new URLSearchParams(location.search).get("cartes") === cleDeck) setTimeout(function () { var r = ratees(); if (r.length) lancer(r); else toutes(); }, 300);
    }

    // L'exercice s'ouvre par-dessus la page ; « Revenir au cours » le ferme et la page n'a pas bougé
    var fenetre = null;
    function ouvrir(ids, k) {
      if (!fenetre) {
        fenetre = document.createElement("div");
        fenetre.className = "fenetre-jeu";
        fenetre.innerHTML = '<iframe title="' + P.t("Exercices") + '"></iframe>';
        document.body.appendChild(fenetre);
      }
      fenetre.querySelector("iframe").src = P.urlExercice(MID, ids[k], ids.slice(k + 1));
      fenetre.classList.add("on");
      document.documentElement.classList.add("jeu-ouvert");
    }
    function fermer() {
      if (!fenetre) return;
      fenetre.classList.remove("on");
      document.documentElement.classList.remove("jeu-ouvert");
      fenetre.querySelector("iframe").src = "about:blank";
      majBlocs();
    }
    addEventListener("message", function (e) { if (e.data && e.data.s5 === "fermer-exercice") fermer(); });
  }

  // Passage demandé (#ancre ou #ancre~k pour le k-ième bloc) : défilement ; surlignage sauf pour une section entière.
  function viser() {
    var h = decodeURIComponent((location.hash || "").slice(1));
    if (!h) return;
    var parts = h.split("~"), t = document.getElementById(parts[0]);
    if (!t) return;
    document.querySelectorAll(".repere").forEach(function (x) { x.classList.remove("repere"); });
    if (t.tagName === "SECTION") { t.scrollIntoView({ block: "start" }); return; }
    if (t.tagName === "ARTICLE") t = t.querySelector("h3");
    // les blocs d'un titre : jusqu'au titre suivant de même niveau ou plus haut, dans la notion (comme sur les anciennes pages)
    var seuil = t.tagName === "H5" ? /^(H3|H4|H5)$/ : t.tagName === "H4" ? /^(H3|H4)$/ : /^H3$/;
    var cibles = [t], n = t.nextElementSibling, bloc = parts[1] !== undefined ? +parts[1] : -1, blocs = [];
    while (n && !seuil.test(n.tagName)) { blocs.push(n); n = n.nextElementSibling; }
    var k = bloc >= 0 && blocs[bloc];
    cibles = k ? [blocs[bloc]] : cibles.concat(blocs);
    cibles.forEach(function (x) { x.classList.add("repere"); });
    if (k) cibles[0].scrollIntoView({ block: "center" }); else t.scrollIntoView({ block: "start" });
  }
  window.addEventListener("load", function () { setTimeout(viser, 60); });
  window.addEventListener("hashchange", viser);
})();
