/* Figure : When Employees Give Something Extra: the plan of the text (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-td4", {
    largeur: 960, hauteur: 540, directCote: true, titre: "When Employees Give Something Extra: the plan of the text",
    essai: "<strong>Try</strong>: tap each paragraph. <strong>Notice</strong>: one question, three companies, one conclusion."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 24.0,
    "w": 445.0,
    "h": 112.5,
    "t": "§1 The question",
    "texte": "What makes employees happy and productive? American companies envy Japanese productivity.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 24.0,
    "y": 150.5,
    "w": 445.0,
    "h": 112.5,
    "t": "§2 Piggly-Wiggly",
    "texte": "A large corporation offers to buy the company; the owners turn it down.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "the offer",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 24.0,
    "y": 277.0,
    "w": 445.0,
    "h": 112.5,
    "t": "§3 Piggly-Wiggly",
    "texte": "Relieved employees raise $40,000, buy a truck and throw a party; never a layoff.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "the gift",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 24.0,
    "y": 403.5,
    "w": 445.0,
    "h": 112.5,
    "t": "§4 Delta Airlines",
    "texte": "A loss but an 8 % raise; no layoffs, workers shifted to other jobs; managers listen.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "the raise",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 491.0,
    "y": 24.0,
    "w": 445.0,
    "h": 154.7,
    "t": "§5 Delta Airlines",
    "texte": "An open-door policy; employees give “The Spirit of Delta” to the company.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "the plane",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 491.0,
    "y": 192.7,
    "w": 445.0,
    "h": 154.7,
    "t": "§6 Control Data",
    "texte": "Involvement teams like quality circles; counseling, day care, fitness, flexible schedules.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 491.0,
    "y": 361.3,
    "w": 445.0,
    "h": 154.7,
    "t": "§7 Conclusion",
    "texte": "Committed workers = a stable and productive work force; happy employees, successful businesses.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   }
  ], { invite: "Tap a box in the picture." });
})();
