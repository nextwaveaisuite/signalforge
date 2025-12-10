import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* HEADER */}
      <section className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          <span className="text-white">Signal</span>
          <span className="text-green-400">Forge</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Decide what to <span className="text-green-400 font-semibold">BUILD</span>,{" "}
          <span className="text-yellow-400 font-semibold">WATCH</span>, or{" "}
          <span className="text-red-400 font-semibold">KILL</span> — before you
          waste months building the wrong thing.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <Link
            href="/dashboard"
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 rounded-lg text-lg"
          >
            Run Your First Signal →
          </Link>

          <Link
            href="/pricing"
            className="border border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-semibold px-8 py-4 rounded-lg text-lg"
          >
            Upgrade to Pro →
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl text-center mb-20">
        <h2 className="text-3xl font-bold mb-10">How SignalForge Works</h2>

        <div className="grid md:grid-cols-3 gap-8 text-gray-300">
          <div className="border border-gray-800 rounded-xl p-6">
            ➤ Ingest raw pain, frustration, or demand
          </div>
          <div className="border border-gray-800 rounded-xl p-6">
            ➤ Normalize and score the signal
          </div>
          <div className="border border-gray-800 rounded-xl p-6">
            ➤ Get a verdict with clear reasoning
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section className="max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-center mb-12">
          Example Signal Results
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* BUILD */}
          <div className="border border-green-500 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Raw Signal</p>
            <p className="mb-4">
              “I manually qualify leads every day and it’s slow and error-prone.”
            </p>

            <h3 className="text-green-400 font-bold text-xl mb-3">
              BUILD — Score: 85
            </h3>

            <ul className="text-gray-300 space-y-1">
              <li>• Manual workflow</li>
              <li>• High-frequency pain</li>
              <li>• Automation-ready</li>
              <li>• Commercial relevance</li>
            </ul>
          </div>

          {/* WATCH */}
          <div className="border border-yellow-400 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Raw Signal</p>
            <p className="mb-4">
              “I wish Notion had better AI summaries for long meeting notes.”
            </p>

            <h3 className="text-yellow-400 font-bold text-xl mb-3">
              WATCH — Score: 62
            </h3>

            <ul className="text-gray-300 space-y-1">
              <li>• Real pain, low urgency</li>
              <li>• Existing solutions are “good enough”</li>
              <li>• Users tolerate the problem</li>
            </ul>
          </div>

          {/* KILL */}
          <div className="border border-red-500 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Raw Signal</p>
            <p className="mb-4">
              “It would be cool if there was an app that turns quotes into wallpapers.”
            </p>

            <h3 className="text-red-400 font-bold text-xl mb-3">
              KILL — Score: 18
            </h3>

            <ul className="text-gray-300 space-y-1">
              <li>• No urgency</li>
              <li>• Emotional want, not a need</li>
              <li>• Weak willingness to pay</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 text-center text-sm text-gray-500 pb-10">
        Part of <span className="text-white">NextWave AI Suite</span> · Secure
        payments via Stripe
      </footer>
    </main>
  );
}
