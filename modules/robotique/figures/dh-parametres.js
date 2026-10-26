(function () {
  "use strict";
  var R = RM, C = R.C, m = R.m;

  var f = R.figure("fig-dh-params", {
    largeur: 960, hauteur: 540,
    titre: "Du repère j−1 au repère j en quatre mouvements",
    essai: "<strong>Essaie</strong> : règle \\(\\theta_j\\), \\(r_j\\), \\(d_j\\), \\(\\alpha_j\\), puis avance dans les quatre étapes. " +
      "<strong>Observe</strong> : on tourne de \\(\\theta_j\\) autour de \\(Z_{j-1}\\), on monte de \\(r_j\\) le long de \\(Z_{j-1}\\), on avance de \\(d_j\\) le long du nouvel axe \\(X\\), on tourne de \\(\\alpha_j\\) autour de lui. La matrice se construit un facteur à la fois."
  });
  var V = R.vue3D(300, 390, 120, -20 * R.DEG, 26 * R.DEG);
  var g = R.el("g", null, f.svg);
  var ct = R.curseur(f.reglages, { nom: "θⱼ", min: -90, max: 120, pas: 1, val: 50, unite: "°", surChange: dessiner });
  var cr = R.curseur(f.reglages, { nom: "rⱼ", min: 0, max: 2, pas: 0.1, val: 1, surChange: dessiner });
  var cd = R.curseur(f.reglages, { nom: "dⱼ", min: 0, max: 3, pas: 0.1, val: 2.2, surChange: dessiner });
  var ca = R.curseur(f.reglages, { nom: "αⱼ", min: -90, max: 90, pas: 1, val: -45, unite: "°", surChange: dessiner });
  var b1 = R.boutons(f.reglages);
  var tourne = R.basculeOrbite(b1);
  var k = 4;
  var et = R.etapes(f.reglages, 4, ["repère j−1", "rotation θⱼ autour de Z", "translation rⱼ le long de Z", "translation dⱼ le long de X", "rotation αⱼ autour de X"], function (n) { k = n; dessiner(); });
  var zone = R.h("div", null, "", f.direct);

  function Rz(t) { return [[Math.cos(t), -Math.sin(t), 0, 0], [Math.sin(t), Math.cos(t), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]; }
  function Rx(a) { return [[1, 0, 0, 0], [0, Math.cos(a), -Math.sin(a), 0], [0, Math.sin(a), Math.cos(a), 0], [0, 0, 0, 1]]; }
  function Tz(r) { return [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, r], [0, 0, 0, 1]]; }
  function Tx(d) { return [[1, 0, 0, d], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]; }

  function dessiner() {
    if (!et) return;
    R.vider(g);
    var t = ct.v * R.DEG, r = cr.v, d = cd.v, a = ca.v * R.DEG;
    var fac = [Rz(t), Tz(r), Tx(d), Rx(a)], T = m.identite(4);
    for (var i = 0; i < k; i++) T = m.matMul(T, fac[i]);
    for (var q = -1; q <= 3; q++) {
      R.ligne(g, V.p([q, -1, 0]), V.p([q, 3, 0]), { couleur: "#e9ecf2", epaisseur: 1 });
      R.ligne(g, V.p([-1, q, 0]), V.p([3, q, 0]), { couleur: "#e9ecf2", epaisseur: 1 });
    }
    // repère j-1
    R.ligne(g, V.p([0, 0, -0.6]), V.p([0, 0, 3]), { couleur: C.z, epaisseur: 1.5, opacite: 0.5 });
    R.repere3D(g, V, [0, 0, 0], m.identite(3), { longueur: 1, noms: ["X", "Y", "Z"], indice: "j−1", opacite: k ? 0.4 : 1 });
    // trajet : H puis O_j
    if (k >= 2) R.ligne(g, V.p([0, 0, 0]), V.p([0, 0, r]), { couleur: C.acc, epaisseur: 4 });
    if (k >= 3) R.ligne(g, V.p([0, 0, r]), V.p([d * Math.cos(t), d * Math.sin(t), r]), { couleur: C.acc, epaisseur: 4 });
    if (k >= 1) R.ligne(g, V.p([0, 0, 0]), V.p([1.3 * Math.cos(t), 1.3 * Math.sin(t), 0]), { couleur: C.gris, tirets: "4 4" });
    if (k >= 2) R.texte(g, "rⱼ", m.add(V.p([0, 0, r / 2]), [-24, 0]), { couleur: C.acc, taille: 19 });
    if (k >= 3) R.texte(g, "dⱼ", m.add(V.p([d * Math.cos(t) / 2, d * Math.sin(t) / 2, r]), [0, -14]), { couleur: C.acc, taille: 19 });
    // repère courant
    var Rot = [[T[0][0], T[0][1], T[0][2]], [T[1][0], T[1][1], T[1][2]], [T[2][0], T[2][1], T[2][2]]], O = [T[0][3], T[1][3], T[2][3]];
    if (k > 0) R.repere3D(g, V, O, Rot, { longueur: 1, noms: ["X", "Y", "Z"], indice: k === 4 ? "j" : "", epaisseur: 3.2 });
    if (k === 4) R.ligne(g, V.p(m.add(O, m.scale(m.colonne(Rot, 2), -1))), V.p(m.add(O, m.scale(m.colonne(Rot, 2), 2))), { couleur: C.z, epaisseur: 1.5, opacite: 0.5 });
    var noms = ["\\text{Rot}(z,\\theta_j)", "\\text{Trans}(z,r_j)", "\\text{Trans}(x,d_j)", "\\text{Rot}(x,\\alpha_j)"];
    R.rendre(zone, (k ? noms.slice(0, k).join("\\,") : "I") + " = " + R.texMat(T, 2));
  }
  R.orbite(f.svg, V, dessiner, tourne);
  et.aller(4);
})();
