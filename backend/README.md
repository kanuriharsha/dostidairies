Dosti Diaries backend

This is a minimal Express backend that connects to MongoDB and provides:
- User signup/login (JWT)
- Stories CRUD endpoints
- Likes and views endpoints

Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev` (nodemon)

Endpoints

- POST /api/signup { email, password, full_name }
- POST /api/login { email, password } -> { token, user }
- GET /api/me -> returns user
- GET /api/stories -> list stories (query params: limit, sort=popular|recent, featured=true, author_id)
- POST /api/stories -> create story (auth)
- DELETE /api/stories/:id -> delete story (auth)
- PATCH /api/stories/:id/views -> increment views
- GET /api/stories/:id/liked -> check if current user liked story
- POST /api/stories/:id/like -> like story (auth)
- DELETE /api/stories/:id/like -> unlike story (auth)
