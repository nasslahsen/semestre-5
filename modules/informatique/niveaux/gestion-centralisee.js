/* Niveau : centralisation de la gestion réseau (séance 3, diapositive 22). */
NIVEAU(SIS.rejouable({
  id: "gestion-centralisee",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Ce qu'on centralise", jouer: function (j, n) {
      j.titre("Range chaque tâche : fait-elle partie de ce qu'une gestion centralisée pilote d'après le cours ?");
      var c = [{ t: "Configuration des équipements", bac: 0 }, { t: "Supervision", bac: 0 }, { t: "Choix des médicaments", bac: 1 }, { t: "Journalisation", bac: 0 }, { t: "Correctifs", bac: 0 }, { t: "Planning des gardes", bac: 1 }];
      SIS.ranger(j, n.g, c, ["Pilotée par la plateforme", "Hors sujet"], { aide: function (i) { return c[i].bac ? "Ce n'est pas l'administration du réseau." : "Le cours la cite : configuration, accès, supervision, journalisation, correctifs."; }, bravo: "Configuration, accès, supervision, journalisation, correctifs." });
    } },
    { nom: "Ce qu'on y gagne", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["engrenage", "reseau"], titre: "180 switchs, 12 pare-feu", sous: "une seule plateforme" });
      j.titre("Quels gains le cours attribue-t-il à la gestion centralisée ?");
      j.choix([{ html: "Cohérence, visibilité, rapidité de réaction", juste: true }, { html: "Plus aucun besoin de sécurité", aide: "Au contraire : la plateforme devient la cible numéro un." }, { html: "Moins d'équipements réseau", aide: "Le nombre d'équipements ne change pas." }], { colonnes: 1, ok: function () { j.bravo("La même politique partout, tout est visible, on réagit vite."); j.suite(); } });
    } },
    { nom: "La cible numéro un", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["pirate", "engrenage"], titre: "Accès administrateur au pare-feu", sous: "obtenu par l'attaquant" });
      j.titre("Un attaquant obtient un accès d'administration sur un pare-feu. Pourquoi est-ce pire qu'un poste infecté ?");
      j.choix([{ html: "Il peut changer les règles et contourner toute la segmentation", juste: true }, { html: "Ce n'est pas pire", aide: "Le pare-feu tient les frontières de tout le réseau." }, { html: "Il ralentit Internet", aide: "Pense à ce que permettent des droits d'administration." }], { colonnes: 1, ok: function () { j.bravo("Même logique pour l'orchestrateur SD-WAN ou le PDP du zero trust."); j.suite(); } });
    } }
  ]
}));
