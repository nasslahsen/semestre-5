/* Figures : le circuit transfusionnel étape par étape, puis la chaîne d'un incident type et ses barrières (S3-S4, diapos 9 et 10). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var E = [
    ["Prescription de PSL", "produits sanguins labiles", "le médecin prescrit les produits sanguins labiles."],
    ["Bilan pré-transfusionnel", "groupage ABO / Rh, RAI", "groupage ABO / Rh et recherche d'agglutinines irrégulières (RAI), sur un prélèvement bien identifié."],
    ["Dépôt de sang", "réception, déstockage, délivrance", "réception, déstockage, dispensation, délivrance de la poche."],
    ["Contrôle ultime", "au lit du malade", "la dernière barrière : poche et patient sont confrontés au lit."],
    ["Traçabilité", "donneur, poche, receveur", "le lien donneur – poche – receveur est archivé : c'est la base de l'hémovigilance."]
  ];
  var f = R.figure("fig-sang", { largeur: 960, hauteur: 380, titre: "Circuit transfusionnel",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : l'identité du receveur est contrôlée deux fois, au prélèvement du bilan et au lit." });
  var N = E.map(function (e, i) { return { t: e[0], sous: e[1], x: 10 + i * 190, y: 30, w: 175, h: 120, taille: 17, tailleSous: 14 }; });
  A.etapesFig(f, N, E.map(function (e) { return "<strong>" + e[0] + "</strong> : " + e[2]; }), {
    fond: function (g, k) {
      if (k < E.length) return;
      A.boite(g, 10, 190, 940, 150, { titre: "Rôle du SIH", sous: "rapprocher prescription, poche et patient, alerter sur la compatibilité, archiver", taille: 19, tailleSous: 17, fond: C.jeuPale, bord: C.jeu });
    }, depart: "Avance pour suivre la poche jusqu'au patient."
  });

  // La chaîne d'un incident type : chaque maillon touché dit quelle barrière aurait dû l'arrêter.
  var g2 = R.figure("fig-incident", { largeur: 960, hauteur: 360, titre: "La chaîne d'un incident type",
    essai: "<strong>Essaie</strong> : touche chaque maillon. <strong>Observe</strong> : l'erreur part du prélèvement, et chaque barrière suivante avait une chance de l'arrêter." });
  var M = [
    ["Prélèvement mal étiqueté", "Point de départ : une erreur d'identité. Barrière humaine : vérification d'identité au prélèvement."],
    ["Groupage sur la mauvaise identité", "Le laboratoire fait bien son travail, mais sur le mauvais patient : l'erreur est invisible pour lui."],
    ["Poche délivrée sur ce groupage", "Le dépôt délivre une poche compatible avec le groupage faux. Barrière informatique : rapprochement poche – patient."],
    ["Contrôle ultime non fait ou mal fait", "La dernière barrière humaine : le contrôle ultime au lit, aidé par l'alerte de compatibilité."],
    ["Incompatibilité ABO", "L'effet : toutes les barrières ont cédé. L'hémovigilance analyse l'incident pour qu'il ne se reproduise pas."]
  ];
  var items = M.map(function (m, i) { return { x: 10 + i * 190, y: 60, w: 175, h: 150, t: m[0], texte: m[1], taille: 17, coul: i === 4 ? C.ko : C.jeu, pale: i === 4 ? C.koPale : C.jeuPale }; });
  A.explorer(g2, items, { fond: function (g) {
    for (var i = 1; i < items.length; i++) A.relier(g, items[i - 1], items[i], { ep: 4, coul: C.doux });
    A.boite(g, 200, 250, 360, 80, { titre: "Barrières informatiques", sous: "rapprochement poche – patient, alerte de compatibilité", taille: 17, tailleSous: 15, fond: C.accPale, bord: C.acc });
    A.boite(g, 580, 250, 370, 80, { titre: "Barrières humaines", sous: "vérification d'identité, contrôle ultime au lit", taille: 17, tailleSous: 15, fond: C.vPale, bord: C.v });
  }, invite: "Touche un maillon de la chaîne." });
})();
