/* Figure : déroulement de l'ARP spoofing (adresses du cours) : caches ARP avant, pendant, après. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-arp", {
    largeur: 960, hauteur: 560, titre: "Déroulement de l'ARP spoofing",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : le cache ARP de chaque victime ; une seule ligne change, et tout le trafic passe par le hacker."
  });
  var g = A.s("g", null, f.svg);
  var mA = "…:00:01", mB = "…:00:02", mH = "…:00:03";
  var textes = ["Avant l'attaque : chaque cache associe la bonne MAC ; le switch envoie le trafic directement de A à B.",
    "Le hacker envoie à A un gratuitous ARP : « 192.168.1.254 est …:03 ». A met son cache à jour sans rien vérifier.",
    "Il envoie à B : « 192.168.1.100 est …:03 ». Les deux caches sont empoisonnés.",
    "A et B s'envoient leurs trames… au hacker, qui les lit et les relaie : homme du milieu (MitM)."];
  function dessiner(k) {
    A.vider(g);
    var pA = [150, 110], pB = [810, 110], pS = [480, 240], pH = [480, 430];
    var trafic = k >= 3 ? C.ko : C.acc;
    if (k < 3) A.fleche(g, [pA[0] + 60, pA[1] + 20], [pB[0] - 60, pB[1] + 20], { ep: 4, coul: C.acc, tirets: "8 6" });
    else { A.fleche(g, [pA[0] + 40, pA[1] + 40], [pH[0] - 40, pH[1] - 30], { ep: 5, coul: C.ko }); A.fleche(g, [pH[0] + 40, pH[1] - 30], [pB[0] - 40, pB[1] + 40], { ep: 5, coul: C.ko }); }
    [[pA, pS], [pB, pS], [pH, pS]].forEach(function (l) { A.s("line", { x1: l[0][0], y1: l[0][1], x2: l[1][0], y2: l[1][1], stroke: C.trait, "stroke-width": 4 }, g); });
    A.boite(g, pS[0] - 60, pS[1] - 26, 120, 52, { titre: "Switch", taille: 18, fond: C.fond });
    A.icone(g, "ecran", pA, 70); A.texte(g, "PC A  192.168.1.100", [pA[0], pA[1] + 52], { taille: 17, mono: true });
    A.icone(g, "serveur", pB, 70); A.texte(g, "Serveur B  192.168.1.254", [pB[0], pB[1] + 52], { taille: 17, mono: true });
    A.icone(g, "pirate", pH, 70, C.ko); A.texte(g, "Hacker  192.168.1.150  …:03", [pH[0], pH[1] + 52], { taille: 17, mono: true, coul: C.ko });
    if (k === 1) A.fleche(g, [pH[0] - 40, pH[1] - 10], [pA[0] + 20, pA[1] + 80], { ep: 4, coul: C.ko, tirets: "4 6" });
    if (k === 2) A.fleche(g, [pH[0] + 40, pH[1] - 10], [pB[0] - 20, pB[1] + 80], { ep: 4, coul: C.ko, tirets: "4 6" });
    var cA = [["IPv4", "MAC"], ["192.168.1.254", k >= 1 ? mH : mB], ["192.168.1.150", mH]];
    var cB = [["IPv4", "MAC"], ["192.168.1.100", k >= 2 ? mH : mA], ["192.168.1.150", mH]];
    var st = function (faux) { return function (i, c) { return i === 1 && faux ? { fond: C.koPale, coul: C.ko, gras: 700, mono: c === 1 } : { mono: i > 0 }; }; };
    A.tableau(g, 10, 210, [160, 120], 38, cA, { taille: 16, style: st(k >= 1) });
    A.texte(g, "cache ARP de A", [145, 196], { taille: 16, gras: 700, coul: C.doux });
    A.tableau(g, 670, 210, [160, 120], 38, cB, { taille: 16, style: st(k >= 2) });
    A.texte(g, "cache ARP de B", [805, 196], { taille: 16, gras: 700, coul: C.doux });
    f.direct.innerHTML = textes[k];
  }
  var et = R.etapes(f.reglages, 3, ["Avant", "Faux ARP vers A", "Faux ARP vers B", "Homme du milieu"], dessiner);
  et.aller(0);
})();
