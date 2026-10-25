/* Niveau : TD 1, partie 1, exercice 1. Classer trois robots selon les cinq critères du cours (chapitre 1, « Le robot et le système robotisé »). */
NIVEAU({
  id: "td1-classer",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var CRIT = ["Mobilité", "Architecture", "Interaction", "Autonomie", "Domaine"];
    var n = { robot: "", lignes: {} };
    n.dessin = function () {
      E.vider(g);
      D.texte(g, n.robot, [340, 70], { taille: 26 });
      CRIT.forEach(function (c, k) {
        var y = 140 + k * 86, v = n.lignes[c];
        E.s("rect", { x: 60, y: y, width: 560, height: 66, rx: 14, fill: v ? "#e3f7ee" : "#fff", stroke: v ? C.ok : "#c6cbd8", "stroke-width": 2.5, "stroke-dasharray": v ? null : "6 5" }, g);
        D.texte(g, c, [80, y + 33], { taille: 19, ancre: "start", coul: C.doux });
        D.texte(g, v || "?", [600, y + 33], { taille: 19, ancre: "end", coul: v ? C.encre : C.gris });
      });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le robot Delta", jouer: function (j, n) {
      n.robot = "a) Delta, conditionnement agroalimentaire"; n.lignes = {}; n.dessin();
      j.titre("Classe le robot Delta du conditionnement agroalimentaire selon quatre critères du cours.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:auto 1fr;gap:8px 12px;align-items:center;font-size:18px">' +
        ["Mobilité", "Architecture", "Autonomie", "Domaine"].map(function (c, k) { return "<span>" + c + '</span><span class="trou" data-attendu="' + "fpgi"[k] + '" style="min-width:240px"></span>'; }).join("") + "</div>");
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "p", html: "parallèle" }, { id: "i", html: "industriel" }, { id: "s", html: "sériel" }, { id: "f", html: "fixe" }, { id: "g", html: "programmé (2)" }, { id: "m", html: "médical" }],
        aide: "Le Delta a trois bras qui portent ensemble la même nacelle : chaîne ouverte ou fermée ?",
        ok: function () {
          n.lignes = { "Mobilité": "fixe", "Architecture": "parallèle", "Interaction": "conventionnel", "Autonomie": "programmé (2)", "Domaine": "industriel" }; n.dessin();
          j.bravo("Fixe, parallèle, programmé, industriel.");
          j.expliquer("<p>Le Delta est le robot parallèle du cours : trois bras en chaîne fermée. En conditionnement, il travaille en général dans une cellule séparée des opérateurs : robot industriel conventionnel.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Le drone", jouer: function (j, n) {
      n.robot = "b) Drone de surveillance"; n.lignes = {}; n.dessin();
      j.titre("Le drone de surveillance : quel est son classement selon la mobilité ?");
      j.choix([
        { html: "Fixe", aide: "Sa base n'est pas posée : il se déplace dans les airs." },
        { html: "Mobile (aérien)", juste: true },
        { html: "Hybride", aide: "Hybride, dans le cours, c'est une base mobile qui porte un bras manipulateur." }
      ], { ok: function () {
        n.lignes = { "Mobilité": "mobile (aérien)" }; n.dessin();
        j.bravo("Un robot mobile aérien.");
        j.expliquer("<p>Pour l'autonomie et le domaine, l'énoncé ne suffit pas : un drone de surveillance peut être téléopéré ou autonome, et servir au service professionnel ou au militaire. Dans ta réponse, dis de quoi dépend le classement : le cours précise qu'un robot peut appartenir à plusieurs catégories.</p>");
        j.suite();
      } });
    } },
    { nom: "Le bras chirurgical", jouer: function (j, n) {
      n.robot = "c) Bras chirurgical téléopéré"; n.lignes = {}; n.dessin();
      j.titre("Le bras chirurgical téléopéré : complète son niveau d'autonomie et son domaine.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:auto 1fr;gap:8px 12px;align-items:center;font-size:18px"><span>Autonomie</span><span class="trou" data-attendu="t" style="min-width:240px"></span><span>Domaine</span><span class="trou" data-attendu="m" style="min-width:240px"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "a", html: "autonome (4)" }, { id: "m", html: "médical et d'assistance" }, { id: "t", html: "téléopéré (1)" }, { id: "i", html: "industriel" }],
        aide: "« Téléopéré » est dans son nom : c'est le chirurgien qui commande chaque geste.",
        ok: function () {
          n.lignes = { "Autonomie": "téléopéré (1)", "Domaine": "médical" }; n.dessin();
          j.bravo("Téléopéré (niveau 1), domaine médical.");
          j.expliquer("<p>Le chirurgien, à la console, commande ; le robot reproduit. C'est le niveau d'autonomie le plus bas de l'échelle du cours, et le plus courant en chirurgie.</p>");
          j.suite();
        }
      });
    } }
  ]
});
