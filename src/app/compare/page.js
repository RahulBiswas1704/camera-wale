import CompareTool from '@/components/CompareTool';
import { getCameras } from '@/data/cameras';
import Link from 'next/link';

export const metadata = {
  title: 'Compare Cameras | Camera-Wale',
  description: 'Head-to-head camera comparison engine. Find the right gear for your needs.',
};

export default async function ComparePage() {
  const cameras = await getCameras();
  
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Compare. <span className="text-orange-500">Decide.</span> Shoot.
        </h1>
        <p className="text-lg text-gray-500 font-medium">Select any two cameras to see a head-to-head breakdown.</p>
      </div>
      
      {cameras && cameras.length >= 2 && (
        <CompareTool cameras={cameras} initialCam1Slug={cameras[0].slug} initialCam2Slug={cameras[1].slug} />
      )}

      {/* Popular Comparisons Hub */}
      <div className="max-w-4xl mx-auto px-4 mt-20 text-center border-t border-gray-200 pt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Comparisons</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/compare/sony-a7-iv-vs-canon-r6-mark-ii" className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:text-orange-500 hover:border-orange-200 shadow-sm transition">
            Sony A7 IV vs Canon R6 Mark II
          </Link>
          <Link href="/compare/nikon-z6-ii-vs-panasonic-lumix-s5-ii" className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:text-orange-500 hover:border-orange-200 shadow-sm transition">
            Nikon Z6 II vs Lumix S5 II
          </Link>
          <Link href="/compare/sony-a7-iv-vs-nikon-z6-ii" className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:text-orange-500 hover:border-orange-200 shadow-sm transition">
            Sony A7 IV vs Nikon Z6 II
          </Link>
        </div>
      </div>
    </div>
  );
}
