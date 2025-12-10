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
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "720px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
          Decide what to build  
          <br />
          <span style={{ color: "#22c55e" }}>
            before you waste months building the wrong thing
          </span>
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: 1.6,
            opacity: 0.85,
            marginBottom: "2.5rem",
          }}
        >
          SignalForge captures raw founder pain, scores it,  
          and tells you whether to <strong>BUILD</strong>,{" "}
          <strong>WATCH</strong>, or <strong>KILL</strong> the idea —
          with a visible reasoning trail.
        </p>

        <a
          href="/dashboard"
          style={{
            display: "inline-block",
            backgroundColor: "#22c55e",
            color: "#000",
            padding: "16px 32px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Use SignalForge
        </a>
      </div>
    </main>
  );
}
