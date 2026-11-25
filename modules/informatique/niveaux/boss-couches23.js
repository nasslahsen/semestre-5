/* Boss du chapitre 14 : l'homme du milieu au laboratoire. */
NIVEAU(SIS.rejouable({
  id: "boss-couches23",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Reconstituer l'attaque", jouer: function (j, n) {
      j.titre("Un intrus a écouté les échanges entre l'automate du labo et le LIS. Remets son attaque dans l'ordre.");
      SIS.ordonner(j, n.g, ["Il relaie les trames et lit les résultats", "Il se branche sur une prise libre du labo", "Il envoie de faux gratuitous ARP aux deux machines", "Les deux caches ARP pointent vers sa MAC"], [1, 2, 3, 0], {
        aide: function (i, a, k) { return ["Il faut d'abord être sur le bon segment.", "Puis tromper les caches.", "Les caches sont alors empoisonnés.", "Il ne reste qu'à relayer."][k]; },
        bravo: "Présence, faux ARP, caches empoisonnés, homme du milieu." });
    } },
    { nom: "Toutes les failles", jouer: function (j, n) {
      j.titre("Range chaque constat : a-t-il permis l'attaque, ou n'y est-il pour rien ?");
      var c = [{ t: "Prise réseau active dans un couloir", bac: 0 }, { t: "Pas de DAI sur le switch", bac: 0 }, { t: "Labo dans le même VLAN que l'accueil", bac: 0 }, { t: "Firmware du routeur Internet à jour", bac: 1 }, { t: "Pas d'entrée ARP statique pour le LIS", bac: 0 }, { t: "Anti-DDoS en place", bac: 1 }];
      SIS.ranger(j, n.g, c, ["A permis l'attaque", "N'y est pour rien"], { aide: function (i) { return c[i].bac ? "Cette mesure ne concerne pas une attaque ARP dans le LAN." : "Sans ce manque, l'attaque ARP aurait été plus dure."; }, bravo: "Prise active, pas de DAI, pas de segmentation, pas d'ARP statique." });
    } },
    { nom: "Sans aide", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["tube", "serveur"], titre: "Automate et LIS", sous: "liaison critique à protéger en premier" });
      j.titre("Une seule mesure, tout de suite, pour cette liaison critique entre deux machines fixes ?");
      j.choix([{ html: "Limiter les réponses ICMP", aide: "L'attaque n'était pas un ping flood." }, { html: "Changer le mot de passe Wi-Fi", aide: "L'intrus était branché en filaire." }, { html: "Inscrire en dur la correspondance IP – MAC du LIS et de l'automate", juste: true }], { colonnes: 1, ok: function () { j.bravo("Des entrées ARP statiques pour les équipements critiques : aucun faux ARP ne peut plus les changer."); j.expliquer("Ensuite : DHCP Snooping et DAI sur le switch, un VLAN pour le labo, les prises inutilisées désactivées."); j.suite(); } });
    } }
  ]
}));
