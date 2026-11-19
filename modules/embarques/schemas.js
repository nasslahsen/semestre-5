/*
 * Schémas du module Systèmes embarqués (dessinés par commun/js/schema.js) : une entrée par <div class="schema" id="sc-...">.
 * Servent à la page « Préparer l'examen » (examen.html).
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
    liens: [["setup", "co"], ["co", "lp"], ["lp", "acq"], ["acq", "pub"]] }
};
