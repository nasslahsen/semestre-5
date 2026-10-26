/* Niveau : pourquoi la convention de Denavit–Hartenberg, et ses deux règles de placement des repères. */
NIVEAU({
  id: "dh-convention",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { voir: { z: false, x: false, plan: false } };
    n.dessin = function () {
      E.vider(g);
      if (n.voir.plan) {
        // le 2R vu de dessus : axes z sortant de la page
        var A = [120, 470], B = [380, 330], P = [520, 130];
        D.ligne(g, A, B, "#e2a33a", 22); D.ligne(g, B, P, "#9fb3c8", 18);
        [A, B, P].forEach(function (p, k) {
          D.rond(g, p, 16, { fill: "#fff", stroke: C.z, ep: 3 }); D.rond(g, p, 4, { fill: C.z, stroke: "none" });
          D.texte(g, "z" + "₀₁₂"[k], [p[0] - 30, p[1] - 22], { coul: C.z, taille: 20 });
        });
        if (n.voir.x) { D.fleche(g, B, [B[0] + 120, B[1] - 65], C.x, 4); D.texte(g, "x₁ ?", [B[0] + 140, B[1] - 60], { coul: C.x, taille: 20 }); }
        D.texte(g, "axes z : sortent de la page", [340, 560], { coul: C.doux, taille: 17, gras: false });
        return;
      }
      // deux articulations, axes non parallèles
      E.s("rect", { x: 125, y: 210, width: 50, height: 120, rx: 10, fill: "#d9dde6", stroke: "#b9bfcc", "stroke-width": 2 }, g);
      E.s("rect", { x: 470, y: 160, width: 50, height: 120, rx: 10, fill: "#d9dde6", stroke: "#b9bfcc", "stroke-width": 2, transform: "rotate(25 495 220)" }, g);
      E.s("path", { d: "M175 260 C 260 180, 360 330, 470 230", fill: "none", stroke: "#e2a33a", "stroke-width": 26, "stroke-linecap": "round" }, g);
      D.texte(g, "articulation j", [150, 360], { taille: 17, coul: C.doux, gras: false });
      D.texte(g, "articulation j + 1", [520, 330], { taille: 17, coul: C.doux, gras: false });
      D.texte(g, "segment j", [320, 200], { taille: 18, coul: "#b07a1d" });
      if (n.voir.z) {
        D.ligne(g, [150, 80], [150, 520], C.z, 3); D.texte(g, "Zⱼ₋₁", [112, 90], { coul: C.z, taille: 20 });
        D.ligne(g, [430, 520], [560, 70], C.z, 3); D.texte(g, "Zⱼ", [585, 90], { coul: C.z, taille: 20 });
      }
      if (n.voir.x) {
        D.ligne(g, [150, 455], [462, 455], C.x, 2.5, "7 5");
        D.fleche(g, [462, 455], [600, 455], C.x, 4); D.texte(g, "Xⱼ", [615, 445], { coul: C.x, taille: 20 });
        D.texte(g, "normale commune", [305, 485], { coul: C.x, taille: 17 });
      }
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le problème", jouer: function (j, n) {
      j.titre("Le dossier patient, le logiciel de planification et le robot décrivent chacun la géométrie du bras à leur façon. Que se passe-t-il ?");
      j.choix([
        { html: "Leurs données ne sont pas compatibles : l'interopérabilité devient impossible", juste: true },
        { html: "Rien : la géométrie d'un robot est la même pour tous", aide: "Le robot est le même, mais chacun place ses repères où il veut : les nombres qui le décrivent changent." },
        { html: "Le robot devient moins précis", aide: "La précision vient du robot lui-même. Le problème est l'échange des données entre logiciels." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Sans convention commune, les descriptions ne se parlent pas.");
        j.expliquer("<p>Solution : Denavit et Hartenberg (1955) imposent où placer les repères. Chaque liaison est alors décrite par 4 paramètres au lieu de 6, dans un tableau que MATLAB, RoboDK ou CoppeliaSim lisent tous.</p>");
        j.suite();
      } });
    } },
    { nom: "Règle de Z", jouer: function (j, n) {
      j.fig.astuce("Le segment j relie l'articulation j à l'articulation j + 1.");
      j.titre("Le repère du segment \\(j\\) a son axe \\(Z_j\\) aligné avec l'axe de quelle articulation ?");
      j.choix([
        { html: "L'articulation \\(j + 1\\)", juste: true },
        { html: "L'articulation \\(j\\)", aide: "Piège classique : l'axe de l'articulation \\(j\\) porte déjà \\(Z_{j-1}\\)." },
        { html: "Le segment \\(j\\) lui-même", aide: "C'est un axe \\(X\\) qui suit la normale commune, pas l'axe \\(Z\\)." }
      ], { ok: function () {
        n.voir.z = true; n.dessin();
        j.bravo("\\(Z_j\\) : axe de mouvement de l'articulation \\(j + 1\\).", [495, 220]);
        j.suite();
      } });
    } },
    { nom: "Règle de X", jouer: function (j, n) {
      j.titre("Où place-t-on l'axe \\(X_j\\) ?");
      j.choix([
        { html: "Le long de la normale commune entre \\(Z_{j-1}\\) et \\(Z_j\\), dirigé de \\(Z_{j-1}\\) vers \\(Z_j\\)", juste: true },
        { html: "Le long de la normale commune, dirigé de \\(Z_j\\) vers \\(Z_{j-1}\\)", aide: "La direction compte : on va de l'axe précédent vers le suivant." },
        { html: "Parallèle à \\(Z_{j-1}\\)", aide: "\\(X_j\\) est perpendiculaire aux deux axes \\(Z\\) : c'est ce que fait la normale commune." }
      ], { colonnes: 1, ok: function () {
        n.voir.x = true; n.dessin();
        j.bravo("Normale commune, de \\(Z_{j-1}\\) vers \\(Z_j\\).");
        j.expliquer("<p>La normale commune est la droite perpendiculaire à la fois à \\(Z_{j-1}\\) et à \\(Z_j\\). L'origine \\(O_j\\) est là où elle coupe \\(Z_j\\).</p>");
        j.suite();
      } });
    } },
    { nom: "Le cas plan", jouer: function (j, n) {
      n.voir = { plan: true, x: true }; n.dessin();
      j.fig.astuce("Le 2R du cours vu de dessus : tous les axes z sortent de la page.");
      j.titre("Sur le robot plan 2R, où se trouve la normale commune entre \\(z_0\\) et \\(z_1\\), qui porte \\(x_1\\) ?");
      j.choix([
        { html: "Le long du segment 1, de \\(O_0\\) vers \\(O_1\\)", juste: true },
        { html: "Perpendiculaire à la page", aide: "C'est la direction des axes \\(z\\). La normale commune leur est perpendiculaire : elle est dans le plan." },
        { html: "Le long du segment 2", aide: "Le segment 2 relie \\(z_1\\) et \\(z_2\\) : il porte \\(x_2\\)." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Les normales communes se superposent aux segments.");
        j.expliquer("<p>Les axes \\(z\\) sont parallèles et sortent de la page ; la plus courte droite qui les relie est la ligne centrale du segment. Donc \\(x_1\\) suit le segment 1 et \\(x_2\\) le segment 2.</p>");
        j.suite();
      } });
    } },
    { nom: "La limite", jouer: function (j, n) {
      n.voir = { plan: false, z: true, x: true }; n.dessin();
      j.fig.astuce("");
      j.titre("Pour quels robots la convention DH présente-t-elle des ambiguïtés ?");
      j.choix([
        { html: "Les robots à structure fermée ou arborescente", juste: true },
        { html: "Les robots série à chaîne ouverte", aide: "C'est justement pour eux qu'elle a été développée." },
        { html: "Les robots plans", aide: "Le 2R plan se décrit sans difficulté : tu viens de le faire." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Structures fermées ou arborescentes.");
        j.expliquer("<p>La convention a été développée pour des structures ouvertes simples, un segment après l'autre. Un robot parallèle comme le Delta est en chaîne fermée : c'est là que le cours signale des ambiguïtés.</p>");
        j.suite();
      } });
    } }
  ]
});
