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

            {/* 🔥 FIXED — REMOVED href="/pricing" */}
            <a
              onClick={() => window.location.href = "/api/stripe/checkout"}
              style={{
                border: "1px solid #22c55e",
                color: "#22c55e",
                padding: "12px 24px",
                borderRadius: "999px",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "1.05rem",
                cursor: "pointer"
              }}
            >
              Upgrade to Pro →
            </a>
          </div>
        </header>

        {/* PROBLEM EXPLANATION */}
        <section style={{ marginBottom: "40px" }}>
          {/* ... UNCHANGED ... */}
        </section>

        {/* HOW IT WORKS */}
        <section style={{ marginBottom: "48px" }}>
          {/* ... UNCHANGED ... */}
        </section>

        {/* EXAMPLE RESULTS */}
        <section style={{ marginBottom: "48px" }}>
          {/* ... UNCHANGED ... */}
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

          {/* 🔥 FIXED — REMOVED /pricing */}
          <a
            onClick={() => window.location.href = "/api/stripe/checkout"}
            style={{
              backgroundColor: "#22c55e",
              color: "#000000",
              padding: "12px 24px",
              borderRadius: "999px",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1.05rem",
              cursor: "pointer"
            }}
          >
            Upgrade to Pro →
          </a>
        </section>

        <footer
          style={{
            marginTop: "24px",
            fontSize: "0.8rem",
            color: "#6b7280",
          }}
        >
          Part of <span style={{ color: "#ffffff" }}>NextWave AI Suite</span> · Secure payments via Stripe
        </footer>
      </div>
    </main>
  );
}
