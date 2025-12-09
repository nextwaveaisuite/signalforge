import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <p>SignalForge MVP is live.</p>
      <Link href="/ingest">Ingest Signal</Link>
    </div>
  );
}