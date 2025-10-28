import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, ShoppingCart, DollarSign, Package, Users2 } from 'lucide-react'
import api from '../../utils/axios'
import AdminLayout from '../../components/admin/AdminLayout'

const COLORS = ['#9333EA', '#EC4899', '#F97316', '#10B981']

export default function Dashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const res = await api.get('/admin/stats')
            setStats(res.data.data)
        } catch (error) {
            console.error('Error fetching stats:', error)
            if (error.response?.status === 401 || error.response?.status === 403) {
                window.location.href = '/admin/login'
            }
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!stats) {
        return <div className="p-8">No data available</div>
    }

    const chartData = [
        {
            category: 'Kurtis',
            value: stats.products.byCategory.kurti || 0
        },
        {
            category: 'Dupatta Sets',
            value: stats.products.byCategory['dupatta-set'] || 0
        },
        {
            category: 'Salwar Suits',
            value: stats.products.byCategory['salwar-suit'] || 0
        },
        {
            category: 'Combo Sets',
            value: stats.products.byCategory['combo-set'] || 0
        }
    ]

    const orderData = [
        { name: 'Total', value: stats.orders.totalOrders },
        { name: 'Pending', value: stats.orders.pendingOrders },
        { name: 'Completed', value: stats.orders.completedOrders }
    ]

    return (
        <AdminLayout>
            <div className="bg-gray-50 p-0 md:p-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600">Welcome to vibeDesi Admin Panel</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Users</p>
                                <p className="text-3xl font-bold text-gray-800">{stats.users.totalUsers}</p>
                            </div>
                            <Users className="text-blue-500" size={40} />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Orders</p>
                                <p className="text-3xl font-bold text-gray-800">{stats.orders.totalOrders}</p>
                            </div>
                            <ShoppingCart className="text-green-500" size={40} />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Revenue</p>
                                <p className="text-3xl font-bold text-gray-800">₹{stats.orders.totalRevenue.toLocaleString()}</p>
                            </div>
                            <DollarSign className="text-purple-500" size={40} />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Products</p>
                                <p className="text-3xl font-bold text-gray-800">{stats.products.total}</p>
                            </div>
                            <Package className="text-orange-500" size={40} />
                        </div>
                    </motion.div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Product Categories Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <h3 className="text-xl font-bold mb-4">Products by Category</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Order Status Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <h3 className="text-xl font-bold mb-4">Order Status</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={orderData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#9333EA" />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <h3 className="text-xl font-bold mb-4">User Statistics</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                <span className="text-gray-700">Total Users</span>
                                <span className="font-bold text-purple-600">{stats.users.totalUsers}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                                <span className="text-gray-700">Active Users</span>
                                <span className="font-bold text-pink-600">{stats.users.activeUsers}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                <span className="text-gray-700">Admins</span>
                                <span className="font-bold text-orange-600">{stats.users.totalAdmins}</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <h3 className="text-xl font-bold mb-4">Top Products</h3>
                        <div className="space-y-3">
                            {stats.topProducts.map((product, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-700 truncate">{product.name}</span>
                                    <span className="font-bold text-primary">₹{product.price}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </AdminLayout>
    )
}

