# 📊 FlexiLogger Web Dashboard

**FlexiLogger** is a customizable logging library for Android paired with a powerful Firebase-backed web dashboard that visualizes real-time logs.  
This repository contains the **web dashboard** portion — built with **React**, **MUI**, and **Recharts** — to help developers and support engineers monitor, filter, and understand app behavior at scale.

---

## 🌟 Features

- 📈 **Real-time Pie Charts**: View logs by `Tag`, `User ID`, and `Level`.
- 🔎 **Firebase Realtime Database Integration**: Pulls the latest 2,000 log entries per app.
- 🎯 **Filtering Support**: Select specific log levels (DEBUG / INFO / ERROR / ALL).
- 💡 **Responsive UI**: Built with Material UI and works on desktop and mobile.
- 🔥 **Easy to Integrate**: Works seamlessly with the FlexiLogger Android SDK.

---

## 📂 Project Structure

```
flexilogger-web/
├── src/
│   ├── dashboard/
│   │   └── LogsChart.tsx       # Core pie chart visualizer
│   ├── firebase.ts             # Firebase config and initialization
│   ├── App.tsx                 # Root app component
│   └── index.tsx               # Entry point
├── public/
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flexilogger-web.git
cd flexilogger-web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Edit `src/firebase.ts` and replace with your project credentials:

```ts
// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Firebase Database Structure

Your Firebase Realtime Database should follow this structure:

```
apps/
  └── demoApp/
      └── logs/
          └── user_1234/
              └── session_xyz/
                  └── log_abc123: {
                        tag: "network",
                        level: "ERROR",
                        msg: "Timeout",
                        ts: 1723459123
                  }
```

- `tag`: category of the log
- `level`: DEBUG / INFO / ERROR
- `ts`: Unix timestamp (seconds)

---

## 🧩 Built With

- ⚛️ [React](https://reactjs.org/)
- 🎨 [Material UI (MUI)](https://mui.com/)
- 📊 [Recharts](https://recharts.org/)
- 🔥 [Firebase Realtime Database](https://firebase.google.com/products/realtime-database)
- ⚡️ [Vite](https://vitejs.dev/)

---

## 👨‍💻 Author

**Ziv Nesher**  
[GitHub Profile](https://github.com/zivnesher)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🚀 Coming Soon

- 🔐 Authentication & Role-based access
- 📁 Log download & export
- 📬 Slack & email alerts
