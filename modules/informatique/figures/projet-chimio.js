/* Figures : exigence et preuve (la règle de la séance), puis le circuit de chimiothérapie étape par étape (S5, diapos 2 et 3). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-preuves", { largeur: 960, hauteur: 340, titre: "Exigence = preuve",
    essai: "<strong>Essaie</strong> : touche l'exigence, puis chaque preuve. <strong>Observe</strong> : une exigence sans preuve n'est qu'une promesse." });
  var items = [
    { x: 20, y: 110, w: 300, h: 130, t: "Exigence", sous: "la bonne prescription arrive sur le bon patient", texte: "ce que le système doit garantir.", coul: C.jeu, pale: C.jeuPale },
    { x: 620, y: 20, w: 320, h: 85, t: "Site de référence", texte: "un établissement où la solution marche déjà, avec le même environnement." },
    { x: 620, y: 128, w: 320, h: 85, t: "Tests", texte: "des tests, par exemple avec des identités fictives, avant de signer." },
    { x: 620, y: 236, w: 320, h: 85, t: "Engagement contractuel", texte: "le fournisseur s'engage par écrit, dans le contrat." }
  ];
  A.explorer(f, items, { fond: function (g) {
    [1, 2, 3].forEach(function (k) { A.relier(g, items[0], items[k], { ep: 4, coul: C.doux }); });
    A.texte(g, "Preuves : comment le fournisseur le démontre", [780, 333], { taille: 15, coul: C.doux });
  }, invite: "Touche l'exigence." });

  var E = [
    ["Prescription du protocole", "dans le DPI, par l'oncologue", "l'oncologue prescrit le protocole dans le DPI. Interface : identité patient, DPI."],
    ["Validation pharmaceutique", "doses, interactions, protocole", "le pharmacien valide doses, interactions et protocole. Interface : module pharmacie."],
    ["Préparation et contrôle", "isolateur ou robot", "le préparateur prépare le cytotoxique à l'isolateur ou au robot, puis on contrôle et on étiquette. DM : poste ou robot, étiqueteuse."],
    ["Transport et administration", "vers l'unité, patient vérifié", "la poche part vers l'unité ; l'infirmier vérifie le patient et pose la perfusion. DM : pompes."],
    ["Traçabilité", "du produit au patient", "on garde le lien entre la préparation et le patient. DM : SI de gestion du circuit de chimiothérapie."]
  ];
  var g = R.figure("fig-chimio", { largeur: 960, hauteur: 380, titre: "Le circuit de chimiothérapie",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : à chaque étape, un acteur, un DM ou une interface avec le SIH." });
  var N = E.map(function (e, i) { return { t: e[0], sous: e[1], x: 10 + i * 190, y: 30, w: 175, h: 130, taille: 17, tailleSous: 14 }; });
  A.etapesFig(g, N, E.map(function (e) { return "<strong>" + e[0] + "</strong> : " + e[2]; }), {
    fond: function (gg, k) {
      if (k < E.length) return;
      A.boite(gg, 10, 200, 940, 140, { titre: "Côté biomédical", sous: "il porte les exigences de sécurité des DM et vérifie ce qui est prouvé sur leur lien avec le SIH existant", taille: 19, tailleSous: 17, fond: C.turqPale, bord: C.turq });
    }, depart: "Avance pour suivre une cure, de la prescription à la traçabilité."
  });
})();
