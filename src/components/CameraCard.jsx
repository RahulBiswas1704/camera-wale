import Link from 'next/link'
import { Star } from 'lucide-react'
import FavoriteButton from './FavoriteButton'

export default function CameraCard({ camera }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 hover:border-orange-500/30 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 group relative">
      <FavoriteButton cameraId={camera.id} isFavorited={camera.isFavorited} />
      
      <Link href={`/cameras/${camera.slug}`}>
        <div className="h-48 flex items-center justify-center mb-6 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={camera.image} 
            alt={camera.name} 
            className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start gap-2 mb-2">
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-1">
                {camera.name}
              </h3>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-lg shrink-0">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {camera.rating || 4.8}
              </div>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {camera.brand} • {camera.category}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {camera.badges?.slice(0, 2).map((badge) => (
              <span key={badge} className="px-2.5 py-1 bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-tighter rounded-md border border-orange-100">
                {badge}
              </span>
            ))}
          </div>
          
          <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase mb-0.5">Starting From</p>
              <p className="text-xl font-black text-slate-900">₹{camera.price?.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-colors shadow-lg shadow-slate-900/10">
              <Star className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
