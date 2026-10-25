/* Niveau : l'automatisation (7.1) : définition, trois âges, automate ou laboratoire automatisé, avantages, ce qu'elle englobe. */
NIVEAU(LABO.rejouable({
  id: "automatisation",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Les trois âges", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets les trois formes d'automatisation dans l'ordre où elles sont apparues.");
      j.consigne("Touche-les dans l'ordre.");
      var N = ["Intelligente : l'instrument s'auto-surveille", "Fixe : une seule tâche répétitive", "Programmable : une variété de tâches"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 21, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 90, y: 80 + i * 150, w: 500, h: 110 }; }),
        ordre: [1, 2, 0],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["On commence par le plus simple.", "Ensuite, on peut changer la tâche.", "Enfin, la machine réagit seule aux conditions."][k]; },
        fin: function () { j.bravo("Fixe, programmable, intelligente : comme dans l'industrie."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Automate ou laboratoire ?", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.icone(n.g, "automate", [200, 260], 160, C.jeu); A.icone(n.g, "automate", [480, 260], 160, C.jeu);
      A.chemin(n.g, [[280, 260], [400, 260]], { coul: C.v, ep: 10 });
      j.titre("Des analyseurs reliés par des convoyeurs et un logiciel de gestion, de la réception de l'échantillon à la validation du résultat. Comment l'appelle-t-on ?");
      j.choix([
        { html: "Un automate de laboratoire", aide: "Un automate est une machine isolée qui fait une ou quelques étapes." },
        { html: "Un laboratoire automatisé", juste: true }
      ], { colonnes: 2, ok: function () { j.bravo("Un laboratoire automatisé, doté d'une chaîne robotisée."); j.suite(); } });
    } },
    { nom: "Pourquoi automatiser ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "robot", [340, 260], 220, A.C.jeu);
      j.titre("D'après le cours, quel avantage l'automatisation apporte-t-elle à la qualité des analyses ?");
      j.choix([
        { html: "Elle réduit la variabilité et les erreurs, et améliore la reproductibilité", juste: true },
        { html: "Elle rend la validation du biologiste inutile", aide: "Le biologiste reste le garant du résultat." },
        { html: "Elle supprime toute erreur pré-analytique", aide: "Elle en réduit beaucoup, mais le cours ne promet pas de les supprimer toutes." }
      ], { colonnes: 1, ok: function () { j.bravo("Moins de tâches monotones, moins de variabilité, plus de reproductibilité."); j.suite(); } });
    } },
    { nom: "Ce qu'elle englobe", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "robot", [340, 230], 180, C.jeu);
      j.titre("L'automatisation ne se limite plus à l'analyse. Laquelle de ces tâches le cours ne cite-t-il pas parmi celles qu'elle englobe ?");
      j.choix([
        { html: "Le traitement et le transport des échantillons", aide: "C'est la première citée." },
        { html: "Le stockage des échantillons", aide: "C'est la dernière citée." },
        { html: "La prescription des examens par le médecin", juste: true },
        { html: "L'évaluation des résultats", aide: "Elle est citée." }
      ], { colonnes: 1, ok: function () { j.bravo("La prescription reste un acte médical ; l'automatisation englobe transport, chargement, évaluation, stockage."); j.suite(); } });
    } },
    { nom: "Le bon équipement", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque étape du pré-analytique à un équipement que le cours y range.");
      j.consigne("Touche une étape, puis son équipement.");
      var p = A.paires({
        g: n.g, gauche: ["Prélèvement et identification", "Transport", "Réception et préparation", "Conservation temporaire"],
        droite: ["Réseau pneumatique", "Congélateur biomédical", "Automate d'étiquetage des tubes", "Automate de débouchage"],
        bon: [2, 0, 3, 1], xg: 20, wg: 300, xd: 380, wd: 280, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["On colle l'identité sur le tube.", "On fait voyager le tube jusqu'au laboratoire.", "On ouvre le tube avant l'analyse.", "On garde le tube au froid."][i]; },
        fin: function () { j.bravo("Étiquetage, pneumatique, débouchage, congélateur."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } }
  ]
}));
