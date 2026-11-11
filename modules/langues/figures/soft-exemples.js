/* Figure : Les sept soft skills recherchées chez un ingénieur (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-sept", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Les sept soft skills recherchées chez un ingénieur",
    essai: "<strong>Essaie</strong> : touche chaque soft skill. <strong>Observe</strong> : à chacune correspond une situation d'ingénieur (exemples ajoutés)."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 24.0,
    "w": 445.0,
    "h": 112.5,
    "t": "Communication skills",
    "texte": "Expliquer un résultat technique à un médecin ou à un client. Exemple ajouté.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 24.0,
    "y": 150.5,
    "w": 445.0,
    "h": 112.5,
    "t": "Interpersonal skills",
    "texte": "Créer de bonnes relations avec ses collègues et ses clients. Exemple ajouté.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 24.0,
    "y": 277.0,
    "w": 445.0,
    "h": 112.5,
    "t": "Problem solving skills",
    "texte": "Trouver pourquoi un prototype ne marche plus, et le réparer. Exemple ajouté.",
    "taille": 22,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 24.0,
    "y": 403.5,
    "w": 445.0,
    "h": 112.5,
    "t": "Teamwork abilities",
    "texte": "Travailler à plusieurs sur un projet de fin d'études. Exemple ajouté.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 24.0,
    "w": 445.0,
    "h": 112.5,
    "t": "Leadership and management",
    "texte": "Organiser les tâches d'une équipe, motiver, décider. Exemple ajouté.",
    "taille": 22,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 150.5,
    "w": 445.0,
    "h": 112.5,
    "t": "Analytical skills",
    "texte": "Lire des mesures, comparer, tirer une conclusion. Exemple ajouté.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 277.0,
    "w": 445.0,
    "h": 112.5,
    "t": "Flexibility",
    "texte": "S'adapter quand le projet ou les règles changent. Exemple ajouté.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 403.5,
    "w": 445.0,
    "h": 112.5,
    "t": "Peggy Klaus's list",
    "texte": "« Being self-aware, trustworthiness, conscientiousness, adaptability, critical thinking, attitude, initiative, empathy, confidence, integrity, self-control… and then some. »",
    "taille": 25,
    "tailleSous": 17,
    "sous": "and then some",
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   }
  ], { invite: "Touche une case du dessin." });
})();
