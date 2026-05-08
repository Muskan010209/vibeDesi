import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'
import api from '../../utils/axios'
import SafeImage from '../../components/SafeImage'
import AdminLayout from '../../components/admin/AdminLayout'
import AddProductForm from '../../components/admin/AddProductForm'

export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products')
            setProducts(res.data.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleProductSaved = (savedProduct) => {
        if (editingProduct) {
            setProducts(prev => prev.map(product => product._id === savedProduct._id ? savedProduct : product))
        } else {
            setProducts(prev => [savedProduct, ...prev])
        }
        setEditingProduct(null)
        setShowForm(false)
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setShowForm(true)
    }

    const handleDelete = async (productId) => {
        if (!window.confirm('Delete this product permanently?')) return

        try {
            await api.delete(`/products/${productId}`)
            setProducts(prev => prev.filter(product => product._id !== productId))
        } catch (error) {
            console.error('Product delete failed:', error)
            alert('Failed to delete product. Please try again.')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900">Products Management</h1>
                        <p className="text-slate-600">Edit, delete, or create catalog products from one dashboard.</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            setEditingProduct(null)
                            setShowForm(true)
                        }}
                        className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-white font-semibold shadow-lg shadow-purple-200"
                    >
                        <Plus size={20} />
                        Add Product
                    </motion.button>
                </div>

                {products.length === 0 ? (
                    <div className="rounded-3xl bg-white p-10 text-center text-slate-600 shadow-sm">
                        No products found yet.
                    </div>
                ) : (
                    <div className="scrollbar-custom grid grid-cols-1 lg:grid-cols-3 gap-6 max-h-[calc(100vh-260px)]">
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="overflow-hidden rounded-[2rem] bg-white shadow-lg border border-slate-200"
                            >
                                <SafeImage src={product.images?.[0]} alt={product.name} className="h-56 w-full object-cover" />
                                <div className="p-5 space-y-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>
                                            <p className="text-sm text-slate-500 mt-1">{typeof product.category === 'string' ? product.category : product.category?.name || 'Uncategorized'}</p>
                                        </div>
                                        <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-600">₹{product.price}</span>
                                    </div>

                                    <p className="text-slate-600 line-clamp-3">{product.description || 'No description available.'}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {product.size?.length > 0 && (
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{product.size.join(', ')}</span>
                                        )}
                                        {product.colors?.length > 0 && (
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{product.colors.join(', ')}</span>
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="flex-1 rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                                        >
                                            <Edit size={16} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="flex-1 rounded-3xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-200"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <AddProductForm
                isOpen={showForm}
                onClose={() => {
                    setShowForm(false)
                    setEditingProduct(null)
                }}
                existingProduct={editingProduct}
                onProductSaved={handleProductSaved}
            />
        </AdminLayout>
    )
}

