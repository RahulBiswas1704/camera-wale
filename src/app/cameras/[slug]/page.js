import { getCameraBySlug, getCameras } from '@/data/cameras';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, Camera, Battery, Focus, Video, Maximize, Star, 
  CheckCircle, XCircle, Play, Image as ImageIcon, Award, ShieldCheck 
} from 'lucide-react';
import ReviewForm from '@/components/ReviewForm';

export async function generateStaticParams() {
  const cameras = await getCameras();
  return cameras.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CameraDetailPage({ params }) {
  const { slug } = await params;
  const camera = await getCameraBySlug(slug);

  if (!camera) {
    notFound();
  }

  // Unified Specs Access
  const unifiedSpecs = {
    sensorSize: camera.sensor_type || camera.specs?.sensorSize || 'N/A',
    megapixels: camera.megapixels || camera.specs?.megapixels || 'N/A',
    videoResolution: camera.video_res || camera.specs?.videoResolution || 'N/A',
    autofocusPoints: camera.specs?.autofocusPoints || 'N/A',
    batteryLife: camera.specs?.batteryLife || 'N/A',
    lensMount: camera.lens_mount || camera.specs?.lensMount || 'Standard',
  };

  const gallery = camera.gallery?.length > 0 ? camera.gallery : [camera.image];
  const ratings = camera.feature_ratings || { video: 8.5, stills: 8.5, autofocus: 8.5, build: 8.0, battery: 7.5 };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Abstract Background Blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full -mr-64 -mt-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-400 font-bold mb-8 tracking-tight">
            <Link href="/" className="hover:text-orange-500 transition">HOME</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <Link href="/cameras" className="hover:text-orange-500 transition">CAMERAS</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="text-slate-900">{camera.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left: Interactive Gallery */}
            <div className="lg:w-[55%] w-full">
              <div className="bg-gray-50 rounded-[40px] border border-gray-100 p-8 sm:p-12 mb-6 shadow-sm relative group overflow-hidden h-[400px] sm:h-[550px] flex items-center justify-center">
                <img 
                  src={camera.image} 
                  alt={camera.name} 
                  className="max-h-full object-contain mix-blend-multiply drop-shadow-2xl group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg">
                    {camera.brand}
                  </span>
                  {camera.badges?.slice(0, 1).map(badge => (
                    <span key={badge} className="px-4 py-1.5 bg-orange-500 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {gallery.map((img, idx) => (
                  <div key={idx} className={`w-24 h-24 rounded-2xl border-2 cursor-pointer flex-shrink-0 transition-all ${idx === 0 ? 'border-orange-500 shadow-lg' : 'border-gray-100 hover:border-orange-200'}`}>
                    <img src={img} className="w-full h-full object-cover rounded-xl p-1" alt="Thumbnail" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Scorecard & CTA */}
            <div className="lg:w-[45%] w-full">
              <div className="mb-8">
                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">
                  {camera.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-xl border border-yellow-100 shadow-sm">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-black">{camera.rating || 4.8}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-400">({camera.reviewCount} EXPERT REVIEWS)</span>
                </div>
              </div>

              {/* FEATURE SCORECARD */}
              <div className="bg-slate-900 rounded-[32px] p-8 text-white mb-10 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Award className="w-24 h-24" />
                </div>
                <h3 className="text-xs font-black tracking-[0.2em] text-orange-400 uppercase mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Professional Scorecard
                </h3>
                
                <div className="space-y-6">
                  {Object.entries(ratings).map(([feature, score]) => (
                    <div key={feature} className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                        <span>{feature}</span>
                        <span className="text-orange-400">{score}/10</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-1000" 
                          style={{ width: `${score * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRICE & ACTIONS */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Starting Market Price</p>
                  <div className="text-4xl font-black text-slate-900">₹{camera.price.toLocaleString('en-IN')}</div>
                </div>
                <button className="w-full sm:w-auto px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-orange-500/30 transition-all hover:-translate-y-1 active:scale-95">
                  Get Local Dealer Quotes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE DEEP DIVE: PROS & CONS */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">The Verdict</h2>
            <p className="text-gray-500 font-bold">Expert analysis of the {camera.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pros */}
            <div className="bg-white rounded-[40px] p-10 border border-green-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <CheckCircle className="w-32 h-32 text-green-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <CheckCircle className="w-6 h-6" />
                </div>
                What we Love
              </h3>
              <ul className="space-y-5">
                {camera.pros?.map((pro, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-700 font-bold">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-white rounded-[40px] p-10 border border-red-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <XCircle className="w-32 h-32 text-red-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
                  <XCircle className="w-6 h-6" />
                </div>
                The Trade-offs
              </h3>
              <ul className="space-y-5">
                {camera.cons?.map((con, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-700 font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VIDEO REVIEW SECTION */}
      {camera.youtube_url && (
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Professional Field Test</h2>
              <p className="text-gray-500 font-bold">See the {camera.name} in action</p>
            </div>
            <div className="aspect-video rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-50">
              <iframe 
                width="100%" 
                height="100%" 
                src={camera.youtube_url} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* 4. SAMPLE IMAGE GALLERY */}
      {camera.sample_images?.length > 0 && (
        <section className="py-24 bg-slate-950 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h3 className="text-xs font-black tracking-[0.2em] text-orange-500 uppercase mb-2">Sample Gallery</h3>
                <h2 className="text-4xl font-black tracking-tight">Real-world Samples</h2>
              </div>
              <p className="text-gray-400 font-bold hidden md:block max-w-sm text-right">
                All photos captured using the {camera.name} professional imaging system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {camera.sample_images.map((img, i) => (
                <div key={i} className={`rounded-3xl overflow-hidden h-80 group cursor-zoom-in ${i === 0 ? 'md:col-span-2' : ''}`}>
                  <img 
                    src={img} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt="Sample Shot" 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. REVIEWS & COMMUNITY */}
      <section className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h3 className="text-3xl font-black text-slate-900 mb-8">Community Voice</h3>
            <div className="bg-gray-50 rounded-[32px] p-10 border border-gray-100 mb-8">
              <div className="flex items-end gap-4 mb-4">
                <span className="text-7xl font-black text-slate-900 tracking-tighter">{camera.rating || 4.8}</span>
                <div className="mb-3">
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-5 h-5 ${star <= Math.round(camera.rating || 4.8) ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Global Rating</p>
                </div>
              </div>
              <p className="text-gray-500 font-bold">Based on {camera.reviewCount} verified users</p>
            </div>

            <ReviewForm cameraId={camera.id} />
          </div>

          <div className="lg:w-2/3 space-y-6">
            {camera.reviews && camera.reviews.length > 0 ? (
              camera.reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-orange-500 text-orange-500' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  {review.comment ? (
                    <p className="text-gray-700 font-bold leading-relaxed text-lg">{review.comment}</p>
                  ) : (
                    <p className="text-gray-400 italic font-bold">No written review provided.</p>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[40px] p-20 text-center">
                <Star className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                <h4 className="text-2xl font-black text-slate-900 mb-2">Be the First</h4>
                <p className="text-gray-500 font-bold mb-8">Share your professional experience with the world.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
