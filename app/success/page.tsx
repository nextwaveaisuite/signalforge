export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-400 mb-4">Upgrade Successful!</h1>
        <p className="text-gray-300 mb-6">
          Your SignalForge Pro membership is now active.
        </p>

        <a
          href="/dashboard"
          className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-semibold"
        >
          Go to Dashboard →
        </a>
      </div>
    </main>
  );
}
