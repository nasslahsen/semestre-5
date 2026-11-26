// TD bio-impédance : le diagramme de Nyquist du modèle de Cole, la détection synchrone.
// Chaque figure ne se dessine que si sa place est sur la page.
(function () {
  "use strict";
  var R = RM, C = EMB.C, el = EMB.el, tx = EMB.texte, vg = EMB.virgule;
  function place(id) { return document.getElementById(id); }

  /* ---------- Questions 16 et 17 : Nyquist, RE = 3 kΩ, RM = 5 kΩ, CM = 640 pF ---------- */
  if (place("fig-bioz-nyquist")) (function () {
    var f = R.figure("fig-bioz-nyquist", { largeur: 960, hauteur: 540, titre: "Le diagramme de Nyquist du tissu, de 5 Hz à 5 MHz",
      essai: "<strong>Essaie</strong> : fais monter la fréquence. <strong>Observe</strong> : le point part de 8 kΩ (le condensateur bloque), descend jusqu'au sommet à 49,7 kHz, puis remonte vers 3 kΩ (le condensateur court-circuite RM). La courbe est un demi-cercle.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cf = R.curseur(f.reglages, { nom: "log f", min: 0.7, max: 6.7, pas: 0.05, val: 4.7, dec: 2, surChange: dessiner });
    var RE = 3000, RMm = 5000, TAU = 5000 * 640e-12, x0 = 110, y0 = 120, k = 0.095; // k : pixels par ohm
    function X(re) { return x0 + re * k; }
    function Y(mim) { return y0 + mim * k; } // -Im vers le bas sous l'axe (Im négatif dessiné sous l'axe réel)
    function Z(fr) { var x = 2 * Math.PI * fr * TAU; return [RE + RMm / (1 + x * x), -RMm * x / (1 + x * x)]; }
    function dessiner() {
      EMB.vider(g);
      // axes
      el("line", { x1: x0 - 20, y1: y0, x2: X(8650), y2: y0, stroke: C.encre, "stroke-width": 2.5 }, g);
      el("line", { x1: x0, y1: y0 - 40, x2: x0, y2: Y(3000), stroke: C.encre, "stroke-width": 2.5 }, g);
      tx(g, "Re (Ω)", [X(8650), y0 + 54], { taille: 17, ancre: "end", gras: false });
      tx(g, "Im (Ω)", [x0 + 10, Y(3000) + 4], { taille: 17, ancre: "start", gras: false });
      [3000, 5500, 8000].forEach(function (v) {
        el("line", { x1: X(v), y1: y0 - 6, x2: X(v), y2: y0 + 6, stroke: C.encre, "stroke-width": 2 }, g);
        tx(g, vg(v / 1000) + " k", [X(v), y0 - 22], { taille: 16, mono: true, gras: false });
      });
      [-1000, -2000, -2500].forEach(function (v) {
        el("line", { x1: x0 - 6, y1: Y(-v), x2: x0 + 6, y2: Y(-v), stroke: C.encre, "stroke-width": 2 }, g);
        tx(g, "−" + vg(-v / 1000) + " k", [x0 - 12, Y(-v)], { taille: 16, mono: true, gras: false, ancre: "end" });
      });
      // le demi-cercle
      var d = "";
      for (var e = 0.7; e <= 6.701; e += 0.02) { var z = Z(Math.pow(10, e)); d += (d ? " L" : "M") + X(z[0]).toFixed(1) + " " + Y(-z[1]).toFixed(1); }
      el("path", { d: d, fill: "none", stroke: C.acc, "stroke-width": 4 }, g);
      // points remarquables
      [[8000, 0, "f = 0 : RE + RM"], [3000, 0, "f infinie : RE"], [5500, 2500, "sommet : 49,7 kHz"]].forEach(function (p, i) {
        el("circle", { cx: X(p[0]), cy: Y(p[1]), r: 6, fill: C.encre }, g);
        tx(g, p[2], [X(p[0]) + (i === 1 ? -10 : -18), Y(p[1]) + (p[1] ? 30 : 26)], { taille: 16, ancre: i === 1 ? "end" : (i === 0 ? "end" : "middle"), gras: false, coul: C.doux });
      });
      el("circle", { cx: X(5500), cy: y0, r: 4, fill: C.gris }, g);
      // le point courant
      var fr = Math.pow(10, cf.v), z0 = Z(fr);
      el("line", { x1: X(z0[0]), y1: y0, x2: X(z0[0]), y2: Y(-z0[1]), stroke: C.bleu, "stroke-width": 2, "stroke-dasharray": "5 5" }, g);
      el("circle", { cx: X(z0[0]), cy: Y(-z0[1]), r: 10, fill: C.bleu, stroke: "#fff", "stroke-width": 3 }, g);
      var ftxt = fr >= 1e6 ? R.tc(fr / 1e6, 2) + "\\ \\text{MHz}" : fr >= 1e3 ? R.tc(fr / 1e3, 1) + "\\ \\text{kHz}" : R.tc(fr, 0) + "\\ \\text{Hz}";
      R.rendre(zone, "f = " + ftxt + " \\quad \\underline{Z}_{BIO} = " + R.tc(z0[0], 0) + " - j\\," + R.tc(-z0[1], 0) + "\\ \\Omega");
    }
    dessiner();
  })();

  /* ---------- Question 27 : multiplier par le carré, garder la moyenne ---------- */
  if (place("fig-bioz-detection")) (function () {
    var f = R.figure("fig-bioz-detection", { largeur: 960, hauteur: 540, titre: "La détection synchrone : V_MES × P0°, puis la moyenne",
      essai: "<strong>Essaie</strong> : change le déphasage φ. <strong>Observe</strong> : le produit (en bas) a une moyenne (trait vert) qui suit cos φ : grande quand la tension est en phase, nulle à −90°. Le filtre ne garde que cette moyenne, proportionnelle à la partie réelle de l'impédance.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cp = R.curseur(f.reglages, { nom: "φ", min: -90, max: 0, pas: 5, val: -30, unite: "°", surChange: dessiner });
    var x0 = 90, W = 820, NP = 2;
    function X(t) { return x0 + t / NP * W; }
    function courbe(fn, yc, h, coul) {
      var d = "";
      for (var i = 0; i <= 400; i++) { var t = i / 400 * NP; d += (i ? " L" : "M") + X(t).toFixed(1) + " " + (yc - fn(t) * h).toFixed(1); }
      el("path", { d: d, fill: "none", stroke: coul, "stroke-width": 3 }, g);
    }
    function dessiner() {
      EMB.vider(g);
      var ph = cp.v * Math.PI / 180;
      function v(t) { return Math.sin(2 * Math.PI * t + ph); }
      function p(t) { return Math.sin(2 * Math.PI * t) >= 0 ? 1 : -1; }
      var rows = [[100, "V_MES", v, C.encre], [250, "P0°", p, C.v], [410, "V_MES × P0°", function (t) { return v(t) * p(t); }, C.acc]];
      rows.forEach(function (r) {
        el("line", { x1: x0, y1: r[0], x2: x0 + W, y2: r[0], stroke: C.pale, "stroke-width": 2 }, g);
        tx(g, r[1], [x0 - 10, r[0] - 66], { taille: 17, ancre: "start" });
        courbe(r[2], r[0], 50, r[3]);
      });
      var moy = 2 / Math.PI * Math.cos(ph);
      el("line", { x1: x0, y1: 410 - moy * 50, x2: x0 + W, y2: 410 - moy * 50, stroke: C.ok, "stroke-width": 4, "stroke-dasharray": "14 8" }, g);
      tx(g, "moyenne", [x0 + W, 410 - moy * 50 - 18], { taille: 17, ancre: "end", coul: C.ok });
      R.rendre(zone, "\\text{moyenne} = \\frac{2}{\\pi}\\cos\\varphi = " + R.tc(moy, 3) + " \\quad (\\varphi = " + cp.v + "^\\circ)");
    }
    dessiner();
  })();
})();
