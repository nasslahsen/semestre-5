/* Figure : ce que Nmap révèle d'un réseau, ses quatre fonctionnalités autour de l'outil. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-nmap", {
    largeur: 960, hauteur: 460, titre: "Ce que Nmap révèle",
    essai: "<strong>Essaie</strong> : touche chaque fonctionnalité. <strong>Observe</strong> : on passe de « qui est là » à « quelle version tourne », la question qui intéresse l'attaquant."
  });
  var it = [
    { x: 30, y: 40, w: 300, h: 130, t: "Découverte d'hôtes", sous: "qui est actif ?", texte: "identifier les machines ou appareils actifs et connectés sur le réseau." },
    { x: 630, y: 40, w: 300, h: 130, t: "Scan de ports", sous: "ouvert, fermé, bloqué ?", texte: "vérifier quels ports sont ouverts, fermés ou bloqués par un pare-feu." },
    { x: 30, y: 290, w: 300, h: 130, t: "Détection de services", sous: "quel programme, quelle version ?", texte: "identifier les programmes qui tournent sur les ports ouverts et leur version exacte." },
    { x: 630, y: 290, w: 300, h: 130, t: "Identification de l'OS", sous: "Windows, Linux ?", texte: "estimer le système d'exploitation utilisé par la machine cible." }
  ];
  it.forEach(function (x) { x.taille = 21; });
  A.explorer(f, it, { fond: function (g) {
    A.s("circle", { cx: 480, cy: 230, r: 90, fill: C.encre }, g);
    A.texte(g, "Nmap", [480, 218], { taille: 30, coul: "#fff", halo: false, gras: 800 });
    A.texte(g, "Network Mapper", [480, 254], { taille: 16, coul: "#fff", halo: false, gras: 500 });
    [[330, 105, 400, 180], [630, 105, 560, 180], [330, 355, 400, 280], [630, 355, 560, 280]].forEach(function (l) { A.fleche(g, [l[2], l[3]], [l[0], l[1]], { ep: 4, coul: C.gris }); });
  } });
})();
