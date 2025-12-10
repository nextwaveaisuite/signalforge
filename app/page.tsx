export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "900px", width: "100%" }}>
        {/* HERO */}
        <h1
          style={{
            fontSize: "3.8rem",
            fontWeight: 900,
            marginBottom: "1.2rem",
            letterSpacing: "-1px",
          }}
        >
          <span style={{ color: "#ffffff" }}>Signal</span>
          <span
            style={{
              color: "#22c55e",
              textShadow: "0 0 18px rgba(34,197,94,0.45)",
            }}
          >
            Forge
          </span>
        </h1>

        <p
          style={{
            fontSize: "1.35rem",
            opacity: 0.9,
            marginBottom: "3rem",
            lineHeight: 1.6,
          }}
        >
          SignalForge evaluates real pain signals and tells you whether to{" "}
          <strong style={{ color: "#22c55e" }}>BUILD</strong>,{" "}
          <strong style={{ color: "#eab308" }}>WATCH</strong>, or{" "}
          <strong style={{ color: "#ef4444" }}>KILL</strong>{" "}
          an idea — with clear reasoning.
        </p>

        {/* CTA */}
        <div style={{ marginBottom: "4rem" }}>
          <a
            href="/dashboard"
            style={{
              display: "inline-block",
              backgroundColor: "#22c55e",
              color: "#000",
              padding: "16px 32px",
              fontSize: "1.1rem",
              fontWeight: 800,
              borderRadius: "10px",
              textDecoration: "none",
              marginRight: "18px",
            }}
          >
            Run Your First Signal →
          </a>

          <a
            href="/api/stripe/checkout"
            style={{
              display: "inline-block",
              border: "2px solid #22c55e",
              color: "#22c55e",
              padding: "16px 32px",
              fontSize: "1.1rem",
              fontWeight: 800,
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Upgrade to Pro →
          </a>
        </div>

        {/* PROBLEM */}
        <p
          style={{
            fontSize: "1.15rem",
            opacity: 0.8,
            lineHeight: 1.7,
            marginBottom: "2.2rem",
          }}
        >
          Founders don’t fail from lack of ideas.
          <br />
          They fail by building ideas that feel good — but solve weak, rare,
          or non-urgent pain.
        </p>

        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 600,
            marginBottom: "4rem",
          }}
        >
          SignalForge removes guessing from the earliest decision.
        </p>

        {/* HOW IT WORKS */}
        <h2 style={{ marginBottom: "1.6rem" }}>How SignalForge works</h2>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginBottom: "4rem",
            lineHeight: 2,
            fontSize: "1.05rem",
            opacity: 0.9,
          }}
        >
          <li>➤ Ingest raw pain, frustration, or demand</li>
          <li>➤ Normalize and score the signal</li>
          <li>➤ Get a BUILD / WATCH / KILL verdict with reasoning</li>
        </ul>

        {/* EXAMPLE */}
        <div
          style={{
            border: "1px solid rgba(34,197,94,0.35)",
            borderRadius: "12px",
            padding: "28px",
            marginBottom: "4rem",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Example Decision</h3>

          <p style={{ opacity: 0.9 }}>
            <strong>Raw:</strong>
            <br />
            “I manually qualify leads every day and it’s slow and error-prone.”
          </p>

          <p style={{ marginTop: "1rem", fontWeight: 700 }}>
            Result:{" "}
            <span style={{ color: "#22c55e" }}>
              BUILD — Score: 85
            </span>
          </p>

          <p style={{ opacity: 0.9 }}>
            <strong>Why:</strong>
            <br />
            • Manual workflow<br />
            • High-frequency pain<br />
            • Automation-ready<br />
            • Commercial relevance
          </p>
        </div>

        {/* PRICING */}
        <h2 style={{ marginBottom: "1rem" }}>Pricing</h2>

        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            marginBottom: "1.2rem",
          }}
        >
          $29 / month — SignalForge Pro
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginBottom: "2.2rem",
            lineHeight: 2,
            opacity: 0.9,
          }}
        >
          <li>✔ Unlimited signals</li>
          <li>✔ Full decision history</li>
          <li>✔ Clear BUILD / WATCH / KILL verdicts</li>
        </ul>

        <a
          href="/api/stripe/checkout"
          style={{
            display: "inline-block",
            backgroundColor: "#22c55e",
            color: "#000",
            padding: "16px 36px",
            fontSize: "1.15rem",
            fontWeight: 900,
            borderRadius: "10px",
            textDecoration: "none",
            marginBottom: "3rem",
          }}
        >
          Upgrade to Pro →
        </a>

        <p style={{ opacity: 0.55, fontSize: "0.9rem" }}>
          Part of NextWave AI Suite · Secure payments via Stripe
        </p>
      </div>
    </main>
  );
}
