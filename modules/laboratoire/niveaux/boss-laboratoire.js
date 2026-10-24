/* Défi du chapitre 1 : une matinée au laboratoire, de la prescription au résultat. */
NIVEAU(LABO.rejouable({
  id: "boss-laboratoire",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Remettre la matinée en ordre", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Sept moments d'une matinée, dans le désordre. Remets-les dans l'ordre du circuit.");
      var N = ["L'automate donne le résultat", "Le médecin demande un ionogramme", "Le technicien centrifuge le tube", "Le biologiste valide et transmet", "L'infirmière prélève et étiquette au lit", "La cartouche pneumatique arrive", "Le tube est vérifié et enregistré"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 17,
        fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 90, y: 18 + i * 82, w: 500, h: 64 }; }),
        ordre: [1, 4, 5, 6, 2, 0, 3],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["Rien ne se fait sans demande.", "Il faut un échantillon.", "Comment arrive-t-il au laboratoire ?", "Que fait-on dès qu'un tube arrive ?", "Préparer avant de mesurer.", "La mesure.", "Le dernier maillon."][k]; },
        fin: function () { j.bravo("Prescription, prélèvement, transport, réception, préparation, analyse, validation."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "La cartouche", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.icone(n.g, "capsule", [200, 280], 200, C.jeu); A.icone(n.g, "horloge", [470, 280], 160, C.ko);
      A.texte(n.g, "envoyée à 9 h, ouverte à 12 h", [340, 470], { taille: 20, gras: 700 });
      j.titre("La cartouche, envoyée à 9 h avec des tubes bien debout et identifiés, n'est ouverte qu'à 12 h. Quelle règle d'or du transfert est enfreinte ?");
      j.choix([
        { html: "Position verticale des tubes", aide: "Les tubes étaient debout." },
        { html: "Respect des délais", juste: true },
        { html: "Intégrité de la chaîne", aide: "Les tubes étaient identifiés et la cartouche fermée." }
      ], { colonnes: 1, ok: function () { j.bravo("Trois heures : bien plus que les 2 heures souvent visées pour les examens standards."); j.suite(); } });
    } },
    { nom: "Avant ou après l'analyseur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "automate", [340, 280], 220, A.C.jeu);
      j.titre("Le résultat est faux parce que le lot de réactif a changé sans nouvelle calibration. Dans quelle phase est née l'erreur ?");
      j.choix([
        { html: "Pré-analytique", aide: "L'échantillon était correct jusqu'à l'analyseur." },
        { html: "Analytique", juste: true },
        { html: "Post-analytique", aide: "Le chiffre était déjà faux en sortant de l'analyseur." }
      ], { colonnes: 3, ok: function () { j.bravo("Réactifs et calibration sont des points de risque de la phase analytique."); j.suite(); } });
    } },
    { nom: "Le claquement", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "centrifugeuse", [340, 280], 240, A.C.ko);
      j.titre("Pendant un cycle, un tube de sang se brise dans la centrifugeuse. Quel risque le cours associe-t-il à cet équipement, et de quel type est-il ?");
      j.choix([
        { html: "Aérosolisation : un risque biologique créé par un équipement", juste: true },
        { html: "Explosion : un risque chimique", aide: "L'explosion est liée à l'azote liquide des congélateurs." },
        { html: "Bruit : un risque physique", aide: "Le bruit existe, mais le danger du tube brisé, c'est ce qu'il contient et qui se disperse." }
      ], { colonnes: 1, ok: function () { j.bravo("Aérosols de sang : un danger biologique lié à la centrifugeuse."); j.suite(); } });
    } },
    { nom: "Un nouveau plan", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.texte(n.g, "Trois plans proposés", [340, 60], { taille: 22, gras: 800 });
      ["A", "B", "C"].forEach(function (t, i) { A.boite(n.g, 40 + i * 210, 120, 180, 380, { fond: C.fond, bord: C.encre, rx: 16, titre: "Plan " + t, taille: 24 }); });
      j.titre("Pour un nouveau laboratoire, trois plans sont proposés. Lequel respecte l'organisation du cours ?");
      j.choix([
        { html: "A : réception, aire pré-analytique et aire analytique en ligne ; bureaux en retrait ; vestiaires à part", juste: true },
        { html: "B : les bureaux des biologistes au centre, entre les paillasses, pour être près de tout", aide: "Les aires clinico-administratives doivent être en retrait, sans traverser les laboratoires." },
        { html: "C : l'aire analytique à l'entrée, la réception au fond, après les automates", aide: "La logique de flux impose l'ordre réception, pré-analytique, analytique." }
      ], { colonnes: 1, ok: function () { j.bravo("Un flux en ligne, et tout le reste autour, sans le couper."); j.suite(); } });
    } }
  ]
}));
