/* Figure : les trois phases sur une ligne de temps, et les points de risque de chacune. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-phases", {
    largeur: 960, hauteur: 540, titre: "Les trois phases et leurs points de risque",
    essai: "<strong>Essaie</strong> : touche une phase. <strong>Observe</strong> : l'analyseur n'est qu'au milieu ; la première phase concentre la majorité des erreurs."
  });
  var g = A.s("g", null, f.svg), sel = null;
  var P = [
    { t: "Pré-analytique", de: "prescription", a: "arrivée à l'analyseur", x: 20, w: 300, risques: ["Identification", "Prélèvement", "Transport", "Température", "Préparation", "Critères de rejet"], txt: "De la prescription à l'arrivée de l'échantillon à l'analyseur : prélèvement, éléments cliniques, préparation, transport, conservation. Phase critique, celle de la majorité des erreurs." },
    { t: "Analytique", de: "arrivée à l'analyseur", a: "résultat brut", x: 330, w: 300, risques: ["Analyseur", "Réactifs", "Calibration", "CQI", "Maintenance", "Environnement"], txt: "Le processus technique qui donne le résultat : la mesure par une méthode spécifique." },
    { t: "Post-analytique", de: "résultat brut", a: "communication", x: 640, w: 300, risques: ["Validation", "Autovérification", "Résultats critiques", "LIS", "Traçabilité"], txt: "Du résultat brut à sa communication : validation biologique, interprétation, communication au prescripteur et au patient." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    A.fleche(g, [20, 50], [935, 50], { coul: C.gris, ep: 4 });
    A.texte(g, "prescription", [70, 26], { taille: 17, coul: C.doux, gras: 500 });
    A.texte(g, "résultat communiqué", [860, 26], { taille: 17, coul: C.doux, gras: 500 });
    P.forEach(function (p, i) {
      var on = sel === i;
      A.boite(g, p.x, 76, p.w, 70, { fond: on ? C.jeu : i === 0 ? C.jeuPale : "#fff", bord: on || i === 0 ? C.jeu : C.encre, ep: on ? 4 : 2.5, rx: 14, titre: p.t, taille: 21, coul: on ? "#fff" : C.encre });
      p.risques.forEach(function (r, k) {
        A.boite(g, p.x + 20, 170 + k * 58, p.w - 40, 46, { fond: on ? C.jeuPale : C.fond, bord: on ? C.jeu : C.trait, ep: 2, rx: 10, titre: r, taille: 17, gras: 600 });
      });
      A.cible(g, p.x, 76, p.w, 460, function () { sel = i; dessiner(); });
    });
    zone.innerHTML = sel === null ? "Touche une phase pour lire sa définition. En dessous : ses points de risque, vus par l'ingénieur biomédical." : "<strong>" + P[sel].t + "</strong> : " + P[sel].txt;
  }
  dessiner();
})();
