import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const enrichmentData = [
  {
    id: 'sony-a7-iv',
    gallery: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000',
      'https://images.unsplash.com/photo-1620674156044-52b714665d46?q=80&w=2000',
      'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=2000'
    ],
    pros: [
      'Exceptional 33MP resolution for stills',
      'Outstanding 4K 60fps video quality',
      'Best-in-class Real-time Eye AF',
      'Massive ecosystem of E-mount lenses',
      'Fully articulating touchscreen'
    ],
    cons: [
      '4K 60fps is heavily cropped',
      'Menu system can be complex for beginners',
      'Rear screen resolution is mediocre'
    ],
    sample_images: [
      'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2000',
      'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?q=80&w=2000',
      'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=2000'
    ],
    feature_ratings: {
      video: 9.2,
      stills: 9.5,
      autofocus: 9.8,
      build: 8.5,
      battery: 8.8
    },
    youtube_url: 'https://www.youtube.com/embed/S_S7Z06uA-8' // Sony A7 IV Review by Chris Niccolls
  },
  {
    id: 'canon-r6-mark-ii',
    gallery: [
      'https://images.unsplash.com/photo-1502982720700-baf97d4220a8?q=80&w=2070',
      'https://images.unsplash.com/photo-1616423641334-9721067e2a9b?q=80&w=2000',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=2000'
    ],
    pros: [
      'Incredible 40fps burst shooting',
      'Uncropped 4K 60fps video',
      'Superior 8-stop In-Body Image Stabilization',
      'Very ergonomic and comfortable grip',
      'Excellent dual-pixel CMOS AF II'
    ],
    cons: [
      'RF lens ecosystem is expensive',
      '24.2MP might feel low for high-end landscapes',
      'Occasional overheating in extreme 4K scenarios'
    ],
    sample_images: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000'
    ],
    feature_ratings: {
      video: 9.4,
      stills: 9.0,
      autofocus: 9.6,
      build: 9.0,
      battery: 8.5
    },
    youtube_url: 'https://www.youtube.com/embed/5U7zB8X6E2U' // Canon R6 II Review
  }
];

async function enrichData() {
  console.log('💎 Starting Data Enrichment...');

  for (const item of enrichmentData) {
    console.log(`✨ Enriching ${item.id}...`);
    const { error } = await supabase
      .from('cameras')
      .update({
        gallery: item.gallery,
        pros: item.pros,
        cons: item.cons,
        sample_images: item.sample_images,
        feature_ratings: item.feature_ratings,
        youtube_url: item.youtube_url
      })
      .eq('id', item.id);

    if (error) {
      console.error(`❌ Error enriching ${item.id}:`, error.message);
    } else {
      console.log(`✅ ${item.id} enriched successfully.`);
    }
  }

  // Generalized logic for other cameras
  console.log('🤖 Generating general pros/cons for remaining cameras...');
  const { data: cameras } = await supabase.from('cameras').select('*');
  
  for (const cam of cameras) {
    if (enrichmentData.find(d => d.id === cam.id)) continue;

    const pros = ['High Quality Sensor', 'Professional Controls', 'Modern Connectivity'];
    const cons = ['Premium Pricing', 'Requires High-end Lenses'];

    if (cam.megapixels > 40) pros.push('Incredible detail with ' + cam.megapixels + 'MP');
    if (cam.video_res?.includes('8K')) pros.push('Future-proof 8K Video');
    if (cam.sensor_type?.includes('Full')) pros.push('Stunning Full-Frame Depth of Field');

    const ratings = {
      video: cam.video_res?.includes('8K') ? 9.5 : cam.video_res?.includes('4K') ? 8.5 : 7.0,
      stills: cam.megapixels > 40 ? 9.5 : cam.megapixels > 20 ? 8.5 : 7.5,
      autofocus: 8.5,
      build: 8.0,
      battery: 7.5
    };

    await supabase
      .from('cameras')
      .update({
        pros,
        cons,
        feature_ratings: ratings,
        gallery: [cam.image] // Use primary image as first gallery item
      })
      .eq('id', cam.id);
  }

  console.log('🎉 Enrichment Complete!');
}

enrichData();
