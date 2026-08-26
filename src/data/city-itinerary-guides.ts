/**
 * Shared 5–15 day city itinerary articles (Top 100 + ranks 101–200).
 * Matches destination-guides.ts shape. Uses real city sights only.
 */
import type { Article, ArticleSection, City } from "@/lib/types";
import {
  itineraryDaysForCity,
  top100GuideArticleSlug,
} from "@/data/top100-guide-meta";
import {
  filterRealSights,
  honestCityOverview,
  isGenericCityOverview,
} from "@/lib/content-legitimacy";
import { PHOTOS, unsplash } from "@/lib/images";
import { tripCostForPlace } from "@/lib/travel-budgets";
import { authors } from "@/data/authors";

const AUTHOR_ROTATION = [authors.amelia, authors.marco, authors.sofia] as const;

/**
 * Optional extra days drawn from our own “why go” notes — not invented
 * landmarks. Used only when the randomised length is longer than the sight list.
 */
const REGION_EXTRAS: Record<string, string[]> = {
  milan: ["Optional day trip toward Lake Como if you want water and villages beyond the Duomo"],
  osaka: ["Easy rail day to Kyoto temples or Nara’s deer park if you want a slower Kansai day"],
  dublin: ["Optional countryside day (coastal walk or a booked day tour) if the city feels covered"],
  beijing: ["Great Wall day if it is already on your sight list — start early and do not stack it with the Forbidden City"],
  brussels: ["Train to Bruges or Ghent for a quieter Flemish day once Grand Place is done"],
  zurich: ["Alpine day trip on a clear-weather morning — check mountain transport times before you commit"],
  geneva: ["Lake Geneva or a French-side Alpine town if you want scenery beyond the Jet d’Eau"],
  edinburgh: ["Optional Highlands or coastal day tour if you have energy after the Old Town"],
  naples: ["Pompeii or a coastal day toward the Amalfi area — pick one; stacking both is a brutal day"],
  lisbon: ["Sintra palaces or Cascais coast — one focused outing beats racing both"],
  porto: ["Douro Valley wine-country day if you want river views beyond the lodges"],
  nice: ["Riviera town-hopping (Villefranche, Èze or Monaco) by train along the coast"],
  marrakech: ["Atlas foothills day trip if the medina starts to feel intense"],
  "cape-town": ["Cape Peninsula drive or Stellenbosch / Franschhoek Winelands — one full day each"],
  cusco: ["Sacred Valley day, then Machu Picchu on a separate ticketed day — do not rush altitude"],
  "san-francisco": ["Bay Area day (Sausalito, Muir Woods or a coastal loop) if fog keeps the city slow"],
  "las-vegas": ["Red Rock or a canyon day into the desert Southwest — leave the Strip for night"],
  vancouver: ["North Shore mountains or a sea-to-sky day when the weather is clear"],
  melbourne: ["Great Ocean Road or a peninsula day trip — too long to combine with a full city day"],
  auckland: ["Hauraki Gulf island or a North Island day drive — Auckland is a gateway as much as a city"],
  hanoi: ["Ha Long or Lan Ha Bay overnight if your budget allows — better than a rushed day cruise"],
  phuket: ["Island-hopping boat day (Phi Phi or quieter islands) — book a reputable operator"],
  "chiang-mai": ["Ethical elephant sanctuary or Doi Inthanon — pick one full day, not both"],
  "siem-reap": ["Second Angkor day for the quieter temples after sunrise at Angkor Wat"],
  manila: ["Intramuros deep-dive, then treat extra days as rest before an island flight"],
  cebu: ["Beach or diving day outside the city — Cebu City is the hub, not the whole trip"],
  taipei: ["Mountain or hot-spring day trip (Beitou, Jiufen or similar) when the city list is done"],
  amman: ["Dead Sea float day, or the start of a Petra / Wadi Rum add-on — Amman is the logistics base"],
  petra: ["A second full day inside the site plus Little Petra — one afternoon is not enough"],
  reykjavik: ["Golden Circle day, then a south-coast or lagoon day — do not drive tired in winter"],
  helsinki: ["Suomenlinna fortress island or a Baltic ferry day if you want time on the water"],
  oslo: ["Fjord or museum-island day when the weather is kind"],
  krakow: ["Auschwitz-Birkenau is a heavy, necessary history day — do not pack nightlife after it"],
  dubrovnik: ["Adriatic island boat day in shoulder season if the walls feel crowded"],
  split: ["Ferry day to Hvar or another Dalmatian island — Split is the hub"],
  salzburg: ["Alpine lake or fortress-plus-village day beyond Mozart’s old town"],
  antalya: ["Roman ruins plus a beach day — the Turkish Riviera rewards an unhurried pace"],
  cancun: ["Isla Mujeres, Tulum ruins or a quieter Yucatán site — one outing per day"],
  athens: ["Acropolis cluster first, then a ferry day if you are continuing to the islands"],
  cairo: ["Giza pyramids as their own day — do not sandwich them between downtown museums"],
  "hong-kong": ["Harbour icons, then a trail or outlying-island day — the compact footprint is the point"],
  barcelona: ["Gaudí cluster, then a beach or neighbourhood day so the trip is not only queues"],
  "los-angeles": ["Plan by district (beach, studios, downtown) — LA punishes a packed single-base checklist"],
  frankfurt: ["Museum-river day in town, then a Rhine or Heidelberg add-on if you have spare time"],
  toronto: ["Waterfront and neighbourhood food, plus a Niagara day only if you want it"],
  lima: ["Coastal food and museums in Lima; Machu Picchu is a separate flight, not a day trip"],
  "mexico-city": ["Roma / Condesa one day, Coyoacán another — the capital is too big to rush"],
  havana: ["Classic-car Malecón loop, then a slower day in Vedado or a nearby beach if you want sea air"],
  cartagena: ["Walled old town first, then Getsemaní and a Rosario Islands boat day — not the same afternoon"],
  santiago: ["City museums and hills one day, then a Maipo or Valparaíso outing if you have energy"],
  johannesburg: ["Apartheid Museum and township history as their own day — do not rush it into a safari transfer"],
  nairobi: ["Nairobi National Park or a museum morning, then treat extra days as safari staging, not filler sightseeing"],
  zanzibar: ["Stone Town walking day, then a spice or beach day on the island — pick one outing, not both"],
  jaipur: ["Amber Fort as its own morning, then the Pink City core — stacking both with shopping is too much"],
  agra: ["Taj Mahal at a sane hour, then Agra Fort; Fatehpur Sikri only if you have a full extra day"],
  kathmandu: ["Durbar squares first, then a valley day (Bhaktapur or Patan) — do not race all three"],
  colombo: ["Fort and Galle Face one day, then a coastal train start toward Galle if you are continuing south"],
  male: ["The capital is a transfer and market morning — extra days belong on a resort island, not downtown"],
  honolulu: ["Waikiki and Diamond Head one day, then a windward or North Shore day — Honolulu is the hub"],
  "san-diego": ["Balboa Park or the waterfront, then a Coronado or coastal day — do not stack the zoo with a long drive"],
  seattle: ["Pike Place and the waterfront, then a ferry or mountain-clear day when the weather cooperates"],
  "hoi-an": ["Ancient Town after dark, then a beach or Marble Mountains day — keep one day slow"],
  "da-nang": ["My Khe beach time, then Hoi An as a day or overnight — Da Nang is the practical base"],
  "luang-prabang": ["Temples and Mekong sunset first, then Kuang Si falls as a dedicated outing"],
  busan: ["Haeundae or the old town, then a temple or coastal day — Busan rewards neighbourhood pacing"],
  jeju: ["One crater or waterfall cluster per day — circling the island in a single loop is a miserable drive"],
  fukuoka: ["Canal City and ramen one day, then Dazaifu if you want a shrine outing beyond the city"],
  sapporo: ["Odori and beer-hall energy, then a day toward Otaru or a snow-season mountain if you came for winter"],
  "xi-an": ["Terracotta Army as its own day — do not sandwich it between the city wall and the Muslim Quarter"],
  goa: ["Pick north or south beaches as a base; a church-and-spice day inland is enough contrast"],
  varanasi: ["Dawn ghats, then a slower old-city walk — a second river morning is better than a rushed Sarnath stack"],
  udaipur: ["Lake palaces and the old town, then a countryside or temple outing if you have a spare day"],
  galle: ["Fort walls at golden hour, then a south-coast beach day rather than a Colombo day-return"],
  pokhara: ["Lakeside and a viewpoint sunrise, then a short trek or waterfall day — not both if you just arrived"],
  boracay: ["White Beach time is the trip; one island-hopping boat day is enough contrast"],
  palawan: ["Puerto Princesa caves or Honda Bay as a full outing — El Nido is a separate transfer, not a day trip"],
  penang: ["George Town street art and food first, then a Penang Hill or beach day"],
  langkawi: ["One cable-car or island-hopping day, then unscripted beach time"],
  "koh-samui": ["One side of the island per day; Ang Thong is a boat day, not an add-on after temples"],
  krabi: ["Ao Nang or Railay, then a four-island boat day — pick a reputable operator"],
  luxor: ["East Bank temples one day, West Bank tombs another — combining both is a heat-stroke itinerary"],
  aswan: ["Nile-side town and a Nubian village or Philae day; Abu Simbel is its own early start"],
  "sharm-el-sheikh": ["A reef or boat day, then a Ras Mohammed outing — the resort strip is not the whole trip"],
  fez: ["Medina deep-dive one day, then a pottery or nearby Roman-site outing if you want air"],
  casablanca: ["Hassan II and the corniche, then treat extra days as a Marrakech or coastal add-on"],
  "victoria-falls": ["The falls on the Zimbabwe side as a full outing; a gorge or river activity is a second day"],
  ibiza: ["Old Town and a cala beach day; nightlife is optional, not a required third pillar"],
  malaga: ["Picasso and the Alcazaba, then a Caminito or coastal town day if you want out of the centre"],
  granada: ["Alhambra as its own timed ticket day — Albaicín is the evening, not the same morning"],
  bilbao: ["Guggenheim and the estuary, then a San Sebastián food day only if you want a long train"],
  bordeaux: ["Riverfront and wine museums, then a Médoc or Saint-Émilion day — one château cluster"],
  marseille: ["Vieux-Port and Le Panier, then Calanques only in good weather with a booked slot"],
  interlaken: ["One lake or mountain transport day at a time — Jungfrau weather windows matter"],
  lucerne: ["Chapel Bridge and the lake, then a Pilatus or Rigi day when the forecast is clear"],
  innsbruck: ["Old town and ski-jump views, then a Stubai or Alpine village day"],
  bergen: ["Bryggen and Fløyen, then a fjord day — do not drive tired after a late arrival"],
  tallinn: ["Old Town first, then Kadriorg or a Baltic day if you want space"],
  crete: ["Heraklion and Knossos one day, then a beach or second Minoan site — not a island-circling marathon"],
  rhodes: ["Medieval town, then a Lindos day — combining both with beach clubs is too much sun"],
  cappadocia: ["One valley walk plus a viewpoint sunset; a second valley or underground city is another day"],
  bodrum: ["Castle and marina, then a peninsula beach or boat day"],
  tbilisi: ["Old Tbilisi and sulfur baths, then a Mtskheta or wine-region day"],
  "sao-paulo": ["One neighbourhood cluster per day (Paulista, Centro, Vila Madalena) — the metro is your friend"],
  bogota: ["La Candelaria and Monserrate, then a Zipaquirá outing if you want out of the altitude core"],
  quito: ["Old Town and a cable-car view, then a Mitad del Mundo or cloud-forest day — Galápagos is a flight"],
  galapagos: ["Follow the booked boat or island-hopping plan; extra days are rest, not invented extra islands"],
  "punta-cana": ["Resort beach time plus one excursion (Saona or a local town) — do not stack two boat days"],
  "quebec-city": ["Old Québec walking days, then Île d’Orléans or a waterfall outing"],
  banff: ["One lake or trail cluster per day — Banff Avenue is the evening, not a sightseeing list"],
  "gold-coast": ["A surf beach day, then a hinterland or theme-park day — pick one intensity"],
  brisbane: ["River and South Bank, then a Moreton Island or coastal day"],
  perth: ["Kings Park and Fremantle, then Rottnest as its own ferry day"],
};

