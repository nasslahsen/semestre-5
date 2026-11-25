/* Boss du chapitre 17 : le groupement sanitaire, choisir et combiner les architectures. */
NIVEAU(SIS.rejouable({
  id: "boss-architectures",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Le groupement", jouer: function (j, n) {
      j.titre("Un groupement sanitaire réunit un CHU et quatre centres de santé. Range chaque décision dans l'architecture qu'elle met en œuvre.");
      var c = [{ t: "Tunnels IPsec entre le CHU et les centres", bac: 0 }, { t: "Portail en DMZ, DPI derrière, base au fond", bac: 1 }, { t: "MFA et conformité du poste à chaque accès", bac: 2 }, { t: "Basculer sur la 4G quand la fibre tombe", bac: 0 }, { t: "SQL accepté seulement depuis l'application", bac: 1 }, { t: "Postes en îlots isolés", bac: 2 }];
      SIS.ranger(j, n.g, c, ["SD-WAN", "Tri-tiers", "Zero trust"], { aide: function (i) { return ["Les liaisons entre sites.", "Les niveaux du datacenter.", "La vérification de chaque accès."][c[i].bac]; }, bravo: "Les trois ensemble : relier, ranger, vérifier." });
    } },
    { nom: "La vigilance", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["document", "alerte"], titre: "« Notre SD-WAN est sécurisé »", sous: "dit le commercial" });
      j.titre("Le commercial affirme : « notre SD-WAN est sécurisé, plus besoin de DMZ ». Que réponds-tu ?");
      j.choix([{ html: "C'est vrai, le SD-WAN chiffre tout", aide: "Le chiffrement des liaisons ne range pas les serveurs." }, { html: "« SD-WAN sécurisé » n'a pas de définition unique, et le SD-WAN ne remplace ni la DMZ ni le tri-tiers", juste: true }, { html: "Il faut alors supprimer les pare-feu des sites", aide: "Chaque site garde son zonage." }], { colonnes: 1, ok: function () { j.bravo("Vérifier ce que le produit intègre (NGFW, IPS, filtrage web), et garder le zonage."); j.suite(); } });
    } },
    { nom: "Sans aide", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["engrenage", "reseau"], titre: "Production d'eau du CHU", sous: "automates, SCADA, liaison avec la GMAO" });
      j.titre("Les automates de la production d'eau du CHU doivent envoyer leurs données à la GMAO (réseau IT). Comment, selon le modèle de Purdue ?");
      j.choix([{ html: "Brancher les automates sur le réseau bureautique", aide: "Un virus de l'IT atteindrait alors l'OT." }, { html: "Par une DMZ industrielle, avec des pare-feu industriels aux frontières", juste: true }, { html: "Couper toute liaison", aide: "Le modèle laisse remonter les données, sous contrôle." }], { colonnes: 1, ok: function () { j.bravo("L'IDMZ (niveau 3.5) : les données remontent, aucun flux ne descend directement vers l'OT."); j.suite(); } });
    } }
  ]
}));
