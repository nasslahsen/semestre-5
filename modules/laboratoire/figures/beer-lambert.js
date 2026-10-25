/* Figure : une cuve traversée par la lumière ; concentration et trajet optique règlent T et A ; droite A = ε l c. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C, K = A.calc;

  var f = R.figure("fig-beer-lambert", {
    largeur: 960, hauteur: 540, titre: "Transmittance et absorbance d'une solution",
    essai: "<strong>Essaie</strong> : augmente la concentration, puis le trajet optique. <strong>Observe</strong> : la lumière transmise baisse de plus en plus lentement, mais l'absorbance monte en ligne droite."
  });
  var g = A.s("g", null, f.svg), EPS = 2000;   // ε fixé pour la figure (L·mol⁻¹·cm⁻¹), c en mmol/L
  var cc = R.curseur(f.reglages, { nom: "c", min: 0, max: 0.5, pas: 0.01, val: 0.15, unite: " mmol/L", dec: 2 });
  var cl = R.curseur(f.reglages, { nom: "l", min: 0.5, max: 2, pas: 0.5, val: 1, unite: " cm", dec: 1 });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    var c = cc.v, l = cl.v, Ab = K.beer(EPS, l, c / 1000), T = K.transDepuisA(Ab);
    A.vider(g);
    // faisceau incident et transmis
    var y = 190, xc = 220, wc = 70 * l + 20;
    A.s("rect", { x: 30, y: y - 30, width: xc - 30, height: 60, fill: C.jeuPale }, g);
    A.texte(g, "I₀", [80, y - 50], { taille: 24, gras: 800, coul: C.jeu });
    A.s("rect", { x: xc, y: y - 90, width: wc, height: 180, rx: 6, fill: "rgba(201,42,42," + Math.min(0.9, 0.1 + c * 1.6) + ")", stroke: C.encre, "stroke-width": 3 }, g);
    A.texte(g, "l = " + R.fmt(l, 1) + " cm", [xc + wc / 2, y + 120], { taille: 18, gras: 700 });
    var h = 60 * T;
    A.s("rect", { x: xc + wc, y: y - h / 2, width: 470 - xc - wc, height: Math.max(1, h), fill: C.jeuPale }, g);
    A.texte(g, "It", [430, y - 50], { taille: 24, gras: 800, coul: C.jeu });
    A.texte(g, "T = " + R.fmt(T * 100, 0) + " %", [250, 400], { taille: 30, gras: 800 });
    A.texte(g, "A = " + R.fmt(Ab, 2), [250, 450], { taille: 30, gras: 800, coul: C.jeu });
    // droite A en fonction de c (pour le trajet choisi)
    var gx0 = 560, gx1 = 920, gy0 = 470, gy1 = 70, amax = 2, X = function (v) { return gx0 + v / 0.5 * (gx1 - gx0); }, Y = function (a) { return gy0 - Math.min(a, amax) / amax * (gy0 - gy1); };
    A.s("line", { x1: gx0, y1: gy0, x2: gx1, y2: gy0, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("line", { x1: gx0, y1: gy0, x2: gx0, y2: gy1, stroke: C.encre, "stroke-width": 3 }, g);
    A.texte(g, "c", [gx1 + 4, gy0 + 28], { taille: 20, gras: 800 }); A.texte(g, "A", [gx0 - 22, gy1 + 6], { taille: 20, gras: 800 });
    var cmax = Math.min(0.5, amax / (EPS * l / 1000));
    A.s("line", { x1: X(0), y1: Y(0), x2: X(cmax), y2: Y(K.beer(EPS, l, cmax / 1000)), stroke: C.jeu, "stroke-width": 4 }, g);
    A.s("circle", { cx: X(c), cy: Y(Ab), r: 10, fill: C.jeu, stroke: "#fff", "stroke-width": 3 }, g);
    zone.innerHTML = "\\(A = \\varepsilon \\, l \\, c = 2\\,000 \\times " + R.fmt(l, 1) + " \\times " + R.fmt(c / 1000, 5) + " = " + R.fmt(Ab, 2) + "\\) et \\(T = 10^{-A} = " + R.fmt(T, 2) + "\\)";
    if (window.renderMathInElement) window.renderMathInElement(zone, { delimiters: [{ left: "\\(", right: "\\)", display: false }], throwOnError: false });
  }
  cc.surChange(dessiner); cl.surChange(dessiner);
  dessiner();
})();
