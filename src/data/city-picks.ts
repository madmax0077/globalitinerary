// Curated "Where to eat" (local favourites) and "Where to stay" (tourist
// favourites / top-rated) for the world's most-visited cities.
//
// Every venue listed here is a long-standing, well-known institution drawn
// from guidebooks, Michelin/Tripadvisor consensus and local reputation —
// never invented and never a one-season trend. Price tiers are indicative.
//
// Cities without an entry here fall back to Wikivoyage listings (real places
// with description + price when available). Empty cities hide the section.

import type { Restaurant, Stay } from "@/lib/types";

export type CityPicks = {
  restaurants: Restaurant[];
  stays: Stay[];
};

export const cityPicks: Record<string, CityPicks> = {
  // ---------- Asia ----------
  tokyo: {
    restaurants: [
      { name: "Afuri", cuisine: "Ramen", priceLevel: 1, note: "Local favourite for yuzu shio ramen" },
      { name: "Tsukiji Outer Market stalls", cuisine: "Seafood", priceLevel: 1, note: "Fresh sushi and grilled scallops where Tokyo eats" },
      { name: "Gonpachi Nishi-Azabu", cuisine: "Izakaya", priceLevel: 2, note: "Classic izakaya atmosphere beloved by locals" },
      { name: "Kozasa Soba", cuisine: "Soba", priceLevel: 1, note: "Hand-cut soba institution near Asakusa" },
    ],
    stays: [
      { name: "Park Hyatt Tokyo", area: "Shinjuku", priceLevel: 4, note: "Iconic Lost in Translation hotel with skyline views" },
      { name: "Aman Tokyo", area: "Otemachi", priceLevel: 4, note: "Quiet luxury overlooking the Imperial Palace" },
      { name: "Hoshinoya Tokyo", area: "Otemachi", priceLevel: 4, note: "Modern ryokan with onsen baths in the city" },
      { name: "The Tokyo Station Hotel", area: "Marunouchi", priceLevel: 3, note: "Historic hotel inside Tokyo Station" },
    ],
  },
  kyoto: {
    restaurants: [
      { name: "Nishiki Market stalls", cuisine: "Street food", priceLevel: 1, note: "Kyoto's kitchen — pickles, grilled skewers, matcha" },
      { name: "Gion Karyo", cuisine: "Kaiseki", priceLevel: 3, note: "Approachable kaiseki beloved by locals" },
      { name: "Menya Inoichi", cuisine: "Ramen", priceLevel: 1, note: "Clear-broth ramen locals queue for" },
      { name: "Kikunoi Honten", cuisine: "Kaiseki", priceLevel: 4, note: "Three-Michelin-star seasonal dining" },
    ],
    stays: [
      { name: "The Ritz-Carlton Kyoto", area: "Kamogawa", priceLevel: 4, note: "Riverside luxury with traditional touches" },
      { name: "Hoshinoya Kyoto", area: "Arashiyama", priceLevel: 4, note: "Boat-access ryokan on the Oi River" },
      { name: "Tawaraya Ryokan", area: "Downtown", priceLevel: 4, note: "Kyoto's oldest and most storied ryokan" },
      { name: "Hotel Kanra Kyoto", area: "Shijo", priceLevel: 3, note: "Design hotel with tatami rooms" },
    ],
  },
  osaka: {
    restaurants: [
      { name: "Wanaka", cuisine: "Takoyaki", priceLevel: 1, note: "Legendary takoyaki — locals' pick" },
      { name: "Zubora-ya", cuisine: "Fugu", priceLevel: 3, note: "Osaka's classic fugu house since 1920" },
      { name: "Daruma Honten", cuisine: "Kushikatsu", priceLevel: 1, note: "Shinsekai institution for fried skewers" },
      { name: "Mizuno", cuisine: "Okonomiyaki", priceLevel: 1, note: "Best-known okonomiyaki in Dotonbori" },
    ],
    stays: [
      { name: "The St. Regis Osaka", area: "Honmachi", priceLevel: 4, note: "Top-rated luxury in the city centre" },
      { name: "Conrad Osaka", area: "Nakanoshima", priceLevel: 4, note: "River views and skyline suites" },
      { name: "Hotel Granvia Osaka", area: "Umeda", priceLevel: 3, note: "Connected to Osaka Station — tourist favourite" },
    ],
  },
  seoul: {
    restaurants: [
      { name: "Myoungdong Kyoja", cuisine: "Kalguksu", priceLevel: 1, note: "Legendary knife-cut noodles and dumplings" },
      { name: "Tosokchon", cuisine: "Samgyetang", priceLevel: 2, note: "President-approved ginseng chicken soup" },
      { name: "Gwangjang Market stalls", cuisine: "Street food", priceLevel: 1, note: "Bindaetteok and mayak gimbap where Seoul eats" },
      { name: "Maple Tree House", cuisine: "Korean BBQ", priceLevel: 2, note: "Reliable hanwoo BBQ favourite" },
    ],
    stays: [
      { name: "Four Seasons Hotel Seoul", area: "Gwanghwamun", priceLevel: 4, note: "Top-rated luxury beside the palace" },
      { name: "Park Hyatt Seoul", area: "Gangnam", priceLevel: 4, note: "Design hotel with city views" },
      { name: "Hotel Shilla Seoul", area: "Jangchung", priceLevel: 4, note: "Classic Korean luxury hotel" },
      { name: "L7 Hongdae by LOTTE", area: "Hongdae", priceLevel: 2, note: "Lively neighbourhood pick for younger travellers" },
    ],
  },
  bangkok: {
    restaurants: [
      { name: "Thip Samai", cuisine: "Pad Thai", priceLevel: 1, note: "The city's most famous pad Thai" },
      { name: "Jay Fai", cuisine: "Street food", priceLevel: 3, note: "Michelin-star crab omelette in a street stall" },
      { name: "Raan Jay Fai", cuisine: "Street food", priceLevel: 2, note: "Local favourite for wok-fried specialties" },
      { name: "Or Tor Kor Market", cuisine: "Thai", priceLevel: 1, note: "Best food market in Bangkok — locals' pick" },
    ],
    stays: [
      { name: "Mandarin Oriental Bangkok", area: "Chao Phraya", priceLevel: 4, note: "Historic riverside legend" },
      { name: "Capella Bangkok", area: "Chao Phraya", priceLevel: 4, note: "Modern riverside luxury, top-rated" },
      { name: "The Siam", area: "Dusit", priceLevel: 4, note: "Boutique river retreat with antiques" },
      { name: "Anantara Riverside Bangkok", area: "Chao Phraya", priceLevel: 3, note: "Family-friendly riverside favourite" },
    ],
  },
  "ho-chi-minh-city": {
    restaurants: [
      { name: "Phở Hòa Pasteur", cuisine: "Pho", priceLevel: 1, note: "Classic Saigon pho institution" },
      { name: "Bánh Mì Huỳnh Hoa", cuisine: "Banh mi", priceLevel: 1, note: "Locals queue for this stuffed baguette" },
      { name: "Cục Gạch Quán", cuisine: "Vietnamese", priceLevel: 2, note: "Home-style Vietnamese in a colonial house" },
      { name: "Quán Ốc Đào", cuisine: "Seafood", priceLevel: 1, note: "Street-side snails and shellfish favourite" },
    ],
    stays: [
      { name: "Park Hyatt Saigon", area: "District 1", priceLevel: 4, note: "Colonial-era luxury on Lam Son Square" },
      { name: "The Reverie Saigon", area: "District 1", priceLevel: 4, note: "Opulent Italian-designed landmark" },
      { name: "Hotel des Arts Saigon", area: "District 3", priceLevel: 3, note: "Art Deco boutique favourite" },
    ],
  },
  hanoi: {
    restaurants: [
      { name: "Phở Thìn", cuisine: "Pho", priceLevel: 1, note: "Legendary charred-beef pho since 1979" },
      { name: "Bún Chả Hương Liên", cuisine: "Bun cha", priceLevel: 1, note: "Where Obama ate — locals still queue" },
      { name: "Chả Cá Lã Vọng", cuisine: "Cha ca", priceLevel: 2, note: "The original turmeric fish dish (1871)" },
      { name: "Giang Café", cuisine: "Egg coffee", priceLevel: 1, note: "Birthplace of Hanoi egg coffee" },
    ],
    stays: [
      { name: "Sofitel Legend Metropole Hanoi", area: "Hoan Kiem", priceLevel: 4, note: "Historic French colonial landmark" },
      { name: "Capella Hanoi", area: "Opera House", priceLevel: 4, note: "Intimate theatrical luxury" },
      { name: "La Siesta Premium Hang Be", area: "Old Quarter", priceLevel: 2, note: "Top-rated boutique in the Old Quarter" },
    ],
  },
  bali: {
    restaurants: [
      { name: "Nasi Ayam Kedewatan Ibu Mangku", cuisine: "Balinese", priceLevel: 1, note: "Ubud legend for spicy chicken rice since the 1960s" },
      { name: "Pak Malen", cuisine: "Babi guling", priceLevel: 1, note: "Seminyak roast suckling pig — locals' pick" },
      { name: "Made's Warung", cuisine: "Indonesian", priceLevel: 2, note: "Island institution since 1969 (Kuta / Seminyak)" },
      { name: "Sun Sun Warung", cuisine: "Balinese", priceLevel: 1, note: "Family-compound warung in central Ubud" },
    ],
    stays: [
      { name: "Four Seasons Resort Bali at Sayan", area: "Ubud", priceLevel: 4, note: "Iconic riverside resort above the Ayung Valley" },
      { name: "COMO Shambhala Estate", area: "Ubud", priceLevel: 4, note: "Top-rated wellness retreat in the jungle" },
      { name: "The Mulia", area: "Nusa Dua", priceLevel: 4, note: "Beachfront luxury favourite for first-timers" },
      { name: "Potato Head Suites", area: "Seminyak", priceLevel: 3, note: "Design beach club hotel — tourist favourite" },
    ],
  },
  singapore: {
    restaurants: [
      { name: "Tian Tian Hainanese Chicken Rice", cuisine: "Chicken rice", priceLevel: 1, note: "Maxwell Food Centre legend" },
      { name: "Lau Pa Sat / Satay Street", cuisine: "Satay", priceLevel: 1, note: "Open-air satay after 7pm — locals' hangout" },
      { name: "Song Fa Bak Kut Teh", cuisine: "Bak kut teh", priceLevel: 1, note: "Herbal pork-rib soup institution" },
      { name: "Jumbo Seafood", cuisine: "Chili crab", priceLevel: 2, note: "The city's classic chili crab" },
    ],
    stays: [
      { name: "Raffles Singapore", area: "Beach Road", priceLevel: 4, note: "Iconic colonial hotel since 1887" },
      { name: "Marina Bay Sands", area: "Marina Bay", priceLevel: 4, note: "The skyline hotel with infinity pool" },
      { name: "Capella Singapore", area: "Sentosa", priceLevel: 4, note: "Colonial resort, top-rated luxury" },
      { name: "The Fullerton Hotel", area: "CBD", priceLevel: 3, note: "Landmark neoclassical hotel" },
    ],
  },
  "kuala-lumpur": {
    restaurants: [
      { name: "Restoran Yut Kee", cuisine: "Hainanese", priceLevel: 1, note: "Century-old kopitiam locals swear by" },
      { name: "Jalan Alor hawker stalls", cuisine: "Street food", priceLevel: 1, note: "KL's most famous night-food street" },
      { name: "Nasi Lemak Tanglin", cuisine: "Nasi lemak", priceLevel: 1, note: "Local favourite for Malaysia's national dish" },
      { name: "Restoran Rebung", cuisine: "Malay", priceLevel: 2, note: "Celebrity-chef Malay buffet institution" },
    ],
    stays: [
      { name: "Mandarin Oriental Kuala Lumpur", area: "KLCC", priceLevel: 4, note: "Beside the Petronas Towers" },
      { name: "The Majestic Hotel Kuala Lumpur", area: "Brickfields", priceLevel: 3, note: "Colonial-era grandeur" },
      { name: "EQ Kuala Lumpur", area: "KLCC", priceLevel: 4, note: "Modern luxury with park views" },
    ],
  },
  "hong-kong": {
    restaurants: [
      { name: "Tim Ho Wan", cuisine: "Dim sum", priceLevel: 1, note: "World's cheapest Michelin — locals' dim sum" },
      { name: "Kam's Roast Goose", cuisine: "Cantonese", priceLevel: 2, note: "Michelin roast goose institution" },
      { name: "Mak's Noodle", cuisine: "Wonton noodles", priceLevel: 1, note: "Classic wonton noodle shop since 1968" },
      { name: "Yung Kee", cuisine: "Cantonese", priceLevel: 2, note: "Famous for roast goose since 1942" },
    ],
    stays: [
      { name: "The Peninsula Hong Kong", area: "Tsim Sha Tsui", priceLevel: 4, note: "The grande dame of the harbour" },
      { name: "Mandarin Oriental Hong Kong", area: "Central", priceLevel: 4, note: "Iconic Central luxury since 1963" },
      { name: "Upper House", area: "Admiralty", priceLevel: 4, note: "Design hotel with harbour views" },
      { name: "Hotel ICON", area: "Tsim Sha Tsui East", priceLevel: 3, note: "Top-rated teaching hotel with sky pool" },
    ],
  },
  "siem-reap": {
    restaurants: [
      { name: "Marum (Friends International)", cuisine: "Cambodian", priceLevel: 2, note: "Social-enterprise kitchen teaching local youth" },
      { name: "Khmer Kitchen Restaurant", cuisine: "Khmer", priceLevel: 1, note: "Simple, authentic Khmer favourites" },
      { name: "Chanrey Tree", cuisine: "Khmer", priceLevel: 2, note: "Refined Cambodian riverside dining" },
    ],
    stays: [
      { name: "Raffles Grand Hotel d'Angkor", area: "Old French Quarter", priceLevel: 4, note: "Colonial landmark near Angkor" },
      { name: "Phum Baitang", area: "Outside town", priceLevel: 4, note: "Luxury Khmer village resort" },
      { name: "Shinta Mani Angkor", area: "Town", priceLevel: 3, note: "Design hotel with a social mission" },
    ],
  },
  kathmandu: {
    restaurants: [
      { name: "OR2K", cuisine: "Vegetarian Middle Eastern", priceLevel: 1, note: "Thamel institution loved by locals and travellers" },
      { name: "Bhojan Griha", cuisine: "Nepali", priceLevel: 2, note: "Traditional Newari feast in a restored house" },
      { name: "Fire and Ice Pizzeria", cuisine: "Italian", priceLevel: 2, note: "Surprising local favourite since the 1990s" },
    ],
    stays: [
      { name: "Dwarika's Hotel", area: "Battisputali", priceLevel: 4, note: "Heritage hotel built from salvaged Newari woodwork" },
      { name: "Hyatt Regency Kathmandu", area: "Boudha", priceLevel: 3, note: "Spacious resort near Boudhanath" },
      { name: "Kathmandu Guest House", area: "Thamel", priceLevel: 2, note: "The original tourist favourite since 1967" },
    ],
  },
  delhi: {
    restaurants: [
      { name: "Karim's", cuisine: "Mughlai", priceLevel: 1, note: "Old Delhi legend since 1913 — locals' pick" },
      { name: "Paranthe Wali Gali", cuisine: "Paratha", priceLevel: 1, note: "The famous stuffed-paratha alley" },
      { name: "Indian Accent", cuisine: "Modern Indian", priceLevel: 4, note: "Delhi's most acclaimed contemporary kitchen" },
      { name: "Saravana Bhavan", cuisine: "South Indian", priceLevel: 1, note: "Reliable dosa favourite across the city" },
    ],
    stays: [
      { name: "The Imperial New Delhi", area: "Janpath", priceLevel: 4, note: "Art Deco colonial landmark" },
      { name: "The Lodhi", area: "Lodhi Road", priceLevel: 4, note: "Modern luxury with large suites" },
      { name: "Taj Palace New Delhi", area: "Diplomatic Enclave", priceLevel: 4, note: "Classic Taj hospitality" },
      { name: "Haveli Dharampura", area: "Chandni Chowk", priceLevel: 3, note: "Restored Mughal haveli in Old Delhi" },
    ],
  },
  "new-delhi": {
    restaurants: [
      { name: "Karim's", cuisine: "Mughlai", priceLevel: 1, note: "Old Delhi legend since 1913 — locals' pick" },
      { name: "Paranthe Wali Gali", cuisine: "Paratha", priceLevel: 1, note: "The famous stuffed-paratha alley" },
      { name: "Indian Accent", cuisine: "Modern Indian", priceLevel: 4, note: "Delhi's most acclaimed contemporary kitchen" },
      { name: "Saravana Bhavan", cuisine: "South Indian", priceLevel: 1, note: "Reliable dosa favourite across the city" },
    ],
    stays: [
      { name: "The Imperial New Delhi", area: "Janpath", priceLevel: 4, note: "Art Deco colonial landmark" },
      { name: "The Lodhi", area: "Lodhi Road", priceLevel: 4, note: "Modern luxury with large suites" },
      { name: "Taj Palace New Delhi", area: "Diplomatic Enclave", priceLevel: 4, note: "Classic Taj hospitality" },
    ],
  },
  mumbai: {
    restaurants: [
      { name: "Bademiya", cuisine: "Seekh kebab", priceLevel: 1, note: "Late-night Colaba street-kebab institution" },
      { name: "Trishna", cuisine: "Seafood", priceLevel: 3, note: "Famous butter-garlic crab" },
      { name: "Britannia & Co.", cuisine: "Parsi", priceLevel: 1, note: "Irani café classic for berry pulav" },
      { name: "Kyani & Co.", cuisine: "Irani café", priceLevel: 1, note: "Century-old local hangout" },
    ],
    stays: [
      { name: "Taj Mahal Palace Mumbai", area: "Colaba", priceLevel: 4, note: "India's most iconic hotel since 1903" },
      { name: "The Oberoi Mumbai", area: "Nariman Point", priceLevel: 4, note: "Harbour-facing luxury" },
      { name: "Abode Bombay", area: "Colaba", priceLevel: 2, note: "Boutique favourite for design-minded travellers" },
    ],
  },
  istanbul: {
    restaurants: [
      { name: "Çiya Sofrası", cuisine: "Anatolian", priceLevel: 2, note: "Kadıköy institution of regional home cooking" },
      { name: "Karaköy Güllüoğlu", cuisine: "Baklava", priceLevel: 1, note: "The baklava locals queue for" },
      { name: "Tarihi Sultanahmet Köftecisi", cuisine: "Köfte", priceLevel: 1, note: "Classic meatballs since 1920" },
      { name: "Asitane", cuisine: "Ottoman", priceLevel: 3, note: "Palace recipes revived near Chora" },
    ],
    stays: [
      { name: "Four Seasons Hotel Istanbul at Sultanahmet", area: "Sultanahmet", priceLevel: 4, note: "Converted prison beside Hagia Sophia" },
      { name: "Pera Palace Hotel", area: "Beyoğlu", priceLevel: 4, note: "Orient Express landmark since 1892" },
      { name: "Soho House Istanbul", area: "Beyoğlu", priceLevel: 3, note: "Palazzo-style members' club hotel" },
      { name: "Sirkeci Mansion", area: "Sirkeci", priceLevel: 2, note: "Top-rated boutique near the old town" },
    ],
  },
  "tel-aviv": {
    restaurants: [
      { name: "Miznon", cuisine: "Israeli street", priceLevel: 1, note: "Pita institution by Eyal Shani" },
      { name: "Abu Hassan", cuisine: "Hummus", priceLevel: 1, note: "Jaffa's legendary hummus — locals' pick" },
      { name: "Port Said", cuisine: "Middle Eastern", priceLevel: 2, note: "Buzzy local favourite near the Carmel Market" },
    ],
    stays: [
      { name: "The Norman Tel Aviv", area: "Rothschild", priceLevel: 4, note: "Boutique luxury in Bauhaus buildings" },
      { name: "Setai Tel Aviv", area: "Old Jaffa", priceLevel: 4, note: "Ottoman-era fortress hotel" },
      { name: "Brown Beach House", area: "Gordon Beach", priceLevel: 3, note: "Design hotel steps from the sand" },
    ],
  },
  jerusalem: {
    restaurants: [
      { name: "Abu Shukri", cuisine: "Hummus", priceLevel: 1, note: "Old City hummus institution" },
      { name: "Machneyuda", cuisine: "Israeli", priceLevel: 3, note: "Loud, joyful market-side favourite" },
      { name: "Azura", cuisine: "Iraqi-Jewish", priceLevel: 1, note: "Mahane Yehuda market classic" },
    ],
    stays: [
      { name: "The King David Jerusalem", area: "Yemin Moshe", priceLevel: 4, note: "Historic hotel of presidents and kings" },
      { name: "American Colony Hotel", area: "East Jerusalem", priceLevel: 3, note: "19th-century courtyard landmark" },
      { name: "Mamilla Hotel", area: "Mamilla", priceLevel: 3, note: "Design hotel steps from Jaffa Gate" },
    ],
  },

  // ---------- Europe ----------
  paris: {
    restaurants: [
      { name: "Bouillon Chartier", cuisine: "French", priceLevel: 1, note: "Belle Époque canteen Parisians still love" },
      { name: "Breizh Café", cuisine: "Crêpes", priceLevel: 2, note: "Best crêpes in the Marais — locals' pick" },
      { name: "Du Pain et des Idées", cuisine: "Bakery", priceLevel: 1, note: "Celebrated escargot pastry bakery" },
      { name: "L'As du Fallafel", cuisine: "Falafel", priceLevel: 1, note: "Marais street-food legend" },
    ],
    stays: [
      { name: "Le Meurice", area: "1st arr.", priceLevel: 4, note: "Palace hotel facing the Tuileries" },
      { name: "Hôtel Plaza Athénée", area: "8th arr.", priceLevel: 4, note: "Avenue Montaigne icon" },
      { name: "Hôtel des Grands Boulevards", area: "2nd arr.", priceLevel: 3, note: "Design favourite by Experimental Group" },
      { name: "Hôtel Providence", area: "10th arr.", priceLevel: 3, note: "Boutique favourite near Canal Saint-Martin" },
    ],
  },
  london: {
    restaurants: [
      { name: "Borough Market stalls", cuisine: "Market food", priceLevel: 2, note: "Londoners' favourite food market" },
      { name: "Dishoom", cuisine: "Indian", priceLevel: 2, note: "Bombay café institution — locals queue daily" },
      { name: "St. JOHN", cuisine: "British", priceLevel: 3, note: "Nose-to-tail British classic" },
      { name: "Beigel Bake", cuisine: "Bagels", priceLevel: 1, note: "24-hour Brick Lane bagel institution" },
    ],
    stays: [
      { name: "The Savoy", area: "Strand", priceLevel: 4, note: "Edwardian landmark on the Thames" },
      { name: "Claridge's", area: "Mayfair", priceLevel: 4, note: "Art Deco Mayfair institution" },
      { name: "The Ned", area: "City", priceLevel: 3, note: "Converted bank — tourist favourite" },
      { name: "Ace Hotel London Shoreditch", area: "Shoreditch", priceLevel: 3, note: "Design hotel in the creative east" },
    ],
  },
  rome: {
    restaurants: [
      { name: "Da Enzo al 29", cuisine: "Roman trattoria", priceLevel: 2, note: "Trastevere classic — locals and visitors queue" },
      { name: "Roscioli", cuisine: "Roman", priceLevel: 3, note: "Famous carbonara and salumi counter" },
      { name: "Pizzarium Bonci", cuisine: "Pizza al taglio", priceLevel: 1, note: "Gabriele Bonci's legendary slice shop" },
      { name: "Trapizzino", cuisine: "Street food", priceLevel: 1, note: "Roman street-food invention locals love" },
    ],
    stays: [
      { name: "Hotel de Russie", area: "Piazza del Popolo", priceLevel: 4, note: "Rocco Forte garden hotel" },
      { name: "Hotel Eden", area: "Via Veneto", priceLevel: 4, note: "Rooftop views over the Eternal City" },
      { name: "Palazzo Manfredi", area: "Colosseum", priceLevel: 4, note: "Intimate luxury facing the Colosseum" },
      { name: "The First Roma Dolce", area: "Via del Corso", priceLevel: 3, note: "Design hotel steps from the Pantheon" },
    ],
  },
  venice: {
    restaurants: [
      { name: "Cantine del Vino già Schiavi", cuisine: "Cicchetti", priceLevel: 1, note: "Classic bacaro — locals' cicchetti pick" },
      { name: "Osteria alle Testiere", cuisine: "Seafood", priceLevel: 3, note: "Tiny seafood temple — book ahead" },
      { name: "All'Arco", cuisine: "Cicchetti", priceLevel: 1, note: "Standing-room-only Rialto favourite" },
      { name: "Trattoria da Fiore", cuisine: "Venetian", priceLevel: 3, note: "San Polo classic" },
    ],
    stays: [
      { name: "The Gritti Palace", area: "Grand Canal", priceLevel: 4, note: "15th-century palazzo on the canal" },
      { name: "Aman Venice", area: "Grand Canal", priceLevel: 4, note: "Palazzo Papadopoli luxury" },
      { name: "Belmond Hotel Cipriani", area: "Giudecca", priceLevel: 4, note: "Legendary resort away from the crowds" },
      { name: "Hotel Flora", area: "San Marco", priceLevel: 3, note: "Family-run garden hotel favourite" },
    ],
  },
  florence: {
    restaurants: [
      { name: "All'Antico Vinaio", cuisine: "Schiacciata", priceLevel: 1, note: "The sandwich queue every local knows" },
      { name: "Trattoria Mario", cuisine: "Tuscan", priceLevel: 1, note: "No-frills lunch institution near the market" },
      { name: "Osteria dell'Enoteca", cuisine: "Tuscan", priceLevel: 3, note: "Wine-focused Tuscan favourite" },
      { name: "Gelateria della Passera", cuisine: "Gelato", priceLevel: 1, note: "Locals' gelato pick in Oltrarno" },
    ],
    stays: [
      { name: "Hotel Savoy Florence", area: "Piazza della Repubblica", priceLevel: 4, note: "Rocco Forte landmark on the main square" },
      { name: "Portrait Firenze", area: "Ponte Vecchio", priceLevel: 4, note: "Ferragamo riverside suites" },
      { name: "Hotel Continentale", area: "Ponte Vecchio", priceLevel: 3, note: "Rooftop terrace favourite" },
    ],
  },
  milan: {
    restaurants: [
      { name: "Luini", cuisine: "Panzerotti", priceLevel: 1, note: "The panzerotti Milanese queue for" },
      { name: "Trattoria del Nuovo Macello", cuisine: "Milanese", priceLevel: 2, note: "Classic cotoletta institution" },
      { name: "Pasticceria Marchesi", cuisine: "Pastry", priceLevel: 2, note: "Historic pastry shop (Prada-owned)" },
      { name: "Ratanà", cuisine: "Milanese", priceLevel: 3, note: "Modern trattoria locals love" },
    ],
    stays: [
      { name: "Hotel Principe di Savoia", area: "Porta Nuova", priceLevel: 4, note: "Belle Époque landmark" },
      { name: "Bulgari Hotel Milano", area: "Brera", priceLevel: 4, note: "Quiet garden luxury" },
      { name: "Room Mate Giulia", area: "Duomo", priceLevel: 3, note: "Design hotel steps from the cathedral" },
    ],
  },
  naples: {
    restaurants: [
      { name: "L'Antica Pizzeria da Michele", cuisine: "Pizza", priceLevel: 1, note: "The margherita that defined Naples" },
      { name: "Sorbillo", cuisine: "Pizza", priceLevel: 1, note: "Locals' rival favourite on Via dei Tribunali" },
      { name: "Taverna a Merechiaro", cuisine: "Seafood", priceLevel: 2, note: "Classic Neapolitan seafood" },
      { name: "Sfogliatella Mary", cuisine: "Pastry", priceLevel: 1, note: "Galleria Umberto sfogliatella institution" },
    ],
    stays: [
      { name: "Hotel Excelsior Naples", area: "Lungomare", priceLevel: 3, note: "Waterfront views of Vesuvius" },
      { name: "Romeo Hotel", area: "Port", priceLevel: 4, note: "Modern luxury near the ferry docks" },
      { name: "Decumani Hotel de Charme", area: "Centro Storico", priceLevel: 2, note: "Boutique favourite in a noble palazzo" },
    ],
  },
  barcelona: {
    restaurants: [
      { name: "La Boqueria stalls", cuisine: "Market food", priceLevel: 1, note: "City's great food market — locals shop early" },
      { name: "Can Culleretes", cuisine: "Catalan", priceLevel: 2, note: "Oldest restaurant in Barcelona (1786)" },
      { name: "Bar Cañete", cuisine: "Tapas", priceLevel: 2, note: "Standing-room tapas favourite" },
      { name: "Tickets Bar", cuisine: "Tapas", priceLevel: 3, note: "Adrià-family tapas landmark" },
    ],
    stays: [
      { name: "Hotel Casa Fuster", area: "Gràcia", priceLevel: 4, note: "Modernista landmark on Passeig de Gràcia" },
      { name: "Hotel Arts Barcelona", area: "Barceloneta", priceLevel: 4, note: "Beachfront tower hotel" },
      { name: "Casa Camper Barcelona", area: "El Raval", priceLevel: 3, note: "Design hotel with free snacks lounge" },
    ],
  },
  madrid: {
    restaurants: [
      { name: "Mercado de San Miguel stalls", cuisine: "Tapas", priceLevel: 2, note: "Glass market of tapas — locals and visitors" },
      { name: "Casa Botín", cuisine: "Castilian", priceLevel: 3, note: "World's oldest restaurant (1725) — cochinillo" },
      { name: "Sala de Despiece", cuisine: "Contemporary", priceLevel: 2, note: "Market-style local favourite" },
      { name: "Chocolatería San Ginés", cuisine: "Churros", priceLevel: 1, note: "Midnight churros institution since 1894" },
    ],
    stays: [
      { name: "The Principal Madrid", area: "Gran Vía", priceLevel: 4, note: "Rooftop luxury overlooking Gran Vía" },
      { name: "Hotel Ritz Madrid", area: "Retiro", priceLevel: 4, note: "Belle Époque Mandarin Oriental landmark" },
      { name: "Only YOU Boutique Hotel", area: "Barrio de las Letras", priceLevel: 3, note: "Design hotel tourist favourite" },
    ],
  },
  lisbon: {
    restaurants: [
      { name: "Time Out Market Lisboa", cuisine: "Market food", priceLevel: 2, note: "City's best chefs under one roof" },
      { name: "Cervejaria Ramiro", cuisine: "Seafood", priceLevel: 2, note: "Legendary seafood canteen — locals' pick" },
      { name: "Pastéis de Belém", cuisine: "Pastéis de nata", priceLevel: 1, note: "The original custard tart since 1837" },
      { name: "A Primavera do Jerónimo", cuisine: "Portuguese", priceLevel: 1, note: "Tiny classic near Chiado" },
    ],
    stays: [
      { name: "Four Seasons Hotel Ritz Lisbon", area: "Marquês de Pombal", priceLevel: 4, note: "Classic luxury with park views" },
      { name: "Pestana Palace Lisboa", area: "Alcântara", priceLevel: 4, note: "19th-century palace hotel" },
      { name: "Memmo Alfama", area: "Alfama", priceLevel: 3, note: "Boutique with rooftop views over the Tagus" },
    ],
  },
  porto: {
    restaurants: [
      { name: "Café Santiago", cuisine: "Francesinha", priceLevel: 1, note: "The city's definitive francesinha" },
      { name: "Mercado do Bolhão stalls", cuisine: "Market food", priceLevel: 1, note: "Restored historic market — locals shop here" },
      { name: "Cantinho do Avillez", cuisine: "Portuguese", priceLevel: 2, note: "José Avillez's approachable favourite" },
    ],
    stays: [
      { name: "The Yeatman", area: "Vila Nova de Gaia", priceLevel: 4, note: "Wine hotel with river views" },
      { name: "Pestana Porto - A Brasileira", area: "Ribeira", priceLevel: 3, note: "Historic café-hotel on the waterfront" },
      { name: "Torel Avantgarde", area: "Vitoria", priceLevel: 3, note: "Design hotel overlooking the Douro" },
    ],
  },
  amsterdam: {
    restaurants: [
      { name: "Foodhallen", cuisine: "Market food", priceLevel: 2, note: "Indoor food hall locals love" },
      { name: "Van Dobben", cuisine: "Croquettes", priceLevel: 1, note: "Classic broodje kroket institution" },
      { name: "Restaurant De Kas", cuisine: "Greenhouse", priceLevel: 3, note: "Farm-to-table in a greenhouse" },
      { name: "Winkel 43", cuisine: "Appeltaart", priceLevel: 1, note: "The apple pie Amsterdammers queue for" },
    ],
    stays: [
      { name: "Conservatorium Hotel", area: "Museumplein", priceLevel: 4, note: "Design hotel beside the museums" },
      { name: "Hotel Pulitzer Amsterdam", area: "Canal Belt", priceLevel: 4, note: "25 canal houses linked together" },
      { name: "The Hoxton Amsterdam", area: "Herengracht", priceLevel: 3, note: "Canal-house favourite for younger travellers" },
    ],
  },
  berlin: {
    restaurants: [
      { name: "Mustafa's Gemüse Kebap", cuisine: "Döner", priceLevel: 1, note: "The city's most famous döner queue" },
      { name: "Konnopke's Imbiss", cuisine: "Currywurst", priceLevel: 1, note: "Berlin currywurst institution since 1930" },
      { name: "Zur Letzten Instanz", cuisine: "German", priceLevel: 2, note: "Berlin's oldest restaurant (1621)" },
      { name: "Markthalle Neun Street Food", cuisine: "Street food", priceLevel: 1, note: "Thursday Street Food Thursday — locals' night" },
    ],
    stays: [
      { name: "Hotel Adlon Kempinski", area: "Unter den Linden", priceLevel: 4, note: "Landmark beside the Brandenburg Gate" },
      { name: "Soho House Berlin", area: "Mitte", priceLevel: 3, note: "Converted department store — creative favourite" },
      { name: "25hours Bikini Berlin", area: "Charlottenburg", priceLevel: 3, note: "Playful design hotel overlooking the zoo" },
    ],
  },
  munich: {
    restaurants: [
      { name: "Hofbräuhaus", cuisine: "Bavarian", priceLevel: 2, note: "The world's most famous beer hall" },
      { name: "Viktualienmarkt stalls", cuisine: "Market food", priceLevel: 1, note: "Munich's great outdoor food market" },
      { name: "Bratwurstglöckl am Dom", cuisine: "Bavarian", priceLevel: 2, note: "Classic sausages beside the cathedral" },
    ],
    stays: [
      { name: "Bayerischer Hof", area: "Promenadeplatz", priceLevel: 4, note: "Family-run landmark since 1841" },
      { name: "Mandarin Oriental Munich", area: "Altstadt", priceLevel: 4, note: "Quiet luxury in the old town" },
      { name: "Louis Hotel", area: "Viktualienmarkt", priceLevel: 3, note: "Boutique facing the market" },
    ],
  },
  vienna: {
    restaurants: [
      { name: "Café Central", cuisine: "Viennese café", priceLevel: 2, note: "Legendary coffeehouse — locals still come" },
      { name: "Figlmüller", cuisine: "Schnitzel", priceLevel: 2, note: "The city's definitive Wiener schnitzel" },
      { name: "Naschmarkt stalls", cuisine: "Market food", priceLevel: 1, note: "Vienna's great open-air food market" },
      { name: "Gasthaus Pöschl", cuisine: "Austrian", priceLevel: 2, note: "Classic beisl locals favour" },
    ],
    stays: [
      { name: "Hotel Sacher Wien", area: "Innere Stadt", priceLevel: 4, note: "Home of the Original Sacher-Torte" },
      { name: "Hotel Imperial Vienna", area: "Ringstrasse", priceLevel: 4, note: "Palace hotel on the Ring" },
      { name: "25hours Hotel Vienna", area: "MuseumsQuartier", priceLevel: 3, note: "Playful design hotel favourite" },
    ],
  },
  prague: {
    restaurants: [
      { name: "Lokál Dlouhááá", cuisine: "Czech", priceLevel: 1, note: "Modern beer hall — locals' pick for Czech classics" },
      { name: "Café Savoy", cuisine: "Café / Czech", priceLevel: 2, note: "Belle Époque favourite across the river" },
      { name: "Manifesto Market", cuisine: "Street food", priceLevel: 1, note: "Open-air food court locals love" },
    ],
    stays: [
      { name: "Aria Hotel Prague", area: "Malá Strana", priceLevel: 4, note: "Music-themed luxury near the castle" },
      { name: "Mandarin Oriental Prague", area: "Malá Strana", priceLevel: 4, note: "Converted monastery" },
      { name: "Hotel Residence Agnes", area: "Old Town", priceLevel: 3, note: "Boutique favourite steps from Old Town Square" },
    ],
  },
  budapest: {
    restaurants: [
      { name: "Gettó Gulyás", cuisine: "Hungarian", priceLevel: 1, note: "Jewish Quarter goulash favourite" },
      { name: "Central Market Hall stalls", cuisine: "Market food", priceLevel: 1, note: "Langos and paprika where locals shop" },
      { name: "Rosenstein", cuisine: "Hungarian-Jewish", priceLevel: 2, note: "Family restaurant institution" },
      { name: "Szimpla Kert", cuisine: "Ruin bar snacks", priceLevel: 1, note: "The original ruin pub — tourist + local" },
    ],
    stays: [
      { name: "Four Seasons Hotel Gresham Palace", area: "Chain Bridge", priceLevel: 4, note: "Art Nouveau landmark on the Danube" },
      { name: "Aria Hotel Budapest", area: "Basilica", priceLevel: 4, note: "Music-themed luxury with rooftop" },
      { name: "Brody House", area: "Palace District", priceLevel: 2, note: "Artists' residence boutique favourite" },
    ],
  },
  krakow: {
    restaurants: [
      { name: "Obwarzanek stalls in the Rynek", cuisine: "Street food", priceLevel: 1, note: "Kraków's iconic bagel-pretzel" },
      { name: "Milkbar Tomasza", cuisine: "Polish milk bar", priceLevel: 1, note: "Classic communist-era canteen revived" },
      { name: "Pod Aniołami", cuisine: "Polish", priceLevel: 2, note: "Cellar restaurant locals recommend" },
    ],
    stays: [
      { name: "Hotel Copernicus", area: "Old Town", priceLevel: 4, note: "Historic luxury on Kanonicza Street" },
      { name: "Bonerowski Palace", area: "Main Square", priceLevel: 4, note: "Renaissance townhouse hotel" },
      { name: "PURO Kraków Stare Miasto", area: "Old Town", priceLevel: 2, note: "Design hotel tourist favourite" },
    ],
  },
  athens: {
    restaurants: [
      { name: "Kostas", cuisine: "Souvlaki", priceLevel: 1, note: "Tiny souvlaki shop Athenians swear by" },
      { name: "Diporto", cuisine: "Greek taverna", priceLevel: 1, note: "No-menu basement taverna near the market" },
      { name: "Varoulko Seaside", cuisine: "Seafood", priceLevel: 3, note: "Michelin seafood with Mikrolimano views" },
      { name: "Bougatsadiko Thessalonikis", cuisine: "Bougatsa", priceLevel: 1, note: "Best bougatsa in Athens" },
    ],
    stays: [
      { name: "Hotel Grande Bretagne", area: "Syntagma", priceLevel: 4, note: "Landmark facing Parliament" },
      { name: "New Hotel", area: "Syntagma", priceLevel: 3, note: "Design hotel by Brazilian Campana brothers" },
      { name: "AthensWas", area: "Acropolis", priceLevel: 3, note: "Boutique with Acropolis views" },
    ],
  },
  santorini: {
    restaurants: [
      { name: "Metaxi Mas", cuisine: "Greek", priceLevel: 2, note: "Local favourite in Exo Gonia with a view" },
      { name: "Lucky's Souvlakis", cuisine: "Souvlaki", priceLevel: 1, note: "Fira's classic souvlaki" },
      { name: "To Psaraki", cuisine: "Seafood", priceLevel: 2, note: "Vlychada harbour seafood — locals' pick" },
    ],
    stays: [
      { name: "Grace Hotel Santorini", area: "Imerovigli", priceLevel: 4, note: "Caldera cliffside luxury" },
      { name: "Katikies Santorini", area: "Oia", priceLevel: 4, note: "Iconic cave-suite resort" },
      { name: "Mystique", area: "Oia", priceLevel: 4, note: "Adults-only cliffside favourite" },
    ],
  },
  edinburgh: {
    restaurants: [
      { name: "The Scran & Scallie", cuisine: "Scottish gastropub", priceLevel: 2, note: "Tom Kitchin's local favourite" },
      { name: "Timberyard", cuisine: "Scottish", priceLevel: 3, note: "Farm-fire cooking locals love" },
      { name: "Mary's Milk Bar", cuisine: "Ice cream", priceLevel: 1, note: "Grassmarket gelato institution" },
    ],
    stays: [
      { name: "The Balmoral", area: "Princes Street", priceLevel: 4, note: "Clock-tower landmark at Waverley" },
      { name: "Gleneagles Townhouse", area: "St Andrew Square", priceLevel: 4, note: "New-wave luxury in a bank building" },
      { name: "The Witchery by the Castle", area: "Royal Mile", priceLevel: 3, note: "Gothic suites beside the castle" },
    ],
  },
  dublin: {
    restaurants: [
      { name: "Leo Burdock", cuisine: "Fish & chips", priceLevel: 1, note: "Dublin's classic chipper since 1913" },
      { name: "The Winding Stair", cuisine: "Irish", priceLevel: 2, note: "Bookshop restaurant overlooking the Liffey" },
      { name: "Chapter One", cuisine: "Irish", priceLevel: 4, note: "Michelin favourite below the Writers Museum" },
    ],
    stays: [
      { name: "The Shelbourne", area: "St Stephen's Green", priceLevel: 4, note: "Historic grande dame" },
      { name: "The Clarence", area: "Temple Bar", priceLevel: 3, note: "U2-owned riverside hotel" },
      { name: "The Dean Dublin", area: "Kevin Street", priceLevel: 2, note: "Design hotel tourist favourite" },
    ],
  },
  copenhagen: {
    restaurants: [
      { name: "Torvehallerne stalls", cuisine: "Market food", priceLevel: 2, note: "City's great food halls — locals' lunch" },
      { name: "Reffen", cuisine: "Street food", priceLevel: 1, note: "Harbour street-food market" },
      { name: "Schønnemann", cuisine: "Smørrebrød", priceLevel: 2, note: "Classic open-sandwich institution since 1877" },
      { name: "Noma", cuisine: "Nordic", priceLevel: 4, note: "World-famous New Nordic (book far ahead)" },
    ],
    stays: [
      { name: "Hotel d'Angleterre", area: "Kongens Nytorv", priceLevel: 4, note: "Copenhagen's palace hotel since 1755" },
      { name: "Nimb Hotel", area: "Tivoli", priceLevel: 4, note: "Moorish fantasy beside Tivoli Gardens" },
      { name: "Villa Copenhagen", area: "Central Station", priceLevel: 3, note: "Converted post-office design hotel" },
    ],
  },
  stockholm: {
    restaurants: [
      { name: "Östermalms Saluhall stalls", cuisine: "Market food", priceLevel: 2, note: "Beautiful food hall — locals' pick" },
      { name: "Tradition", cuisine: "Swedish", priceLevel: 2, note: "Classic husmanskost favourite" },
      { name: "Meatballs for the People", cuisine: "Swedish", priceLevel: 1, note: "Modern take on the national dish" },
    ],
    stays: [
      { name: "Grand Hôtel Stockholm", area: "Blasieholmen", priceLevel: 4, note: "Landmark facing the Royal Palace" },
      { name: "Ett Hem", area: "Vasastan", priceLevel: 4, note: "Townhouse hotel with a residential feel" },
      { name: "Hotel Skeppsholmen", area: "Skeppsholmen", priceLevel: 3, note: "Quiet island boutique" },
    ],
  },
  oslo: {
    restaurants: [
      { name: "Mathallen Oslo stalls", cuisine: "Market food", priceLevel: 2, note: "Food hall in the Vulkan district" },
      { name: "Theatercaféen", cuisine: "Norwegian / café", priceLevel: 2, note: "Belle Époque institution" },
      { name: "Maaemo", cuisine: "Nordic", priceLevel: 4, note: "Three-Michelin-star New Nordic" },
    ],
    stays: [
      { name: "The Thief", area: "Tjuvholmen", priceLevel: 4, note: "Art-filled waterfront luxury" },
      { name: "Hotel Continental Oslo", area: "National Theatre", priceLevel: 4, note: "Classic city landmark" },
      { name: "Amerikalinjen", area: "Central Station", priceLevel: 3, note: "Converted shipping-line HQ" },
    ],
  },
  reykjavik: {
    restaurants: [
      { name: "Bæjarins Beztu Pylsur", cuisine: "Hot dogs", priceLevel: 1, note: "The city's legendary hot-dog stand" },
      { name: "Messinn", cuisine: "Seafood", priceLevel: 2, note: "Pan-fried fish in cast-iron — locals' pick" },
      { name: "Café Loki", cuisine: "Icelandic", priceLevel: 1, note: "Rye bread ice cream opposite Hallgrímskirkja" },
    ],
    stays: [
      { name: "Ion City Hotel", area: "Downtown", priceLevel: 3, note: "Design hotel by the creators of Ion Adventure" },
      { name: "Canopy by Hilton Reykjavik", area: "City Centre", priceLevel: 3, note: "Top-rated modern hotel" },
      { name: "Hotel Borg", area: "Austurvöllur", priceLevel: 3, note: "Art Deco landmark on the main square" },
    ],
  },
  brussels: {
    restaurants: [
      { name: "Maison Dandoy", cuisine: "Waffles / biscuits", priceLevel: 1, note: "Speculoos and waffles since 1829" },
      { name: "Chez Léon", cuisine: "Mussels", priceLevel: 2, note: "Classic moules-frites institution" },
      { name: "Friterie Tabora", cuisine: "Frites", priceLevel: 1, note: "Locals' fry shop near Grand-Place" },
    ],
    stays: [
      { name: "Hotel Amigo", area: "Grand-Place", priceLevel: 4, note: "Rocco Forte steps from the square" },
      { name: "The Dominican", area: "Downtown", priceLevel: 3, note: "Converted monastery boutique" },
      { name: "Pillows City Hotel Brussels Centre", area: "Centre", priceLevel: 3, note: "Design hotel tourist favourite" },
    ],
  },
  zurich: {
    restaurants: [
      { name: "Sternen Grill", cuisine: "Sausage", priceLevel: 1, note: "The Cervelat and bratwurst Zürich queues for" },
      { name: "Café Schober", cuisine: "Café / pastry", priceLevel: 2, note: "Historic sweet-shop café" },
      { name: "Kronenhalle", cuisine: "Swiss / French", priceLevel: 3, note: "Art-filled institution since 1924" },
    ],
    stays: [
      { name: "Baur au Lac", area: "Lake Zürich", priceLevel: 4, note: "Lakeside grande dame since 1844" },
      { name: "Widder Hotel", area: "Old Town", priceLevel: 4, note: "Design hotel of historic townhouses" },
      { name: "25hours Hotel Zürich Langstrasse", area: "Langstrasse", priceLevel: 2, note: "Playful design hotel" },
    ],
  },
  geneva: {
    restaurants: [
      { name: "Café du Centre", cuisine: "Seafood", priceLevel: 2, note: "Place du Molard seafood classic" },
      { name: "Bains des Pâquis buvette", cuisine: "Swiss", priceLevel: 1, note: "Lakeside fondue and fondue — locals' hangout" },
      { name: "Café de Paris", cuisine: "Steak-frites", priceLevel: 2, note: "Home of the famous Café de Paris butter" },
    ],
    stays: [
      { name: "Four Seasons Hôtel des Bergues", area: "Lac", priceLevel: 4, note: "Lake Geneva landmark since 1834" },
      { name: "Hotel d'Angleterre", area: "Quai du Mont-Blanc", priceLevel: 4, note: "Classic lakeside luxury" },
      { name: "Eastwest Hotel", area: "Central", priceLevel: 3, note: "Boutique design favourite" },
    ],
  },
  warsaw: {
    restaurants: [
      { name: "Bar Prasowy", cuisine: "Polish milk bar", priceLevel: 1, note: "Classic bar mleczny — locals' cheap lunch" },
      { name: "Hala Gwardii stalls", cuisine: "Street food", priceLevel: 1, note: "Food hall in a historic sports hall" },
      { name: "Stary Dom", cuisine: "Polish", priceLevel: 2, note: "Traditional Polish favourite" },
    ],
    stays: [
      { name: "Hotel Bristol Warsaw", area: "Krakowskie Przedmieście", priceLevel: 4, note: "Belle Époque landmark" },
      { name: "Raffles Europejski Warsaw", area: "Royal Route", priceLevel: 4, note: "Restored 19th-century palace hotel" },
      { name: "PURO Warszawa Centrum", area: "Centre", priceLevel: 2, note: "Design hotel tourist favourite" },
    ],
  },

  // ---------- Middle East & Africa ----------
  dubai: {
    restaurants: [
      { name: "Al Ustad Special Kabab", cuisine: "Persian", priceLevel: 1, note: "Local institution since 1978" },
      { name: "Ravi Restaurant", cuisine: "Pakistani", priceLevel: 1, note: "Satwa canteen Dubai has loved for decades" },
      { name: "Al Fanar Restaurant", cuisine: "Emirati", priceLevel: 2, note: "Traditional Emirati dishes in a heritage setting" },
      { name: "Bu Qtair", cuisine: "Seafood", priceLevel: 1, note: "Plastic-chair fish shack — locals' pick" },
    ],
    stays: [
      { name: "Burj Al Arab", area: "Jumeirah", priceLevel: 4, note: "The sail-shaped icon" },
      { name: "Atlantis The Royal", area: "Palm Jumeirah", priceLevel: 4, note: "Ultra-luxury on the Palm" },
      { name: "One&Only The Palm", area: "Palm Jumeirah", priceLevel: 4, note: "Arabian-palace resort favourite" },
      { name: "Rove Downtown", area: "Downtown", priceLevel: 2, note: "Top-rated mid-range near the Burj" },
    ],
  },
  "abu-dhabi": {
    restaurants: [
      { name: "Al Dhafra Restaurant", cuisine: "Emirati / seafood", priceLevel: 2, note: "Harbour fish restaurant locals love" },
      { name: "Zahrat Lebnan", cuisine: "Lebanese", priceLevel: 1, note: "City-wide Lebanese favourite" },
      { name: "Li Beirut", cuisine: "Lebanese", priceLevel: 3, note: "Refined Lebanese at the St. Regis" },
    ],
    stays: [
      { name: "Emirates Palace Mandarin Oriental", area: "West Corniche", priceLevel: 4, note: "The palace hotel of Abu Dhabi" },
      { name: "Rosewood Abu Dhabi", area: "Al Maryah Island", priceLevel: 4, note: "Top-rated modern luxury" },
      { name: "The St. Regis Abu Dhabi", area: "Nation Towers", priceLevel: 4, note: "Corniche landmark" },
    ],
  },
  doha: {
    restaurants: [
      { name: "Bandar Aden", cuisine: "Yemeni", priceLevel: 1, note: "Mandi rice locals queue for" },
      { name: "Al Mourjan Restaurant", cuisine: "Lebanese / grill", priceLevel: 2, note: "Corniche classic" },
      { name: "Souq Waqif street stalls", cuisine: "Street food", priceLevel: 1, note: "Grills and karak where Doha eats" },
    ],
    stays: [
      { name: "Mandarin Oriental Doha", area: "Msheireb", priceLevel: 4, note: "Souq-side luxury" },
      { name: "The Ritz-Carlton Doha", area: "West Bay Lagoon", priceLevel: 4, note: "Lagoon resort landmark" },
      { name: "Banana Island Resort Doha by Anantara", area: "Banana Island", priceLevel: 4, note: "Private-island escape" },
    ],
  },
  amman: {
    restaurants: [
      { name: "Hashem Restaurant", cuisine: "Jordanian", priceLevel: 1, note: "Downtown falafel and hummus institution" },
      { name: "Reem Al Bawadi", cuisine: "Levantine", priceLevel: 2, note: "Garden restaurant locals love" },
      { name: "Sufra Restaurant", cuisine: "Jordanian", priceLevel: 2, note: "Traditional Jordanian in a heritage house" },
    ],
    stays: [
      { name: "Four Seasons Hotel Amman", area: "Abdoun", priceLevel: 4, note: "Hilltop luxury" },
      { name: "The House Boutique Suites", area: "Jabal Amman", priceLevel: 3, note: "Design suites tourist favourite" },
      { name: "W Amman", area: "Abdali", priceLevel: 4, note: "Modern lifestyle hotel" },
    ],
  },
  cairo: {
    restaurants: [
      { name: "Abou Tarek", cuisine: "Koshari", priceLevel: 1, note: "Cairo's definitive koshari" },
      { name: "Felfela", cuisine: "Egyptian", priceLevel: 1, note: "Downtown institution since 1959" },
      { name: "Kazaz", cuisine: "Egyptian", priceLevel: 1, note: "Locals' pick for fool and taameya" },
      { name: "Abou El Sid", cuisine: "Egyptian", priceLevel: 2, note: "Zamalek classic with a colonial vibe" },
    ],
    stays: [
      { name: "Four Seasons Hotel Cairo at Nile Plaza", area: "Garden City", priceLevel: 4, note: "Nile-front luxury" },
      { name: "Marriott Mena House", area: "Giza", priceLevel: 4, note: "Historic hotel facing the Pyramids" },
      { name: "Sofitel Cairo Nile El Gezirah", area: "Zamalek", priceLevel: 3, note: "Island hotel with river views" },
    ],
  },
  marrakesh: {
    restaurants: [
      { name: "Nomad", cuisine: "Modern Moroccan", priceLevel: 2, note: "Rooftop overlooking the spice market — locals' pick" },
      { name: "Mechoui Alley", cuisine: "Mechoui", priceLevel: 1, note: "Slow-roasted lamb stalls by the souks" },
      { name: "Café Clock Marrakech", cuisine: "Café / Moroccan", priceLevel: 1, note: "Cultural café favourite" },
      { name: "Al Fassia Guéliz", cuisine: "Moroccan", priceLevel: 2, note: "Women-run classic away from the Medina" },
    ],
    stays: [
      { name: "La Mamounia", area: "Medina", priceLevel: 4, note: "Morocco's most legendary palace hotel" },
      { name: "Royal Mansour Marrakech", area: "Medina", priceLevel: 4, note: "King's hotel of private riads" },
      { name: "El Fenn", area: "Medina", priceLevel: 3, note: "Art-filled riad favourite" },
      { name: "Riad Kniza", area: "Medina", priceLevel: 3, note: "Top-rated traditional riad" },
    ],
  },
  fes: {
    restaurants: [
      { name: "Café Clock Fes", cuisine: "Café / Moroccan", priceLevel: 1, note: "Cultural café in the medina" },
      { name: "Restaurant Dar Roumana", cuisine: "Moroccan", priceLevel: 2, note: "Rooftop medina favourite" },
      { name: "Fez Café", cuisine: "Garden café", priceLevel: 2, note: "Lush courtyard in Le Jardin des Biehn" },
    ],
    stays: [
      { name: "Riad Fès", area: "Medina", priceLevel: 4, note: "Relais & Châteaux medina palace" },
      { name: "Palais Faraj Suites & Spa", area: "Medina", priceLevel: 4, note: "Converted palace with panoramic views" },
      { name: "Riad Laaroussa", area: "Medina", priceLevel: 3, note: "Top-rated traditional riad" },
    ],
  },
  casablanca: {
    restaurants: [
      { name: "Rick's Café", cuisine: "International / Moroccan", priceLevel: 2, note: "Casablanca-film homage — tourist + local" },
      { name: "La Sqala", cuisine: "Moroccan", priceLevel: 2, note: "Garden restaurant in an old fortress" },
      { name: "Marché Central stalls", cuisine: "Seafood", priceLevel: 1, note: "Fresh fish grilled on the spot" },
    ],
    stays: [
      { name: "Four Seasons Hotel Casablanca", area: "Anfa Place", priceLevel: 4, note: "Oceanfront luxury" },
      { name: "Hyatt Regency Casablanca", area: "United Nations Square", priceLevel: 3, note: "Central landmark hotel" },
      { name: "Hotel & Spa Le Doge", area: "City Centre", priceLevel: 3, note: "Art Deco boutique favourite" },
    ],
  },
  "cape-town": {
    restaurants: [
      { name: "The Test Kitchen", cuisine: "Contemporary", priceLevel: 4, note: "Cape Town's most acclaimed kitchen (check status)" },
      { name: "Kalk Bay Harbour stalls", cuisine: "Seafood", priceLevel: 1, note: "Fresh fish and chips — locals' weekend pick" },
      { name: "Gold Restaurant", cuisine: "African", priceLevel: 2, note: "Pan-African feast with drumming" },
      { name: "Clarke's Bar & Dining Room", cuisine: "Café", priceLevel: 1, note: "Long Street breakfast institution" },
    ],
    stays: [
      { name: "Ellerman House", area: "Bantry Bay", priceLevel: 4, note: "Clifftop villa hotel with art collection" },
      { name: "One&Only Cape Town", area: "V&A Waterfront", priceLevel: 4, note: "Marina resort with Table Mountain views" },
      { name: "The Silo Hotel", area: "V&A Waterfront", priceLevel: 4, note: "Zeitz Museum rooftop hotel" },
      { name: "Daddy Long Legs", area: "City Bowl", priceLevel: 2, note: "Art-hotel favourite for creative travellers" },
    ],
  },
  nairobi: {
    restaurants: [
      { name: "Carnivore", cuisine: "Nyama choma", priceLevel: 2, note: "Legendary all-you-can-eat game meats" },
      { name: "Mama Oliech", cuisine: "Fish", priceLevel: 1, note: "Tilapia institution — locals' pick" },
      { name: "Talisman Restaurant", cuisine: "International / Kenyan", priceLevel: 2, note: "Karen garden favourite" },
    ],
    stays: [
      { name: "Giraffe Manor", area: "Karen", priceLevel: 4, note: "Breakfast with resident giraffes" },
      { name: "Hemingways Nairobi", area: "Karen", priceLevel: 4, note: "Colonial-style luxury" },
      { name: "Tribe Hotel", area: "The Village Market", priceLevel: 3, note: "Design hotel tourist favourite" },
    ],
  },
  accra: {
    restaurants: [
      { name: "Buka Restaurant", cuisine: "West African", priceLevel: 1, note: "Pan-African canteen locals love" },
      { name: "Azmera", cuisine: "Ghanaian", priceLevel: 1, note: "Buffet of Ghanaian classics" },
      { name: "Papaye", cuisine: "Grills", priceLevel: 1, note: "City-wide charcoal-grill chain favourite" },
    ],
    stays: [
      { name: "Kempinski Hotel Gold Coast City", area: "Airport City", priceLevel: 4, note: "Modern luxury landmark" },
      { name: "Movenpick Ambassador Hotel Accra", area: "Ridge", priceLevel: 3, note: "Independence Arch landmark" },
      { name: "Villa Monticello", area: "Airport Residential", priceLevel: 3, note: "Boutique favourite near the airport area" },
    ],
  },
  zanzibar: {
    restaurants: [
      { name: "Forodhani Gardens night market", cuisine: "Street food", priceLevel: 1, note: "Seafood skewers at sunset — locals + visitors" },
      { name: "Lukmaan Restaurant", cuisine: "Swahili", priceLevel: 1, note: "Stone Town canteen institution" },
      { name: "Emerson Spice Tea House", cuisine: "Swahili", priceLevel: 2, note: "Rooftop favourite in a restored house" },
    ],
    stays: [
      { name: "Park Hyatt Zanzibar", area: "Stone Town", priceLevel: 4, note: "Waterfront luxury in Stone Town" },
      { name: "Emerson on Hurumzi", area: "Stone Town", priceLevel: 3, note: "Rooftop boutique in a historic house" },
      { name: "Zanzibar White Sand Luxury Villas", area: "Paje", priceLevel: 4, note: "Beach villa resort favourite" },
    ],
  },

  // ---------- Americas ----------
  "new-york-city": {
    restaurants: [
      { name: "Katz's Delicatessen", cuisine: "Jewish deli", priceLevel: 2, note: "Pastrami institution since 1888" },
      { name: "Joe's Pizza", cuisine: "Pizza", priceLevel: 1, note: "Classic NY slice — locals' pick" },
      { name: "Xi'an Famous Foods", cuisine: "Chinese", priceLevel: 1, note: "Hand-ripped noodles citywide favourite" },
      { name: "Russ & Daughters Café", cuisine: "Appetizing", priceLevel: 2, note: "Century-old smoked-fish counter" },
    ],
    stays: [
      { name: "The Plaza", area: "Fifth Avenue", priceLevel: 4, note: "Belle Époque landmark at Central Park" },
      { name: "The Beekman", area: "Financial District", priceLevel: 4, note: "Atrium hotel in a historic building" },
      { name: "The Standard High Line", area: "Meatpacking", priceLevel: 3, note: "Design hotel straddling the High Line" },
      { name: "Pod Hotels", area: "Multiple", priceLevel: 2, note: "Top-rated compact rooms for city visits" },
    ],
  },
  "los-angeles": {
    restaurants: [
      { name: "Grand Central Market stalls", cuisine: "Market food", priceLevel: 1, note: "Downtown food hall — locals' lunch" },
      { name: "Howlin' Ray's", cuisine: "Nashville hot chicken", priceLevel: 1, note: "Chinatown queue that never dies" },
      { name: "Guelaguetza", cuisine: "Oaxacan", priceLevel: 2, note: "Koreatown mole institution" },
      { name: "In-N-Out Burger", cuisine: "Burgers", priceLevel: 1, note: "California's cult drive-thru" },
    ],
    stays: [
      { name: "Chateau Marmont", area: "Sunset Boulevard", priceLevel: 4, note: "Hollywood legend since 1929" },
      { name: "Proper Hotel Downtown LA", area: "Downtown", priceLevel: 3, note: "Kelly Wearstler design favourite" },
      { name: "Shutters on the Beach", area: "Santa Monica", priceLevel: 4, note: "Beachfront tourist favourite" },
    ],
  },
  "san-francisco": {
    restaurants: [
      { name: "Tartine Bakery", cuisine: "Bakery", priceLevel: 1, note: "Mission bakery legend" },
      { name: "Swan Oyster Depot", cuisine: "Seafood", priceLevel: 2, note: "Counter-only seafood institution since 1912" },
      { name: "La Taqueria", cuisine: "Mexican", priceLevel: 1, note: "Mission burrito locals defend fiercely" },
      { name: "Zuni Café", cuisine: "California", priceLevel: 3, note: "Roast chicken institution since 1979" },
    ],
    stays: [
      { name: "Fairmont San Francisco", area: "Nob Hill", priceLevel: 4, note: "Hilltop landmark since 1907" },
      { name: "Proper Hotel San Francisco", area: "Mid-Market", priceLevel: 3, note: "Design hotel tourist favourite" },
      { name: "Hotel Kabuki", area: "Japantown", priceLevel: 2, note: "Japanese-inspired boutique" },
    ],
  },
  "mexico-city": {
    restaurants: [
      { name: "Contramar", cuisine: "Seafood", priceLevel: 3, note: "Tuna tostadas — CDMX locals' lunch" },
      { name: "El Vilsito", cuisine: "Tacos al pastor", priceLevel: 1, note: "Late-night al pastor legend" },
      { name: "Mercado Roma / Medellín stalls", cuisine: "Street food", priceLevel: 1, note: "Neighbourhood markets where the city eats" },
      { name: "Pujol", cuisine: "Mexican", priceLevel: 4, note: "Enrique Olvera's world-famous tasting menu" },
    ],
    stays: [
      { name: "Four Seasons Hotel Mexico City", area: "Reforma", priceLevel: 4, note: "Courtyard oasis on Paseo de la Reforma" },
      { name: "Hotel Condesa DF", area: "Condesa", priceLevel: 3, note: "Design hotel in the leafy Condesa" },
      { name: "Downtown Mexico", area: "Centro Histórico", priceLevel: 3, note: "Converted 17th-century palace" },
    ],
  },
  "rio-de-janeiro": {
    restaurants: [
      { name: "Confeitaria Colombo", cuisine: "Café / pastry", priceLevel: 2, note: "Belle Époque café institution since 1894" },
      { name: "Bar Urca", cuisine: "Bar snacks", priceLevel: 1, note: "Seawall beers and pastel — locals' sunset" },
      { name: "Aprazível", cuisine: "Brazilian", priceLevel: 3, note: "Santa Teresa hillside favourite" },
      { name: "Café de la Musique", cuisine: "Beach café", priceLevel: 2, note: "Ipanema beach classic" },
    ],
    stays: [
      { name: "Belmond Copacabana Palace", area: "Copacabana", priceLevel: 4, note: "The iconic beachfront palace" },
      { name: "Hotel Fasano Rio de Janeiro", area: "Ipanema", priceLevel: 4, note: "Philippe Starck beachfront luxury" },
      { name: "Santa Teresa Hotel RJ - MGallery", area: "Santa Teresa", priceLevel: 3, note: "Hillside boutique favourite" },
    ],
  },
  "buenos-aires": {
    restaurants: [
      { name: "Don Julio", cuisine: "Parrilla", priceLevel: 3, note: "Palermo's most celebrated steakhouse" },
      { name: "El Preferido de Palermo", cuisine: "Argentine", priceLevel: 2, note: "Corner bar-restaurant locals love" },
      { name: "Café Tortoni", cuisine: "Café", priceLevel: 2, note: "Historic café since 1858" },
      { name: "El Sanjuanino", cuisine: "Empanadas", priceLevel: 1, note: "Recoleta empanada institution" },
    ],
    stays: [
      { name: "Alvear Palace Hotel", area: "Recoleta", priceLevel: 4, note: "Belle Époque landmark" },
      { name: "Palacio Duhau - Park Hyatt", area: "Recoleta", priceLevel: 4, note: "Palace hotel with gardens" },
      { name: "Faena Hotel Buenos Aires", area: "Puerto Madero", priceLevel: 4, note: "Theatrical design hotel" },
    ],
  },
  lima: {
    restaurants: [
      { name: "Central", cuisine: "Peruvian", priceLevel: 4, note: "Altitude-themed tasting — world's top restaurant" },
      { name: "La Mar Cebichería", cuisine: "Ceviche", priceLevel: 2, note: "Gaston Acurio's classic cebichería" },
      { name: "Isolina Taberna", cuisine: "Criollo", priceLevel: 2, note: "Barranco tavern — locals' pick" },
      { name: "Huaca Pucllana Restaurant", cuisine: "Peruvian", priceLevel: 3, note: "Dining beside a pre-Inca pyramid" },
    ],
    stays: [
      { name: "Belmond Miraflores Park", area: "Miraflores", priceLevel: 4, note: "Cliffside luxury overlooking the Pacific" },
      { name: "Hotel B", area: "Barranco", priceLevel: 4, note: "Belle Époque boutique in the arts district" },
      { name: "Atemporal", area: "Miraflores", priceLevel: 3, note: "Design villa hotel favourite" },
    ],
  },

  // ---------- Oceania ----------
  sydney: {
    restaurants: [
      { name: "Sydney Fish Market stalls", cuisine: "Seafood", priceLevel: 1, note: "Oysters and sushi where Sydneysiders shop" },
      { name: "Bourke Street Bakery", cuisine: "Bakery", priceLevel: 1, note: "Cult bakery with citywide love" },
      { name: "Pablo & Rusty's", cuisine: "Café", priceLevel: 1, note: "CBD coffee institution" },
      { name: "Quay", cuisine: "Modern Australian", priceLevel: 4, note: "Harbour-view fine dining landmark" },
    ],
    stays: [
      { name: "Park Hyatt Sydney", area: "The Rocks", priceLevel: 4, note: "Opera House views from every suite" },
      { name: "Capella Sydney", area: "CBD", priceLevel: 4, note: "Converted department-of-education landmark" },
      { name: "QT Sydney", area: "CBD", priceLevel: 3, note: "Theatrical design hotel favourite" },
    ],
  },
  melbourne: {
    restaurants: [
      { name: "Queen Victoria Market stalls", cuisine: "Market food", priceLevel: 1, note: "The city's great produce market" },
      { name: "Pellegrini's Espresso Bar", cuisine: "Italian café", priceLevel: 1, note: "Bourke Street espresso institution since 1954" },
      { name: "Supernormal", cuisine: "Asian", priceLevel: 2, note: "Andrew McConnell favourite" },
      { name: "Typewriter / Hardware Société", cuisine: "Brunch", priceLevel: 2, note: "Brunch institutions locals queue for" },
    ],
    stays: [
      { name: "Hotel Windsor Melbourne", area: "CBD", priceLevel: 3, note: "Victorian grande dame" },
      { name: "The Langham Melbourne", area: "Southbank", priceLevel: 4, note: "Yarra River luxury" },
      { name: "QT Melbourne", area: "CBD", priceLevel: 3, note: "Design hotel tourist favourite" },
    ],
  },

  // ---------- Top-100 tourist cities (newly added pages) ----------
  miami: {
    restaurants: [
      { name: "Versailles Restaurant", cuisine: "Cuban", priceLevel: 1, note: "Little Havana institution" },
      { name: "Joe's Stone Crab", cuisine: "Seafood", priceLevel: 3, note: "Miami Beach classic since 1913" },
      { name: "La Sandwicherie", cuisine: "Sandwiches", priceLevel: 1, note: "South Beach late-night favourite" },
      { name: "Mandolin Aegean Bistro", cuisine: "Greek / Mediterranean", priceLevel: 2, note: "Coral Gables garden dining" },
    ],
    stays: [
      { name: "The Setai Miami Beach", area: "South Beach", priceLevel: 4, note: "Oceanfront Asian-inspired luxury" },
      { name: "Faena Hotel Miami Beach", area: "Mid-Beach", priceLevel: 4, note: "Theatrical beachfront hotel" },
      { name: "1 Hotel South Beach", area: "South Beach", priceLevel: 3, note: "Eco-chic tourist favourite" },
    ],
  },
  orlando: {
    restaurants: [
      { name: "4 Rivers Smokehouse", cuisine: "BBQ", priceLevel: 1, note: "Central Florida BBQ favourite" },
      { name: "The Ravenous Pig", cuisine: "American", priceLevel: 2, note: "Winter Park gastropub landmark" },
      { name: "Keke's Breakfast Cafe", cuisine: "Breakfast", priceLevel: 1, note: "Local breakfast chain locals love" },
      { name: "Victoria & Albert's", cuisine: "Fine dining", priceLevel: 4, note: "Disney Grand Floridian tasting-menu icon" },
    ],
    stays: [
      { name: "Disney's Grand Floridian Resort", area: "Walt Disney World", priceLevel: 4, note: "Flagship Disney luxury stay" },
      { name: "Universal's Hard Rock Hotel", area: "Universal Orlando", priceLevel: 3, note: "Early park access favourite" },
      { name: "Waldorf Astoria Orlando", area: "Bonnet Creek", priceLevel: 4, note: "Golf-resort luxury near Disney" },
    ],
  },
  cusco: {
    restaurants: [
      { name: "San Pedro Market stalls", cuisine: "Market food", priceLevel: 1, note: "Juice, soups and Andean staples" },
      { name: "Cicciolina", cuisine: "Peruvian-Mediterranean", priceLevel: 2, note: "Long-running Plaza favourite" },
      { name: "Chicha por Gastón Acurio", cuisine: "Peruvian", priceLevel: 2, note: "Gastón Acurio's Cusco outpost" },
      { name: "MIL Centro (Moray)", cuisine: "Andean tasting", priceLevel: 4, note: "Virgilio Martínez highland destination (day trip)" },
    ],
    stays: [
      { name: "Belmond Hotel Monasterio", area: "Centro Histórico", priceLevel: 4, note: "Converted 16th-century monastery" },
      { name: "Inkaterra La Casona", area: "Plaza Nazarenas", priceLevel: 4, note: "Boutique colonial mansion" },
      { name: "JW Marriott El Convento Cusco", area: "Centro", priceLevel: 3, note: "Convent-turned-hotel tourist favourite" },
    ],
  },
  "las-vegas": {
    restaurants: [
      { name: "Lotus of Siam", cuisine: "Thai", priceLevel: 2, note: "Legendary northern Thai institution" },
      { name: "Raku", cuisine: "Japanese", priceLevel: 2, note: "Off-Strip izakaya locals swear by" },
      { name: "Capriotti's", cuisine: "Sandwiches", priceLevel: 1, note: "Local sandwich chain classic" },
      { name: "Joël Robuchon", cuisine: "French", priceLevel: 4, note: "MGM Grand fine-dining landmark" },
    ],
    stays: [
      { name: "Bellagio", area: "Las Vegas Strip", priceLevel: 4, note: "Fountains and classic Strip luxury" },
      { name: "Wynn Las Vegas", area: "Las Vegas Strip", priceLevel: 4, note: "Top-rated resort favourite" },
      { name: "The Cosmopolitan", area: "Las Vegas Strip", priceLevel: 3, note: "Design-forward tourist favourite" },
    ],
  },
  "washington-dc": {
    restaurants: [
      { name: "Ben's Chili Bowl", cuisine: "American", priceLevel: 1, note: "U Street half-smoke institution since 1958" },
      { name: "Eastern Market vendors", cuisine: "Market food", priceLevel: 1, note: "Capitol Hill weekend classic" },
      { name: "Old Ebbitt Grill", cuisine: "American", priceLevel: 2, note: "Historic downtown oyster bar" },
      { name: "Minibar by José Andrés", cuisine: "Molecular / tasting", priceLevel: 4, note: "Experimental tasting-menu landmark" },
    ],
    stays: [
      { name: "The Willard InterContinental", area: "Downtown", priceLevel: 4, note: "Historic grand hotel near the White House" },
      { name: "The Jefferson", area: "16th Street", priceLevel: 4, note: "Boutique luxury favourite" },
      { name: "Hotel Washington", area: "Penn Quarter", priceLevel: 3, note: "Rooftop views over the monuments" },
    ],
  },
  boston: {
    restaurants: [
      { name: "Neptune Oyster", cuisine: "Seafood", priceLevel: 2, note: "North End lobster-roll favourite" },
      { name: "Mike's Pastry", cuisine: "Italian bakery", priceLevel: 1, note: "North End cannoli institution" },
      { name: "Union Oyster House", cuisine: "Seafood", priceLevel: 2, note: "America's oldest restaurant (1826)" },
      { name: "Oleana", cuisine: "Eastern Mediterranean", priceLevel: 3, note: "Cambridge chef-driven favourite" },
    ],
    stays: [
      { name: "Four Seasons Hotel One Dalton", area: "Back Bay", priceLevel: 4, note: "Modern skyline luxury" },
      { name: "XV Beacon", area: "Beacon Hill", priceLevel: 4, note: "Boutique Beacon Hill classic" },
      { name: "The Liberty, a Luxury Collection Hotel", area: "Beacon Hill", priceLevel: 3, note: "Converted jail hotel tourist favourite" },
    ],
  },
  vancouver: {
    restaurants: [
      { name: "Phnom Penh Restaurant", cuisine: "Cambodian / Vietnamese", priceLevel: 1, note: "Chinatown institution" },
      { name: "Japadog", cuisine: "Street food", priceLevel: 1, note: "Cult Japanese hot-dog stand" },
      { name: "Vij's", cuisine: "Indian", priceLevel: 2, note: "Long-running South Granville favourite" },
      { name: "Tojo's", cuisine: "Sushi", priceLevel: 3, note: "Sushi pioneer restaurant" },
    ],
    stays: [
      { name: "Fairmont Hotel Vancouver", area: "Downtown", priceLevel: 3, note: "Château-style city landmark" },
      { name: "Shangri-La Hotel Vancouver", area: "Downtown", priceLevel: 4, note: "Quiet luxury tower" },
      { name: "The Fairmont Pacific Rim", area: "Coal Harbour", priceLevel: 4, note: "Harbour-view tourist favourite" },
    ],
  },
  queenstown: {
    restaurants: [
      { name: "Fergburger", cuisine: "Burgers", priceLevel: 1, note: "Cult Queenstown burger queue" },
      { name: "The Batch Café", cuisine: "Café", priceLevel: 1, note: "Local brunch favourite" },
      { name: "Botswana Butchery", cuisine: "Steak / game", priceLevel: 3, note: "Lakeside dining institution" },
      { name: "Rata", cuisine: "Modern NZ", priceLevel: 3, note: "Josh Emett fine-dining favourite" },
    ],
    stays: [
      { name: "Eichardt's Private Hotel", area: "Waterfront", priceLevel: 4, note: "Boutique lake-edge luxury" },
      { name: "Matakauri Lodge", area: "Glenorchy Road", priceLevel: 4, note: "Relais & Châteaux lake retreat" },
      { name: "QT Queenstown", area: "Town centre", priceLevel: 3, note: "Design hotel tourist favourite" },
    ],
  },
  phuket: {
    restaurants: [
      { name: "Raya Restaurant", cuisine: "Southern Thai", priceLevel: 2, note: "Phuket Town heritage favourite" },
      { name: "Kopitiam by Wilai", cuisine: "Peranakan / Thai", priceLevel: 1, note: "Local Phuket Town café" },
      { name: "One Chun", cuisine: "Southern Thai", priceLevel: 1, note: "Phuket Old Town classic" },
      { name: "PRU (Trisara)", cuisine: "Farm-to-table", priceLevel: 4, note: "Destination tasting-menu restaurant" },
    ],
    stays: [
      { name: "Trisara", area: "Northwestern coast", priceLevel: 4, note: "Pool-villa luxury landmark" },
      { name: "Amanpuri", area: "Pansea Beach", priceLevel: 4, note: "Original Aman beach resort" },
      { name: "The Naka Phuket", area: "Kamala", priceLevel: 3, note: "Adults-only pool-villa favourite" },
    ],
  },
  "chiang-mai": {
    restaurants: [
      { name: "Khao Soi Khun Yai", cuisine: "Northern Thai", priceLevel: 1, note: "Legendary khao soi institution" },
      { name: "SP Chicken", cuisine: "Northern Thai", priceLevel: 1, note: "Local grilled-chicken favourite" },
      { name: "Huen Phen", cuisine: "Northern Thai", priceLevel: 1, note: "Old Town northern Thai classic" },
      { name: "David's Kitchen", cuisine: "European / Thai", priceLevel: 2, note: "Long-running expat and local favourite" },
    ],
    stays: [
      { name: "Four Seasons Resort Chiang Mai", area: "Mae Rim", priceLevel: 4, note: "Rice-paddy luxury resort" },
      { name: "Anantara Chiang Mai Resort", area: "Riverside", priceLevel: 3, note: "Ping River colonial-style favourite" },
      { name: "Rachamankha", area: "Old City", priceLevel: 3, note: "Design hotel in temple surrounds" },
    ],
  },
  cebu: {
    restaurants: [
      { name: "Larsian BBQ", cuisine: "Filipino BBQ", priceLevel: 1, note: "Open-air grill institution" },
      { name: "House of Lechon", cuisine: "Cebuano", priceLevel: 1, note: "Cebu lechon destination" },
      { name: "Abuhan sa Carbon", cuisine: "Filipino", priceLevel: 1, note: "Local carinderia favourite" },
      { name: "STK ta Bay! / Café Laguna", cuisine: "Filipino", priceLevel: 2, note: "Long-running Cebu dining brands" },
    ],
    stays: [
      { name: "Shangri-La Mactan", area: "Mactan", priceLevel: 4, note: "Island resort landmark" },
      { name: "Crimson Resort Mactan", area: "Mactan", priceLevel: 3, note: "Beach resort tourist favourite" },
      { name: "Radisson Blu Cebu", area: "Cebu City", priceLevel: 3, note: "City-base hotel near Ayala" },
    ],
  },
  taipei: {
    restaurants: [
      { name: "Din Tai Fung (Taipei 101)", cuisine: "Xiaolongbao", priceLevel: 2, note: "Global soup-dumpling landmark born in Taiwan" },
      { name: "Yongkang Beef Noodle", cuisine: "Beef noodles", priceLevel: 1, note: "Local niurou mian favourite" },
      { name: "Ningxia Night Market stalls", cuisine: "Night market", priceLevel: 1, note: "Less touristy night-market classic" },
      { name: "RAW", cuisine: "Modern Taiwanese", priceLevel: 4, note: "André Chiang tasting-menu destination" },
    ],
    stays: [
      { name: "Mandarin Oriental Taipei", area: "Songshan", priceLevel: 4, note: "Grand luxury landmark" },
      { name: "W Taipei", area: "Xinyi", priceLevel: 3, note: "Nightlife and shopping base" },
      { name: "Hotel Éclat Taipei", area: "Daan", priceLevel: 3, note: "Art-filled boutique favourite" },
    ],
  },
  macau: {
    restaurants: [
      { name: "Lord Stow's Bakery", cuisine: "Bakery", priceLevel: 1, note: "Original Portuguese egg-tart institution" },
      { name: "Wong Chi Kei", cuisine: "Noodles", priceLevel: 1, note: "Senado Square noodle classic" },
      { name: "Margaret's Café e Nata", cuisine: "Bakery", priceLevel: 1, note: "Rival egg-tart favourite" },
      { name: "Robuchon au Dôme", cuisine: "French", priceLevel: 4, note: "Grand Lisboa fine-dining landmark" },
    ],
    stays: [
      { name: "The Venetian Macao", area: "Cotai", priceLevel: 3, note: "Iconic Cotai mega-resort" },
      { name: "Morpheus (City of Dreams)", area: "Cotai", priceLevel: 4, note: "Zaha Hadid design hotel" },
      { name: "Pousada de São Tiago", area: "Peninsula", priceLevel: 3, note: "Fortress boutique heritage stay" },
    ],
  },
  petra: {
    restaurants: [
      { name: "The Cave Bar (Petra Guest House)", cuisine: "Café / drinks", priceLevel: 2, note: "Nabataean tomb bar by the entrance" },
      { name: "Red Cave Restaurant", cuisine: "Jordanian", priceLevel: 2, note: "Long-running Wadi Musa favourite" },
      { name: "Al-Wadi Restaurant", cuisine: "Jordanian", priceLevel: 1, note: "Local grilled meats and mezze" },
      { name: "Basin Restaurant (inside Petra)", cuisine: "Buffet / Jordanian", priceLevel: 2, note: "On-site lunch for site visitors" },
    ],
    stays: [
      { name: "Mövenpick Resort Petra", area: "Petra entrance", priceLevel: 3, note: "Closest full-service resort to the gate" },
      { name: "Petra Marriott Hotel", area: "Wadi Musa", priceLevel: 3, note: "Hilltop views over the valley" },
      { name: "Beit Zaman Hotel & Resort", area: "Wadi Musa", priceLevel: 3, note: "Village-style stone boutique favourite" },
    ],
  },
  mykonos: {
    restaurants: [
      { name: "Kiki's Tavern (Agios Sostis)", cuisine: "Greek taverna", priceLevel: 2, note: "Cash-only beach taverna favourite" },
      { name: "To Maereio", cuisine: "Greek", priceLevel: 2, note: "Town meze institution" },
      { name: "Giorgos & Marina's", cuisine: "Greek", priceLevel: 1, note: "Ano Mera village classic" },
      { name: "Nobu Mykonos", cuisine: "Japanese", priceLevel: 4, note: "Destination dining at Belvedere" },
    ],
    stays: [
      { name: "Cavo Tagoo", area: "Mykonos Town", priceLevel: 4, note: "Iconic infinity-pool luxury" },
      { name: "Belvedere Mykonos", area: "Mykonos Town", priceLevel: 4, note: "Long-standing glamour hotel" },
      { name: "Myconian Korali Relais & Châteaux", area: "Elia", priceLevel: 3, note: "Beach-resort tourist favourite" },
    ],
  },
  dubrovnik: {
    restaurants: [
      { name: "Nishta", cuisine: "Vegetarian", priceLevel: 2, note: "Old Town plant-based favourite" },
      { name: "Pizzeria Amfora", cuisine: "Pizza / Dalmatian", priceLevel: 1, note: "Local casual classic" },
      { name: "Kopun", cuisine: "Dalmatian", priceLevel: 2, note: "Historic Old Town restaurant" },
      { name: "Restaurant 360°", cuisine: "Fine dining", priceLevel: 4, note: "Ramparts tasting-menu landmark" },
    ],
    stays: [
      { name: "Hotel Excelsior Dubrovnik", area: "Ploče", priceLevel: 4, note: "Sea-view grande dame outside the walls" },
      { name: "Villa Dubrovnik", area: "Below cliffs", priceLevel: 4, note: "Cliffside boutique luxury" },
      { name: "Hotel Bellevue Dubrovnik", area: "Miramare Bay", priceLevel: 3, note: "Design hotel tourist favourite" },
    ],
  },
  salzburg: {
    restaurants: [
      { name: "Café Tomaselli", cuisine: "Café", priceLevel: 1, note: "Austria's oldest coffee house" },
      { name: "Stiftskeller St. Peter", cuisine: "Austrian", priceLevel: 2, note: "Historic abbey restaurant" },
      { name: "Gasthof Goldgasse", cuisine: "Austrian", priceLevel: 2, note: "Old Town local favourite" },
      { name: "Ikarus (Hangar-7)", cuisine: "Fine dining", priceLevel: 4, note: "Rotating-chef destination restaurant" },
    ],
    stays: [
      { name: "Hotel Sacher Salzburg", area: "Old Town / Salzach", priceLevel: 4, note: "River-view luxury landmark" },
      { name: "Hotel Goldener Hirsch", area: "Getreidegasse", priceLevel: 4, note: "Historic Old Town hotel" },
      { name: "Hotel Bristol Salzburg", area: "Near Mirabell", priceLevel: 3, note: "Classic tourist favourite" },
    ],
  },
  bruges: {
    restaurants: [
      { name: "Chez Vincent", cuisine: "Belgian / mussels", priceLevel: 2, note: "Long-running local favourite" },
      { name: "De Garre", cuisine: "Beer café", priceLevel: 1, note: "Hidden alley Tripel institution" },
      { name: "Breydel-De Coninc", cuisine: "Mussels / fries", priceLevel: 2, note: "Classic Markt-area mussel house" },
      { name: "Sans Cravate", cuisine: "Fine dining", priceLevel: 4, note: "Michelin-starred Bruges destination" },
    ],
    stays: [
      { name: "Hotel Dukes' Palace", area: "Near Markt", priceLevel: 4, note: "Former ducal palace luxury stay" },
      { name: "Relais & Châteaux Hotel Heritage", area: "Historic centre", priceLevel: 4, note: "Boutique canal-city favourite" },
      { name: "Hotel de Orangerie", area: "Canal", priceLevel: 3, note: "Canal-view tourist favourite" },
    ],
  },
  antalya: {
    restaurants: [
      { name: "Parlak Restaurant", cuisine: "Turkish", priceLevel: 1, note: "Kaleiçi grilled-onion classic since 1960s" },
      { name: "Vanilla Lounge", cuisine: "International / Turkish", priceLevel: 2, note: "Old-town favourite" },
      { name: "Club Arma", cuisine: "Seafood", priceLevel: 2, note: "Harbour-side seafood institution" },
      { name: "Seraser Fine Dining", cuisine: "Turkish / Mediterranean", priceLevel: 3, note: "Kaleiçi courtyard dining" },
    ],
    stays: [
      { name: "Akra Hotel", area: "Lara / cliffs", priceLevel: 3, note: "Clifftop resort favourite" },
      { name: "Tuvana Hotel", area: "Kaleiçi", priceLevel: 3, note: "Ottoman-house boutique stay" },
      { name: "Rixos Premium Belek (day base / region)", area: "Belek", priceLevel: 4, note: "Regional luxury resort hub" },
    ],
  },
  cancun: {
    restaurants: [
      { name: "Lorenzillo's", cuisine: "Seafood", priceLevel: 2, note: "Lagoon lobster institution" },
      { name: "La Habichuela", cuisine: "Yucatecan", priceLevel: 2, note: "Downtown Cancún classic since 1977" },
      { name: "El Fish Fritanga", cuisine: "Seafood", priceLevel: 1, note: "Local lagoon-side favourite" },
      { name: "Harry's", cuisine: "Steak / seafood", priceLevel: 3, note: "Hotel Zone tourist favourite" },
    ],
    stays: [
      { name: "Nizuc Resort & Spa", area: "Punta Nizuc", priceLevel: 4, note: "Quiet luxury south of the Zone" },
      { name: "JW Marriott Cancún", area: "Hotel Zone", priceLevel: 4, note: "Beachfront resort landmark" },
      { name: "Live Aqua Beach Resort", area: "Hotel Zone", priceLevel: 3, note: "Adults-only tourist favourite" },
    ],
  },
  agra: {
    restaurants: [
      { name: "Peshawri", cuisine: "North Indian", priceLevel: 4, note: "ITC Mughal fine-dining institution" },
      { name: "Pinch of Spice", cuisine: "North Indian", priceLevel: 2, note: "Agra tourist-area favourite" },
      { name: "Esphahan", cuisine: "Indian fine dining", priceLevel: 4, note: "Oberoi Amarvilas signature restaurant" },
      { name: "Joney's Place", cuisine: "Indian", priceLevel: 1, note: "Taj Ganj backpacker classic" }
    ],
    stays: [
      { name: "The Oberoi Amarvilas", area: "Taj East Gate", priceLevel: 4, note: "Taj-view luxury icon" },
      { name: "ITC Mughal", area: "Fatehabad Road", priceLevel: 4, note: "Mughal-garden luxury resort" },
      { name: "Taj Hotel & Convention Centre Agra", area: "Taj East Gate", priceLevel: 3, note: "Taj-view tourist favourite" }
    ],
  },
  aswan: {
    restaurants: [
      { name: "1902 Restaurant", cuisine: "French", priceLevel: 4, note: "Old Cataract Hotel fine dining" },
      { name: "El-Masry Restaurant", cuisine: "Egyptian", priceLevel: 2, note: "Local Egyptian institution" },
      { name: "Panorama Restaurant & Bar", cuisine: "Nubian-Egyptian", priceLevel: 2, note: "Nubian village dining experience" },
      { name: "Chef Khalil", cuisine: "Seafood", priceLevel: 2, note: "Nile fish specialist" }
    ],
    stays: [
      { name: "Sofitel Legend Old Cataract Aswan", area: "Nile corniche", priceLevel: 4, note: "Victorian Nile legend since 1899" },
      { name: "Mövenpick Resort Aswan", area: "Elephantine Island", priceLevel: 4, note: "Island resort with Nile views" },
      { name: "Basma Hotel", area: "East Bank", priceLevel: 3, note: "Garden hotel tourist favourite" }
    ],
  },
  atlanta: {
    restaurants: [
      { name: "Mary Mac's Tea Room", cuisine: "Southern", priceLevel: 2, note: "Atlanta meat-and-three institution" },
      { name: "The Varsity", cuisine: "American", priceLevel: 1, note: "Classic drive-in landmark" },
      { name: "Bacchanalia", cuisine: "American fine dining", priceLevel: 4, note: "Westside fine-dining favourite" },
      { name: "Folk Art Restaurant", cuisine: "Southern", priceLevel: 2, note: "Local Southern favourite" }
    ],
    stays: [
      { name: "St. Regis Atlanta", area: "Buckhead", priceLevel: 4, note: "Buckhead luxury landmark" },
      { name: "Four Seasons Hotel Atlanta", area: "Midtown", priceLevel: 4, note: "Midtown arts-district luxury" },
      { name: "The Georgian Terrace", area: "Midtown", priceLevel: 3, note: "Historic hotel by Fox Theatre" }
    ],
  },
  austin: {
    restaurants: [
      { name: "Franklin Barbecue", cuisine: "BBQ", priceLevel: 2, note: "World-famous brisket queue" },
      { name: "Uchi", cuisine: "Japanese", priceLevel: 4, note: "Tyson Cole sushi institution" },
      { name: "Veracruz All Natural", cuisine: "Tacos", priceLevel: 1, note: "Breakfast taco favourite" },
      { name: "Jeffrey's", cuisine: "American fine dining", priceLevel: 4, note: "Clarksville special-occasion pick" }
    ],
    stays: [
      { name: "Hotel Saint Cecilia", area: "South Congress", priceLevel: 4, note: "Rock-and-roll boutique luxury" },
      { name: "Fairmont Austin", area: "Downtown", priceLevel: 4, note: "Convention-centre luxury tower" },
      { name: "South Congress Hotel", area: "SoCo", priceLevel: 3, note: "SoCo design hotel" }
    ],
  },
  banff: {
    restaurants: [
      { name: "Grizzly House", cuisine: "Fondue", priceLevel: 2, note: "Banff fondue institution since 1967" },
      { name: "Magpie and Stump", cuisine: "Mexican", priceLevel: 2, note: "Banff Avenue favourite" },
      { name: "Three Ravens Restaurant", cuisine: "Canadian fine dining", priceLevel: 3, note: "Banff Centre views" },
      { name: "Eden at Fairmont Banff Springs", cuisine: "Fine dining", priceLevel: 4, note: "Banff Springs luxury dining" }
    ],
    stays: [
      { name: "Fairmont Banff Springs", area: "Banff town", priceLevel: 4, note: "Castle in the Rockies icon" },
      { name: "Fairmont Chateau Lake Louise", area: "Lake Louise", priceLevel: 4, note: "Lakefront luxury landmark" },
      { name: "Banff Caribou Lodge and Spa", area: "Banff town", priceLevel: 3, note: "Family-friendly Banff Avenue area" }
    ],
  },
  bilbao: {
    restaurants: [
      { name: "Azurmendi", cuisine: "Basque fine dining", priceLevel: 4, note: "Three-Michelin-star landmark (Larrabetzu, near Bilbao)" },
      { name: "Gure Toko", cuisine: "Pintxos", priceLevel: 2, note: "Casco Viejo institution" },
      { name: "Sorginzulo", cuisine: "Pintxos", priceLevel: 2, note: "Plaza Nueva classic" },
      { name: "Etxanobe", cuisine: "Basque", priceLevel: 3, note: "Guggenheim-area fine dining" }
    ],
    stays: [
      { name: "Hotel Carlton", area: "Abando", priceLevel: 4, note: "Gran Vía Belle Époque landmark" },
      { name: "Gran Hotel Domine Bilbao", area: "Guggenheim", priceLevel: 4, note: "Facing Gehry's titanium curves" },
      { name: "Hotel Miró", area: "Guggenheim", priceLevel: 3, note: "Design hotel near museum" }
    ],
  },
  bodrum: {
    restaurants: [
      { name: "Orfoz Restaurant", cuisine: "Seafood", priceLevel: 3, note: "Harbour institution since 1946" },
      { name: "Sofra Restaurant", cuisine: "Turkish", priceLevel: 2, note: "Old town local favourite" },
      { name: "Maritimo", cuisine: "Italian-Seafood", priceLevel: 3, note: "Marina fine dining" },
      { name: "Keçi Restaurant", cuisine: "Aegean", priceLevel: 2, note: "Gümüşlük waterfront classic" }
    ],
    stays: [
      { name: "Mandarin Oriental Bodrum", area: "Paradise Bay", priceLevel: 4, note: "Aegean peninsula luxury resort" },
      { name: "Caresse, a Luxury Collection Resort", area: "Bardakci Bay", priceLevel: 4, note: "Bay-view luxury resort" },
      { name: "Yalikavak Marina Garden Hotel", area: "Yalıkavak", priceLevel: 3, note: "Marina-area boutique favourite" }
    ],
  },
  boracay: {
    restaurants: [
      { name: "Dos Mestizos", cuisine: "Spanish-Filipino", priceLevel: 2, note: "Station 2 institution" },
      { name: "Nonie's", cuisine: "Filipino", priceLevel: 2, note: "Filipino breakfast favourite" },
      { name: "Prisma", cuisine: "Mediterranean", priceLevel: 3, note: "Station 1 upscale dining" },
      { name: "Smoke Resto", cuisine: "Filipino BBQ", priceLevel: 1, note: "Budget D'Talipapa classic" }
    ],
    stays: [
      { name: "Shangri-La Boracay", area: "Punta Bunga Cove", priceLevel: 4, note: "Northwest cove luxury resort" },
      { name: "Discovery Shores Boracay", area: "Station 1", priceLevel: 4, note: "White Beach luxury favourite" },
      { name: "Henann Regency Resort & Spa", area: "Station 2", priceLevel: 3, note: "Central beachfront resort" }
    ],
  },
  bordeaux: {
    restaurants: [
      { name: "Le Pressoir d'Argent", cuisine: "French fine dining", priceLevel: 4, note: "Gordon Ramsay at Grand Hôtel de Bordeaux" },
      { name: "La Tupina", cuisine: "Southwest French", priceLevel: 3, note: "Rustic fire-cooking institution" },
      { name: "Le Chien de Pavlov", cuisine: "French bistro", priceLevel: 2, note: "Creative bistro favourite" },
      { name: "Chez Dupont", cuisine: "Bistro", priceLevel: 2, note: "Classic Bordeaux bistro" }
    ],
    stays: [
      { name: "InterContinental Bordeaux – Le Grand Hotel", area: "Place de la Comédie", priceLevel: 4, note: "Neoclassical city landmark" },
      { name: "Yndo Hotel", area: "Central Bordeaux", priceLevel: 4, note: "Boutique design hotel" },
      { name: "Hotel de Sèze", area: "Golden Triangle", priceLevel: 3, note: "Central boutique favourite" }
    ],
  },
  cairns: {
    restaurants: [
      { name: "Ochre Restaurant", cuisine: "Modern Australian", priceLevel: 3, note: "Native-ingredient institution" },
      { name: "Prawn Star", cuisine: "Seafood", priceLevel: 2, note: "Harbour seafood boats" },
      { name: "Dundee's on the Waterfront", cuisine: "Seafood", priceLevel: 2, note: "Esplanade tourist classic" },
      { name: "C'est Bon Restaurant", cuisine: "French", priceLevel: 3, note: "Cairns fine-dining pick" }
    ],
    stays: [
      { name: "Shangri-La The Marina, Cairns", area: "Marina", priceLevel: 4, note: "Reef-departure marina luxury" },
      { name: "Riley, a Crystalbrook Collection Resort", area: "Esplanade", priceLevel: 4, note: "Esplanade design luxury" },
      { name: "Pacific Hotel Cairns", area: "Esplanade", priceLevel: 3, note: "Central lagoon-area favourite" }
    ],
  },
  cappadocia: {
    restaurants: [
      { name: "Seten Restaurant", cuisine: "Anatolian", priceLevel: 2, note: "Göreme cave-dining institution" },
      { name: "Topdeck Cave Restaurant", cuisine: "Turkish", priceLevel: 2, note: "Panoramic Göreme views" },
      { name: "Ziggy's Shoppe", cuisine: "Turkish-International", priceLevel: 2, note: "Göreme favourite" },
      { name: "Local Cave House Restaurant", cuisine: "Turkish", priceLevel: 2, note: "Traditional testi kebab specialist" }
    ],
    stays: [
      { name: "Museum Hotel", area: "Uçhisar", priceLevel: 4, note: "Luxury cave hotel with antiques" },
      { name: "Argos in Cappadocia", area: "Uçhisar", priceLevel: 4, note: "Monastery-complex luxury caves" },
      { name: "Sultan Cave Suites", area: "Göreme", priceLevel: 3, note: "Rooftop balloon-view favourite" }
    ],
  },
  charleston: {
    restaurants: [
      { name: "Husk", cuisine: "Southern", priceLevel: 3, note: "Sean Brock Lowcountry institution" },
      { name: "FIG", cuisine: "Farm-to-table", priceLevel: 3, note: "James Beard destination" },
      { name: "Poogan's Porch", cuisine: "Southern", priceLevel: 2, note: "Historic house restaurant" },
      { name: "Callie's Hot Little Biscuit", cuisine: "Southern", priceLevel: 1, note: "Biscuit breakfast favourite" }
    ],
    stays: [
      { name: "Belmond Charleston Place", area: "Downtown", priceLevel: 4, note: "Charleston luxury landmark" },
      { name: "The Dewberry Charleston", area: "Marion Square", priceLevel: 4, note: "Mid-century modern luxury" },
      { name: "Zero George Street", area: "Ansonborough", priceLevel: 3, note: "Boutique inn favourite" }
    ],
  },
  crete: {
    restaurants: [
      { name: "Peskesi", cuisine: "Cretan", priceLevel: 2, note: "Farm-to-table Cretan institution" },
      { name: "Parasties", cuisine: "Cretan", priceLevel: 2, note: "Old town local favourite" },
      { name: "Loukoula", cuisine: "Cretan", priceLevel: 2, note: "Harbour-view dining" },
      { name: "Daphnis & Chloe", cuisine: "Greek", priceLevel: 3, note: "Upscale Heraklion dining" }
    ],
    stays: [
      { name: "GDM Megaron Hotel", area: "Heraklion harbour", priceLevel: 4, note: "Historic harbour luxury" },
      { name: "Lato Boutique Hotel", area: "Old harbour", priceLevel: 3, note: "Harbour-view boutique" },
      { name: "Atrion Hotel", area: "City centre", priceLevel: 3, note: "Central business-district favourite" }
    ],
  },
  denver: {
    restaurants: [
      { name: "Frasca Food and Wine", cuisine: "Italian", priceLevel: 4, note: "Boulder fine-dining icon (near Denver)" },
      { name: "Mercantile Dining & Provision", cuisine: "American", priceLevel: 3, note: "Union Station institution" },
      { name: "Snooze an A.M. Eatery", cuisine: "Brunch", priceLevel: 2, note: "Denver brunch favourite" },
      { name: "Biker Jim's Gourmet Dogs", cuisine: "Hot dogs", priceLevel: 1, note: "Denver street-food institution" }
    ],
    stays: [
      { name: "The Brown Palace Hotel and Spa", area: "Downtown", priceLevel: 4, note: "Historic triangular landmark since 1892" },
      { name: "The Crawford Hotel", area: "Union Station", priceLevel: 4, note: "Inside restored Union Station" },
      { name: "Halcyon, a hotel in Cherry Creek", area: "Cherry Creek", priceLevel: 3, note: "Boutique shopping-district favourite" }
    ],
  },
  fez: {
    restaurants: [
      { name: "Nur", cuisine: "Moroccan fine dining", priceLevel: 4, note: "Chef Najat Kaanache destination" },
      { name: "Chez Rachid", cuisine: "Moroccan", priceLevel: 2, note: "Medina rooftop favourite" },
      { name: "Ruined Garden", cuisine: "Moroccan", priceLevel: 2, note: "Riad garden dining" },
      { name: "Café Clock", cuisine: "Fusion", priceLevel: 2, note: "Medina cultural café institution" }
    ],
    stays: [
      { name: "Riad Fès", area: "Medina", priceLevel: 4, note: "Relais & Châteaux medina luxury" },
      { name: "Palais Amani", area: "Medina", priceLevel: 4, note: "Garden riad boutique luxury" },
      { name: "Riad Laaroussa", area: "Medina", priceLevel: 3, note: "Restored palace riad favourite" }
    ],
  },
  fiji: {
    restaurants: [
      { name: "Tu's Place", cuisine: "Fijian-Chinese", priceLevel: 2, note: "Nadi local institution" },
      { name: "Sahara Turkish Kebab", cuisine: "Turkish", priceLevel: 1, note: "Nadi expat favourite" },
      { name: "Bonefish Fiji", cuisine: "Seafood", priceLevel: 2, note: "Denarau marina dining" },
      { name: "Taste Restaurant at Radisson Blu", cuisine: "International", priceLevel: 3, note: "Denarau resort dining" }
    ],
    stays: [
      { name: "Radisson Blu Resort Fiji Denarau Island", area: "Denarau", priceLevel: 4, note: "Denarau marina resort hub" },
      { name: "Sofitel Fiji Resort & Spa Denarau", area: "Denarau", priceLevel: 4, note: "Beachfront Denarau luxury" },
      { name: "Mercure Nadi", area: "Nadi", priceLevel: 3, note: "Airport-area tourist base" }
    ],
  },
  frankfurt: {
    restaurants: [
      { name: "Lafleur", cuisine: "Fine dining", priceLevel: 4, note: "Two-Michelin-star Palmengarten" },
      { name: "Atschel", cuisine: "Apple-wine tavern", priceLevel: 2, note: "Sachsenhausen institution since 1848" },
      { name: "Kleinmarkthalle stalls", cuisine: "Market food", priceLevel: 1, note: "Downtown market hall classics" },
      { name: "Main Nizza", cuisine: "Mediterranean", priceLevel: 2, note: "Riverfront dining favourite" }
    ],
    stays: [
      { name: "Jumeirah Frankfurt", area: "Westend", priceLevel: 4, note: "Thurn-und-Taxis Palais luxury" },
      { name: "Villa Kennedy", area: "Sachsenhausen", priceLevel: 4, note: "Rocco Forte river-area luxury" },
      { name: "25hours Hotel The Trip", area: "Nordend", priceLevel: 3, note: "Design hotel tourist favourite" }
    ],
  },
  galapagos: {
    restaurants: [
      { name: "Il Giardino", cuisine: "Italian-Ecuadorian", priceLevel: 2, note: "Puerto Ayora institution" },
      { name: "Calderón", cuisine: "Seafood", priceLevel: 2, note: "Local seafood favourite" },
      { name: "Galapagos Deli", cuisine: "International", priceLevel: 2, note: "Expat breakfast and lunch staple" },
      { name: "Angermeyer Point", cuisine: "Seafood", priceLevel: 3, note: "Waterfront dining by water taxi" }
    ],
    stays: [
      { name: "Finch Bay Galapagos Hotel", area: "Puerto Ayora", priceLevel: 4, note: "Beachfront eco-luxury" },
      { name: "Golden Bay Galapagos", area: "Puerto Ayora", priceLevel: 4, note: "Waterfront boutique hotel" },
      { name: "Hotel Solymar", area: "Puerto Ayora", priceLevel: 3, note: "Avenue Charles Darwin favourite" }
    ],
  },
  galle: {
    restaurants: [
      { name: "A Minute by Tuk Tuk", cuisine: "Sri Lankan-European", priceLevel: 2, note: "Fort institution with courtyard" },
      { name: "The Fort Printers", cuisine: "Fine dining", priceLevel: 3, note: "Boutique hotel restaurant" },
      { name: "Chambers at Fort", cuisine: "Sri Lankan", priceLevel: 2, note: "Fort courtyard favourite" },
      { name: "Wijaya Beach Restaurant", cuisine: "Seafood", priceLevel: 2, note: "Unawatuna beach classic" }
    ],
    stays: [
      { name: "Amangalla", area: "Galle Fort", priceLevel: 4, note: "Dutch colonial Aman icon" },
      { name: "Fort Bazaar", area: "Galle Fort", priceLevel: 3, note: "Boutique fort hotel" },
      { name: "Jetwing Lighthouse", area: "Galle", priceLevel: 3, note: "Geoffrey Bawa-designed resort" }
    ],
  },
  goa: {
    restaurants: [
      { name: "Vinayak Family Restaurant", cuisine: "Goan", priceLevel: 1, note: "Assagao local favourite" },
      { name: "Gunpowder", cuisine: "South Indian", priceLevel: 2, note: "Assagao cult favourite" },
      { name: "Fisherman's Wharf", cuisine: "Seafood", priceLevel: 2, note: "Candolim waterfront institution" },
      { name: "The Black Sheep Bistro", cuisine: "Continental-Goan", priceLevel: 3, note: "Panaji fine-dining pick" }
    ],
    stays: [
      { name: "Taj Exotica Resort & Spa", area: "Benaulim", priceLevel: 4, note: "South Goa luxury resort" },
      { name: "W Goa", area: "Vagator", priceLevel: 4, note: "North Goa design hotel" },
      { name: "Alila Diwa Goa", area: "Majorda", priceLevel: 3, note: "South Goa boutique resort" }
    ],
  },
  granada: {
    restaurants: [
      { name: "Restaurante Carmen de San Miguel", cuisine: "Andalusian", priceLevel: 3, note: "Albaicín terrace institution" },
      { name: "Los Manueles", cuisine: "Tapas", priceLevel: 2, note: "Centro granada classic since 1917" },
      { name: "La Sitarilla", cuisine: "Tapas", priceLevel: 1, note: "Generous free tapas favourite" },
      { name: "Restaurante Ruta del Azafrán", cuisine: "Andalusian", priceLevel: 3, note: "Alhambra-area fine dining" }
    ],
    stays: [
      { name: "Alhambra Palace Hotel", area: "Alhambra hill", priceLevel: 4, note: "Belle-époque hilltop landmark" },
      { name: "Parador de Granada", area: "Alhambra grounds", priceLevel: 4, note: "Stay inside the monument complex" },
      { name: "Hotel Casa 1800 Granada", area: "Albaicín", priceLevel: 3, note: "Alhambra-view boutique" }
    ],
  },
  guadalajara: {
    restaurants: [
      { name: "Alcalde", cuisine: "Contemporary Mexican", priceLevel: 3, note: "World-ranked modern Mexican" },
      { name: "La Chata", cuisine: "Jaliscan", priceLevel: 1, note: "Torta ahogada institution" },
      { name: "Birrieria Las Nueve Esquinas", cuisine: "Birria", priceLevel: 1, note: "Birria classic since 1939" },
      { name: "Santo Coyote", cuisine: "Mexican", priceLevel: 2, note: "Tlaquepaque garden favourite" }
    ],
    stays: [
      { name: "Hotel Demetria", area: "Lafayette", priceLevel: 4, note: "Design boutique luxury" },
      { name: "Quinta Real Guadalajara", area: "Zapopan", priceLevel: 4, note: "Colonial hacienda luxury" },
      { name: "Hotel Morales Historical & Colonial", area: "Centro", priceLevel: 3, note: "Downtown historic favourite" }
    ],
  },
  hangzhou: {
    restaurants: [
      { name: "Lou Wai Lou", cuisine: "Hangzhou", priceLevel: 3, note: "West Lake institution since 1848" },
      { name: "Zhi Wei Guan", cuisine: "Hangzhou", priceLevel: 2, note: "Classic dim sum and local dishes" },
      { name: "Grandma's Home", cuisine: "Zhejiang", priceLevel: 1, note: "Popular local chain" },
      { name: "Green Tea Restaurant", cuisine: "Chinese", priceLevel: 2, note: "Modern Hangzhou favourite" }
    ],
    stays: [
      { name: "Four Seasons Hotel Hangzhou at West Lake", area: "West Lake", priceLevel: 4, note: "Lakefront luxury landmark" },
      { name: "Amanfayun", area: "Lingyin Temple area", priceLevel: 4, note: "Temple-village luxury retreat" },
      { name: "Midtown Shangri-La Hangzhou", area: "Downtown", priceLevel: 3, note: "Central business-district favourite" }
    ],
  },
  hobart: {
    restaurants: [
      { name: "The Source Restaurant at MONA", cuisine: "Contemporary Australian", priceLevel: 3, note: "MONA fine dining" },
      { name: "Diverse Taste", cuisine: "Modern Australian", priceLevel: 3, note: "Waterfront institution" },
      { name: "Ball and Chain Grill", cuisine: "Steakhouse", priceLevel: 2, note: "Salamanca steakhouse classic" },
      { name: "Drunken Admiral", cuisine: "Seafood", priceLevel: 2, note: "Historic waterfront favourite" }
    ],
    stays: [
      { name: "MACq 01 Hotel", area: "Waterfront", priceLevel: 4, note: "Storytelling design hotel on harbour" },
      { name: "Henry Jones Art Hotel", area: "Waterfront", priceLevel: 4, note: "Jam factory heritage luxury" },
      { name: "Lenna of Hobart", area: "Battery Point", priceLevel: 3, note: "Harbour-view heritage hotel" }
    ],
  },
  "hoi-an": {
    restaurants: [
      { name: "Morning Glory", cuisine: "Vietnamese", priceLevel: 2, note: "Ms Vy Nguyen's Hoi An classic" },
      { name: "Banh Mi Phuong", cuisine: "Vietnamese", priceLevel: 1, note: "Famous Anthony Bourdain stop" },
      { name: "Secret Garden", cuisine: "Vietnamese", priceLevel: 2, note: "Rooftop garden favourite" },
      { name: "Nu Eatery", cuisine: "Vietnamese fusion", priceLevel: 2, note: "Intimate chef-driven spot" }
    ],
    stays: [
      { name: "Anantara Hoi An Resort", area: "Cua Dai Beach", priceLevel: 4, note: "River-meets-sea luxury resort" },
      { name: "Hotel Royal Hoi An", area: "Ancient Town edge", priceLevel: 3, note: "MGallery heritage stay" },
      { name: "Little Hoi An Beach Boutique Hotel", area: "Cua Dai", priceLevel: 3, note: "Beachside boutique favourite" }
    ],
  },
  honolulu: {
    restaurants: [
      { name: "Helena's Hawaiian Food", cuisine: "Hawaiian", priceLevel: 1, note: "Local Hawaiian classic" },
      { name: "Ono Seafood", cuisine: "Poke", priceLevel: 1, note: "Takeout poke favourite" },
      { name: "Marukame Udon", cuisine: "Japanese", priceLevel: 1, note: "Waikiki udon institution" },
      { name: "Chef Mavro", cuisine: "Hawaii Regional", priceLevel: 4, note: "Fine-dining Honolulu landmark" }
    ],
    stays: [
      { name: "Halekulani", area: "Waikiki", priceLevel: 4, note: "Beachfront luxury icon" },
      { name: "The Royal Hawaiian", area: "Waikiki", priceLevel: 4, note: "Pink Palace historic resort" },
      { name: "Moana Surfrider", area: "Waikiki", priceLevel: 3, note: "Historic beachfront tourist favourite" }
    ],
  },
  ibiza: {
    restaurants: [
      { name: "La Brasa", cuisine: "Mediterranean", priceLevel: 3, note: "Ibiza Town fine-dining favourite" },
      { name: "Can Pujol", cuisine: "Seafood", priceLevel: 2, note: "Old town institution since 1920" },
      { name: "El Bigotes", cuisine: "Seafood", priceLevel: 2, note: "Cala Mastella no-frills classic" },
      { name: "Babylon Beach Club", cuisine: "Mediterranean", priceLevel: 3, note: "Santa Eulària beachfront dining" }
    ],
    stays: [
      { name: "Six Senses Ibiza", area: "Cala Xarraca", priceLevel: 4, note: "North-coast wellness luxury" },
      { name: "Nobu Hotel Ibiza Bay", area: "Talamanca", priceLevel: 4, note: "Talamanca Bay design hotel" },
      { name: "Hotel Montesol", area: "Ibiza Town", priceLevel: 3, note: "Dalt Vila boutique since 1933" }
    ],
  },
  iguazu: {
    restaurants: [
      { name: "Rafain Churrascaria", cuisine: "Brazilian BBQ", priceLevel: 3, note: "Dinner show institution" },
      { name: "Bufalo Branco", cuisine: "Churrascaria", priceLevel: 2, note: "All-you-can-eat rodízio classic" },
      { name: "Porto Canoas", cuisine: "Buffet", priceLevel: 2, note: "Inside national park buffet" },
      { name: "El Quincho del Tío Querido", cuisine: "Argentine steak", priceLevel: 2, note: "Cross-border steak favourite" }
    ],
    stays: [
      { name: "Belmond Hotel das Cataratas", area: "Inside national park", priceLevel: 4, note: "Only hotel inside Brazilian park" },
      { name: "Wish Resort Golf Convention Foz do Iguaçu", area: "Parque das Aves area", priceLevel: 4, note: "Resort near falls entrance" },
      { name: "Hotel Águas do Iguaçu", area: "Central Foz", priceLevel: 3, note: "Central tourist favourite" }
    ],
  },
  innsbruck: {
    restaurants: [
      { name: "Die Pötz", cuisine: "Tyrolean", priceLevel: 2, note: "Old town institution" },
      { name: "Stiftskeller", cuisine: "Austrian", priceLevel: 2, note: "Historic cellar dining" },
      { name: "iTi Austrian Food & Drinks", cuisine: "Modern Austrian", priceLevel: 2, note: "Contemporary Tyrolean favourite" },
      { name: "Restaurant Sacher Innsbruck", cuisine: "Austrian", priceLevel: 3, note: "Sacher torte and fine dining" }
    ],
    stays: [
      { name: "Grand Hotel Europa", area: "Central Innsbruck", priceLevel: 4, note: "Historic luxury opposite train station" },
      { name: "AC Hotel by Marriott Innsbruck", area: "Old Town edge", priceLevel: 3, note: "Modern central hotel" },
      { name: "Hotel Innsbruck", area: "Old Town", priceLevel: 3, note: "Rooftop pool Old Town favourite" }
    ],
  },
  interlaken: {
    restaurants: [
      { name: "Stella", cuisine: "Swiss", priceLevel: 3, note: "Victoria-Jungfrau Grand Hotel fine dining" },
      { name: "Husi Bierhaus", cuisine: "Swiss-German", priceLevel: 2, note: "Local beer-hall institution" },
      { name: "Goldener Anker", cuisine: "Swiss", priceLevel: 2, note: "Old town Interlaken classic" },
      { name: "Restaurant Taverne", cuisine: "Swiss", priceLevel: 2, note: "Höheweg tourist favourite" }
    ],
    stays: [
      { name: "Victoria-Jungfrau Grand Hotel & Spa", area: "Höheweg", priceLevel: 4, note: "Belle Époque alpine luxury icon" },
      { name: "Hotel Schweizerhof Bern & Spa", area: "Bern (day trip)", priceLevel: 4, note: "Bern luxury base for Interlaken" },
      { name: "Hotel Interlaken", area: "Central Interlaken", priceLevel: 3, note: "Historic central tourist hotel" }
    ],
  },
  jaipur: {
    restaurants: [
      { name: "Niros", cuisine: "North Indian", priceLevel: 2, note: "MI Road institution since 1949" },
      { name: "Peacock Rooftop Restaurant", cuisine: "Indian", priceLevel: 2, note: "Hotel Pearl Palace rooftop favourite" },
      { name: "1135 AD", cuisine: "Rajasthani", priceLevel: 3, note: "Amber Fort fine-dining setting" },
      { name: "Laxmi Mishthan Bhandar (LMB)", cuisine: "Sweets & snacks", priceLevel: 1, note: "Johari Bazaar sweet institution" }
    ],
    stays: [
      { name: "Rambagh Palace", area: "Bhawani Singh Road", priceLevel: 4, note: "Taj maharaja palace icon" },
      { name: "Samode Haveli", area: "Old city", priceLevel: 4, note: "Heritage haveli luxury" },
      { name: "Shahpura House", area: "Durgapura", priceLevel: 3, note: "Boutique heritage hotel" }
    ],
  },
  jeju: {
    restaurants: [
      { name: "Dombedon", cuisine: "Korean BBQ", priceLevel: 2, note: "Black pork specialist" },
      { name: "Myeongjin Jeonbok", cuisine: "Abalone", priceLevel: 2, note: "Abalone institution near coast" },
      { name: "Sister's Noodles", cuisine: "Korean", priceLevel: 1, note: "Local noodle favourite" },
      { name: "The Kitchen Salvatore Cuomo", cuisine: "Italian", priceLevel: 3, note: "Seogwipo fine-dining option" }
    ],
    stays: [
      { name: "The Shilla Jeju", area: "Jungmun", priceLevel: 4, note: "Resort-district luxury icon" },
      { name: "Lotte Hotel Jeju", area: "Jungmun", priceLevel: 4, note: "Family resort with pools" },
      { name: "Ramada Plaza Jeju", area: "Jeju City", priceLevel: 3, note: "City-base tourist favourite" }
    ],
  },
  "koh-samui": {
    restaurants: [
      { name: "Coco Tam's", cuisine: "Thai BBQ", priceLevel: 2, note: "Bophut beach fire-show institution" },
      { name: "The Jungle Club", cuisine: "Thai-International", priceLevel: 2, note: "Chaweng hillside views" },
      { name: "Sabienglamp Restaurant", cuisine: "Thai", priceLevel: 2, note: "Local favourite off Chaweng" },
      { name: "H-Bistro at Hansar Samui", cuisine: "International", priceLevel: 3, note: "Beachfront fine dining" }
    ],
    stays: [
      { name: "Four Seasons Resort Koh Samui", area: "Laem Yai", priceLevel: 4, note: "Hillside pool-villa luxury" },
      { name: "Banyan Tree Samui", area: "Lamai", priceLevel: 4, note: "Crescent-bay resort icon" },
      { name: "Chaweng Regent Beach Resort", area: "Chaweng", priceLevel: 3, note: "Central beachfront favourite" }
    ],
  },
  krabi: {
    restaurants: [
      { name: "May and Mark's Restaurant", cuisine: "Thai", priceLevel: 1, note: "Ao Nang budget institution" },
      { name: "KoDam Kitchen", cuisine: "Thai seafood", priceLevel: 2, note: "Ao Nang local favourite" },
      { name: "Railay Bay Resort Restaurant", cuisine: "Thai-International", priceLevel: 2, note: "Railay beachfront dining" },
      { name: "Lae Lay Grill", cuisine: "Seafood", priceLevel: 3, note: "Ao Nang sunset views" }
    ],
    stays: [
      { name: "Rayavadee", area: "Railay", priceLevel: 4, note: "Limestone-cliff luxury icon" },
      { name: "Centara Grand Beach Resort & Villas Krabi", area: "Railay", priceLevel: 4, note: "Private beach resort" },
      { name: "Holiday Inn Resort Krabi Ao Nang", area: "Ao Nang", priceLevel: 3, note: "Family beachfront favourite" }
    ],
  },
  langkawi: {
    restaurants: [
      { name: "Orkid Ria Seafood Restaurant", cuisine: "Seafood", priceLevel: 2, note: "Cenang beach institution" },
      { name: "Red Tomato Garden Café", cuisine: "Western", priceLevel: 2, note: "Expat breakfast favourite" },
      { name: "La Sal at Casa del Mar", cuisine: "Mediterranean", priceLevel: 3, note: "Upscale beachfront dining" },
      { name: "Wan Thai Restaurant", cuisine: "Thai", priceLevel: 2, note: "Kuah town local favourite" }
    ],
    stays: [
      { name: "The Datai Langkawi", area: "Datai Bay", priceLevel: 4, note: "Rainforest-meets-beach luxury icon" },
      { name: "Four Seasons Resort Langkawi", area: "Tanjung Rhu", priceLevel: 4, note: "Mangrove-shore luxury resort" },
      { name: "The Frangipani Langkawi Resort & Spa", area: "Pantai Tengah", priceLevel: 3, note: "Eco-resort beach favourite" }
    ],
  },
  "luang-prabang": {
    restaurants: [
      { name: "Tamarind", cuisine: "Lao", priceLevel: 2, note: "Cooking-class restaurant institution" },
      { name: "L'Elephant", cuisine: "French-Lao", priceLevel: 3, note: "Colonial-era fine dining" },
      { name: "Dyen Sabai", cuisine: "Lao", priceLevel: 2, note: "Bamboo bridge riverside favourite" },
      { name: "Joma Bakery Café", cuisine: "Café", priceLevel: 2, note: "Expat breakfast staple" }
    ],
    stays: [
      { name: "Amantaka", area: "Old town", priceLevel: 4, note: "Aman luxury in former hospital" },
      { name: "Belmond La Résidence Phou Vao", area: "Phou Vao hill", priceLevel: 4, note: "Hilltop colonial resort" },
      { name: "Maison Dalabua", area: "Old town", priceLevel: 3, note: "Lotus-pond boutique hotel" }
    ],
  },
  lucerne: {
    restaurants: [
      { name: "Restaurant Old Swiss House", cuisine: "Swiss", priceLevel: 3, note: "Old town institution since 1858" },
      { name: "Wirtshaus Taube", cuisine: "Swiss", priceLevel: 2, note: "Old town local favourite" },
      { name: "Gourmency", cuisine: "International", priceLevel: 3, note: "Lakefront dining at Hotel Palace" },
      { name: "Bierliebe & Chuchi", cuisine: "Swiss", priceLevel: 2, note: "Craft beer and Swiss plates" }
    ],
    stays: [
      { name: "Hotel Schweizerhof Luzern", area: "Lakefront", priceLevel: 4, note: "Lakefront luxury since 1845" },
      { name: "Hotel Palace Luzern", area: "Nationalquai", priceLevel: 4, note: "Belle Époque lake landmark" },
      { name: "Hotel des Balances", area: "Old Town", priceLevel: 3, note: "Riverside boutique favourite" }
    ],
  },
  luxor: {
    restaurants: [
      { name: "1886 Restaurant", cuisine: "French-Egyptian", priceLevel: 4, note: "Winter Palace fine-dining institution" },
      { name: "Sofra Restaurant", cuisine: "Egyptian", priceLevel: 2, note: "Traditional Egyptian favourite" },
      { name: "Al-Sahaby Lane Restaurant", cuisine: "Egyptian", priceLevel: 2, note: "Nile-view rooftop" },
      { name: "Soft Restaurant", cuisine: "Egyptian", priceLevel: 2, note: "Local tourist-area classic" }
    ],
    stays: [
      { name: "Sofitel Winter Palace Luxor", area: "East Bank Nile", priceLevel: 4, note: "Agatha Christie-era Nile landmark" },
      { name: "Hilton Luxor Resort & Spa", area: "East Bank", priceLevel: 4, note: "Modern Nile resort" },
      { name: "Nefertiti Hotel", area: "East Bank", priceLevel: 3, note: "Rooftop Nile-view favourite" }
    ],
  },
  marrakech: {
    restaurants: [
      { name: "Le Jardin", cuisine: "Moroccan", priceLevel: 2, note: "Medina garden oasis" },
      { name: "Nomad", cuisine: "Modern Moroccan", priceLevel: 2, note: "Rooftop medina favourite" },
      { name: "La Mamounia", cuisine: "Moroccan fine dining", priceLevel: 4, note: "Palace hotel dining institution" },
      { name: "Al Fassia", cuisine: "Moroccan", priceLevel: 3, note: "Women-run restaurant legend" }
    ],
    stays: [
      { name: "La Mamounia", area: "Medina edge", priceLevel: 4, note: "Marrakech palace hotel icon" },
      { name: "Royal Mansour Marrakech", area: "Medina", priceLevel: 4, note: "King-owned riad luxury" },
      { name: "Riad Kniza", area: "Medina", priceLevel: 3, note: "Boutique riad favourite" }
    ],
  },
  mecca: {
    restaurants: [
      { name: "Al Baik", cuisine: "Fast food halal", priceLevel: 1, note: "Saudi institution near pilgrim zones" },
      { name: "Al Tazaj", cuisine: "Rotisserie chicken halal", priceLevel: 1, note: "Pilgrim-area fast favourite" },
      { name: "Makkah Clock Royal Tower, A Fairmont Hotel restaurants", cuisine: "International halal", priceLevel: 4, note: "Clock Tower fine dining" },
      { name: "Hyatt Regency Makkah Al Madinah Restaurant", cuisine: "International halal", priceLevel: 3, note: "Haram-area hotel dining" }
    ],
    stays: [
      { name: "Makkah Clock Royal Tower, A Fairmont Hotel", area: "Abraj Al Bait", priceLevel: 4, note: "Clock Tower Haram-view landmark" },
      { name: "Raffles Makkah Palace", area: "Abraj Al Bait", priceLevel: 4, note: "Luxury pilgrim stay" },
      { name: "Swissôtel Makkah", area: "Ibrahim Al Khalil Road", priceLevel: 4, note: "Haram-proximity luxury hotel" }
    ],
  },
  medina: {
    restaurants: [
      { name: "Arabesque Restaurant", cuisine: "International halal", priceLevel: 3, note: "Pullman Zamzam Madina hotel dining" },
      { name: "Al Baik", cuisine: "Fast food halal", priceLevel: 1, note: "Saudi fried-chicken institution" },
      { name: "Mövenpick Hotel Al Nour Restaurant", cuisine: "International halal", priceLevel: 3, note: "Pilgrim-area hotel dining" },
      { name: "Hardee's / local mall food courts", cuisine: "Halal fast food", priceLevel: 1, note: "Mall dining near approved zones" }
    ],
    stays: [
      { name: "Pullman Zamzam Madina", area: "Central (Muslim guests near mosque)", priceLevel: 4, note: "Pilgrim luxury facing mosque precinct" },
      { name: "Anwar Al Madinah Mövenpick Hotel", area: "Central Medina", priceLevel: 4, note: "Major pilgrim hotel group" },
      { name: "Dar Al Taqwa Hotel", area: "Central Medina", priceLevel: 3, note: "Well-known pilgrim hotel" }
    ],
  },
  nashville: {
    restaurants: [
      { name: "Hattie B's Hot Chicken", cuisine: "Hot chicken", priceLevel: 1, note: "Nashville hot chicken institution" },
      { name: "Prince's Hot Chicken Shack", cuisine: "Hot chicken", priceLevel: 1, note: "Original hot chicken legend" },
      { name: "The Catbird Seat", cuisine: "Tasting menu", priceLevel: 4, note: "Chef's counter destination" },
      { name: "Arnold's Country Kitchen", cuisine: "Meat & three", priceLevel: 1, note: "James Beard American classic" }
    ],
    stays: [
      { name: "The Hermitage Hotel", area: "Downtown", priceLevel: 4, note: "Beaux-Arts Nashville landmark" },
      { name: "Thompson Nashville", area: "The Gulch", priceLevel: 4, note: "Gulch rooftop design hotel" },
      { name: "Noelle", area: "Downtown", priceLevel: 3, note: "Art-deco boutique favourite" }
    ],
  },
  "new-orleans": {
    restaurants: [
      { name: "Commander's Palace", cuisine: "Creole", priceLevel: 4, note: "Garden District institution since 1880" },
      { name: "Café du Monde", cuisine: "Café", priceLevel: 1, note: "Beignet and chicory coffee icon" },
      { name: "Cochon", cuisine: "Cajun", priceLevel: 3, note: "Donald Link Cajun favourite" },
      { name: "Galatoire's", cuisine: "Creole", priceLevel: 3, note: "French Quarter Friday lunch tradition" }
    ],
    stays: [
      { name: "The Roosevelt New Orleans", area: "Central Business District", priceLevel: 4, note: "Waldorf Astoria grand hotel" },
      { name: "Hotel Monteleone", area: "French Quarter", priceLevel: 4, note: "Carousel Bar literary landmark" },
      { name: "Royal Sonesta New Orleans", area: "French Quarter", priceLevel: 3, note: "Bourbon Street area favourite" }
    ],
  },
  oaxaca: {
    restaurants: [
      { name: "Levain", cuisine: "Contemporary Oaxacan", priceLevel: 3, note: "Chef-driven Oaxaca favourite" },
      { name: "Casa Oaxaca", cuisine: "Oaxacan", priceLevel: 3, note: "Zocalo-area fine dining institution" },
      { name: "Pasillo de Humo", cuisine: "Oaxacan", priceLevel: 2, note: "Smoked-meat market favourite" },
      { name: "Itanoní", cuisine: "Antojitos", priceLevel: 1, note: "Tlayuda and masa institution" }
    ],
    stays: [
      { name: "Hotel Casa Oaxaca", area: "Centro", priceLevel: 4, note: "Boutique luxury with restaurant" },
      { name: "Quinta Real Oaxaca", area: "Centro", priceLevel: 4, note: "Former convent luxury" },
      { name: "Hotel CasAntica", area: "Centro", priceLevel: 3, note: "Colonial courtyard favourite" }
    ],
  },
  palawan: {
    restaurants: [
      { name: "KaLui Restaurant", cuisine: "Filipino seafood", priceLevel: 2, note: "Barefoot dining institution" },
      { name: "Badjao Seafront Restaurant", cuisine: "Seafood", priceLevel: 2, note: "Stilt-house waterfront favourite" },
      { name: "Kinabuch's Grill and Bar", cuisine: "Filipino", priceLevel: 2, note: "Local expat favourite" },
      { name: "Baker's Hill", cuisine: "Bakery", priceLevel: 1, note: "Hopia and hopia garden stop" }
    ],
    stays: [
      { name: "Daluyon Beach and Mountain Resort", area: "Sabang", priceLevel: 4, note: "Near underground river" },
      { name: "Hue Hotels Puerto Princesa", area: "City centre", priceLevel: 3, note: "Modern city-base hotel" },
      { name: "Blue Palawan Beach Club", area: "City outskirts", priceLevel: 3, note: "Beach-club resort stay" }
    ],
  },
  pattaya: {
    restaurants: [
      { name: "Mantra Restaurant & Bar", cuisine: "Asian fusion", priceLevel: 3, note: "Hilton Pattaya fine dining" },
      { name: "Ruenthai Restaurant", cuisine: "Thai", priceLevel: 2, note: "Garden-setting local favourite" },
      { name: "The Glass House", cuisine: "Seafood", priceLevel: 2, note: "Beachfront bistro institution" },
      { name: "Cafe des Amis Fine Dining", cuisine: "French", priceLevel: 3, note: "North Pattaya special-occasion pick" }
    ],
    stays: [
      { name: "Hilton Pattaya", area: "Central Pattaya", priceLevel: 4, note: "Central Festival rooftop luxury" },
      { name: "Centara Grand Mirage Beach Resort", area: "North Pattaya", priceLevel: 4, note: "Lagoon-pool family resort" },
      { name: "Avani Pattaya Resort", area: "Central Pattaya", priceLevel: 3, note: "Beach-road tourist favourite" }
    ],
  },
  penang: {
    restaurants: [
      { name: "Kebaya Dining Room", cuisine: "Peranakan", priceLevel: 3, note: "Seven Terraces fine dining" },
      { name: "Siam Road Char Koay Teow", cuisine: "Street food", priceLevel: 1, note: "Legendary wok stall" },
      { name: "Gurney Drive Hawker Centre", cuisine: "Hawker", priceLevel: 1, note: "Classic open-air food centre" },
      { name: "Tek Sen Restaurant", cuisine: "Chinese", priceLevel: 2, note: "Double-roast pork favourite" }
    ],
    stays: [
      { name: "Eastern & Oriental Hotel", area: "Georgetown waterfront", priceLevel: 4, note: "Colonial grande dame since 1885" },
      { name: "Seven Terraces", area: "Georgetown", priceLevel: 4, note: "Peranakan heritage boutique" },
      { name: "Muntri Mews", area: "Georgetown", priceLevel: 3, note: "Converted shophouse boutique" }
    ],
  },
  philadelphia: {
    restaurants: [
      { name: "Pat's King of Steaks", cuisine: "Cheesesteaks", priceLevel: 1, note: "South Philly cheesesteak institution" },
      { name: "Reading Terminal Market stalls", cuisine: "Market food", priceLevel: 1, note: "Amish and local classics under one roof" },
      { name: "Zahav", cuisine: "Israeli", priceLevel: 3, note: "James Beard destination restaurant" },
      { name: "Suraya", cuisine: "Lebanese", priceLevel: 3, note: "Fishtown favourite" }
    ],
    stays: [
      { name: "The Rittenhouse", area: "Rittenhouse Square", priceLevel: 4, note: "Park-side luxury landmark" },
      { name: "Loews Philadelphia Hotel", area: "Center City", priceLevel: 3, note: "PSFS Building historic stay" },
      { name: "Kimpton Hotel Monaco", area: "Old City", priceLevel: 3, note: "Near Independence Hall" }
    ],
  },
  "playa-del-carmen": {
    restaurants: [
      { name: "Alux Restaurant", cuisine: "Mexican", priceLevel: 3, note: "Dining inside a cenote cave" },
      { name: "La Cueva del Chango", cuisine: "Mexican", priceLevel: 2, note: "Jungle breakfast institution" },
      { name: "Johnny Rockets 5th Avenue", cuisine: "American", priceLevel: 2, note: "Quinta Avenida casual classic" },
      { name: "El Fogon", cuisine: "Mexican", priceLevel: 1, note: "Local taco favourite off 5th Ave" }
    ],
    stays: [
      { name: "Rosewood Mayakoba", area: "Mayakoba", priceLevel: 4, note: "Lagoon-laced luxury resort" },
      { name: "Hotel Xcaret Arte", area: "Playacar", priceLevel: 4, note: "All-inclusive park-access luxury" },
      { name: "The Reef 28", area: "Quinta Avenida", priceLevel: 3, note: "Adults-only rooftop pool favourite" }
    ],
  },
  "punta-cana": {
    restaurants: [
      { name: "La Yola", cuisine: "Seafood", priceLevel: 3, note: "Punta Cana Resort & Club overwater dining" },
      { name: "Bamboo Bar", cuisine: "Caribbean", priceLevel: 2, note: "Bavaro beachfront favourite" },
      { name: "Jellyfish Restaurant", cuisine: "Seafood", priceLevel: 3, note: "Bavaro beach icon" },
      { name: "Capitan Cook", cuisine: "Seafood", priceLevel: 2, note: "Local seafood institution" }
    ],
    stays: [
      { name: "Eden Roc Cap Cana", area: "Cap Cana", priceLevel: 4, note: "Relais & Châteaux luxury resort" },
      { name: "Secrets Cap Cana Resort & Spa", area: "Cap Cana", priceLevel: 4, note: "Adults-only all-inclusive luxury" },
      { name: "Barceló Bávaro Palace", area: "Bavaro", priceLevel: 3, note: "Large beachfront all-inclusive" }
    ],
  },
  "quebec-city": {
    restaurants: [
      { name: "Le Saint-Amour", cuisine: "French fine dining", priceLevel: 4, note: "Old Quebec institution" },
      { name: "Chez Ashton", cuisine: "Quebec fast food", priceLevel: 1, note: "Local poutine chain classic" },
      { name: "Le Continental", cuisine: "Steakhouse", priceLevel: 3, note: "Old Quebec tableside flambé institution" },
      { name: "La Buche", cuisine: "Quebecois", priceLevel: 2, note: "Sugar-shack themed favourite" }
    ],
    stays: [
      { name: "Fairmont Le Château Frontenac", area: "Old Quebec", priceLevel: 4, note: "Castle-on-the-cliff icon" },
      { name: "Auberge Saint-Antoine", area: "Old Port", priceLevel: 4, note: "Relais & Châteaux boutique" },
      { name: "Hotel Manoir Victoria", area: "Old Quebec", priceLevel: 3, note: "Central old-town favourite" }
    ],
  },
  rhodes: {
    restaurants: [
      { name: "Mavrikos", cuisine: "Greek", priceLevel: 2, note: "Lindos village institution since 1912" },
      { name: "Alexis Four Seasons", cuisine: "Greek seafood", priceLevel: 2, note: "Old Town harbour favourite" },
      { name: "Marco Polo", cuisine: "Greek", priceLevel: 2, note: "Old Town garden setting" },
      { name: "Hatzikio", cuisine: "Seafood", priceLevel: 2, note: "Mandraki harbour classic" }
    ],
    stays: [
      { name: "Bellevue On The Spot Suites", area: "Old Town", priceLevel: 4, note: "Boutique inside the walls" },
      { name: "Rodos Park Suites & Spa", area: "City centre", priceLevel: 4, note: "Modern luxury near Old Town" },
      { name: "Spirit of the Knights Boutique Hotel", area: "Old Town", priceLevel: 3, note: "Medieval atmosphere boutique" }
    ],
  },
  rotorua: {
    restaurants: [
      { name: "Atticus Finch", cuisine: "Modern NZ", priceLevel: 2, note: "Eat Street institution" },
      { name: "Stratosfare Restaurant & Bar", cuisine: "Buffet", priceLevel: 3, note: "Skyline gondola revolving restaurant" },
      { name: "Pig & Whistle", cuisine: "Pub", priceLevel: 2, note: "Historic pub favourite" },
      { name: "Ti Tapu at Wai Ariki Hot Springs", cuisine: "Māori-inspired", priceLevel: 3, note: "New thermal spa dining" }
    ],
    stays: [
      { name: "Solitaire Lodge", area: "Lake Tarawera", priceLevel: 4, note: "Remote luxury lodge near Rotorua" },
      { name: "Peppers on the Point", area: "Lake Rotorua", priceLevel: 4, note: "Lakefront boutique luxury" },
      { name: "Distinction Rotorua Hotel", area: "City centre", priceLevel: 3, note: "Central tourist favourite" }
    ],
  },
  "san-diego": {
    restaurants: [
      { name: "Oscar's Mexican Seafood", cuisine: "Mexican seafood", priceLevel: 1, note: "Fish-taco favourite" },
      { name: "Point Loma Seafoods", cuisine: "Seafood", priceLevel: 1, note: "Harbor-side classic" },
      { name: "Hash House A Go Go", cuisine: "American", priceLevel: 2, note: "Brunch institution" },
      { name: "Juniper & Ivy", cuisine: "Californian", priceLevel: 3, note: "Little Italy chef-driven favourite" }
    ],
    stays: [
      { name: "Hotel del Coronado", area: "Coronado", priceLevel: 4, note: "Iconic Victorian beach resort" },
      { name: "Pendry San Diego", area: "Gaslamp", priceLevel: 4, note: "Downtown luxury favourite" },
      { name: "La Valencia Hotel", area: "La Jolla", priceLevel: 3, note: "Pink Lady coastal classic" }
    ],
  },
  savannah: {
    restaurants: [
      { name: "The Grey", cuisine: "Southern", priceLevel: 3, note: "Greyhound-station-turned-James Beard restaurant" },
      { name: "Mrs. Wilkes' Dining Room", cuisine: "Southern", priceLevel: 2, note: "Communal boarding-house lunch institution" },
      { name: "The Olde Pink House", cuisine: "Southern", priceLevel: 3, note: "Historic mansion dining" },
      { name: "Leopold's Ice Cream", cuisine: "Ice cream", priceLevel: 1, note: "Century-old ice cream icon" }
    ],
    stays: [
      { name: "The Bohemian Hotel Savannah Riverfront", area: "River Street", priceLevel: 4, note: "Autograph Collection riverfront luxury" },
      { name: "Mansion on Forsyth Park", area: "Forsyth Park", priceLevel: 4, note: "Kessler Collection boutique luxury" },
      { name: "Kehoe House", area: "Columbia Square", priceLevel: 3, note: "Historic inn favourite" }
    ],
  },
  seattle: {
    restaurants: [
      { name: "Piroshky Piroshky", cuisine: "Russian bakery", priceLevel: 1, note: "Pike Place pastry classic" },
      { name: "The Pink Door", cuisine: "Italian", priceLevel: 2, note: "Post Alley tourist favourite" },
      { name: "Toulouse Petit", cuisine: "Cajun / Creole", priceLevel: 2, note: "Lower Queen Anne institution" },
      { name: "Canlis", cuisine: "Pacific Northwest", priceLevel: 4, note: "Seattle fine-dining landmark" }
    ],
    stays: [
      { name: "Four Seasons Hotel Seattle", area: "Downtown waterfront", priceLevel: 4, note: "Bay-view luxury" },
      { name: "Thompson Seattle", area: "Belltown", priceLevel: 4, note: "Design hotel with skyline views" },
      { name: "Hotel Monaco Seattle", area: "Downtown", priceLevel: 3, note: "Colourful Kimpton tourist favourite" }
    ],
  },
  seville: {
    restaurants: [
      { name: "Eslava", cuisine: "Tapas", priceLevel: 2, note: "Award-winning San Lorenzo institution" },
      { name: "El Rinconcillo", cuisine: "Tapas", priceLevel: 2, note: "Oldest bar in Seville since 1670" },
      { name: "La Azotea", cuisine: "Modern tapas", priceLevel: 2, note: "Contemporary tapas favourite" },
      { name: "Abantal", cuisine: "Creative Spanish", priceLevel: 4, note: "Michelin-starred Seville dining" }
    ],
    stays: [
      { name: "Hotel Alfonso XIII", area: "Historic centre", priceLevel: 4, note: "Seville's grand royal hotel" },
      { name: "EME Catedral Mercer", area: "Cathedral", priceLevel: 4, note: "Cathedral-view luxury" },
      { name: "Hotel Las Casas de la Judería", area: "Santa Cruz", priceLevel: 3, note: "Maze-like historic hotel" }
    ],
  },
  "sharm-el-sheikh": {
    restaurants: [
      { name: "Fares Seafood", cuisine: "Seafood", priceLevel: 2, note: "Old Market institution" },
      { name: "El Masrien", cuisine: "Egyptian", priceLevel: 2, note: "Old Sharm local favourite" },
      { name: "Sala Thai", cuisine: "Thai", priceLevel: 2, note: "Naama Bay long-running favourite" },
      { name: "Camel Bar & Roof", cuisine: "International", priceLevel: 2, note: "Naama Bay rooftop classic" }
    ],
    stays: [
      { name: "Four Seasons Resort Sharm El Sheikh", area: "Red Sea Riviera", priceLevel: 4, note: "Luxury reef-access resort" },
      { name: "Rixos Premium Seagate", area: "Nabq Bay", priceLevel: 4, note: "All-inclusive luxury resort" },
      { name: "Iberotel Palace", area: "Naama Bay", priceLevel: 3, note: "Central bay tourist favourite" }
    ],
  },
  tulum: {
    restaurants: [
      { name: "Hartwood", cuisine: "Wood-fired", priceLevel: 3, note: "No-electricity jungle dining institution" },
      { name: "Arca", cuisine: "Contemporary Mexican", priceLevel: 3, note: "Jungle open-fire favourite" },
      { name: "Antiqa Hacienda", cuisine: "Mexican", priceLevel: 2, note: "Town-centre local favourite" },
      { name: "Matcha Mama", cuisine: "Health café", priceLevel: 2, note: "Beach smoothie bowl icon" }
    ],
    stays: [
      { name: "Azulik", area: "Beach zone", priceLevel: 4, note: "Treehouse eco-luxury icon" },
      { name: "Be Tulum", area: "Beach zone", priceLevel: 4, note: "Boutique beach luxury" },
      { name: "Hotel Poc Na Tulum", area: "Town beach", priceLevel: 3, note: "Beachfront mid-range favourite" }
    ],
  },
  udaipur: {
    restaurants: [
      { name: "Ambrai", cuisine: "Indian", priceLevel: 3, note: "Lake-view Amet Haveli institution" },
      { name: "1559 AD", cuisine: "Rajasthani", priceLevel: 2, note: "Heritage haveli dining" },
      { name: "Upre", cuisine: "Indian", priceLevel: 2, note: "Lake Pichola rooftop favourite" },
      { name: "Natraj Dining Hall", cuisine: "Thali", priceLevel: 1, note: "Local thali institution" }
    ],
    stays: [
      { name: "Taj Lake Palace", area: "Lake Pichola", priceLevel: 4, note: "Floating marble palace icon" },
      { name: "The Oberoi Udaivilas", area: "Lake Pichola", priceLevel: 4, note: "Luxury lakeside resort landmark" },
      { name: "Jagat Niwas Palace Hotel", area: "Hanuman Ghat", priceLevel: 3, note: "Heritage haveli on the lake" }
    ],
  },
  uyuni: {
    restaurants: [
      { name: "Minuteman Revolutionary Pizza", cuisine: "Pizza", priceLevel: 2, note: "Uyuni expat institution" },
      { name: "Toctos", cuisine: "Bolivian", priceLevel: 2, note: "Local Bolivian favourite" },
      { name: "Pizza Ristorante", cuisine: "Italian", priceLevel: 2, note: "Post-tour comfort food" },
      { name: "Lithium Restaurant", cuisine: "International", priceLevel: 2, note: "Hotel Luna Salada dining" }
    ],
    stays: [
      { name: "Hotel Palacio de Sal", area: "Salt flat edge", priceLevel: 4, note: "Salt-block luxury hotel icon" },
      { name: "Luna Salada Hotel", area: "Salt flat edge", priceLevel: 3, note: "Salt-built boutique hotel" },
      { name: "Hotel Girasoles", area: "Uyuni town", priceLevel: 2, note: "Pre-tour town-base favourite" }
    ],
  },
  varanasi: {
    restaurants: [
      { name: "Kashi Chat Bhandar", cuisine: "Street food", priceLevel: 1, note: "Chaat institution near Godowlia" },
      { name: "Pizzeria Vaatika Café", cuisine: "Indian-Italian", priceLevel: 1, note: "Assi Ghat rooftop favourite" },
      { name: "Brown Bread Bakery", cuisine: "Bakery", priceLevel: 1, note: "Organic rooftop near ghats" },
      { name: "Bona Restaurant", cuisine: "North Indian", priceLevel: 2, note: "Riverside hotel restaurant" }
    ],
    stays: [
      { name: "Taj Ganges Varanasi", area: "Nadesar", priceLevel: 4, note: "City luxury landmark" },
      { name: "BrijRama Palace", area: "Darbhanga Ghat", priceLevel: 4, note: "Heritage palace on the Ganges" },
      { name: "Ganges View Hotel", area: "Assi Ghat", priceLevel: 3, note: "Ghat-view tourist favourite" }
    ],
  },
  "victoria-falls": {
    restaurants: [
      { name: "The Boma – Dinner & Drum Show", cuisine: "African buffet", priceLevel: 3, note: "Safari dinner institution" },
      { name: "The Three Monkeys", cuisine: "International", priceLevel: 2, note: "Victoria Falls town favourite" },
      { name: "Lookout Café", cuisine: "International", priceLevel: 2, note: "Gorge-view Wild Horizons café" },
      { name: "The Dusty Road Township Experience", cuisine: "Zimbabwean", priceLevel: 2, note: "Authentic township dining" }
    ],
    stays: [
      { name: "Victoria Falls Hotel", area: "Victoria Falls town", priceLevel: 4, note: "Colonial grande dame since 1904" },
      { name: "Matetsi Victoria Falls", area: "Zambezi River", priceLevel: 4, note: "Luxury river lodge" },
      { name: "Ilala Lodge Hotel", area: "Victoria Falls town", priceLevel: 3, note: "Walk-to-falls tourist favourite" }
    ],
  },
  "xi-an": {
    restaurants: [
      { name: "La Maison de Han", cuisine: "Shaanxi", priceLevel: 2, note: "Refined local cuisine" },
      { name: "Old Xi'an Restaurant", cuisine: "Shaanxi", priceLevel: 2, note: "Classic tourist-area favourite" },
      { name: "Jiasan Guantang Baozi", cuisine: "Dumplings", priceLevel: 1, note: "Soup dumpling institution" },
      { name: "Tong Sheng Xiang", cuisine: "Shaanxi", priceLevel: 2, note: "Yang rou pao mo specialist" }
    ],
    stays: [
      { name: "The Ritz-Carlton Xi'an", area: "Gao Xin district", priceLevel: 4, note: "Modern luxury landmark" },
      { name: "Sofitel Legend People's Grand Hotel Xi'an", area: "Downtown", priceLevel: 4, note: "1950s heritage grand hotel" },
      { name: "Grand Mercure Xi'an on Renmin Square", area: "City centre", priceLevel: 3, note: "Central square tourist base" }
    ],
  },
  beijing: {
    restaurants: [
      { name: "Jing Yaa Tang", cuisine: "Peking duck", priceLevel: 4, note: "Opulent duck ceremony at The Opposite House" },
      { name: "Dali Courtyard", cuisine: "Yunnan", priceLevel: 2, note: "Hutong courtyard favourite for cross-bridge noodles" },
      { name: "TRB Hutong", cuisine: "Modern European", priceLevel: 4, note: "Temple-restaurant fine dining near Forbidden City" },
      { name: "Duck de Chine", cuisine: "Peking duck", priceLevel: 3, note: "1949 The Hidden City duck specialist" }
    ],
    stays: [
      { name: "The Peninsula Beijing", area: "Wangfujing", priceLevel: 4, note: "Classic luxury on the Golden Resources shopping strip" },
      { name: "Aman at Summer Palace", area: "Summer Palace", priceLevel: 4, note: "Imperial garden resort beside UNESCO palace grounds" },
      { name: "Hotel Éclat Beijing", area: "Parkview Green", priceLevel: 4, note: "Private-art-collection boutique in avant-garde pyramid" }
    ],
  },
  moscow: {
    restaurants: [
      { name: "White Rabbit", cuisine: "Modern Russian", priceLevel: 4, note: "Smolenskaya Passage dome with panoramic tasting menus" },
      { name: "Cafe Pushkin", cuisine: "Russian", priceLevel: 3, note: "Tverskoy Boulevard aristocratic dining institution" },
      { name: "Dr. Zhivago", cuisine: "Russian", priceLevel: 3, note: "National Hotel Red Square-view classic cuisine" },
      { name: "Vatrushka", cuisine: "Modern Russian", priceLevel: 2, note: "Patriarch's Ponds neighbourhood bistro favourite" }
    ],
    stays: [
      { name: "Hotel National", area: "Red Square", priceLevel: 4, note: "1903 landmark facing the Kremlin walls" },
      { name: "Four Seasons Moscow", area: "Red Square", priceLevel: 4, note: "Modern luxury steps from Red Square" },
      { name: "St. Regis Moscow Nikolskaya", area: "Kitay-Gorod", priceLevel: 4, note: "Grande dame on Nikolskaya Street" }
    ],
  },
  manila: {
    restaurants: [
      { name: "Aristocrat Restaurant", cuisine: "Filipino", priceLevel: 2, note: "Roxas Boulevard institution since 1936" },
      { name: "Barbara's Heritage Restaurant", cuisine: "Filipino", priceLevel: 2, note: "Intramuros classic with cultural shows" },
      { name: "Cafe Adriatico", cuisine: "Filipino cafe", priceLevel: 2, note: "Malate landmark for ensaymada and coffee" },
      { name: "Binondo street-food walk", cuisine: "Chinese-Filipino", priceLevel: 1, note: "World's oldest Chinatown — lumpia, siopao, hopia" },
    ],
    stays: [
      { name: "The Manila Hotel", area: "Rizal Park", priceLevel: 4, note: "Historic grand hotel beside Intramuros" },
      { name: "Raffles Makati", area: "Makati", priceLevel: 4, note: "Business-district luxury with spa and butler service" },
      { name: "Sofitel Philippine Plaza Manila", area: "CCP Complex", priceLevel: 3, note: "Manila Bay sunset views" },
    ],
  },
  colombo: {
    restaurants: [
      { name: "Ministry of Crab", cuisine: "Seafood", priceLevel: 4, note: "Dutch Hospital precinct — Sri Lanka's famous crab house" },
      { name: "Gallery Café", cuisine: "Sri Lankan / international", priceLevel: 2, note: "Paradise Road courtyard favourite" },
      { name: "Nihonbashi", cuisine: "Japanese / seafood", priceLevel: 3, note: "Long-running Colombo sushi institution" },
      { name: "Galle Face Green street carts", cuisine: "Street food", priceLevel: 1, note: "Isso wade and corn with ocean breeze" },
    ],
    stays: [
      { name: "Galle Face Hotel", area: "Galle Face", priceLevel: 3, note: "Colonial grande dame on the oceanfront" },
      { name: "Shangri-La Colombo", area: "Galle Face", priceLevel: 4, note: "Modern luxury overlooking the green" },
      { name: "Cinnamon Grand Colombo", area: "City centre", priceLevel: 3, note: "Central tourist favourite with strong dining" },
    ],
  },
  pokhara: {
    restaurants: [
      { name: "Moondance Restaurant", cuisine: "International / Nepali", priceLevel: 2, note: "Lakeside institution with live music evenings" },
      { name: "Orphan's Café", cuisine: "Cafe", priceLevel: 1, note: "Long-running Lakeside backpacker favourite" },
      { name: "Caffe Concerto", cuisine: "Italian / cafe", priceLevel: 2, note: "Phewa Lake-edge pasta and coffee stop" },
      { name: "Lakeside dal bhat thalis", cuisine: "Nepali", priceLevel: 1, note: "Simple local kitchens along the strip" },
    ],
    stays: [
      { name: "Temple Tree Resort & Spa", area: "Lakeside", priceLevel: 3, note: "Garden resort favourite steps from Phewa" },
      { name: "Fishtail Lodge", area: "Phewa Lake", priceLevel: 3, note: "Iconic lakeside lodge with mountain views" },
      { name: "Waterfront Pokhara", area: "Lakeside", priceLevel: 3, note: "Modern rooms facing the lake promenade" },
    ],
  },
  male: {
    restaurants: [
      { name: "Seagull Café Corner", cuisine: "Cafe / international", priceLevel: 2, note: "Malé waterfront institution for breakfast and coffee" },
      { name: "Malé Fish Market stalls", cuisine: "Seafood", priceLevel: 1, note: "Fresh tuna and short-eats where locals shop" },
      { name: "Symphony by Seaside", cuisine: "International", priceLevel: 3, note: "Well-known Malé dining room near the harbour" },
      { name: "Local Market short eats", cuisine: "Maldivian", priceLevel: 1, note: "Hedhikaa evening snacks with tea" },
    ],
    stays: [
      { name: "Hotel Jen Malé by Shangri-La", area: "Malé", priceLevel: 3, note: "Reliable city base before a resort transfer" },
      { name: "Mercure Maldives Malé Airport Hotel", area: "Hulhulé", priceLevel: 3, note: "Transit hotel next to Velana International" },
      { name: "Sala Boutique Hotel", area: "Hulhumalé", priceLevel: 2, note: "Popular Hulhumalé base with beach access" },
    ],
  },
};
