/* Niveau : modélisation géométrique directe. Robot de biopsie du sein du cours, L1 = 40 cm, L2 = 30 cm. */
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
  id: "mgd",
  init: function (fig) { return bras2R(fig, { t1: 70, t2: -60, L1: 40, L2: 30 }); },
  etapes: [
    { nom: "Le besoin", jouer: function (j, n) {
      j.fig.astuce("Robot de biopsie du sein : L₁ = 40 cm, L₂ = 30 cm.");
      j.titre("Les capteurs ne donnent que \\(\\theta_1\\) et \\(\\theta_2\\). Le radiologue veut voir la pointe sur l'image. Que calcule la MGD ?");
      j.choix([
        { html: "La position et l'orientation de l'outil, à partir des variables articulaires", juste: true },
        { html: "Les angles à donner aux moteurs pour atteindre une position", aide: "C'est le chemin inverse : position vers angles. La MGD va des angles vers la position." },
        { html: "Les efforts entre l'aiguille et les tissus", aide: "La modélisation géométrique ne tient pas compte des forces." }
      ], { colonnes: 1, ok: function () {
        j.bravo("\\(X = f(q)\\) : des angles à la posture de l'outil.");
        j.expliquer("<p>Puis le recalage robot-image superpose cette position à l'image médicale.</p>");
        j.suite();
      } });
    } },
    { nom: "q et X", jouer: function (j, n) {
      j.titre("Dans \\(X = f(q)\\), complète.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:auto 1fr;gap:8px 12px;align-items:center;font-size:18px"><span>\\(q\\)</span><span class="trou" data-attendu="q" style="min-width:330px"></span><span>\\(X\\)</span><span class="trou" data-attendu="x" style="min-width:330px"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "x", html: "la posture de l'outil : position et orientation" }, { id: "f", html: "les efforts des moteurs" }, { id: "q", html: "le vecteur des variables articulaires" }],
        aide: "q est ce que les capteurs mesurent : angles des moteurs ou courses des vérins.",
        ok: function () {
          j.bravo("\\(q = [q_1, \\dots, q_n]^T\\), \\(X = [x, y, z, \\phi, \\theta, \\psi]^T\\).");
          j.suite();
        }
      });
    } },
    { nom: "Pas à pas", jouer: function (j, n) {
      j.titre("Remets dans l'ordre la méthodologie de calcul de la MGD.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:auto 1fr;gap:5px 10px;align-items:center;font-size:16px">' + [1, 2, 3, 4, 5].map(function (k) { return "<b>" + k + '.</b><span class="trou" data-attendu="' + "abcde"[k - 1] + '" style="min-width:260px"></span>'; }).join("") + "</div>");
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "multiplier, de la base vers l'outil" }, { id: "e", html: "extraire position et orientation" }, { id: "a", html: "récupérer le tableau DH" }, { id: "d", html: "simplifier la trigonométrie" }, { id: "b", html: "écrire les matrices élémentaires" }],
        aide: "On ne peut pas écrire les matrices sans le tableau, ni simplifier avant d'avoir multiplié.",
        ok: function () {
          j.bravo("Tableau, matrices, produit, simplification, extraction.");
          j.expliquer("<p>L'ordre du produit est strict : la multiplication matricielle n'est pas commutative.</p>");
          j.suite();
        }
      });
    } },
    { nom: "La pointe", jouer: function (j, n) {
      n.t1 = 60; n.t2 = -30; n.dessin();
      j.titre("\\(\\theta_1 = 60°\\), \\(\\theta_2 = -30°\\). Où est la pointe ? (cm, 2 décimales)");
      j.nombre({ avant: "(x \\,;\\ y) =", apres: "\\text{cm}", cases: [{ attendu: 45.98, tol: 0.06 }, { attendu: 49.64, tol: 0.06 }],
        aide: function (k) { return k === 0 ? "\\(40\\cos 60° + 30\\cos 30°\\)." : "\\(40\\sin 60° + 30\\sin 30°\\)."; },
        ok: function () {
          j.bravo("\\((45{,}98 \\,;\\ 49{,}64)\\) cm.", n.pl.P(n.M()));
          j.expliquer("\\[ x = 20 + 25{,}98 = 45{,}98 \\qquad y = 34{,}64 + 15 = 49{,}64 \\]");
          j.suite();
        } });
    } },
    { nom: "Lire la matrice", jouer: function (j, n) {
      j.titre("Dans la matrice \\({}^0_nT\\) obtenue, où lit-on la position de l'outil ?");
      j.choix([
        { html: "Dans la 4e colonne", juste: true },
        { html: "Dans la sous-matrice \\(3 \\times 3\\)", aide: "La sous-matrice \\({}^0_nR\\) donne l'orientation." },
        { html: "Dans la dernière ligne", aide: "La dernière ligne vaut toujours \\((0,\\ 0,\\ 0,\\ 1)\\)." }
      ], { ok: function () {
        j.bravo("Position : 4e colonne ; orientation : \\({}^0_nR\\).");
        j.suite();
      } });
    } },
    { nom: "En clinique", jouer: function (j, n) {
      j.titre("Quel système affiche en temps réel l'instrument superposé à l'IRM ou au scanner du patient ?");
      j.choix([
        { html: "La navigation chirurgicale assistée par ordinateur", juste: true },
        { html: "Le robot de rééducation", aide: "Lui mesure le mouvement du bras du patient et le compare à l'exercice." },
        { html: "La biopsie guidée", aide: "Elle guide une aiguille vers une lésion ; la superposition de l'instrument à l'anatomie, c'est la navigation." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Navigation : orthopédie, neurochirurgie, ORL.");
        j.expliquer("<p>Imagerie, suivi de l'instrument, recalage spatial : le chirurgien voit où se trouve l'instrument par rapport à l'anatomie.</p>");
        j.suite();
      } });
    } }
  ]
});
})();
