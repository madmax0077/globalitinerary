import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const REGION_MAP = {
  europe: [
    "aalborg", "a Coruña", "a-coruna", "abano-terme", "abrantes", "aix-les-bains", "alba-iulia", "albi", "alcobaca", "almeria", "amersfoort", "amiens", "andorra", "annecy", "antwerp", "arcos-de-valdevez", "arezzo", "argostoli", "armenia", "assisi", "astorga", "avila", "bad-homburg", "bamberg", "banff", "barcelona", "bari", "basel", "bath", "bayonne", "beauvais", "belluno", "bergamo", "bergen", "biarritz", "bilbao", "bologna", "bolzano", "bonn", "bordeaux", "bormio", "bournemouth", "braga", "bregenz", "bremen", "briancon", "brighton", "brindisi", "bristol", "brno", "bruges", "brussels", "bucharest", "budapest", "cadiz", "caen", "cagliari", "cambrai", "cambridge", "camogli", "canterbury", "capri", "carcassonne", "cardiff", "carmen", "caserta", "catania", "cattolica", "cefalu", "chamonix", "chartres", "chateau-thierry", "chieti", "civitavecchia", "clermont-ferrand", "colmar", "cologne", "como", "conwy", "cork", "cortina", "coventry", "crotone", "delft", "dinant", "dingle", "dordrecht", "dresden", "dubrovnik", "dumfries", "dunkirk", "durham", "edinburgh", "eindhoven", "elba", "empoli", "engelberg", "erice", "evora", "exeter", "faro", "ferrara", "figueres", "florence", "foz-do-douro", "freiburg", "funchal", "garmisch", "gdansk", "geneva", "genoa", "ghent", "girona", "glasgow", "gordes", "gothenburg", "graz", "grenoble", "groningen", "gubbio", "haarlem", "hamburg", "heidelberg", "helsinki", "heraklion", "huelva", "hvar", "ibiza", "innsbruck", "interlaken", "inverness", "ischia", "jaen", "jerez", "kassel", "kiel", "kotor", "krakow", "la-rochelle", "lago-maggiore", "lake-garda", "lancaster", "larissa", "le-havre", "le-mans", "leeds", "leiden", "leipzig", "leon", "les-sables", "levico-terme", "liege", "lille", "limoges", "linz", "lisbon", "liverpool", "ljubljana", "llandudno", "locarno", "lodi", "london", "lourdes", "lubeck", "lucerne", "lugano", "lund", "luxembourg-city", "lyon", "maastricht", "madrid", "malaga", "malmo", "manchester", "mantua", "marbella", "marseille", "matera", "megeve", "memmingen", "menorca", "merano", "metz", "milan", "modena", "monaco", "montpellier", "montreux", "moscow", "mostar", "mulhouse", "munich", "murcia", "nafplio", "nantes", "naples", "narbonne", "naxos", "neuchatel", "newcastle", "nice", "nimes", "nuremberg", "oban", "obidos", "odense", "ohrid", "olbia", "olot", "orvieto", "oslo", "ostend", "oviedo", "oxford", "padua", "palermo", "pamplona", "paris", "parma", "pau", "perpignan", "perugia", "pescara", "pisa", "pistoia", "plovdiv", "poitiers", "pompeii", "porto", "portofino", "potsdam", "prague", "preveza", "pula", "ravenna", "reims", "rennes", "rhodes", "riga", "rimini", "rome", "rothenburg", "rouen", "rovaniemi", "rovinj", "salamanca", "salerno", "salzburg", "san-gimignano", "san-sebastian", "santander", "santorini", "sarajevo", "sardinia", "savona", "scarborough", "segovia", "seville", "sibenik", "sibiu", "siena", "sintra", "sion", "sirmione", "sitges", "skopje", "sofia", "sorrento", "split", "st-andrews", "st-moritz", "stirling", "stockholm", "stresa", "strasbourg", "stuttgart", "suzdal", "swansea", "tallinn", "tampere", "tarragona", "taormina", "tavira", "tenerife", "thessaloniki", "tirana", "toledo", "torino", "toulon", "toulouse", "tours", "trento", "trieste", "trogir", "tromso", "trondheim", "turin", "turku", "ubeda", "utrecht", "valencia", "valletta", "vannes", "varna", "vatican", "venice", "verona", "versailles", "vicenza", "vienna", "vigo", "vilnius", "visby", "warsaw", "windsor", "wroclaw", "york", "zadar", "zagreb", "zakopane", "zaragoza", "zermatt", "zurich",
  ],
};

