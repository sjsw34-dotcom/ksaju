"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormValues {
  name: string;
  gender: string;
  year: string;
  month: string;
  day: string;
  hour: string;
}

function getDaysInMonth(year: string, month: string): number {
  if (!year || !month) return 31;
  return new Date(Number(year), Number(month), 0).getDate();
}

function getHourLabel(hour: string): string {
  if (hour === "unknown") return "I don't know";
  const h = Number(hour);
  if (h === 0) return "0:00 (Midnight)";
  if (h === 12) return "12:00 (Noon)";
  return `${String(h).padStart(2, "0")}:00`;
}

export function ReadingForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>({
    name: "",
    gender: "",
    year: "",
    month: "",
    day: "",
    hour: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1939 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const maxDay = getDaysInMonth(values.year, values.month);
  const days = Array.from({ length: maxDay }, (_, i) => i + 1);
  const hours = ["unknown", ...Array.from({ length: 24 }, (_, i) => String(i))];

  const handleMonthChange = (month: string) => {
    const max = getDaysInMonth(values.year, month);
    const newDay = Number(values.day) > max ? "" : values.day;
    setValues((v) => ({ ...v, month, day: newDay }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!values.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (values.name.trim().length > 100) {
      newErrors.name = "Name must be 100 characters or fewer.";
    }
    if (!values.gender) newErrors.gender = "Please select a gender.";
    if (!values.year) newErrors.year = "Please select a year.";
    if (!values.month) newErrors.month = "Please select a month.";
    if (!values.day) {
      newErrors.day = "Please select a day.";
    } else if (Number(values.day) > getDaysInMonth(values.year, values.month)) {
      newErrors.day = "Invalid day for selected month.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const params = new URLSearchParams({
      name: values.name.trim(),
      gender: values.gender,
      year: values.year,
      month: values.month,
      day: values.day,
      hour: values.hour || "unknown",
    });
    router.push(`/free-reading/result?${params.toString()}`);
  };

  const inputClass = (field: string) =>
    `w-full bg-white border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#7C3AED] transition-colors ${
      errors[field] ? "border-red-500" : "border-gray-200"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8 space-y-6"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Your name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className={inputClass("name")}
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          value={values.gender}
          onChange={(e) => setValues((v) => ({ ...v, gender: e.target.value }))}
          className={inputClass("gender")}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
      </div>

      {/* Year + Hour */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Birth Year
          </label>
          <select
            value={values.year}
            onChange={(e) => setValues((v) => ({ ...v, year: e.target.value }))}
            className={inputClass("year")}
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
          {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Birth Hour <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <select
            value={values.hour}
            onChange={(e) => setValues((v) => ({ ...v, hour: e.target.value }))}
            className={inputClass("hour")}
          >
            <option value="">Select time (optional)</option>
            {hours.map((h) => (
              <option key={h} value={h}>
                {getHourLabel(h)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Month + Day */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Birth Month
          </label>
          <select
            value={values.month}
            onChange={(e) => handleMonthChange(e.target.value)}
            className={inputClass("month")}
          >
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m} value={String(m)}>
                {m}
              </option>
            ))}
          </select>
          {errors.month && <p className="text-red-400 text-sm mt-1">{errors.month}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Birth Day
          </label>
          <select
            value={values.day}
            onChange={(e) => setValues((v) => ({ ...v, day: e.target.value }))}
            className={inputClass("day")}
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={String(d)}>
                {d}
              </option>
            ))}
          </select>
          {errors.day && <p className="text-red-400 text-sm mt-1">{errors.day}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-full font-bold text-lg transition-colors mt-2"
      >
        Reveal My Destiny ✦
      </button>
    </form>
  );
}
