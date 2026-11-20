/* Boss du TD 1 (CHU Atlas) : le comité de pilotage. Défendre la recommandation, ses conditions et le risque résiduel. */
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
      ["G = 10", "O = 3", "D = 3"].forEach(function (t, k) { A.boite(n.g, 30 + k * 220, 140, 180, 160, { titre: t, taille: 32, fond: k === 2 ? A.C.okPale : "#fff", bord: k === 2 ? A.C.ok : A.C.encre }); });
      A.texte(n.g, "D était à 7 avant la barrière", [340, 360], { taille: 16, coul: A.C.doux, gras: 500 });
      j.titre("Le comité impose un scan de l'étiquette au chevet : la détectabilité de la ligne 4 passe de 7 à 3. Nouvelle criticité ?");
      j.nombre({ cases: [{ attendu: 90 }], avant: "C =", aide: function () { return "10 × 3 × 3."; }, ok: function () { j.bravo("De 210 à 90 : la ligne passe sous le seuil, grâce à la détection."); j.suite(); } });
    } },
    { nom: "La recommandation", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["personne", "document"], titre: "Comité de pilotage", sous: "5 minutes pour recommander" });
      j.titre("Quelle recommandation présentes-tu au comité ?");
      j.choix([
        { html: "Offre A : elle est la plus sûre pour le patient", aide: "A est éliminée sur la continuité : une panne du robot arrête toutes les préparations." },
        { html: "Offre B, signée tout de suite : elle est moins chère", aide: "B a encore deux manques sur la sécurité et la conformité." },
        { html: "Offre B, sous conditions suspensives : certificat du logiciel, mesures de contamination, tests sur le DPI", juste: true },
        { html: "Aucune : on relance la consultation", aide: "Les manques de B peuvent être levés par écrit. Relancer est l'alternative, pas le premier choix." }
      ], { colonnes: 1, ok: function () { j.bravo("Un choix, avec ses conditions écrites."); j.suite(); } });
    } },
    { nom: "Qui lève quoi ?", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque condition au membre du comité qui la vérifie.");
      var p = A.paires({
        g: n.g, xg: 20, wg: 320, xd: 400, wd: 260, y0: 40, pas: 130, h: 110, taille: 17, tailleD: 19,
        gauche: ["Certificat du logiciel de traçabilité", "Mesures de contamination de l'isolateur", "Tests avec identités fictives sur le DPI", "Délai d'intervention avec pénalités"],
        droite: ["DSI", "Direction générale", "Ingénieur biomédical", "Pharmacien"],
        bon: [2, 3, 0, 1],
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Conformité des dispositifs et du logiciel : le rôle technique et réglementaire.", "La sécurité de la préparation.", "L'intégration au SIH et au DPI.", "Une clause de contrat, négociée par celui qui arbitre coût et calendrier."][i]; },
        fin: function () { j.bravo("Chaque condition a un responsable."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "La question du comité", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.tableau(n.g, 60, 120, [200, 140, 140], 80, [["Sécurité de B", "Total A", "Total B"], ["Note 3", "3,35", "3,40"], ["Note 2", "3,35", "?"]], { taille: 20 });
      A.texte(n.g, "poids 60 / 15 / 5 / 15 / 5", [300, 420], { taille: 16, coul: A.C.doux, gras: 500 });
      j.titre("Un autre groupe demande : « Et si les mesures de B sont mauvaises et que sa note de sécurité tombe à 2 ? » Calcule le total de B avec le jeu sécurité d'abord.");
      j.nombre({ cases: [{ attendu: 2.80, tol: 0.005 }], avant: "\\text{Total}_B =", aide: function () { return "Un point de moins sur un critère pesant 60 : le total perd 0,60."; }, ok: function () { j.bravo("2,80 contre 3,35 : A passerait devant. C'est pour ça que les mesures sont une condition."); j.suite(); } });
    } },
    { nom: "Le risque résiduel", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["personne", "alerte"], titre: "Risque résiduel", sous: "double contrôle manuel, isolateur manuel" });
      j.titre("Avec B, un risque reste : l'erreur humaine au double contrôle manuel. Comment le présentes-tu ?");
      j.choix([
        { html: "On n'en parle pas : il n'y a pas d'incident signalé sur B", aide: "Aucun incident signalé ne veut pas dire aucun risque. L'énoncé demande de nommer le risque résiduel." },
        { html: "Nommé, accepté par la direction générale sur avis du pharmacien, et suivi chaque mois par la qualité", juste: true },
        { html: "Il disparaît grâce aux conditions suspensives", aide: "Les conditions portent sur des documents. Le contrôle reste manuel." }
      ], { colonnes: 1, ok: function () { j.bravo("Un risque résiduel a un nom, un décideur et un suivi."); j.suite(); } });
    } }
  ]
}));
