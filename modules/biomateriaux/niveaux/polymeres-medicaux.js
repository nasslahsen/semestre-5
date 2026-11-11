/* Niveau : polymères des dispositifs médicaux. PEEK radio-opaque, usages des polymères techniques, M = 28 n, PE du cotyle, problèmes. */
NIVEAU({
  id: "polymeres-medicaux",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { marque: null, libre: true };
    n.cartes = ["UHMWPE", "PEEK", "PC", "PEI", "PSU", "silicone"];
    n.pos = function (i) { return [180 + (i % 2) * 320, 160 + Math.floor(i / 2) * 150]; };
    n.dessin = function () {
      E.vider(g);
      n.cartes.forEach(function (c, i) {
        var p = n.pos(i), m = n.marque === c;
        E.s("rect", { x: p[0] - 130, y: p[1] - 55, width: 260, height: 110, rx: 18, fill: m ? PLATEFORME.teinte(0.25) : "#fff", stroke: m ? D.C.acc : C.encre, "stroke-width": m ? 6 : 3 }, g);
        D.texte(g, c, p, { taille: 28, fond: false });
      });
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      n.cartes.forEach(function (c, i) { var q = n.pos(i); if (Math.abs(p[0] - q[0]) < 130 && Math.abs(p[1] - q[1]) < 55) n.surClic(c); });
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Visible aux rayons X", jouer: function (j, n) {
      j.fig.astuce("Touche une fiche.");
      j.titre("Un chirurgien du rachis veut un implant en polymère, léger, solide, et visible sur la radio de contrôle. Touche le bon polymère.");
      var gagne = function () {
        n.libre = false; n.marque = "PEEK"; n.dessin();
        j.bravo("Le PEEK, radio-opaque.");
        j.expliquer("<p>Le <b>PEEK</b> (polyétheréthercétone) est léger et solide, radio-opaque, stable à haute température, biocompatible, stérilisable, et peut rester longtemps dans le corps : réparation de traumatismes, implants rachidiens, articulations de remplacement, couronnes et bridges.</p>");
        j.suite();
      };
      n.surClic = function (c) {
        if (c === "PEEK") gagne();
        else { n.marque = c; n.dessin(); j.erreur(c === "UHMWPE" ? "L'UHMWPE est le roi du frottement (cotyles), pas de la radio." : c === "PC" ? "Le PC est transparent, et on ne le trouve pas à l'intérieur du corps." : "Cherche le polymère que le cours dit « radio-opaque »."); }
      };
      j.reponse(gagne);
    } },
    { nom: "Hors du corps", jouer: function (j, n) {
      n.surClic = null; n.marque = null; n.dessin();
      j.fig.astuce("");
      j.titre("Associe chaque besoin au polymère qui convient.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<span>voir le sang circuler dans un appareil</span><span class="trou" data-attendu="pc"></span>' +
        '<span>plateau passé plus de 1000 fois à la vapeur</span><span class="trou" data-attendu="psu"></span>' +
        '<span>poignée d\'instrument qui tient 180 °C</span><span class="trou" data-attendu="pei"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "pei", html: "PEI" }, { id: "pc", html: "PC" }, { id: "psu", html: "PSU" }],
        aide: "Transparent : PC. Plus de 1000 cycles de vapeur : PSU. 180 °C et autoclave : PEI (Ultem).",
        ok: function () { j.bravo("PC, PSU, PEI."); j.expliquer("<p>La norme <b>ISO 10993</b> encadre le choix : polymères inertes, non absorbants, résistants à la stérilisation répétée, sans réaction avec les tissus ni irritation cutanée.</p>"); j.suite(); }
      });
    } },
    { nom: "La chaîne d'UHMWPE", jouer: function (j, n) {
      n.marque = "UHMWPE"; n.dessin();
      j.titre("Une chaîne d'UHMWPE a une masse moléculaire de \\(4{,}2 \\cdot 10^6\\) g/mol. Avec un motif de 28 g/mol, combien de motifs compte-t-elle ? Réponds en milliers.");
      j.nombre({ avant: "n = \\dfrac{M}{28} =", apres: "\\text{milliers}", cases: [{ attendu: 150, tol: 0.01 }], ligne: true,
        aide: function () { return "4 200 000 / 28, puis divise par 1000."; },
        ok: function () { j.bravo("150 000 motifs."); j.expliquer("<p>Un poids moléculaire élevé donne à l'UHMWPE sa résistance à la friction et peu d'oxydation ; une densité élevée, une meilleure résistance aux chocs et au cisaillement. Cristallinité du PE : 50 % en moyenne, proportionnelle à la densité.</p>"); j.suite(); } });
    } },
    { nom: "Dans la hanche", jouer: function (j, n) {
      j.titre("Dans une prothèse totale de hanche, de quel côté met-on le polyéthylène ?");
      j.choix([
        { html: "Côté cotyle (versant cotyloïdien)", juste: true },
        { html: "Pour la tige fémorale", aide: "La tige doit être rigide et résister à la fatigue : c'est un métal." },
        { html: "Pour la tête fémorale", aide: "La tête est en céramique ou en métal ; elle frotte contre le polyéthylène." }
      ], { colonnes: 1, ok: function () { j.bravo("Le cotyle, en face de la tête."); j.suite(); } });
    } },
    { nom: "Un problème des polymères", jouer: function (j, n) {
      j.titre("Une équipe veut stériliser un implant en polymère aux rayons gamma. Quel problème mal résolu le cours signale-t-il ?");
      j.choix([
        { html: "L'instabilité de certains polymères au rayonnement gamma", juste: true },
        { html: "La corrosion électrochimique", aide: "C'est un problème des métaux." },
        { html: "Le stress-shielding", aide: "C'est un problème des tiges métalliques rigides." }
      ], { colonnes: 1, ok: function () { j.bravo("Instabilité au gamma."); j.expliquer("<p>Autres problèmes : réactivité à certains médicaments, variabilité d'un lot à l'autre, stabilité hydrolytique, calcification, additifs et produits de dégradation, manque de standards.</p>"); j.suite(); } });
    } }
  ]
});
