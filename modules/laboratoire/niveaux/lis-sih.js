/* Niveau : LIS et SIH (7.4 à 7.6) : fonctions du LIS, couches du SIH, sens des flux, traçabilité, protocoles. */
NIVEAU(LABO.rejouable({
  id: "lis-sih",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "clin", "adm", "tech"], ST = { clin: { t: "clinique", f: C.jeuPale, b: C.jeu }, adm: { t: "administrative et financière", f: C.accPale, b: C.acc }, tech: { t: "technique et logistique", f: C.vPale, b: C.v } };
    n.ITEMS = [["Facturation", "adm"], ["Prescriptions informatisées", "clin"], ["Serveurs et réseaux", "tech"], ["Admissions et sorties", "adm"], ["Dossier médical", "clin"], ["Sécurité des données", "tech"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 40 + Math.floor(i / 2) * 180, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 150, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 20, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 150, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Dans quel sens ?", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.boite(n.g, 40, 180, 220, 200, { fond: C.fond, bord: C.encre, ep: 3, rx: 16, titre: "SIH", taille: 30 });
      A.boite(n.g, 420, 180, 220, 200, { fond: C.fond, bord: C.encre, ep: 3, rx: 16, titre: "LIS", taille: 30 });
      A.texte(n.g, "?", [340, 280], { taille: 60, gras: 800, coul: C.jeu });
      j.titre("Le médecin saisit une demande d'analyses dans le dossier du patient. Dans quel sens circule-t-elle ?");
      j.choix([
        { html: "Du SIH vers le LIS", juste: true },
        { html: "Du LIS vers le SIH", aide: "C'est le sens du résultat validé, qui revient dans le dossier." }
      ], { colonnes: 2, ok: function () { j.bravo("La prescription descend du SIH vers le LIS ; le résultat validé remonte."); j.suite(); } });
    } },
    { nom: "Les couches du SIH", jouer: function (j, n) {
      n.classer();
      j.titre("Range chaque élément dans sa couche du système d'information hospitalier.");
      j.consigne("Touche une case pour changer sa couche.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("Clinique pour les soignants, administrative pour les flux de patients et d'argent, technique pour l'infrastructure.");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Demande-toi qui utilise chaque élément : un soignant, l'administration, ou l'équipe technique."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "La traçabilité", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "ordi", [340, 260], 220, A.C.jeu);
      j.titre("Pour la conformité (ISO 15189), quelle traçabilité le LIS doit-il assurer, d'après le cours ?");
      j.choix([
        { html: "Le nom du médecin prescripteur seulement", aide: "La traçabilité du cours est bien plus complète." },
        { html: "Qui a fait quoi, quand, et avec quel instrument", juste: true },
        { html: "Le prix de chaque analyse", aide: "C'est la facturation, côté SIH." }
      ], { colonnes: 1, ok: function () { j.bravo("Qui, quoi, quand, avec quel instrument."); j.suite(); } });
    } },
    { nom: "Un automate qui parle", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "automate", [180, 260], 160, C.jeu); A.icone(n.g, "ordi", [500, 260], 160, C.jeu);
      A.chemin(n.g, [[270, 260], [410, 260]], { coul: C.v, ep: 6 }); A.texte(n.g, "?", [340, 225], { taille: 40, gras: 800, coul: C.v });
      j.titre("Par quels protocoles standardisés un automate envoie-t-il ses résultats au LIS ?");
      j.choix([
        { html: "HL7 ou ASTM", juste: true },
        { html: "RFID", aide: "La RFID sert à identifier ou suivre un objet, pas à transmettre des résultats." },
        { html: "Code-barres", aide: "Le code-barres identifie le tube." }
      ], { colonnes: 3, ok: function () { j.bravo("HL7 ou ASTM, souvent par un middleware."); j.suite(); } });
    } },
    { nom: "Le compte rendu", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Quand le résultat revient-il dans le dossier clinique du patient ?");
      j.choix([
        { html: "Dès que l'automate a mesuré", aide: "Le résultat brut doit d'abord être validé." },
        { html: "Une fois validé par le biologiste, en temps réel", juste: true },
        { html: "Le lendemain, en lot", aide: "Le cours parle d'un renvoi en temps réel." }
      ], { colonnes: 1, ok: function () { j.bravo("Validé, puis renvoyé en temps réel vers le SIH."); j.suite(); } });
    } }
  ]
}));
