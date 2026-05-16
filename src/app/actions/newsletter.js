'use server'

import { createClient } from '@/utils/supabase/server'

export async function subscribeToNewsletter(prevState, formData) {
  const email = formData.get('email');
  
  if (!email || !email.includes('@')) {
    return { error: 'Please provide a valid email address.' };
  }

  const supabase = await createClient();

  // Insert email
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email });

  if (error) {
    if (error.code === '23505') {
      return { success: true }; // If already subscribed, return success to prevent enum attacks
    }
    return { error: 'Failed to subscribe. Please try again later.' };
  }

  return { success: true };
}
