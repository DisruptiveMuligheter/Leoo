// Fyller siden med notatene fra data/notater.js og innstillingene fra data/innstillinger.js.
(function () {
  var en = document.documentElement.lang === "en";
  var rot = document.body.getAttribute("data-rot") || "";
  var notater = (window.NOTATER || []).slice().sort(function (a, b) { return b.nr - a.nr; });
  var oppsett = window.INNSTILLINGER || {};

  var maaneder = en
    ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    : ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];

  function dato(d) {
    if (!d) return "";
    var del = d.split("-");
    return maaneder[parseInt(del[1], 10) - 1] + " " + del[0];
  }
  function tittel(n) { return en ? n.tittel_en : n.tittel; }
  function lenke(n) { return rot + (en && n.pdf_en ? n.pdf_en : n.pdf); }
  function forside(n) { return en && n.pdf_en && n.forside_en ? n.forside_en : n.forside; }
  function meta(n) {
    var sider = en && n.pdf_en && n.sider_en ? n.sider_en : n.sider;
    var deler = [dato(n.dato), sider + (en ? " pages" : " sider")].filter(Boolean);
    return deler.join(", ");
  }
  function lag(tag, attr, barn) {
    var el = document.createElement(tag);
    for (var k in attr || {}) {
      if (k === "tekst") el.textContent = attr[k];
      else el.setAttribute(k, attr[k]);
    }
    (barn || []).forEach(function (b) { if (b) el.appendChild(b); });
    return el;
  }
  function frimerke(nr) {
    return lag("div", { class: "frimerke", "aria-hidden": "true" }, [
      lag("span", {}, [lag("small", { tekst: "No." }), lag("b", { tekst: String(nr) })])
    ]);
  }

  // Siste notat
  var siste = document.getElementById("siste");
  if (siste && notater.length) {
    var n = notater[0];
    siste.href = lenke(n);
    siste.appendChild(frimerke(n.nr));
    siste.appendChild(lag("figure", {}, [
      lag("img", { src: rot + forside(n), alt: "", width: "510", height: "720" }),
      lag("figcaption", {}, [
        lag("span", { class: "hva", tekst: (en ? "Latest, No. " : "Siste notat, No. ") + n.nr }),
        lag("span", { class: "navn", tekst: tittel(n) })
      ])
    ]));
  }

  // Arkivet
  var liste = document.getElementById("notater");
  var antall = document.getElementById("antall");
  var tomt = document.getElementById("tomt");
  function tegn(filter) {
    if (!liste) return;
    liste.textContent = "";
    var f = (filter || "").trim().toLowerCase();
    var treff = notater.filter(function (n) {
      if (!f) return true;
      return (n.tittel + " " + n.tittel_en + " " + n.nr).toLowerCase().indexOf(f) !== -1;
    });
    treff.forEach(function (n) {
      var metaEl = lag("p", { class: "meta", tekst: meta(n) });
      if (en && !n.pdf_en) metaEl.appendChild(lag("span", { class: "merknad", tekst: "In Norwegian" }));
      liste.appendChild(lag("li", { class: "notat" }, [
        lag("a", { href: lenke(n), "aria-label": "No. " + n.nr + ", " + tittel(n) }, [
          frimerke(n.nr),
          lag("div", { class: "bilde" }, [n.forside ? lag("img", { src: rot + forside(n), alt: "", loading: "lazy", width: "510", height: "720", onerror: "this.remove()" }) : null]),
          lag("h3", { tekst: tittel(n) }),
          metaEl
        ])
      ]));
    });
    if (tomt) tomt.hidden = treff.length !== 0;
  }
  if (antall) antall.textContent = notater.length;
  tegn("");
  var sok = document.getElementById("sok");
  if (sok) sok.addEventListener("input", function () { tegn(sok.value); });

  // Innstillinger
  document.querySelectorAll("[data-pamelding]").forEach(function (a) {
    if (oppsett.pamelding) a.href = oppsett.pamelding; else a.hidden = true;
  });
  document.querySelectorAll("[data-epost]").forEach(function (a) {
    if (oppsett.epost) { a.href = "mailto:" + oppsett.epost; a.textContent = oppsett.epost; }
  });
  document.querySelectorAll("[data-bok-kjop]").forEach(function (a) {
    if (oppsett.bok_kjop) { a.href = oppsett.bok_kjop; a.target = "_blank"; a.rel = "noopener"; } else a.hidden = true;
  });
})();
