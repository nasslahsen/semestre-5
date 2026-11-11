/* Niveau : biocéramiques. Bio-inertes ou résorbables, fragilité, compression, définition de Kingery, carbone inorganique. */
NIVEAU({
  id: "bioceramiques",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { marque: null, libre: true, casse: false };
    n.dessin = function () {
      E.vider(g);
      // deux blocs de céramique : compression à gauche, choc à droite
      var mg = n.marque === "compression", md = n.marque === "choc";
      E.s("rect", { x: 110, y: 270, width: 160, height: 160, rx: 10, fill: "#e8e2d4", stroke: mg ? D.C.acc : C.encre, "stroke-width": mg ? 7 : 3 }, g);
      D.fleche(g, [190, 150], [190, 262], C.encre, 6); D.fleche(g, [190, 550], [190, 438], C.encre, 6);
      D.texte(g, "compression", [190, 120], { taille: 19 });
      E.s("rect", { x: 410, y: 270, width: 160, height: 160, rx: 10, fill: "#e8e2d4", stroke: md ? D.C.acc : C.encre, "stroke-width": md ? 7 : 3 }, g);
      E.s("rect", { x: 450, y: 150, width: 80, height: 40, rx: 8, fill: "#5b6172" }, g);
      E.s("rect", { x: 482, y: 190, width: 16, height: 70, fill: "#5b6172" }, g);
      D.texte(g, "choc", [490, 120], { taille: 19 });
      if (n.casse) { D.ligne(g, [430, 300], [520, 380], C.ko, 4); D.ligne(g, [520, 380], [500, 430], C.ko, 4); }
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      if (p[0] > 90 && p[0] < 290 && p[1] > 120 && p[1] < 560) n.surClic("compression");
      else if (p[0] > 390 && p[0] < 590 && p[1] > 120 && p[1] < 450) n.surClic("choc");
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Deux catégories", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Classe chaque biocéramique : bio-inerte ou résorbable ?");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>alumine</b><span class="trou" data-attendu="i"></span><b>hydroxyapatite</b><span class="trou" data-attendu="r"></span>' +
        '<b>zircone</b><span class="trou" data-attendu="i"></span><b>phosphate tricalcique</b><span class="trou" data-attendu="r"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "i", html: "bio-inerte" }, { id: "r", html: "résorbable" }, { id: "r", html: "résorbable" }, { id: "i", html: "bio-inerte" }],
        aide: "Les oxydes des têtes de hanche restent intacts ; les phosphates de calcium, proches de l'os, sont remplacés par lui.",
        ok: function () { j.bravo("Oxydes bio-inertes, phosphates de calcium résorbables."); j.expliquer("<p>Bio-inertes : alumine, zircone, nitrures de silicium, fibres de carbone. Résorbables : hydroxyapatites denses, phosphate tricalcique.</p>"); j.suite(); }
      });
    } },
    { nom: "Ce qu'elle supporte", jouer: function (j, n) {
      n.libre = true;
      j.fig.astuce("Touche une des deux sollicitations.");
      j.titre("Touche la sollicitation qu'une biocéramique supporte très bien.");
      var gagne = function () {
        n.libre = false; n.marque = "compression"; n.dessin();
        j.bravo("La compression.");
        j.expliquer("<p>Propriétés mécaniques des biocéramiques : très grande résistance à la compression, très dures, bonne résistance à l'usure, grande résistance au cisaillement ; mais non résilientes (elles ne résistent pas au choc), donc fragiles, et non ductiles.</p>");
        j.suite();
      };
      n.surClic = function (q) {
        if (q === "compression") gagne();
        else { n.marque = "choc"; n.casse = true; n.dessin(); j.erreur("Un choc la casse : une céramique n'est pas résiliente."); }
      };
      j.reponse(gagne);
    } },
    { nom: "La tête tombée", jouer: function (j, n) {
      n.surClic = null; n.casse = true; n.marque = "choc"; n.dessin();
      j.fig.astuce("");
      j.titre("Une tête de hanche en alumine tombe sur le carrelage du bloc et se fissure, alors qu'une tête en métal aurait juste été rayée. Pourquoi ?");
      j.choix([
        { html: "La céramique est non ductile : elle ne se déforme pas plastiquement, elle casse", juste: true },
        { html: "L'alumine est moins dure que le métal", aide: "Les biocéramiques sont très dures, plus que les métaux." },
        { html: "L'alumine conduit trop la chaleur", aide: "Les biocéramiques sont de mauvais conducteurs de chaleur, et ce n'est pas la question." }
      ], { colonnes: 1, ok: function () { j.bravo("Fragile, non ductile."); j.suite(); } });
    } },
    { nom: "La définition", jouer: function (j, n) {
      j.titre("Kingery (1976) définit la céramique comme l'art de fabriquer des pièces solides composées principalement de matériau…");
      j.choix([
        { html: "non organique et non métallique", juste: true },
        { html: "organique et non métallique", aide: "Les céramiques sont inorganiques." },
        { html: "métallique et réfractaire", aide: "Une céramique n'est pas un métal." }
      ], { colonnes: 1, ok: function () { j.bravo("Non organique, non métallique."); j.expliquer("<p>Les céramiques sont réfractaires, polycristallines, inorganiques ; on les obtient par <b>frittage</b>, agglomération de poudres par chauffage sous forte pression.</p>"); j.suite(); } });
    } },
    { nom: "Du carbone céramique ?", jouer: function (j, n) {
      j.titre("Le carbone pyrolytique est fait uniquement de carbone, et pourtant c'est une céramique. Pourquoi ?");
      j.choix([
        { html: "Les corps simples du carbone (graphite, diamant...) sont des corps inorganiques", juste: true },
        { html: "Tout ce qui contient du carbone est inorganique", aide: "C'est l'inverse : les corps organiques sont les composés du carbone, presque toujours avec de l'hydrogène." },
        { html: "Il contient beaucoup d'hydrogène", aide: "Le pyrocarbone n'est fait que de carbone." }
      ], { colonnes: 1, ok: function () { j.bravo("Graphite, diamant, pyrocarbone : inorganiques."); j.suite(); } });
    } }
  ]
});
