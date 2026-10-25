/* Figure : courbe de calibration à partir de calibrateurs ; lecture d'un patient ; courbe linéaire ou non linéaire. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-calibration", {
    largeur: 960, hauteur: 540, titre: "Lire une concentration sur la courbe de calibration",
    essai: "<strong>Essaie</strong> : déplace le signal du patient, puis passe en courbe non linéaire. <strong>Observe</strong> : on lit la courbe à l'envers ; si elle se courbe, une droite tirée par deux points donnerait un résultat faux."
  });
  var g = A.s("g", null, f.svg), lin = true;
  var cs = R.curseur(f.reglages, { nom: "Signal", min: 0.05, max: 0.9, pas: 0.01, val: 0.42, unite: "", dec: 2 });
  var b = R.boutons(f.reglages), bl = R.bouton(b, "Linéaire", function () { lin = true; dessiner(); }), bn = R.bouton(b, "Non linéaire", function () { lin = false; dessiner(); });
  var zone = R.h("div", null, "", f.direct);
  // signal en fonction de la concentration (mmol/L) ; non linéaire : saturation douce
  function sig(c) { return lin ? 0.06 * c : 1.0 * (1 - Math.exp(-c / 8)); }
  function inv(s) { return lin ? s / 0.06 : -8 * Math.log(1 - s); }
  var CAL = [2, 5, 10, 15];
  function dessiner() {
    bl.classList.toggle("actif", lin); bn.classList.toggle("actif", !lin);
    A.vider(g);
    var gx0 = 110, gx1 = 900, gy0 = 460, gy1 = 50, X = function (c) { return gx0 + c / 16 * (gx1 - gx0); }, Y = function (s) { return gy0 - s / 1 * (gy0 - gy1); };
    A.s("line", { x1: gx0, y1: gy0, x2: gx1, y2: gy0, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("line", { x1: gx0, y1: gy0, x2: gx0, y2: gy1, stroke: C.encre, "stroke-width": 3 }, g);
    A.texte(g, "concentration (mmol/L)", [gx1 - 130, gy0 + 50], { taille: 18, gras: 700 });
    A.texte(g, "signal", [gx0 + 40, gy1 - 16], { taille: 18, gras: 700 });
    [0, 4, 8, 12, 16].forEach(function (c) { A.texte(g, String(c), [X(c), gy0 + 24], { taille: 16, coul: C.doux, gras: 600 }); });
    var pts = []; for (var c = 0; c <= 16; c += 0.25) pts.push([X(c), Y(sig(c))]);
    A.s("polyline", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: "none", stroke: C.jeu, "stroke-width": 4 }, g);
    CAL.forEach(function (c) { A.s("rect", { x: X(c) - 10, y: Y(sig(c)) - 10, width: 20, height: 20, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, g); });
    var s = cs.v, ok = s < (lin ? 0.96 : 0.86), cp = ok ? inv(s) : null;
    if (ok && cp <= 16) {
      A.s("polyline", { points: [gx0, Y(s), X(cp), Y(s), X(cp), gy0].join(","), fill: "none", stroke: C.v, "stroke-width": 3, "stroke-dasharray": "9 6" }, g);
      A.s("circle", { cx: X(cp), cy: Y(s), r: 11, fill: C.v, stroke: "#fff", "stroke-width": 3 }, g);
    }
    if (!lin) {
      // droite tirée entre les deux premiers calibrateurs, prolongée
      var p = (sig(5) - sig(2)) / 3, o = sig(2) - p * 2;
      A.s("line", { x1: X(0), y1: Y(o), x2: X(Math.min(16, (1 - o) / p)), y2: Y(Math.min(1, o + p * 16)), stroke: C.ko, "stroke-width": 3, "stroke-dasharray": "6 6" }, g);
      A.texte(g, "droite par deux points", [X(9), Y(o + p * 9) - 26], { taille: 17, gras: 700, coul: C.ko });
    }
    zone.innerHTML = cp !== null && cp <= 16 ? "Signal " + R.fmt(s, 2) + " : concentration lue " + R.fmt(cp, 1) + " mmol/L" + (cp > 15 ? ", au-delà du dernier calibrateur (15 mmol/L) : lecture non vérifiée." : ".") : "Signal hors de la courbe.";
  }
  cs.surChange(dessiner);
  dessiner();
})();
