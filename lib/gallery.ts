export type Category =
  | "Portrait"
  | "Fashion"
  | "Lifestyle"
  | "Documentary"
  | "Conceptual"
  | "Street";

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  category: Category;
  year: string;
};

export const categories: Category[] = [
  "Portrait",
  "Fashion",
  "Lifestyle",
  "Documentary",
  "Conceptual",
  "Street",
];

// Per-photo catalogue — title + category authored from the actual frames in /public/images.
type Entry = { file: string; title: string; category: Category; year: string };

const catalogue: Entry[] = [
  { file: "1.jpg", title: "Doorway in White", category: "Fashion", year: "2024" },
  { file: "2.jpg", title: "The Reading Room", category: "Portrait", year: "2023" },
  { file: "3.jpg", title: "Window Seat", category: "Documentary", year: "2023" },
  { file: "4.jpg", title: "Departure", category: "Fashion", year: "2024" },
  { file: "5.jpg", title: "Lean", category: "Fashion", year: "2023" },
  { file: "6.jpg", title: "Threshold", category: "Lifestyle", year: "2022" },
  { file: "7.jpg", title: "Reach", category: "Conceptual", year: "2024" },
  { file: "8.jpg", title: "The Long Track", category: "Documentary", year: "2023" },
  { file: "9.jpg", title: "Among the Pages", category: "Lifestyle", year: "2022" },
  { file: "10.jpg", title: "Quiet Chapter", category: "Portrait", year: "2023" },
  { file: "11.jpg", title: "Golden Field", category: "Conceptual", year: "2024" },
  { file: "14.jpg", title: "Wildflower", category: "Conceptual", year: "2023" },
  { file: "15.jpg", title: "Verdant", category: "Portrait", year: "2022" },
  { file: "16.jpg", title: "Glasshouse", category: "Portrait", year: "2024" },
  { file: "17.jpg", title: "Soft Gaze", category: "Portrait", year: "2023" },
  { file: "18.jpg", title: "The Traveller", category: "Street", year: "2024" },
  { file: "19.jpg", title: "Platform", category: "Street", year: "2023" },
  { file: "23.jpg", title: "What the Quiet Holds", category: "Conceptual", year: "2022" },
  { file: "24.jpg", title: "An Hour to Myself", category: "Conceptual", year: "2023" },
  { file: "25.jpg", title: "The Space Between", category: "Conceptual", year: "2024" },
  { file: "26.jpg", title: "Rose Horizon", category: "Conceptual", year: "2023" },
  { file: "27.jpg", title: "Into the Light", category: "Conceptual", year: "2024" },
  { file: "31.jpg", title: "Riverbank", category: "Documentary", year: "2022" },
  { file: "32.jpg", title: "Bloom in Mono", category: "Conceptual", year: "2023" },
  { file: "33.jpg", title: "Far From the Noise", category: "Conceptual", year: "2024" },
  { file: "35.jpg", title: "City at Dusk", category: "Street", year: "2024" },
  { file: "36.webp", title: "Concrete Lines", category: "Street", year: "2023" },
  { file: "37.jpg", title: "Skyline", category: "Street", year: "2024" },
  { file: "38.webp", title: "Cool Composure", category: "Fashion", year: "2023" },
  { file: "39.jpg", title: "Grey City", category: "Street", year: "2022" },
  { file: "40.webp", title: "The Cyclist", category: "Street", year: "2024" },
  { file: "41.jpg", title: "Tracks", category: "Lifestyle", year: "2023" },
  { file: "42.webp", title: "Field Notes", category: "Portrait", year: "2022" },
  { file: "43.jpg", title: "Toward the Train", category: "Documentary", year: "2024" },
  { file: "44.webp", title: "Among the Grass", category: "Portrait", year: "2023" },
  { file: "45.jpg", title: "Trainside", category: "Fashion", year: "2024" },
  { file: "46.webp", title: "Quiet Fields", category: "Conceptual", year: "2023" },
  { file: "47.jpg", title: "Bloom in Hand", category: "Portrait", year: "2024" },
  { file: "48.jpg", title: "The Corridor", category: "Conceptual", year: "2023" },
  { file: "49.jpg", title: "Self, with Camera", category: "Documentary", year: "2024" },
  { file: "50.jpg", title: "Held Breath", category: "Portrait", year: "2022" },
  { file: "51.jpg", title: "She Listens", category: "Portrait", year: "2023" },
  { file: "52.jpg", title: "A Softer Hour", category: "Portrait", year: "2024" },
  { file: "53.jpg", title: "Through Glass", category: "Portrait", year: "2023" },
  { file: "54.jpg", title: "The Swimmers", category: "Documentary", year: "2022" },
  { file: "55.jpg", title: "Blue Hour Rest", category: "Street", year: "2023" },
  { file: "56.jpg", title: "Repose", category: "Fashion", year: "2024" },
  { file: "57.jpg", title: "Ember Sky", category: "Conceptual", year: "2023" },
  { file: "58.jpg", title: "Sundown", category: "Conceptual", year: "2024" },
  { file: "59.jpg", title: "Invocation", category: "Conceptual", year: "2023" },
  { file: "60.jpg", title: "Sun Hat", category: "Fashion", year: "2022" },
  { file: "61.jpg", title: "Palm Portrait", category: "Fashion", year: "2024" },
  { file: "62.jpg", title: "Joy", category: "Portrait", year: "2023" },
  { file: "aa.jpg", title: "Veiled", category: "Conceptual", year: "2024" },
  { file: "a_1.jpg", title: "Reverie", category: "Conceptual", year: "2024" },
  { file: "a_2.jpg", title: "Frequencies", category: "Portrait", year: "2023" },
  { file: "a_3.jpg", title: "Nightcap", category: "Lifestyle", year: "2024" },
  { file: "a_4.jpg", title: "The Bar", category: "Lifestyle", year: "2023" },
  { file: "a_5.jpg", title: "Neon Room", category: "Lifestyle", year: "2024" },
  { file: "a_6.jpg", title: "Haze", category: "Documentary", year: "2023" },
  { file: "a_7.jpg", title: "The Crowd", category: "Documentary", year: "2024" },
  { file: "a_8.jpg", title: "Red Passage", category: "Conceptual", year: "2023" },
];

export const gallery: GalleryItem[] = catalogue.map(({ file, title, category, year }) => ({
  id: file.replace(/\.(jpg|webp)$/i, ""),
  src: `/images/${file}`,
  title,
  category,
  year,
}));
