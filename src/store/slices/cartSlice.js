import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    loading: false,
    error: null,
    userId: null, // Track which user's cart this is
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setUserCart: (state, action) => {
            const { userId, items } = action.payload
            state.userId = userId
            state.items = items || []
        },
        addToCart: (state, action) => {
            const { productId, quantity, size, color, userId } = action.payload

            // If this is a different user, clear the cart first
            if (state.userId !== userId) {
                state.userId = userId
                state.items = []
            }

            const existingItem = state.items.find(
                item => item.productId === productId && item.size === size && item.color === color
            )

            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                state.items.push({ productId, quantity, size, color })
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.productId !== action.payload)
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload
            const item = state.items.find(item => item.productId === productId)
            if (item) {
                item.quantity = quantity
            }
        },
        clearCart: (state) => {
            state.items = []
            state.userId = null
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
    },
})

export const {
    setUserCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setLoading,
    setError
} = cartSlice.actions

export default cartSlice.reducer


