/* Niveau : classes de biomatériaux et métaux implantables. Exigence par zone, quatre catégories, contraintes cycliques, allergie au nickel, hypersensibilité. */
NIVEAU({
  id: "classes-biomateriaux",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { marque: null, libre: true };
    var Z = { contact: [330, 210], tige: [300, 400], os: [262, 520] };
    n.Z = Z;
    n.dessin = function () {
      E.vider(g);
      E.s("path", { d: "M170 200 Q190 90 330 90 Q470 90 510 180 Q460 230 390 210 Q370 166 330 168 Q290 170 280 214 Z", fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      E.s("path", { d: "M250 290 Q276 260 318 274 L338 310 Q308 360 306 440 L310 580 L214 580 L220 440 Q212 350 250 290 Z", fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      var m = function (k, base) { return n.marque === k ? D.C.acc : base; };
      E.s("path", { d: "M268 206 A62 62 0 0 1 392 206 L372 206 A42 42 0 0 0 288 206 Z", fill: m("contact", "#a9b0bc"), stroke: C.encre, "stroke-width": 3 }, g);
      D.rond(g, [330, 214], 38, { fill: n.marque === "contact" ? PLATEFORME.teinte(0.5) : "#efe3cc", stroke: C.encre, ep: 3 });
      E.s("path", { d: "M316 242 L342 258 Q296 320 292 400 L280 548 Q274 566 266 548 L256 400 Q256 310 300 242 Z", fill: m("tige", "#c3c8d2"), stroke: C.encre, "stroke-width": 3 }, g);
      if (n.marque === "os") E.s("path", { d: "M252 430 L260 548 Q268 572 282 548 L290 430", fill: "none", stroke: D.C.acc, "stroke-width": 10, "stroke-linecap": "round" }, g);
      Object.keys(Z).forEach(function (k) { D.rond(g, Z[k], 11, { fill: "#fff", stroke: D.C.acc, ep: 4 }); });
      D.texte(g, "surface de contact", [470, 280], { taille: 18, ancre: "start", gras: false });
      D.texte(g, "tige", [420, 400], { taille: 18, ancre: "start", gras: false });
      D.texte(g, "contact avec l'os", [380, 520], { taille: 18, ancre: "start", gras: false });
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      Object.keys(Z).forEach(function (k) { if (Math.hypot(p[0] - Z[k][0], p[1] - Z[k][1]) < 36) n.surClic(k); });
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Une exigence par zone", jouer: function (j, n) {
      j.fig.astuce("Touche un des trois points bleus.");
      j.titre("La tige doit porter le poids du corps à chaque pas, pendant des années. Touche la zone dont c'est l'exigence : rigidité et résistance à la fatigue.");
      var gagne = function () {
        n.libre = false; n.marque = "tige"; n.dessin();
        j.bravo("La tige.");
        j.expliquer("<p>Surface de contact : résistance à l'usure. Tige : rigidité et résistance à la fatigue. Contact avec l'os : compatibilité avec le tissu et résistance à la corrosion. Un matériau plus rigide peut être moins résilient ; le concepteur combine plusieurs matériaux dans le même implant.</p>");
        j.suite();
      };
      n.surClic = function (k) {
        if (k === "tige") gagne();
        else { n.marque = k; n.dessin(); j.erreur(k === "contact" ? "Ici, tête et cotyle frottent : l'exigence est l'usure." : "Ici, on touche l'os : l'exigence est la compatibilité avec le tissu."); }
      };
      j.reponse(gagne);
    } },
    { nom: "Quatre catégories", jouer: function (j, n) {
      n.surClic = null;
      j.fig.astuce("");
      j.titre("Range chaque matériau dans sa grande catégorie de biomatériaux.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>métaux et alliages</b><span class="trou" data-attendu="n"></span><b>céramiques</b><span class="trou" data-attendu="z"></span>' +
        '<b>polymères</b><span class="trou" data-attendu="s"></span><b>origine naturelle</b><span class="trou" data-attendu="c"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "corail" }, { id: "s", html: "silicone" }, { id: "n", html: "NiTi" }, { id: "z", html: "zircone" }],
        aide: "NiTi : nickel et titane. Zircone : un oxyde. Silicone : une chaîne. Corail : vient de la mer.",
        ok: function () { j.bravo("NiTi, zircone, silicone, corail."); j.suite(); }
      });
    } },
    { nom: "Pourquoi un métal ?", jouer: function (j, n) {
      j.titre("Pourquoi fait-on les plaques, les vis et les tiges de hanche en métal plutôt qu'en céramique ou en polymère ?");
      j.choix([
        { html: "Les métaux supportent des contraintes élevées, et aussi cycliques", juste: true },
        { html: "Les métaux ne se corrodent jamais dans le corps", aide: "La corrosion est justement le premier problème mal résolu des métaux." },
        { html: "Les métaux sont plus légers", aide: "Les métaux sont denses : leur arrangement atomique est compact." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Contraintes élevées et cycliques : la fatigue.");
        j.expliquer("<p>Les métaux sont les « ancêtres » des biomatériaux, utilisés en <b>alliages</b>. Leurs problèmes : corrosion, hypersensibilité, frottements et débris.</p>");
        j.suite();
      } });
    } },
    { nom: "Le plus allergène", jouer: function (j, n) {
      j.titre("Quel métal est le plus allergène, selon le cours ?");
      j.choix([
        { html: "Le titane", aide: "Les implants en titane sont considérés comme hypoallergéniques." },
        { html: "Le nickel", juste: true },
        { html: "Le tantale", aide: "Le tantale est cité pour sa faible cytotoxicité." }
      ], { ok: function () {
        j.bravo("Le nickel, puis le chrome et le cobalt.");
        j.expliquer("<p>Le <b>relargage</b> : un implant libère des ions, d'autant plus qu'il se corrode ; ces ions forment des complexes métallo-protéiques, abîment les cellules voisines et peuvent conduire au <b>descellement</b>. La rate accumule Cr, Co, Ti, Ni, Fe et Al ; poumons et reins accumulent Co et Ni.</p>");
        j.suite();
      } });
    } },
    { nom: "Combien de patients ?", jouer: function (j, n) {
      j.titre("Un service opère 300 patients par an. Avec 10 à 15 % d'hypersensibilité cutanée aux métaux dans la population, entre combien et combien de patients sont concernés ?");
      j.nombre({ avant: "\\text{entre},\\ \\text{et} =", cases: [{ attendu: 30, tol: 0 }, { attendu: 45, tol: 0 }], ligne: true,
        aide: function (k) { return k === 0 ? "0,10 × 300." : "0,15 × 300."; },
        ok: function () { j.bravo("Entre 30 et 45 patients."); j.expliquer("<p>Après arthroplastie, 20 à 25 % des patients présentent une sensibilité aux métaux, mais seule une faible proportion développe des symptômes.</p>"); j.suite(); } });
    } }
  ]
});
