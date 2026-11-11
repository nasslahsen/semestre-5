/* Niveau : exigences pour un biomatériau. Les trois critères de Chester, greffe, biocompatibilité négative et élargie, biofonctionnalité, dégradation, fatigue. */
NIVEAU({
  id: "exigences",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { objet: "comprimé", etat: [1, 0, 1], marque: -1, libre: true };
    var CR = ["contact avec le vivant", "plus de quelques heures", "non vivant"];
    n.dessin = function () {
      E.vider(g);
      E.s("rect", { x: 140, y: 110, width: 400, height: 76, rx: 18, fill: PLATEFORME.teinte(0.15), stroke: C.jeu, "stroke-width": 3 }, g);
      D.texte(g, n.objet, [340, 148], { taille: 26 });
      CR.forEach(function (c, i) {
        var y = 250 + i * 100, v = n.etat[i], m = n.marque === i;
        E.s("rect", { x: 60, y: y - 38, width: 560, height: 76, rx: 16, fill: m ? "#fff4d6" : "#fff", stroke: m ? D.C.acc : C.pale, "stroke-width": m ? 5 : 2 }, g);
        D.texte(g, (i + 1) + ". " + c, [90, y], { ancre: "start", taille: 21 });
        if (v !== null) {
          D.rond(g, [560, y], 26, { fill: v ? "#e3f7ee" : "#fde8e8", stroke: v ? C.ok : C.ko, ep: 3 });
          D.texte(g, v ? "oui" : "non", [560, y + 1], { taille: 17, fond: false, coul: v ? C.ok : C.ko });
        }
      });
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      for (var i = 0; i < 3; i++) if (p[0] > 60 && p[0] < 620 && Math.abs(p[1] - (250 + i * 100)) < 40) n.surClic(i);
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le comprimé", jouer: function (j, n) {
      j.fig.astuce("Touche un des trois critères.");
      j.titre("Un comprimé touche les tissus de l'estomac, mais ce n'est pas un biomatériau. Touche le critère qui l'exclut.");
      var gagne = function () {
        n.libre = false; n.marque = 1; n.dessin();
        j.bravo("La durée du contact.");
        j.expliquer("<p>Conférence de consensus de Chester (1991) : un <b>biomatériau</b> est un matériau non vivant utilisé dans un dispositif médical pour remplacer ou traiter un tissu, un organe ou une fonction. Le critère de durée (plus de quelques heures) exclut les produits pharmaceutiques du champ des biomatériaux.</p>");
        j.suite();
      };
      n.surClic = function (i) {
        if (i === 1) gagne();
        else { n.marque = i; n.dessin(); j.erreur(i === 0 ? "Le comprimé touche bien des tissus vivants : ce critère est rempli." : "Un comprimé n'est pas vivant : ce critère est rempli. Regarde celui qui porte un « non »."); }
      };
      j.reponse(gagne);
    } },
    { nom: "La greffe", jouer: function (j, n) {
      n.surClic = null; n.objet = "autogreffe d'os"; n.etat = [null, null, null]; n.marque = -1; n.dessin();
      j.fig.astuce("");
      j.titre("On prélève un morceau d'os sur le patient pour combler une fracture. Pourquoi n'est-ce pas un biomatériau ?");
      j.choix([
        { html: "Le contact est trop court", aide: "Une greffe reste en place très longtemps." },
        { html: "Le greffon est vivant", juste: true },
        { html: "Il ne touche aucun fluide", aide: "Un os greffé baigne dans les tissus et le sang." }
      ], { colonnes: 1, ok: function () {
        n.etat = [1, 1, 0]; n.marque = 2; n.dessin();
        j.bravo("Critère 3 : non vivant. Il sépare biomatériau et greffe.");
        j.suite();
      } });
    } },
    { nom: "Trois mots", jouer: function (j, n) {
      n.objet = "tige de hanche"; n.etat = [1, 1, 1]; n.marque = -1; n.dessin();
      j.titre("Associe chaque phrase à l'exigence qu'elle décrit.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<span>pas de réaction inflammatoire ni de toxicité</span><span class="trou" data-attendu="n"></span>' +
        '<span>une réponse de l\'hôte appropriée dans une application précise</span><span class="trou" data-attendu="e"></span>' +
        '<span>remplir la fonction pour laquelle il est prévu</span><span class="trou" data-attendu="f"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "f", html: "biofonctionnalité" }, { id: "n", html: "biocompatibilité négative" }, { id: "e", html: "biocompatibilité élargie" }],
        aide: "La biocompatibilité « négative » dit ce que le matériau ne doit pas faire ; l'élargie parle de la réponse de l'hôte ; la biofonctionnalité parle du travail à faire.",
        ok: function () {
          j.bravo("Négative, élargie, biofonctionnalité.");
          j.expliquer("<p>La <b>tolérance biologique</b> porte sur le produit, ses constituants et ses produits de dégradation.</p>");
          j.suite();
        }
      });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      j.titre("Un camarade écrit : « La corrosion d'une tige métallique est une modification de l'hôte par le biomatériau. » Où est l'erreur ?");
      j.choix([
        { html: "La corrosion est une dégradation du biomatériau par le corps", juste: true },
        { html: "Les métaux ne se corrodent pas dans le corps", aide: "Le cours cite la corrosion des métaux comme premier mode de dégradation." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Le corps abîme le matériau : c'est une dégradation.");
        j.expliquer("<p>Le biomatériau <b>se dégrade</b> (corrosion, vieillissement, débris) et il <b>modifie l'hôte</b>, en bien (adaptation aux contraintes) ou en mal (inflammation, toxicité).</p>");
        j.suite();
      } });
    } },
    { nom: "Des millions de pas", jouer: function (j, n) {
      j.titre("Une tige de hanche est chargée puis déchargée à chaque pas, des millions de fois par an. Quelle résistance mécanique compte le plus ?");
      j.choix([
        { html: "La résistance au choc", aide: "Un choc est un événement isolé. Ici l'effort revient sans cesse." },
        { html: "La résistance à la fatigue", juste: true },
        { html: "La résistance au fluage", aide: "Le fluage, c'est une déformation lente sous un effort constant. Ici l'effort va et vient." }
      ], { colonnes: 1, ok: function () {
        j.bravo("La fatigue : un effort répété.");
        j.expliquer("<p>Exigences mécaniques suivant le produit : résistance à la rupture, à l'usure, à la fatigue, au fluage, au choc.</p>");
        j.suite();
      } });
    } }
  ]
});
