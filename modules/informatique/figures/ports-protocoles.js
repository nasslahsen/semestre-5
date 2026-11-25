/* Figure : le chemin d'un service à travers les couches (schéma « Ports UDP et TCP » du cours). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-ports", {
    largeur: 960, hauteur: 480, titre: "Ports UDP et TCP",
    essai: "<strong>Essaie</strong> : touche un service. <strong>Observe</strong> : son port et son protocole de transport ; la socket du serveur, c'est l'adresse IP plus ce port."
  });
  var S = [["HTTP", 80, "TCP"], ["SMTP", 25, "TCP"], ["DNS", 53, "UDP"], ["SSH", 22, "TCP"]];
  var it = S.map(function (s, i) { return { x: 60 + i * 220, y: 30, w: 180, h: 80, t: s[0], sous: "port " + s[1], texte: "écoute sur le port " + s[1] + " en " + s[2] + ". Socket du serveur : <code>192.168.1.10:" + s[1] + "</code>.", taille: 22 }; });
  A.explorer(f, it, { fond: function (g) {
    A.boite(g, 200, 200, 220, 70, { titre: "TCP", fond: C.fond, bord: C.trait, taille: 22 });
    A.boite(g, 540, 200, 220, 70, { titre: "UDP", fond: C.fond, bord: C.trait, taille: 22 });
    A.boite(g, 370, 330, 220, 60, { titre: "IP 192.168.1.10", fond: C.fond, bord: C.trait, taille: 19, mono: true });
    A.texte(g, "Serveur", [480, 430], { taille: 18, gras: 800, coul: C.doux });
    A.fleche(g, [310, 272], [440, 328], { ep: 3, coul: C.gris }); A.fleche(g, [650, 272], [520, 328], { ep: 3, coul: C.gris });
  }, devant: function (g, k) {
    if (k < 0) return;
    var x = 150 + k * 220, cible = S[k][2] === "TCP" ? 310 : 650;
    A.fleche(g, [x, 112], [cible, 198], { ep: 5, coul: C.jeu });
    A.boite(g, S[k][2] === "TCP" ? 200 : 540, 200, 220, 70, { titre: S[k][2], fond: C.jeuPale, bord: C.jeu, ep: 4, taille: 22 });
  } });
})();
