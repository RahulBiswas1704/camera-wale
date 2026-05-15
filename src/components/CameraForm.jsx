'use client';

import { saveCamera } from '@/app/admin/actions';
import Link from 'next/link';

export default function CameraForm({ initialData = null }) {
  const isEditing = !!initialData;
  const camera = initialData || {};
  const specs = camera.specs || {};

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-extrabold text-slate-900">
          {isEditing ? `Edit ${camera.name}` : 'Add New Camera'}
        </h2>
        <Link href="/admin" className="text-sm font-bold text-gray-500 hover:text-slate-900 transition">
          Cancel
        </Link>
      </div>

      <form action={saveCamera} className="p-8 space-y-8">
        <input type="hidden" name="isEditing" value={isEditing.toString()} />
        {isEditing && <input type="hidden" name="id" value={camera.id} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4 md:col-span-2 border-b border-gray-100 pb-6">
            <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                <input type="text" name="name" required defaultValue={camera.name} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Brand</label>
                <input type="text" name="brand" required defaultValue={camera.brand} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <select name="category" required defaultValue={camera.category || 'Mirrorless'} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                  <option value="Mirrorless">Mirrorless</option>
                  <option value="DSLR">DSLR</option>
                  <option value="Cinema">Cinema</option>
                  <option value="Compact">Compact</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Slug (URL friendly)</label>
                <input type="text" name="slug" required defaultValue={camera.slug} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                <input type="text" name="image" required defaultValue={camera.image} placeholder="/images/logo.png or https://..." className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4 md:col-span-2 border-b border-gray-100 pb-6">
            <h3 className="text-lg font-bold text-slate-900">Pricing & Badges</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Base Price (₹)</label>
                <input type="number" name="price" required defaultValue={camera.price} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Amazon Price</label>
                <input type="number" name="amazon_price" defaultValue={camera.amazon_price} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Flipkart Price</label>
                <input type="number" name="flipkart_price" defaultValue={camera.flipkart_price} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Badges (comma separated)</label>
                <input type="text" name="badges" defaultValue={camera.badges?.join(', ')} placeholder="Top Rated, Speed King" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-bold text-slate-900">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Sensor Size</label>
                <input type="text" name="sensorSize" required defaultValue={specs.sensorSize} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Megapixels</label>
                <input type="number" step="0.1" name="megapixels" required defaultValue={specs.megapixels} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Video Resolution</label>
                <input type="text" name="videoResolution" required defaultValue={specs.videoResolution} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Autofocus Points</label>
                <input type="number" name="autofocusPoints" required defaultValue={specs.autofocusPoints} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Battery Life (shots)</label>
                <input type="number" name="batteryLife" required defaultValue={specs.batteryLife} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-gray-200 flex justify-end gap-3">
          <Link href="/admin" className="px-6 py-3 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition">
            Cancel
          </Link>
          <button type="submit" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-md">
            {isEditing ? 'Save Changes' : 'Create Camera'}
          </button>
        </div>
      </form>
    </div>
  );
}
