/*
 * Schémas du module Laboratoire (dessinés par commun/js/schema.js) : une entrée par <div class="schema" id="sc-...">.
 * Servent aux versions courtes des chapitres (court/chapitre-<n>.html).
 */
window.SCHEMAS = {
  /* ---------- Chapitre 1 ---------- */
  "sc-circuit": { titre: "Le circuit de l'échantillon : sept étapes, dans l'ordre",
    cols: [[{ id: "p", t: "Prescription, prélèvement", s: "1 et 2 : identifié, étiqueté" }],
           [{ id: "tr", t: "Transport", s: "3 : température, délai" }],
           [{ id: "re", t: "Réception, préparation", s: "4 et 5 : conformité, centrifugation" }],
           [{ id: "an", t: "Analyse", s: "6 : automate ou manuel", k: "doux" }],
           [{ id: "va", t: "Validation et rendu", s: "7 : biologiste, prescripteur", k: "fort" }]],
    liens: [["p", "tr"], ["tr", "re"], ["re", "an"], ["an", "va"]] },

  "sc-phases": { titre: "Trois phases, et où naît le risque",
    cols: [[{ id: "pre", t: "Pré-analytique", s: "prescription → arrivée à l'analyseur\n60 à 70 % des erreurs", k: "fort", note: "identification, prélèvement, transport" }],
           [{ id: "ana", t: "Analytique", s: "la mesure elle-même", k: "doux", note: "analyseur, réactifs, calibration, CQI" }],
           [{ id: "post", t: "Post-analytique", s: "résultat brut → communication", note: "validation, résultats critiques, LIS" }]],
    liens: [["pre", "ana"], ["ana", "post"]] },

  "sc-bsl": { titre: "Niveaux de biosécurité : plus l'agent est dangereux, plus le laboratoire est fermé",
    cols: [[{ id: "b1", t: "BSL-1", s: "non pathogènes\nenseignement" }],
           [{ id: "b2", t: "BSL-2", s: "groupe 2\nla plupart des laboratoires cliniques", k: "doux" }],
           [{ id: "b3", t: "BSL-3", s: "graves par inhalation\nM. tuberculosis" }],
           [{ id: "b4", t: "BSL-4", s: "hautement dangereux\nvirus Ebola", k: "fort" }]],
    liens: [["b1", "b2"], ["b2", "b3"], ["b3", "b4"]] },

  /* ---------- Chapitre 2 ---------- */
  "sc-ordre": { titre: "Ordre de remplissage des tubes (CLSI)",
    cols: [[{ id: "h", t: "Hémoculture", s: "1 : stérile d'abord", k: "fort" }],
           [{ id: "s", t: "Tube sec", s: "2 : sérum" }],
           [{ id: "c", t: "Citrate", s: "3 : coagulation" }],
           [{ id: "he", t: "Héparine", s: "4" }],
           [{ id: "e", t: "EDTA", s: "5 : NFS" }],
           [{ id: "f", t: "Fluorure", s: "6 : glycémie\npuis les autres" }]],
    liens: [["h", "s"], ["s", "c"], ["c", "he"], ["he", "e"], ["e", "f"]] },

  "sc-froid": { titre: "Le cycle frigorifique : la chaleur sort de l'enceinte",
    cols: [[{ id: "ev", t: "Évaporateur", s: "dans l'enceinte\nabsorbe la chaleur, vaporise", k: "doux" }],
           [{ id: "co", t: "Compresseur", s: "vapeur BP → HP" }],
           [{ id: "cd", t: "Condenseur", s: "à l'arrière\ncède la chaleur, liquéfie", k: "fort" }],
           [{ id: "de", t: "Détendeur", s: "HP → BP\nou tube capillaire" }]],
    liens: [["ev", "co"], ["co", "cd"], ["cd", "de"]] },

  "sc-erreurs": { titre: "Les erreurs pré-analytiques, par origine",
    cols: [[{ id: "r", t: "Erreurs pré-analytiques", s: "60 à 70 % des erreurs" }],
           [{ id: "i", t: "Identification", s: "mauvais patient, étiquette" },
            { id: "p", t: "Prélèvement", s: "ordre, remplissage, hémolyse, stase" },
            { id: "t", t: "Transport et conservation", s: "délai, chaud, froid, lumière" },
            { id: "c", t: "Centrifugation", s: "vitesse, temps, délai" },
            { id: "e", t: "Environnement", s: "chaleur, humidité, vibrations" }]],
    liens: [["r", "i"], ["r", "p"], ["r", "t"], ["r", "c"], ["r", "e"]], deplier: false },

  /* ---------- Chapitre 3 ---------- */
  "sc-spectro": { titre: "Le spectrophotomètre : le trajet de la lumière",
    cols: [[{ id: "s", t: "Source", s: "tungstène : visible\ndeutérium : UV" }],
           [{ id: "m", t: "Monochromateur", s: "prisme ou réseau\nune seule λ" }],
           [{ id: "c", t: "Cuve", s: "quartz sous 310 nm", k: "doux" }],
           [{ id: "d", t: "Détecteur", s: "photodiode, barrette,\nphotomultiplicateur" }],
           [{ id: "l", t: "Lecture", s: "A = ε × l × c", k: "fort" }]],
    liens: [["s", "m"], ["m", "c"], ["c", "d"], ["d", "l"]] },

  "sc-automate-bio": { titre: "Un dosage dans l'automate de biochimie (chimie liquide)",
    cols: [[{ id: "asp", t: "Carrousel d'échantillons", s: "ASP" }],
           [{ id: "spp", t: "Pompes", s: "SPP : échantillon\nRPP : réactif (RCU réfrigéré)" }],
           [{ id: "rx", t: "Carrousel de réaction", s: "37 °C, agitation MIX", k: "doux" }],
           [{ id: "ph", t: "Photomètre", s: "340 à 620 nm", k: "fort" }],
           [{ id: "wu", t: "Lavage", s: "WU, propreté optique" }]],
    liens: [["asp", "spp"], ["spp", "rx"], ["rx", "ph"], ["ph", "wu"]] },

  "sc-mesures-bio": { titre: "Trois façons de doser en biochimie",
    cols: [[{ id: "q", t: "Ce que donne la substance" }],
           [{ id: "col", t: "Une couleur", s: "glucose, cholestérol" }, { id: "tro", t: "Un trouble", s: "complexes antigène-anticorps" }, { id: "ion", t: "Des ions", s: "Na⁺, K⁺, Cl⁻" }],
           [{ id: "pho", t: "Photométrie", s: "absorbance, Beer-Lambert", k: "fort" }, { id: "tur", t: "Turbidimétrie, néphélométrie", s: "transmise ou diffusée", k: "fort" }, { id: "pot", t: "Potentiométrie", s: "électrode sélective, Nernst", k: "fort" }]],
    liens: [["q", "col"], ["q", "tro"], ["q", "ion"], ["col", "pho"], ["tro", "tur"], ["ion", "pot"]], deplier: false },

  /* ---------- Chapitre 4 ---------- */
  "sc-hemato": { titre: "Dans l'automate d'hématologie, du tube au LIS",
    cols: [[{ id: "a", t: "Aspiration", s: "aiguille, détection de niveau" }],
           [{ id: "d", t: "Dilution", s: "pompes, vannes, seringues" }],
           [{ id: "m", t: "Mesure", s: "chambre de Coulter, laser", k: "doux" }],
           [{ id: "q", t: "Acquisition", s: "amplificateur, CAN" }],
           [{ id: "g", t: "Données et CQ", s: "calculs, alarmes, contrôles" }],
           [{ id: "l", t: "Interface LIS", s: "HL7, ASTM", k: "fort" }]],
    liens: [["a", "d"], ["d", "m"], ["m", "q"], ["q", "g"], ["g", "l"]] },

  "sc-hemostase": { titre: "Les trois temps de l'hémostase",
    cols: [[{ id: "p", t: "Hémostase primaire", s: "3 à 5 min\nclou plaquettaire (FW, fibrinogène)" }],
           [{ id: "c", t: "Coagulation", s: "5 à 10 min\nfibrine, caillot", k: "fort" }],
           [{ id: "f", t: "Fibrinolyse", s: "48 à 72 h\nplasmine dissout le caillot" }]],
    liens: [["p", "c"], ["c", "f"]] },

  "sc-coagulation": { titre: "Deux voies qui convergent vers le facteur X",
    cols: [[{ id: "ex", t: "Voie exogène", s: "facteur tissulaire, VII\nla principale" }, { id: "en", t: "Voie endogène", s: "plasma seul, au contact\ndu verre ou du sous-endothélium" }],
           [{ id: "x", t: "Xa", s: "prothrombinase :\nXa + Va + PL + Ca²⁺", k: "doux" }],
           [{ id: "th", t: "Thrombine (IIa)", s: "à partir de la prothrombine (II)" }],
           [{ id: "fi", t: "Fibrine", s: "à partir du fibrinogène (I)", k: "fort" }]],
    liens: [["ex", "x"], ["en", "x"], ["x", "th"], ["th", "fi"]] },

  /* ---------- Chapitre 5 ---------- */
  "sc-microscope": { titre: "Le trajet de l'image dans le microscope optique",
    cols: [[{ id: "o", t: "Objet", s: "sur la platine" }],
           [{ id: "ob", t: "Objectif", s: "image réelle, renversée, agrandie", k: "doux" }],
           [{ id: "oc", t: "Oculaire", s: "loupe : image virtuelle" }],
           [{ id: "g", t: "Grossissement", s: "G objectif × G oculaire", k: "fort" }]],
    liens: [["o", "ob"], ["ob", "oc"], ["oc", "g"]] },

  "sc-types-microscopes": { titre: "Quel microscope pour quoi ?",
    cols: [[{ id: "r", t: "Le contraste à créer" }],
           [{ id: "fc", t: "Fond clair", s: "frottis coloré" }, { id: "fn", t: "Fond noir", s: "le vivant" }, { id: "fl", t: "Fluorescence", s: "IFI, chambre noire" }, { id: "po", t: "Polarisant", s: "cristaux urinaires" }, { id: "in", t: "Inversé", s: "cultures cellulaires" }, { id: "el", t: "Électronique", s: "faisceau d'électrons" }]],
    liens: [["r", "fc"], ["r", "fn"], ["r", "fl"], ["r", "po"], ["r", "in"], ["r", "el"]], deplier: false },

  /* ---------- Chapitre 7 ---------- */
  "sc-sih-lis": { titre: "SIH et LIS : la demande descend, le résultat remonte",
    cols: [[{ id: "s1", t: "SIH", s: "le médecin prescrit\ndans le dossier patient" }],
           [{ id: "l1", t: "LIS", s: "étiquettes, prélèvement" }],
           [{ id: "au", t: "Automates", s: "HL7, ASTM, middleware", k: "doux" }],
           [{ id: "l2", t: "LIS", s: "validation du biologiste" }],
           [{ id: "s2", t: "SIH", s: "résultat dans le dossier", k: "fort" }]],
    liens: [["s1", "l1"], ["l1", "au"], ["au", "l2"], ["l2", "s2"]] },

  "sc-etiquetage": { titre: "L'automate d'étiquetage, étape par étape",
    cols: [[{ id: "o", t: "Ordres du LIS", s: "numéro d'accession" }],
           [{ id: "t", t: "Choix du tube", s: "EDTA, sec, citrate" }],
           [{ id: "d", t: "Détection de position", s: "capteur, R = R_B + R_P" }],
           [{ id: "i", t: "Impression et collage", s: "transfert thermique, roulement", k: "doux" }],
           [{ id: "e", t: "Éjection", s: "normal ou STAT, statut validé", k: "fort" }]],
    liens: [["o", "t"], ["t", "d"], ["d", "i"], ["i", "e"]] },

  "sc-tri": { titre: "Le trieur pré-analytique",
    cols: [[{ id: "c", t: "Chargement", s: "vrac ou portoir, STAT" }],
           [{ id: "i", t: "Identification", s: "code-barres 360°, bouchon" }],
           [{ id: "q", t: "Contrôle", s: "volume, Gel-Check, indices" }],
           [{ id: "cf", t: "Centrifuger ?", s: "pas l'EDTA (NFS)", k: "doux" }],
           [{ id: "d", t: "Débouchage, tri", s: "vers le bon automate", k: "fort" }]],
    liens: [["c", "i"], ["i", "q"], ["q", "cf"], ["cf", "d"]] },

  /* ---------- Chapitre 8 ---------- */
  "sc-cycle-vie": { titre: "Le cycle de vie d'un équipement",
    cols: [[{ id: "b", t: "Besoin, sélection", s: "URS" }],
           [{ id: "i", t: "Installation, qualification", s: "installé conformément" }],
           [{ id: "v", t: "Vérification des performances", s: "mesure juste", k: "doux" }],
           [{ id: "m", t: "Mise en service" }],
           [{ id: "mm", t: "Maintenance, métrologie", k: "fort" }],
           [{ id: "d", t: "Retrait", s: "fin de vie, dossier archivé" }]],
    liens: [["b", "i"], ["i", "v"], ["v", "m"], ["m", "mm"], ["mm", "d"]] },

  "sc-correctif": { titre: "Une intervention corrective",
    cols: [[{ id: "d", t: "Détection", s: "codes d'erreur, alarmes" }],
           [{ id: "g", t: "Diagnostic", s: "journaux (logs)" }],
           [{ id: "i", t: "Intervention", s: "pièce, recalibration", k: "doux" }],
           [{ id: "v", t: "Vérification", s: "contrôle de qualité", k: "fort" }]],
    liens: [["d", "g"], ["g", "i"], ["i", "v"]] },

  "sc-criticite": { titre: "Évaluer un équipement critique, avant la panne",
    cols: [[{ id: "e", t: "Équipement", s: "analyseur, électricité, LIS, HVAC" }],
           [{ id: "im", t: "Impact clinique" }, { id: "de", t: "Délai de réparation" }],
           [{ id: "pb", t: "Plan B", s: "secours ou sous-traitance", k: "doux" }],
           [{ id: "tr", t: "Traçabilité", s: "incident et actions", k: "fort" }]],
    liens: [["e", "im"], ["e", "de"], ["im", "pb"], ["de", "pb"], ["pb", "tr"]] },

  /* ---------- Chapitre 6 (anatomie et cytopathologie) ---------- */
  "sc-anapath": { titre: "Le parcours d'un prélèvement en anapath",
    cols: [[{ id: "r", t: "Réception, fixation", s: "numéro unique, formol tamponné" }],
           [{ id: "m", t: "Macroscopie", s: "description, cassettes" }],
           [{ id: "d", t: "Déshydratation, enrobage", s: "paraffine, bloc", k: "doux" }],
           [{ id: "c", t: "Coupe, coloration", s: "microtome 3 à 5 µm, H&E" }],
           [{ id: "l", t: "Lecture, compte rendu", s: "microscope ou scanner, archivage", k: "fort" }]],
    liens: [["r", "m"], ["m", "d"], ["d", "c"], ["c", "l"]] },

  "sc-ancillaires": { titre: "Les techniques complémentaires au H&E",
    cols: [[{ id: "r", t: "Quand le H&E ne suffit pas" }],
           [{ id: "ihc", t: "Immunohistochimie", s: "anticorps : récepteurs hormonaux, HER2" },
            { id: "ish", t: "Hybridation in situ", s: "FISH, CISH : gène HER2, HPV" },
            { id: "mol", t: "Tests moléculaires", s: "PCR, NGS : mutation BRAF V600E" },
            { id: "col", t: "Colorations spéciales", s: "rouge Congo : amylose\nZiehl-Neelsen : tuberculose" }]],
    liens: [["r", "ihc"], ["r", "ish"], ["r", "mol"], ["r", "col"]], deplier: false },

  "sc-processeur": { titre: "Dans l'automate de déshydratation et d'imprégnation",
    cols: [[{ id: "f", t: "Tissu fixé", s: "formol, en cassette" }],
           [{ id: "d", t: "Déshydratation", s: "alcools de concentrations croissantes" }],
           [{ id: "c", t: "Clarification", s: "xylène ou substitut", k: "doux" }],
           [{ id: "i", t: "Imprégnation", s: "paraffine vers 60 °C, sous vide", k: "fort" }]],
    liens: [["f", "d"], ["d", "c"], ["c", "i"]] }
};
