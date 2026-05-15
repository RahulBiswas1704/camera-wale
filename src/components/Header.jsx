import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer group hover:opacity-80 transition-opacity">
          <div className="relative h-12 w-48 sm:h-14 sm:w-56">
            <Image 
              src="/images/logo.png" 
              alt="Camera-Wale Logo" 
              fill 
              style={{ objectFit: 'contain', objectPosition: 'left' }}
              priority
            />
          </div>
        </Link>
        
        {/* Search Bar (Desktop) */}
        <div className="flex-1 max-w-2xl px-4 hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-sm font-medium" 
              placeholder="Search models, e.g., Sony A7 IV..." 
            />
          </div>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/compare" className="hidden sm:block text-sm font-bold text-gray-600 hover:text-orange-500 transition">
            Compare Specs
          </Link>
          <button className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-gray-900 transition">Log In</button>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition shadow-md hover:-translate-y-0.5 duration-200">
            Sign Up
          </button>
          <button className="md:hidden text-gray-500">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3 bg-white">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            className="block w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-full bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm font-medium" 
            placeholder="Search models..." 
          />
        </div>
      </div>
    </header>
  );
}
