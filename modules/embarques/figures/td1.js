(function () {
  "use strict";
  var R = RM, C = EMB.C;

  /* ---------- Le montage de la figure 5 : choisir un capteur, lire VA ---------- */
  (function () {
    var f = R.figure("fig-td1", {
      largeur: 960, hauteur: 540,
      titre: "Le circuit de mesure de la figure 5 : multiplexeur, AOP et ADC",
      essai: "<strong>Essaie</strong> : change S1, S2, S3, puis fais varier la résistance du capteur choisi. <strong>Observe</strong> : S3 S2 S1 lu en binaire donne le numéro de la voie. \\(V_A\\) ne descend jamais sous 0,275&nbsp;V, et sature à 3,3&nbsp;V quand \\(R_{FSR}\\) passe sous 68&nbsp;kΩ.",
      direct: true
    });
    var g = EMB.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var b1 = R.bascule(f.reglages, "S1", true, dessiner), b2 = R.bascule(f.reglages, "S2", true, dessiner), b3 = R.bascule(f.reglages, "S3", true, dessiner);
    var cr = R.curseur(f.reglages, { nom: "RFSR", min: 20, max: 1000, pas: 5, val: 150, unite: " kΩ", surChange: dessiner });
    var VP = 3.3 * 10 / 120;
    function dessiner() {
      EMB.vider(g);
      var k = (b1.checked ? 1 : 0) + (b2.checked ? 2 : 0) + (b3.checked ? 4 : 0), Rk = cr.v;
      var va = VP * (1 + 750 / Rk), sat = va > 3.3, vaa = Math.min(va, 3.3);
      // les 8 capteurs, point commun à la masse ; le multiplexeur dessous, pour garder les noms des voies visibles
      EMB.el("rect", { x: 250, y: 70, width: 140, height: 440, rx: 8, fill: "#fff", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.el("line", { x1: 50, y1: 95, x2: 50, y2: 500, stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.el("path", { d: "M34 500 H66 M40 509 H60 M46 518 H54", stroke: C.encre, "stroke-width": 2.5 }, g);
      for (var i = 0; i < 8; i++) {
        var y = 95 + i * 52, on = i === k, c = on ? C.acc : C.gris;
        EMB.el("line", { x1: 50, y1: y, x2: 80, y2: y, stroke: c, "stroke-width": 2.5 }, g);
        EMB.el("rect", { x: 80, y: y - 11, width: 90, height: 22, rx: 4, fill: on ? C.clair : "#fff", stroke: c, "stroke-width": on ? 3 : 2 }, g);
        EMB.texte(g, "RFSR" + (i + 1), [125, y], { taille: 16, coul: on ? C.encre : C.doux, gras: on, halo: false });
        EMB.el("line", { x1: 170, y1: y, x2: 250, y2: y, stroke: c, "stroke-width": 2.5 }, g);
        EMB.texte(g, "Y" + i, [268, y], { taille: 16, mono: true, coul: on ? C.acc : C.doux, ancre: "start" });
      }
      // multiplexeur
      EMB.texte(g, "NX3L4051", [320, 50], { taille: 17 });
      var yk = 95 + k * 52;
      EMB.el("line", { x1: 300, y1: yk, x2: 380, y2: 290, stroke: C.acc, "stroke-width": 4, "stroke-linecap": "round" }, g);
      EMB.texte(g, "Z", [372, 268], { taille: 16, mono: true });
      // AOP
      EMB.el("line", { x1: 390, y1: 290, x2: 540, y2: 290, stroke: C.acc, "stroke-width": 2.5 }, g);
      EMB.el("polygon", { points: "540,260 540,380 640,320", fill: "#fff", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.texte(g, "−", [556, 290], { taille: 22 }); EMB.texte(g, "+", [556, 350], { taille: 22 });
      // RG et CF en contre-réaction
      EMB.el("path", { d: "M500 290 V180 H560 M620 180 H680 V320", fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.el("rect", { x: 560, y: 169, width: 60, height: 22, rx: 4, fill: "#fff", stroke: C.encre, "stroke-width": 2 }, g);
      EMB.texte(g, "RG = 750 kΩ", [590, 148], { taille: 16, gras: false });
      EMB.el("path", { d: "M500 180 V120 H584 M596 120 H680 V180 M584 104 V136 M596 104 V136", fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.texte(g, "CF", [630, 100], { taille: 16, gras: false });
      // pont RA, RB sur l'entrée +
      EMB.el("path", { d: "M540 350 H480 V420", fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.el("path", { d: "M420 420 H540", fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.el("rect", { x: 425, y: 409, width: 44, height: 22, rx: 4, fill: "#fff", stroke: C.encre, "stroke-width": 2 }, g);
      EMB.texte(g, "RA", [447, 450], { taille: 15, gras: false });
      EMB.texte(g, "VDD", [418, 395], { taille: 15, gras: false, ancre: "start" });
      EMB.el("rect", { x: 529, y: 430, width: 22, height: 44, rx: 4, fill: "#fff", stroke: C.encre, "stroke-width": 2 }, g);
      EMB.el("path", { d: "M540 420 V430 M540 474 V490 M526 490 H554", fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.texte(g, "RB", [572, 452], { taille: 15, gras: false });
      EMB.texte(g, "V+ = 0,275 V", [480, 520], { taille: 16, coul: C.doux, gras: false });
      // sortie VA vers l'ADC : jauge 0 à 3,3 V
      EMB.el("line", { x1: 640, y1: 320, x2: 760, y2: 320, stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.texte(g, "AIN1", [722, 300], { taille: 15, mono: true, coul: C.doux });
      var x0 = 790, yb = 480, H = 380, ys = function (v) { return yb - v / 3.3 * H; };
      EMB.el("rect", { x: x0, y: yb - H, width: 44, height: H, rx: 6, fill: C.fond, stroke: C.pale, "stroke-width": 2 }, g);
      EMB.el("rect", { x: x0, y: ys(vaa), width: 44, height: yb - ys(vaa), rx: 6, fill: sat ? C.ko : C.acc, opacity: 0.85 }, g);
      [0, 1.1, 2.2, 3.3].forEach(function (v) { EMB.texte(g, EMB.virgule(v) + " V", [x0 + 56, ys(v)], { taille: 14, mono: true, coul: C.doux, ancre: "start", gras: false }); });
      EMB.el("line", { x1: x0 - 6, y1: ys(VP), x2: x0 + 50, y2: ys(VP), stroke: C.encre, "stroke-width": 2, "stroke-dasharray": "5 4" }, g);
      EMB.texte(g, "VA", [x0 + 22, 72], { taille: 18 });
      EMB.texte(g, "voie Y" + k + " : S3 S2 S1 = " + (b3.checked ? 1 : 0) + (b2.checked ? 1 : 0) + (b1.checked ? 1 : 0), [x0 + 22, 515], { taille: 15, mono: true, coul: C.acc });
      R.rendre(zone, "V_A = 0{,}275 \\times \\left(1 + \\frac{750}{" + R.tc(Rk, 0) + "}\\right) = " + R.tc(va, 2) + "\\ \\text{V}" + (sat ? " > 3{,}3\\ \\text{V : saturé}" : ""));
    }
    dessiner();
  })();
})();
