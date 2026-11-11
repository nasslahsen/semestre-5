/* Niveau : domaines d'application. Organe du dialyseur, dispositifs et spécialités, orthèse ou prothèse, lentilles, endoprothèse aortique. */
NIVEAU({
  id: "domaines-application",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { marque: null, libre: true };
    var Z = { oeil: [312, 110], coeur: [360, 245], reins: [370, 320], genou: [310, 480] };
    n.Z = Z;
    n.dessin = function () {
      E.vider(g);
      var st = { fill: "#f6efe6", stroke: "#b89b6a", "stroke-width": 3 };
      E.s("circle", Object.assign({ cx: 340, cy: 120, r: 50 }, st), g);
      E.s("rect", Object.assign({ x: 270, y: 180, width: 140, height: 200, rx: 44 }, st), g);
      E.s("rect", Object.assign({ x: 222, y: 190, width: 40, height: 180, rx: 20 }, st), g);
      E.s("rect", Object.assign({ x: 418, y: 190, width: 40, height: 180, rx: 20 }, st), g);
      E.s("rect", Object.assign({ x: 280, y: 370, width: 54, height: 210, rx: 26 }, st), g);
      E.s("rect", Object.assign({ x: 346, y: 370, width: 54, height: 210, rx: 26 }, st), g);
      E.s("path", { d: "M360 238 q-10 -14 -22 -4 q-10 10 4 24 l18 16 l18 -16 q14 -14 4 -24 q-12 -10 -22 4z", fill: "#f4c2c2", stroke: "#c0504d", "stroke-width": 2 }, g);
      E.s("ellipse", { cx: 310, cy: 320, rx: 10, ry: 18, fill: "#e9c7a6", stroke: "#a87b4f", "stroke-width": 2 }, g);
      E.s("ellipse", { cx: 370, cy: 320, rx: 10, ry: 18, fill: "#e9c7a6", stroke: "#a87b4f", "stroke-width": 2 }, g);
      Object.keys(Z).forEach(function (k) {
        var m = n.marque === k;
        D.rond(g, Z[k], m ? 17 : 12, { fill: m ? D.C.acc : "#fff", stroke: D.C.acc, ep: 4 });
      });
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      Object.keys(Z).forEach(function (k) { if (Math.hypot(p[0] - Z[k][0], p[1] - Z[k][1]) < 34) n.surClic(k); });
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le rein artificiel", jouer: function (j, n) {
      j.fig.astuce("Touche un des points bleus.");
      j.titre("Une patiente est dialysée trois fois par semaine. Touche l'organe dont le dialyseur prend le relais.");
      var gagne = function () {
        n.libre = false; n.marque = "reins"; n.dessin();
        j.bravo("Les reins : urologie et néphrologie.");
        j.expliquer("<p>Le <b>dialyseur</b>, ou « rein artificiel », permet lors d'une hémodialyse les échanges entre le sang et le dialysat. Il épure le sang des déchets non éliminés par les reins malades (urée, créatinine) et rééquilibre l'eau. Autres dispositifs : poches, cathéters et tubulures de dialyse péritonéale, rein artificiel portable.</p>");
        j.suite();
      };
      n.surClic = function (k) {
        if (k === "reins") gagne();
        else { n.marque = k; n.dessin(); j.erreur("Le dialysat débarrasse le sang de l'urée et de la créatinine. Quel organe filtre normalement le sang ?"); }
      };
      j.reponse(gagne);
    } },
    { nom: "Chaque dispositif à sa place", jouer: function (j, n) {
      n.surClic = null; n.marque = null; n.dessin();
      j.fig.astuce("");
      j.titre("Range chaque dispositif dans sa spécialité.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>cardiovasculaire</b><span class="trou" data-attendu="s"></span><b>endocrinologie</b><span class="trou" data-attendu="p"></span>' +
        '<b>orthopédie</b><span class="trou" data-attendu="v"></span><b>odontologie</b><span class="trou" data-attendu="o"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "v", html: "vis de fracture" }, { id: "o", html: "orthodontie" }, { id: "s", html: "stent" }, { id: "p", html: "pompe implantable" }],
        aide: "Le stent se pose dans une artère ; la pompe délivre une hormone comme l'insuline ; la vis répare un os ; l'orthodontie corrige les dents.",
        ok: function () {
          j.bravo("Stent, pompe, vis, orthodontie.");
          j.suite();
        }
      });
    } },
    { nom: "Orthèse ou prothèse ?", jouer: function (j, n) {
      n.marque = "genou"; n.dessin();
      j.titre("Une attelle rigide maintient le genou d'un sportif après une entorse. Est-ce une orthèse ou une prothèse ?");
      j.choix([
        { html: "Une orthèse", juste: true },
        { html: "Une prothèse", aide: "Une prothèse remplace un membre ou un organe. Ici, le genou est toujours là." }
      ], { ok: function () {
        j.bravo("Elle soutient : c'est une orthèse.");
        j.expliquer("<p>Une <b>orthèse</b>, par opposition à la prothèse qui remplace un membre manquant, est un dispositif médical qui permet de suppléer, compenser, soutenir ou protéger une partie du corps.</p>");
        j.suite();
      } });
    } },
    { nom: "La lentille", jouer: function (j, n) {
      n.marque = "oeil"; n.dessin();
      j.titre("Le cours précise que les lentilles de contact sont souvent exclues du domaine des biomatériaux. Pourquoi ?");
      j.choix([
        { html: "Elles ne touchent aucun tissu", aide: "Une lentille repose sur l'œil, dans les larmes." },
        { html: "La brièveté du contact", juste: true },
        { html: "Elles sont vivantes", aide: "Une lentille est un objet synthétique, non vivant." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Le critère de durée.");
        j.expliquer("<p>En ophtalmologie, on trouve aussi des implants, des coussinets de récupération et des produits visqueux de chambre postérieure.</p>");
        j.suite();
      } });
    } },
    { nom: "L'endoprothèse", jouer: function (j, n) {
      n.marque = "coeur"; n.dessin();
      j.titre("Pour exclure un anévrisme de l'aorte, on pose une endoprothèse (stent-graft) sans ouvrir le thorax. Par où passe-t-on ?");
      j.choix([
        { html: "Par voie mini-invasive, par l'artère fémorale", juste: true },
        { html: "Par la bouche", aide: "L'aorte est un vaisseau : on y arrive par un autre vaisseau." },
        { html: "En ouvrant le thorax", aide: "La consigne dit justement qu'on ne l'ouvre pas." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Un tube en tissu renforcé par un ressort métallique, glissé par l'artère fémorale.");
        j.expliquer("<p>Une <b>prothèse aortique</b> remplace ou renforce une portion malade de l'aorte ou de sa valve, pour éviter une rupture ou une obstruction.</p>");
        j.suite();
      } });
    } }
  ]
});
