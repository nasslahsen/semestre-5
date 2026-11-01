/* Niveau : révision du chapitre « Modèle inverse et cinématique ». Situations nouvelles. */
(function () {
  // Bras 2R plan en cm (L1, L2), repères DH en option, lésion en option.
  function bras2R(fig, o) {
    var C = D.C, pl = D.plan(fig.svg, o.O || [100, 505], o.u || 6.4);
    var n = { t1: o.t1, t2: o.t2, L1: o.L1, L2: o.L2, cible: o.cible || null, reperes: !!o.reperes };
    n.M = function () { var a = n.t1 * D.DEG, c = (n.t1 + n.t2) * D.DEG; return [n.L1 * Math.cos(a) + n.L2 * Math.cos(c), n.L1 * Math.sin(a) + n.L2 * Math.sin(c)]; };
    n.dessin = function () {
      pl.vider(); pl.grille({ pas: 10, fort: 50 });
      pl.axes({ lx: o.lx || [-12, 86], ly: o.ly || [-8, 76] });
      (o.ticks || [10, 20, 30, 40, 50, 60, 70]).forEach(function (k) { D.texte(pl.fond, String(k), pl.P([k, -4]), { coul: C.gris, taille: 13, gras: false, mono: true }); if (o.yticks !== false && k > 0) D.texte(pl.fond, String(k), pl.P([-5, k]), { coul: C.gris, taille: 13, gras: false, mono: true }); });
      if (n.cible) { var q = pl.P(n.cible), Mq = n.M(); D.rond(pl.fond, q, 16, { fill: "rgba(229,72,77,.12)", stroke: C.ko, ep: 2.5, tirets: "5 5" }); if (Math.hypot(Mq[0] - n.cible[0], Mq[1] - n.cible[1]) > 6) D.texte(pl.fond, "lésion", [q[0] + 22, q[1] - 18], { coul: C.ko, taille: 16, ancre: "start" }); }
      var a = n.t1 * D.DEG, c = (n.t1 + n.t2) * D.DEG, A = [n.L1 * Math.cos(a), n.L1 * Math.sin(a)], M = n.M();
      D.ligne(pl.fig, pl.P([0, 0]), pl.P(A), "#e2a33a", 14);
      D.ligne(pl.fig, pl.P(A), pl.P(M), "#9fb3c8", 12);
      pl.arc(pl.fig, [0, 0], 50, 0, n.t1, C.jeu, "θ₁");
      D.ligne(pl.fig, pl.P(A), pl.P([A[0] + 14 * Math.cos(a), A[1] + 14 * Math.sin(a)]), C.gris, 2, "4 4");
      pl.arc(pl.fig, A, 42, n.t1, n.t1 + n.t2, C.jeu, "θ₂");
      if (n.reperes) {
        pl.vec(pl.haut, A, [A[0] + 13 * Math.cos(a), A[1] + 13 * Math.sin(a)], C.x, 3, "x₁");
        pl.vec(pl.haut, M, [M[0] + 13 * Math.cos(c), M[1] + 13 * Math.sin(c)], C.x, 3, "x₂");
      }
      D.rond(pl.haut, pl.P([0, 0]), 10, { fill: "#fff", stroke: C.encre, ep: 3 });
      D.rond(pl.haut, pl.P(A), 9, { fill: "#fff", stroke: C.encre, ep: 3 });
      if (n.reperes) { D.texte(pl.haut, "O₀", [pl.P([0, 0])[0] - 22, pl.P([0, 0])[1] + 24], { taille: 16 }); D.texte(pl.haut, "O₁", [pl.P(A)[0] + 16, pl.P(A)[1] + 24], { taille: 16 }); }
      D.rond(pl.haut, pl.P(M), 9, { fill: C.jeu, stroke: "#fff", ep: 3 });
      var qM = pl.P(M); D.texte(pl.haut, n.reperes ? "O₂" : "pointe", [qM[0] + 30 * Math.cos(c) + (Math.cos(c) < 0 ? -6 : 6), qM[1] - 30 * Math.sin(c) + 5], { coul: C.jeu, taille: 16, ancre: Math.cos(c) < 0 ? "end" : "start" });
      fig.chip("θ₁ = " + n.t1 + "°   θ₂ = " + n.t2 + "°");
    };
    n.pl = pl;
    n.dessin();
    return n;
  }


NIVEAU({
  id: "revision-inverse",
  init: function (fig) { return bras2R(fig, { t1: 20, t2: 50, L1: 40, L2: 30, cible: [60, 0] }); },
  etapes: [
    { nom: "Au ras de la table", jouer: function (j, n) {
      j.fig.astuce("Robot de biopsie : L₁ = 40 cm, L₂ = 30 cm.");
      j.titre("Cible \\((60, 0)\\) cm. Calcule \\(\\cos\\theta_2\\) (3 décimales).");
      j.nombre({ avant: "\\cos\\theta_2 =", cases: [{ attendu: 0.458, tol: 0.0015 }],
        aide: function () { return "\\((60^2 + 0^2 - 40^2 - 30^2)/(2 \\times 40 \\times 30)\\)."; },
        ok: function () { j.bravo("\\(\\cos\\theta_2 = 1100/2400 \\approx 0{,}458\\), soit \\(\\theta_2 \\approx \\pm 62{,}7°\\)."); j.suite(); } });
    } },
    { nom: "Hors d'atteinte", jouer: function (j, n) {
      n.cible = [0, 8]; n.dessin();
      j.titre("Cible à 8 cm de la base. Que répond l'algorithme à l'étape 1 ?");
      j.choix([{ html: "Pas de solution : 8 &lt; |L₁ − L₂| = 10 cm", juste: true }, { html: "Deux solutions, car la cible est proche", aide: "Proche n'est pas toujours mieux : bras replié, la pointe reste à \\(|L_1 - L_2|\\) de la base." }], { colonnes: 1, ok: function () {
        j.bravo("Trop près : hors de l'espace de travail.");
        j.suite();
      } });
    } },
    { nom: "Le bon outil", jouer: function (j, n) {
      n.cible = null; n.dessin();
      j.titre("Un bras à 7 articulations, trop complexe pour une formule. Quelle méthode pour son MGI ?");
      j.choix([{ html: "Numérique (Newton-Raphson)", juste: true }, { html: "Analytique", aide: "Pas de méthode analytique générale : elle devient très difficile pour les robots complexes." }], { ok: function () {
        j.bravo("La méthode numérique fonctionne pour n'importe quel robot.");
        j.suite();
      } });
    } },
    { nom: "Un seul moteur", jouer: function (j, n) {
      j.titre("Sur le 2R, seul le moteur 1 tourne, à 1 rad/s. Où lit-on la vitesse de la pince ?");
      j.choix([{ html: "Dans la 1re colonne de \\(J(q)\\)", juste: true }, { html: "Dans la 1re ligne de \\(J(q)\\)", aide: "Une ligne mélange les deux moteurs pour une direction donnée." }, { html: "Dans \\(f(q)\\)", aide: "\\(f(q)\\) donne une position, pas une vitesse." }], { colonnes: 1, ok: function () {
        j.bravo("Colonne 1 : vitesse de l'outil quand seule l'articulation 1 bouge à vitesse 1.");
        j.suite();
      } });
    } }
  ]
});
})();
