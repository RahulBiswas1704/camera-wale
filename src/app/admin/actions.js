'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(prevState, formData) {
  const adminId = formData.get('adminId')?.toString().trim();
  const password = formData.get('password')?.toString().trim();
  
  const targetId = process.env.ADMIN_ID?.trim();
  const targetPassword = process.env.ADMIN_PASSWORD?.trim();

  console.log('Login attempt:', { 
    idMatch: adminId === targetId, 
    passMatch: password === targetPassword,
    envLoaded: !!(targetId && targetPassword)
  });

  if (adminId === targetId && password === targetPassword) {
    // Set a secure httpOnly cookie
    (await cookies()).set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    redirect('/admin');
  } else {
    return { error: 'Invalid credentials' };
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

  const rawGallery = formData.get('gallery');
  const gallery = rawGallery ? rawGallery.split(',').map((b) => b.trim()).filter(b => b) : [];

  const rawPros = formData.get('pros');
  const pros = rawPros ? rawPros.split(',').map((b) => b.trim()).filter(b => b) : [];

  const rawCons = formData.get('cons');
  const cons = rawCons ? rawCons.split(',').map((b) => b.trim()).filter(b => b) : [];

  const rawSamples = formData.get('sample_images');
  const sample_images = rawSamples ? rawSamples.split(',').map((b) => b.trim()).filter(b => b) : [];

  const cameraData = {
    id: formData.get('id') || formData.get('slug'),
    name: formData.get('name'),
    brand: formData.get('brand'),
    category: formData.get('category'),
    slug: formData.get('slug'),
    image: formData.get('image'),
    price: parseFloat(formData.get('price')),
    amazon_price: parseFloat(formData.get('amazon_price')) || null,
    flipkart_price: parseFloat(formData.get('flipkart_price')) || null,
    badges: badges,
    
    // Top-level spec columns
    megapixels: parseFloat(formData.get('megapixels')),
    sensor_type: formData.get('sensor_type'),
    video_res: formData.get('video_res'),
    lens_mount: formData.get('lens_mount'),
    
    // Enriched fields
    gallery: gallery,
    pros: pros,
    cons: cons,
    sample_images: sample_images,
    youtube_url: formData.get('youtube_url'),
    feature_ratings: {
      video: parseFloat(formData.get('rating_video')) || 8.0,
      stills: parseFloat(formData.get('rating_stills')) || 8.0,
      autofocus: parseFloat(formData.get('rating_autofocus')) || 8.0,
      build: parseFloat(formData.get('rating_build')) || 8.0,
      battery: parseFloat(formData.get('rating_battery')) || 8.0,
    },
    specs: {} // Keep empty for now as we moved everything to columns
  };

  const { error } = await supabaseAdmin.from('cameras').upsert(cameraData);

  if (error) {
    console.error('Save error:', error);
    return { error: error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/cameras');
  revalidatePath(`/cameras/${cameraData.slug}`);
  revalidatePath('/compare');
  redirect('/admin');
}
