/* Figure : protocoles d'administration autorisés ou interdits par la politique du cours. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-outils", {
    largeur: 960, hauteur: 360, titre: "Protocoles d'administration : autorisés ou interdits",
    essai: "<strong>Essaie</strong> : touche chaque protocole. <strong>Observe</strong> : chaque protocole interdit a son équivalent chiffré autorisé."
  });
  var P = [["SSH", 0, "chiffré : remplace Telnet."], ["HTTPS", 0, "chiffré : remplace HTTP."], ["SNMPv3", 0, "chiffré et authentifié : remplace SNMP v1/v2c."], ["Telnet", 1, "en clair : identifiants lisibles sur le réseau. Interdit."], ["HTTP", 1, "en clair. Interdit pour l'administration."], ["SNMP v1/v2c", 1, "communauté en clair. Interdit."], ["TFTP", 1, "transfert sans authentification ni chiffrement. Interdit."]];
  var it = P.map(function (p, i) { var bad = p[1] === 1, k = bad ? i - 3 : i; return { x: bad ? 500 : 40, y: 70 + k * 68, w: 420, h: 56, t: p[0], texte: p[2], coul: bad ? C.ko : C.ok, pale: bad ? C.koPale : C.okPale, taille: 20 }; });
  A.explorer(f, it, { fond: function (g) {
    A.texte(g, "Autorisés", [250, 36], { taille: 20, gras: 800, coul: C.ok });
    A.texte(g, "Interdits", [710, 36], { taille: 20, gras: 800, coul: C.ko });
  } });
})();
