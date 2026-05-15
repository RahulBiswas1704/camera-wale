import { getCameraBySlug, getCameras } from '@/data/cameras';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Camera, Battery, Focus, Video, Maximize } from 'lucide-react';

export async function generateStaticParams() {
  const cameras = await getCameras();
  return cameras.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CameraDetailPage({ params }) {
  const camera = await getCameraBySlug(params.slug);

  if (!camera) {
    notFound();
  }

  const specsList = [
    { label: 'Sensor Size', value: camera.specs.sensorSize, icon: <Maximize className="w-5 h-5 text-gray-400" /> },
    { label: 'Megapixels', value: `${camera.specs.megapixels} MP`, icon: <Camera className="w-5 h-5 text-gray-400" /> },
    { label: 'Video', value: camera.specs.videoResolution, icon: <Video className="w-5 h-5 text-gray-400" /> },
    { label: 'Autofocus', value: `${camera.specs.autofocusPoints} Points`, icon: <Focus className="w-5 h-5 text-gray-400" /> },
    { label: 'Battery', value: `${camera.specs.batteryLife} Shots`, icon: <Battery className="w-5 h-5 text-gray-400" /> },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="hover:text-slate-900 transition cursor-pointer">{camera.brand}</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-900 font-bold">{camera.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Image */}
          <div className="lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 rounded-3xl border border-gray-100 h-[500px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={camera.image} alt={camera.name} className="max-h-full object-contain mix-blend-multiply drop-shadow-xl" />
          </div>

          {/* Right Column: Details */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="mb-2 flex gap-2">
              <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full">{camera.brand}</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">{camera.category}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">{camera.name}</h1>
            
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              The {camera.name} is a powerful {camera.category.toLowerCase()} camera designed for professional creators, offering exceptional performance with its {camera.specs.megapixels} MP sensor.
            </p>

            {/* Pricing Box */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Lowest Online Price</p>
                  <div className="text-4xl font-black text-slate-900">₹{camera.price.toLocaleString('en-IN')}</div>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs font-bold text-[#FF9900] bg-orange-100/50 px-2.5 py-1 rounded">Amazon</span>
                    <span className="text-xs font-bold text-[#2874F0] bg-blue-100/50 px-2.5 py-1 rounded">Flipkart</span>
                  </div>
                </div>
                <div className="w-full sm:w-auto flex-shrink-0">
                  <button className="w-full sm:w-auto bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 hover-lift">
                    Get Local Quotes
                  </button>
                  <p className="text-xs text-center text-gray-500 font-semibold mt-3 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Verified local dealers
                  </p>
                </div>
              </div>
            </div>

            {/* Key Specs Grid */}
            <h3 className="text-xl font-extrabold text-slate-900 mb-4">Key Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              {specsList.map((spec, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl bg-white hover:border-orange-200 transition-colors">
                  <div className="mt-0.5">{spec.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{spec.label}</p>
                    <p className="font-bold text-slate-900">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
