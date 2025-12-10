export default function DashboardPage() {
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
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>
        <h1 style={{ marginBottom: "1rem" }}>SignalForge Dashboard</h1>

        <p style={{ opacity: 0.7, marginBottom: "2rem" }}>
          Paste a raw pain, frustration, or idea below.
          SignalForge will decide what to do with it.
        </p>

        {/* Signal Ingest (placeholder — your existing logic plugs here) */}
        <textarea
          placeholder="Describe the raw pain or frustration…"
          style={{
            width: "100%",
            minHeight: "120px",
            padding: "16px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "16px",
            fontSize: "1rem",
          }}
        />

        <button
          style={{
            backgroundColor: "#22c55e",
            color: "#000",
            padding: "14px 24px",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Evaluate Signal
        </button>

        {/* Results area */}
        <div
          style={{
            marginTop: "3rem",
            padding: "24px",
            border: "1px solid #22c55e33",
            borderRadius: "10px",
            opacity: 0.6,
          }}
        >
          <p>
            Results will appear here once your evaluation logic runs.
          </p>
        </div>
      </div>
    </main>
  );
}
