/* Niveau : les règles à respecter pour cloisonner (séance 3, diapositive 9). */
NIVEAU(SIS.rejouable({
  id: "regles-cloisonnement",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Par où commencer ?", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["document", "reseau"], titre: "Découper le réseau du CHU", sous: "première étape ?" });
      j.titre("Quelle est la première règle du cours pour découper un réseau hospitalier ?");
      j.choix([{ html: "Acheter un switch par service", aide: "Le matériel vient après la réflexion." }, { html: "Créer le plus de VLAN possible", aide: "Le cours dit même de les limiter au strict nécessaire." }, { html: "Faire une analyse des risques de chaque domaine", juste: true }], { colonnes: 1, ok: function () { j.bravo("L'analyse des risques dit quelles exigences a chaque domaine."); j.suite(); } });
    } },
    { nom: "Quelle règle ?", jouer: function (j, n) {
      j.titre("Relie chaque décision à la règle qu'elle applique.");
      SIS.associer(j, n.g, ["Le DPI a sa propre zone", "Le portail est en DMZ, le PACS en zone critique", "Un réseau séparé pour administrer les switchs", "La nouvelle aile est zonée dès son plan"], ["Niveaux de sécurité des accès", "Cloisonnement dans toute extension", "Criticité des informations", "Zone d'administration dédiée"], [2, 0, 3, 1], {
        aide: function (i) { return ["Ses informations sont les plus critiques.", "DMZ, interne, critique : des niveaux d'accès.", "L'administration à part.", "Chaque extension compte."][i]; },
        bravo: "Criticité, niveaux d'accès, administration, extensions." });
    } },
    { nom: "L'erreur", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["ecran", "engrenage"], titre: "Interfaces d'administration", sous: "joignables depuis le réseau bureautique" });
      j.titre("Les interfaces d'administration des switchs sont joignables depuis n'importe quel poste bureautique. Quelle règle est oubliée ?");
      j.choix([{ html: "Dédier une zone d'administration, au minimum logiquement séparée", juste: true }, { html: "Tenir compte des extensions", aide: "Rien n'a été agrandi." }, { html: "Subdiviser selon la criticité des informations", aide: "C'est l'administration du réseau qui est en cause." }], { colonnes: 1, ok: function () { j.bravo("L'administration du réseau doit avoir sa propre zone."); j.suite(); } });
    } }
  ]
}));
