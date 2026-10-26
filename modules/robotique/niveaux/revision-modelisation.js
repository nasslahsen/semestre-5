/* Niveau : révision du chapitre « Modélisation des robots médicaux ». Situations nouvelles. */
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
      if (n.cible) { var q = pl.P(n.cible); D.rond(pl.fond, q, 16, { fill: "rgba(229,72,77,.12)", stroke: C.ko, ep: 2.5, tirets: "5 5" }); D.texte(pl.fond, "lésion", [q[0] + 22, q[1] - 18], { coul: C.ko, taille: 16, ancre: "start" }); }
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
  id: "revision-modelisation",
  init: function (fig) { return bras2R(fig, { t1: 90, t2: 90, L1: 25, L2: 15, O: [270, 470], u: 7, lx: [-34, 54], ly: [-8, 58], ticks: [-20, -10, 10, 20, 30, 40], yticks: false }); },
  etapes: [
    { nom: "Axes parallèles", jouer: function (j, n) {
      j.fig.astuce("Un autre bras plan : L₁ = 25 cm, L₂ = 15 cm.");
      j.titre("Sur ce bras plan, les axes des deux pivots sont parallèles et de même sens. Que vaut \\(\\alpha_2\\) ?");
      j.nombre({ avant: "\\alpha_2 =", apres: "°", cases: [{ attendu: 0, tol: 0.01 }],
        aide: function () { return "\\(\\alpha_j\\) est l'angle entre \\(Z_{j-1}\\) et \\(Z_j\\)."; },
        ok: function () { j.bravo("\\(\\alpha_2 = 0\\) : pas de torsion."); j.suite(); } });
    } },
    { nom: "Nouveau bras", jouer: function (j, n) {
      j.titre("\\(L_1 = 25\\), \\(L_2 = 15\\) cm, \\(\\theta_1 = 90°\\), \\(\\theta_2 = 90°\\). Où est l'outil ?");
      j.nombre({ avant: "(P_x \\,;\\ P_y) =", apres: "\\text{cm}", cases: [{ attendu: -15, tol: 0.05 }, { attendu: 25, tol: 0.05 }],
        aide: function (k) { return k === 0 ? "\\(25\\cos 90° + 15\\cos 180°\\), et \\(\\cos 180° = -1\\)." : "\\(25\\sin 90° + 15\\sin 180°\\)."; },
        ok: function () {
          j.bravo("\\((-15 \\,;\\ 25)\\) cm : le segment 2 revient vers la gauche.", n.pl.P(n.M()));
          j.suite();
        } });
    } },
    { nom: "L'erreur", jouer: function (j, n) {
      j.titre("Un étudiant écrit \\({}^0T_2 = {}^1T_2\\,{}^0T_1\\). Qu'est-ce qui ne va pas ?");
      j.choix([
        { html: "L'ordre : on multiplie de la base vers l'outil, et le produit n'est pas commutatif", juste: true },
        { html: "Rien : l'ordre du produit ne change pas le résultat", aide: "Pour des matrices, \\(AB \\neq BA\\) en général." },
        { html: "Il faut additionner les matrices, pas les multiplier", aide: "Les transformations se composent par produit." }
      ], { colonnes: 1, ok: function () {
        j.bravo("\\({}^0T_2 = {}^0T_1\\,{}^1T_2\\), dans cet ordre.");
        j.suite();
      } });
    } },
    { nom: "Trois articulations", jouer: function (j, n) {
      j.titre("Pour un robot à trois articulations, écris le chaînage.");
      var z = j.zone("", '<div style="display:flex;align-items:center;gap:6px;font-size:20px;flex-wrap:wrap">\\({}^0T_3 =\\)' + "abc".split("").map(function (x) { return '<span class="trou" data-attendu="' + x + '" style="min-width:80px"></span>'; }).join("") + "</div>");
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", tex: "{}^2T_3" }, { id: "a", tex: "{}^0T_1" }, { id: "x", tex: "{}^3T_2" }, { id: "b", tex: "{}^1T_2" }],
        aide: "Chaque matrice passe d'un repère au suivant : l'indice du haut de l'une est l'indice du bas de la précédente.",
        ok: function () { j.bravo("\\({}^0T_3 = {}^0T_1\\,{}^1T_2\\,{}^2T_3\\)."); j.suite(); }
      });
    } },
    { nom: "Sans les forces", jouer: function (j, n) {
      j.titre("Le logiciel place le modèle géométrique du robot sur le scanner du patient. De quoi ce modèle ne tient-il pas compte ?");
      j.choix([
        { html: "Des forces : poids des organes, résistance des tissus", juste: true },
        { html: "De l'orientation de l'outil", aide: "La modélisation géométrique étudie la position et l'orientation." },
        { html: "Des longueurs des segments", aide: "Les longueurs sont dans le tableau DH : sans elles, pas de position." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Position et orientation, sans les forces.");
        j.expliquer("<p>C'est la vérification de l'espace de travail : la tumeur est-elle atteignable, sans que la base gêne l'anesthésiste ?</p>");
        j.suite();
      } });
    } }
  ]
});
})();
