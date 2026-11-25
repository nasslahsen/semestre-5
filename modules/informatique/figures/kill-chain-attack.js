/* Figure : la kill chain de la séance 2, sept phases sur deux rangées comme sur la diapositive. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-kc7", {
    largeur: 960, hauteur: 440, titre: "La kill chain en sept phases",
    essai: "<strong>Essaie</strong> : avance phase par phase. <strong>Observe</strong> : chaque phase prépare la suivante ; l'exploitation et les objectifs sont les moments critiques."
  });
  var N = [["Reconnaissance", "collecte d'infos"], ["Armement", "préparation"], ["Livraison", "envoi à la cible"], ["Exploitation", "faille exploitée"], ["Installation", "porte dérobée"], ["C2 (pilotage)", "liaison distante"], ["Objectifs", "vol, chiffrement"]];
  var nd = N.map(function (p, i) { var r = i < 4 ? 0 : 1, c = i < 4 ? i : i - 4 + 0.5; return { x: 30 + c * 232, y: 60 + r * 200, w: 200, h: 110, t: p[0], sous: p[1], taille: 20 }; });
  A.etapesFig(f, nd, [
    "<strong>Reconnaissance</strong> : l'attaquant collecte des informations sur l'hôpital (sites, employés, machines exposées).",
    "<strong>Armement</strong> : il prépare son outil, par exemple un rançongiciel caché dans une pièce jointe.",
    "<strong>Livraison</strong> : il l'envoie à la cible (courriel, clé USB, site piégé).",
    "<strong>Exploitation</strong> : une faille est exploitée ; l'attaquant entre vraiment.",
    "<strong>Installation</strong> : il pose une porte dérobée pour revenir quand il veut.",
    "<strong>C2 (pilotage)</strong> : la machine prise reste reliée à lui à distance.",
    "<strong>Objectifs</strong> : vol ou chiffrement des données ; c'est le message de rançon du lundi 13 h 45."
  ], { depart: "Avance phase par phase pour suivre l'attaque." });
})();
