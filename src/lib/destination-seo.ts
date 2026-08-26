import type { City, Country, FAQ } from "@/lib/types";

/** Merge curated FAQs with intent-mapped defaults (GSC: visit/travel guide/travel to). */
export function enrichCountryFaqs(country: Country): FAQ[] {
  const defaults: FAQ[] = [
    {
      question: `Is ${country.name} worth visiting?`,
      answer: `Yes — travellers visit ${country.name} for its landscapes, cities and culture. Start with ${country.capital}, then explore the top regions on this ${country.name} travel guide for a realistic itinerary.`,
    },
    {
      question: `When is the best time to visit ${country.name}?`,
      answer: country.bestTime.endsWith(".") ? country.bestTime : `${country.bestTime}.`,
    },
    {
      question: `Do I need a visa to travel to ${country.name}?`,
      answer: `${country.visa} Use our ${country.name} visa checker for rules by nationality before you book flights.`,
    },
    {
      question: `How much does a trip to ${country.name} cost?`,
      answer: `Budget roughly ${country.budgetPerDay} per person per day for mid-range travel in ${country.name}, not including long-haul flights. Costs vary by season and how much you move between cities.`,
    },
    {
      question: `Is ${country.name} safe for tourists?`,
      answer: country.safety.endsWith(".") ? country.safety : `${country.safety}.`,
    },
    {
      question: `How do I plan travel to ${country.name}?`,
      answer: `Use this ${country.name} travel guide for best time to visit, top cities, sample routes, budget tips and visa entry rules — then build a day-by-day plan around ${country.capital} and nearby highlights.`,
    },
  ];
  return mergeFaqs(country.faqs || [], defaults);
}

export function enrichCityFaqs(city: City): FAQ[] {
  const defaults: FAQ[] = [
    {
      question: `What are the best things to do in ${city.name}?`,
      answer:
        city.thingsToDo.length > 0
          ? `Top picks in ${city.name} include ${city.thingsToDo.slice(0, 4).join(", ")}. See the full list and itinerary on this ${city.name} travel guide.`
          : `Explore local landmarks, neighbourhoods and day trips around ${city.name}, ${city.countryName}. This guide covers attractions, food and where to stay.`,
    },
    {
      question: `When is the best time to visit ${city.name}?`,
      answer: city.bestTime.endsWith(".") ? city.bestTime : `${city.bestTime}.`,
    },
    {
      question: `How many days do I need in ${city.name}?`,
      answer:
        city.itinerary.length > 0
          ? `Plan at least ${city.itinerary.length} days in ${city.name} for the highlights on our suggested itinerary; add more time for day trips.`
          : `Most travellers spend 2–4 days in ${city.name}, depending on how many day trips you want in ${city.countryName}.`,
    },
    {
      question: `Where should I stay in ${city.name}?`,
      answer: city.stayAreas && city.stayAreas.length > 0
        ? `Base yourself in ${city.stayAreas
            .slice(0, 3)
            .map((a) => `${a.name} (${a.bestFor})`)
            .join(", ")}. Pick the area that matches your trip style, then book within walking distance of transit or main sights.`
        : (city.stays && city.stays.length > 0) || city.hotels.length > 0
          ? `Popular stays in ${city.name} include ${(city.stays?.length ? city.stays.map((s) => s.name) : city.hotels).slice(0, 3).join(", ")}. Book central areas if you want to walk to major sights.`
          : `Stay near the centre of ${city.name} for easy access to attractions, or near the airport if you have a short layover.`,
    },
    ...(city.tripCost
      ? [
          {
            question: `How much does a trip to ${city.name} cost?`,
            answer: `On the ground in ${city.name} (excluding international flights), budget travellers often spend about ${city.tripCost.budget} per person per day, mid-range about ${city.tripCost.mid}, and luxury about ${city.tripCost.luxury} (${city.tripCost.currency}). ${city.tripCost.note}`,
          },
        ]
      : []),
  ];
  return mergeFaqs(city.faqs || [], defaults);
}

/** Original planning paragraph — uses this page's data, not a wiki article. */
export function countryTripPlanCopy(
  country: Country,
  extras: { cityCount: number; attractionCount: number; routeNames: string[] },
): string {
  const route =
    extras.routeNames.length >= 2
      ? `A practical first loop is ${extras.routeNames.join(" → ")}.`
      : `Start in ${country.capital} and add nearby cities only if you have the days.`;
  const days =
    extras.cityCount >= 12 ? "10–14" : extras.cityCount >= 5 ? "7–10" : "5–7";
  const attractions =
    extras.attractionCount > 0
      ? ` We also flag ${extras.attractionCount} standout attraction${extras.attractionCount === 1 ? "" : "s"} worth building a day around.`
      : "";
  return `Most first-time trips to ${country.name} work in ${days} days: fly into ${country.capital}, then move only as far as your energy allows. ${route} Mid-range travellers typically budget ${country.budgetPerDay} per person per day on the ground (flights extra). Best time: ${country.bestTime.replace(/\.$/, "")}. This route, cost band and city shortlist are Global Itinerary’s own planning layer — not a copy of another guidebook.${attractions}`;
}

export function cityTripPlanCopy(city: City): string {
  const sights = (city.thingsToDo ?? []).filter(Boolean).slice(0, 3);
  const days = city.itinerary?.length ?? 0;
  const stay = days > 0 ? `Plan about ${days} days.` : `Most people stay 2–4 days.`;
  const focus = sights.length
    ? ` If time is short, prioritise ${sights.join(", ")} instead of racing the whole list.`
    : "";
  const cost = city.tripCost
    ? ` Mid-range ground costs are about ${city.tripCost.mid} ${city.tripCost.currency} per person per day, excluding international flights.`
    : "";
  return `${city.name} is a stop in ${city.countryName}, not a country-in-a-weekend. ${stay}${focus}${cost} Best time: ${city.bestTime.replace(/\.$/, "")}. Rankings, stay length and cost bands on this page come from Global Itinerary’s trip-planning models.`;
}

function mergeFaqs(existing: FAQ[], defaults: FAQ[]): FAQ[] {
  // Keep the destination's own questions intact. Only fill gaps on thin pages —
  // do not dump every generic Q into the same accordion.
  if (existing.length >= 3) return existing;
  const seen = new Set(existing.map((f) => normalizeQ(f.question)));
  const out = [...existing];
  for (const f of defaults) {
    if (out.length >= 6) break;
    if (seen.has(normalizeQ(f.question))) continue;
    out.push(f);
    seen.add(normalizeQ(f.question));
  }
  return out;
}

function normalizeQ(q: string) {
  return q.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
