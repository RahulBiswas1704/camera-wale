import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';
import SearchForm from '@/components/SearchForm';
import { getCameras } from '@/data/cameras';
import CameraCard from '@/components/CameraCard';
import Newsletter from '@/components/Newsletter';

export default async function Home() {
  const cameras = await getCameras();
  const featuredCameras = cameras.slice(0, 3); // Get top 3 cameras

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cinematic Hero Section */}
      <section className="relative py-24 md:py-32 bg-slate-950 text-center px-4 overflow-hidden">
        {/* Glow Effects matching the red logo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold tracking-widest uppercase">
            The Professional Ecosystem
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            Find your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-sm">Camera.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-medium">
            Explore, compare, and secure the lowest prices on professional gear. Built by creators, for creators.
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <SearchForm isHero={true} placeholder="Search by brand, model, or specs (e.g., Sony A7 IV)" />
          </div>

          {/* Categories */}
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
            {['Mirrorless', 'DSLR', 'Cinema Cameras', 'Lenses', 'Accessories'].map((cat) => (
              <Link 
                key={cat} 
                href={`/cameras?category=${encodeURIComponent(cat)}`}
                className="px-6 py-3 bg-white/5 hover:bg-orange-500 hover:text-white border border-white/10 rounded-xl font-bold text-gray-300 transition-all hover-lift glass-dark"
              >
                {cat}
              </Link>
            ))}
          </div>
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
              <CameraCard key={camera.id} camera={camera} />
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

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
