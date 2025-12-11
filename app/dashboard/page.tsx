"use client";

import { useState, useEffect } from "react";

// 🔥 Required so Vercel doesn’t cache old versions
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

  // 🔥 Always load fresh plan
  useEffect(() => {
    async function loadPlan() {
      try {
        const res = await fetch("/api/user/plan", {
          method: "GET",
          cache: "no-store",
        });
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

  // Same scoring logic
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

  // 🔥 Stripe checkout — guaranteed working
  async function handleUpgrade() {
    setLoadingUpgrade(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Bad checkout response:", await res.text());
        alert("Checkout failed. Try again.");
        return;
      }

      const data = await res.json();
      if (!data.url) {
        console.error("Stripe missing URL:", data);
        alert("Stripe did not return a redirect URL.");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Unable to start checkout.");
    } finally {
      setLoadingUpgrade(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 20px",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            marginBottom: "10px",
          }}
        >
          <span style={{ color: "#fff" }}>Signal</span>
          <span style={{ color: "#22c55e" }}>Forge</span> Dashboard
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "1.1rem" }}>
          Paste real pain. Get a BUILD / WATCH / KILL decision instantly.
        </p>
      </div>

      {/* INPUT CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "#0a0a0a",
          border: "1px solid #1f2937",
          borderRadius: "14px",
          padding: "28px",
          marginBottom: "40px",
        }}
      >
        <textarea
          style={{
            width: "100%",
            minHeight: "140px",
            background: "#000",
            border: "1px solid #333",
            borderRadius: "8px",
            padding: "16px",
            color: "#fff",
            fontSize: "1rem",
          }}
          placeholder="Describe the raw pain, frustration, or demand…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={limitReached}
          style={{
            marginTop: "16px",
            width: "100%",
            backgroundColor: "#22c55e",
            color: "#000",
            padding: "14px 20px",
            borderRadius: "999px",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: limitReached ? "not-allowed" : "pointer",
            opacity: limitReached ? 0.35 : 1,
            border: "none",
          }}
        >
          {limitReached
            ? "Limit Reached — Upgrade to Continue"
            : "Evaluate Signal →"}
        </button>
      </div>

      {/* LATEST RESULT */}
      {latest && (
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            background: "#0a0a0a",
            border: "1px solid #333",
            padding: "28px",
            borderRadius: "14px",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "14px",
            }}
          >
            Latest Result
          </h2>

          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <span
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color:
                  latest.verdict === "BUILD"
                    ? "#22c55e"
                    : latest.verdict === "WATCH"
                    ? "#facc15"
                    : "#ef4444",
              }}
            >
              {latest.verdict} — Score {latest.score}
            </span>
          </div>

          <p
            style={{
              textAlign: "center",
              color: "#9ca3af",
              fontStyle: "italic",
              marginBottom: "14px",
            }}
          >
            “{latest.raw}”
          </p>

          <ul
            style={{
              textAlign: "center",
              listStyle: "none",
              padding: 0,
              color: "#d1d5db",
              lineHeight: "1.7",
            }}
          >
            {latest.reason.map((r, i) => (
              <li key={i}>• {r}</li>
            ))}
          </ul>
        </div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <button
            onClick={() => setShowHistory(!showHistory)}
            style={{
              background: "none",
              color: "#9ca3af",
              border: "none",
              cursor: "pointer",
              marginBottom: "12px",
            }}
          >
            {showHistory ? "Hide History ▲" : "View History ▼"}
          </button>

          {showHistory &&
            history.slice(0, FREE_HISTORY_LIMIT).map((item, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #1f2937",
                  padding: "14px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  color: "#d1d5db",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    color:
                      item.verdict === "BUILD"
                        ? "#22c55e"
                        : item.verdict === "WATCH"
                        ? "#facc15"
                        : "#ef4444",
                  }}
                >
                  {item.verdict}
                </span>{" "}
                — Score {item.score}
              </div>
            ))}

          {history.length > FREE_HISTORY_LIMIT && plan === "free" && (
            <div
              style={{
                border: "1px dashed #444",
                padding: "20px",
                borderRadius: "12px",
                color: "#9ca3af",
              }}
            >
              <p style={{ marginBottom: "10px" }}>
                🔒 Unlock full decision history with SignalForge Pro
              </p>
              <button
                onClick={handleUpgrade}
                disabled={loadingUpgrade}
                style={{
                  background: "none",
                  color: "#22c55e",
                  textDecoration: "underline",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Upgrade to Pro →
              </button>
            </div>
          )}
        </div>
      )}

      {/* FINAL UPGRADE CARD — HOMEPAGE STYLE */}
      <div
        style={{
          marginTop: "20px",
          width: "100%",
          maxWidth: "700px",
          background: "#0f0f0f",
          border: "1px solid #22c55e55",
          borderRadius: "16px",
          padding: "32px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "1.8rem",
            fontWeight: 800,
            marginBottom: "12px",
            color: "#22c55e",
          }}
        >
          SignalForge Pro — $29/month
        </h3>

        <p
          style={{
            color: "#d1d5db",
            marginBottom: "20px",
            fontSize: "1rem",
            lineHeight: "1.6",
          }}
        >
          Unlock unlimited signals, full history, and deeper breakdowns.
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 28px 0",
            color: "#9ca3af",
            fontSize: "0.95rem",
            lineHeight: "1.7",
          }}
        >
          <li>✔ Unlimited Signals</li>
          <li>✔ Full Decision History</li>
          <li>✔ Deeper Reasoning</li>
          <li>✔ BUILD / WATCH / KILL Verdicts</li>
          <li>✔ Faster Scoring Engine</li>
        </ul>

        <button
          onClick={handleUpgrade}
          disabled={loadingUpgrade}
          style={{
            backgroundColor: "#22c55e",
            color: "#000",
            padding: "14px 32px",
            borderRadius: "999px",
            fontWeight: 700,
            fontSize: "1.05rem",
            cursor: loadingUpgrade ? "wait" : "pointer",
            opacity: loadingUpgrade ? 0.6 : 1,
            border: "none",
          }}
        >
          {loadingUpgrade ? "Redirecting…" : "Upgrade to Pro →"}
        </button>
      </div>
    </main>
  );
}
