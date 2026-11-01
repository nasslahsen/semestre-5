/* Niveau : boss du chapitre « Modèle inverse et cinématique ». MGI complet du robot de biopsie (40 ; 30 cm) vers (50 ; 20) cm. */
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
  id: "boss-inverse",
  init: function (fig) { return bras2R(fig, { t1: 30, t2: 60, L1: 40, L2: 30, cible: [50, 20] }); },
  etapes: [
    { nom: "Accessibilité", jouer: function (j, n) {
      j.titre("Nouvelle lésion en \\((50, 20)\\) cm, robot \\(L_1 = 40\\), \\(L_2 = 30\\) cm. Distance à la base ?");
      j.nombre({ avant: "r =", apres: "\\text{cm}", cases: [{ attendu: 53.85, tol: 0.06 }],
        aide: function () { return "\\(\\sqrt{50^2 + 20^2}\\)."; },
        ok: function () { j.bravo("\\(r \\approx 53{,}85\\) cm : accessible."); j.suite(); } });
    } },
    { nom: "θ₂", jouer: function (j, n) {
      j.titre("Calcule \\(\\theta_2\\) (solution positive), en degrés.");
      j.nombre({ avant: "\\theta_2 =", apres: "°", cases: [{ attendu: 80.41, tol: 0.08 }],
        aide: function () { return "\\(\\cos\\theta_2 = (2900 - 1600 - 900)/2400\\)."; },
        ok: function () { j.bravo("\\(\\cos\\theta_2 = 1/6\\), \\(\\theta_2 \\approx 80{,}41°\\)."); j.suite(); } });
    } },
    { nom: "θ₁", jouer: function (j, n) {
      j.titre("\\(\\alpha = 21{,}80°\\) et \\(\\beta = 33{,}32°\\). Que vaut \\(\\theta_1\\) en coude bas ?");
      j.nombre({ avant: "\\theta_1 =", apres: "°", cases: [{ attendu: -11.52, tol: 0.06 }],
        aide: function () { return "Coude bas : \\(\\theta_1 = \\alpha - \\beta\\). Le résultat peut être négatif."; },
        ok: function () { j.bravo("\\(\\theta_1 = 21{,}80 - 33{,}32 = -11{,}52°\\) : le bras 1 descend sous l'horizontale."); j.suite(); } });
    } },
    { nom: "Poser l'aiguille", jouer: function (j, n) {
      j.titre("Règle \\(\\theta_1\\) et \\(\\theta_2\\) pour poser l'aiguille sur la lésion (à moins de 1,5 cm).");
      var fini = false, c1, c2;
      function maj() {
        n.t1 = c1.v; n.t2 = c2.v; n.dessin();
        var M = n.M();
        if (!fini && Math.hypot(M[0] - 50, M[1] - 20) < 1.5) {
          fini = true; c1.input.disabled = true; c2.input.disabled = true;
          j.bravo("Sur la lésion avec θ₁ = " + n.t1 + "° et θ₂ = " + n.t2 + "°.", n.pl.P([50, 20]));
          j.expliquer("<p>Les deux configurations marchent : coude bas (−11,5° ; 80,4°) et coude haut (55,1° ; −80,4°). Étape 5 : la MGD vérifie chaque réglage.</p>");
          j.suite();
        }
      }
      c1 = j.curseur({ nom: "θ₁", min: -60, max: 150, pas: 1, val: 30, unite: "°", change: maj });
      c2 = j.curseur({ nom: "θ₂", min: -150, max: 150, pas: 1, val: 60, unite: "°", change: maj });
      j.reponse(function () { c1.regler(-12); c2.regler(80); maj(); });
    } }
  ]
});
})();
