/* Figure : les huit étapes de la vie d'un équipement, avec le document qui accompagne chacune. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-cycle-vie", {
    largeur: 960, hauteur: 540, titre: "Du besoin au décommissionnement",
    essai: "<strong>Essaie</strong> : avance d'étape en étape. <strong>Observe</strong> : l'équipement doit être adapté, puis installé, fonctionnel, performant et maintenu ; chaque étape laisse une trace."
  });
  var g = A.s("g", null, f.svg);
  var E = [
    { t: "Besoin (URS)", d: "On écrit ce que l'équipement doit faire : le cahier des charges utilisateur." },
    { t: "Sélection", d: "On choisit l'équipement adapté au besoin." },
    { t: "Installation", d: "On l'installe dans un environnement maîtrisé." },
    { t: "Qualification", d: "On vérifie qu'il est correctement installé." },
    { t: "Performances", d: "On vérifie qu'il est fonctionnel et performant : il mesure juste." },
    { t: "Mise en service", d: "Il entre dans la routine du laboratoire." },
    { t: "Maintenance, métrologie", d: "Il est maintenu : préventif, correctif, étalonnage, contrôle de qualité, historique des interventions." },
    { t: "Décommissionnement", d: "On le retire du service ; son dossier reste tracé." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    E.forEach(function (e, i) {
      var x = 30 + (i % 4) * 230, y = i < 4 ? 70 : 300, on = k === i + 1, vu = k >= i + 1;
      A.boite(g, x, y, 200, 130, { fond: on ? C.jeu : vu ? C.jeuPale : "#fff", bord: vu ? C.jeu : C.trait, ep: 3, rx: 16, titre: e.t, taille: 17, coul: on ? "#fff" : vu ? C.encre : C.gris });
      A.texte(g, String(i + 1), [x + 22, y + 24], { taille: 18, gras: 800, coul: on ? "#fff" : C.doux });
      if (i < 3) A.fleche(g, [x + 202, y + 65], [x + 228, y + 65], { coul: vu ? C.jeu : C.trait, ep: 4 });
      if (i > 4) A.fleche(g, [x - 28, y + 65], [x - 2, y + 65], { coul: k >= i + 1 ? C.jeu : C.trait, ep: 4 });
    });
    A.chemin(g, [[820, 202], [820, 250], [130, 250], [130, 298]], { coul: k >= 5 ? C.jeu : C.trait, ep: 4 });
    zone.innerHTML = k ? "<strong>" + E[k - 1].t + "</strong> : " + E[k - 1].d : "Avance pour suivre un équipement, du besoin à son retrait.";
  }
  var e = R.etapes(f.reglages, 8, ["", "besoin", "sélection", "installation", "qualification", "performances", "service", "maintenance", "retrait"], dessiner);
  e.aller(0);
})();
