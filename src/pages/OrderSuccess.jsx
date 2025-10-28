import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Home, Receipt } from 'lucide-react'
import api from '../utils/axios'

export default function OrderSuccess() {
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (orderId) {
            fetchOrder()
        } else {
            setLoading(false)
        }
    }, [orderId])

    const fetchOrder = async () => {
        try {
            const res = await api.get(`/orders/${orderId}`)
            setOrder(res.data.data)
        } catch (error) {
            console.error('Error fetching order:', error)
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
            className="min-h-screen bg-gray-50 py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                    >
                        <CheckCircle className="mx-auto text-green-500" size={80} />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold mt-6 mb-4"
                    >
                        Order Placed Successfully!
                    </motion.h1>

                    {order && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 space-y-2"
                        >
                            <p className="text-gray-600">
                                Order ID: <span className="font-semibold">{order._id}</span>
                            </p>
                            <p className="text-gray-600">
                                Total Amount: <span className="font-semibold text-primary text-xl">₹{order.totalAmount}</span>
                            </p>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                        >
                            <Home size={20} />
                            Continue Shopping
                        </Link>

                        <Link
                            to="/products"
                            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            <Package size={20} />
                            View Products
                        </Link>
                    </motion.div>
                </div>

                <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Receipt size={24} className="text-primary" />
                        What's Next?
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-3">
                            <span className="text-primary font-bold">1.</span>
                            <span>You will receive an order confirmation email shortly</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary font-bold">2.</span>
                            <span>We'll notify you when your order ships</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary font-bold">3.</span>
                            <span>Expected delivery: 5-7 business days</span>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}




