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
  if (t.includes('om system') || t.includes('olympus')) return 'Olympus';
  if (t.includes('leica')) return 'Leica';
  return 'Other';
};

// Helper to determine category from title
const determineCategory = (title) => {
  const t = title.toLowerCase();
  if (t.includes('dslr')) return 'DSLR';
  if (t.includes('point') || t.includes('shoot') || t.includes('compact')) return 'Point & Shoot';
  if (t.includes('cinema') || t.includes('video')) return 'Cinema';
  if (t.includes('instant')) return 'Instant';
  return 'Mirrorless'; // default assumption for modern interchangeable lens cameras
};

// Helper to clean price string to number
const cleanPrice = (priceStr) => {
  if (!priceStr) return 0;
  // Extract only digits
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

async function scrapeFotocentre() {
  console.log(`🤖 Initializing Fotocentre India Crawler...`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  let allCameras = [];
  let currentPage = 1;
  const maxPages = 15; // safety limit

  while (currentPage <= maxPages) {
    const url = currentPage === 1 
      ? 'https://fotocentreindia.com/product-category/cameras/'
      : `https://fotocentreindia.com/product-category/cameras/page/${currentPage}/`;
      
    console.log(`\n📄 Crawling Page ${currentPage}: ${url}`);
    
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      // If the page doesn't exist (e.g. 404 past the last page), break
      if (response && response.status() === 404) {
        console.log('   🛑 Reached end of pagination (404).');
        break;
      }

      // Add a small human-like delay
      await new Promise(r => setTimeout(r, Math.random() * 2000 + 1000));

      const products = await page.$$eval('li.product', elements => {
        return elements.map(el => {
          const title = el.querySelector('.woocommerce-loop-product__title')?.innerText;
          // Some items have a sale price, some just regular. Getting the 'ins' element first gets the current active price if on sale.
          const priceRaw = el.querySelector('ins .woocommerce-Price-amount bdi')?.innerText || el.querySelector('.woocommerce-Price-amount bdi')?.innerText;
          const url = el.querySelector('a.woocommerce-LoopProduct-link')?.href;
          const image = el.querySelector('img.attachment-woocommerce_thumbnail')?.src;
          
          return { title, priceRaw, url, image };
        });
      });

      if (products.length === 0) {
        console.log('   🛑 No products found on this page. Ending crawl.');
        break;
      }

      console.log(`   ✅ Extracted ${products.length} products.`);

      for (const prod of products) {
        if (!prod.title) continue;
        
        const slug = generateSlug(prod.title);
        const price = cleanPrice(prod.priceRaw);
        
        // Skip products without price (Out of Stock / Coming Soon on this site usually lack valid price text in the expected spot)
        if (price === 0) continue;

        const cameraData = {
          id: slug,
          slug: slug,
          name: prod.title,
          brand: determineBrand(prod.title),
          category: determineCategory(prod.title),
          image: prod.image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
          price: price,
          badges: ['Scraped'],
          // Default mock specs since catalog pages don't have deep specs
          sensor_type: 'Full Frame',
          megapixels: 24.2,
          video_res: '4K 60fps',
          lens_mount: 'Standard',
          specs: {
            source_url: prod.url // Store the original URL for deep scraping later!
          }
        };

        allCameras.push(cameraData);
      }

      currentPage++;
    } catch (err) {
      console.error(`   ❌ Error on page ${currentPage}:`, err.message);
      break; // Stop on network errors to prevent infinite loops
    }
  }

  console.log(`\n========================================`);
  console.log(`🚀 CRAWL COMPLETE. Found ${allCameras.length} valid cameras.`);
  
  // Deduplicate cameras by id to prevent 'ON CONFLICT DO UPDATE command cannot affect row a second time'
  const uniqueCamerasMap = new Map();
  allCameras.forEach(cam => {
    uniqueCamerasMap.set(cam.id, cam);
  });
  const uniqueCameras = Array.from(uniqueCamerasMap.values());
  console.log(`🧹 Deduplicated down to ${uniqueCameras.length} unique cameras.`);
  
  console.log(`💾 Injecting into Supabase...`);
  
  // Batch insert into Supabase
  const batchSize = 50;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < uniqueCameras.length; i += batchSize) {
    const batch = uniqueCameras.slice(i, i + batchSize);
    
    const { error } = await supabase
      .from('cameras')
      .upsert(batch, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ Error inserting batch ${i / batchSize + 1}:`, error.message);
      failCount += batch.length;
    } else {
      successCount += batch.length;
      console.log(`   ✅ Inserted batch ${i / batchSize + 1} (${batch.length} items)`);
    }
  }

  console.log('========================================');
  console.log(`✅ DB Success: ${successCount}`);
  console.log(`❌ DB Failed: ${failCount}`);
  console.log('========================================');
  
  await browser.close();
}

scrapeFotocentre();
