import { getCameras } from '@/data/cameras';
import Link from 'next/link';
import { Pencil, Trash2, PlusCircle, Camera } from 'lucide-react';
import { deleteCamera } from './actions';

export default async function AdminDashboard() {
  const cameras = await getCameras();
  
  // Calculate Stats
  const totalCameras = cameras.length;
  const brands = [...new Set(cameras.map(c => c.brand))];
  const brandStats = brands.map(brand => ({
    name: brand,
    count: cameras.filter(c => c.brand === brand).length
  })).sort((a, b) => b.count - a.count);

  const avgPrice = totalCameras > 0 
    ? Math.round(cameras.reduce((sum, c) => sum + (c.price || 0), 0) / totalCameras)
    : 0;

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin Console</h1>
          <p className="text-gray-500 font-bold">Managing {totalCameras} professional camera models.</p>
        </div>
        <Link href="/admin/cameras/new" className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 flex items-center gap-2 hover:-translate-y-1 active:scale-95">
          <PlusCircle className="w-5 h-5" /> Add New Gear
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl shadow-slate-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Camera className="w-24 h-24" />
          </div>
          <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Inventory</p>
          <h3 className="text-5xl font-black">{totalCameras}</h3>
          <p className="text-slate-400 text-xs font-bold mt-2">Active models in database</p>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Brands Covered</p>
          <h3 className="text-5xl font-black text-slate-900">{brands.length}</h3>
          <p className="text-gray-500 text-xs font-bold mt-2">Market leading manufacturers</p>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Avg. Market Price</p>
          <h3 className="text-5xl font-black text-slate-900">₹{avgPrice.toLocaleString('en-IN')}</h3>
          <p className="text-gray-500 text-xs font-bold mt-2">Value per professional unit</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-gray-200 rounded-[40px] shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-900">Live Inventory</h2>
          <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
            {totalCameras} Cameras Found
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 text-gray-500 text-[10px] uppercase font-black tracking-[0.15em] border-b border-gray-100">
              <tr>
                <th scope="col" className="px-8 py-5">Visual</th>
                <th scope="col" className="px-8 py-5">Model Identity</th>
                <th scope="col" className="px-8 py-5">Manufacturer</th>
                <th scope="col" className="px-8 py-5">Price Matrix</th>
                <th scope="col" className="px-8 py-5 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-bold text-slate-700">
              {cameras.map((camera) => (
                <tr key={camera.id} className="hover:bg-orange-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="h-14 w-14 flex items-center justify-center bg-white border border-gray-100 rounded-2xl p-2 shadow-sm group-hover:scale-110 transition-transform">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={camera.image} alt={camera.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-base text-slate-900">{camera.name}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest">{camera.category}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-slate-900 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">{camera.brand}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-slate-900">₹{camera.price?.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-green-600 uppercase tracking-widest">Live Quote</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-3">
                      <Link href={`/admin/cameras/${camera.id}`} className="p-3 text-gray-400 hover:text-orange-500 bg-white hover:bg-orange-50 rounded-2xl border border-gray-100 transition-all shadow-sm hover:shadow-md">
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <form action={deleteCamera.bind(null, camera.id)}>
                        <button className="p-3 text-gray-400 hover:text-red-500 bg-white hover:bg-red-50 rounded-2xl border border-gray-100 transition-all shadow-sm hover:shadow-md">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
