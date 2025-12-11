"use client";

import { useState, useEffect } from "react";

// 🔥 Prevent Vercel from caching old versions of this page
export const dynamic = "force-dynamic";

type Result = {
  verdict: "BUILD" | "WATCH" | "KILL";
  score: number;
  reason: string[];
  raw: string;
};

const FREE_HISTORY_LIMIT = 3;

export default function DashboardPage() {
  const [input, setInput] = useState("");
  const [latest, setLatest] = useState<Result | null>(null);
  const [history, setHistory] = useState<Result[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingUpgrade, setLoadingUpgrade] = useState(false);
  const [plan, setPlan] = useState<"free" | "pro">("free");

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

  const limitReached =
    plan === "free" && history.length >= FREE_HISTORY_LIMIT;

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
      };
    }

    if (t.includes("wish") || t.includes("better")) {
      return {
        verdict: "WATCH",
        score: 60,
        raw: text,
        reason: ["Real pain", "Low urgency", "Existing solutions acceptable"],
      };
    }

    return {
      verdict: "KILL",
      score: 20,
      raw: text,
      reason: [
        "Weak urgency",
        "No clear buyer intent",
        "Low willingness to pay",
      ],
    };
  }

  function handleSubmit() {
    if (limitReached) return;
    if (!input.trim()) return;

    const result = evaluateSignal(input);
    setLatest(result);
    setHistory([result, ...history]);
    setInput("");
  }

  // 🔥 FIXED CHECKOUT HANDLER
  async function handleUpgrade() {
    setLoadingUpgrade(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        cache: "no-store",
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      console.error("Stripe response:", data);
      alert("Checkout failed: Invalid response.");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Unable to start checkout. Please try again.");
    } finally {
      setLoadingUpgrade(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-16">

      {/* HEADER */}
      <div className="text-center mb-10 max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-2">
          <span className="text-white">Signal</span>
          <span className="text-green-400">Forge</span> Dashboard
        </h1>
        <p className="text-gray-400">
          Paste real pain. Get a clear BUILD / WATCH / KILL decision.
        </p>
      </div>

      {/* INPUT */}
      <div className="w-full max-w-3xl bg-[#0c0c0c] border border-gray-800 rounded-xl p-6 mb-10">
        <textarea
          className="w-full min-h-[120px] bg-black border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-400"
          placeholder="Describe the raw pain, frustration, or demand…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={limitReached}
          className={`mt-4 w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg ${
            limitReached ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          {limitReached
            ? "Limit Reached — Upgrade to Continue"
            : "Evaluate Signal →"}
        </button>
      </div>

      {/* LATEST RESULT */}
      {latest && (
        <div className="w-full max-w-3xl border border-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-center mb-3">Latest Result</h2>

          <div className="text-center mb-4">
            <span
              className={`text-2xl font-extrabold ${
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

          <p className="text-gray-400 italic text-center mb-4">
            “{latest.raw}”
          </p>

          <ul className="text-gray-300 text-center space-y-1">
            {latest.reason.map((r, i) => (
              <li key={i}>• {r}</li>
            ))}
          </ul>
        </div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div className="max-w-3xl w-full text-center mb-16">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-gray-400 hover:text-green-400 mb-4"
          >
            {showHistory ? "Hide History ▲" : "View History ▼"}
          </button>

          {showHistory && (
            <>
              {history
                .slice(0, FREE_HISTORY_LIMIT)
                .map((item, i) => (
                  <div
                    key={i}
                    className="border border-gray-800 rounded-lg p-4 text-sm mb-3"
                  >
                    <span
                      className={`font-semibold ${
                        item.verdict === "BUILD"
                          ? "text-green-400"
                          : item.verdict === "WATCH"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.verdict}
                    </span>{" "}
                    — Score {item.score}
                  </div>
                ))}

              {history.length > FREE_HISTORY_LIMIT && plan === "free" && (
                <div className="border border-dashed border-gray-700 rounded-lg p-5 text-gray-400">
                  <p className="mb-2">
                    🔒 Unlock full decision history with SignalForge Pro
                  </p>
                  <button
                    onClick={handleUpgrade}
                    disabled={loadingUpgrade}
                    className="text-green-400 hover:underline font-semibold"
                  >
                    Upgrade to Pro →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* UPGRADE CARD */}
      <div className="max-w-3xl w-full border border-green-500 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-3 text-green-400">
          SignalForge Pro — $29/month
        </h3>
        <ul className="text-gray-300 mb-6 space-y-1">
          <li>✔ Unlimited signals</li>
          <li>✔ Full decision history</li>
          <li>✔ Clear BUILD / WATCH / KILL results</li>
        </ul>
        <button
          onClick={handleUpgrade}
          disabled={loadingUpgrade}
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-lg disabled:opacity-60"
        >
          {loadingUpgrade ? "Redirecting…" : "Upgrade to Pro →"}
        </button>
      </div>
    </main>
  );
}
