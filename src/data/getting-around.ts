// Curated "Getting around" data for travellers: the cheapest / most useful
// ride-hailing apps and the best-value SIM / eSIM options for foreigners,
// per country (keyed by ISO 3166-1 alpha-2, UPPERCASE).
//
// Sources: official operator sites plus widely-reported traveller experience
// (Reddit r/solotravel, r/awardtravel, Nomad List, prepaid-data-sim-card wiki,
// operator coverage pages). Prices are indicative for 2026 and move around —
// always confirm the current tourist plan at the airport kiosk or operator app.
//
// Countries not listed fall back to a sensible regional default (see
// getGettingAround) so every destination still shows guidance.

export type RideApp = {
  name: string;
  url: string;
  blurb: string;
};

/** Registry of ride-hailing / mobility apps referenced below. */
export const RIDE_APPS: Record<string, RideApp> = {
  uber: {
    name: "Uber",
    url: "https://www.uber.com",
    blurb: "App-based cars with upfront fares — usually the cheapest metered ride in big cities.",
  },
  bolt: {
    name: "Bolt",
    url: "https://bolt.eu",
    blurb: "Estonian rival to Uber, typically 10–20% cheaper; also e-scooters and bikes.",
  },
  grab: {
    name: "Grab",
    url: "https://www.grab.com",
    blurb: "Southeast Asia's super-app: cars, motorbike taxis and food, all with fixed upfront fares.",
  },
  gojek: {
    name: "Gojek",
    url: "https://www.gojek.com",
    blurb: "Indonesian super-app; GoRide motorbike taxis are the cheapest way to beat traffic.",
  },
  ola: {
    name: "Ola",
    url: "https://www.olacabs.com",
    blurb: "Home-grown Indian app for cabs and very cheap auto-rickshaws with in-app fares.",
  },
  careem: {
    name: "Careem",
    url: "https://www.careem.com",
    blurb: "The Middle East super-app (Uber-owned); cars plus cheaper bikes in some cities.",
  },
  didi: {
    name: "DiDi",
    url: "https://www.didiglobal.com",
    blurb: "China's dominant ride app (also big across Latin America); often undercuts Uber.",
  },
  yandex: {
    name: "Yandex Go",
    url: "https://yango.com",
    blurb: "Cheap, reliable cars across Russia, the Caucasus and Central Asia.",
  },
  indrive: {
    name: "inDrive",
    url: "https://indrive.com",
    blurb: "Name your own fare and let nearby drivers accept or counter — great for tight budgets.",
  },
  cabify: {
    name: "Cabify",
    url: "https://cabify.com",
    blurb: "Fixed-fare cars popular in Spain and across Latin America.",
  },
  freenow: {
    name: "FREENOW",
    url: "https://www.free-now.com",
    blurb: "Hail licensed local taxis from one app across Western Europe.",
  },
  kakao: {
    name: "Kakao T",
    url: "https://www.kakaomobility.com",
    blurb: "The standard way to call a taxi in South Korea (English supported).",
  },
  gojp: {
    name: "GO",
    url: "https://go.goinc.jp",
    blurb: "Japan's leading taxi-hailing app; taxis are metered and reliable (but not cheap).",
  },
  app99: {
    name: "99",
    url: "https://99app.com",
    blurb: "Brazil's home-grown app (DiDi-owned), usually cheaper than Uber.",
  },
  lyft: {
    name: "Lyft",
    url: "https://www.lyft.com",
    blurb: "Uber's main US/Canada rival — compare both for the lowest fare.",
  },
  maxim: {
    name: "Maxim",
    url: "https://taximaxim.com",
    blurb: "Budget ride-hailing across the CIS, Southeast Asia and Africa; often the cheapest.",
  },
  yango: {
    name: "Yango",
    url: "https://yango.com",
    blurb: "Yandex's international brand — cheap cars across Africa and the Middle East.",
  },
  blablacar: {
    name: "BlaBlaCar",
    url: "https://www.blablacar.com",
    blurb: "Long-distance carpooling and cheap intercity buses — the budget way between cities.",
  },
};

export type LocalApp = { name: string; url?: string; blurb?: string };

