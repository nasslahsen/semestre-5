/* Niveau : alumine et zircone. Pièces de la PTH, pureté de l'alumine, monophasique ou triphasique, HIP, fusion de la zircone. */
NIVEAU({
  id: "alumine-zircone",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { marque: null, libre: true };
    var cx = 340;
    function anneau(r1, r2, y) {
      var P = function (r, a) { return (cx + r * Math.cos(a)).toFixed(1) + " " + (y - r * Math.sin(a)).toFixed(1); };
      return "M" + P(r2, 0) + " A" + r2 + " " + r2 + " 0 0 0 " + P(r2, Math.PI) + " L" + P(r1, Math.PI) + " A" + r1 + " " + r1 + " 0 0 1 " + P(r1, 0) + " Z";
    }
    n.zones = { cupule: [340, 120], insert: [340, 215], tete: [340, 300], tige: [340, 470] };
    n.dessin = function () {
      E.vider(g);
      var m = function (k, base) { return n.marque === k ? D.C.acc : base; };
      E.s("path", { d: anneau(78, 98, 210), fill: m("cupule", "#a9b0bc"), stroke: C.encre, "stroke-width": 3 }, g);
      E.s("path", { d: anneau(58, 78, 280), fill: m("insert", "#f2f2f2"), stroke: C.encre, "stroke-width": 3 }, g);
      D.rond(g, [cx, 330], 52, { fill: m("tete", "#efe3cc"), stroke: C.encre, ep: 3 });
      E.s("path", { d: "M328 380 L352 380 L372 440 Q350 500 350 580 L322 580 Q318 500 304 440 Z", fill: m("tige", "#c3c8d2"), stroke: C.encre, "stroke-width": 3 }, g);
      [["cupule", 120], ["insert", 215], ["tête", 330], ["tige", 500]].forEach(function (l) { D.texte(g, l[0], [520, l[1]], { taille: 19, ancre: "start", gras: false }); D.ligne(g, [430, l[1]], [510, l[1]], C.doux, 1.5); });
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      if (Math.abs(p[0] - cx) > 110) return;
      if (p[1] < 155) n.surClic("cupule"); else if (p[1] < 255) n.surClic("insert"); else if (p[1] < 385) n.surClic("tete"); else n.surClic("tige");
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Dans le bassin", jouer: function (j, n) {
      j.fig.astuce("Touche une pièce de la prothèse.");
      j.titre("Touche la pièce qu'on impacte dans l'os du bassin.");
      var gagne = function () {
        n.libre = false; n.marque = "cupule"; n.dessin();
        j.bravo("La cupule métallique.");
        j.expliquer("<p>PTH : 1. la <b>cupule</b> métallique, impactée dans le bassin ; 2. l'<b>insert</b> (métal, céramique ou polyéthylène), mis dans la cupule ; 3. la <b>tête</b> (céramique ou métal), placée sur la tige ; 4. la <b>tige</b>, dans le canal fémoral.</p>");
        j.suite();
      };
      n.surClic = function (k) {
        if (k === "cupule") gagne();
        else { n.marque = k; n.dessin(); j.erreur("Cette pièce n'est pas fixée dans le bassin. Cherche la plus grande coque, tout en haut."); }
      };
      j.reponse(gagne);
    } },
    { nom: "Une alumine assez pure", jouer: function (j, n) {
      n.surClic = null; n.marque = "tete"; n.dessin();
      j.fig.astuce("");
      j.titre("Un lot de 500 g de poudre pour têtes de hanche respecte la norme ASTM. Combien d'alumine pure au minimum ? Et au plus combien de SiO₂ et d'oxydes alcalins ?");
      j.nombre({ avant: "m_{Al_2O_3} \\geq,\\ m_{imp} <", apres: "\\text{g}", cases: [{ attendu: 497.5, tol: 0.05 }, { attendu: 0.5, tol: 0.005 }], ligne: true,
        aide: function (k) { return k === 0 ? "Au moins 99,5 % : 0,995 × 500." : "Moins de 0,1 % : 0,001 × 500."; },
        ok: function () { j.bravo("497,5 g et 0,5 g."); j.suite(); } });
    } },
    { nom: "Une ou trois formes", jouer: function (j, n) {
      j.titre("Laquelle de ces deux céramiques est monophasique, avec une seule forme cristallographique ?");
      j.choix([
        { html: "L'alumine", juste: true },
        { html: "La zircone", aide: "La zircone est triphasique : cubique, tétragonale, monoclinique." }
      ], { ok: function () { j.bravo("L'alumine pure est monophasique et stable."); j.expliquer("<p>La zircone a trois mailles : cubique (propriétés modestes), tétragonale (satisfaisantes), monoclinique (plus de cohésion, plus dense). On l'obtient à partir du zircon \\(\\mathrm{ZrSiO_4}\\).</p>"); j.suite(); } });
    } },
    { nom: "Le pressage HIP", jouer: function (j, n) {
      j.titre("Complète la fiche du frittage HIP de l'alumine.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>température</b><span class="trou" data-attendu="t"></span><b>pression</b><span class="trou" data-attendu="p"></span><b>limite élastique obtenue</b><span class="trou" data-attendu="r"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "r", html: "580 MPa" }, { id: "t", html: "1400 à 1500 °C" }, { id: "p", html: "au moins 1000 bars" }],
        aide: "Hot Isostatic Pressing : on chauffe fort (degrés), on presse fort (bars), et on gagne en résistance à la flexion (MPa).",
        ok: function () { j.bravo("1400 à 1500 °C, 1000 bars, 580 MPa."); j.expliquer("<p>Grande dureté, faible frottement, bonne résistance à l'usure, inertie in vivo : l'alumine est idéale pour les couples de friction. Les couples alumine-alumine et alumine-UHMWPE font mieux que métal-UHMWPE.</p>"); j.suite(); }
      });
    } },
    { nom: "Fondre la zircone", jouer: function (j, n) {
      j.titre("La zircone fond à 2953 K. Combien cela fait-il en degrés Celsius ?");
      j.nombre({ avant: "T =", apres: "^\\circ\\text{C}", cases: [{ attendu: 2680, tol: 0.5 }], ligne: true,
        aide: function () { return "T(°C) = T(K) − 273."; },
        ok: function () { j.bravo("2680 °C."); j.expliquer("<p>La zircone a une grande stabilité chimique ; ses propriétés sont un peu inférieures à celles de l'alumine, mais à haute densité elle est très biocompatible, très résistante à l'usure, et frotte peu contre l'UHMWPE.</p>"); j.suite(); } });
    } }
  ]
});
