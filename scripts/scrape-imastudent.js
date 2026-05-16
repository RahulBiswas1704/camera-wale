import { chromium } from 'playwright';
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

// Helper to determine brand from title
const determineBrand = (title) => {
  const t = title.toLowerCase();
  if (t.includes('sony')) return 'Sony';
  if (t.includes('canon')) return 'Canon';
  if (t.includes('nikon')) return 'Nikon';
  if (t.includes('fujifilm')) return 'Fujifilm';
  if (t.includes('panasonic') || t.includes('lumix')) return 'Panasonic';
  if (t.includes('leica')) return 'Leica';
  return 'Other';
};

// Helper to determine category from title
const determineCategory = (title) => {
  const t = title.toLowerCase();
  if (t.includes('dslr')) return 'DSLR';
  if (t.includes('point') || t.includes('shoot')) return 'Point & Shoot';
  if (t.includes('action') || t.includes('gopro') || t.includes('insta360')) return 'Action';
  if (t.includes('cinema') || t.includes('blackmagic')) return 'Cinema';
  return 'Mirrorless';
};

// Helper to clean price string to number
const cleanPrice = (priceStr) => {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
};

// Generate a slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

async function scrapeImastudent() {
  console.log(`🤖 Initializing Imastudent Crawler...`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  let allCameras = [];
  let currentPage = 1;
  const maxPages = 10; // Subagent found ~9 pages

  while (currentPage <= maxPages) {
    const url = `https://www.imastudent.com/all-cameras?pagenumber=${currentPage}`;
      
    console.log(`\n📄 Crawling Page ${currentPage}: ${url}`);
    
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      // Add a human-like delay
      await new Promise(r => setTimeout(r, Math.random() * 2000 + 1000));

      const products = await page.$$eval('.item-box', elements => {
        return elements.map(el => {
          const title = el.querySelector('.product-title a')?.innerText;
          const priceRaw = el.querySelector('.price.actual-price')?.innerText;
          const url = el.querySelector('.product-title a')?.href;
          const image = el.querySelector('.picture img')?.src;
          
          return { title, priceRaw, url, image };
        });
      });

      if (products.length === 0) {
        console.log('   🛑 No products found. Ending crawl.');
        break;
      }

      console.log(`   ✅ Extracted ${products.length} products.`);

      for (const prod of products) {
        if (!prod.title) continue;
        
        const slug = generateSlug(prod.title);
        const price = cleanPrice(prod.priceRaw);
        
        if (price === 0) continue;

        const cameraData = {
          id: `ima-${slug}`, // Prefixing to avoid conflicts with Fotocentre
          slug: slug,
          name: prod.title,
          brand: determineBrand(prod.title),
          category: determineCategory(prod.title),
          image: prod.image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
          price: price,
          badges: ['Scraped', 'Imastudent'],
          sensor_type: 'Full Frame',
          megapixels: 24.2,
          video_res: '4K 60fps',
          lens_mount: 'Standard',
          specs: {
            source_url: prod.url
          }
        };

        allCameras.push(cameraData);
      }

      currentPage++;
    } catch (err) {
      console.error(`   ❌ Error on page ${currentPage}:`, err.message);
      break;
    }
  }

  console.log(`\n========================================`);
  console.log(`🚀 CRAWL COMPLETE. Found ${allCameras.length} valid cameras.`);
  
  // Fetch existing slugs to avoid collisions
  const { data: existingData } = await supabase.from('cameras').select('slug');
  const seenSlugs = new Set(existingData?.map(item => item.slug) || []);
  
  const uniqueCamerasMap = new Map();
  
  allCameras.forEach(cam => {
    let finalSlug = cam.slug;
    let counter = 1;
    while (seenSlugs.has(finalSlug)) {
      finalSlug = `${cam.slug}-${counter}`;
      counter++;
    }
    cam.slug = finalSlug;
    seenSlugs.add(finalSlug);
    uniqueCamerasMap.set(cam.id, cam);
  });
  
  const uniqueCameras = Array.from(uniqueCamerasMap.values());
  console.log(`🧹 Deduplicated down to ${uniqueCameras.length} unique cameras.`);

  console.log(`💾 Injecting into Supabase...`);
  
  const batchSize = 50;
  let successCount = 0;

  for (let i = 0; i < uniqueCameras.length; i += batchSize) {
    const batch = uniqueCameras.slice(i, i + batchSize);
    const { error } = await supabase.from('cameras').upsert(batch, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ Error inserting batch:`, error.message);
    } else {
      successCount += batch.length;
      console.log(`   ✅ Inserted batch (${batch.length} items)`);
    }
  }

  console.log('========================================');
  console.log(`✅ Total Success: ${successCount}`);
  console.log('========================================');
  
  await browser.close();
}

scrapeImastudent();
