/* Niveau : l'hémostase (4.9) : étapes, durées, facteurs vitamine K-dépendants, calcium et anticoagulants des tubes, prothrombinase, fibrinolyse. */
NIVEAU(LABO.rejouable({
  id: "hemostase",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "oui", "non"], ST = { oui: { t: "vitamine K-dépendant", f: C.okPale, b: C.ok }, non: { t: "non", f: C.fond, b: C.doux } };
    n.ITEMS = [["II", "oui"], ["V", "non"], ["VII", "oui"], ["VIII", "non"], ["IX", "oui"], ["X", "oui"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 40 + Math.floor(i / 2) * 180, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 150, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: "facteur " + it.t, sous: st ? st.t : "à classer", taille: 24, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 150, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Dans l'ordre", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Une coupure. Remets les événements dans l'ordre.");
      j.consigne("Touche les événements dans l'ordre.");
      var N = ["Agrégation par des ponts de fibrinogène", "Dissolution du caillot par la plasmine", "Vasoconstriction réflexe", "Formation de fibrine", "Adhésion des plaquettes par le facteur de von Willebrand", "Activation des plaquettes"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 19, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 90, y: 30 + i * 92, w: 500, h: 74 }; }),
        ordre: [2, 4, 5, 0, 3, 1],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["Le premier réflexe vient du vaisseau lui-même.", "Les plaquettes doivent d'abord se fixer.", "Une plaquette fixée change de forme et libère ses granules.", "Les plaquettes activées se relient entre elles.", "La coagulation consolide le clou.", "Des jours plus tard, le caillot disparaît."][k]; },
        fin: function () { j.bravo("Vasoconstriction, adhésion, activation, agrégation, fibrine, fibrinolyse."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Combien de temps ?", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque étape de l'hémostase à sa durée.");
      j.consigne("Touche une étape, puis sa durée.");
      var p = A.paires({
        g: n.g, gauche: ["Hémostase primaire", "Coagulation", "Fibrinolyse"],
        droite: ["48 à 72 heures", "3 à 5 minutes", "5 à 10 minutes"],
        bon: [1, 2, 0], xg: 20, wg: 300, xd: 380, wd: 280, y0: 90, h: 110, pas: 160, taille: 21,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Le clou plaquettaire se forme très vite.", "La fibrine arrive juste après le clou.", "Dissoudre le caillot prend des jours."][i]; },
        fin: function () { j.bravo("3 à 5 min, 5 à 10 min, 48 à 72 h."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "La vitamine K", jouer: function (j, n) {
      n.classer();
      j.titre("Quels facteurs ont besoin de la vitamine K pour être activés ?");
      j.consigne("Touche une case pour la classer.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("II, VII, IX et X. Le V et le VIII sont des cofacteurs.");
        j.expliquer("<p>C'est pourquoi les antivitamines K, qui traitent le risque de thrombose, ralentissent la coagulation.</p>");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Le cours en cite quatre ; les cofacteurs V et VIII n'en font pas partie."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Le tube qui ne coagule pas", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 290, 130, { bouchon: "citrate", w: 100, h: 320, couches: [{ h: 0.75, coul: C.sang }], etiquette: "citrate" });
      j.titre("Pourquoi le sang d'un tube citrate ou EDTA ne coagule-t-il pas ?");
      j.choix([
        { html: "Ces additifs captent le calcium (Ca²⁺), indispensable à la coagulation", juste: true },
        { html: "Ils détruisent les plaquettes", aide: "Les plaquettes sont même comptées dans un tube EDTA." },
        { html: "Ils remplacent la vitamine K", aide: "Ils agissent sur un ion, pas sur la vitamine K." }
      ], { colonnes: 1, ok: function () { j.bravo("Chélation du Ca²⁺ : pas de coagulation."); j.suite(); } });
    } },
    { nom: "La prothrombinase", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "chimie", [340, 260], 200, C.jeu);
      j.titre("Le complexe prothrombinase est bien plus actif que le facteur Xa seul pour activer la prothrombine. Combien de fois ? Donne la puissance de 10.");
      j.nombre({ avant: "\\times\\, 10^{\\,n},\\ n =", cases: [{ attendu: 5, tol: 0 }],
        aide: function () { return "Le cours le souligne de trois points d'exclamation : c'est bien plus que mille fois."; },
        ok: function () { j.bravo("100 000 fois : Xa, Va, phospholipides plaquettaires et Ca²⁺ réunis."); j.suite(); } });
    } }
  ]
}));
