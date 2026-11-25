/* Figure : architecture tri-tiers du cours ; chaque pare-feu ne laisse passer que le flux du niveau voisin. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-tritiers", {
    largeur: 960, hauteur: 560, titre: "Architecture tri-tiers",
    essai: "<strong>Essaie</strong> : touche un pare-feu ou un niveau. <strong>Observe</strong> : chaque pare-feu n'accepte qu'un flux, venant du niveau juste au-dessus."
  });
  var it = [
    { x: 160, y: 20, w: 520, h: 54, t: "Internet et réseaux non fiables", fond: C.fond, texte: "d'où viennent les patients qui consultent le portail, et les attaquants." },
    { x: 160, y: 92, w: 520, h: 54, t: "Pare-feu 1 : périmétrique", sous: "HTTPS 443 entrant uniquement", coul: C.ko, pale: C.koPale, texte: "seul le HTTPS (443) entre depuis Internet, et seulement vers la DMZ." },
    { x: 160, y: 164, w: 520, h: 64, t: "Niveau 1 : présentation (DMZ)", sous: "reverse proxy, WAF, portail patient", coul: C.brun, pale: C.brunPale, texte: "la seule partie exposée à Internet." },
    { x: 160, y: 246, w: 520, h: 54, t: "Pare-feu 2 : interne", sous: "port applicatif dédié, depuis la DMZ seule", coul: C.ko, pale: C.koPale, texte: "seul le port applicatif passe, et seulement depuis la DMZ." },
    { x: 160, y: 318, w: 520, h: 64, t: "Niveau 2 : application", sous: "serveurs applicatifs : DPI, API, moteur d'interface", coul: C.acc, pale: C.accPale, texte: "la logique métier, jamais joignable depuis Internet." },
    { x: 160, y: 400, w: 520, h: 54, t: "Pare-feu 3 : données", sous: "requêtes SQL depuis l'application seule", coul: C.ko, pale: C.koPale, texte: "seules les requêtes SQL venant de l'application passent." },
    { x: 160, y: 472, w: 520, h: 64, t: "Niveau 3 : données", sous: "bases de données, stockage PACS", coul: C.ok, pale: C.okPale, texte: "les informations sensibles, derrière trois pare-feu." },
    { x: 730, y: 150, w: 200, h: 300, t: "Transversal", haut: true, coul: C.v, pale: C.vPale, texte: "SIEM / IDS pour la journalisation, bastion pour l'administration, sauvegarde isolée du réseau." }
  ];
  it.forEach(function (x) { x.taille = x.taille || 18; x.tailleSous = 16; });
  A.explorer(f, it, { devant: function (g) {
    ["SIEM / IDS", "Bastion", "Sauvegarde isolée"].forEach(function (t, i) { A.boite(g, 750, 210 + i * 76, 160, 58, { titre: t, taille: 16, fond: "#fff", bord: C.trait, ep: 2 }); });
  } });
})();
