import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Package } from 'lucide-react'
import axios from 'axios'
import SafeImage from '../../components/SafeImage'
import AdminLayout from '../../components/admin/AdminLayout'
import AddProductForm from '../../components/admin/AddProductForm'

export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/api/products')
            setProducts(res.data.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleProductAdded = (newProduct) => {
        setProducts(prev => [newProduct, ...prev])
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div>
            <AdminLayout>
                <div className="bg-gray-50 p-0 md:p-0">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Products Management
                        </h1>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAddForm(true)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add Product
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                            >
                                <SafeImage src={product.images?.[0]} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                                            <Edit size={16} />
                                            Edit
                                        </button>
                                        <button className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </AdminLayout>

            <AddProductForm
                isOpen={showAddForm}
                onClose={() => setShowAddForm(false)}
                onProductAdded={handleProductAdded}
            />
        </div>
    )
}

