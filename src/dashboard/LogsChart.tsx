import { useEffect, useState } from 'react';
import { ref, query, limitToLast, onValue } from 'firebase/database';
import { db } from '../firebase';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Box } from '@mui/material';

interface Props { appName: string; level: string; }

export default function LogsChart({ appName, level }: Props) {
  const [data, setData] = useState<{ time: string; count: number; }[]>([]);

  useEffect(() => {
    const q = query(ref(db, `apps/${appName}/logs`), limitToLast(1000));
    const unsub = onValue(q, snap => {
      const buckets: Record<string, number> = {};
      snap.forEach(userSnap =>
        userSnap.forEach(sessSnap =>
          sessSnap.forEach(logSnap => {
            const v = logSnap.val();
            if (level !== 'ALL' && v.level !== level) return;
            const d = new Date(v.ts * 1000);
            const key = d.getHours() + ':' + d.getMinutes();
            buckets[key] = (buckets[key] || 0) + 1;
          })
        )
      );
      const chartData = Object.entries(buckets).map(([k, v]) => ({ time: k, count: v }));
      setData(chartData);
    });
    return () => unsub();
  }, [appName, level]);

  return (
    <Box sx={{ width: '100%', maxWidth: '1000px', mx: 'auto', mt: 3 }}>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#1976d2" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
