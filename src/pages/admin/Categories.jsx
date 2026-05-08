import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../../utils/axios'
import AdminLayout from '../../components/admin/AdminLayout'

export default function AdminCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories')
                setCategories(res.data.data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return (
        <AdminLayout>
            <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900">Categories Management</h1>
                        <p className="text-slate-500">View and manage category data for your store.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-20 text-slate-600">No categories found</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <motion.div
                                key={category._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-50 rounded-3xl border border-slate-200 p-6"
                            >
                                <h2 className="text-2xl font-semibold text-slate-900 mb-2">{category.name}</h2>
                                <p className="text-slate-600 mb-4">Slug: {category.slug}</p>
                                <p className="text-slate-500 text-sm">{category.description || 'No description available.'}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
