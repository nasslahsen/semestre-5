/* Figure : Public, DMZ, Privé séparés par deux pare-feu (schéma du cours) ; où placer chaque serveur. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-dmz", {
    largeur: 960, hauteur: 440, titre: "Public, DMZ, privé",
    essai: "<strong>Essaie</strong> : touche chaque zone. <strong>Observe</strong> : pour atteindre la base de données depuis Internet, il faut franchir deux pare-feu."
  });
  var it = [
    { x: 30, y: 40, w: 250, h: 360, t: "Public", haut: true, coul: C.ko, pale: C.koPale, texte: "Internet : réseau public non fiable, d'où viennent les utilisateurs... et les attaquants." },
    { x: 355, y: 40, w: 250, h: 360, t: "DMZ", haut: true, coul: C.brun, pale: C.brunPale, texte: "zone tampon : on y héberge les services publics (web, mail, DNS). Si l'un d'eux est compromis, le réseau interne reste derrière un second pare-feu." },
    { x: 680, y: 40, w: 250, h: 360, t: "Privé", haut: true, coul: C.ok, pale: C.okPale, texte: "réseau local fiable : serveur de base de données, serveur de services web internes. Jamais joignable directement depuis Internet." }
  ];
  it.forEach(function (x) { x.taille = 24; });
  A.explorer(f, it, { devant: function (g) {
    [[317, 220], [642, 220]].forEach(function (p) { A.boite(g, p[0] - 30, p[1] - 40, 60, 80, { fond: C.koPale, bord: C.ko, rx: 6 }); A.texte(g, "pare-feu", [p[0], p[1] + 60], { taille: 16, gras: 700, coul: C.ko }); });
    A.icone(g, "nuage", [155, 170], 90); A.icone(g, "personne", [155, 300], 70);
    A.icone(g, "serveur", [480, 210], 80); A.texte(g, "serveur d'applications web", [480, 290], { taille: 16, largeur: 200 });
    A.icone(g, "base", [805, 160], 70); A.texte(g, "base de données", [805, 220], { taille: 16 });
    A.icone(g, "serveur", [805, 290], 70); A.texte(g, "services web", [805, 350], { taille: 16 });
  } });
})();
