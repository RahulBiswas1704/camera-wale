import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import UserNav from './UserNav';
import SearchForm from './SearchForm';

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Brand Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center group transition-transform active:scale-95">
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
        <div className="flex-1 max-w-xl px-4 hidden md:block">
          <SearchForm />
        </div>
        
        {/* Navigation & Auth */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/compare" className="text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors">
              Compare Engine
            </Link>
            <Link href="/cameras" className="text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors">
              Explore All
            </Link>
            <Link href="/marketplace" className="text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-1">
              Marketplace <span className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded text-[10px] uppercase font-black tracking-wider">New</span>
            </Link>
          </nav>
          
          <div className="h-6 w-px bg-slate-100 hidden lg:block mx-2"></div>
          
          <UserNav user={user} />
          
          <button className="md:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
