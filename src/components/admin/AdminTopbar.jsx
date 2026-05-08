import { useAuth } from '../../context/AuthContext'
import { LogOut, CircleDot } from 'lucide-react'

export default function AdminTopbar() {
    const { user, logout } = useAuth()

    return (
        <header className="flex items-center justify-between gap-4 bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
            <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Admin Panel</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="rounded-3xl bg-slate-100 px-4 py-2 text-slate-700">
                    <div className="text-sm font-semibold">{user?.name || 'Admin'}</div>
                    <div className="text-xs text-slate-500">{user?.email || 'Not logged in'}</div>
                </div>
                <button
                    type="button"
                    onClick={logout}
                    className="inline-flex items-center gap-2 rounded-3xl bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </header>
    )
}
