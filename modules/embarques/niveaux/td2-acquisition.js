/* TD 2, question 3 : les trois modes d'acquisition, la moyenne, le bouton BTN_ACQ. */
NIVEAU({
  id: "td2-acquisition",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "btn", x: 20, y: 40, w: 200, h: 80, t: "BTN_ACQ\nGPIO 4" },
      { id: "m0", x: 260, y: 40, w: 400, h: 70, t: "Mode 0 : 1 mesure de num" },
      { id: "m1", x: 260, y: 140, w: 400, h: 70, t: "Mode 1 : N mesures de num" },
      { id: "m2", x: 260, y: 240, w: 400, h: 70, t: "Mode 2 : N mesures × 8 capteurs" },
      { id: "moy", x: 260, y: 360, w: 400, h: 70, t: "moyenne des codes, puis rsensor()" },
      { id: "tab", x: 260, y: 480, w: 400, h: 70, t: "float mesures[8]", mono: true }
    ];
    var L = [["btn", "m0"], ["m1", "moy"], ["m2", "moy"], ["moy", "tab"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Quel mode", jouer: function (j, n) {
      j.titre("Tu veux la résistance moyenne de chacun des 8 capteurs du réseau. Quel mode ?");
      j.choix([
        { html: "Mode 0", aide: "Le mode 0 lit une seule fois un seul capteur." },
        { html: "Mode 1", aide: "Le mode 1 moyenne, mais un seul capteur, celui de numéro num." },
        { html: "Mode 2", juste: true }
      ], { colonnes: 3, ok: function () {
        n.act = { m2: true, moy: true, tab: true }; n.dessin();
        j.bravo("Mode 2 : N mesures de chaque capteur, les 8 cases remplies.");
        j.suite();
      } });
    } },
    { nom: "Combien de lectures", jouer: function (j, n) {
      j.titre("<code>acquisition(2, 0, 20)</code> : combien de fois <code>analogRead()</code> est-elle appelée ?");
      j.nombre({ avant: "\\text{lectures} =", cases: [{ attendu: 160, tol: 0 }], ligne: true,
        aide: function () { return "Le mode 2 fait N mesures pour chacun des 8 capteurs."; },
        ok: function () {
          j.bravo("8 capteurs × 20 mesures = 160 lectures.");
          j.suite();
        } });
    } },
    { nom: "Moyenner quoi", jouer: function (j, n) {
      n.act = { moy: true }; n.dessin();
      j.titre("Pour le mode 1, que vaut-il mieux moyenner ?");
      j.choix([
        { html: "Les N codes, puis convertir une fois en résistance", juste: true },
        { html: "Les N résistances calculées", aide: "Le bruit est sur la tension, et la relation tension-résistance n'est pas linéaire : la moyenne des résistances n'est pas la résistance de la tension moyenne." }
      ], { colonnes: 1, ok: function () {
        j.bravo("On moyenne là où est le bruit : sur la tension.");
        j.expliquer("<p>Et une seule conversion au lieu de N : moins de calcul. Si une mesure tombe sous \\(V^+\\), une résistance infinie ruinerait aussi une moyenne de résistances.</p>");
        j.suite();
      } });
    } },
    { nom: "Appui", jouer: function (j, n) {
      n.act = { btn: true }; n.dessin();
      j.titre("BTN_ACQ relie GPIO 4 à la masse, en <code>INPUT_PULLUP</code>. Bouton appuyé, que lit <code>digitalRead(BTN_ACQ)</code> ?");
      j.choix([
        { html: "HIGH", aide: "Relâché, la résistance de tirage met la broche à 3,3 V. Appuyé, le bouton la relie à quoi ?" },
        { html: "LOW", juste: true }
      ], { colonnes: 2, ok: function () {
        j.bravo("Appuyé : la broche est reliée à la masse, LOW.");
        j.expliquer("<p>On lance le cycle sur le passage de HIGH à LOW, puis on laisse passer les rebonds (quelques dizaines de millisecondes).</p>");
        j.suite();
      } });
    } },
    { nom: "Sur GPIO 35 ?", jouer: function (j, n) {
      j.titre("Peut-on mettre BTN_ACQ sur GPIO 35, avec <code>INPUT_PULLUP</code> ?");
      j.choix([
        { html: "Oui, toute broche d'entrée convient", aide: "Regarde ce qu'ont, ou n'ont pas, les GPIO 34 à 39." },
        { html: "Non : GPIO 34 à 39 n'ont pas de résistance de tirage interne", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("Sans tirage, une entrée relâchée flotte : il faudrait une résistance externe.");
        j.suite();
      } });
    } }
  ]
});
