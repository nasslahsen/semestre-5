/* Figure : trois VLAN sur les mêmes switchs (adresses du schéma du cours) ; qui peut parler à qui. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-vlan", {
    largeur: 960, hauteur: 600, titre: "Trois réseaux logiques sur les mêmes switchs",
    essai: "<strong>Essaie</strong> : touche un VLAN. <strong>Observe</strong> : ses postes sont sur des switchs différents mais se voient ; les autres VLAN restent invisibles sans passer par le routeur."
  });
  var V = [["VLAN 10", "172.17.10.0/24", C.acc, C.accPale], ["VLAN 20", "172.17.20.0/24", C.v, C.vPale], ["VLAN 30", "172.17.30.0/24", C.brun, C.brunPale]];
  var postes = [[0, 120, 300], [1, 60, 420], [2, 230, 440], [0, 740, 300], [1, 900, 420], [2, 720, 440]];
  var it = V.map(function (v, k) { return { x: 165 + k * 220, y: 510, w: 190, h: 70, t: v[0], coul: v[2], pale: v[3], taille: 22, texte: v[0] + " (" + v[1] + ") : ses postes communiquent entre eux à travers les trunks, même sur deux switchs différents. Vers un autre VLAN : passage obligé par le routeur (routage inter-VLAN)." }; });
  A.explorer(f, it, { fond: function (g, ch) {
    var sw = [[200, 230], [760, 230], [480, 150]];
    A.s("line", { x1: 200, y1: 230, x2: 480, y2: 150, stroke: C.encre, "stroke-width": 5, "stroke-dasharray": "14 8" }, g);
    A.s("line", { x1: 760, y1: 230, x2: 480, y2: 150, stroke: C.encre, "stroke-width": 5, "stroke-dasharray": "14 8" }, g);
    A.texte(g, "trunk", [330, 175], { taille: 16, coul: C.doux }); A.texte(g, "trunk", [630, 175], { taille: 16, coul: C.doux });
    A.s("line", { x1: 480, y1: 150, x2: 480, y2: 70, stroke: C.encre, "stroke-width": 3 }, g);
    A.boite(g, 420, 30, 120, 44, { titre: "Routeur", taille: 16, fond: C.fond });
    postes.forEach(function (p) {
      var s = p[1] < 480 ? sw[0] : sw[1], v = V[p[0]], on = ch === p[0];
      A.s("line", { x1: s[0], y1: s[1], x2: p[1], y2: p[2], stroke: on ? v[2] : C.trait, "stroke-width": on ? 4 : 2.5 }, g);
      A.s("circle", { cx: p[1], cy: p[2], r: 34, fill: on || ch < 0 ? v[3] : "#fff", stroke: v[2], "stroke-width": on ? 4 : 2 }, g);
      A.icone(g, "ecran", [p[1], p[2]], 36, on || ch < 0 ? C.encre : C.gris);
    });
    A.boite(g, 150, 205, 100, 50, { titre: "SW1", taille: 17, fond: "#fff" });
    A.boite(g, 710, 205, 100, 50, { titre: "SW2", taille: 17, fond: "#fff" });
    A.boite(g, 430, 125, 100, 50, { titre: "SW3", taille: 17, fond: "#fff" });
  } });
})();
