/*
 * Schémas du module Robotique (dessinés par commun/js/schema.js) : une entrée par <div class="schema" id="sc-...">.
 * Servent aux pages de cours (donc aux pages de chapitre) et à la page « L'essentiel en schémas ».
 */
window.SCHEMAS = {
  /* ---------- Le robot et sa description ---------- */
  "sc-boucle": { titre: "Le fonctionnement d'un robot : une boucle",
    cols: [[{ id: "a", t: "Percevoir", s: "capteurs" }],
           [{ id: "b", t: "Traiter", s: "commande : ordinateur, API", k: "doux" }],
           [{ id: "c", t: "Décider", s: "plan d'action", k: "doux" }],
           [{ id: "d", t: "Agir", s: "actionneurs", k: "fort" }],
           [{ id: "e", t: "Environnement", s: "modifié, il renvoie de nouvelles informations" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]] },

  "sc-systeme": { titre: "Le système robotisé : quatre sous-systèmes",
    cols: [[{ id: "s", t: "Système robotisé", s: "cellule complète" }],
           [{ id: "i", t: "Chaîne d'information", k: "doux" }, { id: "e", t: "Chaîne d'énergie", k: "doux" }, { id: "a", t: "Chaîne d'action", k: "doux" }, { id: "x", t: "Sécurité", k: "fort" }],
           [{ id: "i2", t: "Capteurs, vision, contrôleur, API, IHM" }, { id: "e2", t: "Alimentation, variateurs, moteurs" }, { id: "a2", t: "Actionneurs, transmissions, manipulateur, effecteur" }, { id: "x2", t: "Arrêt d'urgence, barrière immatérielle, scanner laser" }]],
    liens: [["s", "i"], ["s", "e"], ["s", "a"], ["s", "x"], ["i", "i2"], ["e", "e2"], ["a", "a2"], ["x", "x2"]] },

  "sc-classement": { titre: "Classer un robot : cinq critères",
    cols: [[{ id: "r", t: "Un robot" }],
           [{ id: "m", t: "Mobilité", k: "doux" }, { id: "a", t: "Architecture", k: "doux" }, { id: "h", t: "Interaction avec l'humain", k: "doux" }, { id: "n", t: "Autonomie", k: "doux" }, { id: "d", t: "Domaine", k: "doux" }],
           [{ id: "m2", t: "Fixe, mobile, hybride" }, { id: "a2", t: "Sériel, parallèle, hybride" }, { id: "h2", t: "Industriel, cobot, de service" }, { id: "n2", t: "Téléopéré, programmé, adaptatif, autonome" }, { id: "d2", t: "Industriel, service, médical, militaire, spatial" }]],
    liens: [["r", "m"], ["r", "a"], ["r", "h"], ["r", "n"], ["r", "d"], ["m", "m2"], ["a", "a2"], ["h", "h2"], ["n", "n2"], ["d", "d2"]], vgap: 12 },

  "sc-articulations": { titre: "Deux types d'articulations",
    cols: [[{ id: "a", t: "Articulation", s: "relie deux segments" }],
           [{ id: "r", t: "Rotoïde (R)", s: "rotation autour d'un axe ; variable θᵢ", k: "fort" }, { id: "p", t: "Prismatique (P)", s: "translation le long d'un axe ; variable dᵢ", k: "fort" }],
           [{ id: "r2", t: "Robot articulé RRRRRR", s: "rotations successives" }, { id: "p2", t: "Robot cartésien PPP", s: "translations X, Y, Z" }]],
    liens: [["a", "r"], ["a", "p"], ["r", "r2"], ["p", "p2"]] },

  "sc-configurations": { titre: "Des articulations à l'outil",
    cols: [[{ id: "q", t: "Configuration articulaire", s: "q = [q₁, …, qₙ]ᵀ\nla posture des segments" }],
           [{ id: "m", t: "Modèle géométrique direct", s: "p = f(q)", k: "doux" }],
           [{ id: "x", t: "Configuration opérationnelle", s: "X = [x, y, z, α, β, γ]ᵀ\nla pose de l'outil (6 DDL au plus)", k: "fort" }]],
    liens: [["q", "m"], ["m", "x"]] },

  "sc-liaisons": { titre: "Les liaisons normalisées, par nombre de mobilités",
    cols: [[{ id: "l", t: "Liaison", s: "mobilité + liaison = 6" }],
           [{ id: "a", t: "0 mobilité", k: "neutre" }, { id: "b", t: "1 mobilité", k: "fort" }, { id: "c", t: "2 mobilités", k: "doux" }, { id: "d", t: "3 mobilités", k: "doux" }, { id: "e", t: "4 mobilités", k: "doux" }, { id: "f", t: "5 mobilités", k: "doux" }],
           [{ id: "a2", t: "Encastrement" }, { id: "b2", t: "Pivot, glissière, hélicoïdale", s: "95 % des robots : pivot et glissière" }, { id: "c2", t: "Pivot glissant" }, { id: "d2", t: "Plane, rotule" }, { id: "e2", t: "Linéaire annulaire" }, { id: "f2", t: "Ponctuelle" }]],
    liens: [["l", "a"], ["l", "b"], ["l", "c"], ["l", "d"], ["l", "e"], ["l", "f"], ["a", "a2"], ["b", "b2"], ["c", "c2"], ["d", "d2"], ["e", "e2"], ["f", "f2"]], vgap: 10 },

  "sc-topologies": { titre: "Les topologies d'architecture",
    cols: [[{ id: "t", t: "Graphe du robot" }],
           [{ id: "s", t: "Série (chaîne ouverte)", k: "doux" }, { id: "p", t: "Parallèle (chaîne fermée)", k: "doux" }, { id: "a", t: "Arborescente", k: "doux" }, { id: "h", t: "Hybride", k: "doux" }],
           [{ id: "s2", t: "Pas de boucle, extrémité libre", s: "bras 6R, ROSA ONE Brain" }, { id: "p2", t: "Au moins une boucle", s: "Delta, Stewart, SurgiScope" }, { id: "a2", t: "Embranchements, pas de boucle", s: "humanoïde" }, { id: "h2", t: "Série + parallèle", s: "plateforme portant un bras" }]],
    liens: [["t", "s"], ["t", "p"], ["t", "a"], ["t", "h"], ["s", "s2"], ["p", "p2"], ["a", "a2"], ["h", "h2"]] },

  "sc-architectures": { titre: "Robots sériels : architecture et espace de travail",
    cols: [[{ id: "s", t: "Robot sériel" }],
           [{ id: "c", t: "Cartésien PPP", k: "doux" }, { id: "y", t: "Cylindrique", k: "doux" }, { id: "p", t: "Sphérique (polaire)", k: "doux" }, { id: "k", t: "SCARA", s: "RRRP", k: "doux" }, { id: "a", t: "Articulé (anthropomorphe)", k: "doux" }],
           [{ id: "c2", t: "Parallélépipède", k: "fort" }, { id: "y2", t: "Cylindre", k: "fort" }, { id: "p2", t: "Sphère", k: "fort" }, { id: "k2", t: "Anneau extrudé", k: "fort" }, { id: "a2", t: "Forme complexe", k: "fort" }]],
    liens: [["s", "c"], ["s", "y"], ["s", "p"], ["s", "k"], ["s", "a"], ["c", "c2"], ["y", "y2"], ["p", "p2"], ["k", "k2"], ["a", "a2"]], vgap: 12 },

  "sc-serie-parallele": { titre: "Sériel ou parallèle ?",
    cols: [[{ id: "c", t: "Choisir selon la tâche", s: "précision, charge, vitesse, espace, coût" }],
           [{ id: "s", t: "Sériel", k: "doux" }, { id: "p", t: "Parallèle", k: "doux" }],
           [{ id: "s2", t: "Grande enveloppe, dextérité, polyvalence, coût plus bas", k: "fort" }, { id: "p2", t: "Précision, rigidité, vitesse, charge, peu d'inertie mobile", k: "fort" }]],
    liens: [["c", "s"], ["c", "p"], ["s", "s2"], ["p", "p2"]] },

  "sc-cycle": { titre: "Le temps de cycle, étape par étape",
    cols: [[{ id: "a", t: "Approche" }], [{ id: "b", t: "Prise", k: "neutre" }], [{ id: "c", t: "Transfert" }], [{ id: "d", t: "Dépose", k: "neutre" }], [{ id: "e", t: "Retour" }], [{ id: "f", t: "Synchro", k: "neutre", note: "cadence : 3600 / T_cycle" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"], ["e", "f"]] },

  "sc-precision": { titre: "Précision et répétabilité : les quatre cas",
    cols: [[{ id: "a", t: "A", s: "précision bonne, répétabilité bonne", k: "fort" }, { id: "b", t: "B", s: "précision faible, répétabilité bonne", k: "doux" }, { id: "c", t: "C", s: "précision moyenne, répétabilité faible", k: "doux" }, { id: "d", t: "D", s: "précision faible, répétabilité faible", k: "neutre" }],
           [{ id: "a2", t: "Toutes les pièces près de P" }, { id: "b2", t: "Regroupées mais décalées de P", s: "écart constant : on le compense" }, { id: "c2", t: "Dispersées autour de P" }, { id: "d2", t: "Loin de P et dispersées" }]],
    liens: [["a", "a2"], ["b", "b2"], ["c", "c2"], ["d", "d2"]] },

  "sc-ruptures": { titre: "Du robot industriel au robot médical : six ruptures",
    cols: [[{ id: "a", t: "Pièce standard → patient variable" }, { id: "b", t: "Zone d'exclusion → contact direct" }, { id: "c", t: "Précision géométrique → biomécanique" }, { id: "d", t: "Reprogrammation → décision assistée" }, { id: "e", t: "Fiabilité économique → vitale" }, { id: "f", t: "Environnement contrôlé → contraint" }],
           [{ id: "a2", t: "Perception adaptative", s: "imagerie, recalage, suivi", k: "fort" }, { id: "b2", t: "Sécurité intrinsèque", s: "forces limitées, collisions", k: "fort" }, { id: "c2", t: "Repère anatomique", s: "imagerie, asservissement visuel", k: "fort" }, { id: "d2", t: "Le praticien supervise", k: "fort" }, { id: "e2", t: "Normes, essais cliniques, classe III", k: "fort" }, { id: "f2", t: "Stérilisation, IRM, biocompatibilité", k: "fort" }]],
    liens: [["a", "a2"], ["b", "b2"], ["c", "c2"], ["d", "d2"], ["e", "e2"], ["f", "f2"]], vgap: 10 },

  "sc-ihm": { titre: "Les interfaces homme-machine médicales",
    cols: [[{ id: "i", t: "IHM médicale", s: "le praticien reste dans la boucle" }],
           [{ id: "a", t: "Téléopération", k: "doux" }, { id: "b", t: "Co-manipulation", k: "doux" }, { id: "c", t: "Haptique", k: "doux" }, { id: "d", t: "Multimodale", k: "doux" }, { id: "e", t: "Immersive", k: "doux" }, { id: "f", t: "Cerveau-machine", k: "doux" }],
           [{ id: "a2", t: "da Vinci" }, { id: "b2", t: "Mako" }, { id: "c2", t: "Simulateur à retour d'effort" }, { id: "d2", t: "Commande vocale ou gestuelle" }, { id: "e2", t: "RV pour planifier, RA pour guider" }, { id: "f2", t: "BrainGate" }]],
    liens: [["i", "a"], ["i", "b"], ["i", "c"], ["i", "d"], ["i", "e"], ["i", "f"], ["a", "a2"], ["b", "b2"], ["c", "c2"], ["d", "d2"], ["e", "e2"], ["f", "f2"]], vgap: 10 },

  /* ---------- Les bases ---------- */
  "sc-polaire": { titre: "Deux langages pour un même point",
    cols: [[{ id: "a", t: "Longueur et angle", s: "(L, θ) : ce que connaît le bras" }, { id: "b", t: "Coordonnées", s: "(x, y) : ce que donne la tâche" }],
           [{ id: "a2", t: "x = L cos θ, y = L sin θ", k: "fort" }, { id: "b2", t: "L = √(x² + y²), tan θ = y / x", k: "fort" }]],
    liens: [["a", "a2"], ["b", "b2"]] },

  "sc-lecture-matrice": { titre: "Deux façons de lire un produit matrice-vecteur",
    cols: [[{ id: "m", t: "M V" }],
           [{ id: "l", t: "Ligne par ligne", k: "doux" }, { id: "c", t: "Colonne par colonne", k: "doux" }],
           [{ id: "l2", t: "Chaque case = une ligne fois le vecteur", s: "(MV)ᵢ = Σ mᵢⱼ vⱼ" }, { id: "c2", t: "Un mélange des colonnes", s: "colonnes d'une rotation = axes du repère tourné", k: "fort" }]],
    liens: [["m", "l"], ["m", "c"], ["l", "l2"], ["c", "c2"]] },

  /* ---------- Repères et vecteurs ---------- */
  "sc-reperes": { titre: "Les repères d'une salle d'opération",
    cols: [[{ id: "s", t: "Salle d'opération", s: "il faut relier les repères" }],
           [{ id: "m", t: "Repère monde {M}", s: "la salle" }, { id: "r", t: "Repère robot {R}", s: "la base du bras", k: "doux" }, { id: "t", t: "Repère outil {T}", s: "la pointe de l'instrument", k: "doux" }, { id: "p", t: "Repère patient {P}", s: "anatomie, marqueurs, imagerie", k: "fort" }]],
    liens: [["s", "m"], ["s", "r"], ["s", "t"], ["s", "p"]] },

  "sc-produits": { titre: "Produit scalaire ou produit vectoriel",
    cols: [[{ id: "v", t: "Deux vecteurs a et b" }],
           [{ id: "s", t: "Produit scalaire a · b", k: "doux" }, { id: "w", t: "Produit vectoriel a ∧ b", k: "doux" }],
           [{ id: "s2", t: "Un nombre : ‖a‖ ‖b‖ cos θ", s: "nul si perpendiculaires ; donne les projections", k: "fort" }, { id: "w2", t: "Un vecteur perpendiculaire : norme ‖a‖ ‖b‖ sin θ", s: "nul si parallèles ; sens : main droite", k: "fort" }]],
    liens: [["v", "s"], ["v", "w"], ["s", "s2"], ["w", "w2"]] },

  "sc-coordonnees": { titre: "Repérer un point",
    cols: [[{ id: "p", t: "Un point P" }],
           [{ id: "c", t: "Cartésiennes", s: "(x, y, z)", k: "doux" }, { id: "o", t: "Polaires", s: "(r, θ) dans le plan", k: "doux" }, { id: "y", t: "Cylindriques", s: "(r, θ, z)", k: "doux" }],
           [{ id: "c2", t: "Robot cartésien PPP", s: "x = q₁, y = q₂, z = q₃" }, { id: "o2", t: "x = r cos θ, y = r sin θ" }, { id: "y2", t: "r = √(x² + y²), θ = atan2(y, x)", s: "atan2 : le bon quadrant", k: "fort" }]],
    liens: [["p", "c"], ["p", "o"], ["p", "y"], ["c", "c2"], ["o", "o2"], ["y", "y2"]] },

  "sc-chasles": { titre: "Relation de Chasles : passer par l'origine du solide",
    cols: [[{ id: "a", t: "O₀", s: "origine fixe" }],
           [{ id: "b", t: "Oₛ", s: "origine du repère du solide : la position p", k: "doux" }],
           [{ id: "c", t: "M", s: "point du solide", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"]] },

  /* ---------- Orientations ---------- */
  "sc-so3": { titre: "Ce qui fait une matrice de rotation",
    cols: [[{ id: "r", t: "Matrice de rotation R", s: "colonnes = axes du repère tourné" }],
           [{ id: "a", t: "Rᵀ R = I", s: "colonnes orthonormées", k: "doux" }, { id: "b", t: "R⁻¹ = Rᵀ", s: "inverser = transposer", k: "fort" }, { id: "c", t: "det R = +1", s: "pas de miroir", k: "doux" }],
           [{ id: "p", t: "3 paramètres indépendants", s: "9 coefficients − 6 contraintes" }]],
    liens: [["r", "a"], ["r", "b"], ["r", "c"], ["a", "p"], ["b", "p"], ["c", "p"]] },

  "sc-elementaires": { titre: "Les trois rotations élémentaires",
    cols: [[{ id: "r", t: "Rotation autour d'un axe" }],
           [{ id: "z", t: "Rz(α) : lacet", s: "z conservé", k: "doux" }, { id: "y", t: "Ry(β) : tangage", s: "y conservé", k: "doux" }, { id: "x", t: "Rx(γ) : roulis", s: "x conservé", k: "doux" }],
           [{ id: "z2", t: "Le plan x → y tourne" }, { id: "y2", t: "Le plan z → x tourne", s: "d'où le −sin β en bas à gauche", k: "fort" }, { id: "x2", t: "Le plan y → z tourne" }]],
    liens: [["r", "z"], ["r", "y"], ["r", "x"], ["z", "z2"], ["y", "y2"], ["x", "x2"]] },

  "sc-euler": { titre: "Angles d'Euler ZYX, en axes mobiles",
    cols: [[{ id: "a", t: "R₀", s: "repère fixe\nR = Rz(α) Ry(β) Rx(γ)" }],
           [{ id: "b", t: "R₁", s: "lacet α autour de z₀", k: "doux" }],
           [{ id: "c", t: "R₂", s: "tangage β autour de y₁", k: "doux", note: "singularité si β = ±90°" }],
           [{ id: "d", t: "Rₛ", s: "roulis γ autour de x₂", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  /* ---------- Transformations ---------- */
  "sc-changement": { titre: "Placer un point du solide dans le repère fixe (1.3)",
    cols: [[{ id: "a", t: "OₛMˢ", s: "connu dans le repère du solide" }],
           [{ id: "b", t: "× R^(0,s)", s: "on le traduit dans R₀", k: "doux" }],
           [{ id: "c", t: "+ O₀Oₛ⁰", s: "on ajoute la position de l'origine", k: "doux" }],
           [{ id: "d", t: "O₀M⁰", s: "le point dans R₀", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  "sc-homogene": { titre: "La matrice homogène 4 × 4",
    cols: [[{ id: "t", t: "T^(0,s)", s: "position et orientation ensemble" }],
           [{ id: "r", t: "Bloc R (3 × 3)", s: "colonnes : xₛ, yₛ, zₛ dans R₀", k: "doux" }, { id: "p", t: "Colonne P (3 × 1)", s: "position de l'origine Oₛ", k: "doux" }, { id: "l", t: "Dernière ligne", s: "0 0 0 1" }],
           [{ id: "u", t: "On applique T à (point ; 1)", s: "avec (direction ; 0), la translation est ignorée", k: "fort" }]],
    liens: [["t", "r"], ["t", "p"], ["t", "l"], ["r", "u"], ["p", "u"], ["l", "u"]] },

  "sc-composition": { titre: "Composer de la base vers l'outil : les indices s'enchaînent",
    cols: [[{ id: "a", t: "T^(0,1)", s: "segment 1 / base" }],
           [{ id: "b", t: "T^(1,2)", s: "segment 2 / segment 1" }],
           [{ id: "c", t: "…" , k: "neutre" }],
           [{ id: "d", t: "T^(n−1,n)" }],
           [{ id: "e", t: "T^(0,n)", s: "l'outil / la base", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]] },

  "sc-bras2r": { titre: "Le bras 2R, étape par étape",
    cols: [[{ id: "a", t: "T^(0,1)", s: "rotation θ₁ autour de z₀" }],
           [{ id: "b", t: "T^(1,2)", s: "rotation θ₂, translation l₁ sur x₁" }],
           [{ id: "c", t: "T^(0,2) = T^(0,1) T^(1,2)", s: "rotation θ₁ + θ₂", k: "doux" }],
           [{ id: "d", t: "Position de M", s: "x = l₁c₁ + l₂c₁₂\ny = l₁s₁ + l₂s₁₂", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  /* ---------- Modélisation (DH, MGD) ---------- */
  "sc-dh-regles": { titre: "Placer le repère j selon Denavit–Hartenberg",
    cols: [[{ id: "r", t: "Repère j", s: "segment j, entre les articulations j et j + 1" }],
           [{ id: "z", t: "Z_j", s: "l'axe de l'articulation j + 1", k: "fort" }, { id: "x", t: "X_j", s: "la normale commune, de Z_{j−1} vers Z_j", k: "fort" }, { id: "o", t: "O_j", s: "où la normale commune coupe Z_j", k: "doux" }]],
    liens: [["r", "z"], ["r", "x"], ["r", "o"]] },

  "sc-dh-param": { titre: "Les quatre mouvements de Denavit–Hartenberg, dans l'ordre",
    cols: [[{ id: "a", t: "Rot(z, θⱼ)", s: "tourner autour de Z_{j−1}", k: "doux" }],
           [{ id: "b", t: "Trans(z, rⱼ)", s: "monter le long de Z_{j−1}" }],
           [{ id: "c", t: "Trans(x, dⱼ)", s: "avancer le long de X_j" }],
           [{ id: "d", t: "Rot(x, αⱼ)", s: "incliner Z autour de X_j", k: "doux" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  "sc-mgd": { titre: "La méthode du modèle géométrique direct",
    cols: [[{ id: "a", t: "Tableau DH", s: "une ligne par articulation" }],
           [{ id: "b", t: "Matrices élémentaires", s: "valeurs remplacées" }],
           [{ id: "c", t: "Produit", s: "de la base vers l'outil", k: "doux" }],
           [{ id: "d", t: "Simplifier", s: "formules d'addition" }],
           [{ id: "e", t: "Lire", s: "position : 4e colonne\norientation : bloc R", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]] },

  "sc-modeles": { titre: "Les modèles d'un robot",
    cols: [[{ id: "r", t: "Modéliser un robot" }],
           [{ id: "g", t: "Géométrique", s: "positions, sans les forces", k: "doux" }, { id: "c", t: "Cinématique", s: "vitesses, sans les forces", k: "doux" }],
           [{ id: "d", t: "Direct : X = f(q)", s: "où est l'outil ?", k: "fort" }, { id: "i", t: "Inverse : q = f⁻¹(X)", s: "quels angles pour la cible ?", k: "fort" }, { id: "v", t: "Direct : V = J(q) q̇", s: "à quelle vitesse va l'outil ?", k: "fort" }]],
    liens: [["r", "g"], ["r", "c"], ["g", "d"], ["g", "i"], ["c", "v"]] },

  /* ---------- Modèle inverse ---------- */
  "sc-mgi": { titre: "Résoudre le modèle inverse",
    cols: [[{ id: "m", t: "MGI : q = f⁻¹(X)", s: "non linéaire ; 0, 1 ou plusieurs solutions" }],
           [{ id: "a", t: "Méthode analytique", k: "doux" }, { id: "n", t: "Méthode numérique", s: "Newton-Raphson", k: "doux" }],
           [{ id: "a2", t: "Exacte, rapide, toutes les solutions", s: "pas de méthode générale", k: "fort" }, { id: "n2", t: "Générale, facile à programmer", s: "une seule solution, convergence non garantie", k: "fort" }]],
    liens: [["m", "a"], ["m", "n"], ["a", "a2"], ["n", "n2"]] },

  "sc-mgi-2r": { titre: "Le MGI du bras 2R, étape par étape",
    cols: [[{ id: "a", t: "Accessible ?", s: "|L₁ − L₂| ≤ r ≤ L₁ + L₂" }],
           [{ id: "b", t: "θ₂", s: "Al-Kashi : cos θ₂ = (r² − L₁² − L₂²) / (2L₁L₂)", k: "doux" }],
           [{ id: "c", t: "α et β", s: "α = arctan(y/x), β par Al-Kashi" }],
           [{ id: "d", t: "θ₁", s: "coude bas : α − β\ncoude haut : α + β", k: "doux" }],
           [{ id: "e", t: "Vérifier", s: "avec le MGD", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]] },

  /* ---------- Mécanique : l'axe ---------- */
  "sc-axe": { titre: "La chaîne fonctionnelle d'un axe",
    cols: [[{ id: "a", t: "Actionneur", s: "crée le mouvement" }],
           [{ id: "b", t: "Réduction", s: "moins vite, plus de couple", k: "doux" }],
           [{ id: "c", t: "Transmission", s: "amène le mouvement" }],
           [{ id: "d", t: "Guidage", s: "autorise le mouvement utile", k: "doux" }],
           [{ id: "e", t: "Structure, outil", s: "porte la charge", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]] },

  "sc-symboles": { titre: "Une lettre, plusieurs sens : l'unité tranche",
    cols: [[{ id: "p", t: "P" }, { id: "c", t: "C" }, { id: "m", t: "m" }, { id: "x", t: "p" }],
           [{ id: "p2", t: "Puissance (W) ou charge d'un roulement (N)", k: "doux" }, { id: "c2", t: "Couple (N·m) ou capacité d'un roulement (N)", k: "doux" }, { id: "m2", t: "Module d'engrenage (mm) ou masse (kg)", k: "doux" }, { id: "x2", t: "Exposant de durée, pas de courroie, avance de vis", k: "doux" }]],
    liens: [["p", "p2"], ["c", "c2"], ["m", "m2"], ["x", "x2"]] },

  "sc-reducteur": { titre: "Le réducteur échange de la vitesse contre du couple",
    cols: [[{ id: "a", t: "Moteur", s: "vite, peu de couple\nω = 2π n / 60" }],
           [{ id: "b", t: "Réducteur", s: "rapport i = ωₑ / ωₛ, rendement η", k: "doux" }],
           [{ id: "c", t: "Sortie", s: "ωₛ = ωₑ / i\nCₛ ≈ η i Cₑ", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"]] },

  "sc-jeu": { titre: "Du petit angle à l'écart en bout d'outil",
    cols: [[{ id: "a", t: "Jeu ou torsion", s: "Δθ (θ = C / k_θ)" }],
           [{ id: "b", t: "En radians", s: "× π / 180", k: "neutre" }],
           [{ id: "c", t: "× la longueur L", s: "un arc de cercle", k: "doux" }],
           [{ id: "d", t: "Δx ≈ L Δθ", s: "0,20° sur 0,40 m : 1,4 mm", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  "sc-criteres-axe": { titre: "Les critères d'un axe en milieu de soin",
    cols: [[{ id: "a", t: "Axe biomédical" }],
           [{ id: "c", t: "Critères classiques", k: "doux" }, { id: "b", t: "Critères biomédicaux", k: "fort" }],
           [{ id: "c2", t: "Charge, rigidité, durée de vie, coût" }, { id: "b2", t: "Masse mobile, bruit, points de pincement, nettoyage, lubrifiants confinés" }]],
    liens: [["a", "c"], ["a", "b"], ["c", "c2"], ["b", "b2"]] },

  /* ---------- Mécanique : assemblages ---------- */
  "sc-fonctions": { titre: "Une fonction, un élément",
    cols: [[{ id: "a", t: "Serrer" }, { id: "b", t: "Positionner" }, { id: "c", t: "Transmettre un couple" }, { id: "d", t: "Maintenir axialement" }, { id: "e", t: "Prévenir le desserrage" }],
           [{ id: "a2", t: "Vis", k: "fort" }, { id: "b2", t: "Goupilles, épaulements, centrages", k: "fort" }, { id: "c2", t: "Clavette, cannelures, moyeu de serrage", k: "fort" }, { id: "d2", t: "Écrou, anneau élastique", k: "fort" }, { id: "e2", t: "Rondelle frein", k: "fort" }]],
    liens: [["a", "a2"], ["b", "b2"], ["c", "c2"], ["d", "d2"], ["e", "e2"]], vgap: 12 },

  "sc-precharge-vis": { titre: "Du couple de serrage au maintien des pièces",
    cols: [[{ id: "a", t: "Couple de serrage T", s: "à la clé" }],
           [{ id: "b", t: "Précharge F₀", s: "T ≈ K F₀ d ; K dépend du frottement", k: "doux" }],
           [{ id: "c", t: "Vis en traction, pièces en compression" }],
           [{ id: "d", t: "Le frottement reprend les efforts transversaux", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  "sc-clavette": { titre: "Vérifier une clavette",
    cols: [[{ id: "a", t: "Couple C", s: "N·m" }],
           [{ id: "b", t: "Force tangentielle", s: "Fₜ = 2C / d (d en m)", k: "doux" }],
           [{ id: "c", t: "Cisaillement", s: "τ ≈ Fₜ / (b L) (mm²)", k: "doux" }],
           [{ id: "d", t: "Comparer à la limite", s: "C45 : environ 200 MPa", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"], ["c", "d"]] },

  "sc-retenue": { titre: "Anneaux élastiques et goupilles",
    cols: [[{ id: "a", t: "Anneau élastique", s: "maintien axial, démontable", k: "doux" }, { id: "g", t: "Goupille", s: "immobiliser ou positionner", k: "doux" }],
           [{ id: "a1", t: "Extérieur : gorge sur l'arbre" }, { id: "a2", t: "Intérieur : gorge dans l'alésage" }, { id: "g1", t: "D'arrêt : d ≈ D / 3, H7/m6", k: "fort" }, { id: "g2", t: "De positionnement, avec une vis", s: "la vis serre, les goupilles positionnent", k: "fort" }]],
    liens: [["a", "a1"], ["a", "a2"], ["g", "g1"], ["g", "g2"]] },

  "sc-ressorts": { titre: "Les quatre usages d'un ressort",
    cols: [[{ id: "r", t: "Ressort", s: "stocke puis rend l'énergie\nF = k x" }],
           [{ id: "a", t: "Rappel", k: "doux" }, { id: "b", t: "Maintien d'un contact", k: "doux" }, { id: "c", t: "Application d'un effort", k: "doux" }, { id: "d", t: "Absorption de chocs", k: "doux" }]],
    liens: [["r", "a"], ["r", "b"], ["r", "c"], ["r", "d"]] },

  /* ---------- Mécanique : guidages ---------- */
  "sc-guidage": { titre: "Ce qu'on demande à un guidage",
    cols: [[{ id: "g", t: "Guidage", s: "k = F / δ" }],
           [{ id: "a", t: "Ce qu'il supporte", k: "doux" }, { id: "b", t: "Comment il se comporte", k: "doux" }, { id: "c", t: "Ce qui l'entoure", k: "doux" }],
           [{ id: "a2", t: "Charge radiale, axiale, moment" }, { id: "b2", t: "Rigidité, jeu, frottement, vitesse, précision" }, { id: "c2", t: "Durée de vie, lubrification, contamination, encombrement" }]],
    liens: [["g", "a"], ["g", "b"], ["g", "c"], ["a", "a2"], ["b", "b2"], ["c", "c2"]] },

  "sc-familles-roulements": { titre: "Les familles de roulements",
    cols: [[{ id: "r", t: "Roulement", s: "la famille d'abord, la référence ensuite" }],
           [{ id: "b", t: "À billes", s: "contact elliptique", k: "doux" }, { id: "o", t: "À rouleaux", s: "contact rectangulaire", k: "doux" }],
           [{ id: "b1", t: "Rigides à billes", s: "polyvalents" }, { id: "b2", t: "À contact oblique", s: "axial, précharge" }, { id: "b3", t: "Butées à billes", s: "axial" }, { id: "o1", t: "Rouleaux cylindriques", s: "fort radial" }, { id: "o2", t: "Rouleaux coniques", s: "radial et axial, par paire" }, { id: "o3", t: "Aiguilles", s: "peu de place" }]],
    liens: [["r", "b"], ["r", "o"], ["b", "b1"], ["b", "b2"], ["b", "b3"], ["o", "o1"], ["o", "o2"], ["o", "o3"]], vgap: 12 },

  "sc-charges": { titre: "La direction de la charge choisit le groupe",
    cols: [[{ id: "c", t: "Charge sur l'arbre" }],
           [{ id: "r", t: "Radiale seule", k: "doux" }, { id: "m", t: "Radiale et axiale", k: "doux" }, { id: "a", t: "Surtout axiale", k: "doux" }],
           [{ id: "r2", t: "Rouleaux cylindriques", k: "fort" }, { id: "m2", t: "Rigide à billes, contact oblique, coniques", k: "fort" }, { id: "a2", t: "Butée (α > 45°)", s: "vitesses plus faibles", k: "fort" }]],
    liens: [["c", "r"], ["c", "m"], ["c", "a"], ["r", "r2"], ["m", "m2"], ["a", "a2"]] },

  "sc-choix-roulement": { titre: "Quel roulement pour quel besoin ?",
    cols: [[{ id: "a", t: "Paliers désalignés, grande vitesse" }, { id: "b", t: "Fort radial, pas d'axial, bague séparable" }, { id: "c", t: "Fort radial, chocs, peu de place" }, { id: "d", t: "Radial et axial dans les deux sens, jeu à régler" }],
           [{ id: "a2", t: "Deux rangées de billes à rotule", k: "fort" }, { id: "b2", t: "Rouleaux cylindriques", k: "fort" }, { id: "c2", t: "Aiguilles", k: "fort" }, { id: "d2", t: "Deux rouleaux coniques en opposition", k: "fort" }]],
    liens: [["a", "a2"], ["b", "b2"], ["c", "c2"], ["d", "d2"]] },

  "sc-l10": { titre: "La durée d'un roulement",
    cols: [[{ id: "a", t: "C et P", s: "capacité et charge, en N" }],
           [{ id: "b", t: "L₁₀ = (C / P)ᵖ", s: "millions de tours ; p = 3 billes, 10/3 rouleaux", k: "doux" }],
           [{ id: "c", t: "L₁₀h = 10⁶ L₁₀ / (60 n)", s: "en heures", k: "fort", note: "90 % de fiabilité" }]],
    liens: [["a", "b"], ["b", "c"]] },

  "sc-fixe-libre": { titre: "Le montage fixe-libre",
    cols: [[{ id: "a", t: "Arbre qui chauffe et s'allonge" }],
           [{ id: "f", t: "Palier fixe", s: "positionne l'arbre axialement", k: "fort" }, { id: "l", t: "Palier libre", s: "une bague coulisse : dilatation", k: "doux" }],
           [{ id: "t", t: "Bagues tenues : celles qui tournent", s: "arbre tournant : bagues intérieures" }]],
    liens: [["a", "f"], ["a", "l"], ["f", "t"], ["l", "t"]] },

  "sc-precharge-roul": { titre: "La précharge d'un roulement : un compromis",
    cols: [[{ id: "p", t: "Plus de précharge" }],
           [{ id: "a", t: "Moins de jeu, plus de rigidité", k: "fort" }, { id: "b", t: "Plus de frottement et d'échauffement", k: "doux" }, { id: "c", t: "Trop forte : durée de vie réduite", k: "neutre" }],
           [{ id: "v", t: "La valeur du fabricant", s: "contact oblique : bien adapté" }]],
    liens: [["p", "a"], ["p", "b"], ["p", "c"], ["a", "v"], ["b", "v"], ["c", "v"]] },

  /* ---------- Mécanique : transmissions ---------- */
  "sc-arbre": { titre: "Dimensionner un arbre",
    cols: [[{ id: "a", t: "Puissance P, vitesse n" }],
           [{ id: "b", t: "Couple", s: "C = 60 P / (2π n)", k: "doux" }],
           [{ id: "c", t: "Diamètre minimal", s: "d > ∛(16 M_t / (π R_pg)), M_t en N·mm", k: "fort" }]],
    liens: [["a", "b"], ["b", "c"]] },

  "sc-engrenages": { titre: "Les engrenages selon la position des axes",
    cols: [[{ id: "e", t: "Engrenage", s: "rapport de vitesse constant" }],
           [{ id: "p", t: "Axes parallèles", k: "doux" }, { id: "c", t: "Axes concourants", k: "doux" }, { id: "g", t: "Axes gauches", k: "doux" }],
           [{ id: "p1", t: "Denture droite" }, { id: "p2", t: "Denture hélicoïdale", s: "progressive, silencieuse" }, { id: "c1", t: "Engrenages coniques", s: "arbres qui se croisent" }, { id: "g1", t: "Roue et vis sans fin", s: "grand rapport, souvent irréversible", k: "fort" }]],
    liens: [["e", "p"], ["e", "c"], ["e", "g"], ["p", "p1"], ["p", "p2"], ["c", "c1"], ["g", "g1"]] },

  "sc-denture": { titre: "Tout se déduit du module",
    cols: [[{ id: "m", t: "Module m", s: "pas / π, série normalisée" }],
           [{ id: "d", t: "d = m Z", s: "diamètre primitif", k: "fort" }, { id: "a", t: "d_a = d + 2m", s: "tête" }, { id: "f", t: "d_f = d − 2,5 m", s: "pied" }, { id: "p", t: "p = π m", s: "pas" }, { id: "h", t: "h = 2,25 m", s: "saillie m, creux 1,25 m" }]],
    liens: [["m", "d"], ["m", "a"], ["m", "f"], ["m", "p"], ["m", "h"]], vgap: 12 },

  "sc-trains": { titre: "Un train d'engrenages : tout se multiplie",
    cols: [[{ id: "t", t: "Train à N étages" }],
           [{ id: "i", t: "Rapports", s: "i_tot = Π iₖ", k: "doux" }, { id: "e", t: "Rendements", s: "η_tot = Π ηₖ", k: "doux" }],
           [{ id: "c", t: "Couple de sortie", s: "Cₛ ≈ C_m i_tot η_tot (i = ωₑ / ωₛ)", k: "fort" }]],
    liens: [["t", "i"], ["t", "e"], ["i", "c"], ["e", "c"]] },

  "sc-conventions": { titre: "Deux écritures du rapport : vérifier avant de calculer",
    cols: [[{ id: "r", t: "Rapport de transmission" }],
           [{ id: "a", t: "i = ωₑ / ωₛ", s: "entrée sur sortie", k: "doux" }, { id: "b", t: "i₁₂ = ω₂ / ω₁ = Z₁ / Z₂", s: "sortie sur entrée", k: "doux" }],
           [{ id: "a2", t: "> 1 pour un réducteur", s: "formules du couple (1.3), (4.7)", k: "fort" }, { id: "b2", t: "< 1 pour un réducteur", s: "engrenages, trains", k: "fort" }]],
    liens: [["r", "a"], ["r", "b"], ["a", "a2"], ["b", "b2"]] },

  /* ---------- Dessin : le bras 2R (page « L'essentiel en schémas ») ---------- */
  "sc-dessin-2r": function (boite, S) {
    var el = S.el, svg = S.svg(boite, "Le bras 2R : angles, position, espace de travail", 490);
    function T(x, y, s, o) { var t = el("text", Object.assign({ x: x, y: y, "font-size": 17, fill: "#15171f" }, o || {}), svg); t.textContent = s; return t; }
    var O = [290, 250], L1 = 135, L2 = 90, t1 = 35 * Math.PI / 180, t2 = 50 * Math.PI / 180;
    var A = [O[0] + L1 * Math.cos(t1), O[1] - L1 * Math.sin(t1)], M = [A[0] + L2 * Math.cos(t1 + t2), A[1] - L2 * Math.sin(t1 + t2)];
    el("circle", { cx: O[0], cy: O[1], r: L1 + L2, fill: "none", "stroke-width": 2, "stroke-dasharray": "8 7", style: "stroke:var(--jeu-texte)" }, svg);
    el("circle", { cx: O[0], cy: O[1], r: L1 - L2, fill: "none", "stroke-width": 2, "stroke-dasharray": "8 7", style: "stroke:var(--jeu-texte)" }, svg);
    el("path", { d: "M50," + O[1] + " H540 M" + O[0] + ",480 V20", stroke: "#b6bac4", "stroke-width": 2, fill: "none" }, svg);
    el("path", { d: "M" + O[0] + "," + O[1] + " L" + A[0] + "," + A[1] + " L" + M[0] + "," + M[1], fill: "none", "stroke-width": 9, "stroke-linecap": "round", style: "stroke:var(--jeu-texte)" }, svg);
    [O, A].forEach(function (p) { el("circle", { cx: p[0], cy: p[1], r: 9, fill: "#fff", "stroke-width": 3, style: "stroke:var(--jeu-texte)" }, svg); });
    el("circle", { cx: M[0], cy: M[1], r: 8, fill: "#15171f" }, svg);
    el("path", { d: "M" + (O[0] + 60) + "," + O[1] + " A60,60 0 0 0 " + (O[0] + 60 * Math.cos(t1)) + "," + (O[1] - 60 * Math.sin(t1)), fill: "none", stroke: "#15171f", "stroke-width": 2 }, svg);
    T(O[0] + 66, O[1] - 14, "θ₁", { "font-weight": 700 });
    var e = [A[0] + 50 * Math.cos(t1), A[1] - 50 * Math.sin(t1)];
    el("path", { d: "M" + A[0] + "," + A[1] + " L" + (A[0] + 70 * Math.cos(t1)) + "," + (A[1] - 70 * Math.sin(t1)), stroke: "#b6bac4", "stroke-width": 2, "stroke-dasharray": "5 5" }, svg);
    el("path", { d: "M" + e[0] + "," + e[1] + " A50,50 0 0 0 " + (A[0] + 50 * Math.cos(t1 + t2)) + "," + (A[1] - 50 * Math.sin(t1 + t2)), fill: "none", stroke: "#15171f", "stroke-width": 2 }, svg);
    T(A[0] + 40, A[1] - 52, "θ₂", { "font-weight": 700 });
    T((O[0] + A[0]) / 2 - 34, (O[1] + A[1]) / 2 - 12, "L₁", { "font-weight": 700 });
    T((A[0] + M[0]) / 2 - 36, (A[1] + M[1]) / 2 + 4, "L₂", { "font-weight": 700 });
    T(M[0] + 12, M[1] - 10, "M", { "font-weight": 700 });
    T(600, 70, "Position de M :", { "font-weight": 700 });
    T(600, 100, "x = L₁ cos θ₁ + L₂ cos(θ₁ + θ₂)");
    T(600, 128, "y = L₁ sin θ₁ + L₂ sin(θ₁ + θ₂)");
    T(600, 182, "Orientation de l'outil :", { "font-weight": 700 });
    T(600, 212, "θ₁ + θ₂");
    T(600, 266, "Espace de travail (pointillés) :", { "font-weight": 700 });
    T(600, 296, "|L₁ − L₂| ≤ r ≤ L₁ + L₂");
    T(600, 324, "un anneau", { fill: "#5b6172" });
  },

  /* ---------- L'arbre du module : sous-modules, parties et chapitres (chaque chapitre ouvre sa page) ---------- */
  "sc-structure": { titre: "Le module en un coup d'œil : touche un chapitre pour l'ouvrir",
    cols: [[{ id: "m", t: "Robotique médicale", k: "fort" }],
           [{ id: "b", t: "Robotique biomédicale", s: "décrire et modéliser un robot", k: "fort" },
            { id: "e", t: "Éléments mécaniques", s: "de quoi est fait un axe", k: "fort" }],
           [{ id: "pf", t: "Les fondations", k: "doux" },
            { id: "pg", t: "La géométrie", s: "repères, rotations, matrices", k: "doux" },
            { id: "pm", t: "Les modèles", s: "MGD, MGI, cinématique", k: "doux" },
            { id: "pt", t: "Les TD", k: "doux" },
            { id: "pa", t: "L'axe et ses liaisons", k: "doux" },
            { id: "pr", t: "Guider et transmettre", k: "doux" }],
           [{ id: "c0", t: "0. Les bases", s: "angles, vecteurs, matrices", href: "chapitres/chapitre-0.html" },
            { id: "c1", t: "1. Le robot", s: "classement, DDL, liaisons, médical", href: "chapitres/chapitre-1.html" },
            { id: "c2", t: "2. Repères et vecteurs", s: "produits, cylindriques, Chasles", href: "chapitres/chapitre-2.html" },
            { id: "c3", t: "3. Orientations", s: "matrice de rotation, Euler", href: "chapitres/chapitre-3.html" },
            { id: "c4", t: "4. Transformations", s: "homogène, bras 2R", href: "chapitres/chapitre-4.html" },
            { id: "c10", t: "5. Modélisation", s: "Denavit–Hartenberg, MGD", href: "chapitres/chapitre-10.html" },
            { id: "c11", t: "6. Modèle inverse", s: "MGI, jacobienne", href: "chapitres/chapitre-11.html" },
            { id: "c9", t: "TD 1", s: "classer, 3R, échographie", href: "chapitres/chapitre-9.html" },
            { id: "c5", t: "1. Architecture d'un axe", s: "vitesse, couple, jeu", href: "chapitres/chapitre-5.html" },
            { id: "c6", t: "2. Assemblages", s: "vis, clavettes, ressorts", href: "chapitres/chapitre-6.html" },
            { id: "c7", t: "3. Guidages", s: "roulements, L₁₀", href: "chapitres/chapitre-7.html" },
            { id: "c8", t: "4. Transmissions", s: "arbres, engrenages", href: "chapitres/chapitre-8.html" }]],
    liens: [["m", "b"], ["m", "e"], ["b", "pf"], ["b", "pg"], ["b", "pm"], ["b", "pt"], ["e", "pa"], ["e", "pr"],
            ["pf", "c0"], ["pf", "c1"], ["pg", "c2"], ["pg", "c3"], ["pg", "c4"], ["pm", "c10"], ["pm", "c11"], ["pt", "c9"],
            ["pa", "c5"], ["pa", "c6"], ["pr", "c7"], ["pr", "c8"]], vgap: 10, gap: 56 },
};
