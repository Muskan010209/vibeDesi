import { Link, useLocation } from 'react-router-dom'
import { Home, Box, Layers } from 'lucide-react'

const links = [
    { label: 'Dashboard', to: '/admin/dashboard', icon: Home },
    { label: 'Products', to: '/admin/products', icon: Box },
    { label: 'Categories', to: '/admin/categories', icon: Layers }
]

export default function AdminSidebar() {
    const location = useLocation()

    return (
        <aside className="hidden xl:flex xl:w-50 flex-col bg-slate-900 text-slate-100">
            <div className="px-6 py-8 border-b border-slate-800">
                <div className="text-2xl font-bold tracking-tight">vibeDesi Admin</div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon
                    const active = location.pathname === link.to
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${active ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <Icon size={18} />
                            {link.label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
