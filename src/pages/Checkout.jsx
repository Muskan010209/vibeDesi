import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { CreditCard, MapPin, Lock, ArrowLeft } from 'lucide-react'
import api from '../utils/axios'
import { Link } from 'react-router-dom'
import { clearCart } from '../store/slices/cartSlice'

export default function Checkout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items)
    const [loading, setLoading] = useState(false)
    const [cartProducts, setCartProducts] = useState([])
    const [formData, setFormData] = useState({
        shippingAddress: {
            street: '',
            city: '',
            state: '',
            pincode: '',
            country: 'India'
        },
        paymentMethod: 'cash'
    })

    useEffect(() => {
        fetchCartProducts()
    }, [])

    const fetchCartProducts = async () => {
        try {
            const products = await Promise.all(
                cartItems.map(async (item) => {
                    const res = await api.get(`/products/${item.productId}`)
                    return { ...res.data.data, size: item.size, color: item.color, quantity: item.quantity }
                })
            )
            setCartProducts(products)
        } catch (error) {
            console.error('Error fetching cart products:', error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name.includes('.')) {
            const [parent, child] = name.split('.')
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value
                }
            })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.shippingAddress.street || !formData.shippingAddress.city ||
            !formData.shippingAddress.state || !formData.shippingAddress.pincode) {
            alert('Please fill in all shipping address fields')
            return
        }

        setLoading(true)

        try {
            const items = cartProducts.map(item => ({
                product: item._id,
                quantity: item.quantity,
                price: item.price - (item.price * item.discount / 100),
                size: item.size,
                color: item.color
            }))

            const orderData = {
                items,
                shippingAddress: formData.shippingAddress,
                paymentMethod: formData.paymentMethod
            }

            const res = await api.post('/orders', orderData)

            // Clear cart
            dispatch(clearCart())

            // Redirect to order success
            navigate(`/order-success/${res.data.data._id}`)
        } catch (error) {
            console.error('Error creating order:', error)
            alert('Failed to create order. Please try again.')
        } finally {
            setLoading(false)
        }
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
                <Link to="/cart" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6">
                    <ArrowLeft size={20} />
                    Back to Cart
                </Link>

                <h1 className="text-4xl font-bold mb-8">Checkout</h1>

                {cartProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-600 text-lg">Your cart is empty</p>
                        <Link to="/products" className="btn-primary inline-flex items-center gap-2 mt-4">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Order Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg shadow-md p-6 mb-6"
                            >
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <MapPin className="text-primary" size={28} />
                                    Shipping Address
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Street Address *
                                            </label>
                                            <input
                                                type="text"
                                                name="shippingAddress.street"
                                                value={formData.shippingAddress.street}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                                                placeholder="123 Main Street"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    City *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="shippingAddress.city"
                                                    value={formData.shippingAddress.city}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    State *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="shippingAddress.state"
                                                    value={formData.shippingAddress.state}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Pincode *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="shippingAddress.pincode"
                                                    value={formData.shippingAddress.pincode}
                                                    onChange={handleChange}
                                                    required
                                                    pattern="[0-9]{6}"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    name="shippingAddress.country"
                                                    value={formData.shippingAddress.country}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                                Payment Method
                                            </label>
                                            <div className="space-y-3">
                                                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="cash"
                                                        checked={formData.paymentMethod === 'cash'}
                                                        onChange={handleChange}
                                                        className="h-4 w-4"
                                                    />
                                                    <span className="flex-1 font-medium">Cash on Delivery</span>
                                                </label>

                                                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="upi"
                                                        checked={formData.paymentMethod === 'upi'}
                                                        onChange={handleChange}
                                                        className="h-4 w-4"
                                                    />
                                                    <span className="flex-1 font-medium">UPI</span>
                                                </label>

                                                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="card"
                                                        checked={formData.paymentMethod === 'card'}
                                                        onChange={handleChange}
                                                        className="h-4 w-4"
                                                    />
                                                    <span className="flex-1 font-medium">Card</span>
                                                </label>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Lock size={20} />
                                                    Place Order
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg shadow-md p-6 sticky top-24"
                            >
                                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    {cartProducts.map(item => {
                                        const price = item.price - (item.price * item.discount / 100)
                                        return (
                                            <div key={item._id} className="flex gap-4 pb-4 border-b">
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm">{item.name}</p>
                                                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                                                    <p className="text-primary font-bold">₹{price * item.quantity}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-semibold">₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-green-600 font-semibold">Free</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-xl font-bold">
                                            <span>Total</span>
                                            <span className="text-primary">₹{subtotal}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600 flex items-center gap-2">
                                    <Lock size={16} />
                                    Your payment information is secure
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}





