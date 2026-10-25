/* Figure : INR selon le temps du patient et l'ISI ; droite de Clauss en coordonnées log-log. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C, K = A.calc;

  var f = R.figure("fig-coagulometres", {
    largeur: 960, hauteur: 540, titre: "Du temps mesuré au résultat : INR et fibrinogène",
    essai: "<strong>Essaie</strong> : allonge le TP du patient, puis change l'ISI ; passe ensuite à la méthode de Clauss. <strong>Observe</strong> : l'INR corrige la sensibilité du réactif ; pour le fibrinogène, un temps plus long veut dire moins de fibrinogène."
  });
  var g = A.s("g", null, f.svg), mode = 0, TEM = 12, AL = -1, BB = Math.log10(30);
  var b = R.boutons(f.reglages), bts = [R.bouton(b, "INR", function () { mode = 0; dessiner(); }), R.bouton(b, "Clauss", function () { mode = 1; dessiner(); })];
  var ct = R.curseur(f.reglages, { nom: "Temps", min: 8, max: 45, pas: 0.5, val: 24, unite: " s", dec: 1 });
  var ci = R.curseur(f.reglages, { nom: "ISI", min: 0.9, max: 2, pas: 0.1, val: 1, unite: "", dec: 1 });
  var zone = R.h("div", null, "", f.direct);
  function axes(x0, x1, y0, y1, tx, ty) {
    A.s("line", { x1: x0, y1: y0, x2: x1, y2: y0, stroke: C.encre, "stroke-width": 3 }, g);
    A.s("line", { x1: x0, y1: y0, x2: x0, y2: y1, stroke: C.encre, "stroke-width": 3 }, g);
    A.texte(g, tx, [x1 - 90, y0 + 58], { taille: 18, gras: 700 }); A.texte(g, ty, [x0 + 80, y1 - 16], { taille: 18, gras: 700 });
  }
  function dessiner() {
    bts.forEach(function (bt, i) { bt.classList.toggle("actif", i === mode); });
    ci.input.disabled = mode === 1;
    A.vider(g);
    var t = ct.v, x0 = 110, x1 = 900, y0 = 460, y1 = 60;
    if (mode === 0) {
      var inr = K.inr(t, TEM, ci.v), X = function (s) { return x0 + (s - 8) / 37 * (x1 - x0); }, Y = function (v) { return y0 - Math.min(v, 6) / 6 * (y0 - y1); };
      axes(x0, x1, y0, y1, "TP du patient (s)", "INR");
      [12, 20, 30, 40].forEach(function (s) { A.texte(g, String(s), [X(s), y0 + 24], { taille: 16, coul: C.doux, gras: 600 }); });
      [1, 2, 3, 4, 5].forEach(function (v) { A.texte(g, String(v), [x0 - 22, Y(v)], { taille: 16, coul: C.doux, gras: 600 }); });
      var pts = []; for (var s = 8; s <= 45; s += 0.5) pts.push([X(s), Y(K.inr(s, TEM, ci.v))]);
      A.s("polyline", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: "none", stroke: C.jeu, "stroke-width": 4 }, g);
      A.s("line", { x1: X(TEM), y1: y0, x2: X(TEM), y2: Y(1), stroke: C.doux, "stroke-width": 2, "stroke-dasharray": "6 5" }, g);
      A.texte(g, "témoin 12 s : INR 1", [X(TEM) + 90, Y(1) + 26], { taille: 16, gras: 700, coul: C.doux });
      A.s("circle", { cx: X(t), cy: Y(inr), r: 11, fill: C.jeu, stroke: "#fff", "stroke-width": 3 }, g);
      zone.innerHTML = "\\(\\text{INR} = \\left(\\dfrac{" + R.fmt(t, 1) + "}{12}\\right)^{" + R.fmt(ci.v, 1) + "} = " + R.fmt(inr, 2) + "\\)";
    } else {
      var lx = function (s) { return x0 + (Math.log10(s) - Math.log10(8)) / (Math.log10(45) - Math.log10(8)) * (x1 - x0); };
      var lc = function (c) { return y0 - (Math.log10(c) - Math.log10(0.5)) / (Math.log10(5) - Math.log10(0.5)) * (y0 - y1); };
      axes(x0, x1, y0, y1, "temps t (s, log)", "fibrinogène (g/L, log)");
      [8, 10, 15, 20, 30, 45].forEach(function (s) { A.texte(g, String(s), [lx(s), y0 + 24], { taille: 16, coul: C.doux, gras: 600 }); });
      [0.5, 1, 2, 3, 5].forEach(function (c) { A.texte(g, R.fmt(c, c < 1 ? 1 : 0), [x0 - 26, lc(c)], { taille: 16, coul: C.doux, gras: 600 }); });
      var c0 = K.clauss(8, AL, BB), c1 = K.clauss(45, AL, BB), cc = K.clauss(t, AL, BB);
      A.s("line", { x1: lx(8), y1: lc(Math.min(5, c0)), x2: lx(45), y2: lc(Math.max(0.5, c1)), stroke: C.jeu, "stroke-width": 4 }, g);
      A.s("polyline", { points: [lx(t), y0, lx(t), lc(cc), x0, lc(cc)].join(","), fill: "none", stroke: C.v, "stroke-width": 3, "stroke-dasharray": "9 6" }, g);
      A.s("circle", { cx: lx(t), cy: lc(cc), r: 11, fill: C.v, stroke: "#fff", "stroke-width": 3 }, g);
      zone.innerHTML = "Droite d'étalonnage d'exemple : \\(\\log C = -\\log t + \\log 30\\), donc \\(C = " + R.fmt(cc, 2) + "\\) g/L pour \\(t = " + R.fmt(t, 1) + "\\) s";
    }
    if (window.renderMathInElement) window.renderMathInElement(zone, { delimiters: [{ left: "\\(", right: "\\)", display: false }], throwOnError: false });
  }
  ct.surChange(dessiner); ci.surChange(dessiner);
  dessiner();
})();
