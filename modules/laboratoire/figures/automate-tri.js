/* Figure : des tubes en vrac sont lus et orientés : directement vers l'hématologie, ou d'abord vers la centrifugeuse. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-automate-tri", {
    largeur: 960, hauteur: 540, titre: "Lire le tube, puis l'orienter",
    essai: "<strong>Essaie</strong> : touche un tube. <strong>Observe</strong> : l'automate lit le code-barres et le bouchon, puis décide s'il faut centrifuger avant l'analyse."
  });
  var g = A.s("g", null, f.svg), sel = null;
  var T = [
    { b: "edta", n: "EDTA", dest: 0, d: "EDTA (bouchon violet) pour une NFS : pas de centrifugation, direction l'hématologie." },
    { b: "sec", n: "sec", dest: 1, d: "Tube sec pour la biochimie : centrifugation, Gel-Check, débouchage, puis biochimie." },
    { b: "citrate", n: "citrate", dest: 1, d: "Citrate pour la coagulation : centrifugation d'abord, puis l'automate de coagulation." },
    { b: "heparine", n: "héparine", dest: 1, d: "Héparine pour la biochimie : centrifugation, contrôle, débouchage." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    A.boite(g, 30, 60, 250, 420, { fond: C.fond, bord: C.encre, ep: 3, rx: 16 });
    A.texte(g, "chargement en vrac", [155, 40], { taille: 18, gras: 800 });
    T.forEach(function (t, i) {
      var x = 50 + (i % 2) * 110, y = 90 + Math.floor(i / 2) * 190;
      A.tube(g, x + 20, y, { bouchon: t.b, w: 60, h: 130, couches: [{ h: 0.7, coul: C.sang }], etiquette: t.n, taille: 16, coulTexte: sel === i ? C.jeu : C.encre });
      A.cible(g, x, y - 10, 100, 190, function () { sel = i; dessiner(); });
    });
    A.boite(g, 340, 200, 170, 120, { fond: sel !== null ? C.jeuPale : "#fff", bord: C.encre, ep: 3, rx: 14, titre: "lecture", sous: "code-barres, bouchon", taille: 20 });
    A.boite(g, 600, 60, 300, 110, { fond: sel !== null && T[sel].dest === 0 ? C.okPale : "#fff", bord: C.encre, ep: 3, rx: 14, titre: "Hématologie", taille: 21 });
    A.boite(g, 600, 260, 300, 110, { fond: sel !== null && T[sel].dest === 1 ? C.accPale : "#fff", bord: C.encre, ep: 3, rx: 14, titre: "Centrifugeuse", sous: "puis Gel-Check, débouchage", taille: 21 });
    A.boite(g, 600, 420, 300, 90, { fond: "#fff", bord: C.trait, ep: 2.5, rx: 14, titre: "Biochimie, coagulation", taille: 19 });
    A.fleche(g, [750, 372], [750, 416], { coul: C.trait, ep: 4 });
    A.fleche(g, [285, 260], [336, 260], { coul: C.encre, ep: 4 });
    if (sel !== null) { var d = T[sel].dest; A.fleche(g, [512, 260], d ? [596, 315] : [596, 115], { coul: C.jeu, ep: 6 }); }
    zone.innerHTML = sel === null ? "Touche un tube du chargeur." : T[sel].d;
  }
  dessiner();
})();
