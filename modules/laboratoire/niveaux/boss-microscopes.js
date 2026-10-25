/* Défi du chapitre 5 : un microscope et un agitateur à remettre en état, sans aide avant le premier essai. */
NIVEAU(LABO.rejouable({
  id: "boss-microscopes",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Le bon objectif", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "microscope", [340, 260], 240, A.C.jeu);
      j.titre("L'oculaire grossit 10 fois. Tu veux un grossissement total de 400. Quel objectif choisir ?");
      j.nombre({ avant: "G_{\\text{objectif}} =", cases: [{ attendu: 40, tol: 0 }],
        aide: function () { return "G total = G objectif × G oculaire."; },
        ok: function () { j.bravo("L'objectif 40×."); j.suite(); } });
    } },
    { nom: "Des ombres", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("circle", { cx: 340, cy: 280, r: 200, fill: "#fbf8f1", stroke: C.encre, "stroke-width": 6 }, n.g);
      [[280, 230], [390, 320], [330, 180]].forEach(function (p) { A.s("circle", { cx: p[0], cy: p[1], r: 22, fill: C.gris, opacity: 0.5 }, n.g); });
      j.titre("Des ombres floues tournent avec l'oculaire quand on le fait pivoter. Que fais-tu en premier ?");
      j.choix([
        { html: "Démonter la tête binoculaire", aide: "Si les ombres tournent avec l'oculaire, elles sont sur l'oculaire. Et on ne démonte pas l'optique sans formation." },
        { html: "Souffler la poussière de l'oculaire à la poire, puis le nettoyer au papier optique", juste: true },
        { html: "Remplacer l'oculaire", aide: "Ce sont des ombres floues, pas une toile d'araignée : commence par nettoyer." },
        { html: "Augmenter l'intensité lumineuse", aide: "La lumière n'enlèvera pas la poussière." }
      ], { colonnes: 1, ok: function () { j.bravo("La poussière est sur l'oculaire : poire, puis papier optique imbibé de solution."); j.suite(); } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Le registre d'entretien du microscope contient une erreur. Laquelle ?");
      j.choix([
        { html: "« Corps nettoyé au mélange eau distillée et éthanol à 95 %. »", aide: "C'est bien la solution pour le corps du microscope." },
        { html: "« Huile du 100× essuyée après utilisation. »", aide: "C'est l'entretien quotidien." },
        { html: "« Ampoule changée à mains nues, sans précaution. »", juste: true },
        { html: "« Câbles, fusibles et ampoule vérifiés, inspection semestrielle. »", aide: "C'est bien l'entretien tous les six mois." }
      ], { colonnes: 1, ok: function () { j.bravo("Ne pas toucher l'ampoule : les traces de doigts diminuent l'intensité lumineuse."); j.suite(); } });
    } },
    { nom: "Un liquide inflammable", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "danger", [340, 260], 200, A.C.ko);
      j.titre("On doit agiter et chauffer doucement un liquide inflammable sur l'agitateur. Que demande le cours ?");
      j.choix([
        { html: "Rien de particulier si la température est basse", aide: "Le cours donne des précautions précises avec les liquides inflammables." },
        { html: "Gants et lunettes de protection, et aucun matériau combustible à proximité", juste: true },
        { html: "Couvrir la plaque d'une feuille isolante", aide: "Les matériaux isolants sont justement à éviter sur la plaque." }
      ], { colonnes: 1, ok: function () { j.bravo("Équipement protecteur, et rien de combustible autour."); j.suite(); } });
    } }
  ]
}));
