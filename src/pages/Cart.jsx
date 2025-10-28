import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice'
import api from '../utils/axios'

export default function Cart() {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items)
    const [cartProducts, setCartProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCartProducts()
    }, [cartItems])

    const fetchCartProducts = async () => {
        try {
            setLoading(true)
            const products = await Promise.all(
                cartItems.map(async (item) => {
                    const res = await api.get(`/products/${item.productId}`)
                    return { ...res.data.data, size: item.size, color: item.color, quantity: item.quantity }
                })
            )
            setCartProducts(products)
        } catch (error) {
            console.error('Error fetching cart products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return
        dispatch(updateQuantity({ productId, quantity: newQuantity }))
    }

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const subtotal = cartProducts.reduce((sum, item) => {
        const price = item.price - (item.price * item.discount / 100)
        return sum + (price * item.quantity)
    }, 0)

    const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <motion.div
            className="min-h-screen bg-gray-50 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    </div>
                ) : cartProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <ShoppingBag className="mx-auto text-gray-400" size={64} />
                        <p className="text-gray-600 text-lg mt-4">Your cart is empty</p>
                        <Link to="/products" className="btn-primary inline-flex items-center gap-2 mt-4">
                            Continue Shopping
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartProducts.map((item) => {
                                const price = item.price - (item.price * item.discount / 100)
                                const total = price * item.quantity
                                return (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-white rounded-lg shadow-md p-6"
                                    >
                                        <div className="flex gap-4">
                                            <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <Link to={`/products/${item._id}`}>
                                                    <h3 className="text-xl font-bold hover:text-primary transition-colors">
                                                        {item.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-gray-600 mb-2">{item.category}</p>
                                                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                                                    <span>Size: <span className="font-semibold">{item.size}</span></span>
                                                    <span>Color: <span className="font-semibold">{item.color}</span></span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                                            className="w-8 h-8 border-2 border-gray-300 rounded-lg hover:bg-gray-100"
                                                        >
                                                            <Minus size={16} className="mx-auto" />
                                                        </button>
                                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                                            className="w-8 h-8 border-2 border-gray-300 rounded-lg hover:bg-gray-100"
                                                        >
                                                            <Plus size={16} className="mx-auto" />
                                                        </button>
                                                    </div>

                                                    <div>
                                                        <p className="text-2xl font-bold text-primary">₹{total}</p>
                                                        {item.discount > 0 && (
                                                            <p className="text-sm text-gray-500 line-through">
                                                                ₹{item.price * item.quantity}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleRemove(item._id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <Trash2 size={24} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between">
                                        <span>Items ({totalItems})</span>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Discount</span>
                                        <span className="text-green-600">₹0</span>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between text-2xl font-bold">
                                            <span>Total</span>
                                            <span className="text-primary">₹{subtotal}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/checkout" className="btn-primary w-full mb-4 flex items-center justify-center gap-2">
                                    <ShoppingBag size={20} />
                                    Proceed to Checkout
                                </Link>

                                <Link to="/products" className="text-center text-primary hover:underline block">
                                    Continue Shopping →
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

