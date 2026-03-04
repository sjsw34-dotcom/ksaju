export type BlogCategory = "zodiac" | "education" | "love" | "career" | "kculture";

export interface BlogTopic {
  topic: string;
  category: BlogCategory;
}

export const BLOG_TOPICS: BlogTopic[] = [
  // ── zodiac (15) ──
  { topic: "What Your Birth Year Reveals About Your Personality in Korean Saju", category: "zodiac" },
  { topic: "The Five Elements in Saju: Wood, Fire, Earth, Metal, and Water Personalities", category: "zodiac" },
  { topic: "Your Heavenly Stem Sign: What the 10 Stems Say About Who You Really Are", category: "zodiac" },
  { topic: "The 12 Earthly Branches in Saju: Your Animal Sign and What It Really Means", category: "zodiac" },
  { topic: "Yin and Yang Energy in Your Saju Chart: How It Shapes Your Life", category: "zodiac" },
  { topic: "What Your Day Pillar Reveals About Your True Self in Korean Saju", category: "zodiac" },
  { topic: "Born in the Year of the Dragon: What Saju Says About 2000 and 2012 Babies", category: "zodiac" },
  { topic: "Fire Element Personalities in Saju: Passion, Power, and Pitfalls", category: "zodiac" },
  { topic: "Water Element in Saju: Why Water Signs Are the Most Emotionally Intelligent", category: "zodiac" },
  { topic: "Metal Element Personalities: The Hidden Strength in Your Saju Chart", category: "zodiac" },
  { topic: "Wood Element in Saju: Growth, Creativity, and Your Life Path", category: "zodiac" },
  { topic: "Earth Element Personalities in Saju: Stability, Trust, and Grounding Energy", category: "zodiac" },
  { topic: "What Your Birth Month Reveals in Korean Saju Astrology", category: "zodiac" },
  { topic: "Night vs Morning Birth in Saju: How Your Birth Hour Changes Everything", category: "zodiac" },
  { topic: "The Rarest Saju Charts: What Makes Some Birth Combinations Unique", category: "zodiac" },

  // ── education (15) ──
  { topic: "What Is Saju? A Beginner's Guide to Korean Four Pillars of Destiny", category: "education" },
  { topic: "The Four Pillars Explained: Year, Month, Day, and Hour in Saju", category: "education" },
  { topic: "Heavenly Stems and Earthly Branches: The Building Blocks of Korean Saju", category: "education" },
  { topic: "How to Read a Saju Chart: A Step-by-Step Guide for Beginners", category: "education" },
  { topic: "The 10-Year Fortune Cycle in Saju: What It Is and Why It Matters", category: "education" },
  { topic: "Saju vs Horoscope: Why Korean Astrology Goes Deeper Than Your Zodiac Sign", category: "education" },
  { topic: "Understanding the Manseryeok: Korea's 10,000-Year Astronomical Calendar", category: "education" },
  { topic: "What Is a Saju Master? Credentials, Training, and What to Expect", category: "education" },
  { topic: "The Role of Seasons in Saju: How Nature's Cycles Shape Your Destiny", category: "education" },
  { topic: "Common Misconceptions About Saju That Even Fans Get Wrong", category: "education" },
  { topic: "How Korean Families Use Saju for Naming, Marriage, and Major Decisions", category: "education" },
  { topic: "The Science Behind Saju: Why Modern Koreans Still Trust Ancient Wisdom", category: "education" },
  { topic: "Saju Terminology Decoded: A Glossary for English Speakers", category: "education" },
  { topic: "What Happens During a Professional Saju Reading: Behind the Scenes", category: "education" },
  { topic: "Why Your Birth Time Matters So Much in Korean Saju Analysis", category: "education" },

  // ── love (15) ──
  { topic: "Saju Compatibility: Which Elements Make the Best Romantic Partners", category: "love" },
  { topic: "How Korean Saju Predicts Your Ideal Partner and Relationship Timing", category: "love" },
  { topic: "Love Luck Cycles in Saju: When Is Your Best Time for Romance", category: "love" },
  { topic: "Why You Keep Attracting the Wrong Partners: A Saju Perspective", category: "love" },
  { topic: "Saju Marriage Compatibility: What Korean Couples Check Before Saying Yes", category: "love" },
  { topic: "The Best and Worst Element Pairings for Love in Korean Saju", category: "love" },
  { topic: "How Your Day Pillar Reveals Your Love Language in Saju", category: "love" },
  { topic: "Long-Distance Love and Saju: What Your Chart Says About Timing", category: "love" },
  { topic: "Saju Red Flags in Relationships: Patterns Your Chart Warns You About", category: "love" },
  { topic: "When Will I Find Love? How Saju Predicts Your Romantic Timeline", category: "love" },
  { topic: "Friendship Compatibility in Saju: Why Some Bonds Are Destiny", category: "love" },
  { topic: "Breakup Recovery Through Saju: Understanding Why It Ended", category: "love" },
  { topic: "Saju for Situationships: What Your Chart Says About Undefined Relationships", category: "love" },
  { topic: "Twin Flame vs Soulmate in Korean Saju: Are They Written in Your Chart?", category: "love" },
  { topic: "How to Use Saju Insights to Improve Your Current Relationship", category: "love" },

  // ── career (15) ──
  { topic: "Career Luck in Saju: How Your Birth Chart Reveals Your Professional Path", category: "career" },
  { topic: "The Best Careers for Each of the Five Elements in Korean Saju", category: "career" },
  { topic: "Wealth Luck Cycles in Saju: When Will Your Financial Fortune Peak", category: "career" },
  { topic: "Should You Quit Your Job? What Saju Says About Career Transitions", category: "career" },
  { topic: "Entrepreneurship and Saju: Is Starting a Business in Your Chart?", category: "career" },
  { topic: "Saju for Side Hustles: Finding Your Best Money-Making Element", category: "career" },
  { topic: "The Best Year to Change Careers According to Your Saju Chart", category: "career" },
  { topic: "Leadership Styles in Saju: What Element Makes the Best Boss", category: "career" },
  { topic: "Creative Careers and Saju: Which Elements Thrive in Art and Design", category: "career" },
  { topic: "Tech Careers and Saju: What Your Chart Says About Working in Tech", category: "career" },
  { topic: "Money Blocks in Your Saju Chart: Why Wealth Isn't Flowing Yet", category: "career" },
  { topic: "Saju Timing for Investments: When Your Chart Says to Take Financial Risks", category: "career" },
  { topic: "Work-Life Balance in Saju: What Your Chart Says About Rest and Productivity", category: "career" },
  { topic: "Freelancer vs Corporate: What Saju Reveals About Your Ideal Work Style", category: "career" },
  { topic: "Networking and Saju: Why Some People Are Naturally Connected", category: "career" },

  // ── kculture (15) ──
  { topic: "Why Korean Gen Z Is Obsessed With Saju Fortune Telling", category: "kculture" },
  { topic: "Saju vs Western Astrology: What Makes Korean Fortune Telling Unique", category: "kculture" },
  { topic: "The History of Saju in Korea: From Royal Courts to Modern Apps", category: "kculture" },
  { topic: "Saju in K-Dramas: How Korean Shows Reference Four Pillars of Destiny", category: "kculture" },
  { topic: "K-Pop Idols and Saju: What Their Birth Charts Might Reveal", category: "kculture" },
  { topic: "How Saju Shapes Korean Business Culture: From Hiring to Mergers", category: "kculture" },
  { topic: "Saju Cafes in Seoul: The Trending Experience Taking Over Korea", category: "kculture" },
  { topic: "Korean New Year and Saju: Why Koreans Get Annual Readings Every Lunar New Year", category: "kculture" },
  { topic: "The Global Rise of Korean Astrology: Why the World Is Discovering Saju", category: "kculture" },
  { topic: "Saju and Korean Beauty Standards: How Birth Elements Influence Self-Care", category: "kculture" },
  { topic: "Famous Korean Figures Who Swear by Saju Readings", category: "kculture" },
  { topic: "How Korean Matchmaking Services Use Saju for Compatibility", category: "kculture" },
  { topic: "Saju on TikTok: How Korean Astrology Went Viral Worldwide", category: "kculture" },
  { topic: "Korean Superstitions and Saju: What They Share and How They Differ", category: "kculture" },
  { topic: "Why Saju Is the Perfect Entry Point Into Korean Culture for Foreigners", category: "kculture" },
];
