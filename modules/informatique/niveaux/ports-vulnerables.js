/* Niveau : ports vulnérables et attaques des couches 4 à 7 (séance 2, diapositive 12). */
NIVEAU(SIS.rejouable({
  id: "ports-vulnerables",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Pourquoi ce port ?", jouer: function (j, n) {
      j.titre("Relie chaque port à la raison pour laquelle le cours le dit vulnérable.");
      SIS.associer(j, n.g, ["21 (FTP)", "22 (SSH)", "25 (SMTP)", "445 (SMB)", "53 (DNS)"], ["Force brute pour accéder aux serveurs", "Spam et phishing", "Texte clair : sniffing, vol de données", "Attaques DDoS", "Rançongiciels sur Windows"], [2, 0, 1, 4, 3], {
        aide: function (i) { return ["Transfert de fichiers en clair.", "Accès à distance aux serveurs : on essaie des mots de passe.", "Le courrier.", "Partage de fichiers Windows, comme WannaCry.", "L'annuaire du réseau, utilisé pour amplifier."][i]; },
        bravo: "FTP en clair, SSH force brute, SMTP phishing, SMB rançongiciels, DNS DDoS." });
    } },
    { nom: "À fermer d'abord", jouer: function (j, n) {
      var A = SIS; A.vider(n.g);
      A.tableau(n.g, 90, 100, [160, 340], 64, [["Port", "Service"], ["22", "SSH"], ["23", "Telnet"], ["443", "HTTPS"]], { taille: 22 });
      j.titre("Sur ce serveur d'administration, quel service désactiver en premier ?");
      j.choix([{ html: "SSH (22)", aide: "SSH est chiffré : on le protège contre la force brute, mais il remplace justement l'autre." }, { html: "Telnet (23)", juste: true }, { html: "HTTPS (443)", aide: "HTTPS est chiffré." }], { ok: function () { j.bravo("Telnet n'est pas chiffré : hautement non sécurisé."); j.suite(); } });
    } },
    { nom: "Six attaques", jouer: function (j, n) {
      j.titre("Relie chaque attaque à sa description.");
      SIS.associer(j, n.g, ["Scan de ports", "Man-in-the-Middle", "DDoS", "DNS hijacking"], ["Inonder un port pour rendre un service indisponible", "Fausse correspondance nom – IP dans un résolveur", "Chercher les services ouverts", "Intercepter un protocole non chiffré"], [2, 3, 0, 1], {
        aide: function (i) { return ["La recherche de portes ouvertes.", "Quelqu'un au milieu de l'échange.", "Le but : la disponibilité.", "L'annuaire ment."][i]; },
        bravo: "Scanner, intercepter, inonder, détourner." });
    } },
    { nom: "La faille la plus simple", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "horloge"], titre: "Correctif publié il y a 8 mois", sous: "jamais installé" });
      j.titre("Le correctif d'une faille SMB est publié depuis huit mois, mais le serveur ne l'a jamais reçu. Comment le cours appelle-t-il ce risque ?");
      j.choix([{ html: "Exploitation de vulnérabilités non corrigées", juste: true }, { html: "Man-in-the-Middle", aide: "Personne n'intercepte rien ici." }, { html: "Scan de ports", aide: "Le scan cherche ; ici la faille est déjà connue." }], { colonnes: 1, ok: function () { j.bravo("Un système qui n'a simplement pas reçu le correctif."); j.suite(); } });
    } }
  ]
}));
