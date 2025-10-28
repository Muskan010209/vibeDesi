import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutGrid, Package, LogOut, UserCircle2 } from 'lucide-react'

export default function AdminLayout({ children }) {
    const location = useLocation()
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        const userRaw = localStorage.getItem('user')
        try {
            const user = userRaw ? JSON.parse(userRaw) : null
            if (user?.role === 'admin') setAdmin(user)
        } catch (_) {
            setAdmin(null)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/admin/login'
    }

    const navItems = [
        { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutGrid size={18} /> },
        { to: '/admin/products', label: 'Products', icon: <Package size={18} /> }
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col">
                <div className="px-6 py-5 border-b">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">vibeDesi Admin</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map(item => (
                        <Link key={item.to} to={item.to} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${location.pathname === item.to ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-100'}`}>
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-white border-b px-4 md:px-8 h-16 flex items-center justify-between">
                    <div className="md:hidden">
                        <h2 className="text-xl font-semibold">Admin</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <UserCircle2 size={28} className="text-gray-500" />
                        <div className="leading-tight hidden sm:block">
                            <div className="font-semibold">{admin?.name || 'Admin'}</div>
                            <div className="text-xs text-gray-500">{admin?.email || 'admin@example.com'}</div>
                        </div>
                    </div>
                </header>

                <main className="p-4 md:p-8">{children}</main>
            </div>
        </div>
    )
}


