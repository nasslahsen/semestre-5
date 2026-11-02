(function () {
  "use strict";
  var R = RM, C = EMB.C;
  /* ---------- Time-based ou event-driven : quand le capteur transmet ---------- */
  (function () {
    var f = R.figure("fig-temps", {
      largeur: 960, hauteur: 400, titre: "Time-based ou event-driven",
      essai: "<strong>Essaie</strong> : passe de Time-based à Event-driven. <strong>Observe</strong> : en time-based, un envoi à chaque pas de temps, qu'il se passe quelque chose ou non ; en event-driven, un envoi seulement quand un événement survient."
    });
    var g = EMB.el("g", null, f.svg), mode = "temps", b = R.boutons(f.reglages), btns = {};
    btns.temps = R.bouton(b, "Time-based", function () { mode = "temps"; dessiner(); });
    btns.evt = R.bouton(b, "Event-driven", function () { mode = "evt"; dessiner(); });
    var zone = R.h("p", null, "", f.direct), EVTS = [3.2, 7.6, 8.4];
    function x(t) { return 70 + t * 80; }
    function dessiner() {
      EMB.vider(g);
      Object.keys(btns).forEach(function (k) { btns[k].classList.toggle("actif", k === mode); });
      EMB.fleche(g, [50, 300], [920, 300], { ep: 3 });
      EMB.texte(g, "temps", [900, 330], { taille: 18, coul: C.doux });
      EVTS.forEach(function (t) { EMB.el("polygon", { points: [[x(t), 312], [x(t) - 12, 340], [x(t) + 12, 340]].join(" "), fill: C.ko }, g); });
      EMB.texte(g, "événements (activité détectée)", [480, 372], { taille: 18, coul: C.ko });
      var envois = mode === "temps" ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : EVTS;
      envois.forEach(function (t) {
        EMB.el("line", { x1: x(t), y1: 296, x2: x(t), y2: 120, stroke: C.acc, "stroke-width": 5 }, g);
        EMB.el("circle", { cx: x(t), cy: 112, r: 11, fill: C.acc }, g);
      });
      EMB.texte(g, mode === "temps" ? "un envoi tous les Δt, même sans événement" : "un envoi à chaque événement, rien entre deux", [480, 60], { taille: 22, coul: C.acc });
      zone.textContent = envois.length + " envois sur la période, pour " + EVTS.length + " événements.";
    }
    dessiner();
  })();
  /* ---------- Technologies : débit en fonction de la portée (graphique du cours) ---------- */
  (function () {
    var f = R.figure("fig-technologies", {
      largeur: 960, hauteur: 520, titre: "Technologies de communication",
      essai: "<strong>Essaie</strong> : touche une technologie. <strong>Observe</strong> : en haut à droite, beaucoup de débit et de portée, mais plus de consommation et de coût ; en bas, des radios sobres, courtes ou lentes."
    });
    var g = EMB.el("g", null, f.svg), choix = "BLE", b = R.boutons(f.reglages), btns = {};
    // [nom, portée min, portée max (log10 m), débit min, débit max (log10 bps), texte]
    var T = [
      ["RFID", 0, 0.6, 2.8, 3.3, "RFID : quelques mètres, vers 1 kbps."],
      ["BLE", 1, 1.9, 4.6, 5.4, "BLE, Zigbee, Z-Wave : 10 à 100 m, vers 100 kbps. Le cours le coche pour les objets portés et la santé connectée."],
      ["Bluetooth", 0.9, 1.4, 5.7, 6.3, "Bluetooth : vers 10 m, vers 1 Mbps."],
      ["Wi-Fi", 0.9, 1.4, 7.2, 8, "Wi-Fi : vers 10 m, jusqu'à 100 Mbps."],
      ["HaLow", 1.8, 2.4, 6.4, 7.1, "Wi-Fi HaLow : vers 100 m, entre 1 et 100 Mbps."],
      ["Cellulaire", 2.8, 3.2, 6.2, 8, "Cellulaire (3G, 4G/LTE, 5G) : vers 1 km, beaucoup de débit, cher. Coché pour la santé connectée."],
      ["LPWAN licence", 2.2, 3.4, 5, 6, "LPWAN sous licence (LTE-M, EC-GSM, NB-IoT) : 100 m à plus de 1 km, 100 kbps à 1 Mbps."],
      ["LPWAN libre", 3, 4, 3, 4.6, "LPWAN sans licence (MYTHINGS, LoRa, Sigfox) : jusqu'à 10 km, quelques kbps : loin et sobre, mais lent."]
    ];
    T.forEach(function (t) { btns[t[0]] = R.bouton(b, t[0], function () { choix = t[0]; dessiner(); }); });
    var zone = R.h("p", null, "", f.direct);
    function X(l) { return 120 + l * 200; }
    function Y(l) { return 470 - (l - 2.6) * 78; }
    function dessiner() {
      EMB.vider(g);
      Object.keys(btns).forEach(function (k) { btns[k].classList.toggle("actif", k === choix); });
      EMB.fleche(g, [110, 470], [950, 470], { ep: 3 }); EMB.fleche(g, [120, 480], [120, 20], { ep: 3 });
      [[0, "1 m"], [1, "10 m"], [2, "100 m"], [3, "1 km"], [4, "10 km"]].forEach(function (p) { EMB.texte(g, p[1], [X(p[0]), 496], { taille: 17, coul: C.doux }); });
      [[3, "1 kbps"], [5, "100 kbps"], [6, "1 Mbps"], [8, "100 Mbps"]].forEach(function (p) { EMB.texte(g, p[1], [62, Y(p[0])], { taille: 16, coul: C.doux }); });
      T.forEach(function (t) {
        var on = t[0] === choix;
        EMB.bloc(g, X(t[1]), Y(t[4]), Math.max(X(t[2]) - X(t[1]), 90), Y(t[3]) - Y(t[4]), t[0], { taille: 16, actif: on, fill: on ? null : "#eef2fb", stroke: on ? null : "#9bb0dc" });
      });
      EMB.texte(g, "débit", [160, 20], { taille: 17, coul: C.doux }); EMB.texte(g, "portée", [905, 446], { taille: 17, coul: C.doux });
      zone.textContent = T.filter(function (t) { return t[0] === choix; })[0][5];
    }
    dessiner();
  })();
})();
