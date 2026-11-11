/* Figure : OPEN UP and the four objectives (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-presentation-openup", {
    largeur: 960, hauteur: 540, directCote: true, titre: "OPEN UP and the four objectives",
    essai: "<strong>Try</strong>: tap each letter of OPEN UP, then the objectives. <strong>Notice</strong>: six qualities of an exceptional presenter, four reasons to present."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 64.0,
    "w": 289.3,
    "h": 141.3,
    "t": "O",
    "texte": "Organized: a clear plan, a well-organised talk.",
    "taille": 44,
    "tailleSous": 17,
    "sous": "Organized",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 219.3,
    "w": 289.3,
    "h": 141.3,
    "t": "P",
    "texte": "Passionate: love your topic and show it.",
    "taille": 44,
    "tailleSous": 17,
    "sous": "Passionate",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 374.7,
    "w": 289.3,
    "h": 141.3,
    "t": "E",
    "texte": "Engaging: catch and involve the audience.",
    "taille": 44,
    "tailleSous": 17,
    "sous": "Engaging",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 335.3,
    "y": 64.0,
    "w": 289.3,
    "h": 141.3,
    "t": "N",
    "texte": "Natural: stay yourself.",
    "taille": 44,
    "tailleSous": 17,
    "sous": "Natural",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 335.3,
    "y": 219.3,
    "w": 289.3,
    "h": 141.3,
    "t": "U",
    "texte": "Understand your audience: know who you are talking to (doctors, patients, a jury…).",
    "taille": 44,
    "tailleSous": 17,
    "sous": "Understand your audience",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 335.3,
    "y": 374.7,
    "w": 289.3,
    "h": 141.3,
    "t": "P",
    "texte": "Practice: rehearse before.",
    "taille": 44,
    "tailleSous": 17,
    "sous": "Practice",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 646.7,
    "y": 64.0,
    "w": 289.3,
    "h": 102.5,
    "t": "To inform",
    "texte": "Give information (a protocol, a result).",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 646.7,
    "y": 180.5,
    "w": 289.3,
    "h": 102.5,
    "t": "To entertain",
    "texte": "Amuse the audience (a story, some humour).",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 646.7,
    "y": 297.0,
    "w": 289.3,
    "h": 102.5,
    "t": "To touch emotions",
    "texte": "Move the audience (a personal story).",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 646.7,
    "y": 413.5,
    "w": 289.3,
    "h": 102.5,
    "t": "Move to action",
    "texte": "Make people act (sign up, give, sign).",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   }
  ], { invite: "Tap a box in the picture.", fond: function (g) { A.texte(g, "OPEN", [168.7, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "UP", [480.0, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Objectives", [791.3, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); } });
})();
