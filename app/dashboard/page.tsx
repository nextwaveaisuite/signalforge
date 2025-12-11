"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Result = {
  verdict: "BUILD" | "WATCH" | "KILL";
  score: number;
  reason: string[];
  raw: string;
  id: string;
  timestamp: number;
};

const FREE_HISTORY_LIMIT = 3;

export default function DashboardPage() {
  const [input, setInput] = useState("");
  const [latest, setLatest] = useState<Result | null>(null);
  const [history, setHistory] = useState<Result[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingUpgrade, setLoadingUpgrade] = useState(false);

  const [plan, setPlan] = useState<"free" | "pro">("free");

  // -------------------------------------------
  // Load Plan
  // -------------------------------------------
  useEffect(() => {
    async function loadPlan() {
      try {
        const res = await fetch("/api/user/plan", { cache: "no-store" });
        const data = await res.json();
        setPlan(data.plan || "free");
      } catch {
        setPlan("free");
      }
    }
    loadPlan();
  }, []);

  // -------------------------------------------
  // Load History
  // -------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem("signalforge-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("signalforge-history", JSON.stringify(history));
  }, [history]);

  const limitReached = plan === "free" && history.length >= FREE_HISTORY_LIMIT;

  // -------------------------------------------
  // Evaluator Logic
  // -------------------------------------------
  function evaluateSignal(text: string): Result {
    const t = text.toLowerCase();

    if (t.includes("manual") || t.includes("slow")) {
      return {
        verdict: "BUILD",
        score: 85,
        raw: text,
        reason: [
          "Manual workflow",
          "High-frequency pain",
          "Automation-ready",
          "Commercial relevance",
        ],
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
    }

    if (t.includes("wish") || t.includes("better")) {
      return {
        verdict: "WATCH",
        score: 60,
        raw: text,
        reason: ["Real pain", "Low urgency", "Existing solutions acceptable"],
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
    }

    return {
      verdict: "KILL",
      score: 20,
      raw: text,
      reason: ["Weak urgency", "No clear buyer intent", "Low willingness to pay"],
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
  }

  function handleSubmit() {
    if (!input.trim()) return;
    if (limitReached) return;

    const result = evaluateSignal(input);
    setLatest(result);
    setHistory([result, ...history]);
    setInput("");
  }

  // -------------------------------------------
  // Delete Entry
  // -------------------------------------------
  function deleteEntry(id: string) {
    setHistory(history.filter((item) => item.id !== id));
  }

  // -------------------------------------------
  // Handle Upgrade
  // -------------------------------------------
  async function handleUpgrade() {
    setLoadingUpgrade(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoadingUpgrade(false);
    }
  }

  // -------------------------------------------
  // UI OUTPUT
  // -------------------------------------------
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 flex flex-col items-center">

      {/* BACK BUTTON */}
      <div className="w-full max-w-3xl mb-8">
        <Link 
          href="/"
          className="text-gray-400 hover:text-green-400 transition text-sm"
        >
          ← Back to Home
        </Link>
      </div>

      {/* HEADER */}
      <div className="text-center mb-10 max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-3">
          <span className="text-white">Signal</span>
          <span className="text-green-400">Forge</span> Evaluator
        </h1>
        <p className="text-gray-400 text-lg">
          Paste any pain point and receive an instant BUILD / WATCH / KILL verdict.
        </p>
      </div>

      {/* INPUT CARD */}
      <div className="w-full max-w-3xl bg-[#0c0c0c] border border-gray-800 rounded-xl p-6 mb-10 shadow-xl">
        <textarea
          className="w-full min-h-[140px] bg-black border border-gray-700 rounded-lg p-4 text-white text-lg focus:outline-none focus:border-green-400"
          placeholder="Describe the pain, frustration, or demand…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={limitReached}
          className={`mt-4 w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 text-lg rounded-lg transition ${
            limitReached ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          {limitReached ? "Limit reached — Upgrade for unlimited signals" : "Evaluate Signal →"}
        </button>
      </div>

      {/* LATEST RESULT */}
      {latest && (
        <div className="w-full max-w-3xl border border-gray-800 bg-[#0c0c0c] rounded-xl p-6 mb-10 shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-4 text-green-400">Latest Result</h2>

          <div className="text-center mb-4">
            <span
              className={`text-3xl font-extrabold ${
                latest.verdict === "BUILD"
                  ? "text-green-400"
                  : latest.verdict === "WATCH"
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {latest.verdict} — Score {latest.score}
            </span>
          </div>

          <p className="text-gray-400 italic text-center mb-4 text-lg">
            “{latest.raw}”
          </p>

          <ul className="text-gray-300 text-center space-y-1 text-lg">
            {latest.reason.map((r, i) => (
              <li key={i}>• {r}</li>
            ))}
          </ul>
        </div>
      )}

      {/* HISTORY VIEW */}
      {history.length > 0 && (
        <div className="max-w-3xl w-full text-center mb-16">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-gray-400 hover:text-green-400 transition mb-4"
          >
            {showHistory ? "Hide History ▲" : "View History ▼"}
          </button>

          {showHistory && (
            <div className="space-y-4 mt-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-800 bg-[#0c0c0c] rounded-lg p-5 shadow-md text-left relative"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`font-bold ${
                        item.verdict === "BUILD"
                          ? "text-green-400"
                          : item.verdict === "WATCH"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.verdict} — Score {item.score}
                    </span>

                    <button
                      onClick={() => deleteEntry(item.id)}
                      className="text-red-400 hover:text-red-500 text-xs underline"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="text-gray-400 italic mb-2">“{item.raw}”</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PRO UPGRADE CARD */}
      <div className="max-w-3xl w-full border border-green-500 rounded-xl p-8 text-center bg-[#0c0c0c] shadow-xl">
        <h3 className="text-2xl font-bold mb-4 text-green-400">SignalForge Pro — $29/month</h3>
        <ul className="text-gray-300 mb-6 text-lg space-y-1">
          <li>✔ Unlimited signals</li>
          <li>✔ Full decision history</li>
          <li>✔ Deep breakdowns</li>
        </ul>

        <button
          onClick={handleUpgrade}
          disabled={loadingUpgrade}
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-lg text-lg transition disabled:opacity-60"
        >
          {loadingUpgrade ? "Redirecting…" : "Upgrade to Pro →"}
        </button>
      </div>
    </main>
  );
}
