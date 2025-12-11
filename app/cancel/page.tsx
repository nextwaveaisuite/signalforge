export default function CancelPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-400 mb-4">Checkout Cancelled</h1>
        <p className="text-gray-300 mb-6">
          Your upgrade was cancelled. You can try again anytime.
        </p>

        <a
          href="/dashboard"
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Back to Dashboard →
        </a>
      </div>
    </main>
  );
}
