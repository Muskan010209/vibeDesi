# How to See Your Dashboard 📊

Follow these simple steps to access your vibeDesi admin dashboard:

## Quick Start (3 Steps)

### Step 1: Create Admin User

Open a terminal in the `server` directory:

```powershell
cd server
npm run create-admin
cd ..
```

You should see:
```
✓ Admin user created successfully!
Email: admin@vibedesi.com
Password: admin123
```

### Step 2: Seed Products (Optional but Recommended)

For the dashboard to show data, seed the database:

```powershell
cd server
npm run seed-images
cd ..
```

This will add 15 products with optimized images to your database.

### Step 3: Start Both Servers

```powershell
.\start.ps1
```

This will start:
- Backend server on **port 5000**
- Frontend dev server on **port 3000**

## Access the Dashboard

### Option A: Direct Access
1. Open your browser
2. Go to: **http://localhost:3000/admin/login**
3. Login with:
   - **Email**: `admin@vibedesi.com`
   - **Password**: `admin123`
4. You'll be redirected to the dashboard automatically!

### Option B: From Homepage
1. Go to: **http://localhost:3000**
2. Click on "Admin" in the navigation (if available)
3. Or directly go to **/admin/login**

## What You'll See in the Dashboard

### 📊 Statistics Cards
- **Total Users**: Number of registered users
- **Total Orders**: All orders placed
- **Revenue**: Total revenue generated
- **Total Products**: Products in database

### 📈 Charts
- **Products by Category**: Pie chart showing distribution
- **Order Status**: Bar chart with pending/completed orders
- **User Statistics**: Breakdown of users
- **Top Products**: Highest value products

### 🎨 Beautiful UI
- Gradient color schemes
- Smooth animations (Framer Motion)
- Responsive design
- Real-time data from MongoDB

## Troubleshooting

### "Cannot GET /admin/stats"
**Problem**: Backend not running  
**Solution**: Start backend with `cd server && npm run dev`

### "401 Unauthorized"
**Problem**: No valid token or expired session  
**Solution**: Login again at `/admin/login`

### "No data available"
**Problem**: Database is empty  
**Solution**: Run `cd server && npm run seed-images`

### Dashboard shows loading forever
**Problem**: Backend API not responding  
**Solution**: Check if backend is running on port 5000

## Manual Server Start

If `start.ps1` doesn't work, manually open 2 terminals:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Testing API Endpoint

To verify backend is working:

```bash
curl http://localhost:5000/api/products
```

Should return JSON with products array.

## Video Walkthrough

After starting the servers:

1. **Open**: http://localhost:3000/admin/login
2. **Login**: admin@vibedesi.com / admin123
3. **Dashboard**: Automatically loads at http://localhost:3000/admin/dashboard
4. **View**: Real-time statistics and charts

## Key Files

- **Dashboard Component**: `src/pages/admin/Dashboard.jsx`
- **Admin Login**: `src/pages/admin/AdminLogin.jsx`
- **Backend API**: `server/routes/admin.js`
- **Dashboard Controller**: `server/controllers/adminController.js`

## Next Steps After Dashboard

1. ✅ View dashboard statistics
2. Explore all charts and visualizations
3. Manage products (visit Products page)
4. View all users and orders
5. Monitor revenue and sales

## Features Added

Your dashboard now includes:
- ✅ Real-time data fetching from backend
- ✅ Beautiful statistics cards
- ✅ Interactive charts (Recharts)
- ✅ Order tracking
- ✅ User analytics
- ✅ Product management

Enjoy your vibeDesi dashboard! 🎉





