/* Projet pacemaker, questions 23 à 31 : pont diviseur et tension de batterie, priorité de la stimulation, topic MQTT, R sur T, garde-fou. */
NIVEAU({
  id: "pacemaker-telemetrie",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "bat", x: 20, y: 60, w: 180, h: 90, t: "Batterie\nVbat" },
      { id: "pont", x: 20, y: 250, w: 180, h: 90, t: "Pont\nR1, R2" },
      { id: "adc", x: 20, y: 440, w: 180, h: 90, t: "ADC1\nGPIO 35" },
      { id: "esp", x: 260, y: 250, w: 160, h: 90, t: "ESP32" },
      { id: "cfg", x: 480, y: 120, w: 180, h: 90, t: "pacemaker/\nconfig", mono: true, taille: 16 },
      { id: "etat", x: 480, y: 380, w: 180, h: 90, t: "pacemaker/\netat", mono: true, taille: 16 }
    ];
    var L = [["bat", "pont"], ["pont", "adc"], ["adc", "esp"], ["cfg", "esp"], ["esp", "etat"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Pont diviseur", jouer: function (j, n) {
      n.act = { bat: true, pont: true }; n.dessin();
      j.titre("Batterie à 4,2 V, pont \\(R_1 = 200\\) kΩ (côté batterie), \\(R_2 = 100\\) kΩ (côté masse). Quelle tension arrive sur l'ADC ?");
      j.nombre({ avant: "V_{ADC} =", apres: "\\text{V}", cases: [{ attendu: 1.4, tol: 0.005 }], ligne: true,
        aide: function () { return "VADC = Vbat × R2 / (R1 + R2)."; },
        ok: function () {
          j.bravo("4,2 × 100 / 300 = 1,4 V.");
          j.suite();
        } });
    } },
    { nom: "Tension lue", jouer: function (j, n) {
      n.act = { pont: true, adc: true, esp: true }; n.dessin();
      j.titre("Avec un pont 100 kΩ / 100 kΩ (division par 2), l'ADC 12 bits lit le code 2234. Que vaut \\(V_{bat}\\) ?");
      j.nombre({ avant: "V_{bat} =", apres: "\\text{V}", cases: [{ attendu: 3.6, tol: 0.01 }], ligne: true,
        aide: function () { return "Vbat = 2 × code × 3,3 / 4095."; },
        ok: function () {
          j.bravo("2 × 2234 × 3,3 / 4095 ≈ 3,60 V.");
          j.expliquer("<p>\\[V_{bat} = 2 \\times \\text{code} \\times \\frac{3{,}3}{4095}\\]</p>");
          j.suite();
        } });
    } },
    { nom: "Batterie faible", jouer: function (j, n) {
      j.titre("Question 29 : la tension passe sous le seuil d'alerte. Que ne doit jamais faire la maquette ?");
      j.choix([
        { html: "Envoyer une alerte au dashboard", aide: "Prévenir, c'est justement ce qu'il faut faire." },
        { html: "Arrêter la stimulation pour économiser", juste: true },
        { html: "Publier moins souvent", aide: "Économiser sur la communication est une bonne idée." }
      ], { colonnes: 1, ok: function () {
        j.bravo("La stimulation est la fonction vitale : elle passe avant tout le reste.");
        j.suite();
      } });
    } },
    { nom: "Topic", jouer: function (j, n) {
      n.act = { cfg: true, esp: true }; n.dessin();
      j.titre("Question 25 : le dashboard veut changer la fréquence cible. Sur quel topic publie-t-il <code>{\"freq\":70}</code> ?");
      j.choix([
        { html: "<code>pacemaker/etat</code>", aide: "C'est l'ESP32 qui publie son état ; le dashboard s'y abonne." },
        { html: "<code>pacemaker/config</code>", juste: true },
        { html: "<code>pacemaker/alerte</code>", aide: "Les alertes viennent de l'ESP32." }
      ], { colonnes: 1, ok: function () {
        j.bravo("L'ESP32 est abonnée à pacemaker/config ; elle vérifie la valeur avant de l'appliquer.");
        j.suite();
      } });
    } },
    { nom: "Onde T", jouer: function (j, n) {
      n.act = {}; n.dessin();
      j.titre("Question 30 : un défaut de détection fait stimuler pendant l'onde T. Quel risque ?");
      j.choix([
        { html: "Aucun, la stimulation est juste un peu en avance", aide: "Le tableau des modes du sujet nomme ce risque pour les modes asynchrones." },
        { html: "Le phénomène « R sur T », qui peut déclencher une arythmie ventriculaire grave", juste: true },
        { html: "La batterie s'use plus vite, c'est tout", aide: "La pile n'est pas le problème : pense au moment de l'impulsion dans le cycle du cœur." }
      ], { colonnes: 1, ok: function () {
        j.bravo("C'est le risque cité pour tous les modes asynchrones (VOO, DOO).");
        j.suite();
      } });
    } },
    { nom: "Garde-fou", jouer: function (j, n) {
      j.titre("Question 31 : garde-fou à 150 bpm au plus. Quel écart minimal entre deux stimulations ?");
      j.nombre({ avant: "\\text{écart minimal} =", apres: "\\text{ms}", cases: [{ attendu: 400, tol: 0 }], ligne: true,
        aide: function () { return "Écart = 60 000 / fréquence maximale."; },
        ok: function () {
          j.bravo("60 000 / 150 = 400 ms.");
          j.expliquer("<p>Dans <code>stimuler()</code> : si moins de 400 ms depuis le dernier battement, on refuse, quoi qu'il arrive ailleurs.</p>");
          j.suite();
        } });
    } }
  ]
});
