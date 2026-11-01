(function () {
  "use strict";
  var R = RM, C = R.C, m = R.m;

  var f = R.figure("fig-mgi", {
    largeur: 960, hauteur: 540,
    titre: "Du point visé aux angles : le modèle inverse",
    essai: "<strong>Essaie</strong> : déplace la cible avec les curseurs, puis bascule entre coude haut et coude bas. Emmène la cible loin de la base, puis tout près. " +
      "<strong>Observe</strong> : pour une cible accessible, deux jeux d'angles posent la pointe au même endroit ; hors de l'anneau entre \\(|L_1 - L_2|\\) et \\(L_1 + L_2\\), il n'y a aucune solution."
  });
  var cx = R.curseur(f.reglages, { nom: "x cible", min: -70, max: 75, pas: 1, val: 50, unite: " cm", surChange: dessiner });
  var cy = R.curseur(f.reglages, { nom: "y cible", min: -10, max: 75, pas: 1, val: 40, unite: " cm", surChange: dessiner });
  var b1 = R.boutons(f.reglages);
  var haut = R.bascule(b1, "Coude haut", false, dessiner);
  var g = R.el("g", null, f.svg);
  var zone = R.h("div", null, "", f.direct);
  var L1 = 40, L2 = 30;

  function bras(P, t1, t2, couleurs, op) {
    var o = P.p([0, 0]), A = [L1 * Math.cos(t1), L1 * Math.sin(t1)], M = [A[0] + L2 * Math.cos(t1 + t2), A[1] + L2 * Math.sin(t1 + t2)];
    R.el("line", { x1: o[0], y1: o[1], x2: P.p(A)[0], y2: P.p(A)[1], stroke: couleurs[0], "stroke-width": 16, "stroke-linecap": "round", opacity: op }, g);
    R.el("line", { x1: P.p(A)[0], y1: P.p(A)[1], x2: P.p(M)[0], y2: P.p(M)[1], stroke: couleurs[1], "stroke-width": 13, "stroke-linecap": "round", opacity: op }, g);
    R.el("circle", { cx: P.p(A)[0], cy: P.p(A)[1], r: 10, fill: "#fff", stroke: C.fonce, "stroke-width": 3, opacity: op }, g);
  }
  function dessiner() {
    if (!haut) return;
    R.vider(g);
    var P = R.plan(470, 450, 5.2);
    R.grille(g, P, f.svg, { pas: 10, fort: 50, axes: false });
    var o = P.p([0, 0]);
    R.fleche(g, [20, o[1]], [944, o[1]], { couleur: "#b9bfcc", epaisseur: 2 });
    R.fleche(g, [o[0], 532], [o[0], 12], { couleur: "#b9bfcc", epaisseur: 2 });
    R.el("circle", { cx: o[0], cy: o[1], r: 70 * P.s, fill: "rgba(59,91,219,0.06)", stroke: "rgba(59,91,219,0.5)", "stroke-width": 2, "stroke-dasharray": "6 6" }, g);
    R.el("circle", { cx: o[0], cy: o[1], r: 10 * P.s, fill: "#fff", stroke: "rgba(59,91,219,0.5)", "stroke-width": 2, "stroke-dasharray": "6 6" }, g);
    var xc = cx.v, yc = cy.v, r = Math.hypot(xc, yc), q = P.p([xc, yc]);
    var ok = r <= L1 + L2 && r >= Math.abs(L1 - L2);
    R.el("circle", { cx: q[0], cy: q[1], r: 14, fill: ok ? "rgba(229,72,77,.15)" : "#fff", stroke: "#e5484d", "stroke-width": 2.5, "stroke-dasharray": "5 4" }, g);
    R.texte(g, "cible", [q[0] + 20, q[1] - 16], { taille: 17, couleur: "#c4373c", italique: false, ancre: "start" });
    var lignes;
    if (ok) {
      var c2 = (r * r - L1 * L1 - L2 * L2) / (2 * L1 * L2), t2 = Math.acos(Math.max(-1, Math.min(1, c2)));
      var al = Math.atan2(yc, xc), be = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + r * r - L2 * L2) / (2 * L1 * r))));
      var bas = [al - be, t2], hautS = [al + be, -t2];
      var choisi = haut.checked ? hautS : bas, autre = haut.checked ? bas : hautS;
      bras(P, autre[0], autre[1], ["#e2a33a", "#9fb3c8"], 0.25);
      bras(P, choisi[0], choisi[1], ["#e2a33a", "#9fb3c8"], 1);
      lignes = "r = \\sqrt{x_c^2 + y_c^2} = " + R.tc(r, 2) + " \\text{ cm} \\qquad \\cos\\theta_2 = " + R.tc(c2, 3) + "\\\\[6pt]" +
        (haut.checked ? "\\text{coude haut : }" : "\\text{coude bas : }") + "\\theta_1 = " + R.tc(choisi[0] / R.DEG, 2) + "°,\\ \\theta_2 = " + R.tc(choisi[1] / R.DEG, 2) + "°";
    } else {
      lignes = "r = " + R.tc(r, 2) + " \\text{ cm} \\notin [\\,|L_1 - L_2|\\,;\\ L_1 + L_2\\,] = [10\\,;\\ 70] \\quad \\Rightarrow \\text{ aucune solution}";
    }
    R.el("circle", { cx: o[0], cy: o[1], r: 11, fill: "#fff", stroke: C.fonce, "stroke-width": 3 }, g);
    R.rendre(zone, lignes);
  }
  dessiner();
})();
