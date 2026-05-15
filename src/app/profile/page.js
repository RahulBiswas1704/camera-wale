import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getUserFavorites } from '@/data/cameras'
import CameraCard from '@/components/CameraCard'
import { User, Heart, Settings, Camera as CameraIcon } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const favorites = await getUserFavorites()

  return (
    <div className="min-h-screen bg-white">
      {/* Profile Header */}
      <div className="bg-slate-900 py-16 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-3xl bg-orange-500 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-orange-500/20 ring-4 ring-slate-800">
            {user.email[0].toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">My Profile</h1>
            <p className="text-slate-400 font-medium text-lg">{user.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
              <div className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 text-sm font-bold text-slate-300 flex items-center gap-2">
                <Heart className="w-4 h-4 text-orange-500" /> {favorites.length} Saved Gear
              </div>
              <div className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 text-sm font-bold text-slate-300 flex items-center gap-2">
                <CameraIcon className="w-4 h-4 text-slate-400" /> Professional Member
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="flex items-center gap-4 mb-10" id="favorites">
          <div className="p-3 bg-orange-50 rounded-2xl">
            <Heart className="w-8 h-8 text-orange-500 fill-orange-500" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">My Wishlist</h2>
            <p className="text-slate-500 font-medium">Your curated collection of professional gear.</p>
          </div>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((camera) => (
              <CameraCard key={camera.id} camera={camera} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-100">
              <Heart className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Your wishlist is empty</h3>
            <p className="text-slate-500 font-medium mb-8">Start exploring and save the cameras you love.</p>
            <Link href="/" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-slate-900/10 hover:bg-orange-500 transition-colors">
              Explore Cameras
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

// I need to import Link
import Link from 'next/link'
