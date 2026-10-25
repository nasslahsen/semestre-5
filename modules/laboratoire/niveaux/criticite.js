/* Niveau : criticité et continuité (chapitre 8) : critères d'évaluation, POCT, domaines, ce que voit le patient. */
NIVEAU(LABO.rejouable({
  id: "criticite",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Une panne un dimanche", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "automate", [340, 260], 220, A.C.ko);
      j.titre("Quels critères le cours demande-t-il d'évaluer pour chaque équipement critique ?");
      j.choix([
        { html: "Impact clinique, délai de réparation, plan de continuité, secours ou sous-traitance, traçabilité", juste: true },
        { html: "Prix d'achat, marque, couleur, poids", aide: "Ces critères ne disent rien des conséquences d'une panne pour les patients." },
        { html: "Seulement l'âge de l'appareil", aide: "L'âge ne dit pas ce qui se passe pour les patients pendant la panne." }
      ], { colonnes: 1, ok: function () { j.bravo("Impact, délai, plan B, secours, traçabilité."); j.suite(); } });
    } },
    { nom: "Au lit du patient", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "personne", [220, 260], 160, A.C.jeu); A.icone(n.g, "automate", [470, 260], 140, A.C.jeu);
      j.titre("Un analyseur de biologie délocalisée est installé aux urgences, hors du laboratoire. Qui reste responsable de la qualité ?");
      j.choix([
        { html: "Le service des urgences, puisque l'appareil y est", aide: "Le cours a une formule très claire à ce sujet." },
        { html: "Le laboratoire : déplacer l'analyseur ne déplace pas la responsabilité qualité", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("ISO 22870 : le POCT reste sous la responsabilité qualité du laboratoire."); j.suite(); } });
    } },
    { nom: "Six domaines", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque domaine à ce qu'il recouvre.");
      j.consigne("Touche un domaine, puis son contenu.");
      var p = A.paires({
        g: n.g, gauche: ["Clinique", "Analytique", "Technique", "Continuité"],
        droite: ["Équipements et métrologie", "Fonctionner malgré une défaillance", "Pertinence du processus", "Performance des méthodes"],
        bon: [2, 3, 0, 1], xg: 20, wg: 240, xd: 320, wd: 340, y0: 60, h: 104, pas: 134, taille: 20,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Côté médecin : la bonne analyse au bon moment.", "Côté méthode : elle mesure bien.", "Côté appareils.", "Quand quelque chose tombe en panne."][i]; },
        fin: function () { j.bravo("Clinique, analytique, technique, continuité ; plus infrastructure, qualité et sécurité."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Ce que voit le patient", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "personne", [340, 260], 200, A.C.jeu);
      j.titre("Le cours conclut : « Le patient ne voit jamais l'analyseur. » Que voit-il ?");
      j.choix([
        { html: "Le résultat", juste: true },
        { html: "Le contrat de maintenance", aide: "Il ne le voit pas non plus." },
        { html: "Le biologiste", aide: "Ce n'est pas la fin de la phrase du cours." }
      ], { colonnes: 3, ok: function () { j.bravo("Il voit le résultat ; chaque domaine conditionne sa fiabilité."); j.suite(); } });
    } }
  ]
}));
