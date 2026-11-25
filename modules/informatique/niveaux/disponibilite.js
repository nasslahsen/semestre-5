/* Niveau : disponibilité des réseaux, menaces et leviers (séance 3, diapositive 26). */
NIVEAU(SIS.rejouable({
  id: "disponibilite",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Ce qui la menace", jouer: function (j, n) {
      j.titre("Relie chaque incident au type de menace pour la disponibilité.");
      SIS.associer(j, n.g, ["Un ping flood sature le lien", "Un onduleur tombe en panne", "Un technicien supprime la mauvaise règle", "Tout passe par un seul lien vers le datacenter"], ["Architecture non adaptée", "Erreur humaine et d'exploitation", "Cyberattaque", "Panne d'infrastructure"], [2, 3, 1, 0], {
        aide: function (i) { return ["Une attaque.", "Un équipement qui lâche.", "Une erreur de manipulation.", "Le défaut est dans la conception."][i]; },
        bravo: "Cyberattaques, pannes, erreurs, architecture." });
    } },
    { nom: "Les trois leviers", jouer: function (j, n) {
      var A = SIS; A.vider(n.g);
      A.boite(n.g, 60, 60, 560, 90, { titre: "Supprimer les SPOF", taille: 24 });
      A.boite(n.g, 60, 180, 560, 90, { titre: "Empêcher leur dégradation", taille: 24 });
      A.boite(n.g, 60, 300, 560, 90, { titre: "?", taille: 24 });
      j.titre("Le cours donne trois leviers pour la disponibilité. Lequel manque ?");
      j.choix([{ html: "Chiffrer toutes les données", aide: "C'est la confidentialité." }, { html: "Maîtriser la restauration après incident", juste: true }, { html: "Supprimer les journaux", aide: "Les journaux aident, au contraire." }], { colonnes: 1, ok: function () { j.bravo("Supprimer les SPOF, empêcher la dégradation, maîtriser la restauration."); j.suite(); } });
    } },
    { nom: "Pourquoi d'abord ?", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["moniteur", "alerte"], titre: "Alarmes des moniteurs", sous: "elles doivent arriver, toujours" });
      j.titre("Pourquoi, à l'hôpital, la disponibilité prime-t-elle souvent sur la confidentialité ?");
      j.choix([{ html: "Parce que les données de santé ne sont pas sensibles", aide: "Elles le sont : ce n'est pas la raison." }, { html: "Parce que la loi l'impose", aide: "Le cours donne une raison médicale." }, { html: "Parce qu'elle touche directement la sécurité du patient", juste: true }], { colonnes: 1, ok: function () { j.bravo("Un réseau indisponible, c'est une prise en charge retardée."); j.suite(); } });
    } }
  ]
}));
