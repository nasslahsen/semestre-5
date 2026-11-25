/* Boss du chapitre 16 : le plan réseau de la nouvelle aile. */
NIVEAU(SIS.rejouable({
  id: "boss-cloisonnement",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "La démarche", jouer: function (j, n) {
      j.titre("Tu conçois le réseau de la nouvelle aile de cardiologie. Remets ta démarche dans l'ordre.");
      SIS.ordonner(j, n.g, ["Créer les VLAN et la DMZ", "Analyser les risques de chaque domaine", "Durcir : DTP coupé, ports fermés, VLAN 1 évité", "Classer les flux par criticité et niveau d'accès"], [1, 3, 0, 2], {
        aide: function (i, a, k) { return ["Toujours l'analyse des risques en premier.", "Puis on classe selon la criticité et les accès.", "Puis on construit les zones.", "Enfin on durcit la configuration."][k]; },
        bravo: "Analyser, classer, zoner, durcir." });
    } },
    { nom: "Les zones", jouer: function (j, n) {
      j.titre("Range chaque équipement de l'aile dans sa zone.");
      var c = [{ t: "Moniteurs de soins intensifs", bac: 1 }, { t: "Page d'information publique de l'aile", bac: 0 }, { t: "Postes des secrétaires", bac: 2 }, { t: "Pompes à perfusion", bac: 1 }, { t: "Imprimantes", bac: 2 }];
      SIS.ranger(j, n.g, c, ["DMZ", "VLAN biomédical", "VLAN bureautique"], { tailleBac: 18, aide: function (i) { return ["Joignable depuis Internet.", "Dispositifs médicaux critiques, difficiles à corriger.", "Bureautique ordinaire."][c[i].bac]; }, bravo: "Chaque équipement dans la zone qui correspond à sa criticité et à ses accès." });
    } },
    { nom: "Sans aide", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["moniteur", "ecran"], titre: "Le cardiologue veut les courbes", sous: "sur son poste du VLAN bureautique" });
      j.titre("Le cardiologue veut voir les courbes des moniteurs (VLAN biomédical) sur son poste du VLAN bureautique. Que faire ?");
      j.choix([{ html: "Mettre tout le monde dans le même VLAN", aide: "On perdrait le cloisonnement des dispositifs médicaux." }, { html: "Brancher son poste sur le switch biomédical", aide: "Il rejoindrait le segment le plus sensible avec un poste bureautique." }, { html: "Un routage inter-VLAN filtré (switch de couche 3, ACL) qui n'ouvre que ce flux", juste: true }], { colonnes: 1, ok: function () { j.bravo("On autorise un flux précis entre VLAN, sans ouvrir le reste."); j.suite(); } });
    } }
  ]
}));
