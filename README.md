# Hacker Theme MERN Portfolio

## Structure
- `client/` React (Vite) + Tailwind + Framer Motion
- `server/` Express + MongoDB (Mongoose)

## Prereqs
- Node.js + npm
- MongoDB running locally (or a MongoDB Atlas connection string)

## Setup
1. Server env:
   - Copy `server/.env.example` to `server/.env`
   - Update `MONGODB_URI` and `CORS_ORIGIN` if needed

2. Install deps:
   - From repo root: `npm i`
   - From `client/`: `npm i`
   - From `server/`: `npm i`

3. Seed MongoDB (optional):
   - From repo root: `npm run seed`

## Run (dev)
- From repo root: `npm run dev`
  - Client: http://localhost:5173
   - Server: http://localhost:5002 (health at `/api/health`)

## APIs
- `GET /api/skills` → skills list
- `GET /api/projects` → projects list
- `POST /api/contact` → stores contact message

## Notes
- The client uses a Vite dev proxy for `/api` to `http://localhost:5002`.
- Motion variants live in `client/src/animations/motion.js`.

## Thunder Client (add skills)
You can bulk-insert skills via API.

- Request: `POST http://localhost:5002/api/skills`
- Headers: `Content-Type: application/json`
- Body (JSON array):

```json
[
   {"name":"HTML5","logoUrl":"https://cdn-icons-png.flaticon.com/128/174/174854.png"},
   {"name":"CSS3","logoUrl":"https://cdn-icons-png.flaticon.com/128/732/732190.png"},
   {"name":"JavaScript","logoUrl":"https://cdn-icons-png.flaticon.com/128/5968/5968292.png"},
   {"name":"React.js","logoUrl":"https://cdn-icons-png.flaticon.com/128/1126/1126012.png"},
   {"name":"Node.js","logoUrl":"https://cdn-icons-png.flaticon.com/128/919/919825.png"},
   {"name":"Aws","logoUrl":"https://cdn-icons-png.flaticon.com/128/14390/14390315.png"},
   {"name":"MongoDB","logoUrl":"https://cdn-icons-png.flaticon.com/128/1602/1602309.png"},
   {"name":"Git","logoUrl":"https://cdn-icons-png.flaticon.com/128/15466/15466163.png"}
]
```

To verify:
- `GET http://localhost:5002/api/skills`
