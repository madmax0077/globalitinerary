import type { City } from "@/lib/types";
import { PHOTOS, unsplash } from "@/lib/images";

/** Travel-detail overlays for top tourist cities that were thin in generation. */
export type CityEnrichment = Partial<
  Pick<
    City,
    | "tagline"
    | "overview"
    | "bestTime"
    | "weather"
    | "airport"
    | "metro"
    | "transport"
    | "shopping"
    | "nightlife"
    | "museums"
    | "localFoods"
    | "hiddenGems"
    | "tips"
    | "faqs"
    | "heroImage"
    | "thumbnail"
    | "gallery"
    | "featured"
  >
>;

function stock(hero: keyof typeof PHOTOS, gallery: (keyof typeof PHOTOS)[]): Pick<City, "heroImage" | "thumbnail" | "gallery"> {
  return {
    heroImage: unsplash(PHOTOS[hero], 2400),
    thumbnail: unsplash(PHOTOS[hero], 900),
    gallery: gallery.map((k) => unsplash(PHOTOS[k], 1400)),
  };
}

export const cityEnrichments: Record<string, CityEnrichment> = {
  "hong-kong": {
    ...stock("cityNight", ["cityNight", "tokyo", "food", "coast"]),
    tagline: "Harbour skyline, hiking trails and world-class food",
    overview:
      "Hong Kong packs Victoria Harbour views, Peak tram rides, street-food alleys and hiking trails into a compact, bilingual city that works for stopovers and longer stays alike.",
    bestTime: "October–April for cooler, clearer weather",
    weather: "Subtropical — humid summers, mild winters; typhoon risk June–October",
    airport: "Hong Kong International (HKG)",
    metro: "MTR covers Hong Kong Island, Kowloon and the New Territories",
    transport: "Octopus card for MTR, buses, trams and ferries; Star Ferry for harbour crossings",
    shopping: ["Central", "Causeway Bay", "Tsim Sha Tsui", "Ladies' Market"],
    nightlife: ["Lan Kwai Fong", "SoHo", "Wan Chai", "Tsim Sha Tsui waterfront"],
    museums: ["Hong Kong Museum of History", "M+ West Kowloon", "Hong Kong Palace Museum"],
    localFoods: ["Dim sum", "Roast goose", "Wonton noodles", "Egg tarts", "Milk tea"],
    hiddenGems: ["Dragon's Back hike", "Chi Lin Nunnery", "Sai Kung seafood villages"],
    tips: [
      "Tap an Octopus card everywhere — faster than tickets",
      "Carry a light layer; malls and MTR are heavily air-conditioned",
      "Book Peak Tram tickets online at busy times",
    ],
    faqs: [
      { question: "Is Hong Kong easy without Mandarin or Cantonese?", answer: "Yes — English is widely used on signs, the MTR and in tourist areas." },
      { question: "How many days do I need?", answer: "Three full days cover the Peak, harbour, a temple/market day and one hike or outlying-island trip." },
    ],
    featured: true,
  },
  miami: {
    ...stock("beach", ["beach", "coast", "cityNight", "nyc"]),
    tagline: "Art Deco, beaches and Latin flavour",
    overview:
      "Miami mixes South Beach Art Deco, Cuban cafés in Little Havana, design districts and Atlantic beaches — a warm-weather city built for outdoors and nightlife.",
    bestTime: "November–April for dry, pleasant weather",
    weather: "Tropical — hot humid summers, mild dry winters; hurricane season June–November",
    airport: "Miami International (MIA); Fort Lauderdale (FLL) is a useful alternate",
    metro: "Metrorail / Metromover in downtown; rideshares cover the beaches",
    transport: "Rent a car for day trips; walk or rideshare in South Beach",
    shopping: ["Lincoln Road", "Design District", "Brickell City Centre"],
    nightlife: ["Ocean Drive", "Wynwood", "Brickell", "Little Havana"],
    museums: ["Pérez Art Museum Miami", "Vizcaya Museum", "Frost Science"],
    localFoods: ["Cuban sandwiches", "Stone crab", "Café con leche", "Ceviche"],
    hiddenGems: ["Virginia Key", "Coral Gables Venetian Pool", "Deering Estate"],
    tips: [
      "Book beach hotels early for Art Basel and spring break weeks",
      "Use reef-safe sunscreen — South Florida beaches enforce it in places",
      "Little Havana is best on foot around Calle Ocho",
    ],
    faqs: [
      { question: "Is South Beach the whole of Miami?", answer: "No — Wynwood, Brickell, Coral Gables and Little Havana are essential for food and culture beyond the beach strip." },
    ],
  },
  orlando: {
    ...stock("nyc", ["nyc", "beach", "cityNight", "coast"]),
    tagline: "Theme-park capital of the world",
    overview:
      "Orlando is the global hub for Walt Disney World, Universal Orlando and family resorts, with lakeside neighbourhoods and Kennedy Space Center within day-trip range.",
    bestTime: "January–April and late August–early December for milder crowds and weather",
    weather: "Humid subtropical — hot wet summers, mild winters; afternoon storms common in summer",
    airport: "Orlando International (MCO)",
    metro: "No metro — resort buses, rideshares and rental cars dominate",
    transport: "Disney/Universal transport for parks; rental car for Winter Park and Space Center",
    shopping: ["Disney Springs", "Icon Park", "Winter Park Village"],
    nightlife: ["Disney Springs", "Universal CityWalk", "Thornton Park"],
    museums: ["Orlando Museum of Art", "Titanic: The Artifact Exhibition"],
    localFoods: ["Florida citrus", "Theme-park classics", "Cuban spots near downtown"],
    hiddenGems: ["Winter Park boat tour", "Leu Gardens", "Wekiwa Springs"],
    tips: [
      "Buy park tickets and Lightning Lane / Express passes before you fly",
      "Midweek park days are usually quieter than weekends",
      "Stay on-site if early park entry matters to your group",
    ],
    faqs: [
      { question: "How many park days do I need?", answer: "Four to six park days covers headline Disney and Universal parks without rushing; add a rest day between big park days." },
    ],
  },
  zurich: {
    ...stock("alps", ["alps", "coast", "cityNight", "food"]),
    tagline: "Lake views, old town and Alpine gateway",
    overview:
      "Zurich combines a walkable Altstadt, Lake Zurich promenades and easy trains into the Alps — polished, efficient and ideal as a Swiss hub.",
    bestTime: "May–September for lake weather; December for Christmas markets",
    weather: "Temperate — warm summers, cold winters with possible snow",
    airport: "Zurich Airport (ZRH)",
    metro: "S-Bahn, trams and boats on one Swiss Travel / ZVV network",
    transport: "Swiss Travel Pass or local day tickets; trains to Lucerne and the Alps",
    shopping: ["Bahnhofstrasse", "Niederdorf", "Freitag Flagship Store"],
    nightlife: ["Langstrasse", "Niederdorf", "Zürich West"],
    museums: ["Kunsthaus Zürich", "Swiss National Museum", "FIFA Museum"],
    localFoods: ["Zürcher Geschnetzeltes", "Raclette", "Chocolate", "Rivella"],
    hiddenGems: ["Uetliberg ridge walk", "Bathing huts on the lake", "Lindenhof at sunset"],
    tips: [
      "Tap-to-pay works on most transit — validate before boarding",
      "Sunday retail hours are limited outside stations and tourist streets",
      "Day-trip early to Lucerne or Jungfrau region in peak summer",
    ],
    faqs: [
      { question: "Is Zurich only a business city?", answer: "No — the old town, lake and museums fill 2–3 days, and it is the easiest hub for Alpine day trips." },
    ],
  },
  edinburgh: {
    ...stock("coast", ["coast", "alps", "london", "cityNight"]),
    tagline: "Castle rock, festivals and Old Town lanes",
    overview:
      "Edinburgh stacks a medieval Old Town, elegant New Town and a fortress skyline into one of Europe's most walkable capitals — especially electric during Festival season.",
    bestTime: "May–June and September; August for Festivals if you accept crowds",
    weather: "Cool maritime — changeable; pack layers year-round",
    airport: "Edinburgh Airport (EDI)",
    metro: "No metro — buses, trams to the airport, and excellent walking in the centre",
    transport: "Walk the Royal Mile and New Town; buses for Leith and day trips",
    shopping: ["Princes Street", "Victoria Street", "Stockbridge"],
    nightlife: ["Grassmarket", "Cowgate", "Leith Walk"],
    museums: ["National Museum of Scotland", "Scottish National Gallery", "Camera Obscura"],
    localFoods: ["Haggis", "Scotch whisky", "Shortbread", "Full Scottish breakfast"],
    hiddenGems: ["Dean Village", "Duddingston Loch", "Calton Hill at sunrise"],
    tips: [
      "Book Festival and Hogmanay lodging months ahead",
      "Wear grip-friendly shoes — Old Town stones are steep and slick",
      "Climb Arthur's Seat early for clearer views",
    ],
    faqs: [
      { question: "How many days for Edinburgh?", answer: "Two to three days cover the castle, Royal Mile and a museum or coastal walk; add a Highlands day trip if you have a fourth." },
    ],
  },
  florence: {
    ...stock("rome", ["rome", "colosseum", "venice", "food"]),
    tagline: "Renaissance art in a walkable historic centre",
    overview:
      "Florence is the cradle of the Renaissance — the Duomo, Uffizi and Ponte Vecchio sit inside a compact centro storico best explored on foot between gelato stops.",
    bestTime: "April–June and September–October",
    weather: "Hot summers, mild winters; humid in midsummer",
    airport: "Florence Airport (FLR); Pisa (PSA) is a common alternate with train links",
    metro: "No metro — walk the centre; buses and trams for the periphery",
    transport: "Walk everything inside the historic centre; trains for day trips to Siena or Pisa",
    shopping: ["Ponte Vecchio", "San Lorenzo Market", "Via de' Tornabuoni"],
    nightlife: ["Oltrarno", "Santa Croce", "Santo Spirito"],
    museums: ["Uffizi Gallery", "Accademia Gallery", "Pitti Palace"],
    localFoods: ["Bistecca alla Fiorentina", "Lampredotto", "Ribollita", "Gelato"],
    hiddenGems: ["San Miniato al Monte", "Rose Garden below Piazzale Michelangelo", "Orsanmichele"],
    tips: [
      "Pre-book Uffizi and Accademia timed tickets",
      "Climb the Duomo cupola early or late to avoid queues",
      "Cross to Oltrarno for quieter evenings and artisan workshops",
    ],
    faqs: [
      { question: "Is one day enough for Florence?", answer: "You can hit the Duomo exterior and one museum in a day, but two to three days is far more rewarding." },
    ],
  },
  cusco: {
    ...stock("machuPicchu", ["machuPicchu", "mountains", "temple", "food"]),
    tagline: "Inca capital and gateway to Machu Picchu",
    overview:
      "Cusco's stone streets, plazas and Andean food scene make it far more than a stopover — acclimatise here before the Sacred Valley and Machu Picchu.",
    bestTime: "May–September dry season; June for Inti Raymi",
    weather: "High-altitude subtropical highland — strong sun, cool nights, wet summers (Nov–Mar)",
    airport: "Alejandro Velasco Astete (CUZ)",
    metro: "No metro — walk the historic centre; taxis and tours for the valley",
    transport: "Walking in centro; organised trains/buses for Machu Picchu",
    shopping: ["San Pedro Market", "San Blas artisan streets"],
    nightlife: ["Plaza de Armas", "San Blas"],
    museums: ["Qorikancha", "Museo de Arte Precolombino"],
    localFoods: ["Cuy", "Lomo saltado", "Coca tea", "Chicha"],
    hiddenGems: ["San Blas viewpoints", "Cristo Blanco", "Tipón ruins"],
    tips: [
      "Spend 1–2 easy days acclimatising before hard hikes",
      "Drink water and go easy on alcohol the first night",
      "Book Machu Picchu tickets and trains well ahead in peak months",
    ],
    faqs: [
      { question: "How do I get to Machu Picchu from Cusco?", answer: "Most travellers take a Sacred Valley connection then the train to Aguas Calientes, or hike the Inca Trail with a permit." },
    ],
  },
  "las-vegas": {
    ...stock("cityNight", ["cityNight", "desertCamp", "nyc", "coast"]),
    tagline: "Neon Strip, shows and desert day trips",
    overview:
      "Las Vegas is spectacle by design — mega-resorts, residencies and restaurants on the Strip, with Red Rock and Hoover Dam for daylight escapes.",
    bestTime: "March–May and September–November",
    weather: "Desert — very hot summers, mild winters, intense sun year-round",
    airport: "Harry Reid International (LAS)",
    metro: "No metro — monorail on part of the Strip; rideshares and walking between nearby resorts",
    transport: "Walk or rideshare the Strip; rent a car for Red Rock / Hoover Dam",
    shopping: ["Forum Shops", "Grand Canal Shoppes", "Downtown Container Park"],
    nightlife: ["Las Vegas Strip", "Fremont Street", "resort clubs"],
    museums: ["Neon Museum", "Mob Museum"],
    localFoods: ["Buffets", "Shrimp cocktail classics", "Off-Strip ethnic gems"],
    hiddenGems: ["Neon Museum Boneyard", "Arts District", "Lake Mead viewpoints"],
    tips: [
      "Stay hydrated and use sunscreen even in winter",
      "Resort fees are usually extra — check before booking",
      "Downtown Fremont is a cheaper, rowdier contrast to the Strip",
    ],
    faqs: [
      { question: "Do I need a car in Las Vegas?", answer: "Not for the Strip alone. Rent one if you want Red Rock Canyon, Hoover Dam or Valley of Fire." },
    ],
  },
  "washington-dc": {
    ...stock("nyc", ["nyc", "cityNight", "coast", "mountains"]),
    tagline: "Monuments, free museums and capital neighbourhoods",
    overview:
      "Washington, D.C. delivers the National Mall's monuments and Smithsonian museums — mostly free — plus walkable neighbourhoods from Georgetown to Capitol Hill.",
    bestTime: "March–May (cherry blossoms) and September–November",
    weather: "Humid summers, mild springs/autumns, occasional snowy winters",
    airport: "Reagan National (DCA), Dulles (IAD), Baltimore (BWI)",
    metro: "WMATA Metrorail is the easiest way around the Mall and neighbourhoods",
    transport: "Metro + walk the Mall; rideshares for Georgetown waterfront evenings",
    shopping: ["Georgetown", "Union Market", "CityCenterDC"],
    nightlife: ["U Street", "Navy Yard", "Adams Morgan"],
    museums: ["Smithsonian cluster", "National Gallery of Art", "United States Holocaust Memorial Museum"],
    localFoods: ["Half-smokes", "Maryland crab", "Ethiopian on U Street"],
    hiddenGems: ["Kenilworth Aquatic Gardens", "Dumbarton Oaks", "Library of Congress interiors"],
    tips: [
      "Many Smithsonian museums are free but use timed-entry in peak seasons",
      "Wear comfortable shoes — the Mall is larger than it looks",
      "Cherry blossom week needs lodging booked early",
    ],
    faqs: [
      { question: "Can I see D.C. in two days?", answer: "Yes for highlights — Mall monuments plus two major museums — but neighbourhood dining deserves a third day." },
    ],
  },
  boston: {
    ...stock("nyc", ["nyc", "coast", "cityNight", "food"]),
    tagline: "Freedom Trail history and harbour neighbourhoods",
    overview:
      "Boston packs Revolutionary history, harbour walks, university energy and seafood institutions into a compact, subway-friendly city.",
    bestTime: "May–June and September–October",
    weather: "Four seasons — humid summers, colourful autumns, cold snowy winters",
    airport: "Logan International (BOS)",
    metro: "MBTA subway ('the T') and ferries",
    transport: "Walk downtown and the North End; T for Cambridge and Fenway",
    shopping: ["Newbury Street", "Faneuil Hall Marketplace", "Prudential Center"],
    nightlife: ["Back Bay", "Seaport", "Cambridge"],
    museums: ["Museum of Fine Arts", "Isabella Stewart Gardner Museum", "USS Constitution Museum"],
    localFoods: ["Clam chowder", "Lobster rolls", "Cannoli", "Boston cream pie"],
    hiddenGems: ["Harborwalk", "Arnold Arboretum", "Mapparium"],
    tips: [
      "Follow the Freedom Trail brick line on foot",
      "Book Fenway tours on non-game days for easier access",
      "North End restaurants fill up — reserve or go early",
    ],
    faqs: [
      { question: "Is Boston walkable?", answer: "Yes in the historic core. Use the T for Harvard, Fenway and longer hops." },
    ],
  },
  vancouver: {
    ...stock("mountains", ["mountains", "coast", "beach", "cityNight"]),
    tagline: "Mountains, ocean and a walkable seawall",
    overview:
      "Vancouver sits between ocean and peaks — Stanley Park's seawall, Granville Island and easy access to mountains make it one of North America's best outdoors cities.",
    bestTime: "June–September for dry weather; December–March for nearby skiing",
    weather: "Oceanic — mild, rainy winters and pleasant summers",
    airport: "Vancouver International (YVR)",
    metro: "SkyTrain, SeaBus and buses on TransLink",
    transport: "SkyTrain + walk downtown; bikes on the seawall; cars for Whistler day trips",
    shopping: ["Robson Street", "Granville Island", "Gastown"],
    nightlife: ["Yaletown", "Gastown", "Granville Street"],
    museums: ["Museum of Anthropology", "Vancouver Art Gallery"],
    localFoods: ["Pacific seafood", "Asian fusion", "Japadog", "Tim Hortons runs"],
    hiddenGems: ["Quarry Rock hike", "Lynn Canyon", "Olympic Village waterfront"],
    tips: [
      "Pack a rain layer even in summer",
      "Compass Card simplifies transit for multi-day stays",
      "Book Capilano or Sea to Sky trips early in summer",
    ],
    faqs: [
      { question: "Can I day-trip to Whistler without a car?", answer: "Yes — seasonal buses and tours run from downtown; winter travellers should check road conditions." },
    ],
  },
  queenstown: {
    ...stock("mountains", ["mountains", "alps", "beach", "coast"]),
    tagline: "Adventure capital on Lake Wakatipu",
    overview:
      "Queenstown pairs lake-and-alpine scenery with bungy, jet boats and wine country — New Zealand's adventure hub and a gateway to Milford Sound.",
    bestTime: "December–March for long summer days; June–August for snow sports",
    weather: "Alpine — warm summers, cold winters with snow on the Remarkables",
    airport: "Queenstown Airport (ZQN)",
    metro: "No metro — walk the town centre; shuttles and tours for activities",
    transport: "Walk town; book tours for Milford, Glenorchy and ski fields",
    shopping: ["Town centre outdoors shops", "Arrowtown galleries"],
    nightlife: ["Beach Street", "The Mall bars"],
    museums: ["Queenstown Gardens walks", "TSS Earnslaw heritage cruises"],
    localFoods: ["Fergburger", "Central Otago wine", "Lamb", "Hokey pokey ice cream"],
    hiddenGems: ["Glenorchy road", "Arrowtown Chinese settlement", "Onsen Hot Pools"],
    tips: [
      "Book Milford Sound and adventure activities ahead in peak summer",
      "Weather changes fast — pack layers for lake cruises",
      "Arrowtown is an easy half-day when Queenstown feels busy",
    ],
    faqs: [
      { question: "How many days for Queenstown?", answer: "Three days covers town highlights plus one major trip (Milford or Glenorchy); five days if you ski or do multiple adventures." },
    ],
  },
  phuket: {
    ...stock("phiPhi", ["phiPhi", "longtail", "beach", "coast"]),
    tagline: "Andaman beaches and old-town Sino-Portuguese charm",
    overview:
      "Phuket is Thailand's largest island — beaches from Patong to quiet west-coast coves, plus Phuket Town's Sino-Portuguese streets and island day trips.",
    bestTime: "November–April dry season",
    weather: "Tropical monsoon — hot year-round; wetter May–October",
    airport: "Phuket International (HKT)",
    metro: "No metro — songthaews, Grab and private drivers",
    transport: "Grab or driver for beaches; boats for Phi Phi and James Bond Island",
    shopping: ["Phuket Old Town", "Jungceylon", "night markets"],
    nightlife: ["Patong Beach Road", "Bangla Road", "Old Town cafés"],
    museums: ["Phuket Philatelic Museum", "Thai Hua Museum"],
    localFoods: ["Southern Thai curries", "Fresh seafood", "Mee sua", "Mango sticky rice"],
    hiddenGems: ["Cape Panwa", "Freedom Beach", "Kata viewpoint"],
    tips: [
      "West-coast beaches are calmer for swimming in dry season",
      "Respect temple dress codes in Phuket Town",
      "Book island boats with reputable operators; wear life jackets",
    ],
    faqs: [
      { question: "Is Patong the best base?", answer: "Patong is busiest. Kata/Karon suit beaches; Old Town suits food and culture; quieter west-coast resorts suit couples." },
    ],
  },
  "chiang-mai": {
    ...stock("temple", ["temple", "lantern", "mountains", "food"]),
    tagline: "Temples, old-city walls and northern Thai food",
    overview:
      "Chiang Mai's moated old city, Doi Suthep temple and night markets make it Northern Thailand's cultural capital — cooler and calmer than Bangkok.",
    bestTime: "November–February for cool dry weather; November for Yi Peng/Yi Peng-adjacent festivals",
    weather: "Tropical wet/dry — hot March–May, cooler Nov–Feb, green rainy season mid-year",
    airport: "Chiang Mai International (CNX)",
    metro: "No metro — songthaews, Grab and walking inside the old city",
    transport: "Walk the old city; Grab for Doi Suthep and Nimman",
    shopping: ["Sunday Walking Street", "Warorot Market", "Nimman shops"],
    nightlife: ["Nimmanhaemin", "Riverside bars", "old-city cafés"],
    museums: ["Chiang Mai City Arts & Cultural Centre", "Lanna Folklife Museum"],
    localFoods: ["Khao soi", "Sai ua", "Som tam", "Mango sticky rice"],
    hiddenGems: ["Wat Pha Lat", "Wat Umong", "Mae Kampong village"],
    tips: [
      "Rent a scooter only if you are a confident rider",
      "Temple etiquette: covered shoulders and knees",
      "Sunday Walking Street is packed — go early",
    ],
    faqs: [
      { question: "How many days in Chiang Mai?", answer: "Three days covers temples, a market night and Doi Suthep; five days allows a cooking class or countryside trip." },
    ],
  },
  cebu: {
    ...stock("beach", ["beach", "coast", "phiPhi", "longtail"]),
    tagline: "Historic port city and island-hopping base",
    overview:
      "Cebu City anchors the Visayas with Magellan's Cross and lechon culture, while Mactan and nearby islands deliver beaches, diving and canyoneering day trips.",
    bestTime: "December–May dry season",
    weather: "Tropical — hot and humid year-round; typhoons possible mid-year",
    airport: "Mactan–Cebu International (CEB)",
    metro: "No metro — jeepneys, taxis and Grab",
    transport: "Grab in the city; organised tours for Kawasan, Oslob and island hops",
    shopping: ["Ayala Center Cebu", "IT Park", "Carbon Market"],
    nightlife: ["IT Park", "Mandaue / Mactan resorts"],
    museums: ["Fort San Pedro", "Cathedral Museum"],
    localFoods: ["Cebu lechon", "Pusô rice", "Dried mangoes", "Seafood"],
    hiddenGems: ["Temple of Leah", "Sirao Flower Garden", "Alegria highlands"],
    tips: [
      "Traffic between city and Mactan can be heavy — buffer airport time",
      "Choose ethical operators for any wildlife encounters",
      "Carry cash for markets and smaller island boats",
    ],
    faqs: [
      { question: "Should I stay in Cebu City or Mactan?", answer: "City for history and food; Mactan for beach resorts and easier airport access." },
    ],
  },
  taipei: {
    ...stock("cityNight", ["cityNight", "tokyo", "temple", "food"]),
    tagline: "Night markets, temples and mountain city views",
    overview:
      "Taipei blends night-market food culture, efficient MRT, temples and the Taipei 101 skyline — one of Asia's easiest capitals for first-time visitors.",
    bestTime: "October–April for milder weather",
    weather: "Subtropical — hot humid summers, mild winters; typhoons possible summer–autumn",
    airport: "Taoyuan (TPE) and Taipei Songshan (TSA)",
    metro: "Taipei MRT is clean, bilingual and covers major sights",
    transport: "EasyCard for MRT and buses; HSR from Taipei Main for other cities",
    shopping: ["Xinyi District", "Yongkang Street", "DiHua Street"],
    nightlife: ["Shilin Night Market", "Xinyi rooftop bars", "Zhongshan"],
    museums: ["National Palace Museum", "Chiang Kai-shek Memorial Hall"],
    localFoods: ["Xiaolongbao", "Beef noodles", "Bubble tea", "Stinky tofu", "Pineapple cake"],
    hiddenGems: ["Elephant Mountain", "Beitou hot springs", "Jiufen day trip"],
    tips: [
      "Get an EasyCard on arrival for transit and convenience stores",
      "Night markets are dinner — go hungry and share plates",
      "Book National Palace Museum time if visiting on weekends",
    ],
    faqs: [
      { question: "Is Taipei enough for a Taiwan trip?", answer: "It is a perfect base for 3–4 days; add Hualien, Tainan or Kaohsiung if you have a week." },
    ],
    featured: true,
  },
  macau: {
    ...stock("cityNight", ["cityNight", "temple", "food", "coast"]),
    tagline: "Portuguese heritage and Cotai resorts",
    overview:
      "Macau pairs a UNESCO historic centre of churches and plazas with Cotai's mega-resorts — easy as a Hong Kong side trip or a food-focused overnight.",
    bestTime: "October–April",
    weather: "Subtropical — humid summers, mild winters",
    airport: "Macau International (MFM); ferries and the HZMB from Hong Kong",
    metro: "No metro — walk the historic centre; buses and taxis to Cotai",
    transport: "Walk Senado Square area; casino shuttles between Cotai resorts",
    shopping: ["Senado Square streets", "Cotai resort malls"],
    nightlife: ["Cotai Strip", "Lisboa area"],
    museums: ["Macao Museum", "Grand Prix Museum"],
    localFoods: ["Portuguese egg tarts", "Pork chop bun", "African chicken", "Dim sum"],
    hiddenGems: ["Coloane Village", "Guia Lighthouse walk", "Taipa Houses Museum"],
    tips: [
      "Clear immigration with enough time if day-tripping from Hong Kong",
      "Pataca and HKD are both widely accepted",
      "Visit the Ruins of St. Paul's early for fewer crowds",
    ],
    faqs: [
      { question: "Is one day enough for Macau?", answer: "A day covers the historic centre and one Cotai resort; overnight is better for food and evening lights." },
    ],
  },
  petra: {
    ...stock("sahara", ["sahara", "desertCamp", "temple", "mountains"]),
    tagline: "Rose-red Nabataean city carved in stone",
    overview:
      "Petra is Jordan's crowning wonder — a Siq walk to the Treasury, tombs and the Monastery climb, based in nearby Wadi Musa.",
    bestTime: "March–May and September–November",
    weather: "Desert highland — hot days, cold nights; rare winter rain",
    airport: "Fly into Amman (AMM) or Aqaba (AQJ), then road transfer",
    metro: "None — the archaeological park is explored on foot (or with approved carts/camels)",
    transport: "Stay in Wadi Musa; walk or shuttle to the visitor centre",
    shopping: ["Wadi Musa craft shops", "site vendors (bargain politely)"],
    nightlife: ["Petra by Night (selected evenings)", "hotel terraces"],
    museums: ["Petra Museum"],
    localFoods: ["Mansaf", "Mezze", "Kunafa", "Bedouin tea"],
    hiddenGems: ["Little Petra", "High Place of Sacrifice", "back-trail views of the Treasury"],
    tips: [
      "Start at opening time — shade disappears and crowds build",
      "Wear broken-in shoes for the Monastery climb",
      "Carry water and cash for the site; Jordan Pass can include entry",
    ],
    faqs: [
      { question: "How many days for Petra?", answer: "One long day covers Treasury to Monastery; two days is better for Little Petra and slower exploring." },
    ],
  },
  mykonos: {
    ...stock("greeceSea", ["greeceSea", "santorini", "santoriniDomes", "beach"]),
    tagline: "Cycladic lanes, windmills and beach clubs",
    overview:
      "Mykonos is whitewashed Cycladic charm — Little Venice sunsets, iconic windmills and beach days, with Delos a short boat ride away.",
    bestTime: "May–June and September–October; July–August for peak beach-club energy",
    weather: "Mediterranean — hot dry summers, mild winters; Meltemi winds in midsummer",
    airport: "Mykonos Airport (JMK); ferries from Athens and other islands",
    metro: "None — buses, ATVs/cars and water taxis between beaches",
    transport: "Bus network between town and beaches; walk Mykonos Town at night",
    shopping: ["Matoyianni Street", "Name-brand boutiques in town"],
    nightlife: ["Mykonos Town", "Paradise / Super Paradise beach clubs"],
    museums: ["Archaeological Museum", "Folklore Museum"],
    localFoods: ["Grilled seafood", "Louza", "Kopanisti cheese", "Baklava"],
    hiddenGems: ["Ano Mera village", "Armenistis lighthouse", "Agios Sostis beach"],
    tips: [
      "Book summer lodging and beach clubs far ahead",
      "Wear shoes you can walk on marble paving at night",
      "Delos is a morning trip — bring sun protection and water",
    ],
    faqs: [
      { question: "Is Mykonos only nightlife?", answer: "No — mornings are for lanes and beaches; nightlife is optional and concentrated after midnight in season." },
    ],
  },
  dubrovnik: {
    ...stock("coast", ["coast", "greeceSea", "venice", "santorini"]),
    tagline: "Marble streets inside Adriatic stone walls",
    overview:
      "Dubrovnik's UNESCO Old Town is a walled Adriatic jewel — wall walks, cable-car views and island day trips, best savoured outside peak cruise hours.",
    bestTime: "May–June and September–October",
    weather: "Mediterranean — hot dry summers, mild winters",
    airport: "Dubrovnik Airport (DBV)",
    metro: "None — walk the Old Town; buses to Lapad and the airport",
    transport: "Walk inside the walls; boats to Lokrum and the Elaphites",
    shopping: ["Stradun shops", "Lapad / Gruž for practical buys"],
    nightlife: ["Old Town bars", "Banje Beach clubs in summer"],
    museums: ["Rector's Palace", "War Photo Limited"],
    localFoods: ["Fresh seafood", "Black risotto", "Peka", "Local wines"],
    hiddenGems: ["Lokrum Island", "Buža Bar cliffs", "Cavtat day trip"],
    tips: [
      "Walk the walls early morning or late afternoon",
      "Cruise-ship middays are busiest — plan museums then",
      "Wear shoes with grip; marble streets polish smooth",
    ],
    faqs: [
      { question: "How many days in Dubrovnik?", answer: "Two days for Old Town and Lokrum; three if you add islands or a Montenegro / Pelješac trip." },
    ],
  },
  salzburg: {
    ...stock("alps", ["alps", "coast", "rome", "food"]),
    tagline: "Baroque old town and Alpine Sound of Music country",
    overview:
      "Salzburg's baroque Altstadt, fortress views and Mozart heritage sit against Alpine foothills — compact, musical and perfect for a two-day stop.",
    bestTime: "May–September; December for Christmas markets",
    weather: "Alpine-influenced — warm summers, cold snowy winters",
    airport: "Salzburg Airport (SZG)",
    metro: "None — walk the old town; buses funicular to the fortress",
    transport: "Walk Altstadt; day trains to Hallstatt or Munich",
    shopping: ["Getreidegasse", "Christmas markets in season"],
    nightlife: ["Rudolfskai bars", "Augustiner Bräu"],
    museums: ["DomQuartier", "Mozart's Birthplace", "Hohensalzburg Fortress"],
    localFoods: ["Mozartkugel", "Schnitzel", "Pretzels", "Beer gardens"],
    hiddenGems: ["Augustiner Bräu", "Kapuzinerberg walk", "Hellbrunn Trick Fountains"],
    tips: [
      "Salzburg Card can pay off if you stack fortress and museums",
      "Sound of Music tours sell out in summer — book ahead",
      "Old town is hilly; pack comfortable shoes",
    ],
    faqs: [
      { question: "Is Salzburg a day trip from Munich?", answer: "Yes by train, but overnighting lets you enjoy evenings after day-trippers leave." },
    ],
  },
  bruges: {
    ...stock("venice", ["venice", "coast", "paris", "food"]),
    tagline: "Canals, chocolate and a medieval belfry skyline",
    overview:
      "Bruges is a canal-woven medieval city of belfries, chocolate shops and quiet lanes — best enjoyed overnight when day-trippers thin out.",
    bestTime: "April–June and September–October",
    weather: "Maritime temperate — mild, often cloudy, pack a rain layer",
    airport: "Brussels (BRU) then train; Ostend-Bruges (OST) for some flights",
    metro: "None — walk everything in the historic centre",
    transport: "Walk or cycle; canal boats for a classic loop",
    shopping: ["Chocolate shops near Markt", "Zilverpand lanes"],
    nightlife: ["Beer cafés near Markt", "Eiermarkt"],
    museums: ["Groeningemuseum", "Fries Museum", "Basilica of the Holy Blood"],
    localFoods: ["Belgian chocolate", "Frites", "Mussels", "Trappist beer"],
    hiddenGems: ["Minnewater", "Beguinage", "windmills on the ramparts"],
    tips: [
      "Stay overnight — evenings are magical and quieter",
      "Climb the Belfry early for softer light",
      "Reserve popular beer cafés if travelling in a group",
    ],
    faqs: [
      { question: "Is Bruges too touristy?", answer: "The Markt is busy by day, but side streets and evenings still feel local — avoid only doing a two-hour coach stop." },
    ],
  },
  antalya: {
    ...stock("coast", ["coast", "beach", "greeceSea", "temple"]),
    tagline: "Turkish Riviera old town and waterfall coastline",
    overview:
      "Antalya's Kaleiçi old town sits above a turquoise harbour, with waterfalls, beaches and ancient theatres making it the Turkish Riviera's classic base.",
    bestTime: "April–June and September–October",
    weather: "Mediterranean — hot dry summers, mild winters",
    airport: "Antalya Airport (AYT)",
    metro: "Tram lines + buses; walk Kaleiçi",
    transport: "Walk the old town; tours or rental car for Aspendos and beaches",
    shopping: ["Kaleiçi boutiques", "Migros / malls outside the centre"],
    nightlife: ["Kaleiçi bars", "Lara / beach clubs in season"],
    museums: ["Antalya Museum", "Suna & İnan Kıraç Kaleiçi Museum"],
    localFoods: ["Piyaz", "Grilled fish", "Gözleme", "Turkish breakfast"],
    hiddenGems: ["Karaalioglu Park cliffs", "Kurşunlu Waterfall", "Old harbour at sunrise"],
    tips: [
      "Combine Kaleiçi with a museum morning before beach heat",
      "Aspendos is one of the best-preserved Roman theatres nearby",
      "Summer marina evenings are lively — book harbour restaurants",
    ],
    faqs: [
      { question: "Is Antalya only all-inclusive resorts?", answer: "Resorts dominate Lara/Belek, but Kaleiçi is a genuine historic town worth staying in for atmosphere." },
    ],
  },
  cancun: {
    ...stock("beach", ["beach", "coast", "maldives", "phiPhi"]),
    tagline: "Caribbean beaches and Maya day trips",
    overview:
      "Cancún's Hotel Zone delivers Caribbean swimming beaches, while Isla Mujeres, cenotes and Chichén Itzá sit within easy day-trip range of the Yucatán.",
    bestTime: "December–April dry season",
    weather: "Tropical — hot year-round; hurricane risk late summer–autumn",
    airport: "Cancún International (CUN)",
    metro: "None — ADO buses, airport shuttles and Hotel Zone buses",
    transport: "Hotel Zone bus R-1/R-2; ferries to Isla Mujeres; tours for ruins",
    shopping: ["La Isla", "Plaza Forum", "downtown Cancún markets"],
    nightlife: ["Boulevard Kukulcán party zone", "downtown for local bars"],
    museums: ["Museo Maya de Cancún", "El Rey ruins"],
    localFoods: ["Tacos al pastor", "Cochinita pibil", "Fresh ceviche", "Micheladas"],
    hiddenGems: ["Punta Nizuc", "Isla Blanca", "Puerto Morelos day trip"],
    tips: [
      "Swim inside flagged areas — currents can be strong",
      "Use reef-safe sunscreen around the Mesoamerican Reef",
      "Book Chichén Itzá tours that include a cenote stop",
    ],
    faqs: [
      { question: "Hotel Zone or downtown?", answer: "Hotel Zone for beaches and resorts; downtown (El Centro) for local food and lower prices." },
    ],
  },
};
