// scripts/brand-seed.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables. Make sure .env.local exists with SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const masterCameraList = [
  // ================= SONY INDIA =================
  {
    id: 'sony-a1',
    name: 'Sony Alpha 1',
    brand: 'Sony',
    category: 'Mirrorless',
    slug: 'sony-a1',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 559990,
    amazon_price: 559990,
    flipkart_price: 565990,
    badges: ['Flagship', 'Speed & Resolution'],
    specs: { autofocusPoints: 759, batteryLife: 530 },
    sensor_type: 'Full Frame Stacked CMOS',
    megapixels: 50.1,
    video_res: '8K 30fps / 4K 120fps',
    lens_mount: 'E-Mount'
  },
  {
    id: 'sony-a9-iii',
    name: 'Sony Alpha 9 III',
    brand: 'Sony',
    category: 'Mirrorless',
    slug: 'sony-a9-iii',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 529990,
    amazon_price: 529990,
    flipkart_price: 535000,
    badges: ['Global Shutter', 'Sports Pro'],
    specs: { autofocusPoints: 759, batteryLife: 400 },
    sensor_type: 'Full Frame Global Shutter',
    megapixels: 24.6,
    video_res: '4K 120fps (No Crop)',
    lens_mount: 'E-Mount'
  },
  {
    id: 'sony-a7s-iii',
    name: 'Sony Alpha 7S III',
    brand: 'Sony',
    category: 'Mirrorless',
    slug: 'sony-a7s-iii',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 299990,
    amazon_price: 299990,
    flipkart_price: 301990,
    badges: ['Low Light King', 'Video Pro'],
    specs: { autofocusPoints: 759, batteryLife: 600 },
    sensor_type: 'Full Frame BSI-CMOS',
    megapixels: 12.1,
    video_res: '4K 120fps',
    lens_mount: 'E-Mount'
  },
  {
    id: 'sony-a7r-v',
    name: 'Sony Alpha 7R V',
    brand: 'Sony',
    category: 'Mirrorless',
    slug: 'sony-a7r-v',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 334990,
    amazon_price: 334990,
    flipkart_price: 335990,
    badges: ['High Resolution', 'AI Autofocus'],
    specs: { autofocusPoints: 693, batteryLife: 530 },
    sensor_type: 'Full Frame BSI-CMOS',
    megapixels: 61.0,
    video_res: '8K 24fps / 4K 60fps',
    lens_mount: 'E-Mount'
  },
  {
    id: 'sony-a6700',
    name: 'Sony Alpha 6700',
    brand: 'Sony',
    category: 'Mirrorless',
    slug: 'sony-a6700',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 136990,
    amazon_price: 136990,
    flipkart_price: 137990,
    badges: ['APS-C Flagship'],
    specs: { autofocusPoints: 759, batteryLife: 570 },
    sensor_type: 'APS-C BSI-CMOS',
    megapixels: 26.0,
    video_res: '4K 120fps',
    lens_mount: 'E-Mount'
  },
  // Discontinued / Legacy Legends
  {
    id: 'sony-a7-ii',
    name: 'Sony Alpha 7 II',
    brand: 'Sony',
    category: 'Mirrorless',
    slug: 'sony-a7-ii',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 74990,
    amazon_price: 74990,
    flipkart_price: 75990,
    badges: ['Discontinued', 'Budget Full Frame'],
    specs: { autofocusPoints: 117, batteryLife: 350 },
    sensor_type: 'Full Frame CMOS',
    megapixels: 24.3,
    video_res: '1080p 60fps',
    lens_mount: 'E-Mount'
  },

  // ================= CANON INDIA =================
  {
    id: 'canon-eos-r3',
    name: 'Canon EOS R3',
    brand: 'Canon',
    category: 'Mirrorless',
    slug: 'canon-eos-r3',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 499995,
    amazon_price: 499995,
    flipkart_price: 505000,
    badges: ['Sports Pro', 'Eye Control AF'],
    specs: { autofocusPoints: 1053, batteryLife: 860 },
    sensor_type: 'Full Frame Stacked CMOS',
    megapixels: 24.1,
    video_res: '6K 60fps RAW / 4K 120fps',
    lens_mount: 'RF-Mount'
  },
  {
    id: 'canon-eos-r5',
    name: 'Canon EOS R5',
    brand: 'Canon',
    category: 'Mirrorless',
    slug: 'canon-eos-r5',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 339995,
    amazon_price: 339995,
    flipkart_price: 341990,
    badges: ['8K Video', 'High Resolution'],
    specs: { autofocusPoints: 1053, batteryLife: 490 },
    sensor_type: 'Full Frame CMOS',
    megapixels: 45.0,
    video_res: '8K 30fps RAW / 4K 120fps',
    lens_mount: 'RF-Mount'
  },
  {
    id: 'canon-eos-r8',
    name: 'Canon EOS R8',
    brand: 'Canon',
    category: 'Mirrorless',
    slug: 'canon-eos-r8',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 132995,
    amazon_price: 132995,
    flipkart_price: 133990,
    badges: ['Lightweight Full Frame'],
    specs: { autofocusPoints: 1053, batteryLife: 220 },
    sensor_type: 'Full Frame CMOS',
    megapixels: 24.2,
    video_res: '4K 60fps (Uncropped)',
    lens_mount: 'RF-Mount'
  },
  // Discontinued / Legacy Legends
  {
    id: 'canon-5d-mark-iv',
    name: 'Canon EOS 5D Mark IV',
    brand: 'Canon',
    category: 'DSLR',
    slug: 'canon-5d-mark-iv',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 229995,
    amazon_price: 229995,
    flipkart_price: 235000,
    badges: ['Legendary DSLR', 'Wedding Classic'],
    specs: { autofocusPoints: 61, batteryLife: 900 },
    sensor_type: 'Full Frame CMOS',
    megapixels: 30.4,
    video_res: '4K 30fps (Crop)',
    lens_mount: 'EF-Mount'
  },
  {
    id: 'canon-1dx-mark-iii',
    name: 'Canon EOS-1D X Mark III',
    brand: 'Canon',
    category: 'DSLR',
    slug: 'canon-1dx-mark-iii',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 575995,
    amazon_price: 575995,
    flipkart_price: 580000,
    badges: ['Discontinued Flagship', 'DSLR Peak'],
    specs: { autofocusPoints: 191, batteryLife: 2850 },
    sensor_type: 'Full Frame CMOS',
    megapixels: 20.1,
    video_res: '5.5K RAW / 4K 60fps',
    lens_mount: 'EF-Mount'
  },

  // ================= NIKON INDIA =================
  {
    id: 'nikon-z9',
    name: 'Nikon Z9',
    brand: 'Nikon',
    category: 'Mirrorless',
    slug: 'nikon-z9',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 475995,
    amazon_price: 475995,
    flipkart_price: 480000,
    badges: ['Flagship', 'No Mechanical Shutter'],
    specs: { autofocusPoints: 493, batteryLife: 740 },
    sensor_type: 'Full Frame Stacked CMOS',
    megapixels: 45.7,
    video_res: '8K 60fps RAW / 4K 120fps',
    lens_mount: 'Z-Mount'
  },
  {
    id: 'nikon-z8',
    name: 'Nikon Z8',
    brand: 'Nikon',
    category: 'Mirrorless',
    slug: 'nikon-z8',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 344995,
    amazon_price: 344995,
    flipkart_price: 345990,
    badges: ['Mini Z9', 'Hybrid King'],
    specs: { autofocusPoints: 493, batteryLife: 340 },
    sensor_type: 'Full Frame Stacked CMOS',
    megapixels: 45.7,
    video_res: '8K 60fps RAW / 4K 120fps',
    lens_mount: 'Z-Mount'
  },
  {
    id: 'nikon-zf',
    name: 'Nikon Zf',
    brand: 'Nikon',
    category: 'Mirrorless',
    slug: 'nikon-zf',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 176995,
    amazon_price: 176995,
    flipkart_price: 178990,
    badges: ['Retro Design', 'Expeed 7'],
    specs: { autofocusPoints: 273, batteryLife: 380 },
    sensor_type: 'Full Frame BSI-CMOS',
    megapixels: 24.5,
    video_res: '4K 60fps (Crop)',
    lens_mount: 'Z-Mount'
  },
  // Discontinued / Legacy Legends
  {
    id: 'nikon-d850',
    name: 'Nikon D850',
    brand: 'Nikon',
    category: 'DSLR',
    slug: 'nikon-d850',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 224995,
    amazon_price: 224995,
    flipkart_price: 228000,
    badges: ['Legendary DSLR', 'Landscape King'],
    specs: { autofocusPoints: 153, batteryLife: 1840 },
    sensor_type: 'Full Frame BSI-CMOS',
    megapixels: 45.7,
    video_res: '4K 30fps',
    lens_mount: 'F-Mount'
  },
  {
    id: 'nikon-d750',
    name: 'Nikon D750',
    brand: 'Nikon',
    category: 'DSLR',
    slug: 'nikon-d750',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 115995,
    amazon_price: 115995,
    flipkart_price: 118000,
    badges: ['Discontinued', 'Wedding Workhorse'],
    specs: { autofocusPoints: 51, batteryLife: 1230 },
    sensor_type: 'Full Frame CMOS',
    megapixels: 24.3,
    video_res: '1080p 60fps',
    lens_mount: 'F-Mount'
  }
];

async function seedDatabase() {
  console.log(`🤖 Initializing Master Seed Script for ${masterCameraList.length} cameras...`);
  
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < masterCameraList.length; i++) {
    const camera = masterCameraList[i];
    console.log(`\n[${i + 1}/${masterCameraList.length}] 💾 Injecting: ${camera.name} (${camera.brand})`);
    
    try {
      const { error } = await supabase
        .from('cameras')
        .upsert(camera, { onConflict: 'id' });

      if (error) {
        console.error(`   ❌ DB Error for ${camera.name}:`, error.message);
        failCount++;
      } else {
        console.log(`   ✅ Success!`);
        successCount++;
      }

    } catch (err) {
      console.error(`   ❌ Failed to inject ${camera.name}:`, err.message);
      failCount++;
    }
  }

  console.log('\n========================================');
  console.log('🛑 DATABASE SEED COMPLETE');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('========================================');
}

seedDatabase();
