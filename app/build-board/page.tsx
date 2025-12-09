async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + '/api/build-board', { cache: 'no-store' });
  return res.json();
}
export default async function BuildBoard() {
  const data = await getData();
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
}