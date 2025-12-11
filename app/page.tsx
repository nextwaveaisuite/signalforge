"use client";   // ✅ REQUIRED FIX — prevents build failure

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
      <section
        style={{
          maxWidth: "900px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "900",
            marginBottom: "20px",
            letterSpacing: "-1px",
          }}
        >
          <span style={{ color: "#ffffff" }}>Signal</span>
          <span style={{ color: "#22c55e" }}>Forge</span>
        </h1>

        <p
          style={{
            color: "#aaa",
            fontSize: "18px",
            marginBottom: "40px",
          }}
        >
          Paste real pain. Get a clear BUILD / WATCH / KILL decision instantly.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "60px",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              padding: "14px 28px",
              backgroundColor: "#22c55e",
              color: "black",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Launch Dashboard →
          </Link>

          <Link
            href="/dashboard"
            style={{
              padding: "14px 28px",
              backgroundColor: "#111",
              border: "1px solid #333",
              color: "#fff",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Try Free →
          </Link>
        </div>

        {/* Features Section */}
        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          }}
        >
          {/* Feature 1 */}
          <div
            style={{
              backgroundColor: "#0a0a0a",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #222",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>
              AI-Powered Signal Evaluation
            </h3>
            <p style={{ color: "#999" }}>
              Drop in customer pain points and instantly see if they’re worth building.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            style={{
              backgroundColor: "#0a0a0a",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #222",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>
              Instant BUILD / WATCH / KILL Verdicts
            </h3>
            <p style={{ color: "#999" }}>
              Get a clear sequence score with reasoning and buyer intent evaluation.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            style={{
              backgroundColor: "#0a0a0a",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #222",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>
              Upgrade for Unlimited Signals
            </h3>
            <p style={{ color: "#999" }}>
              Free users get 3 evaluations. Pro unlocks unlimited signals + history.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
