import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import api from '../utils/axios'
import { setProducts, setLoading, setError } from '../store/slices/productsSlice'

export function useProducts() {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(setLoading(true))
            try {
                const res = await api.get('/products')
                dispatch(setProducts(res.data.data))
            } catch (error) {
                dispatch(setError(error.response?.data?.message || 'Failed to load products'))
            } finally {
                dispatch(setLoading(false))
            }
        }

        fetchProducts()
    }, [dispatch])
}
