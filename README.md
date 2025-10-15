# Student Assistant Desktop App

A cross-platform desktop assistant for students and young workers.

## 🛠️ Tech Stack
- **Framework:** Electron + React
- **Frontend:** React + TailwindCSS
- **Backend:** Node.js (Electron main process)
- **APIs:** Google Calendar, Twilio
- **Storage:** SQLite (via better-sqlite3)

## 📦 Cross-Platform Build
- Windows: `.exe`
- macOS: `.dmg`
- Packaged with **Electron Builder**

## Dev Notes

### Structure
```
virtual-assistant/
├── main/               ← Electron main process
│   ├── main.js
│   ├── preload.js
│   └── db.js           ← Postgres setup
├── renderer/           ← React (Vite + TypeScript)
│   ├── src/
│   │   └── App.tsx
│   └── ...
├── package.json
├── tsconfig.json
└── vite.config.ts

```

### 🧩 Features
- [ ] Task manager and focus timer
- [ ] Spending tracker (local SQLite)
- [ ] Calendar sync (Google)
- [ ] SMS notifications (Twilio)dfv
- [ ] Voice command support
- [ ] AI-based task summaries

### 🧩 Core Features
- [ ] Task manager with focus timer
- [ ] Spending tracker (SQLite local)
- [ ] Calendar integration (Google)
- [ ] SMS notifications via Twiliov
- [ ] Motivational daily greeting

