/* Niveau : la station d'enrobage : son rôle après le processeur, ses gestes, la plaque froide, l'enrobage automatisé (chapitre 6). */
NIVEAU(LABO.rejouable({
  id: "enrobage",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Après le processeur", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 220, y: 180, width: 240, height: 200, rx: 12, fill: "#f6dc7a", stroke: C.encre, "stroke-width": 5 }, n.g);
      A.s("ellipse", { cx: 340, cy: 280, rx: 60, ry: 40, fill: "#e8a0a0", stroke: C.encre, "stroke-width": 3 }, n.g);
      A.texte(n.g, "bloc", [340, 420], { taille: 24, gras: 800 });
      j.titre("Le tissu sort du processeur, imprégné de paraffine. Que fait la station d'enrobage ?");
      j.choix([
        { html: "Elle forme le bloc solide autour du tissu, dans un moule", juste: true },
        { html: "Elle retire l'eau du tissu", aide: "C'était le travail du processeur, avant." },
        { html: "Elle colore le tissu", aide: "La coloration se fait sur les lames, après la coupe." }
      ], { colonnes: 1, ok: function () { j.bravo("Le processeur prépare l'intérieur ; la station crée le bloc externe."); j.suite(); } });
    } },
    { nom: "Les gestes de l'enrobage", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre les gestes du technicien à la station d'enrobage.");
      j.consigne("Touche les quatre gestes dans l'ordre.");
      var N = ["Verser la paraffine fondue", "Refroidir sur la plaque froide", "Sortir le tissu de sa cassette", "Placer le tissu dans un moule"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 22, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 110, y: 50 + i * 130, w: 460, h: 96 }; }),
        ordre: [2, 3, 0, 1],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["Le tissu est encore dans sa cassette.", "Il faut un contenant qui donne sa forme au bloc.", "On coule la paraffine autour du tissu.", "Il reste à la solidifier."][k]; },
        fin: function () { j.bravo("Sortir, placer dans le moule, couler, refroidir."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "La plaque froide", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "flocon", [340, 250], 200, C.froid);
      A.texte(n.g, "en 10 minutes", [340, 450], { taille: 24, gras: 800 });
      j.titre("Quelle température la plaque froide de la station atteint-elle en 10 minutes ?");
      j.nombre({ avant: "T =", apres: "^\\circ\\text{C}", cases: [{ attendu: -20, tol: 0 }],
        aide: function () { return "Une température négative, celle d'un congélateur ordinaire."; },
        ok: function () { j.bravo("−20 °C en 10 minutes : jusqu'à 65 cassettes refroidies en moins de 30 minutes."); j.suite(); } });
    } },
    { nom: "Le débit de l'automate", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "robot", [340, 250], 200, C.jeu);
      j.titre("Combien de cassettes par heure le Tissue-Tek AutoTEC a120 peut-il enrober ?");
      j.nombre({ avant: "", apres: "\\text{cassettes par heure}", cases: [{ attendu: 120, tol: 0 }],
        aide: function () { return "Le nombre est dans le nom du modèle."; },
        ok: function () { j.bravo("Jusqu'à 120 cassettes par heure, en moyenne deux fois plus vite qu'à la main."); j.suite(); } });
    } },
    { nom: "SMARTair", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "eclair", [340, 280], 200, A.C.jeu);
      j.titre("Sur l'AutoTEC a120, à quoi sert la technologie SMARTair ?");
      j.choix([
        { html: "Souffler de l'air pour retirer l'excès de paraffine autour des blocs", juste: true },
        { html: "Refroidir la salle", aide: "Elle agit sur les blocs eux-mêmes." },
        { html: "Lire les codes-barres des cassettes", aide: "C'est le rôle du lecteur embarqué, relié au LIS." }
      ], { colonnes: 1, ok: function () { j.bravo("Plus de grattage manuel des blocs avant la coupe."); j.suite(); } });
    } }
  ]
}));
