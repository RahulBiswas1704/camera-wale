'use client';

import { useActionState } from 'react';
import { listUsedGear } from '@/app/marketplace/actions';
import { Camera, IndianRupee } from 'lucide-react';
import Link from 'next/link';

export default function SellGearPage() {
  const [state, formAction, isPending] = useActionState(listUsedGear, null);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-8">
          <Link href="/marketplace" className="text-orange-500 font-bold hover:underline mb-4 inline-block">
            &larr; Back to Marketplace
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900">List Your Gear</h1>
          <p className="text-gray-500 mt-2">Fill out the details below to post your item on the marketplace.</p>
        </div>

        <form action={formAction} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          {state?.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl font-bold">
              {state.error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Listing Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="title" 
                required
                placeholder="e.g., Sony A7 III Body Only - Mint Condition"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Camera/Lens Model</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Camera className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    name="camera_model" 
                    placeholder="e.g., Sony A7 III"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Condition <span className="text-red-500">*</span></label>
                <select 
                  name="condition" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-medium bg-white"
                >
                  <option value="Like New">Like New (10/10)</option>
                  <option value="Excellent">Excellent (9/10)</option>
                  <option value="Good">Good (7-8/10)</option>
                  <option value="Fair">Fair (Needs TLC)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Asking Price (₹) <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="number" 
                  name="price" 
                  required
                  min="0"
                  step="1"
                  placeholder="e.g., 125000"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-medium text-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
              <textarea 
                name="description" 
                rows="5"
                placeholder="Describe the condition, shutter count, accessories included, and any defects..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-medium resize-none"
              ></textarea>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link 
              href="/marketplace"
              className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={isPending}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all disabled:opacity-70 flex justify-center items-center shadow-lg shadow-orange-500/20 hover:-translate-y-0.5"
            >
              {isPending ? 'Publishing...' : 'List Item'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
