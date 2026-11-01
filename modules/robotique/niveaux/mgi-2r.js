/* Niveau : MGI du robot 2R par la méthode analytique du cours (Al-Kashi). L1 = 40 cm, L2 = 30 cm, cible (30 ; 40) cm. */
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
  id: "mgi-2r",
  init: function (fig) { return bras2R(fig, { t1: 70, t2: -60, L1: 40, L2: 30, cible: [30, 40] }); },
  etapes: [
    { nom: "Accessible ?", jouer: function (j, n) {
      j.fig.astuce("L₁ = 40 cm, L₂ = 30 cm. Nouvelle cible : (30 ; 40) cm.");
      j.titre("Étape 1. À quelle distance de la base est la cible \\((30, 40)\\) cm ?");
      j.nombre({ avant: "r =", apres: "\\text{cm}", cases: [{ attendu: 50, tol: 0.05 }],
        aide: function () { return "\\(r = \\sqrt{x_c^2 + y_c^2}\\)."; },
        ok: function () {
          j.bravo("\\(r = 50\\) cm, entre 10 et 70 : accessible.");
          j.suite();
        } });
    } },
    { nom: "Le coude", jouer: function (j, n) {
      j.titre("Étape 2. Calcule \\(\\theta_2\\) (on garde la solution positive).");
      j.consigne("\\(\\cos\\theta_2 = \\dfrac{x_c^2 + y_c^2 - L_1^2 - L_2^2}{2L_1L_2}\\)");
      j.nombre({ avant: "\\theta_2 =", apres: "°", cases: [{ attendu: 90, tol: 0.1 }],
        aide: function () { return "\\(\\cos\\theta_2 = (2500 - 1600 - 900)/2400\\)."; },
        ok: function () {
          j.bravo("\\(\\cos\\theta_2 = 0\\), donc \\(\\theta_2 = \\pm 90°\\).");
          j.expliquer("<p>Al-Kashi dans le triangle OAP, avec \\(\\beta = \\pi - \\theta_2\\) au coude : \\(r^2 = L_1^2 + L_2^2 + 2L_1L_2\\cos\\theta_2\\).</p>");
          j.suite();
        } });
    } },
    { nom: "Direction de la cible", jouer: function (j, n) {
      j.titre("Étape 3. Quel angle \\(\\alpha\\) fait la droite OP avec l'horizontale ?");
      j.nombre({ avant: "\\alpha =", apres: "°", cases: [{ attendu: 53.13, tol: 0.06 }],
        aide: function () { return "\\(\\tan\\alpha = y_c / x_c = 40/30\\)."; },
        ok: function () { j.bravo("\\(\\alpha = \\arctan(40/30) \\approx 53{,}13°\\)."); j.suite(); } });
    } },
    { nom: "L'épaule", jouer: function (j, n) {
      j.titre("Avec \\(\\beta = 36{,}87°\\) (angle en O entre OA et OP), que vaut \\(\\theta_1\\) en configuration coude bas ?");
      j.nombre({ avant: "\\theta_1 =", apres: "°", cases: [{ attendu: 16.26, tol: 0.06 }],
        aide: function () { return "Coude bas : \\(\\theta_1 = \\alpha - \\beta\\)."; },
        ok: function () {
          n.t1 = 16.26; n.t2 = 90; n.dessin();
          j.bravo("\\(\\theta_1 = 53{,}13 - 36{,}87 = 16{,}26°\\).", n.pl.P([30, 40]));
          j.expliquer("<p>Vérification par la MGD : \\(x = 40\\cos 16{,}26° + 30\\cos 106{,}26° = 38{,}4 - 8{,}4 = 30\\), \\(y = 11{,}2 + 28{,}8 = 40\\).</p>");
          j.suite();
        } });
    } },
    { nom: "L'autre configuration", jouer: function (j, n) {
      j.titre("Et en configuration coude haut ?");
      j.choix([
        { tex: "\\theta_1 = \\alpha + \\beta = 90°,\\ \\theta_2 = -90°", juste: true },
        { tex: "\\theta_1 = 16{,}26°,\\ \\theta_2 = -90°", aide: "Si le coude passe de l'autre côté de OP, le premier bras aussi : \\(\\beta\\) s'ajoute à \\(\\alpha\\)." },
        { tex: "\\theta_1 = 90°,\\ \\theta_2 = 90°", aide: "Le coude change de côté : \\(\\theta_2\\) change de signe." }
      ], { colonnes: 1, ok: function () {
        n.t1 = 90; n.t2 = -90; n.dessin();
        j.bravo("Bras 1 vertical, bras 2 horizontal : la pointe est aussi en \\((30, 40)\\).", n.pl.P([30, 40]));
        j.expliquer("<p>Étape 4 du cours : on garde la configuration qui convient à l'environnement, puis on vérifie avec la MGD.</p>");
        j.suite();
      } });
    } }
  ]
});
})();
