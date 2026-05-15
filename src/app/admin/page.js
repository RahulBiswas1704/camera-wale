import { getCameras } from '@/data/cameras';
import Link from 'next/link';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import { deleteCamera } from './actions';

export default async function AdminDashboard() {
  const cameras = await getCameras();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Database Dashboard</h1>
          <p className="text-gray-500 font-medium">Manage all your camera models and pricing.</p>
        </div>
        <Link href="/admin/cameras/new" className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition shadow-md shadow-orange-500/20 flex items-center gap-2">
          <PlusCircle className="w-5 h-5" /> Add Camera
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-extrabold tracking-wider border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4">Image</th>
                <th scope="col" className="px-6 py-4">Model</th>
                <th scope="col" className="px-6 py-4">Brand</th>
                <th scope="col" className="px-6 py-4">Price (₹)</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-slate-800">
              {cameras.map((camera) => (
                <tr key={camera.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={camera.image} alt={camera.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold">{camera.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-bold">{camera.brand}</span>
                  </td>
                  <td className="px-6 py-4">₹{camera.price.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/cameras/${camera.id}`} className="p-2 text-gray-400 hover:text-orange-500 bg-white hover:bg-orange-50 rounded-lg border border-gray-200 transition">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <form action={deleteCamera.bind(null, camera.id)}>
                        <button className="p-2 text-gray-400 hover:text-red-500 bg-white hover:bg-red-50 rounded-lg border border-gray-200 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {cameras.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No cameras found. Click "Add Camera" to start building your database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
