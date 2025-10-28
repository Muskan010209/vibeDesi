# Backend & Frontend Integration Guide

## Quick Setup

Follow these steps to get your backend and frontend running together:

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 2: Create Environment File

Create a `.env` file in the `server` directory:

```bash
cd server
# Copy the example file
copy .env.example .env
# On Linux/Mac: cp .env.example .env
cd ..
```

Or manually create `server/.env` with these contents:

```env
MONGODB_URI=mongodb+srv://kamuskan01_db_user:mr94OLLkobjp0oEB@vibe.pij4q2a.mongodb.net/vibeDesi?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

### Step 3: Create Admin User

Run this command to create an admin account:

```bash
cd server
npm run create-admin
```

This will create an admin user with:
- Email: `admin@vibedesi.com`
- Password: `admin123`

### Step 4: Start the Application

**Option 1: Using PowerShell Script (Windows)**

```powershell
.\start.ps1
```

**Option 2: Manual Start**

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Login**: http://localhost:3000/admin/login

## Testing the Dashboard

1. Navigate to http://localhost:3000/admin/login
2. Login with:
   - Email: `admin@vibedesi.com`
   - Password: `admin123`
3. You'll be redirected to the dashboard at http://localhost:3000/admin/dashboard

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Admin (requires admin role)
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete a user
- `PUT /api/admin/users/:id/role` - Update user role

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

## How Frontend Fetches Data

The frontend is configured to automatically proxy API requests to the backend:

1. **Vite Proxy Configuration** (`vite.config.js`):
   - All requests to `/api/*` are proxied to `http://localhost:5000`

2. **Dashboard Component** (`src/pages/admin/Dashboard.jsx`):
   - Fetches stats from `/api/admin/stats`
   - Uses JWT token from localStorage for authentication

3. **Authentication Flow**:
   - Login at `/admin/login`
   - Token is stored in localStorage
   - Token is sent in Authorization header for protected routes

## Troubleshooting

### Backend won't start
- Check if MongoDB URI is correct in `server/.env`
- Check if port 5000 is available
- Run `npm install` in the `server` directory

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check if CORS is enabled in backend (it is by default)
- Check browser console for errors

### Dashboard shows no data
- Make sure admin user exists (run `npm run create-admin` in server directory)
- Check browser console for API errors
- Verify token is being sent in request headers

### 401 Unauthorized errors
- Login again to get a fresh token
- Check if token is in localStorage
- Verify user has admin role

## Development Tips

1. **Database**: The app uses MongoDB Atlas (cloud database), so you don't need local MongoDB
2. **Hot Reload**: Both frontend and backend support hot reload during development
3. **Token Expiry**: Tokens expire after 7 days by default
4. **CORS**: Backend has CORS enabled for all origins in development

## Architecture Overview

```
Frontend (React + Vite)              Backend (Node.js + Express)
     Port 3000                            Port 5000
         │                                      │
         │  /api/* requests                     │
         ├───────────────────────────────────> │
         │                                      ├─> MongoDB Atlas
         │  JSON responses                      │    (Cloud)
         │<──────────────────────────────────── │
         │                                      │
```

The frontend makes API calls to `/api/*` endpoints, which are proxied to the backend by Vite's dev server.



