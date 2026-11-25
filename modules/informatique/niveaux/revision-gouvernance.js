/* Révision du chapitre 7 (cours SIS) : gouvernance, coût complet, audit, comparaison, dans des situations nouvelles. */
NIVEAU(SIS.rejouable({
  id: "revision-gouvernance",
  init: function (fig) { var A = SIS; return { g: A.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "La formation des opérateurs", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["personne", "engrenage"], titre: "Former les préparateurs au nouveau poste", alerte: false });
      j.titre("Dans la matrice du projet, quel est le rôle de l'ingénieur biomédical pour la formation des opérateurs ?");
      j.choix([{ html: "Responsable (R)", aide: "Les responsables sont la pharmacie, les oncologues, les soins et le fournisseur." }, { html: "Consulté (C)", juste: true }, { html: "Pas concerné", aide: "Il apporte la formation technique : il est consulté." }], { colonnes: 3, ok: function () { j.bravo("Consulté : la formation des opérateurs est portée par les métiers et le fournisseur."); j.suite(); } });
    } },
    { nom: "D'autres poids", jouer: function (j, n) {
      var A = SIS, C = A.C;
      A.vider(n.g);
      A.tableau(n.g, 80, 90, [240, 110, 110], 62, [["Critère", "Poids", "Note A"], ["Sécurité", "40 %", "5"], ["Intégration", "25 %", "3"], ["Coût complet", "15 %", "2"], ["Maintenance", "10 %", "4"], ["Ergonomie", "10 %", "3"]], { taille: 19, style: function (i, k) { return i > 0 && k > 0 ? { mono: true } : null; } });
      A.texte(n.g, "Notes de l'offre A du cours, autres poids", [340, 500], { taille: 15, coul: C.doux });
      j.titre("Le comité donne encore plus de poids à la sécurité. Calcule le total de l'offre A.");
      j.nombre({ cases: [{ attendu: 3.75, tol: 0.001 }], avant: "\\text{Total}_A =", aide: function () { return "(40 × 5 + 25 × 3 + 15 × 2 + 10 × 4 + 10 × 3) / 100."; }, ok: function () { j.bravo("\\((200 + 75 + 30 + 40 + 30) / 100 = 3{,}75\\)."); j.suite(); } });
    } },
    { nom: "Les tests à la recette", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "document"], titre: "Tests avec identités fictives", sous: "proposés à la recette, pas avant la signature", alerte: false });
      j.titre("Un fournisseur propose les tests avec identités fictives seulement à la recette. Pourquoi est-ce un problème ?");
      j.choix([{ html: "L'intégration au SIH ne sera prouvée qu'une fois la solution achetée", juste: true }, { html: "Les tests coûtent plus cher à la recette", aide: "La question porte sur la preuve, pas sur le prix." }, { html: "Ce n'est pas un problème", aide: "Si les tests échouent après la signature, que peut faire l'hôpital ?" }], { colonnes: 1, ok: function () { j.bravo("Une preuve exigée avant l'achat arrive trop tard après la signature."); j.suite(); } });
    } },
    { nom: "Les réunions", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["horloge", "facture"], titre: "Douze réunions pour valider une interface", alerte: false });
      j.titre("Il a fallu douze réunions pour valider une interface, à chaque fois avec dix personnes. Dans quelle case du coût complet le mettre ?");
      j.choix([{ html: "Maintenance", aide: "La solution n'est pas encore en service." }, { html: "Coûts cachés", juste: true }, { html: "Bénéfices", aide: "C'est du temps perdu, pas gagné." }], { colonnes: 3, ok: function () { j.bravo("Un coût caché : il n'était pas dans le budget initial."); j.suite(); } });
    } },
    { nom: "La démonstration", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["ecran", "personne"], titre: "Une démonstration sans accroc", sous: "sur le scénario choisi par l'éditeur", alerte: false });
      j.titre("La démonstration est parfaite, sur le scénario choisi par l'éditeur. Que demande le comité ?");
      j.choix([{ html: "Rien : la démonstration a convaincu", aide: "C'est un piège : la démonstration préparée." }, { html: "Les trois scénarios de l'hôpital : identité provisoire, protocole modifié, panne de l'étiqueteuse", juste: true }, { html: "Une remise sur le prix", aide: "La question porte sur la preuve." }], { colonnes: 1, ok: function () { j.bravo("Les scénarios de l'hôpital testent les points faibles du circuit."); j.suite(); } });
    } }
  ]
}));
