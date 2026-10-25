/* Niveau : maintenance préventive et corrective (chapitre 8, avec les exemples des chapitres 2, 4 et 7). */
NIVEAU(LABO.rejouable({
  id: "maintenance",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "prev", "corr"], ST = { prev: { t: "préventive", f: C.jeuPale, b: C.jeu }, corr: { t: "corrective", f: C.koPale, b: C.ko } };
    n.ITEMS = [["Remplacer les cordons des pompes tous les six mois", "prev"], ["Changer une électrovanne en panne", "corr"], ["Contrôler l'exactitude du minuteur chaque année", "prev"], ["Dégager une cartouche coincée", "corr"], ["Nettoyer les sondes chaque semaine", "prev"], ["Remplacer un fusible grillé", "corr"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 40 + Math.floor(i / 2) * 180, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 150, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 19, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 150, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Préventive ou corrective ?", jouer: function (j, n) {
      n.classer();
      j.titre("Classe chaque intervention.");
      j.consigne("Touche une case pour la classer.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("Préventive : prévue au calendrier. Corrective : en réponse à une panne.");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Une fréquence fixe signale une intervention planifiée ; une panne, une intervention corrective."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Les étapes d'un dépannage", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre une intervention corrective.");
      j.consigne("Touche les étapes dans l'ordre.");
      var N = ["Intervention : pièce remplacée, recalibration", "Vérification : contrôle de qualité", "Détection : code d'erreur, alarme", "Diagnostic : lecture des journaux"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 21, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 90, y: 50 + i * 130, w: 500, h: 100 }; }),
        ordre: [2, 3, 0, 1],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["D'abord, savoir qu'il y a une panne.", "Puis en trouver la cause.", "Puis réparer.", "Enfin, prouver que tout mesure juste."][k]; },
        fin: function () { j.bravo("Détection, diagnostic, intervention, vérification."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Après la réparation", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "cle", [340, 260], 200, A.C.jeu);
      j.titre("Le technicien a changé la pièce défectueuse et l'automate s'allume normalement. Peut-on reprendre les analyses des patients ?");
      j.choix([
        { html: "Oui : il fonctionne", aide: "Un appareil qui s'allume et répond ne mesure pas forcément juste." },
        { html: "Pas avant d'avoir passé le contrôle de qualité", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("La vérification par le contrôle de qualité clôt l'intervention."); j.suite(); } });
    } },
    { nom: "Garder la trace", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Que demande l'ISO 15189 à propos des interventions sur les équipements ?");
      j.choix([
        { html: "Un historique complet des interventions", juste: true },
        { html: "Seulement la date de la dernière panne", aide: "La norme demande bien davantage." },
        { html: "Rien : c'est l'affaire du fabricant", aide: "L'ingénieur biomédical du laboratoire en est responsable." }
      ], { colonnes: 1, ok: function () { j.bravo("Un historique complet."); j.suite(); } });
    } }
  ]
}));
