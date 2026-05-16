'use client';

import { useActionState } from 'react';
import { submitReview } from '@/app/cameras/[slug]/actions';
import { Star, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function ReviewForm({ cameraId }) {
  const [state, formAction, isPending] = useActionState(submitReview, null);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);

  if (state?.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <h4 className="text-green-800 font-bold text-lg mb-2">Thank you for your review!</h4>
        <p className="text-green-600 text-sm">Your feedback helps the community make better choices.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
      <input type="hidden" name="cameraId" value={cameraId} />
      <input type="hidden" name="rating" value={rating} />
      
      <div className="mb-4">
        <label className="block text-sm font-bold text-slate-700 mb-2">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              <Star 
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating) 
                    ? 'fill-orange-500 text-orange-500' 
                    : 'text-gray-300'
                }`} 
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="comment" className="block text-sm font-bold text-slate-700 mb-2">
          Your Review (Optional)
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 flex items-start pointer-events-none">
            <MessageSquare className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            id="comment"
            name="comment"
            rows={3}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 sm:text-sm font-medium transition resize-none"
            placeholder="What did you like or dislike about this camera?"
          ></textarea>
        </div>
      </div>

      {state?.error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold text-center">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-slate-800 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
