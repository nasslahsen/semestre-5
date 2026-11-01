/* Niveau : modélisation cinématique, MCD et matrice jacobienne. Exemple du cours : 2R, L1 = L2 = 1 m, q1 = 30°, q2 = 60°. */
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
  id: "cinematique",
  init: function (fig) { return bras2R(fig, { t1: 30, t2: 60, L1: 40, L2: 40, O: [190, 500], u: 5.6, lx: [-30, 70], ly: [-8, 80], ticks: [], yticks: false }); },
  etapes: [
    { nom: "Où, puis comment", jouer: function (j, n) {
      j.fig.astuce("Le robot 2R du cours : L₁ = L₂ = 1 m.");
      j.titre("La MGD dit où est la sonde en A et en B. Que manque-t-il pour la déplacer de A vers B ?");
      j.choix([
        { html: "Les vitesses : à quelle vitesse et dans quelle direction, en coordonnant les vitesses articulaires", juste: true },
        { html: "Rien : connaître les deux poses suffit", aide: "Deux poses ne disent pas comment passer de l'une à l'autre, ni à quelle vitesse." },
        { html: "Les forces exercées par les moteurs", aide: "La modélisation cinématique étudie le mouvement sans considérer les forces." }
      ], { colonnes: 1, ok: function () {
        j.bravo("La modélisation cinématique relie les vitesses articulaires à celle de l'outil.");
        j.suite();
      } });
    } },
    { nom: "V = J q̇", jouer: function (j, n) {
      j.titre("Complète l'équation fondamentale du MCD.");
      var z = j.zone("", '<div style="display:flex;align-items:center;gap:8px;font-size:22px">\\(V =\\)<span class="trou" data-attendu="j" style="min-width:90px"></span><span class="trou" data-attendu="q" style="min-width:70px"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "q", tex: "\\dot q" }, { id: "f", tex: "f(q)" }, { id: "j", tex: "J(q)" }, { id: "x", tex: "X" }],
        aide: "Vitesse de la pince = jacobienne × vitesses des articulations.",
        ok: function () { j.bravo("\\(V = J(q)\\,\\dot q\\)."); j.suite(); }
      });
    } },
    { nom: "Une colonne", jouer: function (j, n) {
      j.titre("Que représente physiquement la 2e colonne de \\(J(q)\\) ?");
      j.choix([
        { html: "La vitesse de l'outil quand seule l'articulation 2 bouge, à vitesse 1", juste: true },
        { html: "La vitesse de l'articulation 2", aide: "Les vitesses articulaires sont dans \\(\\dot q\\), pas dans \\(J\\)." },
        { html: "La position de l'outil dans la direction y", aide: "Les lignes correspondent aux directions de mouvement ; une colonne, à une articulation." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Colonne \\(i\\) : effet de l'articulation \\(i\\) seule.");
        j.suite();
      } });
    } },
    { nom: "La taille", jouer: function (j, n) {
      j.titre("Un robot à 4 articulations se déplace dans l'espace 3D. Quelle est la taille de sa jacobienne ?");
      j.nombre({ avant: "", apres: "", cases: [{ attendu: 6, tol: 0.01 }, { attendu: 4, tol: 0.01 }], ligne: true,
        aide: function (k) { return k === 0 ? "Une ligne par direction : \\(x, y, z\\) et trois rotations." : "Une colonne par articulation."; },
        ok: function () { j.bravo("6 lignes × 4 colonnes."); j.suite(); } });
    } },
    { nom: "La vitesse de la pince", jouer: function (j, n) {
      j.titre("En \\(q = (30°, 60°)\\), \\(J = \\begin{pmatrix} -1{,}5 & -1 \\\\ 0{,}866 & 0 \\end{pmatrix}\\). Les moteurs tournent à \\(\\dot q = (0{,}4\\,;\\ -0{,}2)\\) rad/s. Vitesse de la pince ?");
      j.nombre({ avant: "(v_x \\,;\\ v_y) =", apres: "\\text{m/s}", cases: [{ attendu: -0.4, tol: 0.006 }, { attendu: 0.346, tol: 0.006 }],
        aide: function (k) { return k === 0 ? "Ligne 1 : \\(-1{,}5 \\times 0{,}4 + (-1) \\times (-0{,}2)\\)." : "Ligne 2 : \\(0{,}866 \\times 0{,}4 + 0 \\times (-0{,}2)\\)."; },
        ok: function () {
          j.bravo("\\(V = (-0{,}40\\,;\\ 0{,}35)\\) m/s.");
          j.expliquer("<p>Chaque ligne de \\(J\\) multiplie le vecteur \\(\\dot q\\) : c'est un produit matrice fois vecteur.</p>");
          j.suite();
        } });
    } }
  ]
});
})();
