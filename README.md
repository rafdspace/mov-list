# Movie list

## Live Demo

The application can be accessed directly via the deployed link below:

🔗 **[https://mov-list-rafdspace.vercel.app/](https://mov-list-rafdspace.vercel.app/)**

## Overview

This project is a React development test application for Stockbit that **displays a movie list by consuming data from the [OMDb API](https://www.omdbapi.com/)**.
The application allows users to browse movies, view detailed information, and search for movies with suggestions.

The application can also be **run locally** by following the instructions in this README.

## Features

This application includes the following key features:

- **Movie List** – Displays a list of movies fetched from an API.
- **Movie Detail** – Shows detailed information for each movie when selected.
- **Search with Suggestions** – Allows searching for movies and displays suggested results as you type.
- **Responsive Design** – Fully responsive UI that works on desktop, tablet, and mobile screens.
- **Fully Covered Unit Tests** – All components, hooks, and utility functions have comprehensive unit tests using Vitest, ensuring high reliability.

## Tech Stack

This application uses **React**, **Redux**, **Axios**, **TypeScript**, **Vite**, **Vitest**, and **Tailwind CSS**.

- **React** – Creates reusable UI components for the application.
- **Redux** – Manages global application state in one place.
- **Axios** – Handles HTTP requests to fetch data from APIs easily and reliably.
- **TypeScript** – Adds type safety to catch errors before runtime.
- **Vite** – Runs and builds the app fast during development and production.
- **Vitest** – Runs fast unit tests for components and logic using Vite.
- **Tailwind CSS** – Styles the UI using utility classes quickly and consistently.

## Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher (recommended for Vite & React 19)
- **npm** (comes with Node.js) or **yarn / pnpm** if you prefer

## Getting Started

### 1. Install Node.js (if not installed)

Download and install from [Node.js official site](https://nodejs.org/).

Verify installation:

```bash
node -v
npm -v
```

### 2. Install dependencies

From the project root, run:

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

The app will be served at:

```
http://localhost:5173
```

## Testing

Run all tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Run tests with interactive UI and coverage:

```bash
npm run test:ui
```

All components, hooks, and utilities are covered by unit tests using **Vitest**.

## Available Scripts

| Script                  | Description                         |
| ----------------------- | ----------------------------------- |
| `npm run dev`           | Start Vite development server       |
| `npm run build`         | Type-check and build for production |
| `npm run preview`       | Preview production build locally    |
| `npm run test`          | Run tests with Vitest               |
| `npm run test:coverage` | Run tests with coverage report      |
| `npm run test:ui`       | Run Vitest UI with coverage         |
| `npm run lint`          | Run ESLint                          |
