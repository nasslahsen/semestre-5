/* Révision du chapitre 4 : hémogramme, impédance, cytométrie, interférences, hémostase, dans des situations nouvelles. */
NIVEAU(LABO.rejouable({
  id: "revision-hemato",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "La CCMH", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [["Hb", "13,5 g/dL"], ["Ht", "40,5 %"]].forEach(function (r, i) {
        A.boite(n.g, 120, 160 + i * 140, 440, 110, { fond: "#fff", bord: C.encre, ep: 2.5, rx: 14 });
        A.texte(n.g, r[0], [220, 223 + i * 140], { taille: 28, gras: 800 });
        A.texte(n.g, r[1], [430, 223 + i * 140], { taille: 28, gras: 800, coul: C.jeu });
      });
      j.titre("Hb 13,5 g/dL, Ht 40,5 %. Quelle est la CCMH ?");
      j.nombre({ avant: "\\text{CCMH} \\approx", apres: "\\text{g/dL}", cases: [{ attendu: 33.33, tol: 0.05 }],
        aide: function () { return "CCMH = Hb × 100 / Ht."; },
        ok: function () { j.bravo("Environ 33,3 g/dL."); j.suite(); } });
    } },
    { nom: "Un débris ou une plaquette ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "eclair", [340, 240], 200, A.C.jeu);
      A.texte(n.g, "impulsion : 27 fL", [340, 420], { taille: 30, gras: 800 });
      j.titre("Une impulsion correspond à 27 fL. Comment l'automate à impédance la range-t-il ?");
      j.choix([
        { html: "Plaquette", aide: "Les plaquettes vont de 2 à 20 fL." },
        { html: "Bruit ou débris", juste: true },
        { html: "Globule rouge", aide: "Les globules rouges commencent à 35 fL." }
      ], { colonnes: 3, ok: function () { j.bravo("Entre 20 et 35 fL : bruit, débris."); j.suite(); } });
    } },
    { nom: "Les granulocytes", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "lampe", [340, 260], 200, A.C.v);
      j.titre("Les granulocytes se distinguent des lymphocytes surtout par un signal du cytomètre. Lequel ?");
      j.choix([
        { html: "Le SSC, diffusion à 90°", juste: true },
        { html: "L'impédance", aide: "L'impédance ne différencie pas finement les GB." },
        { html: "L'absorbance à 540 nm", aide: "C'est pour l'hémoglobine, après lyse." }
      ], { colonnes: 1, ok: function () { j.bravo("SSC : la granulosité."); j.suite(); } });
    } },
    { nom: "Tout est bas", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      ["GB", "GR", "Hb", "PLT"].forEach(function (p, i) {
        A.s("rect", { x: 110 + i * 125, y: 330, width: 80, height: 100, rx: 6, fill: C.froidPale, stroke: C.froid, "stroke-width": 3 }, n.g);
        A.texte(n.g, p, [150 + i * 125, 470], { taille: 24, gras: 800 }); A.texte(n.g, "↓", [150 + i * 125, 300], { taille: 40, gras: 800, coul: C.froid });
      });
      j.titre("Tous les paramètres d'un hémogramme sont bas, chez un patient perfusé au bras droit, prélevé au bras droit. Quelle est la cause la plus probable ?");
      j.choix([
        { html: "Une dilution par le liquide de perfusion", juste: true },
        { html: "Des agrégats plaquettaires", aide: "Les agrégats font monter les GB : ici tout baisse." },
        { html: "Une hyperlipémie", aide: "Elle fait monter l'hémoglobine." }
      ], { colonnes: 1, ok: function () { j.bravo("Prélèvement non conforme : sang dilué par la perfusion."); j.suite(); } });
    } },
    { nom: "Un INR avec un autre réactif", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "chimie", [340, 240], 200, A.C.jeu);
      j.titre("TP du patient 24 s, témoin 12 s, ISI du lot 1,2. Quel est l'INR ?");
      j.nombre({ avant: "\\text{INR} \\approx", cases: [{ attendu: 2.30, tol: 0.01 }],
        aide: function () { return "(24 / 12) puissance 1,2 : c'est 2 puissance 1,2."; },
        ok: function () { j.bravo("Environ 2,30."); j.suite(); } });
    } }
  ]
}));
