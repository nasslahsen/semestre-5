/* Niveau : installer et entretenir un microscope (chapitre 5, III à VII) : fréquences, précautions, rayures, moisissures, manipulation. */
NIVEAU(LABO.rejouable({
  id: "microscope-entretien",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "jour", "mois", "six"], ST = { jour: { t: "chaque jour", f: C.jeuPale, b: C.jeu }, mois: { t: "chaque mois", f: C.accPale, b: C.acc }, six: { t: "tous les six mois", f: C.vPale, b: C.v } };
    n.ITEMS = [["Essuyer l'huile de l'objectif 100×", "jour"], ["Souffler la poussière des oculaires", "mois"], ["Vérifier câbles, fusibles et ampoule", "six"], ["Éclairage au minimum, puis housse", "jour"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 60 + Math.floor(i / 2) * 250, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 200, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 21, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 200, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Le calendrier", jouer: function (j, n) {
      n.classer();
      j.titre("Classe chaque opération d'entretien selon sa fréquence.");
      j.consigne("Touche une case pour changer sa fréquence.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("L'huile et l'éclairage chaque jour, la poussière chaque mois, l'électricité tous les six mois.");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Ce qui se fait après chaque utilisation est quotidien ; l'inspection de l'installation électrique est la plus espacée."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "microscope", [340, 260], 240, A.C.jeu);
      j.titre("Un stagiaire décrit son nettoyage. Quelle phrase va contre les précautions du cours ?");
      j.choix([
        { html: "« J'ai soufflé la poussière des objectifs à la poire. »", aide: "C'est la bonne méthode." },
        { html: "« J'ai nettoyé les lentilles avec de l'éthanol. »", juste: true },
        { html: "« J'ai mis la solution sur le papier optique, pas sur la lentille. »", aide: "C'est exactement ce que demande le cours." }
      ], { colonnes: 1, ok: function () { j.bravo("Jamais d'éthanol sur les éléments optiques : il les endommage."); j.suite(); } });
    } },
    { nom: "Une toile d'araignée", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("circle", { cx: 340, cy: 280, r: 210, fill: "#fbf8f1", stroke: C.encre, "stroke-width": 6 }, n.g);
      for (var k = 0; k < 8; k++) { var a = k * Math.PI / 4; A.s("line", { x1: 340, y1: 280, x2: 340 + 180 * Math.cos(a), y2: 280 + 180 * Math.sin(a), stroke: C.gris, "stroke-width": 2 }, n.g); }
      [60, 110, 160].forEach(function (r) { A.s("circle", { cx: 340, cy: 280, r: r, fill: "none", stroke: C.gris, "stroke-width": 2 }, n.g); });
      j.titre("Des ombres en forme de toile d'araignée restent dans le champ de l'oculaire, même après nettoyage. Que faire ?");
      j.choix([
        { html: "Le nettoyer encore, plus fort", aide: "Ces ombres ne sont pas de la saleté : frotter davantage aggraverait les choses." },
        { html: "Remplacer l'oculaire : ce sont des rayures", juste: true },
        { html: "Changer l'ampoule", aide: "L'ampoule joue sur l'intensité, pas sur un motif fixe dans l'oculaire." }
      ], { colonnes: 1, ok: function () { j.bravo("Des rayures : l'oculaire est à remplacer."); j.suite(); } });
    } },
    { nom: "De la moisissure", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("circle", { cx: 340, cy: 280, r: 150, fill: C.froidPale, stroke: C.froid, "stroke-width": 5 }, n.g);
      [[300, 240], [380, 300], [330, 330], [400, 230]].forEach(function (p) { A.s("circle", { cx: p[0], cy: p[1], r: 18, fill: "#8a9a5b", opacity: 0.7 }, n.g); });
      j.titre("Une lentille porte des taches de moisissure. Que propose le cours ?");
      j.choix([
        { html: "Un tampon de coton imbibé de solution antifongique (en général de l'éther), mouvements circulaires très légers", juste: true },
        { html: "Le mélange eau distillée et éthanol à 95 %", aide: "Ce mélange est pour le corps du microscope, pas pour les surfaces optiques." },
        { html: "Un papier ordinaire, en frottant fort", aide: "Le papier ordinaire raye les lentilles." }
      ], { colonnes: 1, ok: function () { j.bravo("Coton et antifongique ; et contrôler l'humidité du local."); j.suite(); } });
    } },
    { nom: "Le déplacer", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "microscope", [340, 260], 240, A.C.jeu);
      j.titre("On doit déplacer le microscope sur une autre paillasse. Comment le soulever ?");
      j.choix([
        { html: "Par la tête binoculaire, d'une main", aide: "La tête porte les prismes : c'est fragile, et une main ne suffit pas." },
        { html: "À deux mains : l'une au bras, l'autre au socle", juste: true },
        { html: "Par la platine", aide: "La platine est une pièce de réglage, pas une poignée." }
      ], { colonnes: 1, ok: function () { j.bravo("À deux mains, bras et socle."); j.suite(); } });
    } }
  ]
}));
