import type { IconName } from "./Icons";

export const PHONE_DISPLAY = "(720) 296-7711";
export const PHONE_HREF = "tel:+17202967711";

const BA = "/BeforeAfter";

export const TRUST: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield", title: "Fully Insured Team", text: "Your home is in safe hands from setup to takedown." },
  { icon: "pen", title: "Custom Lighting Designs", text: "A plan built around your roofline and landscaping." },
  { icon: "tool", title: "In-Season Maintenance", text: "Bulb out? We fix it within 24 to 48 hours." },
  { icon: "box", title: "Removal & Storage", text: "We take it all down after the holidays." },
];

export const SERVICES: {
  icon: IconName;
  title: string;
  text: string;
  bullets: [string, string];
}[] = [
  {
    icon: "home",
    title: "Roofline Lighting",
    text: "Straight, evenly spaced lights along gutters, peaks and eaves for a crisp outline.",
    bullets: ["Custom-cut light runs", "Shingle-safe clips"],
  },
  {
    icon: "door",
    title: "Entryway & Porch Lighting",
    text: "A warm welcome with lit doorways, railings, columns and wreaths.",
    bullets: ["Doors, columns, railings", "Wreath and garland lighting"],
  },
  {
    icon: "tree",
    title: "Tree & Landscape Lighting",
    text: "Wrapped trunks, glowing canopies and lit shrubs that add depth to your yard.",
    bullets: ["Trunk and canopy wraps", "Bushes and walkways"],
  },
  {
    icon: "star",
    title: "Full Property Lighting",
    text: "Roofline, entry and landscape lighting designed as one complete display.",
    bullets: ["Ideal for larger homes", "Balanced, unified look"],
  },
  {
    icon: "pen",
    title: "Custom Design & Planning",
    text: "Every property is different. We plan a lighting design for your home and style.",
    bullets: ["Warm white or multicolor", "Clear written proposal"],
  },
  {
    icon: "tool",
    title: "Maintenance & Support",
    text: "We keep your lights shining all season with quick repairs and replacements.",
    bullets: ["Included all season", "24 to 48 hour response"],
  },
  {
    icon: "box",
    title: "Takedown & Storage",
    text: "Careful removal, packing and off-season storage so your lights are ready next year.",
    bullets: ["Early to mid January", "Property left spotless"],
  },
  {
    icon: "bulb",
    title: "Premium LED Lights",
    text: "Commercial-grade LEDs that are brighter, safer and built for Colorado winters.",
    bullets: ["Supplied by us", "Timers programmed for you"],
  },
  {
    icon: "building",
    title: "HOA & Small Business",
    text: "Entrances, storefronts and common areas lit with the same care as our homes.",
    bullets: ["Entrances and signage", "Storefront displays"],
  },
];

export const REVIEWS: { rating: string; quote: string; name: string; location: string }[] = [
  {
    rating: "5.0",
    quote: "Top tier service! They customized the roofline lighting perfectly to fit our home's architecture. Takedown and storage in January was seamless. Worth every penny.",
    name: "David & Karen K.",
    location: "Cherry Creek, Denver",
  },
  {
    rating: "4.9",
    quote: "From initial design to final glowing lights, everything was handled with perfection. Our kids were thrilled, and neighbors kept complimenting the display!",
    name: "Sarah P.",
    location: "Castle Pines, CO",
  },
  {
    rating: "4.8",
    quote: "Prompt, safe, and professional installation. The warm gold glow on our roofline created a holiday atmosphere that exceeded all expectations.",
    name: "Michael & Elena B.",
    location: "Wash Park, Denver",
  },
  {
    rating: "4.9",
    quote: "Extremely impressive attention to detail. No visible clips, straight lines, and hassle-free post-season removal. Will definitely use them every year!",
    name: "Robert H.",
    location: "Littleton, CO",
  },
  {
    rating: "5.0",
    quote: "The team did an amazing job with our Christmas lights! The installation was flawless, and their attention to detail made our home the best on the block. Professional & on time!",
    name: "Jessica M.",
    location: "Highlands Ranch, CO",
  },
  {
    rating: "4.9",
    quote: "Super reliable and great communication from start to finish. They showed up when they said they would, and our lights look absolutely stunning. Highly recommend!",
    name: "Brandon T.",
    location: "Parker, CO",
  },
];

