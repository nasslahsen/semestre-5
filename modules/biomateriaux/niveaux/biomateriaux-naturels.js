/* Niveau : biomatériaux naturels. Origine de la chitine, collagène hémostatique, usages, intérêt du naturel, biodégradabilité. */
NIVEAU({
  id: "biomateriaux-naturels",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { marque: null, libre: true };
    n.src = [["crabe", [190, 220], "#f29e7a"], ["algues", [490, 220], "#b9e3c6"], ["plantes", [190, 440], "#cfe8b0"], ["récif", [490, 440], "#f7b2a6"]];
    n.dessin = function () {
      E.vider(g);
      n.src.forEach(function (s) {
        var m = n.marque === s[0];
        D.rond(g, s[1], 80, { fill: s[2], stroke: m ? D.C.acc : C.encre, ep: m ? 7 : 3 });
        D.texte(g, s[0], s[1], { taille: 24, fond: false });
      });
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      n.src.forEach(function (s) { if (Math.hypot(p[0] - s[1][0], p[1] - s[1][1]) < 82) n.surClic(s[0]); });
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "La chitine", jouer: function (j, n) {
      j.fig.astuce("Touche une origine.");
      j.titre("D'où extrait-on la chitine, utilisée pour des fils de suture et de la peau artificielle ? Touche l'origine.");
      var gagne = function () {
        n.libre = false; n.marque = "crabe"; n.dessin();
        j.bravo("Des coquilles de crabe.");
        j.expliquer("<p>La <b>chitine</b> est un polysaccharide extrait des coquilles de crabe : fils de suture, chirurgie reconstructive, peau artificielle.</p>");
        j.suite();
      };
      n.surClic = function (s) {
        if (s === "crabe") gagne();
        else { n.marque = s; n.dessin(); j.erreur(s === "algues" ? "Des algues, on tire les fucanes. Pense à une carapace." : "Pense à une carapace : la chitine en forme la coque."); }
      };
      j.reponse(gagne);
    } },
    { nom: "L'éponge de collagène", jouer: function (j, n) {
      n.surClic = null;
      j.fig.astuce("");
      j.titre("Pourquoi place-t-on une éponge de collagène sur une plaie qui saigne ?");
      j.choix([
        { html: "Le collagène est hémostatique", juste: true },
        { html: "Le collagène est radio-opaque", aide: "Le cours dit radio-opaque pour le PEEK." },
        { html: "Le collagène ne se dégrade jamais", aide: "Au contraire, il est biodégradable." }
      ], { colonnes: 1, ok: function () { j.bravo("Hémostatique : il arrête le saignement."); j.expliquer("<p>Le <b>collagène</b>, d'origine animale (peau) ou humaine (placenta), est hémostatique, manipulable, indispensable au développement cellulaire et biodégradable : esthétique, pansements, ophtalmologie, reconstitution de tissus, peau artificielle.</p>"); j.suite(); } });
    } },
    { nom: "Chaque matériau son usage", jouer: function (j, n) {
      j.titre("Associe chaque matériau naturel à son usage.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1.4fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>corail</b><span class="trou" data-attendu="o"></span><b>cellulose</b><span class="trou" data-attendu="d"></span><b>fucanes</b><span class="trou" data-attendu="a"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "a", html: "anticoagulants" }, { id: "o", html: "recolonisé par l'os" }, { id: "d", html: "membranes de dialyse" }],
        aide: "Le corail se laisse recoloniser par les cellules osseuses ; la cellulose fait les membranes de dialyse ; les fucanes des algues sont anticoagulantes.",
        ok: function () { j.bravo("Os, dialyse, anticoagulants."); j.suite(); }
      });
    } },
    { nom: "Pourquoi naturel ?", jouer: function (j, n) {
      j.titre("Qu'est-ce qui a orienté les chercheurs vers les matériaux d'origine naturelle ?");
      j.choix([
        { html: "Le souci de biocompatibilité : ces matériaux sont logiquement biocompatibles", juste: true },
        { html: "Leur rigidité, supérieure à celle des métaux", aide: "Le cours ne les choisit pas pour leur rigidité." },
        { html: "Leur stérilisation plus facile", aide: "Le cours insiste sur une autre raison, liée à la tolérance du corps." }
      ], { colonnes: 1, ok: function () { j.bravo("La biocompatibilité."); j.suite(); } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      j.titre("Un camarade écrit : « Le collagène est intéressant parce qu'il reste intact dans le corps pour toujours. » Où est l'erreur ?");
      j.choix([
        { html: "Le collagène est biodégradable", juste: true },
        { html: "Le collagène n'est pas utilisé en médecine", aide: "Il a de très nombreuses applications." },
        { html: "Le collagène est un métal", aide: "C'est une protéine d'origine animale ou humaine." }
      ], { colonnes: 1, ok: function () { j.bravo("Biodégradable : c'est un de ses avantages."); j.suite(); } });
    } }
  ]
});
