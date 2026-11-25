/* Figure : les niveaux du modèle de Purdue (schéma du cours), de l'IT au processus physique. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-purdue", {
    largeur: 960, hauteur: 560, titre: "Modèle de Purdue",
    essai: "<strong>Essaie</strong> : touche chaque niveau. <strong>Observe</strong> : la DMZ industrielle (3.5) sépare l'IT de l'OT ; aucun flux ne doit la contourner."
  });
  var L = [["5", "Enterprise / corporate IT", "services d'annuaire, ERP, applications d'entreprise", 0], ["4", "Enterprise network", "serveurs web, courriel, DNS", 0], ["3.5", "Demilitarized zone (DMZ)", "serveur de correctifs, historian miroir, serveur de rebond", 1], ["3", "Manufacturing operations", "poste de travail, historian, serveur d'E/S", 2], ["2", "Supervisory control", "SCADA, IHM", 2], ["1", "Basic control", "PLC, RTU, contrôleurs DCS, SIS", 2], ["0", "Physical process", "capteurs, actionneurs", 2]];
  var St = [[C.acc, C.accPale], [C.brun, C.brunPale], [C.ko, C.koPale]];
  var it = L.map(function (l, i) { return { x: 120, y: 20 + i * 76, w: 800, h: 66, t: "Level " + l[0] + " : " + l[1], sous: l[2], coul: St[l[3]][0], pale: St[l[3]][1], texte: "niveau " + l[0] + ", " + l[1] + " : " + l[2] + ".", taille: 20, tailleSous: 16 }; });
  A.explorer(f, it, { fond: function (g) {
    A.s("path", { d: "M70 24 V166 M60 24 H80 M60 166 H80", stroke: C.acc, "stroke-width": 3, fill: "none" }, g); A.texte(g, "IT", [40, 95], { taille: 22, gras: 800, coul: C.acc });
    A.s("path", { d: "M70 254 V546 M60 254 H80 M60 546 H80", stroke: C.ko, "stroke-width": 3, fill: "none" }, g); A.texte(g, "OT", [40, 400], { taille: 22, gras: 800, coul: C.ko });
  } });
})();
