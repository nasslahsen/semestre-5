/* Niveau : révision du TD 1. Les mêmes idées sur des cas nouveaux : classer, précision, 3R, espace de travail. */
NIVEAU({
  id: "revision-td1",
  init: function (fig) {
    var C = D.C, pl = D.plan(fig.svg, [180, 450], 6);
    var n = { L: [30, 20, 10], t: [90, -90, 0], anneau: null, point: null };
    n.dessin = function () {
      pl.vider(); pl.grille({ pas: 10, fort: 50 });
      pl.axes({ lx: [-25, 75], ly: [-10, 65] });
      [10, 20, 30, 40, 50, 60].forEach(function (k) { D.texte(pl.fond, String(k), pl.P([k, -4]), { coul: C.gris, taille: 13, gras: false, mono: true }); D.texte(pl.fond, String(k), pl.P([-5, k]), { coul: C.gris, taille: 13, gras: false, mono: true }); });
      if (n.anneau) {
        D.rond(pl.fond, pl.P([0, 0]), n.anneau[1] * pl.u, { fill: "rgba(59,91,219,.08)", stroke: C.acc, ep: 2, tirets: "6 6" });
        D.rond(pl.fond, pl.P([0, 0]), n.anneau[0] * pl.u, { fill: "#fff", stroke: C.acc, ep: 2, tirets: "6 6" });
      }
      if (n.point) D.rond(pl.fond, pl.P(n.point), 8, { fill: "#fde7e6", stroke: C.ko, ep: 2.5 });
      var p = [0, 0], a = 0, coul = [C.encre, C.v, C.y];
      for (var i = 0; i < n.L.length; i++) {
        a += n.t[i] * D.DEG;
        var q = [p[0] + n.L[i] * Math.cos(a), p[1] + n.L[i] * Math.sin(a)];
        D.ligne(pl.fig, pl.P(p), pl.P(q), coul[i], 14 - 2 * i);
        D.rond(pl.haut, pl.P(p), 9, { fill: "#fff", stroke: C.encre, ep: 3 });
        p = q;
      }
      n.P = p;
      D.rond(pl.haut, pl.P(p), 9, { fill: C.jeu, stroke: "#fff", ep: 3 });
      D.texte(pl.haut, "P", [pl.P(p)[0] + 18, pl.P(p)[1] - 14], { coul: C.jeu });
    };
    n.pl = pl;
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Un nouveau robot", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Une plateforme de Stewart positionne le patient en radiothérapie : six actionneurs portent ensemble le plateau. Son architecture cinématique ?");
      j.choix([{ html: "Sérielle", aide: "En série, chaque segment porte le suivant. Ici, six actionneurs portent le même plateau." }, { html: "Parallèle", juste: true }, { html: "Mobile", aide: "La mobilité est un autre critère. On te demande l'architecture." }], { ok: function () {
        j.bravo("Parallèle : chaîne fermée, comme le Delta.");
        j.expliquer("<p>Pour un patient, ses atouts comptent : rigidité, précision et répétabilité. Son petit espace de travail suffit pour de petits ajustements.</p>");
        j.suite();
      } });
    } },
    { nom: "Précis ou répétable ?", jouer: function (j, n) {
      j.titre("Cinq positionnements du même patient : écart de 0,1 mm entre eux, mais tous à 2 mm de la position prévue. Diagnostic ?");
      j.choix([
        { html: "Bonne répétabilité, mauvaise précision", juste: true },
        { html: "Bonne précision, mauvaise répétabilité", aide: "0,1 mm entre les poses : elles sont très groupées. Regarde plutôt l'écart à la position prévue." },
        { html: "Les deux sont bonnes", aide: "2 mm de la position prévue, à chaque fois : c'est un écart à la cible." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Groupé mais décalé : le cas B du cours.");
        j.expliquer("<p>Un écart constant se corrige en recalant le robot ; une dispersion ne se corrige pas aussi simplement.</p>");
        j.suite();
      } });
    } },
    { nom: "Un autre 3R", jouer: function (j, n) {
      j.fig.astuce("Robot 3R : L₁ = 30, L₂ = 20, L₃ = 10 cm.");
      j.titre("\\(L_1 = 30\\), \\(L_2 = 20\\), \\(L_3 = 10\\) cm, \\(\\theta_1 = 90°\\), \\(\\theta_2 = -90°\\), \\(\\theta_3 = 0°\\). Où est P ?");
      j.nombre({ avant: "(p_x \\,;\\ p_y) =", apres: "\\text{cm}", cases: [{ attendu: 30, tol: 0.05 }, { attendu: 30, tol: 0.05 }],
        aide: function (k) { return k === 0 ? "\\(c_1 = \\cos 90° = 0\\), \\(c_{12} = \\cos 0° = 1\\), \\(c_{123} = 1\\)." : "\\(s_1 = 1\\), \\(s_{12} = \\sin 0° = 0\\), \\(s_{123} = 0\\)."; },
        ok: function () {
          j.bravo("\\(P = (30 \\,;\\ 30)\\) cm, et \\(\\varphi = 0°\\).", n.pl.P(n.P));
          j.expliquer("\\[ p_x = 30 \\times 0 + 20 \\times 1 + 10 \\times 1 = 30 \\qquad p_y = 30 \\times 1 + 20 \\times 0 + 10 \\times 0 = 30 \\]");
          j.suite();
        } });
    } },
    { nom: "Trop près", jouer: function (j, n) {
      n.L = [40, 35]; n.t = [60, -150]; n.anneau = [5, 75]; n.point = [2, 2]; n.dessin();
      j.fig.astuce("Bras 2R de l'échographie : L₁ = 40, L₂ = 35 cm.");
      j.titre("Le bras de l'échographie peut-il placer la sonde à 3 cm de sa base ?");
      j.choix([{ html: "Oui", aide: "Bras complètement replié, la sonde reste à \\(|L_1 - L_2|\\) de la base." }, { html: "Non", juste: true }], { ok: function () {
        j.bravo("Non : il ne descend pas sous \\(|L_1 - L_2| = 5\\) cm.");
        j.expliquer("<p>L'espace de travail a deux bords : un rayon maximal \\(L_1 + L_2\\) et un rayon minimal \\(|L_1 - L_2|\\).</p>");
        j.suite();
      } });
    } }
  ]
});
