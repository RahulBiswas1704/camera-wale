'use client'

import { useState, useTransition } from 'react'
import { Heart } from 'lucide-react'
import { toggleFavorite } from '@/app/favorites/actions'
import { useRouter } from 'next/navigation'

export default function FavoriteButton({ cameraId, isFavorited: initialIsFavorited }) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Optimistic update
    setIsFavorited(!isFavorited)

    startTransition(async () => {
      const result = await toggleFavorite(cameraId)
      if (result?.error) {
        // Rollback if error
        setIsFavorited(isFavorited)
        router.push('/login')
      }
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-95 z-10 ${
        isFavorited 
          ? 'bg-orange-500 text-white' 
          : 'bg-white/90 text-slate-400 hover:text-orange-500 backdrop-blur-sm'
      }`}
    >
      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
    </button>
  )
}
