'use client';

import { useActionState, useEffect } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

export default function Newsletter() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, null);

  return (
    <section className="py-20 bg-white px-4 border-t border-gray-100">
      <div className="max-w-4xl mx-auto bg-orange-50 rounded-3xl p-8 md:p-12 text-center border border-orange-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-500"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
        
        <div className="relative z-10">
          <Mail className="w-12 h-12 text-orange-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Never miss a price drop.</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
            Join 10,000+ photographers who get weekly alerts on the best camera deals, new gear reviews, and expert buying guides.
          </p>

          {state?.success ? (
            <div className="flex flex-col items-center justify-center space-y-3 bg-white p-6 rounded-2xl max-w-md mx-auto border border-green-100 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
              <p className="text-green-800 font-bold text-lg">You're on the list!</p>
              <p className="text-gray-500 text-sm">Keep an eye on your inbox for our next update.</p>
            </div>
          ) : (
            <form action={formAction} className="flex flex-col max-w-md mx-auto gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-900 font-medium placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all disabled:opacity-70 flex justify-center items-center"
                >
                  {isPending ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {state?.error && (
                <p className="text-red-500 text-sm font-bold mt-2">{state.error}</p>
              )}
            </form>
          )}
          <p className="text-xs text-gray-400 mt-4 font-medium">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
