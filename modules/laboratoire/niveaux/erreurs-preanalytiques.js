/* Niveau : sources d'erreurs pré-analytiques (2.6) : part des erreurs, origines, conséquences, coût, prévention. */
NIVEAU(LABO.rejouable({
  id: "erreurs-preanalytiques",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "La phase la plus fragile", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [["Pré-analytique", C.jeu], ["Analytique", C.doux], ["Post-analytique", C.doux]].forEach(function (p, i) {
        A.boite(n.g, 40 + i * 205, 220, 190, 120, { fond: "#fff", bord: p[1], ep: 3, rx: 14, titre: p[0], taille: 19 });
      });
      j.titre("Quelle part des erreurs totales en biologie médicale le cours attribue-t-il à la phase pré-analytique ?");
      j.choix([
        { html: "10 à 20 %", aide: "Le cours en fait la phase la plus critique : sa part est bien plus grande." },
        { html: "30 à 40 %", aide: "Plus encore : c'est la majorité des erreurs." },
        { html: "60 à 70 %", juste: true }
      ], { colonnes: 3, ok: function () {
        j.bravo("60 à 70 % des erreurs : la phase la plus critique et la plus difficile à maîtriser.");
        j.expliquer("<p>Avant l'analyse, l'échantillon passe entre beaucoup de mains et d'étapes : identification, prélèvement, transport, conservation, centrifugation. Chacune peut fausser un résultat que l'automate mesurera ensuite parfaitement.</p>");
        j.suite();
      } });
    } },
    { nom: "D'où vient l'erreur ?", jouer: function (j, n) {
      var A = LABO;
      j.titre("Quatre incidents de la semaine. Relie chacun à l'étape où il est né.");
      j.consigne("Touche un incident, puis son origine.");
      var p = A.paires({
        g: n.g, gauche: ["Tube étiqueté après le départ du patient", "EDTA entraîné dans le tube citrate", "Tube posé contre un pain de glace", "Aliquotes de deux patients mélangées"],
        droite: ["Centrifugation et préparation", "Identification", "Transport et conservation", "Prélèvement"],
        bon: [1, 3, 2, 0], xg: 20, wg: 300, xd: 380, wd: 280, y0: 60, h: 104, pas: 134, taille: 18,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Étiqueter hors présence du patient : c'est l'identité qui est en jeu.", "L'ordre de remplissage se joue au moment de la ponction.", "La température pendant le trajet.", "On répartit l'échantillon au laboratoire, après la centrifugation."][i]; },
        fin: function () { j.bravo("Identification, prélèvement, transport et conservation, préparation."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Le glucose trop bas", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 200, 130, { bouchon: "sec", w: 100, h: 320, couches: [{ h: 0.75, coul: C.sang }] });
      A.icone(n.g, "horloge", [480, 260], 140, C.jeu);
      A.texte(n.g, "4 h avant centrifugation", [480, 400], { taille: 20, gras: 700 });
      j.titre("Un tube sec attend quatre heures avant d'être centrifugé. Le glucose sort bas, sans signe clinique. Pourquoi ?");
      j.choix([
        { html: "Les cellules ont continué à consommer le glucose", juste: true },
        { html: "L'automate est mal calibré", aide: "Le cours range ce cas dans les erreurs pré-analytiques : regarde ce qui s'est passé avant l'analyse." },
        { html: "Le glucose s'est évaporé du tube", aide: "Le tube est fermé ; ce sont les cellules du sang, encore vivantes, qui agissent." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Délai avant centrifugation : glucose diminué par les cellules.");
        j.expliquer("<p>Tant que le sérum n'est pas séparé des cellules, elles continuent de consommer le glucose. C'est une erreur de centrifugation et de préparation ; le délai excessif dégrade aussi potassium, lactate et gaz du sang.</p>");
        j.suite();
      } });
    } },
    { nom: "Ce que coûte une erreur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Le coût de la non-qualité pré-analytique représente environ quel pourcentage du budget annuel des consommables de prélèvement ?");
      j.nombre({ avant: "\\text{coût} \\approx", apres: "\\%", cases: [{ attendu: 25, tol: 0 }],
        aide: function () { return "Le cours donne une estimation ronde, environ un quart."; },
        ok: function () {
          j.bravo("Environ 25 %.");
          j.expliquer("<p>Coût direct : nouveau prélèvement, nouvelle analyse, consommables, temps de travail. Coût indirect : retard de diagnostic et de traitement, hospitalisation prolongée, perte de confiance.</p>");
          j.suite();
        } });
    } },
    { nom: "Agir à la racine", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "personne", [340, 260], 200, A.C.jeu);
      j.titre("Le cours nomme la cause principale des erreurs pré-analytiques. Laquelle ?");
      j.choix([
        { html: "Des automates trop anciens", aide: "Les erreurs pré-analytiques se produisent avant l'automate." },
        { html: "Une formation insuffisante du personnel, même expérimenté", juste: true },
        { html: "Un manque de tubes", aide: "Le matériel adapté fait partie de la prévention, mais ce n'est pas la cause que le cours met en premier." }
      ], { colonnes: 1, ok: function () {
        j.bravo("La formation, même pour le personnel expérimenté.");
        j.expliquer("<p>Prévention : formation continue, procédures documentées, contrôle qualité pré-analytique, système d'information (traçabilité, alertes), matériel adapté, communication, indicateurs (taux de rejets, de nouveaux prélèvements, délais de transport).</p>");
        j.suite();
      } });
    } }
  ]
}));
