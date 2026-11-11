/* Figure : Six techniques de préparation (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-preparation", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Six techniques de préparation",
    essai: "<strong>Essaie</strong> : touche chaque technique, dans l'ordre. <strong>Observe</strong> : on part de soi, puis l'entreprise et le poste, puis ses connaissances, puis ses papiers."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 24.0,
    "w": 289.3,
    "h": 239.0,
    "t": "1. Self analysis",
    "texte": "Identify your achievements and accomplishments, your career goals, your interests.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "you",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 24.0,
    "y": 277.0,
    "w": 289.3,
    "h": 239.0,
    "t": "2. Analyse your skills",
    "texte": "What makes you suitable for the position? What are your strengths?",
    "taille": 22,
    "tailleSous": 17,
    "sous": "you",
    "coul": C.acc,
    "pale": C.accPale,
    "bord": C.acc
   },
   {
    "x": 335.3,
    "y": 24.0,
    "w": 289.3,
    "h": 239.0,
    "t": "3. Research the organization",
    "texte": "Its activities, major areas of operation, recent developments, factors making it successful.",
    "taille": 22,
    "tailleSous": 17,
    "sous": "the company",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 335.3,
    "y": 277.0,
    "w": 289.3,
    "h": 239.0,
    "t": "4. Job analysis",
    "texte": "The duties and responsibilities, the skills and abilities needed, chances of career advancement.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "the post",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   },
   {
    "x": 646.7,
    "y": 24.0,
    "w": 289.3,
    "h": 239.0,
    "t": "5. Revise your subject knowledge",
    "texte": "Hard skills (technical expertise), general awareness (national and international issues), recent developments.",
    "taille": 22,
    "tailleSous": 17,
    "sous": "what you know",
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 646.7,
    "y": 277.0,
    "w": 289.3,
    "h": 239.0,
    "t": "6. Develop the interview file",
    "texte": "Original degrees and certificates, experience certificates, copies of your CV, any papers that might be needed.",
    "taille": 22,
    "tailleSous": 17,
    "sous": "your papers",
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   }
  ], { invite: "Touche une case du dessin." });
})();
