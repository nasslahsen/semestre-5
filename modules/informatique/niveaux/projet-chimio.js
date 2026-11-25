/* Niveau : le projet du centre d'oncologie, la règle exigences = preuves, le circuit de chimiothérapie (S5, diapos 1 à 3). */
NIVEAU(SIS.rejouable({
  id: "projet-chimio",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    var n = { g: g };
    n.cinq = function (noms, place) { return noms.map(function (e, i) { var c = place[i]; return { t: e[0], sous: e[1], x: c === 4 ? 185 : 20 + (c % 2) * 330, y: 40 + Math.floor(c / 2) * 180, w: 310, h: 110 }; }); };
    return n;
  },
  etapes: [
    { nom: "Exigence ou preuve", jouer: function (j, n) {
      var A = SIS;
      j.titre("Deux offres arrivent. Range chaque phrase : est-ce une exigence (ce que le système doit garantir) ou une preuve (comment le fournisseur le démontre) ?");
      var cartes = [
        { t: "La bonne prescription arrive sur le bon patient", bac: 0 }, { t: "Un site de référence", bac: 1 }, { t: "Le système empêche une erreur de dose", bac: 0 },
        { t: "Des tests avec identités fictives", bac: 1 }, { t: "Le personnel est protégé des cytotoxiques", bac: 0 }, { t: "Un engagement contractuel", bac: 1 }
      ];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Exigence" }, { t: "Preuve" }],
        pos: A.grille(6, 2, 20, 20, 640, 74, 12), bacsPos: function (k) { return { x: 20 + k * 330, y: 300, w: 310, h: 260 }; },
        taille: 16, tailleBac: 24, erreur: j.erreur, info: j.info,
        aide: function (i) { return cartes[i].bac === 0 ? "C'est un résultat que le système doit garantir." : "C'est un moyen de démontrer, pas un résultat."; },
        fin: function () { j.bravo("Exigences = preuves : à chaque exigence, sa preuve."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Le circuit de chimiothérapie", jouer: function (j, n) {
      var A = SIS, C = A.C;
      j.titre("Touche les cinq étapes du circuit de chimiothérapie, dans l'ordre.");
      var nd = n.cinq([["Prescription du protocole", "dans le DPI, par l'oncologue"], ["Validation pharmaceutique", "doses, interactions, protocole"], ["Préparation et contrôle", "isolateur ou robot"], ["Transport et administration", "patient vérifié"], ["Traçabilité", "du produit au patient"]], [4, 2, 0, 3, 1]);
      var tr = A.trace({ g: n.g, noeuds: nd, ordre: [0, 1, 2, 3, 4], coul: C.jeu, taille: 19, erreur: j.erreur,
        aide: function (i, att, k) { return ["L'oncologue prescrit d'abord.", "Le pharmacien vérifie avant toute préparation.", "On prépare le produit cytotoxique.", "La poche part vers le patient.", "On garde le lien du produit au patient."][k]; },
        fin: function () { j.bravo("Prescription → validation → préparation et contrôle → transport et administration → traçabilité."); j.suite(); } });
      j.reponse(function () { tr.resoudre(); });
    } },
    { nom: "Acteurs, DM, interfaces", jouer: function (j, n) {
      var A = SIS;
      j.titre("Range chaque élément du circuit : acteur métier, DM, ou interface avec le SIH ?");
      var cartes = [{ t: "Oncologue", bac: 0 }, { t: "Étiqueteuse", bac: 1 }, { t: "Identité patient", bac: 2 }, { t: "Préparateur", bac: 0 }, { t: "Pompes", bac: 1 }, { t: "Module pharmacie", bac: 2 }];
      var t = A.trier({
        g: n.g, cartes: cartes, bacs: [{ t: "Acteur" }, { t: "DM" }, { t: "Interface SIH" }],
        pos: A.grille(6, 3, 10, 30, 660, 80, 12), bacsPos: function (k) { return { x: 10 + k * 225, y: 280, w: 210, h: 260 }; },
        taille: 18, tailleBac: 22, erreur: j.erreur, info: j.info,
        aide: function (i) { return ["C'est une personne.", "C'est un appareil.", "C'est une donnée ou un module déjà présent dans le SIH."][cartes[i].bac]; },
        fin: function () { j.bravo("Acteurs : oncologue, préparateur. DM : étiqueteuse, pompes. Interfaces : identité patient, module pharmacie."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Côté biomédical", jouer: function (j, n) {
      var A = SIS;
      A.scene(n.g, { icones: ["engrenage", "serveur"], titre: "L'ingénieur biomédical face aux deux offres", alerte: false });
      j.titre("Dans ce circuit, que porte l'ingénieur biomédical ?");
      j.choix([
        { html: "Il choisit le protocole de chimiothérapie de chaque patient", aide: "Le protocole est prescrit par l'oncologue." },
        { html: "Les exigences de sécurité des DM, et la vérification de ce qui est prouvé sur leur lien avec le SIH", juste: true },
        { html: "Il valide les doses de chaque prescription", aide: "C'est la validation pharmaceutique." }
      ], { colonnes: 1, ok: function () { j.bravo("Sécurité des DM et lien prouvé avec le SIH existant."); j.suite(); } });
    } }
  ]
}));