// Curated candidates: slug|name|countrySlug|CC|countryName|wikiTitle|region
const RAW = `
# EUROPE
aalborg|Aalborg|denmark|DK|Denmark|Aalborg|europe
abano-terme|Abano Terme|italy|IT|Italy|Abano Terme|europe
abrantes|Abrantes|portugal|PT|Portugal|Abrantes|europe
aix-les-bains|Aix-les-Bains|france|FR|France|Aix-les-Bains|europe
alba-iulia|Alba Iulia|romania|RO|Romania|Alba Iulia|europe
albi|Albi|france|FR|France|Albi|europe
alcobaca|Alcobaça|portugal|PT|Portugal|Alcobaça|europe
almeria|Almería|spain|ES|Spain|Almería|europe
amersfoort|Amersfoort|netherlands|NL|Netherlands|Amersfoort|europe
annecy|Annecy|france|FR|France|Annecy|europe
arcos-de-valdevez|Arcos de Valdevez|portugal|PT|Portugal|Arcos de Valdevez|europe
argostoli|Argostoli|greece|GR|Greece|Argostoli|europe
astorga|Astorga|spain|ES|Spain|Astorga|europe
avila|Ávila|spain|ES|Spain|Ávila, Spain|europe
bad-homburg|Bad Homburg|germany|DE|Germany|Bad Homburg vor der Höhe|europe
banff-scotland|Banff|united-kingdom|GB|United Kingdom|Banff, Aberdeenshire|europe
bayonne|Bayonne|france|FR|France|Bayonne|europe
beauvais|Beauvais|france|FR|France|Beauvais|europe
belluno|Belluno|italy|IT|Italy|Belluno|europe
bergamo|Bergamo|italy|IT|Italy|Bergamo|europe
bregenz|Bregenz|austria|AT|Austria|Bregenz|europe
bremen|Bremen|germany|DE|Germany|Bremen|europe
brindisi|Brindisi|italy|IT|Italy|Brindisi|europe
bournemouth|Bournemouth|united-kingdom|GB|United Kingdom|Bournemouth|europe
cadiz|Cádiz|spain|ES|Spain|Cádiz|europe
caen|Caen|france|FR|France|Caen|europe
camogli|Camogli|italy|IT|Italy|Camogli|europe
canterbury|Canterbury|united-kingdom|GB|United Kingdom|Canterbury|europe
caserta|Caserta|italy|IT|Italy|Caserta|europe
cattolica|Cattolica|italy|IT|Italy|Cattolica|europe
chartres|Chartres|france|FR|France|Chartres|europe
chieti|Chieti|italy|IT|Italy|Chieti|europe
civitavecchia|Civitavecchia|italy|IT|Italy|Civitavecchia|europe
clermont-ferrand|Clermont-Ferrand|france|FR|France|Clermont-Ferrand|europe
como|Como|italy|IT|Italy|Como|europe
conwy|Conwy|united-kingdom|GB|United Kingdom|Conwy|europe
coventry|Coventry|united-kingdom|GB|United Kingdom|Coventry|europe
crotone|Crotone|italy|IT|Italy|Crotone|europe
dordrecht|Dordrecht|netherlands|NL|Netherlands|Dordrecht|europe
dumfries|Dumfries|united-kingdom|GB|United Kingdom|Dumfries|europe
dunkirk|Dunkirk|france|FR|France|Dunkirk|europe
durham|Durham|united-kingdom|GB|United Kingdom|Durham, England|europe
eindhoven|Eindhoven|netherlands|NL|Netherlands|Eindhoven|europe
empoli|Empoli|italy|IT|Italy|Empoli|europe
engelberg|Engelberg|switzerland|CH|Switzerland|Engelberg|europe
erice|Erice|italy|IT|Italy|Erice|europe
exeter|Exeter|united-kingdom|GB|United Kingdom|Exeter|europe
figueres|Figueres|spain|ES|Spain|Figueres|europe
foz-do-douro|Foz do Douro|portugal|PT|Portugal|Foz do Douro|europe
girona|Girona|spain|ES|Spain|Girona|europe
grenoble|Grenoble|france|FR|France|Grenoble|europe
groningen|Groningen|netherlands|NL|Netherlands|Groningen|europe
huelva|Huelva|spain|ES|Spain|Huelva|europe
jaen|Jaén|spain|ES|Spain|Jaén, Spain|europe
jerez|Jerez de la Frontera|spain|ES|Spain|Jerez de la Frontera|europe
kassel|Kassel|germany|DE|Germany|Kassel|europe
kiel|Kiel|germany|DE|Germany|Kiel|europe
la-rochelle|La Rochelle|france|FR|France|La Rochelle|europe
lancaster|Lancaster|united-kingdom|GB|United Kingdom|Lancaster, Lancashire|europe
larissa|Larissa|greece|GR|Greece|Larissa|europe
le-havre|Le Havre|france|FR|France|Le Havre|europe
le-mans|Le Mans|france|FR|France|Le Mans|europe
leeds|Leeds|united-kingdom|GB|United Kingdom|Leeds|europe
leiden|Leiden|netherlands|NL|Netherlands|Leiden|europe
leon|León|spain|ES|Spain|León, Spain|europe
levico-terme|Levico Terme|italy|IT|Italy|Levico Terme|europe
liege|Liège|belgium|BE|Belgium|Liège|europe
limoges|Limoges|france|FR|France|Limoges|europe
linz|Linz|austria|AT|Austria|Linz|europe
llandudno|Llandudno|united-kingdom|GB|United Kingdom|Llandudno|europe
locarno|Locarno|switzerland|CH|Switzerland|Locarno|europe
lodi|Lodi|italy|IT|Italy|Lodi, Lombardy|europe
lourdes|Lourdes|france|FR|France|Lourdes|europe
lubeck|Lübeck|germany|DE|Germany|Lübeck|europe
memmingen|Memmingen|germany|DE|Germany|Memmingen|europe
menorca|Menorca|spain|ES|Spain|Menorca|europe
merano|Merano|italy|IT|Italy|Merano|europe
metz|Metz|france|FR|France|Metz|europe
mulhouse|Mulhouse|france|FR|France|Mulhouse|europe
murcia|Murcia|spain|ES|Spain|Murcia|europe
narbonne|Narbonne|france|FR|France|Narbonne|europe
naxos|Naxos|greece|GR|Greece|Naxos|europe
neuchatel|Neuchâtel|switzerland|CH|Switzerland|Neuchâtel|europe
newcastle|Newcastle upon Tyne|united-kingdom|GB|United Kingdom|Newcastle upon Tyne|europe
oban|Oban|united-kingdom|GB|United Kingdom|Oban|europe
olot|Olot|spain|ES|Spain|Olot|europe
ostend|Ostend|belgium|BE|Belgium|Ostend|europe
oviedo|Oviedo|spain|ES|Spain|Oviedo|europe
pamplona|Pamplona|spain|ES|Spain|Pamplona|europe
pau|Pau|france|FR|France|Pau, Pyrénées-Atlantiques|europe
perpignan|Perpignan|france|FR|France|Perpignan|europe
pescara|Pescara|italy|IT|Italy|Pescara|europe
pistoia|Pistoia|italy|IT|Italy|Pistoia|europe
poitiers|Poitiers|france|FR|France|Poitiers|europe
preveza|Preveza|greece|GR|Greece|Preveza|europe
rennes|Rennes|france|FR|France|Rennes|europe
salerno|Salerno|italy|IT|Italy|Salerno|europe
santander|Santander|spain|ES|Spain|Santander, Spain|europe
savona|Savona|italy|IT|Italy|Savona|europe
scarborough|Scarborough|united-kingdom|GB|United Kingdom|Scarborough, North Yorkshire|europe
stresa|Stresa|italy|IT|Italy|Stresa|europe
stuttgart|Stuttgart|germany|DE|Germany|Stuttgart|europe
swansea|Swansea|united-kingdom|GB|United Kingdom|Swansea|europe
tarragona|Tarragona|spain|ES|Spain|Tarragona|europe
tavira|Tavira|portugal|PT|Portugal|Tavira|europe
tenerife|Santa Cruz de Tenerife|spain|ES|Spain|Santa Cruz de Tenerife|europe
toulon|Toulon|france|FR|France|Toulon|europe
tours|Tours|france|FR|France|Tours, France|europe
ubeda|Úbeda|spain|ES|Spain|Úbeda|europe
vannes|Vannes|france|FR|France|Vannes|europe
vigo|Vigo|spain|ES|Spain|Vigo|europe
windsor|Windsor|united-kingdom|GB|United Kingdom|Windsor, Berkshire|europe
zaragoza|Zaragoza|spain|ES|Spain|Zaragoza|europe
bansko|Bansko|bulgaria|BG|Bulgaria|Bansko|europe
balchik|Balchik|bulgaria|BG|Bulgaria|Balchik|europe
devin|Devin|bulgaria|BG|Bulgaria|Devin, Bulgaria|europe
gabrovo|Gabrovo|bulgaria|BG|Bulgaria|Gabrovo|europe
kavarna|Kavarna|bulgaria|BG|Bulgaria|Kavarna|europe
kazanlak|Kazanlak|bulgaria|BG|Bulgaria|Kazanlak|europe
melnik|Melnik|bulgaria|BG|Bulgaria|Melnik, Bulgaria|europe
sandanski|Sandanski|bulgaria|BG|Bulgaria|Sandanski|europe
smolyan|Smolyan|bulgaria|BG|Bulgaria|Smolyan|europe
tryavna|Tryavna|bulgaria|BG|Bulgaria|Tryavna|europe
velingrad|Velingrad|bulgaria|BG|Bulgaria|Velingrad|europe
jajce|Jajce|bosnia-and-herzegovina|BA|Bosnia and Herzegovina|Jajce|europe
neum|Neum|bosnia-and-herzegovina|BA|Bosnia and Herzegovina|Neum|europe
travnik|Travnik|bosnia-and-herzegovina|BA|Bosnia and Herzegovina|Travnik|europe
trebinje|Trebinje|bosnia-and-herzegovina|BA|Bosnia and Herzegovina|Trebinje|europe
durres|Durrës|albania|AL|Albania|Durrës|europe
himare|Himarë|albania|AL|Albania|Himarë|europe
ksamil|Ksamil|albania|AL|Albania|Ksamil|europe
pogradec|Pogradec|albania|AL|Albania|Pogradec|europe
bol|Bol|croatia|HR|Croatia|Bol, Brač|europe
brac|Supetar|croatia|HR|Croatia|Supetar|europe
groznjan|Grožnjan|croatia|HR|Croatia|Grožnjan|europe
hum|Hum|croatia|HR|Croatia|Hum, Croatia|europe
korcula|Korčula|croatia|HR|Croatia|Korčula (town)|europe
labin|Labin|croatia|HR|Croatia|Labin|europe
makarska|Makarska|croatia|HR|Croatia|Makarska|europe
motovun|Motovun|croatia|HR|Croatia|Motovun|europe
novalja|Novalja|croatia|HR|Croatia|Novalja|europe
omis|Omiš|croatia|HR|Croatia|Omiš|europe
pag|Pag|croatia|HR|Croatia|Pag (town)|europe
rab|Rab|croatia|HR|Croatia|Rab (town)|europe
bovec|Bovec|slovenia|SI|Slovenia|Bovec|europe
izola|Izola|slovenia|SI|Slovenia|Izola|europe
kobarid|Kobarid|slovenia|SI|Slovenia|Kobarid|europe
kranjska-gora|Kranjska Gora|slovenia|SI|Slovenia|Kranjska Gora|europe
portoroz|Portorož|slovenia|SI|Slovenia|Portorož|europe
postojna|Postojna|slovenia|SI|Slovenia|Postojna|europe
ptuj|Ptuj|slovenia|SI|Slovenia|Ptuj|europe
tolmin|Tolmin|slovenia|SI|Slovenia|Tolmin|europe
zabljak|Žabljak|montenegro|ME|Montenegro|Žabljak|europe
eger|Eger|hungary|HU|Hungary|Eger|europe
esztergom|Esztergom|hungary|HU|Hungary|Esztergom|europe
godollo|Gödöllő|hungary|HU|Hungary|Gödöllő|europe
heviz|Hévíz|hungary|HU|Hungary|Hévíz|europe
holloko|Hollókő|hungary|HU|Hungary|Hollókő|europe
keszthely|Keszthely|hungary|HU|Hungary|Keszthely|europe
siofok|Siófok|hungary|HU|Hungary|Siófok|europe
sopron|Sopron|hungary|HU|Hungary|Sopron|europe
szentendre|Szentendre|hungary|HU|Hungary|Szentendre|europe
szekesfehervar|Székesfehérvár|hungary|HU|Hungary|Székesfehérvár|europe
tihany|Tihany|hungary|HU|Hungary|Tihany|europe
tokaj|Tokaj|hungary|HU|Hungary|Tokaj|europe
vac|Vác|hungary|HU|Hungary|Vác|europe
bialowieza|Białystok|poland|PL|Poland|Białystok|europe
bydgoszcz|Bydgoszcz|poland|PL|Poland|Bydgoszcz|europe
gdynia|Gdynia|poland|PL|Poland|Gdynia|europe
hel|Hel|poland|PL|Poland|Hel, Poland|europe
kazimierz-dolny|Kazimierz Dolny|poland|PL|Poland|Kazimierz Dolny|europe
katowice|Katowice|poland|PL|Poland|Katowice|europe
lublin|Lublin|poland|PL|Poland|Lublin|europe
malbork|Malbork|poland|PL|Poland|Malbork|europe
mikolajki|Mikołajki|poland|PL|Poland|Mikołajki|europe
olsztyn|Olsztyn|poland|PL|Poland|Olsztyn|europe
poznan|Poznań|poland|PL|Poland|Poznań|europe
sandomierz|Sandomierz|poland|PL|Poland|Sandomierz|europe
sopot|Sopot|poland|PL|Poland|Sopot|europe
szczecin|Szczecin|poland|PL|Poland|Szczecin|europe
torun|Toruń|poland|PL|Poland|Toruń|europe
zamosc|Zamość|poland|PL|Poland|Zamość|europe
hluboka|Hluboká nad Vltavou|czechia|CZ|Czechia|Hluboká nad Vltavou|europe
jindrichuv-hradec|Jindřichův Hradec|czechia|CZ|Czechia|Jindřichův Hradec|europe
karlstejn|Karlštejn|czechia|CZ|Czechia|Karlštejn|europe
kromeriz|Kroměříž|czechia|CZ|Czechia|Kroměříž|europe
lednice|Lednice|czechia|CZ|Czechia|Lednice|europe
litomysl|Litomyšl|czechia|CZ|Czechia|Litomyšl|europe
mikulov|Mikulov|czechia|CZ|Czechia|Mikulov|europe
olomouc|Olomouc|czechia|CZ|Czechia|Olomouc|europe
ostrava|Ostrava|czechia|CZ|Czechia|Ostrava|europe
pilsen|Plzeň|czechia|CZ|Czechia|Plzeň|europe
trebic|Třebíč|czechia|CZ|Czechia|Třebíč|europe
trebon|Třeboň|czechia|CZ|Czechia|Třeboň|europe
znojmo|Znojmo|czechia|CZ|Czechia|Znojmo|europe
haapsalu|Haapsalu|estonia|EE|Estonia|Haapsalu|europe
kuressaare|Kuressaare|estonia|EE|Estonia|Kuressaare|europe
narva|Narva|estonia|EE|Estonia|Narva|europe
parnu|Pärnu|estonia|EE|Estonia|Pärnu|europe
rakvere|Rakvere|estonia|EE|Estonia|Rakvere|europe
tartu|Tartu|estonia|EE|Estonia|Tartu|europe
viljandi|Viljandi|estonia|EE|Estonia|Viljandi|europe
cesis|Cēsis|latvia|LV|Latvia|Cēsis|europe
kuldiga|Kuldīga|latvia|LV|Latvia|Kuldīga|europe
sigulda|Sigulda|latvia|LV|Latvia|Sigulda|europe
valmiera|Valmiera|latvia|LV|Latvia|Valmiera|europe
alytus|Alytus|lithuania|LT|Lithuania|Alytus|europe
druskininkai|Druskininkai|lithuania|LT|Lithuania|Druskininkai|europe
marijampole|Marijampolė|lithuania|LT|Lithuania|Marijampolė|europe
nida|Nida|lithuania|LT|Lithuania|Nida, Lithuania|europe
palanga|Palanga|lithuania|LT|Lithuania|Palanga|europe
trakai|Trakai|lithuania|LT|Lithuania|Trakai|europe
oradea|Oradea|romania|RO|Romania|Oradea|europe
poiana-brasov|Poiana Brașov|romania|RO|Romania|Poiana Brașov|europe
predeal|Predeal|romania|RO|Romania|Predeal|europe
suceava|Suceava|romania|RO|Romania|Suceava|europe
subotica|Subotica|serbia|RS|Serbia|Subotica|europe
zlatibor|Zlatibor|serbia|RS|Serbia|Zlatibor|europe
mavrovo|Mavrovo|north-macedonia|MK|North Macedonia|Mavrovo|europe
prilep|Prilep|north-macedonia|MK|North Macedonia|Prilep|europe
tetovo|Tetovo|north-macedonia|MK|North Macedonia|Tetovo|europe
# ASIA
nagasaki|Nagasaki|japan|JP|Japan|Nagasaki|asia
kumamoto|Kumamoto|japan|JP|Japan|Kumamoto|asia
kagoshima|Kagoshima|japan|JP|Japan|Kagoshima|asia
matsuyama|Matsuyama|japan|JP|Japan|Matsuyama|asia
kurashiki|Kurashiki|japan|JP|Japan|Kurashiki|asia
matsue|Matsue|japan|JP|Japan|Matsue|asia
tottori|Tottori|japan|JP|Japan|Tottori|asia
toyama|Toyama|japan|JP|Japan|Toyama|asia
nagano|Nagano|japan|JP|Japan|Nagano (city)|asia
matsumoto|Matsumoto|japan|JP|Japan|Matsumoto, Nagano|asia
karuizawa|Karuizawa|japan|JP|Japan|Karuizawa, Nagano|asia
hakuba|Hakuba|japan|JP|Japan|Hakuba, Nagano|asia
niseko|Niseko|japan|JP|Japan|Niseko|asia
otaru|Otaru|japan|JP|Japan|Otaru|asia
hakodate|Hakodate|japan|JP|Japan|Hakodate|asia
asahikawa|Asahikawa|japan|JP|Japan|Asahikawa|asia
furano|Furano|japan|JP|Japan|Furano|asia
biei|Biei|japan|JP|Japan|Biei, Hokkaidō|asia
noboribetsu|Noboribetsu|japan|JP|Japan|Noboribetsu|asia
yufuin|Yufuin|japan|JP|Japan|Yufuin|asia
atami|Atami|japan|JP|Japan|Atami|asia
izu|Itō|japan|JP|Japan|Itō, Shizuoka|asia
kawaguchiko|Fujikawaguchiko|japan|JP|Japan|Fujikawaguchiko|asia
shirakawa-go|Shirakawa|japan|JP|Japan|Shirakawa, Gifu|asia
gifu|Gifu|japan|JP|Japan|Gifu|asia
yokohama|Yokohama|japan|JP|Japan|Yokohama|asia
miyajima|Hatsukaichi|japan|JP|Japan|Hatsukaichi, Hiroshima|asia
miyakojima|Miyakojima|japan|JP|Japan|Miyakojima|asia
naha|Naha|japan|JP|Japan|Naha|asia
wakayama|Wakayama|japan|JP|Japan|Wakayama (city)|asia
koyasan|Kōya|japan|JP|Japan|Mount Kōya|asia
naoshima|Naoshima|japan|JP|Japan|Naoshima|asia
takamatsu|Takamatsu|japan|JP|Japan|Takamatsu|asia
miyazaki|Miyazaki|japan|JP|Japan|Miyazaki (city)|asia
beppu|Beppu|japan|JP|Japan|Beppu|asia
nara|Nara|japan|JP|Japan|Nara (city)|asia
nikko|Nikko|japan|JP|Japan|Nikkō|asia
kanazawa|Kanazawa|japan|JP|Japan|Kanazawa|asia
takayama|Takayama|japan|JP|Japan|Takayama, Gifu|asia
hiroshima|Hiroshima|japan|JP|Japan|Hiroshima|asia
fukuoka|Fukuoka|japan|JP|Japan|Fukuoka|asia
sapporo|Sapporo|japan|JP|Japan|Sapporo|asia
hakone|Hakone|japan|JP|Japan|Hakone|asia
kamakura|Kamakura|japan|JP|Japan|Kamakura|asia
okayama|Okayama|japan|JP|Japan|Okayama|asia
nagoya|Nagoya|japan|JP|Japan|Nagoya|asia
ishigaki|Ishigaki|japan|JP|Japan|Ishigaki|asia
shimla|Shimla|india|IN|India|Shimla|asia
mussoorie|Mussoorie|india|IN|India|Mussoorie|asia
nainital|Nainital|india|IN|India|Nainital|asia
rishikesh|Rishikesh|india|IN|India|Rishikesh|asia
varanasi|Varanasi|india|IN|India|Varanasi|asia
pushkar|Pushkar|india|IN|India|Pushkar|asia
udaipur|Udaipur|india|IN|India|Udaipur|asia
jaipur|Jaipur|india|IN|India|Jaipur|asia
jodhpur|Jodhpur|india|IN|India|Jodhpur|asia
jaisalmer|Jaisalmer|india|IN|India|Jaisalmer|asia
amritsar|Amritsar|india|IN|India|Amritsar|asia
agra|Agra|india|IN|India|Agra|asia
khajuraho|Khajuraho|india|IN|India|Khajuraho|asia
orchha|Orchha|india|IN|India|Orchha|asia
munnar|Munnar|india|IN|India|Munnar|asia
kochi|Kochi|india|IN|India|Kochi|asia
alleppey|Alappuzha|india|IN|India|Alappuzha|asia
goa|Goa|india|IN|India|Goa|asia
hampi|Hampi|india|IN|India|Hampi|asia
mysore|Mysuru|india|IN|India|Mysuru|asia
coorg|Madikeri|india|IN|India|Madikeri|asia
ooty|Ooty|india|IN|India|Ooty|asia
pondicherry|Puducherry|india|IN|India|Puducherry|asia
mahabalipuram|Mahabalipuram|india|IN|India|Mahabalipuram|asia
gangtok|Gangtok|india|IN|India|Gangtok|asia
leh|Leh|india|IN|India|Leh|asia
srinagar|Srinagar|india|IN|India|Srinagar|asia
dharamshala|Dharamshala|india|IN|India|Dharamshala|asia
mcleod-ganj|McLeod Ganj|india|IN|India|McLeod Ganj|asia
shillong|Shillong|india|IN|India|Shillong|asia
kohima|Kohima|india|IN|India|Kohima|asia
imphal|Imphal|india|IN|India|Imphal|asia
tawang|Tawang|india|IN|India|Tawang|asia
kodaikanal|Kodaikanal|india|IN|India|Kodaikanal|asia
thekkady|Thekkady|india|IN|India|Thekkady|asia
varkala|Varkala|india|IN|India|Varkala|asia
kovalam|Kovalam|india|IN|India|Kovalam|asia
wayanad|Wayanad|india|IN|India|Wayanad district|asia
chittorgarh|Chittorgarh|india|IN|India|Chittorgarh|asia
bikaner|Bikaner|india|IN|India|Bikaner|asia
mount-abu|Mount Abu|india|IN|India|Mount Abu|asia
ranthambore|Sawai Madhopur|india|IN|India|Sawai Madhopur|asia
bandhavgarh|Bandhavgarh|india|IN|India|Bandhavgarh National Park|asia
kanha|Kanha|india|IN|India|Kanha National Park|asia
penang|George Town|malaysia|MY|Malaysia|George Town, Penang|asia
langkawi|Langkawi|malaysia|MY|Malaysia|Langkawi|asia
malacca|Malacca City|malaysia|MY|Malaysia|Malacca City|asia
ipoh|Ipoh|malaysia|MY|Malaysia|Ipoh|asia
kota-kinabalu|Kota Kinabalu|malaysia|MY|Malaysia|Kota Kinabalu|asia
kuching|Kuching|malaysia|MY|Malaysia|Kuching|asia
cameron-highlands|Cameron Highlands|malaysia|MY|Malaysia|Cameron Highlands|asia
tioman|Tioman Island|malaysia|MY|Malaysia|Tioman Island|asia
perhentian|Perhentian Islands|malaysia|MY|Malaysia|Perhentian Islands|asia
redang|Redang Island|malaysia|MY|Malaysia|Redang Island|asia
luang-prabang|Luang Prabang|laos|LA|Laos|Luang Prabang|asia
vientiane|Vientiane|laos|LA|Laos|Vientiane|asia
vang-vieng|Vang Vieng|laos|LA|Laos|Vang Vieng|asia
pakse|Pakse|laos|LA|Laos|Pakse|asia
siem-reap|Siem Reap|cambodia|KH|Cambodia|Siem Reap|asia
phnom-penh|Phnom Penh|cambodia|KH|Cambodia|Phnom Penh|asia
battambang|Battambang|cambodia|KH|Cambodia|Battambang|asia
kampot|Kampot|cambodia|KH|Cambodia|Kampot|asia
sihanoukville|Sihanoukville|cambodia|KH|Cambodia|Sihanoukville|asia
hoi-an|Hoi An|vietnam|VN|Vietnam|Hoi An|asia
hue|Huế|vietnam|VN|Vietnam|Huế|asia
da-nang|Da Nang|vietnam|VN|Vietnam|Da Nang|asia
nha-trang|Nha Trang|vietnam|VN|Vietnam|Nha Trang|asia
phu-quoc|Phu Quoc|vietnam|VN|Vietnam|Phú Quốc|asia
sapa|Sapa|vietnam|VN|Vietnam|Sa Pa|asia
ha-long|Ha Long|vietnam|VN|Vietnam|Hạ Long|asia
ninh-binh|Ninh Binh|vietnam|VN|Vietnam|Ninh Bình|asia
mai-chau|Mai Chau|vietnam|VN|Vietnam|Mai Châu|asia
dalat|Da Lat|vietnam|VN|Vietnam|Da Lat|asia
mui-ne|Mui Ne|vietnam|VN|Vietnam|Mũi Né|asia
con-dao|Con Dao|vietnam|VN|Vietnam|Côn Đảo|asia
chiang-mai|Chiang Mai|thailand|TH|Thailand|Chiang Mai|asia
chiang-rai|Chiang Rai|thailand|TH|Thailand|Chiang Rai|asia
pai|Pai|thailand|TH|Thailand|Pai, Thailand|asia
krabi|Krabi|thailand|TH|Thailand|Krabi|asia
koh-samui|Koh Samui|thailand|TH|Thailand|Ko Samui|asia
koh-phangan|Koh Phangan|thailand|TH|Thailand|Ko Pha-ngan|asia
koh-tao|Koh Tao|thailand|TH|Thailand|Ko Tao|asia
koh-phi-phi|Koh Phi Phi|thailand|TH|Thailand|Phi Phi Islands|asia
koh-lanta|Koh Lanta|thailand|TH|Thailand|Ko Lanta|asia
koh-lipe|Koh Lipe|thailand|TH|Thailand|Ko Lipe|asia
khao-lak|Khao Lak|thailand|TH|Thailand|Khao Lak|asia
hua-hin|Hua Hin|thailand|TH|Thailand|Hua Hin|asia
ayutthaya|Ayutthaya|thailand|TH|Thailand|Ayutthaya|asia
kanchanaburi|Kanchanaburi|thailand|TH|Thailand|Kanchanaburi|asia
pattaya|Pattaya|thailand|TH|Thailand|Pattaya|asia
phuket|Phuket|thailand|TH|Thailand|Phuket|asia
sukhothai|Sukhothai|thailand|TH|Thailand|Sukhothai|asia
lombok|Mataram|indonesia|ID|Indonesia|Mataram|asia
yogyakarta|Yogyakarta|indonesia|ID|Indonesia|Yogyakarta|asia
bali|Denpasar|indonesia|ID|Indonesia|Denpasar|asia
ubud|Ubud|indonesia|ID|Indonesia|Ubud|asia
labuan-bajo|Labuan Bajo|indonesia|ID|Indonesia|Labuan Bajo|asia
komodo|Labuan Bajo|indonesia|ID|Indonesia|Komodo National Park|asia
bromo|Probolinggo|indonesia|ID|Indonesia|Mount Bromo|asia
bandung|Bandung|indonesia|ID|Indonesia|Bandung|asia
surabaya|Surabaya|indonesia|ID|Indonesia|Surabaya|asia
makassar|Makassar|indonesia|ID|Indonesia|Makassar|asia
raja-ampat|Waisai|indonesia|ID|Indonesia|Raja Ampat|asia
gili-islands|Gili Islands|indonesia|ID|Indonesia|Gili Islands|asia
lombok-senggigi|Senggigi|indonesia|ID|Indonesia|Senggigi|asia
nusa-penida|Nusa Penida|indonesia|ID|Indonesia|Nusa Penida|asia
nusa-lembongan|Nusa Lembongan|indonesia|ID|Indonesia|Nusa Lembongan|asia
bohol|Tagbilaran|philippines|PH|Philippines|Tagbilaran|asia
cebu|Cebu City|philippines|PH|Philippines|Cebu City|asia
palawan|Puerto Princesa|philippines|PH|Philippines|Puerto Princesa|asia
boracay|Boracay|philippines|PH|Philippines|Boracay|asia
siargao|Siargao|philippines|PH|Philippines|Siargao|asia
el-nido|El Nido|philippines|PH|Philippines|El Nido, Palawan|asia
coron|Coron|philippines|PH|Philippines|Coron, Palawan|asia
vigan|Vigan|philippines|PH|Philippines|Vigan|asia
banaue|Banaue|philippines|PH|Philippines|Banaue|asia
sagada|Sagada|philippines|PH|Philippines|Sagada|asia
baguio|Baguio|philippines|PH|Philippines|Baguio|asia
davao|Davao City|philippines|PH|Philippines|Davao City|asia
bohol-panglao|Panglao|philippines|PH|Philippines|Panglao|asia
colombo|Colombo|sri-lanka|LK|Sri Lanka|Colombo|asia
kandy|Kandy|sri-lanka|LK|Sri Lanka|Kandy|asia
galle|Galle|sri-lanka|LK|Sri Lanka|Galle|asia
ella|Ella|sri-lanka|LK|Sri Lanka|Ella, Sri Lanka|asia
sigiriya|Sigiriya|sri-lanka|LK|Sri Lanka|Sigiriya|asia
mirissa|Mirissa|sri-lanka|LK|Sri Lanka|Mirissa|asia
trincomalee|Trincomalee|sri-lanka|LK|Sri Lanka|Trincomalee|asia
jaffna|Jaffna|sri-lanka|LK|Sri Lanka|Jaffna|asia
unawatuna|Unawatuna|sri-lanka|LK|Sri Lanka|Unawatuna|asia
nuwara-eliya|Nuwara Eliya|sri-lanka|LK|Sri Lanka|Nuwara Eliya|asia
kathmandu|Kathmandu|nepal|NP|Nepal|Kathmandu|asia
pokhara|Pokhara|nepal|NP|Nepal|Pokhara|asia
bhaktapur|Bhaktapur|nepal|NP|Nepal|Bhaktapur|asia
chitwan|Chitwan|nepal|NP|Nepal|Chitwan National Park|asia
lhasa|Lhasa|china|CN|China|Lhasa|asia
lijiang|Lijiang|china|CN|China|Lijiang|asia
dali|Dali|china|CN|China|Dali City|asia
guilin|Guilin|china|CN|China|Guilin|asia
yangshuo|Yangshuo|china|CN|China|Yangshuo County|asia
zhangjiajie|Zhangjiajie|china|CN|China|Zhangjiajie|asia
huangshan|Huangshan City|china|CN|China|Huangshan City|asia
pingyao|Pingyao|china|CN|China|Pingyao|asia
chengdu|Chengdu|china|CN|China|Chengdu|asia
xian|Xi'an|china|CN|China|Xi'an|asia
hangzhou|Hangzhou|china|CN|China|Hangzhou|asia
suzhou|Suzhou|china|CN|China|Suzhou|asia
kunming|Kunming|china|CN|China|Kunming|asia
qingdao|Qingdao|china|CN|China|Qingdao|asia
xiamen|Xiamen|china|CN|China|Xiamen|asia
harbin|Harbin|china|CN|China|Harbin|asia
dalian|Dalian|china|CN|China|Dalian|asia
sanya|Sanya|china|CN|China|Sanya|asia
jiuzhaigou|Jiuzhaigou|china|CN|China|Jiuzhaigou|asia
emei-shan|Emeishan|china|CN|China|Mount Emei|asia
tibet-shigatse|Shigatse|china|CN|China|Shigatse|asia
hong-kong|Hong Kong|china|CN|China|Hong Kong|asia
macau|Macau|china|CN|China|Macau|asia
taipei|Taipei|taiwan|TW|Taiwan|Taipei|asia
taichung|Taichung|taiwan|TW|Taiwan|Taichung|asia
tainan|Tainan|taiwan|TW|Taiwan|Tainan|asia
kaohsiung|Kaohsiung|taiwan|TW|Taiwan|Kaohsiung|asia
hualien|Hualien|taiwan|TW|Taiwan|Hualien City|asia
kenting|Kenting|taiwan|TW|Taiwan|Kenting National Park|asia
jiufen|Jiufen|taiwan|TW|Taiwan|Jiufen|asia
busan|Busan|south-korea|KR|South Korea|Busan|asia
jeju|Jeju City|south-korea|KR|South Korea|Jeju City|asia
jeonju|Jeonju|south-korea|KR|South Korea|Jeonju|asia
gyeongju|Gyeongju|south-korea|KR|South Korea|Gyeongju|asia
andong|Andong|south-korea|KR|South Korea|Andong|asia
sokcho|Sokcho|south-korea|KR|South Korea|Sokcho|asia
gangneung|Gangneung|south-korea|KR|South Korea|Gangneung|asia
suwon|Suwon|south-korea|KR|South Korea|Suwon|asia
daejeon|Daejeon|south-korea|KR|South Korea|Daejeon|asia
gapyeong|Gapyeong|south-korea|KR|South Korea|Gapyeong County|asia
yangyang|Yangyang|south-korea|KR|South Korea|Yangyang County|asia
tongyeong|Tongyeong|south-korea|KR|South Korea|Tongyeong|asia
yeosu|Yeosu|south-korea|KR|South Korea|Yeosu|asia
ulsan|Ulsan|south-korea|KR|South Korea|Ulsan|asia
incheon|Incheon|south-korea|KR|South Korea|Incheon|asia
daegu|Daegu|south-korea|KR|South Korea|Daegu|asia
ulaanbaatar|Ulaanbaatar|mongolia|MN|Mongolia|Ulaanbaatar|asia
kharkhorin|Kharkhorin|mongolia|MN|Mongolia|Kharkhorin|asia
dalanzadgad|Dalanzadgad|mongolia|MN|Mongolia|Dalanzadgad|asia
bishkek|Bishkek|kyrgyzstan|KG|Kyrgyzstan|Bishkek|asia
karakol|Karakol|kyrgyzstan|KG|Kyrgyzstan|Karakol|asia
osh|Osh|kyrgyzstan|KG|Kyrgyzstan|Osh|asia
almaty|Almaty|kazakhstan|KZ|Kazakhstan|Almaty|asia
astana|Astana|kazakhstan|KZ|Kazakhstan|Astana|asia
shymkent|Shymkent|kazakhstan|KZ|Kazakhstan|Shymkent|asia
tashkent|Tashkent|uzbekistan|UZ|Uzbekistan|Tashkent|asia
samarkand|Samarkand|uzbekistan|UZ|Uzbekistan|Samarkand|asia
bukhara|Bukhara|uzbekistan|UZ|Uzbekistan|Bukhara|asia
khiva|Khiva|uzbekistan|UZ|Uzbekistan|Khiva|asia
dushanbe|Dushanbe|tajikistan|TJ|Tajikistan|Dushanbe|asia
ashgabat|Ashgabat|turkmenistan|TM|Turkmenistan|Ashgabat|asia
yerevan|Yerevan|armenia|AM|Armenia|Yerevan|asia
dilijan|Dilijan|armenia|AM|Armenia|Dilijan|asia
gyumri|Gyumri|armenia|AM|Armenia|Gyumri|asia
tbilisi|Tbilisi|georgia|GE|Georgia|Tbilisi|asia
batumi|Batumi|georgia|GE|Georgia|Batumi|asia
kutaisi|Kutaisi|georgia|GE|Georgia|Kutaisi|asia
mestia|Mestia|georgia|GE|Georgia|Mestia|asia
kazbegi|Stepantsminda|georgia|GE|Georgia|Stepantsminda|asia
sheki|Sheki|azerbaijan|AZ|Azerbaijan|Shaki, Azerbaijan|asia
baku|Baku|azerbaijan|AZ|Azerbaijan|Baku|asia
gabala|Gabala|azerbaijan|AZ|Azerbaijan|Qabala|asia
yangon|Yangon|myanmar|MM|Myanmar|Yangon|asia
mandalay|Mandalay|myanmar|MM|Myanmar|Mandalay|asia
bagan|Bagan|myanmar|MM|Myanmar|Bagan|asia
inle-lake|Nyaung Shwe|myanmar|MM|Myanmar|Nyaung Shwe|asia
ngapali|Ngapali|myanmar|MM|Myanmar|Ngapali|asia
male|Malé|maldives|MV|Maldives|Malé|asia
maafushi|Maafushi|maldives|MV|Maldives|Maafushi|asia
thulusdhoo|Thulusdhoo|maldives|MV|Maldives|Thulusdhoo|asia
gujo-hachiman|Gujō|japan|JP|Japan|Gujō|asia
magome|Magome|japan|JP|Japan|Magome, Nagano|asia
narai|Narai|japan|JP|Japan|Narai-juku|asia
kusatsu-onsen|Kusatsu|japan|JP|Japan|Kusatsu, Gunma|asia
kinugawa-onsen|Kinugawa Onsen|japan|JP|Japan|Kinugawa Onsen|asia
onomichi|Onomichi|japan|JP|Japan|Onomichi|asia
kotohira|Kotohira|japan|JP|Japan|Kotohira, Kagawa|asia
karatsu|Karatsu|japan|JP|Japan|Karatsu, Saga|asia
enoshima|Enoshima|japan|JP|Japan|Enoshima|asia
nasu|Nasu|japan|JP|Japan|Nasu, Tochigi|asia
dili|Dili|timor-leste|TL|Timor-Leste|Dili|asia
dali|Dali|china|CN|China|Dali City|asia
sanya|Sanya|china|CN|China|Sanya|asia
jiuzhaigou|Jiuzhaigou|china|CN|China|Jiuzhaigou|asia
emei-shan|Emeishan|china|CN|China|Mount Emei|asia
tibet-shigatse|Shigatse|china|CN|China|Shigatse|asia
mcleod-ganj|McLeod Ganj|india|IN|India|McLeod Ganj|asia
dharamshala|Dharamshala|india|IN|India|Dharamshala|asia
gangtok|Gangtok|india|IN|India|Gangtok|asia
tawang|Tawang|india|IN|India|Tawang|asia
kodaikanal|Kodaikanal|india|IN|India|Kodaikanal|asia
thekkady|Thekkady|india|IN|India|Thekkady|asia
varkala|Varkala|india|IN|India|Varkala|asia
kovalam|Kovalam|india|IN|India|Kovalam|asia
wayanad|Wayanad|india|IN|India|Wayanad district|asia
chittorgarh|Chittorgarh|india|IN|India|Chittorgarh|asia
bikaner|Bikaner|india|IN|India|Bikaner|asia
mount-abu|Mount Abu|india|IN|India|Mount Abu|asia
ranthambore|Sawai Madhopur|india|IN|India|Sawai Madhopur|asia
bandhavgarh|Bandhavgarh|india|IN|India|Bandhavgarh National Park|asia
kanha|Kanha|india|IN|India|Kanha National Park|asia
mui-ne|Mui Ne|vietnam|VN|Vietnam|Mũi Né|asia
con-dao|Con Dao|vietnam|VN|Vietnam|Côn Đảo|asia
sukhothai|Sukhothai|thailand|TH|Thailand|Sukhothai|asia
nusa-penida|Nusa Penida|indonesia|ID|Indonesia|Nusa Penida|asia
nusa-lembongan|Nusa Lembongan|indonesia|ID|Indonesia|Nusa Lembongan|asia
lombok-senggigi|Senggigi|indonesia|ID|Indonesia|Senggigi|asia
banaue|Banaue|philippines|PH|Philippines|Banaue|asia
sagada|Sagada|philippines|PH|Philippines|Sagada|asia
ngapali|Ngapali|myanmar|MM|Myanmar|Ngapali|asia
mestia|Mestia|georgia|GE|Georgia|Mestia|asia
kazbegi|Stepantsminda|georgia|GE|Georgia|Stepantsminda|asia
kutaisi|Kutaisi|georgia|GE|Georgia|Kutaisi|asia
gabala|Gabala|azerbaijan|AZ|Azerbaijan|Qabala|asia
karakol|Karakol|kyrgyzstan|KG|Kyrgyzstan|Karakol|asia
osh|Osh|kyrgyzstan|KG|Kyrgyzstan|Osh|asia
kharkhorin|Kharkhorin|mongolia|MN|Mongolia|Kharkhorin|asia
dalanzadgad|Dalanzadgad|mongolia|MN|Mongolia|Dalanzadgad|asia
andong|Andong|south-korea|KR|South Korea|Andong|asia
daejeon|Daejeon|south-korea|KR|South Korea|Daejeon|asia
incheon|Incheon|south-korea|KR|South Korea|Incheon|asia
daegu|Daegu|south-korea|KR|South Korea|Daegu|asia
ulsan|Ulsan|south-korea|KR|South Korea|Ulsan|asia
yeosu|Yeosu|south-korea|KR|South Korea|Yeosu|asia
tongyeong|Tongyeong|south-korea|KR|South Korea|Tongyeong|asia
yangyang|Yangyang|south-korea|KR|South Korea|Yangyang County|asia
gapyeong|Gapyeong|south-korea|KR|South Korea|Gapyeong County|asia
# AMERICAS
memphis|Memphis|united-states|US|United States|Memphis, Tennessee|americas
boulder|Boulder|united-states|US|United States|Boulder, Colorado|americas
sacramento|Sacramento|united-states|US|United States|Sacramento, California|americas
charlotte|Charlotte|united-states|US|United States|Charlotte, North Carolina|americas
raleigh|Raleigh|united-states|US|United States|Raleigh, North Carolina|americas
cincinnati|Cincinnati|united-states|US|United States|Cincinnati|americas
cleveland|Cleveland|united-states|US|United States|Cleveland|americas
detroit|Detroit|united-states|US|United States|Detroit|americas
milwaukee|Milwaukee|united-states|US|United States|Milwaukee|americas
kansas-city|Kansas City|united-states|US|United States|Kansas City, Missouri|americas
st-louis|St. Louis|united-states|US|United States|St. Louis|americas
boise|Boise|united-states|US|United States|Boise, Idaho|americas
spokane|Spokane|united-states|US|United States|Spokane, Washington|americas
santa-cruz|Santa Cruz|united-states|US|United States|Santa Cruz, California|americas
flagstaff|Flagstaff|united-states|US|United States|Flagstaff, Arizona|americas
colorado-springs|Colorado Springs|united-states|US|United States|Colorado Springs, Colorado|americas
fort-collins|Fort Collins|united-states|US|United States|Fort Collins, Colorado|americas
palm-desert|Palm Desert|united-states|US|United States|Palm Desert, California|americas
sarasota|Sarasota|united-states|US|United States|Sarasota, Florida|americas
louisville|Louisville|united-states|US|United States|Louisville, Kentucky|americas
lexington|Lexington|united-states|US|United States|Lexington, Kentucky|americas
pittsburgh|Pittsburgh|united-states|US|United States|Pittsburgh|americas
baltimore|Baltimore|united-states|US|United States|Baltimore|americas
portland-maine|Portland|united-states|US|United States|Portland, Maine|americas
burlington|Burlington|united-states|US|United States|Burlington, Vermont|americas
pasadena|Pasadena|united-states|US|United States|Pasadena, California|americas
oakland|Oakland|united-states|US|United States|Oakland, California|americas
berkeley|Berkeley|united-states|US|United States|Berkeley, California|americas
santa-rosa|Santa Rosa|united-states|US|United States|Santa Rosa, California|americas
reno|Reno|united-states|US|United States|Reno, Nevada|americas
south-lake-tahoe|South Lake Tahoe|united-states|US|United States|South Lake Tahoe, California|americas
truckee|Truckee|united-states|US|United States|Truckee, California|americas
mammoth-lakes|Mammoth Lakes|united-states|US|United States|Mammoth Lakes, California|americas
joshua-tree|Joshua Tree|united-states|US|United States|Joshua Tree, California|americas
grand-junction|Grand Junction|united-states|US|United States|Grand Junction, Colorado|americas
jackson-wy|Jackson|united-states|US|United States|Jackson, Wyoming|americas
cody|Cody|united-states|US|United States|Cody, Wyoming|americas
billings|Billings|united-states|US|United States|Billings, Montana|americas
chattanooga|Chattanooga|united-states|US|United States|Chattanooga, Tennessee|americas
gatlinburg|Gatlinburg|united-states|US|United States|Gatlinburg, Tennessee|americas
roanoke|Roanoke|united-states|US|United States|Roanoke, Virginia|americas
charlottesville|Charlottesville|united-states|US|United States|Charlottesville, Virginia|americas
williamsburg|Williamsburg|united-states|US|United States|Williamsburg, Virginia|americas
virginia-beach|Virginia Beach|united-states|US|United States|Virginia Beach|americas
rehoboth-beach|Rehoboth Beach|united-states|US|United States|Rehoboth Beach, Delaware|americas
cape-may|Cape May|united-states|US|United States|Cape May, New Jersey|americas
providence|Providence|united-states|US|United States|Providence, Rhode Island|americas
myrtle-beach|Myrtle Beach|united-states|US|United States|Myrtle Beach, South Carolina|americas
st-petersburg-fl|St. Petersburg|united-states|US|United States|St. Petersburg, Florida|americas
clearwater|Clearwater|united-states|US|United States|Clearwater, Florida|americas
daytona-beach|Daytona Beach|united-states|US|United States|Daytona Beach, Florida|americas
pensacola|Pensacola|united-states|US|United States|Pensacola, Florida|americas
destin|Destin|united-states|US|United States|Destin, Florida|americas
lafayette|Lafayette|united-states|US|United States|Lafayette, Louisiana|americas
natchez|Natchez|united-states|US|United States|Natchez, Mississippi|americas
oxford-ms|Oxford|united-states|US|United States|Oxford, Mississippi|americas
madison|Madison|united-states|US|United States|Madison, Wisconsin|americas
omaha|Omaha|united-states|US|United States|Omaha, Nebraska|americas
des-moines|Des Moines|united-states|US|United States|Des Moines, Iowa|americas
tacoma|Tacoma|united-states|US|United States|Tacoma, Washington|americas
eugene|Eugene|united-states|US|United States|Eugene, Oregon|americas
bend|Bend|united-states|US|United States|Bend, Oregon|americas
cannon-beach|Cannon Beach|united-states|US|United States|Cannon Beach, Oregon|americas
astoria|Astoria|united-states|US|United States|Astoria, Oregon|americas
annapolis|Annapolis|united-states|US|United States|Annapolis, Maryland|americas
hartford|Hartford|united-states|US|United States|Hartford, Connecticut|americas
new-haven|New Haven|united-states|US|United States|New Haven, Connecticut|americas
buffalo|Buffalo|united-states|US|United States|Buffalo, New York|americas
rochester|Rochester|united-states|US|United States|Rochester, New York|americas
syracuse|Syracuse|united-states|US|United States|Syracuse, New York|americas
albany|Albany|united-states|US|United States|Albany, New York|americas
nags-head|Nags Head|united-states|US|United States|Nags Head, North Carolina|americas
wilmington-nc|Wilmington|united-states|US|United States|Wilmington, North Carolina|americas
greenville-sc|Greenville|united-states|US|United States|Greenville, South Carolina|americas
boone|Boone|united-states|US|United States|Boone, North Carolina|americas
aspen|Aspen|united-states|US|United States|Aspen, Colorado|americas
telluride|Telluride|united-states|US|United States|Telluride, Colorado|americas
steamboat-springs|Steamboat Springs|united-states|US|United States|Steamboat Springs, Colorado|americas
breckenridge|Breckenridge|united-states|US|United States|Breckenridge, Colorado|americas
vail|Vail|united-states|US|United States|Vail, Colorado|americas
santa-fe|Santa Fe|united-states|US|United States|Santa Fe, New Mexico|americas
taos|Taos|united-states|US|United States|Taos, New Mexico|americas
sedona|Sedona|united-states|US|United States|Sedona, Arizona|americas
scottsdale|Scottsdale|united-states|US|United States|Scottsdale, Arizona|americas
tucson|Tucson|united-states|US|United States|Tucson, Arizona|americas
palm-springs|Palm Springs|united-states|US|United States|Palm Springs, California|americas
napa|Napa|united-states|US|United States|Napa, California|americas
sonoma|Sonoma|united-states|US|United States|Sonoma, California|americas
monterey|Monterey|united-states|US|United States|Monterey, California|americas
carmel-by-the-sea|Carmel-by-the-Sea|united-states|US|United States|Carmel-by-the-Sea, California|americas
santa-barbara|Santa Barbara|united-states|US|United States|Santa Barbara, California|americas
anaheim|Anaheim|united-states|US|United States|Anaheim, California|americas
san-jose|San Jose|united-states|US|United States|San Jose, California|americas
calgary|Calgary|canada|CA|Canada|Calgary|americas
edmonton|Edmonton|canada|CA|Canada|Edmonton|americas
winnipeg|Winnipeg|canada|CA|Canada|Winnipeg|americas
quebec-city|Quebec City|canada|CA|Canada|Quebec City|americas
halifax|Halifax|canada|CA|Canada|Halifax, Nova Scotia|americas
st-johns|St. John's|canada|CA|Canada|St. John's, Newfoundland and Labrador|americas
charlottetown|Charlottetown|canada|CA|Canada|Charlottetown|americas
banff-canada|Banff|canada|CA|Canada|Banff, Alberta|americas
jasper-canada|Jasper|canada|CA|Canada|Jasper, Alberta|americas
lake-louise|Lake Louise|canada|CA|Canada|Lake Louise, Alberta|americas
whistler|Whistler|canada|CA|Canada|Whistler, British Columbia|americas
tofino|Tofino|canada|CA|Canada|Tofino|americas
victoria-bc|Victoria|canada|CA|Canada|Victoria, British Columbia|americas
kelowna|Kelowna|canada|CA|Canada|Kelowna|americas
mont-tremblant|Mont-Tremblant|canada|CA|Canada|Mont-Tremblant|americas
quebec-saguenay|Saguenay|canada|CA|Canada|Saguenay, Quebec|americas
niagara-on-the-lake|Niagara-on-the-Lake|canada|CA|Canada|Niagara-on-the-Lake|americas
mexico-merida|Mérida|mexico|MX|Mexico|Mérida, Yucatán|americas
oaxaca|Oaxaca City|mexico|MX|Mexico|Oaxaca City|americas
san-miguel-de-allende|San Miguel de Allende|mexico|MX|Mexico|San Miguel de Allende|americas
guanajuato|Guanajuato|mexico|MX|Mexico|Guanajuato City|americas
puebla|Puebla City|mexico|MX|Mexico|Puebla (city)|americas
morelia|Morelia|mexico|MX|Mexico|Morelia|americas
taxco|Taxco|mexico|MX|Mexico|Taxco de Alarcón|americas
campeche|Campeche City|mexico|MX|Mexico|Campeche City|americas
tulum|Tulum|mexico|MX|Mexico|Tulum|americas
playa-del-carmen|Playa del Carmen|mexico|MX|Mexico|Playa del Carmen|americas
cancun|Cancún|mexico|MX|Mexico|Cancún|americas
cozumel|Cozumel|mexico|MX|Mexico|Cozumel|americas
isla-mujeres|Isla Mujeres|mexico|MX|Mexico|Isla Mujeres|americas
holbox|Holbox|mexico|MX|Mexico|Holbox|americas
bacalar|Bacalar|mexico|MX|Mexico|Bacalar|americas
puerto-vallarta|Puerto Vallarta|mexico|MX|Mexico|Puerto Vallarta|americas
mazatlan|Mazatlán|mexico|MX|Mexico|Mazatlán|americas
sayulita|Sayulita|mexico|MX|Mexico|Sayulita|americas
puerto-escondido|Puerto Escondido|mexico|MX|Mexico|Puerto Escondido|americas
zipolite|Zipolite|mexico|MX|Mexico|Zipolite|americas
huatulco|Huatulco|mexico|MX|Mexico|Huatulco|americas
loreto|Loreto|mexico|MX|Mexico|Loreto, Baja California Sur|americas
la-paz-bcs|La Paz|mexico|MX|Mexico|La Paz, Baja California Sur|americas
cabo-san-lucas|Cabo San Lucas|mexico|MX|Mexico|Cabo San Lucas|americas
todos-santos|Todos Santos|mexico|MX|Mexico|Todos Santos, Baja California Sur|americas
guadalajara|Guadalajara|mexico|MX|Mexico|Guadalajara|americas
tequila|Tequila|mexico|MX|Mexico|Tequila, Jalisco|americas
patzcuaro|Pátzcuaro|mexico|MX|Mexico|Pátzcuaro|americas
copper-canyon|Creel|mexico|MX|Mexico|Copper Canyon|americas
antigua-guatemala|Antigua Guatemala|guatemala|GT|Guatemala|Antigua Guatemala|americas
lake-atitlan|Panajachel|guatemala|GT|Guatemala|Lake Atitlán|americas
flores-guatemala|Flores|guatemala|GT|Guatemala|Flores, Petén|americas
copan|Copán Ruinas|honduras|HN|Honduras|Copán Ruinas|americas
leon-nicaragua|León|nicaragua|NI|Nicaragua|León, Nicaragua|americas
granada-nicaragua|Granada|nicaragua|NI|Nicaragua|Granada, Nicaragua|americas
san-juan-del-sur|San Juan del Sur|nicaragua|NI|Nicaragua|San Juan del Sur|americas
monteverde|Monteverde|costa-rica|CR|Costa Rica|Monteverde|americas
la-fortuna|La Fortuna|costa-rica|CR|Costa Rica|La Fortuna, Costa Rica|americas
manuel-antonio|Manuel Antonio|costa-rica|CR|Costa Rica|Manuel Antonio National Park|americas
tamarindo|Tamarindo|costa-rica|CR|Costa Rica|Tamarindo, Costa Rica|americas
bocas-del-toro|Bocas del Toro|panama|PA|Panama|Bocas del Toro|americas
boquete|Boquete|panama|PA|Panama|Boquete, Chiriquí|americas
cartagena|Cartagena|colombia|CO|Colombia|Cartagena, Colombia|americas
medellin|Medellín|colombia|CO|Colombia|Medellín|americas
cali|Cali|colombia|CO|Colombia|Cali|americas
salento|Salento|colombia|CO|Colombia|Salento, Quindío|americas
villa-de-leyva|Villa de Leyva|colombia|CO|Colombia|Villa de Leyva|americas
san-gil|San Gil|colombia|CO|Colombia|San Gil|americas
barichara|Barichara|colombia|CO|Colombia|Barichara|americas
guatape|Guatapé|colombia|CO|Colombia|Guatapé|americas
quito|Quito|ecuador|EC|Ecuador|Quito|americas
cuenca|Cuenca|ecuador|EC|Ecuador|Cuenca, Ecuador|americas
banos|Ecuador Baños|ecuador|EC|Ecuador|Baños, Ecuador|americas
galapagos-puerto-ayora|Puerto Ayora|ecuador|EC|Ecuador|Puerto Ayora|americas
cuzco|Cusco|peru|PE|Peru|Cusco|americas
arequipa|Arequipa|peru|PE|Peru|Arequipa|americas
puno|Puno|peru|PE|Peru|Puno, Peru|americas
iquitos|Iquitos|peru|PE|Peru|Iquitos|americas
huacachina|Huacachina|peru|PE|Peru|Huacachina|americas
huaraz|Huaraz|peru|PE|Peru|Huaraz|americas
paracas|Paracas|peru|PE|Peru|Paracas|americas
nazca|Nazca|peru|PE|Peru|Nazca|americas
la-paz|La Paz|bolivia|BO|Bolivia|La Paz|americas
sucre|Sucre|bolivia|BO|Bolivia|Sucre|americas
potosi|Potosí|bolivia|BO|Bolivia|Potosí|americas
uyuni|Uyuni|bolivia|BO|Bolivia|Uyuni|americas
copacabana|Copacabana|bolivia|BO|Bolivia|Copacabana, Bolivia|americas
salta|Salta|argentina|AR|Argentina|Salta, Argentina|americas
mendoza|Mendoza|argentina|AR|Argentina|Mendoza, Argentina|americas
bariloche|San Carlos de Bariloche|argentina|AR|Argentina|San Carlos de Bariloche|americas
el-calafate|El Calafate|argentina|AR|Argentina|El Calafate|americas
ushuaia|Ushuaia|argentina|AR|Argentina|Ushuaia|americas
puerto-iguazu|Puerto Iguazú|argentina|AR|Argentina|Puerto Iguazú|americas
cordoba-argentina|Córdoba|argentina|AR|Argentina|Córdoba, Argentina|americas
san-pedro-de-atacama|San Pedro de Atacama|chile|CL|Chile|San Pedro de Atacama|americas
valparaiso|Valparaíso|chile|CL|Chile|Valparaíso|americas
vina-del-mar|Viña del Mar|chile|CL|Chile|Viña del Mar|americas
puerto-varas|Puerto Varas|chile|CL|Chile|Puerto Varas|americas
pucon|Pucón|chile|CL|Chile|Pucón|americas
torres-del-paine|Puerto Natales|chile|CL|Chile|Torres del Paine National Park|americas
easter-island|Hanga Roa|chile|CL|Chile|Easter Island|americas
montevideo|Montevideo|uruguay|UY|Uruguay|Montevideo|americas
colonia-del-sacramento|Colonia del Sacramento|uruguay|UY|Uruguay|Colonia del Sacramento|americas
punta-del-este|Punta del Este|uruguay|UY|Uruguay|Punta del Este|americas
asuncion|Asunción|paraguay|PY|Paraguay|Asunción|americas
# AFRICA
marrakech|Marrakech|morocco|MA|Morocco|Marrakech|africa
fes|Fes|morocco|MA|Morocco|Fez, Morocco|africa
chefchaouen|Chefchaouen|morocco|MA|Morocco|Chefchaouen|africa
essaouira|Essaouira|morocco|MA|Morocco|Essaouira|africa
agadir|Agadir|morocco|MA|Morocco|Agadir|africa
tangier|Tangier|morocco|MA|Morocco|Tangier|africa
rabat|Rabat|morocco|MA|Morocco|Rabat|africa
casablanca|Casablanca|morocco|MA|Morocco|Casablanca|africa
merzouga|Merzouga|morocco|MA|Morocco|Merzouga|africa
cairo|Cairo|egypt|EG|Egypt|Cairo|africa
luxor|Luxor|egypt|EG|Egypt|Luxor|africa
aswan|Aswan|egypt|EG|Egypt|Aswan|africa
alexandria|Alexandria|egypt|EG|Egypt|Alexandria|africa
hurghada|Hurghada|egypt|EG|Egypt|Hurghada|africa
sharm-el-sheikh|Sharm El Sheikh|egypt|EG|Egypt|Sharm El Sheikh|africa
dahab|Dahab|egypt|EG|Egypt|Dahab|africa
siwa|Siwa Oasis|egypt|EG|Egypt|Siwa Oasis|africa
tunis|Tunis|tunisia|TN|Tunisia|Tunis|africa
sousse|Sousse|tunisia|TN|Tunisia|Sousse|africa
djerba|Djerba|tunisia|TN|Tunisia|Djerba|africa
tozeur|Tozeur|tunisia|TN|Tunisia|Tozeur|africa
cape-town|Cape Town|south-africa|ZA|South Africa|Cape Town|africa
johannesburg|Johannesburg|south-africa|ZA|South Africa|Johannesburg|africa
durban|Durban|south-africa|ZA|South Africa|Durban|africa
stellenbosch|Stellenbosch|south-africa|ZA|South Africa|Stellenbosch|africa
franschhoek|Franschhoek|south-africa|ZA|South Africa|Franschhoek|africa
hermanus|Hermanus|south-africa|ZA|South Africa|Hermanus|africa
knysna|Knysna|south-africa|ZA|South Africa|Knysna|africa
plettenberg-bay|Plettenberg Bay|south-africa|ZA|South Africa|Plettenberg Bay|africa
garden-route|George|south-africa|ZA|South Africa|Garden Route|africa
kruger-mpumalanga|Nelspruit|south-africa|ZA|South Africa|Kruger National Park|africa
victoria-falls-zimbabwe|Victoria Falls|zimbabwe|ZW|Zimbabwe|Victoria Falls|africa
harare|Harare|zimbabwe|ZW|Zimbabwe|Harare|africa
bulawayo|Bulawayo|zimbabwe|ZW|Zimbabwe|Bulawayo|africa
livingstone|Livingstone|zambia|ZM|Zambia|Livingstone, Zambia|africa
lusaka|Lusaka|zambia|ZM|Zambia|Lusaka|africa
windhoek|Windhoek|namibia|NA|Namibia|Windhoek|africa
swakopmund|Swakopmund|namibia|NA|Namibia|Swakopmund|africa
sossusvlei|Sossusvlei|namibia|NA|Namibia|Sossusvlei|africa
etosha|Okaukuejo|namibia|NA|Namibia|Etosha National Park|africa
maun|Maun|botswana|BW|Botswana|Maun|africa
kasane|Kasane|botswana|BW|Botswana|Kasane|africa
gaborone|Gaborone|botswana|BW|Botswana|Gaborone|africa
arusha|Arusha|tanzania|TZ|Tanzania|Arusha|africa
zanzibar|Zanzibar City|tanzania|TZ|Tanzania|Zanzibar City|africa
stone-town|Stone Town|tanzania|TZ|Tanzania|Stone Town|africa
serengeti|Serengeti|tanzania|TZ|Tanzania|Serengeti National Park|africa
kilimanjaro|Moshi|tanzania|TZ|Tanzania|Mount Kilimanjaro|africa
dar-es-salaam|Dar es Salaam|tanzania|TZ|Tanzania|Dar es Salaam|africa
nairobi|Nairobi|kenya|KE|Kenya|Nairobi|africa
mombasa|Mombasa|kenya|KE|Kenya|Mombasa|africa
diani-beach|Diani Beach|kenya|KE|Kenya|Diani Beach|africa
lamu|Lamu|kenya|KE|Kenya|Lamu|africa
naivasha|Naivasha|kenya|KE|Kenya|Naivasha|africa
nakuru|Nakuru|kenya|KE|Kenya|Nakuru|africa
kigali|Kigali|rwanda|RW|Rwanda|Kigali|africa
volcanoes-rwanda|Musanze|rwanda|RW|Rwanda|Volcanoes National Park|africa
bwindi|Bwindi|uganda|UG|Uganda|Bwindi Impenetrable National Park|africa
entebbe|Entebbe|uganda|UG|Uganda|Entebbe|africa
kampala|Kampala|uganda|UG|Uganda|Kampala|africa
jinja|Jinja|uganda|UG|Uganda|Jinja, Uganda|africa
addis-ababa|Addis Ababa|ethiopia|ET|Ethiopia|Addis Ababa|africa
lalibela|Lalibela|ethiopia|ET|Ethiopia|Lalibela|africa
gondar|Gondar|ethiopia|ET|Ethiopia|Gondar|africa
bahir-dar|Bahir Dar|ethiopia|ET|Ethiopia|Bahir Dar|africa
simien|Debark|ethiopia|ET|Ethiopia|Simien Mountains National Park|africa
dakar|Dakar|senegal|SN|Senegal|Dakar|africa
saint-louis-senegal|Saint-Louis|senegal|SN|Senegal|Saint-Louis, Senegal|africa
gorée|Gorée|senegal|SN|Senegal|Gorée|africa
accra|Accra|ghana|GH|Ghana|Accra|africa
cape-coast|Cape Coast|ghana|GH|Ghana|Cape Coast|africa
kumasi|Kumasi|ghana|GH|Ghana|Kumasi|africa
bamako|Bamako|mali|ML|Mali|Bamako|africa
timbuktu|Timbuktu|mali|ML|Mali|Timbuktu|africa
ouagadougou|Ouagadougou|burkina-faso|BF|Burkina Faso|Ouagadougou|africa
abidjan|Abidjan|ivory-coast|CI|Ivory Coast|Abidjan|africa
grand-bassam|Grand-Bassam|ivory-coast|CI|Ivory Coast|Grand-Bassam|africa
lome|Lomé|togo|TG|Togo|Lomé|africa
cotonou|Cotonou|benin|BJ|Benin|Cotonou|africa
porto-novo|Porto-Novo|benin|BJ|Benin|Porto-Novo|africa
ouidah|Ouidah|benin|BJ|Benin|Ouidah|africa
libreville|Libreville|gabon|GA|Gabon|Libreville|africa
yaounde|Yaoundé|cameroon|CM|Cameroon|Yaoundé|africa
douala|Douala|cameroon|CM|Cameroon|Douala|africa
kribi|Kribi|cameroon|CM|Cameroon|Kribi|africa
malabo|Malabo|equatorial-guinea|GQ|Equatorial Guinea|Malabo|africa
sao-tome|São Tomé|sao-tome-and-principe|ST|São Tomé and Príncipe|São Tomé|africa
praia|Praia|cape-verde|CV|Cape Verde|Praia|africa
sal|Sal|cape-verde|CV|Cape Verde|Sal, Cape Verde|africa
bissau|Bissau|guinea-bissau|GW|Guinea-Bissau|Bissau|africa
conakry|Conakry|guinea|GN|Guinea|Conakry|africa
freetown|Freetown|sierra-leone|SL|Sierra Leone|Freetown|africa
monrovia|Monrovia|liberia|LR|Liberia|Monrovia|africa
luanda|Luanda|angola|AO|Angola|Luanda|africa
benguela|Benguela|angola|AO|Angola|Benguela|africa
maputo|Maputo|mozambique|MZ|Mozambique|Maputo|africa
vilanculos|Vilanculos|mozambique|MZ|Mozambique|Vilanculos|africa
tofo|Tofo|mozambique|MZ|Mozambique|Tofo|africa
nosy-be|Nosy Be|madagascar|MG|Madagascar|Nosy Be|africa
antananarivo|Antananarivo|madagascar|MG|Madagascar|Antananarivo|africa
morondava|Morondava|madagascar|MG|Madagascar|Morondava|africa
mauritius|Port Louis|mauritius|MU|Mauritius|Port Louis|africa
seychelles|Victoria|seychelles|SC|Seychelles|Victoria, Seychelles|africa
# MIDDLE EAST
dubai|Dubai|united-arab-emirates|AE|United Arab Emirates|Dubai|middle-east
abu-dhabi|Abu Dhabi|united-arab-emirates|AE|United Arab Emirates|Abu Dhabi|middle-east
sharjah|Sharjah|united-arab-emirates|AE|United Arab Emirates|Sharjah|middle-east
ras-al-khaimah|Ras Al Khaimah|united-arab-emirates|AE|United Arab Emirates|Ras Al Khaimah|middle-east
fujairah|Fujairah|united-arab-emirates|AE|United Arab Emirates|Fujairah|middle-east
muscat|Muscat|oman|OM|Oman|Muscat|middle-east
salalah|Salalah|oman|OM|Oman|Salalah|middle-east
nizwa|Nizwa|oman|OM|Oman|Nizwa|middle-east
sur-oman|Sur|oman|OM|Oman|Sur, Oman|middle-east
wadi-shab|Wadi Shab|oman|OM|Oman|Wadi Shab|middle-east
doha|Doha|qatar|QA|Qatar|Doha|middle-east
riyadh|Riyadh|saudi-arabia|SA|Saudi Arabia|Riyadh|middle-east
jeddah|Jeddah|saudi-arabia|SA|Saudi Arabia|Jeddah|middle-east
alula|AlUla|saudi-arabia|SA|Saudi Arabia|AlUla|middle-east
medina|Medina|saudi-arabia|SA|Saudi Arabia|Medina|middle-east
mecca|Mecca|saudi-arabia|SA|Saudi Arabia|Mecca|middle-east
amman|Amman|jordan|JO|Jordan|Amman|middle-east
petra|Petra|jordan|JO|Jordan|Petra|middle-east
aqaba|Aqaba|jordan|JO|Jordan|Aqaba|middle-east
dead-sea-jordan|Dead Sea|jordan|JO|Jordan|Dead Sea|middle-east
wadi-rum|Wadi Rum|jordan|JO|Jordan|Wadi Rum|middle-east
jerusalem|Jerusalem|israel|IL|Israel|Jerusalem|middle-east
tel-aviv|Tel Aviv|israel|IL|Israel|Tel Aviv|middle-east
haifa|Haifa|israel|IL|Israel|Haifa|middle-east
eilat|Eilat|israel|IL|Israel|Eilat|middle-east
nazareth|Nazareth|israel|IL|Israel|Nazareth|middle-east
beirut|Beirut|lebanon|LB|Lebanon|Beirut|middle-east
byblos|Byblos|lebanon|LB|Lebanon|Byblos|middle-east
baalbek|Baalbek|lebanon|LB|Lebanon|Baalbek|middle-east
tyre|Tyre|lebanon|LB|Lebanon|Tyre, Lebanon|middle-east
kuwait-city|Kuwait City|kuwait|KW|Kuwait|Kuwait City|middle-east
manama|Manama|bahrain|BH|Bahrain|Manama|middle-east
baghdad|Baghdad|iraq|IQ|Iraq|Baghdad|middle-east
erbil|Erbil|iraq|IQ|Iraq|Erbil|middle-east
basra|Basra|iraq|IQ|Iraq|Basra|middle-east
tehran|Tehran|iran|IR|Iran|Tehran|middle-east
isfahan|Isfahan|iran|IR|Iran|Isfahan|middle-east
shiraz|Shiraz|iran|IR|Iran|Shiraz|middle-east
yazd|Yazd|iran|IR|Iran|Yazd|middle-east
kashan|Kashan|iran|IR|Iran|Kashan|middle-east
tabriz|Tabriz|iran|IR|Iran|Tabriz|middle-east
morondava|Morondava|madagascar|MG|Madagascar|Morondava|africa
ouarzazate|Ouarzazate|morocco|MA|Morocco|Ouarzazate|africa
walvis-bay|Walvis Bay|namibia|NA|Namibia|Walvis Bay|africa
grand-bassam|Grand-Bassam|ivory-coast|CI|Ivory Coast|Grand-Bassam|africa
lome|Lomé|togo|TG|Togo|Lomé|africa
cotonou|Cotonou|benin|BJ|Benin|Cotonou|africa
ouidah|Ouidah|benin|BJ|Benin|Ouidah|africa
kribi|Kribi|cameroon|CM|Cameroon|Kribi|africa
sal|Sal|cape-verde|CV|Cape Verde|Sal, Cape Verde|africa
praia|Praia|cape-verde|CV|Cape Verde|Praia|africa
tofo|Tofo|mozambique|MZ|Mozambique|Tofo|africa
vilanculos|Vilanculos|mozambique|MZ|Mozambique|Vilanculos|africa
diani-beach|Diani Beach|kenya|KE|Kenya|Diani Beach|africa
lamu|Lamu|kenya|KE|Kenya|Lamu|africa
naivasha|Naivasha|kenya|KE|Kenya|Naivasha|africa
nakuru|Nakuru|kenya|KE|Kenya|Nakuru|africa
volcanoes-rwanda|Musanze|rwanda|RW|Rwanda|Volcanoes National Park|africa
bwindi|Bwindi|uganda|UG|Uganda|Bwindi Impenetrable National Park|africa
jinja|Jinja|uganda|UG|Uganda|Jinja, Uganda|africa
gondar|Gondar|ethiopia|ET|Ethiopia|Gondar|africa
bahir-dar|Bahir Dar|ethiopia|ET|Ethiopia|Bahir Dar|africa
simien|Debark|ethiopia|ET|Ethiopia|Simien Mountains National Park|africa
merzouga|Merzouga|morocco|MA|Morocco|Merzouga|africa
dahab|Dahab|egypt|EG|Egypt|Dahab|africa
siwa|Siwa Oasis|egypt|EG|Egypt|Siwa Oasis|africa
tozeur|Tozeur|tunisia|TN|Tunisia|Tozeur|africa
nizwa|Nizwa|oman|OM|Oman|Nizwa|middle-east
sur-oman|Sur|oman|OM|Oman|Sur, Oman|middle-east
wadi-shab|Wadi Shab|oman|OM|Oman|Wadi Shab|middle-east
khasab|Khasab|oman|OM|Oman|Khasab|middle-east
wadi-rum|Wadi Rum|jordan|JO|Jordan|Wadi Rum|middle-east
haifa|Haifa|israel|IL|Israel|Haifa|middle-east
nazareth|Nazareth|israel|IL|Israel|Nazareth|middle-east
baalbek|Baalbek|lebanon|LB|Lebanon|Baalbek|middle-east
tyre|Tyre|lebanon|LB|Lebanon|Tyre, Lebanon|middle-east
erbil|Erbil|iraq|IQ|Iraq|Erbil|middle-east
basra|Basra|iraq|IQ|Iraq|Basra|middle-east
tehran|Tehran|iran|IR|Iran|Tehran|middle-east
isfahan|Isfahan|iran|IR|Iran|Isfahan|middle-east
shiraz|Shiraz|iran|IR|Iran|Shiraz|middle-east
yazd|Yazd|iran|IR|Iran|Yazd|middle-east
kashan|Kashan|iran|IR|Iran|Kashan|middle-east
tabriz|Tabriz|iran|IR|Iran|Tabriz|middle-east
ras-al-khaimah|Ras Al Khaimah|united-arab-emirates|AE|United Arab Emirates|Ras Al Khaimah|middle-east
fujairah|Fujairah|united-arab-emirates|AE|United Arab Emirates|Fujairah|middle-east
# OCEANIA
auckland|Auckland|new-zealand|NZ|New Zealand|Auckland|oceania
wellington|Wellington|new-zealand|NZ|New Zealand|Wellington|oceania
christchurch|Christchurch|new-zealand|NZ|New Zealand|Christchurch|oceania
queenstown|Queenstown|new-zealand|NZ|New Zealand|Queenstown, New Zealand|oceania
wanaka|Wanaka|new-zealand|NZ|New Zealand|Wanaka|oceania
rotorua|Rotorua|new-zealand|NZ|New Zealand|Rotorua|oceania
taupo|Taupō|new-zealand|NZ|New Zealand|Taupō|oceania
napier|Napier|new-zealand|NZ|New Zealand|Napier, New Zealand|oceania
dunedin|Dunedin|new-zealand|NZ|New Zealand|Dunedin|oceania
milford-sound|Milford Sound|new-zealand|NZ|New Zealand|Milford Sound|oceania
bay-of-islands|Paihia|new-zealand|NZ|New Zealand|Bay of Islands|oceania
coromandel|Coromandel|new-zealand|NZ|New Zealand|Coromandel, New Zealand|oceania
kaikoura|Kaikōura|new-zealand|NZ|New Zealand|Kaikōura|oceania
sydney|Sydney|australia|AU|Australia|Sydney|oceania
melbourne|Melbourne|australia|AU|Australia|Melbourne|oceania
brisbane|Brisbane|australia|AU|Australia|Brisbane|oceania
perth|Perth|australia|AU|Australia|Perth|oceania
adelaide|Adelaide|australia|AU|Australia|Adelaide|oceania
hobart|Hobart|australia|AU|Australia|Hobart|oceania
darwin|Darwin|australia|AU|Australia|Darwin|oceania
cairns|Cairns|australia|AU|Australia|Cairns|oceania
gold-coast|Gold Coast|australia|AU|Australia|Gold Coast, Queensland|oceania
byron-bay|Byron Bay|australia|AU|Australia|Byron Bay|oceania
noosa|Noosa|australia|AU|Australia|Noosa Heads|oceania
port-douglas|Port Douglas|australia|AU|Australia|Port Douglas|oceania
uluru|Yulara|australia|AU|Australia|Uluru|oceania
alice-springs|Alice Springs|australia|AU|Australia|Alice Springs|oceania
broome|Broome|australia|AU|Australia|Broome|oceania
fiji-nadi|Nadi|fiji|FJ|Fiji|Nadi|oceania
fiji-suva|Suva|fiji|FJ|Fiji|Suva|oceania
samoa-apia|Apia|samoa|WS|Samoa|Apia|oceania
tonga-nukualofa|Nuku'alofa|tonga|TO|Tonga|Nukuʻalofa|oceania
vanuatu-port-vila|Port Vila|vanuatu|VU|Vanuatu|Port Vila|oceania
moorea|Moorea|france|FR|France|Moorea|oceania
noumea|Nouméa|france|FR|France|Nouméa|oceania
honiara|Honiara|solomon-islands|SB|Solomon Islands|Honiara|oceania
savusavu|Savusavu|fiji|FJ|Fiji|Savusavu|oceania
levuka|Levuka|fiji|FJ|Fiji|Levuka|oceania
kangaroo-island|Kingscote|australia|AU|Australia|Kangaroo Island|oceania
margaret-river|Margaret River|australia|AU|Australia|Margaret River, Western Australia|oceania
blue-mountains|Katoomba|australia|AU|Australia|Blue Mountains (New South Wales)|oceania
hervey-bay|Hervey Bay|australia|AU|Australia|Hervey Bay|oceania
port-lincoln|Port Lincoln|australia|AU|Australia|Port Lincoln|oceania
lord-howe|Lord Howe Island|australia|AU|Australia|Lord Howe Island|oceania
new-plymouth|New Plymouth|new-zealand|NZ|New Zealand|New Plymouth|oceania
nelson-nz|Nelson|new-zealand|NZ|New Zealand|Nelson, New Zealand|oceania
blenheim|Blenheim|new-zealand|NZ|New Zealand|Blenheim, New Zealand|oceania
waiheke|Waiheke Island|new-zealand|NZ|New Zealand|Waiheke Island|oceania
port-moresby|Port Moresby|papua-new-guinea|PG|Papua New Guinea|Port Moresby|oceania
rabaul|Rabaul|papua-new-guinea|PG|Papua New Guinea|Rabaul|oceania
palau-koror|Koror|palau|PW|Palau|Koror|oceania
# CARIBBEAN
havana|Havana|cuba|CU|Cuba|Havana|caribbean
trinidad-cuba|Trinidad|cuba|CU|Cuba|Trinidad, Cuba|caribbean
varadero|Varadero|cuba|CU|Cuba|Varadero|caribbean
vinales|Viñales|cuba|CU|Cuba|Viñales|caribbean
santo-domingo|Santo Domingo|dominican-republic|DO|Dominican Republic|Santo Domingo|caribbean
punta-cana|Punta Cana|dominican-republic|DO|Dominican Republic|Punta Cana|caribbean
puerto-plata|Puerto Plata|dominican-republic|DO|Dominican Republic|Puerto Plata|caribbean
santiago-de-cuba|Santiago de Cuba|cuba|CU|Cuba|Santiago de Cuba|caribbean
kingston|Kingston|jamaica|JM|Jamaica|Kingston, Jamaica|caribbean
montego-bay|Montego Bay|jamaica|JM|Jamaica|Montego Bay|caribbean
negril|Negril|jamaica|JM|Jamaica|Negril|caribbean
ocho-rios|Ocho Rios|jamaica|JM|Jamaica|Ocho Rios|caribbean
nassau|Nassau|bahamas|BS|Bahamas|Nassau, Bahamas|caribbean
freeport-bahamas|Freeport|bahamas|BS|Bahamas|Freeport, Bahamas|caribbean
exuma|George Town|bahamas|BS|Bahamas|Exuma|caribbean
barbados-bridgetown|Bridgetown|barbados|BB|Barbados|Bridgetown|caribbean
saint-lucia-castries|Castries|saint-lucia|LC|Saint Lucia|Castries|caribbean
soufriere|Soufrière|saint-lucia|LC|Saint Lucia|Soufrière, Saint Lucia|caribbean
antigua|St. John's|antigua-and-barbuda|AG|Antigua and Barbuda|St. John's, Antigua and Barbuda|caribbean
st-kitts-basseterre|Basseterre|saint-kitts-and-nevis|KN|Saint Kitts and Nevis|Basseterre|caribbean
st-maarten|Philipsburg|sint-maarten|SX|Sint Maarten|Philipsburg, Sint Maarten|caribbean
curacao-willemstad|Willemstad|curacao|CW|Curaçao|Willemstad|caribbean
aruba-oranjestad|Oranjestad|netherlands|NL|Netherlands|Oranjestad, Aruba|caribbean
bonaire|Kralendijk|netherlands|NL|Netherlands|Kralendijk|caribbean
kingstown|Kingstown|saint-vincent-and-the-grenadines|VC|Saint Vincent and the Grenadines|Kingstown|caribbean
bequia|Bequia|saint-vincent-and-the-grenadines|VC|Saint Vincent and the Grenadines|Bequia|caribbean
carriacou|Hillsborough|grenada|GD|Grenada|Carriacou|caribbean
trinidad-port-of-spain|Port of Spain|trinidad-and-tobago|TT|Trinidad and Tobago|Port of Spain|caribbean
tobago|Scarborough|trinidad-and-tobago|TT|Trinidad and Tobago|Tobago|caribbean
grenada-st-georges|St. George's|grenada|GD|Grenada|St. George's, Grenada|caribbean
dominica-roseau|Roseau|dominica|DM|Dominica|Roseau, Dominica|caribbean
martinique-fort-de-france|Fort-de-France|france|FR|France|Fort-de-France|caribbean
guadeloupe-pointe-a-pitre|Pointe-à-Pitre|france|FR|France|Pointe-à-Pitre|caribbean
st-john|Cruz Bay|united-states|US|United States|Saint John, U.S. Virgin Islands|caribbean
st-croix|Christiansted|united-states|US|United States|Saint Croix|caribbean
ponce|Ponce|united-states|US|United States|Ponce, Puerto Rico|caribbean
vinales|Viñales|cuba|CU|Cuba|Viñales|caribbean
puerto-plata|Puerto Plata|dominican-republic|DO|Dominican Republic|Puerto Plata|caribbean
ocho-rios|Ocho Rios|jamaica|JM|Jamaica|Ocho Rios|caribbean
exuma|George Town|bahamas|BS|Bahamas|Exuma|caribbean
caye-caulker|Caye Caulker|belize|BZ|Belize|Caye Caulker|caribbean
san-pedro-belize|San Pedro|belize|BZ|Belize|San Pedro, Belize|caribbean
belize-city|Belize City|belize|BZ|Belize|Belize City|caribbean
`;

