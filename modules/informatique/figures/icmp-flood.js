/* Figure : saturation d'un lien par des pings, d'une source (DoS) à plusieurs (DDoS). Exemple ajouté, chiffres d'illustration. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-icmp", {
    largeur: 960, hauteur: 440, titre: "Du DoS au DDoS",
    essai: "<strong>Essaie</strong> : augmente le nombre de machines qui envoient des pings. <strong>Observe</strong> : le lien de la cible se remplit ; au-delà de 100 %, le trafic normal ne passe plus."
  });
  var g = A.s("g", null, f.svg), CAP = 1000, DEB = 50;
  var cur = R.curseur(f.reglages, { nom: "Machines", min: 1, max: 30, pas: 1, val: 1 });
  function dessiner() {
    A.vider(g);
    var n = cur.v, charge = n * DEB, pct = Math.min(charge / CAP, 1.2);
    for (var i = 0; i < Math.min(n, 30); i++) { var x = 40 + (i % 6) * 60, y = 50 + Math.floor(i / 6) * 70; A.icone(g, "pirate", [x + 20, y + 20], 40, C.ko); }
    A.fleche(g, [420, 210], [560, 210], { ep: 4 + Math.min(n, 30) * 0.6, coul: C.ko });
    A.icone(g, "serveur", [660, 150], 90);
    A.texte(g, "Cible", [660, 215], { taille: 18, gras: 800 });
    A.s("rect", { x: 560, y: 270, width: 360, height: 40, rx: 8, fill: C.fond, stroke: C.encre, "stroke-width": 2 }, g);
    A.s("rect", { x: 560, y: 270, width: 360 * Math.min(pct, 1), height: 40, rx: 8, fill: pct >= 1 ? C.ko : C.brun }, g);
    A.texte(g, "lien de la cible : " + Math.round(charge / CAP * 100) + " %", [740, 340], { taille: 19, gras: 700, coul: pct >= 1 ? C.ko : C.encre });
    A.texte(g, n === 1 ? "une source : DoS" : n + " sources : DDoS", [740, 390], { taille: 22, gras: 800, coul: C.ko });
    f.direct.innerHTML = "Exemple ajouté : chaque machine envoie 50 Mb/s de demandes d'écho, le lien de la cible fait 1 000 Mb/s. " + (pct >= 1 ? "<strong>Lien saturé</strong> : la cible est inaccessible au trafic normal." : "Le trafic normal passe encore.");
  }
  cur.surChange(dessiner); dessiner();
})();
