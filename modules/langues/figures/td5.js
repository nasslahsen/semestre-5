/* Figure : Little, a little, few, a few; make or do (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-td5", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Little, a little, few, a few; make or do",
    essai: "<strong>Try</strong>: tap each box. <strong>Notice</strong>: the noun (countable or not) and the meaning (negative or positive) decide; make produces, do performs."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 64.0,
    "w": 289.3,
    "h": 219.0,
    "t": "little",
    "texte": "Not enough, almost none: We have little time left.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "uncountable, negative",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 297.0,
    "w": 289.3,
    "h": 219.0,
    "t": "a little",
    "texte": "Some: Would you like a little water?",
    "taille": 25,
    "tailleSous": 17,
    "sous": "uncountable, positive",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 335.3,
    "y": 64.0,
    "w": 289.3,
    "h": 219.0,
    "t": "few",
    "texte": "Not many, almost none: I have very few friends.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "countable, negative",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 335.3,
    "y": 297.0,
    "w": 289.3,
    "h": 219.0,
    "t": "a few",
    "texte": "Some, several: We stayed for a few days.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "countable, positive",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 646.7,
    "y": 64.0,
    "w": 289.3,
    "h": 219.0,
    "t": "make",
    "texte": "Make a decision, a mistake, money, a phone call, a speech; make sure, make fun of. Also: make your bed, make a mess.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "create, produce",
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 646.7,
    "y": 297.0,
    "w": 289.3,
    "h": 219.0,
    "t": "do",
    "texte": "Do homework, the dishes, business, your best, a favour; What do you do? How do you do?",
    "taille": 44,
    "tailleSous": 17,
    "sous": "activity, task",
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   }
  ], { invite: "Tap a box in the picture.", fond: function (g) { A.texte(g, "Uncountable", [168.7, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Countable", [480.0, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Make or do", [791.3, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); } });
})();
