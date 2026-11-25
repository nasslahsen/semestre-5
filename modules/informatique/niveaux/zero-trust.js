/* Niveau : architecture zero trust, comparaison des trois architectures, points de vigilance (séance 3, diapositives 17 à 19). */
NIVEAU(SIS.rejouable({
  id: "zero-trust",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Les principes", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["personne", "cadenas"], titre: "Le chef de service, sur site", sous: "faut-il le croire d'office ?" });
      j.titre("Le chef de service se connecte depuis son bureau, dans l'hôpital. Dans un modèle zero trust, son accès au PACS est-il accordé d'office ?");
      j.choix([{ html: "Oui, il est dans le réseau interne", aide: "Être à l'intérieur ne suffit plus." }, { html: "Non : chaque accès n'est accordé qu'après vérification stricte", juste: true }, { html: "Oui, s'il passe par un VPN", aide: "Le ZTNA remplace justement les VPN traditionnels." }], { colonnes: 1, ok: function () { j.bravo("Personne n'est digne de confiance d'office : vérification à chaque demande."); j.suite(); } });
    } },
    { nom: "Qui décide ?", jouer: function (j, n) {
      j.titre("Relie chaque élément du schéma zero trust du cours à son rôle.");
      SIS.associer(j, n.g, ["Passerelle ZTNA (PEP)", "Décision (PDP)", "Identité + MFA", "Micro-segmentation"], ["Îlots isolés : DPI, PACS, IoMT...", "Applique la décision à chaque session", "Annuaire, fournisseur d'identité", "Politique et risque : décide"], [1, 3, 2, 0], {
        aide: function (i) { return ["Le point où la décision est appliquée.", "Le point où elle est prise.", "Qui est la personne, prouvé deux fois.", "Le réseau découpé en îlots."][i]; },
        bravo: "Le PDP décide, le PEP applique, l'identité et la conformité nourrissent la décision." });
    } },
    { nom: "Quelle architecture ?", jouer: function (j, n) {
      j.titre("Range chaque question selon l'architecture qui y répond.");
      var c = [{ t: "Comment relier les centres de santé au CHU ?", bac: 0 }, { t: "Où placer les serveurs, quels flux entre niveaux ?", bac: 1 }, { t: "À qui faire confiance, et quand ?", bac: 2 }];
      SIS.ranger(j, n.g, c, ["SD-WAN", "DMZ, tri-tiers", "Zero trust"], { aide: function (i) { return ["Les liaisons entre sites.", "Un site, un datacenter.", "Le modèle d'accès."][c[i].bac]; }, bravo: "Relier, ranger, décider : elles se complètent." });
    } },
    { nom: "Le piège du tunnel", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "pirate", "serveur"], titre: "Rançongiciel au centre de santé A", sous: "relié au CHU par un tunnel SD-WAN" });
      j.titre("Un rançongiciel infecte le centre de santé A, relié au CHU par un tunnel SD-WAN chiffré. Le CHU est-il à l'abri grâce au chiffrement ?");
      j.choix([{ html: "Oui, le tunnel est chiffré", aide: "Chiffrer protège le transport, pas contre ce qui entre par le tunnel." }, { html: "Non : un tunnel chiffré n'est pas du zero trust ; il faut des segments séparés et un pare-feu interne", juste: true }, { html: "Oui, le SD-WAN remplace la DMZ", aide: "Le cours dit le contraire." }], { colonnes: 1, ok: function () { j.bravo("Dans l'overlay, les sites se font souvent confiance : le rançongiciel peut remonter."); j.suite(); } });
    } }
  ]
}));
