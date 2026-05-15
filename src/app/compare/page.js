import CompareTool from '@/components/CompareTool';
import { getCameras } from '@/data/cameras';

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
      
      <CompareTool cameras={cameras} />
    </div>
  );
}
