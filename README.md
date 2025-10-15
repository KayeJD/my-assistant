# Student Assistant Desktop App

A cross-platform desktop assistant for students and young workers.

## 🛠️ Tech Stack
- **Framework:** Electron + React
- **Frontend:** React + TailwindCSS
- **Backend:** Node.js (Electron main process)
- **APIs:** Google Calendar, Twilio
- **Storage:** SQLPostgres (?)

## 📦 Cross-Platform Build
- Windows: `.exe`
- macOS: `.dmg`
- Packaged with **Electron Builder**

## Dev Notes

### Structure
```
my-assistant/
├── client/                    # React (frontend)
│   ├── app/
│   │   ├── routes/        # 
│   │   ├── modules/           # Core features (tasks, timer, notifications, theme)
│   │   │   ├── task/
│
├── .gitignore
├── README.md
└── package.json               # Optional workspace root (for npm/yarn workspaces)

```
- /client/app/routes/ : [Routes](https://reactrouter.com/start/framework/routing)


### 🧩 Features
- [ ] Task manager and focus timer
- [ ] Modular console with customizable layout
- [ ] Theme customizeable
- [ ] Spending tracker (maybe visual tracker conenct to payments)
- [ ] Calendar sync (Google)
- [ ] SMS notifications (Twilio)
- [ ] AI-based task summaries
- [ ] Motivational daily greeting

### Notes

1. Project created with Node, Docker, and Postgres: npx create-react-router@latest --template remix-run/react-router-templates/node-postgres

