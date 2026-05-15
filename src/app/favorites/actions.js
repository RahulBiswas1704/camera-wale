'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function toggleFavorite(cameraId) {
  const supabase = await createClient()

  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Please login to add favorites' }
  }

  // Check if it's already favorited
  const { data: existing } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('camera_id', cameraId)
    .single()

  if (existing) {
    // Remove from favorites
    await supabase.from('favorites').delete().eq('id', existing.id)
  } else {
    // Add to favorites
    await supabase.from('favorites').insert({
      user_id: user.id,
      camera_id: cameraId
    })
  }

  revalidatePath('/', 'layout')
  return { success: true }
}
