import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Heart, Menu, X, Search, User } from 'lucide-react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const cartCount = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0))

    return (
        <motion.nav
            className="bg-white/80 backdrop-blur-xl shadow-md sticky top-0 z-50 border-b border-gray-100"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Animated gradient line */}
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo with animated gradient */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                            whileTap={{ scale: 0.9 }}
                            className="relative"
                        >
                            <motion.h1
                                className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ['0%', '100%'],
                                }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                style={{
                                    backgroundSize: '200% auto',
                                }}
                            >
                                vibe<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">Desi</span>
                            </motion.h1>
                            <motion.div
                                className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg blur opacity-20 group-hover:opacity-40"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {[
                            { name: 'Home', to: '/' },
                            { name: 'Products', to: '/products' },
                            { name: 'Kurtis', to: '/products?category=kurti' },
                            { name: 'Dupatta Sets', to: '/products?category=dupatta-set' },
                            { name: 'Salwar Suits', to: '/products?category=salwar-suit' },
                            { name: 'Combo Sets', to: '/products?category=combo-set' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                to={item.to}
                                className="relative px-4 py-2 group"
                            >
                                <span className="relative text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 font-medium transition-all duration-300">
                                    {item.name}
                                </span>
                                <motion.div
                                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search for ethnic wear..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const params = new URLSearchParams()
                                        if (searchQuery.trim()) params.set('search', searchQuery.trim())
                                        navigate(`/products?${params.toString()}`)
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    const params = new URLSearchParams()
                                    if (searchQuery.trim()) params.set('search', searchQuery.trim())
                                    navigate(`/products?${params.toString()}`)
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm bg-primary text-white rounded-md"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-2">
                        <motion.button
                            className="relative p-2 rounded-full hover:bg-purple-100 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <User size={24} className="text-gray-700" />
                        </motion.button>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-pink-100 transition-colors block">
                                <Heart size={24} className="text-gray-700" />
                                <motion.div
                                    className="absolute inset-0 bg-pink-200 rounded-full"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1.5, opacity: 0.3 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link to="/cart" className="relative p-2 rounded-full hover:bg-purple-100 transition-colors block">
                                <ShoppingCart size={24} className="text-gray-700" />
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        whileHover={{ scale: 1.2 }}
                                        className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                                <motion.div
                                    className="absolute inset-0 bg-purple-200 rounded-full"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1.5, opacity: 0.3 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </Link>
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-2">
                                <Link to="/" className="block px-4 py-2 hover:bg-gray-100 rounded">Home</Link>
                                <Link to="/products" className="block px-4 py-2 hover:bg-gray-100 rounded">Products</Link>
                                <Link to="/products?category=kurti" className="block px-4 py-2 hover:bg-gray-100 rounded">Kurtis</Link>
                                <Link to="/products?category=dupatta-set" className="block px-4 py-2 hover:bg-gray-100 rounded">Dupatta Sets</Link>
                                <Link to="/products?category=salwar-suit" className="block px-4 py-2 hover:bg-gray-100 rounded">Salwar Suits</Link>
                                <Link to="/products?category=combo-set" className="block px-4 py-2 hover:bg-gray-100 rounded">Combo Sets</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}

