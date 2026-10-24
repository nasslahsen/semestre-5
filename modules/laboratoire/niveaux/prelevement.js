/* Niveau : principes de prélèvement (2.2) : ordre CLSI, garrot, homogénéisation, jeûne, étiquetage. */
NIVEAU(LABO.rejouable({
  id: "prelevement",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, pl: { P: function (v) { return v; } } };
    n.ORDRE = ["hemoc", "sec", "citrate", "heparine", "edta", "fluorure"];
    n.NOMS = { hemoc: "Hémoculture", sec: "Sec", citrate: "Citrate", heparine: "Héparine", edta: "EDTA", fluorure: "Fluorure" };
    n.MELANGE = ["edta", "sec", "fluorure", "citrate", "hemoc", "heparine"];
    n.pris = [];
    // six tubes à toucher dans l'ordre ; les tubes choisis passent sur la ligne du bas, numérotés
    n.dessin = function (faux) {
      A.vider(g);
      A.texte(g, "Tubes à remplir", [340, 34], { taille: 19, gras: 700, coul: C.doux });
      n.MELANGE.forEach(function (k, i) {
        if (n.pris.indexOf(k) >= 0) return;
        var x = 30 + i * 108;
        A.tube(g, x + 22, 90, { bouchon: k, w: 56, h: 170, couches: [{ h: 0.7, coul: C.sang }], etiquette: n.NOMS[k], taille: 17, coulTexte: faux === k ? C.ko : C.encre });
        if (faux === k) A.s("rect", { x: x + 6, y: 62, width: 88, height: 236, rx: 12, fill: "none", stroke: C.ko, "stroke-width": 4 }, g);
        A.cible(g, x, 60, 104, 250, function () { if (n.toucher) n.toucher(k); });
      });
      A.chemin(g, [[40, 350], [640, 350]], { coul: C.trait, ep: 5 });
      A.texte(g, "ordre de remplissage", [340, 330], { taille: 17, coul: C.doux, gras: 500 });
      n.pris.forEach(function (k, i) {
        var x = 30 + i * 108;
        A.texte(g, String(i + 1), [x + 50, 385], { taille: 20, gras: 800, coul: C.jeu });
        A.tube(g, x + 26, 420, { bouchon: k, w: 48, h: 130, couches: [{ h: 0.7, coul: C.sang }] });
      });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "L'ordre des tubes", jouer: function (j, n) {
      j.titre("Une hémoculture, un sec, un citrate, une héparine, un EDTA et un fluorure sont prescrits. Dans quel ordre les remplir ?");
      j.consigne("Touche les tubes dans l'ordre de remplissage.");
      var AIDES = ["Le flacon qui doit rester parfaitement stérile passe en premier.", "Ensuite, le tube sans anticoagulant, pour le sérum.", "Puis le tube de coagulation, avant tout autre anticoagulant.", "Puis l'héparine.", "Puis l'EDTA.", "Le tube de glycémie ferme la série."];
      function gagner() {
        n.toucher = null; n.dessin();
        j.bravo("Hémoculture, sec, citrate, héparine, EDTA, fluorure.");
        j.expliquer("<p>Ordre de remplissage recommandé par le CLSI : hémoculture, tube sec, citrate, héparine, EDTA, fluorure / oxalate, puis les autres additifs. Dans le mauvais ordre, l'additif d'un tube peut contaminer le suivant : de l'EDTA entraîné dans un tube citrate fausse les résultats de coagulation.</p>");
        j.suite();
      }
      n.toucher = function (k) {
        var att = n.ORDRE[n.pris.length];
        if (k !== att) { n.dessin(k); j.erreur(AIDES[n.pris.length]); return; }
        n.pris.push(k); n.dessin();
        if (n.pris.length === n.ORDRE.length) gagner();
      };
      j.reponse(function () { n.pris = n.ORDRE.slice(); gagner(); });
    } },
    { nom: "Le garrot", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "horloge", [340, 260], 200, A.C.ko);
      A.texte(n.g, "garrot posé depuis 2 minutes", [340, 440], { taille: 22, gras: 700 });
      j.titre("Le garrot est resté posé deux minutes. Que dit le cours ?");
      j.choix([
        { html: "Rien de grave : le garrot peut rester tant que la veine n'est pas trouvée", aide: "Le cours fixe une limite de temps pour le garrot." },
        { html: "Il faut le poser moins d'une minute, pour éviter hémolyse et stase", juste: true },
        { html: "Il faut le serrer davantage pour accélérer le remplissage", aide: "Un garrot trop serré est justement une cause d'hémolyse." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Garrot moins d'une minute.");
        j.expliquer("<p>Un garrot prolongé (plus d'une minute) provoque une stase veineuse : protéines, potassium et lactate augmentent. Il favorise aussi l'hémolyse.</p>");
        j.suite();
      } });
    } },
    { nom: "Mélanger le tube", jouer: function (j, n) {
      var A = LABO; A.vider(n.g);
      A.tube(n.g, 290, 140, { bouchon: "edta", w: 100, h: 320, couches: [{ h: 0.8, coul: A.C.sang }] });
      j.titre("Un tube EDTA vient d'être rempli. Comment l'homogénéiser ?");
      j.choix([
        { html: "Le secouer vigoureusement pendant 10 secondes", aide: "Secouer vigoureusement abîme les globules rouges : c'est un risque d'hémolyse." },
        { html: "Le retourner doucement 8 à 10 fois, tout de suite", juste: true },
        { html: "Le laisser reposer : l'additif se mélange seul", aide: "Les tubes avec additif doivent être homogénéisés immédiatement." }
      ], { colonnes: 1, ok: function () { j.bravo("8 à 10 retournements doux, immédiatement."); j.suite(); } });
    } },
    { nom: "Le jeûne", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "horloge", [340, 280], 220, A.C.jeu);
      j.titre("Pour un bilan lipidique et glycémique, quelle durée de jeûne le cours indique-t-il en général ?");
      j.choix([
        { html: "1 à 2 heures", aide: "C'est bien trop court pour qu'un repas ne pèse plus sur les lipides et le glucose." },
        { html: "8 à 12 heures", juste: true },
        { html: "24 heures", aide: "Le cours donne une durée plus courte." }
      ], { colonnes: 3, ok: function () { j.bravo("Généralement 8 à 12 heures."); j.suite(); } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [0, 1, 2, 3].forEach(function (i) { A.tube(n.g, 120 + i * 120, 170, { bouchon: ["sec", "citrate", "edta", "fluorure"][i], w: 60, h: 220, couches: [] }); A.s("rect", { x: 118 + i * 120, y: 230, width: 64, height: 70, fill: "#fff", stroke: C.encre, "stroke-width": 2 }, n.g); });
      A.texte(n.g, "étiquettes collées à 7 h, tournée à 8 h", [340, 460], { taille: 20, gras: 700 });
      j.titre("« Pour gagner du temps, je colle les étiquettes sur les tubes le matin, avant ma tournée de prélèvements. » Quel est le problème ?");
      j.choix([
        { html: "Les étiquettes risquent de se décoller", aide: "Le problème n'est pas la colle : c'est le moment où l'on étiquette." },
        { html: "On ne doit jamais étiqueter à l'avance ni hors de la présence du patient", juste: true },
        { html: "Il faudrait plutôt écrire à la main", aide: "Manuscrit ou code-barres, peu importe : le cours insiste sur le moment et le lieu." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Erreur majeure : étiquetage à l'avance.");
        j.expliquer("<p>Après le prélèvement : étiquetage au chevet du patient, immédiat ; aiguilles et lames dans le collecteur DASRI (jaune) ; transport rapide ; enregistrement de la date et de l'heure du prélèvement et de l'heure de réception.</p>");
        j.suite();
      } });
    } }
  ]
}));
