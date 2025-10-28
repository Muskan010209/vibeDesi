# Server Architecture - vibeDesi

## 📁 New Architecture Structure

```
server/
├── config/
│   ├── database.js      # MongoDB connection
│   └── jwt.js          # JWT configuration
├── controllers/
│   ├── authController.js    # Authentication controllers
│   ├── productController.js # Product controllers
│   └── adminController.js    # Admin controllers
├── dao/                # Data Access Objects
│   ├── productDAO.js
│   ├── userDAO.js
│   └── orderDAO.js
├── middleware/
│   ├── auth.js         # Authentication & authorization
│   └── errorHandler.js # Error handling
├── models/
│   ├── Product.js      # Product model
│   ├── User.js         # User model (with roles)
│   └── Order.js        # Order model
├── routes/
│   ├── auth.js         # Auth routes
│   ├── products.js     # Product routes
│   └── admin.js        # Admin routes (protected)
├── services/
│   ├── authService.js  # Auth business logic
│   └── productService.js # Product business logic
├── utils/
│   ├── generateToken.js   # JWT token generation
│   └── asyncHandler.js    # Async error handling
└── index.js           # Main server file
```

## 🏗️ Architecture Layers

### 1. **Controllers Layer**
- Handle HTTP requests
- Call services
- Return responses
- Located in `controllers/`

### 2. **Services Layer**
- Business logic
- Call DAOs
- Handle complex operations
- Located in `services/`

### 3. **DAO Layer (Data Access Objects)**
- Database operations
- CRUD operations
- Query building
- Located in `dao/`

### 4. **Models Layer**
- Database schemas
- Mongoose models
- Located in `models/`

### 5. **Middleware Layer**
- Authentication
- Authorization
- Error handling
- Located in `middleware/`

## 🔐 Authentication & Authorization

### User Roles
- **user**: Regular customer
- **admin**: Admin access

### Protected Routes
```javascript
// Middleware usage
router.use('/admin', protect, restrictTo('admin'));
```

## 📊 Features

### Admin Dashboard
- Dashboard stats
- User management
- Product management
- Order management
- Charts & analytics

### Authentication
- Register/Login
- JWT tokens
- Role-based access
- Protected routes

## 🚀 API Routes

### Auth Routes
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Admin Routes
- `GET /api/admin/stats` - Dashboard stats (admin)
- `GET /api/admin/users` - All users (admin)
- `DELETE /api/admin/users/:id` - Delete user (admin)

## 🎯 React Admin Panel

### Pages
- `src/pages/admin/Dashboard.jsx` - Analytics dashboard
- `src/pages/admin/AdminLogin.jsx` - Admin login
- `src/pages/admin/Products.jsx` - Product management

### Features
- Interactive charts (Recharts)
- User statistics
- Order statistics
- Product management
- Real-time data

## 🔧 Environment Variables

Create `server/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
```

## 📦 Installation

```bash
# Server dependencies
cd server
npm install

# Add to package.json if needed
npm install bcryptjs jsonwebtoken --save

# Frontend admin dependencies
npm install recharts --save
```

## 🎨 Admin Dashboard Features

### Charts
- **Pie Chart**: Products by category
- **Bar Chart**: Order status
- **Line Chart**: Revenue over time

### Statistics Cards
- Total users
- Total orders
- Total revenue
- Total products

### Data Management
- View all products
- Edit products
- Delete products
- View user stats
- Manage orders

## 🛡️ Security

- JWT authentication
- Password hashing (bcrypt)
- Protected admin routes
- Role-based access control
- Error handling middleware

## 📝 Usage

### Start Server
```bash
cd server
npm run dev
```

### Admin Login
Visit: `http://localhost:3000/admin/login`
- Email: admin@vibedesi.com
- Password: admin123 (create this user first)

### Dashboard Access
Visit: `http://localhost:3000/admin/dashboard`

## ✨ Benefits

1. **Separation of Concerns** - Clear layer separation
2. **Maintainability** - Easy to update
3. **Scalability** - Easy to add features
4. **Security** - Role-based access
5. **Analytics** - Comprehensive dashboard

---

**Modern architecture with MVC pattern, DAO layer, and comprehensive admin panel!** 🚀

