/* Niveau : pièges du benchmarking, rôle de l'ingénieur biomédical, synthèse décider / évaluer / comparer, débat (S5, diapos 15 à 17). */
NIVEAU(SIS.rejouable({
  id: "pieges-benchmarking",
  init: function (fig) { var A = SIS; return { g: A.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Cinq pièges", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque situation au piège du benchmarking.");
      var p = A.paires({
        g: n.g, gauche: ["L'éditeur déroule sa démonstration, préparée par lui", "« Notre logiciel s'intègre à tous les DPI », sans exemple", "A inclut la formation, B non", "La référence est un hôpital trois fois plus grand", "Les consommables ne viennent que de ce fournisseur"],
        droite: ["Références non comparables", "Dépendance fournisseur", "Démonstration préparée", "Périmètres différents", "Intégration non prouvée"],
        bon: [2, 4, 3, 0, 1],
        xg: 15, wg: 375, xd: 420, wd: 245, y0: 22, h: 92, pas: 110, taille: 15, tailleD: 17,
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Qui a choisi le scénario ?", "Une promesse, sans site de référence.", "Les deux offres ne couvrent pas la même chose.", "Taille ou organisation différentes.", "On ne pourra plus changer : le cours parle d'une clause de réversibilité."][i]; },
        fin: function () { j.bravo("Cinq pièges, à repérer avant de signer."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Le point non prouvé", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["document", "alerte"], titre: "Le fournisseur n'a aucune preuve d'intégration" });
      j.titre("Le fournisseur n'apporte aucune preuve d'intégration au DPI du CHU. Que fait l'ingénieur biomédical ?");
      j.choix([
        { html: "Il le signale au comité", juste: true },
        { html: "Il écarte l'offre lui-même", aide: "Il ne décide pas seul : le comité arbitre." },
        { html: "Il fait confiance au fournisseur", aide: "Preuves, pas promesses." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Il signale les points non prouvés au comité.");
        j.expliquer("<p>Son rôle : rédiger les <b>exigences techniques</b>, animer les <b>démonstrations</b> côté technique, instruire les <b>sites de référence</b>, chiffrer le <b>cycle de vie</b>, signaler les <b>points non prouvés</b>.</p>");
        j.suite();
      } });
    } },
    { nom: "Les trois colonnes", jouer: function (j, n) {
      var A = SIS;
      j.titre("La synthèse de la séance : range chaque idée dans sa colonne.");
      var cartes = [{ t: "Gouvernance partagée", bac: 0 }, { t: "Preuves, pas promesses", bac: 1 }, { t: "Seuils éliminatoires", bac: 2 }, { t: "Cycle de décision tracé", bac: 0 }, { t: "Avant, pendant et après", bac: 1 }, { t: "Analyse de sensibilité", bac: 2 }];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Décider" }, { t: "Évaluer" }, { t: "Comparer" }],
        pos: A.grille(6, 3, 10, 30, 660, 80, 12), bacsPos: function (k) { return { x: 10 + k * 225, y: 280, w: 210, h: 260 }; },
        taille: 17, tailleBac: 22, erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Qui décide et comment.", "Comment sait-on que c'est bon.", "Comment on classe deux offres."][cartes[i].bac]; },
        fin: function () { j.bravo("Décider, évaluer, comparer : les trois colonnes sont complètes."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Le débat", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["personne", "document"], titre: "Un peu moins sûre, mieux intégrée, moins chère", alerte: false });
      j.titre("Une solution un peu moins sûre, mais mieux intégrée et moins chère, est retenue. Comment accepter le risque restant ?");
      j.consigne("Le cours ouvre le débat ; la fiche de synthèse du TD y répond pour le CHU Atlas.");
      j.choix([
        { html: "L'ingénieur biomédical l'accepte seul", aide: "Choisir une solution de soins critique est une décision collective." },
        { html: "Le comité de pilotage l'accepte par écrit, après analyse de risques", juste: true },
        { html: "On ne le dit pas, pour ne pas inquiéter", aide: "Le risque résiduel doit être nommé et tracé." }
      ], { colonnes: 1, ok: function () { j.bravo("Un risque résiduel nommé, accepté par écrit par le comité, après analyse de risques."); j.suite(); } });
    } }
  ]
}));
