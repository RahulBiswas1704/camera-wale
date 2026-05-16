'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function listUsedGear(prevState, formData) {
  const supabase = await createClient()

  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to list gear.' }
  }

  const title = formData.get('title')
  const camera_model = formData.get('camera_model')
  const condition = formData.get('condition')
  const price = parseFloat(formData.get('price'))
  const description = formData.get('description')

  // Validation
  if (!title || !price || isNaN(price)) {
    return { error: 'Title and a valid price are required.' }
  }

  if (!['Like New', 'Excellent', 'Good', 'Fair'].includes(condition)) {
    return { error: 'Invalid condition selected.' }
  }

  // Insert into database
  const { data, error } = await supabase
    .from('used_gear')
    .insert({
      user_id: user.id,
      title,
      camera_model,
      condition,
      price,
      description,
      status: 'available'
    })
    .select()

  if (error) {
    return { error: 'Failed to list gear: ' + error.message }
  }

  // Revalidate the marketplace listing page
  revalidatePath('/marketplace')
  
  // Return success or redirect
  redirect('/marketplace')
}
