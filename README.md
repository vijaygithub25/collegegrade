# College Discovery and Decision Platform

A full-stack College Discovery and Decision MVP built with Next.js, React, Tailwind CSS, Node.js, Express, and PostgreSQL (via Prisma).

## System Requirements
- Node.js 18+
- PostgreSQL Server

## 1. Environment Setup

### Backend
1. Open the `/backend` directory: `cd backend`
2. Configure `.env`:
   - Open `.env` and replace `DATABASE_URL` with your actual local PostgreSQL connection string. Example:
     `DATABASE_URL="postgresql://postgres:password@localhost:5432/collegedb?schema=public"`
3. Install dependencies (if not already done): `npm install`
4. Setup the Database Schema:
   `npx prisma db push`
5. Seed the Data:
   `npm run seed`
6. Start the Backend Server:
   `npm run dev`
   Backend will run on `http://localhost:5000`

### Frontend
1. Open the `/frontend` directory: `cd frontend`
2. Install dependencies (if not already done): `npm install`
3. Configure Environment Variables (optional):
   The frontend automatically connects to `http://localhost:5000`. You can change this by creating a `.env.local` inside `frontend/` with:
   `NEXT_PUBLIC_API_URL=http://localhost:5000`
4. Start the Frontend Server:
   `npm run dev`
   Frontend will be available on `http://localhost:3000`

## Features Included
1. **College Listing & Search**: Pagination, search, and filtering options.
2. **Dynamic Details Page**: View details of a specific college.
3. **Comparison Tool**: A sticky action bar lets you select up to 3 colleges, which can be evaluated side-by-side on prices, rankings, ratings, and courses.

## Edge Cases Handled
- No Results: Gracefully displays empty state and "Clear filters" action.
- Graceful API Error boundaries implemented across frontend listings.
- API inputs are structured to fall back gracefully on improper queries.
- Limits the number of comparable colleges to standard viewing maximums (e.g., 3 max).

## Deployment Flow
### Backend (Render/Railway)
- Root directory pointing to `backend/`.
- Set start script: `node dist/index.js` (you'll need to run `npx tsc` in build phase).
- Define `DATABASE_URL` safely inside the platform settings.

### Frontend (Vercel)
- Push your project to GitHub.
- Import `frontend` project to Vercel (Root Directory set to `frontend`).
- Ensure `NEXT_PUBLIC_API_URL` is set to the live backend server URL in Vercel settings.
