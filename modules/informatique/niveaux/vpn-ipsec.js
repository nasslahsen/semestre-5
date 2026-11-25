/* Niveau : VPN, protocoles, IPsec (IKE, ESP, AH) et ses deux modes (séance 3, diapositives 11 à 14). */
NIVEAU(SIS.rejouable({
  id: "vpn-ipsec",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Ce que fournit un VPN", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["ecran", "cadenas", "serveur"], titre: "Tunnel chiffré", sous: "du domicile du cardiologue au CHU" });
      j.titre("Quelles trois propriétés un VPN fournit-il d'après le cours ?");
      j.choix([{ html: "Disponibilité, rapidité, gratuité", aide: "Le cours cite trois propriétés de sécurité, dont deux du triangle CID." }, { html: "Authentification, intégrité, confidentialité", juste: true }, { html: "Routage, commutation, diffusion", aide: "Ce sont des fonctions d'équipements réseau." }], { colonnes: 1, ok: function () { j.bravo("Authentification, intégrité, confidentialité, grâce au chiffrement et à l'encapsulation."); j.suite(); } });
    } },
    { nom: "Les protocoles VPN", jouer: function (j, n) {
      j.titre("Relie chaque protocole VPN à son point fort.");
      SIS.associer(j, n.g, ["IKEv2/IPsec", "WireGuard", "OpenVPN"], ["Robuste, polyvalent, standard de l'industrie", "Stable sur mobile lors des changements de réseau", "Moderne, open source, très rapide : nouvelle norme"], [1, 2, 0], {
        aide: function (i) { return ["Le préféré des appareils mobiles.", "Le plus récent des trois.", "Le standard pour la confidentialité."][i]; },
        bravo: "IKEv2 mobile, WireGuard moderne, OpenVPN polyvalent." });
    } },
    { nom: "IKE, ESP, AH", jouer: function (j, n) {
      j.titre("Range chaque rôle selon le protocole IPsec qui le tient.");
      var c = [{ t: "Négocier les paramètres de sécurité", bac: 0 }, { t: "Chiffrer les données", bac: 1 }, { t: "Établir les clés", bac: 0 }, { t: "Authentifier sans chiffrer", bac: 2 }];
      SIS.ranger(j, n.g, c, ["IKE (contrôle)", "ESP (données)", "AH (données)"], { aide: function (i) { return ["Le plan de contrôle prépare la liaison.", "Chiffrement, validation et authentification.", "Validation et authentification seulement."][c[i].bac]; }, bravo: "IKE négocie, ESP chiffre et authentifie, AH authentifie." });
    } },
    { nom: "Transport ou tunnel", jouer: function (j, n) {
      var A = SIS, C = A.C; A.vider(n.g);
      ["En-tête IP ESP", "En-tête ESP", "En-tête IP original", "Données", "En-queue ESP"].forEach(function (t, i) { A.boite(n.g, 20 + i * 130, 200, 120, 100, { titre: t, taille: 15, fond: i === 2 || i === 3 ? C.acc : C.accPale, bord: C.acc, coul: i === 2 || i === 3 ? "#fff" : C.encre }); });
      A.s("rect", { x: 280, y: 150, width: 380, height: 34, rx: 8, fill: C.koPale, stroke: C.ko, "stroke-width": 2 }, n.g);
      A.texte(n.g, "chiffré", [470, 167], { taille: 16, gras: 700, coul: C.ko, halo: false });
      j.titre("Dans ce paquet, l'en-tête IP original est chiffré sous un nouvel en-tête. Quel mode d'IPsec est-ce ?");
      j.choix([{ html: "Mode transport", aide: "En transport, l'en-tête IP original reste devant, en clair." }, { html: "Mode tunnel", juste: true }, { html: "Ce n'est pas IPsec", aide: "En-tête et en-queue ESP : c'est bien IPsec ESP." }], { ok: function () { j.bravo("Mode tunnel : tout le paquet original est chiffré, les vraies adresses sont cachées."); j.suite(); } });
    } }
  ]
}));
