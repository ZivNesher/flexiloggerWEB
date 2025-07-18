import { useState } from 'react';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';

export default function App() {
  const [appName, setApp] = useState('');

  if (!appName) return <Login onLogin={setApp}/>;
  return <Dashboard appName={appName} onLogout={() => setApp('')}/>;
}
