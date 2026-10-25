/* Figure : potentiel d'une électrode sélective selon la concentration (échelle logarithmique), pente de Nernst selon T et n. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C, K = A.calc;

  var f = R.figure("fig-potentiometrie", {
    largeur: 960, hauteur: 540, titre: "Équation de Nernst : un pas de tension par décade",
    essai: "<strong>Essaie</strong> : fais varier la concentration, puis passe à un ion de charge 2. <strong>Observe</strong> : multiplier C par 10 ajoute toujours le même nombre de millivolts ; pour n = 2, ce pas est deux fois plus petit."
  });
  var g = A.s("g", null, f.svg);
  var cc = R.curseur(f.reglages, { nom: "log C", min: -1, max: 2, pas: 0.05, val: 0.5, unite: "", dec: 2 });
  var ct = R.curseur(f.reglages, { nom: "T", min: 15, max: 40, pas: 1, val: 25, unite: " °C", dec: 0 });
  var b = R.boutons(f.reglages), nn = 1, bts = [];
  [1, 2].forEach(function (k) { bts.push(R.bouton(b, "n = " + k, function () { nn = k; dessiner(); })); });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    var lc = cc.v, T = ct.v + 273.15, pente = K.penteNernst(T, nn), E = pente * lc;
    bts.forEach(function (bt, i) { bt.classList.toggle("actif", i + 1 === nn); });
    A.vider(g);
    var gx0 = 110, gx1 = 900, gy0 = 440, gy1 = 50, X = function (v) { return gx0 + (v + 1) / 3 * (gx1 - gx0); }, Y = function (e) { return gy0 - (e + 70) / 200 * (gy0 - gy1); };
    A.s("line", { x1: gx0, y1: gy0, x2: gx1, y2: gy0, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("line", { x1: gx0, y1: gy0, x2: gx0, y2: gy1, stroke: C.encre, "stroke-width": 3 }, g);
    [-1, 0, 1, 2].forEach(function (d) {
      A.s("line", { x1: X(d), y1: gy0, x2: X(d), y2: gy1, stroke: C.trait, "stroke-width": 2 }, g);
      A.texte(g, "C = " + R.fmt(Math.pow(10, d), d < 0 ? 1 : 0), [X(d), gy0 + 30], { taille: 17, gras: 600, coul: C.doux });
    });
    A.texte(g, "E (mV, par rapport à E⁰)", [gx0 + 120, gy1 - 18], { taille: 17, gras: 700 });
    A.s("line", { x1: X(-1), y1: Y(-pente), x2: X(2), y2: Y(2 * pente), stroke: C.jeu, "stroke-width": 5 }, g);
    // un pas de décade, de 0 à 1
    A.s("line", { x1: X(0), y1: Y(0), x2: X(1), y2: Y(0), stroke: C.v, "stroke-width": 3, "stroke-dasharray": "8 6" }, g);
    A.s("line", { x1: X(1), y1: Y(0), x2: X(1), y2: Y(pente), stroke: C.v, "stroke-width": 4 }, g);
    A.texte(g, R.fmt(pente, 1) + " mV", [X(1) + 70, Y(pente / 2)], { taille: 22, gras: 800, coul: C.v });
    A.s("circle", { cx: X(lc), cy: Y(E), r: 11, fill: C.jeu, stroke: "#fff", "stroke-width": 3 }, g);
    zone.innerHTML = "\\(E - E^{0} = \\dfrac{RT\\ln 10}{nF}\\log_{10} C = " + R.fmt(pente, 1) + " \\times " + R.fmt(lc, 2) + " = " + R.fmt(E, 1) + "\\ \\text{mV}\\)";
    if (window.renderMathInElement) window.renderMathInElement(zone, { delimiters: [{ left: "\\(", right: "\\)", display: false }], throwOnError: false });
  }
  cc.surChange(dessiner); ct.surChange(dessiner);
  dessiner();
})();
