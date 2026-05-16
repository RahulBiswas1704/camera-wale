'use client';

import { saveCamera } from '@/app/admin/actions';
import Link from 'next/link';
import { 
  Camera, Image as ImageIcon, DollarSign, ListChecks, 
  BarChart3, Youtube, Layers, Trash2, Plus 
} from 'lucide-react';
import { useState } from 'react';

export default function CameraForm({ initialData = null }) {
  const isEditing = !!initialData;
  const camera = initialData || {};
  const ratings = camera.feature_ratings || { video: 8, stills: 8, autofocus: 8, build: 8, battery: 8 };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-gray-100 overflow-hidden mb-20">
      <div className="px-10 py-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {isEditing ? `Refining ${camera.name}` : 'Register New Gear'}
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manual Database Entry</p>
        </div>
        <Link href="/admin" className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-500 hover:text-slate-900 transition-all shadow-sm">
          CANCEL
        </Link>
      </div>

      <form action={saveCamera} className="p-10 space-y-12">
        <input type="hidden" name="isEditing" value={isEditing.toString()} />
        {isEditing && <input type="hidden" name="id" value={camera.id} />}

        {/* 1. CORE IDENTITY */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Camera className="w-4 h-4" /> Core Identity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Product Name</label>
              <input type="text" name="name" required defaultValue={camera.name} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="e.g. Sony Alpha A7 IV" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Brand</label>
              <input type="text" name="brand" required defaultValue={camera.brand} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Sony, Canon..." />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
              <select name="category" required defaultValue={camera.category || 'Mirrorless'} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all appearance-none">
                <option value="Mirrorless">Mirrorless</option>
                <option value="DSLR">DSLR</option>
                <option value="Cinema">Cinema</option>
                <option value="Compact">Compact</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Slug</label>
              <input type="text" name="slug" required defaultValue={camera.slug} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="sony-a7-iv" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Main Image URL</label>
              <input type="text" name="image" required defaultValue={camera.image} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="https://..." />
            </div>
          </div>
        </div>

        {/* 2. TECHNICAL SPECIFICATIONS */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Layers className="w-4 h-4" /> Technical Specs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Sensor Type</label>
              <input type="text" name="sensor_type" defaultValue={camera.sensor_type} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Full Frame, APS-C" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Megapixels</label>
              <input type="number" step="0.1" name="megapixels" defaultValue={camera.megapixels} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="24.2" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Max Video</label>
              <input type="text" name="video_res" defaultValue={camera.video_res} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="4K 60fps" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Lens Mount</label>
              <input type="text" name="lens_mount" defaultValue={camera.lens_mount} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="E-Mount, RF-Mount" />
            </div>
          </div>
        </div>

        {/* 3. PRICING & MARKET */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Pricing & Market
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Base Price (₹)</label>
              <input type="number" name="price" required defaultValue={camera.price} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Amazon Price</label>
              <input type="number" name="amazon_price" defaultValue={camera.amazon_price} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Flipkart Price</label>
              <input type="number" name="flipkart_price" defaultValue={camera.flipkart_price} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Badges (CSV)</label>
              <input type="text" name="badges" defaultValue={camera.badges?.join(', ')} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Top Rated, Speed King" />
            </div>
          </div>
        </div>

        {/* 4. THE VERDICT (PROS & CONS) */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <ListChecks className="w-4 h-4" /> The Verdict
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50/30 p-6 rounded-[32px] border border-green-100">
              <label className="block text-[10px] font-black text-green-600 uppercase tracking-widest mb-4">Pros (Comma Separated)</label>
              <textarea name="pros" defaultValue={camera.pros?.join(', ')} rows="4" className="w-full bg-white border-0 rounded-2xl px-5 py-4 font-medium text-slate-900 focus:ring-2 focus:ring-green-500 transition-all shadow-sm" placeholder="Great AF, High Resolution..."></textarea>
            </div>
            <div className="bg-red-50/30 p-6 rounded-[32px] border border-red-100">
              <label className="block text-[10px] font-black text-red-600 uppercase tracking-widest mb-4">Cons (Comma Separated)</label>
              <textarea name="cons" defaultValue={camera.cons?.join(', ')} rows="4" className="w-full bg-white border-0 rounded-2xl px-5 py-4 font-medium text-slate-900 focus:ring-2 focus:ring-red-500 transition-all shadow-sm" placeholder="Expensive, Heavy..."></textarea>
            </div>
          </div>
        </div>

        {/* 5. MEDIA & SCORECARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-sm font-black text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Feature Ratings (1-10)
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {Object.keys(ratings).map(key => (
                <div key={key}>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{key}</label>
                  <input type="number" step="0.1" max="10" name={`rating_${key}`} defaultValue={ratings[key]} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-black text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm font-black text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Youtube className="w-4 h-4" /> External Media
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">YouTube Embed URL</label>
                <input type="text" name="youtube_url" defaultValue={camera.youtube_url} className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="https://www.youtube.com/embed/..." />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Gallery URLs (CSV)</label>
                <textarea name="gallery" defaultValue={camera.gallery?.join(', ')} rows="3" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-medium text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="url1, url2, url3..."></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Sample Image URLs (CSV)</label>
                <textarea name="sample_images" defaultValue={camera.sample_images?.join(', ')} rows="3" className="w-full bg-gray-50 border-0 rounded-2xl px-5 py-4 font-medium text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" placeholder="url1, url2..."></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* 6. SUBMIT */}
        <div className="pt-12 border-t border-gray-100 flex justify-end gap-4">
          <Link href="/admin" className="px-10 py-5 bg-white border border-gray-200 rounded-[24px] font-black text-xs uppercase tracking-widest text-gray-400 hover:text-slate-900 transition-all shadow-sm">
            DISCARD
          </Link>
          <button type="submit" className="px-12 py-5 bg-slate-900 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[24px] shadow-2xl shadow-slate-900/20 transition-all hover:-translate-y-1 active:scale-95">
            {isEditing ? 'COMMIT CHANGES' : 'CREATE UNIT'}
          </button>
        </div>
      </form>
    </div>
  );
}
