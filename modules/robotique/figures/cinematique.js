(function () {
  "use strict";
  var R = RM, C = R.C, m = R.m;

  var f = R.figure("fig-jacobienne", {
    largeur: 960, hauteur: 540,
    titre: "Vitesses des moteurs, vitesse de la pince",
    essai: "<strong>Essaie</strong> : règle \\(\\dot q_1\\) et \\(\\dot q_2\\), puis mets l'un des deux à zéro. Change aussi la posture avec \\(q_2\\). " +
      "<strong>Observe</strong> : la vitesse de E (violette) est la somme des deux colonnes de \\(J(q)\\), chacune pesée par la vitesse de son moteur. Quand \\(q_2 = 0\\), les deux colonnes deviennent parallèles."
  });
  var c2 = R.curseur(f.reglages, { nom: "q₂", min: -150, max: 150, pas: 1, val: 60, unite: "°", surChange: dessiner });
  var v1 = R.curseur(f.reglages, { nom: "q̇₁", min: -1, max: 1, pas: 0.1, val: 0.5, unite: " rad/s", surChange: dessiner });
  var v2 = R.curseur(f.reglages, { nom: "q̇₂", min: -1, max: 1, pas: 0.1, val: 0.5, unite: " rad/s", surChange: dessiner });
  var g = R.el("g", null, f.svg);
  var zone = R.h("div", null, "", f.direct);
  var L1 = 1, L2 = 1, q1 = 30 * R.DEG;

  function dessiner() {
    if (!v2) return;
    R.vider(g);
    var q2 = c2.v * R.DEG, P = R.plan(330, 430, 170);
    R.grille(g, P, f.svg, { pas: 0.5, fort: 2, axes: false });
    var o = P.p([0, 0]);
    R.fleche(g, [20, o[1]], [944, o[1]], { couleur: "#b9bfcc", epaisseur: 2 });
    R.fleche(g, [o[0], 532], [o[0], 12], { couleur: "#b9bfcc", epaisseur: 2 });
    var A = [L1 * Math.cos(q1), L1 * Math.sin(q1)], E = [A[0] + L2 * Math.cos(q1 + q2), A[1] + L2 * Math.sin(q1 + q2)];
    var J = [[-L1 * Math.sin(q1) - L2 * Math.sin(q1 + q2), -L2 * Math.sin(q1 + q2)], [L1 * Math.cos(q1) + L2 * Math.cos(q1 + q2), L2 * Math.cos(q1 + q2)]];
    R.el("line", { x1: o[0], y1: o[1], x2: P.p(A)[0], y2: P.p(A)[1], stroke: "#e2a33a", "stroke-width": 16, "stroke-linecap": "round" }, g);
    R.el("line", { x1: P.p(A)[0], y1: P.p(A)[1], x2: P.p(E)[0], y2: P.p(E)[1], stroke: "#9fb3c8", "stroke-width": 13, "stroke-linecap": "round" }, g);
    [o, P.p(A)].forEach(function (c) { R.el("circle", { cx: c[0], cy: c[1], r: 10, fill: "#fff", stroke: C.fonce, "stroke-width": 3 }, g); });
    var e = 0.5, c1v = [J[0][0] * v1.v * e, J[1][0] * v1.v * e], c2v = [J[0][1] * v2.v * e, J[1][1] * v2.v * e];
    var V = [c1v[0] + c2v[0], c1v[1] + c2v[1]];
    if (Math.hypot(c1v[0], c1v[1]) > 0.01) R.fleche(g, P.p(E), P.p(m.add(E, c1v)), { couleur: "#e2a33a", epaisseur: 3, tirets: "6 4" });
    if (Math.hypot(c2v[0], c2v[1]) > 0.01) R.fleche(g, P.p(m.add(E, c1v)), P.p(m.add(E, V)), { couleur: "#5b7a99", epaisseur: 3, tirets: "6 4" });
    if (Math.hypot(V[0], V[1]) > 0.01) R.fleche(g, P.p(E), P.p(m.add(E, V)), { couleur: C.v, epaisseur: 4.5 });
    R.point(g, P.p(E), { couleur: C.acc, r: 8, contour: "#fff" });
    R.texte(g, "E", m.add(P.p(E), [-24, -6]), { couleur: C.acc, taille: 20 });
    R.texte(g, "O", [o[0] - 24, o[1] + 26], { taille: 20 });
    R.texte(g, "A", m.add(P.p(A), [16, 26]), { taille: 20 });
    R.texte(g, "L₁ = L₂ = 1 m, q₁ = 30°", [940, 524], { couleur: C.doux, italique: false, taille: 15, ancre: "end" });
    var Vr = [J[0][0] * v1.v + J[0][1] * v2.v, J[1][0] * v1.v + J[1][1] * v2.v];
    R.rendre(zone, "J(q) = " + R.texMat(J, 2) + " \\qquad V = J(q)\\,\\dot q = " + R.texVec(Vr, 2) + " \\text{ m/s}");
  }
  dessiner();
})();
