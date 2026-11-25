/* Figure : l'accès de télémaintenance d'un fabricant, direct ou par le bastion, limité dans le temps. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-vigilance", {
    largeur: 960, hauteur: 380, titre: "L'accès de maintenance du fabricant",
    essai: "<strong>Essaie</strong> : bascule « passer par le bastion ». <strong>Observe</strong> : l'accès devient tracé, enregistré et limité dans le temps."
  });
  var g = A.s("g", null, f.svg), bastion = false;
  function dessiner() {
    A.vider(g);
    A.icone(g, "personne", [110, 180], 80); A.texte(g, "Fabricant", [110, 250], { taille: 18, gras: 800 });
    A.icone(g, "moniteur", [850, 180], 80); A.texte(g, "Scanner (DM)", [850, 250], { taille: 18, gras: 800 });
    if (bastion) {
      A.fleche(g, [170, 180], [370, 180], { ep: 5, coul: C.ok }); A.fleche(g, [590, 180], [790, 180], { ep: 5, coul: C.ok });
      A.boite(g, 380, 120, 200, 120, { titre: "Bastion", sous: "MFA, session enregistrée, ouvert 2 h", fond: C.okPale, bord: C.ok, ep: 4, taille: 22 });
    } else {
      A.fleche(g, [170, 180], [790, 180], { ep: 5, coul: C.ko, tirets: "10 8" });
      A.texte(g, "VPN direct, permanent, sans trace", [480, 150], { taille: 18, gras: 700, coul: C.ko });
    }
    f.direct.innerHTML = bastion ? "Par le <strong>bastion</strong> : le même point d'entrée que les administrateurs, une session enregistrée et un accès ouvert pour la durée de l'intervention (durée : exemple ajouté)." : "<strong>Accès direct</strong> : un identifiant volé chez le fabricant suffit pour entrer, à toute heure, sans que l'hôpital le voie.";
  }
  R.bascule(f.reglages, "Passer par le bastion", false, function (e) { bastion = e.target.checked; dessiner(); });
  dessiner();
})();
