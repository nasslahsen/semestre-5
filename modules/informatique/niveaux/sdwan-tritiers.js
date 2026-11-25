/* Niveau : architectures SD-WAN et tri-tiers (séance 3, diapositives 15 et 16). */
NIVEAU(SIS.rejouable({
  id: "sdwan-tritiers",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Le principe du SD-WAN", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "nuage", "reseau"], titre: "Fibre + 4G/5G ou VSAT", sous: "pilotées par logiciel" });
      j.titre("Un centre de santé a une fibre et un secours en 4G. Que fait le SD-WAN ?");
      j.choix([{ html: "Il combine les liaisons et gère le trafic intelligemment, par logiciel", juste: true }, { html: "Il remplace le pare-feu du centre", aide: "Chaque site garde son pare-feu (edge de site)." }, { html: "Il n'utilise que la fibre", aide: "Il combine plusieurs liaisons physiques." }], { colonnes: 1, ok: function () { j.bravo("Le SD-WAN virtualise le contrôle du réseau entre les sites."); j.suite(); } });
    } },
    { nom: "Le schéma SD-WAN", jouer: function (j, n) {
      j.titre("Relie chaque élément du schéma SD-WAN du cours à son rôle.");
      SIS.associer(j, n.g, ["Orchestrateur", "Pare-feu SD-WAN (edge)", "Tunnels IPsec (overlay)", "Underlay"], ["Fibre, MPLS, Internet, 4G/5G", "Politique centrale, supervision, journaux", "Protège l'entrée de chaque site", "Chiffrent le trafic entre les sites"], [1, 2, 3, 0], {
        aide: function (i) { return ["Le chef d'orchestre central.", "À l'entrée de chaque site.", "La couche chiffrée au-dessus du transport.", "Les liaisons physiques."][i]; },
        bravo: "Orchestrateur, edge, overlay, underlay." });
    } },
    { nom: "Les trois niveaux", jouer: function (j, n) {
      j.titre("Range chaque composant dans son niveau de l'architecture tri-tiers.");
      var c = [{ t: "Portail patient, reverse proxy", bac: 0 }, { t: "Serveur applicatif du DPI", bac: 1 }, { t: "Bases de données", bac: 2 }, { t: "WAF", bac: 0 }, { t: "Moteur d'interface, API", bac: 1 }, { t: "Stockage PACS", bac: 2 }];
      SIS.ranger(j, n.g, c, ["1. Présentation", "2. Application", "3. Données"], { aide: function (i) { return ["La partie exposée, en DMZ.", "La logique métier.", "Les informations sensibles."][c[i].bac]; }, bravo: "Présentation, application, données." });
    } },
    { nom: "Le serveur web piraté", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "pirate"], titre: "Portail patient compromis", sous: "niveau 1 de l'architecture tri-tiers" });
      j.titre("Le portail patient (niveau 1) est compromis. Peut-il envoyer directement des requêtes SQL à la base ?");
      j.choix([{ html: "Oui, il est dans le même datacenter", aide: "Même datacenter, mais trois zones séparées par des pare-feu." }, { html: "Non : le pare-feu 3 n'accepte le SQL que depuis l'application", juste: true }, { html: "Oui, si le HTTPS est ouvert", aide: "Le HTTPS n'est ouvert qu'entre Internet et la DMZ." }], { colonnes: 1, ok: function () { j.bravo("Chaque niveau ne parle qu'à son voisin : la base reste hors d'atteinte."); j.suite(); } });
    } }
  ]
}));
