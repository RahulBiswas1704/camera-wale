import { getCameras } from '@/data/cameras';
import CameraCard from '@/components/CameraCard';
import { Camera } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Explore Cameras | Camera-Wale',
  description: 'Browse, search, and compare the best professional cameras.',
};

export default async function CamerasPage({ searchParams }) {
  const params = await searchParams;
  const q = params?.q?.toLowerCase() || '';
  const category = params?.category?.toLowerCase() || '';

  const allCameras = await getCameras();

  // Filter logic
  const filteredCameras = allCameras.filter((camera) => {
    let matchesQuery = true;
    let matchesCategory = true;

    if (q) {
      matchesQuery = 
        camera.name?.toLowerCase().includes(q) || 
        camera.brand?.toLowerCase().includes(q) ||
        camera.megapixels?.toString().includes(q) ||
        camera.sensor_type?.toLowerCase().includes(q);
    }

    if (category) {
      matchesCategory = camera.category.toLowerCase() === category;
    }

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
              {q ? `Search results for "${params.q}"` : category ? `${params.category} Cameras` : 'Explore All Cameras'}
            </h1>
            <p className="text-gray-500 font-medium">
              Found {filteredCameras.length} {filteredCameras.length === 1 ? 'camera' : 'cameras'}
            </p>
          </div>
          {(q || category) && (
            <Link 
              href="/cameras" 
              className="text-orange-500 hover:text-orange-600 font-bold underline underline-offset-4"
            >
              Clear Filters
            </Link>
          )}
        </div>

        {filteredCameras.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCameras.map((camera) => (
              <CameraCard key={camera.id} camera={camera} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No cameras found</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We couldn&apos;t find any cameras matching your criteria. Try adjusting your search or filters.
            </p>
            <Link 
              href="/cameras" 
              className="inline-block bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition"
            >
              View All Cameras
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
