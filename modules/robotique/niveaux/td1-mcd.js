/* Niveau : TD 1, exercice 2, modèle cinématique direct. Robot de l'exercice 2 (L1 = 40 cm, L2 = 35 cm), posture 23,8° et 48,19°. */
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
  id: "td1-mcd",
  init: function (fig) { return bras2R(fig, { t1: 23.8, t2: 48.19, L1: 40, L2: 35 }); },
  etapes: [
    { nom: "La jacobienne", jouer: function (j, n) {
      j.fig.astuce("Robot de l'exercice 2 : L₁ = 40 cm, L₂ = 35 cm.");
      j.titre("Question 1. Quelle est la jacobienne \\(J(q)\\) du robot 2R ?");
      j.consigne("On dérive \\(x = L_1\\cos\\theta_1 + L_2\\cos(\\theta_1 + \\theta_2)\\) et \\(y = L_1\\sin\\theta_1 + L_2\\sin(\\theta_1 + \\theta_2)\\).");
      j.choix([
        { tex: "\\begin{pmatrix} -L_1 s_1 - L_2 s_{12} & -L_2 s_{12} \\\\ L_1 c_1 + L_2 c_{12} & L_2 c_{12} \\end{pmatrix}", juste: true },
        { tex: "\\begin{pmatrix} L_1 c_1 + L_2 c_{12} & L_2 c_{12} \\\\ L_1 s_1 + L_2 s_{12} & L_2 s_{12} \\end{pmatrix}", aide: "Ça, ce sont les positions. La dérivée de \\(\\cos\\) est \\(-\\sin\\)." },
        { tex: "\\begin{pmatrix} -L_1 s_1 & -L_2 s_{12} \\\\ L_1 c_1 & L_2 c_{12} \\end{pmatrix}", aide: "\\(\\theta_1\\) apparaît aussi dans \\(\\cos(\\theta_1 + \\theta_2)\\) : sa colonne garde les deux termes." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Colonne 1 : dérivées par rapport à \\(\\theta_1\\) ; colonne 2 : par rapport à \\(\\theta_2\\).");
        j.suite();
      } });
    } },
    { nom: "Évaluée", jouer: function (j, n) {
      j.titre("Question 2. En \\(\\theta_1 = 23{,}8°\\), \\(\\theta_2 = 48{,}19°\\), calcule la 1re colonne de \\(J\\) (cm/rad, 2 décimales).");
      j.nombre({ avant: "\\begin{pmatrix} J_{11} \\\\ J_{21} \\end{pmatrix} =", cases: [{ attendu: -49.43, tol: 0.06 }, { attendu: 47.42, tol: 0.06 }],
        aide: function (k) { return k === 0 ? "\\(-40\\sin 23{,}8° - 35\\sin 71{,}99°\\)." : "\\(40\\cos 23{,}8° + 35\\cos 71{,}99°\\)."; },
        ok: function () {
          j.bravo("\\(J \\approx \\begin{pmatrix} -49{,}43 & -33{,}29 \\\\ 47{,}42 & 10{,}82 \\end{pmatrix}\\) cm/rad.");
          j.suite();
        } });
    } },
    { nom: "La vitesse", jouer: function (j, n) {
      j.titre("Question 3. \\(\\dot\\theta_1 = 0{,}1\\) rad/s, \\(\\dot\\theta_2 = -0{,}05\\) rad/s. Vitesse de l'aiguille ?");
      j.consigne("\\(J \\approx \\begin{pmatrix} -49{,}43 & -33{,}29 \\\\ 47{,}42 & 10{,}82 \\end{pmatrix}\\)");
      j.nombre({ avant: "(v_x \\,;\\ v_y) =", apres: "\\text{cm/s}", cases: [{ attendu: -3.28, tol: 0.02 }, { attendu: 4.20, tol: 0.02 }],
        aide: function (k) { return k === 0 ? "\\(-49{,}43 \\times 0{,}1 + (-33{,}29) \\times (-0{,}05)\\)." : "\\(47{,}42 \\times 0{,}1 + 10{,}82 \\times (-0{,}05)\\)."; },
        ok: function () {
          j.bravo("\\(V \\approx (-3{,}28\\,;\\ 4{,}20)\\) cm/s.");
          j.expliquer("<p>Norme : \\(\\|V\\| = \\sqrt{3{,}28^2 + 4{,}20^2} \\approx 5{,}33\\) cm/s.</p>");
          j.suite();
        } });
    } },
    { nom: "Sécurité", jouer: function (j, n) {
      j.titre("Questions 4 et 5. La vitesse de l'aiguille est limitée à 2 cm/s. Quel facteur de réduction faut-il appliquer ?");
      j.nombre({ avant: "\\dfrac{\\|V\\|}{v_{max}} =", cases: [{ attendu: 2.66, tol: 0.02 }],
        aide: function () { return "\\(\\|V\\| \\approx 5{,}33\\) cm/s : est-ce plus que 2 ? Divise l'un par l'autre."; },
        ok: function () {
          j.bravo("5,33 &gt; 2 : contrainte non respectée ; il faut diviser les vitesses articulaires par 2,66.");
          j.expliquer("<p>Diviser \\(\\dot q\\) par 2,66 divise \\(V\\) par 2,66, car \\(V = J\\dot q\\) est linéaire en \\(\\dot q\\) : même direction, vitesse ramenée à 2 cm/s.</p>");
          j.suite();
        } });
    } },
    { nom: "Les colonnes", jouer: function (j, n) {
      j.titre("Question 6. Que représentent physiquement les colonnes de la jacobienne ?");
      j.choix([
        { html: "La colonne \\(i\\) est la vitesse de l'aiguille quand seule l'articulation \\(i\\) bouge, à vitesse 1", juste: true },
        { html: "La position de chaque articulation", aide: "\\(J\\) relie des vitesses, pas des positions." },
        { html: "La vitesse de chaque moteur", aide: "Les vitesses des moteurs sont dans \\(\\dot q\\)." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Définition physique du cours.");
        j.expliquer("<p>Question 7 : en robotique médicale, maîtriser les vitesses, c'est garantir la sécurité du patient (une aiguille trop rapide abîme les tissus) et la précision du geste sur la trajectoire planifiée.</p>");
        j.suite();
      } });
    } }
  ]
});
})();
