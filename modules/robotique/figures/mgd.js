(function () {
  "use strict";
  var R = RM, C = R.C, m = R.m;

  var f = R.figure("fig-mgd", {
    largeur: 960, hauteur: 540,
    titre: "Robot de biopsie du sein : des angles à la pointe",
    essai: "<strong>Essaie</strong> : règle \\(\\theta_1\\) et \\(\\theta_2\\) pour amener la pointe sur la lésion. " +
      "<strong>Observe</strong> : le modèle direct \\(X = f(q)\\) donne à chaque instant la position et l'orientation de la pointe à partir des seuls angles, ce que les capteurs fournissent."
  });
  var c1 = R.curseur(f.reglages, { nom: "θ₁", min: -60, max: 150, pas: 1, val: 70, unite: "°", surChange: dessiner });
  var c2 = R.curseur(f.reglages, { nom: "θ₂", min: -150, max: 150, pas: 1, val: -60, unite: "°", surChange: dessiner });
  var g = R.el("g", null, f.svg);
  var zone = R.h("div", null, "", f.direct);
  var L1 = 40, L2 = 30, lesion = [45, 35];

  function dessiner() {
    if (!c2) return;
    R.vider(g);
    var t1 = c1.v * R.DEG, t2 = c2.v * R.DEG;
    var P = R.plan(300, 440, 5.4);
    R.grille(g, P, f.svg, { pas: 10, fort: 50, axes: false });
    var o = P.p([0, 0]);
    R.fleche(g, [20, o[1]], [944, o[1]], { couleur: "#b9bfcc", epaisseur: 2 });
    R.fleche(g, [o[0], 532], [o[0], 12], { couleur: "#b9bfcc", epaisseur: 2 });
    R.texte(g, "x", [930, o[1] + 22], { couleur: C.doux });
    R.texte(g, "y", [o[0] + 22, 22], { couleur: C.doux });
    var q = P.p(lesion);
    R.el("circle", { cx: q[0], cy: q[1], r: 22, fill: "rgba(229,72,77,0.15)", stroke: "#e5484d", "stroke-width": 2, "stroke-dasharray": "5 4" }, g);
    R.texte(g, "lésion", [q[0] + 28, q[1] + 6], { taille: 17, couleur: "#c4373c", italique: false, ancre: "start" });
    var O1 = [L1 * Math.cos(t1), L1 * Math.sin(t1)], M = [O1[0] + L2 * Math.cos(t1 + t2), O1[1] + L2 * Math.sin(t1 + t2)];
    R.el("line", { x1: o[0], y1: o[1], x2: P.p(O1)[0], y2: P.p(O1)[1], stroke: "#e2a33a", "stroke-width": 18, "stroke-linecap": "round" }, g);
    R.el("line", { x1: P.p(O1)[0], y1: P.p(O1)[1], x2: P.p(M)[0], y2: P.p(M)[1], stroke: "#9fb3c8", "stroke-width": 15, "stroke-linecap": "round" }, g);
    [o, P.p(O1)].forEach(function (c) {
      R.el("circle", { cx: c[0], cy: c[1], r: 11, fill: "#fff", stroke: C.fonce, "stroke-width": 3 }, g);
    });
    R.point(g, P.p(M), { couleur: C.acc, r: 9, contour: "#fff" });
    R.texte(g, "pointe", m.add(P.p(M), [-14, -18]), { couleur: C.acc, taille: 18, italique: false, ancre: "end" });
    var dist = Math.hypot(M[0] - lesion[0], M[1] - lesion[1]);
    R.rendre(zone, "q = (\\theta_1, \\theta_2) = (" + R.tn(c1.v, 0) + "°,\\ " + R.tn(c2.v, 0) + "°) \\quad\\longrightarrow\\quad X = (x, y, \\varphi) = (" + R.tc(M[0], 1) + " \\,;\\ " + R.tc(M[1], 1) + " \\,;\\ " + R.tn(c1.v + c2.v, 0) + "°) \\\\[6pt]" +
      "L_1 = 40 \\text{ cm},\\ L_2 = 30 \\text{ cm} \\qquad \\text{pointe–lésion : } " + R.tc(dist, 1) + " \\text{ cm}");
  }
  dessiner();
})();
