import type { City } from "@/lib/types";

/** Depth overlay fields authored for priority city guides. */
export type CityGuideDepth = Partial<
  Pick<
    City,
    | "overview"
    | "bestTime"
    | "weather"
    | "airport"
    | "metro"
    | "transport"
    | "tips"
    | "faqs"
    | "thingsToDo"
    | "itinerary"
    | "tripCost"
    | "stayAreas"
    | "tagline"
  >
>;

/**
 * Hand-authored depth overlays for ~40 priority cities.
 */
export const cityGuideDepth: Record<string, CityGuideDepth> = {
  "bali": {
    "overview": "Bali blends Hindu temple ceremonies, terraced rice paddies, surf beaches and wellness retreats across distinct regions — from Seminyak nightlife to Ubud's cultural heart and Uluwatu's clifftop temples.",
    "bestTime": "April–October for dry season; May–June and September for fewer crowds",
    "transport": "Private driver or scooter for flexibility; Grab/Gojek in south Bali; day tours for east and north temples",
    "itinerary": [
      {
        "day": 1,
        "title": "South coast temples",
        "activities": [
          "Uluwatu Temple and kecak dance at sunset",
          "Padang Padang or Bingin Beach swim",
          "Seminyak dinner and beach walk"
        ]
      },
      {
        "day": 2,
        "title": "Ubud culture",
        "activities": [
          "Tegallalang rice terraces",
          "Sacred Monkey Forest Sanctuary",
          "Tirta Empul holy spring temple",
          "Ubud art market browsing"
        ]
      },
      {
        "day": 3,
        "title": "East Bali icons",
        "activities": [
          "Pura Lempuyang (Gates of Heaven)",
          "Tirta Gangga water palace",
          "Optional Mount Batur sunrise trek"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "35–60",
      "mid": "70–150",
      "luxury": "200+",
      "note": "Per person per day on the ground — guesthouses to villa stays; excludes international flights."
    },
    "stayAreas": [
      {
        "name": "Seminyak",
        "bestFor": "Beach clubs and dining",
        "note": "Central south coast with strong restaurant scene"
      },
      {
        "name": "Ubud",
        "bestFor": "Culture and wellness",
        "note": "Rice-field setting; slower pace than the coast"
      },
      {
        "name": "Uluwatu",
        "bestFor": "Surf and clifftop views",
        "note": "Best with a scooter or driver for beach access"
      }
    ],
    "tips": [
      "Dress modestly with a sarong for temple visits",
      "Book drivers the night before for sunrise temple runs",
      "Traffic from south Bali to Ubud can exceed 90 minutes at peak hours"
    ],
    "faqs": [
      {
        "question": "How many days do I need in Bali?",
        "answer": "Four to five days cover south temples, Ubud and one east or north day trip comfortably."
      },
      {
        "question": "Is Bali safe for solo travellers?",
        "answer": "Yes — tourist areas are well served, though scooter traffic and rip currents deserve caution."
      }
    ]
  },
  "dubai": {
    "overview": "Dubai pairs record-breaking skyline views, desert safaris, gold souks and beach resorts into a hyper-modern Gulf hub that works for long layovers and family holidays alike.",
    "bestTime": "November–March for outdoor-friendly temperatures",
    "transport": "Metro Red Line for Marina and Downtown; taxis and ride-hails everywhere; desert tours by 4x4",
    "itinerary": [
      {
        "day": 1,
        "title": "Modern Dubai",
        "activities": [
          "Burj Khalifa At the Top observation deck",
          "Dubai Mall and fountain show",
          "Dubai Marina walk at dusk"
        ]
      },
      {
        "day": 2,
        "title": "Old Dubai and desert",
        "activities": [
          "Al Fahidi Historical Neighbourhood",
          "Gold Souk and Spice Souk",
          "Abra ride across Dubai Creek",
          "Evening desert safari with dune bashing"
        ]
      },
      {
        "day": 3,
        "title": "Palm and beach",
        "activities": [
          "Palm Jumeirah viewpoint or Atlantis photo stop",
          "JBR Beach swim and Marina Walk",
          "Optional Dubai Frame or Museum of the Future slot"
        ]
      },
      {
        "day": 4,
        "title": "Culture buffer day",
        "activities": [
          "Jumeirah Mosque guided visit if open to non-Muslims that day",
          "Alserkal Avenue galleries in Al Quoz",
          "Soft evening — mall or hotel pool recovery after desert day"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "80–120",
      "mid": "150–250",
      "luxury": "300+",
      "note": "Ground costs only — brunches and premium hotels push totals higher quickly."
    },
    "stayAreas": [
      {
        "name": "Downtown Dubai",
        "bestFor": "First-time visitors",
        "note": "Steps from Burj Khalifa and Dubai Mall"
      },
      {
        "name": "Dubai Marina",
        "bestFor": "Waterfront dining",
        "note": "Younger crowd and beach-club access"
      },
      {
        "name": "Jumeirah",
        "bestFor": "Beach resorts",
        "note": "Classic palm-lined coast near Burj Al Arab views"
      }
    ],
    "tips": [
      "Dress modestly in souks and older districts",
      "Book Burj Khalifa timed tickets online to skip queues",
      "Friday brunch is a local weekend ritual — reserve ahead"
    ],
    "faqs": [
      {
        "question": "Is Dubai good for a short stopover?",
        "answer": "Yes — two full days cover Downtown, Old Dubai and a desert evening without rushing."
      },
      {
        "question": "Do I need a car in Dubai?",
        "answer": "No for central sights — the metro and taxis work well; rent only for Abu Dhabi day trips."
      }
    ]
  },
  "bangkok": {
    "overview": "Bangkok thrums with gilded temples, floating markets, rooftop bars and street-food alleys along the Chao Phraya — a Southeast Asian capital that rewards both quick stopovers and deeper neighbourhood dives.",
    "bestTime": "November–February for cooler, drier weather",
    "transport": "BTS Skytrain and MRT for core districts; Chao Phraya express boat; Grab for late nights",
    "itinerary": [
      {
        "day": 1,
        "title": "Royal Bangkok",
        "activities": [
          "Grand Palace and Wat Phra Kaew",
          "Wat Pho (Reclining Buddha)",
          "Wat Arun at sunset",
          "Khao San Road or riverside dinner"
        ]
      },
      {
        "day": 2,
        "title": "Markets and modern city",
        "activities": [
          "Chatuchak Weekend Market (or JJ Green on weekdays)",
          "Jim Thompson House",
          "Rooftop bar in Silom or Sukhumvit"
        ]
      },
      {
        "day": 3,
        "title": "Day trip options",
        "activities": [
          "Damnoen Saduak or Amphawa floating market",
          "Ayutthaya historical park ruins",
          "Maeklong Railway Market"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "30–50",
      "mid": "60–120",
      "luxury": "200+",
      "note": "Excellent value for street food and transit; luxury hotels and fine dining raise the ceiling fast."
    },
    "stayAreas": [
      {
        "name": "Sukhumvit",
        "bestFor": "First-timers and nightlife",
        "note": "BTS access and endless dining options"
      },
      {
        "name": "Riverside",
        "bestFor": "Temple days",
        "note": "Boat piers for Grand Palace and Wat Arun"
      },
      {
        "name": "Silom",
        "bestFor": "Business travellers",
        "note": "Central, well connected and less party-heavy than Khao San"
      }
    ],
    "tips": [
      "Cover shoulders and knees at temples — sarongs are available on site",
      "Use the BTS/MRT combo to beat traffic",
      "Carry small bills for river boats and street vendors"
    ],
    "faqs": [
      {
        "question": "Is Bangkok safe at night?",
        "answer": "Tourist districts are generally safe — use Grab after midnight and watch belongings in crowds."
      },
      {
        "question": "How do I reach the Grand Palace?",
        "answer": "Chao Phraya express boat to Tha Chang pier is scenic and avoids gridlock."
      }
    ]
  },
  "phuket": {
    "overview": "Phuket is Thailand's largest island — a mix of Andaman beaches, Old Phuket Town Sino-Portuguese shophouses, island-hopping boats and Patong nightlife along a well-trodden tourist trail.",
    "bestTime": "November–April for calm seas and sunny weather",
    "transport": "Airport taxis or pre-booked transfers; rental scooter or car for beach hopping; long-tail and speedboat tours for islands",
    "itinerary": [
      {
        "day": 1,
        "title": "Old town and viewpoints",
        "activities": [
          "Phuket Old Town walking tour",
          "Wat Chalong",
          "Big Buddha viewpoint",
          "Sunset at Promthep Cape"
        ]
      },
      {
        "day": 2,
        "title": "Island hopping",
        "activities": [
          "Phi Phi Islands speedboat tour",
          "Snorkelling at Maya Bay area",
          "Lunch on Phi Phi Don"
        ]
      },
      {
        "day": 3,
        "title": "Beach day",
        "activities": [
          "Kata or Karon Beach morning swim",
          "Surf lesson or beach massage",
          "Bang Tao or Surin Beach sunset"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "30–50",
      "mid": "60–120",
      "luxury": "200+",
      "note": "Island tours and beach clubs are the main mid-range splurges beyond accommodation."
    },
    "stayAreas": [
      {
        "name": "Patong",
        "bestFor": "Nightlife and convenience",
        "note": "Busy but walkable to Bangla Road and the beach"
      },
      {
        "name": "Kata / Karon",
        "bestFor": "Families",
        "note": "Calmer bays with good resort selection"
      },
      {
        "name": "Old Phuket Town",
        "bestFor": "Culture and cafés",
        "note": "Heritage shophouses away from beach crowds"
      }
    ],
    "tips": [
      "Book Phi Phi tours with reputable operators — check safety gear",
      "Monsoon season (May–October) brings rough seas and red flags on beaches",
      "Negotiate taxi fares or use Grab to avoid surprises"
    ],
    "faqs": [
      {
        "question": "Which beach is best in Phuket?",
        "answer": "Kata suits families, Surin and Bang Tao skew upscale, Patong is liveliest — pick by vibe not a single 'best' strip."
      },
      {
        "question": "Do I need a scooter?",
        "answer": "Helpful for hidden beaches; international licence required and accident risk is real — many prefer drivers."
      }
    ]
  },
  "chiang-mai": {
    "overview": "Chiang Mai is northern Thailand's cultural capital — moated Old City temples, mountain Doi Suthep views, night bazaars and easy access to elephant sanctuaries and hill-tribe villages.",
    "bestTime": "November–February for cool, clear weather; avoid smoky burn season in March",
    "transport": "Songthaews and Grab in town; red trucks for fixed routes; tours or rental car for mountains",
    "itinerary": [
      {
        "day": 1,
        "title": "Old City temples",
        "activities": [
          "Wat Phra Singh",
          "Wat Chedi Luang",
          "Three Kings Monument square",
          "Sunday Walking Street (if timing fits)"
        ]
      },
      {
        "day": 2,
        "title": "Mountain day",
        "activities": [
          "Doi Suthep and Wat Phra That Doi Suthep",
          "Doi Pui Hmong Village viewpoint",
          "Mon Tha Than waterfall stop"
        ]
      },
      {
        "day": 3,
        "title": "Nature and crafts",
        "activities": [
          "Ethical elephant sanctuary half-day",
          "Baan Tawai handicraft village",
          "Night Bazaar dinner and shopping"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "30–50",
      "mid": "60–120",
      "luxury": "200+",
      "note": "Among Thailand's best value — boutique hotels and cooking classes stay affordable."
    },
    "stayAreas": [
      {
        "name": "Old City",
        "bestFor": "Temple walking",
        "note": "Inside the moat — quiet at night, central by day"
      },
      {
        "name": "Nimman",
        "bestFor": "Cafés and design hotels",
        "note": "Trendy west-side neighbourhood near Maya mall"
      },
      {
        "name": "Riverside (Ping)",
        "bestFor": "Relaxed stays",
        "note": "Resorts along the river outside the moat"
      }
    ],
    "tips": [
      "Check air-quality reports in February–April before booking",
      "Choose certified ethical elephant venues — no riding",
      "Sunday Walking Street is the largest market — arrive early"
    ],
    "faqs": [
      {
        "question": "How many days for Chiang Mai?",
        "answer": "Three full days cover Old City temples, Doi Suthep and one sanctuary or craft day."
      },
      {
        "question": "Is Chiang Mai cooler than Bangkok?",
        "answer": "Yes in winter — evenings can feel chilly; pack a light layer November–January."
      }
    ]
  },
  "singapore": {
    "overview": "Singapore packs hawker-centre food, Gardens by the Bay, diverse neighbourhoods and strict urban order into a compact island city-state ideal for stopovers and family trips.",
    "bestTime": "February–April for slightly drier weather; year-round is workable",
    "transport": "MRT and buses with EZ-Link or SimplyGo; Grab for late nights; Sentosa Express for the island",
    "itinerary": [
      {
        "day": 1,
        "title": "Marina Bay icons",
        "activities": [
          "Marina Bay Sands SkyPark observation deck",
          "Gardens by the Bay Cloud Forest and Flower Dome",
          "Supertree Grove light show"
        ]
      },
      {
        "day": 2,
        "title": "Culture and food",
        "activities": [
          "Chinatown Heritage Centre and Buddha Tooth Relic Temple",
          "Maxwell or Lau Pa Sat hawker lunch",
          "Little India and Sri Mariamman Temple"
        ]
      },
      {
        "day": 3,
        "title": "Sentosa and nature",
        "activities": [
          "Sentosa beaches and cable car",
          "S.E.A. Aquarium",
          "Night Safari at Singapore Zoo (evening)"
        ]
      }
    ],
    "tripCost": {
      "currency": "SGD",
      "budget": "60–90",
      "mid": "100–180",
      "luxury": "250+",
      "note": "Alcohol and hotel rates push costs up — hawker meals keep daily food spend low."
    },
    "stayAreas": [
      {
        "name": "Marina Bay",
        "bestFor": "Icon sights",
        "note": "Walkable to Gardens by the Bay and the riverfront"
      },
      {
        "name": "Orchard Road",
        "bestFor": "Shopping",
        "note": "MRT hub with malls and mid-range hotels"
      },
      {
        "name": "Chinatown",
        "bestFor": "Food and budget",
        "note": "Heritage shophouses and hawker centres nearby"
      }
    ],
    "tips": [
      "No chewing gum sales — fines for littering and eating/drinking on MRT",
      "Book Marina Bay Sands SkyPark slots ahead on weekends",
      "Carry an umbrella — brief tropical showers are common"
    ],
    "faqs": [
      {
        "question": "Is Singapore expensive?",
        "answer": "Hotels run high, but hawker food and public transit are excellent value for a developed city."
      },
      {
        "question": "Can I see Singapore in two days?",
        "answer": "Yes for Marina Bay and one cultural district — add a day for Sentosa or the zoo."
      }
    ]
  },
  "kuala-lumpur": {
    "overview": "Kuala Lumpur mixes Petronas Twin Towers glamour, Batu Caves Hindu shrines, Jalan Alor street food and modern malls in a humid, multicultural Malay capital.",
    "bestTime": "May–July and December–February for slightly less rain",
    "transport": "LRT, MRT and Monorail; Grab is cheap; KTM Komuter for Batu Caves",
    "itinerary": [
      {
        "day": 1,
        "title": "KL skyline",
        "activities": [
          "Petronas Twin Towers Skybridge",
          "KLCC Park",
          "Bukit Bintang shopping and Jalan Alor dinner"
        ]
      },
      {
        "day": 2,
        "title": "Culture and caves",
        "activities": [
          "Batu Caves climb and temple",
          "Thean Hou Temple",
          "Central Market and Merdeka Square"
        ]
      },
      {
        "day": 3,
        "title": "Food and viewpoints",
        "activities": [
          "Islamic Arts Museum Malaysia",
          "KL Tower Menara KL observation deck",
          "Second night on Jalan Alor or Chinatown street food"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "25–45",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Strong value — dining and taxis stay inexpensive by regional standards."
    },
    "stayAreas": [
      {
        "name": "Bukit Bintang",
        "bestFor": "First-timers",
        "note": "Night markets, malls and monorail access"
      },
      {
        "name": "KLCC",
        "bestFor": "Landmark views",
        "note": "Upscale hotels facing the Twin Towers"
      },
      {
        "name": "Chinatown (Petaling Street)",
        "bestFor": "Budget",
        "note": "Lively street market near Pasar Seni LRT"
      }
    ],
    "tips": [
      "Dress modestly for Batu Caves",
      "Use covered walkways between Bukit Bintang malls in rain",
      "Air-conditioned malls are social hubs — plan midday breaks"
    ],
    "faqs": [
      {
        "question": "Is KL walkable?",
        "answer": "Partially in Bukit Bintang — otherwise use rail or Grab; heat limits long walks."
      },
      {
        "question": "How far is Batu Caves from downtown?",
        "answer": "About 30–45 minutes by Grab or KTM Komuter from KL Sentral."
      }
    ]
  },
  "penang": {
    "overview": "George Town, Penang is a UNESCO-listed street-art city where Nyonya cuisine, clan jetties, spice gardens and hilltop views meet a thriving hawker-food scene.",
    "bestTime": "December–February for driest weather on the west coast",
    "transport": "Walk or Grab in George Town; Rapid Penang buses; funicular to Penang Hill",
    "itinerary": [
      {
        "day": 1,
        "title": "George Town heritage",
        "activities": [
          "Street art trail in the Old Town",
          "Khoo Kongsi clan house",
          "Cheong Fatt Tze (Blue Mansion)",
          "Clan Jetties waterfront walk"
        ]
      },
      {
        "day": 2,
        "title": "Food and hill views",
        "activities": [
          "Gurney Drive hawker breakfast",
          "Penang Hill funicular and Kek Lok Si Temple",
          "Tropical Spice Garden or Batu Ferringhi sunset"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "25–45",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Food is the bargain — heritage boutique hotels are the main mid-range spend."
    },
    "stayAreas": [
      {
        "name": "George Town heritage core",
        "bestFor": "Culture and food",
        "note": "Walkable shophouse hotels near street art"
      },
      {
        "name": "Gurney Drive",
        "bestFor": "Seaside dining",
        "note": "Modern hotels and hawker centres along the coast"
      },
      {
        "name": "Batu Ferringhi",
        "bestFor": "Beach resorts",
        "note": "North-coast strip quieter than George Town at night"
      }
    ],
    "tips": [
      "Start hawker stalls early — popular dishes sell out",
      "Grab works well; parking in Old Town is tight",
      "Sunday reduces some street-food options"
    ],
    "faqs": [
      {
        "question": "Penang or Langkawi?",
        "answer": "Penang for food and heritage; Langkawi for pure beach resort time."
      },
      {
        "question": "Is Penang Hill worth it?",
        "answer": "Yes on a clear day — views and Kek Lok Si nearby make a strong half-day."
      }
    ]
  },
  "tokyo": {
    "overview": "Tokyo layers neon districts, serene shrines, world-class sushi, teamLab art and day-trip options to Nikko or Hakone across a vast but impeccably organised metro region.",
    "bestTime": "March–May (cherry blossom) and October–November (autumn colour)",
    "transport": "Suica/PASMO IC card for JR and metro; Shinkansen for day trips; airport trains from Narita and Haneda",
    "itinerary": [
      {
        "day": 1,
        "title": "East Tokyo classics",
        "activities": [
          "Senso-ji Temple and Nakamise shopping street",
          "Tokyo Skytree observation deck",
          "Sumida River evening stroll"
        ]
      },
      {
        "day": 2,
        "title": "Neon and fashion",
        "activities": [
          "Meiji Shrine forest walk",
          "Harajuku and Omotesando browsing",
          "Shibuya Scramble Crossing",
          "Golden Gai bars in Shinjuku"
        ]
      },
      {
        "day": 3,
        "title": "Day trip",
        "activities": [
          "Hakone loop and Lake Ashi cruise",
          "Owakudani volcanic valley",
          "Onsen soak before return"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "70–100",
      "mid": "120–220",
      "luxury": "250+",
      "note": "Rail and lunch sets help — omakase and luxury hotels dominate upper tiers."
    },
    "stayAreas": [
      {
        "name": "Shinjuku",
        "bestFor": "Transit hub",
        "note": "JR lines everywhere; lively at night"
      },
      {
        "name": "Shibuya",
        "bestFor": "Youth culture",
        "note": "Central for fashion districts and crossing views"
      },
      {
        "name": "Asakusa",
        "bestFor": "Traditional atmosphere",
        "note": "Quieter evenings near Senso-ji"
      }
    ],
    "tips": [
      "Carry cash — many small restaurants are cash-only",
      "Trains stop around midnight — plan last ride home",
      "Remove shoes where indicated in temples and restaurants"
    ],
    "faqs": [
      {
        "question": "Narita or Haneda?",
        "answer": "Haneda is closer to central Tokyo — Narita works with Narita Express or Limousine Bus."
      },
      {
        "question": "Do I need a Japan Rail Pass?",
        "answer": "Only for multiple long-distance trips outside Tokyo — local IC cards suffice in the city."
      }
    ]
  },
  "kyoto": {
    "overview": "Kyoto preserves Japan's classical soul — bamboo groves, golden pavilions, geiko districts and seasonal kaiseki in a flat, bike-friendly city of over 1,600 temples.",
    "bestTime": "March–April and November for peak foliage and cherry blossom",
    "transport": "Bus day passes or subway; rental bicycle for flat areas; JR for Arashiyama",
    "itinerary": [
      {
        "day": 1,
        "title": "Eastern temples",
        "activities": [
          "Fushimi Inari thousand torii hike",
          "Kiyomizu-dera terrace views",
          "Gion evening walk at dusk"
        ]
      },
      {
        "day": 2,
        "title": "West and north",
        "activities": [
          "Arashiyama bamboo grove",
          "Tenryu-ji garden",
          "Kinkaku-ji (Golden Pavilion)",
          "Ryoan-ji rock garden"
        ]
      },
      {
        "day": 3,
        "title": "Nishiki and quieter temples",
        "activities": [
          "Nishiki Market morning snacks",
          "Nijo Castle palace rooms and gardens",
          "Philosopher's Path stroll if cherry or maple season"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "70–100",
      "mid": "120–220",
      "luxury": "250+",
      "note": "Temple entry fees add up — consider multi-site passes for longer stays."
    },
    "stayAreas": [
      {
        "name": "Gion / Higashiyama",
        "bestFor": "Atmosphere",
        "note": "Traditional machiya stays near Kiyomizu-dera"
      },
      {
        "name": "Kawaramachi",
        "bestFor": "Dining and shopping",
        "note": "Central bus and subway hub"
      },
      {
        "name": "Arashiyama",
        "bestFor": "Nature",
        "note": "Quieter west-side base for bamboo grove mornings"
      }
    ],
    "tips": [
      "Arrive at Fushimi Inari before 8am to beat tour groups",
      "Never chase geiko or maiko for photos in Gion",
      "Many temples close around 4–5pm"
    ],
    "faqs": [
      {
        "question": "Kyoto as a day trip from Tokyo?",
        "answer": "Possible by Shinkansen but rushed — two nights minimum."
      },
      {
        "question": "Is Kyoto crowded?",
        "answer": "Major temples are busy midday — go early for Arashiyama and Fushimi Inari."
      }
    ]
  },
  "osaka": {
    "overview": "Osaka is Japan's kitchen — street food in Dotonbori, Osaka Castle history, Universal Studios Japan and a louder, friendlier urban vibe than Tokyo.",
    "bestTime": "March–May and October–November for mild weather",
    "transport": "Osaka Metro and JR Loop Line; IC card everywhere; day pass for heavy sightseeing",
    "itinerary": [
      {
        "day": 1,
        "title": "Castle and canals",
        "activities": [
          "Osaka Castle and museum",
          "Osaka Museum of History",
          "Dotonbori neon and street food crawl"
        ]
      },
      {
        "day": 2,
        "title": "Bay and culture",
        "activities": [
          "Kuromon Ichiba Market breakfast",
          "Shitennoji Temple",
          "Umeda Sky Building Floating Garden",
          "Shinsekai district at night"
        ]
      },
      {
        "day": 3,
        "title": "Day trip",
        "activities": [
          "Nara Park deer and Todai-ji Great Buddha",
          "Kasuga Taisha shrine lanterns",
          "Return via Namba dinner"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "70–100",
      "mid": "120–220",
      "luxury": "250+",
      "note": "Street food keeps meals affordable — USJ tickets are a major optional cost."
    },
    "stayAreas": [
      {
        "name": "Namba",
        "bestFor": "Food and nightlife",
        "note": "Heart of Dotonbori and street-food scene"
      },
      {
        "name": "Umeda",
        "bestFor": "Transit",
        "note": "Major rail hub with department-store dining"
      },
      {
        "name": "Shinsaibashi",
        "bestFor": "Shopping",
        "note": "Covered arcade between Namba and Umeda"
      }
    ],
    "tips": [
      "Stand on the right on escalators here (opposite of Tokyo)",
      "Try takoyaki, okonomiyaki and kushikatsu in their home city",
      "Book Universal Studios Japan tickets in advance for peak seasons"
    ],
    "faqs": [
      {
        "question": "Osaka or Tokyo first?",
        "answer": "Tokyo for breadth, Osaka for food — many Shinkansen between the two."
      },
      {
        "question": "Is Osaka Castle original?",
        "answer": "The main tower is a reconstruction — still worth it for museum exhibits and park views."
      }
    ]
  },
  "seoul": {
    "overview": "Seoul fuses palaces and hanok villages with K-pop culture, BBQ alleys, DMZ history and mountain hikes in a 24-hour capital where tradition and trend sit side by side.",
    "bestTime": "April–June and September–November for pleasant weather",
    "transport": "T-money card for subway and buses; airport AREX train; taxis are affordable",
    "itinerary": [
      {
        "day": 1,
        "title": "Royal Seoul",
        "activities": [
          "Gyeongbokgung Palace changing of the guard",
          "Bukchon Hanok Village walk",
          "Insadong tea and craft shops",
          "Gwangjang Market street food"
        ]
      },
      {
        "day": 2,
        "title": "Modern districts",
        "activities": [
          "N Seoul Tower from Namsan",
          "Myeongdong shopping street",
          "Dongdaemun Design Plaza evening lights"
        ]
      },
      {
        "day": 3,
        "title": "DMZ or Gangnam",
        "activities": [
          "Joint Security Area DMZ tour",
          "Alternatively: Lotte World Tower Seoul Sky",
          "Gangnam BBQ dinner"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "60–90",
      "mid": "100–180",
      "luxury": "250+",
      "note": "Food and transit are reasonable — skincare shopping and premium BBQ add up fast."
    },
    "stayAreas": [
      {
        "name": "Myeongdong",
        "bestFor": "First-timers",
        "note": "Central shopping and subway hub"
      },
      {
        "name": "Hongdae",
        "bestFor": "Youth culture",
        "note": "Indie music, cafés and nightlife near Yonsei"
      },
      {
        "name": "Insadong / Jongno",
        "bestFor": "Palaces",
        "note": "Traditional base walking distance to Gyeongbokgung"
      }
    ],
    "tips": [
      "Palaces are closed Tuesdays — check schedules",
      "DMZ tours require passport and advance booking",
      "Download Papago or Naver Map — Google Maps is limited for transit"
    ],
    "faqs": [
      {
        "question": "How many days in Seoul?",
        "answer": "Three to four days cover palaces, neighbourhoods and either DMZ or a day trip to Suwon."
      },
      {
        "question": "Is Seoul English-friendly?",
        "answer": "Transit signs are bilingual; restaurants vary — point-and-order apps help."
      }
    ]
  },
  "hong-kong": {
    "overview": "Hong Kong packs Victoria Harbour skylines, Peak tram rides, dim sum temples, hiking trails and outlying islands into a compact, bilingual city built for efficient stopovers.",
    "bestTime": "October–April for cooler, clearer weather",
    "transport": "Octopus card for MTR, buses, trams and Star Ferry; Ngong Ping cable car for Big Buddha day",
    "itinerary": [
      {
        "day": 1,
        "title": "Harbour and Peak",
        "activities": [
          "Star Ferry crossing",
          "Peak Tram and Sky Terrace views",
          "Central mid-levels escalator walk"
        ]
      },
      {
        "day": 2,
        "title": "Kowloon culture",
        "activities": [
          "Wong Tai Sin Temple",
          "Chi Lin Nunnery and Nan Lian Garden",
          "Temple Street Night Market",
          "Symphony of Lights harbour show"
        ]
      },
      {
        "day": 3,
        "title": "Island escape",
        "activities": [
          "Ngong Ping 360 cable car",
          "Tian Tan Big Buddha and Po Lin Monastery",
          "Tai O fishing village stilt houses"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "80–120",
      "mid": "120–200",
      "luxury": "300+",
      "note": "Hotels are the main cost — dim sum and MTR rides stay relatively affordable."
    },
    "stayAreas": [
      {
        "name": "Tsim Sha Tsui",
        "bestFor": "Harbour views",
        "note": "Classic tourist base on the Kowloon waterfront"
      },
      {
        "name": "Central",
        "bestFor": "Business and dining",
        "note": "Best for Peak Tram and Lan Kwai Fong nightlife"
      },
      {
        "name": "Causeway Bay",
        "bestFor": "Shopping",
        "note": "Retail-heavy island district with good MTR links"
      }
    ],
    "tips": [
      "Tap Octopus card everywhere — faster than single tickets",
      "Carry a light layer — malls and MTR are heavily air-conditioned",
      "Book Peak Tram online at weekends and holidays"
    ],
    "faqs": [
      {
        "question": "Is Hong Kong easy without Cantonese?",
        "answer": "Yes — English is widely used on signs, the MTR and in tourist areas."
      },
      {
        "question": "Lantau or Macau day trip?",
        "answer": "Lantau fits a half-day from the city; Macau needs a full day via ferry or bridge."
      }
    ]
  },
  "taipei": {
    "overview": "Taipei rewards with night markets, Taipei 101 views, hot springs in Beitou, dumpling institutions and day trips to Jiufen or Yangmingshan national park.",
    "bestTime": "October–April for comfortable temperatures; avoid typhoon season June–September",
    "transport": "EasyCard for MRT and buses; high-speed rail for south Taiwan trips; YouBike for short rides",
    "itinerary": [
      {
        "day": 1,
        "title": "City icons",
        "activities": [
          "Taipei 101 observatory",
          "Chiang Kai-shek Memorial Hall",
          "Longshan Temple",
          "Raohe or Shilin Night Market"
        ]
      },
      {
        "day": 2,
        "title": "North coast day trip",
        "activities": [
          "Jiufen Old Street and teahouses",
          "Shifen waterfall and sky lantern release",
          "Keelung Miaokou Night Market on return"
        ]
      },
      {
        "day": 3,
        "title": "Hot springs and nature",
        "activities": [
          "Beitou Hot Springs Museum",
          "Thermal Valley steam vents",
          "Yangmingshan National Park hike"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "50–80",
      "mid": "90–150",
      "luxury": "200+",
      "note": "Night markets keep food costs low — design hotels and fine dining raise averages."
    },
    "stayAreas": [
      {
        "name": "Ximending",
        "bestFor": "Youth and nightlife",
        "note": "Pedestrian zone with endless food options"
      },
      {
        "name": "Da'an",
        "bestFor": "Cafés and boutiques",
        "note": "Upscale residential area near Taipei 101"
      },
      {
        "name": "Zhongshan",
        "bestFor": "Central access",
        "note": "Good MRT hub between airport line and downtown"
      }
    ],
    "tips": [
      "Carry cash for night-market stalls — some vendors are cash-only",
      "MRT etiquette: no eating, drinking or phone calls on trains",
      "Book hot-spring hotels in Beitou on weekends early"
    ],
    "faqs": [
      {
        "question": "Is Taipei good for food lovers?",
        "answer": "Excellent — night markets, beef noodle soup and Din Tai Fung alone justify a trip."
      },
      {
        "question": "Jiufen or Alishan?",
        "answer": "Jiufen fits a day trip from Taipei; Alishan needs an overnight for sunrise."
      }
    ]
  },
  "hanoi": {
    "overview": "Hanoi is Vietnam's lake-studded capital — French-colonial Old Quarter lanes, Ho Chi Minh Mausoleum solemnity, egg-coffee cafés and gateway status for Ha Long Bay cruises.",
    "bestTime": "October–April for cooler, drier weather",
    "transport": "Grab and taxis; walk Old Quarter; book tours for Ha Long Bay or Ninh Binh",
    "itinerary": [
      {
        "day": 1,
        "title": "Old Quarter and lake",
        "activities": [
          "Hoan Kiem Lake and Ngoc Son Temple",
          "Old Quarter walking tour",
          "Water puppet show at Thang Long Theatre",
          "Bia hơi corner beer"
        ]
      },
      {
        "day": 2,
        "title": "History and culture",
        "activities": [
          "Ho Chi Minh Mausoleum complex",
          "Temple of Literature",
          "Hoa Lo Prison museum",
          "Train Street (check access rules)"
        ]
      },
      {
        "day": 3,
        "title": "Ha Long Bay",
        "activities": [
          "Day or overnight cruise among karst islands",
          "Sung Sot Cave or kayaking",
          "Seafood lunch on board"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–40",
      "mid": "45–90",
      "luxury": "150+",
      "note": "Among Asia's best value — Ha Long cruises are the main mid-range splurge."
    },
    "stayAreas": [
      {
        "name": "Old Quarter",
        "bestFor": "First-timers",
        "note": "Walkable chaos of street food and lake views"
      },
      {
        "name": "French Quarter",
        "bestFor": "Quieter stays",
        "note": "Colonial boulevards near Hoan Kiem's south edge"
      },
      {
        "name": "Tay Ho (West Lake)",
        "bestFor": "Expats and cafés",
        "note": "Leafier neighbourhood with lakeside dining"
      }
    ],
    "tips": [
      "Cross streets slowly and steadily — traffic weaves around pedestrians",
      "Dress modestly for mausoleum and temple visits",
      "Book Ha Long cruises with licensed operators only"
    ],
    "faqs": [
      {
        "question": "Hanoi or Ho Chi Minh City?",
        "answer": "Hanoi for history and north Vietnam trips; HCMC for Mekong Delta and south — many do both."
      },
      {
        "question": "Is Hanoi walkable?",
        "answer": "Old Quarter yes — use Grab for mausoleum and airport transfers."
      }
    ]
  },
  "ho-chi-minh-city": {
    "overview": "Ho Chi Minh City (Saigon) pulses with rooftop bars, War Remnants history, Ben Thanh Market energy and Mekong Delta day trips in Vietnam's commercial south.",
    "bestTime": "December–April for drier weather",
    "transport": "Grab everywhere; walk District 1 core; tours for Cu Chi and Mekong",
    "itinerary": [
      {
        "day": 1,
        "title": "Colonial core",
        "activities": [
          "Notre-Dame Cathedral Basilica and Central Post Office",
          "Reunification Palace",
          "Ben Thanh Market",
          "Nguyen Hue walking street at night"
        ]
      },
      {
        "day": 2,
        "title": "History and districts",
        "activities": [
          "War Remnants Museum",
          "Jade Emperor Pagoda",
          "Binh Tay Market in Cholon",
          "Rooftop bar in District 1"
        ]
      },
      {
        "day": 3,
        "title": "Cu Chi or Mekong",
        "activities": [
          "Cu Chi Tunnels half-day",
          "Alternatively: Mekong Delta boat and orchard tour",
          "Street-food dinner on Vo Van Tan"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–40",
      "mid": "45–90",
      "luxury": "150+",
      "note": "Excellent street-food value — rooftop cocktails and boutique hotels raise daily totals."
    },
    "stayAreas": [
      {
        "name": "District 1",
        "bestFor": "Sightseeing",
        "note": "Central for landmarks, markets and nightlife"
      },
      {
        "name": "District 3",
        "bestFor": "Local feel",
        "note": "Quieter residential area near the War Remnants Museum"
      },
      {
        "name": "District 2 (Thao Dien)",
        "bestFor": "Expats",
        "note": "Riverside cafés and international schools enclave"
      }
    ],
    "tips": [
      "Keep bags secure on motorbike-heavy sidewalks",
      "Carry small dong notes for street vendors",
      "Book Cu Chi tours early — afternoon heat is intense"
    ],
    "faqs": [
      {
        "question": "Saigon or Hanoi first?",
        "answer": "Fly into one coast and out the other if possible — domestic flights are cheap."
      },
      {
        "question": "Is HCMC safe?",
        "answer": "Generally yes — watch for pickpockets in markets and scam taxis; use Grab."
      }
    ]
  },
  "hoi-an": {
    "overview": "Hoi An's UNESCO Ancient Town glows with yellow walls, lantern nights and riverside cafés — a walkable base for beaches, cooking classes and custom tailoring.",
    "bestTime": "February–April for dry, pleasant weather",
    "transport": "Bicycle rental in town; taxi to An Bang Beach; shuttle from Da Nang airport",
    "itinerary": [
      {
        "day": 1,
        "title": "Ancient Town",
        "activities": [
          "Japanese Covered Bridge",
          "Assembly halls and old merchant houses",
          "Central Market lunch",
          "Lantern-lit old town after dark"
        ]
      },
      {
        "day": 2,
        "title": "Beach and countryside",
        "activities": [
          "An Bang Beach morning swim",
          "Tra Que Vegetable Village cycle",
          "Thu Bon River boat at sunset"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–40",
      "mid": "45–90",
      "luxury": "150+",
      "note": "Tailoring and cooking classes are popular mid-range extras."
    },
    "stayAreas": [
      {
        "name": "Ancient Town",
        "bestFor": "Atmosphere",
        "note": "Heritage hotels inside the pedestrian core"
      },
      {
        "name": "An Bang Beach",
        "bestFor": "Beach mornings",
        "note": "Boutique resorts a short taxi from old town"
      },
      {
        "name": "Cam Chau",
        "bestFor": "Value",
        "note": "Residential area between town and beach"
      }
    ],
    "tips": [
      "Buy an Ancient Town ticket for assembly halls and old houses",
      "Tailoring needs 24–48 hours — plan ahead",
      "Full Moon nights restrict motor traffic in the old town"
    ],
    "faqs": [
      {
        "question": "Hoi An or Da Nang?",
        "answer": "Hoi An for charm and tailoring; Da Nang for resort beaches — they are 45 minutes apart."
      },
      {
        "question": "When is the lantern festival?",
        "answer": "Monthly on the full moon — plus daily lantern lighting after dusk year-round."
      }
    ]
  },
  "manila": {
    "overview": "Manila is the Philippines' sprawling capital — Intramuros walled history, Rizal Park, mall culture and jumping-off point for Palawan or Visayas island hops.",
    "bestTime": "December–May for drier weather",
    "transport": "Grab essential; LRT/MRT limited; airport in Pasay close to Manila Bay hotels",
    "itinerary": [
      {
        "day": 1,
        "title": "Intramuros",
        "activities": [
          "Fort Santiago and Rizal Shrine",
          "San Agustin Church",
          "Casa Manila museum",
          "Kalesa ride or walking the walls"
        ]
      },
      {
        "day": 2,
        "title": "Modern Manila",
        "activities": [
          "National Museum complex",
          "Rizal Park and Manila Cathedral",
          "Sunset at Manila Baywalk",
          "Mall of Asia evening"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "25–45",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Strong value — traffic time is the hidden cost more than money."
    },
    "stayAreas": [
      {
        "name": "Makati",
        "bestFor": "Business and dining",
        "note": "Upscale malls and safer pedestrian pockets"
      },
      {
        "name": "Bonifacio Global City (BGC)",
        "bestFor": "Modern comfort",
        "note": "Master-planned district with international restaurants"
      },
      {
        "name": "Ermita / Malate",
        "bestFor": "Sightseeing",
        "note": "Near Intramuros and Rizal Park — livelier at night"
      }
    ],
    "tips": [
      "Allow extra time for traffic — distances are deceptive",
      "Use Grab instead of street taxis where possible",
      "Intramuros is best explored on foot early before heat builds"
    ],
    "faqs": [
      {
        "question": "Is Manila worth visiting?",
        "answer": "One to two days for Intramuros and museums — most travellers quickly connect to beaches or islands."
      },
      {
        "question": "Which airport for Manila?",
        "answer": "NAIA (MNL) serves the metro — allow buffer time between terminals and hotels."
      }
    ]
  },
  "cebu": {
    "overview": "Cebu City is the Visayas hub — Magellan's Cross, Taoist temples, lechon feasts and ferry links to Bohol, Moalboal and island adventures across the central Philippines.",
    "bestTime": "December–May for dry season",
    "transport": "Grab in city; buses and ferries for Bohol; tours for Kawasan or Oslob (ethical whale-shark rules apply)",
    "itinerary": [
      {
        "day": 1,
        "title": "Historic Cebu",
        "activities": [
          "Basilica del Santo Niño and Magellan's Cross",
          "Fort San Pedro",
          "Temple of Leah or Taoist Temple viewpoint",
          "Larsian lechon dinner"
        ]
      },
      {
        "day": 2,
        "title": "Bohol day trip",
        "activities": [
          "Fast ferry to Tagbilaran",
          "Chocolate Hills viewpoint",
          "Tarsier sanctuary",
          "Loboc River lunch cruise"
        ]
      },
      {
        "day": 3,
        "title": "Island escape",
        "activities": [
          "Mactan Island beach morning",
          "Nalusuan or Hilutungan snorkel",
          "Return via Mactan shrine"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "25–45",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Island day trips and resort stays on Mactan are the main mid-range costs."
    },
    "stayAreas": [
      {
        "name": "Mactan Island",
        "bestFor": "Beach resorts",
        "note": "Near airport with dive shops and resort strip"
      },
      {
        "name": "Cebu City centre",
        "bestFor": "History",
        "note": "Close to Basilica and Fort San Pedro"
      },
      {
        "name": "IT Park / Lahug",
        "bestFor": "Dining",
        "note": "Younger crowd and restaurant cluster"
      }
    ],
    "tips": [
      "Book Bohol ferries ahead on weekends",
      "Avoid unethical whale-shark feeding at Oslob if welfare is a concern",
      "Try Cebu lechon — Anthony Bourdain's favourite island dish"
    ],
    "faqs": [
      {
        "question": "Cebu or Manila entry?",
        "answer": "Cebu if your focus is Visayas islands — Manila for north Luzon or Palawan connections."
      },
      {
        "question": "How long in Cebu?",
        "answer": "Two to three days cover city sights plus one Bohol or beach day."
      }
    ]
  },
  "boracay": {
    "overview": "Boracay is a small Malay municipality famous for White Beach powder sand, sunset sails, island hopping and a compact strip of resorts on a rehabilitated island.",
    "bestTime": "November–May for calm seas; avoid habagat wind season",
    "transport": "Caticlan airport then boat transfer; e-trikes and walking on the island",
    "itinerary": [
      {
        "day": 1,
        "title": "White Beach",
        "activities": [
          "Station 1–3 beach walk",
          "Parasailing or paddleboard hire",
          "Sunset sail on a paraw"
        ]
      },
      {
        "day": 2,
        "title": "Island tour",
        "activities": [
          "Motorbike or boat to Puka Shell Beach",
          "Ariel's Point or cliff-jump spot (seasonal)",
          "D'Mall dinner and live music"
        ]
      },
      {
        "day": 3,
        "title": "Water and viewpoints",
        "activities": [
          "Snorkel at Crocodile Island",
          "Mount Luho viewpoint",
          "Beach massage at Station 2"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "25–45",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Resort tier drives costs — activities and dining stay moderate outside peak holidays."
    },
    "stayAreas": [
      {
        "name": "Station 1",
        "bestFor": "Quiet luxury",
        "note": "Wide sand and upscale resorts at White Beach's north end"
      },
      {
        "name": "Station 2",
        "bestFor": "Action",
        "note": "Central hub for D'Mall, bars and boat tours"
      },
      {
        "name": "Bulabog Beach",
        "bestFor": "Kitesurfing",
        "note": "East-side wind beach away from White Beach crowds"
      }
    ],
    "tips": [
      "No single-use plastics on the island — bring a refill bottle",
      "Book accredited boat operators for island hops",
      "Peak Holy Week and Christmas require early hotel booking"
    ],
    "faqs": [
      {
        "question": "Is Boracay crowded?",
        "answer": "Station 2 is busiest — Station 1 and Bulabog offer more space; weekdays are quieter."
      },
      {
        "question": "Caticlan or Kalibo airport?",
        "answer": "Caticlan (MPH) is closer — Kalibo is a longer bus ride but sometimes cheaper flights."
      }
    ]
  },
  "male": {
    "overview": "Malé is the dense Maldivian capital on a tiny coral island — colourful mosques, fish markets and ferry hops to Hulhumalé, while most visitors transfer straight to resort atolls.",
    "bestTime": "November–April for driest weather across the Maldives",
    "transport": "Walking in Malé; airport ferry to Malé or bridge to Hulhumalé; seaplane or speedboat to resorts",
    "itinerary": [
      {
        "day": 1,
        "title": "Capital island",
        "activities": [
          "Islamic Centre and Grand Friday Mosque exterior",
          "Malé Fish Market and local market",
          "Sultan Park and National Museum",
          "Rasfannu artificial beach"
        ]
      },
      {
        "day": 2,
        "title": "Hulhumalé and transfer",
        "activities": [
          "Hulhumalé Beach morning swim",
          "Street-food lunch on the reclaimed island",
          "Speedboat or seaplane transfer to resort atoll"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "50–80",
      "mid": "80–150",
      "luxury": "300+",
      "note": "Covers Malé/Hulhumalé city stays only — resort islands are priced separately and often USD 300+ per night."
    },
    "stayAreas": [
      {
        "name": "Malé",
        "bestFor": "Short layovers",
        "note": "Compact city hotels near ferry terminals"
      },
      {
        "name": "Hulhumalé",
        "bestFor": "Beach access near airport",
        "note": "Reclaimed island with a public beach and guesthouses"
      },
      {
        "name": "Maafushi (nearby local island)",
        "bestFor": "Budget Maldives",
        "note": "Speedboat from airport — not Malé city but common alternative base"
      }
    ],
    "tips": [
      "Alcohol is only on resort islands — not in Malé city",
      "Dress modestly in the capital — bikinis only on designated resort/local island beaches",
      "Confirm seaplane baggage limits before packing"
    ],
    "faqs": [
      {
        "question": "Do I need to stay in Malé?",
        "answer": "Only for late arrivals or city interest — most fly in and boat straight to resorts."
      },
      {
        "question": "Is Malé worth exploring?",
        "answer": "Half a day suffices — it is one of the world's densest capitals with authentic local life."
      }
    ]
  },
  "colombo": {
    "overview": "Colombo is Sri Lanka's coastal capital — Galle Face Green sunsets, colonial Fort districts, Buddhist temples and the launch pad for Kandy, Galle and hill-country trains.",
    "bestTime": "January–March for west-coast dry season",
    "transport": "PickMe/Grab; tuk-tuks for short hops; train from Fort Station for hill country",
    "itinerary": [
      {
        "day": 1,
        "title": "Fort and waterfront",
        "activities": [
          "Galle Face Green promenade",
          "Old Dutch Hospital precinct dining",
          "Gangaramaya Temple",
          "Independence Memorial Hall"
        ]
      },
      {
        "day": 2,
        "title": "Markets and museums",
        "activities": [
          "Pettah Market maze",
          "National Museum of Colombo",
          "Red Mosque (Jami Ul-Alfar) exterior",
          "Mount Lavinia beach sunset"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "25–45",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Excellent value — colonial boutique hotels are the main splurge in the capital."
    },
    "stayAreas": [
      {
        "name": "Colombo Fort",
        "bestFor": "History",
        "note": "Central for museums and Dutch Hospital dining"
      },
      {
        "name": "Cinnamon Gardens",
        "bestFor": "Upscale",
        "note": "Leafy embassy quarter with boutique hotels"
      },
      {
        "name": "Mount Lavinia",
        "bestFor": "Beach",
        "note": "Suburban beach strip south of the core"
      }
    ],
    "tips": [
      "Cover shoulders and knees at temples",
      "Negotiate tuk-tuk fares or use PickMe for fixed pricing",
      "Allow time for Pettah — it is easy to get turned around"
    ],
    "faqs": [
      {
        "question": "How long in Colombo?",
        "answer": "One to two days before heading to hill country or the south coast."
      },
      {
        "question": "Is Colombo safe?",
        "answer": "Generally yes for tourists — standard urban awareness for tuk-tuk scams and traffic."
      }
    ]
  },
  "galle": {
    "overview": "Galle Fort is a UNESCO Dutch-colonial walled city on Sri Lanka's south coast — lighthouse views, boutique hotels, Unawatuna beaches and easy rail links from Colombo.",
    "bestTime": "December–March for dry south-coast weather",
    "transport": "Train from Colombo to Galle; tuk-tuks inside the fort; scooter for nearby beaches",
    "itinerary": [
      {
        "day": 1,
        "title": "Fort walls",
        "activities": [
          "Walk the ramparts at sunset",
          "Galle Lighthouse and clock tower",
          "Dutch Reformed Church",
          "Fort boutiques and cafés"
        ]
      },
      {
        "day": 2,
        "title": "Coast and countryside",
        "activities": [
          "Unawatuna or Jungle Beach swim",
          "Japanese Peace Pagoda viewpoint",
          "Stilt fishermen photo stop (tip respectfully)"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "25–45",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Fort boutique hotels punch above their price — beach clubs add optional spend."
    },
    "stayAreas": [
      {
        "name": "Galle Fort",
        "bestFor": "Heritage",
        "note": "Converted Dutch merchants' houses inside the walls"
      },
      {
        "name": "Unawatuna",
        "bestFor": "Beach",
        "note": "Bay beach a short tuk-tuk from the fort"
      },
      {
        "name": "Hikkaduwa",
        "bestFor": "Surf",
        "note": "North along the coast for reef breaks and casual guesthouses"
      }
    ],
    "tips": [
      "Fort walls are best at golden hour — midday heat is intense",
      "Respect stilt fishermen — pay or ask before photographing up close",
      "Train seats on the coastal line sell out — buy ahead in peak season"
    ],
    "faqs": [
      {
        "question": "Galle Fort or Unawatuna base?",
        "answer": "Fort for atmosphere and dining; Unawatuna for sand at your doorstep — they are minutes apart."
      },
      {
        "question": "Day trip from Colombo?",
        "answer": "Possible by train but tight — one night minimum captures the rampart sunset."
      }
    ]
  },
  "kathmandu": {
    "overview": "Kathmandu Valley holds Durbar Square pagodas, Swayambhunath stupa eyes, Thamel trekking shops and the gateway aura for Everest and Annapurna adventures.",
    "bestTime": "October–November and March–April for clear mountain views",
    "transport": "Taxis and walking in valley; domestic flights or road to Pokhara; trek agencies in Thamel",
    "itinerary": [
      {
        "day": 1,
        "title": "Old Kathmandu",
        "activities": [
          "Durbar Square and Kumari Bahal",
          "Swayambhunath (Monkey Temple) stupa circuit",
          "Thamel dinner and gear browsing"
        ]
      },
      {
        "day": 2,
        "title": "Sacred sites",
        "activities": [
          "Pashupatinath Temple ghats (exterior respectful viewing)",
          "Boudhanath stupa kora walk",
          "Patan Durbar Square across the river"
        ]
      },
      {
        "day": 3,
        "title": "Valley viewpoint",
        "activities": [
          "Nagarkot sunrise (overnight or very early drive)",
          "Bhaktapur Durbar Square pottery squares",
          "Return via Changunarayan temple"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–40",
      "mid": "45–80",
      "luxury": "120+",
      "note": "Budget paradise — trekking permits and flights to Lukla dominate adventure budgets, not city costs."
    },
    "stayAreas": [
      {
        "name": "Thamel",
        "bestFor": "Trekkers",
        "note": "Gear shops, agencies and international restaurants"
      },
      {
        "name": "Boudha",
        "bestFor": "Spiritual calm",
        "note": "Guesthouses near Boudhanath stupa"
      },
      {
        "name": "Patan (Lalitpur)",
        "bestFor": "Crafts",
        "note": "Quieter durbar square and metalwork workshops"
      }
    ],
    "tips": [
      "Get TIMS and national park permits through a registered agency for treks",
      "Mask up during dry season — valley dust and pollution spike",
      "Only drink treated or bottled water"
    ],
    "faqs": [
      {
        "question": "How many days acclimatise before trekking?",
        "answer": "At least one full day in Kathmandu — two if flying straight from sea level."
      },
      {
        "question": "Is post-earthquake Kathmandu rebuilt?",
        "answer": "Major sites are restored or under ongoing conservation — still deeply worth visiting."
      }
    ]
  },
  "pokhara": {
    "overview": "Pokhara sits on Phewa Lake beneath Annapurna panoramas — paragliding, boating, World Peace Pagoda hikes and the relaxed staging point before Annapurna treks.",
    "bestTime": "October–November and March–May for mountain visibility",
    "transport": "Tourist buses or short flight from Kathmandu; lakeside walking; taxis to Sarangkot",
    "itinerary": [
      {
        "day": 1,
        "title": "Lake and lakeside",
        "activities": [
          "Phewa Lake boat to Tal Barahi Temple",
          "Lakeside promenade cafés",
          "Sunset from World Peace Pagoda hike or taxi"
        ]
      },
      {
        "day": 2,
        "title": "Sunrise and adventure",
        "activities": [
          "Sarangkot pre-dawn for Annapurna sunrise",
          "Paragliding from Sarangkot ridge (weather permitting)",
          "Devi's Fall and Gupteshwor Cave"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–40",
      "mid": "45–80",
      "luxury": "120+",
      "note": "Paragliding and lake resorts are optional mid-range extras — base costs stay low."
    },
    "stayAreas": [
      {
        "name": "Lakeside",
        "bestFor": "First-timers",
        "note": "Restaurants, agencies and boat piers along the east shore"
      },
      {
        "name": "North Lakeside",
        "bestFor": "Quieter",
        "note": "More residential stretch with smaller guesthouses"
      },
      {
        "name": "Damside",
        "bestFor": "Budget",
        "note": "South shore near the dam — fewer tourists, lower rates"
      }
    ],
    "tips": [
      "Book paragliding with licensed operators only — check weather windows",
      "Sarangkot needs warm layers for pre-dawn chill",
      "Road from Kathmandu takes 6–8 hours — flights save time in monsoon"
    ],
    "faqs": [
      {
        "question": "Pokhara or Kathmandu first?",
        "answer": "Kathmandu for culture, Pokhara to unwind before or after a trek — many fly one way."
      },
      {
        "question": "Can I see Everest from Pokhara?",
        "answer": "Annapurna and Machapuchare dominate — Everest is not visible from Pokhara."
      }
    ]
  },
  "delhi": {
    "overview": "Delhi spans millennia — Mughal Red Fort grandeur, Humayun's Tomb symmetry, Chandni Chowk chaos and New Delhi's wide Rajpath boulevards in India's capital region.",
    "bestTime": "October–March for cooler weather",
    "transport": "Delhi Metro with smart card; auto-rickshaws with meter or app; Uber/Ola widely",
    "itinerary": [
      {
        "day": 1,
        "title": "Old Delhi",
        "activities": [
          "Red Fort and Jama Masjid",
          "Chandni Chowk rickshaw and spice lanes",
          "Raj Ghat memorial",
          "Karim's or Old Delhi kebab dinner"
        ]
      },
      {
        "day": 2,
        "title": "New Delhi icons",
        "activities": [
          "Humayun's Tomb",
          "Qutub Minar complex",
          "India Gate and Rajpath drive",
          "Khan Market evening"
        ]
      },
      {
        "day": 3,
        "title": "Day trip",
        "activities": [
          "Early Taj Mahal visit in Agra",
          "Agra Fort afternoon",
          "Return to Delhi via Yamuna Expressway"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–50",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Metro and street food are bargains — heritage hotels and fine dining raise mid tiers."
    },
    "stayAreas": [
      {
        "name": "Connaught Place",
        "bestFor": "Central access",
        "note": "Metro hub with colonial-circle architecture"
      },
      {
        "name": "South Delhi (Hauz Khas / GK)",
        "bestFor": "Dining",
        "note": "Younger crowd, boutiques and restaurants"
      },
      {
        "name": "Karol Bagh",
        "bestFor": "Budget",
        "note": "Hotel cluster with metro access west of CP"
      }
    ],
    "tips": [
      "Dress modestly at mosques and temples — carry a scarf",
      "Use metro in rush hour — road traffic is unpredictable",
      "Stay hydrated; air quality dips in November"
    ],
    "faqs": [
      {
        "question": "Delhi or Mumbai first?",
        "answer": "Delhi for north India gateways (Rajasthan, Agra); Mumbai for west coast and Bollywood energy."
      },
      {
        "question": "Is Delhi safe for solo women?",
        "answer": "Use registered cabs at night, dress conservatively in crowded areas and prefer metro over empty autos."
      }
    ]
  },
  "mumbai": {
    "overview": "Mumbai is India's maximum city — Gateway of India harbour views, Marine Drive sunsets, Bollywood dreams, Colaba markets and Victoria Terminus Gothic bustle.",
    "bestTime": "November–February for dry, cooler weather",
    "transport": "Local trains (avoid peak crush as a tourist); black-and-yellow taxis and Uber; ferries to Elephanta",
    "itinerary": [
      {
        "day": 1,
        "title": "Colaba and Fort",
        "activities": [
          "Gateway of India and Taj Mahal Palace exterior",
          "Elephanta Caves ferry and rock-cut temples",
          "Colaba Causeway shopping",
          "Marine Drive sunset"
        ]
      },
      {
        "day": 2,
        "title": "Markets and museums",
        "activities": [
          "Chhatrapati Shivaji Terminus architecture",
          "Crawford Market",
          "Dhobi Ghat viewing platform",
          "Bollywood drive through Bandra"
        ]
      },
      {
        "day": 3,
        "title": "Neighbourhood flavour",
        "activities": [
          "Dharavi guided walking tour",
          "Haji Ali Dargah at low tide",
          "Bandra-Worli Sea Link drive",
          "Street-food tour in Mohammed Ali Road (seasonal)"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–50",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Sea-view hotels drive luxury tier — local trains and vada pav keep daily costs low."
    },
    "stayAreas": [
      {
        "name": "Colaba",
        "bestFor": "Sightseeing",
        "note": "Walkable to Gateway and Fort district museums"
      },
      {
        "name": "Bandra",
        "bestFor": "Trendy dining",
        "note": "Suburban vibe with seaside cafés"
      },
      {
        "name": "Lower Parel",
        "bestFor": "Business",
        "note": "Converted mill district with upscale malls"
      }
    ],
    "tips": [
      "Allow triple time for cross-city drives in rush hour",
      "Book Elephanta ferries on weekday mornings for calmer crowds",
      "Local trains are fast but packed — avoid office peaks"
    ],
    "faqs": [
      {
        "question": "How many days in Mumbai?",
        "answer": "Two to three days cover harbour sights, markets and one neighbourhood deep dive."
      },
      {
        "question": "Is Mumbai expensive?",
        "answer": "Hotels vary wildly — street food and local trains remain very affordable."
      }
    ]
  },
  "jaipur": {
    "overview": "Jaipur, the Pink City, glows with Amber Fort hilltop drama, Hawa Mahal facades, City Palace courtyards and bazaar-filled old-town lanes in Rajasthan's capital.",
    "bestTime": "October–March for comfortable desert-climate touring",
    "transport": "Auto-rickshaws and Uber; hire a car for Amber Fort and outskirts; walking in old city bazaars",
    "itinerary": [
      {
        "day": 1,
        "title": "Forts and palaces",
        "activities": [
          "Amber Fort elephant or jeep ascent",
          "Jaigarh Fort cannon views",
          "Panna Meena ka Kund stepwell"
        ]
      },
      {
        "day": 2,
        "title": "Pink City core",
        "activities": [
          "Hawa Mahal photo stop",
          "City Palace and Jantar Mantar observatory",
          "Johari Bazaar and Bapu Bazaar shopping"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–50",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Heritage haveli hotels are the highlight splurge — crafts shopping adds optional cost."
    },
    "stayAreas": [
      {
        "name": "Pink City (Old City)",
        "bestFor": "Heritage",
        "note": "Haveli stays near Hawa Mahal and bazaars"
      },
      {
        "name": "Civil Lines",
        "bestFor": "Quiet comfort",
        "note": "Colonial-era leafy area with upscale hotels"
      },
      {
        "name": "Bani Park",
        "bestFor": "Value",
        "note": "Popular hotel district north of the station"
      }
    ],
    "tips": [
      "Bargain politely in bazaars — fixed-price shops exist for crafts",
      "Start Amber Fort early to beat heat and crowds",
      "Dress for sun — shade is scarce at fort complexes"
    ],
    "faqs": [
      {
        "question": "Jaipur in the Golden Triangle?",
        "answer": "Yes — Delhi–Agra–Jaipur is the classic one-week north India loop by car or train."
      },
      {
        "question": "Are elephant rides at Amber Fort ethical?",
        "answer": "Many travellers now choose jeep ascent — check current welfare policies before booking."
      }
    ]
  },
  "udaipur": {
    "overview": "Udaipur is Rajasthan's romantic lake city — Lake Pichola palaces, City Palace museums, sunset boat rides and marble lattice work in the Aravalli hills.",
    "bestTime": "October–March for pleasant lake weather",
    "transport": "Auto-rickshaws; walking in old city; car for Monsoon Palace hilltop",
    "itinerary": [
      {
        "day": 1,
        "title": "Palaces and lake",
        "activities": [
          "City Palace museum complex",
          "Jagdish Temple",
          "Lake Pichola sunset boat ride",
          "Ambrai ghat dinner views"
        ]
      },
      {
        "day": 2,
        "title": "Hills and crafts",
        "activities": [
          "Monsoon Palace (Sajjangarh) viewpoint",
          "Sahelion-ki-Bari gardens",
          "Shilpgram craft village or Bagore ki Haveli dance show"
        ]
      },
      {
        "day": 3,
        "title": "Slow lake day",
        "activities": [
          "Fateh Sagar Lake promenade",
          "Rooftop cafés with City Palace views",
          "Shopping for miniature paintings and textiles in the old city"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–50",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Lake-view palace hotels define luxury — mid-range havelis offer strong value."
    },
    "stayAreas": [
      {
        "name": "Lake Pichola ghats",
        "bestFor": "Views",
        "note": "Heritage hotels on Hanuman Ghat and Gangaur Ghat"
      },
      {
        "name": "Old City",
        "bestFor": "Walking",
        "note": "Narrow lanes near City Palace and markets"
      },
      {
        "name": "Fateh Sagar area",
        "bestFor": "Quieter",
        "note": "Second lake neighbourhood with cafés and less tourist crush"
      }
    ],
    "tips": [
      "Book lake-view dinner restaurants ahead for sunset slots",
      "Boat rides sell out at peak season — queue early",
      "Udaipur is hillier than it looks — wear comfortable shoes"
    ],
    "faqs": [
      {
        "question": "Udaipur or Jodhpur?",
        "answer": "Udaipur for lakes and romance; Jodhpur for fort desert drama — combine if time allows."
      },
      {
        "question": "How many days in Udaipur?",
        "answer": "Two full days cover palaces, boat ride and one hill or craft outing."
      }
    ]
  },
  "goa": {
    "overview": "Goa mixes Portuguese churches, spice plantations, north-beach parties and south-coast quiet coves on India's smallest state — a tropical pause between heritage cities.",
    "bestTime": "November–February for dry, cooler beach weather",
    "transport": "Scooter rental popular; taxis and app cabs; buses between north and south",
    "itinerary": [
      {
        "day": 1,
        "title": "Old Goa heritage",
        "activities": [
          "Basilica of Bom Jesus and Se Cathedral",
          "Church of St. Cajetan",
          "Fontainhas Latin Quarter walk in Panaji",
          "Miramar Beach sunset"
        ]
      },
      {
        "day": 2,
        "title": "North beaches",
        "activities": [
          "Anjuna or Vagator cliff views",
          "Arambol or Ashwem beach time",
          "Saturday Night Market (seasonal)"
        ]
      },
      {
        "day": 3,
        "title": "South Goa calm",
        "activities": [
          "Palolem or Agonda beach morning",
          "Spice plantation tour",
          "Colva or Benaulim sunset"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–50",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Beach shacks are cheap — New Year's and Christmas beach resorts spike prices sharply."
    },
    "stayAreas": [
      {
        "name": "North Goa (Anjuna / Vagator)",
        "bestFor": "Nightlife",
        "note": "Clubs, flea markets and cliffside cafés"
      },
      {
        "name": "South Goa (Palolem / Agonda)",
        "bestFor": "Relaxation",
        "note": "Quieter crescent beaches and yoga retreats"
      },
      {
        "name": "Panaji (Fontainhas)",
        "bestFor": "Culture",
        "note": "Capital base for Old Goa churches and Latin Quarter"
      }
    ],
    "tips": [
      "Monsoon (June–September) closes many beach shacks — check season",
      "Scooter helmets are legally required — police fines are common",
      "Respect church dress codes in Old Goa"
    ],
    "faqs": [
      {
        "question": "North or South Goa?",
        "answer": "North for social energy; South for peaceful sand — split a week if you can."
      },
      {
        "question": "Is Goa only beaches?",
        "answer": "No — Old Goa churches, spice farms and Fontainhas rival the coast for culture."
      }
    ]
  },
  "varanasi": {
    "overview": "Varanasi (Banaras) is Hinduism's spiritual heart — Ganges ghats at dawn, Ganga Aarti fire rituals, labyrinthine old-city lanes and silk-weaving workshops.",
    "bestTime": "October–March for cooler mornings on the river",
    "transport": "Walking ghats; auto-rickshaws for distances; sunrise boat from Dasaswamedh or Assi Ghat",
    "itinerary": [
      {
        "day": 1,
        "title": "Ghats and old city",
        "activities": [
          "Sunrise boat ride past Manikarnika and Harishchandra ghats",
          "Kashi Vishwanath Temple corridor (book slots)",
          "Dashashwamedh Ghat evening Ganga Aarti"
        ]
      },
      {
        "day": 2,
        "title": "Temples and silk",
        "activities": [
          "Sarnath Buddhist site day trip",
          "Silk weaving workshop in Madanpura",
          "Blue Lassi or old-city street-food walk"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–50",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Among India's most affordable pilgrim cities — river-view heritage hotels are the splurge."
    },
    "stayAreas": [
      {
        "name": "Assi Ghat",
        "bestFor": "Atmosphere",
        "note": "Student and yoga crowd with wider lanes than core ghats"
      },
      {
        "name": "Dasaswamedh area",
        "bestFor": "Ritual access",
        "note": "Central ghat for boat rides and aarti"
      },
      {
        "name": "Cantt (Cantonment)",
        "bestFor": "Comfort",
        "note": "Modern hotels away from old-city maze — taxi to ghats"
      }
    ],
    "tips": [
      "Respect cremation ghats — no photography without explicit permission",
      "Wear shoes you can remove frequently for temple entries",
      "Morning boat rides are essential — afternoons are hot and hazy"
    ],
    "faqs": [
      {
        "question": "Is Varanasi overwhelming?",
        "answer": "Sensory intensity is part of it — a good guide helps navigate ghats and customs respectfully."
      },
      {
        "question": "Can I swim in the Ganges?",
        "answer": "Locals bathe for ritual — tourists usually observe; water quality varies; follow local advice."
      }
    ]
  },
  "agra": {
    "overview": "Agra is synonymous with the Taj Mahal — dawn marble reflections, Agra Fort red-sandstone power and Fatehpur Sikri's ghost capital on the Golden Triangle circuit.",
    "bestTime": "October–March for clear Taj views",
    "transport": "Auto-rickshaws and Uber; Yamuna Expressway from Delhi; tongas near Taj east gate",
    "itinerary": [
      {
        "day": 1,
        "title": "Taj and fort",
        "activities": [
          "Taj Mahal sunrise from main gate",
          "Agra Fort palaces and river views",
          "Mehtab Bagh sunset Taj silhouette"
        ]
      },
      {
        "day": 2,
        "title": "Mughal outskirts",
        "activities": [
          "Fatehpur Sikri UNESCO site",
          "Buland Darwaza and Jama Masjid",
          "Agra marble inlay workshop demo"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "20–50",
      "mid": "50–100",
      "luxury": "150+",
      "note": "Taj entry and guide fees are fixed — hotel tier drives most daily variance."
    },
    "stayAreas": [
      {
        "name": "Taj Ganj",
        "bestFor": "Early Taj access",
        "note": "Budget hotels walking distance to east gate"
      },
      {
        "name": "Fatehabad Road",
        "bestFor": "Mid-range",
        "note": "Hotel strip with Taj-view rooftop restaurants"
      },
      {
        "name": "Civil Lines",
        "bestFor": "Quieter",
        "note": "Colonial neighbourhood away from monument crowds"
      }
    ],
    "tips": [
      "Taj Mahal closed Fridays — plan around it",
      "Leave bags at hotel — strict security at monument gates",
      "Book sunrise entry slot online in advance"
    ],
    "faqs": [
      {
        "question": "Day trip from Delhi or overnight?",
        "answer": "Overnight captures sunrise and Mehtab Bagh sunset — day trips rush the magic."
      },
      {
        "question": "Best Taj photo spot?",
        "answer": "Mehtab Bagh across the river at sunset — inside grounds at reflecting pool for classic symmetry."
      }
    ]
  },
  "london": {
    "overview": "London layers royal pageantry, world museums, West End theatre and neighbourhood markets from Notting Hill to Borough — a global city best explored by Tube and on foot.",
    "bestTime": "May–September for long daylight; December for festive lights",
    "transport": "Oyster or contactless for Tube and buses; Thames Clipper for river views; trains for day trips",
    "itinerary": [
      {
        "day": 1,
        "title": "Westminster and South Bank",
        "activities": [
          "Westminster Abbey and Parliament exterior",
          "London Eye rotation",
          "Tate Modern and Millennium Bridge",
          "Borough Market lunch"
        ]
      },
      {
        "day": 2,
        "title": "Royal and parks",
        "activities": [
          "Buckingham Palace Changing of the Guard",
          "St Paul's Cathedral",
          "Tower of London and Crown Jewels",
          "Tower Bridge walk"
        ]
      },
      {
        "day": 3,
        "title": "Museums day",
        "activities": [
          "British Museum highlights",
          "National Gallery in Trafalgar Square",
          "Covent Garden evening",
          "West End show"
        ]
      }
    ],
    "tripCost": {
      "currency": "GBP",
      "budget": "60–90",
      "mid": "100–180",
      "luxury": "250+",
      "note": "Many major museums are free — theatre tickets and central hotels drive mid-range totals."
    },
    "stayAreas": [
      {
        "name": "Covent Garden",
        "bestFor": "First-timers",
        "note": "Walkable to West End, Thames and museums"
      },
      {
        "name": "South Kensington",
        "bestFor": "Museums",
        "note": "V&A, Natural History and Science Museum cluster"
      },
      {
        "name": "Shoreditch",
        "bestFor": "Trendy dining",
        "note": "East London street art, markets and nightlife"
      }
    ],
    "tips": [
      "Book West End shows and major exhibitions weeks ahead",
      "Stand right on Tube escalators",
      "Sunday museum mornings are quieter than Saturday"
    ],
    "faqs": [
      {
        "question": "How many days in London?",
        "answer": "Four days cover major sights — add time for Windsor, Oxford or Brighton day trips."
      },
      {
        "question": "Is the London Pass worth it?",
        "answer": "Only if you stack multiple paid attractions in short time — many top museums are free."
      }
    ]
  },
  "paris": {
    "overview": "Paris lives on café terraces, Louvre masterpieces, Eiffel Tower sparkle, Seine strolls and village-like arrondissements — the benchmark city-break destination.",
    "bestTime": "April–June and September–October for mild weather and fewer crowds",
    "transport": "Navigo Easy or contactless for Métro; Vélib bikes; RER for Versailles and CDG",
    "itinerary": [
      {
        "day": 1,
        "title": "Classic icons",
        "activities": [
          "Eiffel Tower summit or second floor",
          "Trocadéro gardens",
          "Seine river cruise at dusk",
          "Champs-Élysées to Arc de Triomphe"
        ]
      },
      {
        "day": 2,
        "title": "Art and islands",
        "activities": [
          "Louvre Museum highlights",
          "Notre-Dame exterior and Île de la Cité",
          "Saint-Germain-des-Prés café stop",
          "Latin Quarter dinner"
        ]
      },
      {
        "day": 3,
        "title": "Montmartre and Marais",
        "activities": [
          "Sacré-Cœur and Place du Tertre",
          "Moulin Rouge exterior photo stop",
          "Marais falafel lunch and boutiques",
          "Musée d'Orsay Impressionists"
        ]
      }
    ],
    "tripCost": {
      "currency": "EUR",
      "budget": "60–90",
      "mid": "100–180",
      "luxury": "250+",
      "note": "Museum passes and metro are reasonable — fine dining and Left Bank hotels push luxury tier."
    },
    "stayAreas": [
      {
        "name": "Le Marais",
        "bestFor": "Boutique hotels",
        "note": "Central, walkable and full of cafés"
      },
      {
        "name": "Saint-Germain-des-Prés",
        "bestFor": "Classic Paris",
        "note": "Literary cafés near Luxembourg Gardens"
      },
      {
        "name": "Opéra / 9th",
        "bestFor": "Value",
        "note": "Good metro hub with department stores"
      }
    ],
    "tips": [
      "Book Louvre and Eiffel timed slots online",
      "Watch for pickpockets on Métro Line 1 and tourist hotspots",
      "Many restaurants close between lunch and dinner — check hours"
    ],
    "faqs": [
      {
        "question": "Paris in two days?",
        "answer": "Possible for Eiffel, Louvre and one neighbourhood — three days feel much less rushed."
      },
      {
        "question": "Versailles day trip?",
        "answer": "Worth a full day — go early Tuesday–Sunday; palace closed Mondays."
      }
    ]
  },
  "rome": {
    "overview": "Rome is an open-air museum — Colosseum gladiator history, Vatican frescoes, Trevi coin tosses and trattoria carbonara in the Eternal City.",
    "bestTime": "April–June and September–October for walkable weather",
    "transport": "Walk the centro storico; Metro for Vatican; buses and trams with BIT tickets",
    "itinerary": [
      {
        "day": 1,
        "title": "Ancient Rome",
        "activities": [
          "Colosseum and Roman Forum",
          "Palatine Hill ruins",
          "Capitoline Hill viewpoint",
          "Trastevere dinner"
        ]
      },
      {
        "day": 2,
        "title": "Vatican and baroque",
        "activities": [
          "Vatican Museums and Sistine Chapel",
          "St. Peter's Basilica dome climb",
          "Castel Sant'Angelo bridge",
          "Piazza Navona aperitivo"
        ]
      },
      {
        "day": 3,
        "title": "Fountains and neighbourhoods",
        "activities": [
          "Trevi Fountain early morning",
          "Pantheon and Piazza della Rotonda",
          "Spanish Steps and Villa Borghese",
          "Testaccio food market"
        ]
      }
    ],
    "tripCost": {
      "currency": "EUR",
      "budget": "60–90",
      "mid": "100–180",
      "luxury": "250+",
      "note": "Vatican and Colosseum skip-the-line tickets are key mid-range costs — trattoria meals stay moderate."
    },
    "stayAreas": [
      {
        "name": "Centro Storico",
        "bestFor": "Walkability",
        "note": "Pantheon and Piazza Navona doorstep"
      },
      {
        "name": "Trastevere",
        "bestFor": "Nightlife",
        "note": "Cobbled lanes with trattorias and bars"
      },
      {
        "name": "Monti",
        "bestFor": "Local vibe",
        "note": "Trendy neighbourhood near Colosseum"
      }
    ],
    "tips": [
      "Book Vatican and Colosseum weeks ahead in summer",
      "Shoulders covered for basilica entry — bring a scarf",
      "Drink from nasoni public fountains — safe and free"
    ],
    "faqs": [
      {
        "question": "Rome or Florence?",
        "answer": "Rome for ancient scale and Vatican; Florence for Renaissance intimacy — many train between them."
      },
      {
        "question": "How many days in Rome?",
        "answer": "Three minimum for ancient, Vatican and baroque layers without sprinting."
      }
    ]
  },
  "istanbul": {
    "overview": "Istanbul straddles Europe and Asia — Hagia Sophia domes, Blue Mosque tiles, Grand Bazaar haggling, Bosphorus ferries and rooftop restaurants above the Golden Horn.",
    "bestTime": "April–May and September–October for pleasant sightseeing weather",
    "transport": "Istanbulkart for trams and ferries; walking Sultanahmet; Marmaray under the Bosphorus",
    "itinerary": [
      {
        "day": 1,
        "title": "Sultanahmet core",
        "activities": [
          "Hagia Sophia",
          "Blue Mosque",
          "Topkapi Palace harem and terraces",
          "Basilica Cistern underground"
        ]
      },
      {
        "day": 2,
        "title": "Bazaars and Bosphorus",
        "activities": [
          "Grand Bazaar and Spice Bazaar",
          "Bosphorus public ferry to Ortaköy",
          "Galata Tower sunset",
          "Istiklal Avenue evening walk"
        ]
      },
      {
        "day": 3,
        "title": "Asian side",
        "activities": [
          "Kadıköy market lunch",
          "Moda seaside promenade",
          "Üsküdar mosques and Maiden's Tower view",
          "Return ferry at night"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "40–70",
      "mid": "80–140",
      "luxury": "200+",
      "note": "Strong value for a transcontinental capital — carpet shopping and hammam spas are optional splurges."
    },
    "stayAreas": [
      {
        "name": "Sultanahmet",
        "bestFor": "First-timers",
        "note": "Walking distance to Hagia Sophia and Topkapi"
      },
      {
        "name": "Karaköy / Galata",
        "bestFor": "Design hotels",
        "note": "Waterfront cafés near Galata Tower"
      },
      {
        "name": "Beyoğlu",
        "bestFor": "Nightlife",
        "note": "Istiklal Avenue and rooftop bar scene"
      }
    ],
    "tips": [
      "Remove shoes and cover hair/shoulders at active mosques",
      "Haggle politely in bazaars — start around half asking price",
      "Carry cash for small vendors; cards widely accepted in hotels"
    ],
    "faqs": [
      {
        "question": "Do I need a visa for Türkiye?",
        "answer": "Many nationalities use e-Visa online — check your passport rules before booking."
      },
      {
        "question": "European or Asian side?",
        "answer": "European side for classic sights; cross to Kadıköy for local food and fewer tour groups."
      }
    ]
  },
  "cairo": {
    "overview": "Cairo pulses at the edge of the Sahara — Giza pyramids on the plateau, Egyptian Museum treasures, Khan el-Khalili bazaar chaos and Nile felucca sunsets.",
    "bestTime": "October–April for cooler desert touring weather",
    "transport": "Uber/Careem; metro limited for tourists; guided tours for Giza and Saqqara",
    "itinerary": [
      {
        "day": 1,
        "title": "Giza plateau",
        "activities": [
          "Great Pyramid of Giza exterior",
          "Sphinx viewpoint",
          "Solar boat museum",
          "Sound and light show (evening optional)"
        ]
      },
      {
        "day": 2,
        "title": "Museums and old Cairo",
        "activities": [
          "Egyptian Museum or Grand Egyptian Museum (check opening)",
          "Khan el-Khalili bazaar",
          "Al-Azhar Park sunset over minarets"
        ]
      },
      {
        "day": 3,
        "title": "Saqqara and Memphis",
        "activities": [
          "Step Pyramid of Djoser at Saqqara",
          "Memphis open-air colossus",
          "Coptic Cairo churches and Hanging Church"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "25–45",
      "mid": "50–100",
      "luxury": "180+",
      "note": "Entry fees and licensed guides add up at sites — Nile hotels raise luxury averages."
    },
    "stayAreas": [
      {
        "name": "Zamalek (Gezira Island)",
        "bestFor": "Upscale calm",
        "note": "Leafy island on the Nile with embassies and cafés"
      },
      {
        "name": "Downtown (Tahrir)",
        "bestFor": "Museums",
        "note": "Near Egyptian Museum and Nile Corniche"
      },
      {
        "name": "Giza",
        "bestFor": "Pyramid access",
        "note": "Pyramid-view hotels on the plateau fringe"
      }
    ],
    "tips": [
      "Hire licensed guides at Giza — tout pressure is intense",
      "Dress modestly at mosques and Coptic sites",
      "Drink bottled water and negotiate taxi fares upfront"
    ],
    "faqs": [
      {
        "question": "Is Cairo safe for tourists?",
        "answer": "Major sites are heavily patrolled — use common sense, registered guides and avoid political gatherings."
      },
      {
        "question": "GEM or old Egyptian Museum?",
        "answer": "Check which is open during your dates — GEM is the new flagship when fully operational."
      }
    ]
  },
  "marrakech": {
    "overview": "Marrakech assaults the senses — Jemaa el-Fnaa square at dusk, Bahia Palace zellij, souk labyrinth shopping, Majorelle blue gardens and Atlas Mountain day trips.",
    "bestTime": "March–May and September–November for warm days without extreme heat",
    "transport": "Walking medina with GPS pin drops; petit taxis for Gueliz; tours for Atlas or Agafay desert",
    "itinerary": [
      {
        "day": 1,
        "title": "Medina icons",
        "activities": [
          "Bahia Palace and Saadian Tombs",
          "Koutoubia Mosque exterior",
          "Jemaa el-Fnaa food stalls at night",
          "Rooftop dinner over the square"
        ]
      },
      {
        "day": 2,
        "title": "Souks and gardens",
        "activities": [
          "Ben Youssef Madrasa",
          "Souk Semmarine leather and spice lanes",
          "Majorelle Garden and YSL Museum",
          "Menara Gardens sunset"
        ]
      },
      {
        "day": 3,
        "title": "Atlas escape",
        "activities": [
          "Ourika Valley or Imlil village in the High Atlas",
          "Berber lunch with mountain views",
          "Return for hammam spa evening"
        ]
      }
    ],
    "tripCost": {
      "currency": "USD",
      "budget": "35–55",
      "mid": "70–120",
      "luxury": "200+",
      "note": "Riads define the experience — souk shopping and desert tours are flexible add-ons."
    },
    "stayAreas": [
      {
        "name": "Medina (Old City)",
        "bestFor": "Atmosphere",
        "note": "Riads inside the walls near Jemaa el-Fnaa"
      },
      {
        "name": "Kasbah",
        "bestFor": "Quieter medina",
        "note": "South district near Saadian Tombs"
      },
      {
        "name": "Gueliz",
        "bestFor": "Modern comfort",
        "note": "Ville nouvelle with chain hotels and cafés"
      }
    ],
    "tips": [
      "Fix riad location pin for taxis — medina addresses confuse drivers",
      "Haggle in souks with humour — walk away to test final prices",
      "Dress modestly in the medina — shoulders and knees covered"
    ],
    "faqs": [
      {
        "question": "Marrakech or Fes?",
        "answer": "Marrakech for energy and riads; Fes for deeper medieval craft culture — both fit in one week."
      },
      {
        "question": "Is the water safe?",
        "answer": "Stick to bottled — brush teeth with bottled in sensitive stomachs."
      }
    ]
  },
  "sydney": {
    "overview": "Sydney Harbour frames the Opera House sails, Bondi to Coogee coastal walk, ferries to Manly and a laid-back outdoor culture in Australia's first city.",
    "bestTime": "September–November and March–May for warm weather without peak summer crowds",
    "transport": "Opal card for ferries, trains and buses; walk the CBD and Circular Quay",
    "itinerary": [
      {
        "day": 1,
        "title": "Harbour icons",
        "activities": [
          "Sydney Opera House tour or exterior walk",
          "Royal Botanic Garden to Mrs Macquarie's Chair",
          "Circular Quay to The Rocks pubs",
          "Harbour Bridge Pylon lookout"
        ]
      },
      {
        "day": 2,
        "title": "Beaches and coast",
        "activities": [
          "Bondi to Coogee coastal walk",
          "Bondi Icebergs pool photo stop",
          "Ferry to Manly Beach and Corso",
          "Sunset from North Head lookout"
        ]
      },
      {
        "day": 3,
        "title": "Culture and neighbourhoods",
        "activities": [
          "Art Gallery of NSW",
          "Darling Harbour and Barangaroo",
          "Newtown or Surry Hills dining",
          "Optional Blue Mountains day trip"
        ]
      }
    ],
    "tripCost": {
      "currency": "AUD",
      "budget": "80–120",
      "mid": "130–220",
      "luxury": "300+",
      "note": "Harbour-view hotels and fine dining drive costs — Opal transit and casual cafés are reasonable."
    },
    "stayAreas": [
      {
        "name": "The Rocks / Circular Quay",
        "bestFor": "Icons",
        "note": "Opera House and ferry wharves at your feet"
      },
      {
        "name": "Darling Harbour",
        "bestFor": "Families",
        "note": "Aquarium, museums and waterfront dining"
      },
      {
        "name": "Bondi",
        "bestFor": "Beach life",
        "note": "Coastal village vibe — bus to CBD"
      }
    ],
    "tips": [
      "Tap on/off Opal card correctly — fines apply",
      "Swim between the flags at patrolled beaches",
      "Book Opera House tours ahead in holiday periods"
    ],
    "faqs": [
      {
        "question": "How many days in Sydney?",
        "answer": "Three to four days cover harbour, one coastal walk and a neighbourhood or Blue Mountains day."
      },
      {
        "question": "Sydney or Melbourne?",
        "answer": "Sydney for harbour and beaches; Melbourne for laneways and culture — domestic flights are frequent."
      }
    ]
  },
  "melbourne": {
    "overview": "Melbourne is Australia's culture capital — laneway coffee, street art, Queen Victoria Market, Great Ocean Road day trips and trams rattling through Victorian terraces.",
    "bestTime": "March–May and September–November for mild weather",
    "transport": "Myki card for trams and trains; Free Tram Zone in CBD; rental car for Great Ocean Road",
    "itinerary": [
      {
        "day": 1,
        "title": "CBD laneways",
        "activities": [
          "Hosier Lane street art",
          "Block Arcade and Royal Arcade",
          "State Library Victoria reading room",
          "Yarra River walk at sunset"
        ]
      },
      {
        "day": 2,
        "title": "Markets and sport",
        "activities": [
          "Queen Victoria Market morning",
          "Melbourne Cricket Ground tour",
          "St Kilda Beach and Luna Park",
          "Chapel Street or Fitzroy dining"
        ]
      },
      {
        "day": 3,
        "title": "Great Ocean Road",
        "activities": [
          "Twelve Apostles lookout",
          "Loch Ard Gorge coastal walk",
          "Koala spotting at Kennett River",
          "Return via inland route"
        ]
      }
    ],
    "tripCost": {
      "currency": "AUD",
      "budget": "80–120",
      "mid": "130–220",
      "luxury": "300+",
      "note": "Coffee and tram rides are affordable — Great Ocean Road tours and fine dining raise totals."
    },
    "stayAreas": [
      {
        "name": "CBD / Flinders Quarter",
        "bestFor": "First-timers",
        "note": "Free tram zone and walking distance to laneways"
      },
      {
        "name": "Fitzroy",
        "bestFor": "Bohemian vibe",
        "note": "Street art, vintage shops and brunch cafés"
      },
      {
        "name": "St Kilda",
        "bestFor": "Beach",
        "note": "Bay beach, penguins (seasonal) and seaside dining"
      }
    ],
    "tips": [
      "Melbourne weather shifts fast — carry layers and an umbrella",
      "Myki must be tapped on and off — inspectors fine regularly",
      "Book MCG tours on non-match days for best access"
    ],
    "faqs": [
      {
        "question": "Melbourne without a car?",
        "answer": "Yes for CBD — rent or join a tour for Great Ocean Road."
      },
      {
        "question": "Best coffee neighbourhood?",
        "answer": "Fitzroy and Carlton are rivals — follow the longest queue of locals."
      }
    ]
  }
} as const;
