/* Figure : OPEN UP et les quatre objectifs (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-openup", {
    largeur: 960, hauteur: 540, directCote: true, titre: "OPEN UP et les quatre objectifs",
    essai: "<strong>Essaie</strong> : touche chaque lettre de OPEN UP, puis les objectifs. <strong>Observe</strong> : six qualités d'un présentateur exceptionnel, quatre raisons de présenter."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 64.0,
    "w": 289.3,
    "h": 141.3,
    "t": "O",
    "texte": "Organized : un plan clair, une présentation organisée.",
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
    "texte": "Passionate : aimer son sujet, le montrer.",
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
    "texte": "Engaging : capter le public, l'impliquer.",
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
    "texte": "Natural : rester soi-même.",
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
    "texte": "Understand your audience : savoir à qui on parle (médecins, patients, jury…).",
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
    "texte": "Practice : s'entraîner avant.",
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
    "texte": "Transmettre une information (un protocole, un résultat).",
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
    "texte": "Divertir (une anecdote, de l'humour).",
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
    "texte": "Émouvoir (un témoignage).",
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
    "texte": "Faire agir (s'inscrire, donner, signer).",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   }
  ], { invite: "Touche une case du dessin.", fond: function (g) { A.texte(g, "OPEN", [168.7, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "UP", [480.0, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Objectives", [791.3, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); } });
})();
