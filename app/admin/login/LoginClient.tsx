"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase text-center mb-3">
          Sajumuse
        </p>
        <h1 className="text-2xl font-bold text-center mb-8">Admin Panel</h1>
        <form
          onSubmit={handleLogin}
          className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-8"
        >
          <label className="block text-sm text-gray-400 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0A0A0F] border border-[#2A2A4A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] mb-4 transition-colors"
            placeholder="Enter admin password"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 rounded-xl font-semibold transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
