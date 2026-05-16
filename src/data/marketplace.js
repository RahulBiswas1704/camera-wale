import { createClient as createServerClient } from '@/utils/supabase/server';

export async function getUsedGear() {
  try {
    const supabase = await createServerClient();
    
    // Fetch gear that is available, order by newest first
    const { data, error } = await supabase
      .from('used_gear')
      .select('*, user:user_id(email)')
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching used gear:', error.message);
    return [];
  }
}

export async function getUsedGearById(id) {
  try {
    const supabase = await createServerClient();
    
    const { data, error } = await supabase
      .from('used_gear')
      .select('*, user:user_id(email)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching gear ${id}:`, error.message);
    return null;
  }
}
