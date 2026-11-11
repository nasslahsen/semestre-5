/* TD 1, applications 1.3 et 1.4 : pourquoi le polyéthylène n'est pas caoutchouteux, polymère très cristallin. */
NIVEAU({
  id: "td1-polyethylene",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { X: 0.9 };
    n.dessin = function () {
      E.vider(g);
      D.texte(g, "phase cristalline et phase amorphe", [340, 120], { taille: 19, gras: false, coul: C.doux });
      for (var i = 0; i < 10; i++) for (var k = 0; k < 8; k++) {
        var cr = ((i * 7 + k * 3) % 10) / 10 < n.X;
        E.s("rect", { x: 140 + i * 40, y: 170 + k * 40, width: 36, height: 36, rx: 6, fill: cr ? C.jeu : "#f1eef6" }, g);
      }
      D.texte(g, "X = " + E.fmt(n.X, 1), [340, 520], { taille: 24, coul: C.jeu });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le polyéthylène", jouer: function (j, n) {
      j.titre("Le polyéthylène a un module entre 0,1 et 1 GPa. Qu'est-ce qui l'empêche d'être caoutchouteux (environ 1 MPa) à l'ambiante ?");
      j.choix([
        { html: "Sa Tg de −120 °C", aide: "Au-dessus de Tg, la phase amorphe est justement caoutchouteuse : cela le rendrait plutôt souple." },
        { html: "Son taux de cristallinité élevé", juste: true },
        { html: "Sa masse moléculaire élevée", aide: "Une masse élevée prolonge le plateau caoutchouteux ; elle ne le rigidifie pas jusqu'au GPa." }
      ], { colonnes: 1, ok: function () { j.bravo("Les cristaux, qui ne fondent qu'à Tf, tiennent le module."); j.suite(); } });
    } },
    { nom: "À −10 °C", jouer: function (j, n) {
      j.titre("Application 1.4 : Tg = −10 °C, Tf = 165 °C, X = 0,9. Vrai ou faux : à −10 °C, le polymère devient transparent.");
      j.choix([{ html: "Vrai", aide: "À Tg, la phase amorphe change d'état ; les cristaux, eux, sont toujours là." }, { html: "Faux", juste: true }], { ok: function () { j.bravo("Faux."); j.suite(); } });
    } },
    { nom: "À 180 °C", jouer: function (j, n) {
      j.titre("Vrai ou faux : à 180 °C, il est transparent.");
      j.choix([{ html: "Vrai", juste: true }, { html: "Faux", aide: "180 °C dépasse Tf = 165 °C." }], { ok: function () { n.X = 0; n.dessin(); j.bravo("Vrai : X = 0 au-dessus de Tf."); j.suite(); } });
    } },
    { nom: "Le module s'effondre", jouer: function (j, n) {
      j.titre("Chauffé de 20 à 180 °C, son module passe de 10⁹ Pa à 10⁶ Pa. Par combien est-il divisé ?");
      j.nombre({ avant: "\\dfrac{10^9}{10^6} =", cases: [{ attendu: 1000, tol: 0 }], ligne: true,
        aide: function () { return "10⁹ / 10⁶ = 10³."; },
        ok: function () { j.bravo("Divisé par 1000 : les cristaux ont fondu, X est passé à 0."); j.expliquer("<p>La solution ne donne pas la réponse à 1.4 e ; le raisonnement de 1.2 e donne vrai.</p>"); j.suite(); } });
    } }
  ]
});
