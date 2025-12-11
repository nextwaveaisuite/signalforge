"use client";
import Link from "next/link";

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
          maxWidth: "960px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            marginBottom: "20px",
            letterSpacing: "-0.04em",
          }}
        >
          SignalForge <span style={{ color: "#22c55e" }}>Pro</span>
        </h1>

        <p
          style={{
            color: "#d1d5db",
            fontSize: "1.2rem",
            marginBottom: "30px",
            lineHeight: 1.6,
          }}
        >
          Upgrade to unlock unlimited signals, full history, and deeper
          breakdowns.
        </p>

        {/* PRICING CARD */}
        <div
          style={{
            background: "#0a0a0a",
            border: "1px solid #1f2937",
            borderRadius: "16px",
            padding: "28px",
            maxWidth: "420px",
            margin: "0 auto 24px auto",
            textAlign: "left",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: "8px",
            }}
          >
            $29/month
          </h2>

          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              marginTop: "10px",
              marginBottom: "20px",
              color: "#d1d5db",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            <li>✔ Unlimited Signals</li>
            <li>✔ Full Decision History</li>
            <li>✔ Deeper Reasoning Breakdown</li>
            <li>✔ BUILD / WATCH / KILL Verdicts</li>
            <li>✔ Faster Scoring Engine</li>
          </ul>

          {/* Stripe Checkout */}
          <Link
            href="/api/stripe/checkout"
            style={{
              display: "block",
              backgroundColor: "#22c55e",
              color: "#000000",
              padding: "14px 24px",
              borderRadius: "999px",
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center",
              fontSize: "1.1rem",
            }}
          >
            Upgrade Now →
          </Link>
        </div>

        <Link
          href="/"
          style={{
            color: "#9ca3af",
            textDecoration: "none",
            fontSize: "0.95rem",
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
