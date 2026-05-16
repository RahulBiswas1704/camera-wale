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

// Utility: Clean Megapixels
const cleanMegapixels = (str) => {
  if (!str) return null;
  const match = str.match(/(\d+(\.\d+)?)\s*(MP|Megapixel)/i);
  return match ? parseFloat(match[1]) : null;
};

// Utility: Clean Sensor Type
const cleanSensorType = (str) => {
  if (!str) return 'Full Frame';
  if (str.toLowerCase().includes('full')) return 'Full Frame';
  if (str.toLowerCase().includes('aps-c') || str.toLowerCase().includes('crop')) return 'APS-C';
  if (str.toLowerCase().includes('four third')) return 'Micro Four Thirds';
  if (str.toLowerCase().includes('medium')) return 'Medium Format';
  return str.split('(')[0].trim(); // Get the prefix before any details
};

// Utility: Clean Video Resolution
const cleanVideoRes = (str) => {
  if (!str) return '4K';
  if (str.toUpperCase().includes('8K')) return '8K';
  if (str.toUpperCase().includes('6K')) return '6K';
  if (str.toUpperCase().includes('4K')) return '4K';
  if (str.toUpperCase().includes('FULL HD') || str.toUpperCase().includes('1080')) return '1080p';
  return '4K';
};

async function processCamera(page, camera) {
  const url = camera.specs?.source_url;
  if (!url) return null;

  console.log(`\n🔍 Processing: ${camera.name}`);
  console.log(`   🌐 URL: ${url}`);

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Add a random delay to avoid bot detection
    await new Promise(r => setTimeout(r, Math.random() * 3000 + 2000));

    let extractedData = {};

    if (url.includes('fotocentreindia.com')) {
      // Fotocentre Logic
      extractedData = await page.$$eval('#cgkit-tab-description table tr', rows => {
        const data = {};
        rows.forEach(row => {
          const label = row.querySelector('th')?.innerText || row.querySelector('td:first-child')?.innerText;
          const value = row.querySelector('td:last-child')?.innerText;
          if (label && value) data[label.trim()] = value.trim();
        });
        return data;
      });

      const sensorStr = extractedData['Sensor'] || extractedData['Sensor Size'];
      return {
        megapixels: cleanMegapixels(sensorStr),
        sensor_type: cleanSensorType(sensorStr),
        video_res: cleanVideoRes(extractedData['Video Recording'] || extractedData['Movies']),
        lens_mount: extractedData['Lens Mount'] || 'Standard'
      };

    } else if (url.includes('imastudent.com')) {
      // Imastudent Logic
      // Sometimes we need to click the Specifications tab
      const specTab = await page.$('li[aria-controls="ui-id-2"]');
      if (specTab) await specTab.click();

      extractedData = await page.$$eval('.product-specs-table tr', rows => {
        const data = {};
        rows.forEach(row => {
          const label = row.querySelector('.spec-name')?.innerText;
          const value = row.querySelector('.spec-value')?.innerText;
          if (label && value) data[label.trim()] = value.trim();
        });
        return data;
      });

      return {
        megapixels: cleanMegapixels(extractedData['Sensor Resolution']),
        sensor_type: cleanSensorType(extractedData['Sensor Type']),
        video_res: cleanVideoRes(extractedData['Recording Modes'] || extractedData['Video Recording']),
        lens_mount: extractedData['Lens Mount'] || 'Standard'
      };
    }

    return null;
  } catch (err) {
    console.error(`   ❌ Failed to scrape ${camera.name}:`, err.message);
    return null;
  }
}

async function runDeepExtractor() {
  console.log('🚀 Initializing Deep Spec Extractor...');
  
  // 1. Fetch cameras from DB that have a source_url
  const { data: cameras, error } = await supabase
    .from('cameras')
    .select('id, name, specs')
    .not('specs', 'is', null);

  if (error) {
    console.error('❌ Error fetching cameras:', error.message);
    return;
  }

  // Filter for those that have source_url
  const targets = cameras.filter(c => c.specs?.source_url);
  console.log(`📈 Found ${targets.length} cameras to process.`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  let successCount = 0;

  for (const camera of targets) {
    const specs = await processCamera(page, camera);
    
    if (specs) {
      console.log(`   ✨ Extracted: ${specs.megapixels} MP | ${specs.sensor_type} | ${specs.video_res}`);
      
      const { error: updateError } = await supabase
        .from('cameras')
        .update({
          megapixels: specs.megapixels,
          sensor_type: specs.sensor_type,
          video_res: specs.video_res,
          lens_mount: specs.lens_mount
        })
        .eq('id', camera.id);

      if (updateError) {
        console.error(`   ❌ DB Update Error:`, updateError.message);
      } else {
        console.log(`   ✅ Database Updated.`);
        successCount++;
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`🏁 FINISHED. Successfully updated ${successCount} cameras.`);
  console.log(`========================================`);

  await browser.close();
}

runDeepExtractor();
