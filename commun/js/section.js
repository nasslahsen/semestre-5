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
  document.title = ch.titre + " · " + MOD.titre;

  var rang = null;
  if (!integre) {
    var barre = document.createElement("header");
    P.barre(barre, { carte: P.urlPlan(MID, ch.sm, ch.td ? "td" : ""), droite: '<span class="rang-barre" aria-live="polite"></span>' });
    document.body.insertBefore(barre, document.body.firstChild);
    rang = barre.querySelector(".rang-barre");
  }
  var etiquette = document.querySelector("[data-etiquette]");
  if (etiquette) etiquette.textContent = P.nomChapitre(MID, ch.id);

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
    parties.forEach(function (partie, k) {
      var s = ch.sections[k], ids = s.notions.filter(function (nid) { return parId[nid]; });
      if (k === parties.length - 1) ids = ids.concat(sansPage);
      var fin = partie.querySelector(".fin-partie");
      if (ids.length) bloc(ids, "Exercices", s.titre, fin ? fin.parentNode : partie, fin);
    });
    var fin = document.createElement("section");
    fin.className = "fin-chapitre";
    fin.innerHTML = "<h2>Fin du chapitre</h2><p>Pour tout mélanger, si tu en as envie : la révision, puis le défi final.</p>";
    var finIds = ch.niveaux.filter(function (n) { return n.revision; }).concat(ch.niveaux.filter(function (n) { return n.boss; })).map(function (n) { return n.id; });
    if (finIds.length) bloc(finIds, "Fin du chapitre", "Révision et défi final", fin, null, true);
    // la suite reste dans le même espace : le chapitre de cours suivant, ou le TD suivant
    var sms = P.chapitresDe(MID, ch.sm, ch.td ? "td" : "cours"), suiv = sms[sms.map(function (c) { return c.id; }).indexOf(ch.id) + 1];
    var bas = document.createElement("nav");
    bas.className = "fin-cours";
    bas.setAttribute("aria-label", "Suite");
    bas.innerHTML = suiv && suiv.sections.length
      ? '<a class="aller" href="' + P.urlChapitre(MID, suiv.id) + '"><small>' + (ch.td ? "TD suivant" : "Chapitre suivant") + "</small>" + esc(suiv.titre) + "</a>"
      : '<a class="aller" href="' + P.urlPlan(MID, ch.sm, ch.td ? "td" : "") + '"><small>' + (ch.td ? "Dernier TD" : "Dernier chapitre") + "</small>" + (ch.td ? "Retour aux TD" : "Retour à la carte") + "</a>";
    fin.appendChild(bas);
    main.appendChild(fin);
    function majBlocs() {
      var c = P.chapitre(MID, ch.id), fait = {};
      c.niveaux.forEach(function (n) { fait[n.id] = n.fait; });
      [].forEach.call(document.querySelectorAll(".jouer"), function (b) {
        var tous = b.dataset.niveaux.split(" ").every(function (id) { return fait[id]; });
        b.classList.toggle("fait", tous);
        b.querySelector("button").textContent = tous ? "Rejouer" : "Jouer";
      });
    }
    majBlocs();

    // L'exercice s'ouvre par-dessus la page ; « Revenir au cours » le ferme et la page n'a pas bougé
    var fenetre = null;
    function ouvrir(ids, k) {
      if (!fenetre) {
        fenetre = document.createElement("div");
        fenetre.className = "fenetre-jeu";
        fenetre.innerHTML = '<iframe title="Exercices"></iframe>';
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
