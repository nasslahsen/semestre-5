/* Niveau : TD 1, partie 2, exercice 1. Robot plan 3R, convention de Denavit–Hartenberg du TD (alpha_i = 0, r_i = 0, d_i = L_i). */
NIVEAU({
  id: "td1-dh",
  init: function (fig) {
    var C = D.C, pl = D.plan(fig.svg, [160, 440], 52);
    var n = { t: [20, 35, 40], L: [4, 3, 2] };
    var b = fig.bande("");
    n.dessin = function () {
      pl.vider(); pl.grille({ pas: 1, fort: 5 });
      pl.axes({ lx: [-2.5, 9.5], ly: [-1.4, 7.6] });
      var p = [0, 0], a = 0, coul = [C.encre, C.v, C.y];
      for (var i = 0; i < 3; i++) {
        var a0 = a; a += n.t[i] * D.DEG;
        var q = [p[0] + n.L[i] * Math.cos(a), p[1] + n.L[i] * Math.sin(a)];
        if (i > 0) D.ligne(pl.fond, pl.P(p), pl.P([p[0] + 1.2 * Math.cos(a0), p[1] + 1.2 * Math.sin(a0)]), C.gris, 2, "4 4");
        D.ligne(pl.fig, pl.P(p), pl.P(q), coul[i], 14 - 2 * i);
        pl.arc(pl.fig, p, 40, a0 / D.DEG, a / D.DEG, C.jeu, "θ" + "₁₂₃"[i]);
        D.rond(pl.haut, pl.P(p), 9, { fill: "#fff", stroke: C.encre, ep: 3 });
        p = q;
      }
      n.P = p;
      D.rond(pl.haut, pl.P(p), 9, { fill: C.jeu, stroke: "#fff", ep: 3 });
      D.texte(pl.haut, "P", [pl.P(p)[0] + 18, pl.P(p)[1] - 14], { coul: C.jeu });
      b.innerHTML = ""; E.k(b, "d_i = L_i \\qquad \\alpha_i = 0 \\qquad r_i = 0 \\qquad \\theta_i \\text{ variable}");
    };
    n.pl = pl;
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "T(0,1)", jouer: function (j, n) {
      j.fig.astuce("Tableau DH du TD sous la figure.");
      j.titre("Question 1. Complète la dernière colonne de \\(T^{0,1}\\).");
      j.consigne("Matrice de l'énoncé avec \\(\\alpha_1 = 0\\), \\(r_1 = 0\\), \\(d_1 = L_1\\).");
      var z = j.zone("", '<div style="display:flex;align-items:center;gap:14px;font-size:20px">\\(T^{0,1} = \\begin{pmatrix} \\cos\\theta_1 & -\\sin\\theta_1 & 0 \\\\ \\sin\\theta_1 & \\cos\\theta_1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix}\\)<div style="display:grid;gap:6px"><span class="trou" data-attendu="c" style="min-width:150px"></span><span class="trou" data-attendu="s" style="min-width:150px"></span><span class="trou" data-attendu="z" style="min-width:150px"></span><span style="text-align:center">\\(1\\)</span></div></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "s", tex: "L_1\\sin\\theta_1" }, { id: "l", tex: "L_1" }, { id: "z", tex: "0" }, { id: "c", tex: "L_1\\cos\\theta_1" }],
        aide: "4e colonne de l'énoncé : \\(d_i\\cos\\theta_i\\), \\(d_i\\sin\\theta_i\\), \\(r_i\\).",
        ok: function () {
          j.bravo("L'origine de \\(R_1\\) est au bout du segment 1, vue depuis \\(R_0\\).");
          j.expliquer("<p>\\(T^{1,2}\\) et \\(T^{2,3}\\) ont la même forme, avec \\(\\theta_2, L_2\\) puis \\(\\theta_3, L_3\\).</p>");
          j.suite();
        }
      });
    } },
    { nom: "T(1,2)", jouer: function (j, n) {
      j.titre("Dans \\(T^{1,2}\\), quel angle apparaît dans les cosinus et les sinus ?");
      j.choix([{ tex: "\\theta_2", juste: true }, { tex: "\\theta_1 + \\theta_2", aide: "\\(T^{1,2}\\) passe de \\(R_1\\) à \\(R_2\\) : seule la 2e articulation compte. La somme n'apparaît qu'après le produit." }, { tex: "\\theta_1", aide: "\\(\\theta_1\\) est déjà dans \\(T^{0,1}\\)." }], { ok: function () {
        j.bravo("Chaque matrice élémentaire ne contient que sa propre articulation.");
        j.expliquer("\\[ T^{1,2} = \\begin{pmatrix} \\cos\\theta_2 & -\\sin\\theta_2 & 0 & L_2\\cos\\theta_2 \\\\ \\sin\\theta_2 & \\cos\\theta_2 & 0 & L_2\\sin\\theta_2 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix} \\]");
        j.suite();
      } });
    } },
    { nom: "T(0,3)", jouer: function (j, n) {
      j.titre("Question 2. Complète \\(p_y\\), la 2e ligne de la dernière colonne de \\(T^{0,3}\\).");
      j.consigne("\\(s_{12} = \\sin(\\theta_1 + \\theta_2)\\), \\(s_{123} = \\sin(\\theta_1 + \\theta_2 + \\theta_3)\\).");
      var z = j.zone("", '<div style="display:flex;align-items:center;gap:8px;font-size:21px;flex-wrap:wrap">\\(p_y = L_1\\)<span class="trou" data-attendu="a" style="min-width:80px"></span>\\(+\\ L_2\\)<span class="trou" data-attendu="b" style="min-width:80px"></span>\\(+\\ L_3\\)<span class="trou" data-attendu="c" style="min-width:90px"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", tex: "s_{123}" }, { id: "x", tex: "s_3" }, { id: "a", tex: "s_1" }, { id: "b", tex: "s_{12}" }],
        aide: "Chaque segment est orienté par la somme des angles qui le précèdent, lui compris.",
        ok: function () {
          j.bravo("\\(p_y = L_1 s_1 + L_2 s_{12} + L_3 s_{123}\\).");
          j.expliquer("\\[ T^{0,3} = \\begin{pmatrix} c_{123} & -s_{123} & 0 & L_1 c_1 + L_2 c_{12} + L_3 c_{123} \\\\ s_{123} & c_{123} & 0 & L_1 s_1 + L_2 s_{12} + L_3 s_{123} \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix} \\]");
          j.suite();
        }
      });
    } },
    { nom: "L'orientation", jouer: function (j, n) {
      j.titre("Question 3. Sur la figure, \\(\\theta_1 = 20°\\), \\(\\theta_2 = 35°\\), \\(\\theta_3 = 40°\\). Quel est l'angle \\(\\varphi\\) de l'outil par rapport à \\(R_0\\) ?");
      j.nombre({ avant: "\\varphi =", apres: "°", cases: [{ attendu: 95, tol: 0.01 }],
        aide: function () { return "Le bloc de rotation de \\(T^{0,3}\\) est une rotation d'angle \\(\\theta_1 + \\theta_2 + \\theta_3\\)."; },
        ok: function () {
          j.bravo("\\(\\varphi = 20 + 35 + 40 = 95°\\).", n.pl.P(n.P));
          j.expliquer("<p>On lit \\(\\varphi\\) dans le bloc de rotation : \\(\\cos\\varphi = c_{123}\\), \\(\\sin\\varphi = s_{123}\\).</p>");
          j.suite();
        } });
    } },
    { nom: "Tout à zéro", jouer: function (j, n) {
      n.t = [0, 0, 0]; n.dessin();
      j.titre("Question 4. Pour \\(\\theta_1 = \\theta_2 = \\theta_3 = 0\\), que valent \\(p_x\\), \\(p_y\\) et \\(\\varphi\\) ?");
      j.choix([
        { tex: "p_x = L_1 + L_2 + L_3,\\ p_y = 0,\\ \\varphi = 0", juste: true },
        { tex: "p_x = 0,\\ p_y = L_1 + L_2 + L_3,\\ \\varphi = 90°", aide: "Tous les angles sont nuls : les segments sont alignés sur \\(x_0\\), pas sur \\(y_0\\)." },
        { tex: "p_x = L_3,\\ p_y = 0,\\ \\varphi = 0", aide: "Les translations se cumulent : \\(\\cos 0 = 1\\) pour les trois termes." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Bras tendu le long de \\(x_0\\).");
        j.expliquer("<p>Interprétation : les trois segments sont alignés sur \\(x_0\\), l'outil regarde dans le sens de \\(x_0\\). C'est le point le plus loin que le bras peut atteindre dans cette direction.</p>");
        j.suite();
      } });
    } }
  ]
});
