import Link from 'next/link'
import { login } from '@/app/auth/actions'
import { Camera, Mail, Lock, ArrowRight } from 'lucide-react'

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-slate-900 p-3 rounded-2xl">
            <Camera className="w-10 h-10 text-orange-500" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome back to Camera-Wale
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          Login to manage your favorites and gear.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-slate-100 shadow-2xl shadow-slate-200/50 sm:rounded-3xl sm:px-10">
          <form action={login} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                Email Address
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 sm:text-sm font-medium transition"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 sm:text-sm font-medium transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {params?.error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold text-center">
                {params.error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-slate-900/10 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition"
              >
                Log In <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500 font-medium">
              New to Camera-Wale?{' '}
              <Link href="/signup" className="text-orange-500 font-bold hover:text-orange-600 transition">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
