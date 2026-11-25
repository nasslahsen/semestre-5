/* TD 3, questions 1 à 5 : définition, mémoire du programme, DSP, rôle des composants, contraintes. */
NIVEAU({
  id: "td3",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "mat", x: 20, y: 40, w: 300, h: 80, t: "Matériel" },
      { id: "log", x: 360, y: 40, w: 300, h: 80, t: "Logiciel" },
      { id: "flash", x: 20, y: 180, w: 200, h: 80, t: "Flash" },
      { id: "sram", x: 240, y: 180, w: 200, h: 80, t: "SRAM" },
      { id: "dsp", x: 460, y: 180, w: 200, h: 80, t: "DSP" },
      { id: "pwm", x: 20, y: 330, w: 150, h: 70, t: "PWM" },
      { id: "wd", x: 185, y: 330, w: 150, h: 70, t: "Watchdog" },
      { id: "tim", x: 350, y: 330, w: 150, h: 70, t: "Timer" },
      { id: "uart", x: 515, y: 330, w: 145, h: 70, t: "UART" },
      { id: "pile", x: 20, y: 460, w: 640, h: 70, t: "La pile" }
    ];
    n.dessin = function () { EMB.scene(g, B, [], n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le terme", jouer: function (j, n) {
      j.titre("Question 4a : le terme « système embarqué » désigne…");
      j.choix([
        { html: "le matériel", aide: "Un microcontrôleur sans programme ne fait rien. Le cours le dit : le terme désigne aussi bien…" },
        { html: "le logiciel", aide: "Un programme sans carte ne mesure rien. Le cours le dit : le terme désigne aussi bien…" },
        { html: "le matériel et le logiciel", juste: true }
      ], { colonnes: 3, ok: function () {
        n.act = { mat: true, log: true }; n.dessin();
        j.bravo("Les deux : un système électronique et informatique.");
        j.suite();
      } });
    } },
    { nom: "Le programme", jouer: function (j, n) {
      j.titre("Question 4b : le programme d'un système embarqué doit rester après une coupure de courant. Dans quelle mémoire ?");
      j.choix([
        { html: "SRAM", aide: "La SRAM s'efface à la coupure : elle sert aux variables." },
        { html: "DRAM", aide: "La DRAM s'efface à la coupure, et doit même être rafraîchie en permanence." },
        { html: "Flash program memory", juste: true }
      ], { colonnes: 3, ok: function () {
        n.act = { flash: true }; n.dessin();
        j.bravo("La flash est non volatile.");
        j.suite();
      } });
    } },
    { nom: "Filtres", jouer: function (j, n) {
      j.titre("Question 4c : filtres numériques et blocs de modulation demandent…");
      j.choix([
        { html: "un DSP", juste: true },
        { html: "un processeur généraliste", aide: "Il sait le faire, mais lentement : quel circuit est optimisé pour le traitement du signal ?" },
        { html: "un FPGA", aide: "Possible, mais la réponse du cours est le circuit optimisé pour le traitement du signal numérique." }
      ], { colonnes: 3, ok: function () {
        n.act = { dsp: true }; n.dessin();
        j.bravo("DSP : composant optimisé pour le traitement du signal (filtrage, extraction).");
        j.suite();
      } });
    } },
    { nom: "Rôles", jouer: function (j, n) {
      j.titre("Question 5 : associe chaque rôle à son composant.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr auto;gap:10px 14px;align-items:center;font-size:17px">' +
        '<span>redémarre la puce si le programme ne répond plus</span><span class="trou" data-attendu="wd"></span>' +
        '<span>règle une tension moyenne par le rapport cyclique</span><span class="trou" data-attendu="pwm"></span>' +
        '<span>garde l\'adresse de retour d\'une fonction</span><span class="trou" data-attendu="pile"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "uart", html: "UART" }, { id: "pile", html: "Pile" }, { id: "wd", html: "Watchdog" }, { id: "pwm", html: "PWM" }, { id: "tim", html: "Timer" }],
        aide: "Watchdog : le chien de garde. PWM : largeur d'impulsion. Pile : dernier entré, premier sorti.",
        ok: function () {
          n.act = { wd: true, pwm: true, pile: true }; n.dessin();
          j.bravo("Watchdog, PWM, pile.");
          j.expliquer("<p>Le timer compte le temps et cadence les interruptions ; l'UART envoie et reçoit des octets en série, sans horloge.</p>");
          j.suite();
        } });
    } },
    { nom: "Contraintes", jouer: function (j, n) {
      n.act = {}; n.dessin();
      j.titre("Question 1 : lequel de ces groupes donne trois contraintes d'un système embarqué ?");
      j.choix([
        { html: "Écran couleur, clavier, système d'exploitation", aide: "Ce sont des équipements, pas des contraintes : beaucoup de systèmes embarqués n'en ont pas." },
        { html: "Consommation et place limitées, temps de réponse, fiabilité et sécurité", juste: true },
        { html: "Puissance illimitée, mémoire illimitée, coût élevé", aide: "C'est l'inverse : le cours parle de ressources limitées." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Ressources limitées, temps réel, sûreté : les exigences du cours.");
        j.suite();
      } });
    } }
  ]
});
