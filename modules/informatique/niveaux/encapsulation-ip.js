/* Niveau : encapsulation, IPv4 et IPv6 (séance 2, diapositive 6). */
NIVEAU(SIS.rejouable({
  id: "encapsulation-ip",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Descendre les couches", jouer: function (j, n) {
      j.titre("À l'envoi d'une page web, touche les contenus dans l'ordre où ils sont construits.");
      SIS.ordonner(j, n.g, ["HTTP + TCP + IPv4", "Bits sur le câble", "HTTP", "HTTP + TCP"], [2, 3, 0, 1], {
        aide: function (i, a, k) { return ["On part du message de l'application.", "Le transport ajoute son en-tête.", "Puis la couche Internet ajoute les adresses IP.", "Enfin l'accès au réseau transmet les bits."][k]; },
        bravo: "Encapsulation : chaque couche ajoute son en-tête en descendant." });
    } },
    { nom: "À la réception", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "serveur"], titre: "Le serveur reçoit les bits", sous: "et remonte jusqu'au message HTTP" });
      j.titre("Le serveur du portail reçoit la trame. Que fait chaque couche en remontant ?");
      j.choix([{ html: "Elle ajoute un en-tête", aide: "Ajouter, c'est à l'envoi." }, { html: "Elle chiffre le paquet", aide: "Ce n'est pas le rôle de chaque couche." }, { html: "Elle lit et retire son en-tête : désencapsulation", juste: true }], { colonnes: 1, ok: function () { j.bravo("Désencapsulation : on remonte en retirant les en-têtes."); j.suite(); } });
    } },
    { nom: "Combien d'adresses ?", jouer: function (j, n) {
      var A = SIS; A.vider(n.g);
      A.boite(n.g, 90, 120, 500, 120, { titre: "Adresse IPv4 : 32 bits", sous: "chaque bit vaut 0 ou 1", taille: 26 });
      A.texte(n.g, "192.168.5.18", [340, 330], { taille: 34, mono: true, gras: 700 });
      j.titre("Combien d'adresses IPv4 différentes existe-t-il ? Réponds en milliards, à 0,1 près.");
      j.nombre({ cases: [{ attendu: 4.3, tol: 0.05 }], avant: "N = 2^{32} \\approx", apres: "\\text{ milliards}", aide: function () { return "N = 2 puissance (nombre de bits). 2^10 vaut environ mille."; }, ok: function () { j.bravo("2^32 = 4 294 967 296, soit environ 4,3 milliards."); j.expliquer("Pas assez pour tous les appareils : les adresses IPv4 doivent être réutilisées et masquées. IPv6 passe à 128 bits."); j.suite(); } });
    } },
    { nom: "IPv4 ou IPv6", jouer: function (j, n) {
      j.titre("Range chaque caractéristique : IPv4 ou IPv6 ?");
      var c = [{ t: "32 bits", bac: 0 }, { t: "128 bits", bac: 1 }, { t: "192.168.5.18", bac: 0 }, { t: "50b2:6400::6c3a:b17d:0:10a9", bac: 1 }, { t: "Autoconfiguration possible", bac: 1 }, { t: "DHCP ou manuelle", bac: 0 }];
      SIS.ranger(j, n.g, c, ["IPv4 (1981)", "IPv6 (1998)"], { aide: function (i) { return c[i].bac ? "Adresses longues, hexadécimales, chaque appareil la sienne." : "Le format historique, à points, sur 32 bits."; }, bravo: "IPv4 : 32 bits, points, DHCP ou manuel. IPv6 : 128 bits, hexadécimal, autoconfiguration." });
    } }
  ]
}));
