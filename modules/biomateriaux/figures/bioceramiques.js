(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Bio-inerte ou résorbable : ce que devient l'implant ---------- */
  (function () {
    var f = R.figure("fig-deux", {
      largeur: 960, hauteur: 460, titre: "Une céramique bio-inerte et une céramique résorbable dans l'os (allure)",
      essai: "<strong>Essaie</strong> : fais passer le temps après l'implantation. <strong>Observe</strong> : l'alumine ne change pas ; le phosphate de calcium disparaît pendant que l'os le remplace. Allure qualitative."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cT = R.curseur(f.reglages, { nom: "Temps", min: 0, max: 100, pas: 5, val: 0, unite: " %", surChange: dessin });
    function bloc(x, titre, resorbe) {
      var t = cT.v / 100;
      R.el("rect", { x: x, y: 80, width: 380, height: 300, rx: 30, fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      R.el("rect", { x: x + 90, y: 150, width: 200, height: 160, rx: 6, fill: "#fff", stroke: "#cbb893", "stroke-width": 2, "stroke-dasharray": "6 5" }, g);
      if (!resorbe) {
        R.el("rect", { x: x + 90, y: 150, width: 200, height: 160, rx: 6, fill: "#e8e2d4", stroke: C.fonce, "stroke-width": 3 }, g);
        T(g, "alumine", [x + 190, 232], { taille: 22, gras: true, halo: false });
      } else {
        // grains de céramique qui disparaissent, os qui les remplace
        for (var i = 0; i < 40; i++) {
          var cx = x + 105 + (i % 8) * 24, cy = 165 + Math.floor(i / 8) * 30, seuil = ((i * 37) % 40) / 40;
          if (seuil < t) R.el("circle", { cx: cx, cy: cy, r: 11, fill: "#d9c39a" }, g);
          else R.el("circle", { cx: cx, cy: cy, r: 11, fill: C.acc, opacity: 0.85 }, g);
        }
        T(g, Math.round(100 * (1 - t)) + " % de céramique", [x + 190, 340], { taille: 18, gras: true, couleur: C.acc });
      }
      T(g, titre, [x + 190, 50], { taille: 21, gras: true });
    }
    function dessin() {
      R.vider(g);
      bloc(50, "bio-inerte", false);
      bloc(530, "résorbable", true);
      var t = cT.v;
      zone.innerHTML = t < 100 ? "La céramique résorbable se dégrade et est remplacée progressivement par les tissus endogènes ; la vitesse dépend du matériau." : "Le phosphate de calcium a été entièrement remplacé par de l'os. L'alumine, elle, a gardé ses propriétés pendant toute l'implantation.";
    }
    dessin();
  })();
})();
