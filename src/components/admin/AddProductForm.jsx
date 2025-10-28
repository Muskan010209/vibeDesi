import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Plus, Trash2 } from 'lucide-react'
import api from '../../utils/axios'

export default function AddProductForm({ isOpen, onClose, onProductAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        discount: 0,
        category: 'kurti',
        size: ['M'],
        colors: [''],
        images: [''],
        material: 'Cotton',
        careInstructions: 'Machine wash, cold water',
        tags: [''],
        stockQuantity: 0,
        inStock: true
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [categoryOptions, setCategoryOptions] = useState([])

    useEffect(() => {
        if (!isOpen) return
            ; (async () => {
                try {
                    const res = await api.get('/categories')
                    const opts = (res.data?.data || []).map(c => ({ value: c.slug, label: c.name }))
                    setCategoryOptions(opts)
                    if (opts.length && !opts.find(o => o.value === formData.category)) {
                        setFormData(prev => ({ ...prev, category: opts[0].value }))
                    }
                } catch (_) {
                    setCategoryOptions([])
                }
            })()
    }, [isOpen])

    const categories = [
        { value: 'kurti', label: 'Kurtis' },
        { value: 'dupatta-set', label: 'Dupatta Sets' },
        { value: 'salwar-suit', label: 'Salwar Suits' },
        { value: 'combo-set', label: 'Combo Sets' },
        { value: 'accessories', label: 'Accessories' }
    ]

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }))
    }

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }))
    }

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // Clean up empty strings from arrays
            const cleanedData = {
                ...formData,
                size: formData.size.filter(s => s.trim() !== ''),
                colors: formData.colors.filter(c => c.trim() !== ''),
                images: formData.images.filter(img => img.trim() !== ''),
                tags: formData.tags.filter(t => t.trim() !== ''),
                price: parseFloat(formData.price),
                discount: parseFloat(formData.discount),
                stockQuantity: parseInt(formData.stockQuantity)
            }

            const res = await api.post('/products', cleanedData)

            if (res.data.success) {
                onProductAdded?.(res.data.data)
                onClose()
                // Reset form
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    discount: 0,
                    category: 'kurti',
                    size: ['M'],
                    colors: [''],
                    images: [''],
                    material: 'Cotton',
                    careInstructions: 'Machine wash, cold water',
                    tags: [''],
                    stockQuantity: 0,
                    inStock: true
                })
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-2xl font-bold">Add New Product</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description *
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Price (₹) *
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                required
                                                min="0"
                                                step="0.01"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Discount (%)
                                            </label>
                                            <input
                                                type="number"
                                                name="discount"
                                                value={formData.discount}
                                                onChange={handleChange}
                                                min="0"
                                                max="100"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            {categoryOptions.length === 0 ? (
                                                <option value="">No categories found</option>
                                            ) : (
                                                categoryOptions.map(cat => (
                                                    <option key={cat.value} value={cat.value}>
                                                        {cat.label}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Material
                                        </label>
                                        <input
                                            type="text"
                                            name="material"
                                            value={formData.material}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Care Instructions
                                        </label>
                                        <input
                                            type="text"
                                            name="careInstructions"
                                            value={formData.careInstructions}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Stock Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="stockQuantity"
                                            value={formData.stockQuantity}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="inStock"
                                            checked={formData.inStock}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label className="text-sm font-medium text-gray-700">
                                            In Stock
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Available Sizes *
                                </label>
                                <div className="space-y-2">
                                    {formData.size.map((size, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={size}
                                                onChange={(e) => handleArrayChange('size', index, e.target.value)}
                                                placeholder="e.g., S, M, L, XL"
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                            {formData.size.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('size', index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('size')}
                                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                                    >
                                        <Plus size={16} />
                                        Add Size
                                    </button>
                                </div>
                            </div>

                            {/* Colors */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Available Colors *
                                </label>
                                <div className="space-y-2">
                                    {formData.colors.map((color, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={color}
                                                onChange={(e) => handleArrayChange('colors', index, e.target.value)}
                                                placeholder="e.g., Red, Blue, Green"
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                            {formData.colors.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('colors', index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('colors')}
                                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                                    >
                                        <Plus size={16} />
                                        Add Color
                                    </button>
                                </div>
                            </div>

                            {/* Images */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URLs *
                                </label>
                                <div className="space-y-2">
                                    {formData.images.map((image, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="url"
                                                value={image}
                                                onChange={(e) => handleArrayChange('images', index, e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                            {formData.images.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('images', index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('images')}
                                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                                    >
                                        <Plus size={16} />
                                        Add Image URL
                                    </button>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags
                                </label>
                                <div className="space-y-2">
                                    {formData.tags.map((tag, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={tag}
                                                onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                                                placeholder="e.g., traditional, cotton, ethnic"
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                            {formData.tags.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('tags', index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('tags')}
                                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                                    >
                                        <Plus size={16} />
                                        Add Tag
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={20} />
                                            Add Product
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
