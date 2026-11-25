/* Révision du chapitre 18 : gestion centralisée, politiques et disponibilité dans des situations nouvelles. */
NIVEAU(SIS.rejouable({
  id: "revision-gestion",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Conforme ou pas ?", jouer: function (j, n) {
      j.titre("Range chaque pratique : conforme à la politique du cours, ou non ?");
      var c = [{ t: "Compte « admin » partagé par l'équipe", bac: 1 }, { t: "Sessions d'administration enregistrées", bac: 0 }, { t: "Mots de passe dans un fichier texte", bac: 1 }, { t: "Sauvegardes hors ligne des configurations", bac: 0 }, { t: "Interface du switch joignable depuis le LAN utilisateur", bac: 1 }, { t: "Test régulier de restauration", bac: 0 }];
      SIS.ranger(j, n.g, c, ["Conforme", "Non conforme"], { aide: function (i) { return c[i].bac ? "Cela contredit une exigence du tableau." : "Le tableau du cours le demande."; }, bravo: "Comptes nominatifs, secrets protégés, plan de gestion isolé, sauvegardes testées." });
    } },
    { nom: "Le maillon unique", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "alerte"], titre: "Un seul serveur DHCP", sous: "pour tout l'hôpital" });
      j.titre("Tout l'hôpital dépend d'un seul serveur DHCP. Que recommande le cours ?");
      j.choix([{ html: "Le mettre dans la DMZ", aide: "La DMZ est pour les services publics." }, { html: "Passer en IPv6", aide: "Le problème est le maillon unique." }, { html: "Le doubler, comme DNS, NTP et l'annuaire", juste: true }], { colonnes: 1, ok: function () { j.bravo("Services en doublon : DNS, DHCP, NTP, annuaire."); j.suite(); } });
    } },
    { nom: "La plateforme", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["engrenage", "bouclier"], titre: "Plateforme de gestion", sous: "à protéger comment ?" });
      j.titre("Comment le cours veut-il que la plateforme de gestion soit protégée ?");
      j.choix([{ html: "Comme le meilleur élément du réseau : durcie, haute disponibilité, mises à jour prioritaires, accès limités", juste: true }, { html: "Comme un poste ordinaire", aide: "Elle pilote tout le réseau." }, { html: "Il suffit de la cacher", aide: "Le cours demande des mesures, pas du secret." }], { colonnes: 1, ok: function () { j.bravo("Point unique de défaillance et de compromission : la mieux protégée."); j.suite(); } });
    } }
  ]
}));
