# ProjectFlow Dashboard

ProjectFlow Dashboard is a demo project management platform built with React, TypeScript and Tailwind CSS.  It showcases advanced features such as AI powered dashboards, voice commands and an interactive assistant. Data is persisted in a local SQLite database through a small Express API.

## Requirements

- Node.js 18 or newer
- npm (comes with Node.js)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   (cd server && npm install)
   ```
2. **Seed the database**
   ```bash
   npm run seed
   ```
   This creates `projectflow.db` inside the `server` folder and fills it with the sample data from `src/data/seedData.ts`.
3. **Start the backend**
   ```bash
   npm run start:server
   ```
   The API will be available on `http://localhost:3000/api`.
4. **Run the frontend**
   ```bash
   npm run dev
   ```
   Vite will start the development server on `http://localhost:5173`.

The client automatically loads the entire application state from the backend and saves any change back to it.

## Scripts

- `npm run dev` – start the Vite development server
- `npm run build` – build the frontend for production
- `npm run lint` – run ESLint
- `npm run start:server` – start the Express API (shortcut for `node server/index.js`)

Inside the `server` folder:

- `npm start` – start the API
- `npm run seed` – seed the database

## Features

The application ships with a large number of demo features:

- **Dashboard** with project and task statistics, charts and upcoming deadlines
- **Smart Dashboard** powered by AI with predictive metrics and smart alerts
- **Projects** management including budget, deadlines and progress tracking
- **Tasks** management with filters and status updates
- **Team** management showing users, skills and performance indicators
- **Calendar** to visualize upcoming events and deadlines
- **Blog** area with posts and comments
- **AI Insights** providing predictions and optimisation suggestions
- **AI Assistant** chat bot capable of generating reports and recommendations
- **Voice Commands** to interact with the assistant hands‑free
- **Settings**, **Help & Support** and a mock **AI Premium** upgrade page

All data in this demo comes from the seeded SQLite database and is manipulated in the UI through the global React context.

