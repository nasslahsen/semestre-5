/*
 * Schémas du module Biomatériaux (dessinés par commun/js/schema.js) : une entrée par <div class="schema" id="sc-...">.
 * Servent aux pages de cours (donc aux pages de chapitre) et à la page « L'essentiel en schémas ».
 */
window.SCHEMAS = {
  /* ---------- Chapitre 1 ---------- */
  "sc-dm": { titre: "Dispositif médical ou médicament ?",
    cols: [[{ id: "p", t: "Produit de santé", s: "usage médical, logiciels compris" }],
           [{ id: "m", t: "Mode d'action principal voulu", s: "art. R5211-2 du CSP" }],
           [{ id: "a", t: "Pharmacologique, immunologique ou métabolique", k: "neutre" }, { id: "b", t: "Ni l'un ni l'autre", s: "mécanique, physique" }],
           [{ id: "med", t: "Médicament", s: "antibiotique, vaccin, insuline", k: "neutre" }, { id: "dm", t: "Dispositif médical", s: "seringue, pansement, prothèse, logiciel", k: "fort" }]],
    liens: [["p", "m"], ["m", "a"], ["m", "b"], ["a", "med"], ["b", "dm"]] },

  "sc-classes": { titre: "Classes de risque : invasif ? combien de temps ? où ? Plus de tests à chaque marche",
    cols: [[{ id: "i", t: "Classe I", s: "non invasif, ou court au contact de la peau\nbas de contention, fauteuil roulant", note: "risque faible" }],
           [{ id: "a", t: "Classe IIa", s: "invasif de courte durée\nlentilles, poches de sang", note: "risque moyen" }],
           [{ id: "b", t: "Classe IIb", s: "invasif prolongé\nimplants chirurgicaux, pompes à perfusion", k: "doux", note: "risque élevé" }],
           [{ id: "t", t: "Classe III", s: "cœur, SCC, SNC, effet biologique, biodégradable\nstent, prothèse de hanche", k: "fort", note: "risque le plus élevé" }]],
    liens: [["i", "a"], ["a", "b"], ["b", "t"]] },

  "sc-vocabulaire": { titre: "Implant, prothèse, bioprothèse, greffe",
    cols: [[{ id: "c", t: "Ce qu'on met dans le corps" }],
           [{ id: "bm", t: "Biomatériaux", s: "non vivant" }, { id: "tn", t: "Tissu non vivant traité", s: "venu d'un donneur" }, { id: "v", t: "Vivant", s: "cellules, tissus, organes" }],
           [{ id: "im", t: "Implant", s: "temporaire ou permanent" }, { id: "pr", t: "Prothèse", s: "supplée un organe, restaure une fonction" }, { id: "oa", t: "Organe artificiel", s: "hybride s'il a des cellules vivantes" }, { id: "bp", t: "Bioprothèse", s: "valve de porc traitée", k: "doux" }, { id: "gr", t: "Greffe", k: "doux" }],
           [{ id: "au", t: "Autogreffe", s: "même personne", k: "fort" }, { id: "al", t: "Allogreffe", s: "même espèce", k: "fort" }, { id: "xe", t: "Xénogreffe", s: "autre espèce", k: "fort" }]],
    liens: [["c", "bm"], ["c", "tn"], ["c", "v"], ["bm", "im"], ["bm", "pr"], ["bm", "oa"], ["tn", "bp"], ["v", "gr"], ["gr", "au"], ["gr", "al"], ["gr", "xe"]] },

  "sc-generations": { titre: "Quatre générations, toutes biocompatibles",
    cols: [[{ id: "g1", t: "1re génération", s: "non contrôlés\nbois, verre, or" }],
           [{ id: "g2", t: "2e génération", s: "début du XXe siècle\nmétaux, céramiques, polymères choisis" }],
           [{ id: "g3", t: "3e génération", s: "modification de surface, échafaudages biodégradables, nanomatériaux", k: "doux" }],
           [{ id: "g4", t: "4e génération", s: "ingénierie tissulaire, nanomédecine, médecine régénérative", k: "fort" }]],
    liens: [["g1", "g2"], ["g2", "g3"], ["g3", "g4"]] },

  /* ---------- Chapitre 2 ---------- */
  "sc-chester": { titre: "Reconnaître un biomatériau : les trois critères de Chester (1991)",
    cols: [[{ id: "m", t: "Matériau", s: "dans un dispositif médical" }],
           [{ id: "c1", t: "Contact avec le vivant ?", s: "tissus ou fluides : d'où la biocompatibilité" }, { id: "c2", t: "Plus de quelques heures ?", s: "exclut les médicaments" }, { id: "c3", t: "Non vivant ?", s: "exclut les greffes" }],
           [{ id: "b", t: "Biomatériau", s: "trois oui", k: "fort" }]],
    liens: [["m", "c1"], ["m", "c2"], ["m", "c3"], ["c1", "b"], ["c2", "b"], ["c3", "b"]] },

  "sc-histoire": { titre: "Des Égyptiens au titane",
    cols: [[{ id: "a", t: "Égyptiens", s: "fer, cuivre, plomb, bois, plâtre" }],
           [{ id: "b", t: "Guerre", s: "PMMA des cockpits : lentilles intraoculaires" }],
           [{ id: "c", t: "Années 50", s: "inox pour la hanche, polyesters vasculaires" }],
           [{ id: "d", t: "1969", s: "titane (Brånemark), venu de l'aéronautique", k: "doux" }],
           [{ id: "e", t: "Années 70", s: "études de toxicité : les alliages de titane gagnent", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]] },

  "sc-valider": { titre: "Valider un biomatériau : du plus sûr au plus risqué",
    cols: [[{ id: "a", t: "Calculs", s: "contraintes, simulations" }],
           [{ id: "b", t: "Essais mécaniques", s: "rupture, bancs, simulateurs" }],
           [{ id: "c", t: "Essais biologiques", s: "cellules, animaux, homme" }],
           [{ id: "d", t: "Organisme notifié", s: "marquage, protocole strict" }],
           [{ id: "e", t: "Suivi à long terme", s: "la seule vraie sécurité", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]] },

  /* ---------- Chapitres 3 et 4 ---------- */
  // courbe de traction dessinée
  "sc-traction": function (boite, S) {
    var el = S.el;
    var tt = document.createElement("p"); tt.className = "schema-titre"; tt.textContent = "La courbe de traction"; boite.appendChild(tt);
    var svg = el("svg", { viewBox: "0 0 1000 330", role: "img", "aria-label": "courbe de traction" }, boite);
    var O = [90, 290];
    el("path", { d: "M" + O[0] + "," + O[1] + " H960 M" + O[0] + "," + O[1] + " V20", stroke: "#15171f", "stroke-width": 2.5, fill: "none" }, svg);
    function T(x, y, s, o) { var t = el("text", Object.assign({ x: x, y: y, "font-size": 17, fill: "#15171f" }, o || {}), svg); t.textContent = s; return t; }
    T(940, 318, "ε", { "font-size": 20, "font-style": "italic" }); T(60, 34, "σ", { "font-size": 20, "font-style": "italic" });
    el("path", { d: "M90,290 L250,110 C330,80 420,62 520,58 C600,56 650,70 700,110", fill: "none", "stroke-width": 4, style: "stroke:var(--jeu-texte)" }, svg);
    el("path", { d: "M380,72 L520,230", fill: "none", stroke: "#8a8f9c", "stroke-width": 2, "stroke-dasharray": "7 6" }, svg);
    [[250, 110, "A : Re", -30, -14], [520, 58, "C : Rmax", -40, -16], [700, 110, "D : Rr (rupture)", 12, 6]].forEach(function (p) {
      el("circle", { cx: p[0], cy: p[1], r: 7, style: "fill:var(--jeu-texte)" }, svg); T(p[0] + p[3], p[1] + p[4], p[2], { "font-weight": 700 });
    });
    T(200, 250, "O → A : droite de Hooke, σ = E ε", { "font-size": 15 });
    T(200, 272, "on relâche : elle revient", { "font-size": 15, fill: "#5b6172" });
    T(560, 250, "après A : déformation permanente", { "font-size": 15 });
    T(560, 272, "décharge parallèle à Hooke", { "font-size": 15, fill: "#5b6172" });
    T(760, 170, "Aire sous la courbe :", { "font-size": 15, "font-weight": 700 });
    T(760, 192, "la ténacité", { "font-size": 15 });
  },

  "sc-familles": { titre: "Les liaisons font les propriétés",
    cols: [[{ id: "l1", t: "Liaison métallique", s: "cations + électrons libres" }, { id: "l2", t: "Ioniques et covalentes", s: "pas d'électrons libres" }, { id: "l3", t: "Covalentes + liaisons faibles", s: "fortes dans la chaîne, faibles entre chaînes" }],
           [{ id: "f1", t: "Métaux", s: "conducteurs, ductiles, E élevé", k: "doux" }, { id: "f2", t: "Céramiques", s: "dures, fragiles, isolantes, réfractaires, E ≈ 200 GPa", k: "doux" }, { id: "f3", t: "Polymères", s: "souples, isolants, E de 0,001 à 3 GPa, rien au-delà de 200 °C", k: "doux" }],
           [{ id: "u1", t: "Tige de hanche", s: "alliage de titane", k: "fort" }, { id: "u2", t: "Tête de hanche", s: "alumine, zircone", k: "fort" }, { id: "u3", t: "Insert", s: "polyéthylène", k: "fort" }]],
    liens: [["l1", "f1"], ["l2", "f2"], ["l3", "f3"], ["f1", "u1"], ["f2", "u2"], ["f3", "u3"]] },

  /* ---------- Chapitre 5 ---------- */
  "sc-pth": { titre: "Une prothèse totale de hanche : quatre pièces, quatre exigences",
    cols: [[{ id: "a", t: "Cupule", s: "dans le bassin\nmétal" }],
           [{ id: "b", t: "Insert", s: "UHMWPE, céramique ou métal\nfrotte contre la tête", k: "doux" }],
           [{ id: "c", t: "Tête", s: "alumine, zircone ou métal", k: "doux" }],
           [{ id: "d", t: "Tige", s: "dans le fémur\nalliage de titane", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  "sc-metaux": { titre: "Quel métal pour quel besoin ?",
    cols: [[{ id: "b1", t: "Implant temporaire", s: "plaques, vis, clous" }, { id: "b2", t: "Très chargé, s'use peu", s: "tiges de genou et de hanche" }, { id: "b3", t: "Proche de l'os", s: "limiter le stress-shielding" }, { id: "b4", t: "Se referme à la chaleur", s: "agrafes, stents" }, { id: "b5", t: "Poreux comme l'os spongieux", s: "arthroplastie sans ciment" }],
           [{ id: "m1", t: "Inox 316L", s: "corrosion sous contrainte sans O₂, artefacts IRM", k: "fort" }, { id: "m2", t: "Cobalt-chrome", s: "E 230 GPa, fatigue, métal-métal 4,2 µm/an", k: "fort" }, { id: "m3", t: "Titane", s: "E 110 GPa, TiO₂, pas d'IRM, mais s'use mal", k: "fort" }, { id: "m4", t: "NiTi", s: "mémoire de forme, superélastique", k: "fort" }, { id: "m5", t: "Tantale poreux", s: "75 à 85 % de pores, E 2,5 à 3,9 GPa", k: "fort" }]],
    liens: [["b1", "m1"], ["b2", "m2"], ["b3", "m3"], ["b4", "m4"], ["b5", "m5"]] },

  // échelle des modules
  "sc-modules": function (boite, S) {
    var el = S.el;
    var tt = document.createElement("p"); tt.className = "schema-titre"; tt.textContent = "Modules d'Young (GPa) : plus la tige est rigide, moins l'os travaille"; boite.appendChild(tt);
    var data = [["Os", 20], ["Nitinol", 48], ["Titane", 110], ["Tantale", 190], ["Inox 316L", 200], ["Cobalt-chrome", 230]];
    var svg = el("svg", { viewBox: "0 0 1000 " + (data.length * 46 + 20), role: "img", "aria-label": "échelle des modules" }, boite);
    data.forEach(function (d, i) {
      var y = 10 + i * 46, w = d[1] / 230 * 700;
      var t = el("text", { x: 170, y: y + 25, "text-anchor": "end", "font-size": 17, "font-weight": 700, fill: "#15171f" }, svg); t.textContent = d[0];
      el("rect", { x: 186, y: y + 6, width: w, height: 28, rx: 6, style: "fill:" + (i === 0 ? "var(--jeu-pale);stroke:var(--jeu-texte);stroke-width:2" : "var(--jeu-texte)") }, svg);
      var v = el("text", { x: 196 + w, y: y + 26, "font-size": 16, "font-family": "JetBrains Mono, monospace", fill: "#15171f" }, svg); v.textContent = (d[0] === "Nitinol" ? "≥ " : "") + d[1];
    });
  },

  "sc-corrosion": { titre: "Pourquoi un implant métallique peut se desceller",
    cols: [[{ id: "a", t: "Corrosion in vivo", s: "milieu salé à 37 °C" }],
           [{ id: "b", t: "Relargage d'ions", s: "Cr, Co, Ni, Ti… dans les tissus" }],
           [{ id: "c", t: "Complexes métallo-protéiques", s: "nutriments bloqués, cellules détruites", k: "doux" }],
           [{ id: "d", t: "Descellement", s: "la prothèse ne tient plus dans l'os", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  /* ---------- Chapitre 6 ---------- */
  "sc-ceramiques": { titre: "Biocéramiques : rester ou disparaître",
    cols: [[{ id: "c", t: "Biocéramiques", s: "frittage ; dures, fragiles" }],
           [{ id: "i", t: "Bio-inertes", s: "gardent leurs propriétés", k: "doux" }, { id: "r", t: "Résorbables", s: "remplacées par l'os", k: "doux" }],
           [{ id: "al", t: "Alumine Al₂O₃", s: "≥ 99,5 %, HIP" }, { id: "zr", t: "Zircone ZrO₂", s: "Y-TZP, fond à 2 953 K" }, { id: "cp", t: "Carbone pyrolytique", s: "graphène empilé, conducteur" }, { id: "ha", t: "Hydroxyapatite", s: "Ca₁₀(PO₄)₆(OH)₂" }, { id: "tc", t: "Phosphate tricalcique", s: "Ca₃(PO₄)₂" }],
           [{ id: "u1", t: "Têtes et inserts de hanche", k: "fort" }, { id: "u2", t: "Têtes, couronnes dentaires", k: "fort" }, { id: "u3", t: "Valves cardiaques", s: "toléré par le sang", k: "fort" }, { id: "u4", t: "Revêtements plasma", s: "90 % de réussite à 10 ans", k: "fort" }, { id: "u5", t: "Comblement osseux", s: "zones peu chargées", k: "fort" }]],
    liens: [["c", "i"], ["c", "r"], ["i", "al"], ["i", "zr"], ["i", "cp"], ["r", "ha"], ["r", "tc"], ["al", "u1"], ["zr", "u2"], ["cp", "u3"], ["ha", "u4"], ["tc", "u5"]] },

  /* ---------- Chapitres 7 et 8 ---------- */
  "sc-polymeres": { titre: "Trois familles de polymères",
    cols: [[{ id: "p", t: "Polymères", s: "macromolécules" }],
           [{ id: "tp", t: "Thermoplastique", s: "chaînes linéaires ou ramifiées" }, { id: "el", t: "Élastomère", s: "réseau à mailles larges" }, { id: "td", t: "Thermodurcissable", s: "réseau à mailles serrées" }],
           [{ id: "c1", t: "Se ramollit, remoulable", s: "œuf en chocolat ; amorphe ou semi-cristallin", k: "doux" }, { id: "c2", t: "Élastique", s: "amorphe", k: "doux" }, { id: "c3", t: "Ne se reforme plus", s: "œuf cuit ; amorphe", k: "doux" }],
           [{ id: "e1", t: "PE, PC, PS, PVC", s: "seringues, tubes, poches", k: "fort" }, { id: "e2", t: "Caoutchouc, silicone", s: "joints, gants", k: "fort" }, { id: "e3", t: "Époxy, polyester UP, phénolique", s: "moulés par compression", k: "fort" }]],
    liens: [["p", "tp"], ["p", "el"], ["p", "td"], ["tp", "c1"], ["el", "c2"], ["td", "c3"], ["c1", "e1"], ["c2", "e2"], ["c3", "e3"]] },

  // courbe du module en fonction de la température
  "sc-courbe": function (boite, S) {
    var el = S.el;
    var tt = document.createElement("p"); tt.className = "schema-titre"; tt.textContent = "Le module en fonction de la température (log E)"; boite.appendChild(tt);
    var svg = el("svg", { viewBox: "0 0 1000 380", role: "img", "aria-label": "courbe du module" }, boite);
    function T(x, y, s, o) { var t = el("text", Object.assign({ x: x, y: y, "font-size": 16, fill: "#15171f" }, o || {}), svg); t.textContent = s; return t; }
    el("path", { d: "M90,330 H960 M90,330 V20", stroke: "#15171f", "stroke-width": 2.5, fill: "none" }, svg);
    T(925, 360, "T", { "font-size": 20, "font-style": "italic" }); T(30, 36, "log E", { "font-size": 16, "font-weight": 700 });
    T(20, 76, "10⁹ Pa", { "font-family": "JetBrains Mono, monospace", "font-size": 15 }); T(20, 236, "10⁶ Pa", { "font-family": "JetBrains Mono, monospace", "font-size": 15 });
    var xg = 330, xf = 690;
    [[xg, "Tg"], [xf, "Tf"]].forEach(function (p) { el("path", { d: "M" + p[0] + ",330 V40", stroke: "#b6bac4", "stroke-width": 2, "stroke-dasharray": "6 6" }, svg); T(p[0] - 12, 356, p[1], { "font-weight": 700, "font-size": 18 }); });
    // amorphe : plateau vitreux, chute à Tg, plateau caoutchouteux, écoulement
    el("path", { d: "M100,72 H280 C320,72 340,232 380,232 H500 C550,232 570,320 600,326", fill: "none", stroke: "#8a8f9c", "stroke-width": 3.5, "stroke-dasharray": "10 6" }, svg);
    // semi-cristallin : petite chute à Tg, baisse lente, chute à Tf
    el("path", { d: "M100,66 H290 C320,66 340,128 380,132 C480,142 600,150 650,152 C690,154 700,235 740,236 H950", fill: "none", "stroke-width": 4.5, style: "stroke:var(--jeu-texte)" }, svg);
    T(110, 56, "vitreux, rigide", { "font-weight": 700 });
    T(420, 122, "semi-cristallin (opaque)", { "font-size": 15, style: "fill:var(--jeu-texte)", "font-weight": 700 });
    T(390, 222, "amorphe : plateau caoutchouteux", { "font-size": 15, fill: "#5b6172" });
    T(730, 222, "au-dessus de Tf : X = 0, transparent", { "font-size": 15, style: "fill:var(--jeu-texte)" });
    T(612, 322, "liquide", { "font-size": 14, fill: "#5b6172" });
  },

  "sc-trempe": { titre: "TD 1 : la pièce chauffée puis refroidie d'un coup",
    cols: [[{ id: "p", t: "Plaque", s: "ρ = ρc X + ρa (1 − X)\nm = ρ V (ne change jamais)" }],
           [{ id: "a", t: "Chauffée sous Tf" }, { id: "b", t: "Chauffée au-dessus de Tf, puis trempée" }],
           [{ id: "a2", t: "Les cristaux restent", s: "X et ρ inchangés", k: "doux" }, { id: "b2", t: "Tout fond, pas le temps de cristalliser", s: "X = 0, ρ = ρa", k: "doux" }],
           [{ id: "a3", t: "Même volume", k: "fort" }, { id: "b3", t: "V = m / ρa", s: "plus grand", k: "fort" }]],
    liens: [["p", "a"], ["p", "b"], ["a", "a2"], ["b", "b2"], ["a2", "a3"], ["b2", "b3"]] },

  "sc-medicaux": { titre: "Le bon polymère médical",
    cols: [[{ id: "b1", t: "Insert de hanche, plateau tibial" }, { id: "b2", t: "Rachis, visible aux rayons X" }, { id: "b3", t: "Voir le sang circuler, hors du corps" }, { id: "b4", t: "Poignée à 180 °C, autoclave" }, { id: "b5", t: "Plus de 1 000 stérilisations vapeur" }, { id: "b6", t: "Implant mammaire, souple" }, { id: "b7", t: "Prothèse vasculaire" }, { id: "b8", t: "Lentille, ciment osseux" }, { id: "b9", t: "Doit disparaître" }],
           [{ id: "p1", t: "UHMWPE", k: "fort" }, { id: "p2", t: "PEEK", k: "fort" }, { id: "p3", t: "PC", k: "fort" }, { id: "p4", t: "PEI", k: "fort" }, { id: "p5", t: "PSU", k: "fort" }, { id: "p6", t: "Silicone", k: "fort" }, { id: "p7", t: "PTFE, Dacron", k: "fort" }, { id: "p8", t: "PMMA", k: "fort" }, { id: "p9", t: "PLA, PGA", k: "fort" }]],
    liens: [["b1", "p1"], ["b2", "p2"], ["b3", "p3"], ["b4", "p4"], ["b5", "p5"], ["b6", "p6"], ["b7", "p7"], ["b8", "p8"], ["b9", "p9"]], vgap: 12 },

  /* ---------- Chapitres 9 et 10 ---------- */
  "sc-elastomere": { titre: "Élastomère ou plastomère : où est Tv ?",
    cols: [[{ id: "p", t: "Polymère amorphe" }],
           [{ id: "a", t: "Tv sous l'ambiante", s: "caoutchouc naturel : −60 °C" }, { id: "b", t: "Tv au-dessus", s: "polystyrène : 100 °C" }],
           [{ id: "e", t: "Élastomère", s: "E ≈ 1 MPa, jusqu'à 1 000 %, seulement élastique", k: "fort" }, { id: "f", t: "Plastomère", s: "E ≈ 1 GPa, élastique puis plastique", k: "doux" }]],
    liens: [["p", "a"], ["p", "b"], ["a", "e"], ["b", "f"]] },

  "sc-vulcanisation": { titre: "La vulcanisation : relier les chaînes",
    cols: [[{ id: "b", t: "Élastomère brut", s: "coule à chaud" }],
           [{ id: "s", t: "Soufre" }, { id: "p", t: "Peroxyde" }, { id: "o", t: "MgO / ZnO" }],
           [{ id: "s2", t: "Ponts S–S", s: "élastomère insaturé", k: "doux" }, { id: "p2", t: "Ponts C–C", s: "presque tous", k: "doux" }, { id: "o2", t: "Ponts éther", s: "élastomère halogéné", k: "doux" }],
           [{ id: "v", t: "Caoutchouc vulcanisé", s: "garde son plateau ; plus de soufre : Tg et E montent", k: "fort" }]],
    liens: [["b", "s"], ["b", "p"], ["b", "o"], ["s", "s2"], ["p", "p2"], ["o", "o2"], ["s2", "v"], ["p2", "v"], ["o2", "v"]] },

  "sc-pvc": { titre: "TD 1.5 : adapter le PVC",
    cols: [[{ id: "p", t: "PVC", s: "ρ = 1,45 ; Tg = 90 °C" }],
           [{ id: "a", t: "Plus léger", s: "ρ = 0,3" }, { id: "b", t: "Beaucoup plus rigide" }, { id: "c", t: "Plus souple", s: "Tg plus basse" }],
           [{ id: "a2", t: "Le gonfler", s: "même masse, 4,8 fois le volume", k: "fort" }, { id: "b2", t: "Le renforcer", s: "fibres, charges", k: "fort" }, { id: "c2", t: "Un plastifiant", k: "fort" }]],
    liens: [["p", "a"], ["p", "b"], ["p", "c"], ["a", "a2"], ["b", "b2"], ["c", "c2"]] },

  "sc-forme": { titre: "Rapport de forme : plus le renfort est allongé, plus E et HDT montent",
    cols: [[{ id: "g", t: "Granulaire", s: "1\nbilles, CaCO₃" }],
           [{ id: "l", t: "Lamellaire", s: "10 à 40\ntalc, mica" }],
           [{ id: "a", t: "Aciculaire", s: "10 à 100\nwollastonite", k: "doux" }],
           [{ id: "f", t: "Fibrillaire", s: "100 à l'infini\nfibres longues", k: "fort", note: "PP + 30 % verre : 6,5 GPa" }]],
    liens: [["g", "l"], ["l", "a"], ["a", "f"]] },

  /* ---------- Chapitre 11 ---------- */
  "sc-composites": { titre: "Un pli de fibres alignées, tiré dans deux sens",
    cols: [[{ id: "p", t: "Pli unidirectionnel", s: "fibres + matrice" }],
           [{ id: "l", t: "Le long des fibres" }, { id: "t", t: "En travers" }],
           [{ id: "l2", t: "Même déformation", s: "ressorts côte à côte", k: "doux" }, { id: "t2", t: "Même contrainte", s: "ressorts en série", k: "doux" }],
           [{ id: "l3", t: "E_CL = E_f φ_f + E_m φ_m", s: "les fibres travaillent", k: "fort" }, { id: "t3", t: "1/E_CT = φ_f/E_f + φ_m/E_m", s: "la matrice travaille", k: "fort" }]],
    liens: [["p", "l"], ["p", "t"], ["l", "l2"], ["t", "t2"], ["l2", "l3"], ["t2", "t3"]] },

  "sc-ko": { titre: "Fibres orientées : le coefficient d'orientation",
    cols: [[{ id: "a", t: "Toutes alignées", s: "K_o = 1", k: "fort" }],
           [{ id: "b", t: "Tissu 0 / 90", s: "K_o = 0,5", k: "doux" }],
           [{ id: "c", t: "0 / 90 / ±45 ou mat aléatoire", s: "K_o = 0,375" }],
           [{ id: "d", t: "±45", s: "K_o = 0,25" }],
           [{ id: "e", t: "Toutes à 90°", s: "K_o = 0", k: "neutre" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]] },

  /* ---------- Chapitre 12 ---------- */
  "sc-procedes": { titre: "Reconnaître le procédé à l'indice",
    cols: [[{ id: "p", t: "Pièce en plastique" }],
           [{ id: "td", t: "Thermodurcissable", s: "cuit dans le moule" }, { id: "tp", t: "Thermoplastique", s: "se ramollit à chaud" }],
           [{ id: "i1", t: "Bavure autour" }, { id: "i2", t: "Matière poussée d'un pot par un poinçon" }, { id: "i3", t: "Section constante, en continu" }, { id: "i4", t: "Petit point d'injection" }, { id: "i5", t: "Point au fond d'un flacon" }, { id: "i6", t: "Ligne de soudure au fond" }, { id: "i7", t: "Creuse, sans soudure" }, { id: "i8", t: "Mince, découpe au pourtour" }],
           [{ id: "r1", t: "Compression", k: "fort" }, { id: "r2", t: "Compression-transfert", k: "fort" }, { id: "r3", t: "Extrusion", k: "fort" }, { id: "r4", t: "Injection", k: "fort" }, { id: "r5", t: "Injection-soufflage", k: "fort" }, { id: "r6", t: "Extrusion-soufflage", k: "fort" }, { id: "r7", t: "Rotomoulage", k: "fort" }, { id: "r8", t: "Thermoformage", k: "fort" }]],
    liens: [["p", "td"], ["p", "tp"], ["td", "i1"], ["td", "i2"], ["tp", "i3"], ["tp", "i4"], ["tp", "i5"], ["tp", "i6"], ["tp", "i7"], ["tp", "i8"],
            ["i1", "r1"], ["i2", "r2"], ["i3", "r3"], ["i4", "r4"], ["i5", "r5"], ["i6", "r6"], ["i7", "r7"], ["i8", "r8"]], vgap: 12 },

  /* ---------- Schémas des pages de cours ---------- */
  "sc-dm-finalites": { titre: "Les finalités d'un dispositif médical",
    cols: [[{ id: "d", t: "Dispositif médical" }],
           [{ id: "a", t: "Une maladie", k: "doux" }, { id: "b", t: "Une blessure ou un handicap", k: "doux" }, { id: "c", t: "L'anatomie ou un processus physiologique", k: "doux" }],
           [{ id: "a2", t: "Diagnostic, prévention, contrôle, traitement", s: "imagerie, matériel de diagnostic", k: "fort" }, { id: "b2", t: "Diagnostic, contrôle, traitement, réparation", s: "fauteuil roulant", k: "fort" }, { id: "c2", t: "Étude, remplacement, modification", s: "prothèse de hanche, valve", k: "fort" }]],
    liens: [["d", "a"], ["d", "b"], ["d", "c"], ["a", "a2"], ["b", "b2"], ["c", "c2"]] },

  "sc-it": { titre: "L'ingénierie tissulaire : trois composants",
    cols: [[{ id: "a", t: "Échafaudage biodégradable", s: "poreux, interconnecté" }, { id: "b", t: "Cellules vivantes", s: "gardent leur phénotype" }, { id: "c", t: "Facteurs bioactifs", s: "guident le tissu" }],
           [{ id: "d", t: "Construction active", k: "doux" }],
           [{ id: "e", t: "Nouveau tissu fonctionnel", s: "pendant que l'échafaudage se dégrade", k: "fort" }]],
    liens: [["a", "d"], ["b", "d"], ["c", "d"], ["d", "e"]] },

  "sc-nano": { titre: "La nanomédecine : de 1 à 100 nm",
    cols: [[{ id: "n", t: "Nanotechnologies en santé", s: "4e génération" }],
           [{ id: "a", t: "Prévenir", k: "doux" }, { id: "b", t: "Diagnostiquer", s: "in vitro, in vivo", k: "doux" }, { id: "c", t: "Traiter", k: "doux" }],
           [{ id: "a2", t: "Filtres cosmétiques, revêtements anti-infection", k: "fort" }, { id: "b2", t: "Biocapteurs, imagerie, agents de contraste", k: "fort" }, { id: "c2", t: "Ciblage, délivrance de médicaments, doses réduites", k: "fort" }]],
    liens: [["n", "a"], ["n", "b"], ["n", "c"], ["a", "a2"], ["b", "b2"], ["c", "c2"]] },

  "sc-usages": { titre: "Les trois usages des biomatériaux",
    cols: [[{ id: "b", t: "Biomatériaux", s: "alternative aux greffes" }],
           [{ id: "a", t: "Pallier la déficience d'un organe", k: "doux" }, { id: "r", t: "Réparer", s: "chirurgie réparatrice", k: "doux" }, { id: "o", t: "Explorer le corps", k: "doux" }],
           [{ id: "a2", t: "Implants", k: "fort" }, { id: "r2", t: "Prothèses", k: "fort" }, { id: "o2", t: "Appareils et articles médico-chirurgicaux", k: "fort" }]],
    liens: [["b", "a"], ["b", "r"], ["b", "o"], ["a", "a2"], ["r", "r2"], ["o", "o2"]] },

  "sc-liaisons": { titre: "Liaisons fortes et liaisons faibles",
    cols: [[{ id: "l", t: "Liaisons" }],
           [{ id: "f", t: "Fortes", s: "C–C : 349 kJ/mol", k: "doux" }, { id: "w", t: "Faibles, entre molécules", s: "cèdent en premier", k: "neutre" }],
           [{ id: "m", t: "Métallique", s: "électrons libres, conduit", k: "fort" }, { id: "i", t: "Ionique", s: "A cède à B : A⁺B⁻", k: "fort" }, { id: "c", t: "Covalente", s: "A et B partagent : A:B", k: "fort" }, { id: "v", t: "Van der Waals", s: "2,1 à 8,4 kJ/mol" }, { id: "dp", t: "Dipolaires", s: "6,3 à 12,6 kJ/mol" }, { id: "h", t: "Hydrogène", s: "12,6 à 29,3 kJ/mol" }]],
    liens: [["l", "f"], ["l", "w"], ["f", "m"], ["f", "i"], ["f", "c"], ["w", "v"], ["w", "dp"], ["w", "h"]], vgap: 14 },

  "sc-ceramiques-familles": { titre: "Les familles de céramiques : métal + métalloïde",
    cols: [[{ id: "c", t: "Céramiques", s: "inorganiques, isolantes" }],
           [{ id: "o", t: "Oxydes", s: "Al₂O₃, BeO, SiO₂", k: "fort" }, { id: "n", t: "Nitrures", s: "BN, AlN", k: "doux" }, { id: "ca", t: "Carbures", s: "UC, TiC", k: "doux" }, { id: "b", t: "Borures", s: "borures métalliques" }, { id: "s", t: "Sulfures", s: "sulfures métalliques" }]],
    liens: [["c", "o"], ["c", "n"], ["c", "ca"], ["c", "b"], ["c", "s"]], vgap: 14 },

  "sc-categories": { titre: "Les quatre catégories de biomatériaux",
    cols: [[{ id: "b", t: "Biomatériaux" }],
           [{ id: "m", t: "Métaux et alliages", k: "fort" }, { id: "c", t: "Céramiques", k: "doux" }, { id: "p", t: "Polymères", k: "doux" }, { id: "n", t: "Origine naturelle", k: "doux" }],
           [{ id: "m2", t: "aciers, chrome, cobalt, NiTi" }, { id: "c2", t: "alumine, zircone, phosphates tricalciques, verres" }, { id: "p2", t: "Téflon, polyéthylènes, polyuréthanes, silicones" }, { id: "n2", t: "collagène, corail, nacre, os modifiés" }]],
    liens: [["b", "m"], ["b", "c"], ["b", "p"], ["b", "n"], ["m", "m2"], ["c", "c2"], ["p", "p2"], ["n", "n2"]], vgap: 14 },

  "sc-problemes-metaux": { titre: "Les problèmes des métaux implantés",
    cols: [[{ id: "m", t: "Métal implanté", s: "Fe, Cr, Co, Ni, Ti… tolérés en petite quantité" }],
           [{ id: "a", t: "Corrosion", s: "et relargage d'ions", k: "fort" }, { id: "b", t: "Hypersensibilité", s: "Ni, puis Cr, puis Co ; 10 à 15 %", k: "doux" }, { id: "c", t: "Usure et débris", k: "doux" }, { id: "d", t: "Corrosion galvanique", s: "deux métaux en contact", k: "doux" }, { id: "e", t: "Propriétés mécaniques à adapter", s: "trop rigide pour l'os", k: "doux" }]],
    liens: [["m", "a"], ["m", "b"], ["m", "c"], ["m", "d"], ["m", "e"]], vgap: 14 },

  "sc-inox": { titre: "Des aciers inoxydables de plus en plus résistants en milieu salé",
    cols: [[{ id: "a", t: "Inox au vanadium", s: "abandonné : corrosion in vivo", k: "neutre" }],
           [{ id: "b", t: "18-8 (302)", s: "18 % Cr, 8 % Ni" }],
           [{ id: "c", t: "316", s: "+ molybdène", k: "doux" }],
           [{ id: "d", t: "316L", s: "1950 : C ≤ 0,03 %", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  "sc-cocr": { titre: "Deux alliages cobalt-chrome fréquents",
    cols: [[{ id: "c", t: "Alliages Co-Cr", s: "Co > 60 %, Cr : oxyde, Mo : grains fins" }],
           [{ id: "a", t: "Co-Cr-Mo coulé (F75)", k: "doux" }, { id: "b", t: "Co-Ni-Cr-Mo forgé à chaud (F562)", k: "doux" }],
           [{ id: "a2", t: "Dentaire, implants articulaires", k: "fort" }, { id: "b2", t: "Tiges très chargées", s: "genou, hanche : fatigue", k: "fort" }]],
    liens: [["c", "a"], ["c", "b"], ["a", "a2"], ["b", "b2"]] },

  "sc-titane": { titre: "Le titane et ses alliages",
    cols: [[{ id: "t", t: "Titane", s: "E 100 à 110 GPa, TiO₂, ostéo-intégration" }],
           [{ id: "a", t: "TA6V (TiAl6V4)", s: "le plus utilisé ; vanadium toxique", k: "fort" }, { id: "b", t: "Ti-6Al-7Nb", s: "meilleure corrosion", k: "doux" }, { id: "c", t: "Ti-5Al-2,5Fe", s: "électrodes de pacemaker", k: "doux" }, { id: "d", t: "Ti-13Nb-13Zr", s: "module plus faible", k: "doux" }, { id: "e", t: "Ti-15Mo-3Nb", s: "sans Al ni V", k: "doux" }]],
    liens: [["t", "a"], ["t", "b"], ["t", "c"], ["t", "d"], ["t", "e"]], vgap: 14 },

  "sc-niti": { titre: "L'effet mémoire de forme simple sens",
    cols: [[{ id: "a", t: "Martensite", s: "à froid" }],
           [{ id: "b", t: "On la déforme", s: "la déformation reste" }],
           [{ id: "c", t: "On chauffe au-dessus de Af", s: "austénite : la forme revient", k: "fort" }],
           [{ id: "d", t: "On refroidit", s: "martensite, même forme", k: "doux" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  "sc-niti-effets": { titre: "Les trois comportements du NiTi",
    cols: [[{ id: "n", t: "NiTi", s: "≈ 50 % Ni, 50 % Ti" }],
           [{ id: "a", t: "Simple sens", k: "doux" }, { id: "b", t: "Double sens", k: "doux" }, { id: "c", t: "Superélastique", k: "doux" }],
           [{ id: "a2", t: "Chauffé au-dessus de Af, reprend sa forme", s: "agrafes", k: "fort" }, { id: "b2", t: "Change de forme au chauffage et au refroidissement", k: "fort" }, { id: "c2", t: "Revient au relâchement, à température constante", s: "monture de lunettes, stents", k: "fort" }]],
    liens: [["n", "a"], ["n", "b"], ["n", "c"], ["a", "a2"], ["b", "b2"], ["c", "c2"]] },

  "sc-surfaces": { titre: "Traiter la surface d'un implant métallique",
    cols: [[{ id: "s", t: "Surface", s: "c'est elle que le corps touche" }],
           [{ id: "a", t: "Finition mécanique", k: "doux" }, { id: "b", t: "Finition chimique", k: "doux" }, { id: "c", t: "Finition physique", k: "doux" }, { id: "d", t: "Revêtement physique", k: "doux" }, { id: "e", t: "Enrobage chimique", k: "doux" }],
           [{ id: "a2", t: "Polissage, meulage, sablage" }, { id: "b2", t: "Alcalin, acide, oxydation anodique" }, { id: "c2", t: "Dépôt en phase vapeur, implantation d'ions" }, { id: "d2", t: "Flamme, projection plasma" }, { id: "e2", t: "Silanisation : molécules bioactives" }]],
    liens: [["s", "a"], ["s", "b"], ["s", "c"], ["s", "d"], ["s", "e"], ["a", "a2"], ["b", "b2"], ["c", "c2"], ["d", "d2"], ["e", "e2"]], vgap: 12 },

  "sc-allotropes": { titre: "Les formes du carbone",
    cols: [[{ id: "c", t: "Carbone" }],
           [{ id: "a", t: "Cristallin", k: "doux" }, { id: "b", t: "Non cristallin", k: "doux" }, { id: "q", t: "Quasi cristallin", k: "doux" }],
           [{ id: "a2", t: "Diamant, graphite" }, { id: "b2", t: "Carbone vitreux" }, { id: "q2", t: "Carbone pyrolytique", s: "valves cardiaques, revêtements", k: "fort" }]],
    liens: [["c", "a"], ["c", "b"], ["c", "q"], ["a", "a2"], ["b", "b2"], ["q", "q2"]] },

  "sc-zircone": { titre: "Les trois structures de la zircone",
    cols: [[{ id: "z", t: "Zircone ZrO₂", s: "issue du zircon ZrSiO₄" }],
           [{ id: "a", t: "Cubique", s: "propriétés modestes", k: "neutre" }, { id: "b", t: "Tétragonale", s: "propriétés satisfaisantes ; Y-TZP", k: "fort" }, { id: "c", t: "Monoclinique", s: "plus dense, plus de cohésion", k: "doux" }]],
    liens: [["z", "a"], ["z", "b"], ["z", "c"]] },

  "sc-masse-mol": { titre: "Longueur des chaînes et rupture",
    cols: [[{ id: "m", t: "Masse moléculaire" }],
           [{ id: "a", t: "Chaînes courtes", s: "paraffine", k: "neutre" }, { id: "b", t: "Chaînes longues", s: "enchevêtrées", k: "doux" }],
           [{ id: "a2", t: "La rupture passe entre les chaînes", s: "liaisons faibles : peu tenace" }, { id: "b2", t: "La rupture casse des chaînes", s: "liaisons covalentes : tenace", k: "fort" }]],
    liens: [["m", "a"], ["m", "b"], ["a", "a2"], ["b", "b2"]] },

  "sc-etats": { titre: "Un polymère amorphe qu'on chauffe",
    cols: [[{ id: "a", t: "Vitreux", s: "≈ 10⁹ Pa, chaînes figées" }],
           [{ id: "b", t: "Transition vitreuse", s: "autour de Tg", k: "doux" }],
           [{ id: "c", t: "Plateau caoutchouteux", s: "≈ 10⁶ Pa, enchevêtrement", k: "doux" }],
           [{ id: "d", t: "Transition caoutchouc-liquide", s: "désenchevêtrement" }],
           [{ id: "e", t: "Liquide", s: "il s'écoule", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]] },

  "sc-histoire-polymeres": { titre: "Les grandes dates des polymères",
    cols: [[{ id: "a", t: "1869", s: "celluloïd (Hyatt)" }],
           [{ id: "b", t: "1907", s: "Bakélite : 1er thermodurcissable synthétique" }],
           [{ id: "c", t: "1935", s: "nylon (Carothers)", k: "doux" }],
           [{ id: "d", t: "1953", s: "HDPE (Ziegler), Corvette, Nobel de Staudinger", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  "sc-viscoelasticite": { titre: "Un polymère : ressort et amortisseur",
    cols: [[{ id: "p", t: "Polymère", s: "viscoélastique" }],
           [{ id: "r", t: "Ressort (Hooke)", s: "σ = E ε : revient tout de suite", k: "doux" }, { id: "a", t: "Amortisseur (Newton)", s: "σ = η dε/dt : avance avec le temps", k: "doux" }],
           [{ id: "r2", t: "Domine à basse température ou en sollicitation rapide", k: "fort" }, { id: "a2", t: "Domine à haute température ou en sollicitation lente", k: "fort" }]],
    liens: [["p", "r"], ["p", "a"], ["r", "r2"], ["a", "a2"]] },

  "sc-naturels": { titre: "Les biomatériaux d'origine naturelle",
    cols: [[{ id: "n", t: "Matériaux naturels", s: "biocompatibles par nature" }],
           [{ id: "a", t: "Collagène", s: "peau animale, placenta", k: "fort" }, { id: "b", t: "Chitine", s: "carapace de crabe", k: "doux" }, { id: "c", t: "Fucanes", s: "algues", k: "doux" }, { id: "d", t: "Cellulose", s: "végétale", k: "doux" }, { id: "e", t: "Corail", k: "doux" }],
           [{ id: "a2", t: "Hémostatique, pansements, peau artificielle" }, { id: "b2", t: "Sutures, peau artificielle" }, { id: "c2", t: "Anticoagulants" }, { id: "d2", t: "Membranes de dialyse" }, { id: "e2", t: "Os recolonisable" }]],
    liens: [["n", "a"], ["n", "b"], ["n", "c"], ["n", "d"], ["n", "e"], ["a", "a2"], ["b", "b2"], ["c", "c2"], ["d", "d2"], ["e", "e2"]], vgap: 12 },

  "sc-formulation": { titre: "La recette d'un caoutchouc",
    cols: [[{ id: "a", t: "Élastomère" }, { id: "b", t: "Charges", s: "noir de carbone" }, { id: "c", t: "Plastifiants" }, { id: "d", t: "Accélérateurs", s: "de vulcanisation" }, { id: "e", t: "Additifs", s: "O₂, ozone, chaleur, UV" }],
           [{ id: "f", t: "Caoutchouc formulé", s: "pour une application définie", k: "fort" }]],
    liens: [["a", "f"], ["b", "f"], ["c", "f"], ["d", "f"], ["e", "f"]], vgap: 12 },

  "sc-adjuvants": { titre: "Les adjuvants : chacun corrige un défaut",
    cols: [[{ id: "a", t: "Adjuvants", s: "souvent à petite dose" }],
           [{ id: "m", t: "Pour la mise en œuvre", k: "doux" }, { id: "x", t: "Pour l'aspect", k: "doux" }, { id: "u", t: "Pour l'usage", k: "doux" }, { id: "r", t: "Pour les résines", k: "doux" }],
           [{ id: "m2", t: "Stabilisants, lubrifiants (0,1 %), agents de germination" }, { id: "x2", t: "Colorants (transparents), pigments (opaques)" }, { id: "u2", t: "Anti-chocs, antistatiques, ignifugeants (> 10 %)" }, { id: "r2", t: "Anti-retrait (PVAC), agents de réticulation" }]],
    liens: [["a", "m"], ["a", "x"], ["a", "u"], ["a", "r"], ["m", "m2"], ["x", "x2"], ["u", "u2"], ["r", "r2"]] },

  "sc-renforts": { titre: "Les principaux renforts",
    cols: [[{ id: "r", t: "Renforts" }],
           [{ id: "v", t: "Verre", s: "isolant, bon marché", k: "doux" }, { id: "c", t: "Carbone", k: "doux" }, { id: "k", t: "Aramide (Kevlar)", k: "doux" }, { id: "m", t: "Minéraux", k: "doux" }],
           [{ id: "v2", t: "Types E, D, C, S/R", s: "billes, fibres, roving, mat, tissu" }, { id: "c2", t: "Fibres, noir de carbone, graphite", s: "fibres : rigides comme l'acier, 4 fois plus légères" }, { id: "k2", t: "180 °C, densité 1,49", s: "fort en traction, faible en compression" }, { id: "m2", t: "Mica (lamellaire), wollastonite (aciculaire)" }]],
    liens: [["r", "v"], ["r", "c"], ["r", "k"], ["r", "m"], ["v", "v2"], ["c", "c2"], ["k", "k2"], ["m", "m2"]] },

  "sc-composites-familles": { titre: "Un composite : un renfort et une matrice",
    cols: [[{ id: "c", t: "Composite", s: "insolubles l'un dans l'autre" }],
           [{ id: "r", t: "Renfort", s: "porte la charge", k: "doux" }, { id: "m", t: "Matrice", s: "tient et protège les fibres", k: "doux" }],
           [{ id: "r1", t: "Organique", s: "polyesters, aramides" }, { id: "r2", t: "Minéral", s: "verre, carbone, bore, métal" }, { id: "r3", t: "Végétal", s: "bois, coton, jute" }, { id: "m1", t: "Organique", s: "thermodurcissable, thermoplastique, élastomère" }, { id: "m2", t: "Minérale", s: "céramique, métal" }]],
    liens: [["c", "r"], ["c", "m"], ["r", "r1"], ["r", "r2"], ["r", "r3"], ["m", "m1"], ["m", "m2"]], vgap: 14 },

  "sc-gd-hp": { titre: "Grande diffusion ou hautes performances",
    cols: [[{ id: "c", t: "Composites" }],
           [{ id: "g", t: "Grande diffusion (GD)", s: "95 % ; polyester-verre", k: "doux" }, { id: "h", t: "Hautes performances (HP)", s: "verre, carbone, aramide", k: "doux" }],
           [{ id: "g2", t: "Grande série, propriétés plus faibles", s: "bateaux, cannes à pêche", k: "fort" }, { id: "h2", t: "Propriétés spécifiques élevées, coût élevé", s: "aéronautique, spatial", k: "fort" }]],
    liens: [["c", "g"], ["c", "h"], ["g", "g2"], ["h", "h2"]] },

  "sc-constantes": { titre: "Combien de constantes élastiques ?",
    cols: [[{ id: "a", t: "Isotrope", s: "métaux, céramiques, polymères" }, { id: "b", t: "Monocouche orthotrope", s: "directions 1, 2, 3" }, { id: "c", t: "Plaque mince", s: "directions 1, 2" }],
           [{ id: "a2", t: "2 constantes", s: "G = E / (2 (1 + ν))", k: "doux" }, { id: "b2", t: "9 constantes", k: "doux" }, { id: "c2", t: "4 constantes", s: "E_L, E_T, G_LT, ν_LT", k: "fort" }]],
    liens: [["a", "a2"], ["b", "b2"], ["c", "c2"]] },

  "sc-familles-procedes": { titre: "Les procédés du cours, par famille",
    cols: [[{ id: "p", t: "Mise en forme des plastiques" }],
           [{ id: "i", t: "Famille injection", k: "doux" }, { id: "e", t: "Famille extrusion", k: "doux" }, { id: "a", t: "Autres procédés", k: "doux" }],
           [{ id: "i2", t: "Injection, injection-soufflage" }, { id: "e2", t: "Extrusion, extrusion-soufflage, extrusion-gonflage" }, { id: "a2", t: "Rotomoulage, thermoformage, compression, compression-transfert, centrifugation" }]],
    liens: [["p", "i"], ["p", "e"], ["p", "a"], ["i", "i2"], ["e", "e2"], ["a", "a2"]] },

  "sc-soufflage": { titre: "Deux façons de faire l'ébauche",
    cols: [[{ id: "s", t: "Soufflage", s: "ébauche chaude + moule + air comprimé" }],
           [{ id: "a", t: "Injection-soufflage", s: "préforme injectée, canne d'étirage", k: "doux" }, { id: "b", t: "Extrusion-soufflage", s: "tube extrudé pincé par le moule", k: "doux" }],
           [{ id: "a2", t: "Point d'injection au fond", k: "fort" }, { id: "b2", t: "Ligne de soudure au fond", k: "fort" }]],
    liens: [["s", "a"], ["s", "b"], ["a", "a2"], ["b", "b2"]] },

  /* ---------- L'arbre du module : parties et chapitres (chaque chapitre ouvre sa page) ---------- */
  "sc-structure": { titre: "Le module en un coup d'œil : touche un chapitre pour l'ouvrir",
    cols: [[{ id: "m", t: "Biomatériaux et biocompatibilité", k: "fort" }],
           [{ id: "p0", t: "Le biomatériau", s: "définir, exiger, situer", k: "doux" },
            { id: "p1", t: "Comparer des matériaux", s: "mécanique, liaisons", k: "doux" },
            { id: "p2", t: "Matériaux d'implant", s: "quel matériau pour quelle pièce", k: "doux" },
            { id: "p3", t: "Travailler les polymères", s: "modifier, renforcer, mouler", k: "doux" },
            { id: "p4", t: "Les TD", k: "doux" }],
           [{ id: "c1", t: "1. Biomatériaux et DM", s: "définitions, classes, vocabulaire", href: "chapitres/chapitre-1.html" },
            { id: "c8", t: "2. Histoire et exigences", s: "Chester, biocompatibilité", href: "chapitres/chapitre-8.html" },
            { id: "c0", t: "3. Bases de mécanique", s: "σ, ε, E, ρ", href: "chapitres/chapitre-0.html" },
            { id: "c2", t: "4. Familles de matériaux", s: "liaisons, métaux, céramiques, polymères", href: "chapitres/chapitre-2.html" },
            { id: "c9", t: "5. Métaux d'implant", s: "316L, cobalt-chrome, titane, NiTi", href: "chapitres/chapitre-9.html" },
            { id: "c10", t: "6. Biocéramiques", s: "alumine, zircone, hydroxyapatite", href: "chapitres/chapitre-10.html" },
            { id: "c3", t: "7. Structure des polymères", s: "Tg, Tf, cristallinité", href: "chapitres/chapitre-3.html" },
            { id: "c11", t: "8. Polymères biomédicaux", s: "viscoélasticité, UHMWPE, PEEK", href: "chapitres/chapitre-11.html" },
            { id: "c4", t: "9. Élastomères", s: "vulcanisation", href: "chapitres/chapitre-4.html" },
            { id: "c5", t: "10. Additifs et renforts", s: "plastifiants, charges, fibres", href: "chapitres/chapitre-5.html" },
            { id: "c6", t: "11. Composites", s: "loi des mélanges", href: "chapitres/chapitre-6.html" },
            { id: "c7", t: "12. Procédés", s: "extrusion, injection, moulage", href: "chapitres/chapitre-7.html" },
            { id: "c12", t: "TD 1", s: "Tg, Tf, cristallinité, PVC", href: "chapitres/chapitre-12.html" }]],
    liens: [["m", "p0"], ["m", "p1"], ["m", "p2"], ["m", "p3"], ["m", "p4"],
            ["p0", "c1"], ["p0", "c8"], ["p1", "c0"], ["p1", "c2"], ["p2", "c9"], ["p2", "c10"], ["p2", "c3"], ["p2", "c11"],
            ["p3", "c4"], ["p3", "c5"], ["p3", "c6"], ["p3", "c7"], ["p4", "c12"]], vgap: 10, gap: 70 },
};
