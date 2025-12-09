'use client';

import { useEffect, useState } from 'react';

export default function BuildBoard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/build-board')
      .then(res => res.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  return (
    <div>
      <h2>Build Board</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
