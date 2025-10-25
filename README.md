# Assistant App

I'm genuinely still trying to figure out what I want to do with this here BUT I'm leaning towards a personalized, customizeable assistant console for production and figuring out adult life stuff. Plan to build as life goes on.


## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 💾 PostgreSQL + DrizzleORM
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Currently just developing in local docker postgres db with `.env`, so provide a `DATABASE_URL` with your connection string. 

To make it easy for now, just create a quick instance and use connection string: _"postgresql://postgres:docker@localhost:5432/postgres"_

```
docker run --name my-assistant-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```


Run an initial database migration:

```bash
npm run db:migrate
```

Start the development server with HMR:

```bash
npm run dev
```

The application should be available at `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
# For npm
docker build -t my-assistant .

# Run the container
docker run -p 3000:3000 my-assistant
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── server.js
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

### Dev notes

#### 🧩 Features
- [X] Focus timer
- [X] Task manager
- [ ] Create db prototype to save the profile and times (timer) every day and week, etc
- [ ] Add chrat that shows productivity time in hours throughout teh week (Add other lines such as play vs work time and etc.)
- [X] Modular console with customizable layout
- [ ] Theme customizeable
- [ ] Spending tracker (maybe visual tracker conenct to payments)
- [ ] Calendar sync (Google)
- [ ] SMS notifications (Twilio)
- [ ] AI-based task summaries
- [ ] Motivational daily greeting

#### Notes

1. Project created with Node, Docker, and Postgres: npx create-react-router@latest --template remix-run/react-router-templates/node-postgres
2. In React Router route files, the component that renders the page must be the default export. The framework’s internal logic is roughly equivalent to:
```
const element = require(routeFile).default;
```
So if there’s no default export, there’s nothing to render.