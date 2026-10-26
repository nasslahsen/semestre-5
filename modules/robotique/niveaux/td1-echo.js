/* Niveau : TD 1, partie 2, exercice 2 (questions 1 à 5). Robot 2R qui tient une sonde d'échographie : L1 = 40 cm, L2 = 35 cm. */
NIVEAU({
  id: "td1-echo",
  init: function (fig) {
    var C = D.C, pl = D.plan(fig.svg, [100, 505], 6.4);
    var n = { t1: 30, t2: 45, L1: 40, L2: 35, cible: null, erreur: false, anneau: false, loin: null };
    n.M = function (t1, t2) { t1 = (t1 === undefined ? n.t1 : t1) * D.DEG; t2 = (t2 === undefined ? n.t2 : t2) * D.DEG; return [n.L1 * Math.cos(t1) + n.L2 * Math.cos(t1 + t2), n.L1 * Math.sin(t1) + n.L2 * Math.sin(t1 + t2)]; };
    n.dessin = function () {
      pl.vider(); pl.grille({ pas: 10, fort: 50 });
      pl.axes({ lx: [-12, 88], ly: [-8, 76] });
      [10, 20, 30, 40, 50, 60, 70].forEach(function (k) { D.texte(pl.fond, String(k), pl.P([k, -4]), { coul: C.gris, taille: 13, gras: false, mono: true }); D.texte(pl.fond, String(k), pl.P([-5, k]), { coul: C.gris, taille: 13, gras: false, mono: true }); });
      if (n.anneau) {
        D.rond(pl.fond, pl.P([0, 0]), (n.L1 + n.L2) * pl.u, { fill: "rgba(59,91,219,.08)", stroke: C.acc, ep: 2, tirets: "6 6" });
        D.rond(pl.fond, pl.P([0, 0]), Math.abs(n.L1 - n.L2) * pl.u, { fill: "#fff", stroke: C.acc, ep: 2, tirets: "6 6" });
      }
      if (n.loin) { D.rond(pl.fond, pl.P(n.loin), 10, { fill: "#fde7e6", stroke: C.ko, ep: 2.5 }); D.texte(pl.fond, "80 cm", [pl.P(n.loin)[0] - 8, pl.P(n.loin)[1] - 22], { coul: C.ko, taille: 16 }); }
      if (n.cible) { var q = pl.P(n.cible); D.rond(pl.fond, q, 16, { fill: PLATEFORME.teinte(.12), stroke: C.jeu, ep: 2.5, tirets: "5 5" }); D.texte(pl.fond, "cible", [q[0] + 22, q[1] - 18], { coul: C.jeu, taille: 16, ancre: "start" }); }
      var a = n.t1 * D.DEG, A = [n.L1 * Math.cos(a), n.L1 * Math.sin(a)], M = n.M();
      D.ligne(pl.fig, pl.P([0, 0]), pl.P(A), C.encre, 14);
      D.ligne(pl.fig, pl.P(A), pl.P(M), C.v, 12);
      pl.arc(pl.fig, [0, 0], 50, 0, n.t1, C.jeu, "θ₁");
      D.ligne(pl.fig, pl.P(A), pl.P([A[0] + 14 * Math.cos(a), A[1] + 14 * Math.sin(a)]), C.gris, 2, "4 4");
      pl.arc(pl.fig, A, 42, n.t1, n.t1 + n.t2, C.jeu, "θ₂");
      if (n.erreur && n.cible) D.fleche(pl.haut, pl.P(M), pl.P(n.cible), C.ko, 3);
      D.rond(pl.haut, pl.P([0, 0]), 10, { fill: "#fff", stroke: C.encre, ep: 3 });
      D.rond(pl.haut, pl.P(A), 9, { fill: "#fff", stroke: C.encre, ep: 3 });
      D.rond(pl.haut, pl.P(M), 9, { fill: C.jeu, stroke: "#fff", ep: 3 });
      D.texte(pl.haut, "sonde", [pl.P(M)[0] - 16, pl.P(M)[1] + 4], { coul: C.jeu, taille: 16, ancre: "end" });
      fig.chip("θ₁ = " + n.t1 + "°   θ₂ = " + n.t2 + "°");
    };
    n.pl = pl;
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "La procédure", jouer: function (j, n) {
      j.fig.astuce("L₁ = 40 cm, L₂ = 35 cm. Unités : cm.");
      j.titre("Question 1. Avant les formules de x et y, quelle est la procédure du MGD ? Remets les étapes dans l'ordre.");
      var z = j.zone("", '<div style="display:grid;gap:8px;font-size:18px">' + [1, 2, 3, 4].map(function (k) { return '<div style="display:flex;align-items:center;gap:10px"><b>' + k + '.</b><span class="trou" data-attendu="' + "abcd"[k - 1] + '" style="min-width:420px"></span></div>'; }).join("") + "</div>");
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "écrire les matrices élémentaires" }, { id: "a", html: "placer les repères selon DH" }, { id: "d", html: "multiplier dans l'ordre, lire la 4e colonne" }, { id: "b", html: "remplir le tableau DH" }],
        aide: "Le tableau se lit sur les repères placés, et les matrices s'écrivent à partir du tableau.",
        ok: function () {
          j.bravo("Repères, tableau DH, matrices, produit.");
          j.expliquer("<p>Le résultat est le modèle de l'énoncé : \\(x = L_1\\cos\\theta_1 + L_2\\cos(\\theta_1 + \\theta_2)\\), \\(y = L_1\\sin\\theta_1 + L_2\\sin(\\theta_1 + \\theta_2)\\).</p>");
          j.suite();
        }
      });
    } },
    { nom: "L'angle du coude", jouer: function (j, n) {
      j.titre("Question 2. Que représente \\(\\theta_1 + \\theta_2\\) par rapport au repère fixe de la base ?");
      j.choix([
        { html: "L'angle entre le segment 2 et l'axe \\(x_0\\) : l'orientation absolue de l'avant-bras", juste: true },
        { html: "L'angle entre le segment 1 et le segment 2", aide: "Ça, c'est \\(\\theta_2\\) seul, ce que mesure le codeur du coude." },
        { html: "L'angle entre le segment 1 et l'axe \\(x_0\\)", aide: "Ça, c'est \\(\\theta_1\\) seul." }
      ], { colonnes: 1, ok: function () {
        j.bravo("L'orientation du segment 2 dans \\(R_0\\).");
        j.expliquer("<p>En une phrase : le coude est porté par le bras supérieur, donc quand l'épaule tourne de \\(\\theta_1\\), tout l'avant-bras tourne aussi de \\(\\theta_1\\), et son angle avec \\(x_0\\) devient \\(\\theta_1 + \\theta_2\\).</p>");
        j.suite();
      } });
    } },
    { nom: "Où est la sonde ?", jouer: function (j, n) {
      j.titre("Question 3. \\(\\theta_1 = 30°\\), \\(\\theta_2 = 45°\\). Où se trouve la sonde ? (en cm, 2 décimales)");
      j.nombre({ avant: "(x \\,;\\ y) =", apres: "\\text{cm}", cases: [{ attendu: 43.70, tol: 0.06 }, { attendu: 53.81, tol: 0.06 }],
        aide: function (k) { return k === 0 ? "\\(40\\cos 30° + 35\\cos 75°\\), avec \\(\\cos 75° \\approx 0{,}2588\\)." : "\\(40\\sin 30° + 35\\sin 75°\\), avec \\(\\sin 75° \\approx 0{,}9659\\)."; },
        ok: function () {
          j.bravo("\\((43{,}70 \\,;\\ 53{,}81)\\) cm.", n.pl.P(n.M()));
          j.expliquer("\\[ x = 34{,}64 + 9{,}06 = 43{,}70 \\text{ cm} \\qquad y = 20{,}00 + 33{,}81 = 53{,}81 \\text{ cm} \\]");
          j.suite();
        } });
    } },
    { nom: "Le vecteur erreur", jouer: function (j, n) {
      n.cible = [45, 50]; n.erreur = true; n.dessin();
      j.titre("Question 4. La cible est en \\((45 \\,;\\ 50)\\) cm. Calcule le vecteur erreur à corriger, cible moins sonde.");
      j.nombre({ avant: "(\\Delta x \\,;\\ \\Delta y) =", apres: "\\text{cm}", cases: [{ attendu: 1.30, tol: 0.06 }, { attendu: -3.81, tol: 0.06 }],
        aide: function (k) { return k === 0 ? "\\(\\Delta x = 45 - 43{,}70\\)." : "\\(\\Delta y = 50 - 53{,}81\\) : la sonde est trop haute, le signe est négatif."; },
        ok: function () {
          j.bravo("\\((1{,}30 \\,;\\ -3{,}81)\\) cm : la sonde n'est pas sur la cible.");
          j.expliquer("<p>Il faut avancer de 1,30 cm en x et descendre de 3,81 cm en y. Distance à corriger : \\(\\sqrt{1{,}30^2 + 3{,}81^2} \\approx 4{,}03\\) cm.</p>");
          j.suite();
        } });
    } },
    { nom: "À 80 cm ?", jouer: function (j, n) {
      n.cible = null; n.erreur = false; n.anneau = true; n.loin = [80, 0]; n.dessin();
      j.fig.astuce("En bleu : l'espace de travail accessible.");
      j.titre("Question 5. Le médecin veut examiner une zone à 80 cm de la base. Le robot peut-il l'atteindre ?");
      j.choix([
        { html: "Non : le rayon maximal est \\(L_1 + L_2 = 75\\) cm < 80 cm", juste: true },
        { html: "Oui, en choisissant bien \\(\\theta_1\\) et \\(\\theta_2\\)", aide: "Bras tendu, la sonde est au plus à \\(L_1 + L_2\\) de la base. Aucun angle ne fait mieux." },
        { html: "Oui, car 80 cm est plus grand que \\(|L_1 - L_2|\\)", aide: "\\(|L_1 - L_2|\\) est la distance minimale. Compare aussi au maximum." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Non : 80 > 75 cm.");
        j.expliquer("<p>Espace de travail accessible : les points à une distance de la base comprise entre \\(|L_1 - L_2| = 5\\) cm et \\(L_1 + L_2 = 75\\) cm. La zone demandée est hors d'atteinte : il faut déplacer la base ou le patient.</p>");
        j.suite();
      } });
    } }
  ]
});
