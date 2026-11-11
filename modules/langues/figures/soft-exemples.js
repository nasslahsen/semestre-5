/* Figure : The seven soft skills employers look for in engineers (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-soft-exemples", {
    largeur: 960, hauteur: 540, directCote: true, titre: "The seven soft skills employers look for in engineers",
    essai: "<strong>Try</strong>: tap each soft skill. <strong>Notice</strong>: each one matches a real engineering situation (added examples)."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 24.0,
    "w": 445.0,
    "h": 112.5,
    "t": "Communication skills",
    "texte": "Explaining a technical result to a doctor or a client. Added example.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 24.0,
    "y": 150.5,
    "w": 445.0,
    "h": 112.5,
    "t": "Interpersonal skills",
    "texte": "Building good relationships with colleagues and clients. Added example.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 24.0,
    "y": 277.0,
    "w": 445.0,
    "h": 112.5,
    "t": "Problem solving skills",
    "texte": "Finding why a prototype stopped working, and fixing it. Added example.",
    "taille": 22,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 24.0,
    "y": 403.5,
    "w": 445.0,
    "h": 112.5,
    "t": "Teamwork abilities",
    "texte": "Working together on a final-year project. Added example.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 24.0,
    "w": 445.0,
    "h": 112.5,
    "t": "Leadership and management",
    "texte": "Organising a team's tasks, motivating, deciding. Added example.",
    "taille": 22,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 150.5,
    "w": 445.0,
    "h": 112.5,
    "t": "Analytical skills",
    "texte": "Reading measurements, comparing, drawing a conclusion. Added example.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 277.0,
    "w": 445.0,
    "h": 112.5,
    "t": "Flexibility",
    "texte": "Adapting when the project or the rules change. Added example.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 403.5,
    "w": 445.0,
    "h": 112.5,
    "t": "Peggy Klaus's list",
    "texte": "“Being self-aware, trustworthiness, conscientiousness, adaptability, critical thinking, attitude, initiative, empathy, confidence, integrity, self-control… and then some.”",
    "taille": 25,
    "tailleSous": 17,
    "sous": "and then some",
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   }
  ], { invite: "Tap a box in the picture." });
})();
