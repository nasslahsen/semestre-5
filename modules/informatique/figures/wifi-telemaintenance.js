/* Figure : l'échelle des protocoles Wi-Fi, du plus faible au plus sûr, et la faiblesse de chacun. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-wpa", {
    largeur: 960, hauteur: 400, titre: "Du WEP au WPA3",
    essai: "<strong>Essaie</strong> : touche chaque protocole. <strong>Observe</strong> : même le plus sûr a sa faille connue ; on choisit le meilleur disponible, pas un protocole parfait."
  });
  var P = [["WEP", "obsolète", "cassé en quelques minutes.", C.ko, C.koPale], ["WPA / WPA1", "TKIP", "ancien, utilise TKIP, aujourd'hui vulnérable.", C.brun, C.brunPale], ["WPA2", "KRACK", "attaque KRACK : la victime est forcée à réutiliser une clé déjà utilisée ; le trafic se déchiffre sans le mot de passe.", C.v, C.vPale], ["WPA3", "canal auxiliaire", "le plus robuste (chiffrement individuel des sessions, résistance à la force brute), mais attaques par canal auxiliaire : temps et mémoire du routeur trahissent des indices.", C.ok, C.okPale]];
  var it = P.map(function (p, i) { return { x: 30 + i * 230, y: 250 - i * 60, w: 210, h: 100 + i * 60, t: p[0], sous: p[1], texte: p[2], coul: p[3], pale: p[4], taille: 22 }; });
  A.explorer(f, it, { fond: function (g) {
    A.fleche(g, [30, 375], [930, 375], { ep: 4, coul: C.gris });
    A.texte(g, "plus faible", [80, 30], { taille: 16, coul: C.doux, gras: 700 });
    A.texte(g, "plus sûr", [880, 30], { taille: 16, coul: C.doux, gras: 700 });
  } });
})();
