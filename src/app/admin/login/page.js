'use client';

import { useActionState } from 'react';
import { login } from '../actions';
import { Camera, Lock } from 'lucide-react';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-slate-900 p-3 rounded-2xl">
            <Camera className="w-10 h-10 text-orange-500" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Control Panel
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 font-medium">
          Camera-Wale Ecosystem
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                Secret Password
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 sm:text-sm font-medium"
                  placeholder="Enter the secret password"
                />
              </div>
            </div>

            {state?.error && (
              <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                {state.error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? 'Unlocking...' : 'Unlock Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
