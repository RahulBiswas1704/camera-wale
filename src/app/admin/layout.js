import Link from 'next/link';
import { Camera, LayoutDashboard, PlusCircle, LogOut } from 'lucide-react';
import { logout } from './actions';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <Camera className="w-8 h-8 text-orange-500" />
          <span className="text-xl font-extrabold tracking-tight">Camera<span className="text-orange-500">-Wale</span></span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-bold transition">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/cameras/new" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white font-bold transition">
            <PlusCircle className="w-5 h-5" /> Add Camera
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <form action={logout}>
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-500 font-bold transition">
              <LogOut className="w-5 h-5" /> Log Out
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-8 md:hidden justify-between">
          <span className="text-xl font-extrabold tracking-tight text-slate-900">Admin</span>
          <form action={logout}>
            <button className="text-sm font-bold text-gray-500">Logout</button>
          </form>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
