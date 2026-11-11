/* Figure : An attractive introduction and your voice (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-presentation-debut", {
    largeur: 960, hauteur: 540, directCote: true, titre: "An attractive introduction and your voice",
    essai: "<strong>Try</strong>: tap the tips for the introduction, then for the voice. <strong>Notice</strong>: the first seconds and your voice keep the audience listening."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 64.0,
    "w": 289.3,
    "h": 102.5,
    "t": "Be in time",
    "texte": "Arrive on time.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 24.0,
    "y": 180.5,
    "w": 289.3,
    "h": 102.5,
    "t": "Smile, look at the audience",
    "texte": "Smile and look at the people in front of you.",
    "taille": 22,
    "tailleSous": 17,
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 24.0,
    "y": 297.0,
    "w": 289.3,
    "h": 102.5,
    "t": "Start slowly",
    "texte": "Start slowly, don't rush.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 24.0,
    "y": 413.5,
    "w": 289.3,
    "h": 102.5,
    "t": "Genuine opening",
    "texte": "A sincere, real opening.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 335.3,
    "y": 64.0,
    "w": 289.3,
    "h": 141.3,
    "t": "Look organized",
    "texte": "Look organised and ready.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 335.3,
    "y": 219.3,
    "w": 289.3,
    "h": 141.3,
    "t": "State the objective(s)",
    "texte": "Say what the presentation is for.",
    "taille": 22,
    "tailleSous": 17,
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 335.3,
    "y": 374.7,
    "w": 289.3,
    "h": 141.3,
    "t": "Dress nicely",
    "texte": "Neat, suitable clothes.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 646.7,
    "y": 64.0,
    "w": 289.3,
    "h": 141.3,
    "t": "Be heard",
    "texte": "Speak loudly enough for everyone, even at the back.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 646.7,
    "y": 219.3,
    "w": 289.3,
    "h": 141.3,
    "t": "Air intake",
    "texte": "Breathe well: enough air to finish your sentences.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 646.7,
    "y": 374.7,
    "w": 289.3,
    "h": 141.3,
    "t": "Vary your voice",
    "texte": "Change your speed, pitch (high or low) and volume.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "speed, pitch, volume",
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   }
  ], { invite: "Tap a box in the picture.", fond: function (g) { A.texte(g, "Introduction", [168.7, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Introduction", [480.0, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Your voice", [791.3, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); } });
})();
