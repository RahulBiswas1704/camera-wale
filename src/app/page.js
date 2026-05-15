import Link from 'next/link';
import { Search, ChevronRight, Star } from 'lucide-react';
import { getCameras } from '@/data/cameras';

export default async function Home() {
  const cameras = await getCameras();
  const featuredCameras = cameras.slice(0, 3); // Get top 3 cameras

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Find your next <span className="text-orange-500">Camera.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium">
          The ultimate ecosystem to explore, compare, and get the lowest prices on professional gear.
        </p>
        
        {/* Main Search Bar */}
        <div className="max-w-3xl mx-auto relative group mb-16">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
          </div>
          <input 
            type="text" 
            className="block w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-lg font-medium shadow-lg" 
            placeholder="Search by brand, model, or specs (e.g., Sony A7 IV)" 
          />
          <button className="absolute inset-y-2 right-2 bg-slate-900 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-500 transition-colors">
            Search
          </button>
        </div>

        {/* Categories */}
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
          {['Mirrorless', 'DSLR', 'Cinema Cameras', 'Lenses', 'Accessories'].map((cat) => (
            <button key={cat} className="px-6 py-3 bg-gray-50 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 border border-gray-200 rounded-xl font-bold text-gray-700 transition-all hover-lift">
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Trending Gear</h2>
              <p className="text-gray-500 font-medium">The most researched cameras right now.</p>
            </div>
            <Link href="/compare" className="hidden sm:flex items-center gap-1 font-bold text-orange-500 hover:text-orange-600 transition">
              View All <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCameras.map((camera) => (
              <Link href={`/cameras/${camera.slug}`} key={camera.id} className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-orange-500/30 shadow-sm hover:shadow-xl transition-all duration-300 hover-lift group">
                <div className="h-48 flex items-center justify-center mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={camera.image} alt={camera.name} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-orange-500 transition-colors">{camera.name}</h3>
                    <div className="flex items-center gap-1 text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 4.8
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{camera.brand} • {camera.category}</p>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">Est. Price</p>
                      <p className="text-lg font-black text-slate-900">₹{camera.price.toLocaleString('en-IN')}</p>
                    </div>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm group-hover:bg-orange-500 transition-colors">
                      View Specs
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Compare Banner */}
      <section className="py-20 bg-slate-900 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Not sure which one to buy?</h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Use our powerful comparison engine to put two cameras head-to-head and see exactly where your money goes.</p>
          <Link href="/compare" className="inline-block bg-orange-500 text-white px-8 py-4 rounded-xl font-extrabold text-lg shadow-lg hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300">
            Compare Cameras Now
          </Link>
        </div>
      </section>
    </div>
  );
}
