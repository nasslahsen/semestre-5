/* Figure : The Skills of the Future : le plan du texte (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-td2", {
    largeur: 960, hauteur: 540, directCote: true, titre: "The Skills of the Future : le plan du texte",
    essai: "<strong>Essaie</strong> : touche chaque paragraphe. <strong>Observe</strong> : une idée par paragraphe : c'est là que tu cherches la réponse à chaque question."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 24.0,
    "w": 445.0,
    "h": 112.5,
    "t": "§1 A changing world",
    "texte": "AI, automation, biotechnology and digital communication change work ; success depends on knowing and adapting.",
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
    "t": "§2 Critical thinking",
    "texte": "Distinguish reliable information from misleading claims ; question assumptions, examine evidence.",
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
    "t": "§3 Creativity",
    "texte": "Machines do repetitive tasks ; humans imagine original ideas. Not limited to art.",
    "taille": 25,
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
    "t": "§4 Communication",
    "texte": "Diverse workplaces ; listen, negotiate, work in teams ; digital communication can cause misunderstandings.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "and collaboration",
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 24.0,
    "w": 445.0,
    "h": 154.7,
    "t": "§5 Adaptability",
    "texte": "Skills become obsolete ; learn new technologies ; a mindset of lifelong learning.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 192.7,
    "w": 445.0,
    "h": 154.7,
    "t": "§6 Emotional intelligence",
    "texte": "Understand emotions, manage stress, show empathy ; human qualities more valuable as work is automated.",
    "taille": 22,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   },
   {
    "x": 491.0,
    "y": 361.3,
    "w": 445.0,
    "h": 154.7,
    "t": "§7 Conclusion",
    "texte": "A combination of intellectual, social, emotional and technological capacities ; everyone has a role in continuous learning.",
    "taille": 25,
    "tailleSous": 17,
    "coul": C.turq,
    "pale": C.turqPale,
    "bord": C.turq
   }
  ], { invite: "Touche une case du dessin." });
})();
