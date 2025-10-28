import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import ProtectedRoute from './components/ProtectedRoute'
import { store } from './store/store'
import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Router>
                    <div className="min-h-screen flex flex-col">
                        <Routes>
                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route path="/admin/dashboard" element={<Dashboard />} />
                            <Route path="/admin/products" element={<AdminProducts />} />

                            {/* Public Routes */}
                            <Route path="*" element={
                                <>
                                    <Navbar />
                                    <motion.main
                                        className="flex-grow"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Routes>
                                            <Route path="/" element={<Home />} />
                                            <Route path="/products" element={<Products />} />
                                            <Route path="/categories" element={<Categories />} />
                                            <Route path="/products/:id" element={<ProductDetail />} />
                                            <Route path="/cart" element={
                                                <ProtectedRoute>
                                                    <Cart />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/checkout" element={
                                                <ProtectedRoute>
                                                    <Checkout />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/order-success/:orderId" element={
                                                <ProtectedRoute>
                                                    <OrderSuccess />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/wishlist" element={
                                                <ProtectedRoute>
                                                    <Wishlist />
                                                </ProtectedRoute>
                                            } />
                                        </Routes>
                                    </motion.main>
                                    <Footer />
                                </>
                            } />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </Provider>
    )
}

export default App

