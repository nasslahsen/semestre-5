/* Figure : la température dans un caisson pendant un trajet ; la traçabilité garde la preuve d'une rupture de froid. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-transport-robot", {
    largeur: 960, hauteur: 540, titre: "Traçabilité thermique d'un caisson de transport",
    essai: "<strong>Essaie</strong> : laisse le caisson ouvert plus ou moins longtemps au soleil pendant le trajet. <strong>Observe</strong> : l'enregistreur garde toute la courbe ; le capteur connecté alerte dès que +8 °C est dépassé."
  });
  var g = A.s("g", null, f.svg);
  var cu = R.curseur(f.reglages, { nom: "Ouvert", min: 0, max: 40, pas: 5, val: 15, unite: " min", dec: 0 });
  var zone = R.h("div", null, "", f.direct);
  function temp(t, ouv) { var base = 5 + 0.6 * Math.sin(t / 9); if (t >= 30 && t < 30 + ouv) base += Math.min(8, (t - 30) * 0.45); else if (t >= 30 + ouv) base += Math.max(0, Math.min(8, ouv * 0.45) - (t - 30 - ouv) * 0.35); return base; }
  function dessiner() {
    var ouv = cu.v;
    A.vider(g);
    var x0 = 100, x1 = 920, y0 = 450, y1 = 60, X = function (t) { return x0 + t / 120 * (x1 - x0); }, Y = function (T) { return y0 - (T - 0) / 16 * (y0 - y1); };
    A.s("rect", { x: x0, y: Y(8), width: x1 - x0, height: Y(2) - Y(8), fill: C.okPale }, g);
    A.s("line", { x1: x0, y1: y0, x2: x1, y2: y0, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("line", { x1: x0, y1: y0, x2: x0, y2: y1, stroke: C.encre, "stroke-width": 3 }, g);
    [0, 4, 8, 12, 16].forEach(function (T) { A.texte(g, T + " °C", [x0 - 40, Y(T)], { taille: 16, coul: C.doux, gras: 600 }); });
    [0, 30, 60, 90, 120].forEach(function (t) { A.texte(g, t + " min", [X(t), y0 + 26], { taille: 16, coul: C.doux, gras: 600 }); });
    A.texte(g, "plage +2 / +8 °C", [X(100), Y(5)], { taille: 17, gras: 800, coul: C.ok });
    var pts = [], alerte = null;
    for (var t = 0; t <= 120; t += 1) { var T = temp(t, ouv); pts.push([X(t), Y(T)]); if (alerte === null && T > 8) alerte = t; }
    A.s("polyline", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: "none", stroke: C.jeu, "stroke-width": 4 }, g);
    if (alerte !== null) {
      A.s("circle", { cx: X(alerte), cy: Y(8), r: 11, fill: C.ko, stroke: "#fff", "stroke-width": 3 }, g);
      A.texte(g, "alerte envoyée", [X(alerte) - 20, Y(8) + 34], { taille: 18, gras: 800, coul: C.ko });
    }
    zone.innerHTML = alerte !== null ? "Rupture de la chaîne du froid à " + alerte + " min : le capteur connecté alerte le laboratoire avant l'arrivée du coursier." : "Température restée entre +2 et +8 °C : l'enregistrement prouve le respect de la chaîne du froid.";
  }
  cu.surChange(dessiner);
  dessiner();
})();