function loadExisting() {
  const top1000 = fs
    .readFileSync(path.join(__dirname, "_top1000-slugs.txt"), "utf8")
    .trim()
    .split(/\r?\n/);
  const targets = JSON.parse(
    fs.readFileSync(path.join(__dirname, "city-targets.json"), "utf8")
  );
  return new Set([...top1000, ...targets.map((t) => t.slug)]);
}

function parseRaw(raw) {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((line) => {
      const parts = line.split("|");
      if (parts.length < 6) throw new Error(`Bad line: ${line}`);
      const [slug, name, countrySlug, cc, countryName, wikiTitle, region = "other"] =
        parts;
      return { slug, name, countrySlug, cc, countryName, wikiTitle, region };
    });
}

function main() {
  const existing = loadExisting();
  const parsed = parseRaw(RAW);
  const seen = new Set();
  const kept = [];
  const skipped = [];

  for (const c of parsed) {
    if (existing.has(c.slug) || seen.has(c.slug)) {
      skipped.push(c.slug);
      continue;
    }
    seen.add(c.slug);
    kept.push(c);
  }

  const outPath = path.join(__dirname, "top1500-candidates.txt");
  const lines = kept.map(
    (c) =>
      `${c.slug}|${c.name}|${c.countrySlug}|${c.cc}|${c.countryName}|${c.wikiTitle}`
  );
  fs.writeFileSync(outPath, lines.join("\n") + "\n", "utf8");

  const regions = {};
  for (const c of kept) {
    regions[c.region] = (regions[c.region] || 0) + 1;
  }

  console.log(JSON.stringify({ count: kept.length, skipped: skipped.length, regions }, null, 2));
}

main();