function withStop(text: string): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return "";
  return /[.!?]$/.test(t) ? t : `${t}.`;
}

function listPhrase(items: string[], max = 4): string {
  const slice = items.filter(Boolean).slice(0, max);
  if (slice.length === 0) return "";
  if (slice.length === 1) return slice[0];
  if (slice.length === 2) return `${slice[0]} and ${slice[1]}`;
  return `${slice.slice(0, -1).join(", ")}, and ${slice.slice(-1)[0]}`;
}

function normKey(value: string): string {
  return value
    .replace(/^Visit\s+/i, "")
    .replace(/\s*\([^)]*\)/g, " ")
    .replace(/[—–,&]/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(the|and|or|at|in|of|from)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(value: string): Set<string> {
  return new Set(normKey(value).split(" ").filter((w) => w.length > 2));
}

function similarSight(a: string, b: string): boolean {
  const A = tokenSet(a);
  const B = tokenSet(b);
  if (!A.size || !B.size) return false;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter += 1;
  if (inter >= 2 && (inter === A.size || inter === B.size)) return true;
  return inter / new Set([...A, ...B]).size >= 0.6;
}

function uniqNorm(items: string[]): string[] {
  const out: string[] = [];
  for (const raw of items) {
    const t = raw.replace(/^Visit\s+/i, "").replace(/\s+/g, " ").trim();
    if (!t || t.length < 3) continue;
    if (out.some((existing) => similarSight(existing, t))) continue;
    out.push(t);
  }
  return out;
}

function dropFromPool(pool: string[], used: string[]) {
  for (let i = pool.length - 1; i >= 0; i--) {
    if (used.some((u) => similarSight(pool[i], u))) pool.splice(i, 1);
  }
}

function sightPool(city: City): string[] {
  const fromItinerary = (city.itinerary || []).flatMap((d) => d.activities || []);
  const fromSights = filterRealSights(city.thingsToDo);
  const museums = (city.museums || []).filter((m) => m && !/^regional museum/i.test(m));
  const gems = filterRealSights(city.hiddenGems);
  return uniqNorm([...fromItinerary, ...fromSights, ...museums, ...gems]);
}

function shortLabel(sight: string): string {
  return sight.replace(/\s*\(.*\)\s*/g, " ").split(/[—–,]/)[0].trim().slice(0, 42);
}

function joinActs(acts: string[]): string {
  if (acts.length === 0) return "";
  if (acts.length === 1) return acts[0];
  if (acts.length === 2) return `${acts[0]}, then ${acts[1]}`;
  return `${acts[0]}, then ${acts[1]}, and leave room for ${acts[acts.length - 1]}`;
}

function coreDayBody(name: string, acts: string[], variant: number): string {
  const joined = joinActs(acts);
  const tails = [
    `Keep transfers short — ${name} is more enjoyable when you cluster nearby sights instead of crossing the city twice.`,
    `Start earlier than you think; popular spots in ${name} fill fast, and late afternoon is better for a slow meal than another queue.`,
    `Build in a café or park pause. A first visit to ${name} fails when every hour is a transit sprint.`,
    `If rain or heat hits, swap the outdoor stop for an indoor one on this list and save the viewpoint for clearer light.`,
  ];
  return `${withStop(joined)} ${tails[variant % tails.length]}`;
}

function optionOrCoreBody(name: string, title: string, acts: string[], variant: number): string {
  if (/option/i.test(title) && acts.length > 1) {
    return `Pick one of these, not all of them: ${acts.join("; ")}. Combining every option in a single day is too rushed for ${name}.`;
  }
  return coreDayBody(name, acts, variant);
}

type PlannedDay = { title: string; body: string };

function planDays(city: City, days: number, why: string): PlannedDay[] {
  const pool = sightPool(city);
  const extras = [...(REGION_EXTRAS[city.slug] || [])];
  const foods = uniqNorm(city.localFoods || []).slice(0, 4);
  const eats = uniqNorm((city.restaurants || []).map((r) => r.name)).slice(0, 3);
  const areas = (city.stayAreas || []).map((a) => a.name);
  const shopping = uniqNorm(city.shopping || []).slice(0, 2);
  const planned: PlannedDay[] = [];

  planned.push({
    title: `Day 1 — Arrival & first evening in ${city.name}`,
    body: `${areas[0] ? `Check in around ${areas[0]}` : "Check in and drop bags"}, take an easy neighbourhood walk rather than a big-ticket sight, ${foods[0] ? `and have a first plate of ${foods[0]}` : "and keep dinner simple and nearby"}. Keep day one short. ${withStop(why)} Sleep off the flight instead of rushing a museum. Confirm airport transfer time — ${city.airport || "the main airport"} can sit farther out than the map suggests.`,
  });

  const inner = days - 2;
  const curated = (city.itinerary || []).filter((d) => d.activities?.length);
  let cursor = 0;

  for (let i = 0; i < inner; i++) {
    const dayNum = i + 2;
    const slot = i / Math.max(inner, 1);

    if (i === 0 && curated[0]) {
      const acts = uniqNorm(curated[0].activities);
      dropFromPool(pool, acts);
      planned.push({
        title: `Day ${dayNum} — ${curated[0].title}`,
        body: optionOrCoreBody(city.name, curated[0].title, acts.slice(0, 4), i),
      });
      cursor = 1;
      continue;
    }

    if (cursor < curated.length && slot < 0.55) {
      const block = curated[cursor];
      cursor += 1;
      const acts = uniqNorm(block.activities);
      dropFromPool(pool, acts);
      planned.push({
        title: `Day ${dayNum} — ${block.title}`,
        body: optionOrCoreBody(city.name, block.title, acts.slice(0, 4), i),
      });
      continue;
    }

    if (slot > 0.35 && slot < 0.55 && extras.length > 0) {
      planned.push({
        title: `Day ${dayNum} — Day trip or wider ${city.name} region`,
        body: `${withStop(extras.shift() || "")} Pack water, start early, and treat this as the “one long transfer” day so the rest of the ${city.name} plan stays walkable.`,
      });
      continue;
    }

    if (slot > 0.45 && slot < 0.7 && (foods.length > 0 || eats.length > 0) && i % 3 === 2) {
      const foodBit = foods.length
        ? `Look for ${listPhrase(foods, 3)}`
        : `Follow a neighbourhood food crawl`;
      const restBit = eats.length ? ` Trusted starting points include ${listPhrase(eats, 3)}.` : "";
      planned.push({
        title: `Day ${dayNum} — Food & neighbourhoods`,
        body: `${foodBit} rather than stacking more monuments.${restBit} ${areas.length ? `Wander ${listPhrase(areas, 3)} at an easy pace.` : "Stay in one district so you actually taste the city."} This is a valid travel day, not filler.`,
      });
      continue;
    }

    if (slot > 0.72 && inner >= 8 && i === inner - 2) {
      planned.push({
        title: `Day ${dayNum} — Slow / weather buffer`,
        body: `Leave this day unscripted: revisit a favourite street, shop ${shopping.length ? listPhrase(shopping, 2) : "a local market"}, or sit out rain. ${city.name} trips of ${days} days need slack — otherwise you will resent the last museum.`,
      });
      continue;
    }

    if (pool.length > 0) {
      const isDayTrip = (s: string) => /day trip|overnight|cruise/i.test(s);
      const n = isDayTrip(pool[0]) ? 1 : pool.length > 8 ? 3 : pool.length > 3 ? 2 : 1;
      const acts: string[] = [];
      while (acts.length < n && pool.length > 0) {
        const next = pool.shift()!;
        if (acts.length > 0 && isDayTrip(next)) {
          pool.unshift(next);
          break;
        }
        acts.push(next);
      }
      if (acts.length === 0) continue;
      planned.push({
        title: `Day ${dayNum} — ${shortLabel(acts[0])}`,
        body: coreDayBody(city.name, acts, i),
      });
      continue;
    }

    if (extras.length > 0) {
      planned.push({
        title: `Day ${dayNum} — Optional outing`,
        body: `${withStop(extras.shift() || "")} If you would rather stay put, use the day to walk a residential neighbourhood and eat well — both are honest ${city.name} time.`,
      });
      continue;
    }

    planned.push({
      title: `Day ${dayNum} — Free day in ${city.name}`,
      body: `No new “must-see” is required. Repeat a viewpoint at a different hour, book a spa or hammam if that is your style, or take a long lunch. Padding a ${days}-day plan with invented attractions would be dishonest — ${city.name} is better slow than fake-busy.`,
    });
  }

  planned.push({
    title: `Day ${days} — Last morning & departure`,
    body: `Keep the final morning light: a café, a last walk, or one nearby stop you skipped. Transfer to ${city.airport || "the airport"} with more buffer than you think you need. Use leftover time to confirm onward tickets — do not squeeze a far-flung sight onto an exit day.`,
  });

  return planned;
}

function stayBody(city: City): string {
  const areas = city.stayAreas || [];
  if (areas.length > 0) {
    return areas
      .slice(0, 4)
      .map((a) => `${a.name} suits ${a.bestFor.toLowerCase()} (${a.note.replace(/\.$/, "")}).`)
      .join(" ");
  }
  const hotels = (city.hotels || []).slice(0, 3);
  if (hotels.length) {
    return `First-timers do well staying central and walkable. Named tourist-favourite stays on our city page include ${listPhrase(hotels, 3)} — always re-check recent reviews and location on a map before you book.`;
  }
  return `Stay central enough that evenings do not become long taxi rides. Use our ${city.name} city guide for neighbourhood notes and current stay picks.`;
}

function costBody(city: City, days: number): string {
  const cost = city.tripCost || tripCostForPlace({
    slug: city.slug,
    name: city.name,
    countrySlug: city.countrySlug,
    countryName: city.countryName,
    continent: city.continent,
    region: city.region,
  });
  const mid = cost.mid;
  return `Rough per-person daily spend on the ground (excluding international flights), in ${cost.currency}: Budget ${cost.budget}; Mid-range ${mid}; Luxury ${cost.luxury}. ${withStop(cost.note)} For ${days} nights, multiply the mid-range daily figure and add a little for one paid highlight or day tour. Use the Trip Cost Estimator on Global Itinerary to switch travel style.`;
}

function faqBody(city: City, days: number): string {
  const stay = city.stayAreas?.[0]?.name;
  const pairs = [
    {
      question: `Is ${days} days enough for ${city.name}?`,
      answer:
        "Yes for a first visit at this pace — longer is better if you want side trips.",
    },
    {
      question: `Where should you stay in ${city.name}?`,
      answer: stay
        ? `${stay} is a strong first-timer base; read neighbourhood notes on the city guide.`
        : "Stay central; read neighbourhood notes on the city guide.",
    },
    {
      question: `Do you need a car in ${city.name}?`,
      answer: `Usually no in the urban core. ${withStop(city.transport || "Use local transit and ride-hails")}`,
    },
    ...(city.faqs || []).slice(0, 2),
    {
      question: "Do I need to check visas before I fly?",
      answer: "Always verify visas and current travel advice for your passport before you fly.",
    },
  ];
  return pairs
    .map((f) => `${f.question}\n-----\n${f.answer}`)
    .join("\n\n");
}

export type ItinerarySeries = "top100" | "top200";

export function buildCityItineraryArticle(
  city: City,
  rank: number,
  why: string,
  series: ItinerarySeries = "top100",
): Article {
  const days = itineraryDaysForCity(city.slug);
  const author = AUTHOR_ROTATION[rank % AUTHOR_ROTATION.length];
  const day = 10 + (rank % 10);
  const date = series === "top200" ? `2026-08-${String(14 + (rank % 9)).padStart(2, "0")}` : `2026-08-${String(day).padStart(2, "0")}`;
  const overview = isGenericCityOverview(city.overview)
    ? honestCityOverview(city.overview, city.name, city.countryName)
    : city.overview;
  const planned = planDays(city, days, why);
  const sights = sightPool(city);
  const cover = city.heroImage || unsplash(PHOTOS.cityNight, 1600);
  const seriesTag = series === "top200" ? "Top 200" : "Top 100";

  const sections: ArticleSection[] = [
    {
      body: `${withStop(overview)} This ${days}-day ${city.name} itinerary is written for first-timers who want a clear daily plan, a realistic trip cost, and enough slack to enjoy the city — not a fantasy checklist. ${withStop(why)} Pair it with our live ${city.name} city guide for maps, stays and the latest practical notes.`,
    },
    {
      heading: `Best time to visit ${city.name}`,
      body: city.bestTime
        ? `${withStop(city.bestTime)}${city.weather ? ` Typical conditions: ${withStop(city.weather)}` : ""} Shoulder weeks are usually kinder on hotels than school-holiday peaks. Always re-check festivals and local holidays that can close sights or spike prices.`
        : `Shoulder seasons are usually the most comfortable for walking ${city.name}. Peak holidays raise hotel rates; the quietest months can mean shorter hours at some attractions. Check the city guide before you lock flights.`,
    },
    {
      heading: `How many days do you need in ${city.name}?`,
      body: `${days} days is a strong first visit: arrival, ${days - 2} full sightseeing days, and a buffer exit morning. With fewer than five days, pick one neighbourhood cluster and skip far day trips. With two weeks you can add rest days or a second base. This ${days}-day plan is paced for ${city.name} rather than a copy-paste week that ignores how spread out (or compact) the city actually is.`,
    },
    ...planned.map((d) => ({ heading: d.title, body: d.body })),
    {
      heading: `${city.name} trip cost (excluding international flights)`,
      body: costBody(city, days),
    },
    {
      heading: `Where to stay in ${city.name}`,
      body: stayBody(city),
    },
    {
      heading: "Getting around",
      body: [
        withStop(city.transport || "Use public transit plus occasional taxis"),
        city.metro ? `Local rail/metro: ${withStop(city.metro)}` : "",
        city.tips?.length
          ? city.tips.slice(0, 3).map(withStop).join(" ")
          : "Buy tickets where official booths or apps exist; avoid unofficial “helpers” at stations.",
      ]
        .filter(Boolean)
        .join(" "),
    },
    {
      heading: "Practical tips",
      body: `${
        city.tips?.length
          ? city.tips.slice(0, 4).map(withStop).join(" ")
          : "Dress for the main religious or historic sites, carry a little cash, and screenshot offline maps."
      } Famous stops worth planning around include ${listPhrase(sights, 5) || "the highlights on our city page"}. Open the full ${city.name} guide on Global Itinerary for eats, stays and free things to do.`,
    },
    {
      heading: "FAQs",
      body: faqBody(city, days),
    },
  ];

  const regionTag = city.continent || city.region || "City Break";

  return {
    id: `dg-${series}-${city.slug}`,
    slug: top100GuideArticleSlug(city.slug, days),
    title: `${days}-Day ${city.name} Itinerary: Best Time to Visit & Trip Cost (2026)`,
    excerpt: `A practical ${city.name} travel guide with a ${days}-day first-timer plan, best time to visit, where to stay and a realistic 2026 trip cost — written like our Bali and Dubai itineraries.`,
    cover,
    category: "Guides",
    tags: [
      city.name,
      city.countryName,
      "Itineraries",
      "Trip Cost",
      "Best Time to Visit",
      "City Break",
      seriesTag,
      regionTag,
    ],
    author,
    date,
    readingTime: Math.min(22, 9 + Math.ceil(days * 0.55)),
    featured: false,
    sections,
  };
}
