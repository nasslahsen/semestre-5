/*
 * Schémas du module Informatique médicale (dessinés par commun/js/schema.js) : une entrée par <div class="schema" id="sc-...">.
 * Sécurité des réseaux, séances 2 et 3 : classements, enchaînements et architectures.
 */
window.SCHEMAS = {
  "sc-attaques-l47": { titre: "Attaques des couches 4 à 7",
    arbre: { t: "Couches 4 à 7", k: "fort", enfants: [
      { t: "Repérer", s: "préparer l'attaque", k: "doux", enfants: [{ t: "Scan de ports", s: "services ouverts" }] },
      { t: "Intercepter", s: "lire ou rediriger", k: "doux", enfants: [{ t: "Man-in-the-Middle", s: "protocoles non chiffrés" }, { t: "DNS hijacking", s: "fausse IP dans le cache" }] },
      { t: "Bloquer", s: "disponibilité", k: "doux", enfants: [{ t: "DDoS", s: "ports inondés" }] },
      { t: "Pénétrer", s: "entrer dans le réseau", k: "doux", enfants: [{ t: "Exploitation de services", s: "protocoles mal configurés" }, { t: "Failles non corrigées", s: "correctif absent" }] }] } },
  "sc-autres-menaces": { titre: "Neuf manques qui fragilisent le réseau (regroupement ajouté)",
    arbre: { t: "Autres menaces", k: "fort", enfants: [
      { t: "Organisation", s: "politiques absentes", k: "doux", enfants: [{ t: "Politique de sécurité", s: "de l'information" }, { t: "Correctifs", s: "et mises à jour" }, { t: "Analyse des risques", s: "et mesures définies" }, { t: "Gestion des accès", s: "méthodes, procédures" }] },
      { t: "Technique", s: "mise en œuvre", k: "doux", enfants: [{ t: "Cryptographie", s: "absente" }, { t: "Configuration", s: "équipements mal réglés" }] },
      { t: "Conception, exploitation", k: "doux", enfants: [{ t: "Conception aléatoire", s: "sans mesure de sécurité" }, { t: "Administration", s: "sans maîtrise de la sécurité" }] },
      { t: "Physique", k: "doux", enfants: [{ t: "Sécurité physique", s: "des équipements" }] }] } },
  "sc-disponibilite": { titre: "Disponibilité des réseaux", deplier: false,
    cols: [[{ id: "cy", t: "Cyberattaques" }, { id: "pa", t: "Pannes d'infrastructure" }, { id: "er", t: "Erreurs humaines", s: "et d'exploitation" }, { id: "ar", t: "Architecture", s: "non adaptée" }],
           [{ id: "dispo", t: "Disponibilité des réseaux", k: "fort" }],
           [{ id: "spof", t: "Supprimer les SPOF", k: "doux" }, { id: "deg", t: "Empêcher la dégradation", s: "attaques, erreurs", k: "doux" }, { id: "res", t: "Maîtriser la restauration", s: "après incident", k: "doux" }]],
    liens: [["cy", "dispo"], ["pa", "dispo"], ["er", "dispo"], ["ar", "dispo"], ["dispo", "spof"], ["dispo", "deg"], ["dispo", "res"]] },
  "sc-attaques-l23": { titre: "Attaques des couches 2 et 3",
    arbre: { t: "Couches 2 et 3", k: "fort", enfants: [
      { t: "Switch", s: "couche 2", k: "doux", enfants: [{ t: "ARP spoofing", s: "faux messages ARP" }, { t: "MAC flooding", s: "table MAC saturée" }, { t: "VLAN hopping", s: "saut de VLAN" }] },
      { t: "Routeur", s: "couche 3", k: "doux", enfants: [{ t: "IP spoofing", s: "IP source falsifiée" }, { t: "ICMP flood", s: "bande passante saturée" }, { t: "DNS hijacking", s: "DNS du routeur remplacés" }] }] } },
  "sc-reconnaissance": { titre: "Les deux types de reconnaissance",
    arbre: { t: "Reconnaissance", s: "footprinting", k: "fort", enfants: [
      { t: "Passive", s: "OSINT, sans contact", k: "doux", enfants: [{ t: "Réseaux sociaux", s: "profils des employés" }, { t: "DNS publics", s: "enregistrements" }] },
      { t: "Active", s: "avec contact, détectable", k: "doux", enfants: [{ t: "Nmap", s: "scan de ports" }, { t: "Nessus, OpenVAS", s: "scanners de vulnérabilités" }] }] } }
};
