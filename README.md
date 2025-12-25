# Stockbit React Dev Test

## Overview

This project is a React development test application for Stockbit.  
It uses **React**, **Redux**, **Axios**, **TypeScript**, **Vite**, **Vitest**, and **Tailwind CSS**, to demonstrate modern React patterns and best practices.

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

## Running Development Locally

### 1. Install Node.js (if not installed):

Download and install from [Node.js official site](https://nodejs.org/).

Verify installation:

```
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

## Running Tests Locally

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
