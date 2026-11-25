/* Boss du chapitre 12 : l'audit du réseau biomédical, de la reconnaissance au rapport. */
NIVEAU(SIS.rejouable({
  id: "boss-attaque",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Le plan de l'audit", jouer: function (j, n) {
      j.titre("Tu mènes un test de pénétration autorisé du réseau biomédical. Remets tes actions dans l'ordre.");
      SIS.ordonner(j, n.g, ["Détecter les versions des services", "Lire les sources publiques (OSINT)", "Scanner les ports des hôtes actifs", "Découvrir les hôtes actifs"], [1, 3, 2, 0], {
        aide: function (i, a, k) { return ["D'abord, sans rien toucher : ce qui est public.", "Ensuite, qui est allumé ?", "Puis, sur ces hôtes, quels ports sont ouverts ?", "Enfin, que tourne-t-il derrière ces ports ?"][k]; },
        bravo: "Du passif à l'actif, du général au précis." });
    } },
    { nom: "Lire le résultat", jouer: function (j, n) {
      var A = SIS, C = A.C; A.vider(n.g);
      A.tableau(n.g, 40, 80, [140, 160, 300], 60, [["Port", "État", "Service (version)"], ["22", "open", "SSH (récent)"], ["23", "open", "Telnet"], ["445", "open", "SMB v1"], ["3389", "filtered", "?"]], { taille: 18, style: function (i) { return i > 0 ? { mono: true } : {}; } });
      A.texte(n.g, "résultat de scan d'un poste de radiologie (exemple ajouté)", [340, 420], { taille: 15, coul: C.doux });
      j.titre("Combien de ports ce scan montre-t-il ouverts ?");
      j.nombre({ cases: [{ attendu: 3 }], avant: "\\text{ports ouverts} :", aide: function () { return "Compte les lignes « open » ; « filtered » veut dire bloqué par un pare-feu."; }, ok: function () { j.bravo("Trois ports ouverts : 22, 23 et 445."); j.suite(); } });
    } },
    { nom: "Sans aide", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["ecran", "alerte"], titre: "SMB v1 et Telnet", sous: "sur le poste de radiologie" });
      j.titre("Dans ton rapport, quelle conclusion tires-tu de ce scan ?");
      j.choix([
        { html: "Le poste est sûr : le port 3389 est filtré", aide: "Un seul port filtré ne protège pas les trois autres ouverts." },
        { html: "SSH est le risque principal", aide: "La version de SSH est récente ; regarde les deux autres services." },
        { html: "La version de SMB et Telnet en clair révèlent une cible non corrigée, à traiter en priorité", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("La détection de version a fait son travail : elle désigne la cible non corrigée."); j.expliquer("SMBv1 est le protocole exploité par WannaCry (chapitre 7) ; Telnet passe en clair."); j.suite(); } });
    } },
    { nom: "Le premier signal", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "bouclier"], titre: "Trois jours avant l'attaque", sous: "ce que l'IDS aurait pu voir" });
      j.titre("Dans un vrai incident, quelle phase de la kill chain aurait laissé la première trace visible sur le réseau de l'hôpital ?");
      j.choix([{ html: "La reconnaissance active (scan)", juste: true }, { html: "L'armement", aide: "L'armement se fait chez l'attaquant : rien ne passe par le réseau de l'hôpital." }, { html: "Les objectifs", aide: "C'est la dernière phase : à ce moment, il est trop tard." }], { ok: function () { j.bravo("Le scan actif est souvent le premier signal : le repérer, c'est couper la chaîne au début."); j.suite(); } });
    } }
  ]
}));
