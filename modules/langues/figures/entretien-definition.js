/* Figure : Un entretien d'embauche et ce dont dépend sa réussite (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-definition", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Un entretien d'embauche et ce dont dépend sa réussite",
    essai: "<strong>Essaie</strong> : touche les définitions, puis les trois piliers. <strong>Observe</strong> : l'entretien est un outil de sélection ; la réussite tient aux hard skills, aux soft skills et à la préparation."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 64.0,
    "w": 445.0,
    "h": 102.5,
    "t": "A formal conversation",
    "texte": "« A formal conversation which occurs between a potential employer and a job applicant. »",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 180.5,
    "w": 445.0,
    "h": 102.5,
    "t": "A selection process",
    "texte": "« Used by organizations to help determine whether a job candidate has the necessary knowledge, skills, and abilities to do the job. »",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 297.0,
    "w": 445.0,
    "h": 102.5,
    "t": "Gathering relevant data",
    "texte": "« A complex means of gathering relevant data about a candidate for a particular job position. »",
    "taille": 22,
    "tailleSous": 17,
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 413.5,
    "w": 445.0,
    "h": 102.5,
    "t": "Professional evaluation",
    "texte": "« A mechanism for professional evaluation for employment. »",
    "taille": 22,
    "tailleSous": 17,
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 491.0,
    "y": 64.0,
    "w": 445.0,
    "h": 141.3,
    "t": "Hard skills",
    "texte": "Tes connaissances techniques.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "knowledge",
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 491.0,
    "y": 219.3,
    "w": 445.0,
    "h": 141.3,
    "t": "Soft skills",
    "texte": "Good speaking skills, self confidence, a good use of non-verbal communication…",
    "taille": 25,
    "tailleSous": 17,
    "sous": "speaking, confidence",
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   },
   {
    "x": 491.0,
    "y": 374.7,
    "w": 445.0,
    "h": 141.3,
    "t": "Thorough preparation",
    "texte": "La préparation détaillée : sujet de la section suivante.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "six techniques",
    "coul": C.ok,
    "pale": C.okPale,
    "bord": C.ok
   }
  ], { invite: "Touche une case du dessin.", fond: function (g) { A.texte(g, "A job interview is\u2026", [246.5, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Success depends on", [713.5, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); } });
})();
