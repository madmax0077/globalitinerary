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
  dubai: {
    tagline: "Explore Dubai",
    overview: "Dubai was also used as a smuggling town to smuggle gold from Africa and elsewhere and import it to India, this made Dubai a well-known point in the map for various traders. When oil companies looked for oil around the Trucial States, Dubai was shown to not have any significant oil reserves compared to Abu Dhabi. Sheikh Rashid Al Maktoum, then the leader and Sheikh of Dubai, continued on the booming expansion of trade in Dubai instead of relying on any oil income. He welcomed Indian traders, Iranian traders, and… (Source: Wikivoyage, CC BY-SA.)",
  },
  tokyo: {
    tagline: "Explore Tokyo",
    overview: "Over 500 years old, the city of Tokyo was once the modest fishing village of Edo (江戸 - literally Gate of the River) due to its location at the mouth of Sumida-gawa. The city only truly began to grow when it became the seat of the Tokugawa Shogunate in 1603, who decided to set up a new seat of power far away from the intrigues of the imperial court in Kyoto. After the Tokugawa Shogunate collapsed in the Meiji Restoration of 1868, the emperor and his court moved here from Kyoto, and the city was renamed to its… (Source: Wikivoyage, CC BY-SA.)",
  },
  seoul: {
    tagline: "Explore Seoul",
    overview: "With over 10 million people, a figure that doubles if you include neighboring cities and suburbs, Seoul is the largest city in South Korea and unquestionably the economic, political and cultural hub of the nation. By some measures it is the second largest urban agglomeration on the planet, after Greater Tokyo. Seoul is a favourite with tourists from China, Japan, Southeast Asia, and, increasingly, the West, encouraged by the success of Korean pop culture. Aside from the native Korean, travelers will frequently… (Source: Wikivoyage, CC BY-SA.)",
  },
  barcelona: {
    tagline: "Explore Barcelona",
    overview: "thumbnail|right|It rarely snows in Barcelona, but when it does it highlights the closeness of the mountain range at one end of the city to the seaside on the other ===When to (Source: Wikivoyage, CC BY-SA.)",
  },
  amsterdam: {
    tagline: "Explore Amsterdam",
    overview: "With a population surpassing 934,000 in 2025 – and soaring well past a million when you account for the immediate surroundings – Amsterdam unquestionably holds the crown as the Netherlands' largest city. Numbers aside, Amsterdam is the financial, cultural, and creative heart of the nation. English is widely spoken and understood by almost everyone, so language barriers are rarely an issue for travellers. The semi-circle is on the south side of the IJ, which is often called a river but more exactly is an estuary.… (Source: Wikivoyage, CC BY-SA.)",
  },
  milan: {
    tagline: "Explore Milan",
    overview: "thumb|right|The breathtaking views of Milan from the magnificent roof of the Duomo Milan is often described as representing \"modern\" Italy. The differences between Rome and Milan are evident from several proverbs, such as an Italian saying about the differences between the two cities which roughly translates, \"Rome is a voluptuous woman whose gifts are very apparent, while Milan is the shy, demure girl whose treasures are plentiful, but discovered in time.\" Milan is the most modern of all Italian cities, yet it… (Source: Wikivoyage, CC BY-SA.)",
  },
  rome: {
    tagline: "Explore Rome",
    overview: "thumb|right|250px|The Pantheon Situated on the River Tiber, between the Apennine Mountains and the Tyrrhenian Sea, the \"Eternal City\" was once the administrative centre of the mighty Roman Empire, governing a vast region that stretched all the way from Britain to Mesopotamia. Today it remains the seat of the Italian government and home to numerous ministerial offices. Rome has 2.7 million inhabitants while the metropolitan area is home to around 4.5 million. Architecturally and culturally, Rome has some contrasts… (Source: Wikivoyage, CC BY-SA.)",
  },
  vienna: {
    tagline: "Explore Vienna",
    overview: "Given its prestige, Vienna hosted the Habsburg court for several centuries, first as the Imperial seat of the Holy Roman Empire, then the capital of the Austrian Empire, and later of the Austro-Hungarian Empire, which finally fell in 1918 with the abdication of the last Emperor Karl I. The court tremendously influenced the culture that exists here even today: Vienna's residents are often overly formal, with small doses of courtliness, polite forms of address, and formal dress attire. One distinguishable paradox of… (Source: Wikivoyage, CC BY-SA.)",
  },
  "los-angeles": {
    tagline: "Explore Los Angeles",
    overview: "Such is the nature of Los Angeles: because it is so spread out and its individual cities and neighborhoods are so distinct, the city is often thought of less as a cohesive whole than as a collection of disparate communities. Even some of the neighborhoods officially within the city of Los Angeles are so well-known that they are often thought to be distinct from the city, such as Hollywood, Van Nuys, Bel-Air, and Venice Beach, which sit astride officially independent municipalities such as West Hollywood, Santa… (Source: Wikivoyage, CC BY-SA.)",
  },
  madrid: {
    tagline: "Explore Madrid",
    overview: "thumb|right|Palacio de Cibeles, Madrid's city hall, Cibeles Square Madrid has over 3.4 million residents within the city limits and 7 million people live in the autonomous Community of Madrid region (as of (Source: Wikivoyage, CC BY-SA.)",
  },
  shanghai: {
    tagline: "Explore Shanghai",
    overview: "Shanghai is one of four cities in China that are administered as municipalities (市), meaning that it is not part of any province, and its government instead reports directly to the central government in Beijing. There are several ways to rate the size of cities; based on UN numbers, Shanghai is the fifth-largest city in the world after Jakarta, Dhaka, Tokyo and Delhi. By any measure, it is in the top ten for the world and either the largest in China or second to (Source: Wikivoyage, CC BY-SA.)",
  },
  dublin: {
    tagline: "Explore Dublin",
    overview: "thumb | 300px | Ha'Penny Bridge === History === Dublin is in a low-lying, fertile area, not boggy by Irish standards, and with good sea access. It became the core of the Gaelic kingdom of Leinster, and the Vikings established a large settlement by what is now Dublin castle, until ejected by Brian Boru at the Battle of Clontarf in 1014. This set a pattern that Dublin was fought for, not fought in. The Normans colonised the southwest and Leinster from the 12th century, and further out they battled with the Gaels,… (Source: Wikivoyage, CC BY-SA.)",
  },
  berlin: {
    tagline: "Explore Berlin",
    overview: "The city of Berlin is co-extensive with the Land of Berlin, one of the 16 federal states that make up the Federal Republic of Germany. It has a population of 3.8 million (2019) (and a million more in suburbs like Potsdam across the state line in Brandenburg). Berlin is and has been far less dominant as the capital of Germany than London, Paris or Madrid are in their respective countries, because of the federal nature of Germany and because the havoc war and partition wreaked on the city. In many ways, West Berlin… (Source: Wikivoyage, CC BY-SA.)",
  },
  toronto: {
    tagline: "Explore Toronto",
    overview: "Toronto has an estimated population of over 3.2 million people as of 2024, and is the heart of the Greater Toronto Area (GTA) which has 7.1 million people. It also anchors the Golden Horseshoe region, which wraps around Lake Ontario from Toronto to Niagara Falls, home to over 11.1 million residents, approximately a quarter of Canada's entire population. Toronto is the fourth largest city and fifth largest urban agglomeration in North America. Distances between cities in the area can be great as it sprawls along,… (Source: Wikivoyage, CC BY-SA.)",
  },
  lisbon: {
    tagline: "Explore Lisbon",
    overview: "thumb|right|Central Lisbon seen from a plane landing at Portela, looking south; the green strip is Parque Eduardo VII terminating at Praça Marquês de Pombal. Lisbon is built on seven hills, so getting around Lisbon can be a workout. Many slopes and few really flat areas is one of Lisbon's trademarks. This is also a city of enchanting contrasts: The elegant squares, broad avenues, monumental buildings and rectangular layout of the lower areas quickly gives way to the hilly, narrow, winding, unpredictable and… (Source: Wikivoyage, CC BY-SA.)",
  },
  venice: {
    tagline: "Explore Venice",
    overview: "The comune (municipality) of Venice lies at the coast of northern Italy. It is made up of many islands in the Venetian Lagoon and a stretch of terraferma (mainland). The comune is divided into six boroughs, the most famous of which (known as Venezia Insulare) comprises the historic city of Venice as well as the islands of Giudecca, Murano, Burano, Torcello, Mazzorbo and Sant'Erasmo. Lido and Mestre are other popular areas of the comune. The historic city is divided into six sestieri (districts): Cannaregio,… (Source: Wikivoyage, CC BY-SA.)",
  },
  delhi: {
    tagline: "Explore Delhi",
    overview: "Travellers with little experience of visiting developing megacities may find Delhi to be chaotic at its worst, crowded and for much of the year, polluted. Air pollution has been a major problem in Delhi since the 1980s, with much of the day dominated with a very unhealthy amount of particles. During the late spring and early summer months, the city is scorchingly hot. Dig a little deeper, however, and you will get a glimpse of order beneath the chaos, as well as India's traditional and modern cultural richness… (Source: Wikivoyage, CC BY-SA.)",
  },
  mumbai: {
    tagline: "Explore Mumbai",
    overview: "thumb|Carvings at the Elephanta Island|Elephanta Caves right Mumbai (MOOM-bigh) is a bustling, diverse metropolis with a flair of its own. The entrepreneurial spirit and pulsing pace of life provide a sharp contrast to much of the rest of India. The name was officially changed from Bombay to Mumbai in 1995. Although both names are common, people who explicitly use \"Bombay\" are generally non-Marathi speakers, whereas \"Mumbai\" proponents primarily speak Marathi. In the West, \"Mumbai\" has become more commonly… (Source: Wikivoyage, CC BY-SA.)",
  },
  budapest: {
    tagline: "Explore Budapest",
    overview: "In the following centuries, Buda emerged as the most important royal seat. In 1241/42 the Mongol Empire conquered the territory along with large parts of Europe - this short but devastating conquest of the country is still remembered as Tatárjárás - the name reflecting the erroneous confusion of Mongols and Tatars at the time. Medieval Hungary reached its zenith under King Matthias (Matthias Corvinus), the vividly remembered Renaissance ruler whose patronage of arts and sciences made Hungary, a notable power at… (Source: Wikivoyage, CC BY-SA.)",
  },
  warsaw: {
    tagline: "Explore Warsaw",
    overview: "250px|thumb|Present-day Warsaw is a mixture of the new and old A city of 1.8 million inhabitants (2021), it sits on the Vistula River (Polish: Wisła) in the middle of the (Source: Wikivoyage, CC BY-SA.)",
  },
  porto: {
    tagline: "Explore Porto",
    overview: "thumb|right|View of Porto from south side. thumb|right|View of Porto houses The city is quite varied architecturally, with medieval and modern buildings side by side. Porto's geography is hard on the feet, but pleasant to the eye. The city's grounds are extremely uneven; the Romans strategically built their fortified settlement into a cliff face that overlooks the river, where the present cathedral stands today. Stairs cut into the stone run up and down the cliff face and offer a laborious but rewarding walking… (Source: Wikivoyage, CC BY-SA.)",
  },
  valencia: {
    tagline: "Explore Valencia",
    overview: "thumbnail|Saló Columnari (Hall of Columns) in the Llotja de la Seda thumbnail|Jardí del Túria, the old Túria riverbed, with the Museum of Fine Arts in the background thumb|Museu de les Ciències Príncipe Felipe, in the City of Arts and Sciences, designed by Santiago Calatrava Valentia Edetanorum was established as a Roman colony in the second century BCE. In the early 8th century CE the Moors invaded, and Balansiyya became the capital of the Muslim Taifa of Valencia, thriving as a trading centre for paper, silk,… (Source: Wikivoyage, CC BY-SA.)",
  },
  nice: {
    tagline: "Explore Nice",
    overview: "thumb|Nice Nice's origins can be found among the Gallo-Roman ruins of Cimiez, in the hills up the boulevard de Cimiez from downtown. Cimiez also contains a monastery and some museums, but nowadays, most of the city's inhabitants live closer to sea level. Nice was part of the Italian Duchy of Savoia and then the Kingdom of Sardinia until it was ceded to France in 1860. The ancient local language is Nissart, and some of the street signs are bilingual. However very few people speak Nissart, and even the elderly know… (Source: Wikivoyage, CC BY-SA.)",
  },
  lyon: {
    tagline: "Explore Lyon",
    overview: "thumb|right|Fourvière basilica from the river Saône, illuminated at night Founded by the Romans, with many preserved historical areas, Lyon is the archetype of the heritage city, as recognised by UNESCO. Lyon is a vibrant metropolis which starts to make the most out of its unique architectural, cultural and gastronomic heritage, its dynamic demographics and economy and its strategic location between Northern and Southern Europe. It is more and more open to the world, with an increasing number of students and… (Source: Wikivoyage, CC BY-SA.)",
  },
  "cape-town": {
    tagline: "Explore Cape Town",
    overview: "Cape Town is nicknamed the Mother City within South Africa. Compared to the more business oriented Johannesburg it is known for its relaxed and leisurely atmosphere. Compared to other parts of South Africa, Cape Town is also distinctly more \"western\". The metropolis of Cape Town is spread over a wide area, from Somerset West and Durbanville in the east to Atlantis in the north and Cape Point in the south. The city centre is situated in a fairly small area between Table Bay and Table (Source: Wikivoyage, CC BY-SA.)",
  },
  "rio-de-janeiro": {
    tagline: "Explore Rio de Janeiro",
    overview: "It is a common mistake to think of Rio as Brazil's capital, a distinction it lost on April 21, 1960 when the national government officially moved to Brasilia. Beaches such as Copacabana and Ipanema, the Christ The Redeemer (Cristo Redentor) statue, the stadium of Maracanã and Sugarloaf Mountain (Pão de Açúcar) are all well-known sights of what the inhabitants call the \"marvelous city\" (cidade maravilhosa), and are also among the first images to pop up in travelers´ minds, along with the Carnaval celebration. The… (Source: Wikivoyage, CC BY-SA.)",
  },
  "buenos-aires": {
    tagline: "Explore Buenos Aires",
    overview: "thumb|300px|Aerial view of Buenos Aires Buenos Aires means fair winds, or literally good airs, in Spanish. The official name is Ciudad Autónoma de Buenos Aires (CABA; \"Autonomous City of Buenos Aires\"), and it's also called the Capital Federal (\"Federal Capital\"), to distinguish it from the neighboring Buenos Aires Province. It is one of the largest cities in Latin America, with many cultural offerings, and is the point of departure for traveling to the rest of the country. People from Buenos Aires are called… (Source: Wikivoyage, CC BY-SA.)",
  },
  chicago: {
    tagline: "Explore Chicago",
    overview: "thumb|300px|Chicago's skyline viewed from Millennium Park Chicago tourist information. Chicago became a waypoint between the Great Lakes and the Wild West, where boats came to drop off settlers, and load crops and other goods from the Great Plains and the Rocky (Source: Wikivoyage, CC BY-SA.)",
  },
  montreal: {
    tagline: "Explore Montréal",
    overview: "Prohibition on sales of alcohol in the United States during the 1920s and 1930s made Montreal a destination for cross-border fun seekers from nearby New England and New York. The city built up a seedy, yet playful, industry in alcohol, burlesque, and other vices. In the 1960s, an urban renewal drive centred on Expo 67. The World's Fair in Montreal brought the Metro system and attractive urban parks and is considered to be one of the most successful World Fairs. Over 50 million visitors gathered in Montreal during… (Source: Wikivoyage, CC BY-SA.)",
  },
  melbourne: {
    tagline: "Explore Melbourne",
    overview: "thumb|300px|Flinders Street Station, the Yarra River and central Melbourne skyline ===History=== thumb|St Michael's Uniting Church built in 1866 The British settlement of Melbourne commenced in 1835 when settlers from Tasmania led by John Batman \"purchased\" land on Port Phillip Bay and the Yarra River from the local Aboriginal people. The streets of central Melbourne were carefully laid out in 1837, with some streets 30 metres wide. Initially dubbed Batmania after its founder, the settlement was soon renamed… (Source: Wikivoyage, CC BY-SA.)",
  },
  auckland: {
    tagline: "Explore Auckland",
    overview: "thumb|Auckland – City of Sails Auckland is New Zealand's largest city, home to 1.5 million people, nearly one-third of the country's population and more than that of the entire South Island. It is the main economic and travel hub and home to an international airport. It's lucky enough to have its own beautiful landscapes, waterways, and other attractions to draw tourists in. It is not New Zealand's political capital though – that honour goes to Wellington. Auckland is by some measures the most isolated city of… (Source: Wikivoyage, CC BY-SA.)",
  },
  bali: {
    tagline: "Explore Bali",
    overview: "thumb|280px|Preparing for a colourful odalan temple anniversary procession Bali is one of more than 18,000 islands (based on a satellite view) in the Indonesian archipelago, and is just over 2 km (almost 1.5&nbsp;miles) from the eastern tip of the island of Java and west of the island of Lombok. The island, home to a little over 4 million people, is about long from east to west and north to south. The word \"paradise\" is used a lot when describing Bali. Friendly, hospitable people; a magnificently visual and… (Source: Wikivoyage, CC BY-SA.)",
  },
  jakarta: {
    tagline: "Explore Jakarta",
    overview: "Jakarta's nickname among expats is the Big Durian, and like the fruit itself, it's a shock at first sight (and smell): a sweltering, steaming, heaving mass of some 30 million people packed into a vast urban sprawl. The metropolitan area is a magnet for Indonesians, both as a business and a government centre, and the most developed city in the country. But all of this comes at a cost: the city has been struggling very hard to keep up with the urban growth. Major roads are packed up during rush hours and weekends,… (Source: Wikivoyage, CC BY-SA.)",
  },
  "ho-chi-minh-city": {
    tagline: "Explore Ho Chi Minh City",
    overview: "Following the fall of Saigon in 1975, Saigon was renamed Ho Chi Minh City. However the old name Saigon is still widely used by both Vietnamese and foreigners, especially when referring to the most central part of the city to which most tourists flock. Although the capital of a united Vietnam is Hanoi in the north, Ho Chi Minh City remains Vietnam's main economic and financial centre. While it does not have the long history that cities like Hanoi and Hue have, it is Vietnam's most modern and cosmopolitan city, with… (Source: Wikivoyage, CC BY-SA.)",
  },
  hanoi: {
    tagline: "Explore Hanoi",
    overview: "thumb|300px|Hanoi Opera Housethumb|300px|Hanoi's Temple of Literature Invading forces from every direction agree: Hanoi makes a fine capital. It has held that title for more than a thousand years, through several invasions, occupations, restorations, and name changes. The Chinese conquered the imperial city of Đại La in 1408 and renamed it Tống Bình. Le Loi repelled the invaders in 1428 and applied the name of Lê Thái Tổ (黎太祖). For his efforts, he received the crown and a slew of legends about his heroic exploits,… (Source: Wikivoyage, CC BY-SA.)",
  },
  "siem-reap": {
    tagline: "Explore Siem Reap",
    overview: "thumb|350px|French colonial architecture still dominates the streetscape. The name \"Siem Reap\" literally means \"Siam Defeated\", commemorating a (possibly apocryphal) victory over invading Thais in 1549. These days, however, the only rampaging hordes are the tourists heading to the Angkor Archaeological Park. This once quaint village has become a major tourist town, full of things to do, places to eat and drink. New high quality tarmac roads and beautiful wide paved sidewalks have replaced the red dirt pot holed… (Source: Wikivoyage, CC BY-SA.)",
  },
  "phnom-penh": {
    tagline: "Explore Phnom Penh",
    overview: "Phnom Penh was largely depopulated during the Khmer Rouge regime, with most of its population deported to camps in the countryside. It was liberated from the Khmer Rouge by the Vietnamese in 1979, and has long remained a bit rough. Things have improved; however, some roads remain shabby, traffic is persistently chaotic, and electricity is occasionally strained (never mind your precious internet). But on the whole, the city is reasonably modern. thumb|The Silver Pagoda, in the grounds of the Royal Palace. The city… (Source: Wikivoyage, CC BY-SA.)",
  },
  "abu-dhabi": {
    tagline: "Explore Abu Dhabi",
    overview: "The city was not intended to be the capital of the UAE. The capital of the UAE was supposed to be a planned city between Abu Dhabi and Dubai and was to be called 'Al Karama' (which means dignity in Arabic) as stated in the first version of the constitution. However, considering the earlier stage of the union was a volatile time, with multiple issues and various ordeals occurring, Abu Dhabi was made the temporary capital as it was the home of the UAE founding father Sheikh Zayed. Later, Abu Dhabi was declared to be… (Source: Wikivoyage, CC BY-SA.)",
  },
  "tel-aviv": {
    tagline: "Explore Tel Aviv",
    overview: "thumb|300px|Tel Aviv Port in the Yarkon River Peninsula thumb|300px|Yarkon Park The smallish Gulf of Jaffa was the site of a fortified port town for at least 4,000 years. During the 19th century the town’s population grew from about 2,500 (1806) to 17,000 (1886). The old city walls could no longer contain the population, and they were destroyed in the 1870s. New, more spacious neighborhoods started to (Source: Wikivoyage, CC BY-SA.)",
  },
  kyoto: {
    tagline: "Explore Kyoto",
    overview: "Nestled among the mountains of the Kansai region of Western Honshu, Kyoto was the capital of Japan and the residence of the Emperor from 794 until the Meiji Restoration of 1868, when the capital was moved to Tokyo. During its millennium at the center of Japanese power, culture, tradition, and religion, it accumulated an unparalleled collection of palaces, temples and shrines, built for emperors, shoguns, and monks. Kyoto was among the few Japanese cities that escaped the allied bombings of World War II and so… (Source: Wikivoyage, CC BY-SA.)",
  },
  santorini: {
    tagline: "Explore Santorini",
    overview: "thumb|View of Fira Santorini is between Ios and Anafi islands in the southern Cyclades. On a clear day, you may be able to see Crete, about 100 km to the south. The name is a contraction of Saint Irene, after an old church in Perissa. The Santorini archipelago used to be a single island, until a volcanic eruption around 1600 BCE tore it apart. The eruption was among the most massive in human history. There is a local legend that Santorini was once home to the Lost City of Atlantis, destroyed by the eruption. Most… (Source: Wikivoyage, CC BY-SA.)",
  },
  reykjavik: {
    tagline: "Explore Reykjavík",
    overview: "Although the story of Ingólfur Arnarson is not widely believed to be true by modern historians, it's clear that Reykjavík was one of the first settlements in Iceland. Archaeological remains confirm that people were living there around the year 871, and for the first few centuries of Icelandic settlement, Reykjavík was a large manor farm. Its fortunes steadily waned as other centres of power increased in importance. By the 18th century, the farm of Reykjavík was owned by the king of Denmark (under whose domain… (Source: Wikivoyage, CC BY-SA.)",
  },
  helsinki: {
    tagline: "Explore Helsinki",
    overview: "thumb|300px|Helsinki's symbol, the Lutheran Cathedral (Tuomiokirkko) Helsinki was established as a trading town by the Swedish Empire in 1550, but it wasn't until 1812, when the Russian Empire made it the capital of Finland, that it started growing. Today, this hustling and bustling city has 690,000 inhabitants and the capital area 1.36 million (2025). It is the northernmost capital of an EU member state. Helsinki metro is the northernmost subway in the (Source: Wikivoyage, CC BY-SA.)",
  },
  oslo: {
    tagline: "Explore Oslo",
    overview: "thumbnail|Stortinget, the Norwegian parliament is a monumental building on the main street of Oslo. Oslo is the demographic, economic and political centre of Norway. As the capital of Norway, Oslo hosts several national institutions within government, education, culture, sports and transport. The city has a good selection of cultural institutions and a good selection of restaurants, some world class but most ordinary, as well as night life in general. While it is an expensive city for some overseas visitors, many… (Source: Wikivoyage, CC BY-SA.)",
  },
  krakow: {
    tagline: "Explore Kraków",
    overview: "thumb|Statue of Adam Mickiewicz and Sukiennice in the Main Market Square thumb|upright|Church of St. Mary seen from the Main Market In English the city's name used to be spelled \"Cracow\". But 21st-century visitors have discovered it via budget airlines and travel booking sites that always call it \"Krakow\" so the older spelling isn't used here. The diacritical mark over the \"o\" changes the pronunciation from \"o\" (IPA: [ɔ]), to \"u\" (IPA: [u]). Through trade with the various rulers of Europe, it grew from a small… (Source: Wikivoyage, CC BY-SA.)",
  },
  split: {
    tagline: "Explore Split",
    overview: "Because of its ideal climate, with 2,800 hours of sunlight each year, local people have a few nicknames for Split: \"The most beautiful city in the world\" and \"Mediterranean flower\". Many famous Croatian sports people were born in Split, so locals often nicknamed their city \"The sportiest city in the world\". The most popular sport institution is the football club Hajduk. Large portions of the city are painted with the club's colors and logo. This is done by Torcida, the oldest supporters group in Europe,… (Source: Wikivoyage, CC BY-SA.)",
  },
  havana: {
    tagline: "Explore Havana",
    overview: "thumb|400px|The Catedral de San Cristobal, La Habana Vieja (Old Havana). Before the Communist revolution, Havana was one of the vacation hot-spots of the Caribbean, and since Cuba reopened to tourism in the 1990s, it has become a popular destination once again, albeit with many fewer U.S. citizens, due to an almost total ban on travel maintained by the U.S. federal government. However, there will be lots of tourists at any time of year, so expect huge crowds and long lines in (Source: Wikivoyage, CC BY-SA.)",
  },
  santiago: {
    tagline: "Explore Santiago",
    overview: "thumb|350px|Santiago/Providencia#Q1542408|Gran Torre Santiago, the tallest building in Latin America Santiago is a fast-growing city in the Santiago Región Metropolitana, in the central valley of Chile between the Andes mountain range to the east and the Coastal Range to the west. The metropolitan area has about 7 million inhabitants. Founded in 1541 as Santiago de Nueva Extremadura by the Spaniard Pedro de Valdivia, it has been the heart of the country since colonial times and has evolved to the cosmopolitan city… (Source: Wikivoyage, CC BY-SA.)",
  },
  johannesburg: {
    tagline: "Explore Johannesburg",
    overview: "Johannesburg has a population of about 5.6 million people in the urban area (2023), half of whom live in Soweto and adjacent suburbs. Three quarters of the population is formed by South Africa's black residents who mostly live in Soweto, while white residents amount to about 12% (2019). The remaining 11% are of other descent, including Africa's largest ethnic Chinese community. The city is home to two Chinatowns; the original one on Commissioner Street has shrunk dramatically since its heyday, but still has a few… (Source: Wikivoyage, CC BY-SA.)",
  },
  nairobi: {
    tagline: "Explore Nairobi",
    overview: "The British presence led to the creation of big hotels primarily for the British hunters. After independence, some descendants of the British settlers remained in Nairobi and obtained Kenyan citizenship, and today form Kenya's white community. Nairobi also has an East Indian community, who are the descendants of the labourers who built the railway and the merchants who set up shop during colonial times. After independence, Nairobi airport became the principal entrance point to Kenya and it still is today, although… (Source: Wikivoyage, CC BY-SA.)",
  },
  zanzibar: {
    tagline: "Explore Zanzibar",
    overview: "The island and the surrounding islets are divided into three regions. They are Zanzibar Central/South, Zanzibar North and Zanzibar Urban/West. Zanzibar City, on the central west coast, is the capital and largest city of Zanzibar and the region of Zanzibar Urban/West. The population of Zanzibar Island was about 900,000 in 2016, with the most concentrated populations in the Zanzibar Urban Region. The larger and more populated of the province's two larger islands, Zanzibar is separated from its northern neighbor… (Source: Wikivoyage, CC BY-SA.)",
  },
  kathmandu: {
    tagline: "Explore Kathmandu",
    overview: "According to a census conducted in 2011, Kathmandu metropolis has 2.5 million inhabitants, and the agglomeration has a population of more than 3 million inhabitants. The metropolitan city area is 50.67 km² (19.56 sq mi) and has a population density of 3000 per km² and 17,000 per km square in the city proper. The city stands at an elevation of approximately 1,400 metres (4,600 ft) in the bowl-shaped Kathmandu Valley of central Nepal. It is surrounded by four major mountains: Shivapuri, Phulchoki, Nagarjun, and… (Source: Wikivoyage, CC BY-SA.)",
  },
  colombo: {
    tagline: "Explore Colombo",
    overview: "Colombo is the commercial and financial capital of Sri Lanka after the administrative capital was moved to Sri Jayawardenapura Kotte, a suburb east of the city. \"Colombo\" could refer to either the city proper, or to Greater Colombo that includes the areas of Sri Jayawardenapura Kotte and Dehiwala-Mount Lavinia. Due to it being on a strategic route in the Indian Ocean, Colombo hosts one of the busiest ports in South Asia, and was known to traders 2,000 years ago. It was an important port on the Maritime Silk Road.… (Source: Wikivoyage, CC BY-SA.)",
  },
  male: {
    tagline: "Explore Male",
    overview: "thumb|Malé refers to both the city and the island Malé is home to over 250,000 people, on island only long and wide. By some measures, it is the world's densest city. The new island of Hulhumalé, built (as the name says) between Malé and Hulhulé (the airport island), has been reclaimed from the sea to provide some much-needed extra space. The neighbouring islands Hulhumalé (artificial) and Villimalé are served by frequent and very cheap public ferries and provide much quieter get-aways from the capital city. To… (Source: Wikivoyage, CC BY-SA.)",
  },
  houston: {
    tagline: "Explore Houston",
    overview: "300px|thumb|right|Main Street Houston Houston has a character that, while very \"Texan,\" is also a great melting pot of many cultures and socio-economic groups. You'll find well-to-do suburban mansions, LA-style shopping strips, Latin-American neighborhoods, towering skyscrapers, historic African-American neighborhoods fighting off gentrification, massive refinery complexes, large Asian communities, and pockets of artist communities. From October to May, the weather is relatively pleasant, and many restaurants and… (Source: Wikivoyage, CC BY-SA.)",
  },
  "da-nang": {
    tagline: "Explore Da Nang",
    overview: "The regions surrounding Da Nang (My Son, Quang Nam) were founded by the Cham Hindus perhaps 3,000 years ago, serving as the capital city and centre of the Hindu Champa Dynasty. Vietnamese invasions into the region in the 17th century significantly halted Cham development. Given that Da Nang was the first point of colonial invasion, many vestiges of French architecture are present in the historic buildings. Da Nang was also where American combat troops first landed during the Vietnam War, and there are also many… (Source: Wikivoyage, CC BY-SA.)",
  },
  vientiane: {
    tagline: "Explore Vientiane",
    overview: "Not too long ago, Vientiane was often described as sleepy and charming. However, the combination of exploding population &mdash; Vientiane has over doubled in size since 2000, reaching some 750,000 people in the 2020 census &mdash; and the frenetic Chinese-led investment boom and bust has led to considerable growing pains, with strip malls, traffic jams and abandoned construction sites throughout the city, and the French colonial villas of the old town now stand cheek to jowl with various concrete monstrosities,… (Source: Wikivoyage, CC BY-SA.)",
  },
  busan: {
    tagline: "Explore Busan",
    overview: "Located at the southern tip of the Korean peninsula and with over 3.6 million people, Busan is South Korea's second largest city. It is known for its beaches, seafood, and events such as the city's international film festival and the yearly polar bear festival. It appeals to those seeking a more laid-back atmosphere than Seoul. It has an international flair, with sailors from around the world trooping through, and a growing number of tourists. The Haeundae area of Busan that contains a large amount of the city's… (Source: Wikivoyage, CC BY-SA.)",
  },
  sapporo: {
    tagline: "Explore Sapporo",
    overview: "thumb|350px|right|Sapporo Skyline Sapporo's population has grown from seven in 1857 to nearly 2 million in 2021. Welcome to Sapporo is the city's official multilingual guide (Source: Wikivoyage, CC BY-SA.)",
  },
  nagoya: {
    tagline: "Explore Nagoya",
    overview: "The hub of Aichi prefecture, Nagoya is Japan's fourth-largest city after Tokyo, Yokohama, and Osaka and one of the nation's major economic centers. In terms of manufacturing, as home to auto-making giants Toyota, Honda, and Mitsubishi Motors, Nagoya is to Japan what Detroit is to the United States &mdash; and it was completely flattened during World War II. Three famous local figures later helped to put Nagoya firmly on the map of Japan. Oda Nobunaga, Toyotomi Hideyoshi and Tokugawa Ieyasu all hailed from around… (Source: Wikivoyage, CC BY-SA.)",
  },
  guangzhou: {
    tagline: "Explore Guangzhou",
    overview: "thumb|right|230px|Zhujiang New Town (with 103-story West Tower) in the Tianhe district As a historic gateway for overseas culture, Guangzhou has long been accustomed to the presence of foreigners — unlike many other Chinese cities where visitors may still stand out. As a result, travelers often find greater personal freedom and space here. Beyond the central districts and their towering skyscrapers, traditional neighborhoods continue to thrive at a slower, more familiar pace, where locals gather outdoors to share… (Source: Wikivoyage, CC BY-SA.)",
  },
  shenzhen: {
    tagline: "Explore Shenzhen",
    overview: "thumb|Deng Xiaoping, former leader of China and architect of Shenzhen's incredible growth, strides above the city in Lianhuashan Park In 1980, Shenzhen was a market town on the Hong Kong border with 30,000 people. (Contrary to the quite widespread myth, Shenzhen was not a fishing community.) Then Chinese leader Deng Xiaoping designated the city the first of China's Special Economic Zones (SEZs). This was part of the \"Reform and Opening Up\" policy to revitalize China's economy after its stagnation in the previous… (Source: Wikivoyage, CC BY-SA.)",
  },
  pokhara: {
    tagline: "Explore Pokhara",
    overview: "Pokhara is the second largest city in Nepal with about 520,000 people in 2021. It is the starting point for most of the treks in the Annapurna area. It is a very popular location with most people staying around the beautiful Fewa Lake. Dozens of hotels and restaurants are sprouting like mushrooms everywhere, and today it is much easier to find modern amenities not common to other locations in Nepal, but Pokhara is losing its small town charm and the lakeside now feels more like Khao San Road (with all the usual:… (Source: Wikivoyage, CC BY-SA.)",
  },
  tunis: {
    tagline: "Explore Tunis",
    overview: "350px|thumb|View along Avenue Habib Bourguiba Located on the Mediterranean coast but lacking much in the way of beaches, Tunis has been spared the onslaught of package tourism to the resorts to the north and south. The city center is located about 10 km from the sea, on the shores of Lake Tunis. Tunis started out as a modest village compared to cities like Carthage, Kairouan and Mahdia. It eventually became the capital of the Almohad Caliphate in 1159, and has been conquered by various Muslim and Christian empires… (Source: Wikivoyage, CC BY-SA.)",
  },
  malaga: {
    tagline: "Explore Málaga",
    overview: "Málaga is capital of the Málaga Province. It has a typical Mediterranean climate, and was the birthplace of the artist Pablo (Source: Wikivoyage, CC BY-SA.)",
  },
  marseille: {
    tagline: "Explore Marseille",
    overview: "Marseille has a complex history. It was founded by the Phoceans (from the Greek city of Phocea) in 600 BC and is one of the oldest cities in Europe. The town is a far cry from the Cézanne paintings and Provençal clichés of sleepy villages, \"pétanque\" players and Marcel Pagnol novels. With around one million inhabitants, Marseille is the second largest city in France in terms of population and the largest in terms of area. Its population is a real melting pot of different cultures. It is also said that there are… (Source: Wikivoyage, CC BY-SA.)",
  },
  bergen: {
    tagline: "Explore Bergen",
    overview: "thumb|350px|View from Mount Fløyen The character of Bergen is defined by its location, surrounded by steep mountains and sea (straits and fjords). The city has many lakes. It is a typical Norwegian wooden town, even downtown there are notable neighbourhoods of small wooden houses in various styles. Few towns if any have so many wooden houses in the centre. In some areas wooden houses have been replaced by taller masonry structures, giving the city a fascinating mix of old and new. Bergen is a sprawling city… (Source: Wikivoyage, CC BY-SA.)",
  },
  tallinn: {
    tagline: "Explore Tallinn",
    overview: "On the shore of the Gulf of Finland, it is a city of over 450,000 inhabitants (2023). It is home to a third of the country's population, and is also the capital of Harju County in Northern Estonia. In a striking contrast to its Old Town, its immediate outskirts are filled with a cluster of modern office towers, with intermittent architectural monuments to the Soviet era. Further out, you will find a bewildering variety of historic and modern neighbourhoods, religious, civic, industrial and maritime heritage. This… (Source: Wikivoyage, CC BY-SA.)",
  },
  vilnius: {
    tagline: "Explore Vilnius",
    overview: "thumb | Gediminas Tower Vilnius has been central to the country's life for as long as there has been Lithuania, but that has often been a tragic tale. Its Neolithic people traded in Baltic amber. In the early Middle Ages five petty kingdoms combined into two then one, when Mindaugas in 1253 became Lithuania's first king and noble Christian convert. The country splintered after his assassination but was re-united under Gediminas, who established Vilnius castle — in legend on the site where a wolf in a dream told… (Source: Wikivoyage, CC BY-SA.)",
  },
  ljubljana: {
    tagline: "Explore Ljubljana",
    overview: "File:Sl-Ljubljana.ogg thumb | 300px | House on Stari Trg Ljubljana stands at the entrance to a plain in an otherwise mountainous region, the confluence of several river valleys, so it's been a focus for settlement, trade and transport since prehistory. The first known city was the Roman Colonia Iulia Aemona; in medieval times it became Laibach and this name is still used by some German-speakers (as well as modern Slovenia's most notable cultural export, the band of that name). It fell under the gravity of… (Source: Wikivoyage, CC BY-SA.)",
  },
  belgrade: {
    tagline: "Explore Belgrade",
    overview: "thumb | 300px | National Assembly of Serbia The core of the city is on a bluff overlooking the confluence of the Sava and Danube. Both rivers are navigable by large vessels: the Sava up to Sisak in Croatia, and the Danube from the Black Sea all the way up to Kelheim in Bavaria. It's been inhabited at least since 6000 BC and the earliest recognisable town was the Celtic settlement of Singidūn. The bluff now called Kalmegdan was fortified and its environs grew into the White City, beo grad. Belgrade has, however,… (Source: Wikivoyage, CC BY-SA.)",
  },
  bucharest: {
    tagline: "Explore Bucharest",
    overview: "thumb|right|Calea Victoriei thumb|right|Lipscani Street, the heart of historic Bucharest Bucharest is the primary entry point into Romania, and the most important industrial and commercial centre of the country. With more than 2.1 million inhabitants in its urban area, Bucharest is one of the largest cities in Southeastern (Source: Wikivoyage, CC BY-SA.)",
  },
  izmir: {
    tagline: "Explore İzmir",
    overview: "This Smyrna was 5 km north of the present centre, in what is now the suburb of Bayraklı, and founded about 3000 BC by the Trojans. In folklore it was the birthplace of Homer, the 8th century BC author of the Odyssey, which describes a war between Greeks and Trojans 500 years earlier. No-one really knows where Homer lived, but a major harbour city is as good a guess as any. By his day Smyrna was settled by the Aeolians from mainland Greece, who were superseded by another Greek tribe the Ionians. The Lydians… (Source: Wikivoyage, CC BY-SA.)",
  },
  tbilisi: {
    tagline: "Explore Tbilisi",
    overview: "300px|right|Location of Tbilisi within Georgia Tbilisi (formerly called 'Tiflis' after its Russian name) lies in the centre of eastern Georgia, in the foothills of the Trialeti mountain range. According to Georgian legends, it was founded in the 5th century by King Vakhtang Gorgasali who, while hunting, shot a pheasant which fell into a warm spring and was either boiled or healed. Either way, the king was inspired to found a city on the site, and the name of the city derives from the Georgian word tbili meaning… (Source: Wikivoyage, CC BY-SA.)",
  },
  yerevan: {
    tagline: "Explore Yerevan",
    overview: "thumb|350px|Yerevan's iconic Cascades complex Even though the history of Yerevan dates back to the Erebuni fortress, making it at least 2,800 years old, little remains of what was small settlement saving the excavations at Hrazdan river gorge, Erebuni, Karmir Berd and Avan. These sites have been excavated, and the artifacts found are in museums today. Being on a strategically important place Yerevan was a constant war stage for rival Ottoman, Persian and Russian Empires. It has been repeatedly ruined by those wars… (Source: Wikivoyage, CC BY-SA.)",
  },
  baku: {
    tagline: "Explore Baku",
    overview: "Baku is on the coast of the Caspian Sea on the southern coast of the Absheron Peninsula. There are three major divisions in Baku: İçəri Şəhər (the Old Town), the Soviet-built city, and the newest part of the city. The population in 2020 was 2.3 million. The city of Baku is on the semi-arid and dusty Absheron peninsula. The center of Baku is a patch of green in a largely brown area because of the many liters of water that is piped daily to the city. The city has a metro, a well-developed bus and minibus network,… (Source: Wikivoyage, CC BY-SA.)",
  },
  manama: {
    tagline: "Explore Manama",
    overview: "Manama emerged as the capital of independent Bahrain after periods of domination by Portugal and Persians. Today, it is a modern capital with an economy based on the sales promotion industry as crude oil takes a less pronounced role in the economy. (Source: Wikivoyage, CC BY-SA.)",
  },
  riyadh: {
    tagline: "Explore Riyadh",
    overview: "Known by local wags as the Dead Center of the Kingdom, Riyadh is considered the most straight-laced of the Kingdom's big three cities. With many forms of entertainment banned, few sights of interest and a brutal climate, Riyadh is a business-only destination if there ever was one, but it's also the best place in the kingdom to watch the continuing collision of tribal Wahhabi conservatism grappling with modern technology and Western influences, and things have loosened up slightly under Crown Prince MBS's watch.… (Source: Wikivoyage, CC BY-SA.)",
  },
  jeddah: {
    tagline: "Explore Jeddah",
    overview: "thumb|300px|Traditional coral houses off Souq al-Alawi in al-Balad Jeddah has been a port and trading city for centuries, which is reflected in its cosmopolitan mix of inhabitants. Today, it is a major commercial center in Saudi Arabia. It also has many government offices. Jeddah is known in the kingdom for its shopping districts, restaurants and cafes. It also hosts the Jeddah Corniche (waterfront area), which is the largest in the Kingdom with a great bunch of hotels, beaches and resorts clustered around it. To… (Source: Wikivoyage, CC BY-SA.)",
  },
  "sao-paulo": {
    tagline: "Explore São Paulo",
    overview: "São Paulo is the most visited city of Brazil, but mostly because of business and event tourism, with many of the visitors not taking much effort to explore the city. Those who do so may, however, discover one of the most complex and fascinating cities in the world, where even nearby areas may look and feel like a different city, due to São Paulo's staggering social inequality and variety of cultural influences, and its hard to understand urban planning. For instance, if you walk from one end to another of Rua… (Source: Wikivoyage, CC BY-SA.)",
  },
  quito: {
    tagline: "Explore Quito",
    overview: "thumb|upright=1.5|Quito's Plaza Grande Quito stretches across valleys between two mountain ranges which are part of the Andes. At an altitude of 2,850 m (9,350 feet), it is one of the world's highest capital cities. The altitude is high enough that most individuals will experience some degree of altitude sickness for the first few days, so plan accordingly. Quito is roughly divided into three parts: the Old City at the center, with southern and northern districts to either side. It was the first city to be named a… (Source: Wikivoyage, CC BY-SA.)",
  },
  montevideo: {
    tagline: "Explore Montevideo",
    overview: "Construction of the Cerro fort, at the time called Montevieu fort, was started by the Portuguese in 1723. The following year the Spanish started building the city of Montevideo on the opposite side of the bay where Ciudad Vieja is now, and occupied and colonized the rest of the region. During its almost 300 years of existence, Montevideo has been part of the Spanish and Portuguese empires, occupied by the British for a few months in 1807 and afterwards a part of Brazil and today's Argentina before finally becoming… (Source: Wikivoyage, CC BY-SA.)",
  },
  nassau: {
    tagline: "Explore Nassau",
    overview: "thumb|300px|Welcome to Nassau. Founded around 1650 by the British as Charles Town, the town was renamed in 1695 to honor the ruling house in the Netherlands (and later England), which ultimately derives from Nassau Castle, Rhineland Palatinate. Due to the Bahamas' strategic location near trade routes and its multitude of islands, Nassau soon became a popular pirates' den, and British rule was soon challenged by the self-proclaimed \"Privateers Republic\" under the leadership of the infamous Edward Teach, better… (Source: Wikivoyage, CC BY-SA.)",
  },
  bridgetown: {
    tagline: "Explore Bridgetown",
    overview: "thumb | 300px | The river bridge at Bridgetown The first English colony on the island was established in 1625 at St James Town seven miles north. The settlement here, from 1628, was initially called Indian Bridge for the structure found crossing the swamp at the river estuary. The colonists set about draining the swamp and found themselves with a better harbour, cultivation land and inland routes than St James Town, so the centre of island affairs shifted here. In 1667 Sir Tobias Bridge arrived as military… (Source: Wikivoyage, CC BY-SA.)",
  },
  calgary: {
    tagline: "Explore Calgary",
    overview: "In 1883, the railway reached Calgary. It started to grow in every direction and became an agricultural and business hub. In 1884, Calgary was incorporated as a town in what was then the North West Territories. By 1894, Calgary's population had grown to 3900 people and it was incorporated as a city. Alberta's first major oil and natural gas field was discovered in 1914 at Turner Valley, 60&nbsp;km south of Calgary. Subsequent discoveries kept the oil and gas scene active in the Turner Valley area for the next 30… (Source: Wikivoyage, CC BY-SA.)",
  },
  "gold-coast": {
    tagline: "Explore Gold Coast",
    overview: "The Gold Coast is a large urban area with a population of 720,000, the largest non-state capital in Australia. Most visitors perceive the Gold Coast as a long thin strip of modern high-rise buildings next to seemingly endless beaches, although the city itself extends far inland to the hills of the Scenic Rim. Surfers Paradise, towards the northern end, is the main hub of the leisure activity. There is a huge choice of hotels, restaurants, tourist shops and tourist experiences to be found. The city is developing… (Source: Wikivoyage, CC BY-SA.)",
  },
  brisbane: {
    tagline: "Explore Brisbane",
    overview: "The Greater Brisbane region has a population of about 2.2 million people and is Australia's third-largest city. Brisbane, colloquially known as Brissie (pronounced Briz-ee), gained international exposure through multiple international sporting events and political summits, including the upcoming 2032 Summer Olympics. It is also known as the main setting of the animated kids TV series (Source: Wikivoyage, CC BY-SA.)",
  },
  perth: {
    tagline: "Explore Perth",
    overview: "British settlers established a free settler colony in 1829 as part of the Swan River Colony. The settlement was given the name \"Perth\" after the city of Perth, Scotland, the hometown of Sir George Murray, the British Colonial Secretary at that time. Lack of labour hampered its development until 1850, when convicts were brought in, at a time when transportation to other parts of Australia had ceased. This boosted the size of the colony and their labour helped shape the early architecture of the city, as well as… (Source: Wikivoyage, CC BY-SA.)",
  },
  wellington: {
    tagline: "Explore Wellington",
    overview: "Wellington is home to 433,900 people, making it New Zealand's second-largest urban area, well behind Auckland and just ahead of Christchurch. Wellington became New Zealand's capital city in 1865, replacing Auckland; the government wanted a more centrally-located city as capital to quell the South Island nationalist movement. Wellington offers a blend of culture, heritage, fine food and coffee, together with lively arts and (Source: Wikivoyage, CC BY-SA.)",
  },
  medellin: {
    tagline: "Explore Medellín",
    overview: "Let's just get it out of the way up front: throughout the 1980s and 1990s, Medellín was considered one of the most dangerous cities in the world for its size, and had a highly disproportional homicide and kidnapping rate. It was the home of the drug lord Pablo Escobar and the so-called Medellín Cartel, who virtually took over the city during that time. Since his demise in the mid-1990s, the cartel was disbanded and the city rebounded tremendously. In 1991 there were 6,500 murders in the city, by 2009 the murder… (Source: Wikivoyage, CC BY-SA.)",
  },
  salvador: {
    tagline: "Explore Salvador",
    overview: "thumb|300px|Pelourinho, Salvador's historical city center It is the biggest city in the Northeast region, and was the first capital of Brazil. A 100-m cliff runs along the entire bayshore, dividing the city into Cidade Alta, up on the cliff, and the Cidade Baixa down by the bay. The former features Pelourinho, the old city center that packs historical sites, colonial architecture, museums, restaurants, bars, hostels, artisanal shops, and music/dance/capoeira academies into a convenient, albeit tourist-swarmed, set… (Source: Wikivoyage, CC BY-SA.)",
  }
};
