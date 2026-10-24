/* Figure : situations d'erreur pré-analytique rangées par origine, avec leur conséquence. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-erreurs", {
    largeur: 960, hauteur: 540, titre: "D'où vient l'erreur, et ce qu'elle fausse",
    essai: "<strong>Essaie</strong> : touche une situation. <strong>Observe</strong> : chaque erreur naît à une étape précise et fausse un résultat précis."
  });
  var g = A.s("g", null, f.svg), sel = null;
  var O = ["Identification", "Prélèvement", "Transport et conservation", "Centrifugation et préparation", "Environnement"];
  var S = [
    { t: "Étiquette pré-imprimée d'un autre patient", o: 0, c: "Confusion entre deux patients : le résultat est attribué à la mauvaise personne." },
    { t: "Tube citrate à moitié rempli", o: 1, c: "Rapport sang / anticoagulant incorrect : TP et TCA faussés." },
    { t: "Garrot laissé trois minutes", o: 1, c: "Stase veineuse : protéines, potassium et lactate augmentés." },
    { t: "Gaz du sang oublié une heure", o: 2, c: "Délai excessif : le gaz du sang est dégradé." },
    { t: "Tube de bilirubine au soleil", o: 2, c: "Exposition à la lumière : la bilirubine est dégradée." },
    { t: "Tube sec centrifugé quatre heures après", o: 3, c: "Délai avant centrifugation : le glucose est diminué par les cellules." },
    { t: "Centrifugeuse sur une paillasse qui vibre", o: 4, c: "Vibrations : centrifugations et analyses perturbées." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    O.forEach(function (o, i) {
      var y = 30 + i * 100, on = sel !== null && S[sel].o === i;
      A.boite(g, 600, y, 330, 80, { fond: on ? C.jeuPale : C.fond, bord: on ? C.jeu : C.trait, ep: on ? 4 : 2, rx: 14, titre: String.fromCharCode(65 + i) + ". " + o, taille: 21 });
    });
    S.forEach(function (s, i) {
      var y = 24 + i * 72, on = sel === i;
      A.boite(g, 30, y, 470, 60, { fond: on ? C.jeu : "#fff", bord: on ? C.jeu : C.encre, ep: 2.5, rx: 12, titre: s.t, taille: 21, coul: on ? "#fff" : C.encre });
      A.cible(g, 30, y, 470, 60, function () { sel = i; dessiner(); });
      if (on) A.relier(g, { x: 30, y: y, w: 470, h: 60 }, { x: 600, y: 30 + s.o * 100, w: 330, h: 80 }, { coul: C.jeu, ep: 4 });
    });
    zone.innerHTML = sel === null ? "Touche une situation à gauche pour voir son origine et sa conséquence." : "<strong>" + O[S[sel].o] + "</strong> : " + S[sel].c;
  }
  dessiner();
})();
