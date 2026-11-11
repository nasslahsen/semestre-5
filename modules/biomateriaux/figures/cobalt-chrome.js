(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Usure cumulée de trois couples ---------- */
  (function () {
    var f = R.figure("fig-usure", {
      largeur: 960, hauteur: 480, titre: "Usure linéaire cumulée de trois couples de frottement",
      essai: "<strong>Essaie</strong> : fais passer les années, et règle l'usure du couple métal-polyéthylène dans sa fourchette. <strong>Observe</strong> : le métal sur métal en CoCrMo s'use des dizaines de fois moins."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cA = R.curseur(f.reglages, { nom: "Années", min: 1, max: 20, pas: 1, val: 5, surChange: dessin });
    var cU = R.curseur(f.reglages, { nom: "Métal-PE", min: 100, max: 400, pas: 10, val: 200, unite: " µm/an", surChange: dessin });
    function dessin() {
      R.vider(g);
      var a = cA.v, L = [
        { n: "métal sur métal (CoCrMo)", v: 4.2, c: C.acc },
        { n: "Co-Ni-Cr-Mo contre PE", v: 140, c: "#8e97a6" },
        { n: "métal-polyéthylène", v: cU.v, c: "#3b5bdb" }
      ];
      var max = 8000, X0 = 330, W = 560;
      T(g, "usure en " + a + " an" + (a > 1 ? "s" : "") + " (mm)", [X0 + W / 2, 60], { taille: 19, couleur: C.doux });
      R.ligne(g, [X0, 90], [X0, 400], { couleur: C.fonce, epaisseur: 2.5 });
      [0, 2, 4, 6, 8].forEach(function (q) { var x = X0 + q * 1000 / max * W; R.ligne(g, [x, 400], [x, 410], { couleur: C.fonce, epaisseur: 2 }); T(g, String(q), [x, 432], { taille: 16, couleur: C.doux }); });
      L.forEach(function (l, i) {
        var y = 120 + i * 95, u = l.v * a, w = Math.max(3, u / max * W);
        T(g, l.n, [X0 - 16, y + 25], { taille: 18, ancre: "end", gras: true });
        R.el("rect", { x: X0, y: y, width: w, height: 50, rx: 8, fill: l.c }, g);
        T(g, R.fmt(u / 1000, u < 1000 ? 3 : 2) + " mm", [X0 + w + 12, y + 25], { taille: 18, ancre: "start", gras: true });
      });
      var r = cU.v / 4.2;
      zone.innerHTML = "En " + a + " an" + (a > 1 ? "s" : "") + " : métal sur métal " + R.fmt(4.2 * a, 1) + " µm, métal-PE " + R.fmt(cU.v * a, 0) + " µm, soit environ " + Math.round(r) + " fois plus.";
    }
    dessin();
  })();
})();
