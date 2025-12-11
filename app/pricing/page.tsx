"use client";

import React from "react";

export default function PricingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* HEADER */}
        <h1
          style={{
            fontSize: "2.6rem",
            fontWeight: 900,
            marginBottom: "12px",
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ color: "#ffffff" }}>Signal</span>
          <span style={{ color: "#22c55e" }}>Forge</span> Pro
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#d1d5db",
            marginBottom: "28px",
            lineHeight: 1.6,
          }}
        >
          Upgrade to unlock unlimited signals, full history,
          and deeper breakdowns.
        </p>

        {/* PRICING CARD */}
        <div
          style={{
            border: "1px solid #22c55e",
            padding: "32px",
            borderRadius: "16px",
            background: "#0a0a0a",
            marginBottom: "24px",
          }}
        >
          <p
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "16px",
              color: "#22c55e",
            }}
          >
            $29/month
          </p>

          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              marginBottom: "24px",
              color: "#d1d5db",
              fontSize: "1rem",
              lineHeight: 1.8,
            }}
          >
            <li>✔ Unlimited Signals</li>
            <li>✔ Full Decision History</li>
            <li>✔ Deeper Reasoning Breakdown</li>
            <li>✔ BUILD / WATCH / KILL Verdicts</li>
            <li>✔ Faster Scoring Engine</li>
          </ul>

          {/* 🔥 THIS IS THE FIX — ALWAYS POSTS TO STRIPE CHECKOUT */}
          <form action="/api/stripe/checkout" method="POST">
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#22c55e",
                color: "#000000",
                padding: "14px 24px",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "1.1rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Upgrade Now →
            </button>
          </form>
        </div>

        {/* BACK BUTTON */}
        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: "12px",
            fontSize: "0.95rem",
            color: "#9ca3af",
            textDecoration: "none",
          }}
        >
          ← Back to Home
        </a>
      </div>
    </main>
  );
}
