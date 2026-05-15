import { supabase } from '@/lib/supabase';

// Local Fallback Data (Used if Supabase is not configured yet)
export const fallbackCameras = [
  {
    id: 'sony-a7-iv',
    name: 'Sony Alpha A7 IV',
    brand: 'Sony',
    category: 'Mirrorless',
    slug: 'sony-a7-iv',
    image: '/images/sony-a7-iv.png',
    price: 214990,
    badges: ['Top Rated', 'Best Hybrid'],
    amazonPrice: 214990,
    flipkartPrice: 215990,
    specs: {
      sensorSize: 'Full Frame (35.9 x 23.9 mm)',
      megapixels: 33,
      videoResolution: '4K 60fps (Crop)',
      autofocusPoints: 759,
      batteryLife: 580,
    },
  },
  {
    id: 'canon-r6-mark-ii',
    name: 'Canon EOS R6 Mark II',
    brand: 'Canon',
    category: 'Mirrorless',
    slug: 'canon-r6-mark-ii',
    image: '/images/canon-r6-mk2.png',
    price: 209990,
    badges: ['Speed King'],
    amazonPrice: 209990,
    flipkartPrice: 210990,
    specs: {
      sensorSize: 'Full Frame (35.9 x 23.9 mm)',
      megapixels: 24.2,
      videoResolution: '4K 60fps (Uncropped)',
      autofocusPoints: 1053,
      batteryLife: 450,
    },
  },
  {
    id: 'nikon-z6-ii',
    name: 'Nikon Z6 II',
    brand: 'Nikon',
    category: 'Mirrorless',
    slug: 'nikon-z6-ii',
    image: 'https://images.unsplash.com/photo-1502982720700-baf97d4220a8?q=80&w=2070&auto=format&fit=crop',
    price: 164990,
    badges: ['Value for Money'],
    amazonPrice: 164990,
    flipkartPrice: 165990,
    specs: {
      sensorSize: 'Full Frame (35.9 x 23.9 mm)',
      megapixels: 24.5,
      videoResolution: '4K 30fps',
      autofocusPoints: 273,
      batteryLife: 410,
    },
  },
  {
    id: 'panasonic-lumix-s5-ii',
    name: 'Panasonic Lumix S5 II',
    brand: 'Panasonic',
    category: 'Mirrorless',
    slug: 'panasonic-lumix-s5-ii',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 174990,
    badges: ['Video Centric'],
    amazonPrice: 174990,
    flipkartPrice: 175990,
    specs: {
      sensorSize: 'Full Frame (35.6 x 23.8 mm)',
      megapixels: 24.2,
      videoResolution: '6K 30fps / 4K 60fps',
      autofocusPoints: 779,
      batteryLife: 370,
    },
  }
];

/**
 * Fetches all cameras from Supabase. Falls back to local data if missing.
 */
export async function getCameras() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http')) {
      return fallbackCameras; // No valid URL
    }
    const { data, error } = await supabase.from('cameras').select('*');
    if (error) throw error;
    if (data && data.length > 0) return data;
  } catch (err) {
    console.error('Supabase fetch failed, falling back to mock data:', err.message);
  }
  return fallbackCameras;
}

/**
 * Fetches a specific camera by ID.
 */
export async function getCameraById(id) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http')) {
      return fallbackCameras.find((camera) => camera.id === id);
    }
    const { data, error } = await supabase.from('cameras').select('*').eq('id', id).single();
    if (error) throw error;
    if (data) return data;
  } catch (err) {
    console.error('Supabase fetch failed, falling back to mock data:', err.message);
  }
  return fallbackCameras.find((camera) => camera.id === id);
}

/**
 * Fetches a specific camera by Slug.
 */
export async function getCameraBySlug(slug) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http')) {
      return fallbackCameras.find((camera) => camera.slug === slug);
    }
    const { data, error } = await supabase.from('cameras').select('*').eq('slug', slug).single();
    if (error) throw error;
    if (data) return data;
  } catch (err) {
    console.error('Supabase fetch failed, falling back to mock data:', err.message);
  }
  return fallbackCameras.find((camera) => camera.slug === slug);
}
