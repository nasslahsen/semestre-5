/* Figures : remonter d'un lot aux patients (traçabilité des implantables), puis la matrice de responsabilités, activité par activité (S3-S4, diapos 12 et 13). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-trace", { largeur: 960, hauteur: 380, titre: "Alerte sur un lot : retrouver les patients",
    essai: "<strong>Essaie</strong> : touche l'alerte, puis chaque maillon. <strong>Observe</strong> : sans le lien dispositif – lot – patient, la recherche s'arrête au lot." });
  var items = [
    { x: 20, y: 120, w: 190, h: 120, t: "Alerte de matériovigilance", texte: "l'alerte vise un lot précis de dispositifs.", coul: C.ko, pale: C.koPale },
    { x: 260, y: 120, w: 190, h: 120, t: "Lot", sous: "numéro du lot", texte: "on cherche dans le SIH tous les dispositifs de ce lot." },
    { x: 500, y: 120, w: 190, h: 120, t: "Dispositifs", sous: "un numéro chacun", texte: "chaque dispositif implanté a été tracé à l'intervention, au bloc." },
    { x: 740, y: 120, w: 200, h: 120, t: "Patients", sous: "à rappeler", texte: "le lien obligatoire dispositif – lot – patient donne la liste des patients à contacter." }
  ];
  A.explorer(f, items, { fond: function (g) {
    for (var i = 1; i < items.length; i++) A.relier(g, items[i - 1], items[i], { ep: 4, coul: C.jeu });
    A.texte(g, "Stérilisation : cycles, charges, dispositifs réutilisables", [480, 290], { taille: 17, coul: C.doux });
    A.texte(g, "Usage unique : consommables rattachés à l'acte et au patient", [480, 325], { taille: 17, coul: C.doux });
  }, invite: "Touche l'alerte pour commencer." });

  // Matrice R / C : toucher une activité montre qui est responsable, qui est consulté.
  var m = R.figure("fig-matrice", { largeur: 960, hauteur: 440, titre: "Qui fait quoi ?",
    essai: "<strong>Essaie</strong> : touche une activité. <strong>Observe</strong> : le biomédical est responsable partout, sauf pour associer un moniteur à un patient." });
  var ACT = ["Mise en service d'un moniteur", "Mise à jour logicielle d'un automate", "Panne d'un scanner", "Association moniteur – patient", "Alerte de matériovigilance"];
  var QUI = ["Biomédical", "DSI", "Service clinique", "DIM", "Fournisseur"];
  var MAT = [["R", "R", "R", "–", "C"], ["R", "C", "C", "–", "C"], ["R", "C", "C", "–", "R"], ["C", "C", "R", "–", "–"], ["R", "–", "C", "C", "C"]];
  var it = ACT.map(function (t, i) { return { x: 20, y: 70 + i * 72, w: 330, h: 62, t: t, texte: QUI.map(function (q, k) { return q + " : " + (MAT[i][k] === "R" ? "responsable" : MAT[i][k] === "C" ? "consulté" : "pas concerné"); }).join(", ") + ".", taille: 16 }; });
  A.explorer(m, it, { fond: function (g) {
    QUI.forEach(function (q, k) { A.texte(g, q, [430 + k * 115, 40], { taille: 15, gras: 700, largeur: 110 }); });
  }, devant: function (g, ch) {
    MAT.forEach(function (l, i) {
      l.forEach(function (v, k) {
        var on = i === ch, x = 385 + k * 115, y = 70 + i * 72;
        var fond = v === "R" ? (on ? C.jeu : C.jeuPale) : v === "C" ? (on ? C.accPale : C.fond) : "#fff";
        A.boite(g, x, y, 90, 62, { titre: v, taille: 22, fond: fond, bord: on ? C.encre : C.trait, ep: on ? 3 : 1.5, coul: v === "R" && on ? "#fff" : C.encre, mono: true });
      });
    });
  }, invite: "Touche une activité." });
})();
