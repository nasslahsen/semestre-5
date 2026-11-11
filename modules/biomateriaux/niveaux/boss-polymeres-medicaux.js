/* Boss du chapitre 11 (affiché 7) : le genou artificiel, des matériaux à la salle d'opération. */
NIVEAU({
  id: "boss-polymeres-medicaux",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { ok: false };
    n.dessin = function () {
      E.vider(g);
      // fémur et tibia schématiques, bouclier fémoral, plateau tibial
      E.s("path", { d: "M270 60 L410 60 L420 200 Q340 230 260 200 Z", fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      E.s("path", { d: "M250 200 Q340 250 430 200 L440 250 Q340 300 240 250 Z", fill: n.ok ? "#a9b0bc" : "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      E.s("rect", { x: 240, y: 300, width: 200, height: 40, rx: 10, fill: n.ok ? PLATEFORME.teinte(0.6) : "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      E.s("rect", { x: 250, y: 340, width: 180, height: 16, fill: n.ok ? "#e8e0c8" : "#fff", stroke: C.encre, "stroke-width": 2 }, g);
      E.s("path", { d: "M260 356 L420 356 L400 560 L280 560 Z", fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      if (n.ok) [["bouclier : CoCr", 225], ["plateau : UHMWPE", 320], ["ciment : PMMA", 360]].forEach(function (l) { D.texte(g, l[0], [460, l[1]], { taille: 18, ancre: "start" }); });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Les trois matériaux", jouer: function (j, n) {
      j.titre("Prothèse de genou : choisis le matériau du bouclier fémoral, du plateau tibial sur lequel il glisse, et du ciment qui fixe le tout.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>bouclier fémoral</b><span class="trou" data-attendu="c"></span><b>plateau tibial</b><span class="trou" data-attendu="u"></span><b>ciment</b><span class="trou" data-attendu="p"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "p", html: "PMMA" }, { id: "c", html: "CoCr" }, { id: "u", html: "UHMWPE" }],
        aide: "Le cours cite un bouclier en CoCr qui glisse sur un plateau en polyéthylène ; le PMMA sert de ciment orthopédique.",
        ok: function () { n.ok = true; n.dessin(); j.bravo("CoCr, UHMWPE, PMMA."); j.suite(); }
      });
    } },
    { nom: "La chaîne du plateau", jouer: function (j, n) {
      j.titre("Le fournisseur annonce une masse moléculaire de \\(5{,}6 \\cdot 10^6\\) g/mol pour l'UHMWPE du plateau. Combien de motifs de 28 g/mol par chaîne ? Réponds en milliers.");
      j.nombre({ avant: "n =", apres: "\\text{milliers}", cases: [{ attendu: 200, tol: 0.01 }], ligne: true,
        aide: function () { return "M = 28 × n."; },
        ok: function () { j.bravo("200 000 motifs."); j.suite(); } });
    } },
    { nom: "Le fluage du plateau", jouer: function (j, n) {
      j.titre("Modèle ajouté : à 37 °C, la part visqueuse du plateau se comporte comme un amortisseur de viscosité η = 8000 MPa·s, sous σ = 4 MPa constant. Quelle déformation visqueuse après 100 s ?");
      j.nombre({ avant: "\\varepsilon = \\dfrac{\\sigma\\,t}{\\eta} =", cases: [{ attendu: 0.05, tol: 0.0005 }], ligne: true,
        aide: function () { return "σ = η dε/dt donne dε/dt = σ / η ; à vitesse constante, ε = σ t / η."; },
        ok: function () { j.bravo("ε = 0,05."); j.suite(); } });
    } },
    { nom: "La stérilisation", jouer: function (j, n) {
      j.titre("Le service veut stériliser les plateaux aux rayons gamma. Quel point faut-il vérifier d'abord ?");
      j.choix([
        { html: "La stabilité du polymère au rayonnement gamma, un problème mal résolu des polymères", juste: true },
        { html: "Le risque de corrosion galvanique du plateau", aide: "La corrosion galvanique concerne deux métaux en contact." },
        { html: "La résorption du plateau dans les semaines qui suivent", aide: "L'UHMWPE n'est pas résorbable." }
      ], { colonnes: 1, ok: function () { j.bravo("Instabilité au gamma."); j.suite(); } });
    } },
    { nom: "Fin de l'opération", jouer: function (j, n) {
      j.titre("À la fin de l'intervention, la plaie saigne un peu. Quel biomatériau naturel le chirurgien peut-il y placer ?");
      j.choix([
        { html: "Une éponge de collagène, hémostatique et biodégradable", juste: true },
        { html: "Un bloc de corail", aide: "Le corail sert à combler l'os, pas à arrêter un saignement." },
        { html: "Une membrane de cellulose", aide: "La cellulose est citée pour les membranes de dialyse." }
      ], { colonnes: 1, ok: function () { j.bravo("Le collagène."); j.suite(); } });
    } }
  ]
});
