/* Révision du TD 1 (CHU Atlas) : les trois ateliers sur des situations nouvelles (exemples ajoutés). */
NIVEAU(SIS.rejouable({
  id: "revision-td1",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    return { g: g };
  },
  etapes: [
    { nom: "Une huitième ligne", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      ["G = 8", "O = 3", "D = 5"].forEach(function (t, k) { A.boite(n.g, 30 + k * 220, 140, 180, 160, { titre: t, taille: 32, fond: "#fff" }); });
      A.texte(n.g, "exemple ajouté", [340, 360], { taille: 15, coul: A.C.doux, gras: 500 });
      j.titre("Nouvelle ligne : une allergie connue n'est pas reportée dans le dossier. Calcule sa criticité.");
      j.nombre({ cases: [{ attendu: 120 }], avant: "C =", aide: function () { return "8 × 3 × 5."; }, ok: function () { j.bravo("\\(C = 120\\) : au-dessus du seuil de 100."); j.suite(); } });
    } },
    { nom: "La barrière fait baisser D", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      ["G = 8", "O = 3", "D = 2"].forEach(function (t, k) { A.boite(n.g, 30 + k * 220, 140, 180, 160, { titre: t, taille: 32, fond: k === 2 ? A.C.okPale : "#fff", bord: k === 2 ? A.C.ok : A.C.encre }); });
      j.titre("On ajoute une alerte d'allergie dans le DPI au moment de la prescription : D passe à 2. Nouvelle criticité ?");
      j.nombre({ cases: [{ attendu: 48 }], avant: "C =", aide: function () { return "Seul D change : 8 × 3 × 2."; }, ok: function () { j.bravo("De 120 à 48 : la barrière agit sur la détection, la ligne passe sous le seuil."); j.suite(); } });
    } },
    { nom: "Une offre C", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["pompe", "alerte"], titre: "Offre C", sous: "pompe sans certificat, et le fournisseur n'en demandera pas" });
      j.titre("Une offre C arrive : sa pompe n'a pas de certificat, et le fournisseur n'a pas l'intention d'en demander un. Statut sur la conformité réglementaire ?");
      j.choix([
        { html: "Conditionnel : on lui demande le certificat avant signature", aide: "Une condition suspensive marche si le document peut arriver. Ici, le fournisseur ne le demandera pas." },
        { html: "Non conforme : aucune condition écrite ne peut le lever", juste: true },
        { html: "Conforme si elle est moins chère", aide: "La sécurité ne se compense pas par le prix." }
      ], { colonnes: 1, ok: function () { j.bravo("Conditionnel suppose qu'on peut lever le manque. Sinon, c'est non conforme."); j.suite(); } });
    } },
    { nom: "Un autre jeu de poids", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.tableau(n.g, 40, 60, [280, 110, 100, 100], 70, [["Critère", "Poids", "A", "B"], ["Sécurité", "40", "4", "3"], ["Intégration et cyber", "20", "2", "5"], ["Coût sur 7 ans", "20", "2", "4"], ["Maintenance", "10", "3", "3"], ["Ergonomie", "10", "2", "4"]], { taille: 19, gauche: true });
      j.titre("Un groupe choisit les poids 40 / 20 / 20 / 10 / 10. Calcule les deux totaux.");
      j.nombre({ cases: [{ attendu: 2.90, tol: 0.005 }, { attendu: 3.70, tol: 0.005 }], ligne: true, avant: "\\text{Total}_A,\\ \\text{Total}_B :", aide: function (k) { return k === 0 ? "A : 40 × 4 + 20 × 2 + 20 × 2 + 10 × 3 + 10 × 2, divisé par 100." : "B : 40 × 3 + 20 × 5 + 20 × 4 + 10 × 3 + 10 × 4, divisé par 100."; }, ok: function () { j.bravo("A = 2,90, B = 3,70 : le classement tient encore."); j.suite(); } });
    } },
    { nom: "Le robot unique", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["engrenage", "alerte"], titre: "Un seul robot", sous: "aucune procédure manuelle" });
      j.titre("Dans le vocabulaire du cours de sécurité, comment s'appelle le robot unique de l'offre A ?");
      j.choix([
        { html: "Une menace", aide: "Une menace vient de l'extérieur et veut nuire. Le robot est un maillon du système." },
        { html: "Une vulnérabilité logicielle", aide: "Le problème n'est pas un défaut de logiciel : c'est qu'il n'y a qu'un seul maillon." },
        { html: "Un point de défaillance unique (SPOF)", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("Sa panne arrête tout le circuit : c'est la définition du SPOF (chapitre 10)."); j.suite(); } });
    } }
  ]
}));
