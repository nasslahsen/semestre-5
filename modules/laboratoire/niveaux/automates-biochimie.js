/* Niveau : automates de biochimie (3.5, 3.6, 3.10) : cycle d'un test, unités, chimie sèche ou liquide, température, mesure à blanc. */
NIVEAU(LABO.rejouable({
  id: "automates-biochimie",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Le cycle d'un test", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre les étapes d'un test dans l'automate.");
      j.consigne("Touche les étapes dans l'ordre.");
      var N = ["Le photomètre lit l'absorbance", "La pompe SPP aspire l'échantillon", "L'unité de lavage nettoie la cuve", "L'unité MIX mélange", "Le carrousel ASP amène le tube", "La pompe RPP ajoute le réactif", "La réaction se fait à 37 °C"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 19, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 110, y: 18 + i * 82, w: 460, h: 64 }; }),
        ordre: [4, 1, 5, 3, 6, 0, 2],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["Le tube doit d'abord arriver.", "On prélève l'échantillon.", "On lui ajoute le réactif.", "On homogénéise.", "On laisse réagir au chaud.", "On mesure.", "On prépare la cuve pour le test suivant."][k]; },
        fin: function () { j.bravo("ASP, SPP, RPP, MIX, 37 °C, photomètre, lavage."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Les sigles", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque sigle à son unité.");
      j.consigne("Touche un sigle, puis sa fonction.");
      var p = A.paires({
        g: n.g, gauche: ["RCU", "WU", "SPP", "MIX"],
        droite: ["Aspire l'échantillon et l'eau pure", "Homogénéise échantillon et réactifs", "Garde les réactifs au froid", "Lave les cuves et vérifie leur propreté"],
        bon: [2, 3, 0, 1], xg: 20, wg: 200, xd: 280, wd: 380, y0: 60, h: 104, pas: 134, taille: 20,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["R comme réactifs.", "W comme washing : le lavage.", "S comme sample : l'échantillon.", "Mix : mélanger."][i]; },
        fin: function () { j.bravo("Réactifs, lavage, échantillon, agitation."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Sèche ou liquide ?", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 140, y: 250, width: 400, height: 70, rx: 8, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, n.g);
      A.s("rect", { x: 300, y: 260, width: 80, height: 50, rx: 6, fill: C.sang, opacity: 0.6 }, n.g);
      A.fleche(n.g, [250, 120], [320, 245], { coul: C.jeu, ep: 4 }); A.fleche(n.g, [360, 245], [430, 120], { coul: C.jeu, ep: 4 });
      A.texte(n.g, "bandelette réactive", [340, 370], { taille: 22, gras: 800 });
      j.titre("Un analyseur en chimie sèche lit une bandelette. Que mesure-t-il ?");
      j.choix([
        { html: "La lumière réfléchie par la zone colorée : la réflectance", juste: true },
        { html: "La lumière transmise à travers une cuve", aide: "C'est la chimie liquide. Une bandelette n'est pas transparente." },
        { html: "Une tension entre deux électrodes", aide: "C'est la potentiométrie, pour les ions." }
      ], { colonnes: 1, ok: function () { j.bravo("Réflectance : un photomètre à réflectance, souvent avec une sphère d'Ulbricht."); j.suite(); } });
    } },
    { nom: "Le carrousel de réaction", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "thermo", [340, 260], 220, A.C.chaud);
      j.titre("À quelle température le carrousel de réaction maintient-il les cuves ?");
      j.nombre({ avant: "T =", apres: "^\\circ\\text{C}", cases: [{ attendu: 37, tol: 0 }],
        aide: function () { return "La température du corps, celle à laquelle les enzymes travaillent."; },
        ok: function () { j.bravo("37 °C. Les réactifs, eux, restent au froid dans le RCU."); j.suite(); } });
    } },
    { nom: "Par quoi commencer ?", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      ["blanc", "étalon 1", "étalon 2", "patient"].forEach(function (t, i) { A.tube(n.g, 110 + i * 130, 170, { bouchon: C.gris, w: 60, h: 220, couches: [{ h: 0.6, coul: i === 0 ? "#eef4ff" : "rgba(201,42,42," + (0.2 + 0.2 * i) + ")" }], etiquette: t, taille: 17 }); });
      j.titre("Sur le portoir d'un analyseur en chimie liquide : un blanc, deux étalons, un patient. Quelle mesure fait-on en premier ?");
      j.choix([
        { html: "Le blanc", juste: true },
        { html: "L'étalon le plus concentré", aide: "Avant de comparer à un étalon, il faut le zéro : ce que mesure l'appareil sans la substance." },
        { html: "Le patient, le plus urgent", aide: "Sans référence, la mesure du patient ne veut rien dire." }
      ], { colonnes: 3, ok: function () { j.bravo("La mesure à blanc d'abord, puis chaque tube."); j.suite(); } });
    } }
  ]
}));
