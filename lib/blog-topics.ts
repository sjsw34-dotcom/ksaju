export type BlogCategory = "zodiac" | "education" | "love" | "career" | "kculture";

export interface BlogTopic {
  topic: string;
  category: BlogCategory;
}

export const BLOG_TOPICS: BlogTopic[] = [
  // zodiac
  {
    topic: "What Your Birth Year Reveals About Your Personality in Korean Saju",
    category: "zodiac",
  },
  {
    topic: "The Five Elements in Saju: Wood, Fire, Earth, Metal, and Water Personalities",
    category: "zodiac",
  },
  {
    topic: "Your Heavenly Stem Sign: What the 10 Stems Say About Who You Really Are",
    category: "zodiac",
  },

  // education
  {
    topic: "What Is Saju? A Beginner's Guide to Korean Four Pillars of Destiny",
    category: "education",
  },
  {
    topic: "The Four Pillars Explained: Year, Month, Day, and Hour in Saju",
    category: "education",
  },
  {
    topic: "Heavenly Stems and Earthly Branches: The Building Blocks of Korean Saju",
    category: "education",
  },

  // love
  {
    topic: "Saju Compatibility: Which Elements Make the Best Romantic Partners",
    category: "love",
  },
  {
    topic: "How Korean Saju Predicts Your Ideal Partner and Relationship Timing",
    category: "love",
  },
  {
    topic: "Love Luck Cycles in Saju: When Is Your Best Time for Romance",
    category: "love",
  },

  // career
  {
    topic: "Career Luck in Saju: How Your Birth Chart Reveals Your Professional Path",
    category: "career",
  },
  {
    topic: "The Best Careers for Each of the Five Elements in Korean Saju",
    category: "career",
  },
  {
    topic: "Wealth Luck Cycles in Saju: When Will Your Financial Fortune Peak",
    category: "career",
  },

  // kculture
  {
    topic: "Why Korean Gen Z Is Obsessed With Saju Fortune Telling",
    category: "kculture",
  },
  {
    topic: "Saju vs Western Astrology: What Makes Korean Fortune Telling Unique",
    category: "kculture",
  },
  {
    topic: "The History of Saju in Korea: From Royal Courts to Modern Apps",
    category: "kculture",
  },
];
