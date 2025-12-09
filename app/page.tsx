import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>SignalForge MVP</h1>
      <p>SignalForge MVP is live.</p>

      <ul>
        <li><Link href="/ingest">Ingest Signal</Link></li>
        <li><Link href="/build-board">View Build Board</Link></li>
      </ul>
    </div>
  );
}
