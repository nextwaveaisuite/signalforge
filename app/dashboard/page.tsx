"use client";

import { useState } from "react";

type Result = {
  verdict: "BUILD" | "WATCH" | "KILL";
  score: number;
  reason: string[];
  raw: string;
};

export default function DashboardPage() {
  const [input, setInput] = useState("");
  const [latest, setLatest] = useState<Result | null>(null);
  const [history, setHistory] = useState<Result[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // TEMP deterministic scoring (frontend UX only)
  function evaluateSignal(text: string) {
    const lower = text.toLowerCase();

    if (lower.includes("manual") || lower.includes("slow")) {
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
      } as Result;
    }

    if (lower.includes("wish") || lower.includes("nice")) {
      return {
        verdict: "WATCH",
        score: 60,
        raw: text,
        reason: [
          "Real pain but low urgency",
          "Alternatives exist",
          "Users tolerate the problem",
        ],
      } as Result;
    }

    return {
      verdict: "KILL",
      score: 20,
      raw: text,
      reason: [
        "Weak urgency",
        "Emotional want, not a need",
        "Low willingness to pay",
      ],
    } as Result;
  }

  function handleSubmit() {
    if (!input.trim()) return;

    const result = evaluateSignal(input);
    setLatest(result);
    setHistory([result, ...history]);
    setInput("");
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-16">
      {/* HEADER */}
      <div className="text-center mb-10 max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-3">
          <span className="text-white">Signal</span>
          <span className="text-green-400">Forge</span>
        </h1>
        <p className="text-gray-400">
          Paste real pain. Get a clear decision.
        </p>
      </div>

      {/* INPUT CARD */}
      <div className="w-full max-w-3xl bg-[#0c0c0c] border border-gray-800 rounded-xl p-6 mb-10">
        <textarea
          className="w-full min-h-[120px] bg-black border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-400"
          placeholder="Describe the raw pain, frustration, or demand…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg"
        >
          Evaluate Signal →
        </button>
      </div>

      {/* LATEST RESULT */}
      {latest && (
        <div className="w-full max-w-3xl border border-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-center">
            Latest Result
          </h2>

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

          <p className="text-gray-400 text-sm mb-4 italic text-center">
            “{latest.raw}”
          </p>

          <ul className="text-gray-300 space-y-1 text-center">
            {latest.reason.map((r, i) => (
              <li key={i}>• {r}</li>
            ))}
          </ul>
        </div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div className="max-w-3xl w-full text-center">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-400 text-sm hover:text-green-400 mb-3"
          >
            {showHistory ? "Hide History ▲" : "View History ▼"}
          </button>

          {showHistory && (
            <div className="space-y-3">
              {history.slice(1).map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-800 rounded-lg p-4 text-sm"
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
            </div>
          )}
        </div>
      )}

      {/* EMPTY STATE */}
      {!latest && (
        <p className="text-gray-500 text-sm mt-10 text-center">
          Strong products start with repeated pain.<br />
          Paste something you’ve heard more than once.
        </p>
      )}
    </main>
  );
}
