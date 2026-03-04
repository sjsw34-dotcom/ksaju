export type BlogCategory = "zodiac" | "education" | "love" | "career" | "kculture";

export interface BlogTopic {
  topic: string;
  category: BlogCategory;
}

export const BLOG_TOPICS: BlogTopic[] = [
  // ── zodiac: birth year specific (20) ──
  { topic: "Saju reading for people born in 1986: Fire Tiger personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1987: Fire Rabbit personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1988: Earth Dragon personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1989: Earth Snake personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1990: Metal Horse personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1991: Metal Goat personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1992: Water Monkey personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1993: Water Rooster personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1994: Wood Dog personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1995: Wood Pig personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1996: Fire Rat personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1997: Fire Ox personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1998: Earth Tiger personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 1999: Earth Rabbit personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 2000: Metal Dragon personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 2001: Metal Snake personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 2002: Water Horse personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 2003: Water Goat personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 2004: Wood Monkey personality, love, and career fortune", category: "zodiac" },
  { topic: "Saju reading for people born in 2005: Wood Rooster personality, love, and career fortune", category: "zodiac" },

  // ── zodiac: element deep dives (5) ──
  { topic: "Wood element personality in Korean Saju: traits, strengths, weaknesses, and best matches", category: "zodiac" },
  { topic: "Fire element personality in Korean Saju: traits, strengths, weaknesses, and best matches", category: "zodiac" },
  { topic: "Earth element personality in Korean Saju: traits, strengths, weaknesses, and best matches", category: "zodiac" },
  { topic: "Metal element personality in Korean Saju: traits, strengths, weaknesses, and best matches", category: "zodiac" },
  { topic: "Water element personality in Korean Saju: traits, strengths, weaknesses, and best matches", category: "zodiac" },

  // ── love: element compatibility (10) ──
  { topic: "Wood and Fire compatibility in Korean Saju: love, friendship, and relationship dynamics", category: "love" },
  { topic: "Wood and Earth compatibility in Korean Saju: love, friendship, and relationship dynamics", category: "love" },
  { topic: "Wood and Metal compatibility in Korean Saju: love, friendship, and relationship dynamics", category: "love" },
  { topic: "Wood and Water compatibility in Korean Saju: love, friendship, and relationship dynamics", category: "love" },
  { topic: "Fire and Earth compatibility in Korean Saju: love, friendship, and relationship dynamics", category: "love" },
  { topic: "Fire and Metal compatibility in Korean Saju: love, friendship, and relationship dynamics", category: "love" },
  { topic: "Fire and Water compatibility in Korean Saju: love, friendship, and relationship dynamics", category: "love" },
  { topic: "Earth and Metal compatibility in Korean Saju: love, friendship, and relationship dynamics", category: "love" },
  { topic: "Earth and Water compatibility in Korean Saju: love, friendship, and relationship dynamics", category: "love" },
  { topic: "Metal and Water compatibility in Korean Saju: love, friendship, and relationship dynamics", category: "love" },

  // ── love: relationship questions (8) ──
  { topic: "When will I find love according to Korean Saju astrology: how your birth chart reveals romantic timing", category: "love" },
  { topic: "Why you keep attracting the wrong partner: a Korean Saju birth chart explanation", category: "love" },
  { topic: "Best age to get married according to Korean Saju: how Four Pillars predict marriage timing", category: "love" },
  { topic: "How to check relationship compatibility using Korean Saju birth charts", category: "love" },
  { topic: "Saju red flags in relationships: warning signs your birth chart reveals about your partner", category: "love" },
  { topic: "Twin flame vs soulmate in Korean Saju: what your birth chart says about destined connections", category: "love" },
  { topic: "How to recover from a breakup using Korean Saju: understanding why relationships end", category: "love" },
  { topic: "Long distance relationship advice from Korean Saju: what your birth chart says about timing and patience", category: "love" },

  // ── career: element-based (5) ──
  { topic: "Best careers for Wood element people in Korean Saju: ideal jobs, industries, and work style", category: "career" },
  { topic: "Best careers for Fire element people in Korean Saju: ideal jobs, industries, and work style", category: "career" },
  { topic: "Best careers for Earth element people in Korean Saju: ideal jobs, industries, and work style", category: "career" },
  { topic: "Best careers for Metal element people in Korean Saju: ideal jobs, industries, and work style", category: "career" },
  { topic: "Best careers for Water element people in Korean Saju: ideal jobs, industries, and work style", category: "career" },

  // ── career: timing and money (10) ──
  { topic: "Is 2026 a good year for career change according to Korean Saju astrology", category: "career" },
  { topic: "When will my financial luck improve: wealth timing cycles in Korean Saju", category: "career" },
  { topic: "Should I quit my job according to Korean Saju: how to read career transition timing", category: "career" },
  { topic: "Best year to start a business according to Korean Saju birth chart analysis", category: "career" },
  { topic: "Why money isn't flowing: wealth blocks in your Korean Saju birth chart explained", category: "career" },
  { topic: "Freelancer vs corporate job: what Korean Saju says about your ideal work style", category: "career" },
  { topic: "Best side hustles based on your Saju element: Korean astrology guide to extra income", category: "career" },
  { topic: "How Korean Saju predicts your peak earning years and financial fortune cycle", category: "career" },
  { topic: "Tech career luck in Korean Saju: what your birth chart says about working in technology", category: "career" },
  { topic: "Creative career path in Korean Saju: which elements thrive in art, design, and content creation", category: "career" },

  // ── education: beginner questions (10) ──
  { topic: "What is Saju: beginner's guide to Korean Four Pillars of Destiny astrology", category: "education" },
  { topic: "Saju vs Western astrology: key differences and why Korean fortune telling goes deeper", category: "education" },
  { topic: "Saju vs Chinese BaZi: what's the difference between Korean and Chinese Four Pillars", category: "education" },
  { topic: "How to read a Korean Saju chart: step by step guide for complete beginners", category: "education" },
  { topic: "What are the Four Pillars in Saju: year, month, day, and hour pillars explained", category: "education" },
  { topic: "Heavenly Stems and Earthly Branches explained: the building blocks of Korean Saju", category: "education" },
  { topic: "The 10 year fortune cycle in Korean Saju: what it is and why it matters for your life", category: "education" },
  { topic: "Why your birth time matters so much in Korean Saju astrology readings", category: "education" },
  { topic: "How accurate is Korean Saju astrology: what it can and cannot predict about your life", category: "education" },
  { topic: "What happens during a professional Korean Saju reading: what to expect and how to prepare", category: "education" },

  // ── education: deeper concepts (5) ──
  { topic: "The five elements in Korean Saju explained: Wood Fire Earth Metal Water and how they interact", category: "education" },
  { topic: "Yin and Yang energy in your Saju birth chart: how it shapes your personality and fortune", category: "education" },
  { topic: "Day Master in Korean Saju: what your day pillar reveals about your true self", category: "education" },
  { topic: "Understanding the Manseryeok: Korea's astronomical calendar behind Saju readings", category: "education" },
  { topic: "Common misconceptions about Korean Saju that even fans get wrong", category: "education" },

  // ── kculture (12) ──
  { topic: "Why Korean Gen Z is obsessed with Saju fortune telling: the trend explained", category: "kculture" },
  { topic: "Saju in K-dramas: how Korean TV shows reference Four Pillars of Destiny", category: "kculture" },
  { topic: "K-pop idols and Saju: what their birth charts might reveal about their personality", category: "kculture" },
  { topic: "Saju cafes in Seoul: the trending fortune telling experience taking over Korea", category: "kculture" },
  { topic: "How Korean companies use Saju in business: from hiring decisions to merger timing", category: "kculture" },
  { topic: "Korean matchmaking and Saju compatibility: how Korean couples check before marriage", category: "kculture" },
  { topic: "History of Saju in Korea: from royal court advisors to modern smartphone apps", category: "kculture" },
  { topic: "Saju on TikTok and Instagram: how Korean astrology went viral worldwide", category: "kculture" },
  { topic: "Korean Lunar New Year Saju tradition: why Koreans get annual fortune readings every year", category: "kculture" },
  { topic: "Why Saju is the best entry point into Korean culture for foreigners", category: "kculture" },
  { topic: "Famous Korean celebrities who publicly trust Saju readings for life decisions", category: "kculture" },
  { topic: "The global rise of Korean astrology: why the world is discovering Saju in 2026", category: "kculture" },
];
