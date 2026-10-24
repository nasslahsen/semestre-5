/* Niveau : types d'échantillons (2.1) : sanguins, urinaires, autres ; contenant et additif. */
NIVEAU(LABO.rejouable({
  id: "echantillons",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, pl: { P: function (v) { return v; } } };
    n.tubes = function (sel) {
      A.vider(g);
      var T = [["Sang total", "edta", [{ h: 0.82, coul: C.sang }]], ["Plasma", "citrate", [{ h: 0.4, coul: C.sang }, { h: 0.42, coul: C.plasma }]], ["Sérum", "sec", [{ h: 0.42, coul: "#8f1d1d" }, { h: 0.06, coul: "#c9ccd3" }, { h: 0.34, coul: "#f5d76e" }]]];
      T.forEach(function (t, i) {
        A.tube(g, 90 + i * 200, 150, { bouchon: t[1], w: 80, h: 300, couches: t[2], etiquette: sel === i ? t[0] : "?", taille: 21, coulTexte: sel === i ? C.jeu : C.doux, op: sel === undefined || sel === i ? 1 : 0.4 });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Lequel est le sérum ?", jouer: function (j, n) {
      n.tubes();
      j.titre("Le biologiste veut la fraction liquide obtenue après coagulation complète du sang. Comment s'appelle-t-elle ?");
      j.choix([
        { html: "Sang total", aide: "Le sang total garde les cellules : il n'est pas une fraction." },
        { html: "Plasma", aide: "Le plasma vient d'un sang anticoagulé : il n'a pas coagulé." },
        { html: "Sérum", juste: true }
      ], { colonnes: 3, ok: function () {
        n.tubes(2);
        j.bravo("Sérum : après coagulation complète, tube sec ou à gel, puis centrifugation.");
        j.expliquer("<p><b>Sang total</b> : cellules et plasma, tube avec anticoagulant. <b>Plasma</b> : fraction liquide après centrifugation du sang anticoagulé. <b>Sérum</b> : fraction liquide après coagulation complète.</p>");
        j.suite();
      } });
    } },
    { nom: "Obtenir du plasma", jouer: function (j, n) {
      n.tubes(1);
      j.titre("Complète la recette du plasma.");
      var res = j.zone("", "");
      var z = j.zone("", 'Sang prélevé dans un tube <span class="trou" data-attendu="a"></span>, puis <span class="trou" data-attendu="c"></span> ; on garde le liquide du dessus.');
      j.jetons({
        reserve: res, trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "s", html: "sec" }, { id: "c", html: "centrifugation" }, { id: "a", html: "avec anticoagulant" }, { id: "k", html: "coagulation complète" }],
        aide: "Le plasma vient d'un sang qui n'a pas coagulé.",
        ok: function () { j.bravo("Anticoagulant, puis centrifugation."); j.suite(); }
      });
    } },
    { nom: "Les urines", jouer: function (j, n) {
      var A = LABO;
      j.titre("Chaque recueil d'urines a son usage. Relie-les.");
      j.consigne("Touche un recueil, puis son usage.");
      var p = A.paires({
        g: n.g, gauche: ["Premier jet du matin", "Milieu de jet, après nettoyage", "Cathétérisme ou ponction sus-pubienne", "Recueil des 24 heures"],
        droite: ["Urines stériles", "Bilan métabolique", "Cytologie urinaire", "ECBU"],
        bon: [2, 3, 0, 1], xg: 20, wg: 300, xd: 380, wd: 280, y0: 60, h: 104, pas: 134, taille: 18,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Le premier jet du matin sert à observer les cellules.", "Le milieu de jet, après nettoyage, sert à l'examen cytobactériologique.", "Ces deux gestes donnent une urine sans contact avec l'extérieur.", "Toute une journée de production : on mesure ce que le corps élimine."][i]; },
        fin: function () { j.bravo("Premier jet, milieu de jet, stériles, 24 heures."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Le LCR", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "aiguille", [340, 280], 220, A.C.jeu);
      j.titre("Comment le cours décrit-il le prélèvement du liquide céphalo-rachidien ?");
      j.choix([
        { html: "Ponction lombaire, manipulation stérile immédiate", juste: true },
        { html: "Écouvillonnage de la gorge", aide: "L'écouvillon sert pour la gorge, le nez, les plaies… Le LCR est un liquide profond." },
        { html: "Expectoration profonde, après rinçage buccal", aide: "C'est le recueil des crachats." }
      ], { colonnes: 1, ok: function () { j.bravo("Ponction lombaire, et on le manipule stérilement tout de suite."); j.suite(); } });
    } },
    { nom: "Ce que dit la réglementation", jouer: function (j, n) {
      n.tubes();
      j.titre("D'après l'article D. 6211-2 cité au cours, que faut-il pour le contenant d'un prélèvement ?");
      j.choix([
        { html: "Qu'il soit en verre", aide: "Le texte ne fixe pas le matériau." },
        { html: "Qu'il soit adapté à la nature du prélèvement, avec la nature et la concentration de l'additif clairement identifiées", juste: true },
        { html: "Qu'il porte le nom du laboratoire", aide: "Il s'agit de ce que contient le tube, pas de qui l'analyse." }
      ], { colonnes: 1, ok: function () { j.bravo("Contenant adapté, additif identifié (nature et concentration)."); j.suite(); } });
    } }
  ]
}));
