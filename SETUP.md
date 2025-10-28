# vibeDesi Setup Guide

This guide will help you set up and run the vibeDesi e-commerce platform.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

## Step-by-Step Setup

### 1. Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd server
npm install
cd ..
```

### 2. Start MongoDB

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or run in a separate terminal:
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

**macOS/Linux:**
```bash
mongod
```

### 3. Seed the Database (Optional but Recommended)

```bash
cd server
npm run seed
cd ..
```

This will populate your database with sample products.

### 4. Start the Application

#### Option A: Run Server and Client Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

#### Option B: Using Two Command Windows

Open two command prompts/terminals:

**First Terminal:**
```bash
cd server
npm run dev
```

**Second Terminal:**
```bash
npm run dev
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## Verify Installation

1. Open your browser and go to `http://localhost:3000`
2. You should see the vibeDesi homepage with featured products
3. Try navigating through categories
4. Add items to cart to test functionality

## Troubleshooting

### MongoDB Connection Error

If you see `MongoDB Connection Error`:

1. **Check if MongoDB is running:**
   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   ```

2. **Verify MongoDB is listening on port 27017**

3. **Check server/index.js** - Update MongoDB URI if needed:
   ```javascript
   mongoose.connect('mongodb://localhost:27017/vibeDesi')
   ```

### Port Already in Use

If port 3000 or 5000 is already in use:

**Change frontend port:**
Edit `vite.config.js`:
```javascript
server: {
  port: 3001,  // Change this
}
```

**Change backend port:**
Edit `server/index.js`:
```javascript
const PORT = process.env.PORT || 5001;  // Change this
```

### Module Not Found Errors

Clear node_modules and reinstall:
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd server
rm -rf node_modules package-lock.json
npm install
cd ..
```

## Development Tips

1. **Hot Reload:** Both frontend and backend support hot reloading
2. **Database Browser:** Use MongoDB Compass to view your database
3. **API Testing:** Use Postman or Thunder Client to test API endpoints

## Next Steps

- Explore the product catalog
- Add items to cart and wishlist
- Test the search and filter functionality
- Customize colors in `tailwind.config.js`
- Add more products through the database

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check the README.md for more information

Happy coding! 🎉


