/* Boss du chapitre 18 : la nuit où le cœur de réseau tombe. */
NIVEAU(SIS.rejouable({
  id: "boss-gestion",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Les causes", jouer: function (j, n) {
      j.titre("Cette nuit, le cœur de réseau unique a été mal reconfiguré par un compte partagé, sans plan de retour, et personne n'a su qui l'avait fait. Relie chaque manque à la politique qui l'aurait évité.");
      SIS.associer(j, n.g, ["Cœur de réseau unique", "Compte partagé", "Pas de plan de retour arrière", "Personne ne sait qui a agi"], ["Gestion des changements", "Traçabilité : sessions enregistrées", "Cœur de réseau en paire", "Comptes nominatifs"], [2, 3, 0, 1], {
        aide: function (i) { return ["Un SPOF : il faut une paire.", "Aucun compte partagé.", "Tout changement réversible.", "Qui a changé quoi."][i]; },
        bravo: "Redondance, comptes nominatifs, changements réversibles, traçabilité." });
    } },
    { nom: "Remettre en route", jouer: function (j, n) {
      j.titre("Remets dans l'ordre la remise en route.");
      SIS.ordonner(j, n.g, ["Restaurer la configuration de référence sauvegardée", "Constater la panne dans la supervision", "Vérifier que DPI et PACS répondent", "Lire les journaux pour comprendre"], [1, 3, 0, 2], {
        aide: function (i, a, k) { return ["D'abord, voir la panne.", "Comprendre ce qui a changé.", "Revenir à la configuration sauvegardée.", "Vérifier les services critiques."][k]; },
        bravo: "Voir, comprendre, restaurer, vérifier : maîtriser la restauration." });
    } },
    { nom: "Sans aide", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["engrenage", "moniteur"], titre: "La prochaine mise à jour du cœur", sous: "quand la faire ?" });
      j.titre("Une fois le cœur doublé, quand programmer la prochaine mise à jour ?");
      j.choix([{ html: "Tout de suite, en pleine journée", aide: "Les soins tournent 24 h/24 : on négocie." }, { html: "Jamais, pour ne pas prendre de risque", aide: "Les correctifs ont un délai maximal selon la gravité." }, { html: "Dans une fenêtre de maintenance négociée avec les services de soins, un équipement de la paire à la fois", juste: true }], { colonnes: 1, ok: function () { j.bravo("La paire permet de mettre à jour sans couper, dans une fenêtre convenue avec les soins."); j.suite(); } });
    } }
  ]
}));