export const SERVICE_DETAILS: {
  id: string;
  title: string;
  nav: string;
  before: string;
  after: string;
  text: string;
  faqs: [string, string][];
}[] = [
  {
    id: "svc-roofline",
    title: "Roofline Lighting",
    nav: "Roofline Lighting",
    before: `${BA}/rooflinelightning/before.webp`,
    after: `${BA}/rooflinelightning/after.webp`,
    text: "Your roofline is the frame of your whole display. We measure every run, cut lights to length and mount them with clips matched to your shingles and gutters, so the lines stay straight and nothing is nailed or stapled.",
    faqs: [
      ["What's included", "Measuring, custom-cut commercial-grade LED runs, clip installation on gutters, shingles and peaks, and timer setup."],
      ["Warm white or multicolor?", "Both are available. Warm white gives a classic, elegant look, while multicolor feels playful and bright. We'll suggest what suits your home in your proposal."],
    ],
  },
  {
    id: "svc-entry",
    title: "Entryway & Porch Lighting",
    nav: "Entryway & Porch",
    before: `${BA}/entrywaylightning/before.webp`,
    after: `${BA}/entrywaylightning/after.webp`,
    text: "The entry is the first thing guests see. We light doorways, columns, railings and steps, and can add lit wreaths and garland for a welcoming, finished look.",
    faqs: [
      ["What's included", "Door and window outlines, column and railing wraps, lit garland and wreaths, and hidden cord routing to outdoor outlets."],
      ["Can you light windows too?", "Yes. Window outlines pair well with roofline lighting and help balance the front of the home."],
    ],
  },
  {
    id: "svc-trees",
    title: "Tree & Landscape Lighting",
    nav: "Tree & Landscape",
    before: `${BA}/treelightning/before.webp`,
    after: `${BA}/treelightning/after.webp`,
    text: "Wrapped trunks, glowing canopies and lit shrubs add depth and warmth to your yard. We wrap evenly and secure every strand so it holds up through Colorado wind and snow.",
    faqs: [
      ["What's included", "Trunk and branch wraps, canopy draping, shrub and hedge nets, and walkway lighting."],
      ["Will it harm my trees?", "No. We use soft ties and never staple or nail into bark, and everything is removed gently after the season."],
    ],
  },
  {
    id: "svc-full",
    title: "Full Property & Large Homes",
    nav: "Full Property & Large Homes",
    before: `${BA}/LargeHouse/Before.webp`,
    after: `${BA}/LargeHouse/After.webp`,
    text: "For larger or multi-level homes, we design roofline, entry and landscape lighting as one complete display, so everything feels balanced from the street.",
    faqs: [
      ["What's included", "A full-property design, all lighting zones, timers for each zone and priority scheduling for maintenance."],
      ["How long does a large install take?", "Most homes are finished in a single visit. Larger properties may take a second day, which we'll confirm in your proposal."],
    ],
  },
  {
    id: "svc-design",
    title: "Custom Design & Planning",
    nav: "Custom Design",
    before: `${BA}/dayandnight/day.webp`,
    after: `${BA}/dayandnight/night.webp`,
    text: "Every home is different. We look at your architecture, landscaping and preferred style, then send a clear proposal showing what we'll light and the price, with no surprises.",
    faqs: [
      ["How does the quote work?", "Request a quote online or by phone. We'll review your home in person or from photos and send custom pricing."],
      ["Can I change the design later?", "Yes. Let us know before install day and we'll adjust the plan. Many customers add trees or windows in later years."],
    ],
  },
  {
    id: "svc-care",
    title: "Maintenance, Takedown & Storage",
    nav: "Maintenance & Takedown",
    before: `${BA}/services/before.webp`,
    after: `${BA}/services/after.webp`,
    text: "If weather or a burned-out bulb affects your display, we'll fix it within 24 to 48 hours at no extra charge. After New Year's we take everything down, pack it neatly and store it for next season.",
    faqs: [
      ["When is takedown?", "Takedown starts promptly after New Year's Day, usually between January 2 and January 20, weather permitting."],
      ["Do I need to be home?", "No. As long as outdoor outlets are reachable and pets are inside, we'll finish the work and leave your property clean."],
    ],
  },
];

