/* Révision du chapitre 13 : OSI, encapsulation, adresses, ports et équipements dans des situations nouvelles. */
NIVEAU(SIS.rejouable({
  id: "revision-reseaux",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quelle couche est visée ?", jouer: function (j, n) {
      j.titre("Range chaque élément visé par une attaque dans la couche OSI qu'il concerne.");
      var c = [{ t: "Table d'adresses MAC d'un switch", bac: 0 }, { t: "Adresse IP source d'un paquet", bac: 1 }, { t: "Serveur web du portail", bac: 2 }, { t: "Trame Ethernet", bac: 0 }, { t: "Table de routage", bac: 1 }, { t: "Messagerie SMTP", bac: 2 }];
      SIS.ranger(j, n.g, c, ["2. Liaison", "3. Réseau", "7. Application"], { aide: function (i) { return ["Trames et adresses MAC.", "Paquets et adresses IP.", "Services utilisés par les applications."][c[i].bac]; }, bravo: "Liaison, réseau, application : la couche dit où frappe l'attaque." });
    } },
    { nom: "Les bits d'IPv6", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "document"], titre: "8 groupes de 4 chiffres hexadécimaux", sous: "un chiffre hexadécimal = 4 bits" });
      j.titre("Une adresse IPv6 compte 8 groupes de 4 chiffres hexadécimaux, et un chiffre hexadécimal vaut 4 bits. Combien de bits au total ?");
      j.nombre({ cases: [{ attendu: 128 }], avant: "8 \\times 4 \\times 4 =", apres: "\\text{ bits}", aide: function () { return "Multiplie les trois nombres."; }, ok: function () { j.bravo("128 bits : c'est bien la taille d'une adresse IPv6."); j.suite(); } });
    } },
    { nom: "Le port qui trahit", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "alerte"], titre: "Port 23 en écoute", sous: "sur l'automate du traitement d'air" });
      j.titre("netstat montre un service en écoute sur le port 23. Quel service est-ce ?");
      j.choix([{ html: "SSH", aide: "SSH, c'est 22." }, { html: "Telnet", juste: true }, { html: "SMTP", aide: "SMTP, c'est 25." }], { ok: function () { j.bravo("Port 23 : Telnet, un service bien connu (plage 0 – 1023)."); j.suite(); } });
    } },
    { nom: "Le vieil équipement", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "alerte"], titre: "Un vieux boîtier au sous-sol", sous: "il recopie chaque trame sur tous ses ports" });
      j.titre("Au sous-sol, un vieux boîtier recopie chaque trame sur tous ses ports. Qu'est-ce, et pourquoi est-ce un problème ?");
      j.choix([{ html: "Un routeur : il expose le LAN à Internet", aide: "Un routeur choisit un chemin ; il ne recopie pas partout." }, { html: "Un hub : tout poste branché voit le trafic des autres", juste: true }, { html: "Un switch : sa table MAC est pleine", aide: "Un switch normal envoie chaque trame au bon port seulement." }], { colonnes: 1, ok: function () { j.bravo("Le hub diffuse tout : obsolète, et indiscret."); j.suite(); } });
    } }
  ]
}));
