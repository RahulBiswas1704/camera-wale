'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(prevState, formData) {
  const password = formData.get('password');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (password === adminPassword) {
    // Set a secure httpOnly cookie
    (await cookies()).set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    redirect('/admin');
  } else {
    return { error: 'Invalid password' };
  }
}

export async function logout() {
  (await cookies()).delete('admin_session');
  redirect('/admin/login');
}

export async function deleteCamera(id) {
  const { error } = await supabaseAdmin.from('cameras').delete().eq('id', id);
  if (error) {
    console.error('Delete error:', error);
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/compare');
}

export async function saveCamera(formData) {
  const isEditing = formData.get('isEditing') === 'true';
  const rawBadges = formData.get('badges');
  const badges = rawBadges ? rawBadges.split(',').map((b) => b.trim()).filter(b => b) : [];

  const cameraData = {
    id: formData.get('id') || formData.get('slug'), // Fallback to slug if new
    name: formData.get('name'),
    brand: formData.get('brand'),
    category: formData.get('category'),
    slug: formData.get('slug'),
    image: formData.get('image'),
    price: parseFloat(formData.get('price')),
    amazon_price: parseFloat(formData.get('amazon_price')) || null,
    flipkart_price: parseFloat(formData.get('flipkart_price')) || null,
    badges: badges,
    specs: {
      sensorSize: formData.get('sensorSize'),
      megapixels: parseFloat(formData.get('megapixels')),
      videoResolution: formData.get('videoResolution'),
      autofocusPoints: parseInt(formData.get('autofocusPoints'), 10),
      batteryLife: parseInt(formData.get('batteryLife'), 10),
    }
  };

  const { error } = await supabaseAdmin.from('cameras').upsert(cameraData);

  if (error) {
    console.error('Save error:', error);
    return { error: error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/compare');
  redirect('/admin');
}
