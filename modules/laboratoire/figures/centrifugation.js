/* Figure : force centrifuge relative selon le rayon du rotor et la vitesse ; séparation du sang dans le tube. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C, K = A.calc;

  var f = R.figure("fig-centrifugation", {
    largeur: 960, hauteur: 540, titre: "Force centrifuge relative et séparation du sérum",
    essai: "<strong>Essaie</strong> : règle la vitesse pour atteindre la bande verte, puis change le rayon. <strong>Observe</strong> : à vitesse égale, un rotor plus petit applique moins de force ; la force croît comme le carré de la vitesse.",
    directCote: false
  });
  var g = A.s("g", null, f.svg);
  var cr = R.curseur(f.reglages, { nom: "Rayon r", min: 5, max: 20, pas: 1, val: 10, unite: " cm", dec: 0 });
  var cn = R.curseur(f.reglages, { nom: "Vitesse N", min: 500, max: 6000, pas: 50, val: 3000, unite: " tr/min", dec: 0 });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    var r = cr.v, N = cn.v, rcf = K.rcf(r, N);
    A.vider(g);
    // rotor vu de dessus, rayon proportionnel
    var c = [250, 270], rp = 9 * r + 40, a = (N / 6000) * 0.9;
    A.s("circle", { cx: c[0], cy: c[1], r: rp + 20, fill: C.fond, stroke: C.encre, "stroke-width": 3 }, g);
    for (var k = 0; k < 6; k++) {
      var t = a + k * Math.PI / 3, p = [c[0] + rp * Math.cos(t), c[1] + rp * Math.sin(t)];
      A.s("circle", { cx: p[0], cy: p[1], r: 16, fill: k % 3 === 0 ? C.sang : "#fff", stroke: C.encre, "stroke-width": 2.5 }, g);
    }
    A.s("circle", { cx: c[0], cy: c[1], r: 10, fill: C.encre }, g);
    A.s("line", { x1: c[0], y1: c[1], x2: c[0] + rp, y2: c[1], stroke: C.jeu, "stroke-width": 4, "stroke-dasharray": "8 6" }, g);
    A.texte(g, "r = " + r + " cm", [c[0] + rp / 2, c[1] - 24], { taille: 20, gras: 800, coul: C.jeu });
    // jauge de RCF de 0 à 4000 × g, bande 2000 à 2500
    var x0 = 520, x1 = 920, y = 90, v = function (x) { return x0 + Math.min(1, x / 4000) * (x1 - x0); };
    A.texte(g, "force centrifuge relative", [720, 40], { taille: 18, coul: C.doux, gras: 600 });
    A.s("rect", { x: x0, y: y, width: x1 - x0, height: 30, rx: 8, fill: C.fond, stroke: C.trait, "stroke-width": 2 }, g);
    A.s("rect", { x: v(2000), y: y, width: v(2500) - v(2000), height: 30, fill: C.okPale, stroke: C.ok, "stroke-width": 2 }, g);
    A.s("rect", { x: x0, y: y + 8, width: v(rcf) - x0, height: 14, rx: 7, fill: C.jeu }, g);
    [0, 1000, 2000, 3000, 4000].forEach(function (q) { A.texte(g, R.fmt(q, 0), [v(q), y + 54], { taille: 16, coul: C.doux, gras: 500 }); });
    A.texte(g, R.fmt(rcf, 0) + " × g", [720, 200], { taille: 34, gras: 800, coul: rcf >= 2000 && rcf <= 2500 ? C.ok : C.encre });
    // tube : séparation selon la force atteinte (au-delà de 2000 × g, séparation nette)
    var sep = Math.min(1, rcf / 2000);
    var hCell = 0.42 + 0.4 * (1 - sep), hSer = 0.82 - hCell;
    A.tube(g, 690, 250, { bouchon: "sec", w: 60, h: 250, couches: sep < 0.15 ? [{ h: 0.82, coul: C.sang }] : [{ h: hCell, coul: "#8f1d1d" }, { h: hSer, coul: sep > 0.95 ? "#f5d76e" : "#e9a06a" }] });
    A.texte(g, sep > 0.95 ? "séparation nette" : "séparation incomplète", [820, 380], { taille: 18, gras: 700, coul: sep > 0.95 ? C.ok : C.doux, largeur: 140 });
    var force = R.fmt(rcf, 0).replace(/\s/g, "\\,");
    zone.innerHTML = "\\(\\text{RCF} = 1{,}118 \\times 10^{-5} \\times " + r + " \\times " + N + "^2 \\approx " + force + " \\times g\\)" +
      (rcf >= 2000 && rcf <= 2500 ? " : dans la bande 2 000 à 2 500 × g du sérum ou du plasma." : "");
    if (window.renderMathInElement) window.renderMathInElement(zone, { delimiters: [{ left: "\\(", right: "\\)", display: false }], throwOnError: false });
  }
  cr.surChange(dessiner); cn.surChange(dessiner);
  dessiner();
})();
