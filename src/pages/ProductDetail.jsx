import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Truck, Shield, RefreshCw, Package } from 'lucide-react'
import { addToCart } from '../store/slices/cartSlice'
import axios from 'axios'
import SafeImage from '../components/SafeImage'

export default function ProductDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        fetchProduct()
    }, [id])

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`/api/products/${id}`)
            setProduct(res.data)
            setSelectedSize(res.data.size[0])
            setSelectedColor(res.data.colors[0])
        } catch (error) {
            console.error('Error fetching product:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert('Please select size and color')
            return
        }
        dispatch(addToCart({ productId: product._id, quantity, size: selectedSize, color: selectedColor }))
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Product not found</div>
    }

    const discountedPrice = product.price - (product.price * product.discount / 100)

    return (
        <motion.div
            className="min-h-screen bg-gray-50 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div>
                        <div className="mb-4 rounded-lg overflow-hidden">
                            <SafeImage
                                src={product.images?.[selectedImage]}
                                alt={product.name}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, index) => (
                                    <SafeImage
                                        key={index}
                                        src={img}
                                        alt={`${product.name} ${index + 1}`}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all ${index === selectedImage ? 'ring-4 ring-primary' : 'opacity-70 hover:opacity-100'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                        <div className="flex items-center mb-4">
                            <Star className="text-yellow-400 fill-current" size={24} />
                            <span className="text-xl ml-2 font-semibold">{product.rating}</span>
                            <span className="text-gray-500 ml-2">({product.reviewCount} reviews)</span>
                        </div>

                        <div className="mb-6">
                            <span className="text-4xl font-bold text-primary mr-3">₹{discountedPrice}</span>
                            {product.discount > 0 && (
                                <>
                                    <span className="text-2xl text-gray-500 line-through mr-3">₹{product.price}</span>
                                    <span className="text-green-600 font-semibold text-xl">{product.discount}% OFF</span>
                                </>
                            )}
                        </div>

                        <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Size</h3>
                            <div className="flex gap-2">
                                {product.size.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-2 border-2 rounded-lg font-semibold transition-all ${selectedSize === size
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-gray-300 hover:border-primary'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Color</h3>
                            <div className="flex gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-6 py-2 border-2 rounded-lg font-semibold transition-all ${selectedColor === color
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-gray-300 hover:border-primary'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 border-2 border-gray-300 rounded-lg font-bold hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="text-2xl font-bold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 border-2 border-gray-300 rounded-lg font-bold hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddToCart}
                                className="btn-primary flex-1 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all"
                            >
                                Buy Now
                            </motion.button>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-2 gap-4 border-t pt-6">
                            <div className="flex items-center gap-3">
                                <Truck className="text-primary" size={24} />
                                <div>
                                    <p className="font-semibold">Free Shipping</p>
                                    <p className="text-sm text-gray-600">On orders above ₹999</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="text-primary" size={24} />
                                <div>
                                    <p className="font-semibold">Secure Payment</p>
                                    <p className="text-sm text-gray-600">100% secure</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <RefreshCw className="text-primary" size={24} />
                                <div>
                                    <p className="font-semibold">Easy Returns</p>
                                    <p className="text-sm text-gray-600">30-day return policy</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Package className="text-primary" size={24} />
                                <div>
                                    <p className="font-semibold">Quality Assured</p>
                                    <p className="text-sm text-gray-600">Premium materials</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Product Details</h3>
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                                <span className="text-gray-600">Material:</span>
                                <span className="font-semibold">{product.material}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-600">Care Instructions:</span>
                                <span className="font-semibold">{product.careInstructions}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-600">Availability:</span>
                                <span className={product.inStock ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

