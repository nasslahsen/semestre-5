/* TD 2, question 1 : les broches de l'ESP32 pour S1 à S3 et AIN1, le code lu par l'ADC. */
NIVEAU({
  id: "td2",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "fsr", x: 20, y: 70, w: 150, h: 80, t: "8 capteurs\nFSR" },
      { id: "mux", x: 20, y: 250, w: 150, h: 90, t: "NX3L4051\nS1 S2 S3" },
      { id: "aop", x: 20, y: 440, w: 150, h: 80, t: "AOP\nVA" },
      { id: "s", x: 270, y: 250, w: 150, h: 90, t: "P1.0 à P1.2" },
      { id: "ain", x: 270, y: 440, w: 150, h: 80, t: "AIN1" },
      { id: "esp", x: 510, y: 180, w: 150, h: 340, t: "ESP32" }
    ];
    var L = [["fsr", "mux"], ["mux", "aop"], ["s", "mux"], ["aop", "ain"], ["esp", "s"], ["ain", "esp"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Type de broche", jouer: function (j, n) {
      n.act = { s: true, mux: true }; n.dessin();
      j.titre("P1.0, P1.1 et P1.2 commandent S1, S2, S3 du multiplexeur. De quel type de broche ont-ils besoin ?");
      j.choix([
        { html: "Des sorties numériques", juste: true },
        { html: "Des entrées analogiques", aide: "Le microcontrôleur ne mesure rien sur S1 à S3 : il y écrit un code binaire pour choisir le capteur." },
        { html: "Des entrées numériques", aide: "Qui écrit le code S3 S2 S1 : le multiplexeur ou le microcontrôleur ?" }
      ], { colonnes: 1, ok: function () {
        j.bravo("Trois sorties : le microcontrôleur écrit le numéro du capteur en binaire.");
        j.suite();
      } });
    } },
    { nom: "Broche interdite", jouer: function (j, n) {
      j.titre("Laquelle de ces broches ne peut pas commander S1 ?");
      j.choix([
        { html: "GPIO 25", aide: "GPIO 25 peut sortir un niveau logique (c'est aussi le DAC1)." },
        { html: "GPIO 26", aide: "GPIO 26 peut sortir un niveau logique." },
        { html: "GPIO 34", juste: true },
        { html: "GPIO 27", aide: "GPIO 27 peut sortir un niveau logique." }
      ], { colonnes: 2, ok: function () {
        j.bravo("GPIO 34 à 39 sont des entrées seulement.");
        j.expliquer("<p>Elles n'ont ni sortie ni résistance de tirage : parfaites pour lire une tension, inutilisables pour commander.</p>");
        j.suite();
      } });
    } },
    { nom: "AIN1 et Wi-Fi", jouer: function (j, n) {
      n.act = { ain: true, aop: true }; n.dessin();
      j.titre("La semelle envoie ses mesures en Wi-Fi. Sur quelle broche lire AIN1 ?");
      j.choix([
        { html: "GPIO 4 (ADC2_CH0)", aide: "Les broches de l'ADC2 ne marchent plus quand le Wi-Fi est utilisé." },
        { html: "GPIO 34 (ADC1_CH6)", juste: true },
        { html: "GPIO 2 (LED bleue)", aide: "GPIO 2 est sur l'ADC2, et elle porte déjà la LED de la carte." }
      ], { colonnes: 1, ok: function () {
        j.bravo("ADC1 : la mesure marche aussi avec le Wi-Fi.");
        j.suite();
      } });
    } },
    { nom: "Code lu", jouer: function (j, n) {
      n.act = { ain: true, esp: true }; n.dessin();
      j.titre("\\(V_A = 2{,}2\\) V sur AIN1. Quel code renvoie l'ADC de 12 bits (0 à 4095 pour 0 à 3,3 V) ?");
      j.nombre({ avant: "\\text{code} =", cases: [{ attendu: 2730, tol: 1 }], ligne: true,
        aide: function () { return "Code = 4095 × VA / 3,3."; },
        ok: function () {
          j.bravo("4095 × 2,2 / 3,3 = 2730.");
          j.expliquer("<p>\\[\\text{code} = 4095 \\times \\frac{V_A}{3{,}3\\ \\text{V}}\\]</p><p>Le programme fera le calcul inverse : \\(V_A = \\text{code} \\times 3{,}3 / 4095\\).</p>");
          j.suite();
        } });
    } }
  ]
});
