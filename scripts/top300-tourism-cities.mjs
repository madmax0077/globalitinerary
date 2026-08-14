import { uniqueTop150 } from "./top150-tourism-cities.mjs";

/** Additional well-known tourist cities to reach ~300 unique destinations.
 * Same shape as TOP150 entries: slug, name, countrySlug, countryCode, countryName, lat, lng, timezone, population, isCapital, optional wikiTitle, alts.
 */
export const TOP300_EXTRA = [
  // —— Europe ——
  { slug: "verona", name: "Verona", countrySlug: "italy", countryCode: "IT", countryName: "Italy", lat: 45.4384, lng: 10.9916, timezone: "Europe/Rome", population: 257000, isCapital: false },
  { slug: "pisa", name: "Pisa", countrySlug: "italy", countryCode: "IT", countryName: "Italy", lat: 43.7228, lng: 10.4017, timezone: "Europe/Rome", population: 90000, isCapital: false },
  { slug: "siena", name: "Siena", countrySlug: "italy", countryCode: "IT", countryName: "Italy", lat: 43.3188, lng: 11.3308, timezone: "Europe/Rome", population: 54000, isCapital: false },
  { slug: "bologna", name: "Bologna", countrySlug: "italy", countryCode: "IT", countryName: "Italy", lat: 44.4949, lng: 11.3426, timezone: "Europe/Rome", population: 390000, isCapital: false },
  { slug: "sorrento", name: "Sorrento", countrySlug: "italy", countryCode: "IT", countryName: "Italy", lat: 40.6263, lng: 14.3758, timezone: "Europe/Rome", population: 16500, isCapital: false },
  { slug: "catania", name: "Catania", countrySlug: "italy", countryCode: "IT", countryName: "Italy", lat: 37.5079, lng: 15.083, timezone: "Europe/Rome", population: 311000, isCapital: false },
  { slug: "bath", name: "Bath", countrySlug: "united-kingdom", countryCode: "GB", countryName: "United Kingdom", lat: 51.3811, lng: -2.359, timezone: "Europe/London", population: 94000, isCapital: false },
  { slug: "liverpool", name: "Liverpool", countrySlug: "united-kingdom", countryCode: "GB", countryName: "United Kingdom", lat: 53.4084, lng: -2.9916, timezone: "Europe/London", population: 498000, isCapital: false },
  { slug: "oxford", name: "Oxford", countrySlug: "united-kingdom", countryCode: "GB", countryName: "United Kingdom", lat: 51.752, lng: -1.2577, timezone: "Europe/London", population: 162000, isCapital: false },
  { slug: "cambridge", name: "Cambridge", countrySlug: "united-kingdom", countryCode: "GB", countryName: "United Kingdom", lat: 52.2053, lng: 0.1218, timezone: "Europe/London", population: 145000, isCapital: false },
  { slug: "brighton", name: "Brighton", countrySlug: "united-kingdom", countryCode: "GB", countryName: "United Kingdom", lat: 50.8225, lng: -0.1372, timezone: "Europe/London", population: 290000, isCapital: false },
  { slug: "york", name: "York", countrySlug: "united-kingdom", countryCode: "GB", countryName: "United Kingdom", lat: 53.959, lng: -1.0815, timezone: "Europe/London", population: 210000, isCapital: false },
  { slug: "bristol", name: "Bristol", countrySlug: "united-kingdom", countryCode: "GB", countryName: "United Kingdom", lat: 51.4545, lng: -2.5879, timezone: "Europe/London", population: 463000, isCapital: false },
  { slug: "cologne", name: "Cologne", countrySlug: "germany", countryCode: "DE", countryName: "Germany", lat: 50.9375, lng: 6.9603, timezone: "Europe/Berlin", population: 1087000, isCapital: false, alts: ["koeln"] },
  { slug: "dresden", name: "Dresden", countrySlug: "germany", countryCode: "DE", countryName: "Germany", lat: 51.0504, lng: 13.7373, timezone: "Europe/Berlin", population: 556000, isCapital: false },
  { slug: "heidelberg", name: "Heidelberg", countrySlug: "germany", countryCode: "DE", countryName: "Germany", lat: 49.3988, lng: 8.6724, timezone: "Europe/Berlin", population: 160000, isCapital: false },
  { slug: "nuremberg", name: "Nuremberg", countrySlug: "germany", countryCode: "DE", countryName: "Germany", lat: 49.4521, lng: 11.0767, timezone: "Europe/Berlin", population: 518000, isCapital: false, alts: ["nuernberg"] },
  { slug: "ghent", name: "Ghent", countrySlug: "belgium", countryCode: "BE", countryName: "Belgium", lat: 51.0543, lng: 3.7174, timezone: "Europe/Brussels", population: 265000, isCapital: false, alts: ["gent"] },
  { slug: "zermatt", name: "Zermatt", countrySlug: "switzerland", countryCode: "CH", countryName: "Switzerland", lat: 46.0207, lng: 7.7491, timezone: "Europe/Zurich", population: 5800, isCapital: false },
  { slug: "annecy", name: "Annecy", countrySlug: "france", countryCode: "FR", countryName: "France", lat: 45.8992, lng: 6.1294, timezone: "Europe/Paris", population: 128000, isCapital: false },
  { slug: "strasbourg", name: "Strasbourg", countrySlug: "france", countryCode: "FR", countryName: "France", lat: 48.5734, lng: 7.7521, timezone: "Europe/Paris", population: 284000, isCapital: false },
  { slug: "montpellier", name: "Montpellier", countrySlug: "france", countryCode: "FR", countryName: "France", lat: 43.6108, lng: 3.8767, timezone: "Europe/Paris", population: 295000, isCapital: false },
  { slug: "faro", name: "Faro", countrySlug: "portugal", countryCode: "PT", countryName: "Portugal", lat: 37.0194, lng: -7.9304, timezone: "Europe/Lisbon", population: 65000, isCapital: false },
  { slug: "toledo", name: "Toledo", countrySlug: "spain", countryCode: "ES", countryName: "Spain", lat: 39.8628, lng: -4.0273, timezone: "Europe/Madrid", population: 84000, isCapital: false },
  { slug: "san-sebastian", name: "San Sebastián", countrySlug: "spain", countryCode: "ES", countryName: "Spain", lat: 43.3183, lng: -1.9812, timezone: "Europe/Madrid", population: 188000, isCapital: false, alts: ["donostia"] },
  { slug: "salamanca", name: "Salamanca", countrySlug: "spain", countryCode: "ES", countryName: "Spain", lat: 40.9701, lng: -5.6635, timezone: "Europe/Madrid", population: 144000, isCapital: false },
  { slug: "corfu", name: "Corfu", countrySlug: "greece", countryCode: "GR", countryName: "Greece", lat: 39.6243, lng: 19.9217, timezone: "Europe/Athens", population: 32000, isCapital: false },
  { slug: "zakynthos", name: "Zakynthos", countrySlug: "greece", countryCode: "GR", countryName: "Greece", lat: 37.787, lng: 20.8988, timezone: "Europe/Athens", population: 17000, isCapital: false },
  { slug: "cesky-krumlov", name: "Český Krumlov", countrySlug: "czechia", countryCode: "CZ", countryName: "Czech Republic", lat: 48.8127, lng: 14.3175, timezone: "Europe/Prague", population: 13000, isCapital: false, wikiTitle: "Český Krumlov" },
  { slug: "hallstatt", name: "Hallstatt", countrySlug: "austria", countryCode: "AT", countryName: "Austria", lat: 47.5622, lng: 13.6493, timezone: "Europe/Vienna", population: 780, isCapital: false },
  { slug: "tromso", name: "Tromsø", countrySlug: "norway", countryCode: "NO", countryName: "Norway", lat: 69.6492, lng: 18.9553, timezone: "Europe/Oslo", population: 77000, isCapital: false },

  // —— Asia ——
  { slug: "nara", name: "Nara", countrySlug: "japan", countryCode: "JP", countryName: "Japan", lat: 34.6851, lng: 135.8048, timezone: "Asia/Tokyo", population: 360000, isCapital: false },
  { slug: "hiroshima", name: "Hiroshima", countrySlug: "japan", countryCode: "JP", countryName: "Japan", lat: 34.3853, lng: 132.4553, timezone: "Asia/Tokyo", population: 1190000, isCapital: false },
  { slug: "kanazawa", name: "Kanazawa", countrySlug: "japan", countryCode: "JP", countryName: "Japan", lat: 36.5613, lng: 136.6562, timezone: "Asia/Tokyo", population: 466000, isCapital: false },
  { slug: "naha", name: "Naha", countrySlug: "japan", countryCode: "JP", countryName: "Japan", lat: 26.2124, lng: 127.6809, timezone: "Asia/Tokyo", population: 317000, isCapital: false, wikiTitle: "Naha" },
  { slug: "takayama", name: "Takayama", countrySlug: "japan", countryCode: "JP", countryName: "Japan", lat: 36.146, lng: 137.2522, timezone: "Asia/Tokyo", population: 88000, isCapital: false },
  { slug: "gyeongju", name: "Gyeongju", countrySlug: "south-korea", countryCode: "KR", countryName: "South Korea", lat: 35.8562, lng: 129.2247, timezone: "Asia/Seoul", population: 264000, isCapital: false },
  { slug: "jeonju", name: "Jeonju", countrySlug: "south-korea", countryCode: "KR", countryName: "South Korea", lat: 35.8242, lng: 127.148, timezone: "Asia/Seoul", population: 658000, isCapital: false },
  { slug: "guilin", name: "Guilin", countrySlug: "china", countryCode: "CN", countryName: "China", lat: 25.2736, lng: 110.29, timezone: "Asia/Shanghai", population: 493000, isCapital: false },
  { slug: "suzhou", name: "Suzhou", countrySlug: "china", countryCode: "CN", countryName: "China", lat: 31.2989, lng: 120.5853, timezone: "Asia/Shanghai", population: 1270000, isCapital: false },
  { slug: "lijiang", name: "Lijiang", countrySlug: "china", countryCode: "CN", countryName: "China", lat: 26.855, lng: 100.227, timezone: "Asia/Shanghai", population: 125000, isCapital: false },
  { slug: "kunming", name: "Kunming", countrySlug: "china", countryCode: "CN", countryName: "China", lat: 25.0389, lng: 102.7183, timezone: "Asia/Shanghai", population: 8500000, isCapital: false },
  { slug: "chongqing", name: "Chongqing", countrySlug: "china", countryCode: "CN", countryName: "China", lat: 29.4316, lng: 106.9123, timezone: "Asia/Shanghai", population: 16800000, isCapital: false },
  { slug: "nanjing", name: "Nanjing", countrySlug: "china", countryCode: "CN", countryName: "China", lat: 32.0603, lng: 118.7969, timezone: "Asia/Shanghai", population: 9310000, isCapital: false },
  { slug: "wuhan", name: "Wuhan", countrySlug: "china", countryCode: "CN", countryName: "China", lat: 30.5928, lng: 114.3055, timezone: "Asia/Shanghai", population: 12300000, isCapital: false },
  { slug: "xiamen", name: "Xiamen", countrySlug: "china", countryCode: "CN", countryName: "China", lat: 24.4798, lng: 118.0819, timezone: "Asia/Shanghai", population: 5280000, isCapital: false },
  { slug: "yogyakarta", name: "Yogyakarta", countrySlug: "indonesia", countryCode: "ID", countryName: "Indonesia", lat: -7.7956, lng: 110.3695, timezone: "Asia/Jakarta", population: 422000, isCapital: false },
  { slug: "labuan-bajo", name: "Labuan Bajo", countrySlug: "indonesia", countryCode: "ID", countryName: "Indonesia", lat: -8.4961, lng: 119.8877, timezone: "Asia/Makassar", population: 50000, isCapital: false },
  { slug: "nha-trang", name: "Nha Trang", countrySlug: "vietnam", countryCode: "VN", countryName: "Vietnam", lat: 12.2388, lng: 109.1967, timezone: "Asia/Ho_Chi_Minh", population: 422000, isCapital: false },
  { slug: "da-lat", name: "Da Lat", countrySlug: "vietnam", countryCode: "VN", countryName: "Vietnam", lat: 11.9404, lng: 108.4583, timezone: "Asia/Ho_Chi_Minh", population: 406000, isCapital: false },
  { slug: "phu-quoc", name: "Phu Quoc", countrySlug: "vietnam", countryCode: "VN", countryName: "Vietnam", lat: 10.2899, lng: 103.984, timezone: "Asia/Ho_Chi_Minh", population: 180000, isCapital: false },
  { slug: "chiang-rai", name: "Chiang Rai", countrySlug: "thailand", countryCode: "TH", countryName: "Thailand", lat: 19.9105, lng: 99.8406, timezone: "Asia/Bangkok", population: 74000, isCapital: false },
  { slug: "ayutthaya", name: "Ayutthaya", countrySlug: "thailand", countryCode: "TH", countryName: "Thailand", lat: 14.3532, lng: 100.5684, timezone: "Asia/Bangkok", population: 55000, isCapital: false },
  { slug: "hua-hin", name: "Hua Hin", countrySlug: "thailand", countryCode: "TH", countryName: "Thailand", lat: 12.5684, lng: 99.9577, timezone: "Asia/Bangkok", population: 63000, isCapital: false },
  { slug: "kota-kinabalu", name: "Kota Kinabalu", countrySlug: "malaysia", countryCode: "MY", countryName: "Malaysia", lat: 5.9804, lng: 116.0735, timezone: "Asia/Kuala_Lumpur", population: 500000, isCapital: false },
  { slug: "melaka", name: "Malacca", countrySlug: "malaysia", countryCode: "MY", countryName: "Malaysia", lat: 2.1896, lng: 102.2501, timezone: "Asia/Kuala_Lumpur", population: 579000, isCapital: false, alts: ["malacca"], wikiTitle: "Malacca City" },
  { slug: "el-nido", name: "El Nido", countrySlug: "philippines", countryCode: "PH", countryName: "Philippines", lat: 11.1784, lng: 119.3956, timezone: "Asia/Manila", population: 50000, isCapital: false },
  { slug: "siargao", name: "Siargao", countrySlug: "philippines", countryCode: "PH", countryName: "Philippines", lat: 9.8597, lng: 126.045, timezone: "Asia/Manila", population: 95000, isCapital: false },
  { slug: "taichung", name: "Taichung", countrySlug: "taiwan", countryCode: "TW", countryName: "Taiwan", lat: 24.1477, lng: 120.6736, timezone: "Asia/Taipei", population: 2820000, isCapital: false },
  { slug: "kaohsiung", name: "Kaohsiung", countrySlug: "taiwan", countryCode: "TW", countryName: "Taiwan", lat: 22.6273, lng: 120.3014, timezone: "Asia/Taipei", population: 2730000, isCapital: false },
  { slug: "hualien", name: "Hualien", countrySlug: "taiwan", countryCode: "TW", countryName: "Taiwan", lat: 23.9871, lng: 121.6011, timezone: "Asia/Taipei", population: 106000, isCapital: false },
  { slug: "kolkata", name: "Kolkata", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 22.5726, lng: 88.3639, timezone: "Asia/Kolkata", population: 4500000, isCapital: false },
  { slug: "kochi", name: "Kochi", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 9.9312, lng: 76.2673, timezone: "Asia/Kolkata", population: 677000, isCapital: false, wikiTitle: "Kochi, India" },
  { slug: "amritsar", name: "Amritsar", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 31.634, lng: 74.8723, timezone: "Asia/Kolkata", population: 1130000, isCapital: false },
  { slug: "leh", name: "Leh", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 34.1526, lng: 77.5771, timezone: "Asia/Kolkata", population: 31000, isCapital: false, wikiTitle: "Leh" },
  { slug: "rishikesh", name: "Rishikesh", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 30.0869, lng: 78.2676, timezone: "Asia/Kolkata", population: 102000, isCapital: false },
  { slug: "jodhpur", name: "Jodhpur", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 26.2389, lng: 73.0243, timezone: "Asia/Kolkata", population: 1140000, isCapital: false },
  { slug: "jaisalmer", name: "Jaisalmer", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 26.9157, lng: 70.9083, timezone: "Asia/Kolkata", population: 78000, isCapital: false },
  { slug: "mysore", name: "Mysore", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 12.2958, lng: 76.6394, timezone: "Asia/Kolkata", population: 920000, isCapital: false, alts: ["mysuru"] },
  { slug: "pondicherry", name: "Pondicherry", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 11.9416, lng: 79.8083, timezone: "Asia/Kolkata", population: 657000, isCapital: false, alts: ["puducherry"], wikiTitle: "Pondicherry" },
  { slug: "shimla", name: "Shimla", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 31.1048, lng: 77.1734, timezone: "Asia/Kolkata", population: 170000, isCapital: false },
  { slug: "manali", name: "Manali", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 32.2432, lng: 77.1892, timezone: "Asia/Kolkata", population: 8100, isCapital: false, wikiTitle: "Manali, Himachal Pradesh" },
  { slug: "darjeeling", name: "Darjeeling", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 27.041, lng: 88.2663, timezone: "Asia/Kolkata", population: 132000, isCapital: false },
  { slug: "alleppey", name: "Alleppey", countrySlug: "india", countryCode: "IN", countryName: "India", lat: 9.4981, lng: 76.3388, timezone: "Asia/Kolkata", population: 174000, isCapital: false, alts: ["alappuzha"], wikiTitle: "Alappuzha" },
  { slug: "bagan", name: "Bagan", countrySlug: "myanmar", countryCode: "MM", countryName: "Myanmar", lat: 21.1717, lng: 94.8585, timezone: "Asia/Yangon", population: 50000, isCapital: false, wikiTitle: "Bagan" },

  // —— Africa / Middle East ——
  { slug: "hurghada", name: "Hurghada", countrySlug: "egypt", countryCode: "EG", countryName: "Egypt", lat: 27.2579, lng: 33.8116, timezone: "Africa/Cairo", population: 248000, isCapital: false },
  { slug: "essaouira", name: "Essaouira", countrySlug: "morocco", countryCode: "MA", countryName: "Morocco", lat: 31.5085, lng: -9.7595, timezone: "Africa/Casablanca", population: 78000, isCapital: false },
  { slug: "chefchaouen", name: "Chefchaouen", countrySlug: "morocco", countryCode: "MA", countryName: "Morocco", lat: 35.1688, lng: -5.2636, timezone: "Africa/Casablanca", population: 43000, isCapital: false },
  { slug: "livingstone", name: "Livingstone", countrySlug: "zambia", countryCode: "ZM", countryName: "Zambia", lat: -17.8419, lng: 25.8543, timezone: "Africa/Lusaka", population: 134000, isCapital: false },

  // —— Americas ——
  { slug: "portland", name: "Portland", countrySlug: "united-states", countryCode: "US", countryName: "United States", lat: 45.5152, lng: -122.6784, timezone: "America/Los_Angeles", population: 635000, isCapital: false, wikiTitle: "Portland, Oregon" },
  { slug: "phoenix", name: "Phoenix", countrySlug: "united-states", countryCode: "US", countryName: "United States", lat: 33.4484, lng: -112.074, timezone: "America/Phoenix", population: 1600000, isCapital: false },
  { slug: "dallas", name: "Dallas", countrySlug: "united-states", countryCode: "US", countryName: "United States", lat: 32.7767, lng: -96.797, timezone: "America/Chicago", population: 1340000, isCapital: false },
  { slug: "san-antonio", name: "San Antonio", countrySlug: "united-states", countryCode: "US", countryName: "United States", lat: 29.4241, lng: -98.4936, timezone: "America/Chicago", population: 1540000, isCapital: false },
  { slug: "key-west", name: "Key West", countrySlug: "united-states", countryCode: "US", countryName: "United States", lat: 24.5551, lng: -81.78, timezone: "America/New_York", population: 26000, isCapital: false },
  { slug: "sedona", name: "Sedona", countrySlug: "united-states", countryCode: "US", countryName: "United States", lat: 34.8697, lng: -111.761, timezone: "America/Phoenix", population: 10000, isCapital: false },
  { slug: "salt-lake-city", name: "Salt Lake City", countrySlug: "united-states", countryCode: "US", countryName: "United States", lat: 40.7608, lng: -111.891, timezone: "America/Denver", population: 200000, isCapital: false },
  { slug: "minneapolis", name: "Minneapolis", countrySlug: "united-states", countryCode: "US", countryName: "United States", lat: 44.9778, lng: -93.265, timezone: "America/Chicago", population: 430000, isCapital: false },
  { slug: "puerto-vallarta", name: "Puerto Vallarta", countrySlug: "mexico", countryCode: "MX", countryName: "Mexico", lat: 20.6534, lng: -105.2253, timezone: "America/Mexico_City", population: 291000, isCapital: false },
  { slug: "cabo-san-lucas", name: "Cabo San Lucas", countrySlug: "mexico", countryCode: "MX", countryName: "Mexico", lat: 22.8905, lng: -109.9167, timezone: "America/Mazatlan", population: 81000, isCapital: false, wikiTitle: "Cabo San Lucas" },
  { slug: "merida", name: "Mérida", countrySlug: "mexico", countryCode: "MX", countryName: "Mexico", lat: 20.9674, lng: -89.5926, timezone: "America/Merida", population: 995000, isCapital: false, wikiTitle: "Mérida, Yucatán" },
  { slug: "san-miguel-de-allende", name: "San Miguel de Allende", countrySlug: "mexico", countryCode: "MX", countryName: "Mexico", lat: 20.9144, lng: -100.7452, timezone: "America/Mexico_City", population: 72000, isCapital: false },
  { slug: "guanajuato", name: "Guanajuato", countrySlug: "mexico", countryCode: "MX", countryName: "Mexico", lat: 21.019, lng: -101.2574, timezone: "America/Mexico_City", population: 194000, isCapital: false, wikiTitle: "Guanajuato City" },
  { slug: "antigua", name: "Antigua Guatemala", countrySlug: "guatemala", countryCode: "GT", countryName: "Guatemala", lat: 14.5586, lng: -90.7335, timezone: "America/Guatemala", population: 46000, isCapital: false, wikiTitle: "Antigua Guatemala" },
  { slug: "mendoza", name: "Mendoza", countrySlug: "argentina", countryCode: "AR", countryName: "Argentina", lat: -32.8895, lng: -68.8458, timezone: "America/Argentina/Mendoza", population: 115000, isCapital: false },
  { slug: "bariloche", name: "Bariloche", countrySlug: "argentina", countryCode: "AR", countryName: "Argentina", lat: -41.1335, lng: -71.3103, timezone: "America/Argentina/Cordoba", population: 108000, isCapital: false, wikiTitle: "San Carlos de Bariloche" },
  { slug: "florianopolis", name: "Florianópolis", countrySlug: "brazil", countryCode: "BR", countryName: "Brazil", lat: -27.5954, lng: -48.548, timezone: "America/Sao_Paulo", population: 508000, isCapital: false },
  { slug: "oranjestad", name: "Oranjestad", countrySlug: "aruba", countryCode: "AW", countryName: "Aruba", lat: 12.5092, lng: -70.0086, timezone: "America/Aruba", population: 28000, isCapital: true },
];

export function uniqueTop300() {
  const seen = new Set();
  const out = [];
  for (const c of [...uniqueTop150(), ...TOP300_EXTRA]) {
    if (seen.has(c.slug)) continue;
    seen.add(c.slug);
    out.push(c);
  }
  return out;
}
