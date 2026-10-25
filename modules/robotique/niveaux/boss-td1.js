/* Niveau : boss du TD 1. Le bras d'échographie part d'une autre posture et doit rejoindre la cible du TD (45 ; 50) cm. */
NIVEAU({
  id: "boss-td1",
  init: function (fig) {
    var C = D.C, pl = D.plan(fig.svg, [100, 505], 6.4);
    var n = { t1: 10, t2: 80, L1: 40, L2: 35, cible: [45, 50], erreur: false };
    n.M = function () { var a = n.t1 * D.DEG, c = (n.t1 + n.t2) * D.DEG; return [n.L1 * Math.cos(a) + n.L2 * Math.cos(c), n.L1 * Math.sin(a) + n.L2 * Math.sin(c)]; };
    n.dessin = function () {
      pl.vider(); pl.grille({ pas: 10, fort: 50 });
      pl.axes({ lx: [-12, 88], ly: [-8, 76] });
      [10, 20, 30, 40, 50, 60, 70].forEach(function (k) { D.texte(pl.fond, String(k), pl.P([k, -4]), { coul: C.gris, taille: 13, gras: false, mono: true }); D.texte(pl.fond, String(k), pl.P([-5, k]), { coul: C.gris, taille: 13, gras: false, mono: true }); });
      var q = pl.P(n.cible); D.rond(pl.fond, q, 16, { fill: PLATEFORME.teinte(.12), stroke: C.jeu, ep: 2.5, tirets: "5 5" }); D.texte(pl.fond, "cible", [q[0] + 22, q[1] - 18], { coul: C.jeu, taille: 16, ancre: "start" });
      var a = n.t1 * D.DEG, A = [n.L1 * Math.cos(a), n.L1 * Math.sin(a)], M = n.M();
      D.ligne(pl.fig, pl.P([0, 0]), pl.P(A), C.encre, 14);
      D.ligne(pl.fig, pl.P(A), pl.P(M), C.v, 12);
      pl.arc(pl.fig, [0, 0], 50, 0, n.t1, C.jeu, "θ₁");
      pl.arc(pl.fig, A, 42, n.t1, n.t1 + n.t2, C.jeu, "θ₂");
      if (n.erreur) D.fleche(pl.haut, pl.P(M), q, C.ko, 3);
      D.rond(pl.haut, pl.P([0, 0]), 10, { fill: "#fff", stroke: C.encre, ep: 3 });
      D.rond(pl.haut, pl.P(A), 9, { fill: "#fff", stroke: C.encre, ep: 3 });
      D.rond(pl.haut, pl.P(M), 9, { fill: C.jeu, stroke: "#fff", ep: 3 });
      fig.chip("θ₁ = " + n.t1 + "°   θ₂ = " + n.t2 + "°");
    };
    n.pl = pl;
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "La posture", jouer: function (j, n) {
      j.titre("La sonde a été rangée : \\(\\theta_1 = 10°\\), \\(\\theta_2 = 80°\\), \\(L_1 = 40\\), \\(L_2 = 35\\) cm. Où est-elle ?");
      j.nombre({ avant: "(x \\,;\\ y) =", apres: "\\text{cm}", cases: [{ attendu: 39.39, tol: 0.06 }, { attendu: 41.95, tol: 0.06 }],
        aide: function (k) { return k === 0 ? "\\(\\theta_1 + \\theta_2 = 90°\\) : le segment 2 ne compte pas en x." : "\\(40\\sin 10° + 35\\sin 90°\\)."; },
        ok: function () {
          j.bravo("\\((39{,}39 \\,;\\ 41{,}95)\\) cm.", n.pl.P(n.M()));
          j.expliquer("\\[ x = 40\\cos 10° + 35\\cos 90° = 39{,}39 \\qquad y = 40\\sin 10° + 35\\sin 90° = 6{,}95 + 35 = 41{,}95 \\]");
          j.suite();
        } });
    } },
    { nom: "L'erreur", jouer: function (j, n) {
      n.erreur = true; n.dessin();
      j.titre("Vecteur erreur vers la cible \\((45 \\,;\\ 50)\\) cm ?");
      j.nombre({ avant: "(\\Delta x \\,;\\ \\Delta y) =", apres: "\\text{cm}", cases: [{ attendu: 5.61, tol: 0.06 }, { attendu: 8.05, tol: 0.06 }],
        aide: function (k) { return "Cible moins sonde, composante par composante."; },
        ok: function () {
          j.bravo("\\((5{,}61 \\,;\\ 8{,}05)\\) cm.");
          j.suite();
        } });
    } },
    { nom: "Atteignable ?", jouer: function (j, n) {
      j.titre("La cible est-elle dans l'espace de travail ?");
      j.choix([
        { html: "Oui : elle est à 67,3 cm de la base, entre 5 et 75 cm", juste: true },
        { html: "Non : 45 + 50 = 95 cm dépasse 75 cm", aide: "La distance à la base n'est pas la somme des coordonnées : c'est \\(\\sqrt{x^2 + y^2}\\)." },
        { html: "Non : il faudrait \\(\\theta_2 = 0\\)", aide: "Seule la distance à la base décide si un point est atteignable." }
      ], { colonnes: 1, ok: function () {
        j.bravo("\\(\\sqrt{45^2 + 50^2} \\approx 67{,}3\\) cm : atteignable.");
        j.suite();
      } });
    } },
    { nom: "Rejoindre la cible", jouer: function (j, n) {
      n.erreur = false; n.dessin();
      j.titre("Règle \\(\\theta_1\\) et \\(\\theta_2\\) pour poser la sonde sur la cible (à moins de 1,5 cm).");
      var fini = false, c1, c2;
      function maj() {
        n.t1 = c1.v; n.t2 = c2.v; n.dessin();
        var M = n.M();
        if (!fini && Math.hypot(M[0] - 45, M[1] - 50) < 1.5) {
          fini = true; c1.input.disabled = true; c2.input.disabled = true;
          j.bravo("Sur la cible avec θ₁ = " + n.t1 + "° et θ₂ = " + n.t2 + "°.", n.pl.P([45, 50]));
          j.expliquer("<p>Trouver les angles à partir de la position, c'est le modèle géométrique inverse. Il y a deux solutions ici : coude d'un côté (environ 24° et 53°) ou de l'autre (environ 72° et −53°).</p>");
          j.suite();
        }
      }
      c1 = j.curseur({ nom: "θ₁", min: -90, max: 180, pas: 1, val: 10, unite: "°", change: maj });
      c2 = j.curseur({ nom: "θ₂", min: -150, max: 150, pas: 1, val: 80, unite: "°", change: maj });
      j.reponse(function () { c1.regler(24); c2.regler(53); maj(); });
    } }
  ]
});
