"use client";

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    const res = await fetch("/api/signals/history");
    const data = await res.json();
    setSignals(data.signals || []);
    setLoading(false);
  }

  async function deleteSignal(id: string) {
    await fetch("/api/signals/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    loadHistory();
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white px-6 py-12">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-10">
        <button
          onClick={() => (window.location.href = "/")}
          className="text-sm mb-6 px-4 py-2 bg-[#1b2337] rounded-lg border border-[#2c3b55] hover:bg-[#131a2a] transition"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold mb-4">Your Signal History</h1>
        <p className="text-gray-400">
          Review your previous signal requests, scores, and outcomes.
        </p>
      </div>

      {/* HISTORY */}
      <div className="max-w-4xl mx-auto space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : signals.length === 0 ? (
          <p className="text-gray-400">No history yet.</p>
        ) : (
          signals.map((s: any) => (
            <div
              key={s.id}
              className="bg-[#111726] border border-[#202a40] p-5 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-400">{s.created_at}</span>
                <button
                  onClick={() => deleteSignal(s.id)}
                  className="text-red-400 text-sm hover:text-red-600"
                >
                  Delete
                </button>
              </div>

              <p className="font-medium text-lg mb-2">{s.raw}</p>

              <div className="flex justify-between mt-3">
                <span className="text-blue-400 font-semibold">
                  Verdict: {s.verdict}
                </span>
                <span className="text-green-400 font-semibold">
                  Score: {s.score}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
