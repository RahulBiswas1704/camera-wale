const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service_role key to bypass RLS policies
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const camerasToSeed = [
  // SONY
  {
    id: 'sony-a7-iv',
    name: 'Sony Alpha A7 IV',
    brand: 'Sony',
    category: 'Mirrorless',
    slug: 'sony-a7-iv',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 214990,
    amazon_price: 214990,
    flipkart_price: 215990,
    badges: ['Top Rated', 'Best Hybrid'],
    specs: { sensorSize: 'Full Frame', megapixels: 33, videoResolution: '4K 60fps (Crop)', autofocusPoints: 759, batteryLife: 580 }
  },
  {
    id: 'sony-a7s-iii',
    name: 'Sony Alpha A7S III',
    brand: 'Sony',
    category: 'Mirrorless',
    slug: 'sony-a7s-iii',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 334990,
    amazon_price: 334000,
    flipkart_price: 335000,
    badges: ['Video King', 'Low Light'],
    specs: { sensorSize: 'Full Frame', megapixels: 12.1, videoResolution: '4K 120fps', autofocusPoints: 759, batteryLife: 600 }
  },
  {
    id: 'sony-a7r-v',
    name: 'Sony Alpha A7R V',
    brand: 'Sony',
    category: 'Mirrorless',
    slug: 'sony-a7r-v',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 334990,
    amazon_price: 334990,
    flipkart_price: 335000,
    badges: ['High Res', 'AI Autofocus'],
    specs: { sensorSize: 'Full Frame', megapixels: 61, videoResolution: '8K 24fps', autofocusPoints: 693, batteryLife: 530 }
  },
  {
    id: 'sony-fx3',
    name: 'Sony FX3',
    brand: 'Sony',
    category: 'Cinema',
    slug: 'sony-fx3',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 399990,
    amazon_price: 399000,
    flipkart_price: 400000,
    badges: ['Netflix Approved', 'Cinema Line'],
    specs: { sensorSize: 'Full Frame', megapixels: 12.1, videoResolution: '4K 120fps', autofocusPoints: 627, batteryLife: 600 }
  },
  
  // CANON
  {
    id: 'canon-r5',
    name: 'Canon EOS R5',
    brand: 'Canon',
    category: 'Mirrorless',
    slug: 'canon-r5',
    image: 'https://images.unsplash.com/photo-1502982720700-baf97d4220a8?q=80&w=2070&auto=format&fit=crop',
    price: 339990,
    amazon_price: 339990,
    flipkart_price: 340990,
    badges: ['8K Video', 'Pro Choice'],
    specs: { sensorSize: 'Full Frame', megapixels: 45, videoResolution: '8K 30fps / 4K 120fps', autofocusPoints: 1053, batteryLife: 490 }
  },
  {
    id: 'canon-r6-mark-ii',
    name: 'Canon EOS R6 Mark II',
    brand: 'Canon',
    category: 'Mirrorless',
    slug: 'canon-r6-mark-ii',
    image: 'https://images.unsplash.com/photo-1502982720700-baf97d4220a8?q=80&w=2070&auto=format&fit=crop',
    price: 209990,
    amazon_price: 209990,
    flipkart_price: 210990,
    badges: ['Speed King'],
    specs: { sensorSize: 'Full Frame', megapixels: 24.2, videoResolution: '4K 60fps (Uncropped)', autofocusPoints: 1053, batteryLife: 450 }
  },
  {
    id: 'canon-r8',
    name: 'Canon EOS R8',
    brand: 'Canon',
    category: 'Mirrorless',
    slug: 'canon-r8',
    image: 'https://images.unsplash.com/photo-1502982720700-baf97d4220a8?q=80&w=2070&auto=format&fit=crop',
    price: 132990,
    amazon_price: 132000,
    flipkart_price: 133000,
    badges: ['Entry Full Frame'],
    specs: { sensorSize: 'Full Frame', megapixels: 24.2, videoResolution: '4K 60fps', autofocusPoints: 1053, batteryLife: 220 }
  },

  // NIKON
  {
    id: 'nikon-z8',
    name: 'Nikon Z8',
    brand: 'Nikon',
    category: 'Mirrorless',
    slug: 'nikon-z8',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 343990,
    amazon_price: 343990,
    flipkart_price: 345000,
    badges: ['Flagship Features', 'No Mechanical Shutter'],
    specs: { sensorSize: 'Full Frame', megapixels: 45.7, videoResolution: '8K 60fps / 4K 120fps', autofocusPoints: 493, batteryLife: 340 }
  },
  {
    id: 'nikon-z6-iii',
    name: 'Nikon Z6 III',
    brand: 'Nikon',
    category: 'Mirrorless',
    slug: 'nikon-z6-iii',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 247990,
    amazon_price: 247000,
    flipkart_price: 248000,
    badges: ['Partially Stacked', 'Fast Readout'],
    specs: { sensorSize: 'Full Frame', megapixels: 24.5, videoResolution: '6K 60fps RAW', autofocusPoints: 273, batteryLife: 380 }
  },

  // FUJIFILM
  {
    id: 'fujifilm-x-t5',
    name: 'Fujifilm X-T5',
    brand: 'Fujifilm',
    category: 'Mirrorless',
    slug: 'fujifilm-x-t5',
    image: 'https://images.unsplash.com/photo-1502982720700-baf97d4220a8?q=80&w=2070&auto=format&fit=crop',
    price: 154990,
    amazon_price: 154000,
    flipkart_price: 155000,
    badges: ['Retro Design', 'High Res APS-C'],
    specs: { sensorSize: 'APS-C', megapixels: 40.2, videoResolution: '6.2K 30fps', autofocusPoints: 425, batteryLife: 580 }
  },
  {
    id: 'fujifilm-x-h2s',
    name: 'Fujifilm X-H2S',
    brand: 'Fujifilm',
    category: 'Mirrorless',
    slug: 'fujifilm-x-h2s',
    image: 'https://images.unsplash.com/photo-1502982720700-baf97d4220a8?q=80&w=2070&auto=format&fit=crop',
    price: 219990,
    amazon_price: 219000,
    flipkart_price: 220000,
    badges: ['Stacked Sensor', 'Speed'],
    specs: { sensorSize: 'APS-C', megapixels: 26.1, videoResolution: '6.2K 30fps / 4K 120fps', autofocusPoints: 425, batteryLife: 580 }
  },

  // PANASONIC
  {
    id: 'panasonic-lumix-s5-ii',
    name: 'Panasonic Lumix S5 II',
    brand: 'Panasonic',
    category: 'Mirrorless',
    slug: 'panasonic-lumix-s5-ii',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 174990,
    amazon_price: 174990,
    flipkart_price: 175990,
    badges: ['Video Centric', 'Phase Detect AF'],
    specs: { sensorSize: 'Full Frame', megapixels: 24.2, videoResolution: '6K 30fps / 4K 60fps', autofocusPoints: 779, batteryLife: 370 }
  },
  {
    id: 'panasonic-lumix-gh6',
    name: 'Panasonic Lumix GH6',
    brand: 'Panasonic',
    category: 'Mirrorless',
    slug: 'panasonic-lumix-gh6',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    price: 169990,
    amazon_price: 169000,
    flipkart_price: 170000,
    badges: ['Micro Four Thirds', 'Pro Video'],
    specs: { sensorSize: 'Micro Four Thirds', megapixels: 25.2, videoResolution: '5.7K 60fps / 4K 120fps', autofocusPoints: 315, batteryLife: 330 }
  }
];

async function seedDatabase() {
  console.log('🌱 Starting Database Seeding...');
  
  // Optional: Clear existing data first
  // console.log('Clearing existing cameras...');
  // const { error: deleteError } = await supabase.from('cameras').delete().neq('id', 'dummy');
  // if (deleteError) console.error('Error clearing data:', deleteError.message);
  
  console.log(`Inserting ${camerasToSeed.length} cameras...`);
  
  // Use upsert to avoid duplicate key errors if run multiple times
  const { data, error } = await supabase.from('cameras').upsert(camerasToSeed);
  
  if (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Successfully seeded database with ' + camerasToSeed.length + ' cameras!');
    process.exit(0);
  }
}

seedDatabase();
