/* Figure : quatre équipements rangés par couche OSI. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-equip", {
    largeur: 960, hauteur: 440, titre: "Quel équipement, à quelle couche ?",
    essai: "<strong>Essaie</strong> : touche chaque équipement. <strong>Observe</strong> : plus on monte en couche, plus l'équipement comprend ce qu'il transporte."
  });
  var it = [
    { x: 250, y: 330, w: 190, h: 80, t: "Hub", sous: "couche 1", texte: "aucune intelligence : il diffuse tout à tous les ports. Obsolète." },
    { x: 440, y: 220, w: 190, h: 80, t: "Switch", sous: "couche 2", texte: "apprend les adresses MAC (table MAC) et envoie chaque trame au bon port du LAN." },
    { x: 650, y: 110, w: 190, h: 80, t: "Routeur", sous: "couche 3", texte: "table de routage, routage statique et dynamique (RIP, OSPF) : relie le LAN à Internet." },
    { x: 650, y: 220, w: 290, h: 80, t: "Switch multicouche", sous: "couches 2 et 3", texte: "commutation L2 et L3, routage inter-VLAN, ACL : le cœur de réseau." }
  ];
  it.forEach(function (x) { x.taille = 21; });
  A.explorer(f, it, { fond: function (g) {
    [["Couche 3 : réseau", 150], ["Couche 2 : liaison", 260], ["Couche 1 : physique", 370]].forEach(function (l) {
      A.s("line", { x1: 30, y1: l[1] + 46, x2: 930, y2: l[1] + 46, stroke: C.trait, "stroke-width": 2, "stroke-dasharray": "6 6" }, g);
      A.texte(g, l[0], [30, l[1]], { taille: 16, ancre: "start", coul: C.doux, gras: 700 });
    });
  } });
})();
