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
  /** Companion frames from the same series, shown on the detail page. */
  frames: string[];
  /** How it was shot (lens / light). */
  meta: { camera: string };
  /**
   * Optional real story for the detail page (one entry per paragraph).
   * Left empty until the photographer provides the true account.
   */
  story?: string[];
};

/**
 * Curated selection for the landing page.
 * All images live in /public/images. Replace any path with your own.
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
    meta: { camera: "50mm, natural light" },
    frames: ["/images/50.jpg", "/images/51.jpg", "/images/52.jpg"],
  },
  {
    id: "the-traveller",
    title: "The Traveller",
    category: "Street",
    year: "2024",
    image: "/images/18.jpg",
    narrative: "Movement paused at the edge of the platform.",
    span: "tall",
    meta: { camera: "35mm, available light" },
    frames: ["/images/19.jpg", "/images/55.jpg", "/images/35.jpg"],
  },
  {
    id: "golden-field",
    title: "Golden Field",
    category: "Conceptual",
    year: "2024",
    image: "/images/11.jpg",
    narrative: "The last warmth before the light lets go.",
    span: "regular",
    meta: { camera: "85mm, backlit" },
    frames: ["/images/14.jpg", "/images/46.webp", "/images/57.jpg"],
  },
  {
    id: "city-at-dusk",
    title: "City at Dusk",
    category: "Street",
    year: "2024",
    image: "/images/35.jpg",
    narrative: "Ordinary corners, caught mid-confession.",
    span: "wide",
    meta: { camera: "35mm, handheld" },
    frames: ["/images/37.jpg", "/images/39.jpg", "/images/36.webp"],
  },
  {
    id: "repose",
    title: "Repose",
    category: "Fashion",
    year: "2024",
    image: "/images/56.jpg",
    narrative: "Stillness worn like a second skin.",
    span: "regular",
    meta: { camera: "85mm, low key" },
    frames: ["/images/5.jpg", "/images/38.webp", "/images/45.jpg"],
  },
  {
    id: "the-reading-room",
    title: "The Reading Room",
    category: "Portrait",
    year: "2023",
    image: "/images/2.jpg",
    narrative: "Between two pages, a whole afternoon.",
    span: "tall",
    meta: { camera: "50mm, natural light" },
    frames: ["/images/9.jpg", "/images/10.jpg", "/images/53.jpg"],
  },
];

/** Hero background rotation. */
export const heroImages = [
  "/images/a_1.jpg",
  "/images/35.jpg",
  "/images/27.jpg",
  "/images/56.jpg",
];

/** Look up a single work by its slug. */
export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.id === slug);
}

/** The previous / next work in the series, wrapping around the ends. */
export function adjacentWorks(slug: string): { prev: Work; next: Work } | null {
  const i = works.findIndex((w) => w.id === slug);
  if (i === -1) return null;
  return {
    prev: works[(i - 1 + works.length) % works.length],
    next: works[(i + 1) % works.length],
  };
}
