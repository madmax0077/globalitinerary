// Standard document checklists for common visa scenarios. These are widely
// applicable guidance lists — NOT an official requirement for any specific
// embassy. The exact list varies by consulate and changes over time, so the
// UI always links travellers to the official source to confirm.

export type VisaCode = "H" | "F" | "VOA" | "EV" | "ETA" | "R" | "X";
export type VisaType = "tourist" | "business" | "student" | "work" | "transit";

export const VISA_TYPES: { id: VisaType; label: string }[] = [
  { id: "tourist", label: "Tourism / Holiday" },
  { id: "business", label: "Business" },
  { id: "student", label: "Student" },
  { id: "work", label: "Work / Employment" },
  { id: "transit", label: "Transit" },
];

export type VisaStatus = {
  code: Exclude<VisaCode, "H">;
  days?: number;
};

/** Parses a stored code like "F:90" into a status object. */
export function parseCode(raw: string): VisaStatus {
  if (raw.startsWith("F:")) {
    const days = parseInt(raw.slice(2), 10);
    return { code: "F", days: Number.isFinite(days) ? days : undefined };
  }
  return { code: (raw as VisaStatus["code"]) || "R" };
}

export const STATUS_META: Record<
  Exclude<VisaCode, "H">,
  { label: string; tone: "green" | "amber" | "sky" | "red"; summary: string }
> = {
  F: {
    label: "Visa-free",
    tone: "green",
    summary: "You can enter without a visa for short stays.",
  },
  VOA: {
    label: "Visa on arrival",
    tone: "amber",
    summary: "You can get a visa at the border/airport on arrival.",
  },
  EV: {
    label: "e-Visa required",
    tone: "sky",
    summary: "Apply online for an electronic visa before you travel.",
  },
  ETA: {
    label: "Travel authorisation (ETA)",
    tone: "sky",
    summary: "Apply online for an electronic travel authorisation before you travel.",
  },
  R: {
    label: "Visa required",
    tone: "amber",
    summary: "You must apply for a visa at an embassy/consulate before you travel.",
  },
  X: {
    label: "Entry not admitted",
    tone: "red",
    summary: "Entry is generally not permitted on this passport. Check official sources.",
  },
};

// Base documents by how the visa is obtained.
const BASE: Record<Exclude<VisaCode, "H">, string[]> = {
  F: [
    "Passport valid for at least 6 months beyond your arrival date",
    "Return or onward ticket",
    "Proof of sufficient funds for your stay",
    "Proof of accommodation (hotel booking or host address)",
  ],
  VOA: [
    "Passport valid for at least 6 months with a blank visa page",
    "Recent passport-size photo(s)",
    "Return or onward ticket",
    "Proof of accommodation",
    "Cash to pay the visa-on-arrival fee (check accepted currency)",
    "Proof of sufficient funds",
  ],
  EV: [
    "Passport valid for at least 6 months (scan of the bio page)",
    "Recent digital passport-size photo",
    "Completed online application form",
    "Credit/debit card to pay the e-visa fee",
    "Email address to receive the approved e-visa (print a copy)",
    "Travel itinerary / return ticket",
  ],
  ETA: [
    "Passport valid for the duration of your trip (bio-page scan)",
    "Completed online authorisation form",
    "Credit/debit card for the processing fee",
    "Valid email address for the approval",
  ],
  R: [
    "Passport valid 6+ months with at least two blank pages",
    "Completed and signed visa application form",
    "Recent passport-size photos (check exact size/background)",
    "Confirmed round-trip flight reservation",
    "Proof of accommodation for the whole stay",
    "Bank statements proving sufficient funds (usually last 3–6 months)",
    "Travel medical insurance",
    "Cover letter explaining your trip",
  ],
  X: [
    "Entry is generally not permitted on this passport",
    "Contact the destination's embassy for any exceptional routes",
  ],
};

// Extra documents by visa type.
const BY_TYPE: Record<VisaType, string[]> = {
  tourist: ["Day-by-day travel itinerary", "Proof of ties to home country (optional but helpful)"],
  business: [
    "Invitation letter from the host company abroad",
    "Letter from your employer stating purpose and duration",
    "Company registration / business documents (if self-employed)",
  ],
  student: [
    "Acceptance / admission letter from the institution",
    "Proof of tuition payment or scholarship",
    "Academic transcripts and certificates",
    "Proof of funds to cover tuition and living costs",
  ],
  work: [
    "Signed employment contract or job offer",
    "Approved work permit / sponsorship from the employer",
    "Educational and professional qualification certificates",
    "Police clearance certificate (often required)",
  ],
  transit: [
    "Confirmed ticket for your onward destination",
    "Visa for your final destination (if required)",
    "Proof you will not leave the transit/airport zone (if applicable)",
  ],
};

/** Builds the guidance checklist for a status + visa type. */
export function buildDocuments(code: Exclude<VisaCode, "H">, type: VisaType): string[] {
  const base = BASE[code] ?? BASE.R;
  if (code === "X") return base;
  // Visa-free & transit generally don't need type-specific paperwork beyond base.
  const extra = code === "F" ? (type === "tourist" ? [] : BY_TYPE[type]) : BY_TYPE[type];
  return [...base, ...extra];
}

/** A safe official-source search link (we don't hardcode possibly-wrong URLs). */
export function officialSourceUrl(destinationName: string, homeName?: string): string {
  const q = homeName
    ? `official ${destinationName} visa for ${homeName} citizens 2026`
    : `official ${destinationName} visa requirements 2026`;
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}
