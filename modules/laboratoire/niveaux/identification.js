/* Niveau : identification et traçabilité (2.3) : mentions obligatoires, chaîne de traçabilité, règle absolue, ISO 15189. */
NIVEAU(LABO.rejouable({
  id: "identification",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "patient", "preleveur", "echantillon"], ST = { patient: { t: "patient", f: C.jeuPale, b: C.jeu }, preleveur: { t: "préleveur", f: C.accPale, b: C.acc }, echantillon: { t: "échantillon", f: C.vPale, b: C.v } };
    n.ITEMS = [["Date de naissance", "patient"], ["Numéro RPPS ou ADELI", "preleveur"], ["Nature de l'examen", "echantillon"], ["Nom d'usage", "patient"], ["Heure du prélèvement", "echantillon"], ["Qualité ou profession", "preleveur"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 40 + Math.floor(i / 2) * 180, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 150, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 20, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 150, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    n.classer();
    return n;
  },
  etapes: [
    { nom: "Qui identifie quoi", jouer: function (j, n) {
      j.titre("Sur un échantillon, chaque mention identifie le patient, le préleveur ou l'échantillon. Classe-les.");
      j.consigne("Touche une case pour changer sa catégorie.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("Patient, préleveur, échantillon.");
        j.expliquer("<p>Patient : nom de naissance, nom d'usage, prénoms, date de naissance, sexe, numéro d'identification unique. Préleveur : nom et prénom, qualité ou profession, numéro RPPS ou ADELI. Échantillon : nature de l'examen, date et heure du prélèvement, conditions particulières.</p>");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Demande-toi de qui ou de quoi parle chaque mention."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "La chaîne de traçabilité", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre la chaîne de traçabilité d'un échantillon.");
      var N = ["Analyse", "Transport", "Archivage", "Enregistrement", "Prélèvement", "Résultat", "Réception"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 20, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 140, y: 18 + i * 82, w: 400, h: 64 }; }),
        ordre: [4, 1, 6, 3, 0, 5, 2],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["Tout commence sur le patient.", "Le tube voyage.", "Il arrive au laboratoire.", "On le saisit dans le système.", "On le mesure.", "On obtient…", "On garde la trace."][k]; },
        fin: function () { j.bravo("Prélèvement, transport, réception, enregistrement, analyse, résultat, archivage."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Un tube sans nom", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 290, 130, { bouchon: "sec", w: 100, h: 320, couches: [{ h: 0.7, coul: C.sang }] });
      A.s("rect", { x: 292, y: 200, width: 96, height: 120, fill: "#fff", stroke: C.ko, "stroke-width": 3 }, n.g);
      A.texte(n.g, "Salma ?", [340, 260], { taille: 22, gras: 700, coul: C.ko });
      j.titre("Un tube arrive avec seulement le prénom « Salma ». Le service affirme qu'il n'y a qu'une Salma. Que faire ?");
      j.choix([
        { html: "L'analyser : le service est sûr", aide: "Une affirmation orale ne remplace pas une identification univoque. Que dit la règle absolue ?" },
        { html: "Compléter l'étiquette au laboratoire", aide: "Le laboratoire ne peut pas deviner l'identité : seul le prélèvement, au chevet, l'établit." },
        { html: "Ne pas l'analyser : destruction selon la procédure et nouveau prélèvement", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("Règle absolue : mal identifié, jamais analysé.");
        j.expliquer("<p>L'ISO 15189 exige une procédure documentée d'identification, la vérification de l'identité avant tout prélèvement, un système d'identification unique et non ambigu, et la gestion des non-conformités : échantillon non identifié = rejet et nouveau prélèvement.</p>");
        j.suite();
      } });
    } },
    { nom: "Garder les données", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 280], 220, A.C.jeu);
      j.titre("Combien de temps, au minimum, le cours dit-il qu'il faut conserver les données de biologie médicale ?");
      j.nombre({ avant: "\\text{durée minimale} =", apres: "\\text{ans}", cases: [{ attendu: 5, tol: 0 }],
        aide: function () { return "Le cours donne une durée minimale, en années, variable selon les examens ; c'est un petit nombre."; },
        ok: function () { j.bravo("Au moins 5 ans (variable selon les examens)."); j.suite(); } });
    } },
    { nom: "Les dérivés", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 120, 170, { bouchon: "edta", w: 80, h: 260, couches: [{ h: 0.7, coul: C.sang }], etiquette: "tube d'origine" });
      A.fleche(n.g, [230, 300], [330, 300], { coul: C.jeu, ep: 4 });
      A.tube(n.g, 360, 230, { bouchon: C.gris, w: 50, h: 150, couches: [{ h: 0.5, coul: C.plasma }], etiquette: "aliquote" });
      A.fleche(n.g, [430, 300], [500, 300], { coul: C.jeu, ep: 4 });
      A.texte(n.g, "ADN", [560, 300], { taille: 30, gras: 800, coul: C.jeu });
      j.titre("Six mois plus tard, on extrait de l'ADN d'une aliquote congelée. Que demande la traçabilité ?");
      j.choix([
        { html: "L'ADN doit rester traçable jusqu'au tube d'origine", juste: true },
        { html: "Un nouveau numéro, sans lien avec le tube : c'est un autre produit", aide: "Sans lien, on ne saurait plus à quel patient appartient cet ADN." },
        { html: "Rien : la traçabilité s'arrête au résultat", aide: "Les dérivés biologiques font partie de la traçabilité." }
      ], { colonnes: 1, ok: function () { j.bravo("ADN, ARN, extraits, aliquotes : traçables au tube d'origine."); j.suite(); } });
    } }
  ]
}));
