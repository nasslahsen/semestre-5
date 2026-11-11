/* Niveau : historique des biomatériaux. Ordre des époques, PMMA des cockpits, titane de l'aéronautique, bio-inerte ou bioactif, hydroxyapatite. */
NIVEAU({
  id: "historique",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { mode: "frise", vus: 0, libre: true, choisi: null };
    var EV = [["Égyptiens", "plâtre, bois"], ["années 50", "inox"], ["1969", "titane"], ["années 70", "toxicité"]];
    n.dessin = function () {
      E.vider(g);
      if (n.mode === "frise") {
        D.texte(g, "frise des biomatériaux", [340, 130], { taille: 19, coul: C.doux, gras: false });
        D.fleche(g, [40, 320], [650, 320], C.encre, 4);
        EV.forEach(function (e, i) {
          var x = 100 + i * 150, vu = i < n.vus;
          D.rond(g, [x, 320], 16, { fill: vu ? C.jeu : "#fff", stroke: vu ? C.jeu : C.encre, ep: 4 });
          D.texte(g, vu ? e[0] : "?", [x, 270], { taille: 19 });
          if (vu) D.texte(g, e[1], [x, 372], { taille: 18, coul: C.doux, gras: false });
        });
      } else {
        // deux implants : une valve cardiaque et une tige de hanche revêtue d'hydroxyapatite
        D.texte(g, "deux implants", [340, 110], { taille: 19, coul: C.doux, gras: false });
        var sv = n.choisi === "valve", st = n.choisi === "tige";
        D.rond(g, [190, 320], 95, { fill: "#fff", stroke: sv ? D.C.acc : C.encre, ep: sv ? 7 : 4 });
        E.s("ellipse", { cx: 190, cy: 320, rx: 70, ry: 26, fill: "#3a3d46", transform: "rotate(-25 190 320)" }, g);
        D.texte(g, "valve cardiaque", [190, 450], { taille: 19 });
        E.s("rect", { x: 445, y: 170, width: 90, height: 280, rx: 22, fill: "#c3c8d2", stroke: st ? D.C.acc : C.encre, "stroke-width": st ? 7 : 4 }, g);
        E.s("rect", { x: 433, y: 230, width: 12, height: 200, fill: C.jeu }, g);
        E.s("rect", { x: 535, y: 230, width: 12, height: 200, fill: C.jeu }, g);
        D.texte(g, "tige revêtue", [490, 480], { taille: 19 });
        D.texte(g, "d'hydroxyapatite", [490, 508], { taille: 19, coul: C.jeu });
      }
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      if (Math.hypot(p[0] - 190, p[1] - 320) < 100) n.surClic("valve");
      else if (p[0] > 420 && p[0] < 560 && p[1] > 160 && p[1] < 460) n.surClic("tige");
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Remettre dans l'ordre", jouer: function (j, n) {
      j.fig.astuce("Du plus ancien au plus récent.");
      j.titre("Range ces quatre moments de l'histoire des biomatériaux, du plus ancien au plus récent.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center;font-size:17px"><b>1</b><b>2</b><b>3</b><b>4</b>' +
        '<span class="trou" data-attendu="e"></span><span class="trou" data-attendu="i"></span><span class="trou" data-attendu="t"></span><span class="trou" data-attendu="x"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "t", html: "le titane de Brånemark" }, { id: "x", html: "études de toxicité" }, { id: "e", html: "plâtre et bois des Égyptiens" }, { id: "i", html: "inox pour la hanche" }],
        aide: "L'inox pour la hanche arrive dans les années 50 ; le titane entre en médecine en 1969 ; les études de toxicité des plastiques et des métaux datent des années 70.",
        ok: function () {
          n.vus = 4; n.dessin();
          j.bravo("Égyptiens, années 50, 1969, années 70.");
          j.expliquer("<p>Les Égyptiens remplaçaient des organes défaillants par du fer, du cuivre, du plomb, du bois, du plâtre. Jusqu'au milieu du XX<sup>e</sup> siècle : or, argent, cuivre. Années 50 : l'<b>acier inoxydable</b>, premier succès pour la hanche. 1969 : le <b>titane</b>. Années 70 : études de toxicité, victoire des alliages de titane.</p>");
          j.suite();
        }
      });
    } },
    { nom: "D'où vient le PMMA ?", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Les premières lentilles intraoculaires étaient en PMMA. D'où venait ce matériau ?");
      j.choix([
        { html: "Des cockpits d'avions anglais, pendant la guerre", juste: true },
        { html: "Des prothèses dentaires en or", aide: "L'or est un métal ; le PMMA est un polymère transparent. Pense à une vitre." },
        { html: "Des tuyaux de l'industrie nucléaire", aide: "Le cours relie le PMMA à l'aviation : un matériau transparent et solide." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Le PMMA des verrières d'avion.");
        j.expliquer("<p>Beaucoup de biomatériaux viennent d'autres industries : chimie, métallurgie, nucléaire, aéronautique. Les progrès de la chirurgie reconstructive, orthopédique et vasculaire ont ensuite réclamé des matériaux pour l'implantation.</p>");
        j.suite();
      } });
    } },
    { nom: "Le titane", jouer: function (j, n) {
      j.titre("En 1969, Brånemark découvre le titane en médecine. Pourquoi l'aéronautique l'utilisait-elle déjà ?");
      j.choix([
        { html: "Pour son prix très bas", aide: "Le titane n'est pas bon marché. Pense à ce qu'on cherche pour un avion : voler, et tenir." },
        { html: "Pour sa combinaison faible densité / résistance mécanique", juste: true },
        { html: "Parce qu'il est transparent", aide: "C'est un métal : il n'est pas transparent." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Léger et résistant.");
        j.expliquer("<p>Années 70 : les études de toxicité des plastiques et des métaux désignent les <b>alliages à base de titane</b> comme grands gagnants. Il reste un problème : ces matériaux ne s'intégraient pas parfaitement au corps humain.</p>");
        j.suite();
      } });
    } },
    { nom: "Bioactif", jouer: function (j, n) {
      n.mode = "implants"; n.choisi = null; n.libre = true; n.dessin();
      j.fig.astuce("Touche un des deux implants.");
      j.titre("Lequel de ces deux implants est bioactif ? Touche-le.");
      var gagne = function () {
        n.libre = false; n.choisi = "tige"; n.dessin();
        j.bravo("La tige revêtue d'hydroxyapatite.");
        j.expliquer("<p>Un biomatériau <b>bioactif</b> a une interaction forte avec son environnement : la couche d'hydroxyapatite, partie minérale de l'os, améliore la biocompatibilité et l'intégration de l'implant dans le site osseux. Un biomatériau <b>bio-inerte</b> remplace une fonction, comme une valve du cœur.</p>");
        j.suite();
      };
      n.surClic = function (q) {
        if (q === "tige") gagne();
        else { n.choisi = "valve"; n.dessin(); j.erreur("La valve remplace une fonction sans chercher à se lier au tissu. Cherche l'implant qui porte la partie minérale de l'os."); }
      };
      j.reponse(gagne);
    } },
    { nom: "L'hydroxyapatite", jouer: function (j, n) {
      n.surClic = null;
      j.fig.astuce("");
      j.titre("La maille de l'hydroxyapatite s'écrit \\(\\mathrm{Ca_{10}(PO_4)_6(OH)_2}\\). Dans 4 mailles, combien d'atomes de calcium et de groupes OH ?");
      j.nombre({ avant: "\\text{Ca},\\ \\text{OH} =", cases: [{ attendu: 40, tol: 0 }, { attendu: 8, tol: 0 }], ligne: true,
        aide: function () { return "Une maille contient 10 Ca et 2 OH. Multiplie par 4."; },
        ok: function () {
          j.bravo("40 Ca et 8 OH.");
          j.expliquer("<p>Formule \\(\\mathrm{Ca_5(PO_4)_3(OH)}\\), usuellement écrite \\(\\mathrm{Ca_{10}(PO_4)_6(OH)_2}\\) pour souligner que la maille comprend deux motifs.</p>");
          j.suite();
        } });
    } }
  ]
});
