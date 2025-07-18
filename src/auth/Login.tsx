// src/auth/Login.tsx
import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
} from '@mui/material';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';

interface Props {
  onLogin: (appName: string) => void;
}

export default function Login({ onLogin }: Props) {
  const [appName, setApp] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setErr] = useState('');

  const handleSubmit = async () => {
    if (!appName || !pwd) return;

    try {
      const snap = await get(ref(db, `apps/${appName}/meta/passwordHash`));
      if (!snap.exists()) throw new Error('Unknown app');
      if (snap.val() !== pwd) throw new Error('Wrong password');

      onLogin(appName);
    } catch (e: any) {
      setErr(e.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 320 }}>
        <Stack spacing={3}>
          <Typography variant="h5" align="center">
            FlexiLogger Console
          </Typography>

          {error && (
            <Alert severity="error" onClose={() => setErr('')}>
              {error}
            </Alert>
          )}

          <TextField
            label="App Name"
            fullWidth
            value={appName}
            onChange={(e) => setApp(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            fullWidth
          >
            Sign in
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
