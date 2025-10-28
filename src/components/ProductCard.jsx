import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ShoppingCart, Heart, Star, Sparkles } from 'lucide-react'
import { addToCart } from '../store/slices/cartSlice'
import { addToWishlist } from '../store/slices/wishlistSlice'
import { useState } from 'react'
import SafeImage from './SafeImage'

export default function ProductCard({ product }) {
    const dispatch = useDispatch()
    const wishlistItems = useSelector(state => state.wishlist.items)
    const [isHovered, setIsHovered] = useState(false)

    // Mouse position tracking for 3D effect
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Transform mouse position for 3D rotation
    const rotateX = useTransform(y, [-0.5, 0.5], [15, -15])
    const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15])

    const isInWishlist = wishlistItems.includes(product._id)

    const handleAddToCart = (e) => {
        e.preventDefault()
        dispatch(addToCart({ productId: product._id, quantity: 1, size: 'M', color: product.colors[0] }))
    }

    const handleWishlist = (e) => {
        e.preventDefault()
        dispatch(addToWishlist(product._id))
    }

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((event.clientX - centerX) / (rect.width / 2))
        y.set((event.clientY - centerY) / (rect.height / 2))
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const discountedPrice = product.price - (product.price * product.discount / 100)

    return (
        <motion.div
            className="relative group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
        >
            <motion.div
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden h-full border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <Link to={`/products/${product._id}`} className="block relative">
                    {/* Image Container with Glow Effect */}
                    <div className="relative overflow-hidden h-72 bg-gradient-to-br from-purple-100 to-pink-100">
                        <motion.div whileHover={{ scale: 1.15, rotate: 2 }} transition={{ duration: 0.5 }}>
                            <SafeImage
                                src={product.images?.[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Animated gradient overlay */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent"
                            animate={{
                                background: [
                                    'linear-gradient(to top, rgba(168,85,247,0.2) 0%, transparent 100%)',
                                    'linear-gradient(to top, rgba(236,72,153,0.2) 0%, transparent 100%)',
                                    'linear-gradient(to top, rgba(168,85,247,0.2) 0%, transparent 100%)',
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        {/* Discount Badge with animation */}
                        {product.discount > 0 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="absolute top-3 left-3"
                            >
                                <div className="relative">
                                    <motion.div
                                        className="absolute inset-0 bg-primary blur-lg opacity-50"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <span className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                        <Sparkles size={14} className="inline mr-1" />
                                        {product.discount}% OFF
                                    </span>
                                </div>
                            </motion.div>
                        )}

                        {/* Action buttons with slide animation */}
                        <motion.div
                            className="absolute top-3 right-3 flex flex-col gap-2"
                            initial={{ opacity: 0, x: 20 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.15, rotate: [0, -10, 10, -10, 0] }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleAddToCart}
                                className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all"
                            >
                                <ShoppingCart size={20} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.15, rotate: [0, 15, -15, 15, 0] }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleWishlist}
                                className={`bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl transition-all ${isInWishlist
                                    ? 'text-pink-600 bg-pink-50'
                                    : 'hover:text-pink-600'
                                    }`}
                            >
                                <Heart
                                    size={20}
                                    fill={isInWishlist ? 'currentColor' : 'none'}
                                />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                        <motion.h3
                            className="font-bold text-xl mb-2 line-clamp-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                            whileHover={{ x: 5 }}
                        >
                            {product.name}
                        </motion.h3>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                className="flex items-center"
                            >
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={
                                            i < Math.floor(product.rating)
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                        }
                                    />
                                ))}
                            </motion.div>
                            <span className="text-sm ml-2 text-gray-600">({product.reviewCount})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-end justify-between mb-4">
                            <div>
                                <motion.div
                                    className="flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        ₹{discountedPrice}
                                    </span>
                                    {product.discount > 0 && (
                                        <span className="text-gray-400 line-through text-sm">
                                            ₹{product.price}
                                        </span>
                                    )}
                                </motion.div>
                            </div>
                            <motion.span
                                className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 rounded-full text-xs font-semibold capitalize"
                                whileHover={{ scale: 1.1 }}
                            >
                                {product.category}
                            </motion.span>
                        </div>

                    </div>
                </Link>

                {/* Add to Cart Button - Outside Link */}
                <div className="px-5 pb-5">
                    <motion.button
                        onClick={handleAddToCart}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <ShoppingCart size={20} />
                        Add to Cart
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    )
}

