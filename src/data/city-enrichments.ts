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
    | "thingsToDo"
    | "itinerary"
    | "restaurants"
    | "stays"
    | "hotels"
    | "tripCost"
    | "stayAreas"
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
    ...stock("cityNight", ["cityNight", "temple", "food", "coast"]),
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
  agra: {
    ...stock("temple", ["lantern", "food", "desertCamp"]),
    tagline: "Taj Mahal dawn and Mughal legacy",
    overview:
      "Agra is synonymous with the Taj Mahal at sunrise — but also Agra Fort's red sandstone, Mehtab Bagh's river-view perspective and Mughal craft in marble inlay workshops.",
    bestTime: "October–March for pleasant weather",
    weather: "Semi-arid — very hot Apr–Jun; foggy Dec–Jan mornings",
    airport: "Agra Airport (AGR) or Delhi (DEL) + train",
    metro: "No metro; auto-rickshaws and taxis",
    transport: "Taxi between Taj, Fort and Mehtab Bagh; train from Delhi",
    shopping: ["Sadar Bazaar", "Kinari Bazaar", "Marble inlay workshops", "Raja Mandi area"],
    nightlife: ["Taj Mahal night viewing (full moon nights only)", "Hotel rooftop Taj views", "Kalakriti cultural show"],
    museums: ["Agra Fort interiors", "Itmad-ud-Daulah (Baby Taj)", "Taj Museum"],
    localFoods: ["Petha sweet", "Bedai and jalebi breakfast", "Mughlai biryani", "Tandoori chicken"],
    hiddenGems: ["Mehtab Bagh sunset Taj view", "Fatehpur Sikri day trip", "Lesser-known Itmad-ud-Daulah"],
    tips: [
      "Taj Mahal closed Fridays — plan around it",
      "Sunrise entry — queue early for first light",
      "Marble inlay demos — buy from reputable cooperatives"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  aswan: {
    ...stock("sahara", ["temple", "desertCamp", "coast"]),
    tagline: "Nubian villages and Nile cataracts",
    overview:
      "Aswan is Egypt's serene southern Nile city — Philae Temple on its island, colourful Nubian villages and the gateway for Abu Simbel day trips at Lake Nasser's edge.",
    bestTime: "October–April for comfortable temperatures",
    weather: "Desert — very hot summers; warm dry winters",
    airport: "Aswan International (ASW)",
    metro: "No metro; feluccas and taxis",
    transport: "Felucca to Nubian villages; tour bus to Abu Simbel; taxi to Philae boat dock",
    shopping: ["Aswan Souk", "Nubian village handicrafts", "Spice Market", "Essence oils shops"],
    nightlife: ["Nile corniche cafés", "Nubian house dinners", "Old Cataract Hotel terrace"],
    museums: ["Nubian Museum", "Aswan Museum on Elephantine Island", "Unfinished Obelisk site"],
    localFoods: ["Nubian tagine", "Grilled Nile fish", "Ful and taameya", "Hibiscus tea (karkadeh)"],
    hiddenGems: ["Abu Simbel at sunrise", "Elephantine Island", "Kitchener's Island botanical garden"],
    tips: [
      "Abu Simbel convoys leave pre-dawn — expect 3 AM wake-up",
      "Philae requires a short boat ride",
      "Bargain politely at the souk"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  atlanta: {
    ...stock("cityNight", ["nyc", "food", "coast"]),
    tagline: "Southern capital of food and culture",
    overview:
      "Atlanta combines civil-rights history, world-class aquariums and museums, BeltLine walks and a booming food scene across Midtown and the Westside.",
    bestTime: "March–May and September–November",
    weather: "Humid subtropical — hot summers, mild winters",
    airport: "Hartsfield–Jackson Atlanta International (ATL)",
    metro: "MARTA rail and buses",
    transport: "MARTA for airport/downtown; rideshares for neighbourhoods",
    shopping: ["Ponce City Market", "Atlantic Station", "Lenox Square", "Buckhead boutiques"],
    nightlife: ["Midtown", "Edgewood", "Buckhead", "Westside Provisions"],
    museums: ["National Center for Civil and Human Rights", "High Museum of Art", "Georgia Aquarium"],
    localFoods: ["Fried chicken", "Shrimp and grits", "Peach desserts", "Southern BBQ"],
    hiddenGems: ["BeltLine Eastside Trail", "Piedmont Park", "Martin Luther King Jr. National Historical Park"],
    tips: [
      "ATL airport is huge — allow connection time",
      "BeltLine is best on foot or bike",
      "Combine MLK historic site with Sweet Auburn"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  austin: {
    ...stock("cityNight", ["food", "nyc", "coast"]),
    tagline: "Live music capital and breakfast tacos",
    overview:
      "Austin keeps it weird with Sixth Street and Rainey live music, Lady Bird Lake trails, Franklin Barbecue queues and a tech-fuelled food scene across South Congress.",
    bestTime: "March–May and October–November; SXSW in March",
    weather: "Humid subtropical — very hot summers; mild winters",
    airport: "Austin–Bergstrom International (AUS)",
    metro: "CapMetro buses; limited rail",
    transport: "Rideshare essential for sprawl; bike Lady Bird Lake trail; walk SoCo",
    shopping: ["South Congress (SoCo)", "2nd Street District", "The Domain", "Allen Boots"],
    nightlife: ["Sixth Street", "Rainey Street", "Red River Cultural District", "Continental Club"],
    museums: ["Bullock Texas State History Museum", "Blanton Museum of Art", "LBJ Presidential Library"],
    localFoods: ["Breakfast tacos", "Franklin Barbecue brisket", "Queso", "Chicken shiner pie"],
    hiddenGems: ["Mount Bonnell sunset", "Barton Springs Pool", "Hamilton Pool (reservation required)"],
    tips: [
      "Franklin Barbecue — order online or queue early",
      "Summer heat is brutal — swim at Barton Springs",
      "SXSW and ACL — book hotels a year ahead"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  banff: {
    ...stock("alps", ["mountains", "norway", "icelandFalls"]),
    tagline: "Rockies peaks and turquoise glacial lakes",
    overview:
      "Banff is Canada's Rocky Mountain showpiece — Fairmont Banff Springs beneath Cascade Mountain, Lake Louise day trips and the Icefields Parkway into Jasper wilderness.",
    bestTime: "June–September for hiking; December–March for skiing",
    weather: "Alpine — short warm summers; long cold snowy winters",
    airport: "Calgary International (YYC) + 1.5 hr drive",
    metro: "No metro; ROAM buses in Banff; car for Lake Louise",
    transport: "Park pass required; shuttle to Lake Louise/Moraine; walk Banff Avenue",
    shopping: ["Banff Avenue shops", "Banff Indian Trading Post", "Cascade Plaza", "Lake Louise Samson Mall"],
    nightlife: ["Banff Avenue pubs", "Park Distillery", "The Banff Centre events"],
    museums: ["Banff Park Museum National Historic Site", "Whyte Museum of the Canadian Rockies", "Cave and Basin National Historic Site"],
    localFoods: ["Alberta beef", "Bison burger", "Maple desserts", "Rocky Mountain chocolate"],
    hiddenGems: ["Vermilion Lakes sunrise", "Johnston Canyon icewalk (winter)", "Bow Valley Parkway wildlife"],
    tips: [
      "Moraine Lake access requires reservation/shuttle in peak season",
      "Wildlife on roads — elk and bears common",
      "Book Banff hotels months ahead for summer"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  bilbao: {
    ...stock("coast", ["food", "cityNight", "alps"]),
    tagline: "Guggenheim titanium and pintxos lanes",
    overview:
      "Bilbao transformed around Frank Gehry's Guggenheim — a Basque city of world-class art, Casco Viejo pintxos bars and green hills above the Nervión estuary.",
    bestTime: "May–September for warmest weather",
    weather: "Oceanic — mild rainy winters; pleasant summers",
    airport: "Bilbao Airport (BIO)",
    metro: "Metro Bilbao + Euskotren + trams",
    transport: "Metro and walk; funicular to Artxanda viewpoint",
    shopping: ["Casco Viejo shops", "Gran Vía", "Azkuna Zentroa boutiques", "Mercado de la Ribera"],
    nightlife: ["Casco Viejo pintxos crawl", "Indautxu bars", "Bilbao La Vieja"],
    museums: ["Guggenheim Museum Bilbao", "Bilbao Fine Arts Museum", "Azkuna Zentroa"],
    localFoods: ["Pintxos", "Bacalao al pil-pil", "Txakoli wine", "Idiazabal cheese"],
    hiddenGems: ["Artxanda funicular views", "San Juan de Gaztelugatxe day trip", "Ribera Market upstairs"],
    tips: [
      "Pintxos — order at bar, don't sit for table service in old town",
      "Guggenheim free on certain hours for locals — check schedule",
      "Basque Country rain — pack a jacket"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  bodrum: {
    ...stock("greeceSea", ["beach", "coast", "sahara"]),
    tagline: "Aegean castle and gulet coast",
    overview:
      "Bodrum is the Turkish Riviera's whitewashed playground — Crusader castle museums, marina nightlife and gulet cruises to hidden coves on the Aegean.",
    bestTime: "May–October for beach and boat season",
    weather: "Mediterranean — hot dry summers; mild wet winters",
    airport: "Milas–Bodrum (BJV)",
    metro: "No metro; dolmuş minibuses and taxis",
    transport: "Walk marina and castle; dolmuş to beaches; gulet day cruises",
    shopping: ["Bodrum bazaar", "Marina boutiques", "Turgutreis market", "Ortakent artisan shops"],
    nightlife: ["Halikarnas disco (seasonal)", "Marina bars", "Gumbet strip", "Bodrum Castle area"],
    museums: ["Bodrum Castle & Museum of Underwater Archaeology", "Ancient Theatre", "Zeki Müren Arts Museum"],
    localFoods: ["Ege mezze", "Fresh grilled fish", "Köfte", "Turkish breakfast spread"],
    hiddenGems: ["Gümüşlük fishing village", "Yalıkavak Palmarina", "Ancient Halicarnassus Mausoleum site"],
    tips: [
      "Castle museum — allow 2 hours",
      "Gümüşlük sunset dinner is worth the taxi",
      "July–August is peak — book gulets early"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  boracay: {
    ...stock("beach", ["phiPhi", "maldives", "coast"]),
    tagline: "White Beach powder and island sunsets",
    overview:
      "Boracay's four-kilometre White Beach draws travellers for turquoise shallows, kiteboarding on Bulabog and legendary sunset sails — a compact Philippine island escape.",
    bestTime: "November–May for dry season",
    weather: "Tropical — wet Jun–Oct; typhoon risk Aug–Oct",
    airport: "Godofredo P. Ramos (MPH) on nearby Caticlan",
    metro: "No metro; tricycles and e-trikes on island",
    transport: "Tricycle along White Beach; boat to Puka and Diniwid",
    shopping: ["D'Mall de Boracay", "D'Talipapa Market", "Station 2 beach vendors", "Craft stalls at White Beach"],
    nightlife: ["Station 2 beach bars", "Cocomangas Shooter", "Epic Boracay", "Exit Bar"],
    museums: ["Boracay Butterfly Garden", "Boracay Ocean Club Gallery", "Motag Living Museum (nearby Malay)"],
    localFoods: ["Chori burger", "Fresh grilled seafood", "Calamansi juice", "Halo-halo"],
    hiddenGems: ["Puka Shell Beach", "Diniwid Beach", "Mount Luho viewpoint"],
    tips: [
      "Station 1 is quietest; Station 2 is liveliest",
      "No smoking on White Beach",
      "Book island-hopping tours through reputable operators"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  bordeaux: {
    ...stock("eiffel", ["paris", "coast", "food"]),
    tagline: "Grand Théâtre columns and Médoc châteaux",
    overview:
      "Bordeaux is a UNESCO wine capital — neoclassical quays, La Cité du Vin and day trips to Saint-Émilion vineyards along the Garonne estuary.",
    bestTime: "May–October for vineyard visits and outdoor dining",
    weather: "Oceanic — mild winters; warm summers",
    airport: "Bordeaux–Mérignac (BOD)",
    metro: "Tram network (TBM) + trains to wine regions",
    transport: "Tram in city; train to Saint-Émilion; bike the river quays",
    shopping: ["Rue Sainte-Catherine", "Chartrons antiques", "Marché des Capucins", "Wine shops on Cours du Languedoc"],
    nightlife: ["Place de la Victoire", "Chartrons wine bars", "Quai des Chartrons", "Darwin Eco-système"],
    museums: ["La Cité du Vin", "CAPC Museum of Contemporary Art", "Musée d'Aquitaine"],
    localFoods: ["Canelé pastry", "Entrecôte bordelaise", "Oysters from Arcachon", "Duck confit"],
    hiddenGems: ["Miroir d'eau reflections", "Saint-Émilion day trip", "Cap Ferret oyster villages"],
    tips: [
      "Book château tastings ahead in harvest season",
      "La Cité du Vin — allow half a day",
      "Tram is easiest for wine museum and centre"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  cairns: {
    ...stock("beach", ["coast", "maldives", "mountains"]),
    tagline: "Great Barrier Reef gateway and rainforest",
    overview:
      "Cairns is Tropical North Queensland's launchpad — Great Barrier Reef snorkel day boats, Kuranda Scenic Railway through rainforest and the Esplanade lagoon in a laid-back city.",
    bestTime: "May–October for dry season and calm reef",
    weather: "Tropical — wet Nov–Apr; stinger season Oct–May (use nets/suits)",
    airport: "Cairns Airport (CNS)",
    metro: "No metro; Sunbus local buses",
    transport: "Reef tour boats from marina; Kuranda Scenic Railway + Skyrail; car for Daintree",
    shopping: ["Cairns Esplanade markets", "Rusty's Markets", "Cairns Central", "Night Markets"],
    nightlife: ["Esplanade bars", "The Pier Bar", "Gilligan's Backpacker (party hub)"],
    museums: ["Cairns Aquarium", "Tjapukai Aboriginal Cultural Park", "Cairns Museum"],
    localFoods: ["Barramundi", "Crocodile (try once)", "Tropical fruit", "Moreton Bay bugs"],
    hiddenGems: ["Palm Cove beach day trip", "Atherton Tablelands waterfalls", "Fitzroy Island ferry"],
    tips: [
      "Reef trips — book reputable operators; check seasickness",
      "Stinger season — wear lycra suits",
      "Daintree — crocodile safety signs are serious"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  cappadocia: {
    ...stock("desertCamp", ["sahara", "mountains", "temple"]),
    tagline: "Fairy chimneys and dawn balloons",
    overview:
      "Göreme and Cappadocia's volcanic valleys offer cave hotels, hot-air balloon sunrises over fairy chimneys and underground cities carved by early Christians.",
    bestTime: "April–June and September–November",
    weather: "Continental steppe — hot dry summers; cold winters with snow",
    airport: "Nevşehir Kapadokya (NAV) or Kayseri (ASR)",
    metro: "No metro; tour vans and ATVs",
    transport: "Tour packages for valleys; ATV tours; walk Göreme Open-Air Museum",
    shopping: ["Göreme pottery workshops", "Avanos ceramics", "Onyx and carpet shops", "Local wine shops"],
    nightlife: ["Cave restaurant dinners", "Turkish night shows", "Göreme rooftop bars"],
    museums: ["Göreme Open-Air Museum", "Zelve Open-Air Museum", "Underground cities (Kaymakli/Derinkuyu)"],
    localFoods: ["Testi kebab (pottery kebab)", "Manti", "Gözleme", "Local Cappadocia wine"],
    hiddenGems: ["Love Valley hike at sunrise", "Uçhisar Castle panorama", "Ihlara Valley day trip"],
    tips: [
      "Balloon flights cancel in high wind — book multiple mornings",
      "Cave hotels — check heating in winter",
      "ATV tours — bring dust mask and sunglasses"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  charleston: {
    ...stock("coast", ["cityNight", "food", "nyc"]),
    tagline: "Rainbow Row and Lowcountry cuisine",
    overview:
      "Charleston is preserved antebellum elegance — Rainbow Row pastel houses, carriage tours through the Battery and a James Beard-saturated restaurant scene.",
    bestTime: "March–May and October–November",
    weather: "Humid subtropical — hot summers; hurricane season Jun–Nov",
    airport: "Charleston International (CHS)",
    metro: "No metro; CARTA buses; walk peninsula",
    transport: "Walk historic peninsula; rideshare to plantations; car for beaches",
    shopping: ["King Street", "City Market", "Charleston Place", "Broad Street antiques"],
    nightlife: ["Upper King restaurant row", "Rooftop bars at Market", "The Commodore jazz"],
    museums: ["Charleston Museum", "Gibbes Museum of Art", "International African American Museum"],
    localFoods: ["Shrimp and grits", "She-crab soup", "Lowcountry boil", "Benne wafers"],
    hiddenGems: ["Angel Oak Tree", "Shem Creek shrimp boats", "Sullivan's Island beach"],
    tips: [
      "Restaurant reservations essential weekends",
      "Plantation visits — engage critically with slavery history",
      "Summer heat — plan indoor midday breaks"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  crete: {
    ...stock("greeceSea", ["beach", "coast", "temple"]),
    tagline: "Knossos legends and Heraklion harbour",
    overview:
      "Heraklion is Crete's capital and Minoan gateway — Knossos Palace, Venetian harbour fortifications and a staging point for Spinalonga and south-coast beaches.",
    bestTime: "April–June and September–October",
    weather: "Mediterranean — hot dry summers; mild winters",
    airport: "Heraklion International Nikos Kazantzakis (HER)",
    metro: "No metro; KTEL buses; rental car for island",
    transport: "Walk city centre; bus to Knossos; car for Spinalonga and beaches",
    shopping: ["1866 Street market", "Lion Square shops", "Central Market", "Gold Street (Dedalou)"],
    nightlife: ["Lion Square cafés", "Old harbour tavernas", "Hersonissos (nearby resort strip)"],
    museums: ["Heraklion Archaeological Museum", "Historical Museum of Crete", "Natural History Museum"],
    localFoods: ["Dakos salad", "Kalitsounia cheese pies", "Gamopilafo", "Cretan raki"],
    hiddenGems: ["Spinalonga island day trip", "Matala caves beach", "Archanes wine village"],
    tips: [
      "Knossos — go early; afternoon heat is intense",
      "Heraklion Archaeological Museum pairs with Knossos",
      "Rent a car to explore Crete properly"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  denver: {
    ...stock("mountains", ["alps", "cityNight", "nyc"]),
    tagline: "Mile High city and Rocky Mountain gateway",
    overview:
      "Denver pairs LoDo brewpubs and Red Rocks concerts with day trips to Rocky Mountain National Park — a sunny high-altitude city where the Great Plains meet the Rockies.",
    bestTime: "May–October for hiking; December–March for skiing nearby",
    weather: "Semi-arid — 300 days of sun; sudden snow possible; altitude 5,280 ft",
    airport: "Denver International (DEN)",
    metro: "RTD light rail and buses",
    transport: "A Line rail to Union Station; car for RMNP; walk LoDo and RiNo",
    shopping: ["16th Street Mall", "Cherry Creek Shopping Center", "RiNo boutiques", "Union Station shops"],
    nightlife: ["LoDo bars", "RiNo breweries", "Red Rocks concerts (seasonal)", "South Broadway"],
    museums: ["Denver Art Museum", "Denver Museum of Nature & Science", "Clyfford Still Museum"],
    localFoods: ["Green chile (Colorado style)", "Bison burger", "Craft beer", "Rocky Mountain oysters"],
    hiddenGems: ["Red Rocks Amphitheatre hike", "Mount Evans scenic byway (seasonal)", "Washington Park"],
    tips: [
      "Altitude — drink water and pace first day",
      "Red Rocks — hike amphitheatre in morning",
      "RMNP timed entry in peak summer — reserve ahead"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  fez: {
    ...stock("sahara", ["desertCamp", "temple", "food"]),
    tagline: "Medina labyrinth and leather tanneries",
    overview:
      "Fez el-Bali is the world's largest car-free urban zone — 9,000 alleyways, Al-Attarine Madrasa tilework and the iconic Chouara tannery vats seen from terrace viewpoints.",
    bestTime: "March–May and October–November",
    weather: "Mediterranean-inland — hot dry summers; cool wet winters",
    airport: "Fès–Saïs (FEZ)",
    metro: "No metro; hire official medina guide",
    transport: "Guided medina walks essential first visit; taxi to Ville Nouvelle",
    shopping: ["Souk Attarine", "Souk Seffarine (copper)", "Chouara tannery leather goods", "Henri Maier pottery"],
    nightlife: ["Rooftop restaurants in riads", "Scheherazade cabaret dinner", "Medina closes early — riad dinners"],
    museums: ["Nejjarine Museum of Wooden Arts", "Borj Nord Arms Museum", "Dar Batha Museum"],
    localFoods: ["Bastilla (pastilla)", "Tagine", "Harira soup", "Medina bread from communal ovens"],
    hiddenGems: ["Al-Attarine Madrasa", "Merenid Tombs viewpoint", "Day trip to Meknes and Volubilis"],
    tips: [
      "Hire licensed guide for medina first day — easy to get lost",
      "Tannery terraces — tip expected for view access",
      "Friday — many shops close for prayers"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  fiji: {
    ...stock("beach", ["maldives", "coast", "phiPhi"]),
    tagline: "Bula spirit and Denarau gateway",
    overview:
      "Nadi and Denarau are Fiji's main tourist gateway — Mamanuca island hops, Sri Siva Subramaniya Temple colour and village kava ceremonies before transfers to resort islands.",
    bestTime: "May–October for dry season",
    weather: "Tropical — wet Nov–Apr; cyclone risk Dec–Apr",
    airport: "Nadi International (NAN)",
    metro: "No metro; taxis and resort transfers",
    transport: "Resort transfers from Nadi; ferries to Mamanuca/Yasawa islands; taxi to Denarau",
    shopping: ["Nadi Handicraft Market", "Denarau Marina shops", "Jack's of Fiji", "Municipal Market Nadi"],
    nightlife: ["Denarau marina bars", "Nadi town local bars", "Resort lovo nights and meke dances"],
    museums: ["Sri Siva Subramaniya Temple (active temple)", "Fiji Museum Suva (day trip)", "Garden of the Sleeping Giant"],
    localFoods: ["Kokoda (ceviche)", "Lovo earth-oven feast", "Rourou (taro leaves)", "Kava ceremony drink"],
    hiddenGems: ["Cloud 9 floating bar (Mamanuca)", "Sabeto Mud Pool and Hot Spring", "Garden of the Sleeping Giant orchids"],
    tips: [
      "Island transfers — confirm boat times with resort",
      "Village visits — bring sela (sarong) and respect kava protocol",
      "Fiji time is relaxed — build buffer into schedules"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  frankfurt: {
    ...stock("cityNight", ["food", "alps", "nyc"]),
    tagline: "Mainhattan skyline and apple-wine taverns",
    overview:
      "Frankfurt is Germany's finance hub with a reconstructed Altstadt, apple-wine taverns in Sachsenhausen and Europe's third-busiest airport connecting the continent.",
    bestTime: "May–September for riverfront and festivals",
    weather: "Oceanic — mild winters; warm summers",
    airport: "Frankfurt Airport (FRA) — major European hub",
    metro: "U-Bahn, S-Bahn and trams (RMV network)",
    transport: "S-Bahn from airport; walk Altstadt; day trip Rhine Valley by train",
    shopping: ["Zeil shopping street", "Kleinmarkthalle", "MyZeil mall", "Goethestraße luxury"],
    nightlife: ["Sachsenhausen apple-wine taverns", "Oberrad river bars", "Bockenheim student bars"],
    museums: ["Städel Museum", "Senckenberg Natural History Museum", "German Film Museum"],
    localFoods: ["Grüne Soße (green sauce)", "Handkäse mit Musik", "Frankfurter Würstchen", "Apfelwein (apple wine)"],
    hiddenGems: ["Palmengarten botanical garden", "Main river beach clubs (summer)", "Rhine Valley day trip"],
    tips: [
      "Museumsufer — many museums on river",
      "Apple wine — traditional glass with diamond pattern (Geripptes)",
      "Frankfurt Book Fair week — hotels sell out"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  galapagos: {
    ...stock("coast", ["beach", "machuPicchu", "mountains"]),
    tagline: "Darwin's islands and fearless wildlife",
    overview:
      "Puerto Ayora on Santa Cruz is the Galápagos hub — giant tortoises in the highlands, sea lions at La Lobería and boat trips to neighbouring islands for endemic wildlife encounters.",
    bestTime: "December–May for warm calm seas; June–Nov for cooler wildlife activity",
    weather: "Equatorial Pacific — warm wet season Dec–May; garúa mist Jun–Nov",
    airport: "Seymour Galapagos (GPS) on Baltra; ferry/bus to Puerto Ayora",
    metro: "No metro; water taxis and island boats",
    transport: "Guided island tours required for most sites; water taxi across Academy Bay",
    shopping: ["Puerto Ayora artisan market", "Charles Darwin Ave shops", "Fish market souvenirs", "Local chocolate and coffee"],
    nightlife: ["Puerto Ayora waterfront bars", "Charles Darwin Avenue restaurants", "Early nights — dawn boat tours"],
    museums: ["Charles Darwin Research Station", "Galápagos Interpretation Center (San Cristóbal)", "Galapagos National Park HQ exhibits"],
    localFoods: ["Encebollado fish soup", "Seco de chivo", "Fresh ceviche", "Plantain patacones"],
    hiddenGems: ["Tortuga Bay kayak", "Garrapatero Beach", "Highlands tortoise reserves"],
    tips: [
      "National Park rules are strict — stay with licensed guides",
      "Bring reef-safe sunscreen and cash — ATMs limited",
      "Book island-hopping cruises months ahead"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  galle: {
    ...stock("coast", ["beach", "temple", "lantern"]),
    tagline: "Dutch ramparts and Indian Ocean surf",
    overview:
      "Galle Fort is a UNESCO walled town of colonial lanes, boutique cafés and rampart sunsets — gateway to Sri Lanka's south-coast beaches and stilt fishermen.",
    bestTime: "December–March for dry season on south coast",
    weather: "Tropical — wet May–Sep on south coast",
    airport: "Mattala Rajapaksa (HRI) or Colombo (CMB) + train",
    metro: "No metro; tuk-tuk and walk within fort",
    transport: "Tuk-tuk; train from Colombo; scooter for beaches",
    shopping: ["Pedlar Street boutiques", "Galle Fort craft shops", "Mango House", "Orchid House"],
    nightlife: ["Fort rampart sunset bars", "Unawatuna beach bars", "A Minute by Tuk Tuk"],
    museums: ["Maritime Archaeology Museum", "National Museum Galle", "Dutch Reformed Church"],
    localFoods: ["Kottu roti", "Hoppers", "Curry and rice", "Fresh seafood"],
    hiddenGems: ["Jungle Beach", "Japanese Peace Pagoda", "Stilt fishermen near Koggala"],
    tips: [
      "Walk the fort ramparts at sunset",
      "Combine with Mirissa whale watching (seasonal)",
      "Train from Colombo to Galle is scenic"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  goa: {
    ...stock("beach", ["coast", "temple", "food"]),
    tagline: "Portuguese churches and palm-lined beaches",
    overview:
      "Goa blends colonial churches in Old Goa, Latin Quarter colour in Panaji and a beach belt from lively Baga to quieter South Goa coves — India's laid-back coastal escape.",
    bestTime: "November–February for dry, sunny weather",
    weather: "Tropical monsoon — wet Jun–Sep; hot Mar–May",
    airport: "Goa Manohar International (GOX) / Dabolim (GOI)",
    metro: "No metro; taxis, scooters and buses",
    transport: "Scooter rental popular; prepaid taxis from airport",
    shopping: ["Anjuna Flea Market (seasonal)", "Mapusa Market", "Panaji 18th June Road", "Calangute beach stalls"],
    nightlife: ["Tito's Lane Baga", "Anjuna trance parties (seasonal)", "Palolem beach shacks"],
    museums: ["Museum of Christian Art Old Goa", "Goa State Museum Panaji", "Naval Aviation Museum"],
    localFoods: ["Fish curry rice", "Goan vindaloo", "Bebinca", "Xacuti"],
    hiddenGems: ["Fontainhas Latin Quarter", "Chapora Fort sunset", "Spice plantation tours"],
    tips: [
      "North Goa is lively; South Goa is quieter — pick your zone",
      "Cover shoulders at churches",
      "Monsoon season closes many beach shacks"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  granada: {
    ...stock("coast", ["food", "temple", "cityNight"]),
    tagline: "Alhambra palaces and Albaicín views",
    overview:
      "Granada's Alhambra fortress-palace crowns a city of Moorish quarters, free-tapas culture and Sierra Nevada backdrop — one of Spain's most essential stops.",
    bestTime: "April–May and September–October",
    weather: "Continental-Mediterranean — hot dry summers; cold winters at altitude",
    airport: "Federico García Lorca Granada-Jaén (GRX)",
    metro: "No metro; buses and walkable centre",
    transport: "Walk Albaicín and centre; bus C3 to Alhambra; taxi for late nights",
    shopping: ["Alcaicería bazaar", "Albaicín craft shops", "Gran Vía", "Mercado San Agustín"],
    nightlife: ["Calle Elvira tapas", "Plaza Nueva bars", "Flamenco in Sacromonte caves", "Carrera del Darro"],
    museums: ["Alhambra Museum", "Science Park (Parque de las Ciencias)", "Archaeological Museum"],
    localFoods: ["Free tapas with drinks", "Plato alpujarreño", "Pionono pastry", "Remojón granaíno"],
    hiddenGems: ["Mirador de San Nicolás sunset", "Sacromonte cave dwellings", "Carmen de los Mártires gardens"],
    tips: [
      "Alhambra tickets sell out — book 2–3 months ahead",
      "Wear comfortable shoes for Albaicín cobbles",
      "Evening visit to Alhambra Nasrid Palaces is magical"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  guadalajara: {
    ...stock("cityNight", ["food", "coast", "temple"]),
    tagline: "Tequila, mariachi and torta ahogada",
    overview:
      "Guadalajara is Mexico's second city — birthplace of mariachi and tequila, with Hospicio Cabañas murals, Tlaquepaque crafts and torta ahogada street feasts.",
    bestTime: "October–December for mild dry weather",
    weather: "Subtropical highland — warm days, cool nights; wet Jun–Sep",
    airport: "Guadalajara International Miguel Hidalgo (GDL)",
    metro: "Macrobús BRT + light rail (Sistema de Tren Ligero)",
    transport: "Macrobús for centre; Uber widely used; tequila country day tours",
    shopping: ["Tlaquepaque artisan village", "Mercado San Juan de Dios", "Andares mall", "Libertad Market"],
    nightlife: ["Plaza de los Mariachis", "Chapultepec nightlife corridor", "Tlaquepaque cantinas", "Americana neighbourhood bars"],
    museums: ["Instituto Cultural Cabañas", "Hospicio Cabañas (UNESCO)", "Museum of the Arts (MUSA)"],
    localFoods: ["Torta ahogada", "Birria", "Tequila and cantarito cocktails", "Pozole"],
    hiddenGems: ["Tequila town Jose Cuervo distillery day trip", "Barranca de Huentitán canyon", "Lake Chapala day trip"],
    tips: [
      "Tlaquepaque — go weekday for calmer shopping",
      "Tequila trains and tours — book ahead weekends",
      "Altitude 1,500 m — sun is strong"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  hangzhou: {
    ...stock("temple", ["lantern", "food", "cityNight"]),
    tagline: "West Lake poetry and Longjing tea",
    overview:
      "Hangzhou's misty West Lake, Lingyin Temple and Longjing tea villages have inspired Chinese poets for centuries — a serene counterpoint to Shanghai day trips.",
    bestTime: "March–May and September–November",
    weather: "Humid subtropical — hot humid summers, mild winters",
    airport: "Hangzhou Xiaoshan International (HGH)",
    metro: "Hangzhou Metro lines 1–6+",
    transport: "Metro to West Lake; bike around the lake; Didi rideshares",
    shopping: ["Hefang Street", "Qinghefang Ancient Street", "Longjing tea villages", "MixC Mall"],
    nightlife: ["West Lake night show area", "Nanshan Road bars", "Binjiang district"],
    museums: ["China National Silk Museum", "Zhejiang Provincial Museum", "Hangzhou Museum"],
    localFoods: ["West Lake fish in vinegar", "Dongpo pork", "Longjing shrimp", "Pian'er chuan noodles"],
    hiddenGems: ["Xixi Wetland", "Fei Lai Feng grottoes", "Meijiawu tea village"],
    tips: [
      "West Lake is best early morning or at dusk",
      "Book Impression West Lake show tickets ahead",
      "Longjing tea purchases — buy from reputable plantations"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  hobart: {
    ...stock("coast", ["mountains", "cityNight", "food"]),
    tagline: "MONA art and Salamanca Market",
    overview:
      "Hobart is Tasmania's harbour capital — David Walsh's MONA museum, Saturday Salamanca Market, Mount Wellington/kunanyi views and Australia's oldest pub culture.",
    bestTime: "December–February for warmest weather and festivals",
    weather: "Oceanic — cool year-round; four seasons in one day",
    airport: "Hobart Airport (HBA)",
    metro: "No metro; Metro buses; walk waterfront",
    transport: "Walk Salamanca and CBD; ferry to MONA; car for Port Arthur day trip",
    shopping: ["Salamanca Market (Saturday)", "Salamanca Place boutiques", "Cat and Fiddle Arcade", "Farm Gate Market (Sunday)"],
    nightlife: ["Salamanca pubs", "Waterfront bars", "MONA events and festivals"],
    museums: ["MONA (Museum of Old and New Art)", "Tasmanian Museum and Art Gallery", "Maritime Museum of Tasmania"],
    localFoods: ["Fresh Tasmanian salmon", "Curried scallop pie", "Wallaby (game meat)", "Tasmanian whisky"],
    hiddenGems: ["Battery Point village walk", "Bruny Island day trip", "Mount Wellington summit"],
    tips: [
      "MONA — book ferry + entry together",
      "Salamanca Market only Saturday 8:30 AM–3 PM",
      "Port Arthur — allow full day from Hobart"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "hoi-an": {
    ...stock("lantern", ["temple", "food", "coast"]),
    tagline: "Lantern-lit old town and tailor shops",
    overview:
      "Hoi An's UNESCO Ancient Town glows with yellow walls, lantern nights and riverside cafés — a walkable base for beaches, cooking classes and custom tailoring.",
    bestTime: "February–April for dry, pleasant weather",
    weather: "Tropical monsoon — hot summers, rainy Oct–Dec",
    airport: "Da Nang International (DAD) — 45 min by road",
    metro: "No metro; walk or bicycle in town",
    transport: "Bicycle rental; taxi to An Bang Beach; shuttle to Da Nang",
    shopping: ["Ancient Town silk shops", "Nguyen Phuc Chu Street tailors", "Central Market", "Night Market"],
    nightlife: ["Ancient Town lantern bars", "An Bang Beach bars", "Riverside cafés", "Full Moon Lantern Festival (monthly)"],
    museums: ["Hoi An Museum of History & Culture", "Museum of Trade Ceramics", "Sa Huynh Culture Museum"],
    localFoods: ["Cao lau noodles", "White rose dumplings", "Mi Quang", "Com ga Hoi An"],
    hiddenGems: ["Tra Que Vegetable Village", "Cam Kim Island bike loop", "Kim Bong carpentry village"],
    tips: [
      "Buy an Ancient Town ticket for assembly halls and old houses",
      "Tailoring needs 24–48 hours — plan ahead",
      "Full Moon nights restrict motor traffic in the old town"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  honolulu: {
    ...stock("beach", ["coast", "maldives", "phiPhi"]),
    tagline: "Waikiki beaches and Hawaiian culture",
    overview:
      "Honolulu pairs Waikiki's beachfront energy with Pearl Harbor history, Diamond Head hikes and easy island day trips across Oʻahu.",
    bestTime: "April–June and September–November for fewer crowds",
    weather: "Tropical — warm year-round; trade winds; wetter winters on windward side",
    airport: "Daniel K. Inouye International (HNL)",
    metro: "TheBus island network; no metro",
    transport: "TheBus, rideshares, rental car for North Shore",
    shopping: ["Ala Moana Center", "International Market Place", "Chinatown Honolulu", "Royal Hawaiian Center"],
    nightlife: ["Waikiki beachfront bars", "Chinatown", "Kakaʻako"],
    museums: ["Bishop Museum", "Pearl Harbor museums", "Honolulu Museum of Art"],
    localFoods: ["Poke", "Plate lunch", "Spam musubi", "Shave ice"],
    hiddenGems: ["Lanikai Beach", "Manoa Falls", "Kailua town"],
    tips: [
      "Start Diamond Head early for cooler temperatures",
      "Respect sacred sites and reef etiquette",
      "Book Pearl Harbor tickets online"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  ibiza: {
    ...stock("beach", ["coast", "cityNight", "greeceSea"]),
    tagline: "Dalt Vila walls and Balearic beats",
    overview:
      "Ibiza balances UNESCO Dalt Vila fortress lanes, crystalline coves and a world-famous club scene — with quieter north-coast retreats and Formentera day ferries.",
    bestTime: "May–June and September for warm weather without peak crowds",
    weather: "Mediterranean — hot dry summers; mild winters",
    airport: "Ibiza Airport (IBZ)",
    metro: "No metro; buses, taxis and scooters",
    transport: "Bus to beaches; taxi at night; ferry to Formentera",
    shopping: ["Dalt Vila boutiques", "Las Dalias Hippy Market", "Punta Arabí Hippy Market", "Ibiza Town marina"],
    nightlife: ["Pacha Ibiza", "Ushuaïa", "Amnesia", "Café del Mar sunset strip"],
    museums: ["Archaeological Museum of Ibiza", "Contemporary Art Museum (MACE)", "Madina Yabisa Interpretation Centre"],
    localFoods: ["Bullit de peix fish stew", "Sofrit pagès", "Flaó cheesecake", "Ensaimada"],
    hiddenGems: ["Es Vedrà viewpoint", "Cala Comte sunset", "Formentera day ferry"],
    tips: [
      "Dalt Vila is best explored on foot before beach clubs",
      "Book clubs and restaurants in August",
      "North coast (Portinatx, San Juan) is quieter"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  iguazu: {
    ...stock("mountains", ["coast", "machuPicchu", "icelandFalls"]),
    tagline: "Devil's Throat and triple-border falls",
    overview:
      "Foz do Iguaçu on the Brazilian side offers panoramic falls walkways and helicopter views of Iguaçu's 275 cascades — with day trips to Argentina's catwalks and Itaipu Dam.",
    bestTime: "March–May and August–November for good flow and fewer crowds",
    weather: "Subtropical — hot humid summers; warm winters",
    airport: "Foz do Iguaçu International (IGU)",
    metro: "No metro; Urban transport buses to falls",
    transport: "Bus to Iguaçu National Park; tours to Argentina side and Itaipu",
    shopping: ["Catuaí Palladium Shopping", "Mercosul Market", "Bird Park gift shop", "Marco das Três Fronteiras complex"],
    nightlife: ["Rafain Churrascaria show", "Itaipu Lake waterfront", "Downtown Foz bars"],
    museums: ["Bird Park (Parque das Aves)", "Muslim Mosque of Foz (regional landmark)", "Itaipu Dam visitor centre"],
    localFoods: ["Churrasco", "Pão de queijo", "Moqueca", "Açaí"],
    hiddenGems: ["Macuco Safari boat under falls (Argentina side)", "Belmond Hotel das Cataratas (inside park)", "Triple Frontier monument"],
    tips: [
      "Brazil side = panoramas; Argentina side = close catwalks — do both",
      "Waterproof phone case essential",
      "Yellow fever vaccination may be required — check current rules"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  innsbruck: {
    ...stock("alps", ["mountains", "cityNight", "food"]),
    tagline: "Golden Roof and Nordkette peaks",
    overview:
      "Innsbruck is the Tyrol capital where Habsburg history meets instant alpine access — Nordkette cable car rises from city centre to 2,000-metre ridges in minutes.",
    bestTime: "December–March for skiing; June–September for hiking",
    weather: "Alpine continental — cold snowy winters; mild summers",
    airport: "Innsbruck Airport (INN)",
    metro: "No metro; IVB buses and trams",
    transport: "Walk Altstadt; Nordkette funicular + cable car; train to Hallstatt day trip",
    shopping: ["Maria-Theresien-Straße", "Old Town arcades", "Rathaus Galerien", "Swarovski Kristallwelten (nearby)"],
    nightlife: ["Maria-Theresien-Straße bars", "Old Town taverns", "Hofgarten area"],
    museums: ["Tyrolean State Museum", "Imperial Palace (Hofburg)", "Bergisel Ski Jump Museum"],
    localFoods: ["Tiroler Gröstl", "Käsespätzle", "Apfelstrudel", "Schnitzel"],
    hiddenGems: ["Bergisel Ski Jump Zaha Hadid design", "Hungerburg funicular", "Ambras Castle"],
    tips: [
      "Nordkette — check weather at valley station",
      "Innsbruck Card covers major attractions",
      "Combine with Swarovski Crystal Worlds if travelling with family"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  interlaken: {
    ...stock("alps", ["mountains", "norway", "cityNight"]),
    tagline: "Jungfrau gateway between two lakes",
    overview:
      "Interlaken sits between Lake Thun and Lake Brienz as the classic base for Jungfraujoch trains, paragliding over the Höhematte and Lauterbrunnen valley day trips.",
    bestTime: "June–September for alpine activities; December–March for skiing",
    weather: "Alpine — cool summers; snowy winters; weather changes fast",
    airport: "Bern (BRN) or Zurich (ZRH) + train; Interlaken Ost/Ost stations",
    metro: "No metro; Swiss rail, buses and mountain railways",
    transport: "Swiss Travel Pass; trains to Grindelwald/Lauterbrunnen; boat cruises on lakes",
    shopping: ["Höheweg souvenir shops", "Metropole Arcade", "Unions Spital", "Grindelwald outdoor gear"],
    nightlife: ["Höheweg bars", "Backpacker bars Bönigen", "Casino Kursaal Interlaken"],
    museums: ["Touristik-Museum der Jungfrau-Region", "Jungfrau Park (nearby)", "Ballenberg Open-Air Museum (day trip)"],
    localFoods: ["Rösti", "Fondue", "Berner Platte", "Swiss chocolate"],
    hiddenGems: ["Harder Kulm sunset funicular", "Trümmelbach Falls inside the mountain", "Schynige Platte wildflower hike"],
    tips: [
      "Jungfraujoch — book first train to avoid clouds",
      "Paragliding weather-dependent — have backup plans",
      "Swiss trains run like clockwork — be on time"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  jaipur: {
    ...stock("temple", ["lantern", "food", "desertCamp"]),
    tagline: "Pink City palaces and bazaar bling",
    overview:
      "Jaipur is the Pink City of maharajas — Amber Fort elephant paths, Hawa Mahal's honeycomb facade and Johari Bazaar jewellery under Rajasthani desert sun.",
    bestTime: "November–February for cool dry weather",
    weather: "Semi-arid — scorching summers; mild winters",
    airport: "Jaipur International (JAI)",
    metro: "Jaipur Metro (limited); auto-rickshaws everywhere",
    transport: "Auto-rickshaw with agreed fare; car for Amber Fort; walk old city",
    shopping: ["Johari Bazaar", "Bapu Bazaar", "Tripolia Bazaar", "MI Road"],
    nightlife: ["Bar Palladio Narain Niwas", "Steam lounge at Rambagh", "Amer Fort sound-and-light show"],
    museums: ["Albert Hall Museum", "City Palace Museum", "Jantar Mantar (observatory)"],
    localFoods: ["Dal baati churma", "Laal maas", "Ghewar sweet", "Pyaaz kachori"],
    hiddenGems: ["Nahargarh Fort sunset", "Patrika Gate", "Galta Ji (Monkey Temple)"],
    tips: [
      "Amber Fort — go early; elephant rides controversial — consider jeep",
      "Bargain in bazaars with good humour",
      "Hawa Mahal best photographed from street café opposite"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  jeju: {
    ...stock("coast", ["beach", "mountains", "temple"]),
    tagline: "Volcanic island, haenyeo and tangerines",
    overview:
      "Jeju Island mixes UNESCO lava tubes, Hallasan hikes, dramatic coastal cliffs and a distinct island culture shaped by haenyeo divers and black-stone villages.",
    bestTime: "April–June and September–November",
    weather: "Subtropical oceanic — mild winters, humid summers; typhoon season Aug–Sep",
    airport: "Jeju International (CJU)",
    metro: "No metro; intercity buses circle the island",
    transport: "Rental car recommended; airport buses to major towns",
    shopping: ["Dongmun Market", "Seogwipo Olle Market", "Jeju duty-free", "Hamdeok Beach cafés"],
    nightlife: ["Jeju City Nuwemaru Street", "Seogwipo harbour bars", "Aewol café coast"],
    museums: ["Jeju National Museum", "Haenyeo Museum", "Teddy Bear Museum"],
    localFoods: ["Black pork BBQ", "Jeju tangerines", "Abalone porridge", "Hallabong citrus desserts"],
    hiddenGems: ["Seongsan Ilchulbong sunrise", "Jeju Olle Trail sections", "Udo Island day trip"],
    tips: [
      "Rent a car for efficient island touring",
      "Weather changes fast on Hallasan — pack layers",
      "Book Seongsan sunrise hike the night before"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "koh-samui": {
    ...stock("beach", ["phiPhi", "longtail", "temple"]),
    tagline: "Palm-fringed Gulf island luxury",
    overview:
      "Koh Samui blends Chaweng's beach energy, Fisherman's Village charm and golden Big Buddha views — a polished Thai island with spa resorts and Ang Thong day trips.",
    bestTime: "December–April for dry season",
    weather: "Tropical — wet Oct–Dec; hot year-round",
    airport: "Samui International (USM)",
    metro: "No metro; songthaews and taxis",
    transport: "Songthaew shared taxis; scooter rental; speedboat to Ang Thong",
    shopping: ["Central Festival Samui", "Fisherman's Village Walking Street", "Chaweng Beach Road", "Lamai Night Plaza"],
    nightlife: ["Chaweng Beach clubs", "Ark Bar", "Fisherman's Village Friday market", "Green Mango"],
    museums: ["Samui Aquarium and Tiger Show", "Art Samui", "Wat Plai Laem temple complex"],
    localFoods: ["Massaman curry", "Som tam", "Fresh coconut", "Grilled seafood"],
    hiddenGems: ["Na Muang Waterfalls", "Secret Buddha Garden", "Silver Beach"],
    tips: [
      "Fisherman's Village Walking Street is Friday evenings",
      "Ang Thong closes in rough seas — check weather",
      "Songthaews — agree price before boarding"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  krabi: {
    ...stock("phiPhi", ["longtail", "beach", "coast"]),
    tagline: "Railay cliffs and island-hopping base",
    overview:
      "Krabi province centres on Ao Nang and Railay — limestone karsts, longtail boats to Hong Island and a staging point for Phi Phi day trips on the Andaman Sea.",
    bestTime: "November–April for dry season",
    weather: "Tropical monsoon — wet May–Oct",
    airport: "Krabi International (KBV)",
    metro: "No metro; songthaews and longtail boats",
    transport: "Longtail to Railay; songthaew Ao Nang–Krabi Town; tour boats to islands",
    shopping: ["Ao Nang Beach Road", "Krabi Town Night Market", "Maharaj Market", "Ao Nang Plaza"],
    nightlife: ["Ao Nang Centrepoint", "Railay beach bars", "Tonsai climber bars"],
    museums: ["Hat Noppharat Thara–Mu Ko Phi Phi National Park visitor centre", "Wat Kaew Korawaram", "Krabi Town Contemporary Art Museum"],
    localFoods: ["Pad thai", "Tom yum goong", "Gaeng som", "Fresh mango sticky rice"],
    hiddenGems: ["Emerald Pool / Sa Morakot", "Tiger Cave Temple 1,237 steps", "Tubkaek Beach"],
    tips: [
      "Railay is boat-access only — no roads",
      "Book Phi Phi tours with licensed operators",
      "Tiger Cave Temple requires modest dress"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  langkawi: {
    ...stock("beach", ["coast", "maldives", "phiPhi"]),
    tagline: "Duty-free islands and mangrove geoforest",
    overview:
      "Langkawi is Malaysia's duty-free archipelago of cable-car sky bridges, Kilim mangroves and Pantai Cenang beach bars — a relaxed tropical break with dramatic karst scenery.",
    bestTime: "November–April for drier weather",
    weather: "Tropical monsoon — wet May–Oct",
    airport: "Langkawi International (LGK)",
    metro: "No metro; rental car or Grab recommended",
    transport: "Rental car best; Grab available; island-hopping boats",
    shopping: ["Kuah town duty-free", "Cenang beach shops", "Orient Village", "Langkawi Fair Shopping Mall"],
    nightlife: ["Pantai Cenang beach bars", "Sunba Retreat", "Red Tomato"],
    museums: ["Underwater World Langkawi", "Langkawi Craft Complex", "Mahsuri Tomb & Museum"],
    localFoods: ["Ikan bakar (grilled fish)", "Nasi campur", "Laksa Langkawi", "Fresh coconut"],
    hiddenGems: ["Tanung Rhu Beach", "Datai Bay", "Temurun Waterfall"],
    tips: [
      "Rent a car — island is spread out",
      "Sky Bridge closes in high winds",
      "Duty-free alcohol is cheaper than mainland"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "luang-prabang": {
    ...stock("temple", ["lantern", "food", "coast"]),
    tagline: "Mekong temples and saffron dawn",
    overview:
      "Luang Prabang is Laos's spiritual heart — gilded wats, French-colonial streets, alms-giving at dawn and easy trips to turquoise Kuang Si Falls.",
    bestTime: "November–February for cool, dry weather",
    weather: "Tropical — hot Mar–May; wet May–Oct",
    airport: "Luang Prabang International (LPQ)",
    metro: "No metro; walk or tuk-tuk",
    transport: "Bicycle rental; tuk-tuk to falls; Mekong boat trips",
    shopping: ["Night Market", "Morning Market", "Handicraft Night Market", "Ock Pop Tok textiles"],
    nightlife: ["Night Market food stalls", "Mekong riverside bars", "Utopia bar area"],
    museums: ["Royal Palace Museum (Haw Kham)", "Traditional Arts & Ethnology Centre", "UXO Laos Visitor Centre"],
    localFoods: ["Or lam stew", "Khao soi Luang Prabang", "Jeow bong chili paste", "Khao piak sen noodles"],
    hiddenGems: ["Mount Phousi sunrise", "Bamboo Bridge (seasonal)", "Ban Xang Hai whisky village"],
    tips: [
      "Observe alms giving quietly — do not touch monks",
      "Dress modestly at temples",
      "Book Kuang Si Falls early to beat tour buses"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  lucerne: {
    ...stock("alps", ["mountains", "norway", "cityNight"]),
    tagline: "Chapel Bridge and Pilatus peaks",
    overview:
      "Lucerne wraps around Lake Lucerne beneath snow-capped Pilatus and Rigi — Chapel Bridge, swan-filled quays and mountain railways define this Swiss postcard town.",
    bestTime: "May–October for mountain excursions",
    weather: "Alpine lake — mild summers; cold snowy winters",
    airport: "Zurich (ZRH) + 1 hr train; Lucerne station central",
    metro: "No metro; buses and lake steamers",
    transport: "Swiss Travel Pass; cogwheel to Pilatus/Rigi; lake cruises",
    shopping: ["Old Town shops", "Bucherer watches", "Löwenstrasse", "Luzerner Weihnachtsmarkt (seasonal)"],
    nightlife: ["Old Town wine bars", "Casino Luzern", "Seebar by the lake"],
    museums: ["Swiss Museum of Transport", "Rosengart Collection", "Richard Wagner Museum"],
    localFoods: ["Luzerner Chügelipastete", "Fondue", "Rösti", "Swiss chocolate"],
    hiddenGems: ["Musegg Wall walk", "Lion Monument", "Mt. Rigi sunrise (Queen of Mountains)"],
    tips: [
      "Mt. Pilatus Golden Round Trip is a full day",
      "Chapel Bridge is free — best at dawn before tour groups",
      "Lake cruises pair well with mountain mornings"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  luxor: {
    ...stock("sahara", ["temple", "desertCamp", "coast"]),
    tagline: "Pharaohs, Nile feluccas and temple columns",
    overview:
      "Luxor is open-air ancient Egypt — Karnak's hypostyle hall, the Valley of the Kings and riverside feluccas at sunset on the Nile's greatest concentration of monuments.",
    bestTime: "October–April for cooler sightseeing weather",
    weather: "Desert — scorching summers (40°C+); mild winters",
    airport: "Luxor International (LXR)",
    metro: "No metro; taxis and horse carriages",
    transport: "Taxi between east and west bank; felucca on Nile; hot-air balloon at dawn",
    shopping: ["Luxor Souk", "Alabaster factory shops", "West Bank artisan stalls", "Gaddis & Co antiques"],
    nightlife: ["Luxor Temple lit at night", "Nile riverside cafés", "Sonesta St. George terrace"],
    museums: ["Luxor Museum", "Mummification Museum", "Valley of the Kings tombs"],
    localFoods: ["Koshari", "Ful medames", "Grilled pigeon", "Molokhia"],
    hiddenGems: ["Hot-air balloon at sunrise", "Medinet Habu temple", "Deir el-Medina workers' village"],
    tips: [
      "Start Valley of the Kings at opening to avoid heat and crowds",
      "West Bank needs a full day",
      "Hot-air balloons — book reputable operators only"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  marrakech: {
    ...stock("sahara", ["desertCamp", "food", "temple"]),
    tagline: "Jemaa el-Fnaa dusk and riad courtyards",
    overview:
      "Marrakech assaults the senses — Jemaa el-Fnaa snake charmers at dusk, Majorelle blue gardens, souk bargaining and Atlas Mountain day trips from riad hideaways.",
    bestTime: "March–May and September–November",
    weather: "Semi-arid — very hot summers; mild winters",
    airport: "Marrakech Menara (RAK)",
    metro: "No metro; petit taxis (insist meter) and walks in medina",
    transport: "Walk medina with offline map; taxi to Gueliz; day trip vans to Atlas",
    shopping: ["Souk Semmarine", "Jemaa el-Fnaa stalls", "Guéliz boutiques", "Les Jardin Majorelle shop"],
    nightlife: ["Jemaa el-Fnaa at night", "Comptoir Darna", "Theatro", "Nomad rooftop"],
    museums: ["Majorelle Garden & YSL Museum", "Bahia Palace", "Saadian Tombs"],
    localFoods: ["Tagine", "Couscous (Friday tradition)", "Msemen pancakes", "Mint tea"],
    hiddenGems: ["Le Jardin Secret", "El Badi Palace storks", "Agafay Desert dinner (outside city)"],
    tips: [
      "Souk touts — polite but firm no",
      "Majorelle — buy timed tickets online",
      "Ramadan — eating hours shift; respect fasting"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  mecca: {
    ...stock("sahara", ["desertCamp", "temple", "cityNight"]),
    tagline: "Holiest city and Hajj destination",
    overview:
      "Mecca is the spiritual centre of Islam where Muslim pilgrims perform Hajj and Umrah at Masjid al-Haram — non-Muslims are prohibited from entering the city; travel content serves Muslim pilgrims planning stays near the Haram and Abraj Al Bait complex.",
    bestTime: "Outside Hajj season for Umrah; avoid peak Hajj unless performing pilgrimage",
    weather: "Desert — extreme heat year-round; very crowded during Hajj (Dhul Hijjah)",
    airport: "King Abdulaziz International Jeddah (JED) + Haramain high-speed rail to Mecca",
    metro: "Mecca Metro (Mashaaer line for Hajj); buses and taxis",
    transport: "Haramain high-speed rail from Jeddah; pilgrim shuttle buses; walking within Haram zone",
    shopping: ["Abraj Al Bait Mall", "Zamzam Well area supplies", "Clock Tower shopping complex", "Local ihram and pilgrim-supply shops"],
    nightlife: ["Not applicable — spiritual city; night prayer at Haram"],
    museums: ["Museum of the Two Holy Mosques Architecture", "Kaaba Kiswa exhibition area", "Clock Tower visitor exhibits"],
    localFoods: ["Kabsa", "Mandi lamb", "Dates and zamzam water", "Arabic coffee"],
    hiddenGems: ["Jabal al-Nour (Mountain of Light) — external views for context", "Hira Cave area (Muslim pilgrims)", "Mecca heritage library exhibits"],
    tips: [
      "Non-Muslims cannot enter Mecca — this guide is for Muslim pilgrims",
      "Book Haram-view hotels months ahead for Ramadan and Hajj",
      "Use official Hajj/Umrah operators for visa and logistics"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  medina: {
    ...stock("sahara", ["desertCamp", "temple", "cityNight"]),
    tagline: "Prophet's city and pilgrimage heart",
    overview:
      "Medina is Islam's second holiest city, centred on Al-Masjid an-Nabawi — non-Muslims cannot enter the mosque or central haram zone but can stay in pilgrim-service hotels and explore approved outer districts with deep respect for local customs.",
    bestTime: "November–February for cooler weather outside Hajj peaks",
    weather: "Desert — very hot summers; mild winters; crowded during Hajj and Ramadan",
    airport: "Prince Mohammad bin Abdulaziz International (MED)",
    metro: "No metro; taxis and hotel shuttles",
    transport: "Pilgrim hotel shuttles to mosque precinct; taxis for outer sites; respect prayer times",
    shopping: ["Dates souk", "Hejaz Railway Museum shop", "Pilgrim-supply markets", "Othman bin Affan Road shops"],
    nightlife: ["Not applicable — alcohol-free city; evening prayer atmosphere around mosque precinct"],
    museums: ["Hejaz Railway Museum", "Dar Al-Madinah Museum", "Knowledge Economic City exhibits"],
    localFoods: ["Medina dates (Ajwa)", "Kabsa rice", "Mandi", "Arabic coffee and dates"],
    hiddenGems: ["Mount Uhud historical site", "Quba Mosque (for Muslim visitors)", "Date farms on city outskirts"],
    tips: [
      "Non-Muslims cannot enter Al-Masjid an-Nabawi or central haram — confirm hotel zone before booking",
      "Dress conservatively; respect prayer times",
      "Hajj season — expect extreme crowding and price surges"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  nashville: {
    ...stock("cityNight", ["nyc", "food", "coast"]),
    tagline: "Broadway honky-tonks and Music Row",
    overview:
      "Nashville is country music's capital — Broadway neon honky-tonks, the Ryman Auditorium's hallowed stage and a food scene that now rivals the soundtrack.",
    bestTime: "April–May and September–October",
    weather: "Humid subtropical — hot summers; mild winters",
    airport: "Nashville International (BNA)",
    metro: "WeGo buses; no city metro; walk downtown core",
    transport: "Walk Broadway; rideshare to Gulch and East Nashville; pedal taverns optional",
    shopping: ["Broadway souvenir shops", "12 South boutiques", "Opry Mills", "Hatch Show Print"],
    nightlife: ["Broadway honky-tonks", "The Bluebird Café", "Ryman Auditorium shows", "East Nashville bars"],
    museums: ["Country Music Hall of Fame", "Johnny Cash Museum", "National Museum of African American Music"],
    localFoods: ["Hot chicken", "Meat & three", "Biscuits and gravy", "Goo Goo Cluster"],
    hiddenGems: ["Radnor Lake state park", "The Parthenon replica", "Printer's Alley history"],
    tips: [
      "Bluebird Café — book tickets online far ahead",
      "Broadway cover charges add up — many bars free early",
      "Hot chicken heat levels — start medium"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "new-orleans": {
    ...stock("cityNight", ["food", "coast", "nyc"]),
    tagline: "Jazz, Creole and French Quarter iron",
    overview:
      "New Orleans is a living gumbo of French Quarter balconies, brass-band second lines, Creole cuisine and Mississippi riverfront — unlike anywhere else in America.",
    bestTime: "February–May and October–November; Mardi Gras is late winter",
    weather: "Humid subtropical — hot summers; hurricane season Jun–Nov",
    airport: "Louis Armstrong New Orleans International (MSY)",
    metro: "Streetcars + RTA buses",
    transport: "Streetcar on St. Charles; walk French Quarter; rideshare at night",
    shopping: ["French Market", "Magazine Street", "Royal Street antiques", "Decatur Street"],
    nightlife: ["Frenchmen Street live music", "Bourbon Street (touristy)", "Preservation Hall jazz", "Maple Leaf Bar"],
    museums: ["National WWII Museum", "New Orleans Museum of Art", "Backstreet Cultural Museum"],
    localFoods: ["Beignets at Café du Monde", "Gumbo", "Po'boys", "Crawfish étouffée"],
    hiddenGems: ["Garden District streetcar ride", "Cemetery tours (St. Louis No. 1)", "Bayou swamp tour"],
    tips: [
      "Book restaurants during Jazz Fest and Mardi Gras months ahead",
      "Frenchmen Street beats Bourbon for live music",
      "Heat and humidity — pace yourself with AC breaks"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  oaxaca: {
    ...stock("food", ["temple", "cityNight", "desertCamp"]),
    tagline: "Mole, mezcal and Monte Albán",
    overview:
      "Oaxaca City is Mexico's indigenous culinary capital — Zapotec ruins at Monte Albán, mole negro in market halls and mezcal palenques in nearby villages.",
    bestTime: "October–April for dry season; Día de Muertos late October",
    weather: "Semi-arid highland — warm days, cool nights",
    airport: "Oaxaca International Xoxocotlán (OAX)",
    metro: "No metro; walk centre; taxis to Monte Albán",
    transport: "Walk historic centre; tour van to Hierve el Agua; taxi to Monte Albán",
    shopping: ["Mercado 20 de Noviembre", "Mercado Benito Juárez", "Textile villages (Teotitlán)", "Macedonio Alcalá street"],
    nightlife: ["Zócalo marimba evenings", "Mezcalerías", "Calle Macedonio bars", "La Mezcaloteca tastings"],
    museums: ["Santo Domingo Cultural Center", "Museo de las Culturas de Oaxaca", "Rufino Tamayo Pre-Hispanic Art Museum"],
    localFoods: ["Mole negro", "Tlayudas", "Chapulines (grasshoppers)", "Mezcal"],
    hiddenGems: ["Hierve el Agua petrified falls", "Teotitlán del Valle weaving workshops", "Ethnobotanical Garden"],
    tips: [
      "Monte Albán — morning light and cooler temperatures",
      "Mezcal tastings — designate a driver",
      "Día de Muertos — book hotels months ahead"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  palawan: {
    ...stock("beach", ["phiPhi", "coast", "longtail"]),
    tagline: "Underground river and emerald lagoons",
    overview:
      "Puerto Princesa is the gateway to Palawan's UNESCO underground river, Honda Bay islets and staging posts for El Nido's limestone lagoons — the Philippines at its wildest.",
    bestTime: "December–May for dry season",
    weather: "Tropical — wet Jun–Nov; typhoon season possible",
    airport: "Puerto Princesa International (PPS)",
    metro: "No metro; tricycles and tour vans",
    transport: "Tour vans to Sabang; tricycle in city; boats for Honda Bay",
    shopping: ["Robinsons Place Palawan", "NCCC Mall", "Baker's Hill souvenirs", "Puerto Princesa public market"],
    nightlife: ["Baywalk Park stalls", "Rizal Avenue bars", "Honda Bay sunset cruises"],
    museums: ["Palawan Heritage Center", "Palawan Special Battalion WW2 Memorial Museum", "Ethnographic Museum"],
    localFoods: ["Crocodile sisig", "Tamilok woodworm", "Fresh seafood", "Halo-halo"],
    hiddenGems: ["Firefly watching Iwahig", "Nagtabon Beach", "Sabang village"],
    tips: [
      "Underground river permits sell out — book weeks ahead",
      "El Nido is 5–6 hours north by van",
      "Bring reef-safe sunscreen for island hops"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  pattaya: {
    ...stock("beach", ["coast", "cityNight", "longtail"]),
    tagline: "Gulf beaches and Sanctuary of Truth",
    overview:
      "Pattaya mixes resort beaches, the wood-carved Sanctuary of Truth and family attractions with a famous nightlife strip — a Bangkok weekend escape on the Gulf of Thailand.",
    bestTime: "November–February for cooler, drier weather",
    weather: "Tropical — hot year-round; wet May–Oct",
    airport: "U-Tapao Rayong-Pattaya International (UTP) or Bangkok (BKK) + 2 hr drive",
    metro: "No metro; baht buses (songthaews) and taxis",
    transport: "Baht bus along Beach Road; boat to Koh Larn; taxi to Nong Nooch",
    shopping: ["Central Festival Pattaya Beach", "Terminal 21 Pattaya", "Walking Street souvenirs", "Thepprasit Night Market"],
    nightlife: ["Walking Street", "Beach Road bars", "Café del Mar Pattaya", "Royal Garden Plaza"],
    museums: ["Art in Paradise", "Ripley's Believe It or Not!", "Teddy Bear Museum"],
    localFoods: ["Tom yum", "Som tam", "Grilled seafood", "Mango sticky rice"],
    hiddenGems: ["Koh Larn coral island", "Big Buddha Hill viewpoint", "Nong Nooch Tropical Garden"],
    tips: [
      "Walking Street is adult-oriented — families prefer Jomtien",
      "Koh Larn gets crowded weekends — go weekday",
      "Sanctuary of Truth requires covered shoulders"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  penang: {
    ...stock("food", ["temple", "coast", "cityNight"]),
    tagline: "George Town street food and heritage",
    overview:
      "George Town is a UNESCO street-art canvas of clan jetties, hawker legends and Peranakan mansions — Malaysia's food capital with serious heritage depth.",
    bestTime: "December–February for drier weather",
    weather: "Tropical — wet Apr–Nov; hot year-round",
    airport: "Penang International (PEN)",
    metro: "No metro; Rapid Penang buses; Grab rideshares",
    transport: "Walk George Town core; Grab for Penang Hill and beaches",
    shopping: ["Chowrasta Market", "Little India", "Gurney Plaza", "Armenian Street art shops"],
    nightlife: ["Love Lane bars", "Upper Penang Road", "Gurney Drive hawkers"],
    museums: ["Penang Peranakan Mansion", "Cheong Fatt Tze Mansion", "Penang State Museum"],
    localFoods: ["Char kway teow", "Assam laksa", "Hokkien mee", "Chendol"],
    hiddenGems: ["Kek Lok Si Temple", "Penang Hill funicular", "Clan Jetties at dawn"],
    tips: [
      "George Town is best explored on foot — heat peaks midday",
      "Hawker stalls have irregular hours — go early",
      "Grab is cheap and reliable"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  philadelphia: {
    ...stock("nyc", ["cityNight", "food", "coast"]),
    tagline: "Founding history and neighbourhood food",
    overview:
      "Philadelphia is the Independence Hall city with world-class museums, murals, Italian Market energy and a serious restaurant scene beyond the cheesesteak.",
    bestTime: "April–June and September–November",
    weather: "Humid subtropical — hot summers, cold winters",
    airport: "Philadelphia International (PHL)",
    metro: "SEPTA subway, trolleys and regional rail",
    transport: "Walk Center City; SEPTA for museums and neighbourhoods",
    shopping: ["Reading Terminal Market", "Rittenhouse Row", "Italian Market", "King of Prussia Mall"],
    nightlife: ["Old City", "Fishtown", "Rittenhouse", "Northern Liberties"],
    museums: ["Philadelphia Museum of Art", "Barnes Foundation", "National Constitution Center"],
    localFoods: ["Cheesesteaks", "Soft pretzels", "Roast pork sandwiches", "Water ice"],
    hiddenGems: ["Magic Gardens", "Boathouse Row", "Race Street Pier"],
    tips: [
      "Reserve Independence Hall tickets online",
      "Rocky steps are free — the art museum is worth going inside",
      "Reading Terminal Market is ideal for lunch"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "playa-del-carmen": {
    ...stock("beach", ["coast", "maldives", "temple"]),
    tagline: "Quinta Avenida and Riviera Maya base",
    overview:
      "Playa del Carmen's Quinta Avenida pedestrian strip leads to Cozumel ferries, cenote dives and Tulum day trips — the Riviera Maya's cosmopolitan beach hub.",
    bestTime: "December–April for dry season",
    weather: "Tropical — wet Jun–Oct; hurricane season Aug–Oct",
    airport: "Cancún International (CUN) + 1 hr drive",
    metro: "No metro; colectivos and taxis",
    transport: "Walk Quinta Avenida; ferry to Cozumel; tours to cenotes and Tulum",
    shopping: ["Quinta Avenida", "Playa del Carmen outlets", "Coco Bongo area shops", "5th Avenue surf boutiques"],
    nightlife: ["Quinta Avenida clubs", "Coco Bongo", "Mamita's Beach Club", "Palapas on beach"],
    museums: ["Riviera Maya focuses on nature — Frida Kahlo Museum (nearby)", "3D Museum of Wonders", "Mayan ruins day trips"],
    localFoods: ["Cochinita pibil", "Tacos al pastor", "Ceviche", "Marquesitas"],
    hiddenGems: ["Rio Secreto cenote", "Cozumel snorkel day", "Xaman-Ha aviary"],
    tips: [
      "Beach club chairs often require minimum spend",
      "Cenote tours — biodegradable sunscreen only",
      "Tulum day trip — start early to beat crowds"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "punta-cana": {
    ...stock("beach", ["maldives", "coast", "phiPhi"]),
    tagline: "Bavaro palms and Caribbean all-inclusive",
    overview:
      "Punta Cana is the Dominican Republic's resort coast — powder Bavaro Beach, Saona Island catamarans and all-inclusive escapes between turquoise Caribbean and coconut groves.",
    bestTime: "December–April for driest weather",
    weather: "Tropical — wet May–Nov; hurricane season Aug–Oct",
    airport: "Punta Cana International (PUJ)",
    metro: "No metro; resort shuttles and taxis",
    transport: "Resort shuttles; book excursions for Saona Island; taxi to Cap Cana",
    shopping: ["Palma Real Shopping Village", "BlueMall Punta Cana", "Bavaro beach vendors", "Cap Cana marina shops"],
    nightlife: ["Imagine Punta Cana", "Coco Bongo", "Drink Point Bavaro", "Cap Cana marina bars"],
    museums: ["Indigenous Eyes Ecological Park", "Altos de Chavón (nearby cultural village)", "Local cigar factory tours"],
    localFoods: ["Mangu (plantain mash)", "Sancocho stew", "Fresh lobster", "Presidente beer"],
    hiddenGems: ["Hoyo Azul cenote at Scape Park", "Isla Saona day catamaran", "Los Haitises National Park boat trip"],
    tips: [
      "All-inclusive resorts — confirm what's included",
      "Saona tours — choose operators with safety record",
      "Sunscreen and reef-safe products for snorkelling"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "quebec-city": {
    ...stock("alps", ["cityNight", "coast", "food"]),
    tagline: "Château Frontenac and fortified old town",
    overview:
      "Québec City is North America's only walled city north of Mexico — cobblestone Petit Champlain, Château Frontenac turrets and French-Canadian cuisine on the St. Lawrence River.",
    bestTime: "June–October; December for Winter Carnival",
    weather: "Continental — cold snowy winters; warm humid summers",
    airport: "Québec City Jean Lesage International (YQB)",
    metro: "No metro; RTC buses; walkable Old Quebec",
    transport: "Walk Old Quebec; funicular Petit Champlain–Dufferin; taxi in winter",
    shopping: ["Petit Champlain boutiques", "Rue Saint-Jean", "Place Royale", "Galeries de la Capitale"],
    nightlife: ["Grande Allée bars", "Petit Champlain wine bars", "Old Port terraces"],
    museums: ["Musée de la civilisation", "Musée national des beaux-arts du Québec", "Fortifications of Québec exhibits"],
    localFoods: ["Poutine", "Tourtière", "Maple taffy on snow", "French onion soup at Château"],
    hiddenGems: ["Montmorency Falls (higher than Niagara)", "Île d'Orléans day trip", "Plains of Abraham walk"],
    tips: [
      "Old Quebec hills — wear good shoes; funicular saves climbing",
      "Winter Carnival — book hotels a year ahead",
      "French is primary — basic bonjour/merci appreciated"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  rhodes: {
    ...stock("greeceSea", ["beach", "coast", "temple"]),
    tagline: "Medieval knights and Lindos acropolis",
    overview:
      "Rhodes Old Town is Europe's best-preserved medieval walled city — Street of the Knights, Ottoman mosques and day trips to Lindos acropolis above turquoise coves.",
    bestTime: "May–June and September–October",
    weather: "Mediterranean — hot summers; mild winters",
    airport: "Rhodes International Diagoras (RHO)",
    metro: "No metro; buses and taxis",
    transport: "Walk Old Town; bus or taxi to Lindos; boat trips to Symi",
    shopping: ["Sokratous Street", "Old Town gold shops", "Mandraki harbour", "Lindos village crafts"],
    nightlife: ["Old Town tavernas", "Elli Beach bars", "Faliraki (party strip nearby)"],
    museums: ["Palace of the Grand Master", "Archaeological Museum of Rhodes", "Jewish Museum of Rhodes"],
    localFoods: ["Pitaroudia", "Melekouni honey sesame bars", "Fresh seafood", "Souvlaki"],
    hiddenGems: ["Anthony Quinn Bay", "Valley of Butterflies (seasonal)", "Symi island day ferry"],
    tips: [
      "Old Town walls — walk at sunset",
      "Lindos acropolis — wear hat and water",
      "Book Palace of Grand Master tickets online"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  rotorua: {
    ...stock("mountains", ["coast", "aurora", "norway"]),
    tagline: "Geysers, Māori culture and thermal spas",
    overview:
      "Rotorua sits on the Pacific Ring of Fire — Pohutu geyser eruptions, Māori hangi performances, redwood forest walks and Polynesian Spa soaks in New Zealand's geothermal heart.",
    bestTime: "December–March for warmest weather; autumn for fewer crowds",
    weather: "Temperate — mild wet winters; warm summers; sulphur scent in geothermal zones",
    airport: "Rotorua Regional (ROT) or Auckland (AKL) + 3 hr drive",
    metro: "No metro; local buses; walk lakefront",
    transport: "Car or tour for Wai-O-Tapu; walk Government Gardens; bike Redwoods",
    shopping: ["Rotorua Night Market", "Kuirau Park area shops", "Polynesian Spa retail", "Whakarewarewa village crafts"],
    nightlife: ["Eat Street (Tutanekai Street)", "Polynesian Spa evening soak", "Māori cultural show dinners"],
    museums: ["Te Puia / New Zealand Māori Arts and Crafts Institute", "Rotorua Museum (Te Whare Taonga o Te Arawa)", "Buried Village of Te Wairoa"],
    localFoods: ["Hangi-cooked feast", "Rewena bread", "Manuka honey", "Fresh trout from lake"],
    hiddenGems: ["Redwoods Treewalk at night", "Kerosene Creek free hot pool", "Blue and Green Lakes viewpoint"],
    tips: [
      "Geothermal areas — stay on boardwalks",
      "Hangi bookings essential in peak season",
      "Sulphur smell is normal — you'll adjust quickly"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "san-diego": {
    ...stock("beach", ["coast", "nyc", "cityNight"]),
    tagline: "Beaches, Balboa and Baja day trips",
    overview:
      "San Diego offers Pacific beaches, Balboa Park museums, a historic Gaslamp Quarter and easy day trips to La Jolla or Coronado.",
    bestTime: "May–October for beach weather",
    weather: "Mediterranean-leaning — mild winters, warm dry summers",
    airport: "San Diego International (SAN)",
    metro: "Trolley light rail + buses",
    transport: "Trolley for downtown/Old Town; car for beaches and La Jolla",
    shopping: ["Gaslamp Quarter", "Fashion Valley", "Seaport Village", "Little Italy Mercato"],
    nightlife: ["Gaslamp Quarter", "Pacific Beach", "North Park", "Little Italy"],
    museums: ["USS Midway Museum", "Balboa Park museums", "San Diego Zoo"],
    localFoods: ["Fish tacos", "California burritos", "Craft beer", "Fresh seafood"],
    hiddenGems: ["Sunset Cliffs", "Torrey Pines", "Liberty Public Market"],
    tips: [
      "Balboa Park deserves a full day",
      "Park early at La Jolla Cove",
      "Combine Midway with the Embarcadero walk"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "san-francisco": {
    ...stock("cityNight", ["coast", "nyc", "beach"]),
    tagline: "Fog, bridges and Pacific creativity",
    overview:
      "San Francisco mixes cable cars, Golden Gate views, neighbourhood food scenes and day trips to Muir Woods or Napa — a compact, walkable West Coast icon.",
    bestTime: "September–November for warmest, clearest weather",
    weather: "Mild year-round; summer fog common; microclimates by neighbourhood",
    airport: "San Francisco International (SFO); Oakland (OAK) and San Jose (SJC) alternates",
    metro: "BART, Muni Metro and cable cars",
    transport: "Clipper card for transit; rideshares and ferries for Bay Area day trips",
    shopping: ["Union Square", "Ferry Building Marketplace", "Haight-Ashbury", "Fillmore Street"],
    nightlife: ["Mission bars", "North Beach", "SoMa", "Castro"],
    museums: ["SFMOMA", "de Young Museum", "California Academy of Sciences"],
    localFoods: ["Sourdough", "Cioppino", "Mission burritos", "Dim sum in Chinatown"],
    hiddenGems: ["Lands End trail", "Twin Peaks at sunset", "Japan Center"],
    tips: [
      "Layers are essential — fog can drop temperatures fast",
      "Book Alcatraz tickets weeks ahead",
      "Use cable cars early to avoid queues"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  savannah: {
    ...stock("cityNight", ["coast", "food", "nyc"]),
    tagline: "Spanish moss squares and Lowcountry charm",
    overview:
      "Savannah's 22 shaded squares, Forsyth Park fountain and River Street cobbles deliver antebellum romance — a walkable Southern city with serious ghost-tour folklore.",
    bestTime: "March–May and October–November",
    weather: "Humid subtropical — hot summers; mild winters",
    airport: "Savannah/Hilton Head International (SAV)",
    metro: "No metro; dot shuttle; walk historic district",
    transport: "Walk historic core; pedicabs; car for Tybee Island beach",
    shopping: ["City Market", "Broughton Street", "River Street", "SCAD shop"],
    nightlife: ["River Street pubs", "Congress Street bars", "Ghost tour evenings", "Moon River Brewing"],
    museums: ["Telfair Museums", "SCAD Museum of Art", "Ships of the Sea Maritime Museum"],
    localFoods: ["Shrimp and grits", "She-crab soup", "Fried green tomatoes", "Pralines"],
    hiddenGems: ["Bonaventure Cemetery", "Wormsloe Avenue oak alley", "Tybee Island lighthouse"],
    tips: [
      "Open-container rules — plastic cup only in designated areas",
      "Parking in historic district is tight — stay centrally if possible",
      "Ghost tours — choose licensed operators"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  seattle: {
    ...stock("cityNight", ["coast", "mountains", "nyc"]),
    tagline: "Coffee, waterfront and Pacific Northwest views",
    overview:
      "Seattle blends Pike Place Market energy, ferry-filled Elliott Bay views, coffee culture and day trips to the Olympics or Mount Rainier.",
    bestTime: "July–September for driest weather",
    weather: "Oceanic — mild wet winters, pleasant dry summers",
    airport: "Seattle–Tacoma International (SEA)",
    metro: "Link light rail + streetcars + ferries",
    transport: "ORCA card; ferries for Bainbridge; car for mountains",
    shopping: ["Pike Place Market", "Pacific Place", "Capitol Hill boutiques", "University Village"],
    nightlife: ["Capitol Hill", "Belltown", "Fremont", "Ballard"],
    museums: ["Museum of Pop Culture", "Chihuly Garden and Glass", "Seattle Art Museum"],
    localFoods: ["Fresh oysters", "Teriyaki", "Coffee", "Pacific salmon"],
    hiddenGems: ["Discovery Park", "Ballard Locks", "Kerry Park viewpoint"],
    tips: [
      "Pack a light rain jacket year-round",
      "Reserve Space Needle timed tickets",
      "Kerry Park is the classic skyline photo"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  seville: {
    ...stock("coast", ["food", "cityNight", "temple"]),
    tagline: "Flamenco, orange trees and Mudéjar splendour",
    overview:
      "Seville is Andalusia's soul — the Alcázar's tiled courtyards, the Gothic cathedral's Giralda tower and Triana's tapas bars pulse with flamenco and Semana Santa tradition.",
    bestTime: "March–May and October–November",
    weather: "Mediterranean — very hot summers (40°C+); mild winters",
    airport: "Seville Airport (SVQ)",
    metro: "Seville Metro + tram + buses",
    transport: "Walk centre; tram to Plaza de España; taxi in summer heat",
    shopping: ["Calle Sierpes", "Triana ceramics", "El Corte Inglés", "Mercado de Triana"],
    nightlife: ["Triana tapas bars", "Alameda de Hércules", "Flamenco tablaos", "Rooftop bars near cathedral"],
    museums: ["Museum of Fine Arts of Seville", "Flamenco Dance Museum", "Archivo de Indias"],
    localFoods: ["Salmorejo", "Espetos (grilled sardines)", "Sevilla oranges", "Jamón ibérico"],
    hiddenGems: ["Metropol Parasol (Setas)", "Plaza de España rowboats", "Italica Roman ruins day trip"],
    tips: [
      "Book Alcázar tickets weeks ahead",
      "Siesta hours — many shops close 2–5 PM",
      "Flamenco — book reputable tablaos, not street touts"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "sharm-el-sheikh": {
    ...stock("beach", ["coast", "maldives", "desertCamp"]),
    tagline: "Red Sea reefs and Sinai desert",
    overview:
      "Sharm el-Sheikh is Egypt's Red Sea resort capital — world-class diving at Ras Mohammed, Naama Bay nightlife and desert safaris into the Sinai Peninsula.",
    bestTime: "March–May and September–November",
    weather: "Desert coastal — hot dry summers; mild winters; warm sea year-round",
    airport: "Sharm el-Sheikh International (SSH)",
    metro: "No metro; taxis and resort shuttles",
    transport: "Taxi between Naama Bay and Old Market; dive boats to reefs",
    shopping: ["Old Market (Sharm Old Town)", "SOHO Square", "Naama Bay promenade", "Il Mercato Mall"],
    nightlife: ["Naama Bay clubs", "SOHO Square", "Pacha Sharm", "Hard Rock Café Naama"],
    museums: ["Ras Mohammed National Park Visitor Centre", "Al Mustafa Mosque cultural centre", "SOHO Square art installations"],
    localFoods: ["Grilled seafood", "Koshari", "Bedouin tea", "Fresh Red Sea fish"],
    hiddenGems: ["Ras Mohammed National Park", "White Island snorkel", "Coloured Canyon day trip"],
    tips: [
      "Book diving through PADI-certified centres",
      "Old Market is better for authentic dining than Naama Bay chains",
      "Desert safaris — choose licensed operators"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  tulum: {
    ...stock("beach", ["coast", "temple", "maldives"]),
    tagline: "Cliff ruins and boho beach clubs",
    overview:
      "Tulum pairs Mayan ruins on a Caribbean cliff with cenote swims, jungle boutique hotels and a wellness-meets-nightlife scene on the beach road south of town.",
    bestTime: "November–April for dry season",
    weather: "Tropical — wet Jun–Oct; sargassum seaweed possible summer",
    airport: "Cancún International (CUN) + 2 hr drive",
    metro: "No metro; bikes and taxis on beach road",
    transport: "Bike beach road; taxi to ruins; colectivo to town",
    shopping: ["Tulum town artisan shops", "Beach road boutiques", "La Veleta design stores", "Coba road crafts"],
    nightlife: ["Beach club DJ events", "Papaya Playa Project", "Vagalume (seasonal)", "Batey Mojito bar in town"],
    museums: ["Tulum Archaeological Zone is the main historic site", "Sian Ka'an Biosphere visitor info", "Cenote cultural tours"],
    localFoods: ["Tikin xic fish", "Cochinita pibil", "Aguachile", "Fresh coconut"],
    hiddenGems: ["Cenote Calavera", "Sian Ka'an Biosphere", "Ka'an Luum lagoon"],
    tips: [
      "Ruins — arrive at opening for fewer crowds and heat",
      "Beach clubs — reserve beds in high season",
      "Sargassum season — check conditions before booking beach hotels"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  udaipur: {
    ...stock("temple", ["lantern", "food", "coast"]),
    tagline: "Lake palaces and Rajput romance",
    overview:
      "Udaipur floats on Lake Pichola with white marble palaces, rooftop sunset views and a maze of havelis — Rajasthan's most photogenic lake city.",
    bestTime: "October–March for pleasant weather",
    weather: "Semi-arid — hot summers; mild winters",
    airport: "Maharana Pratap Airport (UDR)",
    metro: "No metro; auto-rickshaws and taxis",
    transport: "Auto-rickshaw in city; boat to Jag Mandir; car for day trips",
    shopping: ["Hathi Pol Bazaar", "Bada Bazaar", "Shilpgram crafts village", "City Palace Museum Shop"],
    nightlife: ["Ambrai Ghat sunset bars", "Fateh Sagar lakeside", "Bagore ki Haveli cultural show"],
    museums: ["City Palace Museum", "Ahar Cenotaphs Museum", "Vintage Car Museum"],
    localFoods: ["Dal baati churma", "Laal maas", "Gatte ki sabzi", "Mirchi vada"],
    hiddenGems: ["Monsoon Palace sunset", "Saheliyon-ki-Bari", "Shilpgram crafts fair (seasonal)"],
    tips: [
      "Book lake-view hotels early in peak season",
      "City Palace takes half a day — arrive early",
      "Boat rides at sunset sell out fast"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  uyuni: {
    ...stock("desertCamp", ["sahara", "mountains", "aurora"]),
    tagline: "Mirror salt flats and star-filled altiplano",
    overview:
      "Uyuni is the launch point for Bolivia's Salar de Uyuni — the world's largest salt flat reflecting infinite skies, plus 4x4 circuits to coloured lagoons and flamingos.",
    bestTime: "May–November for dry flats; Dec–Apr for mirror effect (with rain)",
    weather: "High-altitude desert — freezing nights; intense sun; 3,650 m elevation",
    airport: "Uyuni Airport Joya Andina (UYU) or La Paz (LPB) + bus",
    metro: "No metro; 4x4 tour jeeps only on flats",
    transport: "Book 1–3 day salt flat tours from Uyuni; train from Oruro",
    shopping: ["Salt-crystal souvenirs", "Colchani village salt crafts", "Uyuni town market", "Llama-wool textiles"],
    nightlife: ["Salt-hotel lounge stargazing", "Uyuni town basic bars", "Early nights before dawn flat departures"],
    museums: ["Train Cemetery (open-air)", "Casa de Sal museum hotels", "Local mining/salt cooperative exhibits"],
    localFoods: ["Quinoa soup", "Llama steak", "Salteñas", "Coca tea for altitude"],
    hiddenGems: ["Isla Incahuasi cacti island", "Stargazing on the flats", "Eduardo Avaroa coloured lagoons"],
    tips: [
      "Altitude sickness is real — acclimatise in La Paz first",
      "Book tours with reputable operators — check vehicle and driver",
      "Layers for freezing pre-dawn flat departures"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  varanasi: {
    ...stock("temple", ["lantern", "food", "coast"]),
    tagline: "Ghats, Ganga aarti and ancient Kashi",
    overview:
      "Varanasi is Hinduism's holiest city — a labyrinth of ghats where dawn boat rides, evening aarti flames and silk weavers reveal layers of living tradition on the Ganges.",
    bestTime: "October–March for cooler, drier weather",
    weather: "Humid subtropical — scorching summers; monsoon Jul–Sep",
    airport: "Lal Bahadur Shastri International (VNS)",
    metro: "No metro; walk ghats; auto-rickshaws",
    transport: "Walk the ghats; cycle-rickshaw for old city; boat at Dashashwamedh",
    shopping: ["Vishwanath Lane", "Godowlia Market", "Thateri Bazaar silk", "Assi Ghat bookshops"],
    nightlife: ["Dashashwamedh Ghat evening aarti", "Assi Ghat cultural events", "Blue Lassi shop area"],
    museums: ["Bharat Kala Bhavan", "Ramnagar Fort Museum", "Sarnath Archaeological Museum"],
    localFoods: ["Kachori sabzi", "Banarasi paan", "Malaiyo (seasonal)", "Thandai"],
    hiddenGems: ["Manikarnika Ghat at dawn", "Blue Lassi", "Sarnath Buddhist site"],
    tips: [
      "Respect photography rules at cremation ghats",
      "Boat rides are best at sunrise",
      "Silk shopping — verify authenticity at government emporiums"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "victoria-falls": {
    ...stock("mountains", ["coast", "sahara", "alps"]),
    tagline: "Smoke that thunders and Zambezi adventure",
    overview:
      "Victoria Falls town on the Zimbabwe side is the base for the world's largest waterfall curtain, Zambezi sunset cruises, bungee at the bridge and Big Five safaris nearby.",
    bestTime: "February–May for peak flow after rains; Jul–Aug for safari",
    weather: "Subtropical — hot wet summers; mild dry winters",
    airport: "Victoria Falls Airport (VFA)",
    metro: "No metro; taxis and hotel transfers",
    transport: "Walk to falls from town; taxis to lodges; day trips to Chobe (Botswana)",
    shopping: ["Elephant's Walk Shopping & Artist Village", "Curio markets near falls", "Victoria Falls Craft Market", "Mukuni Victoria Falls Craft Village"],
    nightlife: ["The Three Monkeys", "The Boma dinner show", "Victoria Falls Safari Lodge deck"],
    museums: ["Victoria Falls Bridge Visitor Centre", "Livingstone Statue area exhibits", "Jafuta Heritage Centre"],
    localFoods: ["Game meat (impala, kudu)", "Sadza and relish", "Mopane worms (adventurous)", "Fresh Zambezi bream"],
    hiddenGems: ["Devil's Pool (Zambia side, seasonal)", "Victoria Falls Bridge tour", "Helicopter Flight of Angels"],
    tips: [
      "Rain gear essential at the falls — you will get soaked",
      "Devil's Pool is Zambia side in low-water season only",
      "Book bungee and helicopter in advance in peak season"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "xi-an": {
    ...stock("temple", ["cityNight", "food", "lantern"]),
    tagline: "Terracotta warriors and Silk Road spice",
    overview:
      "Xi'an was China's ancient capital — home to the Terracotta Army, intact Ming city walls and a Muslim Quarter alive with roujiamo, biangbiang noodles and night-market smoke.",
    bestTime: "April–May and September–October",
    weather: "Continental — hot dry summers, cold winters",
    airport: "Xi'an Xianyang International (XIY)",
    metro: "Xi'an Metro lines 1–6",
    transport: "Metro in city; tour bus or taxi to Terracotta Army",
    shopping: ["Muslim Quarter", "Shuyuanmen Cultural Street", "Saga International Shopping Mall", "Terracotta replica shops"],
    nightlife: ["Muslim Quarter night food", "Defuxiang bar street", "Tang Paradise evening show"],
    museums: ["Shaanxi History Museum", "Xi'an Beilin Museum", "Banpo Museum"],
    localFoods: ["Roujiamo", "Biangbiang noodles", "Yang rou pao mo", "Liangpi cold noodles"],
    hiddenGems: ["City Wall bike ride at sunset", "Great Mosque of Xi'an", "Huaqing Palace hot springs"],
    tips: [
      "Terracotta Army is 40 km east — go early",
      "Shaanxi History Museum is free but requires reservation",
      "Muslim Quarter is packed at dinner — arrive hungry"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  bangkok: {
    ...stock("longtail", ["temple", "food", "cityNight"]),
    tagline: "Golden spires, night markets and some of Asia's best street food",
    overview:
      "Bangkok pulses between sacred temple mornings and neon-soaked nights — tuk-tuk rides through Chinatown, boat noodles along khlongs, and rooftop bars overlooking the Chao Phraya. The city's eating culture runs from Michelin-starred street stalls to progressive Thai tasting menus that reframe centuries of spice and balance.",
    bestTime: "November–February for cooler, drier weather",
    weather: "Tropical — hot year-round; rainy May–October; humid always",
    airport: "Suvarnabhumi (BKK) and Don Mueang (DMK) for regional LCCs",
    metro: "BTS Skytrain, MRT subway, Airport Rail Link and river boats",
    transport: "BTS/MRT for traffic-free hops; Grab for rides; Chao Phraya express boats for temples",
    shopping: ["Chatuchak Weekend Market", "Siam Paragon", "Asiatique riverfront", "ICONSIAM"],
    nightlife: ["Khao San Road", "Thonglor & Ekkamai", "Rooftop bars Silom–Sathorn", "Chinatown Yaowarat at night"],
    museums: ["Grand Palace & Wat Phra Kaew complex", "Jim Thompson House", "Bangkok National Museum"],
    localFoods: ["Pad thai", "Boat noodles", "Mango sticky rice", "Tom yum goong"],
    hiddenGems: ["Wat Arun at sunset from river", "Talad Noi street art alleys", "Bang Krachao green lung by ferry"],
    tips: [
      "Dress modestly for temples — cover shoulders and knees",
      "Carry cash for street food and small vendors",
      "Allow extra time for traffic — Skytrain beats taxis at rush hour"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  beijing: {
    ...stock("temple", ["cityNight", "food", "kyoto"]),
    tagline: "Forbidden City gates, hutong alleys and Peking duck rituals",
    overview:
      "Beijing layers imperial grandeur onto everyday hutong life — dawn tai chi beside Temple of Heaven, afternoons inside the Forbidden City's vermilion walls, and evenings of Peking duck carved tableside in century-old restaurants. Great Wall day trips, contemporary art in 798 District and some of China's most refined regional cuisines make the capital far more than a political centre.",
    bestTime: "April–May and September–October for clear skies and mild temperatures",
    weather: "Continental monsoon — hot humid summers; cold dry winters; spring sandstorms possible",
    airport: "Beijing Capital (PEK) and Daxing (PKX)",
    metro: "Beijing Subway — extensive and inexpensive",
    transport: "Yikatong transit card; metro covers most sights; hire car/driver for Great Wall",
    shopping: ["Wangfujing Street", "Silk Market", "Panjiayuan Antique Market", "Sanlitun Taikoo Li"],
    nightlife: ["Sanlitun bar street", "Houhai lake bars", "798 art district openings", "Acrobatics at Chaoyang Theatre"],
    museums: ["Palace Museum (Forbidden City)", "National Museum of China", "Capital Museum"],
    localFoods: ["Peking duck", "Jianbing street crepe", "Zhajiangmian noodles", "Mongolian hot pot"],
    hiddenGems: ["Drum and Bell Towers hutong views", "Confucius Temple & Imperial Academy", "Mutianyu Great Wall (less crowded)"],
    tips: [
      "Book Forbidden City tickets online — daily capacity limits apply",
      "Download VPN before arrival if you need Western apps",
      "Air quality varies — check AQI and plan outdoor days accordingly"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  cairo: {
    ...stock("sahara", ["temple", "desertCamp", "cityNight"]),
    tagline: "Pyramids on the horizon and millennia along the Nile",
    overview:
      "Cairo overwhelms in the best way — the Giza pyramids rise beyond the urban sprawl, Islamic Cairo's minarets pierce dusty golden light, and the Egyptian Museum holds treasures that rewrote human history. Khan el-Khalili bazaar chaos, Nile felucca sunsets and day trips to Saqqara or Memphis layer ancient wonder onto modern Arab street life.",
    bestTime: "October–April for cooler desert sightseeing",
    weather: "Desert — hot dry summers; mild winters; very little rain",
    airport: "Cairo International (CAI); Sphinx International (SPX) near Giza for some routes",
    metro: "Cairo Metro (limited lines) + Uber/Careem; no metro to pyramids",
    transport: "Uber/Careem reliable; organised tours for pyramids; metro for downtown and Coptic Cairo",
    shopping: ["Khan el-Khalili bazaar", "City Stars Mall", "Street of the Tentmakers", "Zamalek boutiques"],
    nightlife: ["Zamalek cafés and bars", "Nile dinner cruises", "Al-Azhar Park at night", "Downtown belle époque cafés"],
    museums: ["Egyptian Museum (Tahrir)", "National Museum of Egyptian Civilization", "Coptic Museum"],
    localFoods: ["Koshari", "Ful medames", "Molokhia", "Shawarma and falafel"],
    hiddenGems: ["Al-Azhar Park sunset views", "Cave Church in Mokattam", "Ibn Tulun Mosque minaret climb"],
    tips: [
      "Start Giza pyramids at opening to beat heat and crowds",
      "Bargain hard for taxis and bazaar goods — agree price first",
      "Carry small notes for baksheesh at sites and services"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  istanbul: {
    ...stock("temple", ["cityNight", "coast", "food"]),
    tagline: "Minarets at dawn, bazaar haggling and Bosphorus sunsets",
    overview:
      "Istanbul straddles two continents where Byzantine domes and Ottoman minarets share the skyline — mornings begin with simit and çay overlooking the Golden Horn, afternoons get lost in the Grand Bazaar, and evenings mean meze on a Bosphorus terrace as ferries cross between Europe and Asia.",
    bestTime: "April–May and September–October for pleasant sightseeing weather",
    weather: "Mediterranean-continental — hot dry summers; cool wet winters",
    airport: "Istanbul Airport (IST) on European side; Sabiha Gökçen (SAW) for some LCCs",
    metro: "Metro, tram, Marmaray undersea rail, funiculars and ferries",
    transport: "Istanbulkart for all transit; ferries are essential for Bosphorus; walk Sultanahmet core",
    shopping: ["Grand Bazaar", "Spice Bazaar", "İstiklal Avenue", "Nişantaşı boutiques"],
    nightlife: ["Beyoğlu & İstiklal", "Karaköy wine bars", "Ortaköy waterfront", "Kadıköy on the Asian side"],
    museums: ["Hagia Sophia", "Topkapi Palace Museum", "Istanbul Archaeological Museums"],
    localFoods: ["Kebab & döner", "Meze spreads", "Baklava", "Turkish breakfast spread"],
    hiddenGems: ["Balat colourful hillside streets", "Pierre Loti Hill café views", "Princes' Islands ferry escape"],
    tips: [
      "Hagia Sophia and Topkapi — buy skip-the-line tickets online",
      "Haggle politely in bazaars — start around half the asking price",
      "Remove shoes and dress modestly in active mosques"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  london: {
    ...stock("london", ["cityNight", "food", "coast"]),
    tagline: "Thames bridges, West End lights and centuries of layered history",
    overview:
      "London unfolds in distinct villages — Borough Market lunches, South Bank strolls past Tate Modern, and West End shows after dark. Royal pageantry at Buckingham Palace sits beside world museums, pub culture and a restaurant scene that spans Punjabi canteens in Soho to Michelin temples in Mayfair.",
    bestTime: "May–September for longest days; December for festive lights",
    weather: "Maritime — mild, changeable year-round; pack layers and a compact umbrella",
    airport: "Heathrow (LHR), Gatwick (LGW), Stansted (STN) and City (LCY)",
    metro: "Tube, Overground, Elizabeth line, buses and river Thames Clippers",
    transport: "Contactless/Oyster for transit; walk central zones; National Rail for day trips",
    shopping: ["Covent Garden", "Regent Street & Oxford Street", "Borough Market", "Camden Market"],
    nightlife: ["Soho", "Shoreditch", "South Bank bars", "West End theatre district"],
    museums: ["British Museum", "Tate Modern", "Natural History Museum"],
    localFoods: ["Full English breakfast", "Fish and chips", "Sunday roast", "Afternoon tea"],
    hiddenGems: ["Kyoto Garden in Holland Park", "Leadenhall Market", "Little Venice canal walk"],
    tips: [
      "Many major museums are free — arrive early on weekends",
      "Book West End tickets and Tower of London online",
      "Stand right on Tube escalators — Londoners notice"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "mexico-city": {
    ...stock("food", ["cityNight", "temple", "colosseum"]),
    tagline: "Aztec ruins beneath art deco boulevards and world-class tacos",
    overview:
      "Mexico City is a high-altitude megacity with soul — Templo Mayor ruins sit blocks from Frida Kahlo's Casa Azul, Roma Norte coffee shops spill onto tree-lined streets, and weekend mornings mean chilaquiles followed by Xochimilco trajinera boats. The food scene rivals any capital on earth, from street tlacoyos to tasting menus that celebrate indigenous ingredients.",
    bestTime: "March–May for warm dry weather before summer rains",
    weather: "Subtropical highland — mild year-round; rainy June–September afternoons",
    airport: "Benito Juárez International (MEX); Felipe Ángeles (NLU) alternate",
    metro: "Metro CDMX — one of world's largest; Metrobús BRT; Ecobici bikes",
    transport: "Metro for cross-city; Uber widely used; walk Roma–Condesa and Centro Histórico cores",
    shopping: ["La Ciudadela crafts market", "Polanco boutiques", "Mercado de San Juan", "Coyoacán markets"],
    nightlife: ["Roma Norte mezcalerías", "Condesa bars", "Polanco lounges", "Lucha libre at Arena México"],
    museums: ["National Museum of Anthropology", "Frida Kahlo Museum", "Palacio de Bellas Artes"],
    localFoods: ["Tacos al pastor", "Tlayudas", "Chilaquiles", "Mezcal and pulque"],
    hiddenGems: ["Sunny rooftop at Biblioteca Vasconcelos", "Desierto de los Leones forest", "San Ángel Saturday bazaar"],
    tips: [
      "Altitude 2,240 m — hydrate and pace yourself first days",
      "Use official sitio taxis or Uber from airport",
      "Sunday muévelo en bici closes major avenues to cars"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  moscow: {
    ...stock("cityNight", ["temple", "food", "norway"]),
    tagline: "Onion domes, Bolshoi ballet and Red Square at midnight",
    overview:
      "Moscow blends imperial scale with contemporary edge — St Basil's candy-coloured domes anchor Red Square, the Metro doubles as an underground art gallery, and Gorky Park transforms into a summer social hub. World-class ballet, vodka-fuelled zakuski and a dining scene from Soviet nostalgia to White Rabbit's skyline tasting menus reward visitors who look beyond the Cold War clichés.",
    bestTime: "May–September for warm walks; December for snow and New Year lights",
    weather: "Continental — cold snowy winters; warm summers; brief spring and autumn",
    airport: "Sheremetyevo (SVO), Domodedovo (DME) and Vnukovo (VKO)",
    metro: "Moscow Metro — ornate stations and extensive network",
    transport: "Troika card for metro/buses; walk central ring; Yandex Go for rides",
    shopping: ["GUM department store", "Arbat Street", "TSUM luxury", "Danilovsky Market"],
    nightlife: ["Patriarch's Ponds bars", "Red October island clubs", "Kitay-Gorod", "Bolshoi Theatre"],
    museums: ["State Tretyakov Gallery", "Pushkin State Museum of Fine Arts", "Garage Museum of Contemporary Art"],
    localFoods: ["Borscht", "Blini with caviar", "Pelmeni", "Beef stroganoff"],
    hiddenGems: ["Metro station architecture tour", "Izmailovsky flea market", "VDNKh Soviet exhibition park"],
    tips: [
      "Carry passport — hotels register guests; occasional ID checks",
      "Book Bolshoi tickets months ahead online",
      "Learn Cyrillic basics — helps with Metro navigation"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  paris: {
    ...stock("eiffel", ["paris", "food", "cityNight"]),
    tagline: "Left Bank cafés, Haussmann boulevards and golden hour on the Seine",
    overview:
      "Paris rewards slow wandering — morning croissants in Saint-Germain, Impressionist afternoons at the Musée d'Orsay, and evenings when the Eiffel Tower sparkles over river barges. Beyond the postcard icons, neighbourhood marchés, wine bars and day trips to Versailles or Giverny reveal why the city still sets the standard for art, food and flânerie.",
    bestTime: "April–June and September–October for mild weather and long daylight",
    weather: "Oceanic — mild winters; warm summers; occasional heat waves in August",
    airport: "Charles de Gaulle (CDG) and Orly (ORY); Beauvais (BVA) for budget carriers",
    metro: "Métro, RER suburban rail, buses and Vélib' bike share",
    transport: "Navigo Easy or carnet tickets; walk within arrondissements; RER for Versailles and airports",
    shopping: ["Le Marais boutiques", "Galeries Lafayette", "Saint-Ouen flea market", "Rue de Rivoli department stores"],
    nightlife: ["Canal Saint-Martin wine bars", "Oberkampf", "Pigalle", "Seine riverfront at dusk"],
    museums: ["Louvre Museum", "Musée d'Orsay", "Centre Pompidou"],
    localFoods: ["Baguette and viennoiserie", "Steak frites", "Onion soup", "Macarons"],
    hiddenGems: ["Promenade Plantée elevated park", "Musée de la Chasse et de la Nature", "Square du Vert-Galant tip of Île de la Cité"],
    tips: [
      "Book Louvre and Eiffel Tower timed slots weeks ahead",
      "Many museums free first Sunday of month — expect crowds",
      "Restaurant kitchens often close 2–7 pm — plan lunch accordingly"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  singapore: {
    ...stock("cityNight", ["food", "coast", "maldives"]),
    tagline: "Garden city skylines, hawker halls and Peranakan heritage",
    overview:
      "Singapore compresses Asia into one impeccably organised island — hawker-centre lunches beside Marina Bay's futurist skyline, heritage shophouses in Katong, and rainforest canopy walks minutes from the financial district. Strictly multicultural and relentlessly food-obsessed, it works equally as a stopover and a destination in its own right.",
    bestTime: "February–April for driest weather; year-round events calendar",
    weather: "Equatorial — hot and humid daily; brief tropical showers common",
    airport: "Changi (SIN) — consistently ranked world's best; Jewel for layovers",
    metro: "MRT subway and extensive bus network",
    transport: "EZ-Link or SimplyGo card; MRT covers most sights; Grab for late nights",
    shopping: ["Orchard Road", "VivoCity", "Haji Lane boutiques", "Mustafa Centre"],
    nightlife: ["Clarke Quay", "Marina Bay rooftop bars", "Ann Siang Hill", "Sentosa beach clubs"],
    museums: ["National Gallery Singapore", "ArtScience Museum", "Asian Civilisations Museum"],
    localFoods: ["Hainanese chicken rice", "Chilli crab", "Laksa", "Kaya toast"],
    hiddenGems: ["Haw Par Villa", "Southern Ridges canopy walk", "Pulau Ubin island day trip"],
    tips: [
      "No chewing gum sales — fines for littering are real",
      "Reserve Odette and fine dining weeks ahead",
      "Carry an umbrella — downpours arrive fast"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  sydney: {
    ...stock("beach", ["coast", "cityNight", "nyc"]),
    tagline: "Harbour sails, Bondi surf and Pacific light",
    overview:
      "Sydney wraps a glittering harbour around outdoor living — ferry hops to Manly, coastal walks from Bondi to Coogee, and opera-house sunsets that feel almost too perfect. Beyond the icons, inner-city neighbourhoods like Surry Hills and Newtown deliver coffee culture, Asian dining and a relaxed Australian warmth that defines the city's appeal.",
    bestTime: "September–November and March–May for warm, less crowded days",
    weather: "Humid subtropical — hot summers; mild winters; strong UV year-round",
    airport: "Sydney Kingsford Smith (SYD); train to Central in ~15 min",
    metro: "Sydney Metro, trains, buses, light rail and harbour ferries",
    transport: "Opal card for all transit; ferries are scenic and practical; walk the CBD and Rocks",
    shopping: ["Queen Victoria Building", "Pitt Street Mall", "Bondi Markets", "The Rocks weekend market"],
    nightlife: ["Kings Cross & Potts Point", "Darling Harbour", "Surry Hills pubs", "Oxford Street"],
    museums: ["Art Gallery of New South Wales", "Australian Museum", "Museum of Contemporary Art Australia"],
    localFoods: ["Meat pies", "Fresh seafood", "Avocado toast", "Flat white coffee"],
    hiddenGems: ["Wendy's Secret Garden Lavender Bay", "Barangaroo Reserve harbour walk", "Wattamolla beach in Royal National Park"],
    tips: [
      "Slip-slop-slap — sun is fierce even on cloudy days",
      "Book BridgeClimb and opera house tours ahead in peak season",
      "Sunday ferries and Opal fare caps can save money"
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  },
  "new-york-city": {
    ...stock("nyc", ["nyc", "cityNight", "food", "coast"]),
    tagline: "Skyline icons, borough energy and world-class culture",
    overview:
      "New York City is a five-borough megacity of skylines and sidewalks — Central Park mornings, Broadway nights, and museum miles from the Met to MoMA. Beyond Midtown landmarks, neighbourhoods like Brooklyn, Harlem and Queens deliver food, music and local rhythm that make the city feel endlessly discoverable.",
    bestTime: "April–June and September–November for mild weather and outdoor walking",
    weather: "Humid subtropical — hot summers, cold winters, colourful autumns",
    airport: "JFK, Newark (EWR) and LaGuardia (LGA)",
    metro: "MTA subway and buses cover all boroughs 24/7",
    transport: "MetroCard/OMNY contactless; walk Manhattan grids; ferries and Citi Bike for scenic hops",
    shopping: ["Fifth Avenue", "SoHo", "Brooklyn boutiques", "Chelsea Market"],
    nightlife: ["Broadway & Times Square", "East Village", "Williamsburg", "Jazz clubs in Harlem"],
    museums: ["The Metropolitan Museum of Art", "MoMA", "American Museum of Natural History"],
    localFoods: ["New York pizza", "Bagels and lox", "Pastrami on rye", "Halal cart chicken and rice"],
    hiddenGems: ["The High Line & Little Island", "Brooklyn Bridge walk at sunrise", "Roosevelt Island tram views"],
    tips: [
      "OMNY tap-to-pay is faster than buying MetroCards",
      "Book Statue of Liberty / Ellis Island and popular Broadway shows ahead",
      "Outer-borough food crawls often beat Midtown tourist restaurants",
    ],
    featured: true,
  },
  apia: {
    ...stock("beach", ["coast", "maldives", "longtail"]),
    tagline: "Harbour capital of Samoa on Upolu's north coast",
    overview:
      "Apia is Samoa's lively harbour capital — waterfront markets, Robert Louis Stevenson’s hillside museum, and easy access to waterfalls and village beaches across Upolu. Sundays are quiet and church-centred; the rest of the week mixes Polynesian hospitality with a compact city base for island exploring.",
    bestTime: "May–October for drier weather and calmer seas",
    weather: "Tropical — warm and humid year-round; wetter November–April",
    airport: "Faleolo International (APW), about 35–45 minutes west of Apia",
    transport: "Buses and taxis cover town; hire a car for waterfalls and south-coast beaches",
    localFoods: ["Palusami", "Oka (raw fish)", "Umu feast dishes", "Cocoa and tropical fruit"],
    tips: [
      "Dress modestly in villages and on Sundays",
      "Carry cash for markets and outer beaches",
      "Book harbour and island day trips through hotels when seas are calm",
    ],
  },
  suva: {
    ...stock("coast", ["beach", "maldives", "cityNight"]),
    tagline: "Fiji's capital of gardens, markets and harbour views",
    overview:
      "Suva anchors Fiji's political and cultural life on Viti Levu's wetter southeast coast — colonial government buildings, the sprawling Suva Municipal Market, and the Fiji Museum in Thurston Gardens. It is less beach-resort than Nadi, but richer for museums, curry houses and a real Pacific city feel before you head to the islands.",
    bestTime: "May–October for less rain; pack a light rain jacket year-round",
    weather: "Tropical — humid with frequent showers; greener and wetter than the west coast",
    airport: "Nausori (SUV) for Suva; Nadi (NAN) is the main international hub ~3 hours west",
    transport: "Taxis and buses in town; long-distance coaches to Nadi and Coral Coast resorts",
    localFoods: ["Fijian curry", "Kokoda (ceviche)", "Lovo feast dishes", "Roti and street snacks"],
    tips: [
      "Visit the market early for the best produce and atmosphere",
      "Combine Suva with a Coral Coast or Yasawa trip rather than treating it as a beach base",
      "Carry a compact umbrella — afternoon rain is common",
    ],
  },
  yaren: {
    ...stock("maldives", ["beach", "coast", "longtail"]),
    tagline: "Nauru's coastal district and government heart",
    overview:
      "Yaren is Nauru's de facto capital district — a coastal strip of government buildings, the parliament, and access to the island's circling road. Travel here is about the compact Pacific island itself: phosphate plateau views, coastal swimming holes, and a quiet, small-nation pace rather than resort infrastructure.",
    bestTime: "April–October for slightly drier trade-wind months",
    weather: "Equatorial — hot, humid, and bright year-round with occasional squalls",
    airport: "Nauru International (INU) in Yaren district",
    transport: "Hire a car or scooter to loop the island's single ring road in a day",
    localFoods: ["Fresh reef fish", "Coconut dishes", "Imported staples from island shops"],
    tips: [
      "Confirm flights carefully — schedules to Nauru are limited",
      "Bring reef-safe sunscreen and cash; services are sparse",
      "Ask locals before swimming — currents and phosphate runoff vary by bay",
    ],
  },
  sharjah: {
    ...stock("dubai", ["cityNight", "desertCamp", "coast"]),
    tagline: "Museums, souks and a calmer Emirati city base",
    overview:
      "Sharjah is the UAE's culture-forward emirate — museums, heritage areas, Al Noor Island and souks within easy reach of Dubai. Use this Sharjah travel guide for a day trip or a quieter overnight base, with practical tips for heat, dress codes and getting around.",
    bestTime: "November–March for outdoor sightseeing; summers are extremely hot",
    weather: "Desert climate — mild winters, very hot summers",
    airport: "Sharjah International (SHJ); Dubai (DXB) is also convenient",
    transport: "Taxis and ride apps; taxis/metro connections toward Dubai",
    shopping: ["Central Souk", "Sahara Centre", "Al Majaz waterfront"],
    nightlife: ["Al Majaz waterfront evenings", "Cafe culture (alcohol rules are stricter than Dubai)"],
    museums: ["Sharjah Museum of Islamic Civilization", "Sharjah Art Museum", "Al Hisn Fort"],
    localFoods: ["Machboos", "Harees", "Fresh juices", "Arabic sweets"],
    tips: [
      "Dress more modestly than in Dubai beach areas",
      "Combine with Dubai via taxi in under an hour to many central districts",
      "Visit museums mid-morning before the heat peaks",
    ],
    faqs: [
      { question: "Is Sharjah worth visiting from Dubai?", answer: "Yes for culture and museums — easy as a day trip, or stay overnight for a calmer pace." },
      { question: "What is the best Sharjah itinerary for one day?", answer: "Morning at the Islamic Civilization Museum and Al Hisn area, afternoon Al Noor Island or souks, evening Al Majaz waterfront." },
    ],
  },
  ngerulmud: {
    ...stock("maldives", ["beach", "coast", "longtail"]),
    tagline: "Palau's hilltop capital above Babeldaob",
    overview:
      "Ngerulmud is Palau's purpose-built capital in Melekeok — a hilltop capitol complex overlooking Babeldaob's green ridges rather than a beach town. Most travellers sleep in Koror for dive boats and restaurants, then visit Ngerulmud as a short cultural stop while exploring the larger island's waterfalls, bays and traditional villages.",
    bestTime: "November–April for calmer seas and peak diving weather",
    weather: "Tropical maritime — warm year-round; wetter June–October",
    airport: "Roman Tmetuchl International (ROR) near Koror; Ngerulmud is a drive across Babeldaob",
    transport: "Rental car essential for Babeldaob; most lodging and boats are based in Koror",
    localFoods: ["Fresh seafood", "Taro and tapioca dishes", "Fruit bat soup (local specialty)", "Japanese-Palauan fusion in Koror"],
    tips: [
      "Base in Koror for diving; day-trip to the capitol and Babeldaob loop",
      "Book Rock Islands and Jellyfish Lake permits in advance in peak season",
      "Respect traditional village rules and marine protected areas",
    ],
  },
};
