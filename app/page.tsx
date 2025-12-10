import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-6 pt-24">
      {/* HERO */}
      <section className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <span className="text-white">Signal</span>
          <span className="text-green-400">Forge</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          SignalForge analyzes <span className="text-white font-semibold">real pain signals</span> from founders,
          operators, and customers — then tells you whether an idea is worth
          pursuing <span className="text-green-400 font-semibold">before</span> you waste months building it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link
            href="/dashboard"
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 rounded-lg text-lg transition"
          >
            Run Your First Signal →
          </Link>

          <Link
            href="/pricing"
            className="border border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-semibold px-8 py-4 rounded-lg text-lg transition"
          >
            Upgrade to Pro →
          </Link>
        </div>
      </section>

      {/* PROBLEM EXPLANATION */}
      <section className="max-w-4xl text-center mb-20">
        <p className="text-lg text-gray-400 leading-relaxed">
          Founders don’t fail from lack of ideas.
          <br />
          They fail by building ideas that <em>feel exciting</em> —
          but solve weak, rare, or non-urgent problems.
        </p>

        <p className="mt-4 text-lg text-gray-300">
          SignalForge removes guesswork at the <span className="text-white font-semibold">earliest decision point</span>.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl w-full text-center mb-24">
        <h2 className="text-3xl font-bold mb-12">How SignalForge Works</h2>

        <div className="grid md:grid-cols-3 gap-8 text-gray-300">
          <div className="border border-gray-800 rounded-xl p-6 text-center">
            <p className="text-white font-semibold mb-2">1. Submit a Signal</p>
            <p>
              Paste raw pain, frustration, demand, or opportunity exactly as you hear it —
              no polishing needed.
            </p>
          </div>

          <div className="border border-gray-800 rounded-xl p-6 text-center">
            <p className="text-white font-semibold mb-2">2. System Analysis</p>
            <p>
              SignalForge normalizes the input, detects patterns,
              and scores urgency, frequency, and monetizability.
            </p>
          </div>

          <div className="border border-gray-800 rounded-xl p-6 text-center">
            <p className="text-white font-semibold mb-2">3. Clear Verdict</p>
            <p>
              You receive a BUILD, WATCH, or KILL decision with
              transparent reasoning — not vague AI advice.
            </p>
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section className="max-w-6xl w-full mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Example Signal Results
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* BUILD */}
          <div className="border border-green-500 rounded-xl p-6">
            <p className="text-xs text-gray-400 mb-2 uppercase">Raw Signal</p>
            <p className="mb-5 text-gray-200">
              “I manually qualify leads every day and it’s slow and error-prone.”
            </p>

            <p className="text-green-400 font-bold text-xl mb-3">
              BUILD — Score: 85
            </p>

            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Pain occurs frequently</li>
              <li>• Clear manual process = automation-ready</li>
              <li>• Strong willingness to pay</li>
              <li>• Obvious commercial use-case</li>
            </ul>
          </div>

          {/* WATCH */}
          <div className="border border-yellow-400 rounded-xl p-6">
            <p className="text-xs text-gray-400 mb-2 uppercase">Raw Signal</p>
            <p className="mb-5 text-gray-200">
              “I wish Notion had better AI summaries for long meeting notes.”
            </p>

            <p className="text-yellow-400 font-bold text-xl mb-3">
              WATCH — Score: 62
            </p>

            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Legitimate pain</li>
              <li>• Low urgency</li>
              <li>• Users tolerate existing tools</li>
              <li>• Monitor, don’t build yet</li>
            </ul>
          </div>

          {/* KILL */}
          <div className="border border-red-500 rounded-xl p-6">
            <p className="text-xs text-gray-400 mb-2 uppercase">Raw Signal</p>
            <p className="mb-5 text-gray-200">
              “It would be cool if there was an app that turns quotes into wallpapers.”
            </p>

            <p className="text-red-400 font-bold text-xl mb-3">
              KILL — Score: 18
            </p>

            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• No urgency</li>
              <li>• Emotional novelty only</li>
              <li>• Weak demand repetition</li>
              <li>• Extremely low willingness to pay</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="text-center mb-24">
        <p className="text-2xl font-bold mb-2">$29/month — SignalForge Pro</p>
        <ul className="text-gray-300 space-y-1">
          <li>✔ Unlimited signals</li>
          <li>✔ Full decision history</li>
          <li>✔ Clear BUILD / WATCH / KILL logic</li>
        </ul>

        <Link
          href="/pricing"
          className="inline-block mt-6 bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 rounded-lg transition"
        >
          Upgrade to Pro →
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-xs text-gray-500 pb-10">
        Part of <span className="text-white">NextWave AI Suite</span> · Secure payments via Stripe
      </footer>
    </main>
  );
}
