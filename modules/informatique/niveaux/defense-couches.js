/* Niveau : la défense en profondeur dans le réseau (séance 3, diapositive 10). */
NIVEAU(SIS.rejouable({
  id: "defense-couches",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quelle couche ?", jouer: function (j, n) {
      j.titre("Relie chaque événement à la couche de défense qui réagit.");
      SIS.associer(j, n.g, ["Quelqu'un tente d'entrer dans le local réseau", "Un flux non autorisé arrive d'Internet", "Un scan de ports est repéré", "Une pièce jointe piégée est ouverte sur un poste"], ["Antivirus", "IDS / IPS", "Sécurité physique", "Pare-feu"], [2, 3, 1, 0], {
        aide: function (i) { return ["Une porte, un badge.", "Filtrer les flux entre zones.", "Détecter un comportement d'attaque.", "Arrêter un logiciel malveillant sur le poste."][i]; },
        bravo: "Chaque couche a son rôle." });
    } },
    { nom: "Le principe", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["bouclier", "base"], titre: "Le pare-feu a cédé", sous: "que se passe-t-il ensuite ?" });
      j.titre("Le pare-feu a laissé passer une attaque. Dans une défense en profondeur, que se passe-t-il ?");
      j.choix([{ html: "Le réseau est perdu", aide: "C'est justement ce que les couches évitent." }, { html: "Les autres couches peuvent encore réagir", juste: true }, { html: "Le pare-feu se répare tout seul", aide: "Aucune couche ne se répare seule." }], { ok: function () { j.bravo("Si une couche de niveau inférieur est franchie, les autres réagissent."); j.suite(); } });
    } },
    { nom: "Selon la criticité", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["base", "document"], titre: "Base du DPI et imprimante du couloir", sous: "même niveau de protection ?" });
      j.titre("Faut-il mettre autant de couches devant la base du DPI que devant l'imprimante du couloir ?");
      j.choix([{ html: "Oui, tout se protège pareil", aide: "Le cours précise un critère pour doser les barrières." }, { html: "Non, on ne protège que le DPI", aide: "L'imprimante aussi est une entrée possible ; elle mérite moins, pas rien." }, { html: "Non : les barrières se dosent selon la criticité et l'importance du bien", juste: true }], { colonnes: 1, ok: function () { j.bravo("Plus le bien est critique, plus il a de couches."); j.suite(); } });
    } }
  ]
}));
