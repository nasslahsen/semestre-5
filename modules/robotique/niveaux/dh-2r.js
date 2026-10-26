/* Niveau : le robot 2R du cours décrit avec Denavit–Hartenberg (tableau, matrices élémentaires, produit). L1 = 40 cm, L2 = 30 cm. */
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
  id: "dh-2r",
  init: function (fig) { return bras2R(fig, { t1: 30, t2: 40, L1: 40, L2: 30, reperes: true }); },
  etapes: [
    { nom: "Le tableau", jouer: function (j, n) {
      j.fig.astuce("Repères placés selon DH : x₁ et x₂ suivent les segments.");
      j.titre("Complète la ligne de l'articulation 2 dans le tableau DH.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:auto 1fr;gap:8px 12px;align-items:center;font-size:19px"><span>\\(\\alpha_2\\)</span><span class="trou" data-attendu="z" style="min-width:110px"></span><span>\\(d_2\\)</span><span class="trou" data-attendu="l" style="min-width:110px"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "l", tex: "L_2" }, { id: "t", tex: "\\theta_2" }, { id: "z", tex: "0" }, { id: "m", tex: "L_1" }],
        aide: "\\(\\alpha_2\\) : angle entre \\(z_1\\) et \\(z_2\\), qui sont parallèles. \\(d_2\\) : distance entre ces axes, le long de \\(x_2\\).",
        ok: function () {
          j.bravo("\\(\\alpha_2 = 0\\), \\(d_2 = L_2\\) ; et \\(\\theta_2\\) variable, \\(r_2 = 0\\).");
          j.expliquer("<p>Tableau complet : ligne 1 \\((0,\\ L_1,\\ \\theta_1,\\ 0)\\), ligne 2 \\((0,\\ L_2,\\ \\theta_2,\\ 0)\\), dans l'ordre \\((\\alpha_j,\\ d_j,\\ \\theta_j,\\ r_j)\\).</p>");
          j.suite();
        }
      });
    } },
    { nom: "Où est O₁ ?", jouer: function (j, n) {
      j.titre("Avec Denavit–Hartenberg, où se trouve l'origine \\(O_1\\) ?");
      j.choix([
        { html: "Au bout du segment 1, sur le pivot 2", juste: true },
        { html: "Sur la base, confondue avec \\(O_0\\)", aide: "C'était le choix du chapitre 4. Ici, \\(O_1\\) est là où la normale commune coupe \\(z_1\\), l'axe du pivot 2." },
        { html: "Au milieu du segment 1", aide: "L'origine est sur un axe d'articulation, là où la normale commune le coupe." }
      ], { colonnes: 1, ok: function () {
        j.bravo("\\(O_1\\) est sur le pivot 2, \\(O_2\\) sur l'outil.", n.pl.P([40 * Math.cos(30 * D.DEG), 40 * Math.sin(30 * D.DEG)]));
        j.suite();
      } });
    } },
    { nom: "¹T₂", jouer: function (j, n) {
      j.titre("Quelle est la dernière colonne de \\({}^1T_2\\) ?");
      j.choix([
        { tex: "(L_2\\cos\\theta_2 \\,;\\ L_2\\sin\\theta_2 \\,;\\ 0 \\,;\\ 1)", juste: true },
        { tex: "(L_1 \\,;\\ 0 \\,;\\ 0 \\,;\\ 1)", aide: "C'est la colonne de \\(T^{1,2}\\) au chapitre 4, quand \\(O_1\\) était sur la base. En DH, \\({}^1T_2\\) porte le segment 2." },
        { tex: "(L_2\\cos(\\theta_1 + \\theta_2) \\,;\\ L_2\\sin(\\theta_1 + \\theta_2) \\,;\\ 0 \\,;\\ 1)", aide: "Une matrice élémentaire ne contient que sa propre articulation : \\(\\theta_2\\) seul." }
      ], { colonnes: 1, ok: function () {
        j.bravo("\\((d_2\\cos\\theta_2 \\,;\\ d_2\\sin\\theta_2 \\,;\\ r_2)\\) avec \\(d_2 = L_2\\), \\(r_2 = 0\\).");
        j.suite();
      } });
    } },
    { nom: "Le produit", jouer: function (j, n) {
      n.t1 = 0; n.t2 = 90; n.dessin();
      j.titre("\\(\\theta_1 = 0°\\), \\(\\theta_2 = 90°\\). Où est l'outil ? (cm)");
      j.nombre({ avant: "(P_x \\,;\\ P_y) =", apres: "\\text{cm}", cases: [{ attendu: 40, tol: 0.05 }, { attendu: 30, tol: 0.05 }],
        aide: function (k) { return k === 0 ? "\\(40\\cos 0° + 30\\cos 90°\\)." : "\\(40\\sin 0° + 30\\sin 90°\\)."; },
        ok: function () {
          j.bravo("\\((40 \\,;\\ 30)\\) cm : 4e colonne de \\({}^0T_2\\).", n.pl.P(n.M()));
          j.expliquer("\\[ P_x = L_1\\cos\\theta_1 + L_2\\cos(\\theta_1 + \\theta_2) \\qquad P_y = L_1\\sin\\theta_1 + L_2\\sin(\\theta_1 + \\theta_2) \\]");
          j.suite();
        } });
    } },
    { nom: "L'orientation", jouer: function (j, n) {
      j.titre("Dans la même posture, de quel angle l'outil est-il tourné par rapport à \\(x_0\\) ?");
      j.nombre({ avant: "\\theta_1 + \\theta_2 =", apres: "°", cases: [{ attendu: 90, tol: 0.01 }],
        aide: function () { return "Le bloc de rotation de \\({}^0T_2\\) contient \\(\\cos(\\theta_1 + \\theta_2)\\) et \\(\\sin(\\theta_1 + \\theta_2)\\)."; },
        ok: function () { j.bravo("90° : l'aiguille est verticale."); j.suite(); } });
    } }
  ]
});
})();
