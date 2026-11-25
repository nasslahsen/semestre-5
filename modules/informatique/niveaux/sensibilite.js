/* Niveau : grille pondérée et analyse de sensibilité, piège de la compensation (S5, diapos 13 et 14). Offres C et D : exemple ajouté. */
NIVEAU(SIS.rejouable({
  id: "sensibilite",
  init: function (fig) {
    var A = SIS, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g };
    n.grille = function (poids) {
      A.vider(g);
      A.tableau(g, 30, 60, [230, 110, 140, 140], 64, [["Critère", "Poids", "Offre C", "Offre D"], ["Sécurité", poids[0] + " %", "4", "3"], ["Intégration", poids[1] + " %", "2", "4"], ["Coût complet", poids[2] + " %", "3", "4"], ["Maintenance", poids[3] + " %", "5", "2"], ["Ergonomie", poids[4] + " %", "3", "4"]],
        { taille: 19, style: function (i, k) { return i > 0 && k > 0 ? { mono: true } : null; } });
      A.texte(g, "Notes sur 5 (exemple ajouté)", [340, 480], { taille: 15, coul: C.doux });
    };
    return n;
  },
  etapes: [
    { nom: "Le total de C", jouer: function (j, n) {
      n.grille([40, 20, 20, 10, 10]);
      j.titre("Calcule le total pondéré de l'offre C.");
      j.nombre({ cases: [{ attendu: 3.4, tol: 0.001 }], avant: "\\text{Total}_C =", aide: function () { return "(40 × 4 + 20 × 2 + 20 × 3 + 10 × 5 + 10 × 3) / 100."; }, ok: function () {
        j.bravo("\\((160 + 40 + 60 + 50 + 30) / 100 = 3{,}40\\).");
        j.expliquer("<p>\\(\\text{Total} = \\sum(\\text{poids} \\times \\text{note}) / 100\\).</p>");
        j.suite();
      } });
    } },
    { nom: "Le total de D", jouer: function (j, n) {
      n.grille([40, 20, 20, 10, 10]);
      j.titre("Même calcul pour l'offre D. Qui est en tête ?");
      j.nombre({ cases: [{ attendu: 3.4, tol: 0.001 }], avant: "\\text{Total}_D =", aide: function () { return "(40 × 3 + 20 × 4 + 20 × 4 + 10 × 2 + 10 × 4) / 100."; }, ok: function () {
        j.bravo("\\((120 + 80 + 80 + 20 + 40) / 100 = 3{,}40\\).");
        j.choix([{ html: "C", aide: "Compare les deux totaux." }, { html: "D", aide: "Compare les deux totaux." }, { html: "Égalité", juste: true }], { colonnes: 3, ok: function () { j.bravo("3,40 partout : égalité."); j.suite(); } });
      } });
    } },
    { nom: "Un autre jeu de poids", jouer: function (j, n) {
      n.grille([30, 20, 30, 10, 10]);
      j.titre("On passe 10 points de la sécurité vers le coût. Recalcule les deux totaux.");
      j.nombre({ cases: [{ attendu: 3.3, tol: 0.001 }, { attendu: 3.5, tol: 0.001 }], ligne: true, avant: "\\text{Total}_C,\\ \\text{Total}_D :", aide: function (k) { return k === 0 ? "C : (30 × 4 + 20 × 2 + 30 × 3 + 10 × 5 + 10 × 3) / 100." : "D : (30 × 3 + 20 × 4 + 30 × 4 + 10 × 2 + 10 × 4) / 100."; }, ok: function () {
        j.bravo("C : 3,30. D : 3,50. D passe devant.");
        j.expliquer("<p>Le classement <b>dépend des priorités</b> : c'est ce que montre l'analyse de sensibilité.</p>");
        j.suite();
      } });
    } },
    { nom: "La compensation", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["facture", "alerte"], titre: "D gagne grâce au coût, avec une sécurité plus faible" });
      j.titre("D gagne, alors que sa note de sécurité est plus faible que celle de C. Qu'aurait-il fallu faire avant la grille ?");
      j.choix([
        { html: "Augmenter le poids du coût", aide: "Cela aggrave la compensation." },
        { html: "Vérifier un seuil éliminatoire de sécurité, qui ne se négocie pas dans une note", juste: true },
        { html: "Rien : la grille suffit", aide: "Avec la pondération seule, un bon prix peut compenser une sécurité faible." }
      ], { colonnes: 1, ok: function () { j.bravo("La sécurité se vérifie d'abord, elle ne se négocie pas dans une note."); j.suite(); } });
    } },
    { nom: "Le meilleur système", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["document", "personne"], titre: "Le classement s'inverse avec les poids", alerte: false });
      j.titre("Le classement change avec les poids. Que conclut le cours ?");
      j.choix([
        { html: "Il existe toujours un meilleur système, il faut trouver les bons poids", aide: "Les « bons » poids dépendent de qui décide." },
        { html: "Il n'existe que le meilleur compromis pour des priorités données", juste: true },
        { html: "La grille pondérée ne sert à rien", aide: "Elle sert à expliciter les priorités." }
      ], { colonnes: 1, ok: function () { j.bravo("Comparer, c'est expliciter ses priorités."); j.suite(); } });
    } }
  ]
}));
