import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    loading: false,
    error: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { productId, quantity, size, color } = action.payload
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
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setLoading,
    setError
} = cartSlice.actions

export default cartSlice.reducer


