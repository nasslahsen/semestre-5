/* Figure : Three types of interview questions (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-td1", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Three types of interview questions",
    essai: "<strong>Try</strong>: tap each type. <strong>Notice</strong>: the questions of the sheet that go with it (suggested answers)."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 24.0,
    "w": 912.0,
    "h": 154.7,
    "t": "a",
    "texte": "About yourself, your ambitions, your personality, your hobbies and interests. Sheet: 1, 4, 7, 9, 12.",
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
    "texte": "Prove you have researched the job and company. Sheet: 5, 6, 11. Model: Silvia (exercise b).",
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
    "texte": "Demonstrate you have the skills and experience required. Sheet: 2, 3, 8, 10. Model: Alejandro (exercise e).",
    "taille": 44,
    "tailleSous": 17,
    "sous": "skills, experience",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   }
  ], { invite: "Tap a box in the picture." });
})();
