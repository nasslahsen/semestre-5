/* Figure : le cycle de compression d'un réfrigérateur, élément par élément. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-froid", {
    largeur: 960, hauteur: 540, titre: "Le cycle de compression : évaporateur, compresseur, condenseur, détendeur",
    essai: "<strong>Essaie</strong> : avance d'élément en élément. <strong>Observe</strong> : la chaleur entre par l'évaporateur, dans l'enceinte, et sort par le condenseur, dans la pièce."
  });
  var g = A.s("g", null, f.svg);
  // positions : évaporateur (dans l'enceinte, à gauche), compresseur (bas), condenseur (droite, dehors), détendeur (haut)
  var E = [
    { t: "Évaporateur", x: 70, y: 200, w: 200, h: 140, d: "Le réfrigérant entre liquide, absorbe la chaleur de l'enceinte à pression constante et devient vapeur." },
    { t: "Compresseur", x: 380, y: 400, w: 200, h: 110, d: "Il aspire la vapeur à basse pression et la comprime (compression adiabatique) jusqu'à la haute pression." },
    { t: "Condenseur", x: 690, y: 200, w: 200, h: 140, d: "Plus chaud que la pièce, le réfrigérant lui cède sa chaleur à pression constante et redevient liquide." },
    { t: "Détendeur", x: 380, y: 30, w: 200, h: 110, d: "Il freine le passage du réfrigérant : la pression chute fortement avant le retour à l'évaporateur." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    A.s("rect", { x: 30, y: 150, width: 290, height: 240, rx: 20, fill: C.froidPale, stroke: C.froid, "stroke-width": 3, "stroke-dasharray": "10 7" }, g);
    A.texte(g, "enceinte (froide)", [248, 372], { taille: 18, coul: C.froid, gras: 700 });
    A.texte(g, "pièce", [880, 470], { taille: 18, coul: C.chaud, gras: 700 });
    // tuyaux du circuit, HP en orange (compresseur → condenseur → détendeur), BP en bleu (détendeur → évaporateur → compresseur)
    var hp = C.chaud, bp = C.froid;
    A.chemin(g, [[580, 455], [790, 455], [790, 344]], { coul: hp, ep: 6 });
    A.chemin(g, [[790, 196], [790, 85], [584, 85]], { coul: hp, ep: 6 });
    A.chemin(g, [[380, 85], [170, 85], [170, 196]], { coul: bp, ep: 6 });
    A.chemin(g, [[170, 344], [170, 455], [376, 455]], { coul: bp, ep: 6 });
    A.texte(g, "HP", [835, 130], { taille: 22, gras: 800, coul: hp });
    A.texte(g, "BP", [118, 470], { taille: 22, gras: 800, coul: bp });
    E.forEach(function (e, i) {
      var on = k === i + 1;
      A.boite(g, e.x, e.y, e.w, e.h, { fond: on ? C.jeuPale : "#fff", bord: on ? C.jeu : C.encre, ep: on ? 4.5 : 2.5, rx: 14, titre: e.t, taille: 21 });
    });
    if (k === 1) { [0, 1, 2].forEach(function (i) { A.fleche(g, [60 + i * 100, 165], [100 + i * 70, 205], { coul: C.chaud, ep: 3 }); }); A.texte(g, "chaleur absorbée", [175, 180], { taille: 16, coul: C.chaud, gras: 700 }); }
    if (k === 3) { [0, 1, 2].forEach(function (i) { A.fleche(g, [895, 220 + i * 45], [945, 220 + i * 45], { coul: C.chaud, ep: 3 }); }); A.texte(g, "chaleur cédée", [880, 180], { taille: 16, coul: C.chaud, gras: 700 }); }
    zone.innerHTML = k ? "<strong>" + E[k - 1].t + "</strong> : " + E[k - 1].d : "En orange, la haute pression ; en bleu, la basse pression. Avance pour suivre le réfrigérant.";
  }
  var e = R.etapes(f.reglages, 4, ["", "évaporateur", "compresseur", "condenseur", "détendeur"], dessiner);
  e.aller(0);
})();
