Frontend (Vercel)

- Point Vercel to the `dostidairies` folder (this project root contains `package.json` and `vercel.json`).
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment variables (if needed):
  - `VITE_BACKEND_URL` = `https://<your-backend-render-url>`

Important notes:
- Static assets (images) are in `public/` (examples: `public/dostidairies.png`, `public/dostidairies1.png`). Files in `public/` are served at the root path (for example `/dostidairies.png`) and will be available after Vercel build.
- If you prefer to deploy only a subfolder, set the Vercel project’s "Root Directory" to the folder that contains `package.json` and `vercel.json`.

Backend (Render)

- Upload or point Render to the `dostidairies/backend` folder (this folder contains `package.json`, `index.js`, `server.js`).
- Render build command: `npm install`
- Render start command: `npm start`
- Required environment variables (set in Render dashboard):
  - `MONGO_URI` (your MongoDB connection string)
  - `JWT_SECRET` (a strong secret for signing tokens)
  - `PORT` (optional; defaults to 4001)
  - `CORS_ORIGINS` (comma-separated allowed origins; set to your Vercel URL, e.g. `https://your-frontend.vercel.app`)

Why this will work
- Vite expects static public assets to live in `public/` to be served as root paths — moving the PNGs into `public/` fixes missing image problems on Vercel.
- Render will run `npm install` and `npm start` from the backend folder; `render.yaml` inside `backend/` includes those commands so uploading that folder directly works.
