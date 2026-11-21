/* TD 1, questions 4 à 8 : capteur FUTEK LSB200 (pont de jauges), choix du modèle, caractéristique Vo(P), gain de l'INA128, CMR. */
NIVEAU({
  id: "td1-banc",
  init: function (fig) {
    var C = EMB.C, g = E.s("g", null, fig.svg);
    var n = { mode: "pont", P: 0, ina: false, jauges: false };
    n.dessin = function () {
      EMB.vider(g);
      if (n.mode === "pont") {
        // pont de Wheatstone en losange
        var H = [220, 110], B = [220, 450], Gc = [70, 280], D = [370, 280];
        [[H, Gc], [H, D], [Gc, B], [D, B]].forEach(function (s) {
          var m = [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2], a = Math.atan2(s[1][1] - s[0][1], s[1][0] - s[0][0]) * 180 / Math.PI;
          EMB.el("line", { x1: s[0][0], y1: s[0][1], x2: s[1][0], y2: s[1][1], stroke: C.encre, "stroke-width": 3 }, g);
          EMB.el("rect", { x: m[0] - 34, y: m[1] - 12, width: 68, height: 24, rx: 4, fill: "#fff", stroke: C.acc, "stroke-width": 3, transform: "rotate(" + a + " " + m[0] + " " + m[1] + ")" }, g);
        });
        [H, B, Gc, D].forEach(function (p) { EMB.el("circle", { cx: p[0], cy: p[1], r: 7, fill: C.encre }, g); });
        EMB.texte(g, "+Excitation", [220, 80], { taille: 17 }); EMB.texte(g, "−Excitation", [220, 485], { taille: 17 });
        EMB.texte(g, "+Signal", [70, 320], { taille: 17 }); EMB.texte(g, "−Signal", [370, 320], { taille: 17 });
        if (n.jauges) EMB.texte(g, "4 jauges de contrainte", [220, 560], { taille: 18, coul: C.acc });
        EMB.bloc(g, 450, 210, 190, 140, "FUTEK LSB200\nFSH00107\n445 N", { taille: 18, actif: true });
      } else {
        // caractéristique Vo(P), sensibilité supposée 2 mV/V sous 5 V
        var x0 = 110, y0 = 480, W = 480, Hh = 360, x = function (p) { return x0 + p / 445 * W; }, y = function (v) { return y0 - v / 10 * Hh; };
        EMB.fleche(g, [x0, y0], [x0 + W + 30, y0], { ep: 2.5 }); EMB.fleche(g, [x0, y0], [x0, y0 - Hh - 40], { ep: 2.5 });
        EMB.texte(g, "P (N)", [x0 + W + 20, y0 - 26], { taille: 17, coul: C.doux });
        EMB.texte(g, "Vo (mV)", [x0 + 10, y0 - Hh - 60], { taille: 17, coul: C.doux, ancre: "start" });
        [0, 100, 445].forEach(function (p) { EMB.texte(g, String(p), [x(p), y0 + 26], { taille: 15, mono: true, gras: false }); });
        [0, 10].forEach(function (v) { EMB.texte(g, String(v), [x0 - 18, y(v)], { taille: 15, mono: true, gras: false, ancre: "end" }); });
        EMB.el("line", { x1: x(0), y1: y(0), x2: x(445), y2: y(10), stroke: C.acc, "stroke-width": 5 }, g);
        if (n.P) {
          var v = 10 * n.P / 445;
          EMB.el("path", { d: "M" + x(n.P) + " " + y0 + " V" + y(v) + " H" + x0, fill: "none", stroke: C.encre, "stroke-width": 2, "stroke-dasharray": "6 5" }, g);
          EMB.el("circle", { cx: x(n.P), cy: y(v), r: 9, fill: C.acc, stroke: "#fff", "stroke-width": 3 }, g);
          EMB.texte(g, EMB.virgule(Math.round(v * 1000) / 1000) + " mV", [x(n.P) + 18, y(v) - 18], { taille: 18, ancre: "start", mono: true });
        }
        if (n.ina) {
          EMB.el("polygon", { points: "180,130 180,230 280,180", fill: C.clair, stroke: C.acc, "stroke-width": 3 }, g);
          EMB.texte(g, "INA128", [216, 180], { taille: 15, halo: false });
          EMB.fleche(g, [280, 180], [340, 180], { ep: 3 });
          EMB.texte(g, "1 V pour 100 N", [350, 180], { taille: 17, ancre: "start", coul: C.acc });
        }
      }
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Technologie", jouer: function (j, n) {
      j.titre("Question 4 : quelle technologie dans le FUTEK LSB200, à 4 fils ?");
      j.choix([
        { html: "Des jauges de contrainte en pont de Wheatstone", juste: true },
        { html: "Une résistance FSR, comme les capteurs de la semelle", aide: "Une FSR n'a que 2 fils. Regarde le dessin : quatre résistances et quatre points de connexion." },
        { html: "Un cristal piézoélectrique", aide: "Un piézoélectrique ne garde pas sa sortie sous une charge constante. Ici, on appuie et on maintient." }
      ], { colonnes: 1, ok: function () {
        n.jauges = true; n.dessin();
        j.bravo("Pont complet de 4 jauges.");
        j.expliquer("<p>Les jauges sont collées sur un corps d'épreuve qui se déforme sous la charge. Une diagonale du pont reçoit l'excitation, l'autre donne quelques millivolts.</p>");
        j.suite();
      } });
    } },
    { nom: "Les 4 fils", jouer: function (j, n) {
      j.titre("Range les 4 fils : lesquels alimentent le pont, lesquels donnent la mesure ?");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:center;font-size:17px">' +
        '<b>diagonale d\'alimentation (5 V)</b><span class="trou" data-attendu="exc"></span><b>diagonale de mesure (quelques mV)</b><span class="trou" data-attendu="sig"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "sig", html: "+Signal et −Signal" }, { id: "exc", html: "+Excitation et −Excitation" }, { id: "g", html: "deux fils de masse" }],
        aide: "Sur le dessin, le haut et le bas du losange reçoivent l'excitation ; les points de gauche et de droite sont la sortie.",
        ok: function () { j.bravo("Excitation sur une diagonale, signal sur l'autre."); j.suite(); }
      });
    } },
    { nom: "Le bon modèle", jouer: function (j, n) {
      j.titre("Question 5 : pourquoi le modèle FSH00107 (pleine échelle 445 N) convient-il ?");
      j.choix([
        { html: "445 N couvre toute la plage des capteurs de la semelle (98,1 N), avec de la marge", juste: true },
        { html: "445 N, c'est le poids d'un patient de 45 kg", aide: "On ne pèse pas le patient sur le banc : on appuie sur un seul capteur de la semelle." },
        { html: "Il est plus précis qu'un capteur de 98,1 N", aide: "À précision relative égale, une pleine échelle plus grande est même moins fine. L'argument, c'est la plage." }
      ], { colonnes: 1, ok: function () {
        j.bravo("98,1 N tient dans 445 N, environ 4,5 fois.");
        j.expliquer("<p>On peut même pousser au-delà de 98,1 N pour voir la saturation du capteur de la semelle, sans risque pour le capteur de référence.</p>");
        j.suite();
      } });
    } },
    { nom: "Vo à 100 N", jouer: function (j, n) {
      n.mode = "courbe"; n.dessin();
      j.titre("Question 6 : supposons une sensibilité de 2 mV/V sous 5 V, donc 10 mV à 445 N. Que vaut Vo à 100 N ?");
      j.nombre({ avant: "V_o(100\\ \\text{N}) =", apres: "\\text{mV}", cases: [{ attendu: 2.247, tol: 0.01 }], ligne: true,
        aide: function () { return "La caractéristique est une droite qui part de 0 : prends 100/445 de 10 mV."; },
        ok: function () {
          n.P = 100; n.dessin();
          j.bravo("10 × 100 / 445 ≈ 2,25 mV.");
          j.expliquer("<p>\\[V_o = S\\,V_{exc}\\,\\frac{P}{445}\\]</p><p>La sensibilité de 2 mV/V est supposée : la vraie est sur la fiche DT2, pas reçue. La méthode reste la même.</p>");
          j.suite();
        } });
    } },
    { nom: "RG", jouer: function (j, n) {
      n.ina = true; n.dessin();
      j.titre("Question 7 : l'INA128 a un gain \\(G = 1 + 50\\ \\text{k}\\Omega / R_G\\). On veut 1 V à 100 N. Calcule G, puis RG.");
      j.nombre({ avant: "G,\\ R_G =", apres: "\\Omega", cases: [{ attendu: 445, tol: 1 }, { attendu: 112.6, tol: 0.6 }], ligne: true,
        aide: function (k) { return k === 0 ? "G = 1 V / 2,247 mV." : "Isole RG : RG = 50 kΩ / (G − 1)."; },
        ok: function () {
          j.bravo("G = 445, RG = 50 000 / 444 ≈ 113 Ω.");
          j.expliquer("<p>\\[R_G = \\frac{50\\ \\text{k}\\Omega}{G - 1}\\]</p>");
          j.suite();
        } });
    } },
    { nom: "CMR", jouer: function (j, n) {
      j.titre("Question 8 : les deux fils de signal sont vers 2,5 V et diffèrent de 2 mV. Que fait un CMR élevé ?");
      j.choix([
        { html: "Il amplifie les 2 mV et ignore les 2,5 V communs aux deux fils", juste: true },
        { html: "Il amplifie les 2,5 V pour les rendre lisibles", aide: "2,5 V, c'est la moitié de l'excitation, sur les deux fils à la fois : ce n'est pas la mesure." },
        { html: "Il réduit le gain pour éviter la saturation", aide: "CMR : Common-Mode Rejection. Qu'est-ce qui est commun aux deux fils ?" }
      ], { colonnes: 1, ok: function () {
        j.bravo("Réjection du mode commun.");
        j.expliquer("<p>Face à un amplificateur différentiel à un seul AOP, l'INA128 rejette bien mieux le mode commun, ne charge pas le pont (impédance d'entrée très élevée), et son gain se règle avec une seule résistance.</p>");
        j.suite();
      } });
    } }
  ]
});
