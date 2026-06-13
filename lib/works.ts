export type Work = {
  id: string;
  title: string;
  category: string;
  year: string;
  /** Path under /public. Swap freely for your own high-res files. */
  image: string;
  /** Short narrative line revealed on hover. */
  narrative: string;
  /** Magazine grid emphasis. */
  span: "tall" | "wide" | "regular" | "feature";
};

/**
 * Curated selection for the landing page.
 * All images live in /public/images — replace any path with your own.
 */
export const works: Work[] = [
  {
    id: "bloom-in-hand",
    title: "Bloom in Hand",
    category: "Portrait",
    year: "2024",
    image: "/images/47.jpg",
    narrative: "A gesture offered to no one in particular.",
    span: "feature",
  },
  {
    id: "the-traveller",
    title: "The Traveller",
    category: "Street",
    year: "2024",
    image: "/images/18.jpg",
    narrative: "Movement paused at the edge of the platform.",
    span: "tall",
  },
  {
    id: "golden-field",
    title: "Golden Field",
    category: "Conceptual",
    year: "2024",
    image: "/images/11.jpg",
    narrative: "The last warmth before the light lets go.",
    span: "regular",
  },
  {
    id: "city-at-dusk",
    title: "City at Dusk",
    category: "Street",
    year: "2024",
    image: "/images/35.jpg",
    narrative: "Ordinary corners, caught mid-confession.",
    span: "wide",
  },
  {
    id: "repose",
    title: "Repose",
    category: "Fashion",
    year: "2024",
    image: "/images/56.jpg",
    narrative: "Stillness worn like a second skin.",
    span: "regular",
  },
  {
    id: "the-reading-room",
    title: "The Reading Room",
    category: "Portrait",
    year: "2023",
    image: "/images/2.jpg",
    narrative: "Between two pages, a whole afternoon.",
    span: "tall",
  },
];

/** Hero background rotation. */
export const heroImages = [
  "/images/a_1.jpg",
  "/images/35.jpg",
  "/images/27.jpg",
  "/images/56.jpg",
];
