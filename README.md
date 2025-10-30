frotend env 
VITE_BACKEND_URL=http://localhost:4001

# Dosti Diaries

A web application for sharing and reading stories, built with React (frontend) and Node.js/Express (backend) with MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)

## Setup and Installation

### Clone the Repository

```bash
git clone https://github.com/kanuriharsha/dostidairies.git
cd dostidairies
```

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file (if not present, copy from example):
   - The `.env` file should contain:
     ```
     VITE_BACKEND_URL=http://localhost:4001
     ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   - The frontend will be available at `http://localhost:5173` (default Vite port).

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and fill in the required values:
     ```
     MONGO_URI="your_mongodb_connection_string"
     JWT_SECRET=your_strong_jwt_secret
     PORT=4001
     ```

4. Run the backend server:
   ```bash
   npm run dev
   ```
   - The backend will run on `http://localhost:4001`.

## Usage

- Open the frontend in your browser.
- Register/Login to access the application.
- Share and read stories on the feed.

## Build for Production

### Frontend
```bash
npm run build
npm run preview
```

### Backend
```bash
npm start
```

## Deployment

Quick notes to deploy frontend to Vercel and backend to Render.

Frontend (Vercel)
- Connect your GitHub repository to Vercel.
- Project settings:
  - Framework Preset: Other (or Vite)
  - Build Command: npm run build
  - Output Directory: dist
- Add an environment variable in Vercel:
  - VITE_BACKEND_URL = https://<your-render-backend-url>
- Deploy. The single-page app is routed to index.html (vercel.json included).

Backend (Render)
- Create a new Web Service on Render and connect the same GitHub repo.
- When configuring the service:
  - Root directory: /backend
  - Build Command: npm install
  - Start Command: npm start
  - Environment: Node
  - Set required environment variables (in Render UI or render.yaml):
    - MONGO_URI (your MongoDB connection string)
    - JWT_SECRET (your strong JWT secret)
    - PORT = 4001
- After deployment, copy the backend URL and set VITE_BACKEND_URL in Vercel.

Notes
- The repo includes render.yaml (backend service example) and vercel.json (frontend static build + SPA routing).
- Keep secret values (MONGO_URI, JWT_SECRET) in Render/Vercel UI (do not commit secrets).
