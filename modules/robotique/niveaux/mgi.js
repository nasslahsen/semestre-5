/* Niveau : modélisation géométrique inverse. Définition, défis (existence, multiplicité), méthodes de résolution. */
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
  id: "mgi",
  init: function (fig) { return bras2R(fig, { t1: 30, t2: 60, L1: 40, L2: 30, cible: [50, 40] }); },
  etapes: [
    { nom: "Le chemin inverse", jouer: function (j, n) {
      j.fig.astuce("Robot de biopsie : L₁ = 40 cm, L₂ = 30 cm.");
      j.titre("Le chirurgien a choisi la lésion sur l'imagerie. Que doit calculer le MGI ?");
      j.choix([
        { html: "Les angles des moteurs qui amènent l'outil sur la lésion : \\(q = f^{-1}(X)\\)", juste: true },
        { html: "La position de l'outil à partir des angles lus par les capteurs", aide: "Ça, c'est la MGD : \\(X = f(q)\\). Ici on part de la cible." },
        { html: "La vitesse de l'outil à partir des vitesses des moteurs", aide: "C'est le modèle cinématique. Le MGI reste géométrique : des positions, pas des vitesses." }
      ], { colonnes: 1, ok: function () {
        j.bravo("On inverse la MGD : de la posture voulue aux variables articulaires.");
        j.suite();
      } });
    } },
    { nom: "Trop loin", jouer: function (j, n) {
      n.cible = [75, 0]; n.dessin();
      j.titre("Une cible à 75 cm de la base. Combien de solutions le MGI donne-t-il ?");
      j.choix([{ html: "Aucune", juste: true }, { html: "Une", aide: "Bras tendu, la pointe est au plus à \\(L_1 + L_2\\). Compare à 75 cm." }, { html: "Deux", aide: "Deux solutions, c'est pour une cible dans l'espace de travail. Est-elle dedans ?" }], { colonnes: 3, ok: function () {
        j.bravo("75 cm &gt; 70 cm : hors de portée, aucune solution.");
        j.expliquer("<p>C'est le défi de l'existence des solutions : il faut \\(|L_1 - L_2| \\leq r \\leq L_1 + L_2\\), ici entre 10 et 70 cm.</p>");
        j.suite();
      } });
    } },
    { nom: "Deux bras pour un point", jouer: function (j, n) {
      n.cible = [50, 40]; n.t1 = 18; n.t2 = 48; n.dessin();
      j.titre("La cible \\((50, 40)\\) cm est accessible. Combien de configurations du 2R y posent la pointe ?");
      j.choix([{ html: "Une seule", aide: "Replie le coude de l'autre côté de la droite base-cible : la pointe arrive au même endroit." }, { html: "Deux : coude haut et coude bas", juste: true }, { html: "Une infinité", aide: "Avec deux pivots et une position imposée, les solutions sont isolées." }], { colonnes: 1, ok: function () {
        j.bravo("Même position, deux configurations : il faut choisir.");
        j.expliquer("<p>C'est le défi de la multiplicité : on choisit le jeu d'angles adapté à l'environnement (zone stérile, équipement, obstacles).</p>");
        j.suite();
      } });
    } },
    { nom: "Deux méthodes", jouer: function (j, n) {
      j.titre("Associe chaque méthode de résolution à ce qui la caractérise.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:auto 1fr;gap:8px 12px;align-items:center;font-size:17px"><span>Analytique</span><span class="trou" data-attendu="a" style="min-width:320px"></span><span>Numérique</span><span class="trou" data-attendu="n" style="min-width:320px"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "n", html: "générale, une seule solution, convergence non garantie" }, { id: "a", html: "exacte, rapide, toutes les solutions, pas de méthode générale" }],
        aide: "L'analytique utilise la géométrie du robot : elle est exacte mais propre à chaque robot.",
        ok: function () {
          j.bravo("Analytique : exacte ; numérique : générale.");
          j.suite();
        }
      });
    } },
    { nom: "Newton-Raphson", jouer: function (j, n) {
      j.titre("La méthode de Newton-Raphson part d'une estimation \\(q_k\\) et la corrige. Avec quoi ?");
      j.choix([
        { tex: "q_{k+1} = q_k + J^{-1}(q_k)\\,\\big(X_{cible} - f(q_k)\\big)", juste: true },
        { tex: "q_{k+1} = q_k + f(q_k)", aide: "La correction doit dépendre de l'écart entre la cible et la position actuelle." },
        { tex: "q_{k+1} = X_{cible} - f(q_k)", aide: "\\(X_{cible} - f(q_k)\\) est un écart de position, pas des angles : il faut le traduire avec la jacobienne." }
      ], { colonnes: 1, ok: function () {
        j.bravo("La jacobienne linéarise la MGD autour de \\(q_k\\).");
        j.expliquer("<p>On itère jusqu'à ce que l'écart soit petit. La méthode marche pour tout robot, mais ne trouve qu'une solution et peut ne pas converger.</p>");
        j.suite();
      } });
    } }
  ]
});
})();
