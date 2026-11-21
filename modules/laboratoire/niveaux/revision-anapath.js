/* Niveau : révision du chapitre 6 : des situations nouvelles qui mélangent fixation, macroscopie, appareils et délais. */
NIVEAU(LABO.rejouable({
  id: "revision-anapath",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Un flacon oublié", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "horloge", [340, 280], 220, A.C.ko);
      j.titre("Une biopsie est restée trois heures sur un chariot, dans un flacon sans formol. Quel est le risque ?");
      j.choix([
        { html: "Les cellules se dégradent : la fixation sert justement à l'arrêter", juste: true },
        { html: "Aucun, on fixera plus tard", aide: "Le cours insiste sur une fixation immédiate." },
        { html: "La paraffine ne fondra pas", aide: "La paraffine vient bien plus tard, au processeur." }
      ], { colonnes: 1, ok: function () { j.bravo("Fixation immédiate, dans le formol tamponné."); j.suite(); } });
    } },
    { nom: "Odeur de formol", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "masque", [340, 280], 220, A.C.jeu);
      j.titre("La table de macroscopie est allumée, mais le technicien sent le formol et l'aspiration paraît faible. Que vérifier d'abord ?");
      j.choix([
        { html: "Le filtre, probablement saturé", juste: true },
        { html: "La lampe", aide: "La lampe n'agit pas sur l'aspiration." },
        { html: "La pompe à formol", aide: "La pompe distribue le liquide ; le problème est l'air." }
      ], { colonnes: 1, ok: function () { j.bravo("Aspiration faible : filtre saturé. On le change tous les 6 mois, selon sa saturation."); j.suite(); } });
    } },
    { nom: "Quel appareil", jouer: function (j, n) {
      var A = LABO; A.vider(n.g);
      j.titre("Relie chaque besoin à l'appareil qui y répond.");
      j.consigne("Touche un besoin à gauche, puis son appareil à droite.");
      var p = A.paires({
        g: n.g, gauche: ["Un résultat pendant l'opération", "Former un bloc autour du tissu", "Remplacer l'eau par la paraffine", "Lire une lame sur un écran"],
        droite: ["Processeur de tissus", "Scanner de lames", "Cryostat", "Station d'enrobage"],
        bon: [2, 3, 0, 1], xg: 20, wg: 330, xd: 400, wd: 260, y0: 70, h: 104, pas: 130, taille: 17,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Un tissu congelé, coupé tout de suite.", "Un moule, de la paraffine coulée, une plaque froide.", "Alcools, xylène, paraffine.", "Une lame virtuelle."][i]; },
        fin: function () { j.bravo("Cryostat, station d'enrobage, processeur, scanner."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Juste avant le bloc", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "thermo", [340, 280], 200, A.C.chaud);
      j.titre("Quelle étape a lieu juste avant l'enrobage ?");
      j.choix([
        { html: "L'imprégnation par la paraffine", juste: true },
        { html: "La coloration", aide: "La coloration se fait sur la coupe, donc après le bloc." },
        { html: "La coupe", aide: "On coupe le bloc : il doit déjà exister." }
      ], { colonnes: 1, ok: function () { j.bravo("Le processeur finit par l'imprégnation ; la station d'enrobage prend le relais."); j.suite(); } });
    } },
    { nom: "Le délai d'une biopsie", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "document", [340, 250], 200, C.jeu);
      j.titre("En moyenne, en combien de jours le résultat d'une biopsie arrive-t-il ?");
      j.nombre({ avant: "\\approx", apres: "\\text{jours}", cases: [{ attendu: 4, tol: 0 }],
        aide: function () { return "Environ la moitié du délai d'une pièce opératoire (8 jours ou plus)."; },
        ok: function () { j.bravo("Autour de 4 jours ; souvent 8 jours ou plus pour une pièce opératoire."); j.suite(); } });
    } }
  ]
}));
