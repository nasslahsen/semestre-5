/* Révision du chapitre 12 : kill chain, ATT&CK, reconnaissance et Nmap dans des situations nouvelles. */
NIVEAU(SIS.rejouable({
  id: "revision-attaque",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Où en est-il ?", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["ecran", "pirate"], titre: "Une porte dérobée", sous: "trouvée sur un poste du laboratoire" });
      j.titre("L'équipe trouve une porte dérobée toute neuve sur un poste du laboratoire, mais aucune liaison sortante pour l'instant. Quelle phase vient d'avoir lieu, et laquelle faut-il empêcher maintenant ?");
      j.choix([
        { html: "Installation ; empêcher le C2 (pilotage)", juste: true },
        { html: "Livraison ; empêcher l'exploitation", aide: "La porte dérobée est déjà posée : on est plus loin." },
        { html: "Objectifs ; il est trop tard", aide: "Rien n'est volé ni chiffré pour l'instant." }
      ], { colonnes: 1, ok: function () { j.bravo("Après l'installation vient la liaison distante : couper les flux sortants casse la chaîne."); j.suite(); } });
    } },
    { nom: "Le bon outil", jouer: function (j, n) {
      j.titre("Range chaque outil ou source dans le bon type de reconnaissance.");
      var c = [{ t: "Nmap", bac: 1 }, { t: "Moteurs de recherche, réseaux sociaux", bac: 0 }, { t: "OpenVAS", bac: 1 }, { t: "Annonces d'emploi de l'hôpital", bac: 0 }];
      SIS.ranger(j, n.g, c, ["Passive (OSINT)", "Active"], { aide: function (i) { return c[i].bac ? "Cet outil envoie des paquets aux machines." : "Ce sont des informations publiques."; }, bravo: "Sources ouvertes d'un côté, scanners de l'autre." });
    } },
    { nom: "Le scan oublié", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "horloge"], titre: "Serveur NTP et SNMP", sous: "aucun port TCP ouvert" });
      j.titre("L'auditeur ne trouve aucun port TCP ouvert sur un équipement, et conclut qu'il est sûr. Pourtant il fait tourner NTP et SNMP. Quel scan a-t-il oublié ?");
      j.choix([{ html: "Le scan SYN", aide: "Le SYN teste toujours TCP." }, { html: "Le scan UDP", juste: true }, { html: "La découverte d'hôtes", aide: "Il sait déjà que l'équipement est là." }], { ok: function () { j.bravo("UDP : services sans connexion (DNS, SNMP, NTP), souvent ignorés à tort."); j.suite(); } });
    } },
    { nom: "Une matrice, pas une chaîne", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["document", "bouclier"], titre: "Préparer la défense", sous: "avec des techniques réellement observées" });
      j.titre("Le RSSI veut vérifier que ses outils détectent les techniques réellement utilisées par les groupes de rançongiciel. Quelle référence prend-il ?");
      j.choix([{ html: "La kill chain", aide: "Elle donne le déroulé général, pas le catalogue des moyens observés." }, { html: "MITRE ATT&CK", juste: true }, { html: "Le modèle OSI", aide: "C'est un modèle de communication, pas d'attaque." }], { ok: function () { j.bravo("ATT&CK : la base publique des techniques observées, par tactique."); j.suite(); } });
    } }
  ]
}));
