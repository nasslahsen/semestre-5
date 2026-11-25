/* Boss du TD 1 (CHU Atlas) : le comité de pilotage. Défendre la recommandation, ses conditions et le risque résiduel (modèle de l'enseignant). */
NIVEAU(SIS.rejouable({
  id: "boss-td1",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    return { g: g };
  },
  etapes: [
    { nom: "Une barrière sur l'étiquette", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      ["G = 8", "O = 4", "D = 2"].forEach(function (t, k) { A.boite(n.g, 30 + k * 220, 140, 180, 160, { titre: t, taille: 32, fond: k === 2 ? A.C.okPale : "#fff", bord: k === 2 ? A.C.ok : A.C.encre }); });
      A.texte(n.g, "D était à 4 dans le modèle (exemple ajouté)", [340, 360], { taille: 16, coul: A.C.doux, gras: 500 });
      j.titre("Le comité impose le contrôle à deux de chaque étiquette : la détectabilité de la ligne 4 passe de 4 à 2. Nouvelle criticité ?");
      j.nombre({ cases: [{ attendu: 64 }], avant: "C =", aide: function () { return "8 × 4 × 2."; }, ok: function () { j.bravo("De 128 à 64 : la ligne passe sous le seuil, grâce à la détection."); j.suite(); } });
    } },
    { nom: "La recommandation", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["personne", "document"], titre: "Comité de pilotage", sous: "5 minutes pour recommander" });
      j.titre("Quelle recommandation présentes-tu au comité ?");
      j.choix([
        { html: "Offre A : elle a la meilleure note (3,70)", aide: "A n'a aucun mode dégradé : le critère éliminatoire l'écarte, quelle que soit sa note." },
        { html: "Offre B, signée tout de suite : elle est moins chère", aide: "Le certificat du module logiciel manque encore." },
        { html: "Offre B, sous trois conditions suspensives : certificat du module logiciel, mesures contre l'exposition du personnel au contrat, mode dégradé et tests avec identités fictives au contrat", juste: true },
        { html: "Aucune : on relance la consultation", aide: "Les manques de B se lèvent par écrit. L'alternative du modèle : refaire la comparaison si A fournit un mode dégradé testé." }
      ], { colonnes: 1, ok: function () { j.bravo("Un choix, avec ses conditions écrites."); j.suite(); } });
    } },
    { nom: "Qui lève quoi ?", jouer: function (j, n) {
      var A = SIS;
      j.titre("Dans le modèle, relie chaque tâche à ceux qui en sont responsables.");
      var p = A.paires({
        g: n.g, xg: 20, wg: 320, xd: 400, wd: 260, y0: 40, pas: 130, h: 110, taille: 17, tailleD: 19,
        gauche: ["Déclencher le mode dégradé", "Audit avant l'achat", "Audit après l'ouverture", "Responsables du mode dégradé"],
        droite: ["Qualité, pharmacie, biomédical", "Pharmacienne cheffe et cadre de santé", "Pharmacienne et DSI", "Biomédical, pharmacie"],
        bon: [2, 3, 0, 1],
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Une décision conjointe : la pharmacie et le système.", "Certificats, visite, démonstration : la technique et la pharmacie.", "Indicateurs et incidents : la qualité suit, avec la pharmacie et le biomédical.", "Ceux qui encadrent le centre au quotidien."][i]; },
        fin: function () { j.bravo("Chaque condition a un responsable."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "La question du comité", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.tableau(n.g, 60, 120, [200, 140, 140], 80, [["Intégration de B", "Total A", "Total B"], ["Note 4", "3,40", "3,60"], ["Note 3", "3,40", "?"]], { taille: 20 });
      A.texte(n.g, "poids 25 / 25 / 25 / 15 / 10", [300, 420], { taille: 16, coul: A.C.doux, gras: 500 });
      j.titre("Un autre groupe demande : « Et si les tests sur le DPI déçoivent et que la note d'intégration de B tombe à 3 ? » Calcule le total de B avec le jeu où le coût pèse 25 %.");
      j.nombre({ cases: [{ attendu: 3.35, tol: 0.005 }], avant: "\\text{Total}_B =", aide: function () { return "Un point de moins sur un critère pesant 25 : le total perd 0,25."; }, ok: function () { j.bravo("3,35 contre 3,40 : A repasserait devant. C'est pour ça que les tests avec identités fictives sont une condition."); j.suite(); } });
    } },
    { nom: "Le risque résiduel", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["personne", "alerte"], titre: "Risque résiduel", sous: "isolateur à manipulation manuelle" });
      j.titre("Avec B, un risque reste : l'exposition du personnel est plus élevée qu'avec A. Comment le présentes-tu ?");
      j.choix([
        { html: "On n'en parle pas : il n'y a pas d'incident signalé sur B", aide: "Aucun incident signalé ne veut pas dire aucun risque. L'énoncé demande de nommer le risque résiduel." },
        { html: "Nommé, et accepté par le comité de pilotage, par écrit, après analyse de risques", juste: true },
        { html: "Il disparaît grâce aux conditions suspensives", aide: "Les conditions réduisent l'exposition, elles ne la suppriment pas : l'isolateur reste manuel." }
      ], { colonnes: 1, ok: function () { j.bravo("Un risque résiduel a un nom, un décideur et un suivi."); j.suite(); } });
    } }
  ]
}));
