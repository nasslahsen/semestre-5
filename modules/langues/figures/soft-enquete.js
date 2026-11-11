/* Figure : The figures in the course (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-soft-enquete", {
    largeur: 960, hauteur: 540, directCote: true, titre: "The figures in the course",
    essai: "<strong>Try</strong>: tap each figure. <strong>Notice</strong>: all the data say soft skills count more than hard skills for employment."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 64.0,
    "w": 445.0,
    "h": 141.3,
    "t": "70 %",
    "texte": "70 % of the students who had soft-skills training while studying engineering found better employment opportunities.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "survey in India",
    "coul": C.brun,
    "pale": C.brunPale,
    "bord": C.brun
   },
   {
    "x": 24.0,
    "y": 219.3,
    "w": 445.0,
    "h": 141.3,
    "t": "96 %",
    "texte": "96 % of respondents said communication and interpersonal skills are “the gateways to achieve career success”.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "survey in India",
    "coul": C.brun,
    "pale": C.brunPale,
    "bord": C.brun
   },
   {
    "x": 24.0,
    "y": 374.7,
    "w": 445.0,
    "h": 141.3,
    "t": "30 %",
    "texte": "Hard skills contributed to only 30 % of success in getting employment in multi-national companies.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "survey in India",
    "coul": C.brun,
    "pale": C.brunPale,
    "bord": C.brun
   },
   {
    "x": 491.0,
    "y": 64.0,
    "w": 445.0,
    "h": 141.3,
    "t": "75 %",
    "texte": "“75 percent of long-term job success depends on people skills…”",
    "taille": 25,
    "tailleSous": 17,
    "sous": "Peggy Klaus",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 491.0,
    "y": 219.3,
    "w": 445.0,
    "h": 141.3,
    "t": "25 %",
    "texte": "“…while only 25 percent on technical knowledge.”",
    "taille": 25,
    "tailleSous": 17,
    "sous": "Peggy Klaus",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 491.0,
    "y": 374.7,
    "w": 445.0,
    "h": 141.3,
    "t": "Communication",
    "texte": "Bret Morrison: “Of all the life skills available to us, communication is perhaps the most empowering.” Jim Rohn: practise your communication skills at every opportunity.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "Morrison, Rohn",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   }
  ], { invite: "Tap a box in the picture.", fond: function (g) { A.texte(g, "Survey in India", [246.5, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Conclusion", [713.5, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); } });
})();
