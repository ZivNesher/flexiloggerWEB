# 📊 FlexiLogger

**FlexiLogger** is a lightweight, plug-and-play logging solution for Android apps, with a web-based dashboard for real-time visualization and debugging. It combines a flexible Android library and a Firebase-powered dashboard to monitor logs from any app, with visual insights and filtering tools.

---

## 📱 Android SDK

Import the Android logging library into your app:

```
implementation 'com.ZivNesher.Flexilogger:flexilogger:1.0.0'
```

> Hosted at: [github.com/ZivNesher/Flexilogger](https://github.com/ZivNesher/Flexilogger)

Once integrated, you should contact me directly Zivnesher96@gmail.com in order to get you web-dashboard password. then, you can start logging events like this:

```java
Flexilogger.init(context, new FlexiLoggerConfig.Builder("myAppName").build());
Flexilogger.setUserId("user_123");
Flexilogger.setSessionId("session_abc");

Flexilogger.log(context, "Login", "User login failed due to 401", Flexilogger.LogLevel.ERROR);
```

These logs are sent in real-time to Firebase Realtime Database under:

```
apps/
  └── myAppName/
      └── logs/
          └── user_123/
              └── session_abc/
                  └── log_xxx: {
                        tag: "Login",
                        level: "ERROR",
                        msg: "User login failed...",
                        ts: 1723487200
                  }
```

---

## 🖥️ Web Dashboard (this repo)

This repo contains the **FlexiLogger Web Console** built in React. It allows you to:

- 🔐 Log in by App Name + Password
- 📊 View Pie Charts of logs:
  - by **Tag** (e.g. "Auth", "Network")
  - by **User ID**
  - by **Level** (INFO, DEBUG, ERROR)
- 📄 View detailed logs in a searchable table
- 🔍 Filter logs by level

---

## 🚀 Live Features

### 🔐 Login (`Login.tsx`)

- Enter your app name and password (stored under `apps/{appName}/meta/passwordHash`)
- Validates access and loads app logs into session

### 📊 Dashboard (`Dashboard.tsx`)

- Combines `<LogsChart />` and `<LogsTable />`
- Includes level filter and logout button

### 🥧 LogsChart (`LogsChart.tsx`)

- Recharts-based pie charts grouped by:
  - Tag (`v.tag`)
  - User ID (Firebase key: `user_123`)
  - Log Level (`v.level`)
- Fully responsive using MUI and Flexbox

### 📋 LogsTable (`LogsTable.tsx`)

- Uses `@mui/x-data-grid`
- Shows columns: Timestamp, Level, Tag, Message, User
- Automatically scrolls, formats timestamps, color-codes log levels
- Shows latest 500 logs per app
- Filterable by level

---

## 🧠 Firebase Realtime Database Structure

```
apps/
  └── myApp/
      ├── meta/
      │   └── passwordHash: "secret123"
      └── logs/
          └── user_123/
              └── session_xyz/
                  └── log_abc123: {
                        tag: "network",
                        level: "ERROR",
                        msg: "Timeout occurred",
                        ts: 1723459123
                  }
```

---

## 💻 Setup & Run (Web Dashboard)

### 1. Clone the Repo

```bash
git clone https://github.com/ZivNesher/flexilogger-web.git
cd flexilogger-web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Update `src/firebase.ts` with your Firebase app config:

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

### 4. Start the Web App

```bash
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## 🧩 Tech Stack

- ⚛️ React + TypeScript
- 🎨 Material UI (MUI)
- 📊 Recharts
- 📚 Firebase Realtime Database
- 🧪 MUI X DataGrid
- ⚡️ Vite

---

## ✨ Screenshots

> _Coming soon..._ (add GIFs of chart & table interaction if desired)

---

## 📜 License

MIT License © 2025 Ziv Nesher

---

## 🛣️ Roadmap

- [ ] 🔐 Add Firebase Authentication
- [ ] 📁 Export logs to CSV
- [ ] 📬 Slack or Email log alerts
- [ ] 📱 Admin mobile dashboard

---

## 🙌 Acknowledgments

- Built as part of a personal logging utility project
- Inspired by the need to debug real-time logs from Android devices during QA and production

##Screenshots

###Website:
<img width="1276" height="826" alt="Screenshot 2025-07-18 at 16 51 52" src="https://github.com/user-attachments/assets/e6946f2e-c570-4d76-a6a2-e583dd2e8a87" />
<img width="1276" height="829" alt="Screenshot 2025-07-18 at 17 01 14" src="https://github.com/user-attachments/assets/71820c65-d6ea-4659-8ed8-4dbf4fa894d3" />

###demoApp:
https://github.com/user-attachments/assets/38dbef35-17a0-4684-b3ea-f56a061292a0





