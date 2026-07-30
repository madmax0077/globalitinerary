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
};
