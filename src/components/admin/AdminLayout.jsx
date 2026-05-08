import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

export default function AdminLayout({ children }) {
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            navigate('/admin/login', { replace: true })
        }
    }, [loading, user, navigate])

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="flex min-h-screen">
                <AdminSidebar />
                <div className="flex-1 flex flex-col">
                    <AdminTopbar />
                    <main className="flex-1 p-6 lg:p-8">{children}</main>
                </div>
            </div>
        </div>
    )
}
