/* Révision du chapitre 8 (affiché 2) : critères de Chester, époques, survie, cellules d'essai, marquage, dans des situations nouvelles. */
NIVEAU({
  id: "revision-histoire",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { coches: 0 };
    var L = ["biomatériau ?", "époques", "suivi", "essais", "marquage"];
    n.dessin = function () {
      E.vider(g);
      E.s("rect", { x: 150, y: 90, width: 380, height: 460, rx: 18, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      E.s("rect", { x: 150, y: 90, width: 380, height: 70, rx: 18, fill: PLATEFORME.teinte(0.2), stroke: C.encre, "stroke-width": 3 }, g);
      D.texte(g, "dossier de révision", [340, 126], { taille: 22 });
      L.forEach(function (l, i) {
        var y = 210 + i * 70, f = i < n.coches;
        E.s("rect", { x: 190, y: y - 20, width: 40, height: 40, rx: 8, fill: f ? C.ok : "#fff", stroke: f ? C.ok : C.encre, "stroke-width": 3 }, g);
        if (f) E.s("path", { d: "M199 " + y + " l9 10 l15 -18", fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
        D.texte(g, l, [260, y], { ancre: "start", taille: 21, gras: f });
      });
    };
    n.cocher = function () { n.coches++; n.dessin(); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le pansement", jouer: function (j, n) {
      j.fig.astuce("Applique les trois critères de Chester.");
      j.titre("Une éponge hémostatique en collagène traité reste 3 jours dans une plaie opératoire. Est-ce un biomatériau ?");
      j.choix([
        { html: "Oui : contact avec le vivant, plus de quelques heures, non vivante", juste: true },
        { html: "Non : elle est d'origine naturelle", aide: "Chester dit « non vivant », pas « synthétique ». Un collagène traité n'est pas vivant." },
        { html: "Non : le contact est trop court", aide: "3 jours, c'est bien plus que quelques heures." }
      ], { colonnes: 1, ok: function () { n.cocher(); j.bravo("Trois « oui »."); j.suite(); } });
    } },
    { nom: "Chaque époque son matériau", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Associe chaque moment au matériau qui entre alors en médecine.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>pendant la guerre</b><span class="trou" data-attendu="p"></span><b>années 50</b><span class="trou" data-attendu="i"></span><b>1969</b><span class="trou" data-attendu="t"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "t", html: "titane" }, { id: "p", html: "PMMA" }, { id: "i", html: "acier inoxydable" }],
        aide: "Les cockpits d'avions anglais, la première hanche réussie, Brånemark.",
        ok: function () { n.cocher(); j.bravo("PMMA, inox, titane."); j.suite(); }
      });
    } },
    { nom: "Le suivi", jouer: function (j, n) {
      j.titre("Exemple ajouté. Sur 160 implants dentaires suivis 5 ans, 8 ont été perdus. Quel est le taux de survie ?");
      j.nombre({ avant: "\\text{survie} =", apres: "\\%", cases: [{ attendu: 95, tol: 0.01 }], ligne: true,
        aide: function () { return "(160 − 8) / 160 × 100."; },
        ok: function () { n.cocher(); j.bravo("152 / 160 = 95 %."); j.suite(); } });
    } },
    { nom: "La prothèse vasculaire", jouer: function (j, n) {
      j.titre("Pour tester une nouvelle prothèse vasculaire en culture, quelles cellules choisir en priorité ?");
      j.choix([
        { html: "Des ostéoblastes", aide: "Ils fabriquent l'os : utiles pour un implant osseux." },
        { html: "Des cellules endothéliales", juste: true },
        { html: "Des fibroblastes du derme", aide: "Ils donnent cohérence et souplesse au derme. Pense aux vaisseaux." }
      ], { colonnes: 1, ok: function () { n.cocher(); j.bravo("Elles contrôlent le tonus vasculaire, donc le débit sanguin local."); j.suite(); } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      j.titre("Un camarade résume : « On commercialise le dispositif, puis l'organisme notifié fait les tests in vitro et in vivo. » Où est l'erreur ?");
      j.choix([
        { html: "Les tests et le passage à l'homme viennent avant la commercialisation", juste: true },
        { html: "Il n'y a pas d'organisme notifié", aide: "Le cours dit bien : marquage via un organisme notifié." },
        { html: "On ne fait jamais de tests in vivo", aide: "Bancs d'essais, in vitro, in vivo : les trois sont cités." }
      ], { colonnes: 1, ok: function () { n.cocher(); j.bravo("Tests, homme, puis commercialisation, puis suivi."); j.suite(); } });
    } }
  ]
});
