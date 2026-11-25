/* Figure : les objectifs de sécurité à intégrer dès la conception (triangle d'or + traçabilité). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-conception", {
    largeur: 960, hauteur: 420, titre: "Triangle d'or + traçabilité",
    essai: "<strong>Essaie</strong> : touche chaque objectif. <strong>Observe</strong> : la traçabilité entoure les trois autres ; elle permet de savoir ce qui leur est arrivé."
  });
  var it = [
    { x: 80, y: 200, w: 240, h: 110, t: "Confidentialité", sous: "seuls les ayants droit", coul: C.ko, pale: C.koPale, texte: "seuls les ayants droit accèdent aux données (DPI, imagerie). Dans le réseau : cloisonnement, chiffrement." },
    { x: 360, y: 60, w: 240, h: 110, t: "Intégrité", sous: "pas de modification à tort", coul: C.ok, pale: C.okPale, texte: "les données ne sont pas modifiées à tort (posologie, résultats de labo). Dans le réseau : protocoles qui authentifient les paquets." },
    { x: 640, y: 200, w: 240, h: 110, t: "Disponibilité", sous: "le service répond", coul: C.v, pale: C.vPale, texte: "le réseau répond quand on en a besoin (monitorage, PACS). Dans le réseau : redondance, pas de SPOF." },
    { x: 330, y: 330, w: 300, h: 70, t: "Traçabilité", sous: "qui, quoi, quand", coul: C.acc, pale: C.accPale, texte: "garder la trace de qui a fait quoi et quand : journaux centralisés, horloge unique." }
  ];
  it.forEach(function (x) { x.taille = 21; });
  A.explorer(f, it, { fond: function (g) {
    A.s("polygon", { points: "200,230 480,120 760,230", fill: "none", stroke: C.trait, "stroke-width": 5 }, g);
    A.s("rect", { x: 40, y: 30, width: 880, height: 380, rx: 30, fill: "none", stroke: C.acc, "stroke-width": 2.5, "stroke-dasharray": "10 8" }, g);
  } });
})();
