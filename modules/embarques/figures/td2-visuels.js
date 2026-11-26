// TD 2 semelle, programmation : du capteur au code lu par l'ADC (et retour), choisir une broche sur la carte.
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

  /* ---------- Question 1 : choisir une broche selon le besoin ---------- */
  if (place("fig-td2-broches")) (function () {
    var f = R.figure("fig-td2-broches", { largeur: 960, hauteur: 540, titre: "La carte ESP32 DEVKIT V1 : quelles broches conviennent ?",
      essai: "<strong>Essaie</strong> : choisis un besoin, puis touche une broche. <strong>Observe</strong> : en vert les broches qui conviennent, en gris celles qui sont exclues ; la raison s'affiche sous la carte. Le contour bleu marque le choix du corrigé.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct), sel = null;
    var besoin = R.choix(f.reglages, [["sortie", "Sortie : S1, S2, S3"], ["mesure", "Mesure : AIN1 (Wi-Fi)"], ["bouton", "Bouton : BTN_ACQ"]], function () { sel = null; dessiner(); });
    // broches de la carte, de haut en bas : [nom, gpio (null si pas un GPIO), précision]
    var G = [["EN", null, "redémarrage"], ["GPIO 36", 36, "ADC1"], ["GPIO 39", 39, "ADC1"], ["GPIO 34", 34, "ADC1"], ["GPIO 35", 35, "ADC1"],
             ["GPIO 32", 32, "ADC1"], ["GPIO 33", 33, "ADC1"], ["GPIO 25", 25, "ADC2, DAC1"], ["GPIO 26", 26, "ADC2, DAC2"], ["GPIO 27", 27, "ADC2"],
             ["GPIO 14", 14, "ADC2"], ["GPIO 12", 12, "ADC2"], ["GPIO 13", 13, "ADC2"], ["GND", null, "masse"], ["VIN", null, "alimentation"]];
    var D = [["GPIO 23", 23, "VSPI"], ["GPIO 22", 22, "I2C SCL"], ["GPIO 1", 1, "TX0, USB"], ["GPIO 3", 3, "RX0, USB"], ["GPIO 21", 21, "I2C SDA"],
             ["GPIO 19", 19, "VSPI"], ["GPIO 18", 18, "VSPI"], ["GPIO 5", 5, "VSPI"], ["GPIO 17", 17, "TX2"], ["GPIO 16", 16, "RX2"],
             ["GPIO 4", 4, "ADC2"], ["GPIO 2", 2, "ADC2, LED"], ["GPIO 15", 15, "ADC2"], ["GND", null, "masse"], ["3V3", null, "alimentation"]];
    var ENTREE_SEULE = [34, 35, 36, 39], ADC1 = [32, 33, 34, 35, 36, 39], DEMARRAGE = [0, 2, 5, 12, 15], USB = [1, 3];
    var CHOIX = { sortie: [25, 26, 27], mesure: [34], bouton: [4] };
    function verdict(p) {
      var n = p[1], b = besoin.value;
      if (n === null) return [false, p[0] + " : ce n'est pas une broche de signal (" + p[2] + ")."];
      if (USB.indexOf(n) >= 0) return [false, p[0] + " : déjà prise par la liaison USB (téléversement, moniteur série)."];
      if (n === 2) return [false, "GPIO 2 : déjà prise par la LED bleue de la carte, et sensible au démarrage."];
      if (b === "mesure") {
        if (ADC1.indexOf(n) < 0) return [false, p[0] + " : " + (p[2].indexOf("ADC2") >= 0 ? "sur l'ADC2, qui ne marche plus quand le Wi-Fi tourne." : "pas reliée à un ADC, elle ne sait pas mesurer une tension.")];
        return [true, p[0] + " : sur l'ADC1, elle mesure même avec le Wi-Fi." + (ENTREE_SEULE.indexOf(n) >= 0 ? " Entrée seulement : parfait pour une mesure." : "")];
      }
      if (ENTREE_SEULE.indexOf(n) >= 0) return [false, p[0] + " : entrée seulement, " + (b === "sortie" ? "elle ne peut pas écrire 0 ou 3,3 V." : "sans résistance de tirage interne pour le bouton.")];
      if (DEMARRAGE.indexOf(n) >= 0) return [false, p[0] + " : lue par la puce au démarrage (complément) ; mieux vaut l'éviter."];
      return [true, p[0] + " : libre, " + (b === "sortie" ? "elle sait écrire 0 ou 3,3 V." : "elle a une résistance de tirage interne (INPUT_PULLUP).")];
    }
    function broche(p, x, y, cote) {
      var v = verdict(p), choisi = p[1] !== null && CHOIX[besoin.value].indexOf(p[1]) >= 0, actif = sel === p;
      var gr = el("g", { style: "cursor:pointer" }, g);
      el("rect", { x: cote < 0 ? x - 290 : x - 14, y: y - 15, width: 304, height: 30, fill: "transparent" }, gr);
      el("circle", { cx: x, cy: y, r: 11, fill: v[0] ? C.ok : C.pale, stroke: choisi ? C.bleu : actif ? C.encre : "#fff", "stroke-width": choisi || actif ? 4 : 2 }, gr);
      tx(gr, p[0], [x + cote * 24, y], { taille: 21, ancre: cote < 0 ? "end" : "start", coul: v[0] ? C.encre : C.gris, gras: v[0] || actif });
      tx(gr, p[2], [x + cote * 134, y], { taille: 17, ancre: cote < 0 ? "end" : "start", coul: C.doux, gras: false });
      gr.addEventListener("click", function () { sel = p; dessiner(); });
    }
    function dessiner() {
      EMB.vider(g);
      el("rect", { x: 400, y: 30, width: 160, height: 480, rx: 16, fill: "#2b2f3a" }, g);
      el("rect", { x: 425, y: 50, width: 110, height: 140, rx: 6, fill: "#c9ccd4" }, g);
      tx(g, "ESP32", [480, 120], { taille: 17, halo: false });
      el("rect", { x: 455, y: 470, width: 50, height: 30, rx: 4, fill: "#c9ccd4" }, g);
      tx(g, "USB", [480, 485], { taille: 14, halo: false });
      G.forEach(function (p, i) { broche(p, 418, 58 + i * 30, -1); });
      D.forEach(function (p, i) { broche(p, 542, 58 + i * 30, 1); });
      var nb = G.concat(D).filter(function (p) { return verdict(p)[0]; }).length;
      zone.textContent = sel ? verdict(sel)[1] : nb + " broches conviennent pour ce besoin. Touche une broche pour voir pourquoi.";
    }
    dessiner();
  })();
})();
