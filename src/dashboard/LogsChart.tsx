import { useEffect, useState } from 'react';
import { ref, query, limitToLast, onValue } from 'firebase/database';
import { db } from '../firebase';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';


interface Props {
  appName: string;
  level: 'ALL' | 'DEBUG' | 'INFO' | 'ERROR';
}

/** Helper to turn a { key: count } map into the [{ name, value }] Recharts expects */
const toPieData = (counts: Record<string, number>) =>
  Object.entries(counts).map(([name, value]) => ({ name, value }));

/** Simple colour palette – tweak / extend as you like */
const COLORS = [
  '#1976d2', // blue
  '#9c27b0', // purple
  '#ff9800', // orange
  '#4caf50', // green
  '#e91e63', // pink
  '#795548', // brown
  '#03a9f4', // light-blue
  '#ffeb3b', // yellow
];

export default function LogsChart({ appName, level }: Props) {
  const [typeData, setTypeData] = useState<Array<{ name: string; value: number }>>([]);
  const [userData, setUserData] = useState<Array<{ name: string; value: number }>>([]);
  const [levelData, setLevelData] = useState<Array<{ name: string; value: number }>>([]);

  useEffect(() => {
    const q = query(ref(db, `apps/${appName}/logs`), limitToLast(2000));
    const unsub = onValue(q, (snap) => {
      const byTag: Record<string, number> = {};
      const byUser: Record<string, number> = {};
      const byLevel: Record<string, number> = {};
  
      snap.forEach((userSnap) => {
        const userId = userSnap.key ?? 'Unknown User';
  
        userSnap.forEach((sessSnap) => {
          sessSnap.forEach((logSnap) => {
            const v = logSnap.val();
            if (level !== 'ALL' && v.level !== level) return;
  
            // Count by tag
            if (v.tag) byTag[v.tag] = (byTag[v.tag] || 0) + 1;
  
            // Count by userId (from the outer key)
            byUser[userId] = (byUser[userId] || 0) + 1;
  
            // Count by level
            if (v.level) byLevel[v.level] = (byLevel[v.level] || 0) + 1;
          });
        });
      });
  
      setTypeData(toPieData(byTag));
      setUserData(toPieData(byUser));
      setLevelData(toPieData(byLevel));
    });
  
    return () => unsub();
  }, [appName, level]);
  
  

  /** Renders a single labelled pie-chart */
  const PieSection = ({
    title,
    data,
  }: {
    title: string;
    data: Array<{ name: string; value: number }>;
  }) => (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', mt: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '30%' } }}>
          <PieSection title="Logs by Type" data={typeData} />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '30%' } }}>
          <PieSection title="Logs by User ID" data={userData} />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '30%' } }}>
          <PieSection title="Logs by Level" data={levelData} />
        </Box>
      </Box>
    </Box>
  );
  
}
