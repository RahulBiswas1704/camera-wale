'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function submitReview(formData) {
  const supabase = await createClient()

  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Please login to submit a review' }
  }

  const cameraId = formData.get('cameraId')
  const rating = parseInt(formData.get('rating'), 10)
  const comment = formData.get('comment')

  if (!rating || rating < 1 || rating > 5) {
    return { error: 'Please provide a valid rating between 1 and 5' }
  }

  // Add the review
  const { error } = await supabase.from('reviews').insert({
    user_id: user.id,
    camera_id: cameraId,
    rating,
    comment
  })

  if (error) {
    // 23505 is PostgreSQL unique violation code
    if (error.code === '23505') {
       return { error: 'You have already reviewed this camera' }
    }
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}
