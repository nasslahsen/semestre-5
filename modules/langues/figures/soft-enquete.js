/* Figure : Les chiffres du cours (cases à toucher, ANG.explorer). */
(function () {
  "use strict";
  var R = RM, A = ANG, C = A.C;
  var f = R.figure("fig-chiffres", {
    largeur: 960, hauteur: 540, directCote: true, titre: "Les chiffres du cours",
    essai: "<strong>Essaie</strong> : touche chaque chiffre. <strong>Observe</strong> : toutes les données disent que les soft skills comptent plus que les hard skills pour l'emploi."
  });
  A.explorer(f, [
   {
    "x": 24.0,
    "y": 64.0,
    "w": 445.0,
    "h": 141.3,
    "t": "70 %",
    "texte": "70 % des étudiants qui ont suivi une formation aux soft skills pendant leurs études d'ingénieur ont trouvé de meilleurs emplois.",
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
    "texte": "96 % des personnes interrogées voient la communication et les interpersonal skills comme « the gateways to achieve career success ».",
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
    "texte": "Les hard skills ne comptent que pour 30 % du succès pour être embauché dans une multinationale.",
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
    "texte": "« 75 percent of long-term job success depends on people skills… »",
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
    "texte": "« …while only 25 percent on technical knowledge. »",
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
    "texte": "Bret Morrison : « Of all the life skills available to us, communication is perhaps the most empowering. » Jim Rohn : pratique ta communication à chaque occasion.",
    "taille": 25,
    "tailleSous": 17,
    "sous": "Morrison, Rohn",
    "coul": C.v,
    "pale": C.vPale,
    "bord": C.v
   }
  ], { invite: "Touche une case du dessin.", fond: function (g) { A.texte(g, "Enqu\u00eate en Inde", [246.5, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); A.texte(g, "Conclusion", [713.5, 34], { taille: 21, gras: 800, coul: C.jeuTexte, halo: false }); } });
})();
