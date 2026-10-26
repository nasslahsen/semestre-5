/*
 * Page « Mon suivi » : la progression de chaque module (sections faites, chapitre par chapitre),
 * les questions à revoir (erreurs, réponses vues, questions passées au dernier passage de chaque niveau)
 * et les documents reçus pour chaque module (module.js, « documents »).
 */
(function () {
  "use strict";
  var P = window.PLATEFORME, R = window.REGISTRE;
  var actifs = R.modules.filter(function (m) { return m.statut === "actif"; });
  var reste = actifs.length;

  document.getElementById("semestre").textContent = R.semestre;
  if (!reste) afficher();
  actifs.forEach(function (m) {
    var s = document.createElement("script");
    s.src = P.racine + "modules/" + m.id + "/module.js";
    s.onload = s.onerror = function () { if (--reste === 0) afficher(); };
    document.body.appendChild(s);
  });

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function style(m) { return ' style="--c:' + m.couleur + ";--cl:" + m.clair + ";--ct:" + m.texte + '"'; }
  function barre(f, t) {
    var pc = t ? Math.round(100 * f / t) : 0;
    return '<div class="progres"><div class="piste"><i style="width:' + pc + '%"></i></div><span><b>' + f + " / " + t + "</b> sections</span></div>";
  }

  function afficher() {
    var faits = 0, total = 0, niveaux = 0;
    actifs.forEach(function (m) {
      var c = P.compte(m.id); faits += c.faits; total += c.total;
      niveaux += Object.keys(P.progression(m.id)).length;
    });
    document.getElementById("resume").textContent = faits + " sections faites sur " + total + ", " + niveaux +
      (niveaux > 1 ? " niveaux réussis." : " niveau réussi.") + " Une section compte quand ses exercices sont réussis.";
    progres(); revoir(); documents();
  }

  // Où j'en suis : un module par ligne ; on l'ouvre pour voir ses chapitres.
  function progres() {
    var h = "";
    actifs.forEach(function (m0) {
      var m = P.module(m0.id), c = P.compte(m.id), sms = P.sousModules(m.id).filter(function (sm) { return P.chapitresDe(m.id, sm.id).length; });
      var corps = sms.map(function (sm) {
        var ligne = function (ch) {
          var f = ch.sections.filter(function (s) { return s.faite; }).length;
          var etat = ch.etat === "fait" ? "Fait" : ch.etat === "encours" ? "En cours" : "Pas commencé";
          return '<a class="sv-ch ' + (ch.etat || "rien") + '" href="' + P.urlChapitre(m.id, ch.id) + '">' +
            '<span class="sv-num">' + P.numero(m.id, ch.id) + '</span><span class="sv-titre">' + esc(ch.titre) + "<small>" + etat + "</small></span>" +
            barre(f, ch.sections.length) + "</a>";
        };
        var tds = P.chapitresDe(m.id, sm.id, "td");
        return (sm.titre && sms.length > 1 ? '<h4 class="sv-cours">' + esc(sm.titre) + "</h4>" : "") + P.chapitresDe(m.id, sm.id, "cours").map(ligne).join("") +
          (tds.length ? '<h4 class="sv-cours">' + (sm.titre && sms.length > 1 ? "TD · " + esc(sm.titre) : "TD") + "</h4>" + tds.map(ligne).join("") : "");
      }).join("");
      h += '<details class="sv-module"' + style(m) + '><summary><span class="sv-nom">' + esc(m.titre) + "</span>" + barre(c.faits, c.total) + "</summary>" +
        '<div class="sv-chapitres">' + corps + "</div></details>";
    });
    document.getElementById("progres").innerHTML = h;
  }

  // À revoir : le dernier passage de chaque niveau, les plus récents d'abord.
  function revoir() {
    var items = [];
    actifs.forEach(function (m0) {
      var m = P.module(m0.id), es = P.essais(m.id);
      Object.keys(es).forEach(function (id) {
        var e = es[id], n = m.niveaux.filter(function (x) { return x.id === id; })[0];
        if (!n || !e.revoir || !e.revoir.length) return;
        items.push({ m: m, n: n, e: e });
      });
    });
    items.sort(function (a, b) { return (b.e.quand || 0) - (a.e.quand || 0); });
    var z = document.getElementById("revoir");
    if (!items.length) {
      z.innerHTML = '<p class="suivi-vide">Rien à revoir pour l\'instant. Les questions ratées, vues ou passées dans les exercices apparaîtront ici.</p>';
      return;
    }
    z.innerHTML = items.slice(0, 12).map(function (x) {
      var s = P.sectionDe(x.m.id, x.n.id);
      var cours = s ? P.urlSection(x.m.id, s.id) : P.urlChapitre(x.m.id, x.n.chapitre);
      var etapes = x.e.revoir.map(function (r) {
        var cause = r.cause === "revelee" ? "réponse vue" : r.cause === "passee" ? "passée" : r.erreurs + (r.erreurs > 1 ? " erreurs" : " erreur");
        return esc(r.nom) + " <small>(" + cause + ")</small>";
      }).join(" · ");
      return '<article class="sv-revoir"' + style(x.m) + '><div class="sv-rt"><span class="sv-kicker">' + esc(x.m.titre) + "</span>" +
        "<h3>" + esc(x.n.titre) + "</h3><p>" + etapes + "</p></div>" +
        '<div class="sv-actions"><a class="btn-continuer" href="' + cours + '">Revoir le cours</a>' +
        '<a class="sv-lien" href="' + P.racine + "modules/" + x.m.id + "/jouer.html#" + x.n.id + '">Rejouer</a></div></article>';
    }).join("");
  }

  // Documents reçus : par module et par sous-module ; un sous-module à venir n'a encore rien reçu.
  function documents() {
    var h = "";
    R.modules.forEach(function (m0) {
      var m = P.module(m0.id), d = m.documents || {}, recus = d.recus || [], lignes = "";
      var sms = (m.sousModules || []).length ? m.sousModules : [{ id: null, titre: null }];
      sms.forEach(function (sm) {
        var docs = recus.filter(function (x) { return sm.id === null || x.sousModule === sm.id; });
        var titre = sm.titre ? '<span class="sv-sm">' + esc(sm.titre) + "</span>" : "";
        if (docs.length) {
          docs.forEach(function (x, k) {
            lignes += '<li class="recu">' + (k ? "" : titre) + '<span class="sv-doc">' + esc(x.titre) +
              (x.couvre ? "<small>" + esc(x.couvre) + "</small>" : "") + '</span><span class="sv-etat">Reçu</span></li>';
          });
        } else {
          lignes += '<li class="manque">' + titre + '<span class="sv-doc">Rien reçu pour l\'instant</span><span class="sv-etat">À envoyer</span></li>';
        }
      });
      (d.manque || []).forEach(function (t) {
        lignes += '<li class="partiel"><span class="sv-doc">' + esc(t) + '</span><span class="sv-etat">Incomplet</span></li>';
      });
      h += '<section class="sv-docs"' + style(m) + "><h3>" + esc(m.titre) + "</h3><ul>" + lignes + "</ul></section>";
    });
    document.getElementById("documents").innerHTML = h;
  }
})();
