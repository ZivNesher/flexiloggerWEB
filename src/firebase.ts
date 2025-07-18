import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
//your key configuration
  };
  

export const app = initializeApp(firebaseConfig);
export const db  = getDatabase(app);
