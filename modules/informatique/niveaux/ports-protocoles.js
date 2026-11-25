/* Niveau : services, ports, protocoles et socket (séance 2, diapositives 7 et 8). */
NIVEAU(SIS.rejouable({
  id: "ports-protocoles",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quatre mots", jouer: function (j, n) {
      j.titre("Relie chaque mot à sa définition.");
      SIS.associer(j, n.g, ["Service", "Port", "Protocole", "Socket"], ["Règles de format et d'échange des données", "Adresse IP + numéro de port", "Application qui écoute sur un port", "Numéro de 0 à 65 535 qui dirige le trafic"], [2, 3, 0, 1], {
        aide: function (i) { return ["Un programme, comme un serveur web.", "Un numéro géré par le système d'exploitation.", "Un ensemble de règles et de conventions.", "Le point de terminaison unique d'une communication."][i]; },
        bravo: "Service, port, protocole, socket." });
    } },
    { nom: "Le bon port", jouer: function (j, n) {
      var A = SIS; A.vider(n.g);
      A.tableau(n.g, 90, 100, [200, 300], 64, [["Protocole", "Port"], ["SSH", "?"], ["SMTP", "?"], ["HTTP", "?"]], { taille: 22 });
      j.titre("Donne le port de SSH, de SMTP et de HTTP.");
      j.nombre({ cases: [{ attendu: 22 }, { attendu: 25 }, { attendu: 80 }], ligne: true, avant: "\\text{SSH, SMTP, HTTP} :", aide: function (k) { return ["Juste après FTP (20, 21).", "Juste après Telnet (23)... et un de plus.", "Le web."][k]; }, ok: function () { j.bravo("SSH 22, SMTP 25, HTTP 80."); j.suite(); } });
    } },
    { nom: "Les plages", jouer: function (j, n) {
      j.titre("Range chaque numéro de port dans sa plage.");
      var c = [{ t: "443", bac: 0 }, { t: "3389", bac: 1 }, { t: "52 000", bac: 2 }, { t: "53", bac: 0 }, { t: "8080", bac: 1 }, { t: "61 234", bac: 2 }];
      SIS.ranger(j, n.g, c, ["Bien connus 0 – 1023", "Réservés 1024 – 49 151", "Dynamiques 49 152 – 65 535"], { tailleBac: 17, aide: function (i) { return "Compare le numéro aux bornes 1023 et 49 151."; }, bravo: "Bien connus, réservés, dynamiques." });
    } },
    { nom: "Lire une socket", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["ecran", "serveur"], titre: "192.168.1.10:80", sous: "ligne ESTABLISHED dans netstat -ano" });
      j.titre("La commande netstat -ano montre une connexion vers 192.168.1.10:80. Que désigne cette socket ?");
      j.choix([{ html: "Le port 192 de la machine 168.1.10.80", aide: "La socket s'écrit adresse IP, deux-points, port." }, { html: "Le service web (port 80) de la machine 192.168.1.10", juste: true }, { html: "Une adresse IPv6", aide: "Quatre nombres séparés par des points : c'est de l'IPv4." }], { colonnes: 1, ok: function () { j.bravo("Socket = adresse IP + port : ici le serveur web de 192.168.1.10."); j.suite(); } });
    } }
  ]
}));
