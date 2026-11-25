/* Niveau du TD 1 (CHU Atlas), atelier 2 : critères éliminatoires, grille pondérée et sensibilité.
   Critères, poids et notes du modèle de l'enseignant (fiche de synthèse remplie) ; les données des offres viennent du dossier du TD. */
NIVEAU(SIS.rejouable({
  id: "td1-offres",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    var n = { g: g };
    n.CRIT = ["Sécurité", "Intégration et cyber", "Coût sur 7 ans", "Maintenance", "Ergonomie"];
    n.NA = [5, 3, 2, 4, 3]; n.NB = [3, 4, 4, 3, 4];
    n.grilleFig = function (poids, montrerB) {
      A.vider(g);
      var tete = ["Critère", "Poids", "A"].concat(montrerB ? ["B"] : []);
      var lignes = [tete].concat(n.CRIT.map(function (c, i) { return [c, String(poids[i]), String(n.NA[i])].concat(montrerB ? [String(n.NB[i])] : []); }));
      A.tableau(g, 40, 60, montrerB ? [280, 110, 100, 100] : [300, 140, 140], 70, lignes, { taille: 19, gauche: true });
      A.texte(g, "notes du modèle de l'enseignant", [340, 520], { taille: 15, coul: A.C.doux, gras: 500 });
    };
    return n;
  },
  etapes: [
    { nom: "Le statut de chaque offre", jouer: function (j, n) {
      var A = SIS;
      j.titre("Critères éliminatoires. Range chaque constat du dossier selon le statut qu'il donne à l'offre.");
      var cartes = [
        { t: "A : certificats pour tous les DM et le logiciel", bac: 0 },
        { t: "B : certificat du logiciel de traçabilité en cours", bac: 1 },
        { t: "A : aucune procédure de mode dégradé, robot unique", bac: 2 },
        { t: "A : tests d'intégration à la recette seulement, autre DPI", bac: 1 },
        { t: "B : mode dégradé documenté et testé", bac: 0 }
      ];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Conforme" }, { t: "Conditionnel", sous: "condition écrite" }, { t: "Non conforme" }],
        pos: A.grille(5, 2, 20, 20, 640, 84, 14),
        bacsPos: function (k) { return { x: 20 + k * 220, y: 360, w: 200, h: 200 }; },
        taille: 16, tailleBac: 20,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return [
          "Tout est fourni : rien à lever.",
          "Un document manque, mais il peut être remis avant la signature.",
          "Un papier ne crée pas un second robot ni un plan B : le manque tient à la conception de l'offre.",
          "Les tests peuvent être acceptés avant la signature : c'est une condition à lever.",
          "C'est exactement ce que demande le critère de continuité."][i]; },
        fin: function () { j.bravo("A tombe sur le mode dégradé. B reste avec une condition : le certificat du logiciel."); j.expliquer("<p>Une <b>condition suspensive</b> est écrite dans le contrat : sans elle, on ne signe pas. Elle sert pour un manque qu'un document peut combler.</p>"); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Les poids d'abord", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["document", "engrenage"], titre: "Grille pondérée", sous: "poids, puis notes ?" });
      j.titre("L'énoncé impose de fixer les poids avant de noter les offres. Pourquoi ?");
      j.choix([
        { html: "Parce que les notes dépendent des poids", aide: "Une note dit ce que vaut l'offre sur un critère, quel que soit son poids." },
        { html: "Pour que le total fasse 100", aide: "Les poids font 100 dans tous les cas. La question est le moment où on les choisit." },
        { html: "Pour ne pas régler les poids après coup afin de faire gagner l'offre qu'on préfère", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("Des poids fixés avant les notes rendent la grille honnête."); j.suite(); } });
    } },
    { nom: "Le total de l'offre B", jouer: function (j, n) {
      n.grilleFig([35, 25, 15, 15, 10], true);
      j.titre("Avec ces poids, calcule le total pondéré de l'offre B.");
      j.nombre({ cases: [{ attendu: 3.5, tol: 0.005 }], avant: "\\text{Total}_B =", aide: function () { return "35 × 3 + 25 × 4 + 15 × 4 + 15 × 3 + 10 × 4, puis divise par 100."; }, ok: function () {
        j.bravo("\\((105 + 100 + 60 + 45 + 40) / 100 = 3{,}50\\).");
        j.expliquer("<p>\\(\\text{Total} = \\sum(\\text{poids} \\times \\text{note}) / 100\\). Avec les mêmes poids, l'offre A obtient 3,70.</p>");
        j.suite();
      } });
    } },
    { nom: "Le coût pèse plus", jouer: function (j, n) {
      n.grilleFig([30, 25, 20, 15, 10], true);
      j.titre("Deuxième jeu : 5 points passent de la sécurité au coût. Calcule les deux totaux.");
      j.nombre({ cases: [{ attendu: 3.55, tol: 0.005 }, { attendu: 3.55, tol: 0.005 }], ligne: true, avant: "\\text{Total}_A,\\ \\text{Total}_B :", aide: function (k) { return k === 0 ? "A : 30 × 5 + 25 × 3 + 20 × 2 + 15 × 4 + 10 × 3, divisé par 100." : "B : 30 × 3 + 25 × 4 + 20 × 4 + 15 × 3 + 10 × 4, divisé par 100."; }, ok: function () {
        j.bravo("3,55 partout : égalité.");
        j.suite();
      } });
    } },
    { nom: "Lire la sensibilité", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.tableau(n.g, 40, 120, [240, 130, 130, 100], 80, [["Poids", "Total A", "Total B", "Tête"], ["35 / 25 / 15 / 15 / 10", "3,70", "3,50", "A"], ["30 / 25 / 20 / 15 / 10", "3,55", "3,55", "="], ["25 / 25 / 25 / 15 / 10", "3,40", "3,60", "B"]], { taille: 19 });
      j.titre("Que retient le modèle de ces trois jeux de poids ?");
      j.choix([
        { html: "A arrive en tête avec nos poids, mais le classement s'inverse quand le coût pèse plus", juste: true },
        { html: "A est clairement meilleure : elle gagne avec nos poids", aide: "Regarde le troisième jeu." },
        { html: "Il faut garder le jeu qui donne le plus grand écart", aide: "On ne choisit pas les poids d'après le résultat : la sensibilité montre où le choix est fragile." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Le classement dépend du poids du coût.");
        j.expliquer("<p>L'<b>analyse de sensibilité</b> montre sur quel point le comité doit trancher : ici, l'importance donnée au coût face à la sécurité.</p>");
        j.suite();
      } });
    } },
    { nom: "La note ne compense pas", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["engrenage", "alerte"], titre: "A : 3,70, la meilleure note", sous: "mais aucune procédure de mode dégradé" });
      j.titre("A a la meilleure note avec nos poids. Pourquoi le modèle ne la retient-il pas ?");
      j.choix([
        { html: "Elle coûte trop cher", aide: "Le coût est déjà dans la note. Le motif est ailleurs." },
        { html: "Sa bonne note de sécurité ne doit pas compenser l'absence de mode dégradé : ce critère est éliminatoire", juste: true },
        { html: "Son interface est trop complexe", aide: "L'ergonomie pèse peu dans la grille." }
      ], { colonnes: 1, ok: function () { j.bravo("La sécurité se vérifie d'abord, elle ne se négocie pas dans une note."); j.suite(); } });
    } }
  ]
}));
