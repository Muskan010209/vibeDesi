# vibeDesi - Rajasthani Ethnic Clothing E-Commerce Platform

A modern, beautiful e-commerce platform for Rajasthani ethnic clothing featuring kurtis, dupatta sets, salwar suits, and combo sets. Built with React, Node.js, MongoDB, and styled with Tailwind CSS with animations.

## Features

- 🛍️ **Product Catalog**: Browse by categories (Kurtis, Dupatta Sets, Salwar Suits, Combo Sets)
- 🎨 **Modern UI**: Beautiful, responsive design with animations
- 🛒 **Shopping Cart**: Add, update, and remove items
- ❤️ **Wishlist**: Save favorite items
- 🔍 **Search & Filters**: Search products and filter by price, category, etc.
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Fast Performance**: Optimized with React and Framer Motion
- 🎭 **Animations**: Smooth transitions and interactions

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Framer Motion (Animations)
- Tailwind CSS
- Vite
- Lucide React (Icons)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs (Authentication)
- JWT (JSON Web Tokens)

## Project Structure

```
vibeDesi/
├── server/
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── wishlist.js
│   │   └── auth.js
│   ├── data/
│   │   └── seedData.js
│   └── index.js
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   └── Wishlist.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas (cloud database - configured)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vibeDesi
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **MongoDB Atlas is already configured** (cloud database)
   - Connection string is configured in `server/index.js`
   - No local MongoDB installation needed

5. **Seed the database** (optional)
   ```bash
   cd server
   node data/seedData.js
   cd ..
   ```

6. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`
   
   **Note:** The app is configured to use MongoDB Atlas (cloud database)

7. **Start the frontend** (in a new terminal)
   ```bash
   npm run dev
   ```
   App will run on `http://localhost:3000`

## Usage

### Browse Products
- Navigate through categories: Kurtis, Dupatta Sets, Salwar Suits, Combo Sets
- Use filters to find specific products
- Search for products by name or description

### Shopping Cart
- Add items to cart with size and color selection
- Update quantities or remove items
- View order summary

### Wishlist
- Save favorite items to wishlist
- Access them later for quick purchase

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- Query params: `category`, `search`, `minPrice`, `maxPrice`, `sort`

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Wishlist
- `GET /api/wishlist` - Get wishlist items
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:id` - Remove from wishlist

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## Environment Variables

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/vibeDesi
JWT_SECRET=your-secret-key
```

## Features in Detail

### Home Page
- Hero section with call-to-action
- Category showcase
- Featured/trending products
- Why choose us section
- Footer with links and social media

### Product Catalog
- Filter by category, price range
- Sort by price, rating, newest
- Responsive grid layout
- Product cards with hover effects

### Product Detail
- Image gallery with zoom
- Size and color selection
- Quantity selector
- Add to cart and buy now
- Product details and specifications

### Cart
- View all cart items
- Update quantities
- Remove items
- Order summary with totals
- Proceed to checkout

## Customization

### Colors
Edit `tailwind.config.js` to change theme colors:
```js
colors: {
  primary: '#c72323',  // Main brand color
  secondary: '#f59e0b', // Accent color
}
```

### Animations
All animations use Framer Motion. Edit components to customize animations.

## Development

- Frontend hot-reloads on save
- Backend restarts on save with nodemon
- MongoDB Compass recommended for database management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Support

For support, email support@vibedesi.com or visit our website.

---

Made with ❤️ for traditional Rajasthani clothing lovers

