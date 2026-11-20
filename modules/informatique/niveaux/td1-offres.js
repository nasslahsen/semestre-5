/* Niveau du TD 1 (CHU Atlas), atelier 2 : critères éliminatoires, grille pondérée et sensibilité.
   Poids et notes proposés (exemple ajouté) ; les données des offres viennent du dossier du TD. */
NIVEAU(SIS.rejouable({
  id: "td1-offres",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    var n = { g: g };
    n.CRIT = ["Sécurité", "Intégration et cyber", "Coût sur 7 ans", "Maintenance", "Ergonomie"];
    n.NA = [4, 2, 2, 3, 2]; n.NB = [3, 5, 4, 3, 4];
    n.grilleFig = function (poids, montrerB) {
      A.vider(g);
      var tete = ["Critère", "Poids", "A"].concat(montrerB ? ["B"] : []);
      var lignes = [tete].concat(n.CRIT.map(function (c, i) { return [c, String(poids[i]), String(n.NA[i])].concat(montrerB ? [String(n.NB[i])] : []); }));
      A.tableau(g, 40, 60, montrerB ? [280, 110, 100, 100] : [300, 140, 140], 70, lignes, { taille: 19, gauche: true });
      A.texte(g, "notes proposées : exemple ajouté", [340, 520], { taille: 15, coul: A.C.doux, gras: 500 });
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
        { t: "B : mesures de contamination non fournies", bac: 1 },
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
          "Les mesures peuvent être faites et remises avant la signature.",
          "C'est exactement ce que demande le critère de continuité."][i]; },
        fin: function () { j.bravo("A tombe sur la continuité ; B reste avec deux conditions."); j.expliquer("<p>Une <b>condition suspensive</b> est écrite dans le contrat : sans elle, on ne signe pas. Elle sert pour un manque qu'un document peut combler.</p>"); j.suite(); }
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
    { nom: "Le total de l'offre A", jouer: function (j, n) {
      n.grilleFig([35, 25, 15, 15, 10], false);
      j.titre("Avec ces poids et ces notes, calcule le total pondéré de l'offre A.");
      j.nombre({ cases: [{ attendu: 2.85, tol: 0.005 }], avant: "\\text{Total}_A =", aide: function () { return "35 × 4 + 25 × 2 + 15 × 2 + 15 × 3 + 10 × 2, puis divise par 100."; }, ok: function () {
        j.bravo("\\((140 + 50 + 30 + 45 + 20) / 100 = 2{,}85\\).");
        j.expliquer("<p>\\(\\text{Total} = \\sum(\\text{poids} \\times \\text{note}) / 100\\). Avec les mêmes poids, l'offre B obtient 3,75.</p>");
        j.suite();
      } });
    } },
    { nom: "La sécurité d'abord", jouer: function (j, n) {
      n.grilleFig([60, 15, 5, 15, 5], true);
      j.titre("Deuxième jeu de poids : 60 % sur la sécurité. Calcule les deux totaux.");
      j.nombre({ cases: [{ attendu: 3.35, tol: 0.005 }, { attendu: 3.40, tol: 0.005 }], ligne: true, avant: "\\text{Total}_A,\\ \\text{Total}_B :", aide: function (k) { return k === 0 ? "A : 60 × 4 + 15 × 2 + 5 × 2 + 15 × 3 + 5 × 2, divisé par 100." : "B : 60 × 3 + 15 × 5 + 5 × 4 + 15 × 3 + 5 × 4, divisé par 100."; }, ok: function () {
        j.bravo("A = 3,35, B = 3,40 : B reste devant, de très peu.");
        j.suite();
      } });
    } },
    { nom: "Lire la sensibilité", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.tableau(n.g, 60, 120, [200, 140, 140], 80, [["Jeu", "Total A", "Total B"], ["Référence", "2,85", "3,75"], ["Sécurité d'abord", "3,35", "3,40"], ["Coût d'abord", "2,60", "3,85"]], { taille: 20 });
      j.titre("B gagne avec les trois jeux. Que retiens-tu de l'écart de 0,05 du deuxième jeu ?");
      j.choix([
        { html: "Le choix dépend de la note de sécurité de B : si elle baisse d'un point, A passe devant", juste: true },
        { html: "B est clairement meilleure, l'écart ne compte pas", aide: "Un écart de 0,05 est minuscule : une seule note qui change peut inverser le classement." },
        { html: "Il faut choisir le jeu qui donne le plus grand écart", aide: "On ne choisit pas les poids d'après le résultat : la sensibilité sert à voir où le choix est fragile." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Avec 2 en sécurité, B tomberait à 2,80 contre 3,35 pour A.");
        j.expliquer("<p>L'<b>analyse de sensibilité</b> montre sur quel point le comité doit être sûr de lui. Ici : les mesures de contamination de B, d'où leur place dans les conditions.</p>");
        j.suite();
      } });
    } },
    { nom: "Le prix ne compense pas", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["facture", "alerte"], titre: "5 millions d'écart", sous: "mais pas de mesures de contamination" });
      j.titre("Un membre du comité veut signer B tout de suite : elle coûte 5 millions de moins. Que réponds-tu ?");
      j.choix([
        { html: "On signe : l'économie compense le risque", aide: "Principe de l'énoncé : la sécurité ne se compense pas par un bon prix." },
        { html: "On signe seulement quand les mesures de contamination sont fournies et conformes", juste: true },
        { html: "On choisit A : elle a fourni ses mesures", aide: "A est éliminée sur la continuité. Le manque de B, lui, peut être levé." }
      ], { colonnes: 1, ok: function () { j.bravo("La sécurité se vérifie d'abord ; le prix vient ensuite."); j.suite(); } });
    } }
  ]
}));
