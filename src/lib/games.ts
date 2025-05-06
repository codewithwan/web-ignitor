export interface Game {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  size: string;
  category: string;
  downloadUrl: string;
  screenshots?: string[];
  features?: string[];
  developer?: string;
  publisher?: string;
  releaseDate?: string;
  totalDownloads?: number;
  playTime?: string;
  players?: string;
  genre?: string;
  systemRequirements?: {
    minimum: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
    recommended: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
  };
}

export const games: Game[] = [
  {
    id: 1,
    title: "ASEAN Greetings",
    description:
      "An educational game that introduces you to basic greetings and phrases from ASEAN countries.",
    thumbnail: "/games/asean.png",
    size: "35 MB",
    category: "Educational",
    downloadUrl: "",
    screenshots: [
      "/games/asean.png",
      "/games/soccpong.png",
      "/games/pickandfeed.png",
    ],
    features: [
      "Learn greetings from 10 ASEAN countries",
      "Interactive pronunciation guide",
      "Cultural context for each greeting",
      "Progress tracking system",
      "Fun mini-games to practice",
    ],
    developer: "ASEAN Education Studio",
    publisher: "Ignitor Games",
    releaseDate: "2024-03-15",
    totalDownloads: 1250,
    playTime: "2-3 hours",
    players: "Single Player",
    genre: "Educational, Language Learning",
  },
  {
    id: 2,
    title: "SOCCPONG",
    description: "A simple and fun soccer game.",
    thumbnail: "/games/soccpong.png",
    size: "40 MB",
    category: "Sports",
    downloadUrl: "",
    screenshots: [
      "/games/asean.png",
      "/games/soccpong.png",
      "/games/pickandfeed.png",
    ],
    features: [
      "Fast-paced soccer gameplay",
      "Multiple game modes",
      "Customizable teams",
      "Local multiplayer support",
      "Simple controls",
    ],
    developer: "Sports Game Studio",
    publisher: "Ignitor Games",
    releaseDate: "2024-02-20",
    totalDownloads: 980,
    playTime: "1-2 hours",
    players: "1-2 Players",
    genre: "Sports, Arcade",
  },
  {
    id: 3,
    title: "Pick & Feed",
    description:
      "An educational game that teaches children to distinguish between healthy real food and unhealthy junk food through fun sorting activities.",
    thumbnail: "/games/pickandfeed.png",
    size: "42 MB",
    category: "Strategy",
    downloadUrl: "",
    screenshots: [
      "/games/asean.png",
      "/games/soccpong.png",
      "/games/pickandfeed.png",
    ],
    features: [
      "Educational food sorting gameplay",
      "Colorful and engaging graphics",
      "Progressive difficulty levels",
      "Nutrition facts learning",
      "Parent monitoring system",
    ],
    developer: "Educational Games Lab",
    publisher: "Ignitor Games",
    releaseDate: "2024-01-10",
    totalDownloads: 1560,
    playTime: "3-4 hours",
    players: "Single Player",
    genre: "Educational, Strategy",
  },
];

export const categories = [
  "All",
  "Racing",
  "RPG",
  "Strategy",
  "Survival",
  "Educational",
  "Sports",
];

// Helper functions
export const getGameById = (id: number): Game | undefined => {
  return games.find((game) => game.id === id);
};

export const getGamesByCategory = (category: string): Game[] => {
  if (category === "All") return games;
  return games.filter((game) => game.category === category);
};

export const searchGames = (searchTerm: string): Game[] => {
  const term = searchTerm.toLowerCase();
  return games.filter(
    (game) =>
      game.title.toLowerCase().includes(term) ||
      game.description.toLowerCase().includes(term)
  );
};
