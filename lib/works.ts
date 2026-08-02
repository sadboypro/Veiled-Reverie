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
  /** Longer story for the individual work page (one entry per paragraph). */
  story: string[];
  /** Where and how it was made: small facts for the detail sidebar. */
  meta: { location: string; camera: string };
  /** Companion frames from the same series, shown on the detail page. */
  frames: string[];
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
    story: [
      "She had been holding the flower for an hour before I noticed her hands. Not the face, not the light. The hands, keeping something alive that the day had already decided to let go of.",
      "We didn't pose it. I asked her to forget the camera and she did, the way people do when a thing in their palm matters more than the person watching. That half-second of forgetting is the whole photograph.",
    ],
    meta: { location: "Lagos, studio daylight", camera: "50mm, natural light" },
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
    story: [
      "Platforms are honest places. Everyone is between two lives, the one they're leaving and the one that hasn't started, and it shows in how they stand.",
      "I waited three trains for this. Not for a person, exactly, but for the moment the crowd thinned enough to leave one figure holding all that motion still.",
    ],
    meta: { location: "Central line, mid-afternoon", camera: "35mm, available light" },
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
    story: [
      "There's a ten-minute window at the end of a summer day when the field stops being green and starts being gold. Miss it and you're photographing an ordinary evening.",
      "I wanted the frame to feel like the memory of warmth rather than the warmth itself: a little faded, already becoming something you'd tell someone about later.",
    ],
    meta: { location: "Outskirts, golden hour", camera: "85mm, backlit" },
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
    story: [
      "Cities loosen their collar at dusk. The commuters are gone, the neon isn't fully awake, and for an hour the streets belong to whoever is still looking.",
      "I shoot these on foot, slowly, letting the corners tell on themselves: a lit window, a wet reflection, a stranger who becomes a silhouette the moment the sun drops below the roofline.",
    ],
    meta: { location: "Downtown, blue hour", camera: "35mm, handheld" },
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
    story: [
      "The brief asked for fashion; I photographed rest. The clothes are sharper when the body inside them has stopped performing for anyone.",
      "We shot between setups, when she thought we were resetting the lights. Repose isn't a pose you can ask for. You can only be ready when it arrives.",
    ],
    meta: { location: "Studio, single softbox", camera: "85mm, low key" },
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
    story: [
      "A portrait of someone reading is really a portrait of concentration: the rare, unguarded face a person only wears when they've forgotten they have one.",
      "I kept my distance and let the window do the work. The afternoon moved across the page slowly enough that I could wait for the sentence that finally held her.",
    ],
    meta: { location: "Home, window light", camera: "50mm, natural light" },
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
