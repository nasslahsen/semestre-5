/*
 * Schémas du module Systèmes embarqués (dessinés par commun/js/schema.js) : une entrée par <div class="schema" id="sc-...">.
 * Servent à la page « Préparer l'examen » (examen.html) et au TD 1.
 */
window.SCHEMAS = {
  "sc-semelle-blocs": { titre: "Schéma bloc de la semelle instrumentée et connectée", deplier: false,
    cols: [[{ id: "bioz", t: "Mesure BioZ", s: "MAX30009" }, { id: "appui", t: "Gestion capteurs", s: "appui plantaire" }, { id: "th", t: "Capteur T°C", s: "et humidité" }],
           [{ id: "uc", t: "µC", k: "fort" }, { id: "alim", t: "Gestion Alim.", s: "accumulateur", k: "neutre" }],
           [{ id: "tx", t: "TX Radio", s: "et antenne", k: "doux" }]],
    liens: [["bioz", "uc"], ["appui", "uc"], ["th", "uc"], ["uc", "tx"]] },

  "sc-semelle-organigramme": { titre: "Organigramme du programme de la semelle", deplier: false,
    cols: [[{ id: "setup", t: "setup()", s: "une fois : Wi-Fi, broker, callback, LED", k: "neutre" }],
           [{ id: "co", t: "Connexion", s: "reconnect() si déconnecté" }],
           [{ id: "lp", t: "client.loop()", s: "appelle callback() si un message arrive" }],
           [{ id: "acq", t: "Mesure", s: "toutes les 1 s : 4 analogRead, tension, zone max, alerte", k: "doux" }],
           [{ id: "pub", t: "Publication", s: "LED, JSON sur semelle/appui", k: "fort" }]],
    liens: [["setup", "co"], ["co", "lp"], ["lp", "acq"], ["acq", "pub"]] },

  "sc-td1-chaine": { titre: "TD 1 : la chaîne de mesure d'un capteur d'appui (figure 5)", deplier: false,
    cols: [[{ id: "fsr", t: "8 capteurs FSR", s: "R baisse quand F monte" }],
           [{ id: "mux", t: "NX3L4051", s: "S3 S2 S1 choisit Yk" }],
           [{ id: "aop", t: "AOP et RG, CF", s: "R devient VA, filtré", k: "doux" }],
           [{ id: "adc", t: "ADC du µC", s: "AIN1, 8 bits", k: "fort" }]],
    liens: [["fsr", "mux"], ["mux", "aop"], ["aop", "adc"]] }
};
