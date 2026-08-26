import type { Article } from "@/lib/types";
import { PHOTOS, unsplash } from "@/lib/images";
import { authors } from "@/data/authors";

/** Full destination guides published under /blog — itinerary, best time, trip cost, FAQs. */
export const destinationGuides: Article[] = [
  {
    id: "dg-top100-2026",
    slug: "top-100-cities-to-visit-2026",
    title: "Top 100 Cities to Visit in 2026: A Practical Traveller’s Ranking",
    excerpt:
      "Our honest Top 100 cities list for 2026 — ranked from major destination-city travel data, with a one-line reason to go and a link to each city guide on Global Itinerary.",
    cover: unsplash(PHOTOS.cityNight, 1600),
    category: "Guides",
    tags: ["Top 100", "Cities", "2026", "Travel Planning", "City Guides", "Best Destinations"],
    author: authors.amelia,
    date: "2026-08-17",
    readingTime: 18,
    featured: true,
    sections: [
      {
        body: "Travellers keep asking which cities are worth the flight in 2026. This Global Itinerary ranking is grounded in destination-city travel patterns (aligned with widely cited city-arrival research) plus essential leisure hubs — every city links to a live guide on this site. Open the full interactive list at /blog/top-100-cities-to-visit-2026.",
      },
      {
        heading: "How we ranked these cities",
        body: "Order follows major destination-city visitor patterns, then adds places travellers deliberately plan entire trips around (Kyoto, Santorini, Queenstown, Cusco, Petra). It is an editorial planning tool, not a government statistic. Always check visas and current travel advice for your passport.",
      },
      {
        heading: "The Top 10 at a glance",
        body: "1 Bangkok · 2 Paris · 3 London · 4 Dubai · 5 Singapore · 6 New York City · 7 Kuala Lumpur · 8 Tokyo · 9 Istanbul · 10 Seoul. See the full Top 100 with regional notes and city-guide links on the complete article page.",
      },
      {
        heading: "How to use this list",
        body: "Choose one primary city, add one complementary stop in the same region, and open each city guide for budgets and itineraries. Use Compare for country-level decisions and the Trip Cost Estimator for daily spend.",
      },
    ],
  },
  {
    id: "dg-top200-2026",
    slug: "top-200-cities-to-visit-2026",
    title: "101–200 City Itineraries: Separate Guides for Each City",
    excerpt:
      "Browse the next hundred city blogs — each destination has its own 5–15 day itinerary post, not one combined ranking.",
    cover: unsplash(PHOTOS.cityNight, 1600),
    category: "Guides",
    tags: ["Top 200", "Cities", "2026", "Travel Planning", "City Guides", "Itineraries"],
    author: authors.amelia,
    date: "2026-08-23",
    readingTime: 4,
    featured: false,
    sections: [
      {
        body: "After the Top 100, these are the next hundred cities travellers actually plan trips around — from Hoi An and Jaipur to Granada, Banff and Perth. Every city has a live guide plus a separate 5–15 day itinerary. Open the full ranking at /blog/top-200-cities-to-visit-2026.",
      },
      {
        heading: "How this list continues the Top 100",
        body: "Ranks 101–200 follow the same editorial method: well-known tourist hubs that already have a city page on Global Itinerary. They are not filler megacities. Always check visas and current travel advice for your passport.",
      },
      {
        heading: "How to use these guides",
        body: "Pick one city as a primary stay, add one complementary stop in the same region, and open the matching N-day plan for costs and FAQs. Pair this list with the Top 100 ranking if you are still choosing a first destination.",
      },
    ],
  },
  {
    id: "dg-bali",
    slug: "7-day-bali-itinerary-trip-cost-2026",
    title: "7-Day Bali Itinerary & Trip Cost Guide (2026)",
    excerpt:
      "Plan the perfect week in Bali: temples, rice terraces, beaches and day trips — plus a realistic trip cost breakdown for budget, mid-range and luxury travellers.",
    cover: unsplash(PHOTOS.bali, 1600),
    category: "Guides",
    tags: ["Bali", "Indonesia", "Itineraries", "Trip Cost", "Best Time to Visit", "Asia"],
    author: authors.amelia,
    date: "2026-08-01",
    readingTime: 14,
    featured: true,
    sections: [
      {
        body: "Bali remains one of the world’s most rewarding island destinations: cliffside temples, emerald rice terraces, surf beaches and jungle retreats within a few hours of each other. This 7-day Bali itinerary is designed for first-time visitors who want culture, scenery and beach time without rushing — and includes a clear trip cost estimate so you can budget with confidence.",
      },
      {
        heading: "Best time to visit Bali",
        body: "The dry season (roughly April–October) is the most comfortable for beaches and day trips. April–June and September are sweet spots: good weather with fewer crowds than July–August. The wet season (November–March) brings short, heavy showers; mornings are often still clear, so it can work for a relaxed trip if you book flexible activities. Avoid Nyepi (Day of Silence) unless you want a full island shutdown for 24 hours.",
      },
      {
        heading: "How many days do you need in Bali?",
        body: "Seven days is ideal for a first visit covering the south coast, Ubud and one major day trip. Ten days lets you add Nusa Penida, Amed or the north. If you only have five days, base yourself in one area (Seminyak/Canggu or Ubud) and take private drivers for day trips rather than changing hotels every night.",
      },
      {
        heading: "Day 1 — Arrival & Seminyak or Canggu",
        body: "Land at Ngurah Rai (DPS) and transfer to Seminyak or Canggu. Keep the day light: beach sunset, a walk along the shore, and dinner at a local warung or beach club. Grab or a pre-booked driver is easier than navigating scooter traffic on day one.",
      },
      {
        heading: "Day 2 — Uluwatu Temple & south coast",
        body: "Head south for Uluwatu Temple on the cliffs, then Padang Padang or Melasti Beach. Stay for the Kecak fire dance at sunset if you can. The Bukit Peninsula is hotter and drier than Ubud — bring water and modest clothing for the temple.",
      },
      {
        heading: "Day 3 — Transfer to Ubud via Tegallalang",
        body: "Drive inland via Tegallalang rice terraces (go early for softer light and fewer crowds). Check into Ubud, then explore Ubud Palace, the Art Market and a quiet café. Evenings in Ubud are cooler and calmer than the south.",
      },
      {
        heading: "Day 4 — Ubud temples & Sacred Monkey Forest",
        body: "Visit the Sacred Monkey Forest Sanctuary, then Tirta Empul for the holy spring ritual (sarong usually available on site). Optional: a nearby waterfall such as Tegenungan or Tukad Cepung. Leave room for a spa or long lunch — Ubud rewards a slower pace.",
      },
      {
        heading: "Day 5 — Gates of Heaven & east Bali",
        body: "Start early for Pura Lempuyang (Gates of Heaven) for the Mount Agung backdrop photo and temple visit. Continue to Tirta Gangga water palace before returning to Ubud. This is a long day — hire a driver and leave before sunrise if you want shorter queues.",
      },
      {
        heading: "Day 6 — Highlands or Nusa Penida",
        body: "Option A: Ulun Danu Bratan on Lake Bratan plus Jatiluwih UNESCO rice terraces. Option B: boat day trip to Nusa Penida (Kelingking, Broken Beach, Angel’s Billabong). Pick one — combining both in a single day is too rushed.",
      },
      {
        heading: "Day 7 — Free morning & departure",
        body: "Coffee, last shopping, or a beach stop near Seminyak if your flight is late. Allow generous transfer time to DPS; south Bali traffic can double journey times in the afternoon.",
      },
      {
        heading: "Bali trip cost (excluding international flights)",
        body: "Rough per-person daily spend in 2026: Budget USD 35–60 (guesthouses, warungs, scooters); Mid-range USD 70–150 (nice hotels or villas, cafés, guided day trips); Luxury USD 200+ (pool villas, private drivers, spas). For seven nights, mid-range travellers often land around USD 600–1,000 on the ground, before flights and shopping. Use our Trip Cost Estimator for a destination-level budget by travel style.",
      },
      {
        heading: "Where to stay in Bali",
        body: "Seminyak/Canggu for beaches and nightlife; Ubud for culture and rice terraces; Nusa Dua/Sanur for calm resorts and families; Uluwatu for cliffs and surf. First-timers often split: three nights south, three to four nights Ubud.",
      },
      {
        heading: "Practical tips",
        body: "Dress modestly at temples. Scooter only if you are confident in chaotic traffic — private drivers are affordable for day trips. Drink bottled water. Respect ceremonies and ask before photographing people. Book popular restaurants and sunrise tours ahead in peak season.",
      },
      {
        heading: "FAQs",
        body: "Is Bali good for first-timers in Asia? Yes — tourism infrastructure is strong and English is widely spoken in tourist areas. Is seven days enough? Yes for a highlights trip. Do you need a visa? Many nationalities get visa on arrival or visa exemption — always check current rules for your passport before you fly.",
      },
    ],
  },
  {
    id: "dg-dubai",
    slug: "dubai-5-day-itinerary-trip-cost-2026",
    title: "5-Day Dubai Itinerary, Best Time to Visit & Trip Cost (2026)",
    excerpt:
      "A clear Dubai city itinerary for first-timers: Downtown, Old Dubai, desert safari, Marina and Palm — plus when to go and what a trip really costs.",
    cover: unsplash(PHOTOS.dubai, 1600),
    category: "Guides",
    tags: ["Dubai", "UAE", "Itineraries", "Trip Cost", "City Break", "Desert"],
    author: authors.sofia,
    date: "2026-08-01",
    readingTime: 12,
    featured: true,
    sections: [
      {
        body: "Dubai packs skyscrapers, souks, beaches and desert into a compact, easy-to-navigate city. Five days is enough for the classic highlights without living in a mall. This Dubai itinerary balances iconic views, Old Dubai character and a desert safari — with honest guidance on best time to visit and trip cost.",
      },
      {
        heading: "Best time to visit Dubai",
        body: "November to March is the sweet spot: daytime temperatures are pleasant for outdoor sightseeing. April and October are warmer but workable. May to September is extremely hot; plan outdoor time early or late, and lean on malls, pools and evening desert trips. Major holidays and shopping festivals raise hotel prices.",
      },
      {
        heading: "Day 1 — Downtown Dubai",
        body: "Check in near Downtown or Business Bay. Explore Dubai Mall, catch the Dubai Fountain show, and book Burj Khalifa (At The Top) for sunset or evening. Dinner in Downtown keeps logistics simple on night one.",
      },
      {
        heading: "Day 2 — Old Dubai & Dubai Creek",
        body: "Visit Al Fahidi Historical Neighbourhood, cross Dubai Creek by abra, and wander the Gold and Spice Souks. Add Dubai Museum or the Coffee Museum if you want more context. This day shows a different side of the city beyond the skyline.",
      },
      {
        heading: "Day 3 — Desert safari",
        body: "Keep the morning free for the beach or a garden visit, then join an afternoon–evening desert safari: dune bashing, camel photos, sunset and dinner under the stars. Book a reputable operator; morning safaris are cooler and quieter if you prefer fewer crowds.",
      },
      {
        heading: "Day 4 — Marina & JBR",
        body: "Walk Dubai Marina, relax at JBR Beach, and enjoy the waterfront at night. Optional yacht cruise or Ain Dubai views when operating. This is your easiest beach day.",
      },
      {
        heading: "Day 5 — Palm Jumeirah & departure",
        body: "Visit The Palm for Atlantis views, Aquaventure or a relaxed brunch. Shop or spa before your flight. Dubai International (DXB) and Al Maktoum (DWC) are different airports — confirm which one you are using.",
      },
      {
        heading: "Dubai trip cost (excluding international flights)",
        body: "Per person per day (2026 estimates): Budget USD 80–120; Mid-range USD 150–250; Luxury USD 300+. Hotels and attractions drive the total. Alcohol, fine dining and theme parks add up quickly. Five mid-range days often run roughly USD 750–1,250 on the ground before shopping.",
      },
      {
        heading: "Where to stay",
        body: "Downtown for first-timers and Burj access; Marina/JBR for beach and nightlife; Deira or Bur Dubai for lower prices near Old Dubai. Metro + occasional taxis covers most tourist routes well.",
      },
      {
        heading: "FAQs",
        body: "Is Dubai expensive? Mid-range and luxury travel is pricey; careful budgeting and metro use help. Is 5 days enough? Yes for a classic first visit. Dress modestly in malls and older districts; beachwear belongs at the beach and hotel pools.",
      },
    ],
  },
  {
    id: "dg-thailand",
    slug: "thailand-10-day-itinerary-trip-cost-2026",
    title: "10-Day Thailand Itinerary: Bangkok, Chiang Mai & Islands + Trip Cost",
    excerpt:
      "The classic Thailand trip route for first-timers — temples, street food, mountains and beaches — with best time to visit and a realistic travel budget.",
    cover: unsplash(PHOTOS.phiPhi, 1600),
    category: "Guides",
    tags: ["Thailand", "Bangkok", "Chiang Mai", "Itineraries", "Trip Cost", "Southeast Asia"],
    author: authors.marco,
    date: "2026-08-01",
    readingTime: 15,
    featured: true,
    sections: [
      {
        body: "Thailand is one of the easiest and most rewarding destinations in Southeast Asia: world-class food, friendly cities, temples and tropical islands. This 10-day Thailand itinerary covers Bangkok, Chiang Mai and one island base so you experience the country’s three classic faces without changing hotels every night.",
      },
      {
        heading: "Best time to visit Thailand",
        body: "November to February is generally the most comfortable nationwide (cooler, drier). March–May is hot. The rainy season is roughly June–October, with regional differences — the Andaman coast (Phuket/Krabi) and Gulf islands (Samui) have different peak windows. Shoulder months can offer lower prices with still-good beach days.",
      },
      {
        heading: "Days 1–3 — Bangkok",
        body: "See the Grand Palace and Wat Phra Kaew, Wat Pho’s Reclining Buddha, and Wat Arun at sunset. Ride a Chao Phraya river boat, explore Chinatown, and finish with a night market or rooftop viewpoint. Use the BTS/MRT and river ferries to skip traffic.",
      },
      {
        heading: "Days 4–6 — Chiang Mai",
        body: "Fly or overnight train north. Walk the Old City temples (Wat Chedi Luang, Wat Phra Singh), visit Doi Suthep, and choose an ethical elephant sanctuary day trip. Evenings: Sunday Walking Street (if timing works) or the Night Bazaar. Chiang Mai is cooler and calmer than Bangkok.",
      },
      {
        heading: "Days 7–10 — Islands (pick one base)",
        body: "Fly to Phuket, Krabi or Koh Samui and stay put. Beach days, a viewpoint or temple, and one island-hopping boat trip are enough. Avoid splitting islands across three flights — transfers eat your holiday. Phi Phi day trips are popular from Phuket/Krabi; book reputable operators.",
      },
      {
        heading: "Thailand trip cost (excluding international flights)",
        body: "Per person per day: Budget USD 30–50; Mid-range USD 60–120; Luxury USD 200+. Street food and local transport keep costs low. Ten mid-range days often fall around USD 700–1,200 on the ground, depending on island hotels and tours.",
      },
      {
        heading: "Where to stay",
        body: "Bangkok: Sukhumvit or Riverside for first-timers. Chiang Mai: Old City or Nimman. Islands: choose based on vibe — Patong is lively; Kata/Karon calmer; Krabi’s Ao Nang is a solid hub; Samui’s Chaweng/Lamai suit most visitors.",
      },
      {
        heading: "Practical tips & FAQs",
        body: "Dress modestly at temples. Carry cash for markets; cards are widely accepted in cities. Is 10 days enough for Thailand? Yes for a highlights circuit. Can you do north and islands in one trip? Yes — domestic flights make it easy. Always check current entry rules for your passport.",
      },
    ],
  },
  {
    id: "dg-japan",
    slug: "japan-10-day-itinerary-best-time-trip-cost-2026",
    title: "10-Day Japan Itinerary (Tokyo–Kyoto–Osaka): Best Time & Trip Cost",
    excerpt:
      "A practical Japan travel itinerary for first-timers covering Tokyo, Kyoto and Osaka — plus when to go, rail tips and a clear trip cost guide.",
    cover: unsplash(PHOTOS.tokyo, 1600),
    category: "Guides",
    tags: ["Japan", "Tokyo", "Kyoto", "Osaka", "Itineraries", "Trip Cost", "Best Time to Visit"],
    author: authors.amelia,
    date: "2026-08-01",
    readingTime: 15,
    featured: true,
    sections: [
      {
        body: "Japan rewards planning: trains run on time, cities are dense with things to do, and a classic Golden Route still delivers for first-time visitors. This 10-day Japan itinerary balances Tokyo’s energy, Kyoto’s temples and Osaka’s food scene — with guidance on the best time to visit and realistic trip costs.",
      },
      {
        heading: "Best time to visit Japan",
        body: "Spring (late March–April) brings cherry blossoms and peak demand. Autumn (October–November) offers colour and comfortable weather. Winter is excellent for snow, onsen and fewer crowds in many cities. Summer (July–August) is hot and humid but festive. Book major hotels and popular restaurants early in blossom and autumn foliage seasons.",
      },
      {
        heading: "Days 1–4 — Tokyo",
        body: "Base in Shinjuku, Shibuya or near a major JR station. Highlights: Shibuya Crossing, Meiji Shrine and Harajuku, Sensō-ji in Asakusa, teamLab or a skyscraper view, and an evening in Shinjuku’s alleys. Day trip options: Nikko, Kamakura or Hakone if you want mountains and onsen air.",
      },
      {
        heading: "Days 5–7 — Kyoto",
        body: "Shinkansen west. Priorities: Fushimi Inari’s torii gates, Kiyomizu-dera, Arashiyama bamboo grove, and Gion at dusk. Add a tea ceremony or Philosopher’s Path if you want a slower day. Kyoto temples are magical early — start before tour buses arrive.",
      },
      {
        heading: "Days 8–9 — Osaka & Nara",
        body: "Osaka Castle, Dotonbori neon and street food, plus a day trip to Nara for Todai-ji and the deer park. Osaka is an easy base for food lovers and a short hop from Kyoto.",
      },
      {
        heading: "Day 10 — Buffer & departure",
        body: "Keep a buffer for shopping, a last museum, or travel back to your departure airport (Narita, Haneda or Kansai). Japan’s trains are efficient, but airport transfer time still matters with luggage.",
      },
      {
        heading: "Japan trip cost (excluding international flights)",
        body: "Per person per day: Budget USD 70–100; Mid-range USD 120–220; Luxury USD 250+. Rail passes, IC cards and convenience-store meals help. Ten mid-range days often land around USD 1,400–2,200 on the ground. Tokyo and Kyoto hotels are a major share of the budget.",
      },
      {
        heading: "Getting around",
        body: "IC cards (Suica/Pasmo/ICOCA) unlock local transit. Shinkansen connects the Golden Route quickly. Decide early whether a Japan Rail Pass makes sense for your exact dates and legs — for Tokyo–Kyoto–Osaka only, individual tickets are often cheaper.",
      },
      {
        heading: "FAQs",
        body: "Is 10 days enough for Japan? Yes for a first Golden Route trip. Do you need cash? Cards are widely accepted, but some small shops still prefer cash. Is English widely spoken? In tourist areas, enough to get by; translation apps help elsewhere.",
      },
    ],
  },
  {
    id: "dg-italy",
    slug: "italy-10-day-itinerary-rome-florence-venice-2026",
    title: "10-Day Italy Itinerary: Rome, Florence & Venice + Trip Cost",
    excerpt:
      "The classic Italy trip for first-timers — ancient Rome, Renaissance Florence and canal-side Venice — with best time to visit and travel budget tips.",
    cover: unsplash(PHOTOS.rome, 1600),
    category: "Guides",
    tags: ["Italy", "Rome", "Florence", "Venice", "Itineraries", "Trip Cost", "Europe"],
    author: authors.marco,
    date: "2026-08-01",
    readingTime: 14,
    featured: false,
    sections: [
      {
        body: "Italy’s classic north–central route still earns its reputation: Rome’s ancient core, Florence’s art, and Venice’s lagoons. Ten days gives you time to enjoy each city without living out of a suitcase every morning. This Italy itinerary is built for first-time visitors who want culture, food and walkable historic centres.",
      },
      {
        heading: "Best time to visit Italy",
        body: "April–June and September–October offer the best balance of weather and crowds. July–August is hot and busy, especially in Rome and Florence. Winter is quieter and cheaper, with shorter daylight and occasional rain. Book Colosseum, Vatican and Uffizi tickets ahead in any season.",
      },
      {
        heading: "Days 1–3 — Rome",
        body: "Colosseum and Roman Forum, Vatican Museums and St Peter’s, Trevi Fountain, Pantheon and a Trastevere evening. Use early entries where possible. One gelato stop is mandatory; many are optional.",
      },
      {
        heading: "Days 4–6 — Florence & Tuscany",
        body: "Train to Florence. Climb the Duomo dome (book ahead), visit the Uffizi or Accademia, cross Ponte Vecchio, and take a day trip to Pisa, Siena or the Chianti countryside. Florence is compact — walking shoes matter more than taxis.",
      },
      {
        heading: "Days 7–9 — Venice",
        body: "St Mark’s Basilica and Piazza San Marco, Doge’s Palace, Rialto, and a vaporetto ride along the Grand Canal. Add Burano or Murano if you want colour beyond the main island. Gondolas are optional; side canals at dusk are free and beautiful.",
      },
      {
        heading: "Day 10 — Departure",
        body: "Fly out of Venice (VCE) or train back to Rome/Milan for your international flight. Build buffer time — Italian trains are generally good, but connections with luggage need margin.",
      },
      {
        heading: "Italy trip cost (excluding international flights)",
        body: "Per person per day: Budget EUR 60–90; Mid-range EUR 100–180; Luxury EUR 250+. Museum tickets, gelato and espresso add up in the nicest way. Ten mid-range days often cost roughly EUR 1,200–1,800 on the ground.",
      },
      {
        heading: "FAQs",
        body: "Is this the best Italy itinerary for first-timers? For a first trip focused on art and history, yes. Can you add Amalfi or the Lakes? Yes, but drop a city rather than squeezing everything into 10 days. Trains or rental car? Trains are easier for this route.",
      },
    ],
  },
  {
    id: "dg-switzerland",
    slug: "switzerland-7-day-itinerary-trip-cost-2026",
    title: "7-Day Switzerland Itinerary & Trip Cost: Is Switzerland Expensive?",
    excerpt:
      "A scenic week through Zurich, Lucerne, Interlaken and the Alps — with honest answers on Switzerland trip cost and the best time to visit.",
    cover: unsplash(PHOTOS.alps, 1600),
    category: "Guides",
    tags: ["Switzerland", "Alps", "Itineraries", "Trip Cost", "Europe", "Nature"],
    author: authors.sofia,
    date: "2026-08-01",
    readingTime: 13,
    featured: false,
    sections: [
      {
        body: "Switzerland is expensive — and spectacular. Lakes, peaks and trains that feel like attractions themselves make it worth planning carefully. This 7-day Switzerland itinerary focuses on a scenic central route so you spend more time looking out of windows than transferring luggage.",
      },
      {
        heading: "Best time to visit Switzerland",
        body: "June–September is prime for hiking and lake swimming. December–March suits skiing and snow villages. Shoulder months (April–May, October–November) can be quieter and cheaper, though some high mountain transport runs reduced schedules. Always check cable-car and pass seasonal dates.",
      },
      {
        heading: "Suggested 7-day route",
        body: "Day 1 Zurich arrival and old town. Days 2–3 Lucerne and a lake or Mount Pilatus/Rigi excursion. Days 4–5 Interlaken / Jungfrau region for alpine views. Day 6 Zermatt (Matterhorn views) or a flexible Alps day. Day 7 return via Bern or Zurich for departure. Adjust based on season and rail passes.",
      },
      {
        heading: "Switzerland trip cost (excluding international flights)",
        body: "Per person per day: Budget CHF 90–130; Mid-range CHF 150–250; Luxury CHF 300+. Food and hotels drive costs; picnic lunches and supermarket dinners help. A Swiss Travel Pass can be good value if you ride trains daily — run the numbers for your exact itinerary.",
      },
      {
        heading: "Getting around",
        body: "Swiss trains are punctual and scenic. Book popular panoramic routes and mountain excursions ahead in summer. Luggage lockers at major stations make day trips easier if you are changing bases.",
      },
      {
        heading: "FAQs",
        body: "Is Switzerland worth the cost? If mountain scenery is your priority, yes. Can you do Switzerland on a budget? Yes, with hostels, grocery meals and careful pass planning — but it will still cost more than most of Europe. Is 7 days enough? Yes for a highlights loop; 10+ days is better if you want multiple alpine regions.",
      },
    ],
  },
  {
    id: "dg-london",
    slug: "london-5-day-itinerary-trip-cost-2026",
    title: "5-Day London Itinerary: Best Things to Do, Best Time & Trip Cost",
    excerpt:
      "A first-timer London travel guide covering iconic sights, neighbourhoods and museums — plus when to visit and how much a London trip costs.",
    cover: unsplash(PHOTOS.london, 1600),
    category: "Guides",
    tags: ["London", "UK", "Itineraries", "Trip Cost", "City Break", "Europe"],
    author: authors.amelia,
    date: "2026-08-01",
    readingTime: 12,
    featured: false,
    sections: [
      {
        body: "London is enormous, walkable in pockets, and endlessly layered. Five days will not show you everything — and that is fine. This London itinerary focuses on the classic highlights and a few neighbourhoods so you leave with a sense of the city, not just a checklist of monuments.",
      },
      {
        heading: "Best time to visit London",
        body: "May–June and September are often the most pleasant. July–August bring longer days and more crowds. December is festive but cold and peak-priced around Christmas. Rain is possible year-round — a light waterproof layer earns its keep.",
      },
      {
        heading: "Day 1 — Westminster & South Bank",
        body: "Westminster Abbey views, Big Ben and Parliament, then walk the South Bank past the London Eye toward Borough Market. An evening river walk is one of London’s best free experiences.",
      },
      {
        heading: "Day 2 — Royal London & Trafalgar",
        body: "Buckingham Palace (Changing of the Guard when scheduled), St James’s Park, Trafalgar Square and the National Gallery. West End show at night if that is your style.",
      },
      {
        heading: "Day 3 — Tower & the City",
        body: "Tower of London and Tower Bridge, then the City’s modern skyline. Book the Tower timed entry ahead in busy months.",
      },
      {
        heading: "Day 4 — Museums & Covent Garden",
        body: "British Museum (or V&A / Natural History if you prefer South Kensington), then Covent Garden and Soho for food and people-watching.",
      },
      {
        heading: "Day 5 — Neighbourhood day",
        body: "Choose Notting Hill and Portobello, Greenwich, or a Thames path walk depending on energy and weather. Keep your final afternoon flexible for shopping or a favourite café.",
      },
      {
        heading: "London trip cost (excluding international flights)",
        body: "Per person per day: Budget GBP 60–90; Mid-range GBP 100–180; Luxury GBP 250+. The Oyster/contactless daily cap helps with transport. Many major museums are free — budget more for paid attractions, theatre and meals out.",
      },
      {
        heading: "FAQs",
        body: "Is 5 days enough for London? Yes for a strong first visit. Do you need the London Pass? Only if your paid-attraction list is long — run the maths. Best area to stay? South Bank, Covent Garden, Bloomsbury or Kensington suit most first-timers for access.",
      },
    ],
  },
  {
    id: "dg-paris",
    slug: "paris-5-day-itinerary-best-time-trip-cost-2026",
    title: "5-Day Paris Itinerary: Eiffel Tower, Louvre & More + Trip Cost",
    excerpt:
      "Plan a perfect Paris city break with a day-by-day itinerary, best time to visit Paris, neighbourhood tips and a realistic travel budget.",
    cover: unsplash(PHOTOS.eiffel, 1600),
    category: "Guides",
    tags: ["Paris", "France", "Itineraries", "Trip Cost", "Best Time to Visit", "Europe"],
    author: authors.marco,
    date: "2026-08-01",
    readingTime: 13,
    featured: true,
    sections: [
      {
        body: "Paris is best enjoyed at a human pace: one major museum, long walks, and time for cafés. This 5-day Paris itinerary covers the icons without turning your trip into a queue marathon — and includes best-time advice and trip cost ranges for planning.",
      },
      {
        heading: "Best time to visit Paris",
        body: "April–June and September–October are widely considered the best months. Summer is lively but hot and crowded. Winter is quieter and atmospheric, especially around the holidays. Book Eiffel Tower and Louvre tickets online whenever you go.",
      },
      {
        heading: "Day 1 — Eiffel Tower & Seine",
        body: "Start with the Eiffel Tower (summit or second floor — book ahead), walk Champ de Mars, then a Seine river cruise at dusk. Keep dinner near the river to avoid long late transfers.",
      },
      {
        heading: "Day 2 — Louvre & Right Bank classics",
        body: "Louvre in the morning (go early), Tuileries stroll, then Palais Royal or Place Vendôme. Evening in Le Marais for food and wandering.",
      },
      {
        heading: "Day 3 — Île de la Cité & Latin Quarter",
        body: "Notre-Dame exterior and Île de la Cité, Sainte-Chapelle’s stained glass, then the Latin Quarter and a Luxembourg Gardens pause.",
      },
      {
        heading: "Day 4 — Montmartre",
        body: "Sacré-Cœur, artists’ square, and the quieter streets behind the basilica. Sunset views over Paris are the point — arrive before golden hour.",
      },
      {
        heading: "Day 5 — Versailles or deeper Paris",
        body: "Day trip to the Palace of Versailles, or stay in the city for Musée d’Orsay, Canal Saint-Martin, or shopping. Choose based on your appetite for crowds versus art.",
      },
      {
        heading: "Paris trip cost (excluding international flights)",
        body: "Per person per day: Budget EUR 60–90; Mid-range EUR 100–180; Luxury EUR 250+. Museum passes can help if you visit several paid sites. Picnic lunches from bakeries keep costs sane without sacrificing joy.",
      },
      {
        heading: "FAQs",
        body: "Is 5 days enough for Paris? Yes for a memorable first visit. Should you buy a museum pass? Calculate against your ticket list. Best arrondissements to stay? Central options near Louvre, Marais, Saint-Germain or the Latin Quarter minimise metro time.",
      },
    ],
  },
  {
    id: "dg-singapore",
    slug: "singapore-4-day-itinerary-trip-cost-2026",
    title: "4-Day Singapore Itinerary: Best Things to Do & Trip Cost",
    excerpt:
      "A compact Singapore travel guide for stopovers and short city breaks — Marina Bay, Sentosa, neighbourhoods, food and a clear budget overview.",
    cover: unsplash(PHOTOS.cityNight, 1600),
    category: "Guides",
    tags: ["Singapore", "Itineraries", "Trip Cost", "City Break", "Asia", "Food"],
    author: authors.sofia,
    date: "2026-08-01",
    readingTime: 11,
    featured: false,
    sections: [
      {
        body: "Singapore is built for short trips: efficient transport, outstanding food and a dense set of attractions. Four days is enough for Marina Bay, a neighbourhood food crawl, Sentosa and one nature or wildlife highlight — without feeling rushed.",
      },
      {
        heading: "Best time to visit Singapore",
        body: "Singapore is warm and humid year-round, with rain possible in any month. February–April is often slightly drier; November–January can bring heavier showers. Indoor attractions and hawker centres make weather less disruptive than in beach destinations.",
      },
      {
        heading: "Day 1 — Marina Bay",
        body: "Gardens by the Bay (Cloud Forest / Flower Dome), Marina Bay Sands views, and the evening light shows. Walk the waterfront at night — this is Singapore’s postcard core.",
      },
      {
        heading: "Day 2 — Culture neighbourhoods",
        body: "Chinatown, Little India and Kampong Glam (Arab Street / Haji Lane). Eat at hawker centres — Maxwell, Lau Pa Sat or Tekka are easy starting points. This is the best day to understand Singapore beyond the skyline.",
      },
      {
        heading: "Day 3 — Sentosa",
        body: "Universal Studios, beaches, or a calmer Sentosa spa/beach day depending on your group. Return to Clarke Quay or the CBD for dinner.",
      },
      {
        heading: "Day 4 — Nature or shopping",
        body: "Singapore Zoo / Night Safari, or Orchard Road shopping and a museum (National Gallery or Asian Civilisations Museum). Keep the final evening near your hotel if you have an early flight.",
      },
      {
        heading: "Singapore trip cost (excluding international flights)",
        body: "Per person per day: Budget SGD 60–90; Mid-range SGD 100–180; Luxury SGD 250+. Hawker meals are excellent value; hotels and attractions are the main costs. MRT makes getting around cheap and simple.",
      },
      {
        heading: "FAQs",
        body: "Is 4 days enough for Singapore? Yes for a first city break or long stopover. Is Singapore expensive? Hotels and attractions can be; food and transit need not be. Do you need a lot of cash? Cards are widely accepted; keep a little cash for smaller hawker stalls.",
      },
    ],
  },
  {
    id: "dg-nyc",
    slug: "new-york-5-day-itinerary-trip-cost-2026",
    title: "5-Day New York City Itinerary: Best Time to Visit & Trip Cost",
    excerpt:
      "A first-timer NYC itinerary covering Midtown, Central Park, Downtown, Brooklyn and more — with best time to visit New York and a realistic trip budget.",
    cover: unsplash(PHOTOS.nyc, 1600),
    category: "Guides",
    tags: ["New York", "NYC", "USA", "Itineraries", "Trip Cost", "Best Time to Visit", "City Break"],
    author: authors.amelia,
    date: "2026-08-01",
    readingTime: 13,
    featured: false,
    sections: [
      {
        body: "New York City is intense in the best way: world-class museums, food from everywhere, and neighbourhoods that feel like separate cities. Five days is a strong first visit if you accept you will not see everything. This NYC itinerary prioritises iconic views, walkable clusters and one Brooklyn day.",
      },
      {
        heading: "Best time to visit New York City",
        body: "May–June and September–October usually offer the most pleasant weather. Summer is hot and humid with free outdoor events. Winter can be magical around the holidays but cold and expensive. Shoulder seasons often mean better hotel rates than December or peak summer weekends.",
      },
      {
        heading: "Day 1 — Midtown icons",
        body: "Times Square (go once, then move on), Top of the Rock or Empire State for skyline views, and a Broadway show if that is on your list. Book observation decks and theatre tickets ahead.",
      },
      {
        heading: "Day 2 — Central Park & museums",
        body: "Central Park morning walk, then The Met or MoMA. Keep the evening for a neighbourhood dinner on the Upper West or Upper East Side — or head downtown if you want more energy.",
      },
      {
        heading: "Day 3 — Lower Manhattan",
        body: "Statue of Liberty / Ellis Island (book ferry tickets early), Wall Street area, and the 9/11 Memorial & Museum. This is a heavier day emotionally and logistically — do not overpack the evening.",
      },
      {
        heading: "Day 4 — Brooklyn",
        body: "Walk the Brooklyn Bridge into DUMBO for skyline photos, then explore Brooklyn neighbourhoods (Williamsburg or Brooklyn Heights) for food and a different pace from Midtown.",
      },
      {
        heading: "Day 5 — High Line & downtown west",
        body: "High Line, Chelsea Market, then SoHo or Greenwich Village. Use leftover time for shopping, a favourite pizza slice, or revisiting the neighbourhood you loved most.",
      },
      {
        heading: "New York trip cost (excluding international flights)",
        body: "Per person per day: Budget USD 80–120; Mid-range USD 150–250; Luxury USD 300+. Hotels dominate the budget. Subway OMNY/contactless is the smart way to move. Food can be cheap or splurge — NYC supports both extremes.",
      },
      {
        heading: "FAQs",
        body: "Is 5 days enough for New York? Yes for a first highlight reel. Where should you stay? Midtown is convenient; downtown or Brooklyn can feel more local if you accept longer subway rides to Midtown shows. Do you need a city pass? Only if your attraction list is long — compare against individual tickets.",
      },
    ],
  },
  {
    id: "dg-portugal",
    slug: "portugal-10-day-itinerary-lisbon-porto-algarve-2026",
    title: "10-Day Portugal Itinerary: Lisbon, Porto & the Algarve + Trip Cost (2026)",
    excerpt:
      "A researched first-timer Portugal route covering Lisbon, Sintra, Porto, the Douro Valley and the Algarve — with best time to visit, train tips and a realistic 2026 trip cost breakdown.",
    cover: unsplash(PHOTOS.coast, 1600),
    category: "Guides",
    tags: [
      "Portugal",
      "Lisbon",
      "Porto",
      "Algarve",
      "Itineraries",
      "Trip Cost",
      "Best Time to Visit",
      "Solo Travel",
      "Europe",
    ],
    author: authors.marco,
    date: "2026-08-05",
    readingTime: 15,
    featured: true,
    sections: [
      {
        body: "Portugal is one of Western Europe’s highest-value trips in 2026: walkable cities, excellent trains, Atlantic beaches and wine country within a few hours of each other. This 10-day Portugal itinerary is built for first-timers who want Lisbon culture, a Sintra day trip, Porto and the Douro, then cliff beaches in the Algarve — without needing a rental car for most of the route.",
      },
      {
        heading: "Best time to visit Portugal",
        body: "April–June and September–October are the sweet spots: warm enough for the Algarve, comfortable for city walking, and lighter crowds than July–August. Peak summer is fine if you want beach time, but Lagos and Lisbon prices rise and Sintra gets crowded. November–March is milder and cheaper for cities and food; the north can be wetter and the Algarve less beach-focused.",
      },
      {
        heading: "How many days do you need in Portugal?",
        body: "Ten days is the classic first visit if you want Lisbon + Porto + a coastal finale. With only seven days, drop the Algarve or the Douro day. With two weeks, add the Douro overnight, Coimbra, or slow days in the Alentejo — Portugal rewards unhurried travel.",
      },
      {
        heading: "Day 1 — Arrive Lisbon",
        body: "Fly into Lisbon (LIS). Keep day one light: Alfama viewpoints (Miradouro da Senhora do Monte or Santa Luzia), a tram or walk through Baixa, and sunset near the Tagus. Buy a Viva Viagem / Navegante card for metro and trams. Stay in Alfama, Baixa or Chiado for walkability.",
      },
      {
        heading: "Day 2 — Belém & central Lisbon",
        body: "Morning in Belém: Jerónimos Monastery, Belém Tower and Pastéis de Belém (expect a queue — worth it). Afternoon for LX Factory or a neighbourhood lunch in Time Out Market, then Bairro Alto or Príncipe Real in the evening. Book major monastery tickets ahead in high season.",
      },
      {
        heading: "Day 3 — Sintra day trip",
        body: "Train from Rossio to Sintra (~40 minutes). Prioritise Pena Palace and either Quinta da Regaleira or the Moorish Castle — trying to do every palace in one day is exhausting. Return to Lisbon for dinner, or continue to Cascais for a coastal evening if energy allows.",
      },
      {
        heading: "Day 4 — Train to Porto",
        body: "Take the Alfa Pendular (AF) Lisbon–Porto (~2h 50m). Book seats in advance for the best fares. Afternoon in Ribeira and across Dom Luís I Bridge to Vila Nova de Gaia for port-lodge tastings and river views.",
      },
      {
        heading: "Day 5 — Porto old town",
        body: "São Bento station azulejos, Clérigos Tower, Livraria Lello (book timed entry), and a long lunch of francesinha or seafood. Walk the riverfront at golden hour. Porto is compact — you can cover a lot on foot with one steep climb or two.",
      },
      {
        heading: "Day 6 — Douro Valley day trip",
        body: "Day tour or train toward Peso da Régua / Pinhão for vineyard viewpoints and a river cruise segment. This is Portugal’s wine-country highlight — do not squeeze it into a rushed half day. Return to Porto overnight.",
      },
      {
        heading: "Day 7 — Travel to the Algarve (Lagos)",
        body: "Fly Porto–Faro when fares are good, or train/bus via Lisbon to Lagos. Lagos is a strong base: old town walkability, cliffs and beach access. Check in, stroll the marina and old walls, and keep the evening easy after travel.",
      },
      {
        heading: "Day 8 — Algarve cliffs & caves",
        body: "Ponta da Piedade boat or kayak trip, then Praia do Camilo or Dona Ana. Book reputable boat operators; weather can cancel trips. Midday heat is strong in summer — start early.",
      },
      {
        heading: "Day 9 — Sagres or Benagil area",
        body: "Option A: Sagres and Cape St. Vincent for wild Atlantic drama. Option B: day toward Benagil / Carvoeiro for iconic sea caves (crowds peak mid-morning). One focused outing beats racing the whole coast.",
      },
      {
        heading: "Day 10 — Departure",
        body: "Transfer to Faro Airport (FAO) or back to Lisbon depending on your flights. Build buffer time — Algarve road and bus links are slower than they look on a map.",
      },
      {
        heading: "Portugal trip cost (excluding international flights)",
        body: "Rough per-person daily spend in 2026: Budget USD 55–90 (hostels/guesthouses, tascas, trains); Mid-range USD 100–180 (3–4★ hotels, restaurants, day tours); Luxury USD 250+. For ten days on the ground, many mid-range travellers land around USD 1,200–2,200 before long-haul flights. Domestic Lisbon–Porto trains are often USD 25–50 if booked ahead; bigger extras are usually a Douro Valley tour or an Algarve boat day.",
      },
      {
        heading: "Where to stay",
        body: "Lisbon: Alfama/Chiado for atmosphere; Avenida for convenience. Porto: Ribeira or Cedofeita. Algarve: Lagos old town for first-timers; consider a car only if you want scattered beach days beyond bus reach.",
      },
      {
        heading: "Practical tips",
        body: "Portugal is excellent for solo travel — cities feel safe and English is widely spoken in tourist areas. Carry some cash for small cafés. Hills are real; pack broken-in shoes. Pre-book Pena, Livraria Lello and popular boat trips in peak months. Use our Trip Cost Estimator to adjust nights and travel style.",
      },
      {
        heading: "FAQs",
        body: "Do you need a car in Portugal? Not for this Lisbon–Porto–Lagos corridor if you use trains and one or two day tours. Is 10 days enough? Yes for highlights; 12–14 is more relaxed. Is Portugal good in winter? Cities and food yes; beach time is limited. Schengen rules apply for many passport holders — check your stay limits before combining with other EU countries.",
      },
    ],
  },
  {
    id: "dg-vietnam",
    slug: "vietnam-10-day-itinerary-hanoi-halong-hoi-an-2026",
    title: "10-Day Vietnam Itinerary: Hanoi, Ha Long Bay, Hoi An & Ho Chi Minh + Trip Cost",
    excerpt:
      "A north-to-south Vietnam itinerary for first-timers — Hanoi, overnight Ha Long Bay, lantern-lit Hoi An and Ho Chi Minh City — with best time to visit, domestic flights and a clear 2026 budget.",
    cover: unsplash(PHOTOS.lantern, 1600),
    category: "Guides",
    tags: [
      "Vietnam",
      "Hanoi",
      "Hoi An",
      "Ha Long Bay",
      "Ho Chi Minh City",
      "Itineraries",
      "Trip Cost",
      "Best Time to Visit",
      "Asia",
      "Budget Travel",
    ],
    author: authors.sofia,
    date: "2026-08-05",
    readingTime: 15,
    featured: true,
    sections: [
      {
        body: "Vietnam delivers huge variety in a compact flight network: chaotic-charming Hanoi, limestone karsts on Ha Long Bay, lantern-lit Hoi An, and energetic Ho Chi Minh City. This 10-day Vietnam itinerary runs north to south so you are not backtracking, and it is paced for first-timers who want culture, scenery and food without sleeping on buses every night.",
      },
      {
        heading: "Best time to visit Vietnam",
        body: "For a full north–central–south route, late February–April is often the most reliable compromise. November–April is generally drier in the north and south. Central Vietnam (including Hoi An) can see heavy rains and flooding risk around September–November — check forecasts if you travel then. Peak Tet (Lunar New Year) is culturally rich but means closures, crowds and higher prices.",
      },
      {
        heading: "How many days do you need in Vietnam?",
        body: "Ten days covers the classic first-timer circuit if you fly between regions. With seven days, do Hanoi + Ha Long + Hoi An only. With two weeks, add Sapa, Phong Nha, Hue overnight, or the Mekong Delta properly.",
      },
      {
        heading: "Day 1 — Arrive Hanoi",
        body: "Land at Noi Bai (HAN) and transfer to the Old Quarter. Walk Hoan Kiem Lake at dusk, try egg coffee or a simple bun cha, and sleep off the flight. Grab and walking beat taxis for short hops once you have your bearings.",
      },
      {
        heading: "Day 2 — Hanoi culture day",
        body: "Ho Chi Minh Mausoleum complex (check opening days), Temple of Literature, and the Museum of Ethnology if you want deeper context. Evening water puppet show or a street-food crawl in the Old Quarter. Book mausoleum timing carefully — mornings are typical.",
      },
      {
        heading: "Day 3–4 — Ha Long Bay overnight cruise",
        body: "Transfer ~3–4 hours to the bay for an overnight junk or boutique cruise (Ha Long or quieter Lan Ha / Bai Tu Long options). Kayaking, swimming and karst views are the point — choose a mid-range operator with recent reviews rather than the cheapest flyer in your hotel lobby. Day 4 returns to Hanoi in the afternoon; fly evening or next morning to Da Nang.",
      },
      {
        heading: "Day 5 — Fly to Da Nang & Hoi An",
        body: "Domestic flight HAN–DAD (~1.5 hours; often USD 30–70 if booked ahead on VietJet, Bamboo or Vietnam Airlines). Transfer ~45 minutes to Hoi An. Buy the Ancient Town ticket, wander by the Thu Bon River, and stay for lantern hour after sunset.",
      },
      {
        heading: "Day 6 — Hoi An deep dive",
        body: "Japanese Covered Bridge, assembly halls, a tailor fitting if you want custom clothes (order early), and cao lau for lunch. Optional: Cam Thanh basket boats or An Bang Beach late afternoon. Keep one evening free — Hoi An is best slow.",
      },
      {
        heading: "Day 7 — Optional Hue day trip or beach day",
        body: "Option A: day trip to Hue for the Imperial City (long but doable). Option B: Marble Mountains and beach time near Da Nang. Pick one; stacking both makes a brutal day.",
      },
      {
        heading: "Day 8 — Fly to Ho Chi Minh City",
        body: "Morning flight DAD–SGN. Afternoon for Notre-Dame Cathedral area, Central Post Office, and a modern coffee shop reset. District 1 is the easiest first-timer base.",
      },
      {
        heading: "Day 9 — Cu Chi or Mekong + city food",
        body: "Morning Cu Chi Tunnels or a Mekong Delta day trip; afternoon War Remnants Museum (powerful — plan emotional bandwidth). Evening street food in District 1 or 3. Do not schedule a heavy museum and a full Mekong day back-to-back if you tire easily.",
      },
      {
        heading: "Day 10 — Departure",
        body: "Last cafés, shopping on Dong Khoi, or a short neighbourhood walk before transfer to Tan Son Nhat (SGN). Build traffic buffer — Ho Chi Minh congestion is real.",
      },
      {
        heading: "Vietnam trip cost (excluding international flights)",
        body: "Per person per day in 2026: Budget USD 30–50 (guesthouses, street food, local buses); Mid-range USD 70–140 (nice hotels, mix of restaurants, better cruise); Luxury USD 200+. A realistic mid-range 10-day ground budget is often USD 900–1,800 including two domestic flights and a solid overnight Ha Long cruise. Street meals can still cost just a few dollars; cruises and flights are the swing factors.",
      },
      {
        heading: "Where to stay",
        body: "Hanoi: Old Quarter or Hoan Kiem for first nights. Hoi An: Ancient Town for atmosphere (accept bags-on-foot streets) or just outside for quieter pools. Ho Chi Minh City: District 1 for short stays.",
      },
      {
        heading: "Practical tips",
        body: "eSIMs and Grab work well in cities. Carry cash (VND) for markets and small eateries. Dress modestly at temples and the mausoleum. Book Ha Long cruises and Tet-period hotels early. Motorbikes are everywhere — cross streets slowly and steadily. Use our Trip Cost Estimator for style-based budgets.",
      },
      {
        heading: "FAQs",
        body: "Is 10 days enough for Vietnam? Yes for a highlights route with flights; not enough to see everything. Is Vietnam good for solo travellers? Yes — tourism infrastructure is strong and costs are friendly. Do you need a visa? Many nationalities use e-visa or visa exemption — always verify current rules for your passport before flying. Should you overnight on Ha Long Bay? Strongly recommended over a rushed day cruise if your budget allows.",
      },
    ],
  },
];
