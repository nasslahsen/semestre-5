/* Niveau : Nmap, ses fonctionnalités et les types de scan (séance 2, diapositive 4). */
NIVEAU(SIS.rejouable({
  id: "nmap",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Ce que Nmap répond", jouer: function (j, n) {
      j.titre("Relie chaque question de l'auditeur à la fonctionnalité de Nmap qui y répond.");
      SIS.associer(j, n.g, ["Quelles machines sont allumées sur le réseau biomédical ?", "Le port 445 du serveur est-il ouvert ?", "Quel logiciel, et quelle version, écoute sur ce port ?", "Ce poste tourne-t-il sous Windows ou Linux ?"],
        ["Scan de ports", "Identification de l'OS", "Découverte d'hôtes", "Détection de services"], [2, 0, 3, 1], {
        aide: function (i) { return ["Qui est actif et connecté ?", "Ouvert, fermé ou bloqué ?", "Le programme et sa version exacte.", "Le système d'exploitation."][i]; },
        bravo: "Hôtes, ports, services, OS." });
    } },
    { nom: "Le scan furtif", jouer: function (j, n) {
      var A = SIS, C = A.C; A.vider(n.g);
      A.boite(n.g, 40, 60, 180, 80, { titre: "Scanner", taille: 22 }); A.boite(n.g, 460, 60, 180, 80, { titre: "Serveur", taille: 22 });
      A.fleche(n.g, [225, 190], [455, 190], { ep: 4, coul: C.acc }); A.texte(n.g, "SYN", [340, 170], { taille: 20, gras: 800, coul: C.acc });
      A.fleche(n.g, [455, 270], [225, 270], { ep: 4, coul: C.ok }); A.texte(n.g, "SYN-ACK", [340, 250], { taille: 20, gras: 800, coul: C.ok });
      A.fleche(n.g, [225, 350], [455, 350], { ep: 4, coul: C.gris, tirets: "8 8" }); A.texte(n.g, "ACK ?", [340, 330], { taille: 20, gras: 800, coul: C.gris });
      A.texte(n.g, "poignée de main TCP", [340, 440], { taille: 18, coul: C.doux });
      j.titre("Le scanner envoie SYN, reçoit SYN-ACK, et n'envoie jamais le ACK final. Quel type de scan est-ce ?");
      j.choix([{ html: "Scan TCP connect", aide: "Le TCP connect va jusqu'au bout de la poignée de main." }, { html: "Scan UDP", aide: "UDP n'a pas de poignée de main." }, { html: "Scan SYN (« furtif »)", juste: true }], { ok: function () { j.bravo("Seul le premier paquet de la poignée de main, sans la terminer."); j.expliquer("Plus discret que le TCP connect, qui apparaît dans les journaux applicatifs, mais visible par un IDS bien réglé."); j.suite(); } });
    } },
    { nom: "Les types de scan", jouer: function (j, n) {
      j.titre("Relie chaque type de scan à ce qu'en dit le cours.");
      SIS.associer(j, n.g, ["Scan TCP connect", "Scan SYN", "Scan UDP", "Détection de version / OS"],
        ["Plus lent, moins fiable, souvent ignoré à tort", "Révèle directement les cibles non corrigées", "Apparaît facilement dans les journaux applicatifs", "Plus discret, mais vu par un IDS bien réglé"], [2, 3, 0, 1], {
        aide: function (i) { return ["Une connexion complète laisse des traces côté application.", "La poignée de main n'est pas terminée.", "Services sans connexion : DNS, SNMP, NTP.", "Connaître la version, c'est savoir si une faille connue est ouverte."][i]; },
        bravo: "Connect visible, SYN discret, UDP négligé, version révélatrice." });
    } },
    { nom: "Le plus dangereux", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "pirate"], titre: "« Apache 2.4.49 »", sous: "version affichée par le scan" });
      j.titre("Un scan affiche la version exacte du serveur web du portail patient. Pourquoi est-ce l'information la plus utile à l'attaquant ?");
      j.choix([
        { html: "Elle lui donne le mot de passe administrateur", aide: "La version ne contient aucun secret ; pense aux failles connues." },
        { html: "Il peut vérifier si cette version a une faille connue non corrigée", juste: true },
        { html: "Elle rend le serveur indisponible", aide: "Lire une version ne bloque rien." }
      ], { colonnes: 1, ok: function () { j.bravo("La détection de version révèle directement les cibles non corrigées."); j.suite(); } });
    } }
  ]
}));
