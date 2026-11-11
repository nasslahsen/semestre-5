/* Figure : Five types of interview (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-entretien-types", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Five types of interview",
    essai: "<strong>Try</strong>: tap each type of interview. <strong>Notice</strong>: who is in front of you, and what is being tested."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 24.0,
    "w": 445.0,
    "h": 154.7,
    "t": "Screening",
    "texte": "Usually someone in human resources. Checks if you meet the minimum qualifications for the job.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "1 HR person, phone or in person",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 192.7,
    "w": 445.0,
    "h": 154.7,
    "t": "Selection",
    "texte": "The employer needs to know if you have the personality to “fit in”. The step which makes people the most anxious.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "you are qualified",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 361.3,
    "w": 445.0,
    "h": 154.7,
    "t": "Group",
    "texte": "Several job candidates at once. Separate the leaders from the followers; find out if you are a “team player”.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "several candidates",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 491.0,
    "y": 24.0,
    "w": 445.0,
    "h": 239.0,
    "t": "Panel",
    "texte": "Several individuals interview you at once. Remain calm, build rapport with each member, keep eye contact with each one.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "several interviewers",
    "coul": C.brun,
    "pale": C.brunPale,
    "bord": C.brun
   },
   {
    "x": 491.0,
    "y": 277.0,
    "w": 445.0,
    "h": 239.0,
    "t": "Stress",
    "texte": "Questions so fast you can't answer each one; weird questions, to see how you answer. Weeds out those who cannot handle adversity.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "pressure on purpose",
    "coul": C.brun,
    "pale": C.brunPale,
    "bord": C.brun
   }
  ], { invite: "Tap a box in the picture." });
})();
