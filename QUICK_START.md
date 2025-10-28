# vibeDesi - Quick Start Guide

Get your Rajasthani ethnic clothing e-commerce site up and running in 5 minutes!

## Quick Start Commands

### 1. Install Dependencies

**Frontend (React):**
```bash
npm install
```

**Backend (Node.js):**
```bash
cd server
npm install
cd ..
```

### 2. Start MongoDB

Make sure MongoDB is running on your system.

**Windows:**
```bash
# If installed as a service, it should auto-start
# Or manually start it
net start MongoDB
```

### 3. Seed the Database (Optional)

Populate your database with sample products:
```bash
cd server
npm run seed
cd ..
```

### 4. Run the Application

**Method 1: Using PowerShell Script (Windows)**
```powershell
.\start.ps1
```

**Method 2: Manual Start**

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

### 5. Open in Browser

Navigate to: **http://localhost:3000**

## 🎉 You're All Set!

Your vibeDesi application is now running:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## What's Included?

✅ Beautiful homepage with hero section  
✅ Product catalog with filters  
✅ Category-wise shopping (Kurtis, Dupatta Sets, etc.)  
✅ Product detail pages  
✅ Shopping cart functionality  
✅ Wishlist feature  
✅ Responsive design  
✅ Smooth animations  

## First Steps

1. **Browse Products** - Check out the ethnic wear collection
2. **Add to Cart** - Click on any product to view details
3. **Filter Products** - Use the filters to find specific items
4. **Test Cart** - Add multiple items and view your cart
5. **Try Wishlist** - Save your favorite items

## Troubleshooting

### MongoDB Not Running?
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

### Port Already in Use?
Edit the port in `vite.config.js` (frontend) or `server/index.js` (backend)

### Module Errors?
```bash
rm -rf node_modules package-lock.json
npm install
cd server
rm -rf node_modules package-lock.json
npm install
cd ..
```

## Need Help?

Check out the full documentation:
- `README.md` - Complete project documentation
- `SETUP.md` - Detailed setup instructions

Enjoy shopping at vibeDesi! 🛍️👗


