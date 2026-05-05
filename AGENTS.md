# Paper-Contracts Development Guide

## Overview

Paper-Contracts is a monorepo (npm workspaces) with two services:
- **Backend** (`backend/`): Express 5 REST API on port 4000
- **Frontend** (`frontend/`): React 19 + Vite SPA on port 3000

## Cursor Cloud specific instructions

### Starting the dev environment

```bash
npm run dev          # starts both backend + frontend concurrently
```

Or individually:
```bash
npm run dev -w @free-contratos/backend    # Express API on :4000
npm run dev -w @free-contratos/frontend   # Vite dev server on :3000
```

The Vite dev server proxies `/api` requests to the backend on port 4000.

### Important notes

- **No lint or test scripts** are configured in this project. There is no ESLint config, no test framework, and no lint/test npm scripts.
- **No Docker, no external database**: the backend uses flat JSON files in `backend/data/` (auto-created on first write).
- **Firebase Auth** is required for authenticated routes (`/api/v1/ai/*`, `/api/v1/clients/*`, `/api/v1/documents/*`). The health endpoint (`/api/v1/health`) and payment routes are public.
- **Tailwind CSS v4**: The project uses Tailwind v4 with `@tailwindcss/postcss`. The `postcss.config.js` must use `'@tailwindcss/postcss'` (not `tailwindcss` directly), and `index.css` must use `@import "tailwindcss"` with `@config "../tailwind.config.js"` instead of the v3 `@tailwind` directives.
- **Node.js >= 20** is required (per `engines` in root `package.json`).
- The backend requires `dotenv` for loading `.env` files (imports `dotenv/config` in `src/config.js`).
- **Frontend build**: `npm run build -w @free-contratos/frontend` (Vite build). Backend has no build step.
- **API docs**: Swagger UI is available at `/api/v1/docs` when the backend is running.
- **Environment variables**: `.env` files in `backend/` and `frontend/` are already committed to the repo.
