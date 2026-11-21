/* TD 1, questions 10 à 12 : multiplexeur parfait, entrée /E, voie choisie par S3 S2 S1, expression de VA, valeur limite de RFSR. */
NIVEAU({
  id: "td1-montage",
  init: function (fig) {
    var C = EMB.C, g = E.s("g", null, fig.svg);
    var n = { voie: null, vp: false, va: false };
    n.dessin = function () {
      EMB.vider(g);
      // 8 capteurs, point commun à la masse
      EMB.el("line", { x1: 40, y1: 80, x2: 40, y2: 500, stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.el("path", { d: "M24 500 H56 M30 509 H50 M36 518 H44", stroke: C.encre, "stroke-width": 2.5 }, g);
      for (var i = 0; i < 8; i++) {
        var y = 80 + i * 56, on = n.voie === i, c = on ? C.acc : C.gris;
        EMB.el("line", { x1: 40, y1: y, x2: 200, y2: y, stroke: c, "stroke-width": 2.5 }, g);
        EMB.el("rect", { x: 70, y: y - 12, width: 84, height: 24, rx: 4, fill: on ? C.clair : "#fff", stroke: c, "stroke-width": on ? 3 : 2 }, g);
        EMB.texte(g, "FSR" + (i + 1), [112, y], { taille: 16, coul: on ? C.encre : C.doux, halo: false });
        EMB.texte(g, "Y" + i, [214, y], { taille: 16, mono: true, coul: on ? C.acc : C.doux, ancre: "start" });
      }
      EMB.el("rect", { x: 200, y: 56, width: 110, height: 440, rx: 8, fill: "#fff", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.texte(g, "NX3L4051", [255, 36], { taille: 17 });
      EMB.texte(g, "S1 S2 S3", [255, 520], { taille: 16, mono: true, coul: C.doux });
      if (n.voie !== null) EMB.el("line", { x1: 245, y1: 80 + n.voie * 56, x2: 305, y2: 280, stroke: C.acc, "stroke-width": 4, "stroke-linecap": "round" }, g);
      // AOP, RG, pont RA RB
      EMB.el("line", { x1: 310, y1: 280, x2: 470, y2: 280, stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.texte(g, "Z", [326, 258], { taille: 16, mono: true });
      EMB.el("polygon", { points: "470,250 470,370 570,310", fill: "#fff", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.texte(g, "−", [486, 280], { taille: 22 }); EMB.texte(g, "+", [486, 340], { taille: 22 });
      EMB.el("path", { d: "M420 280 V170 H480 M550 170 H610 V310", fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.el("rect", { x: 480, y: 159, width: 70, height: 22, rx: 4, fill: "#fff", stroke: C.encre, "stroke-width": 2 }, g);
      EMB.texte(g, "RG = 750 kΩ", [515, 138], { taille: 16, gras: false });
      EMB.el("line", { x1: 570, y1: 310, x2: 650, y2: 310, stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.texte(g, "VA", [636, 286], { taille: 18, coul: n.va ? C.acc : C.encre });
      EMB.el("path", { d: "M470 340 H420 V420 H360 M420 420 V440", fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.el("rect", { x: 409, y: 440, width: 22, height: 40, rx: 4, fill: "#fff", stroke: C.encre, "stroke-width": 2 }, g);
      EMB.el("path", { d: "M420 480 V500 M406 500 H434", fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
      EMB.el("rect", { x: 360, y: 409, width: 44, height: 22, rx: 4, fill: "#fff", stroke: C.encre, "stroke-width": 2 }, g);
      EMB.texte(g, "RA 110 kΩ", [410, 394], { taille: 15, gras: false, ancre: "end" });
      EMB.texte(g, "RB 10 kΩ", [444, 462], { taille: 15, gras: false, ancre: "start" });
      EMB.texte(g, "VDD = 3,3 V", [410, 368], { taille: 15, gras: false, ancre: "end" });
      if (n.vp) EMB.texte(g, "V+ = 0,275 V", [470, 545], { taille: 18, coul: C.acc });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Mux parfait", jouer: function (j, n) {
      j.titre("Question 10 : le multiplexeur est « parfait ». Qu'est-ce que ça veut dire ?");
      j.choix([
        { html: "Voie choisie : résistance nulle ; autres voies : ouvertes, sans fuite", juste: true },
        { html: "Il amplifie le signal du capteur choisi", aide: "Un multiplexeur aiguille, il n'amplifie pas. C'est le rôle de l'AOP." },
        { html: "Il convertit la tension en nombre", aide: "Ça, c'est l'ADC du microcontrôleur, après l'AOP." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Z est relié à Yk par un fil parfait.");
        j.expliquer("<p>Le vrai circuit a une petite résistance à l'état passant (fiche DT4), négligeable devant les centaines de kΩ d'un capteur.</p>");
        j.suite();
      } });
    } },
    { nom: "/E", jouer: function (j, n) {
      j.titre("Question 11 : l'entrée /E (active au niveau bas) n'est pas dessinée. Où la relier ?");
      j.choix([
        { html: "À la masse", juste: true },
        { html: "À VDD", aide: "La barre sur /E veut dire : actif quand /E vaut 0. À VDD, le circuit est coupé." },
        { html: "La laisser en l'air", aide: "Une entrée en l'air flotte : le circuit s'allumerait et s'éteindrait au hasard." }
      ], { colonnes: 3, ok: function () {
        j.bravo("/E = 0 : le multiplexeur est toujours en service.");
        j.expliquer("<p>On peut aussi la relier à une sortie du microcontrôleur pour couper le multiplexeur entre deux mesures.</p>");
        j.suite();
      } });
    } },
    { nom: "Quelle voie", jouer: function (j, n) {
      j.titre("Question 12 : le microcontrôleur met S1, S2 et S3 à l'état haut. Quelle voie Yk est reliée à Z ?");
      j.nombre({ avant: "k =", cases: [{ attendu: 7, tol: 0 }], ligne: true,
        aide: function () { return "Lis S3 S2 S1 comme un nombre binaire, S1 étant le bit de poids faible : 111."; },
        ok: function () {
          n.voie = 7; n.dessin();
          j.bravo("111 en binaire = 7 : la voie Y7, le capteur FSR8.");
          j.suite();
        } });
    } },
    { nom: "V+", jouer: function (j, n) {
      j.titre("Que vaut la tension sur l'entrée + de l'AOP ?");
      j.nombre({ avant: "V^+ =", apres: "\\text{V}", cases: [{ attendu: 0.275, tol: 0.002 }], ligne: true,
        aide: function () { return "Pont diviseur : VDD × RB / (RA + RB)."; },
        ok: function () {
          n.vp = true; n.dessin();
          j.bravo("3,3 × 10 / 120 = 0,275 V.");
          j.expliquer("<p>\\[V^+ = V_{DD}\\,\\frac{R_B}{R_A + R_B}\\]</p>");
          j.suite();
        } });
    } },
    { nom: "VA", jouer: function (j, n) {
      j.titre("\\(V^- = V^+\\). Le courant qui traverse le capteur traverse aussi RG. Complète \\(V_A\\).");
      var z = j.zone("", '<div style="display:flex;align-items:center;gap:8px;font-size:20px;flex-wrap:wrap">V<sub>A</sub> = V<sup>+</sup> × (1 + <span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px"><span class="trou" data-attendu="rg"></span><span style="border-top:2px solid #15171f;width:100%"></span><span class="trou" data-attendu="fsr"></span></span>)</div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "ra", html: "R<sub>A</sub>" }, { id: "fsr", html: "R<sub>FSR8</sub>" }, { id: "rg", html: "R<sub>G</sub>" }, { id: "rb", html: "R<sub>B</sub>" }],
        aide: "Le courant vaut V+ / RFSR8 ; dans RG, il crée la chute RG × V+ / RFSR8 entre V− et VA.",
        ok: function () {
          n.va = true; n.dessin();
          j.bravo("V_A = V+ (1 + RG / RFSR8).");
          j.expliquer("<p>\\[V_A = V_{DD}\\,\\frac{R_B}{R_A + R_B}\\left(1 + \\frac{R_G}{R_{FSR}}\\right)\\]</p><p>Plus on appuie, plus \\(R_{FSR}\\) baisse, plus \\(V_A\\) monte. Sans appui, \\(V_A\\) reste vers 0,275 V.</p>");
          j.suite();
        } });
    } },
    { nom: "Pas de saturation", jouer: function (j, n) {
      j.titre("L'ADC lit de 0 à 3,3 V. À 100 N, quelle résistance minimale doit garder le capteur pour que \\(V_A \\le 3{,}3\\) V ?");
      j.nombre({ avant: "R_{FSR}(100\\ \\text{N}) \\ge", apres: "\\text{k}\\Omega", cases: [{ attendu: 68.18, tol: 0.15 }], ligne: true,
        aide: function () { return "3,3 / 0,275 = 12, donc 1 + RG / R ≤ 12, soit RG / R ≤ 11."; },
        ok: function () {
          j.bravo("750 / 11 ≈ 68,2 kΩ.");
          j.expliquer("<p>Le dimensionnement est bon si la courbe du capteur (DR1) donne au moins 68,2 kΩ à 100 N : \\(V_A\\) reste alors entre 0,275 V et 3,3 V.</p>");
          j.suite();
        } });
    } }
  ]
});
