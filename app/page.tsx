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
        padding: "60px 24px",
      }}
    >
      <div style={{ maxWidth: "860px", width: "100%" }}>
        {/* HERO */}
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          SignalForge
        </h1>

        <p
          style={{
            fontSize: "1.3rem",
            opacity: 0.85,
            marginBottom: "2.5rem",
            lineHeight: 1.6,
          }}
        >
          SignalForge evaluates real pain signals and tells you whether to{" "}
          <span style={{ color: "#22c55e", fontWeight: "bold" }}>BUILD</span>,{" "}
          <span style={{ color: "#eab308", fontWeight: "bold" }}>WATCH</span>, or{" "}
          <span style={{ color: "#ef4444", fontWeight: "bold" }}>KILL</span>{" "}
          an idea — with clear reasoning.
        </p>

        {/* CTA BUTTONS */}
        <div style={{ marginBottom: "3.5rem" }}>
          <a
            href="/dashboard"
            style={{
              display: "inline-block",
              backgroundColor: "#22c55e",
              color: "#000",
              padding: "14px 28px",
              fontSize: "1.05rem",
              fontWeight: "bold",
              borderRadius: "8px",
              textDecoration: "none",
              marginRight: "16px",
            }}
          >
            Run Your First Signal →
          </a>

          <a
            href="/api/stripe/checkout"
            style={{
              display: "inline-block",
              border: "1px solid #22c55e",
              color: "#22c55e",
              padding: "14px 28px",
              fontSize: "1.05rem",
              fontWeight: "bold",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Upgrade to Pro →
          </a>
        </div>

        {/* PROBLEM STATEMENT */}
        <p
          style={{
            fontSize: "1.1rem",
            opacity: 0.8,
            marginBottom: "2.5rem",
            lineHeight: 1.6,
          }}
        >
          Founders don’t fail from lack of ideas.  
          <br />
          They fail by building ideas that feel good — but solve weak, rare,
          or non-urgent pain.
        </p>

        <p
          style={{
            fontSize: "1.15rem",
            marginBottom: "4rem",
            lineHeight: 1.6,
          }}
        >
          <strong>SignalForge removes guessing from the earliest decision.</strong>
        </p>

        {/* HOW IT WORKS */}
        <h2 style={{ marginBottom: "1.5rem" }}>
          How SignalForge works
        </h2>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginBottom: "4rem",
            lineHeight: 2,
            opacity: 0.9,
          }}
        >
          <li>➤ Ingest raw pain, frustration, or demand</li>
          <li>➤ Normalize and score the signal</li>
          <li>➤ Get a verdict with reasoning</li>
        </ul>

        {/* EXAMPLE */}
        <div
          style={{
            border: "1px solid #22c55e33",
            borderRadius: "10px",
            padding: "24px",
            marginBottom: "4rem",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Example Decision</h3>

          <p style={{ opacity: 0.85 }}>
            <strong>Raw:</strong><br />
            “I manually qualify leads every day and it’s slow and error-prone.”
          </p>

          <p style={{ marginTop: "1rem" }}>
            <strong>
              Result:{" "}
              <span style={{ color: "#22c55e" }}>
                BUILD — Score: 85
              </span>
            </strong>
          </p>

          <p style={{ opacity: 0.85 }}>
            <strong>Why:</strong><br />
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
            fontSize: "1.4rem",
            marginBottom: "1rem",
          }}
        >
          <strong>$29 / month — SignalForge Pro</strong>
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginBottom: "2rem",
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
            padding: "14px 32px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            textDecoration: "none",
            marginBottom: "2.5rem",
          }}
        >
          Upgrade to Pro →
        </a>

        <p style={{ opacity: 0.5, fontSize: "0.9rem" }}>
          Part of NextWave AI Suite · Secure payments via Stripe
        </p>
      </div>
    </main>
  );
}
