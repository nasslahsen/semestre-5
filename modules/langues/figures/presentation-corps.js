/* Figure : Body language, visual aids, final tips (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-presentation-corps", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Body language, visual aids, final tips",
    essai: "<strong>Try</strong>: tap the boxes in the three columns. <strong>Notice</strong>: your body, your slides and your timing speak as much as your words."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 64.0,
    "w": 289.3,
    "h": 102.5,
    "t": "Smile",
    "texte": "1. Smile.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 180.5,
    "w": 289.3,
    "h": 102.5,
    "t": "Eye contact",
    "texte": "2. Maintain eye contact.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 297.0,
    "w": 289.3,
    "h": 102.5,
    "t": "Natural gestures",
    "texte": "3. Smooth and natural gestures.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 413.5,
    "w": 289.3,
    "h": 102.5,
    "t": "Hands, shoulders",
    "texte": "4. Keep your hands out of your pockets. 5. Keep your shoulders straight.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 335.3,
    "y": 64.0,
    "w": 289.3,
    "h": 141.3,
    "t": "Simple, minimize",
    "texte": "Keep them simple. Minimize.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 335.3,
    "y": 219.3,
    "w": 289.3,
    "h": 141.3,
    "t": "Large fonts, colors",
    "texte": "Use large fonts. Use colors.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 335.3,
    "y": 374.7,
    "w": 289.3,
    "h": 141.3,
    "t": "Technology",
    "texte": "Avoid complete dependence on technology: be able to present without a projector.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 646.7,
    "y": 64.0,
    "w": 289.3,
    "h": 102.5,
    "t": "Prepare, know your topic",
    "texte": "Prepare well and know your topic.",
    "taille": 22,
    "tailleSous": 17,
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 646.7,
    "y": 180.5,
    "w": 289.3,
    "h": 102.5,
    "t": "Humor, no lecture",
    "texte": "Use humor. Don't lecture. Get enthusiastic.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 646.7,
    "y": 297.0,
    "w": 289.3,
    "h": 102.5,
    "t": "Questions",
    "texte": "Keep time for questions.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 646.7,
    "y": 413.5,
    "w": 289.3,
    "h": 102.5,
    "t": "Short, focused, relevant",
    "texte": "Keep it short. Keep it focused. Keep it relevant.",
    "taille": 22,
    "tailleSous": 17,
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   }
  ], { invite: "Tap a box in the picture.", fond: function (g) { A.texte(g, "Body language", [168.7, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Visual aids", [480.0, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Final tips", [791.3, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); } });
})();
