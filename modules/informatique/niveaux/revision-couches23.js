/* Révision du chapitre 14 : équipements vulnérables, ARP, ICMP dans des situations nouvelles. */
NIVEAU(SIS.rejouable({
  id: "revision-couches23",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quelle attaque ?", jouer: function (j, n) {
      j.titre("Relie chaque symptôme à l'attaque qui l'explique.");
      SIS.associer(j, n.g, ["Le serveur ne répond plus, noyé de demandes d'écho", "Les paquets semblent venir d'une IP interne de confiance, mais non", "Les postes sont envoyés vers un faux DNS par le routeur", "Deux postes s'échangent leurs trames via un troisième"],
        ["Détournement DNS du routeur", "ARP spoofing (MitM)", "ICMP flood", "IP spoofing"], [2, 3, 0, 1], {
        aide: function (i) { return ["Écho ICMP en masse.", "L'adresse source est falsifiée.", "Les adresses DNS légitimes ont été remplacées.", "Un homme du milieu, par les caches ARP."][i]; },
        bravo: "ICMP flood, IP spoofing, DNS hijacking, ARP spoofing." });
    } },
    { nom: "La bonne parade", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "bouclier"], titre: "Le switch doit vérifier les ARP", sous: "en s'appuyant sur les baux DHCP" });
      j.titre("On veut que le switch rejette les ARP qui ne correspondent pas aux baux du serveur DHCP légitime. Quelles fonctions activer ?");
      j.choix([{ html: "VLAN natif et DTP", aide: "Ce sont des réglages de VLAN." }, { html: "DHCP Snooping puis DAI", juste: true }, { html: "Anti-DDoS", aide: "C'est contre l'inondation." }], { ok: function () { j.bravo("Le DHCP Snooping construit la base fiable, la DAI compare chaque ARP à cette base."); j.suite(); } });
    } },
    { nom: "Le critère touché", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["moniteur", "alerte"], titre: "Centrale de surveillance injoignable", sous: "pendant un ping flood" });
      j.titre("Pendant un ping flood, les alarmes des moniteurs n'arrivent plus à la centrale. Quel critère du triangle CID est touché ?");
      j.choix([{ html: "Confidentialité", aide: "Rien n'est lu par un tiers." }, { html: "Intégrité", aide: "Rien n'est modifié." }, { html: "Disponibilité", juste: true }], { ok: function () { j.bravo("Le déni de service attaque la disponibilité, critère vital à l'hôpital."); j.suite(); } });
    } },
    { nom: "Ce que voit l'homme du milieu", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["pirate", "document"], titre: "Résultats de labo relayés", sous: "par le poste du hacker" });
      j.titre("Le hacker au milieu relaie les résultats de labo vers le serveur. En plus de les lire, que peut-il faire de plus grave ?");
      j.choix([{ html: "Rien : il ne fait que relayer", aide: "Ce qui passe entre ses mains, il peut le changer." }, { html: "Modifier une valeur avant de la transmettre : atteinte à l'intégrité", juste: true }, { html: "Mettre à jour le firmware du switch", aide: "Il est sur un poste, pas dans l'administration du switch." }], { colonnes: 1, ok: function () { j.bravo("Un MitM menace la confidentialité et l'intégrité : une erreur de soins souvent non détectable."); j.suite(); } });
    } }
  ]
}));
