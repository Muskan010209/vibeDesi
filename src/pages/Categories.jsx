import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../utils/axios'
import { Sparkles, ShoppingBag } from 'lucide-react'
import SafeImage from '../components/SafeImage'

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories')
            const categoryList = res.data.data
            setCategories(categoryList.map(cat => ({ ...cat, products: [], loading: true })))
            setLoading(false)

            // Fetch products for each category
            for (const category of categoryList) {
                try {
                    const productRes = await api.get(`/products?category=${category.slug}`)
                    setCategories(prev => prev.map(cat =>
                        cat._id === category._id
                            ? { ...cat, products: productRes.data.data.slice(0, 4), loading: false }
                            : cat
                    ))
                } catch (error) {
                    console.error(`Error fetching products for ${category.name}:`, error)
                    setCategories(prev => prev.map(cat =>
                        cat._id === category._id
                            ? { ...cat, loading: false }
                            : cat
                    ))
                }
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
            setLoading(false)
        }
    }


    return (
        <motion.div
            className="min-h-screen bg-gray-50 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="inline-block"
                    >
                        <Sparkles className="text-primary mx-auto mb-4" size={48} />
                    </motion.div>
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Shop by Category
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Discover our curated collections
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-pulse">
                            <div className="bg-gray-300 h-8 rounded mb-4"></div>
                            <div className="bg-gray-300 h-64 rounded"></div>
                        </div>
                    </div>
                ) : categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category._id} className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold">{category.name}</h2>
                                <Link
                                    to={`/products?category=${category.slug}`}
                                    className="text-primary font-semibold hover:underline flex items-center gap-2"
                                >
                                    View All
                                    <ShoppingBag size={20} />
                                </Link>
                            </div>

                            {/* Category Demo Image */}
                            <div className="mb-8">
                                <Link to={`/products?category=${category.slug}`} className="block group">
                                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                                        <SafeImage
                                            src={category.image || '/placeholder-category.jpg'}
                                            alt={`${category.name} Collection`}
                                            className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-6 left-6 text-white">
                                            <h3 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h3>
                                            <p className="text-lg opacity-90">Explore our {category.name.toLowerCase()} collection</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {category.loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="bg-white rounded-lg shadow-md p-4">
                                            <div className="animate-pulse">
                                                <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                                                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : category.products.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {category.products.map((product, index) => (
                                        <motion.div
                                            key={product._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                to={`/products/${product._id}`}
                                                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                                            >
                                                <div className="relative h-64 overflow-hidden">
                                                    <SafeImage
                                                        src={product.images?.[0]}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                    />
                                                    {product.discount > 0 && (
                                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
                                                            -{product.discount}%
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                                        {product.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-2xl font-bold text-primary">
                                                            ₹{product.price - (product.price * product.discount / 100)}
                                                        </span>
                                                        {product.discount > 0 && (
                                                            <span className="text-gray-500 line-through">
                                                                ₹{product.price}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span
                                                                    key={i}
                                                                    className={`text-sm ${i < Math.floor(product.rating)
                                                                        ? 'text-yellow-400'
                                                                        : 'text-gray-300'
                                                                        }`}
                                                                >
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="text-gray-600 text-sm">
                                                            ({product.reviewCount})
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                                    <p className="text-gray-600">No products found in this category</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No categories found</p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}