/** Country-specific ride apps referenced below that aren't global players. */
export const LOCAL_APPS: Record<string, LocalApp> = {
  bitaksi: { name: "BiTaksi", url: "https://bitaksi.com", blurb: "Istanbul's local taxi-hailing app." },
  uklon: { name: "Uklon", url: "https://www.uklon.com.ua", blurb: "Ukraine's home-grown ride app — cheap cars." },
  carGo: { name: "CarGo", url: "https://appcargo.com", blurb: "Serbia's local ride app (Belgrade)." },
  be: { name: "Be", url: "https://be.com.vn", blurb: "Vietnamese app with cheap cars and motorbike rides." },
  xanhSM: { name: "Xanh SM", url: "https://www.xanhsm.com", blurb: "Vietnam's all-electric taxi and bike fleet." },
  tada: { name: "TADA", url: "https://tada.global", blurb: "Commission-free Singapore ride app — often the cheapest." },
  airasia: { name: "AirAsia MOVE", url: "https://www.airasia.com", blurb: "Budget ride-hailing challenger in Malaysia." },
  joyride: { name: "JoyRide", url: "https://joyride.com.ph", blurb: "Cheap Philippine motorbike and car app." },
  angkas: { name: "Angkas", url: "https://angkas.com", blurb: "Manila/Cebu helmeted motorbike taxis — cheapest through traffic." },
  passapp: { name: "PassApp", url: "https://passapp.co", blurb: "Cambodia's tuk-tuk/remorque app — very cheap." },
  loca: { name: "LOCA", url: "https://loca.la", blurb: "Laos's local ride app (Vientiane)." },
  rapido: { name: "Rapido", url: "https://www.rapido.bike", blurb: "India's cheap bike-taxi and auto app." },
  pathao: { name: "Pathao", url: "https://pathao.com", blurb: "Bike and car app in Bangladesh and Nepal." },
  pickme: { name: "PickMe", url: "https://pickme.lk", blurb: "Sri Lanka's local app — cars, tuk-tuks and bikes." },
  namba: { name: "Namba Taxi", url: "https://www.nambataxi.com", blurb: "Bishkek's local ride app." },
  gett: { name: "Gett", url: "https://gett.com", blurb: "Hails licensed taxis in Israel." },
  littlecab: { name: "Little", url: "https://little.bz", blurb: "Kenya's local ride app (Safaricom-backed)." },
  safeboda: { name: "SafeBoda", url: "https://safeboda.com", blurb: "Helmeted, metered boda-boda motorbikes." },
  heetch: { name: "Heetch", url: "https://www.heetch.com", blurb: "Budget ride app across parts of Africa." },
  otaxi: { name: "OTaxi", blurb: "Oman's local taxi app." },
  taiwanTaxi: { name: "Taiwan Taxi", url: "https://www.taiwantaxi.com.tw", blurb: "Taiwan's big metered-taxi app (55688)." },
  hkTaxi: { name: "HKTaxi", url: "https://hktaxiapp.com", blurb: "Hong Kong taxi-hailing app." },
  move: { name: "Move", url: "https://move.rw", blurb: "Kigali ride app." },
  yego: { name: "YegoMoto", blurb: "Metered motorbike taxis in Rwanda." },
  ride: { name: "RIDE", blurb: "Addis Ababa's local ride app." },
  feres: { name: "Feres", blurb: "Ethiopian ride app." },
  lefa: { name: "LEFA", url: "https://lefa.com.na", blurb: "Namibia's local ride app (Windhoek)." },
  yugo: { name: "Yugo", blurb: "Mauritius local ride app." },
};

export type Telecom = {
  name: string;
  note: string;
};

export type GettingAround = {
  /** Ride app ids, ordered cheapest / most useful first. */
  rides: string[];
  ridesNote?: string;
  /** Best-value operators for foreigners, cheapest / easiest first. */
  telecom: Telecom[];
  telecomNote?: string;
  /** Extra note about eSIM or airport SIM pick-up. */
  esimNote?: string;
};

// Reused eSIM line for countries where a local SIM is fiddly for tourists.
const ESIM = "eSIM (Airalo / Holafly) lets you get online the moment you land — handy if you don't want to queue for a SIM.";

