{/* UPGRADE CARD — NEW DESIGN MATCHING HOMEPAGE */}
<div
  style={{
    marginTop: "40px",
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
    Unlock unlimited signals, full history, and deeper reasoning breakdowns.
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
      cursor: "pointer",
      opacity: loadingUpgrade ? 0.6 : 1,
      border: "none",
    }}
  >
    {loadingUpgrade ? "Redirecting…" : "Upgrade to Pro →"}
  </button>
</div>
