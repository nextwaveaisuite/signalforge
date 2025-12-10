 import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SignalForge — Decide What to Build Before You Waste Months",
  description:
    "SignalForge evaluates real pain signals and tells you whether to BUILD, WATCH, or KILL an idea — with clear justification.",
};

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0f0e",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "880px",
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        {/* HEADER */}
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          <span style={{ color: "#ffffff" }}>Signal</span>
          <span style={{ color: "#22c55e" }}>Forge</span>
        </h1>

        {/* SUBHEAD */}
        <p
          style={{
            fontSize: "1.4rem",
            marginBottom: "32px",
            color: "#d1d5db",
          }}
        >
          Decide what to <strong>BUILD</strong>, <strong>WATCH</strong>, or{" "}
          <strong>KILL</strong> — before you waste months building the wrong
          thing.
        </p>

        {/* PRIMARY CTA */}
        <div style={{ marginBottom: "24px" }}>
          <Link
            href="/dashboard"
            style={{
              background: "#22c55e",
              color: "#0b0f0e",
              padding: "14px 28px",
              fontSize: "1.1rem",
              fontWeight: 700,
              borderRadius: "10px",
              textDecoration: "none",
              display: "inline-block",
              marginRight: "12px",
            }}
          >
            Run Your First Signal →
          </Link>

          <Link
            href="/upgrade"
            style={{
              color: "#22c55e",
              fontSize: "1.1rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Upgrade to Pro →
          </Link>
        </div>

        {/* EXPLANATION */}
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "#9ca3af",
            marginTop: "40px",
          }}
        >
          Founders don’t fail from lack of ideas.  
          They fail by building ideas that *feel good* — but solve weak, rare, or
          non-urgent pain.
        </p>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "#9ca3af",
            marginTop: "12px",
          }}
        >
          SignalForge removes guessing from the earliest decision.
        </p>

        {/* HOW IT WORKS */}
        <div style={{ marginTop: "48px" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              marginBottom: "16px",
              color: "#ffffff",
            }}
          >
            How SignalForge Works
          </h2>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              color: "#d1d5db",
              fontSize: "1rem",
              lineHeight: 1.8,
            }}
          >
            <li>➤ Ingest raw pain, frustration, or demand</li>
            <li>➤ Normalize and score the signal</li>
            <li>➤ Get a verdict with clear reasoning</li>
          </ul>
        </div>

        {/* EXAMPLE */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px",
            border: "1px solid #1f2937",
            borderRadius: "12px",
            background: "#020617",
          }}
        >
          <h3 style={{ marginBottom: "12px", color: "#ffffff" }}>
            Example Signal Result
          </h3>

          <p style={{ color: "#9ca3af" }}>
            <strong>Raw:</strong> “I manually qualify leads every day and it’s
            slow and error-prone.”
          </p>

          <p style={{ marginTop: "12px", color: "#22c55e", fontWeight: 700 }}>
            BUILD — Score: 85
          </p>

          <p style={{ color: "#9ca3af", marginTop: "8px" }}>
            • Manual workflow <br />
            • High-frequency pain <br />
            • Automation-ready <br />
            • Commercial relevance
          </p>
        </div>

        {/* PRICING */}
        <div style={{ marginTop: "48px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700 }}>
            $29/month — SignalForge Pro
          </h2>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginTop: "16px",
              color: "#d1d5db",
              lineHeight: 1.8,
            }}
          >
            <li>✔ Unlimited signals</li>
            <li>✔ Full decision history</li>
            <li>✔ Clear BUILD / WATCH / KILL verdicts</li>
          </ul>

          <div style={{ marginTop: "24px" }}>
            <Link
              href="/upgrade"
              style={{
                background: "#22c55e",
                color: "#0b0f0e",
                padding: "14px 28px",
                fontWeight: 700,
                borderRadius: "10px",
                textDecoration: "none",
              }}
            >
              Upgrade to Pro →
            </Link>
          </div>

          <p
            style={{
              marginTop: "20px",
              fontSize: "0.9rem",
              color: "#6b7280",
            }}
          >
            Part of NextWave AI Suite · Secure payments via Stripe
          </p>
        </div>
      </div>
    </main>
  );
}
