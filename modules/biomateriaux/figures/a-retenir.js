(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Cartes de révision : une question par idée essentielle ---------- */
  (function () {
    var f = R.figure("fig-cartes", {
      largeur: 960, hauteur: 460, titre: "Cartes de révision",
      essai: "<strong>Essaie</strong> : choisis un chapitre, réponds dans ta tête, puis retourne la carte. <strong>Observe</strong> : si ta réponse contient l'idée de la carte, tu l'as retenue."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var K = {
      1: [["Qu'est-ce qui distingue un dispositif médical d'un médicament ?", "Son action principale n'est ni pharmacologique, ni immunologique, ni métabolique."], ["Sur quels critères repose la classe de risque I, IIa, IIb ou III ?", "Le caractère invasif, la durée du contact, la partie du corps."], ["Implant ou greffe : lequel est vivant ?", "La greffe (auto, allo ou xéno) ; l'implant est fait de biomatériaux."]],
      2: [["Les trois critères de Chester pour un biomatériau ?", "Contact avec le vivant, plus de quelques heures, non vivant."], ["Biocompatibilité et biofonctionnalité : la différence ?", "Ne pas nuire (réponse de l'hôte appropriée) ; faire le travail prévu."], ["Bio-inerte ou bioactif : une tige revêtue d'hydroxyapatite ?", "Bioactive : l'os se lie à la surface."]],
      3: [["Pourquoi diviser la force par la section ?", "Pour comparer des pièces de tailles différentes : σ = F/S₀."], ["Que représente la pente de la droite de Hooke ?", "Le module E : la rigidité (σ = E ε)."], ["Que mesure l'aire sous la courbe de traction ?", "La ténacité : l'énergie absorbée avant la rupture."]],
      4: [["Pourquoi un métal conduit-il le courant ?", "Ses électrons sont libres (liaison métallique)."], ["Pourquoi une céramique casse-t-elle net ?", "Liaisons ioniques et covalentes rigides : pas de déformation plastique."], ["Pourquoi un polymère ramollit-il à chaud ?", "Les liaisons entre chaînes sont faibles : elles cèdent les premières."]],
      5: [["Pourquoi le titane pour une tige de hanche ?", "Module proche de l'os (moins de stress-shielding), biocompatible, pas d'allergie."], ["Pourquoi éviter une vis en titane sur une plaque en inox ?", "Deux métaux en contact : corrosion galvanique."], ["Quel métal se souvient de sa forme ?", "Le NiTi : chauffé au-dessus de Af, il reprend sa forme."]],
      6: [["Bio-inerte ou résorbable : l'alumine ? l'hydroxyapatite ?", "Alumine : bio-inerte. Hydroxyapatite : résorbable, remplacée par l'os."], ["Le point faible des céramiques ?", "Fragiles : elles cassent au choc."], ["Pourquoi le carbone pyrolytique dans les valves ?", "Il est biocompatible avec le sang."]],
      7: [["Que se passe-t-il quand un polymère amorphe dépasse sa Tg ?", "Il passe de vitreux (environ 1 GPa) à caoutchouteux (environ 1 MPa)."], ["Un semi-cristallin entre Tg et Tf : opaque ou transparent ?", "Opaque ou translucide : ses cristaux sont encore là."], ["Comment trouver le taux de cristallinité X ?", "Par les densités : ρ = ρc X + ρa (1 − X)."]],
      8: [["Pourquoi dit-on qu'un polymère est viscoélastique ?", "Il est à la fois ressort (σ = E ε) et amortisseur (σ = η dε/dt)."], ["Quel polymère pour l'insert d'une hanche ?", "L'UHMWPE : il glisse et s'use peu."], ["Un avantage du collagène en chirurgie ?", "Il est hémostatique (et biodégradable)."]],
      9: [["Qu'est-ce que la vulcanisation ?", "Des ponts entre les chaînes (souvent au soufre) : le caoutchouc devient élastique et durable."], ["Élastomère ou plastomère à l'ambiante : le caoutchouc naturel ?", "Élastomère : sa Tv est vers −60 °C."]],
      10: [["Comment baisser la Tg du PVC ?", "Ajouter un plastifiant."], ["Quelle forme de charge rigidifie le plus ?", "La plus allongée (grand rapport de forme), jusqu'aux fibres."]],
      11: [["Dans le sens des fibres, qui travaille ?", "Les fibres : E_CL = E_f φ_f + E_m φ_m."], ["E_CL ou E_CT : lequel est le plus grand ?", "Toujours E_CL : en travers, c'est la matrice qui travaille."]],
      12: [["Une pièce de même section sur des mètres : quel procédé ?", "L'extrusion."], ["Une bavure autour d'une pièce en thermodurcissable ?", "Le moulage par compression."], ["Une pièce creuse sans soudure, une citerne ?", "Le rotomoulage."]]
    };
    var ch = 1, i = 0, vue = false;
    var sel = R.choix(f.reglages, Object.keys(K).map(function (c) { return [c, "Chapitre " + c]; }), function () { ch = +sel.value; i = 0; vue = false; dessin(); });
    sel.style.cssText = "font: inherit; font-size: 18px; min-height: 48px; padding: 6px 12px; border: 2px solid #15171f; border-radius: 12px; background: #fff;";
    var b = R.boutons(f.reglages);
    R.bouton(b, "Retourner la carte", function () { vue = !vue; dessin(); });
    R.bouton(b, "Carte suivante", function () { i = (i + 1) % K[ch].length; vue = false; dessin(); });
    function lignes(s, n) {
      var mots = s.split(" "), L = [""];
      mots.forEach(function (m) { if ((L[L.length - 1] + " " + m).trim().length > n) L.push(m); else L[L.length - 1] = (L[L.length - 1] + " " + m).trim(); });
      return L;
    }
    function dessin() {
      R.vider(g);
      var c = K[ch][i];
      R.el("rect", { x: 120, y: 50, width: 720, height: 340, rx: 28, fill: vue ? PLATEFORME.teinte(0.12) : "#fff", stroke: vue ? C.acc : C.fonce, "stroke-width": 3 }, g);
      T(g, "chapitre " + ch + " · carte " + (i + 1) + " / " + K[ch].length, [480, 90], { taille: 17, couleur: C.doux, halo: false });
      T(g, vue ? "réponse" : "question", [480, 130], { taille: 18, gras: true, couleur: vue ? C.acc : C.fonce, halo: false });
      var L = lignes(vue ? c[1] : c[0], 42);
      L.forEach(function (l, k) { T(g, l, [480, 250 + (k - (L.length - 1) / 2) * 40], { taille: 26, gras: !vue, halo: false }); });
      zone.innerHTML = vue ? "<strong>Réponse</strong> : " + c[1] : "<strong>Question</strong> : " + c[0];
    }
    dessin();
  })();
})();
