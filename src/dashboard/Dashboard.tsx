import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LogsTable from './LogsTable';
import LogsChart from './LogsChart';

interface Props { appName: string; onLogout: () => void; }

export default function Dashboard({ appName, onLogout }: Props) {
  const [levelFilter, setLevel] = useState<'ALL'|'INFO'|'DEBUG'|'ERROR'>('ALL');

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>{appName} logs</Typography>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <LogsChart appName={appName} level={levelFilter}/>
      <LogsTable  appName={appName} level={levelFilter} onFilterChange={setLevel}/>
    </>
  );
}
