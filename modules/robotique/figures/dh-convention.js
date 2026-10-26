(function () {
  "use strict";
  var R = RM, C = R.C, m = R.m;

  var f = R.figure("fig-dh-regles", {
    largeur: 960, hauteur: 540,
    titre: "Les deux règles de placement des repères",
    essai: "<strong>Essaie</strong> : fais varier la torsion entre les deux axes, puis la distance entre eux ; coche « Faire tourner la vue au doigt » pour regarder la scène sous un autre angle. " +
      "<strong>Observe</strong> : \\(Z_{j-1}\\) et \\(Z_j\\) suivent toujours les axes des articulations \\(j\\) et \\(j+1\\) ; \\(X_j\\) est porté par la normale commune, le seul segment perpendiculaire aux deux axes, et va de \\(Z_{j-1}\\) vers \\(Z_j\\)."
  });
  var V = R.vue3D(300, 340, 115, -38 * R.DEG, 20 * R.DEG);
  var g = R.el("g", null, f.svg);
  var ca = R.curseur(f.reglages, { nom: "torsion", min: -90, max: 90, pas: 1, val: 40, unite: "°", surChange: dessiner });
  var cd = R.curseur(f.reglages, { nom: "distance", min: 1, max: 3.5, pas: 0.1, val: 2.6, surChange: dessiner });
  var cr = R.curseur(f.reglages, { nom: "décalage", min: 0, max: 1.5, pas: 0.1, val: 0.8, surChange: dessiner });
  var b1 = R.boutons(f.reglages);
  var tourne = R.basculeOrbite(b1);

  function dessiner() {
    if (!cr) return;
    R.vider(g);
    var a = ca.v * R.DEG, d = cd.v, r = cr.v;
    var H = [0, 0, r], Oj = [d, 0, r], zj = [0, -Math.sin(a), Math.cos(a)], xj = [1, 0, 0], yj = m.cross(zj, xj);
    // sol discret
    for (var k = -1; k <= 4; k++) {
      R.ligne(g, V.p([k, -2, 0]), V.p([k, 2, 0]), { couleur: "#e9ecf2", epaisseur: 1 });
      R.ligne(g, V.p([-1, k - 2, 0]), V.p([4, k - 2, 0]), { couleur: "#e9ecf2", epaisseur: 1 });
    }
    // articulations : manchons le long de leurs axes
    R.ligne(g, V.p([0, 0, -0.5]), V.p([0, 0, 0.5]), { couleur: "#c9ced9", epaisseur: 26 });
    R.ligne(g, V.p(m.add(Oj, m.scale(zj, -0.5))), V.p(m.add(Oj, m.scale(zj, 0.5))), { couleur: "#c9ced9", epaisseur: 26 });
    R.texte(g, "articulation j", m.add(V.p([0, 0, -0.5]), [-14, 30]), { taille: 17, couleur: C.doux, italique: false, ancre: "end" });
    R.texte(g, "articulation j + 1", m.add(V.p(m.add(Oj, m.scale(zj, -0.5))), [10, 34]), { taille: 17, couleur: C.doux, italique: false, ancre: "start" });
    // axes Z (longs) : règle 1
    R.ligne(g, V.p([0, 0, -1.2]), V.p([0, 0, 2.9]), { couleur: C.z, epaisseur: 3 });
    R.texte(g, "Z", m.add(V.p([0, 0, 2.9]), [-14, -8]), { couleur: C.z, ind: "j−1", taille: 22 });
    R.ligne(g, V.p(m.add(Oj, m.scale(zj, -1.6))), V.p(m.add(Oj, m.scale(zj, 1.5))), { couleur: C.z, epaisseur: 3 });
    R.texte(g, "Z", m.add(V.p(m.add(Oj, m.scale(zj, 1.5))), [10, -6]), { couleur: C.z, ind: "j", taille: 22 });
    // normale commune et X_j : règle 2
    R.ligne(g, V.p(H), V.p(Oj), { couleur: C.x, epaisseur: 2.5, tirets: "7 5" });
    R.fleche(g, V.p(Oj), V.p(m.add(Oj, m.scale(xj, 1.1))), { couleur: C.x, epaisseur: 3.5 });
    R.texte(g, "X", m.add(V.p(m.add(Oj, m.scale(xj, 1.1))), [12, 6]), { couleur: C.x, ind: "j", taille: 22 });
    R.fleche(g, V.p(Oj), V.p(m.add(Oj, m.scale(yj, 0.8))), { couleur: C.y, epaisseur: 2.5 });
    R.texte(g, "Y", m.add(V.p(m.add(Oj, m.scale(yj, 0.8))), [8, -6]), { couleur: C.y, ind: "j", taille: 20 });
    R.texte(g, "normale commune", m.add(V.p(m.scale(m.add(H, Oj), 0.5)), [0, -16]), { taille: 17, couleur: C.x, italique: false });
    // angles droits : petits repères
    [H, Oj].forEach(function (p) { R.point(g, V.p(p), { r: 5, couleur: C.fonce }); });
    R.texte(g, "O", m.add(V.p(Oj), [-6, 30]), { ind: "j", taille: 20 });
    R.point(g, V.p([0, 0, 0]), { r: 5, couleur: C.fonce });
    R.texte(g, "O", m.add(V.p([0, 0, 0]), [-28, 6]), { ind: "j−1", taille: 20 });
  }
  R.orbite(f.svg, V, dessiner, tourne);
  dessiner();
})();
