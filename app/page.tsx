"use client";  // ← ONLY ADDITION. REQUIRED FIX.

import Link from "next/link";

export default function HomePage() {
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
        {/* HERO */}
        <header style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "3.2rem",
              fontWeight: 900,
              marginBottom: "16px",
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ color: "#ffffff" }}>Signal</span>
            <span style={{ color: "#22c55e" }}>Forge</span>
          </h1>

          <p
            style={{
              fontSize: "1.25rem",
              color: "#d1d5db",
              lineHeight: 1.6,
              marginBottom: "24px",
            }}
          >
            Decide what to{" "}
            <span style={{ color: "#22c55e", fontWeight: 600 }}>BUILD</span>,{" "}
            <span style={{ color: "#facc15", fontWeight: 600 }}>WATCH</span> or{" "}
            <span style={{ color: "#f87171", fontWeight: 600 }}>KILL</span> — before you waste months building the wrong thing.
          </p>

          <p
            style={{
              fontSize: "1rem",
              color: "#9ca3af",
              lineHeight: 1.6,
              marginBottom: "28px",
            }}
          >
            Paste in real pains, frustrations, or demands. SignalForge scores
            them and gives you a clear verdict with reasoning — so you stop
            guessing and start building what actually matters.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <Link
              href="/dashboard"
              style={{
                backgroundColor: "#22c55e",
                color: "#000000",
                padding: "12px 24px",
                borderRadius: "999px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1.05rem",
              }}
            >
              Run Your First Signal →
            </Link>

            <Link
              href="/pricing"
              style={{
                border: "1px solid #22c55e",
                color: "#22c55e",
                padding: "12px 24px",
                borderRadius: "999px",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "1.05rem",
              }}
            >
              Upgrade to Pro →
            </Link>
          </div>
        </header>

        {/* PROBLEM EXPLANATION */}
        <section style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#e5e7eb",
              lineHeight: 1.7,
              marginBottom: "12px",
            }}
          >
            Founders don’t fail from lack of ideas. They fail by building ideas
            that <em>feel exciting</em> — but solve weak, rare, or non-urgent
            problems.
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#9ca3af",
              lineHeight: 1.7,
            }}
          >
            SignalForge removes guesswork at the earliest decision point:{" "}
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              is this signal strong enough to build around?
            </span>
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            How SignalForge Works
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                border: "1px solid #1f2937",
                borderRadius: "12px",
                padding: "16px",
                background: "#020617",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "#ffffff",
                }}
              >
                1. Ingest raw pain
              </p>
              <p style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>
                Paste what you’re hearing from customers, leads, or your own
                workflow. No polishing. No rewriting. Just raw signals.
              </p>
            </div>

            <div
              style={{
                border: "1px solid #1f2937",
                borderRadius: "12px",
                padding: "16px",
                background: "#020617",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "#ffffff",
                }}
              >
                2. SignalForge scores it
              </p>
              <p style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>
                We normalize the signal and score it on{" "}
                <strong>urgency, frequency, monetization,</strong> and{" "}
                <strong>automation fit</strong>.
              </p>
            </div>

            <div
              style={{
                border: "1px solid #1f2937",
                borderRadius: "12px",
                padding: "16px",
                background: "#020617",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "#ffffff",
                }}
              >
                3. Read the verdict
              </p>
              <p style={{ color: "#e5e7eb", fontSize: "0.95rem" }}>
                You get a <strong>BUILD / WATCH / KILL</strong> verdict, a
                numeric score, and a short explanation so you know{" "}
                <em>why</em>, not just what.
              </p>
            </div>
          </div>
        </section>

        {/* EXAMPLE RESULTS */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            Example Signal Results
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
              textAlign: "left",
            }}
          >
            {/* BUILD */}
            <div
              style={{
                border: "1px solid #16a34a",
                borderRadius: "12px",
                padding: "16px",
                background: "#022c22",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  color: "#bbf7d0",
                  marginBottom: "6px",
                }}
              >
                Raw Signal
              </p>
              <p style={{ color: "#e5e7eb", marginBottom: "10px" }}>
                “I manually qualify leads every day and it’s slow and
                error-prone.”
              </p>
              <p
                style={{
                  color: "#4ade80",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  marginBottom: "8px",
                }}
              >
                BUILD — Score: 85
              </p>
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: 0,
                  margin: 0,
                  color: "#d1fae5",
                  fontSize: "0.95rem",
                }}
              >
                <li>• High-frequency, repetitive pain</li>
                <li>• Clear manual workflow → automation</li>
                <li>• Direct impact on revenue</li>
                <li>• Strong willingness to pay</li>
              </ul>
            </div>

            {/* WATCH */}
            <div
              style={{
                border: "1px solid #facc15",
                borderRadius: "12px",
                padding: "16px",
                background: "#171717",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  color: "#fef9c3",
                  marginBottom: "6px",
                }}
              >
                Raw Signal
              </p>
              <p style={{ color: "#e5e7eb", marginBottom: "10px" }}>
                “I wish Notion had better AI summaries for long meeting notes.”
              </p>
              <p
                style={{
                  color: "#fde047",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  marginBottom: "8px",
                }}
              >
                WATCH — Score: 62
              </p>
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: 0,
                  margin: 0,
                  color: "#fef9c3",
                  fontSize: "0.95rem",
                }}
              >
                <li>• Real pain, but low urgency</li>
                <li>• Existing tools are “good enough”</li>
                <li>• Users tolerate delay or friction</li>
                <li>• Monitor signal, don’t build yet</li>
              </ul>
            </div>

            {/* KILL */}
            <div
              style={{
                border: "1px solid #f97373",
                borderRadius: "12px",
                padding: "16px",
                background: "#19111a",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  color: "#fecaca",
                  marginBottom: "6px",
                }}
              >
                Raw Signal
              </p>
              <p style={{ color: "#e5e7eb", marginBottom: "10px" }}>
                “It would be cool if there was an app that turns quotes into
                wallpapers.”
              </p>
              <p
                style={{
                  color: "#fca5a5",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  marginBottom: "8px",
                }}
              >
                KILL — Score: 18
              </p>
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: 0,
                  margin: 0,
                  color: "#fecaca",
                  fontSize: "0.95rem",
                }}
              >
                <li>• Novelty, not a real problem</li>
                <li>• No urgency or consequence</li>
                <li>• Extremely low willingness to pay</li>
                <li>• Easy to ignore without impact</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{ marginBottom: "32px" }}>
          <p
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            $29/month — SignalForge Pro
          </p>
          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              margin: 0,
              color: "#d1d5db",
              fontSize: "0.95rem",
              marginBottom: "16px",
            }}
          >
            <li>✔ Unlimited signals</li>
            <li>✔ Full decision history</li>
            <li>✔ Clear BUILD / WATCH / KILL verdicts</li>
          </ul>
          <Link
            href="/pricing"
            style={{
              backgroundColor: "#22c55e",
              color: "#000000",
              padding: "12px 24px",
              borderRadius: "999px",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1.05rem",
            }}
          >
            Upgrade to Pro →
          </Link>
        </section>

        <footer
          style={{
            marginTop: "24px",
            fontSize: "0.8rem",
            color: "#6b7280",
          }}
        >
          Part of <span style={{ color: "#ffffff" }}>NextWave AI Suite</span> ·
          Secure payments via Stripe
        </footer>
      </div>
    </main>
  );
}