export const gettingAround: Record<string, GettingAround> = {
  // ---------- Europe ----------
  GB: {
    rides: ["uber", "bolt", "freenow"],
    ridesNote: "Bolt is usually the cheapest in London; black cabs are pricey — use apps.",
    telecom: [
      { name: "Lebara / Lyca", note: "Cheapest pay-as-you-go SIMs for tourists; big-data plans from supermarkets." },
      { name: "GiffGaff", note: "Popular no-contract SIM with generous data; order online or grab in shops." },
      { name: "EE / Vodafone / Three", note: "Best coverage; buy a prepaid 'Pay As You Go' bundle." },
    ],
    esimNote: ESIM,
  },
  FR: {
    rides: ["uber", "bolt", "freenow"],
    telecom: [
      { name: "Free Mobile", note: "€19.99/month for ~250GB incl. EU roaming — the best-value SIM in France." },
      { name: "Orange Holiday", note: "Tourist SIM sold at airports/FNAC with data + EU roaming." },
      { name: "SFR / Bouygues", note: "Widely stocked prepaid SIMs (RED / B&You)." },
    ],
    esimNote: ESIM,
  },
  IT: {
    rides: ["freenow", "uber", "bolt"],
    ridesNote: "Uber only runs premium cars in Italy — FREENOW hails cheaper licensed taxis.",
    telecom: [
      { name: "Iliad", note: "Cheap big-data SIMs (e.g. ~150GB for €9.99); easy for tourists." },
      { name: "Vodafone / WindTre / TIM", note: "Prepaid tourist SIMs sold at airport and phone shops." },
    ],
    esimNote: ESIM,
  },
  ES: {
    rides: ["cabify", "uber", "bolt", "freenow"],
    telecom: [
      { name: "Orange / Vodafone 'Holiday' SIMs", note: "Prepaid tourist bundles with lots of data + EU roaming." },
      { name: "Lebara / Lycamobile", note: "Cheapest prepaid; sold in tobacconists and phone shops." },
    ],
    esimNote: ESIM,
  },
  DE: {
    rides: ["freenow", "uber", "bolt"],
    telecom: [
      { name: "Aldi Talk / Lidl Connect", note: "Supermarket prepaid SIMs — cheapest data in Germany." },
      { name: "Telekom / Vodafone / O2", note: "Best coverage; prepaid bundles at shops and airports." },
    ],
    esimNote: ESIM,
  },
  PT: {
    rides: ["bolt", "uber", "freenow"],
    ridesNote: "Bolt and Uber are both cheap and plentiful in Lisbon and Porto.",
    telecom: [
      { name: "Vodafone / NOS / MEO", note: "Prepaid tourist SIMs with generous data at airports and malls." },
    ],
    esimNote: ESIM,
  },
  GR: {
    rides: ["freenow", "uber", "bolt"],
    ridesNote: "Uber/FREENOW dispatch normal yellow taxis in Athens; Bolt on islands.",
    telecom: [
      { name: "Cosmote / Vodafone / Nova", note: "Prepaid tourist SIMs with data; buy at the airport on arrival." },
    ],
    esimNote: ESIM,
  },
  NL: {
    rides: ["uber", "bolt", "freenow"],
    ridesNote: "Public transport is excellent — an OV-chipkaart or contactless card beats taxis.",
    telecom: [
      { name: "Lebara / Lycamobile", note: "Cheapest prepaid data SIMs." },
      { name: "KPN / Vodafone / Odido", note: "Best coverage; prepaid bundles in shops." },
    ],
    esimNote: ESIM,
  },
  CH: {
    rides: ["uber", "bolt"],
    ridesNote: "Trains cover everything — a Swiss Travel Pass is usually better value than taxis.",
    telecom: [
      { name: "Salt / Yallo / Lebara", note: "Cheapest prepaid data SIMs (Swisscom has the best coverage but costs more)." },
    ],
    esimNote: ESIM,
  },
  AT: {
    rides: ["uber", "bolt", "freenow"],
    telecom: [
      { name: "HoT / Yesss!", note: "Discount prepaid SIMs (via supermarkets) — cheapest big-data option." },
      { name: "A1 / Magenta / Drei", note: "Best coverage; prepaid bundles at shops." },
    ],
    esimNote: ESIM,
  },
  CZ: {
    rides: ["bolt", "uber", "freenow"],
    telecom: [
      { name: "O2 / T-Mobile / Vodafone", note: "Prepaid 'Kaktus'/tourist SIMs with data at shops." },
    ],
    esimNote: ESIM,
  },
  PL: {
    rides: ["bolt", "uber", "freenow"],
    telecom: [
      { name: "Play / Plus / Orange / T-Mobile", note: "Very cheap prepaid 'starter' SIMs with big data at kiosks." },
    ],
    esimNote: ESIM,
  },
  HU: {
    rides: ["bolt"],
    ridesNote: "Uber doesn't operate — Bolt or the official Főtaxi are the way to go in Budapest.",
    telecom: [
      { name: "Yettel / Vodafone / Telekom", note: "Prepaid 'Praktikum'/tourist SIMs with data." },
    ],
    esimNote: ESIM,
  },
  HR: {
    rides: ["bolt", "uber"],
    telecom: [
      { name: "A1 / Hrvatski Telekom / Telemach", note: "Prepaid tourist SIMs with data; buy on arrival." },
    ],
    esimNote: ESIM,
  },
  IE: {
    rides: ["freenow", "uber", "bolt"],
    ridesNote: "Uber only dispatches taxis; FREENOW is the main taxi app in Dublin.",
    telecom: [
      { name: "GoMo / 48 / Lycamobile", note: "Cheapest prepaid SIMs with unlimited/large data." },
      { name: "Three / Vodafone / Eir", note: "Best coverage." },
    ],
    esimNote: ESIM,
  },
  BE: {
    rides: ["uber", "bolt", "freenow"],
    telecom: [
      { name: "Mobile Vikings / Scarlet", note: "Cheap prepaid data SIMs." },
      { name: "Proximus / Orange / Base", note: "Best coverage." },
    ],
    esimNote: ESIM,
  },
  SE: {
    rides: ["uber", "bolt"],
    telecom: [
      { name: "Comviq / Halebop", note: "Cheapest prepaid SIMs (via Kiosk/supermarket)." },
      { name: "Telia / Telenor / Tre", note: "Best coverage." },
    ],
    esimNote: ESIM,
  },
  NO: {
    rides: ["bolt", "uber"],
    telecom: [
      { name: "Talkmore / Chilimobil", note: "Cheap prepaid SIMs on Telenor/Telia networks." },
    ],
    esimNote: ESIM,
  },
  DK: {
    rides: ["bolt", "uber"],
    telecom: [
      { name: "Lebara / Lycamobile / CBB", note: "Cheapest prepaid data SIMs." },
      { name: "TDC / Telia / Telenor", note: "Best coverage." },
    ],
    esimNote: ESIM,
  },
  FI: {
    rides: ["bolt", "uber"],
    telecom: [
      { name: "DNA / Elisa / Telia", note: "Cheap prepaid 'Prepaid'/'Saunalahti' SIMs with big data." },
    ],
    esimNote: ESIM,
  },
  IS: {
    rides: ["uber"],
    ridesNote: "Ride-hailing barely exists — rent a car or use Reykjavík's Hreyfill taxis.",
    telecom: [
      { name: "Nova / Síminn / Vodafone", note: "Prepaid tourist SIMs with data; buy at the airport or petrol stations." },
    ],
    esimNote: ESIM,
  },
  TR: {
    rides: ["uber", "bitaksi"],
    ridesNote: "Uber dispatches licensed yellow taxis in Istanbul; BiTaksi is the local app.",
    telecom: [
      { name: "Turkcell / Vodafone / Türk Telekom", note: "Tourist SIMs are pricier than locals' — buy at the airport; passports required." },
    ],
    esimNote: `Foreign phones are blocked after ~120 days unless registered (expensive), so ${ESIM.charAt(0).toLowerCase() + ESIM.slice(1)}`,
  },
  GE: {
    rides: ["bolt", "yandex", "maxim"],
    ridesNote: "Bolt and Yandex are both very cheap in Tbilisi.",
    telecom: [
      { name: "Magti / Silknet / Cellfie", note: "Cheap tourist SIMs with lots of data; buy at the airport." },
    ],
    esimNote: ESIM,
  },
  AZ: {
    rides: ["bolt", "yango", "uber"],
    ridesNote: "Bolt is the cheapest in Baku; Yango (Yandex) is a close second.",
    telecom: [
      { name: "Azercell / Bakcell / Nar", note: "Tourist SIMs sold at the airport; registration needs your passport." },
    ],
    esimNote: ESIM,
  },
  RU: {
    rides: ["yandex", "maxim"],
    ridesNote: "Yandex Go dominates and is very cheap.",
    telecom: [
      { name: "MTS / Beeline / MegaFon / Tele2", note: "Cheap prepaid SIMs; passport required to register." },
    ],
    esimNote: ESIM,
  },
  UA: {
    rides: ["bolt", "uber", "uklon"],
    ridesNote: "Uklon is the home-grown app; Bolt and Uber also operate.",
    telecom: [
      { name: "Kyivstar / Vodafone / lifecell", note: "Very cheap prepaid SIMs with big data." },
    ],
    esimNote: ESIM,
  },
  RO: {
    rides: ["bolt", "uber", "freenow"],
    telecom: [
      { name: "Orange / Vodafone / Digi", note: "Digi is Europe's cheapest — prepaid SIMs with huge data." },
    ],
    esimNote: ESIM,
  },
  EE: {
    rides: ["bolt", "uber"],
    ridesNote: "Bolt was founded in Tallinn — it's cheap and everywhere.",
    telecom: [
      { name: "Telia / Elisa / Tele2", note: "Cheap prepaid 'Super'/tourist SIMs with data." },
    ],
    esimNote: ESIM,
  },
  LV: {
    rides: ["bolt", "yandex"],
    telecom: [{ name: "LMT / Tele2 / Bite", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  LT: {
    rides: ["bolt"],
    telecom: [{ name: "Telia / Bite / Tele2", note: "Cheap prepaid 'Pildyk'/'Ežys' SIMs." }],
    esimNote: ESIM,
  },
  RS: {
    rides: ["yandex", "carGo"],
    ridesNote: "CarGo is the local app in Belgrade; Yandex also operates.",
    telecom: [{ name: "A1 / Telekom Srbija (MTS) / Yettel", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  BG: {
    rides: ["bolt"],
    ridesNote: "Bolt works in Sofia; the local TaxiMe app is another cheap option.",
    telecom: [{ name: "A1 / Yettel / Vivacom", note: "Cheap prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  ME: {
    rides: ["bolt"],
    telecom: [{ name: "Crnogorski Telekom / m:tel / One", note: "Prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  AL: {
    rides: ["uber"],
    ridesNote: "No mainstream ride app — agree the fare first with local taxis, or ask your hotel.",
    telecom: [{ name: "Vodafone / One (Telekom) / Albtelecom", note: "Cheap prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },

  // ---------- Asia ----------
  JP: {
    rides: ["gojp", "uber", "didi"],
    ridesNote: "Apps only hail metered taxis (expensive). The JR/metro network + IC card (Suica) is far cheaper.",
    telecom: [
      { name: "Sakura Mobile / Mobal", note: "Tourist-focused SIMs/eSIMs with English support and unlimited data." },
      { name: "IIJmio / airport data SIMs", note: "Cheapest data-only SIMs (no calls) for short trips." },
    ],
    esimNote: ESIM,
  },
  KR: {
    rides: ["kakao", "uber"],
    ridesNote: "Kakao T is standard; the subway + T-money card is the cheapest way around.",
    telecom: [
      { name: "SK / KT / LG U+ tourist SIMs", note: "Buy unlimited-data tourist SIMs at Incheon airport." },
    ],
    esimNote: ESIM,
  },
  CN: {
    rides: ["didi"],
    ridesNote: "DiDi rules (English mode available). You'll need Alipay/WeChat Pay to pay.",
    telecom: [
      { name: "China Mobile / Unicom", note: "Prepaid SIMs need your passport; a China/Asia eSIM avoids the Great Firewall hassle." },
    ],
    esimNote: `Many sites are blocked in China — an ${ESIM.charAt(0).toLowerCase() + ESIM.slice(1)} plus a VPN set up before arrival is strongly recommended.`,
  },
  HK: {
    rides: ["uber", "hkTaxi"],
    ridesNote: "Uber operates in a legal grey zone; the MTR + Octopus card is cheapest and fastest.",
    telecom: [
      { name: "China Mobile HK / 3HK / csl", note: "Very cheap prepaid data SIMs from 7-Eleven and the airport." },
    ],
    esimNote: ESIM,
  },
  TW: {
    rides: ["uber", "taiwanTaxi"],
    ridesNote: "Uber and Taiwan Taxi (55688) both work; the metro + EasyCard is cheapest.",
    telecom: [
      { name: "Chunghwa / Taiwan Mobile / FarEasTone", note: "Unlimited-data tourist SIMs sold at the airport — excellent value." },
    ],
    esimNote: ESIM,
  },
  TH: {
    rides: ["grab", "bolt", "indrive"],
    ridesNote: "Grab and Bolt for cars; Bolt and Grab bikes beat Bangkok traffic cheaply.",
    telecom: [
      { name: "AIS / TrueMove / dtac tourist SIMs", note: "Cheap tourist SIMs (e.g. ~8–15 days unlimited) sold right at the airport." },
    ],
    esimNote: ESIM,
  },
  VN: {
    rides: ["grab", "be", "xanhSM"],
    ridesNote: "Grab is everywhere; GrabBike motorbike taxis are extremely cheap. Xanh SM is the electric option.",
    telecom: [
      { name: "Viettel / Mobifone / Vinaphone", note: "Very cheap big-data tourist SIMs; buy at the airport (bring passport)." },
    ],
    esimNote: ESIM,
  },
  ID: {
    rides: ["gojek", "grab"],
    ridesNote: "Gojek and Grab motorbike taxis (GoRide/GrabBike) are the cheapest way through traffic.",
    telecom: [
      { name: "Telkomsel / XL / Indosat", note: "Cheap tourist SIMs; buy at the airport counter so it's registered for you." },
    ],
    esimNote: ESIM,
  },
  MY: {
    rides: ["grab", "airasia"],
    ridesNote: "Grab dominates; AirAsia MOVE is a cheaper challenger.",
    telecom: [
      { name: "Hotlink (Maxis) / CelcomDigi / U Mobile", note: "Cheap prepaid tourist SIMs with big data at the airport." },
    ],
    esimNote: ESIM,
  },
  SG: {
    rides: ["grab", "gojek", "tada"],
    ridesNote: "Grab, Gojek and TADA (no commission, often cheapest); the MRT + EZ-Link is very cheap.",
    telecom: [
      { name: "Singtel / StarHub / M1 tourist SIMs", note: "Cheap tourist SIMs with data + calls at the airport and 7-Eleven." },
    ],
    esimNote: ESIM,
  },
  PH: {
    rides: ["grab", "joyride", "angkas"],
    ridesNote: "Grab for cars; Angkas/JoyRide motorbike taxis are cheapest in Manila/Cebu.",
    telecom: [
      { name: "Globe / Smart tourist SIMs", note: "Cheap tourist SIMs (e.g. data + calls) sold at airport arrivals." },
    ],
    esimNote: ESIM,
  },
  KH: {
    rides: ["grab", "passapp"],
    ridesNote: "PassApp (tuk-tuks/remorques) is the cheapest local option; Grab also works.",
    telecom: [{ name: "Cellcard / Smart / Metfone", note: "Very cheap big-data tourist SIMs at the airport." }],
    esimNote: ESIM,
  },
  LA: {
    rides: ["loca"],
    ridesNote: "LOCA is the local ride app; otherwise negotiate tuk-tuk/jumbo fares up front.",
    telecom: [{ name: "Unitel / Lao Telecom / ETL", note: "Cheap prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  MM: {
    rides: ["grab"],
    ridesNote: "Grab operates in Yangon/Mandalay; agree taxi fares elsewhere.",
    telecom: [{ name: "Telenor (ATOM) / Ooredoo / MPT", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  IN: {
    rides: ["uber", "ola", "rapido"],
    ridesNote: "Uber/Ola for cabs and cheap autos; Rapido bikes are the cheapest way through traffic.",
    telecom: [
      { name: "Airtel / Jio tourist SIMs", note: "Among the cheapest data in the world; buy a tourist SIM at the airport (passport + photo)." },
    ],
    esimNote: ESIM,
  },
  NP: {
    rides: ["pathao", "indrive"],
    ridesNote: "Pathao and inDrive (cars & bikes) are cheapest in Kathmandu.",
    telecom: [{ name: "Ncell / Nepal Telecom", note: "Cheap prepaid tourist SIMs with data; buy in the city or airport." }],
    esimNote: ESIM,
  },
  LK: {
    rides: ["pickme", "uber"],
    ridesNote: "PickMe is the local app (cars, tuk-tuks, bikes) and usually cheapest; Uber also works.",
    telecom: [{ name: "Dialog / Mobitel / Hutch", note: "Cheap tourist SIMs with big data at Colombo airport." }],
    esimNote: ESIM,
  },
  BD: {
    rides: ["uber", "pathao", "indrive"],
    ridesNote: "Pathao and Uber bikes are cheapest in Dhaka's traffic.",
    telecom: [{ name: "Grameenphone / Robi / Banglalink", note: "Cheap prepaid SIMs; passport needed to register." }],
    esimNote: ESIM,
  },
  PK: {
    rides: ["careem", "indrive", "yango"],
    ridesNote: "Careem, inDrive and Yango all compete — inDrive lets you negotiate the fare.",
    telecom: [{ name: "Jazz / Zong / Telenor / Ufone", note: "Cheap prepaid SIMs; passport required." }],
    esimNote: ESIM,
  },
  KZ: {
    rides: ["yandex", "indrive"],
    telecom: [{ name: "Beeline / Kcell / Tele2", note: "Cheap prepaid SIMs with big data." }],
    esimNote: ESIM,
  },
  UZ: {
    rides: ["yandex"],
    ridesNote: "Yandex Go is cheap and reliable in Tashkent and Samarkand.",
    telecom: [{ name: "Beeline / Ucell / Mobiuz", note: "Cheap prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  KG: {
    rides: ["yandex", "namba"],
    ridesNote: "Yandex Go and Namba Taxi are cheapest in Bishkek.",
    telecom: [{ name: "Beeline / O! / MegaCom", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  AE: {
    rides: ["careem", "uber", "yango"],
    ridesNote: "Careem and Uber both dispatch cars and official taxis; the Dubai Metro + Nol card is cheapest.",
    telecom: [
      { name: "du / e& (Etisalat) tourist SIMs", note: "Prepaid 'Visitor'/'Tourist' SIMs with data at the airport." },
    ],
    esimNote: ESIM,
  },
  SA: {
    rides: ["uber", "careem"],
    telecom: [{ name: "STC / Mobily / Zain tourist SIMs", note: "Prepaid data SIMs at the airport; passport/visa scan required." }],
    esimNote: ESIM,
  },
  QA: {
    rides: ["uber", "careem"],
    ridesNote: "Karwa (official taxi) app also works; Doha Metro is cheap and modern.",
    telecom: [{ name: "Ooredoo / Vodafone 'Hala' tourist SIM", note: "Prepaid tourist SIMs with data at Hamad airport." }],
    esimNote: ESIM,
  },
  OM: {
    rides: ["otaxi", "careem"],
    telecom: [{ name: "Omantel / Ooredoo", note: "Prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  JO: {
    rides: ["uber", "careem"],
    telecom: [{ name: "Zain / Orange / Umniah tourist SIM", note: "Cheap prepaid tourist SIMs with data at the airport." }],
    esimNote: ESIM,
  },
  LB: {
    rides: ["bolt", "uber"],
    telecom: [{ name: "Alfa / touch", note: "Prepaid SIMs are relatively pricey; an eSIM is often better value." }],
    esimNote: ESIM,
  },
  IL: {
    rides: ["gett", "uber", "yango"],
    ridesNote: "Gett dispatches licensed taxis; Yango is often cheapest.",
    telecom: [{ name: "019 / Pelephone / Partner / Cellcom", note: "Cheap prepaid SIMs with big data at malls/airport." }],
    esimNote: ESIM,
  },
  MV: {
    rides: ["uber"],
    ridesNote: "You'll mostly use resort speedboats/seaplanes and the Malé ferry — no ride apps on the islands.",
    telecom: [{ name: "Dhiraagu / Ooredoo tourist SIM", note: "Tourist SIMs with data at Velana airport." }],
    esimNote: ESIM,
  },

  // ---------- Africa ----------
  EG: {
    rides: ["uber", "careem", "indrive"],
    ridesNote: "Uber and Careem are cheap and avoid taxi haggling; inDrive lets you set the fare.",
    telecom: [
      { name: "Vodafone / Orange / Etisalat / WE", note: "Cheap prepaid tourist SIMs with data at the airport." },
    ],
    esimNote: ESIM,
  },
  MA: {
    rides: ["careem", "indrive", "heetch"],
    ridesNote: "Apps are semi-legal; official petit taxis are cheap if you insist on the meter.",
    telecom: [{ name: "Maroc Telecom / Orange / inwi", note: "Very cheap prepaid tourist SIMs with data at the airport." }],
    esimNote: ESIM,
  },
  TN: {
    rides: ["bolt"],
    ridesNote: "Bolt operates in Tunis; yellow taxis are cheap on the meter.",
    telecom: [{ name: "Ooredoo / Orange / Tunisie Telecom", note: "Cheap prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  ZA: {
    rides: ["bolt", "uber", "indrive"],
    ridesNote: "Bolt and Uber are cheap and much safer than street taxis.",
    telecom: [
      { name: "Vodacom / MTN / Telkom / Cell C", note: "Cheap prepaid SIMs; RICA registration needs passport + address." },
    ],
    esimNote: ESIM,
  },
  KE: {
    rides: ["bolt", "uber", "littlecab"],
    ridesNote: "Bolt is usually cheapest; Little is the local app. Bolt Boda bikes are cheapest of all.",
    telecom: [{ name: "Safaricom / Airtel", note: "Cheap prepaid tourist SIMs (Safaricom has the best coverage + M-Pesa)." }],
    esimNote: ESIM,
  },
  TZ: {
    rides: ["bolt", "uber"],
    telecom: [{ name: "Vodacom / Airtel / Tigo / Halotel", note: "Cheap prepaid SIMs; passport needed to register." }],
    esimNote: ESIM,
  },
  NG: {
    rides: ["bolt", "uber", "indrive"],
    ridesNote: "Bolt and inDrive are usually cheaper than Uber in Lagos/Abuja.",
    telecom: [{ name: "MTN / Airtel / Glo / 9mobile", note: "Cheap prepaid SIMs; NIN/passport registration required." }],
    esimNote: ESIM,
  },
  GH: {
    rides: ["bolt", "uber", "yango"],
    telecom: [{ name: "MTN / Telecel / AirtelTigo", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  UG: {
    rides: ["bolt", "uber", "safeboda"],
    ridesNote: "SafeBoda (helmeted boda-boda bikes) is cheap and safer than street bikes.",
    telecom: [{ name: "MTN / Airtel", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  RW: {
    rides: ["move", "yego"],
    ridesNote: "Move and YegoMoto (metered bikes) are the app options in Kigali.",
    telecom: [{ name: "MTN / Airtel", note: "Cheap prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  ET: {
    rides: ["ride", "feres"],
    ridesNote: "RIDE and Feres are the local ride apps in Addis Ababa.",
    telecom: [{ name: "Ethio Telecom / Safaricom", note: "Prepaid SIMs; buy at the airport with your passport." }],
    esimNote: ESIM,
  },
  NA: {
    rides: ["lefa"],
    ridesNote: "LEFA is the local ride app in Windhoek; otherwise self-drive is the norm.",
    telecom: [{ name: "MTC / TN Mobile", note: "Cheap prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  MU: {
    rides: ["yugo"],
    ridesNote: "Yugo is the local ride app; taxis and buses are cheap.",
    telecom: [{ name: "Emtel / my.t / MTML", note: "Prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  SN: {
    rides: ["yango", "heetch"],
    telecom: [{ name: "Orange / Free / Expresso", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  CI: {
    rides: ["yango", "uber"],
    telecom: [{ name: "Orange / MTN / Moov", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },

  // ---------- Americas ----------
  US: {
    rides: ["uber", "lyft"],
    ridesNote: "Compare Uber and Lyft side by side — prices swing with surge pricing.",
    telecom: [
      { name: "US Mobile / Mint Mobile", note: "Cheapest prepaid eSIMs/plans for visitors (on Verizon/T-Mobile networks)." },
      { name: "T-Mobile / AT&T prepaid tourist SIM", note: "Best coverage; prepaid plans with lots of data." },
    ],
    esimNote: ESIM,
  },
  CA: {
    rides: ["uber", "lyft"],
    telecom: [
      { name: "Public Mobile / Freedom / Fizz", note: "Cheapest prepaid data SIMs (Canada is otherwise expensive)." },
      { name: "Rogers / Bell / Telus", note: "Best coverage." },
    ],
    esimNote: ESIM,
  },
  MX: {
    rides: ["uber", "didi", "cabify"],
    ridesNote: "DiDi is often the cheapest; Uber and Cabify also widespread.",
    telecom: [
      { name: "Telcel / AT&T Mexico", note: "Telcel has the best coverage; cheap prepaid 'Amigo' SIMs at OXXO stores." },
    ],
    esimNote: ESIM,
  },
  BR: {
    rides: ["uber", "app99"],
    ridesNote: "99 (DiDi) is usually cheaper than Uber; both offer motorbike rides.",
    telecom: [
      { name: "Vivo / Claro / TIM", note: "Cheap prepaid SIMs; a Brazilian CPF number sometimes helps activation." },
    ],
    esimNote: ESIM,
  },
  AR: {
    rides: ["uber", "cabify", "didi"],
    ridesNote: "Cabify and DiDi are popular; regular radio-taxis are also cheap.",
    telecom: [
      { name: "Personal / Claro / Movistar", note: "Cheap prepaid SIMs; the SUBE card covers Buenos Aires transit." },
    ],
    esimNote: ESIM,
  },
  CL: {
    rides: ["uber", "cabify", "didi"],
    telecom: [{ name: "Entel / Movistar / WOM / Claro", note: "Cheap prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  PE: {
    rides: ["uber", "cabify", "didi", "indrive"],
    ridesNote: "Cabify and DiDi feel safer than street taxis in Lima.",
    telecom: [{ name: "Claro / Movistar / Entel / Bitel", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  CO: {
    rides: ["uber", "didi", "cabify", "indrive"],
    ridesNote: "DiDi and inDrive are usually cheapest; Uber works in a legal grey area.",
    telecom: [{ name: "Claro / Movistar / Tigo / WOM", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  EC: {
    rides: ["uber", "cabify", "indrive"],
    telecom: [{ name: "Claro / Movistar / CNT", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  BO: {
    rides: ["uber", "yango", "indrive"],
    ridesNote: "Ride apps are limited — agree radio-taxi fares up front.",
    telecom: [{ name: "Entel / Tigo / Viva", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  UY: {
    rides: ["uber", "cabify"],
    telecom: [{ name: "Antel / Claro / Movistar", note: "Cheap prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  CR: {
    rides: ["uber", "didi"],
    ridesNote: "Uber operates in a grey zone; official red taxis use meters ('maría').",
    telecom: [{ name: "Kölbi / Claro / Movistar", note: "Cheap prepaid tourist SIMs with data at the airport." }],
    esimNote: ESIM,
  },
  PA: {
    rides: ["uber", "didi"],
    telecom: [{ name: "+Móvil (Cable&Wireless) / Tigo", note: "Cheap prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  GT: {
    rides: ["uber", "indrive"],
    telecom: [{ name: "Tigo / Claro", note: "Cheap prepaid SIMs with data." }],
    esimNote: ESIM,
  },
  DO: {
    rides: ["uber", "indrive"],
    telecom: [{ name: "Claro / Altice / Viva", note: "Cheap prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  JM: {
    rides: ["uber", "indrive"],
    ridesNote: "Ride apps are limited — use hotel taxis or licensed (red PP-plate) taxis.",
    telecom: [{ name: "Digicel / Flow", note: "Prepaid tourist SIMs with data." }],
    esimNote: ESIM,
  },
  CU: {
    rides: [],
    ridesNote: "No ride apps — use official yellow Cubataxi, classic-car colectivos, or agree a fare first.",
    telecom: [{ name: "ETECSA (Cubacel)", note: "The only operator; tourist SIMs are pricey and data is slow. An eSIM may not work — check coverage." }],
    esimNote: "Connectivity in Cuba is limited and state-controlled; download offline maps before you arrive.",
  },

  // ---------- Oceania ----------
  AU: {
    rides: ["uber", "didi", "ola", "bolt"],
    ridesNote: "DiDi and Ola often undercut Uber in Sydney/Melbourne.",
    telecom: [
      { name: "Amaysim / Boost / Aldi Mobile", note: "Cheapest prepaid SIMs (on the Telstra/Optus networks)." },
      { name: "Telstra / Optus", note: "Best coverage in the outback." },
    ],
    esimNote: ESIM,
  },
  NZ: {
    rides: ["uber", "ola", "didi"],
    telecom: [
      { name: "Skinny / Warehouse Mobile", note: "Cheapest prepaid SIMs (on the Spark/2degrees networks)." },
      { name: "Spark / One NZ / 2degrees", note: "Best coverage; tourist SIMs at the airport." },
    ],
    esimNote: ESIM,
  },
  FJ: {
    rides: [],
    ridesNote: "No ride apps — metered taxis in Suva/Nadi are cheap; agree island fares first.",
    telecom: [{ name: "Vodafone Fiji / Digicel", note: "Cheap prepaid tourist SIMs with data at Nadi airport." }],
    esimNote: ESIM,
  },
};

// Regional fallback ride apps for countries not curated above.
const REGION_RIDES: Record<string, string[]> = {
  Europe: ["bolt", "uber", "freenow"],
  Asia: ["grab", "uber", "indrive"],
  Africa: ["bolt", "yango", "indrive"],
  "North America": ["uber", "lyft"],
  "South America": ["uber", "didi", "indrive"],
  Oceania: ["uber"],
};

export type ResolvedGettingAround = GettingAround & { curated: boolean };

/** Returns curated data for a country, or a sensible regional fallback. */
export function getGettingAround(
  iso2: string,
  continent: string
): ResolvedGettingAround {
  const key = (iso2 || "").toUpperCase();
  const curated = gettingAround[key];
  if (curated) return { ...curated, curated: true };

  const rides = REGION_RIDES[continent] ?? ["uber", "indrive"];
  return {
    curated: false,
    rides,
    ridesNote:
      "Ride-hailing coverage varies here — check whether these apps are live in your city before relying on them.",
    telecom: [
      {
        name: "Local prepaid SIM",
        note: "Buy a tourist SIM from an official operator kiosk at the airport (bring your passport) — usually the cheapest data.",
      },
    ],
    esimNote: ESIM,
  };
}
