'use client'

import Link from 'next/link'
import { User, LogOut, Heart, Settings } from 'lucide-react'
import { signOut } from '@/app/auth/actions'
import { useState } from 'react'

export default function UserNav({ user }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-slate-900 transition">
          Log In
        </Link>
        <Link href="/signup" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 duration-200">
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-50 border border-slate-100 hover:border-orange-200 hover:bg-orange-50 transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">
          {user.email[0].toUpperCase()}
        </div>
        <span className="text-sm font-bold text-slate-700 hidden sm:block">My Account</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="px-4 py-3 border-b border-slate-50">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
              <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
            </div>
            
            <div className="p-2 space-y-1">
              <Link 
                href="/profile" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-bold transition text-sm"
              >
                <User className="w-4 h-4 text-slate-400" /> My Profile
              </Link>
              <Link 
                href="/profile#favorites" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-orange-50 text-slate-600 hover:text-orange-600 font-bold transition text-sm"
              >
                <Heart className="w-4 h-4 text-slate-400" /> My Wishlist
              </Link>
            </div>

            <div className="p-2 border-t border-slate-50">
              <form action={signOut}>
                <button 
                  type="submit"
                  className="flex w-full items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold transition text-sm"
                >
                  <LogOut className="w-4 h-4 text-slate-400" /> Sign Out
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
