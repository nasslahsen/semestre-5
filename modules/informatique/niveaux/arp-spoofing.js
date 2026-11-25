/* Niveau : protocole ARP, empoisonnement du cache et protections (séance 2, diapositives 10 et 11). */
NIVEAU(SIS.rejouable({
  id: "arp-spoofing",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "ARP normal", jouer: function (j, n) {
      j.titre("A veut joindre 192.168.1.1. Touche les étapes d'ARP dans l'ordre.");
      SIS.ordonner(j, n.g, ["D répond en unicast : « Ma MAC est …:A0 »", "A demande en broadcast : « Qui est 192.168.1.1 ? »", "A envoie ses trames à …:A0", "A range IP – MAC dans son cache"], [1, 0, 3, 2], {
        aide: function (i, a, k) { return ["A ne connaît que l'adresse IP : il demande à tout le monde.", "Celui qui a l'adresse répond.", "A mémorise la réponse.", "Il s'en sert pour envoyer."][k]; },
        bravo: "Request en broadcast, reply en unicast, cache, trames." });
    } },
    { nom: "La ligne empoisonnée", jouer: function (j, n) {
      var A = SIS, C = A.C; A.vider(n.g);
      A.texte(n.g, "cache ARP de PC A (192.168.1.100)", [340, 70], { taille: 19, gras: 800 });
      var lignes = [["192.168.1.254 (serveur B)", "00:00:00:00:00:03"], ["192.168.1.150 (hacker)", "00:00:00:00:00:03"]];
      A.tableau(n.g, 60, 110, [300, 260], 70, [["IPv4", "MAC"]].concat(lignes), { taille: 17 });
      A.texte(n.g, "MAC réelle du serveur B : 00:00:00:00:00:02", [340, 380], { taille: 17, coul: C.doux });
      j.titre("Après l'attaque, quelle ligne du cache de A prouve l'empoisonnement ?");
      j.choix([{ html: "La ligne du hacker", aide: "Le hacker a bien la MAC …:03 : cette ligne est exacte." }, { html: "La ligne du serveur B", juste: true }, { html: "Aucune", aide: "Compare la MAC du serveur B à sa MAC réelle." }], { ok: function () { j.bravo("L'adresse IP du serveur pointe vers la MAC du hacker : A lui envoie tout."); j.expliquer("Le hacker a envoyé un <b>gratuitous ARP</b> ; A l'a accepté sans l'avoir demandé ni vérifié."); j.suite(); } });
    } },
    { nom: "Pourquoi ça marche", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["pirate", "ecran"], titre: "Un gratuitous ARP", sous: "une annonce que personne n'a demandée" });
      j.titre("Pourquoi PC A accepte-t-il la fausse annonce ?");
      j.choix([{ html: "Parce que le hacker a cassé le chiffrement d'ARP", aide: "ARP n'est pas chiffré du tout." }, { html: "Parce que le switch transmet tout à tout le monde", aide: "Un switch envoie au bon port : c'est pour ça que le hacker doit tromper les caches." }, { html: "Parce qu'ARP n'authentifie rien et accepte une réponse non demandée", juste: true }], { colonnes: 1, ok: function () { j.bravo("ARP croit ce qu'on lui dit."); j.suite(); } });
    } },
    { nom: "Les parades", jouer: function (j, n) {
      j.titre("Relie chaque mesure de protection à ce qu'elle fait.");
      SIS.associer(j, n.g, ["DHCP Snooping", "DAI", "VLAN", "Entrées ARP statiques"], ["Confine le trafic en segments", "IP – MAC inscrite en dur pour la passerelle", "N'accepte que le serveur DHCP légitime", "Vérifie chaque paquet ARP contre une base fiable"], [2, 3, 0, 1], {
        aide: function (i) { return ["Il surveille les attributions d'adresses.", "Dynamic ARP Inspection : inspecter.", "Découper le réseau.", "Pour les équipements critiques."][i]; },
        bravo: "DHCP Snooping crée la base, DAI s'en sert, les VLAN confinent, les ARP statiques verrouillent." });
    } }
  ]
}));
