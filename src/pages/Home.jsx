import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star, TrendingUp, Sparkles, Crown, Heart as HeartIcon, Truck, Shield, RefreshCw, Award, Users, Clock } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react'
import { useProducts } from '../hooks/useProducts'

export default function Home() {
    const products = useSelector(state => state.products.items)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 300], [0, 100])

    useProducts()
    const featuredProducts = products.slice(0, 4)

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const categories = [
        { name: 'Kurtis', image: 'https://images.unsplash.com/photo-1596755389378-c31cbec6be2f?w=300', link: '/products?category=kurti' },
        { name: 'Dupatta Sets', image: 'https://images.unsplash.com/photo-1618354691373-d851c3c3a0f2?w=300', link: '/products?category=dupatta-set' },
        { name: 'Salwar Suits', image: 'https://images.unsplash.com/photo-1506629905617-5f8e7e2a9a6c?w=300', link: '/products?category=salwar-suit' },
        { name: 'Combo Sets', image: 'https://images.unsplash.com/photo-1602810319071-f81e9f8e4a2a?w=300', link: '/products?category=combo-set' },
    ]

    const features = [
        { icon: '✓', title: 'Authentic Rajasthani Designs', desc: 'Traditional patterns and motifs' },
        { icon: '✓', title: 'Premium Quality', desc: 'Fine fabrics and craftsmanship' },
        { icon: '✓', title: 'Easy Returns', desc: '30-day return policy' },
        { icon: '✓', title: 'Free Shipping', desc: 'On orders above ₹999' },
    ]

    return (
        <div>
            {/* Hero Section with Parallax */}
            <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white overflow-hidden min-h-[90vh] flex items-center">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute rounded-full blur-3xl opacity-20"
                        animate={{
                            x: mousePosition.x - 200,
                            y: mousePosition.y - 200,
                        }}
                        transition={{ type: "spring", stiffness: 50 }}
                        style={{
                            width: 400,
                            height: 400,
                            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                        }}
                    />
                    <motion.div
                        className="absolute rounded-full blur-3xl opacity-10"
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        style={{
                            width: 600,
                            height: 600,
                            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                            top: -200,
                            right: -200,
                        }}
                    />
                </div>

                <motion.div
                    className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
                    style={{ y }}
                >
                    <div className="max-w-4xl">
                        {/* Decorative Icons */}
                        <motion.div
                            className="flex gap-4 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Crown className="text-yellow-300 animate-bounce" size={32} />
                            <Sparkles className="text-pink-300" size={32} />
                            <Star className="text-yellow-300 fill-current" size={32} />
                        </motion.div>

                        <motion.h1
                            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            Embrace{' '}
                            <span className="relative inline-block">
                                <motion.span
                                    animate={{
                                        backgroundPosition: ['0%', '100%'],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                    className="relative bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"
                                    style={{
                                        backgroundSize: '200% auto',
                                    }}
                                >
                                    Heritage
                                </motion.span>
                                <motion.div
                                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                />
                            </span>
                            <br />
                            with <span className="text-yellow-300 relative">
                                vibeDesi
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-yellow-300/50 to-orange-300/50 blur-sm"
                                    animate={{ scaleX: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-2xl mb-10 text-white/90 max-w-2xl"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Discover exquisite Rajasthani ethnic wear that blends tradition with <strong>modern elegance</strong>
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link to="/products">
                                <motion.button
                                    whileHover={{ scale: 1.05, rotate: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg inline-flex items-center gap-2 shadow-2xl"
                                >
                                    <span>Shop Collection</span>
                                    <ArrowRight />
                                </motion.button>
                            </Link>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg inline-flex items-center gap-2"
                            >
                                <HeartIcon className="fill-white" size={20} />
                                <span>Explore</span>
                            </motion.button>
                        </motion.div>

                        {/* Floating Stats */}
                        <motion.div
                            className="grid grid-cols-3 gap-6 mt-12 mb-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            {[
                                { num: '10K+', label: 'Happy Customers' },
                                { num: '500+', label: 'Products' },
                                { num: '4.8★', label: 'Rating' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1 + i * 0.1 }}
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                                >
                                    <div className="text-3xl font-bold">{stat.num}</div>
                                    <div className="text-sm text-white/80">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Categories Section with 3D Card Effect */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                {/* Decorative gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 opacity-50"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="text-center mb-16"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.h2
                                className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                                initial={{ scale: 0.9 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Shop by Category
                            </motion.h2>
                            <p className="text-xl text-gray-600">Explore our diverse collection</p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {categories.map((category, index) => (
                                <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, y: 50, rotateY: -15 }}
                                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    whileHover={{
                                        scale: 1.05,
                                        rotateY: 5,
                                        z: 50
                                    }}
                                    style={{ perspective: '1000px' }}
                                >
                                    <Link to={category.link} className="block relative group">
                                        <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-square bg-gradient-to-br from-purple-100 to-pink-100">
                                            <motion.div
                                                whileHover={{ scale: 1.2, rotate: 5 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-pink-700/40 to-transparent"></div>

                                            {/* Content */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <motion.h3
                                                    className="text-2xl font-bold text-white mb-2"
                                                    whileHover={{ x: 10 }}
                                                >
                                                    {category.name}
                                                </motion.h3>
                                                <motion.div
                                                    className="flex items-center gap-2 text-white"
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    <span className="text-sm">Explore Collection</span>
                                                    <ArrowRight size={16} />
                                                </motion.div>
                                            </div>

                                            {/* Shine effect */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                animate={{ x: ['-100%', '200%'] }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                                style={{ width: '30%', transform: 'skewX(-20deg)' }}
                                            />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold">Trending Now</h2>
                        <Link to="/products" className="text-primary hover:underline flex items-center space-x-2">
                            <span>View All</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                className="text-center p-6 rounded-lg bg-gradient-to-br from-red-50 to-orange-50"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-4xl mb-4">✓</div>
                                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-gradient-to-r from-orange-100 to-red-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-8">Why Choose vibeDesi?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div>
                                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <TrendingUp size={32} className="text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Trending Designs</h3>
                                <p className="text-gray-600">Latest in ethnic fashion</p>
                            </div>
                            <div>
                                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Star size={32} className="text-secondary" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
                                <p className="text-gray-600">Only the finest materials</p>
                            </div>
                            <div>
                                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-3xl text-primary">❤️</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2">Customer Love</h3>
                                <p className="text-gray-600">10000+ happy customers</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Our Services
                        </h2>
                        <p className="text-xl text-gray-600">Everything you need for a perfect shopping experience</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Truck size={40} />, title: 'Free Shipping', desc: 'On orders above ₹999', color: 'from-blue-500 to-blue-600' },
                            { icon: <Shield size={40} />, title: 'Secure Payment', desc: '100% safe transactions', color: 'from-green-500 to-green-600' },
                            { icon: <RefreshCw size={40} />, title: 'Easy Returns', desc: '30-day return policy', color: 'from-purple-500 to-purple-600' },
                            { icon: <Award size={40} />, title: 'Quality Assured', desc: 'Premium materials only', color: 'from-orange-500 to-orange-600' }
                        ].map((service, index) => (
                            <motion.div
                                key={service.title}
                                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-200 transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${service.color} text-white mb-6`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                <p className="text-gray-600">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            What Our Customers Say
                        </h2>
                        <p className="text-xl text-gray-600">Real reviews from real customers</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Priya Sharma', location: 'Mumbai', rating: 5, text: 'Absolutely love the quality and designs! The kurtis are so comfortable and beautiful.' },
                            { name: 'Anjali Patel', location: 'Delhi', rating: 5, text: 'Fast delivery and excellent customer service. Will definitely order again!' },
                            { name: 'Riya Singh', location: 'Bangalore', rating: 5, text: 'The dupatta sets are stunning. Perfect for special occasions.' }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                className="bg-white p-8 rounded-2xl shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={20} className="text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{testimonial.name}</h4>
                                        <p className="text-gray-500 text-sm">{testimonial.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
                        <p className="text-xl mb-8 text-white/90">Get the latest updates on new collections and exclusive offers</p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            {/* <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 text-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: <Users size={40} />, number: '10K+', label: 'Happy Customers' },
                            { icon: <Award size={40} />, number: '500+', label: 'Products' },
                            { icon: <Star size={40} />, number: '4.8★', label: 'Average Rating' },
                            { icon: <Clock size={40} />, number: '24/7', label: 'Customer Support' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="p-6"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-purple-400 mb-4 flex justify-center">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}
        </div>
    )
}

