/* TD 1, application 1.2 : vrai ou faux sur la transparence et le module, vitesse de cristallisation maximale. */
NIVEAU({
  id: "td1-vrai-faux",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { t: 25 };
    var X0 = 70, W = 560;
    function x(t) { return X0 + (t + 50) / 250 * W; }
    n.dessin = function () {
      E.vider(g);
      D.texte(g, "Tg = −10 °C, Tf = 150 °C, X = 0,5 à 25 °C", [340, 120], { taille: 19, gras: false, coul: C.doux });
      E.s("rect", { x: x(-50), y: 230, width: x(-10) - x(-50), height: 60, fill: "#d3e5ff" }, g);
      E.s("rect", { x: x(-10), y: 230, width: x(150) - x(-10), height: 60, fill: PLATEFORME.teinte(0.25) }, g);
      E.s("rect", { x: x(150), y: 230, width: x(200) - x(150), height: 60, fill: "#fde8e8" }, g);
      D.texte(g, "vitreux", [(x(-50) + x(-10)) / 2, 260], { taille: 16, fond: false });
      D.texte(g, "cristaux, opaque", [(x(-10) + x(150)) / 2, 260], { taille: 17, fond: false });
      D.texte(g, "fondu", [(x(150) + x(200)) / 2, 260], { taille: 16, fond: false });
      [-10, 150].forEach(function (t) { D.ligne(g, [x(t), 220], [x(t), 300], C.encre, 3); D.texte(g, t + " °C", [x(t), 325], { taille: 16 }); });
      D.ligne(g, [x(n.t), 190], [x(n.t), 330], D.C.acc, 4); D.texte(g, n.t + " °C", [x(n.t), 170], { taille: 20, coul: D.C.acc });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "À 50 °C", jouer: function (j, n) {
      n.t = 50; n.dessin();
      j.titre("Vrai ou faux : à 50 °C, le polymère est translucide ou opaque.");
      j.choix([{ html: "Vrai", juste: true }, { html: "Faux", aide: "50 °C est entre Tg et Tf : les cristaux sont-ils présents ?" }], { ok: function () { j.bravo("Vrai : les cristaux diffusent la lumière."); j.suite(); } });
    } },
    { nom: "À 160 °C", jouer: function (j, n) {
      n.t = 160; n.dessin();
      j.titre("Vrai ou faux : à 160 °C, le polymère est transparent.");
      j.choix([{ html: "Vrai", juste: true }, { html: "Faux", aide: "160 °C dépasse Tf = 150 °C." }], { ok: function () { j.bravo("Vrai : au-dessus de Tf, X = 0."); j.suite(); } });
    } },
    { nom: "De −20 à 20 °C", jouer: function (j, n) {
      n.t = 20; n.dessin();
      j.titre("Vrai ou faux : chauffé de −20 à 20 °C, si son module diminue légèrement, c'est que son taux de cristallinité a baissé.");
      j.choix([{ html: "Vrai", aide: "On passe Tg, pas Tf : quelle phase change d'état ?" }, { html: "Faux", juste: true }], { ok: function () { j.bravo("Faux : c'est la phase amorphe qui devient caoutchouteuse ; les cristaux tiennent."); j.suite(); } });
    } },
    { nom: "Cristalliser vite", jouer: function (j, n) {
      j.titre("En le refroidissant depuis l'état fondu, à quelle température la vitesse de cristallisation est-elle la plus élevée ?");
      j.nombre({ avant: "T = \\dfrac{T_f + T_g}{2} =", apres: "^\\circ\\text{C}", cases: [{ attendu: 70, tol: 0.01 }], ligne: true,
        aide: function () { return "(150 + (−10)) / 2."; },
        ok: function () { n.t = 70; n.dessin(); j.bravo("70 °C."); j.expliquer("<p>Trop chaud, les cristaux se défont ; trop froid, les chaînes ne bougent plus.</p>"); j.suite(); } });
    } }
  ]
});
