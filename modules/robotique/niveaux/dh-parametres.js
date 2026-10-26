/* Niveau : les quatre paramètres de Denavit–Hartenberg et la matrice T(j-1,j). */
NIVEAU({
  id: "dh-parametres",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { surligne: null };
    n.dessin = function () {
      E.vider(g);
      var S = n.surligne;
      function c(k, base) { return S === k ? PLATEFORME.couleur() : base; }
      // schéma du cours : Z(j-1) vertical, normale commune, Z(j) incliné
      D.ligne(g, [150, 560], [150, 70], C.z, 3); D.texte(g, "Zⱼ₋₁", [112, 80], { coul: C.z, taille: 20 });
      D.fleche(g, [150, 470], [300, 520], C.x, 3); D.texte(g, "Xⱼ₋₁", [322, 528], { coul: C.x, taille: 18 });
      D.rond(g, [150, 470], 6, { fill: C.encre, stroke: "none" }); D.texte(g, "Oⱼ₋₁", [112, 478], { taille: 18 });
      D.ligne(g, [150, 330], [470, 270], c("d", C.x), S === "d" ? 5 : 2.5, "7 5");
      D.fleche(g, [470, 270], [600, 246], C.x, 4); D.texte(g, "Xⱼ", [618, 244], { coul: C.x, taille: 20 });
      D.ligne(g, [420, 420], [540, 110], C.z, 3); D.texte(g, "Zⱼ", [552, 100], { coul: C.z, taille: 20 });
      D.rond(g, [470, 270], 6, { fill: C.encre, stroke: "none" }); D.texte(g, "Oⱼ", [500, 300], { taille: 18 });
      D.ligne(g, [470, 270], [470, 130], C.gris, 2, "4 4");
      // paramètres
      D.ligne(g, [128, 470], [128, 330], c("r", C.doux), S === "r" ? 5 : 2.5); D.texte(g, "rⱼ", [100, 400], { coul: c("r", C.doux), taille: 20 });
      D.texte(g, "dⱼ", [310, 280], { coul: c("d", C.doux), taille: 20 });
      E.s("path", { d: "M470 200 A 70 70 0 0 1 495 205", fill: "none", stroke: c("a", C.doux), "stroke-width": S === "a" ? 5 : 2.5 }, g);
      D.texte(g, "αⱼ", [500, 180], { coul: c("a", C.doux), taille: 20 });
      D.ligne(g, [150, 470], [290, 440], C.gris, 2, "4 4");
      E.s("path", { d: "M250 505 A 100 100 0 0 0 245 450", fill: "none", stroke: c("t", C.doux), "stroke-width": S === "t" ? 5 : 2.5 }, g);
      D.texte(g, "θⱼ", [275, 480], { coul: c("t", C.doux), taille: 20 });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Carte d'identité", jouer: function (j, n) {
      j.fig.astuce("Passage du repère j − 1 au repère j.");
      j.titre("Associe chaque paramètre à sa définition.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:auto 1fr;gap:8px 12px;align-items:center;font-size:17px">' +
        [["\\(\\theta_j\\)", "t"], ["\\(r_j\\)", "r"], ["\\(d_j\\)", "d"], ["\\(\\alpha_j\\)", "a"]].map(function (x) { return "<span>" + x[0] + '</span><span class="trou" data-attendu="' + x[1] + '" style="min-width:330px"></span>'; }).join("") + "</div>");
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "d", html: "distance entre Zⱼ₋₁ et Zⱼ, le long de Xⱼ" }, { id: "a", html: "angle entre Zⱼ₋₁ et Zⱼ, autour de Xⱼ" }, { id: "t", html: "angle entre Xⱼ₋₁ et Xⱼ, autour de Zⱼ₋₁" }, { id: "r", html: "distance entre Xⱼ₋₁ et Xⱼ, le long de Zⱼ₋₁" }],
        aide: "Les deux paramètres « autour de Zⱼ₋₁ / le long de Zⱼ₋₁ » comparent les axes X ; les deux autres comparent les axes Z.",
        ok: function () {
          j.bravo("Deux angles, deux distances.");
          j.expliquer("<p>\\(\\theta_j\\) et \\(r_j\\) se lisent sur \\(Z_{j-1}\\) ; \\(d_j\\) et \\(\\alpha_j\\) se lisent sur \\(X_j\\).</p>");
          j.suite();
        }
      });
    } },
    { nom: "Lire la figure", jouer: function (j, n) {
      n.surligne = "d"; n.dessin();
      j.titre("Le paramètre surligné va de \\(Z_{j-1}\\) à \\(Z_j\\), le long de la normale commune. Lequel est-ce ?");
      j.choix([{ tex: "d_j", juste: true }, { tex: "r_j", aide: "\\(r_j\\) se mesure le long de \\(Z_{j-1}\\), verticalement sur le schéma." }, { tex: "\\theta_j", aide: "\\(\\theta_j\\) est un angle." }, { tex: "\\alpha_j", aide: "\\(\\alpha_j\\) est un angle." }], { colonnes: 4, ok: function () {
        j.bravo("\\(d_j\\) : distance entre les deux axes \\(Z\\).");
        j.suite();
      } });
    } },
    { nom: "L'ordre", jouer: function (j, n) {
      n.surligne = null; n.dessin();
      j.titre("Remets les quatre transformations dans l'ordre de la formule de \\(T^{j-1,j}\\).");
      var z = j.zone("", '<div style="display:flex;align-items:center;gap:6px;font-size:19px;flex-wrap:wrap">\\(T^{j-1,j} =\\)' + "abcd".split("").map(function (x) { return '<span class="trou" data-attendu="' + x + '" style="min-width:120px"></span>'; }).join("") + "</div>");
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", tex: "\\text{Trans}(x, d_j)" }, { id: "a", tex: "\\text{Rot}(z, \\theta_j)" }, { id: "d", tex: "\\text{Rot}(x, \\alpha_j)" }, { id: "b", tex: "\\text{Trans}(z, r_j)" }],
        aide: "D'abord tout ce qui se fait autour et le long de \\(Z_{j-1}\\), ensuite autour et le long de \\(X\\).",
        ok: function () {
          j.bravo("\\(\\text{Rot}(z,\\theta_j)\\,\\text{Trans}(z,r_j)\\,\\text{Trans}(x,d_j)\\,\\text{Rot}(x,\\alpha_j)\\).");
          j.expliquer("<p>L'ordre compte : le produit de matrices n'est pas commutatif.</p>");
          j.suite();
        }
      });
    } },
    { nom: "La 4e colonne", jouer: function (j, n) {
      j.titre("\\(\\theta_j = 90°\\), \\(r_j = 0\\), \\(d_j = 5\\), \\(\\alpha_j = 0\\). Que vaut la dernière colonne de \\(T^{j-1,j}\\) ?");
      j.consigne("Dernière colonne : \\((d_j\\cos\\theta_j \\,;\\ d_j\\sin\\theta_j \\,;\\ r_j)\\).");
      j.nombre({ avant: "\\begin{pmatrix} \\cdot \\\\ \\cdot \\\\ \\cdot \\end{pmatrix} =", cases: [{ attendu: 0, tol: 0.001 }, { attendu: 5, tol: 0.001 }, { attendu: 0, tol: 0.001 }],
        aide: function (k) { return k === 0 ? "\\(\\cos 90° = 0\\)." : k === 1 ? "\\(\\sin 90° = 1\\)." : "C'est \\(r_j\\)."; },
        ok: function () {
          j.bravo("\\((0 \\,;\\ 5 \\,;\\ 0)\\) : \\(O_j\\) est à 5 unités sur \\(Y_{j-1}\\).");
          j.suite();
        } });
    } },
    { nom: "Axes perpendiculaires", jouer: function (j, n) {
      n.surligne = "a"; n.dessin();
      j.titre("Si \\(\\alpha_j = 90°\\), que devient la 3e ligne de \\(T^{j-1,j}\\) ?");
      j.choix([
        { tex: "(0,\\ 1,\\ 0,\\ r_j)", juste: true },
        { tex: "(0,\\ 0,\\ 1,\\ r_j)", aide: "Ça, c'est \\(\\alpha_j = 0\\). La 3e ligne est \\((0,\\ \\sin\\alpha_j,\\ \\cos\\alpha_j,\\ r_j)\\)." },
        { tex: "(1,\\ 0,\\ 0,\\ r_j)", aide: "Le premier terme de la 3e ligne vaut toujours 0." }
      ], { ok: function () {
        j.bravo("\\(\\sin 90° = 1\\), \\(\\cos 90° = 0\\).");
        j.expliquer("<p>Avec \\(\\alpha_j = 90°\\), le nouvel axe \\(Z_j\\) est perpendiculaire à \\(Z_{j-1}\\). Avec \\(\\alpha_j = 0\\), les axes restent parallèles : le cas des bras plans.</p>");
        j.suite();
      } });
    } }
  ]
});
