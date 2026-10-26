/* Niveau : TD 1, la méthode (page « TD 1 : les réponses dans le cours ») : matrice DH du TD, étapes du MGD, angle absolu, espace de travail. */
NIVEAU({
  id: "td1",
  init: function (fig) {
    var C = D.C, pl = D.plan(fig.svg, [190, 430], 55);
    var n = { t: [25, 30, 35], L: [4, 3, 2], anneau: null };
    n.dessin = function () {
      pl.vider(); pl.grille({ pas: 1, fort: 5 });
      pl.axes({ lx: [-3, 8.5], ly: [-1.4, 7.4] });
      if (n.anneau) {
        D.rond(pl.fond, pl.P([0, 0]), n.anneau[1] * pl.u, { fill: "rgba(59,91,219,.08)", stroke: C.acc, ep: 2, tirets: "6 6" });
        D.rond(pl.fond, pl.P([0, 0]), n.anneau[0] * pl.u, { fill: "#fff", stroke: C.acc, ep: 2, tirets: "6 6" });
      }
      var p = [0, 0], a = 0, coul = [C.encre, C.v, C.y];
      for (var i = 0; i < n.L.length; i++) {
        a += n.t[i] * D.DEG;
        var q = [p[0] + n.L[i] * Math.cos(a), p[1] + n.L[i] * Math.sin(a)];
        D.ligne(pl.fig, pl.P(p), pl.P(q), coul[i], 14 - 2 * i);
        D.rond(pl.haut, pl.P(p), 9, { fill: "#fff", stroke: C.encre, ep: 3 });
        D.texte(pl.haut, "L" + "₁₂₃"[i], [pl.P([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2])[0] - 24 * Math.sin(a), pl.P([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2])[1] - 24 * Math.cos(a)], { coul: coul[i], taille: 18 });
        p = q;
      }
      D.rond(pl.haut, pl.P(p), 9, { fill: C.jeu, stroke: "#fff", ep: 3 });
      D.texte(pl.haut, "P", [pl.P(p)[0] + 18, pl.P(p)[1] - 14], { coul: C.jeu });
      fig.chip(n.L.length === 3 ? "θ₁ = " + n.t[0] + "°   θ₂ = " + n.t[1] + "°   θ₃ = " + n.t[2] + "°" : "θ₁ = " + n.t[0] + "°   θ₂ = " + n.t[1] + "°");
    };
    n.pl = pl;
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "La matrice du TD", jouer: function (j, n) {
      j.fig.astuce("Le robot plan 3R du TD : tous les axes z vers toi.");
      j.titre("Dans le tableau du TD, \\(\\alpha_i = 0\\) et \\(r_i = 0\\). Que devient la matrice \\(T^{i-1,i}\\) ?");
      j.consigne("Remplace \\(\\cos\\alpha_i\\) par 1 et \\(\\sin\\alpha_i\\) par 0 dans la matrice de l'énoncé.");
      j.choix([
        { tex: "\\begin{pmatrix} \\cos\\theta_i & -\\sin\\theta_i & 0 & L_i\\cos\\theta_i \\\\ \\sin\\theta_i & \\cos\\theta_i & 0 & L_i\\sin\\theta_i \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}", juste: true },
        { tex: "\\begin{pmatrix} \\cos\\theta_i & -\\sin\\theta_i & 0 & L_i \\\\ \\sin\\theta_i & \\cos\\theta_i & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}", aide: "Regarde la 4e colonne de l'énoncé : \\(d_i\\cos\\theta_i\\) et \\(d_i\\sin\\theta_i\\), avec \\(d_i = L_i\\)." },
        { tex: "\\begin{pmatrix} \\cos\\theta_i & 0 & \\sin\\theta_i & L_i\\cos\\theta_i \\\\ \\sin\\theta_i & 0 & -\\cos\\theta_i & L_i\\sin\\theta_i \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}", aide: "Ça, c'est \\(\\alpha_i = 90°\\). Avec \\(\\alpha_i = 0\\), \\(\\cos\\alpha_i = 1\\) et \\(\\sin\\alpha_i = 0\\)." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Une rotation de \\(\\theta_i\\) autour de z, puis \\(L_i\\) le long du nouvel axe x.");
        j.expliquer("<p>La 4e colonne \\((L_i\\cos\\theta_i \\,;\\ L_i\\sin\\theta_i \\,;\\ 0)\\) place l'origine du repère suivant au bout du segment \\(i\\), exprimée dans le repère \\(R_{i-1}\\).</p>");
        j.suite();
      } });
    } },
    { nom: "La méthode", jouer: function (j, n) {
      j.titre("Remets dans l'ordre les étapes du modèle géométrique direct.");
      var z = j.zone("", '<div style="display:grid;gap:8px;font-size:18px">' + [1, 2, 3, 4].map(function (k) { return '<div style="display:flex;align-items:center;gap:10px"><b>' + k + '.</b><span class="trou" data-attendu="' + "abcd"[k - 1] + '" style="min-width:420px"></span></div>'; }).join("") + "</div>");
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "écrire les matrices élémentaires" }, { id: "a", html: "placer les repères selon DH" }, { id: "d", html: "multiplier dans l'ordre, lire la 4e colonne" }, { id: "b", html: "remplir le tableau DH" }],
        aide: "Le tableau se lit sur les repères placés, et les matrices s'écrivent à partir du tableau.",
        ok: function () {
          j.bravo("Repères, tableau DH, matrices, produit.");
          j.expliquer("<p>C'est la méthode du chapitre 5. La position de l'organe terminal est la dernière colonne de \\(T^{0,n}\\).</p>");
          j.suite();
        }
      });
    } },
    { nom: "Pourquoi la somme ?", jouer: function (j, n) {
      n.L = [4, 3]; n.t = [40, 50]; n.dessin();
      j.fig.astuce("Bras 2R : le coude mesure θ₂ entre les deux segments.");
      j.titre("Le codeur du coude mesure \\(\\theta_2\\) entre les segments. Pourquoi le segment 2 fait-il l'angle \\(\\theta_1 + \\theta_2\\) avec \\(x_0\\) ?");
      j.choix([
        { html: "Parce que le segment 2 est porté par le segment 1 : quand l'épaule tourne, l'avant-bras tourne avec elle", juste: true },
        { html: "Parce que le codeur du coude mesure en réalité l'angle par rapport au sol", aide: "Le TD le rappelle : le codeur mesure un angle relatif, entre segment 1 et segment 2." },
        { html: "Parce que les deux moteurs tournent toujours du même angle", aide: "\\(\\theta_1\\) et \\(\\theta_2\\) sont indépendants : regarde la figure, 40° et 50°." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Les angles relatifs s'additionnent le long de la chaîne.");
        j.expliquer("<p>\\(\\theta_1 + \\theta_2\\) est l'orientation absolue du segment 2 par rapport au repère fixe. Pour le 3R : \\(\\varphi = \\theta_1 + \\theta_2 + \\theta_3\\).</p>");
        j.suite();
      } });
    } },
    { nom: "Espace de travail", jouer: function (j, n) {
      n.L = [3, 2]; n.t = [30, 60]; n.anneau = [1, 5]; n.dessin();
      j.fig.astuce("En bleu : les points que l'organe terminal peut atteindre.");
      j.titre("Un bras 2R a \\(L_1 = 30\\) cm et \\(L_2 = 20\\) cm. Entre quelles distances de la base peut-il travailler ?");
      j.nombre({ avant: "(d_{min} \\,;\\ d_{max}) =", apres: "\\text{cm}", cases: [{ attendu: 10, tol: 0.01 }, { attendu: 50, tol: 0.01 }],
        aide: function (k) { return k === 0 ? "Bras replié : les deux segments se superposent." : "Bras tendu : les deux longueurs s'ajoutent."; },
        ok: function () {
          j.bravo("De \\(|L_1 - L_2| = 10\\) cm à \\(L_1 + L_2 = 50\\) cm.");
          j.expliquer("<p>\\(L_1 + L_2\\) est le rayon maximal. Un point plus loin est hors d'atteinte, quels que soient les angles.</p>");
          j.suite();
        } });
    } }
  ]
});
