(function () {
  "use strict";
  var R = RM, C = R.C, m = R.m;

  var f = R.figure("fig-3r", {
    largeur: 960, hauteur: 540,
    titre: "Le robot plan 3R du TD 1",
    essai: "<strong>Essaie</strong> : fais varier \\(\\theta_1\\), \\(\\theta_2\\), \\(\\theta_3\\), puis « Tout à zéro ». " +
      "<strong>Observe</strong> : chaque segment est orienté par la somme des angles qui le précèdent ; \\(\\varphi\\) est la somme des trois angles. À zéro, le bras est tendu sur \\(x_0\\) : \\(p_x = L_1 + L_2 + L_3\\)."
  });
  var b0 = R.boutons(f.reglages);
  R.bouton(b0, "Tout à zéro", function () { c1.set(0); c2.set(0); c3.set(0); dessiner(); });
  var c1 = R.curseur(f.reglages, { nom: "θ₁", min: -90, max: 120, pas: 1, val: 25, unite: "°", surChange: dessiner });
  var c2 = R.curseur(f.reglages, { nom: "θ₂", min: -150, max: 150, pas: 1, val: 30, unite: "°", surChange: dessiner });
  var c3 = R.curseur(f.reglages, { nom: "θ₃", min: -150, max: 150, pas: 1, val: 35, unite: "°", surChange: dessiner });
  var L = [4, 3, 2];
  var g = R.el("g", null, f.svg);
  var zone = R.h("div", null, "", f.direct);

  function dessiner() {
    if (!c3) return;
    R.vider(g);
    var t = [c1.v * R.DEG, c2.v * R.DEG, c3.v * R.DEG];
    var P = R.plan(330, 455, 50);
    R.grille(g, P, f.svg, { pas: 1, fort: 5, axes: false });
    var o = P.p([0, 0]);
    R.fleche(g, [20, o[1]], [944, o[1]], { couleur: "#b9bfcc", epaisseur: 2 });
    R.fleche(g, [o[0], 532], [o[0], 12], { couleur: "#b9bfcc", epaisseur: 2 });
    R.texte(g, "x", [930, o[1] + 22], { couleur: C.doux, ind: "0" });
    R.texte(g, "y", [o[0] + 22, 22], { couleur: C.doux, ind: "0" });
    var pts = [[0, 0]], a = 0, coul = ["#ff8a5c", "#8b3fd9", "#2f9e6e"];
    for (var i = 0; i < 3; i++) {
      a += t[i];
      var q = pts[i];
      pts.push([q[0] + L[i] * Math.cos(a), q[1] + L[i] * Math.sin(a)]);
    }
    // angles : chacun mesuré depuis le prolongement du segment précédent
    var ab = 0;
    for (i = 0; i < 3; i++) {
      var c = P.p(pts[i]);
      if (i > 0) R.ligne(g, c, P.p([pts[i][0] + 1.3 * Math.cos(ab), pts[i][1] + 1.3 * Math.sin(ab)]), { couleur: C.gris, tirets: "4 4" });
      R.arc(g, c, 48, ab, ab + t[i], { couleur: C.acc, epaisseur: 2.5 });
      R.texte(g, "θ" + "₁₂₃"[i], [c[0] + 72 * Math.cos(ab + t[i] / 2), c[1] - 72 * Math.sin(ab + t[i] / 2)], { taille: 19, couleur: C.acc });
      ab += t[i];
    }
    for (i = 0; i < 3; i++) {
      var p1 = P.p(pts[i]), p2 = P.p(pts[i + 1]);
      R.el("line", { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: coul[i], "stroke-width": 16 - 2 * i, "stroke-linecap": "round" }, g);
    }
    for (i = 0; i < 3; i++) {
      var cc = P.p(pts[i]);
      R.el("circle", { cx: cc[0], cy: cc[1], r: 11, fill: "#fff", stroke: C.fonce, "stroke-width": 3 }, g);
    }
    var pp = P.p(pts[3]);
    R.point(g, pp, { couleur: C.acc, r: 9, contour: "#fff" });
    R.texte(g, "P", [pp[0] + 18, pp[1] - 16], { couleur: C.acc, gras: true, taille: 22 });
    for (i = 0; i < 3; i++) {
      var mi = P.p(m.scale(m.add(pts[i], pts[i + 1]), 0.5)), an = (i === 0 ? t[0] : i === 1 ? t[0] + t[1] : t[0] + t[1] + t[2]);
      R.texte(g, "L" + "₁₂₃"[i], [mi[0] - 26 * Math.sin(an), mi[1] - 26 * Math.cos(an)], { couleur: coul[i], taille: 20, gras: true });
    }
    var phi = c1.v + c2.v + c3.v;
    R.rendre(zone, "p_x = L_1 c_1 + L_2 c_{12} + L_3 c_{123} \\qquad p_y = L_1 s_1 + L_2 s_{12} + L_3 s_{123} \\\\[6pt]" +
      "\\varphi = \\theta_1 + \\theta_2 + \\theta_3 = " + R.tn(phi, 0) + "° \\qquad (L_1, L_2, L_3) = (4, 3, 2) \\Rightarrow (p_x, p_y) = (" + R.tc(pts[3][0], 2) + " \\,;\\ " + R.tc(pts[3][1], 2) + ")");
  }
  dessiner();
})();
