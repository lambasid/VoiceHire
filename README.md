# VoiceHire

VoiceHire is an AI-assisted hiring workflow: job posts, candidates, screening, scheduling, and interview experiences. This repository contains a **Next.js 15** app (App Router) under `frontend/`, plus a separate Python API under `backend/` for heavier AI and voice services.

## Frontend stack

- [Next.js 15](https://nextjs.org/) (App Router) with React 19  
- [Tailwind CSS v4](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) primitives  
- [Chart.js](https://www.chartjs.org/) / [Recharts](https://recharts.org/) for analytics-style views  
- PostgreSQL access from API routes via `pg` (`DATABASE_URL`)

## Local development (frontend only)

```bash
cd frontend
npm ci
npm run dev
```

The dev server uses Turbopack (`next dev --turbopack`). Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run production server locally
npm run lint    # ESLint
```

## Deploying on Vercel

The frontend is a standard Next.js app and **is designed to deploy on Vercel** without custom bundler configuration.

1. Import this Git repository in the [Vercel dashboard](https://vercel.com/new) (or use `vercel link` from the CLI).  
2. Set **Root Directory** to `frontend` (the app lives there, not at the repo root).  
3. Framework preset should auto-detect **Next.js**. Build command: `npm run build`, output: Next default.  
4. Add environment variables (Project → Settings → Environment Variables):

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string for API routes that use `src/actions/db.ts` (jobs, candidates, etc.). Use a hosted Postgres URL (for example Neon, Supabase, or Vercel Postgres). |
| `DATABASE_SSL` | Set to `true` if your provider requires SSL with relaxed cert checks (matches the pool config in `db.ts`). |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the Python backend for Perplexity proxy routes under `/api/perplexity/*`. In production this must be your deployed API origin (not `localhost`). |

**Note:** Routes such as `/api/perplexity/analyze` forward to the separate backend. If that URL is missing or wrong, those features will fail at runtime even though the static UI deploys successfully.

Optional: add `vercel.json` at the repo root only if you need rewrites, headers, or cron—nothing in this repo requires it for a basic Next deployment.

## Repository layout

```
VoiceHire/
├── frontend/          # Next.js app (deploy this directory to Vercel)
├── backend/           # Python FastAPI-style services (not required for static UI)
├── VoiceHire-architecture.mermaid   # High-level product flow diagram
└── README.md
```

## Architecture overview

The high-level recruiter and interview flow is described in [`VoiceHire-architecture.mermaid`](VoiceHire-architecture.mermaid) (Mermaid `flowchart`—view in GitHub or any Mermaid-compatible editor).

## UI preview

<p align="center">
  <img width="800" alt="VoiceHire UI preview" src="https://github.com/user-attachments/assets/4afc8cbf-9992-4411-a821-30b1c33a6a17" />
  <img width="800" alt="VoiceHire UI preview" src="https://github.com/user-attachments/assets/5f42b363-5d5b-4220-a84c-92ac4ea67be0" />
</p>

## License

Private / unlicensed unless otherwise specified by the project owners.
