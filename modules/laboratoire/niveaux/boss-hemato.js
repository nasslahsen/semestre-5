/* Défi du chapitre 4 : une série d'hémogrammes et de bilans de coagulation, sans aide avant le premier essai. */
NIVEAU(LABO.rejouable({
  id: "boss-hemato",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Deux indices", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [["GR", "5,1 × 10¹²/L"], ["VGM", "82 fL"], ["Hb", "11,8 g/dL"]].forEach(function (r, i) {
        A.boite(n.g, 100, 100 + i * 130, 480, 100, { fond: "#fff", bord: C.encre, ep: 2.5, rx: 14 });
        A.texte(n.g, r[0], [200, 158 + i * 130], { taille: 26, gras: 800 });
        A.texte(n.g, r[1], [430, 158 + i * 130], { taille: 26, gras: 800, coul: C.jeu });
      });
      j.titre("Calcule l'hématocrite puis la TCMH.");
      j.nombre({ avant: "\\text{Ht},\\ \\text{TCMH} :", cases: [{ attendu: 41.82, tol: 0.05 }, { attendu: 23.14, tol: 0.05 }], ligne: true,
        aide: function (k) { return k === 0 ? "Ht (%) = GR × VGM / 10." : "TCMH (pg) = Hb × 10 / GR."; },
        ok: function () { j.bravo("Ht ≈ 41,8 % et TCMH ≈ 23,1 pg."); j.suite(); } });
    } },
    { nom: "Trop de plaquettes", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "microscope", [340, 260], 220, A.C.jeu);
      j.titre("Les plaquettes sortent élevées ; sur la lame, on voit de nombreux fragments de globules rouges. Qu'en conclus-tu ?");
      j.choix([
        { html: "Une vraie hausse des plaquettes", aide: "Que fait l'impédance d'un fragment de GR de la taille d'une plaquette ?" },
        { html: "Les schizocytes sont comptés comme plaquettes : PLT faussement élevées", juste: true },
        { html: "Les plaquettes sont agrégées", aide: "Des agrégats feraient baisser les plaquettes." }
      ], { colonnes: 1, ok: function () { j.bravo("Fragments érythrocytaires : PLT ↑ faussement."); j.suite(); } });
    } },
    { nom: "Un autre INR", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "chimie", [340, 260], 200, A.C.jeu);
      j.titre("TP du patient 28 s, témoin 14 s, ISI 1,4. Quel est l'INR ?");
      j.nombre({ avant: "\\text{INR} \\approx", cases: [{ attendu: 2.64, tol: 0.01 }],
        aide: function () { return "(28 / 14) puissance 1,4."; },
        ok: function () { j.bravo("Environ 2,64."); j.suite(); } });
    } },
    { nom: "Cinq populations", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "lampe", [340, 260], 200, A.C.v);
      j.titre("Pour séparer basophiles et éosinophiles des autres leucocytes, que faut-il combiner ?");
      j.choix([
        { html: "Impédance et spectrophotométrie", aide: "L'impédance ne différencie pas finement les GB." },
        { html: "FSC, SSC et fluorescence", juste: true },
        { html: "FSC seul, avec un laser plus puissant", aide: "La taille seule ne suffit pas à séparer cinq populations." }
      ], { colonnes: 1, ok: function () { j.bravo("FSC, SSC et fluorescence : la formule à 5 populations."); j.suite(); } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Une étudiante résume l'hémostase. Une phrase est fausse : laquelle ?");
      j.choix([
        { html: "« Le facteur de von Willebrand fait adhérer les plaquettes au sous-endothélium. »", aide: "C'est exact : c'est l'adhésion plaquettaire." },
        { html: "« La plasmine dégrade la fibrine. »", aide: "C'est exact : c'est la fibrinolyse." },
        { html: "« Le clou plaquettaire suffit à arrêter l'hémorragie dans les gros vaisseaux. »", juste: true },
        { html: "« La vitamine K est nécessaire à l'activation des facteurs II, VII, IX et X. »", aide: "C'est exact." }
      ], { colonnes: 1, ok: function () { j.bravo("Le clou est insuffisant dans les gros vaisseaux : il faut la fibrine."); j.suite(); } });
    } }
  ]
}));
