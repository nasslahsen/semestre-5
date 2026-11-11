/* Figure : Une introduction attrayante et la voix (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-debut", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Une introduction attrayante et la voix",
    essai: "<strong>Essaie</strong> : touche les conseils pour l'introduction, puis pour la voix. <strong>Observe</strong> : les premières secondes et la voix gardent le public attentif."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 64.0,
    "w": 289.3,
    "h": 102.5,
    "t": "Be in time",
    "texte": "Arriver à l'heure.",
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
    "texte": "Sourire et regarder le public.",
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
    "texte": "Commencer lentement, sans se précipiter.",
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
    "texte": "Une ouverture sincère, authentique.",
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
    "texte": "Avoir l'air organisé(e).",
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
    "texte": "Annoncer le ou les objectifs de la présentation.",
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
    "texte": "Une tenue soignée.",
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
    "texte": "Parler assez fort pour tout le monde, jusqu'au fond de la salle.",
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
    "texte": "Bien respirer : assez d'air pour finir ses phrases.",
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
    "texte": "Varier la vitesse, la hauteur (pitch) et le volume.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "speed, pitch, volume",
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   }
  ], { invite: "Touche une case du dessin.", fond: function (g) { A.texte(g, "Introduction", [168.7, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Introduction", [480.0, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Your voice", [791.3, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); } });
})();
