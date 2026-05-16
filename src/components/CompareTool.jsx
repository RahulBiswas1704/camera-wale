'use client';

import { useRouter } from 'next/navigation';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

export default function CompareTool({ cameras, initialCam1Slug, initialCam2Slug }) {
  const router = useRouter();

  // Find cameras by slug, or fallback to first two
  const cam1 = cameras.find((c) => c.slug === initialCam1Slug) || cameras[0];
  const cam2 = cameras.find((c) => c.slug === initialCam2Slug) || cameras[1];

  const handleCompareChange = (c1Slug, c2Slug) => {
    // Prevent comparing the exact same camera if possible, or just allow it
    router.push(`/compare/${c1Slug}-vs-${c2Slug}`);
  };

  // Helper to determine the winner (simple logic for MVP)
  const isWinner = (spec, val1, val2) => {
    if (spec === 'megapixels' || spec === 'autofocusPoints' || spec === 'batteryLife') {
      return val1 > val2 ? 1 : val1 < val2 ? 2 : 0;
    }
    // For video resolution, we'll just check if it contains 6K or Uncropped as a dummy rule
    if (spec === 'videoResolution') {
      if (val1.includes('Uncropped') || val1.includes('6K')) return 1;
      if (val2.includes('Uncropped') || val2.includes('6K')) return 2;
    }
    return 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Selection Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
        <div className="w-full md:w-80 relative group hover-lift">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 text-left px-1">Select Camera 1</label>
          <select 
            value={cam1.slug}
            onChange={(e) => handleCompareChange(e.target.value, cam2.slug)}
            className="w-full appearance-none bg-white border-2 border-gray-200 text-gray-900 py-3.5 px-4 pr-10 rounded-xl font-bold focus:outline-none focus:border-orange-500 focus:ring-0 cursor-pointer hover:border-gray-300 transition-colors shadow-sm"
          >
            {cameras.map(c => <option key={`c1-${c.slug}`} value={c.slug}>{c.name}</option>)}
          </select>
          <div className="pointer-events-none absolute bottom-0 right-0 flex items-center px-4 pb-4 text-gray-400 group-hover:text-orange-500 transition-colors">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
        
        <div className="text-gray-300 font-black text-2xl hidden md:block pt-6">VS</div>
        
        <div className="w-full md:w-80 relative group hover-lift">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 text-left px-1">Select Camera 2</label>
          <select 
            value={cam2.slug}
            onChange={(e) => handleCompareChange(cam1.slug, e.target.value)}
            className="w-full appearance-none bg-white border-2 border-gray-200 text-gray-900 py-3.5 px-4 pr-10 rounded-xl font-bold focus:outline-none focus:border-orange-500 focus:ring-0 cursor-pointer hover:border-gray-300 transition-colors shadow-sm"
          >
            {cameras.map(c => <option key={`c2-${c.slug}`} value={c.slug}>{c.name}</option>)}
          </select>
          <div className="pointer-events-none absolute bottom-0 right-0 flex items-center px-4 pb-4 text-gray-400 group-hover:text-orange-500 transition-colors">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 justify-center relative mb-16">
        {/* VS Badge */}
        <div className="hidden md:flex absolute top-[150px] left-1/2 transform -translate-x-1/2 flex-col items-center justify-center z-10">
          <div className="bg-slate-900 text-white rounded-full w-14 h-14 flex items-center justify-center font-black text-lg shadow-xl border-4 border-gray-50">VS</div>
        </div>

        {/* Camera 1 Card */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-200 p-6 flex flex-col hover-lift relative group transition-all duration-300 hover:shadow-xl hover:border-orange-500/30">
          {cam1.badges && cam1.badges.length > 0 && (
            <div className="absolute top-5 left-5 z-10">
              <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                {cam1.badges[0]}
              </span>
            </div>
          )}
          
          <div className="h-64 sm:h-80 w-full flex items-center justify-center mb-6 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cam1.image} alt={cam1.name} className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out mockup-img" />
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">{cam1.name}</h2>
            <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">{cam1.category} • {cam1.brand}</p>
          </div>
          
          {/* Pricing Block */}
          <div className="w-full bg-gray-50 rounded-2xl p-5 border border-gray-100 mt-auto flex flex-col justify-between h-full">
            <div className="text-center mb-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Lowest Online Price</p>
              <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">₹{cam1.price.toLocaleString('en-IN')}</div>
            </div>
            
            <div className="mt-auto pt-2">
              <button className="w-full bg-orange-500 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/25 relative overflow-hidden group flex items-center justify-center gap-2 transform active:scale-95">
                Get Lowest Local Price
              </button>
            </div>
          </div>
        </div>

        {/* Camera 2 Card */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-200 p-6 flex flex-col hover-lift relative group transition-all duration-300 hover:shadow-xl hover:border-slate-900/30 mt-6 md:mt-0">
          {cam2.badges && cam2.badges.length > 0 && (
            <div className="absolute top-5 left-5 z-10">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                {cam2.badges[0]}
              </span>
            </div>
          )}
          
          <div className="h-64 sm:h-80 w-full flex items-center justify-center mb-6 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cam2.image} alt={cam2.name} className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out mockup-img" />
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">{cam2.name}</h2>
            <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">{cam2.category} • {cam2.brand}</p>
          </div>
          
          {/* Pricing Block */}
          <div className="w-full bg-gray-50 rounded-2xl p-5 border border-gray-100 mt-auto flex flex-col justify-between h-full">
            <div className="text-center mb-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Lowest Online Price</p>
              <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">₹{cam2.price.toLocaleString('en-IN')}</div>
            </div>
            
            <div className="mt-auto pt-2">
              <button className="w-full bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg relative overflow-hidden group flex items-center justify-center gap-2 transform active:scale-95">
                Get Lowest Local Price
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specs Breakdown */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center gap-3">
          <h3 className="text-xl font-extrabold text-gray-900">Head-to-Head Specifications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-200 font-extrabold tracking-wider">
              <tr>
                <th scope="col" className="px-6 py-4 min-w-[150px]">Feature</th>
                <th scope="col" className="px-6 py-4 text-center border-l border-gray-100 min-w-[200px]">{cam1.name}</th>
                <th scope="col" className="px-6 py-4 text-center border-l border-gray-100 min-w-[200px]">{cam2.name}</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-base font-medium">
              {Object.keys(cam1.specs).map((specKey) => {
                const winner = isWinner(specKey, cam1.specs[specKey], cam2.specs[specKey]);
                
                // Format label
                const label = specKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                
                return (
                  <tr key={specKey} className="border-b border-gray-100 row-hover transition-colors">
                    <th scope="row" className="px-6 py-5 font-bold text-gray-900 whitespace-nowrap">{label}</th>
                    
                    {/* Cam 1 Spec */}
                    <td className={`px-6 py-5 text-center border-l border-gray-100 relative ${winner === 1 ? 'bg-green-50/60' : ''}`}>
                      {winner === 1 && <div className="absolute inset-y-0 left-0 w-1 bg-green-500"></div>}
                      <div className="flex items-center justify-center gap-2">
                        <span className={winner === 1 ? "font-extrabold text-green-700" : ""}>
                          {cam1.specs[specKey]}
                        </span>
                        {winner === 1 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      </div>
                    </td>
                    
                    {/* Cam 2 Spec */}
                    <td className={`px-6 py-5 text-center border-l border-gray-100 relative ${winner === 2 ? 'bg-green-50/60' : ''}`}>
                      {winner === 2 && <div className="absolute inset-y-0 left-0 w-1 bg-green-500"></div>}
                      <div className="flex items-center justify-center gap-2">
                        <span className={winner === 2 ? "font-extrabold text-green-700" : ""}>
                          {cam2.specs[specKey]}
                        </span>
                        {winner === 2 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
