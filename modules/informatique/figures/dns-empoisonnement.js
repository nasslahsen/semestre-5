/* Figure : empoisonnement du cache DNS, en trois temps comme sur la diapositive (adresses de l'exemple du cours). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-dns", {
    largeur: 960, hauteur: 460, titre: "Empoisonnement du cache DNS",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : la ligne du cache ; une fois fausse, elle trompe tous les utilisateurs suivants."
  });
  var g = A.s("g", null, f.svg);
  var T = ["Normalement, le résolveur répond depuis son cache : example.com est en 192.0.0.16, le vrai site.",
    "L'attaquant se fait passer pour le serveur faisant autorité : « example.com est en 192.0.0.17 ». Le résolveur le croit et met cette réponse en cache.",
    "L'utilisateur suivant reçoit 192.0.0.17 (en cache) et arrive sur le site malveillant, sans avoir fait d'erreur."];
  function dessiner(k) {
    A.vider(g);
    var faux = k >= 1;
    A.icone(g, "ecran", [110, 120], 80); A.texte(g, "Utilisateur", [110, 180], { taille: 17, gras: 700 });
    A.icone(g, "serveur", [480, 120], 80); A.texte(g, "Résolveur DNS", [480, 180], { taille: 17, gras: 700 });
    A.tableau(g, 330, 205, [150, 150], 38, [["nom", "IP en cache"], ["example.com", faux ? "192.0.0.17" : "192.0.0.16"]], { taille: 16, style: function (i, c) { return i === 1 && c === 1 && faux ? { fond: C.koPale, coul: C.ko, gras: 700, mono: true } : { mono: i > 0 }; } });
    A.fleche(g, [170, 105], [420, 105], { ep: 3, coul: C.gris }); A.texte(g, "Quelle IP pour example.com ?", [295, 85], { taille: 16, coul: C.doux });
    A.fleche(g, [420, 140], [170, 140], { ep: 3, coul: faux && k === 2 ? C.ko : C.ok });
    if (k === 1) { A.icone(g, "pirate", [820, 120], 80, C.ko); A.texte(g, "Attaquant", [820, 180], { taille: 17, gras: 700, coul: C.ko }); A.fleche(g, [760, 120], [545, 120], { ep: 4, coul: C.ko }); A.texte(g, "« je fais autorité : 192.0.0.17 »", [660, 90], { taille: 16, coul: C.ko }); }
    A.boite(g, 60, 340, 240, 80, { titre: "example.com", sous: "192.0.0.16, vrai site", fond: k === 2 ? "#fff" : C.okPale, bord: k === 2 ? C.trait : C.ok, taille: 18 });
    A.boite(g, 660, 340, 260, 80, { titre: "Site malveillant", sous: "192.0.0.17", fond: k === 2 ? C.koPale : "#fff", bord: k === 2 ? C.ko : C.trait, taille: 18 });
    A.fleche(g, [110, 200], k === 2 ? [700, 336] : [150, 336], { ep: 4, coul: k === 2 ? C.ko : C.ok });
    f.direct.innerHTML = T[k];
  }
  var et = R.etapes(f.reglages, 2, ["Normal", "Fausse réponse", "Utilisateur redirigé"], dessiner);
  et.aller(0);
})();
