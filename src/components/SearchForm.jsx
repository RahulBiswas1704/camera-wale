'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchForm({ placeholder = "Search models, e.g., Sony A7 IV...", isHero = false }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/cameras?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (isHero) {
    return (
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative group mb-16">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-lg font-medium shadow-lg" 
          placeholder={placeholder}
        />
        <button type="submit" className="absolute inset-y-2 right-2 bg-slate-900 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-500 transition-colors">
          Search
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative group w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
      </div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-2xl leading-5 bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all duration-300 text-sm font-medium" 
        placeholder={placeholder}
      />
    </form>
  );
}
