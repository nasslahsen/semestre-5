/* Figure : graphique de Levey-Jennings ; une dérive à partir d'un jour donné fait sortir les contrôles. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C, K = A.calc;

  var f = R.figure("fig-metrologie-cqi", {
    largeur: 960, hauteur: 540, titre: "Suivre un contrôle jour après jour",
    essai: "<strong>Essaie</strong> : ajoute une dérive à partir du jour 11. <strong>Observe</strong> : les points passent tous du même côté, puis franchissent 2s, puis 3s ; le contrôle voit le problème avant les patients."
  });
  var g = A.s("g", null, f.svg);
  var cd = R.curseur(f.reglages, { nom: "Dérive", min: 0, max: 3, pas: 0.5, val: 0, unite: " s", dec: 1 });
  var zone = R.h("div", null, "", f.direct);
  var M = 5.5, S = 0.2, BRUIT = [0.3, -0.8, 0.5, -0.2, 1.1, -0.6, 0.1, 0.7, -1.2, 0.4, -0.3, 0.6, -0.5, 0.2, 0.9, -0.1, 0.4, -0.7, 0.3, 0.8];
  function dessiner() {
    var d = cd.v;
    A.vider(g);
    var x0 = 110, x1 = 920, Y = function (z) { return 270 - z * 60; }, X = function (i) { return x0 + 20 + i * (x1 - x0 - 40) / 19; };
    [[3, C.ko], [2, C.chaud], [0, C.encre], [-2, C.chaud], [-3, C.ko]].forEach(function (l) {
      A.s("line", { x1: x0, y1: Y(l[0]), x2: x1, y2: Y(l[0]), stroke: l[1], "stroke-width": l[0] ? 2.5 : 3, "stroke-dasharray": l[0] ? "9 6" : null }, g);
      A.texte(g, l[0] ? (l[0] > 0 ? "+" : "−") + Math.abs(l[0]) + "s" : "m", [x0 - 34, Y(l[0])], { taille: 18, gras: 800, coul: l[1] });
    });
    var pts = [], horsA = 0, horsR = 0;
    BRUIT.forEach(function (b, i) {
      var zz = K.z(M + (b + (i >= 10 ? d : 0)) * S, M, S);
      if (Math.abs(zz) > 3) horsR++; else if (Math.abs(zz) > 2) horsA++;
      pts.push({ p: [X(i), Y(Math.max(-3.8, Math.min(3.8, zz)))], c: Math.abs(zz) > 3 ? C.ko : Math.abs(zz) > 2 ? C.chaud : C.jeu });
    });
    A.s("polyline", { points: pts.map(function (q) { return q.p.join(","); }).join(" "), fill: "none", stroke: C.gris, "stroke-width": 2 }, g);
    pts.forEach(function (q) { A.s("circle", { cx: q.p[0], cy: q.p[1], r: 9, fill: q.c, stroke: "#fff", "stroke-width": 2 }, g); });
    A.texte(g, "jours", [x1 - 30, 530], { taille: 17, gras: 700 });
    A.s("line", { x1: X(9.5), y1: 30, x2: X(9.5), y2: 500, stroke: C.trait, "stroke-width": 2 }, g);
    zone.innerHTML = d ? "Dérive de " + R.fmt(d, 1) + " s à partir du jour 11 : " + horsA + " avertissement(s) au-delà de 2s, " + horsR + " rejet(s) au-delà de 3s." : "Sans dérive, les contrôles oscillent autour de la moyenne, dans les limites.";
  }
  cd.surChange(dessiner);
  dessiner();
})();
