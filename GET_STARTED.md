# Quick Start Guide - vibeDesi

This guide will help you get the backend and frontend running together.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Internet connection (for MongoDB Atlas)

## Step-by-Step Setup

### 1. Install Frontend Dependencies

Open a terminal in the project root directory:

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 3. Create Admin User

Run this command to create the admin account in the database:

```bash
cd server
npm run create-admin
cd ..
```

You should see output confirming the admin was created:
- Email: `admin@vibedesi.com`
- Password: `admin123`

### 4. Seed Products (Optional)

To populate the database with sample products:

```bash
cd server
npm run seed
cd ..
```

### 5. Start the Application

#### Option A: Using PowerShell Script (Recommended for Windows)

```powershell
.\start.ps1
```

This will open two terminal windows:
- Backend server on port 5000
- Frontend development server on port 3000

#### Option B: Manual Start

Open **two separate terminal windows**:

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

### 6. Access the Application

Once both servers are running:

- **Frontend Home**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Backend API**: http://localhost:5000

### 7. Login to Admin Dashboard

1. Go to http://localhost:3000/admin/login
2. Enter credentials:
   - Email: `admin@vibedesi.com`
   - Password: `admin123`
3. Click "Login to Admin Panel"
4. You'll be redirected to the dashboard

## Dashboard Features

Once logged in, the dashboard displays:

### Statistics Cards
- Total Users
- Total Orders
- Total Revenue
- Total Products

### Charts
- Products by Category (Pie Chart)
- Order Status (Bar Chart)
- User Statistics
- Top Products List

## How It Works

### Frontend → Backend Communication

1. **Vite Proxy Configuration** (`vite.config.js`)
   - All `/api/*` requests are automatically proxied to `http://localhost:5000`
   - No CORS issues in development

2. **Axios Instance** (`src/utils/axios.js`)
   - Pre-configured axios instance
   - Automatically adds JWT token to requests
   - Handles authentication errors
   - Base URL set to `/api`

3. **Authentication Flow**
   - Login at `/admin/login`
   - Token stored in `localStorage`
   - Token sent with each API request
   - Auto-redirects to login if token is invalid

### API Structure

```
GET  /api/products              - Get all products
GET  /api/products/:id          - Get single product
GET  /api/auth/me               - Get current user
POST /api/auth/login             - Login
GET  /api/admin/stats            - Get dashboard stats (admin only)
GET  /api/admin/users            - Get all users (admin only)
```

## Troubleshooting

### Backend won't start

**Error: "Cannot find module"**
```bash
cd server
npm install
```

**Error: "PORT already in use"**
- Close the application using port 5000
- Or change PORT in `server/.env`

### Frontend can't connect to backend

**Error: "Network Error" or "Connection refused"**
- Verify backend is running on http://localhost:5000
- Check browser console for detailed errors
- Ensure port 5000 isn't blocked by firewall

**Error: "CORS error"**
- This shouldn't happen with the proxy setup
- If it does, check `vite.config.js` proxy settings

### Dashboard shows "No data available"

**Possible causes:**
1. Database is empty - run `npm run seed` in server directory
2. Token expired - login again
3. API error - check browser console and backend terminal

**Solution:**
```bash
cd server
npm run create-admin
npm run seed
```

### Login page redirects immediately

**Cause:** Existing invalid token in localStorage

**Solution:** Clear browser storage:
```javascript
// In browser console:
localStorage.clear()
// Then refresh the page
```

## Environment Variables

The application uses these environment variables in `server/.env`:

```env
MONGODB_URI=mongodb+srv://...     # MongoDB connection string
PORT=5000                          # Backend port
NODE_ENV=development               # Environment
JWT_SECRET=...                     # Secret for JWT tokens
JWT_EXPIRE=7d                      # Token expiry
```

## Development Tips

1. **Database**: Uses MongoDB Atlas (cloud), no local MongoDB needed
2. **Hot Reload**: Both frontend and backend support hot reload
3. **API Testing**: Use Postman or curl to test API endpoints
4. **Token Testing**: Check localStorage in browser DevTools
5. **Network Tab**: Use browser DevTools Network tab to inspect API calls

## Next Steps

1. Explore the dashboard at http://localhost:3000/admin/dashboard
2. View products at http://localhost:3000/products
3. Add products at http://localhost:3000/admin/products
4. Check the API documentation in `BACKEND_FRONTEND_SETUP.md`

## Need Help?

- Check the browser console (F12) for frontend errors
- Check the backend terminal for server errors
- Review `BACKEND_FRONTEND_SETUP.md` for detailed API documentation
- Check MongoDB Atlas dashboard if database issues occur



