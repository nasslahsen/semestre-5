/* Figure : les sept étapes du circuit de l'échantillon, parcourues une à une. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-circuit", {
    largeur: 960, hauteur: 540, titre: "Les sept étapes du circuit de l'échantillon",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : chaque étape reçoit l'échantillon de la précédente ; aucune ne peut être sautée."
  });
  var g = A.s("g", null, f.svg);
  var E = [
    { t: "Prescription", i: "medecin", d: "Un professionnel de santé prescrit l'examen." },
    { t: "Prélèvement", i: "aiguille", d: "Sur le patient (laboratoire, domicile, hôpital). L'échantillon est identifié et étiqueté." },
    { t: "Transport", i: "camion", d: "Humain, pneumatique ou véhicule spécialisé, en respectant température et délai." },
    { t: "Réception et tri", i: "reception", d: "Vérification de la conformité, enregistrement, orientation vers le bon secteur." },
    { t: "Préparation", i: "centrifugeuse", d: "Centrifugation, aliquotage, décomplémentation si nécessaire." },
    { t: "Analyse", i: "automate", d: "Passage sur l'automate ou méthode manuelle." },
    { t: "Validation et rendu", i: "valider", d: "Validation biologique, interprétation, communication au prescripteur." }
  ];
  // deux rangées : 1 à 4 de gauche à droite, 5 à 7 de droite à gauche
  function pos(k) { return k < 4 ? [30 + k * 232, 60] : [30 + (6 - k) * 232 + 116, 300]; }
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    for (var i = 0; i < E.length; i++) {
      var p = pos(i), on = i === k - 1, fait = i < k - 1;
      if (i > 0) {
        var q = pos(i - 1);
        if (i === 4) A.chemin(g, [[q[0] + 100, q[1] + 180], [q[0] + 100, 264], [p[0] + 100, 264], [p[0] + 100, p[1] - 4]], { coul: i < k ? C.jeu : C.trait, ep: 5 });
        else if (i < 4) A.fleche(g, [q[0] + 202, q[1] + 90], [p[0] - 4, p[1] + 90], { coul: i < k ? C.jeu : C.trait, ep: 5 });
        else A.fleche(g, [q[0] - 2, q[1] + 90], [p[0] + 204, p[1] + 90], { coul: i < k ? C.jeu : C.trait, ep: 5 });
      }
      A.boite(g, p[0], p[1], 200, 180, { fond: on ? C.jeuPale : fait ? "#fff" : C.fond, bord: on ? C.jeu : fait ? C.encre : C.trait, ep: on ? 4 : 2.5, rx: 16 });
      A.icone(g, E[i].i, [p[0] + 100, p[1] + 66], 60, on ? C.jeu : fait ? C.encre : C.gris);
      A.texte(g, (i + 1) + ". " + E[i].t, [p[0] + 100, p[1] + 140], { taille: 19, gras: 800, largeur: 184, coul: on || fait ? C.encre : C.doux });
    }
    A.texte(g, "Patient", [70, 510], { taille: 18, coul: C.doux });
    A.texte(g, "Résultat chez le prescripteur", [860, 510], { taille: 18, coul: C.doux, largeur: 190 });
    zone.innerHTML = k ? "<strong>" + k + ". " + E[k - 1].t + "</strong> : " + E[k - 1].d : "Sept étapes, du patient au résultat.";
  }
  var e = R.etapes(f.reglages, 7, ["", "prescription", "prélèvement", "transport", "réception et tri", "préparation", "analyse", "validation et rendu"], dessiner);
  e.aller(0);
})();
