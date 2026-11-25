// TD 3 : le microcontrôleur PIC (un bloc touché, son rôle) et le partage du temps entre boucle et interruption.
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
})();
