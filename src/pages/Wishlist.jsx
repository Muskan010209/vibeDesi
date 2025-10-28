import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Trash2, ArrowRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'

export default function Wishlist() {
    const wishlistItems = useSelector(state => state.wishlist.items)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchWishlistProducts()
    }, [wishlistItems])

    const fetchWishlistProducts = async () => {
        try {
            setLoading(true)
            const productPromises = wishlistItems.map(id =>
                axios.get(`/api/products/${id}`)
            )
            const responses = await Promise.all(productPromises)
            setProducts(responses.map(res => res.data))
        } catch (error) {
            console.error('Error fetching wishlist products:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <motion.div
            className="min-h-screen bg-gray-50 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Heart className="text-primary" size={32} fill="currentColor" />
                        <h1 className="text-4xl font-bold">My Wishlist</h1>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <Heart className="mx-auto text-gray-400" size={64} />
                        <p className="text-gray-600 text-lg mt-4">Your wishlist is empty</p>
                        <Link to="/products" className="btn-primary inline-flex items-center gap-2 mt-4">
                            Start Shopping
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

