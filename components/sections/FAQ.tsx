"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    question: "What exactly is Saju?",
    answer:
      "Saju (사주) means 'Four Pillars' in Korean. It's a traditional East Asian system of fortune-telling based on your birth year, month, day, and hour. Each pillar corresponds to a Heavenly Stem and Earthly Branch, creating a unique cosmic map that reveals your personality, strengths, challenges, and life trajectory.",
  },
  {
    question: "How is Saju different from Western astrology?",
    answer:
      "Western astrology primarily focuses on your sun sign based on your birth month. Saju uses all four time dimensions of your birth (year, month, day, hour) plus a system of Five Elements (Wood, Fire, Earth, Metal, Water) and 60-year cycles. This makes it far more granular and personal than a typical horoscope.",
  },
  {
    question: "How accurate is a Saju reading?",
    answer:
      "Saju reflects tendencies, patterns, and energies — not fixed outcomes. Many people find it remarkably resonant with their personality and life experiences. Think of it as a detailed map of your natural strengths and challenges, rather than a literal prediction. Accuracy improves significantly when your exact birth time is known.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "You'll need: your full name, date of birth (year, month, day), time of birth (as precise as possible — even AM/PM helps), and gender. If you don't know your exact birth time, we can still provide a reading, though some aspects will be less precise.",
  },
  {
    question: "How long does the premium report take?",
    answer:
      "Premium reports are delivered within 24 hours to your email. Our master readers craft each report personally, drawing on decades of Saju expertise to give you deep, meaningful insight. Most reports are delivered within a few hours during business hours.",
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
