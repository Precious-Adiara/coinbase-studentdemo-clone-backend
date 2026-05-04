# Coinbase Clone — Full Stack Integration

A full-stack cryptocurrency platform built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## 🏗️ Project Structure

```
coinbase-clone/           ← your existing frontend repo
├── src/
│   ├── context/
│   │   └── AuthContext.jsx        ← NEW: Global auth state
│   ├── components/
│   │   └── ProtectedRoute.jsx     ← NEW: Guards /profile
│   ├── utils/
│   │   └── api.js                 ← NEW: All backend API calls
│   ├── pages/
│   │   ├── Register/Register.jsx  ← NEW: Full registration form
│   │   ├── Login/Login.jsx        ← NEW: Login form
│   │   ├── Profile/Profile.jsx    ← NEW: Protected profile page
│   │   ├── Home/components/Navbar.jsx         ← UPDATED: Auth-aware
│   │   └── Cryptocurrencies/components/CryptoTable.jsx ← UPDATED: API-driven
│   ├── router/index.jsx           ← UPDATED: New routes
│   └── main.jsx                   ← UPDATED: AuthProvider wrapping
└── .env                           ← NEW: VITE_API_URL

coinbase-clone-backend/   ← NEW backend repo
├── models/
│   ├── User.js
│   └── Crypto.js
├── routes/
│   ├── authRoutes.js
│   └── cryptoRoutes.js
├── controllers/
│   ├── authController.js
│   └── cryptoController.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── server.js
├── seed.js
└── .env
```

---

## 🚀 Backend Setup

### 1. Install dependencies
```bash
cd coinbase-clone-backend
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/coinbase-clone
JWT_SECRET=your_super_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Seed the database (optional)
```bash
node seed.js
```

### 4. Run the server
```bash
npm run dev       # development (auto-restart on file changes)
npm start         # production
```

Server starts at `http://localhost:5000`

---

## 🎨 Frontend Setup

### 1. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 2. Copy updated files into your frontend src/
Replace the following files with the versions provided:
- `src/main.jsx`
- `src/router/index.jsx`
- `src/utils/api.js` (new)
- `src/context/AuthContext.jsx` (new)
- `src/components/ProtectedRoute.jsx` (new)
- `src/pages/Register/Register.jsx` (new)
- `src/pages/Login/Login.jsx` (new)
- `src/pages/Profile/Profile.jsx` (new)
- `src/pages/Home/components/Navbar.jsx`
- `src/pages/Cryptocurrencies/components/CryptoTable.jsx`

### 3. Run the frontend
```bash
npm run dev
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create new account | Public |
| POST | `/api/auth/login` | Login, receives JWT cookie | Public |
| POST | `/api/auth/logout` | Clear JWT cookie | Protected |
| GET | `/api/auth/profile` | Get current user | Protected |

### Crypto
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/crypto` | All cryptocurrencies | Public |
| GET | `/api/crypto/gainers` | Top gainers (sorted desc) | Public |
| GET | `/api/crypto/new` | Newest listings | Public |
| POST | `/api/crypto` | Add new crypto | Public |

### Example: Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"secret123"}'
```

### Example: Add Crypto
```bash
curl -X POST http://localhost:5000/api/crypto \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Polkadot",
    "symbol": "DOT",
    "price": 7.52,
    "image": "https://example.com/dot.png",
    "change24h": 3.5,
    "mktCap": "$9.8B",
    "volume": "$320M"
  }'
```

---

## ☁️ Deployment

### Backend — Render

1. Push backend to a GitHub repo
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your backend repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Node version:** 18+
5. Add environment variables in Render dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL` → your frontend Vercel/Netlify URL
   - `NODE_ENV=production`

### Frontend — Vercel / Netlify

1. Push frontend to GitHub
2. Connect to [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com)
3. Add environment variable:
   - `VITE_API_URL=https://your-backend.onrender.com/api`
4. For React Router to work, add a `vercel.json`:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
   ```
   Or for Netlify, add `public/_redirects`:
   ```
   /* /index.html 200
   ```

---

## 🔒 Security Notes

- Passwords are hashed with **bcrypt** (10 salt rounds)
- JWTs are stored in **HTTP-only cookies** (not localStorage) — safe from XSS
- Cookies are `secure` + `sameSite: none` in production for cross-origin support
- CORS is restricted to your `CLIENT_URL`
