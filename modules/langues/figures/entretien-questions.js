/* Figure : Typical questions and bad impressions (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-entretien-questions", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Typical questions and bad impressions",
    essai: "<strong>Try</strong>: tap the families of questions, then the causes of a bad impression. <strong>Notice</strong>: each cause is the opposite of a preparation tip."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 64.0,
    "w": 445.0,
    "h": 141.3,
    "t": "About you",
    "texte": "Tell me about yourself. Why did you choose that particular degree programme? What would you consider your major achievements to date?",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 24.0,
    "y": 219.3,
    "w": 445.0,
    "h": 141.3,
    "t": "About the job",
    "texte": "What interests you about this job? What do you know about this organisation? What experience is relevant to this post? How do you see your career developing (5 years)?",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 24.0,
    "y": 374.7,
    "w": 445.0,
    "h": 141.3,
    "t": "General knowledge",
    "texte": "Only the title is on the slide: the news and your field. Hence “revise your subject knowledge”.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 64.0,
    "w": 445.0,
    "h": 102.5,
    "t": "Appearance, attitude",
    "texte": "Poor personal appearance; negative attitude.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.ko,
    "pale": C.koPale,
    "bord": C.ko
   },
   {
    "x": 491.0,
    "y": 180.5,
    "w": 445.0,
    "h": 102.5,
    "t": "Interest, preparation",
    "texte": "Lack of interest and enthusiasm; lack of preparation.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.ko,
    "pale": C.koPale,
    "bord": C.ko
   },
   {
    "x": 491.0,
    "y": 297.0,
    "w": 445.0,
    "h": 102.5,
    "t": "Role, examples",
    "texte": "Poor knowledge of the expected role; failure to give concrete examples of skills.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.ko,
    "pale": C.koPale,
    "bord": C.ko
   },
   {
    "x": 491.0,
    "y": 413.5,
    "w": 445.0,
    "h": 102.5,
    "t": "Money first",
    "texte": "Over emphasis on money/rewards.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.ko,
    "pale": C.koPale,
    "bord": C.ko
   }
  ], { invite: "Tap a box in the picture.", fond: function (g) { A.texte(g, "Typical questions", [246.5, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Bad impression", [713.5, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); } });
})();
