import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    loading: false,
    error: null,
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const productId = action.payload
            if (!state.items.includes(productId)) {
                state.items.push(productId)
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(id => id !== action.payload)
        },
        clearWishlist: (state) => {
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
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    setLoading,
    setError
} = wishlistSlice.actions

export default wishlistSlice.reducer


