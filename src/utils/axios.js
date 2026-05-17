import axios from 'axios'

// Create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL?.trim() || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? '/api' : 'https://vibe-desi-one.vercel.app/api')
})

// Add token to requests automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        if (!config.headers['Content-Type'] && !config.headers['content-type']) {
            config.headers['Content-Type'] = 'application/json'
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Handle response errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/admin/login'
        }
        return Promise.reject(error)
    }
)

export default api



