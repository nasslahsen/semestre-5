(function () {
  "use strict";
  var R = RM, C = R.C, m = R.m;

  var f = R.figure("fig-dh-2r", {
    largeur: 960, hauteur: 540,
    titre: "Le 2R du cours, repères placés selon Denavit–Hartenberg",
    essai: "<strong>Essaie</strong> : fais varier \\(\\theta_1\\) et \\(\\theta_2\\), puis avance dans les étapes. " +
      "<strong>Observe</strong> : ici \\(O_1\\) est sur le pivot 2 et \\(O_2\\) sur l'outil ; chaque \\(x_j\\) suit son segment. La 4e colonne de \\({}^0T_2\\) est la position de l'outil."
  });
  var c1 = R.curseur(f.reglages, { nom: "θ₁", min: -60, max: 150, pas: 1, val: 25, unite: "°", surChange: dessiner });
  var c2 = R.curseur(f.reglages, { nom: "θ₂", min: -150, max: 150, pas: 1, val: 40, unite: "°", surChange: dessiner });
  var k = 3;
  var et = R.etapes(f.reglages, 3, ["repères placés", "⁰T₁", "¹T₂", "⁰T₂ = ⁰T₁ ¹T₂"], function (n) { k = n; dessiner(); });
  var g = R.el("g", null, f.svg);
  var zone = R.h("div", null, "", f.direct);
  var L1 = 40, L2 = 30;
  function T(t, L) { return [[Math.cos(t), -Math.sin(t), 0, L * Math.cos(t)], [Math.sin(t), Math.cos(t), 0, L * Math.sin(t)], [0, 0, 1, 0], [0, 0, 0, 1]]; }

  function dessiner() {
    if (!et) return;
    R.vider(g);
    var t1 = c1.v * R.DEG, t2 = c2.v * R.DEG;
    var P = R.plan(330, 430, 5.4);
    R.grille(g, P, f.svg, { pas: 10, fort: 50, axes: false });
    var o = P.p([0, 0]);
    R.fleche(g, [20, o[1]], [944, o[1]], { couleur: "#b9bfcc", epaisseur: 2 });
    R.fleche(g, [o[0], 532], [o[0], 12], { couleur: "#b9bfcc", epaisseur: 2 });
    R.texte(g, "quadrillage : 10 cm", [940, 524], { couleur: C.doux, italique: false, taille: 15, ancre: "end" });
    var O1 = [L1 * Math.cos(t1), L1 * Math.sin(t1)], O2 = [O1[0] + L2 * Math.cos(t1 + t2), O1[1] + L2 * Math.sin(t1 + t2)];
    R.el("line", { x1: o[0], y1: o[1], x2: P.p(O1)[0], y2: P.p(O1)[1], stroke: "#e2a33a", "stroke-width": 18, "stroke-linecap": "round" }, g);
    R.el("line", { x1: P.p(O1)[0], y1: P.p(O1)[1], x2: P.p(O2)[0], y2: P.p(O2)[1], stroke: "#9fb3c8", "stroke-width": 15, "stroke-linecap": "round" }, g);
    R.ligne(g, P.p(O1), P.p([O1[0] + 18 * Math.cos(t1), O1[1] + 18 * Math.sin(t1)]), { couleur: C.gris, tirets: "4 4" });
    R.arc(g, o, 60, 0, t1, { couleur: C.acc, epaisseur: 2.5 });
    R.texte(g, "θ₁", [o[0] + 84 * Math.cos(t1 / 2), o[1] - 84 * Math.sin(t1 / 2)], { taille: 20, couleur: C.acc });
    R.arc(g, P.p(O1), 52, t1, t1 + t2, { couleur: C.acc, epaisseur: 2.5 });
    R.texte(g, "θ₂", [P.p(O1)[0] + 76 * Math.cos(t1 + t2 / 2), P.p(O1)[1] - 76 * Math.sin(t1 + t2 / 2)], { taille: 20, couleur: C.acc });
    var hl = function (j) { return k === 0 || k === 3 || k === j ? 1 : 0.3; };
    R.repere2D(g, P, [0, 0], [1, 0], [0, 1], { longueur: 14, indice: "0", epaisseur: 2.4, origine: false, opacite: hl(1) });
    R.repere2D(g, P, O1, [Math.cos(t1), Math.sin(t1)], [-Math.sin(t1), Math.cos(t1)], { longueur: 14, indice: "1", epaisseur: 2.4, origine: false, opacite: hl(1) === 1 || hl(2) === 1 ? 1 : 0.3 });
    R.repere2D(g, P, O2, [Math.cos(t1 + t2), Math.sin(t1 + t2)], [-Math.sin(t1 + t2), Math.cos(t1 + t2)], { longueur: 14, indice: "2", epaisseur: 2.4, origine: false, opacite: hl(2) });
    [o, P.p(O1), P.p(O2)].forEach(function (c) {
      R.el("circle", { cx: c[0], cy: c[1], r: 11, fill: "#fff", stroke: C.fonce, "stroke-width": 3 }, g);
      R.el("circle", { cx: c[0], cy: c[1], r: 3, fill: C.fonce }, g);
    });
    R.texte(g, "O₀", m.add(o, [-30, 30]), { taille: 18 });
    R.texte(g, "O₁", m.add(P.p(O1), [26 * Math.sin(t1) + 8, 26 * Math.cos(t1) + 14]), { taille: 18 });
    R.texte(g, "O₂", m.add(P.p(O2), [22, 24]), { taille: 18 });
    var T01 = T(t1, L1), T12 = T(t2, L2), T02 = m.matMul(T01, T12);
    var l = k === 0 ? "\\begin{array}{c|cccc} j & \\alpha_j & d_j & \\theta_j & r_j \\\\ \\hline 1 & 0 & L_1 & \\theta_1 & 0 \\\\ 2 & 0 & L_2 & \\theta_2 & 0 \\end{array} \\qquad L_1 = 40,\\ L_2 = 30 \\text{ cm}"
      : k === 1 ? "{}^0T_1 = " + R.texMat(T01, 2) : k === 2 ? "{}^1T_2 = " + R.texMat(T12, 2)
      : "{}^0T_2 = " + R.texMat(T02, 2) + "\\quad \\theta_1 + \\theta_2 = " + R.tn(c1.v + c2.v, 0) + "°";
    R.rendre(zone, l);
  }
  et.aller(3);
})();
