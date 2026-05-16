import Link from 'next/link';
import { getUsedGear } from '@/data/marketplace';
import { Camera, PlusCircle, Tag, IndianRupee } from 'lucide-react';

export const metadata = {
  title: 'Used Gear Marketplace | Camera-Wale',
  description: 'Buy and sell used professional camera gear safely and securely.',
};

export default async function MarketplacePage() {
  const gearList = await getUsedGear();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="py-16 md:py-20 bg-slate-900 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Used Gear Marketplace
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 font-medium">
          The safest place to buy and sell pre-owned professional cameras and lenses directly from other creators.
        </p>
        <Link 
          href="/marketplace/sell" 
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 hover:-translate-y-1"
        >
          <PlusCircle className="w-5 h-5" />
          List Your Gear
        </Link>
      </section>

      {/* Gear Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Recently Added</h2>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {gearList.length} items available
          </span>
        </div>

        {gearList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gearList.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col group">
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <Camera className="w-16 h-16 text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                    <Tag className="w-3 h-3 text-orange-500" />
                    {item.condition}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {item.camera_model || 'General Gear'}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">Asking Price</p>
                      <p className="text-2xl font-black text-slate-900 flex items-center">
                        <IndianRupee className="w-5 h-5" />
                        {item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <button className="bg-slate-100 text-slate-900 hover:bg-slate-200 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No gear listed yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Be the first to list your used camera gear on Camera-Wale. It's free and takes only two minutes.
            </p>
            <Link 
              href="/marketplace/sell" 
              className="inline-flex bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition"
            >
              Start Selling
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
