// TD 3 : le PIC (un bloc touché, son rôle), le partage du temps entre boucle et interruption,
// calcul séquentiel ou parallèle, PWM et sa moyenne, la pile LIFO, les cycles de bus Von Neumann et Harvard.
// Chaque figure ne se dessine que si sa place est sur la page.
(function () {
  "use strict";
  var R = RM, C = EMB.C, el = EMB.el, tx = EMB.texte, vg = EMB.virgule;
  function place(id) { return document.getElementById(id); }

  /* ---------- Question 9 : les blocs du PIC ---------- */
  if (place("fig-td3-pic")) (function () {
    var f = R.figure("fig-td3-pic", { largeur: 960, hauteur: 540, titre: "Architecture interne d'un microcontrôleur PIC (redessinée)",
      essai: "<strong>Essaie</strong> : touche un bloc. <strong>Observe</strong> : son rôle s'affiche sous le dessin. La Program Memory a son propre chemin vers le CPU (flèche rouge) : c'est une architecture Harvard.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct), choisi = "cpu";
    var B = [
      { id: "prog", x: 30, y: 40, w: 220, h: 250, t: "Program Memory\njusqu'à 2 MB", r: "Program Memory : la flash qui garde le programme, même sans alimentation." },
      { id: "cpu", x: 330, y: 30, w: 270, h: 150, t: "CPU\n16 bits\n83 instructions", r: "CPU : exécute les instructions ; registres FSR pour l'adressage indirect ; sauve son contexte à chaque interruption." },
      { id: "pile", x: 330, y: 200, w: 270, h: 90, t: "Stack 16 niveaux\nProgram Counter", r: "PC : adresse de la prochaine instruction. Pile : adresses de retour des sous-programmes et des interruptions (16 niveaux)." },
      { id: "osc", x: 660, y: 30, w: 270, h: 70, t: "Internal Oscillator\njusqu'à 64 MHz", r: "Oscillateur interne : l'horloge qui cadence le CPU et les périphériques." },
      { id: "eep", x: 660, y: 115, w: 270, h: 60, t: "Data EEPROM", r: "Data EEPROM : données non volatiles à garder (réglages, étalonnage)." },
      { id: "ram", x: 660, y: 190, w: 270, h: 100, t: "Data Memory\njusqu'à 4 KB", r: "Data Memory : la RAM des variables et des registres des périphériques, effacée à la coupure." },
      { id: "per", x: 30, y: 400, w: 900, h: 100, t: "Peripheral I/O Drivers\nADC, SPI/I²C, EUSART, PWM, LCD", r: "Périphériques : convertir (ADC), communiquer (SPI, I²C, EUSART), détecter un toucher, mesurer ou produire des signaux (CCP, PWM), piloter un afficheur." }
    ];
    function dessiner() {
      EMB.vider(g);
      // bus vers les périphériques
      EMB.bus(g, [480, 300], [480, 392], { larg: 12 });
      [120, 300, 660, 820].forEach(function (x) { EMB.bus(g, [x, 352], [x, 392], { larg: 10 }); });
      el("rect", { x: 110, y: 340, width: 720, height: 14, fill: C.bleu }, g);
      B.forEach(function (b) {
        var gr = EMB.bloc(g, b.x, b.y, b.w, b.h, b.t, { actif: b.id === choisi, taille: 22 });
        gr.style.cursor = "pointer";
        gr.addEventListener("click", function () { choisi = b.id; dessiner(); });
      });
      // instructions : Program Memory vers CPU (rouge)
      EMB.fleche(g, [250, 105], [326, 105], { coul: C.ko, ep: 6 });
      zone.textContent = B.filter(function (b) { return b.id === choisi; })[0].r;
    }
    dessiner();
  })();

  /* ---------- Contraintes temporelles : boucle de 50 ms, interruption toutes les 10 ms ---------- */
  if (place("fig-td3-temps")) (function () {
    var f = R.figure("fig-td3-temps", { largeur: 960, hauteur: 540, titre: "Le temps du processeur, partagé entre la routine d'interruption et la boucle principale",
      essai: "<strong>Essaie</strong> : allonge la routine, puis coche « Réarmement ». <strong>Observe</strong> : à 4&nbsp;ms, la boucle de 50&nbsp;ms finit vers 82 à 86&nbsp;ms ; à 10&nbsp;ms, elle n'avance plus ; au-delà, des interruptions se perdent, ou la pile grossit sans fin si la routine réarme les interruptions.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cd = R.curseur(f.reglages, { nom: "Routine", min: 0, max: 14, pas: 0.5, val: 4, unite: " ms", dec: 1, surChange: dessiner });
    var rea = R.bascule(f.reglages, "Réarmement", false, dessiner);
    var x0 = 60, W = 860, TMAX = 100;
    function X(t) { return x0 + t / TMAX * W; }
    function simuler(d, imbrique) {
      var dt = 0.05, segs = [], pile = [], attente = false, perdues = 0, boucle = 0, finBoucle = null, prof = 0, profMax = 0;
      for (var k = 0; k * dt < TMAX - 1e-9; k++) {
        var t = k * dt;
        if (Math.abs(t / 10 - Math.round(t / 10)) < 1e-6 && d > 0) {       // demande d'interruption
          if (imbrique || pile.length === 0) pile.push(d);
          else if (attente) perdues++;
          else attente = true;
        }
        var actif;
        if (pile.length) {
          pile[pile.length - 1] -= dt; actif = "isr";
          prof = pile.length; profMax = Math.max(profMax, prof);
          if (pile[pile.length - 1] <= 1e-9) { pile.pop(); if (!imbrique && attente) { pile.push(d); attente = false; } }
        } else {
          actif = "main"; boucle += dt;
          if (finBoucle === null && boucle >= 50 - 1e-9) finBoucle = t + dt;
        }
        var der = segs[segs.length - 1];
        if (der && der.k === actif && Math.abs(der.b - t) < 1e-6) der.b = t + dt; else segs.push({ k: actif, a: t, b: t + dt });
      }
      return { segs: segs, perdues: perdues, finBoucle: finBoucle, boucle: boucle, profMax: profMax };
    }
    function dessiner() {
      EMB.vider(g);
      var d = cd.v, imb = rea.checked, s = simuler(d, imb);
      // demandes d'interruption
      tx(g, "Demandes d'interruption (T = 10 ms)", [x0, 60], { taille: 17, ancre: "start", gras: false });
      for (var t = 0; t < TMAX; t += 10) EMB.fleche(g, [X(t), 82], [X(t), 128], { coul: C.ko, ep: 3 });
      // occupation du processeur
      tx(g, "Processeur", [x0, 168], { taille: 17, ancre: "start", gras: false });
      s.segs.forEach(function (sg) {
        el("rect", { x: X(sg.a), y: 190, width: Math.max(0.5, X(sg.b) - X(sg.a)), height: 70, fill: sg.k === "isr" ? C.acc : C.clair, stroke: "none" }, g);
      });
      el("rect", { x: x0, y: 190, width: W, height: 70, fill: "none", stroke: C.encre, "stroke-width": 2 }, g);
      // légende
      el("rect", { x: x0, y: 286, width: 26, height: 20, fill: C.acc }, g);
      tx(g, "routine d'interruption", [x0 + 36, 296], { taille: 16, ancre: "start", gras: false });
      el("rect", { x: x0 + 270, y: 286, width: 26, height: 20, fill: C.clair, stroke: C.encre, "stroke-width": 1 }, g);
      tx(g, "boucle principale", [x0 + 306, 296], { taille: 16, ancre: "start", gras: false });
      // axe du temps
      el("line", { x1: x0, y1: 350, x2: x0 + W, y2: 350, stroke: C.encre, "stroke-width": 2.5 }, g);
      for (var u = 0; u <= TMAX; u += 10) {
        el("line", { x1: X(u), y1: 350, x2: X(u), y2: 360, stroke: C.encre, "stroke-width": 2 }, g);
        tx(g, String(u), [X(u), 380], { taille: 16, mono: true, gras: false });
      }
      tx(g, "t (ms)", [x0 + W, 410], { taille: 16, ancre: "end", gras: false });
      // fin du tour de boucle
      var msg;
      if (s.finBoucle !== null) {
        el("line", { x1: X(s.finBoucle), y1: 176, x2: X(s.finBoucle), y2: 274, stroke: C.ok, "stroke-width": 4 }, g);
        tx(g, "boucle finie : " + vg(s.finBoucle, 1) + " ms", [Math.min(X(s.finBoucle), x0 + W - 150), 470], { taille: 18, coul: C.ok });
        msg = "t_{boucle} \\approx \\frac{50}{1 - " + R.tc(d, 1) + "/10} = " + R.tc(50 / (1 - d / 10), 1) + "\\ \\text{ms (moyenne)}";
      } else {
        tx(g, "la boucle a fait " + vg(s.boucle, 1) + " ms sur 50", [x0 + W / 2, 450], { taille: 18, coul: C.ko });
        if (d >= 10 && !imb) tx(g, s.perdues ? s.perdues + " interruption(s) perdue(s) sur 100 ms" : "100 % du temps dans l'interruption", [x0 + W / 2, 490], { taille: 18, coul: C.ko });
        if (imb && d > 10) tx(g, "routines imbriquées : " + s.profMax + " niveaux de pile, et ça continue", [x0 + W / 2, 490], { taille: 18, coul: C.ko });
        if (imb && d === 10) tx(g, "100 % du temps dans l'interruption", [x0 + W / 2, 490], { taille: 18, coul: C.ko });
        msg = d < 10 ? "\\text{la boucle finit après 100 ms}" : "t \\ge t_{max} = T = 10\\ \\text{ms : la boucle ne s'exécute plus}";
      }
      R.rendre(zone, msg);
    }
    dessiner();
  })();

  /* ---------- Question 2 : un programme pas à pas, ou un circuit qui calcule tout en même temps ---------- */
  if (place("fig-td3-parallele")) (function () {
    var f = R.figure("fig-td3-parallele", { largeur: 960, hauteur: 540, titre: "Huit calculs : l'un après l'autre (processeur) ou tous en même temps (FPGA)",
      essai: "<strong>Essaie</strong> : fais avancer le temps. <strong>Observe</strong> : le processeur fait un calcul par étape, il lui faut 8 étapes ; le FPGA a 8 calculateurs câblés, tout est fini dès la première étape.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var ct = R.curseur(f.reglages, { nom: "Temps", min: 0, max: 8, pas: 1, val: 0, unite: " étapes", surChange: dessiner });
    function rangee(y, titre, faits, sous) {
      tx(g, titre, [40, y - 30], { taille: 20, ancre: "start" });
      tx(g, sous, [40, y + 92], { taille: 16, ancre: "start", gras: false, coul: C.doux });
      for (var k = 0; k < 8; k++) {
        var x = 40 + k * 110, fait = k < faits;
        el("rect", { x: x, y: y, width: 96, height: 64, rx: 10, fill: fait ? C.clair : "#fff", stroke: fait ? C.acc : C.gris, "stroke-width": fait ? 3 : 2 }, g);
        tx(g, fait ? "fait" : "calcul " + (k + 1), [x + 48, y + 32], { taille: 16, coul: fait ? C.encre : C.doux, halo: false });
      }
    }
    function dessiner() {
      EMB.vider(g);
      var t = ct.v;
      rangee(110, "Processeur (microcontrôleur, DSP) : une instruction après l'autre", t, "un calcul par étape");
      rangee(340, "FPGA : huit calculateurs câblés côte à côte", t >= 1 ? 8 : 0, "les huit calculs dans la même étape");
      R.rendre(zone, "\\text{après " + t + " étape" + (t > 1 ? "s" : "") + " : processeur } " + t + "/8 \\qquad \\text{FPGA } " + (t >= 1 ? 8 : 0) + "/8");
    }
    dessiner();
  })();

  /* ---------- Question 5 : la PWM et sa valeur moyenne ---------- */
  if (place("fig-td3-pwm")) (function () {
    var f = R.figure("fig-td3-pwm", { largeur: 960, hauteur: 540, titre: "Un signal PWM : la largeur de l'impulsion règle la valeur moyenne",
      essai: "<strong>Essaie</strong> : fais varier le rapport cyclique α, puis coche « Entre −E et +E » (le dessin du tableau). <strong>Observe</strong> : l'aire au-dessus de zéro moins l'aire en dessous, divisée par T, donne la moyenne (trait vert). À α = 0,5 entre −E et +E, les deux aires s'annulent.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var ca = R.curseur(f.reglages, { nom: "α", min: 0, max: 1, pas: 0.05, val: 0.75, dec: 2, surChange: dessiner });
    var bs = R.bascule(f.reglages, "Entre −E et +E", true, dessiner);
    var x0 = 90, W = 800, T = W / 3, y0 = 280, H = 170;
    function dessiner() {
      EMB.vider(g);
      var a = ca.v, sym = bs.checked, bas = sym ? -1 : 0, moy = sym ? 2 * a - 1 : a;
      function Y(v) { return y0 - v * H; }
      // axes
      el("line", { x1: x0, y1: Y(0), x2: x0 + W + 20, y2: Y(0), stroke: C.encre, "stroke-width": 2.5 }, g);
      el("line", { x1: x0, y1: Y(1.25), x2: x0, y2: Y(-1.25), stroke: C.encre, "stroke-width": 2.5 }, g);
      tx(g, "+E", [x0 - 14, Y(1)], { taille: 18, ancre: "end" });
      tx(g, "0", [x0 - 14, Y(0)], { taille: 18, ancre: "end" });
      if (sym) tx(g, "−E", [x0 - 14, Y(-1)], { taille: 18, ancre: "end" });
      tx(g, "t", [x0 + W + 16, Y(0) + 26], { taille: 18 });
      // aires et signal sur 3 périodes
      var d = "";
      for (var k = 0; k < 3; k++) {
        var xa = x0 + k * T, xh = xa + a * T, xb = xa + T;
        if (a > 0) el("rect", { x: xa, y: Y(1), width: xh - xa, height: Y(0) - Y(1), fill: C.clair }, g);
        if (sym && a < 1) el("rect", { x: xh, y: Y(0), width: xb - xh, height: Y(-1) - Y(0), fill: "#fde4e4" }, g);
        d += (k ? " L" : "M") + xa + " " + Y(a > 0 ? 1 : bas) + " L" + xh + " " + Y(a > 0 ? 1 : bas) + " L" + xh + " " + Y(bas) + " L" + xb + " " + Y(bas) + (k < 2 && a > 0 ? " L" + xb + " " + Y(1) : "");
      }
      el("path", { d: d, fill: "none", stroke: C.acc, "stroke-width": 4, "stroke-linejoin": "round" }, g);
      // cotes de la première période
      var yc = Y(sym ? -1 : 0) + 50;
      el("path", { d: "M" + x0 + " " + (yc - 8) + " V" + (yc + 8) + " M" + (x0 + a * T) + " " + (yc - 8) + " V" + (yc + 8) + " M" + (x0 + T) + " " + (yc - 8) + " V" + (yc + 8) + " M" + x0 + " " + yc + " H" + (x0 + T), stroke: C.encre, "stroke-width": 2 }, g);
      if (a >= 0.15) tx(g, "αT", [x0 + a * T / 2, yc + 26], { taille: 18 });
      if (a <= 0.85) tx(g, "(1 − α)T", [x0 + a * T + (1 - a) * T / 2, yc + 26], { taille: 16 });
      tx(g, "T", [x0 + T, yc - 22], { taille: 18 });
      // moyenne
      el("line", { x1: x0, y1: Y(moy), x2: x0 + W, y2: Y(moy), stroke: C.ok, "stroke-width": 4, "stroke-dasharray": "14 8" }, g);
      tx(g, "moyenne", [x0 + W - 6, Y(moy) - 18], { taille: 18, ancre: "end", coul: C.ok });
      R.rendre(zone, sym
        ? "\\langle u \\rangle = \\alpha E - (1 - \\alpha) E = (2\\alpha - 1)E = " + R.tc(moy, 2) + "\\,E"
        : "\\langle u \\rangle = \\alpha E = " + R.tc(moy, 2) + "\\,E \\quad (E = 3{,}3\\ \\text{V} : " + R.tc(moy * 3.3, 2) + "\\ \\text{V})");
    }
    dessiner();
  })();

  /* ---------- Question 5 : la pile, dernier entré, premier sorti ---------- */
  if (place("fig-td3-pile")) (function () {
    var f = R.figure("fig-td3-pile", { largeur: 960, hauteur: 540, titre: "La pile pendant des appels de fonctions emboîtés",
      essai: "<strong>Essaie</strong> : avance pas à pas. <strong>Observe</strong> : chaque appel pose son adresse de retour sur le dessus ; chaque retour reprend celle du dessus. La dernière posée est la première reprise : LIFO.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var ETAPES = [
      { pile: [], ligne: 0, txt: "loop() s'exécute" },
      { pile: ["retour dans loop()"], ligne: 1, txt: "loop() appelle mesurer() : on empile où revenir" },
      { pile: ["retour dans loop()", "retour dans mesurer()"], ligne: 2, txt: "mesurer() appelle lireADC() : on empile encore" },
      { pile: ["retour dans loop()"], ligne: 3, txt: "lireADC() se termine : on dépile le dessus, retour dans mesurer()" },
      { pile: [], ligne: 4, txt: "mesurer() se termine : on dépile, retour dans loop()" }
    ];
    var CODE = ["void loop() {", "  mesurer();      // appel 1", "    -> lireADC(); // appel 2, dans mesurer()", "    <- fin de lireADC()", "  <- fin de mesurer()"];
    var ce = R.curseur(f.reglages, { nom: "Pas", min: 0, max: 4, pas: 1, val: 0, surChange: dessiner });
    function dessiner() {
      EMB.vider(g);
      var e = ETAPES[ce.v];
      EMB.lignesCode(g, CODE, { x: 20, y: 60, l: 520, pas: 56, taille: 19, sel: e.ligne });
      // la pile : un tube ouvert en haut
      var xp = 580, w = 300, yb = 460, h = 64;
      el("path", { d: "M" + xp + " 120 V" + yb + " H" + (xp + w) + " V120", fill: "none", stroke: C.encre, "stroke-width": 3 }, g);
      tx(g, "La pile", [xp + w / 2, 90], { taille: 20 });
      e.pile.forEach(function (s, i) {
        var y = yb - (i + 1) * (h + 8);
        el("rect", { x: xp + 12, y: y, width: w - 24, height: h, rx: 10, fill: i === e.pile.length - 1 ? C.clair : "#fff", stroke: i === e.pile.length - 1 ? C.acc : C.gris, "stroke-width": 2.5 }, g);
        tx(g, s, [xp + w / 2, y + h / 2], { taille: 17, halo: false });
      });
      if (!e.pile.length) tx(g, "vide", [xp + w / 2, yb - 40], { taille: 18, coul: C.doux, gras: false });
      tx(g, "↑ dessus", [xp + w / 2, 140], { taille: 16, gras: false, coul: C.doux });
      zone.textContent = e.txt + ".";
    }
    dessiner();
  })();

  /* ---------- Question 7 : les cycles de bus en Von Neumann et en Harvard ---------- */
  if (place("fig-td3-bus")) (function () {
    var f = R.figure("fig-td3-bus", { largeur: 960, hauteur: 540, titre: "Les voyages vers la mémoire, cycle par cycle",
      essai: "<strong>Essaie</strong> : change le nombre d'instructions N. <strong>Observe</strong> : en Von Neumann, instructions (I) et données (D) font la queue sur le même bus, 2N cycles ; en Harvard, la donnée de l'instruction k voyage pendant que l'instruction k + 1 arrive, N + 1 cycles.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cn = R.curseur(f.reglages, { nom: "N", min: 1, max: 6, pas: 1, val: 4, surChange: dessiner });
    var x0 = 230, cw = 56, hh = 46;
    function caseBus(x, y, t, fort) {
      el("rect", { x: x, y: y, width: cw - 6, height: hh, rx: 6, fill: fort ? C.clair : "#f3e8ff", stroke: fort ? C.acc : C.v, "stroke-width": 2 }, g);
      tx(g, t, [x + (cw - 6) / 2, y + hh / 2], { taille: 16, halo: false, mono: true });
    }
    function dessiner() {
      EMB.vider(g);
      var N = cn.v;
      // axe des cycles
      for (var c = 0; c < 12; c++) tx(g, String(c + 1), [x0 + c * cw + (cw - 6) / 2, 60], { taille: 16, mono: true, gras: false, coul: C.doux });
      tx(g, "cycle", [x0 - 16, 60], { taille: 16, ancre: "end", gras: false, coul: C.doux });
      // Von Neumann : un seul bus
      tx(g, "Von Neumann", [30, 130], { taille: 20, ancre: "start" });
      tx(g, "un bus", [30, 158], { taille: 16, ancre: "start", gras: false, coul: C.doux });
      for (var k = 0; k < N; k++) { caseBus(x0 + 2 * k * cw, 120, "I" + (k + 1), true); caseBus(x0 + (2 * k + 1) * cw, 120, "D" + (k + 1), false); }
      tx(g, 2 * N + " cycles", [x0 + 2 * N * cw + 10, 143], { taille: 18, ancre: "start", coul: C.acc });
      // Harvard : deux bus
      tx(g, "Harvard", [30, 300], { taille: 20, ancre: "start" });
      tx(g, "bus programme", [30, 268], { taille: 16, ancre: "start", gras: false, coul: C.doux });
      tx(g, "bus données", [30, 336], { taille: 16, ancre: "start", gras: false, coul: C.doux });
      for (var j = 0; j < N; j++) { caseBus(x0 + j * cw, 245, "I" + (j + 1), true); caseBus(x0 + (j + 1) * cw, 313, "D" + (j + 1), false); }
      tx(g, (N + 1) + " cycles", [x0 + (N + 1) * cw + 10, 300], { taille: 18, ancre: "start", coul: C.acc });
      // légende
      caseBus(60, 430, "I", true); tx(g, "aller chercher une instruction", [130, 453], { taille: 16, ancre: "start", gras: false });
      caseBus(500, 430, "D", false); tx(g, "lire ou écrire sa donnée", [570, 453], { taille: 16, ancre: "start", gras: false });
      R.rendre(zone, "\\text{Von Neumann : } 2N = " + 2 * N + " \\qquad \\text{Harvard : } N + 1 = " + (N + 1));
    }
    dessiner();
  })();
})();
