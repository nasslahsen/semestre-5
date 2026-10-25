/* Figure : histogramme des volumes des GR ; VGM et dispersion règlent la courbe ; indices calculés en direct. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C, K = A.calc;

  var f = R.figure("fig-hemogramme", {
    largeur: 960, hauteur: 540, titre: "Histogramme des globules rouges et indices calculés",
    essai: "<strong>Essaie</strong> : déplace le VGM, puis élargis la courbe. <strong>Observe</strong> : le VGM déplace la cloche et change l'hématocrite ; la largeur ne change que l'IDR."
  });
  var g = A.s("g", null, f.svg);
  var cv = R.curseur(f.reglages, { nom: "VGM", min: 60, max: 120, pas: 1, val: 90, unite: " fL", dec: 0 });
  var ce = R.curseur(f.reglages, { nom: "Écart-type", min: 6, max: 24, pas: 1, val: 11, unite: " fL", dec: 0 });
  var zone = R.h("div", null, "", f.direct);
  var GR = 4.8, HB = 14.4;
  function dessiner() {
    var v = cv.v, e = ce.v, ht = K.hematocrite(GR, v), idr = K.idr(e, v), tcmh = K.tcmh(HB, GR), ccmh = K.ccmh(HB, ht);
    A.vider(g);
    var x0 = 80, x1 = 900, y0 = 420, X = function (fl) { return x0 + fl / 250 * (x1 - x0); };
    A.s("line", { x1: x0, y1: y0, x2: x1, y2: y0, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("line", { x1: x0, y1: y0, x2: x0, y2: 60, stroke: C.encre, "stroke-width": 3 }, g);
    [0, 50, 100, 150, 200, 250].forEach(function (q) { A.texte(g, String(q), [X(q), y0 + 26], { taille: 17, coul: C.doux, gras: 600 }); });
    A.texte(g, "volume (fL)", [x1 - 60, y0 + 56], { taille: 18, gras: 700 });
    A.texte(g, "nombre de cellules", [x0 + 90, 44], { taille: 18, gras: 700 });
    var pts = [[X(0), y0]], hmax = 320 * 11 / e;
    for (var fl = 0; fl <= 250; fl += 2) pts.push([X(fl), y0 - Math.min(340, hmax) * Math.exp(-Math.pow(fl - v, 2) / (2 * e * e))]);
    pts.push([X(250), y0]);
    A.s("polygon", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: C.koPale, stroke: C.sang, "stroke-width": 4 }, g);
    A.s("line", { x1: X(v), y1: y0, x2: X(v), y2: 60, stroke: C.jeu, "stroke-width": 3, "stroke-dasharray": "8 6" }, g);
    A.texte(g, "VGM " + v + " fL", [X(v) + 70, 80], { taille: 20, gras: 800, coul: C.jeu });
    A.texte(g, "GR " + R.fmt(GR, 2) + " × 10¹²/L · Hb " + R.fmt(HB, 1) + " g/dL", [490, 500], { taille: 20, gras: 700, coul: C.doux });
    zone.innerHTML = "Ht = " + R.fmt(ht, 1) + " % · TCMH = " + R.fmt(tcmh, 1) + " pg · CCMH = " + R.fmt(ccmh, 1) + " g/dL · IDR = " + R.fmt(idr, 1) + " %";
  }
  cv.surChange(dessiner); ce.surChange(dessiner);
  dessiner();
})();
