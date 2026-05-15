import { supabase } from '@/lib/supabase';
import { createClient as createServerClient } from '@/utils/supabase/server';

// Local Fallback Data
export const fallbackCameras = [
  {
    id: 'sony-a7-iv',
    name: 'Sony Alpha A7 IV',
    brand: 'Sony',
    category: 'Mirrorless',
    slug: 'sony-a7-iv',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 214990,
    badges: ['Top Rated', 'Best Hybrid'],
    specs: { sensorSize: 'Full Frame', megapixels: 33, videoResolution: '4K 60fps (Crop)', autofocusPoints: 759, batteryLife: 580 }
  },
  {
    id: 'canon-r6-mark-ii',
    name: 'Canon EOS R6 Mark II',
    brand: 'Canon',
    category: 'Mirrorless',
    slug: 'canon-r6-mark-ii',
    image: 'https://images.unsplash.com/photo-1502982720700-baf97d4220a8?q=80&w=2070&auto=format&fit=crop',
    price: 209990,
    badges: ['Speed King'],
    specs: { sensorSize: 'Full Frame', megapixels: 24.2, videoResolution: '4K 60fps (Uncropped)', autofocusPoints: 1053, batteryLife: 450 }
  }
];

export async function getCameras() {
  try {
    const supabaseServer = await createServerClient();
    const { data: { user } } = await supabaseServer.auth.getUser();

    const { data: cameras, error } = await supabase.from('cameras').select('*');
    if (error) throw error;

    if (user && cameras) {
      // Fetch favorites for this user
      const { data: favorites } = await supabaseServer
        .from('favorites')
        .select('camera_id')
        .eq('user_id', user.id);
      
      const favoriteIds = new Set(favorites?.map(f => f.camera_id) || []);
      
      return cameras.map(camera => ({
        ...camera,
        isFavorited: favoriteIds.has(camera.id)
      }));
    }

    return cameras || fallbackCameras;
  } catch (err) {
    console.error('Fetch cameras failed:', err.message);
    return fallbackCameras;
  }
}

export async function getCameraById(id) {
  try {
    const supabaseServer = await createServerClient();
    const { data: { user } } = await supabaseServer.auth.getUser();

    const { data: camera, error } = await supabase.from('cameras').select('*').eq('id', id).single();
    if (error) throw error;

    if (user && camera) {
      const { data: favorite } = await supabaseServer
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('camera_id', id)
        .single();
      
      return { ...camera, isFavorited: !!favorite };
    }

    return camera;
  } catch (err) {
    return fallbackCameras.find(c => c.id === id);
  }
}

export async function getCameraBySlug(slug) {
  try {
    const supabaseServer = await createServerClient();
    const { data: { user } } = await supabaseServer.auth.getUser();

    const { data: camera, error } = await supabase.from('cameras').select('*').eq('slug', slug).single();
    if (error) throw error;

    if (user && camera) {
      const { data: favorite } = await supabaseServer
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('camera_id', camera.id)
        .single();
      
      return { ...camera, isFavorited: !!favorite };
    }

    return camera;
  } catch (err) {
    return fallbackCameras.find(c => c.slug === slug);
  }
}

export async function getUserFavorites() {
  try {
    const supabaseServer = await createServerClient();
    const { data: { user } } = await supabaseServer.auth.getUser();

    if (!user) return [];

    const { data: favorites, error } = await supabaseServer
      .from('favorites')
      .select('cameras (*)')
      .eq('user_id', user.id);

    if (error) throw error;
    
    return favorites.map(f => ({ ...f.cameras, isFavorited: true }));
  } catch (err) {
    console.error('Fetch favorites failed:', err.message);
    return [];
  }
}
