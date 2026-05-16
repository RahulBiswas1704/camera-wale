import { createClient as createServerClient } from '@/utils/supabase/server';

export const fallbackGuides = [
  {
    id: '1',
    title: 'Best Cameras Under ₹1,50,000 for Creators in 2026',
    slug: 'best-cameras-under-150k',
    cover_image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
    content: `
      ## Introduction
      Choosing a camera under ₹1.5 Lakhs is one of the most common dilemmas for creators in India. 
      In this budget, you're stepping away from entry-level gear and into professional hybrid cameras that can handle both serious photography and high-quality 4K video.

      ## 1. Sony Alpha A7 III
      Despite being a few years old, the Sony A7 III remains a powerhouse. It offers a 24.2MP full-frame sensor, excellent autofocus, and great battery life.
      
      ## 2. Fujifilm X-T5
      If you prefer the APS-C format and love physical dials, the X-T5 is a beast. With 40MP and 6.2K video recording, it's a phenomenal hybrid choice.

      ## Conclusion
      Both cameras offer incredible value. The choice ultimately depends on your ecosystem preference and whether you prioritize full-frame performance or vintage tactile controls.
    `,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'DSLR vs Mirrorless: What Should You Buy?',
    slug: 'dslr-vs-mirrorless-2026',
    cover_image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1974&auto=format&fit=crop',
    content: `
      ## The Great Debate
      The camera industry has definitively shifted towards mirrorless technology. However, the used market is flooded with incredible deals on professional DSLRs. So, what should you buy?

      ## Why Mirrorless?
      - Superior autofocus with AI subject tracking
      - In-body image stabilization (IBIS)
      - Lighter and more compact bodies
      - What-you-see-is-what-you-get electronic viewfinders (EVF)

      ## Why DSLR?
      - Better battery life
      - Optical viewfinders for zero lag
      - Massive lens ecosystem available for cheap on the used market
      - Rugged, proven professional bodies

      ## The Verdict
      If you're starting fresh, buy mirrorless. If you're on a tight budget and want professional image quality, a used DSLR is the best value in photography right now.
    `,
    created_at: new Date().toISOString()
  }
];

export async function getGuides() {
  try {
    const supabaseServer = await createServerClient();
    const { data: guides, error } = await supabaseServer
      .from('guides')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return guides && guides.length > 0 ? guides : fallbackGuides;
  } catch (err) {
    console.error('Fetch guides failed:', err.message);
    return fallbackGuides;
  }
}

export async function getGuideBySlug(slug) {
  try {
    const supabaseServer = await createServerClient();
    const { data: guide, error } = await supabaseServer
      .from('guides')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return guide;
  } catch (err) {
    return fallbackGuides.find(g => g.slug === slug);
  }
}
