/* Figure : Hard skills and soft skills (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-soft-hard", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Hard skills and soft skills",
    essai: "<strong>Try</strong>: tap each box, left then right. <strong>Notice</strong>: hard skills can be taught and measured; soft skills are about EQ and have seven other names."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 64.0,
    "w": 445.0,
    "h": 141.3,
    "t": "Teachable abilities",
    "texte": "Hard skills can be taught: a course, a textbook, a training.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "can be taught",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 219.3,
    "w": 445.0,
    "h": 141.3,
    "t": "Easy to quantify",
    "texte": "You can measure them: a test, a mark, a certificate (programming in C, using MATLAB).",
    "taille": 25,
    "tailleSous": 17,
    "sous": "can be measured",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 374.7,
    "w": 445.0,
    "h": 141.3,
    "t": "Classroom, books, on the job",
    "texte": "“Can be learnt in the classroom, through books or other training materials, or on the job.”",
    "taille": 22,
    "tailleSous": 17,
    "sous": "where you learn them",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 491.0,
    "y": 64.0,
    "w": 445.0,
    "h": 141.3,
    "t": "EQ",
    "texte": "“The concept ‘soft skills’ is a sociological term referring to EQ, the Emotional intelligence quotient of a person.” Not IQ.",
    "taille": 44,
    "tailleSous": 17,
    "sous": "Emotional intelligence quotient",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 491.0,
    "y": 219.3,
    "w": 445.0,
    "h": 141.3,
    "t": "People, interpersonal skills",
    "texte": "Other names: people skills, interpersonal skills, transferable skills, life skills.",
    "taille": 22,
    "tailleSous": 17,
    "sous": "other names",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 491.0,
    "y": 374.7,
    "w": 445.0,
    "h": 141.3,
    "t": "Employable skills",
    "texte": "And also: employable skills, personality development skills, behavioral competencies.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "other names",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   }
  ], { invite: "Tap a box in the picture.", fond: function (g) { A.texte(g, "Hard skills", [246.5, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Soft skills", [713.5, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); } });
})();