export const WHY: { icon: IconName; title: string; text: string }[] = [
  { icon: "ladder", title: "Avoid Climbing Ladders", text: "Stay safely on the ground while our installers handle every roofline with professional equipment and safety procedures." },
  { icon: "clock", title: "Save Time During the Holidays", text: "Skip the weekends untangling lights. We take care of everything while you spend time with family." },
  { icon: "star", title: "A Clean Professional Look", text: "Straight rooflines, balanced spacing and a designed display that lifts your home's curb appeal." },
  { icon: "home", title: "Protect Your Home", text: "Professional clips and installation methods help prevent damage to shingles, gutters, siding and trim." },
  { icon: "heart", title: "Stress-Free Holidays", text: "No tangled wires and no troubleshooting. Just a beautiful display you can enjoy from the first night." },
  { icon: "shield", title: "Fully Insured Professionals", text: "A trained, insured installation team gives you confidence from the first visit to the final takedown." },
];

export const STATS: { icon: IconName; title: string; text: string }[] = [
  { icon: "heart", title: "Locally Trusted", text: "Proudly serving our community" },
  { icon: "bulb", title: "Professional Service", text: "Experts in holiday lighting" },
  { icon: "clock", title: "On Time, Every Time", text: "Reliable from start to finish" },
  { icon: "star", title: "5-Star Rated", text: "By your neighbors" },
];

export const STEPS: { title: string; text: string }[] = [
  { title: "Request Your Free Quote", text: "Tell us about your home, your preferred lighting style and your ideal install date." },
  { title: "Approve Your Lighting Plan", text: "We recommend a design and send a clear proposal with no surprises." },
  { title: "Enjoy Your Holiday Display", text: "We install, maintain and later remove your lights. You just enjoy the glow." },
];

export const PROPERTIES: { icon: IconName; title: string; text: string }[] = [
  { icon: "home", title: "Single-Family Homes", text: "Roofline and entry lighting sized to your home." },
  { icon: "star", title: "Large & Custom Homes", text: "Multi-level rooflines and full-property displays." },
  { icon: "users", title: "Townhomes & Duplexes", text: "Tidy, coordinated lighting for shared walls." },
  { icon: "tree", title: "Yards & Landscapes", text: "Trees, shrubs and walkways that glow at night." },
  { icon: "pin", title: "HOA Entrances", text: "Welcoming lit entries and common areas." },
  { icon: "building", title: "Small Businesses", text: "Storefronts that stand out to holiday shoppers." },
];

export const AREAS = [
  "Denver",
  "Aurora",
  "Lakewood",
  "Centennial",
  "Littleton",
  "Arvada",
  "Westminster",
  "Highlands Ranch",
  "Parker",
  "Englewood",
];

export const FAQS: [string, string][] = [
  ["How much does Christmas light installation cost?", "The cost depends on the size of your home, roofline, lighting design, accessibility, number of trees or landscaping features and the services included. Request a quote for custom pricing for your property."],
  ["Do you provide the Christmas lights?", "Yes. We supply commercial-grade LED lights cut to fit your home. Using our own lighting system means custom lengths, fewer electrical faults and full maintenance coverage."],
  ["What happens if part of my display stops working?", "Maintenance is included all season. If a bulb or section goes out, contact us and we'll be there within 24 to 48 hours to repair it at no extra charge."],
  ["When should I schedule my installation?", "As early as possible. Our calendar fills quickly from October. Early installs can be done ahead of time with lights programmed to turn on whenever you wish."],
  ["Are you insured?", "Yes. We're fully licensed and carry comprehensive general liability insurance for residential properties."],
  ["When will my Christmas lights be removed?", "Takedown begins promptly after New Year's Day, usually between January 2 and January 20, weather permitting. We neatly package and store all equipment for next season."],
  ["Do I need to be home during installation?", "No. As long as outdoor power outlets are accessible and pets are safely inside, our team will complete the setup and leave your property clean."],
];

export const MAP_POINTS = [
  "Free on-site or photo-based quotes",
  "Install dates from early November",
  "Takedown between January 2 and 20",
  "You don't need to be home",
];

/** "David & Karen K." -> "DK" (same rule as the design script) */
export const initials = (name: string) =>
  name
    .split(/[ &.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
