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
      answer:
        (city.stays && city.stays.length > 0) || city.hotels.length > 0
          ? `Popular stays in ${city.name} include ${(city.stays?.length ? city.stays.map((s) => s.name) : city.hotels).slice(0, 3).join(", ")}. Book central areas if you want to walk to major sights.`
          : `Stay near the centre of ${city.name} for easy access to attractions, or near the airport if you have a short layover.`,
    },
  ];
  return mergeFaqs(city.faqs || [], defaults);
}

function mergeFaqs(existing: FAQ[], defaults: FAQ[]): FAQ[] {
  const seen = new Set(existing.map((f) => normalizeQ(f.question)));
  const out = [...existing];
  for (const f of defaults) {
    if (seen.has(normalizeQ(f.question))) continue;
    out.push(f);
    seen.add(normalizeQ(f.question));
  }
  return out.slice(0, 8);
}

function normalizeQ(q: string) {
  return q.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
