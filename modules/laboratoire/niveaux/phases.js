/* Niveau : phases pré-analytique, analytique, post-analytique (1.5), étapes du pré-analytique, identitovigilance. */
NIVEAU(LABO.rejouable({
  id: "phases",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var PH = [null, "pre", "ana", "post"], ST = { pre: { t: "pré-analytique", f: C.jeuPale, b: C.jeu }, ana: { t: "analytique", f: C.accPale, b: C.acc }, post: { t: "post-analytique", f: C.vPale, b: C.v } };
    n.ITEMS = [["Identification du patient", "pre"], ["Calibration", "ana"], ["Validation biologique", "post"], ["Transport", "pre"], ["Réactifs", "ana"], ["Communication au prescripteur", "post"], ["Température de conservation", "pre"], ["Maintenance de l'analyseur", "ana"], ["Résultats critiques", "post"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.dessin = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 20 + (i % 3) * 220, y = 40 + Math.floor(i / 3) * 180, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 200, 150, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 18, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 200, 150, function () { if (!n.libre) return; it.choix = PH[(PH.indexOf(it.choix) + 1) % PH.length]; delete n.faux[i]; n.dessin(); });
      });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Classer les risques", jouer: function (j, n) {
      j.titre("Chaque point de risque appartient à une phase. Classe-les.");
      j.consigne("Touche une case pour passer de pré-analytique à analytique, puis post-analytique.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.dessin();
        j.bravo("Avant la mesure, pendant la mesure, après la mesure.");
        j.expliquer("<p><b>Pré-analytique</b> : de la prescription à l'arrivée de l'échantillon à l'analyseur. <b>Analytique</b> : la mesure. <b>Post-analytique</b> : du résultat brut à sa communication (validation, interprétation, communication).</p>");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.dessin();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées" : " case est mal classée") + " (bord rouge). Demande-toi : est-ce avant que l'échantillon arrive à l'analyseur, pendant la mesure, ou une fois le résultat obtenu ?"); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Où commence, où finit", jouer: function (j, n) {
      j.titre("D'après le cours, la phase pré-analytique va…");
      j.choix([
        { html: "du prélèvement jusqu'à la centrifugation", aide: "Elle commence plus tôt que le prélèvement, et finit plus tard que la centrifugation." },
        { html: "de la prescription jusqu'à l'arrivée de l'échantillon à l'analyseur", juste: true },
        { html: "de l'arrivée au laboratoire jusqu'au résultat brut", aide: "Le résultat brut est produit par la phase analytique." }
      ], { colonnes: 1, ok: function () { j.bravo("De la prescription à l'arrivée à l'analyseur."); j.suite(); } });
    } },
    { nom: "Les cinq étapes", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Un patient externe vient au laboratoire. Remets dans l'ordre les cinq grandes étapes du pré-analytique.");
      var N = ["Prélèvement et étiquetage des tubes", "Accueil et enregistrement au secrétariat", "Transfert à la salle d'analyse", "Appel et préparation en salle de prélèvement", "Attente et édition des ordres de prélèvement"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 18, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 60, y: 30 + i * 112, w: 560, h: 90 }; }),
        ordre: [1, 4, 3, 0, 2],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["On commence par vérifier l'identité et saisir l'ordonnance.", "Une fois le dossier validé, le SIL génère quelque chose pour la salle de prélèvement.", "Le patient est appelé ; on vérifie son identité une seconde fois.", "Vient l'acte lui-même, et l'étiquetage immédiat.", "Le tube part vers l'analyse."][k]; },
        fin: function () { j.bravo("Accueil, ordre de prélèvement, appel, prélèvement, transfert."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Deux vérifications", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "personne", [250, 280], 160, A.C.jeu); A.icone(n.g, "codebarre", [450, 280], 140, A.C.encre);
      j.titre("En salle de prélèvement, on vérifie l'identité du patient une seconde fois, alors qu'elle l'a été au secrétariat. Pourquoi ?");
      j.choix([
        { html: "Parce que la facturation l'exige", aide: "La facturation se fait à l'accueil. Que cherche-t-on à éviter au moment de prélever ?" },
        { html: "C'est une obligation légale, pour l'identitovigilance : zéro erreur de patient", juste: true },
        { html: "Pour choisir la couleur des tubes", aide: "Les tubes dépendent des examens prescrits, pas de l'identité." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Double vérification d'identité : une obligation légale.");
        j.expliquer("<p>Chaque étape du pré-analytique vise l'<b>identitovigilance</b> (zéro erreur de patient) et la conformité médicale. Un tube prélevé sur la mauvaise personne donnera un résultat parfaitement mesuré… et dangereusement faux.</p>");
        j.suite();
      } });
    } },
    { nom: "La phase critique", jouer: function (j, n) {
      j.titre("Dans quelle phase surviennent la majorité des erreurs de laboratoire ?");
      j.choix([
        { html: "Pré-analytique", juste: true },
        { html: "Analytique", aide: "Les automates sont calibrés et contrôlés. Les erreurs viennent surtout de ce qui se passe avant eux." },
        { html: "Post-analytique", aide: "La validation est un filet de sécurité, pas la source principale des erreurs." }
      ], { colonnes: 3, ok: function () { j.bravo("Pré-analytique : la phase critique."); j.suite(); } });
    } }
  ]
}));
