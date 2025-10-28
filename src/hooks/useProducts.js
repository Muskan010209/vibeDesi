import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProducts, setLoading } from '../store/slices/productsSlice'
import api from '../utils/axios'

export const useProducts = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            dispatch(setLoading(true))
            const res = await api.get('/products')
            dispatch(setProducts(res.data.data))
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            dispatch(setLoading(false))
        }
    }
}


