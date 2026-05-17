
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, PlusCircle } from 'lucide-react'
import api from '../../utils/axios'

const defaultForm = {
    name: '',
    description: '',
    price: '',
    discount: 0,
    category: '',
    size: 'S,M,L',
    colors: 'Red,Blue,Green',
    images: '',
    tags: 'ethnic,desi',
    material: 'Cotton',
    careInstructions: 'Machine wash, cold water',
    inStock: true,
    stockQuantity: 10
}

export default function AddProductForm({ isOpen, onClose, existingProduct, onProductSaved }) {
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState(defaultForm)
    const [localImages, setLocalImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories')
                setCategories(res.data.data)
            } catch (err) {
                console.error('Error loading categories:', err)
            }
        }

        if (isOpen) {
            fetchCategories()
            if (existingProduct) {
                setFormData({
                    name: existingProduct.name || '',
                    description: existingProduct.description || '',
                    price: existingProduct.price || '',
                    discount: existingProduct.discount || 0,
                    category: existingProduct.category?._id || existingProduct.category || '',
                    size: Array.isArray(existingProduct.size) ? existingProduct.size.join(',') : existingProduct.size || 'S,M,L',
                    colors: Array.isArray(existingProduct.colors) ? existingProduct.colors.join(',') : existingProduct.colors || 'Red,Blue,Green',
                    images: Array.isArray(existingProduct.images) ? existingProduct.images.join(',') : existingProduct.images || '',
                    tags: Array.isArray(existingProduct.tags) ? existingProduct.tags.join(',') : existingProduct.tags || 'ethnic,desi',
                    material: existingProduct.material || 'Cotton',
                    careInstructions: existingProduct.careInstructions || 'Machine wash, cold water',
                    inStock: existingProduct.inStock ?? true,
                    stockQuantity: existingProduct.stockQuantity ?? 10
                })
                setLocalImages([])
            } else {
                setFormData(defaultForm)
                setLocalImages([])
            }
        }
    }, [isOpen, existingProduct])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        setError('')
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || [])
        const readers = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result)
                reader.readAsDataURL(file)
            })
        })

        Promise.all(readers)
            .then((results) => {
                setLocalImages(prev => [...prev, ...results])
            })
            .catch((err) => {
                console.error('Failed to read image files:', err)
                setError('Unable to read selected image files.')
            })
    }

    const handleRemoveLocalImage = (index) => {
        setLocalImages(prev => prev.filter((_, idx) => idx !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const imageUrls = [
                ...formData.images.split(',').map(item => item.trim()).filter(Boolean),
                ...localImages
            ]

            const payload = {
                ...formData,
                price: Number(formData.price),
                discount: Number(formData.discount),
                size: formData.size.split(',').map(item => item.trim()).filter(Boolean),
                colors: formData.colors.split(',').map(item => item.trim()).filter(Boolean),
                tags: formData.tags.split(',').map(item => item.trim()).filter(Boolean),
                images: imageUrls
            }

            const res = existingProduct
                ? await api.put(`/products/${existingProduct._id}`, payload)
                : await api.post('/products', payload)

            onProductSaved(res.data.data)
            onClose()
            setFormData(defaultForm)
            setLocalImages([])
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save product')
            console.error(err)
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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl max-h-[80vh] flex flex-col"
                    >
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {existingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    {existingProduct ? 'Update product details and save changes.' : 'Create a new product for your store.'}
                                </p>
                            </div>
                            <button onClick={onClose} className="rounded-full p-2 text-slate-600 hover:bg-slate-100">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-5 px-6 py-6">
                            {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-red-700">{error}</div>}

                            <div className="grid gap-4 lg:grid-cols-2">
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">Name</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-purple-500"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">Price</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-purple-500"
                                    />
                                </label>
                            </div>

                            <div className="grid gap-4 lg:grid-cols-2">
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">Category</span>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">Discount (%)</span>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-purple-500"
                                    />
                                </label>
                            </div>

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Description</span>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-purple-500"
                                />
                            </label>

                            <div className="grid gap-4 lg:grid-cols-2">
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">Sizes (comma separated)</span>
                                    <input
                                        type="text"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-purple-500"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">Colors (comma separated)</span>
                                    <input
                                        type="text"
                                        name="colors"
                                        value={formData.colors}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-purple-500"
                                    />
                                </label>
                            </div>

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Images (comma separated URLs)</span>
                                <input
                                    type="text"
                                    name="images"
                                    value={formData.images}
                                    onChange={handleChange}
                                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-purple-500"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Or upload local images</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 focus:ring-2 focus:ring-purple-500"
                                />
                                <p className="mt-2 text-xs text-slate-500">You can use URLs or choose local image files. Local files are uploaded as inline image data.</p>
                            </label>

                            {localImages.length > 0 && (
                                <div className="scrollbar-custom grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-48 overflow-y-auto rounded-3xl border border-slate-200 bg-slate-50 p-3">
                                    {localImages.map((src, index) => (
                                        <div key={index} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
                                            <img src={src} alt={`local-${index}`} className="h-28 w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveLocalImage(index)}
                                                className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white opacity-90 transition hover:bg-black"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Tags (comma separated)</span>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-purple-500"
                                />
                            </label>

                            <div className="grid gap-4 lg:grid-cols-2 items-end">
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="inStock"
                                        checked={formData.inStock}
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded"
                                    />
                                    <span className="text-sm text-slate-700">In Stock</span>
                                </label>
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">Stock Quantity</span>
                                    <input
                                        type="number"
                                        name="stockQuantity"
                                        value={formData.stockQuantity}
                                        onChange={handleChange}
                                        min="0"
                                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-purple-500"
                                    />
                                </label>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-2xl border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center gap-2 justify-center rounded-2xl bg-purple-600 px-6 py-3 text-white font-semibold hover:bg-purple-700 disabled:opacity-60"
                                >
                                    <PlusCircle size={18} />
                                    {loading ? 'Saving...' : 'Save Product'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
