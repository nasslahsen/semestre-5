/* Niveau : coût complet sur 7 ans, bénéfices attendus, coûts cachés (S5, diapo 7). Le calcul de coût complet est un exemple ajouté. */
NIVEAU(SIS.rejouable({
  id: "cout-complet",
  init: function (fig) { var A = SIS; return { g: A.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Coût ou bénéfice", jouer: function (j, n) {
      var A = SIS;
      j.titre("Range chaque élément : coût sur 7 ans, ou bénéfice attendu ?");
      var cartes = [
        { t: "Consommables spécifiques", bac: 0 }, { t: "Temps soignant", bac: 1 }, { t: "Locaux adaptés", bac: 0 }, { t: "Médicaments non gaspillés", bac: 1 },
        { t: "Remplacement", bac: 0 }, { t: "Sécurité du personnel", bac: 1 }, { t: "Formation", bac: 0 }, { t: "Attractivité du centre", bac: 1 }
      ];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Coût sur 7 ans" }, { t: "Bénéfice" }],
        pos: A.grille(8, 2, 20, 14, 640, 60, 10), bacsPos: function (k) { return { x: 20 + k * 330, y: 310, w: 310, h: 250 }; },
        taille: 17, tailleBac: 24, erreur: j.erreur, info: j.info,
        aide: function (i) { return cartes[i].bac === 0 ? "L'hôpital doit le payer pendant la vie de la solution." : "C'est ce que l'hôpital gagne, pas forcément en argent."; },
        fin: function () { j.bravo("Six postes de coût, cinq bénéfices."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Le prix d'achat", jouer: function (j, n) {
      var A = SIS, C = A.C;
      A.vider(n.g);
      A.tableau(n.g, 80, 160, [220, 130, 130], 70, [["Sur 7 ans", "Offre X", "Offre Y"], ["Prix d'achat", "4", "6"], ["Consommables", "7", "2"], ["Maintenance", "3", "2"]], { taille: 20, style: function (i, k) { return i > 0 && k > 0 ? { mono: true } : null; } });
      A.texte(n.g, "millions d'unités fictives (exemple ajouté)", [340, 470], { taille: 15, coul: C.doux });
      j.titre("L'offre X est la moins chère à l'achat. Est-elle la moins chère ?");
      j.choix([
        { html: "Oui : le prix d'achat suffit pour comparer", aide: "Regarde les deux autres lignes du tableau." },
        { html: "Non : sur 7 ans, X coûte 14 et Y coûte 10", juste: true },
        { html: "On ne peut rien dire sans les bénéfices", aide: "Le tableau suffit pour comparer les coûts." }
      ], { colonnes: 1, ok: function () {
        j.bravo("X : 4 + 7 + 3 = 14. Y : 6 + 2 + 2 = 10.");
        j.expliquer("<p>On compare le <b>coût complet sur 7 ans</b>, au-delà du prix d'achat : des consommables propriétaires peuvent effacer l'écart de prix.</p>");
        j.suite();
      } });
    } },
    { nom: "Calculer un coût complet", jouer: function (j, n) {
      var A = SIS, C = A.C;
      A.vider(n.g);
      A.tableau(n.g, 70, 110, [300, 240], 62, [["Poste", "Montant"], ["Investissement", "5"], ["Locaux adaptés", "1"], ["Consommables", "0,4 par an"], ["Maintenance", "0,3 par an"], ["Formation", "0,2"]], { taille: 20, style: function (i, k) { return i > 0 && k > 0 ? { mono: true } : null; } });
      A.texte(n.g, "millions d'unités fictives (exemple ajouté)", [340, 520], { taille: 15, coul: C.doux });
      j.titre("Calcule le coût complet sur 7 ans de cette solution (sans remplacement pendant la période).");
      j.nombre({ cases: [{ attendu: 11.1, tol: 0.001 }], avant: "\\text{coût complet} =", apres: "\\text{ millions}", aide: function () { return "Les postes annuels se comptent 7 fois : 5 + 1 + 7 × 0,4 + 7 × 0,3 + 0,2."; }, ok: function () {
        j.bravo("\\(5 + 1 + 2{,}8 + 2{,}1 + 0{,}2 = 11{,}1\\) millions.");
        j.expliquer("<p>Le prix d'achat (5) ne fait même pas la moitié du coût complet.</p>");
        j.suite();
      } });
    } },
    { nom: "L'interface oubliée", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["serveur", "facture"], titre: "Une interface avec le DPI à payer", sous: "elle n'était pas dans le budget" });
      j.titre("Au déploiement, il faut payer une interface entre le logiciel et le DPI, qui n'était pas prévue. Qu'est-ce que c'est ?");
      j.choix([
        { html: "Un coût caché", juste: true },
        { html: "Un bénéfice attendu", aide: "L'hôpital paie : ce n'est pas un gain." },
        { html: "Le prix d'investissement", aide: "L'investissement était au budget, cette dépense non." }
      ], { colonnes: 3, ok: function () {
        j.bravo("Un coût caché : absent du budget initial.");
        j.expliquer("<p>Les autres exemples du cours : un <b>périmètre projet mal exprimé</b>, <b>trop de réunions</b> pour la validation.</p>");
        j.suite();
      } });
    } }
  ]
}));
