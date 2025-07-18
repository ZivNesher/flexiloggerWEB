import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDoQFk42Yv3C3FS_9rhLt8nYHtesdJVeyo",
    authDomain: "flexilogger-7e8f8.firebaseapp.com",
    databaseURL: "https://flexilogger-7e8f8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "flexilogger-7e8f8",
    storageBucket: "flexilogger-7e8f8.firebasestorage.app",
    messagingSenderId: "91472722676",
    appId: "1:91472722676:web:7eb02367db9a144e68fca1",
    measurementId: "G-JD04BJ8NMZ"
  };
  

export const app = initializeApp(firebaseConfig);
export const db  = getDatabase(app);
