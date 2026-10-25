/* Figure : impact clinique et délai de réparation ; plus l'équipement est en haut à droite, plus le plan B doit être prêt. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-criticite", {
    largeur: 960, hauteur: 540, titre: "Impact clinique et délai de réparation",
    essai: "<strong>Essaie</strong> : choisis un équipement (positions d'exemple). <strong>Observe</strong> : quand l'impact clinique est fort et la réparation longue, il faut un plan de continuité prêt avant la panne."
  });
  var g = A.s("g", null, f.svg), sel = 0;
  var E = [
    { t: "Gaz du sang (réanimation)", p: [0.85, 0.7] },
    { t: "LIS", p: [0.8, 0.5] },
    { t: "Électricité", p: [0.95, 0.35] },
    { t: "Agitateur chauffant", p: [0.12, 0.25] },
    { t: "Microscope de paillasse", p: [0.3, 0.45] }
  ];
  var b = R.boutons(f.reglages), bts = E.map(function (e, i) { return R.bouton(b, e.t, function () { sel = i; dessiner(); }); });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    bts.forEach(function (bt, i) { bt.classList.toggle("actif", i === sel); });
    A.vider(g);
    var x0 = 110, x1 = 900, y0 = 460, y1 = 50, X = function (v) { return x0 + v * (x1 - x0); }, Y = function (v) { return y0 - v * (y0 - y1); };
    A.s("rect", { x: X(0.5), y: Y(1), width: X(1) - X(0.5), height: Y(0.5) - Y(1), fill: C.koPale }, g);
    A.s("rect", { x: X(0.5), y: Y(0.5), width: X(1) - X(0.5), height: Y(0) - Y(0.5), fill: C.chaudPale }, g);
    A.s("rect", { x: X(0), y: Y(1), width: X(0.5) - X(0), height: Y(0.5) - Y(1), fill: C.chaudPale }, g);
    A.s("line", { x1: x0, y1: y0, x2: x1, y2: y0, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("line", { x1: x0, y1: y0, x2: x0, y2: y1, stroke: C.encre, "stroke-width": 3 }, g);
    A.texte(g, "impact clinique d'une panne", [x1 - 150, y0 + 34], { taille: 18, gras: 800 });
    A.texte(g, "délai de réparation", [x0 + 100, y1 - 20], { taille: 18, gras: 800 });
    A.texte(g, "plan B prêt avant la panne", [X(0.75), Y(0.92)], { taille: 18, gras: 800, coul: C.ko });
    E.forEach(function (e, i) {
      var on = sel === i;
      A.s("circle", { cx: X(e.p[0]), cy: Y(e.p[1]), r: on ? 16 : 10, fill: on ? C.jeu : C.gris, stroke: "#fff", "stroke-width": 3 }, g);
      if (on) A.texte(g, e.t, [X(e.p[0]) - (e.p[0] > 0.7 ? 120 : -10), Y(e.p[1]) - 30], { taille: 19, gras: 800, coul: C.jeu });
    });
    var e = E[sel], crit = e.p[0] > 0.5 && e.p[1] > 0.5 ? "plan de continuité indispensable : secours ou sous-traitance prêts." : e.p[0] > 0.5 ? "impact fort : remise en service rapide à garantir, et un plan B." : "impact faible : la réparation peut attendre, l'incident est tout de même tracé.";
    zone.innerHTML = "<strong>" + e.t + "</strong> : " + crit;
  }
  dessiner();
})();
