// TD 2 semelle, programmation : du capteur au code lu par l'ADC (et retour).
// Chaque figure ne se dessine que si sa place est sur la page.
(function () {
  "use strict";
  var R = RM, C = EMB.C, el = EMB.el, tx = EMB.texte, vg = EMB.virgule;
  function place(id) { return document.getElementById(id); }

  /* ---------- Le code lu en fonction de la force ---------- */
  if (place("fig-td2-chaine")) (function () {
    var f = R.figure("fig-td2-chaine", { largeur: 960, hauteur: 540, titre: "Le code lu par l'ADC en fonction de la force sur le capteur",
      essai: "<strong>Essaie</strong> : fais varier la force. <strong>Observe</strong> : sans appui, le code reste vers 341 (0,275&nbsp;V) ; il monte vite aux faibles forces, puis de moins en moins, sans jamais atteindre 4095. Le programme fait le chemin inverse : du code à la résistance, puis à la force.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cf = R.curseur(f.reglages, { nom: "Force", min: 0.5, max: 100, pas: 0.5, val: 8, unite: " N", dec: 1, surChange: dessiner });
    var VP = 3.3 * 10 / 120, x0 = 110, y0 = 470, W = 800, H = 400;
    function rf(F) { return 71 + 629 / F; }              // kΩ
    function code(F) { return Math.round(VP * (1 + 750 / rf(F)) * 4095 / 3.3); }
    function X(F) { return x0 + F / 100 * W; }
    function Y(c) { return y0 - c / 4095 * H; }
    function dessiner() {
      EMB.vider(g);
      // axes et graduations
      el("line", { x1: x0, y1: y0, x2: x0 + W + 10, y2: y0, stroke: C.encre, "stroke-width": 2.5 }, g);
      el("line", { x1: x0, y1: y0, x2: x0, y2: y0 - H - 20, stroke: C.encre, "stroke-width": 2.5 }, g);
      [0, 25, 50, 75, 100].forEach(function (F) {
        el("line", { x1: X(F), y1: y0, x2: X(F), y2: y0 + 8, stroke: C.encre, "stroke-width": 2 }, g);
        tx(g, String(F), [X(F), y0 + 28], { taille: 16, gras: false, mono: true });
      });
      [0, 1000, 2000, 3000, 4095].forEach(function (c) {
        el("line", { x1: x0 - 8, y1: Y(c), x2: x0, y2: Y(c), stroke: C.encre, "stroke-width": 2 }, g);
        tx(g, String(c), [x0 - 14, Y(c)], { taille: 16, gras: false, mono: true, ancre: "end" });
      });
      tx(g, "F (N)", [x0 + W, y0 + 56], { taille: 17, ancre: "end", gras: false });
      tx(g, "code ADC", [x0 + 8, y0 - H - 34], { taille: 17, ancre: "start", gras: false });
      // limites : sans appui et pleine échelle
      el("line", { x1: x0, y1: Y(341), x2: x0 + W, y2: Y(341), stroke: C.gris, "stroke-width": 2, "stroke-dasharray": "8 6" }, g);
      tx(g, "sans appui : 341", [x0 + W - 4, Y(341) + 20], { taille: 16, ancre: "end", gras: false, coul: C.doux });
      el("line", { x1: x0, y1: Y(4095), x2: x0 + W, y2: Y(4095), stroke: C.gris, "stroke-width": 2, "stroke-dasharray": "8 6" }, g);
      tx(g, "pleine échelle : 4095 (3,3 V)", [x0 + W - 4, Y(4095) + 20], { taille: 16, ancre: "end", gras: false, coul: C.doux });
      // courbe
      var d = "";
      for (var F = 0.5; F <= 100.01; F += 0.5) d += (d ? " L" : "M") + X(F).toFixed(1) + " " + Y(code(F)).toFixed(1);
      el("path", { d: d, fill: "none", stroke: C.acc, "stroke-width": 4 }, g);
      // point courant
      var Fc = cf.v, c = code(Fc);
      el("line", { x1: X(Fc), y1: y0, x2: X(Fc), y2: Y(c), stroke: C.bleu, "stroke-width": 2, "stroke-dasharray": "5 5" }, g);
      el("line", { x1: x0, y1: Y(c), x2: X(Fc), y2: Y(c), stroke: C.bleu, "stroke-width": 2, "stroke-dasharray": "5 5" }, g);
      el("circle", { cx: X(Fc), cy: Y(c), r: 9, fill: C.bleu, stroke: "#fff", "stroke-width": 3 }, g);
      tx(g, "code " + c, [X(Fc) + (Fc > 70 ? -16 : 16), Y(c) - 26], { taille: 18, mono: true, ancre: Fc > 70 ? "end" : "start", coul: C.bleu });
      var va = c * 3.3 / 4095;
      R.rendre(zone, "F = " + vg(Fc, 1) + "\\ \\text{N} \\;\\to\\; R_{FSR} = " + R.tc(rf(Fc), 0) + "\\ \\text{k}\\Omega \\;\\to\\; V_A = " + R.tc(va, 3) + "\\ \\text{V} \\;\\to\\; \\text{code} = " + c);
    }
    dessiner();
  })();
})();
