/* Niveau : l'hémogramme (4.1, 4.5) : indices calculés, mesuré ou calculé, histogramme et IDR, unités. */
NIVEAU(LABO.rejouable({
  id: "hemogramme",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "mesure", "calcul"], ST = { mesure: { t: "mesuré", f: C.jeuPale, b: C.jeu }, calcul: { t: "calculé", f: C.accPale, b: C.acc } };
    n.ITEMS = [["GR (RBC)", "mesure"], ["Ht (HCT)", "calcul"], ["VGM (MCV)", "mesure"], ["TCMH (MCH)", "calcul"], ["Hb (HGB)", "mesure"], ["CCMH (MCHC)", "calcul"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 40 + Math.floor(i / 2) * 180, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 150, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 22, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 150, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    n.feuille = function (lignes) {
      A.vider(g);
      lignes.forEach(function (r, i) {
        A.boite(g, 90, 70 + i * 120, 500, 96, { fond: "#fff", bord: r[2] ? C.jeu : C.encre, ep: r[2] ? 4 : 2.5, rx: 14 });
        A.texte(g, r[0], [210, 118 + i * 120], { taille: 26, gras: 800 });
        A.texte(g, r[1], [440, 118 + i * 120], { taille: 26, gras: 800, coul: r[2] ? C.jeu : C.encre });
      });
    };
    return n;
  },
  etapes: [
    { nom: "L'hématocrite", jouer: function (j, n) {
      n.feuille([["GR", "4,2 × 10¹²/L"], ["VGM", "95 fL"], ["Ht", "?", true]]);
      j.titre("L'automate a compté 4,2 × 10¹²/L globules rouges de volume moyen 95 fL. Quel hématocrite calcule-t-il ?");
      j.nombre({ avant: "\\text{Ht} =", apres: "\\%", cases: [{ attendu: 39.9, tol: 0.05 }],
        aide: function () { return "Ht (%) = GR × VGM / 10, avec les unités du cours."; },
        ok: function () { j.bravo("39,9 %."); j.expliquer("<p>\\(\\text{Ht} = 4{,}2 \\times 95 / 10 = 39{,}9\\) % : la part du volume sanguin occupée par les globules rouges.</p>"); j.suite(); } });
    } },
    { nom: "La TCMH", jouer: function (j, n) {
      n.feuille([["Hb", "12,6 g/dL"], ["GR", "4,2 × 10¹²/L"], ["TCMH", "?", true]]);
      j.titre("Même patient : hémoglobine 12,6 g/dL. Quelle est la teneur corpusculaire moyenne en hémoglobine ?");
      j.nombre({ avant: "\\text{TCMH} =", apres: "\\text{pg}", cases: [{ attendu: 30, tol: 0.05 }],
        aide: function () { return "TCMH (pg) = Hb × 10 / GR : la quantité d'hémoglobine par globule."; },
        ok: function () { j.bravo("30 pg par globule rouge."); j.suite(); } });
    } },
    { nom: "Mesuré ou calculé ?", jouer: function (j, n) {
      n.classer();
      j.titre("Sur la feuille, certains paramètres sont mesurés par l'automate, d'autres calculés. Classe-les.");
      j.consigne("Touche une case pour changer sa catégorie.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("GR, VGM et Hb mesurés ; Ht, TCMH et CCMH calculés.");
        j.expliquer("<p>Si un paramètre calculé paraît faux, on regarde d'abord les mesures dont il dépend : un hématocrite étrange vient du nombre de GR ou du VGM.</p>");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Un paramètre calculé a une formule à partir des autres."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Deux histogrammes", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [[200, 14, "patient A"], [480, 30, "patient B"]].forEach(function (h) {
        var pts = [[h[0] - 130, 420]];
        for (var x = -130; x <= 130; x += 4) pts.push([h[0] + x, 420 - 220 * 14 / h[1] * Math.exp(-x * x / (2 * h[1] * h[1] * 2.2))]);
        pts.push([h[0] + 130, 420]);
        A.s("polygon", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: C.koPale, stroke: C.sang, "stroke-width": 4 }, n.g);
        A.texte(n.g, h[2], [h[0], 470], { taille: 22, gras: 800 });
      });
      A.s("line", { x1: 40, y1: 420, x2: 640, y2: 420, stroke: C.encre, "stroke-width": 3 }, n.g);
      j.titre("Les deux patients ont le même VGM. Lequel a l'IDR le plus élevé ?");
      j.choix([
        { html: "Le patient A", aide: "L'IDR mesure la dispersion des volumes : quelle courbe est la plus étalée ?" },
        { html: "Le patient B", juste: true },
        { html: "Le même, puisque le VGM est le même", aide: "L'IDR divise l'écart-type par le VGM : à VGM égal, c'est l'écart-type qui compte." }
      ], { colonnes: 1, ok: function () { j.bravo("B : sa courbe est plus large, ses GR sont de tailles plus variées."); j.suite(); } });
    } },
    { nom: "Les unités", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque paramètre à son unité.");
      j.consigne("Touche un paramètre, puis son unité.");
      var p = A.paires({
        g: n.g, gauche: ["Globules blancs", "Globules rouges", "Hémoglobine", "VGM"],
        droite: ["g/dL", "fL", "× 10⁹/L", "× 10¹²/L"],
        bon: [2, 3, 0, 1], xg: 20, wg: 300, xd: 380, wd: 280, y0: 60, h: 104, pas: 134, taille: 21,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Quelques milliers par mm³, soit quelques milliards par litre.", "Environ mille fois plus nombreux que les globules blancs.", "Une concentration de protéine.", "Un volume, très petit : le femtolitre."][i]; },
        fin: function () { j.bravo("10⁹/L, 10¹²/L, g/dL, fL."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } }
  ]
}));
