(function () {
  "use strict";
  var R = RM, C = R.C, m = R.m;

  var f = R.figure("fig-mgi-2r", {
    largeur: 960, hauteur: 540,
    titre: "Planification de biopsie : le calcul pas à pas",
    essai: "<strong>Essaie</strong> : avance dans les cinq étapes, puis déplace la cible. " +
      "<strong>Observe</strong> : la distance \\(r\\) décide de l'accessibilité ; Al-Kashi dans le triangle OAP donne \\(\\theta_2\\), puis \\(\\beta\\) ; \\(\\theta_1 = \\alpha - \\beta\\). La MGD vérifie le résultat."
  });
  var cx = R.curseur(f.reglages, { nom: "x cible", min: 15, max: 68, pas: 1, val: 50, unite: " cm", surChange: dessiner });
  var cy = R.curseur(f.reglages, { nom: "y cible", min: 0, max: 60, pas: 1, val: 40, unite: " cm", surChange: dessiner });
  var k = 0;
  var et = R.etapes(f.reglages, 5, ["la cible", "accessibilité", "θ₂ par Al-Kashi", "α et β", "θ₁ = α − β", "vérification par la MGD"], function (n) { k = n; dessiner(); });
  var g = R.el("g", null, f.svg);
  var zone = R.h("div", null, "", f.direct);
  var L1 = 40, L2 = 30;

  function dessiner() {
    if (!et) return;
    R.vider(g);
    var P = R.plan(150, 470, 6);
    R.grille(g, P, f.svg, { pas: 10, fort: 50, axes: false });
    var o = P.p([0, 0]);
    R.fleche(g, [20, o[1]], [944, o[1]], { couleur: "#b9bfcc", epaisseur: 2 });
    R.fleche(g, [o[0], 532], [o[0], 12], { couleur: "#b9bfcc", epaisseur: 2 });
    var xc = cx.v, yc = cy.v, r = Math.hypot(xc, yc), q = P.p([xc, yc]);
    var ok = r <= L1 + L2 && r >= L1 - L2;
    if (k >= 1) R.el("circle", { cx: o[0], cy: o[1], r: 70 * P.s, fill: "rgba(59,91,219,0.05)", stroke: "rgba(59,91,219,0.5)", "stroke-width": 2, "stroke-dasharray": "6 6" }, g);
    if (k >= 1) R.ligne(g, o, q, { couleur: C.acc, tirets: "7 5", epaisseur: 2.5 });
    if (k >= 1) R.texte(g, "r", m.add(P.p([xc / 2, yc / 2]), [-12, -12]), { couleur: C.acc, taille: 20 });
    R.el("circle", { cx: q[0], cy: q[1], r: 13, fill: "rgba(229,72,77,.15)", stroke: "#e5484d", "stroke-width": 2.5 }, g);
    R.texte(g, "P", [q[0] + 18, q[1] - 14], { taille: 20, couleur: "#c4373c" });
    var l = [];
    if (k === 0) l.push("L_1 = 40 \\text{ cm},\\ L_2 = 30 \\text{ cm} \\qquad (x_c, y_c) = (" + xc + ",\\ " + yc + ") \\text{ cm}");
    if (k >= 1) l.push("r = \\sqrt{x_c^2 + y_c^2} = " + R.tc(r, 2) + " \\text{ cm}" + (ok ? " \\in [10\\,;\\ 70] : \\text{ accessible}" : " : \\text{hors de portée}"));
    if (ok) {
      var c2 = (r * r - L1 * L1 - L2 * L2) / (2 * L1 * L2), t2 = Math.acos(c2);
      var al = Math.atan2(yc, xc), be = Math.acos((L1 * L1 + r * r - L2 * L2) / (2 * L1 * r)), t1 = al - be;
      var A = [L1 * Math.cos(t1), L1 * Math.sin(t1)];
      if (k >= 2) {
        R.el("polygon", { points: [o, P.p(A), q].map(String).join(" "), fill: "rgba(229,72,77,0.07)" }, g);
        R.el("line", { x1: o[0], y1: o[1], x2: P.p(A)[0], y2: P.p(A)[1], stroke: "#e2a33a", "stroke-width": 15, "stroke-linecap": "round" }, g);
        R.el("line", { x1: P.p(A)[0], y1: P.p(A)[1], x2: q[0], y2: q[1], stroke: "#9fb3c8", "stroke-width": 12, "stroke-linecap": "round" }, g);
        R.el("circle", { cx: P.p(A)[0], cy: P.p(A)[1], r: 10, fill: "#fff", stroke: C.fonce, "stroke-width": 3 }, g);
        R.texte(g, "A", m.add(P.p(A), [14, 26]), { taille: 20 });
        R.ligne(g, P.p(A), P.p([A[0] + 16 * Math.cos(t1), A[1] + 16 * Math.sin(t1)]), { couleur: C.gris, tirets: "4 4" });
        R.arc(g, P.p(A), 44, t1, t1 + t2, { couleur: "#12a26b", epaisseur: 2.5 });
        R.texte(g, "θ₂", m.add(P.p(A), [62 * Math.cos(t1 + t2 / 2), -62 * Math.sin(t1 + t2 / 2)]), { couleur: "#12a26b", taille: 19 });
        l.push("\\cos\\theta_2 = \\dfrac{x_c^2 + y_c^2 - L_1^2 - L_2^2}{2L_1L_2} = " + R.tc(c2, 3) + " \;\\Rightarrow\; \\theta_2 = " + R.tc(t2 / R.DEG, 2) + "°");
      }
      if (k >= 3) {
        R.arc(g, o, 120, 0, al, { couleur: C.acc, epaisseur: 2.5 });
        R.texte(g, "α", m.add(o, [140 * Math.cos(al * 0.75), -140 * Math.sin(al * 0.75)]), { couleur: C.acc, taille: 20 });
        R.arc(g, o, 84, t1, al, { couleur: "#e2a33a", epaisseur: 3 });
        R.texte(g, "β", m.add(o, [100 * Math.cos((t1 + al) / 2), -100 * Math.sin((t1 + al) / 2)]), { couleur: "#b07a1d", taille: 20 });
        l.push("\\alpha = \\arctan\\dfrac{y_c}{x_c} = " + R.tc(al / R.DEG, 2) + "° \\qquad \\beta = \\arccos\\dfrac{L_1^2 + r^2 - L_2^2}{2L_1r} = " + R.tc(be / R.DEG, 2) + "°");
      }
      if (k >= 4) {
        R.arc(g, o, 54, 0, t1, { couleur: "#e5484d", epaisseur: 2.5 });
        R.texte(g, "θ₁", m.add(o, [74 * Math.cos(t1 / 2), -74 * Math.sin(t1 / 2) - 4]), { couleur: "#e5484d", taille: 19 });
        l.push("\\theta_1 = \\alpha - \\beta = " + R.tc(t1 / R.DEG, 2) + "°");
      }
      if (k >= 5) l.push("x = 40\\cos\\theta_1 + 30\\cos(\\theta_1 + \\theta_2) = " + R.tc(L1 * Math.cos(t1) + L2 * Math.cos(t1 + t2), 2) + " \\qquad y = " + R.tc(L1 * Math.sin(t1) + L2 * Math.sin(t1 + t2), 2));
    }
    R.el("circle", { cx: o[0], cy: o[1], r: 11, fill: "#fff", stroke: C.fonce, "stroke-width": 3 }, g);
    R.texte(g, "O", [o[0] - 24, o[1] + 26], { taille: 20 });
    R.rendre(zone, l.slice(-2).join("\\\\[6pt]"));
  }
  et.aller(0);
})();
