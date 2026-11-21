/* Niveau : le formol, agent CMR : VLEP, captage, dépression du local, armoire ventilée (chapitre 6). */
NIVEAU(LABO.rejouable({
  id: "formol",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "CMR", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "chimie", [340, 280], 220, A.C.ko);
      j.titre("Le formol est classé CMR. Que veut dire ce sigle ?");
      j.choix([
        { html: "Cancérogène, mutagène, reprotoxique", juste: true },
        { html: "Corrosif, mortel, radioactif", aide: "Le sigle parle d'effets à long terme sur la santé." },
        { html: "Combustible, mélangeable, réactif", aide: "Ce sont des effets sur la santé, pas des propriétés chimiques." }
      ], { colonnes: 1, ok: function () { j.bravo("Cancérogène, mutagène, reprotoxique : prévention à la source, confinement, ventilation."); j.suite(); } });
    } },
    { nom: "La limite sur 8 heures", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "horloge", [340, 250], 200, C.jeu);
      A.texte(n.g, "8 h de travail", [340, 450], { taille: 24, gras: 800 });
      j.titre("Quelle est la valeur limite d'exposition au formol sur 8 heures ?");
      j.nombre({ avant: "\\text{VLEP}_{8\\,h} =", apres: "\\text{ppm}", cases: [{ attendu: 0.3, tol: 0.001 }],
        aide: function () { return "La moitié de la limite sur 15 minutes, qui est de 0,6 ppm."; },
        ok: function () { j.bravo("0,3 ppm sur 8 h ; 0,6 ppm sur 15 min."); j.suite(); } });
    } },
    { nom: "Où aspirer", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("circle", { cx: 200, cy: 150, r: 40, fill: "#fff", stroke: C.encre, "stroke-width": 5 }, n.g);
      A.s("rect", { x: 160, y: 330, width: 360, height: 26, rx: 6, fill: C.pale, stroke: C.encre, "stroke-width": 4 }, n.g);
      A.s("rect", { x: 260, y: 300, width: 160, height: 30, rx: 6, fill: C.froidPale, stroke: C.froid, "stroke-width": 3 }, n.g);
      A.texte(n.g, "?", [340, 200], { taille: 60, gras: 800, coul: C.jeu });
      j.titre("On installe le captage des vapeurs d'une table de macroscopie. Où le placer ?");
      j.choix([
        { html: "Une hotte au-dessus, comme en cuisine", aide: "Les vapeurs monteraient en passant devant le visage du technicien." },
        { html: "Par le bas ou par un dosseret aspirant", juste: true },
        { html: "Peu importe, tant que le débit est fort", aide: "Le sens compte : le cours en proscrit un." }
      ], { colonnes: 1, ok: function () { j.bravo("Par le bas ou par l'arrière : les vapeurs s'éloignent des voies respiratoires."); j.suite(); } });
    } },
    { nom: "Vitesse de captage", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 140, y: 320, width: 400, height: 26, rx: 6, fill: C.pale, stroke: C.encre, "stroke-width": 4 }, n.g);
      A.s("rect", { x: 540, y: 220, width: 30, height: 100, rx: 4, fill: C.fond, stroke: C.encre, "stroke-width": 3 }, n.g);
      A.s("circle", { cx: 170, cy: 300, r: 10, fill: C.jeu }, n.g);
      A.fleche(n.g, [190, 300], [530, 280], { coul: C.froid, ep: 4 });
      A.texte(n.g, "point le plus éloigné", [180, 260], { taille: 18, gras: 700 });
      j.titre("Quelle vitesse d'air minimale faut-il mesurer au point de manipulation le plus éloigné de l'aspiration ?");
      j.nombre({ avant: "v \\geq", apres: "\\text{m/s}", cases: [{ attendu: 0.5, tol: 0.001 }],
        aide: function () { return "Moins d'un mètre par seconde : une demi-unité."; },
        ok: function () { j.bravo("Au moins 0,5 m/s, au point le plus éloigné."); j.suite(); } });
    } },
    { nom: "Pourquoi la dépression", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.boite(n.g, 80, 150, 300, 260, { fond: C.froidPale, bord: C.froid, ep: 3, rx: 16, titre: "salle d'anapath", sous: "−10 Pa au moins", taille: 22 });
      A.boite(n.g, 400, 150, 200, 260, { fond: "#fff", bord: C.encre, ep: 3, rx: 16, titre: "couloir", taille: 22 });
      A.fleche(n.g, [520, 300], [390, 300], { coul: C.froid, ep: 5 });
      j.titre("La pièce d'anapath est maintenue en dépression d'au moins 10 Pa par rapport aux couloirs. Pourquoi ?");
      j.choix([
        { html: "Pour que l'air entre dans la salle et que le gaz ne sorte pas vers les couloirs", juste: true },
        { html: "Pour fixer les tissus plus vite", aide: "La pression de la salle n'agit pas sur la fixation." },
        { html: "Pour refroidir la salle", aide: "Il s'agit du sens de l'air entre deux pièces." }
      ], { colonnes: 1, ok: function () { j.bravo("L'air va du couloir vers la salle : le formol ne se propage pas."); j.suite(); } });
    } },
    { nom: "L'armoire ventilée", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 220, y: 80, width: 240, height: 400, rx: 12, fill: C.fond, stroke: C.encre, "stroke-width": 5 }, n.g);
      [170, 270, 370].forEach(function (y) { A.s("line", { x1: 230, y1: y, x2: 450, y2: y, stroke: C.encre, "stroke-width": 4, "stroke-dasharray": "14 8" }, n.g); });
      A.texte(n.g, "étagères ajourées", [340, 520], { taille: 20, gras: 700 });
      j.titre("Dans une armoire spéciale formol, pourquoi les étagères en inox sont-elles ajourées ?");
      j.choix([
        { html: "Pour que l'air circule bien autour des bacs et des flacons", juste: true },
        { html: "Pour alléger l'armoire", aide: "Le cours parle de ventilation." },
        { html: "Pour que le formol s'écoule par terre", aide: "Il y a justement un bac de rétention au fond pour éviter ça." }
      ], { colonnes: 1, ok: function () { j.bravo("L'air circule, les vapeurs sont aspirées et évacuées dehors."); j.suite(); } });
    } }
  ]
}));
