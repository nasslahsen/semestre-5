/* TD 3, question 9 : les blocs du microcontrôleur PIC. */
NIVEAU({
  id: "td3-pic",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "prog", x: 20, y: 40, w: 180, h: 250, t: "Program\nMemory\n2 MB" },
      { id: "cpu", x: 240, y: 40, w: 200, h: 130, t: "CPU\n83 instructions" },
      { id: "pile", x: 240, y: 200, w: 200, h: 90, t: "Stack 16\nProgram Counter", taille: 17 },
      { id: "osc", x: 480, y: 40, w: 180, h: 70, t: "Oscillator", taille: 17 },
      { id: "eep", x: 480, y: 130, w: 180, h: 60, t: "Data EEPROM", taille: 17 },
      { id: "ram", x: 480, y: 210, w: 180, h: 80, t: "Data Memory\n4 KB", taille: 17 },
      { id: "per", x: 20, y: 420, w: 640, h: 100, t: "Peripheral I/O Drivers\nADC, SPI/I²C, EUSART, PWM" }
    ];
    var L = [["prog", "cpu"], ["ram", "cpu"], ["cpu", "per"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le programme", jouer: function (j, n) {
      j.titre("Quel bloc garde le programme, même sans alimentation ?");
      j.choix([
        { html: "Program Memory", juste: true },
        { html: "Data Memory", aide: "La Data Memory est une RAM : elle s'efface à la coupure." },
        { html: "16-Level Stack", aide: "La pile garde des adresses de retour, pas le programme." }
      ], { colonnes: 1, ok: function () {
        n.act = { prog: true }; n.dessin();
        j.bravo("Program Memory : la flash, jusqu'à 2 MB.");
        j.suite();
      } });
    } },
    { nom: "Prochaine instruction", jouer: function (j, n) {
      j.titre("Quel registre donne l'adresse de la prochaine instruction à exécuter ?");
      j.choix([
        { html: "La pile (Stack)", aide: "La pile garde les adresses de retour, pour revenir après un sous-programme." },
        { html: "Le Program Counter", juste: true },
        { html: "Les File Select Registers", aide: "Les FSR pointent une donnée en mémoire de données (adressage indirect)." }
      ], { colonnes: 1, ok: function () {
        n.act = { pile: true }; n.dessin();
        j.bravo("Le PC avance d'une instruction à chaque pas, ou saute.");
        j.suite();
      } });
    } },
    { nom: "Étalonnage", jouer: function (j, n) {
      j.titre("Un tensiomètre garde son coefficient d'étalonnage, même pile retirée. Dans quel bloc ?");
      j.choix([
        { html: "Data Memory", aide: "C'est de la RAM : le coefficient serait perdu à la coupure." },
        { html: "Program Memory", aide: "Elle garde le programme ; une donnée qui change de temps en temps va dans un bloc fait pour les données." },
        { html: "Data EEPROM", juste: true }
      ], { colonnes: 1, ok: function () {
        n.act = { eep: true }; n.dessin();
        j.bravo("L'EEPROM de données est non volatile.");
        j.suite();
      } });
    } },
    { nom: "16 niveaux", jouer: function (j, n) {
      j.titre("La pile a 16 niveaux. Combien de sous-programmes (ou d'interruptions) peuvent être emboîtés au plus ?");
      j.nombre({ avant: "\\text{appels emboîtés} =", cases: [{ attendu: 16, tol: 0 }], ligne: true,
        aide: function () { return "Chaque appel range une adresse de retour dans un niveau de la pile."; },
        ok: function () {
          j.bravo("16 : au 17e, la pile déborde.");
          j.suite();
        } });
    } },
    { nom: "Architecture", jouer: function (j, n) {
      n.act = { prog: true, cpu: true, ram: true }; n.dessin();
      j.titre("Program Memory et Data Memory ont chacune leur chemin vers le CPU. Quelle architecture ?");
      j.choix([
        { html: "Harvard", juste: true },
        { html: "Von Neumann", aide: "Von Neumann : une seule mémoire et un seul bus pour tout." }
      ], { colonnes: 2, ok: function () {
        j.bravo("Harvard. Et avec 83 instructions, le PIC est un RISC.");
        j.suite();
      } });
    } }
  ]
});
