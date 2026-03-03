"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NOTIFICATIONS = [
  { name: "Emma S.", city: "New York", action: "just ordered a Premium Report" },
  { name: "Mia K.", city: "Toronto", action: "just got their free reading" },
  { name: "Yuki T.", city: "Tokyo", action: "just ordered a Premium Report" },
  { name: "Lucas B.", city: "Paris", action: "just ordered a Premium Report" },
  { name: "Sofia R.", city: "Madrid", action: "just got their free reading" },
  { name: "Aiden L.", city: "Sydney", action: "just ordered a Premium Report" },
  { name: "Chloe M.", city: "Singapore", action: "just ordered a Premium Report" },
  { name: "Noah W.", city: "Berlin", action: "just got their free reading" },
  { name: "Hana J.", city: "Seoul", action: "just ordered a Premium Report" },
  { name: "Isabelle F.", city: "Montreal", action: "just ordered a Premium Report" },
  { name: "Ethan C.", city: "Los Angeles", action: "just got their free reading" },
  { name: "Rina O.", city: "Osaka", action: "just ordered a Premium Report" },
  { name: "Jake P.", city: "London", action: "just ordered a Premium Report" },
  { name: "Zoe N.", city: "Amsterdam", action: "just got their free reading" },
  { name: "Leo A.", city: "São Paulo", action: "just ordered a Premium Report" },
  { name: "Nora H.", city: "Dublin", action: "just ordered a Premium Report" },
  { name: "Kai M.", city: "Auckland", action: "just got their free reading" },
  { name: "Aria V.", city: "Stockholm", action: "just ordered a Premium Report" },
  { name: "James T.", city: "Chicago", action: "just ordered a Premium Report" },
  { name: "Luna G.", city: "Barcelona", action: "just got their free reading" },
];

// Avatar background colors matched to site palette
const AVATAR_COLORS = [
  "#7C3AED", "#6D28D9", "#5B21B6",
  "#9333EA", "#7E22CE", "#F59E0B",
  "#D97706", "#B45309",
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2);
}

function getAgoText() {
  const mins = Math.floor(Math.random() * 8) + 1;
  return mins === 1 ? "just now" : `${mins} min ago`;
}

interface ToastItem {
  id: number;
  name: string;
  city: string;
  action: string;
  ago: string;
  avatarColor: string;
}

export default function LiveOrderToast() {
  const [current, setCurrent] = useState<ToastItem | null>(null);
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);

  const showNext = useCallback(() => {
    setUsedIndexes((prev) => {
      // Reset when all used
      const pool = prev.length >= NOTIFICATIONS.length ? [] : prev;
      const available = NOTIFICATIONS.map((_, i) => i).filter((i) => !pool.includes(i));
      const idx = available[Math.floor(Math.random() * available.length)];
      const notif = NOTIFICATIONS[idx];

      setCurrent({
        id: Date.now(),
        name: notif.name,
        city: notif.city,
        action: notif.action,
        ago: getAgoText(),
        avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      });

      return [...pool, idx];
    });
  }, []);

  useEffect(() => {
    // First notification after 6s
    const first = setTimeout(showNext, 6000);

    // Subsequent notifications every 12–20s
    let interval: ReturnType<typeof setInterval>;
    const startInterval = () => {
      interval = setInterval(() => {
        const delay = 12000 + Math.random() * 8000;
        setTimeout(showNext, delay);
      }, 20000);
    };

    const firstStart = setTimeout(startInterval, 6000);

    return () => {
      clearTimeout(first);
      clearTimeout(firstStart);
      clearInterval(interval);
    };
  }, [showNext]);

  // Auto-dismiss after 5s
  useEffect(() => {
    if (!current) return;
    const timer = setTimeout(() => setCurrent(null), 5000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="fixed bottom-5 left-4 z-50 pointer-events-none">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-3 bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl px-4 py-3 shadow-xl max-w-[280px] sm:max-w-[300px]"
          >
            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ backgroundColor: current.avatarColor }}
            >
              {getInitials(current.name)}
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold leading-tight truncate">
                {current.name}{" "}
                <span className="text-gray-400 font-normal">from {current.city}</span>
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{current.action}</p>
              <p className="text-[#F59E0B] text-xs mt-0.5 font-medium">{current.ago}</p>
            </div>

            {/* Live dot */}
            <div className="shrink-0 ml-auto pl-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
