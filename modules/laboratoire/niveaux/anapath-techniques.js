/* Niveau : macroscopie, paraffine, coupe, H&E, tests ancillaires, numérique (chapitre 6). */
NIVEAU(LABO.rejouable({
  id: "anapath-techniques",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Du tissu à la lame", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre les techniques de base, du tissu à la lame colorée.");
      j.consigne("Touche les cinq étapes dans l'ordre.");
      var N = ["Coloration H&E", "Macroscopie et cassettes", "Coupe au microtome", "Déshydratation", "Inclusion en paraffine"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 20, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 90, y: 30 + i * 110, w: 500, h: 84 }; }),
        ordre: [1, 3, 4, 2, 0],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["On commence par regarder la pièce et choisir les fragments.", "Un tissu fixé est plein d'eau : il faut d'abord la retirer.", "Le tissu sans eau peut recevoir la paraffine.", "Le bloc solide se coupe.", "La coupe presque transparente doit être colorée."][k]; },
        fin: function () { j.bravo("Macroscopie, déshydratation, inclusion, coupe, coloration."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Épaisseur d'une coupe", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 160, y: 160, width: 260, height: 200, rx: 10, fill: "#f6dc7a", stroke: C.encre, "stroke-width": 5 }, n.g);
      A.s("rect", { x: 440, y: 160, width: 8, height: 200, fill: "#f6dc7a", stroke: C.encre, "stroke-width": 3 }, n.g);
      A.texte(n.g, "bloc de paraffine", [290, 400], { taille: 20 });
      A.texte(n.g, "coupe", [470, 130], { taille: 20, gras: 800, coul: C.jeu });
      j.titre("Quelle épaisseur font les coupes réalisées au microtome ?");
      j.choix([
        { html: "3 à 5 micromètres", juste: true },
        { html: "3 à 5 millimètres", aide: "Mille fois trop épais : la lumière du microscope ne traverserait pas." },
        { html: "30 à 50 micromètres", aide: "Encore dix fois trop épais : les cellules se superposeraient." }
      ], { colonnes: 1, ok: function () { j.bravo("3 à 5 µm, déposées sur des lames de verre."); j.suite(); } });
    } },
    { nom: "Lire un H&E", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) {
        A.s("ellipse", { cx: 190 + c * 100, cy: 180 + r * 100, rx: 42, ry: 34, fill: "#f4c2d7", stroke: C.doux, "stroke-width": 2 }, n.g);
        A.s("circle", { cx: 190 + c * 100, cy: 180 + r * 100, r: 13, fill: "#d8d8e8", stroke: C.doux, "stroke-width": 2 }, n.g);
      }
      A.texte(n.g, "noyaux : quelle couleur ?", [340, 500], { taille: 20, gras: 700 });
      j.titre("Sur une lame colorée à l'hématoxyline-éosine, de quelle couleur sont les noyaux ?");
      j.choix([
        { html: "Rose", aide: "Le rose vient de l'éosine : cytoplasme et structures extracellulaires." },
        { html: "Bleu-violet", juste: true },
        { html: "Brun", aide: "Le cours ne parle pas de brun pour le H&E." }
      ], { colonnes: 3, ok: function () { j.bravo("Hématoxyline : noyaux bleu-violet. Éosine : cytoplasme rose."); j.suite(); } });
    } },
    { nom: "Quel test ancillaire", jouer: function (j, n) {
      var A = LABO; A.vider(n.g);
      j.titre("Le H&E ne suffit pas. Relie chaque question à la technique qui y répond.");
      j.consigne("Touche une question à gauche, puis sa technique à droite.");
      var p = A.paires({
        g: n.g, gauche: ["La tumeur exprime-t-elle les récepteurs hormonaux ?", "Le gène HER2 est-il amplifié ?", "Mutation BRAF V600E ?", "Dépôt d'amylose ?"],
        droite: ["Coloration au rouge Congo", "Immunohistochimie", "PCR", "Hybridation in situ (FISH)"],
        bon: [1, 3, 2, 0], xg: 20, wg: 330, xd: 400, wd: 260, y0: 70, h: 104, pas: 130, taille: 17,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Une protéine exprimée par les cellules : des anticorps la repèrent.", "Une séquence d'ADN amplifiée : des sondes marquées la repèrent.", "Une mutation précise de l'ADN : on amplifie la séquence.", "Un composant précis, visible avec une coloration chimique."][i]; },
        fin: function () { j.bravo("Protéine : IHC. Gène amplifié : FISH. Mutation : PCR. Amylose : rouge Congo."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Ce que fait l'IA", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "ordi", [340, 280], 230, A.C.jeu);
      j.titre("D'après le cours, à quoi sert surtout l'intelligence artificielle sur les lames numérisées ?");
      j.choix([
        { html: "Quantifier des marqueurs, comme le pourcentage de cellules positives", juste: true },
        { html: "Fixer les tissus plus vite", aide: "La fixation se fait dans le formol, avant toute lame." },
        { html: "Couper les blocs de paraffine", aide: "La coupe est le travail du microtome." }
      ], { colonnes: 1, ok: function () { j.bravo("Une tâche longue et variable à l'œil nu, que l'IA rend plus rapide et plus régulière."); j.suite(); } });
    } }
  ]
}));
