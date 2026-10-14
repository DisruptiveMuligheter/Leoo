# Disruptive Perspektiver, ny nettside

Ny versjon av postkortfrafremtiden.no. Den gamle nettsiden (repoet `DisruptiveMuligheter/Leo`) er ikke endret og fortsetter å ligge ute til du selv flytter domenet.

## Hva som ligger hvor

| Mappe eller fil | Innhold |
| --- | --- |
| `index.html` | Norsk forside |
| `en/index.html` | Engelsk forside |
| `data/notater.js` | Listen over alle notater. Begge sidene bygges fra denne |
| `data/innstillinger.js` | Påmeldingslenke, e-post og kjøpslenke til boken |
| `pdf/no/` og `pdf/en/` | Notatene, med korte filnavn uten mellomrom og æøå |
| `assets/forsider/` | Forsidebilde av hvert notat |
| `assets/` | Stilark, skript, logo og bokomslag |
| `404.html` | Sender gamle lenker (fra e-poster og den gamle siden) videre til riktig PDF |
| `verktoy/lag-forside.py` | Lager forsidebilde til et nytt notat |

## Legge ut et nytt notat

1. Legg PDF-en i `pdf/no/`, for eksempel `pdf/no/30-navn-pa-notatet.pdf`.
2. Åpne `data/notater.js` og kopier den siste linjen. Endre nummer, titler, dato (ÅÅÅÅ-MM), antall sider og filnavn.
3. Forsidebilde (valgfritt). Kjør `python verktoy/lag-forside.py pdf/no/30-navn-pa-notatet.pdf 30`. Hopper du over dette, får kortet en ensfarget flate.
4. Har notatet en engelsk versjon, legg den i `pdf/en/` og fyll inn `pdf_en`.

Nyeste notat vises automatisk øverst og i toppen av siden.

## Teste siden før den erstatter den gamle

1. Lag et nytt, tomt repo på GitHub under DisruptiveMuligheter, for eksempel `disruptive-perspektiver`.
2. Last opp innholdet i denne mappen (eller be Claude pushe det).
3. Gå til Settings, Pages, velg Deploy from a branch, `main` og `/ (root)`.
4. Etter et par minutter ligger siden på `https://disruptivemuligheter.github.io/disruptive-perspektiver/`.

Repoet har bevisst ingen `CNAME`-fil, så det tar ikke over domenet mens du tester.

## Flytte postkortfrafremtiden.no til den nye siden

1. I det gamle repoet `Leo`, gå til Settings, Pages og fjern Custom domain.
2. I det nye repoet, gå til Settings, Pages og skriv inn `postkortfrafremtiden.no` som Custom domain. Kryss av for Enforce HTTPS når det blir mulig.
3. DNS trenger ikke endres, siden begge repoene ligger på GitHub Pages.

Det gamle repoet kan stå urørt som sikkerhetskopi.

## Ting å sjekke før lansering

- Datoene i `data/notater.js` er hentet fra når PDF-ene ble laget. Sjekk at de stemmer med publiseringsdatoene.
- De engelske titlene på No. 26 til 29 er nye forslag. Endre dem gjerne.
- Bare No. 1 og No. 25 finnes på engelsk. Den gamle engelske siden lenket til filer i mappen `english/` som aldri ble lastet opp, så de lenkene var brutte. Engelske lesere får nå den norske versjonen med en merknad.
- Fyll inn `bok_kjop` i `data/innstillinger.js` for å vise knappen Kjøp boken.
- Les gjennom bokteksten og introduksjonen. Teksten bygger på hensiktsavsnittet på forsiden av notatene.
- Bakgrunnsvideoen fra den gamle siden er ikke med. Siden laster raskere uten den.
