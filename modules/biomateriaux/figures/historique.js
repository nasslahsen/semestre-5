(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Frise des biomatériaux ---------- */
  (function () {
    var f = R.figure("fig-frise", {
      largeur: 960, hauteur: 440, titre: "Frise des biomatériaux, des Égyptiens aux années 70",
      essai: "<strong>Essaie</strong> : avance d'époque en époque, ou touche un point de la frise. <strong>Observe</strong> : le matériau qui entre en médecine, et d'où il vient."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var EV = [
      { q: "Égyptiens", x: 80, m: "fer, cuivre, plomb, bois, plâtre", d: "On remplace l'ensemble ou une partie d'organes défaillants par des substituts." },
      { q: "jusqu'en 1950", x: 210, m: "or, argent, cuivre", d: "Chirurgie dentaire et orthopédique." },
      { q: "la guerre", x: 340, m: "PMMA", d: "Le PMMA des cockpits d'avions anglais donne les lentilles intraoculaires." },
      { q: "années 50", x: 470, m: "acier inoxydable", d: "Premier matériau utilisé avec succès dans les prothèses de hanche." },
      { q: "après 1950", x: 600, m: "polyesters", d: "Prothèses vasculaires." },
      { q: "1969", x: 730, m: "titane", d: "Découvert en médecine par Brånemark et coll. ; déjà utilisé en aéronautique (faible densité, bonne résistance)." },
      { q: "années 70", x: 860, m: "alliages de titane", d: "Études de toxicité des plastiques et des métaux : les alliages de titane sont les grands gagnants. Problème : une intégration imparfaite au corps." }
    ];
    var k = 0, nav;
    function dessin(i) {
      k = i; R.vider(g);
      R.fleche(g, [40, 230], [930, 230], { couleur: C.fonce, epaisseur: 4 });
      T(g, "temps", [900, 262], { taille: 17, couleur: C.doux });
      EV.forEach(function (e, j) {
        var sel = j === k, b = R.el("g", { style: "cursor:pointer" }, g), haut = j % 2 === 0;
        R.el("circle", { cx: e.x, cy: 230, r: sel ? 20 : 14, fill: sel ? C.acc : "#fff", stroke: sel ? C.acc : C.fonce, "stroke-width": 4 }, b);
        R.el("rect", { x: e.x - 50, y: 180, width: 100, height: 100, fill: "transparent" }, b);
        T(b, e.q, [e.x, haut ? 172 : 292], { taille: 17, gras: sel, couleur: sel ? C.fonce : C.doux });
        b.addEventListener("click", function () { nav.aller(j); });
      });
      var e = EV[k];
      R.el("rect", { x: 120, y: 330, width: 720, height: 80, rx: 18, fill: PLATEFORME.teinte(0.12), stroke: C.acc, "stroke-width": 3 }, g);
      T(g, e.m, [480, 370], { taille: 26, gras: true });
      T(g, "ce qui entre en médecine", [480, 60], { taille: 18, couleur: C.doux });
      T(g, e.q.charAt(0).toUpperCase() + e.q.slice(1), [480, 100], { taille: 24, gras: true, couleur: C.acc });
      zone.innerHTML = "<strong>" + e.q.charAt(0).toUpperCase() + e.q.slice(1) + "</strong> : " + e.d;
    }
    nav = R.etapes(f.reglages, EV.length - 1, EV.map(function (e) { return e.q; }), dessin);
    nav.aller(0);
  })();

  /* ---------- Bio-inerte ou bioactif ---------- */
  (function () {
    var f = R.figure("fig-role", {
      largeur: 960, hauteur: 460, titre: "Une tige de hanche avec ou sans revêtement d'hydroxyapatite (allure)",
      essai: "<strong>Essaie</strong> : fais avancer le temps après l'implantation, avec puis sans revêtement. <strong>Observe</strong> : avec l'hydroxyapatite, l'os vient se lier à la surface de l'implant. Allure qualitative."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cT = R.curseur(f.reglages, { nom: "Temps", min: 0, max: 12, pas: 1, val: 0, unite: " mois", surChange: dessin });
    var avec = R.bascule(f.reglages, "Revêtement d'hydroxyapatite", true, dessin);
    function dessin() {
      R.vider(g);
      var t = cT.v / 12, hap = avec.checked;
      // os spongieux de part et d'autre de la tige
      R.el("rect", { x: 200, y: 60, width: 560, height: 360, rx: 30, fill: "#f3ead8", stroke: "#b89b6a", "stroke-width": 3 }, g);
      for (var i = 0; i < 40; i++) {
        var x = 220 + (i * 137) % 520, y = 80 + (i * 61) % 320;
        if (x > 400 && x < 560) continue;
        R.el("circle", { cx: x, cy: y, r: 9, fill: "none", stroke: "#d4bf96", "stroke-width": 2 }, g);
      }
      // espace entre os et tige, comblé par l'os avec le temps si bioactif
      var jeu = hap ? 30 * (1 - t) : 30;
      R.el("rect", { x: 420 - 30, y: 60, width: 180, height: 360, fill: "#fff" }, g);
      if (jeu < 30) {
        R.el("rect", { x: 390, y: 60, width: 30 - jeu, height: 360, fill: "#e6cf9f" }, g);
        R.el("rect", { x: 540 + jeu, y: 60, width: 30 - jeu, height: 360, fill: "#e6cf9f" }, g);
      }
      // tige métallique
      R.el("rect", { x: 430, y: 40, width: 100, height: 400, rx: 20, fill: "#c3c8d2", stroke: C.fonce, "stroke-width": 3 }, g);
      if (hap) { R.el("rect", { x: 420, y: 60, width: 10, height: 360, fill: C.acc }, g); R.el("rect", { x: 530, y: 60, width: 10, height: 360, fill: C.acc }, g); }
      T(g, "tige", [480, 240], { taille: 20, gras: true });
      T(g, "os", [270, 240], { taille: 20, gras: true, couleur: "#8a6d3b" });
      T(g, "os", [690, 240], { taille: 20, gras: true, couleur: "#8a6d3b" });
      if (hap) T(g, "hydroxyapatite", [480, 22], { taille: 17, couleur: C.acc, gras: true });
      zone.innerHTML = hap
        ? (t < 1 ? "Revêtement <strong>bioactif</strong> : l'os progresse vers la surface et s'y lie." : "L'os est lié à la surface : bonne intégration de l'implant dans le site osseux.")
        : "Sans revêtement, la tige remplace une fonction sans interaction forte avec l'os (comportement <strong>bio-inerte</strong>).";
    }
    dessin();
  })();
})();
