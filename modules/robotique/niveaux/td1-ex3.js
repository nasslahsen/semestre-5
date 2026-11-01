/* Niveau : TD 1, exercice 3, questions 1 et 2. Biopsie du foie : cible (55 ; 35) cm, robot 3R (35, 25, 10), MGI du 2R simplifié (40, 30). */
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
  id: "td1-ex3",
  init: function (fig) { return bras2R(fig, { t1: 30, t2: 60, L1: 40, L2: 30, cible: [55, 35] }); },
  etapes: [
    { nom: "La distance", jouer: function (j, n) {
      j.fig.astuce("Lésion du foie en (55 ; 35) cm.");
      j.titre("Question 1. À quelle distance de la base est la tumeur \\((55, 35)\\) cm ?");
      j.nombre({ avant: "r =", apres: "\\text{cm}", cases: [{ attendu: 65.19, tol: 0.06 }],
        aide: function () { return "\\(\\sqrt{55^2 + 35^2}\\)."; },
        ok: function () { j.bravo("\\(r = \\sqrt{4250} \\approx 65{,}19\\) cm."); j.suite(); } });
    } },
    { nom: "Accessible ?", jouer: function (j, n) {
      j.titre("Le robot 3R a \\(L_1 = 35\\), \\(L_2 = 25\\), \\(L_3 = 10\\) cm. La cible est-elle accessible ?");
      j.choix([
        { html: "Oui : 65,19 cm ≤ L₁ + L₂ + L₃ = 70 cm", juste: true },
        { html: "Non : 65,19 cm dépasse L₁ + L₂ = 60 cm", aide: "Le robot de l'exercice a trois segments : sa portée maximale est \\(L_1 + L_2 + L_3\\)." }
      ], { colonnes: 1, ok: function () { j.bravo("Accessible, avec une marge de 4,8 cm."); j.suite(); } });
    } },
    { nom: "θ₂", jouer: function (j, n) {
      j.titre("Question 2. Avec le 2R simplifié (\\(L_1 = 40\\), \\(L_2 = 30\\)), calcule \\(\\theta_2\\) (solution positive).");
      j.nombre({ avant: "\\theta_2 =", apres: "°", cases: [{ attendu: 43.18, tol: 0.06 }],
        aide: function () { return "\\(\\cos\\theta_2 = (4250 - 1600 - 900)/2400 \\approx 0{,}729\\)."; },
        ok: function () { j.bravo("\\(\\cos\\theta_2 \\approx 0{,}729\\), \\(\\theta_2 \\approx 43{,}18°\\)."); j.suite(); } });
    } },
    { nom: "θ₁", jouer: function (j, n) {
      j.titre("\\(\\alpha = \\arctan(35/55) = 32{,}47°\\) et \\(\\beta = 18{,}36°\\). Que vaut \\(\\theta_1\\) avec \\(\\theta_2 = +43{,}18°\\) ?");
      j.nombre({ avant: "\\theta_1 =", apres: "°", cases: [{ attendu: 14.12, tol: 0.06 }],
        aide: function () { return "Avec \\(\\theta_2 > 0\\) (coude bas dans le tableau du cours) : \\(\\theta_1 = \\alpha - \\beta\\)."; },
        ok: function () {
          n.t1 = 14.12; n.t2 = 43.18; n.dessin();
          j.bravo("\\(\\theta_1 \\approx 14{,}12°\\), \\(\\theta_2 \\approx 43{,}18°\\).", n.pl.P([55, 35]));
          j.expliquer("<p>L'autre solution : \\(\\theta_1 = \\alpha + \\beta \\approx 50{,}83°\\), \\(\\theta_2 \\approx -43{,}18°\\). Laquelle est le « coude vers le bas » de l'énoncé dépend de son repère (axe \\(y_0\\) vers le bas sur la figure) : à vérifier en TD.</p>");
          j.suite();
        } });
    } }
  ]
});
})();
