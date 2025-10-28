import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [wishlistItems, setWishlistItems] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
        fetchCart()
        fetchWishlist()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/api/products')
            setProducts(res.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCart = async () => {
        try {
            const res = await axios.get('/api/cart')
            setCartItems(res.data)
        } catch (error) {
            console.error('Error fetching cart:', error)
        }
    }

    const fetchWishlist = async () => {
        try {
            const res = await axios.get('/api/wishlist')
            setWishlistItems(res.data)
        } catch (error) {
            console.error('Error fetching wishlist:', error)
        }
    }

    const addToCart = async (productId, quantity, size, color) => {
        try {
            await axios.post('/api/cart', { productId, quantity, size, color })
            await fetchCart()
        } catch (error) {
            console.error('Error adding to cart:', error)
        }
    }

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`/api/cart/${productId}`)
            await fetchCart()
        } catch (error) {
            console.error('Error removing from cart:', error)
        }
    }

    const addToWishlist = async (productId) => {
        try {
            await axios.post('/api/wishlist', { productId })
            await fetchWishlist()
        } catch (error) {
            console.error('Error adding to wishlist:', error)
        }
    }

    const removeFromWishlist = async (productId) => {
        try {
            await axios.delete(`/api/wishlist/${productId}`)
            await fetchWishlist()
        } catch (error) {
            console.error('Error removing from wishlist:', error)
        }
    }

    const value = {
        products,
        loading,
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}


