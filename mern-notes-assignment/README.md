# MERN Notes Management System

A full-stack notes application built with MongoDB, Express, React and Node.js. It includes registration, login, logout, authenticated note CRUD, per-user note ownership and an MVC-style backend.

## Project structure

```text
mern-notes-assignment/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/authController.js
│   │   ├── controllers/noteController.js
│   │   ├── middleware/authMiddleware.js
│   │   ├── models/User.js
│   │   ├── models/Note.js
│   │   ├── routes/authRoutes.js
│   │   ├── routes/noteRoutes.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/ (Navbar, NoteCard, NoteForm, ProtectedRoute)
    │   ├── context/AuthContext.jsx
    │   ├── pages/ (Login, Register, Dashboard)
    │   ├── services/api.js
    │   ├── main.jsx
    │   └── styles.css
    ├── .env.example
    ├── index.html
    └── package.json
```

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- VS Code

## Setup (Windows PowerShell)

### 1. Open project folder
Open `mern-notes-assignment` in VS Code.

### 2. Backend terminal
```powershell
cd backend
npm install
Copy-Item .env.example .env
```
Open `backend/.env` and set `MONGO_URI`, and replace `JWT_SECRET` with a long random secret. Example local settings:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/notes_management
JWT_SECRET=my_long_random_secret_change_this
CLIENT_URL=http://localhost:5173
```
Start MongoDB service first. Then run:
```powershell
npm run dev
```
Expected messages: `MongoDB connected successfully` and `Server running at http://localhost:5000`.

### 3. Frontend terminal (second terminal)
```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```
Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

### 4. Use the app
1. Register a user.
2. Log in.
3. Create, view, edit and delete notes.
4. Log out.

## API endpoints
All note endpoints require `Authorization: Bearer <token>`.

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Current user | Yes |
| POST | `/api/notes` | Create note | Yes |
| GET | `/api/notes` | List logged-in user's notes | Yes |
| GET | `/api/notes/:id` | Read one note by ID | Yes |
| PUT | `/api/notes/:id` | Update note | Yes |
| DELETE | `/api/notes/:id` | Delete note | Yes |

## MVC explanation
- **Model:** `User.js` and `Note.js` define MongoDB collections and fields.
- **View:** React pages and components render the user interface.
- **Controller:** `authController.js` and `noteController.js` contain request/business logic.
- **Routes:** map API URLs to controller functions.
- **Middleware:** verifies JWT tokens before protected routes.

## Important security note
Passwords are hashed with bcrypt. JWT protects API routes. Each note query is scoped to the authenticated user's ID, so users cannot read, edit or delete another user's notes. For a production deployment, use HTTPS, a strong secret stored outside source control, stricter CORS settings, rate limiting and secure token storage.
