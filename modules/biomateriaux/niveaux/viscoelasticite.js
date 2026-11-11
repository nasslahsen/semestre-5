/* Niveau : viscoélasticité. Trois comportements, ressort ou amortisseur, loi de Hooke, loi de Newton, température et vitesse. */
NIVEAU({
  id: "viscoelasticite",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { marque: null, libre: true, t: 0 };
    n.dessin = function () {
      E.vider(g);
      var allR = 160, allA = 140 + 140 * n.t;
      // ressort à gauche
      var xr = 200, y0 = 140, mr = n.marque === "ressort", ma = n.marque === "amortisseur";
      D.ligne(g, [xr - 70, y0], [xr + 70, y0], C.encre, 7);
      var pts = [[xr, y0], [xr, y0 + 30]];
      for (var i = 1; i <= 9; i++) pts.push([xr + (i % 2 ? 30 : -30), y0 + 30 + i * (allR - 60) / 10]);
      pts.push([xr, y0 + allR - 30], [xr, y0 + allR]);
      E.s("polyline", { points: pts.map(function (p) { return p.join(","); }).join(" "), fill: "none", stroke: mr ? D.C.acc : C.jeu, "stroke-width": mr ? 7 : 5, "stroke-linejoin": "round" }, g);
      E.s("rect", { x: xr - 35, y: y0 + allR, width: 70, height: 26, rx: 6, fill: "#5b6172" }, g);
      D.texte(g, "ressort", [xr, 100], { taille: 20 });
      // amortisseur à droite
      var xa = 480;
      D.ligne(g, [xa - 70, y0], [xa + 70, y0], C.encre, 7);
      D.ligne(g, [xa, y0], [xa, y0 + 50], C.encre, 4);
      E.s("path", { d: "M" + (xa - 38) + " " + (y0 + 50) + " L" + (xa - 38) + " " + (y0 + 210) + " L" + (xa + 38) + " " + (y0 + 210) + " L" + (xa + 38) + " " + (y0 + 50), fill: PLATEFORME.teinte(0.2), stroke: ma ? D.C.acc : C.encre, "stroke-width": ma ? 7 : 4 }, g);
      var yp = y0 + 60 + 120 * n.t;
      D.ligne(g, [xa - 30, yp], [xa + 30, yp], C.jeu, 8);
      D.ligne(g, [xa, yp], [xa, y0 + allA + 130], C.jeu, 5);
      E.s("rect", { x: xa - 35, y: y0 + allA + 130, width: 70, height: 26, rx: 6, fill: "#5b6172" }, g);
      D.texte(g, "amortisseur", [xa, 100], { taille: 20 });
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      if (p[0] > 110 && p[0] < 290 && p[1] > 120 && p[1] < 360) n.surClic("ressort");
      else if (p[0] > 390 && p[0] < 570 && p[1] > 120 && p[1] < 560) n.surClic("amortisseur");
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Trois comportements", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Associe chaque comportement mécanique à sa description.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<span>reprend instantanément sa forme quand la sollicitation cesse</span><span class="trou" data-attendu="e"></span>' +
        '<span>reste déformé même quand la sollicitation cesse</span><span class="trou" data-attendu="p"></span>' +
        '<span>se déforme de plus en plus sous une sollicitation constante</span><span class="trou" data-attendu="v"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "v", html: "visqueux" }, { id: "e", html: "élastique" }, { id: "p", html: "plastique" }],
        aide: "Élastique : revient. Plastique : permanent. Visqueux : dépend du temps.",
        ok: function () { j.bravo("Élastique, plastique, visqueux."); j.expliquer("<p>Les polymères sont <b>viscoélastiques</b> : ils montrent à la fois des propriétés élastiques et un caractère visqueux.</p>"); j.suite(); }
      });
    } },
    { nom: "Qui avance encore ?", jouer: function (j, n) {
      n.libre = true;
      j.fig.astuce("Touche un des deux modèles.");
      j.titre("On accroche la même masse aux deux modèles et on attend. Lequel continue à s'allonger avec le temps ? Touche-le.");
      var gagne = function () {
        n.libre = false; n.marque = "amortisseur"; n.dessin();
        E.anime(1200, function (u) { n.t = u; n.dessin(); });
        j.bravo("L'amortisseur.");
        j.expliquer("<p>Dans l'amortisseur, la force est proportionnelle à la vitesse : sous une contrainte constante, il avance à vitesse constante. Le ressort, lui, prend tout de suite son allongement et n'en bouge plus.</p>");
        j.suite();
      };
      n.surClic = function (q) {
        if (q === "amortisseur") gagne();
        else { n.marque = "ressort"; n.dessin(); j.erreur("Le ressort s'allonge tout de suite, puis ne bouge plus : F = K X, sans temps dans la formule."); }
      };
      j.reponse(gagne);
    } },
    { nom: "Loi de Hooke", jouer: function (j, n) {
      n.surClic = null;
      j.fig.astuce("");
      j.titre("Un polymère vitreux de module E = 3 GPa est déformé de ε = 0,004. Quelle contrainte (loi de Hooke) ?");
      j.nombre({ avant: "\\sigma = E\\,\\varepsilon =", apres: "\\text{MPa}", cases: [{ attendu: 12, tol: 0.01 }], ligne: true,
        aide: function () { return "3 GPa = 3000 MPa ; multiplie par 0,004."; },
        ok: function () { j.bravo("12 MPa."); j.suite(); } });
    } },
    { nom: "Loi de Newton", jouer: function (j, n) {
      j.titre("Modèle ajouté : un polymère chaud se comporte comme un amortisseur de viscosité η = 400 MPa·s, sous σ = 2 MPa constant. Vitesse de déformation, puis déformation après 50 s ?");
      j.nombre({ avant: "\\dfrac{d\\varepsilon}{dt},\\ \\varepsilon(50) =", cases: [{ attendu: 0.005, tol: 0.0001 }, { attendu: 0.25, tol: 0.001 }], ligne: true,
        aide: function (k) { return k === 0 ? "σ = η dε/dt, donc dε/dt = σ / η = 2 / 400 (en s⁻¹)." : "À vitesse constante : ε = (dε/dt) × t."; },
        ok: function () { j.bravo("0,005 s⁻¹ et 0,25."); j.expliquer("<p>\\[\\sigma = \\eta\\,\\frac{d\\varepsilon}{dt}\\] L'écoulement suppose des chaînes non réticulées chimiquement.</p>"); j.suite(); } });
    } },
    { nom: "Froid et rapide", jouer: function (j, n) {
      j.titre("Un polymère est sollicité à basse température, très rapidement (un choc). Quel comportement domine ?");
      j.choix([
        { html: "Élastique", juste: true },
        { html: "Visqueux", aide: "Le visqueux domine à haute température ou pour des sollicitations très lentes." }
      ], { ok: function () { j.bravo("L'élastique domine : état vitreux, ou sollicitation rapide."); j.suite(); } });
    } }
  ]
});
