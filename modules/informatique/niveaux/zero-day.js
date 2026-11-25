/* Niveau : vulnérabilités non corrigées et 0-day, exemple PHP2Shell (séance 2, diapositive 14). */
NIVEAU(SIS.rejouable({
  id: "zero-day",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "La chaîne 0-day", jouer: function (j, n) {
      j.titre("Remets la chaîne du cours dans l'ordre.");
      SIS.ordonner(j, n.g, ["Exploit 0-day", "Attaque 0-day", "Faille 0-day (cachée)"], [2, 0, 1], {
        aide: function (i, a, k) { return ["D'abord, la faiblesse existe, cachée.", "Le pirate écrit le script qui l'exploite.", "Il attaque."][k]; },
        bravo: "Faille cachée → exploit → attaque." });
    } },
    { nom: "0-day ou pas ?", jouer: function (j, n) {
      j.titre("Range chaque situation : attaque 0-day, ou faille connue mais non corrigée ?");
      var c = [{ t: "L'éditeur ignore tout de la faille exploitée", bac: 0 }, { t: "Correctif publié, pas encore installé", bac: 1 }, { t: "Faille trouvée par l'IA, inconnue des créateurs", bac: 0 }, { t: "Windows non corrigé contre WannaCry", bac: 1 }];
      SIS.ranger(j, n.g, c, ["0-day", "Connue, non corrigée"], { aide: function (i) { return c[i].bac ? "Le correctif existe : il manque seulement son installation." : "Personne chez l'éditeur ne connaît encore la faille."; }, bravo: "0-day : avant même que l'éditeur ne sache." });
    } },
    { nom: "PHP2Shell", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["document", "alerte"], titre: "PHP2Shell, octobre 2026", sous: "CVE-2026-109618 et CVE-2026-109619" });
      j.titre("Qu'est-ce que l'exemple PHP2Shell illustre de nouveau, d'après le cours ?");
      j.choix([{ html: "Une panne de courant dans un datacenter", aide: "Ce sont des failles logicielles." }, { html: "L'usage de l'intelligence artificielle pour trouver et exploiter des failles dormantes", juste: true }, { html: "Une attaque par ARP spoofing", aide: "PHP est un langage du web, couche application." }], { colonnes: 1, ok: function () { j.bravo("L'IA a servi à identifier et exploiter des vulnérabilités critiques de type zero-day."); j.expliquer("PHP fait tourner environ 70 % du web : des millions de plateformes exposées. Au Maroc, bulletin officiel du 21 octobre 2026."); j.suite(); } });
    } },
    { nom: "Le bon réflexe", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "bouclier"], titre: "Bulletin DGSSI / maCERT", sous: "faille critique dans le portail web" });
      j.titre("Un bulletin signale une faille critique sur le logiciel du portail de l'hôpital, sans correctif pour l'instant. Que firent la MAP et Bank Al-Maghrib dans la même situation ?");
      j.choix([{ html: "Une maintenance préventive : site coupé ou indisponibilité ciblée le temps de sécuriser", juste: true }, { html: "Rien, en attendant le correctif", aide: "Laisser ouvert pendant que la faille circule, c'est l'exposer." }, { html: "Ils ont payé une rançon", aide: "Il n'y avait pas de rançon : ils ont agi avant." }], { colonnes: 1, ok: function () { j.bravo("Couper temporairement plutôt que rester exposé."); j.suite(); } });
    } }
  ]
}));
