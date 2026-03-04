"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    question: "What exactly is Saju?",
    answer:
      "Saju (\uC0AC\uC8FC) means 'Four Pillars' in Korean. It's a traditional destiny analysis system that uses your birth year, month, day, and hour to map the cosmic energies present at your exact moment of birth. Unlike Western astrology which focuses primarily on your birth month, Saju creates a unique chart from all four time pillars \u2014 making it deeply personal to you.",
  },
  {
    question: "How is Sajumuse different from other online Saju sites?",
    answer:
      "Most online Saju services generate reports automatically using algorithms. At Sajumuse, every Premium Report is personally analyzed by a certified Saju master with 15+ years of experience and credentials in both Myeongri Psychology and Family Psychology. This means your reading captures nuances that automated systems miss. It's also why our reports reach 60+ pages.",
  },
  {
    question: "How accurate is a Saju reading?",
    answer:
      "Saju has been refined over centuries using the Manseryeok (\uB9CC\uC138\uB825), Korea's astronomical calendar system. While no system can predict the future with certainty, Saju provides remarkably detailed insights into personality patterns, relationship dynamics, career timing, and life cycles. Many clients are surprised by how precisely their reading reflects their actual experiences.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "You'll need your birth date (year, month, day), birth time (as exact as possible), and gender. If you don't know your exact birth time, we can still provide a reading based on your date alone \u2014 though having the time makes the analysis significantly more detailed.",
  },
  {
    question: "How long does the Premium Report take?",
    answer:
      "Premium Reports are delivered within 48 hours. Because each report is personally analyzed \u2014 not auto-generated \u2014 we take the time to thoroughly examine every aspect of your chart. The result is a 60+ page PDF covering personality, career, love, wealth, health, and your 10-year fortune cycle.",
  },
  {
    question: "Can I ask personal questions?",
    answer:
      "Yes. The Premium Report includes 3 personal questions. You can ask about career timing, relationship compatibility, health, or anything else you'd like deeper insight on.",
  },
  {
    question: "Is Saju the same as Chinese BaZi?",
    answer:
      "They share the same historical origin, but Korean masters have developed distinct interpretation methods refined over 500+ years. Korean Saju places particular emphasis on psychological patterns, relationship dynamics, and practical life guidance \u2014 making it especially relevant for modern decisions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2 sm:space-y-3">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-[#2A2A4A]/30 transition-colors"
                onClick={() => toggle(index)}
              >
                <span className="font-semibold text-base sm:text-lg pr-3 sm:pr-4">
                  {faq.question}
                </span>
                <span
                  className="text-[#7C3AED] text-xl flex-shrink-0 transition-transform duration-300"
                  style={{ transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-400 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
