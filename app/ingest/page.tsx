"use client";

import { useState } from "react";

export default function IngestPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function runSignal() {
    setLoading(true);
    const res = await fetch("/api/signals/create", {
      method: "POST",
      body: JSON.stringify({ text: input }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => (window.location.href = "/")}
          className="text-sm mb-6 px-4 py-2 bg-[#1b2337] rounded-lg border border-[#2c3b55] hover:bg-[#131a2a] transition"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold mb-6">Run Your First Signal</h1>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe the offer, niche, or idea you want SignalForge to analyse..."
          className="w-full h-40 p-4 rounded-xl bg-[#111726] border border-[#202a40] text-white focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={runSignal}
          disabled={loading}
          className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition font-semibold"
        >
          {loading ? "Analysing..." : "Generate Signal"}
        </button>

        {result && (
          <div className="mt-10 bg-[#111726] p-6 rounded-xl border border-[#202a40]">
            <h2 className="text-2xl font-bold mb-4">Result</h2>
            <p className="text-gray-300 mb-3">{result.raw}</p>

            <div className="flex justify-between mt-3">
              <span className="text-blue-400 font-semibold">
                Verdict: {result.verdict}
              </span>
              <span className="text-green-400 font-semibold">
                Score: {result.score}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
        }
          
