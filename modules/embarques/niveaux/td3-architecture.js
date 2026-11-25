/* TD 3, questions 6 à 8 : RISC et CISC, cycles en Von Neumann et en Harvard, Super Harvard, scrutation, interruption, DMA. */
NIVEAU({
  id: "td3-architecture",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "pm", x: 20, y: 60, w: 200, h: 90, t: "Program\nMemory" },
      { id: "cpu", x: 240, y: 60, w: 200, h: 90, t: "CPU" },
      { id: "dm", x: 460, y: 60, w: 200, h: 90, t: "Data\nMemory" },
      { id: "adc", x: 20, y: 300, w: 200, h: 90, t: "ADC" },
      { id: "dma", x: 240, y: 300, w: 200, h: 90, t: "DMA" },
      { id: "ram", x: 460, y: 300, w: 200, h: 90, t: "RAM" },
      { id: "io", x: 240, y: 460, w: 200, h: 80, t: "I/O Controller" }
    ];
    var L = [["pm", "cpu"], ["dm", "cpu"], ["adc", "dma"], ["dma", "ram"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "RISC ou CISC", jouer: function (j, n) {
      j.titre("Instructions d'un cycle, de registre à registre, LOAD et STORE à part : c'est…");
      j.choix([
        { html: "RISC", juste: true },
        { html: "CISC", aide: "Le CISC a des instructions complexes de plusieurs cycles, de mémoire à mémoire." }
      ], { colonnes: 2, ok: function () {
        j.bravo("RISC : la complexité est dans le logiciel.");
        j.suite();
      } });
    } },
    { nom: "Compter les cycles", jouer: function (j, n) {
      n.act = { pm: true, cpu: true, dm: true }; n.dessin();
      j.titre("Une boucle de 12 instructions, chacune avec une donnée. Combien de cycles de bus en Von Neumann, puis en Harvard (modèle du cours) ?");
      j.nombre({ avant: "\\text{VN, Harvard} =", cases: [{ attendu: 24, tol: 0 }, { attendu: 13, tol: 0 }], ligne: true,
        aide: function (k) { return k === 0 ? "Von Neumann : instruction et donnée passent l'une après l'autre sur le même bus, 2N." : "Harvard : la donnée de l'instruction k passe pendant que l'instruction k + 1 arrive, N + 1."; },
        ok: function () {
          j.bravo("2 × 12 = 24 en Von Neumann, 12 + 1 = 13 en Harvard.");
          j.suite();
        } });
    } },
    { nom: "Super Harvard", jouer: function (j, n) {
      n.act = { io: true, dm: true }; n.dessin();
      j.titre("Qu'ajoute la Super Harvard à la Harvard ?");
      j.choix([
        { html: "Une seule mémoire pour tout", aide: "C'est la Von Neumann, l'inverse." },
        { html: "Un cache d'instructions et un contrôleur d'entrées-sorties dédié", juste: true },
        { html: "Des instructions plus complexes", aide: "Ça, c'est une question de jeu d'instructions (CISC), pas de mémoires et de bus." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Les données des entrées-sorties arrivent en Data Memory sans passer par le CPU.");
        j.suite();
      } });
    } },
    { nom: "Gros flux", jouer: function (j, n) {
      n.act = { adc: true, dma: true, ram: true }; n.dessin();
      j.titre("Un ECG à 1000 échantillons par seconde doit aller en RAM pendant que le CPU calcule le rythme. Quelle méthode ?");
      j.choix([
        { html: "Scrutation", aide: "Le CPU passerait son temps à regarder si une donnée est prête." },
        { html: "Interruption à chaque échantillon", aide: "Possible, mais le CPU serait dérangé 1000 fois par seconde pour recopier une donnée." },
        { html: "DMA", juste: true }
      ], { colonnes: 3, ok: function () {
        j.bravo("Le DMA copie sans le CPU, qui reste libre.");
        j.suite();
      } });
    } },
    { nom: "Événement rare", jouer: function (j, n) {
      n.act = { cpu: true }; n.dessin();
      j.titre("Un bouton d'appel malade, pressé quelques fois par jour. La meilleure méthode ?");
      j.choix([
        { html: "Scrutation permanente", aide: "Le CPU vérifierait le bouton des millions de fois pour rien." },
        { html: "Interruption", juste: true },
        { html: "DMA", aide: "Le DMA sert aux gros flux de données, pas à un événement isolé." }
      ], { colonnes: 3, ok: function () {
        j.bravo("Le bouton prévient le CPU quand il est pressé, et seulement alors.");
        j.suite();
      } });
    } }
  ]
});
