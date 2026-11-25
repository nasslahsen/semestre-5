/* Projet pacemaker, questions 9 à 16 : broche de l'ECG, alarme du timer de stimulation, RR et fréquence, période réfractaire, watchdog. */
NIVEAU({
  id: "pacemaker-esp32",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { r: [] };
    n.dessin = function () {
      EMB.vider(g);
      var x0 = 40, W = 600, y0 = 360, X = function (t) { return x0 + t / 2400 * W; };
      EMB.texte(g, "ECG simulé lu par l'ADC", [340, 50], { taille: 18 });
      EMB.el("line", { x1: x0, y1: y0, x2: x0 + W, y2: y0, stroke: EMB.C.gris, "stroke-width": 2 }, g);
      [300, 1050, 1800].forEach(function (t) {
        var x = X(t);
        EMB.el("path", { d: "M" + (x - 14) + " " + y0 + " L" + (x - 5) + " " + (y0 + 14) + " L" + x + " " + (y0 - 190) + " L" + (x + 7) + " " + (y0 + 26) + " L" + (x + 15) + " " + y0, fill: "none", stroke: EMB.C.encre, "stroke-width": 3, "stroke-linejoin": "round" }, g);
        EMB.el("path", { d: "M" + (x + 50) + " " + y0 + " Q" + (x + 85) + " " + (y0 - 70) + " " + (x + 120) + " " + y0, fill: "none", stroke: EMB.C.encre, "stroke-width": 3 }, g);
      });
      EMB.el("line", { x1: x0, y1: y0 - 120, x2: x0 + W, y2: y0 - 120, stroke: EMB.C.acc, "stroke-width": 2.5, "stroke-dasharray": "10 6" }, g);
      EMB.texte(g, "seuil", [x0 + W - 4, y0 - 140], { taille: 16, ancre: "end", coul: EMB.C.acc });
      n.r.forEach(function (t) { EMB.fleche(g, [X(t), 110], [X(t), 150], { coul: EMB.C.ko, ep: 3 }); });
      if (n.rr) {
        EMB.fleche(g, [X(1050), 460], [X(1800), 460], { double: true, ep: 2.5 });
        EMB.texte(g, "RR = 750 ms", [X(1425), 490], { taille: 18, mono: true });
      }
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Alarme", jouer: function (j, n) {
      j.titre("Question 11 : le timer compte à 10 kHz (<code>timerBegin(10000)</code>, un pas = 100 µs). Quelle valeur d'alarme pour stimuler à 50 bpm ?");
      j.nombre({ avant: "\\text{alarme} =", apres: "\\text{pas}", cases: [{ attendu: 12000, tol: 0 }], ligne: true,
        aide: function () { return "Période = 60 000 / 50 ms. Puis le nombre de pas de 0,1 ms."; },
        ok: function () {
          j.bravo("1 200 ms / 0,1 ms = 12 000 pas.");
          j.suite();
        } });
    } },
    { nom: "Broche", jouer: function (j, n) {
      j.titre("Question 10 : la maquette a une interface web (Wi-Fi). Sur quelle broche lire l'ECG simulé ?");
      j.choix([
        { html: "GPIO 4 (ADC2_CH0)", aide: "L'ADC2 ne marche plus quand le Wi-Fi est utilisé." },
        { html: "GPIO 34 (ADC1_CH6)", juste: true },
        { html: "GPIO 2", aide: "GPIO 2 porte la LED bleue, et elle est sur l'ADC2." }
      ], { colonnes: 1, ok: function () {
        j.bravo("ADC1 : la mesure continue avec le Wi-Fi.");
        j.suite();
      } });
    } },
    { nom: "RR", jouer: function (j, n) {
      n.r = [1050, 1800]; n.dessin();
      j.titre("Question 15 : deux ondes R sont détectées à t = 1 050 ms et t = 1 800 ms. Que vaut l'intervalle RR ?");
      j.nombre({ avant: "RR =", apres: "\\text{ms}", cases: [{ attendu: 750, tol: 0 }], ligne: true,
        aide: function () { return "RR = différence entre les deux instants de détection."; },
        ok: function () {
          n.rr = true; n.dessin();
          j.bravo("1 800 − 1 050 = 750 ms.");
          j.suite();
        } });
    } },
    { nom: "Fréquence", jouer: function (j, n) {
      j.titre("Avec RR = 750 ms, quelle fréquence cardiaque ?");
      j.nombre({ avant: "f_C =", apres: "\\text{bpm}", cases: [{ attendu: 80, tol: 0.1 }], ligne: true,
        aide: function () { return "fC = 60 000 / RR, avec RR en ms."; },
        ok: function () {
          j.bravo("60 000 / 750 = 80 bpm.");
          j.expliquer("<p>\\[f_C = \\frac{60\\,000}{RR}\\]</p>");
          j.suite();
        } });
    } },
    { nom: "Double comptage", jouer: function (j, n) {
      n.r = [300, 330, 1050, 1080, 1800, 1830]; n.rr = false; n.dessin();
      j.titre("Question 14 : chaque onde R à deux sommets est comptée deux fois, à 30 ms d'écart. Comment l'éviter ?");
      j.choix([
        { html: "Baisser le seuil", aide: "Plus bas, le seuil serait franchi encore plus souvent (onde T comprise)." },
        { html: "Ignorer le signal pendant une période réfractaire (250 ms) après chaque détection", juste: true },
        { html: "Échantillonner plus vite", aide: "Plus d'échantillons ne change rien : les deux sommets dépassent toujours le seuil." }
      ], { colonnes: 1, ok: function () {
        n.r = [300, 1050, 1800]; n.dessin();
        j.bravo("Une seule détection par battement.");
        j.expliquer("<p>Une hystérésis (redescendre nettement sous le seuil avant d'accepter un nouveau franchissement) aide aussi contre le bruit.</p>");
        j.suite();
      } });
    } },
    { nom: "Watchdog", jouer: function (j, n) {
      j.titre("Question 16 : où remettre le watchdog à zéro ?");
      j.choix([
        { html: "Une fois par tour de <code>loop()</code>, là où se font détection et stimulation", juste: true },
        { html: "Dans l'interruption du timer d'échantillonnage", aide: "L'interruption continue d'arriver même si la boucle est bloquée : le chien ne verrait rien." },
        { html: "Une seule fois, dans <code>setup()</code>", aide: "Le chien redémarrerait la puce au bout de son délai, même si tout va bien." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Si la boucle se bloque, plus de remise à zéro : le watchdog redémarre la puce.");
        j.suite();
      } });
    } }
  ]
});
