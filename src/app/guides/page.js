import { getGuides } from '@/data/guides';
import Link from 'next/link';
import { ChevronRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Buying Guides & Content Hub | Camera-Wale',
  description: 'Expert reviews, comparisons, and buying guides to help you choose the right camera gear.',
};

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Camera <span className="text-orange-500">Buying Guides</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            Expert advice, comprehensive reviews, and detailed comparisons to help you make the right choice for your next gear purchase.
          </p>
        </div>

        {guides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link key={guide.id} href={`/guides/${guide.slug}`} className="group block">
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={guide.cover_image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop'} 
                      alt={guide.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">
                      <FileText className="w-4 h-4" />
                      Buying Guide
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {guide.title}
                    </h2>
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                      <span className="text-sm font-bold text-gray-400">
                        {new Date(guide.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No guides available</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We are currently working on fresh content. Please check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
