// TD 1 semelle : les figures de la correction (capteur, pont de jauges, Vo(P), modèle du capteur, figure 5 pas à pas, chronogramme, CF).
// Chaque figure ne se dessine que si sa place est sur la page.
(function () {
  "use strict";
  var R = RM, C = EMB.C, el = EMB.el, tx = EMB.texte, vg = EMB.virgule;
  function place(id) { return document.getElementById(id); }
  function axes(g, x0, y0, w, h, nx, ny) {
    el("line", { x1: x0, y1: y0, x2: x0 + w, y2: y0, stroke: C.encre, "stroke-width": 2.5 }, g);
    el("line", { x1: x0, y1: y0, x2: x0, y2: y0 - h, stroke: C.encre, "stroke-width": 2.5 }, g);
    tx(g, nx, [x0 + w, y0 + 56], { taille: 17, ancre: "end", gras: false });
    tx(g, ny, [x0 - 8, y0 - h - 22], { taille: 17, ancre: "start", gras: false });
  }

  /* ---------- Question 1 : la surface d'un capteur, en morceaux ---------- */
  if (place("fig-td1-capteur")) (function () {
    var f = R.figure("fig-td1-capteur", { largeur: 960, hauteur: 540, titre: "La surface active d'un capteur de la semelle",
      essai: "<strong>Essaie</strong> : coche « Découper ». <strong>Observe</strong> : la forme devient un rectangle \\(L \\times D\\) et deux demi-disques, qui font ensemble un disque entier de diamètre \\(D\\).", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var dec = R.bascule(f.reglages, "Découper", false, dessiner);
    var u = 22, cx = 480, cy = 250, D = 11 * u, L = 15 * u, r = D / 2, xa = cx - L / 2, xb = cx + L / 2;
    function dessiner() {
      EMB.vider(g);
      var d = dec.checked, ec = d ? 26 : 0;
      if (!d) {
        el("path", { d: "M" + xa + " " + (cy - r) + " H" + xb + " A" + r + " " + r + " 0 0 1 " + xb + " " + (cy + r) + " H" + xa + " A" + r + " " + r + " 0 0 1 " + xa + " " + (cy - r) + " Z",
          fill: C.clair, stroke: C.acc, "stroke-width": 3 }, g);
      } else {
        el("rect", { x: xa, y: cy - r, width: L, height: D, fill: C.clair, stroke: C.acc, "stroke-width": 3 }, g);
        el("path", { d: "M" + (xa - ec) + " " + (cy - r) + " A" + r + " " + r + " 0 0 0 " + (xa - ec) + " " + (cy + r) + " Z", fill: "#fff", stroke: C.v, "stroke-width": 3 }, g);
        el("path", { d: "M" + (xb + ec) + " " + (cy - r) + " A" + r + " " + r + " 0 0 1 " + (xb + ec) + " " + (cy + r) + " Z", fill: "#fff", stroke: C.v, "stroke-width": 3 }, g);
        tx(g, "L × D", [cx, cy], { taille: 22, coul: C.acc });
        tx(g, "½ disque", [xa - ec - r / 2, cy], { taille: 17, coul: C.v });
        tx(g, "½ disque", [xb + ec + r / 2, cy], { taille: 17, coul: C.v });
      }
      // cotes : D à gauche, L entre les centres, LT en bas
      var yc = cy + r + 56, yt = cy + r + 110;
      el("path", { d: "M" + xa + " " + (yc - 10) + " V" + (yc + 10) + " M" + xb + " " + (yc - 10) + " V" + (yc + 10) + " M" + xa + " " + yc + " H" + xb, stroke: C.encre, "stroke-width": 2 }, g);
      tx(g, "L = 15 mm (entre les centres)", [cx, yc - 20], { taille: 17, gras: false });
      el("path", { d: "M" + (xa - r) + " " + (yt - 10) + " V" + (yt + 10) + " M" + (xb + r) + " " + (yt - 10) + " V" + (yt + 10) + " M" + (xa - r) + " " + yt + " H" + (xb + r), stroke: C.encre, "stroke-width": 2 }, g);
      tx(g, "LT = L + D = 26 mm", [cx, yt - 20], { taille: 17, gras: false });
      el("path", { d: "M" + (xa - r - 40) + " " + (cy - r) + " V" + (cy + r) + " M" + (xa - r - 50) + " " + (cy - r) + " H" + (xa - r - 30) + " M" + (xa - r - 50) + " " + (cy + r) + " H" + (xa - r - 30), stroke: C.encre, "stroke-width": 2 }, g);
      tx(g, "D = 11 mm", [xa - r - 60, cy], { taille: 17, gras: false, ancre: "end" });
      el("circle", { cx: xa, cy: cy, r: 4, fill: C.encre }, g); el("circle", { cx: xb, cy: cy, r: 4, fill: C.encre }, g);
      R.rendre(zone, d ? "S = \\underbrace{15 \\times 11}_{165} + \\underbrace{\\tfrac{\\pi \\times 11^2}{4}}_{95{,}0} \\approx 260\\ \\text{mm}^2" : "S = L\\,D + \\frac{\\pi D^2}{4}");
    }
    dessiner();
  })();

  /* ---------- Question 4 : le pont de jauges du FUTEK LSB200 et ses 4 fils ---------- */
  if (place("fig-td1-pont")) (function () {
    var f = R.figure("fig-td1-pont", { largeur: 960, hauteur: 540, titre: "Le capteur de force : quatre jauges en pont de Wheatstone",
      essai: "<strong>Essaie</strong> : appuie plus ou moins fort avec le curseur. <strong>Observe</strong> : deux jauges s'allongent, deux se raccourcissent ; les deux fils de signal partent de 2,5&nbsp;V et s'écartent de quelques millivolts.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cf = R.curseur(f.reglages, { nom: "Force", min: 0, max: 445, pas: 5, val: 200, unite: " N", surChange: dessiner });
    var H = [480, 90], B = [480, 450], Gp = [300, 270], Dp = [660, 270];
    function jauge(a, b, plus, k) {
      var m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      el("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: C.encre, "stroke-width": 2.5 }, g);
      var ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
      el("rect", { x: m[0] - 34, y: m[1] - 12, width: 68, height: 24, rx: 4, fill: plus ? C.clair : "#fff", stroke: plus ? C.acc : C.v, "stroke-width": 2.5, transform: "rotate(" + ang + " " + m[0] + " " + m[1] + ")" }, g);
      var o = [m[0] + (m[0] < 480 ? -78 : 78), m[1] + (m[1] < 270 ? -18 : 18)];
      tx(g, "J" + k + (plus ? " (R + ΔR)" : " (R − ΔR)"), o, { taille: 16, gras: false, coul: plus ? C.acc : C.v });
    }
    function dessiner() {
      EMB.vider(g);
      var F = cf.v, d = 2e-3 * 5 * F / 445 / 2; // demi-écart en volts, sensibilité 2 mV/V (DT2)
      jauge(H, Gp, true, 1); jauge(Gp, B, false, 2); jauge(H, Dp, false, 3); jauge(Dp, B, true, 4);
      // alimentation sur la diagonale haut-bas
      el("path", { d: "M480 90 V50 H120 M480 450 V490 H120", fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
      tx(g, "+Excitation : fil rouge, 5 V", [126, 34], { taille: 17, ancre: "start", coul: C.ko });
      tx(g, "−Excitation : fil noir, 0 V", [126, 512], { taille: 17, ancre: "start" });
      // mesure sur la diagonale gauche-droite
      el("path", { d: "M300 270 H110 M660 270 H740", fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
      [H, B, Gp, Dp].forEach(function (p) { el("circle", { cx: p[0], cy: p[1], r: 6, fill: C.encre }, g); });
      tx(g, "−Signal (blanc)\n" + vg(2.5 - d, 4) + " V", [110, 228], { taille: 16, ancre: "start", mono: true });
      tx(g, "+Signal (vert) : " + vg(2.5 + d, 4) + " V", [752, 270], { taille: 16, ancre: "start", mono: true, coul: C.acc });
      R.rendre(zone, "V_o = V_{+} - V_{-} = " + R.tc(2 * d * 1000, 2) + "\\ \\text{mV} \\quad (S = 2\\ \\text{mV/V, DT2})");
    }
    dessiner();
  })();

  /* ---------- Questions 6 et 7 : la droite Vo(P) et le gain de l'INA128 ---------- */
  if (place("fig-td1-vo")) (function () {
    var f = R.figure("fig-td1-vo", { largeur: 960, hauteur: 540, titre: "La caractéristique du capteur, puis l'amplification",
      essai: "<strong>Essaie</strong> : déplace la force. <strong>Observe</strong> : \\(V_o\\) monte en droite jusqu'à 10&nbsp;mV à 445&nbsp;N ; avec \\(G = 445\\), la sortie de l'INA128 vaut 1&nbsp;V à 100&nbsp;N.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cf = R.curseur(f.reglages, { nom: "Force", min: 0, max: 445, pas: 5, val: 100, unite: " N", surChange: dessiner });
    var x0 = 110, y0 = 460, w = 780, h = 380, X = function (P) { return x0 + P / 445 * w; }, Y = function (v) { return y0 - v / 10 * h; };
    function dessiner() {
      EMB.vider(g);
      axes(g, x0, y0, w, h, "P (N)", "Vo (mV)");
      [0, 100, 200, 300, 445].forEach(function (P) { el("line", { x1: X(P), y1: y0, x2: X(P), y2: y0 + 8, stroke: C.encre, "stroke-width": 2 }, g); tx(g, String(P), [X(P), y0 + 26], { taille: 16, gras: false, mono: true }); });
      [0, 5, 10].forEach(function (v) { tx(g, String(v), [x0 - 14, Y(v)], { taille: 16, gras: false, mono: true, ancre: "end" }); });
      el("line", { x1: X(0), y1: Y(0), x2: X(445), y2: Y(10), stroke: C.acc, "stroke-width": 4 }, g);
      var P = cf.v, vo = 10 * P / 445;
      el("path", { d: "M" + X(P) + " " + y0 + " V" + Y(vo) + " H" + x0, fill: "none", stroke: C.gris, "stroke-width": 2, "stroke-dasharray": "6 5" }, g);
      el("circle", { cx: X(P), cy: Y(vo), r: 8, fill: C.acc }, g);
      tx(g, "Vo = " + vg(vo, 2) + " mV", [X(P) + 16, Y(vo) - 18], { taille: 17, ancre: P > 330 ? "end" : "start", mono: true });
      tx(g, "INA128 (G = 445) : " + vg(vo * 445 / 1000, 2) + " V", [x0 + 20, 100], { taille: 18, ancre: "start", coul: C.v });
      R.rendre(zone, "V_o = 2 \\times 5 \\times \\frac{" + P + "}{445} = " + R.tc(vo, 2) + "\\ \\text{mV} \\qquad V_{sortie} = 445\\,V_o = " + R.tc(vo * 0.445, 2) + "\\ \\text{V}");
    }
    dessiner();
  })();

  /* ---------- Question 9 : le modèle R(F) = R0 + β/F ---------- */
  if (place("fig-td1-fsr")) (function () {
    var f = R.figure("fig-td1-fsr", { largeur: 960, hauteur: 540, titre: "Le modèle du capteur : une hyperbole, ou une droite en 1/F",
      essai: "<strong>Essaie</strong> : coche « Tracer en 1/F ». <strong>Observe</strong> : les points lus sur DR1 s'alignent sur une droite ; sa pente est \\(\\beta\\), son ordonnée à l'origine \\(R_0\\).", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var inv = R.bascule(f.reglages, "Tracer en 1/F", false, dessiner);
    var R0 = 71, beta = 629; // kΩ et kΩ·N, tirés de DR1 (question 9)
    var DR1 = [[1, 700], [2, 375], [5, 198], [10, 134], [20, 102], [50, 83], [100, 77]]; // points lus sur DR1
    var x0 = 120, y0 = 460, w = 760, h = 380;
    function dessiner() {
      EMB.vider(g);
      var en1 = inv.checked, xmax = en1 ? 2 : 100, Rmax = 1400;
      var X = function (v) { return x0 + v / xmax * w; }, Y = function (r) { return y0 - r / Rmax * h; };
      axes(g, x0, y0, w, h, en1 ? "1/F (1/N)" : "F (N)", "RFSR (kΩ)");
      (en1 ? [0, 0.5, 1, 1.5, 2] : [0, 25, 50, 75, 100]).forEach(function (v) { tx(g, vg(v), [X(v), y0 + 26], { taille: 16, gras: false, mono: true }); });
      [0, 500, 1000].forEach(function (r) { tx(g, String(r), [x0 - 14, Y(r)], { taille: 16, gras: false, mono: true, ancre: "end" }); });
      var d = "", n = 120;
      for (var i = 0; i <= n; i++) {
        var F = en1 ? 1 / (0.5 + (2 - 0.5) * i / n) * 1 : 0.5 + (100 - 0.5) * i / n;
        var x = en1 ? 1 / F : F, r = R0 + beta / F;
        d += (i ? " L" : "M") + X(x).toFixed(1) + " " + Y(Math.min(r, Rmax)).toFixed(1);
      }
      el("path", { d: d, fill: "none", stroke: C.acc, "stroke-width": 4 }, g);
      DR1.forEach(function (p) { var x = en1 ? 1 / p[0] : p[0]; el("circle", { cx: X(x), cy: Y(p[1]), r: 7, fill: "#fff", stroke: C.encre, "stroke-width": 2.5 }, g); });
      tx(g, "○ points lus sur DR1", [x0 + w, y0 - h + 6], { taille: 16, ancre: "end", gras: false });
      if (en1) {
        el("line", { x1: X(0), y1: Y(R0), x2: X(0.5), y2: Y(R0 + beta * 0.5), stroke: C.acc, "stroke-width": 3, "stroke-dasharray": "6 5" }, g);
        el("line", { x1: X(0), y1: Y(R0), x2: X(0.55), y2: Y(R0), stroke: C.v, "stroke-width": 2, "stroke-dasharray": "5 5" }, g);
        tx(g, "ordonnée à l'origine : R0 ≈ 71 kΩ", [X(0.58), Y(R0)], { taille: 17, ancre: "start", coul: C.v });
        tx(g, "pente : β", [X(1.2), Y(R0 + beta * 1.2) - 30], { taille: 17, ancre: "end", coul: C.v });
      } else {
        [[3, "faible force : R grande", "start"], [80, "forte force : R tend vers R0", "end"]].forEach(function (p) {
          var r = R0 + beta / p[0]; el("circle", { cx: X(p[0]), cy: Y(r), r: 8, fill: C.v }, g);
          tx(g, p[1], [X(p[0]) + (p[2] === "end" ? 10 : 16), Y(r) - 26], { taille: 17, ancre: p[2], coul: C.v });
        });
      }
      R.rendre(zone, (en1 ? "R_{FSR} = R_0 + \\beta \\cdot \\tfrac{1}{F}" : "R_{FSR}(F) = R_0 + \\frac{\\beta}{F}") + " \\quad R_0 \\approx 71\\ \\text{k}\\Omega,\\ \\beta \\approx 629\\ \\text{k}\\Omega \\cdot \\text{N}");
    }
    dessiner();
  })();

  /* ---------- Question 13 : le chronogramme de S1, S2, S3 ---------- */
  if (place("fig-td1-chrono")) (function () {
    var f = R.figure("fig-td1-chrono", { largeur: 960, hauteur: 540, titre: "S3 S2 S1 compte de 0 à 7 en 25 ms",
      essai: "<strong>Essaie</strong> : déplace l'instant. <strong>Observe</strong> : S1 change toutes les 3,125&nbsp;ms, S2 deux fois moins souvent, S3 quatre fois moins ; lus ensemble, ils donnent le numéro du capteur lu.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var ct = R.curseur(f.reglages, { nom: "Instant", min: 0, max: 24.9, pas: 0.1, val: 10, unite: " ms", surChange: dessiner });
    var x0 = 150, w = 760, X = function (t) { return x0 + t / 25 * w; }, lignes = [["S3", 150, 4], ["S2", 250, 2], ["S1", 350, 1]];
    function dessiner() {
      EMB.vider(g);
      var t = ct.v, k = Math.floor(t / 3.125);
      for (var v = 0; v < 8; v++) {
        el("rect", { x: X(v * 3.125), y: 70, width: w / 8, height: 340, fill: v === k ? C.clair : (v % 2 ? C.fond : "#fff") }, g);
        tx(g, "Y" + v, [X(v * 3.125 + 1.5625), 92], { taille: 16, mono: true, coul: v === k ? C.acc : C.doux });
      }
      lignes.forEach(function (L) {
        var d = "", haut = L[1] - 30, bas = L[1] + 20;
        for (var v = 0; v < 8; v++) { var b = (v >> (L[2] === 4 ? 2 : L[2] === 2 ? 1 : 0)) & 1, y = b ? haut : bas; d += (v ? " L" : "M") + X(v * 3.125) + " " + y + " L" + X((v + 1) * 3.125) + " " + y; }
        el("path", { d: d, fill: "none", stroke: C.encre, "stroke-width": 3 }, g);
        tx(g, L[0], [x0 - 30, L[1] - 5], { taille: 18, mono: true, ancre: "end" });
      });
      el("line", { x1: X(t), y1: 64, x2: X(t), y2: 420, stroke: C.ko, "stroke-width": 2.5 }, g);
      [0, 6.25, 12.5, 18.75, 25].forEach(function (m) { tx(g, vg(m), [X(m), 448], { taille: 16, mono: true, gras: false }); });
      tx(g, "t (ms)", [X(25), 478], { taille: 16, ancre: "end", gras: false });
      var bits = EMB.binaire(k, 3);
      R.rendre(zone, "t = " + R.tc(t, 1) + "\\ \\text{ms} : S_3 S_2 S_1 = " + bits + "_2 = " + k + " \\Rightarrow \\text{voie } Y_" + k + ",\\ \\text{capteur } R_{FSR" + (k + 1) + "}");
    }
    dessiner();
  })();

  /* ---------- Question 14 : CF, filtrer sans rater la voie suivante ---------- */
  if (place("fig-td1-cf")) (function () {
    var f = R.figure("fig-td1-cf", { largeur: 960, hauteur: 540, titre: "Le compromis du condensateur CF",
      essai: "<strong>Essaie</strong> : change CF. <strong>Observe</strong> : plus CF est grand, plus la sortie met de temps à rejoindre la nouvelle voie ; au-delà de 0,83&nbsp;nF, elle n'est pas stabilisée (5τ) avant le changement de voie à 3,125&nbsp;ms.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cc = R.curseur(f.reglages, { nom: "CF", min: 100, max: 1500, pas: 10, val: 470, unite: " pF", surChange: dessiner });
    var x0 = 110, y0 = 440, w = 790, h = 330, X = function (t) { return x0 + t / 4 * w; }, Y = function (u) { return y0 - u * h; };
    function dessiner() {
      EMB.vider(g);
      var CF = cc.v * 1e-12, tau = 750e3 * CF * 1000, ok = 5 * tau <= 3.125; // tau en ms
      axes(g, x0, y0, w, h, "t (ms)", "sortie (part du saut)");
      [0, 1, 2, 3, 4].forEach(function (t) { tx(g, String(t), [X(t), y0 + 26], { taille: 16, mono: true, gras: false }); });
      el("rect", { x: X(3.125), y: y0 - h - 10, width: X(4) - X(3.125), height: h + 10, fill: C.fond }, g);
      el("line", { x1: X(3.125), y1: y0, x2: X(3.125), y2: y0 - h - 10, stroke: C.encre, "stroke-width": 2, "stroke-dasharray": "6 5" }, g);
      tx(g, "voie suivante à 3,125 ms", [X(3.125) - 10, y0 - h - 24], { taille: 16, ancre: "end", gras: false });
      var d = "";
      for (var i = 0; i <= 200; i++) { var t = 4 * i / 200; d += (i ? " L" : "M") + X(t).toFixed(1) + " " + Y(1 - Math.exp(-t / tau)).toFixed(1); }
      el("path", { d: d, fill: "none", stroke: ok ? C.acc : C.ko, "stroke-width": 4 }, g);
      el("line", { x1: X(Math.min(5 * tau, 4)), y1: y0, x2: X(Math.min(5 * tau, 4)), y2: Y(0.993), stroke: ok ? C.ok : C.ko, "stroke-width": 2.5 }, g);
      tx(g, "5τ = " + vg(5 * tau, 2) + " ms", [X(Math.min(5 * tau, 4)) + 10, Y(0.5)], { taille: 17, ancre: "start", coul: ok ? C.ok : C.ko });
      var fc = 1 / (2 * Math.PI * 750e3 * CF);
      R.rendre(zone, "\\tau = R_G C_F = " + R.tc(tau, 3) + "\\ \\text{ms} \\qquad f_c = \\frac{1}{2\\pi R_G C_F} \\approx " + R.tc(fc, 0) + "\\ \\text{Hz}" + (ok ? "" : " \\quad \\text{trop lent}"));
    }
    dessiner();
  })();

  /* ---------- Question 12 : la figure 5, pas à pas, jusqu'à VA ---------- */
  if (place("fig-td1-etapes")) (function () {
    var f = R.figure("fig-td1-etapes", { largeur: 960, hauteur: 540, titre: "La figure 5, étape par étape : de V+ à VA",
      essai: "<strong>Essaie</strong> : avance d'une étape à la fois, puis change la résistance du capteur. <strong>Observe</strong> : V+ et V− ne bougent pas (0,275 V) ; seul le courant change, et avec lui la tension aux bornes de RG, donc VA.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct), k = 0;
    var NOMS = ["le circuit", "quel capteur ?", "l'entrée +", "l'entrée −", "le courant", "la sortie VA"];
    var cr = R.curseur(f.reglages, { nom: "RFSR8", min: 75, max: 1000, pas: 5, val: 250, unite: " kΩ", surChange: dessiner });
    R.etapes(f.reglages, 5, NOMS, function (i) { k = i; dessiner(); });
    var VP = 3.3 * 10 / 120;
    function resistance(x, y, w, h, nom, actif, vertical) {
      el("rect", { x: x, y: y, width: w, height: h, rx: 4, fill: actif ? C.clair : "#fff", stroke: actif ? C.acc : C.encre, "stroke-width": actif ? 3.5 : 2.5 }, g);
      tx(g, nom, vertical ? [x - 14, y + h / 2] : [x + w / 2, y - 18], { taille: 18, ancre: vertical ? "end" : "middle", coul: actif ? C.acc : C.encre });
    }
    function fil(d, actif) { el("path", { d: d, fill: "none", stroke: actif ? C.acc : C.encre, "stroke-width": actif ? 4 : 2.5 }, g); }
    function masse(x, y) { el("path", { d: "M" + (x - 16) + " " + y + " H" + (x + 16) + " M" + (x - 10) + " " + (y + 8) + " H" + (x + 10) + " M" + (x - 4) + " " + (y + 16) + " H" + (x + 4), stroke: C.encre, "stroke-width": 2.5 }, g); }
    function etiquette(t, p, actif, ancre) { tx(g, t, p, { taille: 18, ancre: ancre || "start", coul: actif ? C.acc : C.encre, mono: true }); }
    function dessiner() {
      EMB.vider(g);
      var Rk = cr.v * 1000, i = VP / Rk, va = Math.min(VP + 750e3 * i, 3.3);
      // pont RA, RB : son point milieu va droit sur l'entrée +
      tx(g, "VDD = 3,3 V", [120, 34], { taille: 18 });
      fil("M120 50 V90", k === 2); resistance(104, 90, 32, 90, "RA 110 kΩ", k === 2, true);
      fil("M120 180 V300", k === 2); resistance(104, 300, 32, 90, "RB 10 kΩ", k === 2, true);
      fil("M120 390 V440", k === 2); masse(120, 440);
      el("circle", { cx: 120, cy: 240, r: 6, fill: C.encre }, g);
      fil("M120 240 H430", k === 2);
      // AOP : + en haut, − en bas
      el("polygon", { points: "430,190 430,400 590,295", fill: "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      tx(g, "+", [448, 240], { taille: 26 }); tx(g, "−", [448, 350], { taille: 26 });
      // entrée − : le capteur vers la masse (à gauche), RG vers la sortie (en dessous)
      fil("M430 350 H370", k === 3 || k === 4);
      el("circle", { cx: 370, cy: 350, r: 6, fill: C.encre }, g);
      fil("M370 350 H300 V380", k >= 4); resistance(284, 380, 32, 80, "RFSR8", k === 1 || k >= 4, true);
      fil("M300 460 V480", k >= 4); masse(300, 480);
      tx(g, "(Y7, choisi par S3 S2 S1 = 111)", [300, 524], { taille: 16, gras: false, coul: k === 1 ? C.acc : C.doux });
      fil("M370 350 V430 H520", k >= 4); resistance(520, 416, 110, 28, "", k >= 4, false);
      tx(g, "RG 750 kΩ", [575, 464], { taille: 18, coul: k >= 4 ? C.acc : C.encre });
      fil("M630 430 H700 V295", k >= 4);
      el("path", { d: "M370 430 V496 H700 V430", fill: "none", stroke: C.gris, "stroke-width": 2, "stroke-dasharray": "6 6" }, g);
      tx(g, "CF : ouvert en continu", [535, 518], { taille: 16, gras: false, coul: C.doux });
      // sortie
      fil("M590 295 H800", k === 5);
      el("circle", { cx: 700, cy: 295, r: 6, fill: C.encre }, g);
      etiquette("VA", [812, 295], k === 5);
      // valeurs, étape par étape
      if (k >= 2) etiquette("V+ = 0,275 V", [150, 218], k === 2);
      if (k >= 3) etiquette("V− = V+", [356, 326], k === 3, "end");
      if (k >= 4) {
        EMB.fleche(g, [334, 392], [334, 452], { coul: C.ko, ep: 3 });
        etiquette("i", [346, 422], true);
        EMB.fleche(g, [660, 400], [550, 400], { coul: C.ko, ep: 3 });
        etiquette("même i", [605, 380], true, "middle");
        tx(g, "aucun courant ne rentre dans l'AOP", [470, 160], { taille: 16, gras: false, coul: C.doux, ancre: "start" });
      }
      var tex = ["\\text{quatre règles : loi d'Ohm, courant conservé, pont diviseur, AOP idéal}",
        "111_2 = 7 \\;\\to\\; Y_7 : R_{FSR8}",
        "V^+ = V_{DD}\\,\\frac{R_B}{R_A + R_B} = 3{,}3 \\times \\frac{10}{120} = 0{,}275\\ \\text{V}",
        "V^- = V^+ = 0{,}275\\ \\text{V}",
        "i = \\frac{V^-}{R_{FSR8}} = " + R.tc(i * 1e6, 2) + "\\ \\mu\\text{A} \\quad (\\text{le même dans } R_G)",
        "V_A = V^- + R_G\\,i = 0{,}275 + " + R.tc(750e3 * i, 3) + " = " + R.tc(va, 3) + "\\ \\text{V}" + (VP + 750e3 * i > 3.3 ? "\\ (\\text{saturé})" : "")][k];
      R.rendre(zone, tex);
    }
    dessiner();
  })();
})();
