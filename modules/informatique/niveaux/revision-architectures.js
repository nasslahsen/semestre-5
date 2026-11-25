/* Révision du chapitre 17 : couches, VPN, architectures et Purdue dans des situations nouvelles. */
NIVEAU(SIS.rejouable({
  id: "revision-architectures",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quel outil ?", jouer: function (j, n) {
      j.titre("Relie chaque besoin de l'hôpital à la solution du cours.");
      SIS.associer(j, n.g, ["Relier six centres de santé avec fibre et 4G", "Isoler la base du DPI du portail web", "Empêcher un rançongiciel de passer d'un poste à l'autre", "Séparer la GTB (automates) du réseau bureautique"], ["Modèle de Purdue", "Micro-segmentation (zero trust)", "SD-WAN", "Architecture tri-tiers"], [2, 3, 1, 0], {
        aide: function (i) { return ["Des liaisons entre sites.", "Trois niveaux séparés par des pare-feu.", "Des îlots, aucune confiance d'office.", "Séparer l'OT de l'IT."][i]; },
        bravo: "SD-WAN, tri-tiers, zero trust, Purdue." });
    } },
    { nom: "Le mode d'IPsec", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "cadenas", "reseau"], titre: "VPN entre deux sites", sous: "les adresses internes doivent rester cachées" });
      j.titre("Pour un VPN entre deux sites, où les adresses internes doivent rester cachées, quel mode d'IPsec ?");
      j.choix([{ html: "Mode transport", aide: "Il laisse l'en-tête IP original en clair." }, { html: "AH seul", aide: "AH authentifie mais ne chiffre pas." }, { html: "Mode tunnel avec ESP", juste: true }], { ok: function () { j.bravo("Tunnel ESP : paquet original entièrement chiffré sous un nouvel en-tête."); j.suite(); } });
    } },
    { nom: "Les couches", jouer: function (j, n) {
      j.titre("Range chaque élément : est-ce une couche de défense citée par le cours ?");
      var c = [{ t: "IDS / IPS", bac: 0 }, { t: "Sécurité physique", bac: 0 }, { t: "Hub", bac: 1 }, { t: "Journalisation, supervision", bac: 0 }, { t: "Telnet", bac: 1 }, { t: "VPN", bac: 0 }];
      SIS.ranger(j, n.g, c, ["Couche de défense", "Pas une défense"], { aide: function (i) { return c[i].bac ? "C'est plutôt une faiblesse." : "Elle fait partie de la liste du cours."; }, bravo: "Physique, pare-feu, IDS/IPS, VPN, journalisation, antivirus." });
    } }
  ]
}));
