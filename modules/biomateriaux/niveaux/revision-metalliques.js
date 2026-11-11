/* Révision du chapitre 9 (affiché 4) : allergie, stress-shielding, implant temporaire, applications, IRM. */
NIVEAU({
  id: "revision-metalliques",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { allume: -1 };
    var M = [["316L", "#c3c8d2"], ["CoCr", "#a9b0bc"], ["titane", "#9fb2c9"], ["NiTi", PLATEFORME.teinte(0.5)], ["tantale", "#7d8596"]];
    n.dessin = function () {
      E.vider(g);
      D.texte(g, "cinq métaux d'implant", [340, 110], { taille: 19, coul: C.doux, gras: false });
      M.forEach(function (m, i) {
        var x = 110 + (i % 3) * 230, y = 200 + Math.floor(i / 3) * 200, a = i === n.allume;
        if (i >= 3) x += 115;
        E.s("rect", { x: x - 85, y: y - 60, width: 170, height: 120, rx: 18, fill: m[1], stroke: a ? D.C.acc : C.encre, "stroke-width": a ? 7 : 3 }, g);
        D.texte(g, m[0], [x, y], { taille: 24, fond: false });
      });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le patient allergique", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Un patient a une allergie connue au nickel. Pour sa vis de fixation, quel métal privilégier ?");
      j.choix([
        { html: "Inox 316L", aide: "Le 316L contient 10,5 à 13 % de nickel." },
        { html: "Titane", juste: true },
        { html: "NiTi", aide: "Le NiTi, c'est environ 50 % de nickel." }
      ], { ok: function () { n.allume = 2; n.dessin(); j.bravo("Le titane, hypoallergénique."); j.suite(); } });
    } },
    { nom: "Une tige en 316L", jouer: function (j, n) {
      j.titre("Avec le modèle ajouté du chapitre (même section, même allongement), quelle part de la charge l'os porte-t-il avec une tige en 316L de 200 GPa (tableau comparatif) ?");
      j.nombre({ avant: "\\dfrac{20}{20 + 200} =", apres: "\\%", cases: [{ attendu: 9.09, tol: 0.05 }], ligne: true,
        aide: function () { return "20 / 220, puis × 100."; },
        ok: function () { n.allume = 0; n.dessin(); j.bravo("Environ 9,1 %."); j.suite(); } });
    } },
    { nom: "Le bon métal pour la bonne pièce", jouer: function (j, n) {
      j.titre("Associe chaque dispositif au métal qui lui convient le mieux d'après le cours.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<span>stent qui reprend sa forme dans l\'artère</span><span class="trou" data-attendu="n"></span>' +
        '<span>électrode de pacemaker</span><span class="trou" data-attendu="f"></span>' +
        '<span>clou de fracture temporaire, bon marché</span><span class="trou" data-attendu="i"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "i", html: "inox 316L" }, { id: "n", html: "NiTi" }, { id: "f", html: "Ti-5Al-2,5Fe" }],
        aide: "Mémoire de forme : NiTi. Qualité du signal : Ti-5Al-2,5Fe. Implant temporaire : 316L.",
        ok: function () { n.allume = 3; n.dessin(); j.bravo("NiTi, Ti-5Al-2,5Fe, 316L."); j.suite(); }
      });
    } },
    { nom: "Le cotyle poreux", jouer: function (j, n) {
      j.titre("Un chirurgien veut une cupule sans ciment, avec une mise en charge immédiate et une porosité proche de l'os spongieux. Quel métal ?");
      j.choix([
        { html: "Du tantale poreux", juste: true },
        { html: "Du CoCr coulé", aide: "Le CoCr est très rigide (230 GPa) et dense : l'inverse de l'os spongieux." },
        { html: "De l'inox 316L", aide: "Le 316L est réservé aux implants temporaires." }
      ], { colonnes: 1, ok: function () { n.allume = 4; n.dessin(); j.bravo("Porosité 75 à 85 %, module 2,5 à 3,9 GPa."); j.suite(); } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      j.titre("Sur une fiche d'IRM, on lit : « Les implants en CoCr et en titane ne donnent aucun artefact. » Où est l'erreur ?");
      j.choix([
        { html: "Le CoCr est une cause d'artefact en IRM ; le titane, non", juste: true },
        { html: "C'est le titane qui donne des artefacts", aide: "Le cours dit que le titane n'est pas source d'artefact d'IRM." },
        { html: "Il n'y a pas d'erreur", aide: "Relis la remarque importante de la page sur le cobalt-chrome." }
      ], { colonnes: 1, ok: function () { n.allume = 1; n.dessin(); j.bravo("Le CoCr (et l'inox) donnent des artefacts."); j.suite(); } });
    } }
  ]
});
