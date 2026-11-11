/* Figure : Trois types de questions d'entretien (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-td1", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Trois types de questions d'entretien",
    essai: "<strong>Essaie</strong> : touche chaque type. <strong>Observe</strong> : les questions de la fiche qui vont avec (correction proposée)."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 24.0,
    "w": 912.0,
    "h": 154.7,
    "t": "a",
    "texte": "About yourself, your ambitions, your personality, your hobbies and interests. Fiche : 1, 4, 7, 9, 12.",
    "taille": 44,
    "tailleSous": 17,
    "sous": "yourself",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 192.7,
    "w": 912.0,
    "h": 154.7,
    "t": "b",
    "texte": "Prove you have researched the job and company. Fiche : 5, 6, 11. Modèle : Silvia (exercice b).",
    "taille": 44,
    "tailleSous": 17,
    "sous": "research",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 361.3,
    "w": 912.0,
    "h": 154.7,
    "t": "c",
    "texte": "Demonstrate you have the skills and experience required. Fiche : 2, 3, 8, 10. Modèle : Alejandro (exercice e).",
    "taille": 44,
    "tailleSous": 17,
    "sous": "skills, experience",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   }
  ], { invite: "Touche une case du dessin." });
})();
