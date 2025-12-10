import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      backgroundColor: "#0b0b0b",
      color: "#ffffff",
      minHeight: "100vh",
      padding: "80px 24px",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* HERO */}
        <h1 style={{ fontSize: 52, lineHeight: 1.1 }}>
          Know what to build —
          <span style={{ color: "#00e676" }}> before you waste months.</span>
        </h1>

        <p style={{ fontSize: 20, marginTop: 20, opacity: 0.85 }}>
          SignalForge evaluates real pain signals and tells you whether to
          <strong> BUILD, WATCH, or KILL</strong> an idea — with clear reasoning.
        </p>

        <div style={{ marginTop: 40 }}>
          <Link href="/dashboard">
            <button style={{
              background: "#00e676",
              color: "#000",
              padding: "14px 24px",
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              marginRight: 16
            }}>
              Run Your First Signal →
            </button>
          </Link>

          <Link href="/upgrade" style={{ color: "#00e676", fontSize: 16 }}>
            Upgrade to Pro →
          </Link>
        </div>

        {/* PROBLEM */}
        <section style={{ marginTop: 100 }}>
          <h2 style={{ fontSize: 36 }}>Founders don’t fail from lack of ideas.</h2>
          <p style={{ fontSize: 18, marginTop: 16, opacity: 0.8 }}>
            They fail by building ideas that feel good — but solve weak, rare,
            or non-urgent pain.
          </p>
          <p style={{ fontSize: 18, marginTop: 16, opacity: 0.8 }}>
            SignalForge removes guessing from the earliest decision.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ marginTop: 100 }}>
          <h2 style={{ fontSize: 36 }}>How SignalForge works</h2>

          <ul style={{ marginTop: 24, fontSize: 18, lineHeight: 1.8 }}>
            <li>➤ Ingest raw pain, frustration, or demand</li>
            <li>➤ Normalize and score the signal</li>
            <li>➤ Get a verdict with reasoning</li>
          </ul>
        </section>

        {/* EXAMPLE */}
        <section style={{ marginTop: 100 }}>
          <h2 style={{ fontSize: 36 }}>Example Decision</h2>

          <pre style={{
            background: "#121212",
            padding: 24,
            borderRadius: 8,
            marginTop: 20,
            whiteSpace: "pre-wrap",
            fontSize: 16
          }}>
{`Raw:
“I manually qualify leads every day and it’s slow and error-prone.”

Result:
BUILD — Score: 85

Why:
• Manual workflow
• High-frequency pain
• Automation-ready
• Commercial relevance`}
          </pre>
        </section>

        {/* PRICING */}
        <section style={{ marginTop: 100 }}>
          <h2 style={{ fontSize: 36 }}>Pricing</h2>

          <p style={{ fontSize: 20, marginTop: 12 }}>
            <strong>$29/month</strong> — SignalForge Pro
          </p>

          <ul style={{ marginTop: 16, fontSize: 18, lineHeight: 1.8 }}>
            <li>✔ Unlimited signals</li>
            <li>✔ Full decision history</li>
            <li>✔ Clear BUILD / WATCH / KILL verdicts</li>
          </ul>

          <Link href="/upgrade">
            <button style={{
              marginTop: 32,
              background: "#00e676",
              color: "#000",
              padding: "14px 24px",
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 6,
              border: "none",
              cursor: "pointer"
            }}>
              Upgrade to Pro →
            </button>
          </Link>
        </section>

        {/* FOOTER */}
        <footer style={{
          marginTop: 120,
          paddingTop: 40,
          borderTop: "1px solid #222",
          fontSize: 14,
          opacity: 0.6
        }}>
          Part of <strong>NextWave AI Suite</strong> · Secure payments via Stripe
        </footer>

      </div>
    </main>
  );
}
