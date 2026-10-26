/* Niveau : boss du chapitre « Modélisation ». Robot de biopsie du sein (40 et 30 cm), lésion en (50 ; 40) cm. */
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
  id: "boss-modelisation",
  init: function (fig) { return bras2R(fig, { t1: 0, t2: 90, L1: 40, L2: 30, cible: [50, 40] }); },
  etapes: [
    { nom: "La pointe", jouer: function (j, n) {
      j.titre("Robot de biopsie, \\(L_1 = 40\\), \\(L_2 = 30\\) cm. Les encodeurs lisent \\(\\theta_1 = 0°\\), \\(\\theta_2 = 90°\\). Où est la pointe ?");
      j.nombre({ avant: "(x \\,;\\ y) =", apres: "\\text{cm}", cases: [{ attendu: 40, tol: 0.05 }, { attendu: 30, tol: 0.05 }],
        aide: function (k) { return k === 0 ? "\\(40\\cos 0° + 30\\cos 90°\\)." : "\\(40\\sin 0° + 30\\sin 90°\\)."; },
        ok: function () { j.bravo("\\((40 \\,;\\ 30)\\) cm.", n.pl.P(n.M())); j.suite(); } });
    } },
    { nom: "Atteignable ?", jouer: function (j, n) {
      j.titre("La lésion est en \\((50 \\,;\\ 40)\\) cm. Est-elle dans l'espace de travail ?");
      j.choix([
        { html: "Oui : elle est à 64,0 cm de la base, entre 10 et 70 cm", juste: true },
        { html: "Non : 50 + 40 = 90 cm, plus que 70 cm", aide: "La distance à la base est \\(\\sqrt{x^2 + y^2}\\), pas la somme des coordonnées." },
        { html: "Non : il faudrait un troisième segment", aide: "Compare la distance de la lésion à la base avec \\(L_1 + L_2\\) et \\(|L_1 - L_2|\\)." }
      ], { colonnes: 1, ok: function () {
        j.bravo("\\(\\sqrt{50^2 + 40^2} \\approx 64{,}0\\) cm : atteignable.");
        j.suite();
      } });
    } },
    { nom: "Viser", jouer: function (j, n) {
      j.titre("Règle \\(\\theta_1\\) et \\(\\theta_2\\) pour amener la pointe sur la lésion (à moins de 1,5 cm).");
      var fini = false, c1, c2;
      function maj() {
        n.t1 = c1.v; n.t2 = c2.v; n.dessin();
        var M = n.M();
        if (!fini && Math.hypot(M[0] - 50, M[1] - 40) < 1.5) {
          fini = true; c1.input.disabled = true; c2.input.disabled = true;
          j.bravo("Sur la lésion avec θ₁ = " + n.t1 + "° et θ₂ = " + n.t2 + "°.", n.pl.P([50, 40]));
          j.expliquer("<p>Deux réglages marchent : coude d'un côté (environ 18° et 48°) ou de l'autre (environ 59° et −48°). Le modèle direct vérifie chaque essai ; trouver les angles à partir de la position est le problème inverse.</p>");
          j.suite();
        }
      }
      c1 = j.curseur({ nom: "θ₁", min: -60, max: 150, pas: 1, val: 0, unite: "°", change: maj });
      c2 = j.curseur({ nom: "θ₂", min: -150, max: 150, pas: 1, val: 90, unite: "°", change: maj });
      j.reponse(function () { c1.regler(59); c2.regler(-48); maj(); });
    } },
    { nom: "L'orientation", jouer: function (j, n) {
      j.titre("Dans la posture \\(\\theta_1 = 59°\\), \\(\\theta_2 = -48°\\), quel angle fait l'aiguille avec \\(x_0\\) ?");
      j.nombre({ avant: "\\varphi =", apres: "°", cases: [{ attendu: 11, tol: 0.01 }],
        aide: function () { return "Lis le bloc de rotation de \\({}^0T_2\\)."; },
        ok: function () { j.bravo("\\(\\varphi = 59 - 48 = 11°\\)."); j.suite(); } });
    } }
  ]
});
})();
