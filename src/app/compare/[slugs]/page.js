import { getCameras, getCameraBySlug } from '@/data/cameras';
import CompareTool from '@/components/CompareTool';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slugs } = await params;
  if (!slugs || !slugs.includes('-vs-')) return { title: 'Compare Cameras | Camera-Wale' };

  const [slug1, slug2] = slugs.split('-vs-');
  const cam1 = await getCameraBySlug(slug1);
  const cam2 = await getCameraBySlug(slug2);

  if (!cam1 || !cam2) return { title: 'Compare Cameras | Camera-Wale' };

  return {
    title: `${cam1.name} vs ${cam2.name} Comparison | Camera-Wale`,
    description: `Detailed head-to-head comparison between ${cam1.name} and ${cam2.name}. Compare specs, prices, and features to make the best choice.`,
  };
}

export default async function CompareDynamicPage({ params }) {
  const { slugs } = await params;
  
  if (!slugs || !slugs.includes('-vs-')) {
    notFound();
  }

  const [slug1, slug2] = slugs.split('-vs-');
  const allCameras = await getCameras();
  
  const cam1 = allCameras.find(c => c.slug === slug1);
  const cam2 = allCameras.find(c => c.slug === slug2);

  if (!cam1 || !cam2) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="mb-4">
          <Link href="/compare" className="text-orange-500 font-bold hover:underline text-sm uppercase tracking-wider">
            &larr; All Comparisons
          </Link>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          {cam1.name} <span className="text-gray-400 font-medium px-2">vs</span> {cam2.name}
        </h1>
        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
          Detailed head-to-head breakdown. Compare megapixels, video resolution, autofocus points, and current market prices.
        </p>
      </div>
      
      <CompareTool cameras={allCameras} initialCam1Slug={cam1.slug} initialCam2Slug={cam2.slug} />
    </div>
  );
}
