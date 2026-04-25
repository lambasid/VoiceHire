# VoiceHire

AI-powered recruiting automation — job postings, candidate pipeline, screening, analysis, and interview scheduling.

## Screenshots

<img width="1512" alt="Screenshot 2025-03-30 at 9 56 54 AM" src="https://github.com/user-attachments/assets/4afc8cbf-9992-4411-a821-30b1c33a6a17" />
<img width="1509" alt="Screenshot 2025-03-30 at 9 57 22 AM" src="https://github.com/user-attachments/assets/5f42b363-5d5b-4220-a84c-92ac4ea67be0" />

## What’s included

- **Job Postings**: browse roles and drill into a specific job.
- **Candidates**: review applicants, run first screening, view analysis, schedule interviews.
- **Modern UI**: clean dark theme, smoother interactions, and lighter animation work.
- **Safe demo mode**: key pages gracefully fall back to **sample data** when APIs/DB aren’t available.

## Tech stack

- **Next.js (App Router)**: `next@15`
- **React**: `react@19`
- **TypeScript**
- **Tailwind CSS**
- UI helpers: **shadcn/ui**, **Radix**, **Headless UI**

## Local development

From the repo root:

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy to Vercel (frontend-only)

This repo’s deployable frontend lives in `frontend/`.

### Option A: Deploy the UI only (no database)

This works because the UI uses **sample-data fallbacks** if job/candidate APIs fail.

1. Create a new Vercel project from this repo
2. Set **Root Directory** to `frontend`
3. Framework preset: **Next.js**
4. Deploy

Notes:

- The repo contains Next.js API routes under `frontend/src/app/api/*`. If you do **not** configure a database, those routes may return `500`, and the UI will automatically fall back to sample data.

### Option B: Full experience (UI + DB-backed API routes)

If you want real jobs/candidates data from the API routes, configure the environment variables used by your database client in Vercel (for example, `DATABASE_URL` / Vercel Postgres connection vars — depending on how your `pool` is configured in `frontend/src/actions/db`).

After setting env vars:

- Redeploy on Vercel
- Verify `/api/jobs` and `/api/candidates` return JSON successfully

## Project structure

```text
frontend/
  src/
    app/                 # App Router routes (pages + API routes)
    components/          # UI components (tables, modals, sidebar, etc.)
    lib/                 # utilities + mock/sample data
```

## Scripts

From `frontend/`:

```bash
npm run dev     # local dev server
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # lint
```

## License

Private / internal project (update as needed).

