/* Niveau : la table de macroscopie : rôle, étapes de l'examen, détecteur, pannes, maintenance (chapitre 6). */
NIVEAU(LABO.rejouable({
  id: "table-macroscopie",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Son rôle premier", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "masque", [340, 280], 220, A.C.jeu);
      j.titre("Qu'est-ce qui distingue une table de macroscopie d'une simple paillasse ?");
      j.choix([
        { html: "Une aspiration intégrée qui capte les vapeurs de formol", juste: true },
        { html: "Un microscope intégré", aide: "La macroscopie se fait à l'œil nu (avec caméra et loupe)." },
        { html: "Une plaque froide", aide: "La plaque froide est sur la station d'enrobage." }
      ], { colonnes: 1, ok: function () { j.bravo("Un poste de dissection ventilé : aspiration, visière, hauteur réglable."); j.suite(); } });
    } },
    { nom: "L'examen macroscopique", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre les étapes de l'examen macroscopique.");
      j.consigne("Touche les six étapes dans l'ordre.");
      var N = ["Coupe et description interne", "Réception et identification", "Tableau de macroscopie", "Description générale", "Prélèvement des zones d'intérêt", "Surface externe"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 19, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 90, y: 22 + i * 94, w: 500, h: 74 }; }),
        ordre: [1, 3, 5, 0, 4, 2],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["D'abord savoir quelle pièce on a, et à qui elle est.", "Type, dimensions, poids : la vue d'ensemble.", "On regarde l'extérieur avant d'ouvrir.", "On ouvre la pièce et on décrit l'intérieur.", "On prélève ce qui ira en histologie.", "On finit par noter tout ce qui a été fait."][k]; },
        fin: function () { j.bravo("Identifier, décrire, regarder dehors puis dedans, prélever, noter."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "L'alarme", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "danger", [340, 250], 200, C.ko);
      A.texte(n.g, "seuil d'alarme : ? ppm", [340, 450], { taille: 24, gras: 800 });
      j.titre("La sonde intégrée à la table déclenche une alarme sonore et visuelle à partir de quelle concentration de formol ?");
      j.nombre({ avant: "\\text{seuil} =", apres: "\\text{ppm}", cases: [{ attendu: 0.5, tol: 0.001 }],
        aide: function () { return "Une valeur comprise entre les deux VLEP, 0,3 et 0,6 ppm."; },
        ok: function () { j.bravo("0,5 ppm : l'alarme sonne avant la limite des pics de 0,6 ppm."); j.suite(); } });
    } },
    { nom: "Diagnostiquer une panne", jouer: function (j, n) {
      var A = LABO; A.vider(n.g);
      j.titre("Relie chaque panne de la table à sa cause probable.");
      j.consigne("Touche une panne à gauche, puis sa cause à droite.");
      var p = A.paires({
        g: n.g, gauche: ["Aspiration faible", "Alarme muette", "Pas de lumière", "Fuite de liquide", "Pompe inefficace"],
        droite: ["Lampe grillée", "Problème du moteur", "Filtre saturé", "Fissure de la tuyauterie", "Sonde mal connectée"],
        bon: [2, 4, 0, 3, 1], xg: 20, wg: 300, xd: 380, wd: 280, y0: 30, h: 90, pas: 108, taille: 18,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["L'air passe mal : qu'est-ce qui se bouche avec le temps ?", "Ce qui mesure les vapeurs ne transmet plus.", "Côté éclairage, la cause la plus simple.", "Un liquide qui s'échappe : il faut une ouverture.", "La pompe tourne mal : c'est sa motorisation."][i]; },
        fin: function () { j.bravo("Filtre, sonde, lampe, tuyauterie, moteur."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Changer les filtres", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "cle", [340, 260], 200, C.jeu);
      j.titre("Tous les combien de mois remplace-t-on les filtres de la table, d'après le cours (selon leur saturation) ?");
      j.nombre({ avant: "\\text{tous les}", apres: "\\text{mois}", cases: [{ attendu: 6, tol: 0 }],
        aide: function () { return "Deux fois par an."; },
        ok: function () { j.bravo("Tous les 6 mois, selon la saturation ; avec la calibration du détecteur et le contrôle du débit."); j.suite(); } });
    } }
  ]
}));
