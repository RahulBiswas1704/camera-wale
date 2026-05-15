-- Create the cameras table
CREATE TABLE cameras (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT NOT NULL,
  price NUMERIC NOT NULL,
  amazon_price NUMERIC,
  flipkart_price NUMERIC,
  badges TEXT[],
  specs JSONB NOT NULL
);

-- Insert the initial mock data into the cameras table
INSERT INTO cameras (id, name, brand, category, slug, image, price, amazon_price, flipkart_price, badges, specs)
VALUES
  (
    'sony-a7-iv',
    'Sony Alpha A7 IV',
    'Sony',
    'Mirrorless',
    'sony-a7-iv',
    '/images/sony-a7-iv.png',
    214990,
    214990,
    215990,
    ARRAY['Top Rated', 'Best Hybrid'],
    '{"sensorSize": "Full Frame (35.9 x 23.9 mm)", "megapixels": 33, "videoResolution": "4K 60fps (Crop)", "autofocusPoints": 759, "batteryLife": 580}'::JSONB
  ),
  (
    'canon-r6-mark-ii',
    'Canon EOS R6 Mark II',
    'Canon',
    'Mirrorless',
    'canon-r6-mark-ii',
    '/images/canon-r6-mk2.png',
    209990,
    209990,
    210990,
    ARRAY['Speed King'],
    '{"sensorSize": "Full Frame (35.9 x 23.9 mm)", "megapixels": 24.2, "videoResolution": "4K 60fps (Uncropped)", "autofocusPoints": 1053, "batteryLife": 450}'::JSONB
  ),
  (
    'nikon-z6-ii',
    'Nikon Z6 II',
    'Nikon',
    'Mirrorless',
    'nikon-z6-ii',
    'https://images.unsplash.com/photo-1502982720700-baf97d4220a8?q=80&w=2070&auto=format&fit=crop',
    164990,
    164990,
    165990,
    ARRAY['Value for Money'],
    '{"sensorSize": "Full Frame (35.9 x 23.9 mm)", "megapixels": 24.5, "videoResolution": "4K 30fps", "autofocusPoints": 273, "batteryLife": 410}'::JSONB
  ),
  (
    'panasonic-lumix-s5-ii',
    'Panasonic Lumix S5 II',
    'Panasonic',
    'Mirrorless',
    'panasonic-lumix-s5-ii',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    174990,
    174990,
    175990,
    ARRAY['Video Centric'],
    '{"sensorSize": "Full Frame (35.6 x 23.8 mm)", "megapixels": 24.2, "videoResolution": "6K 30fps / 4K 60fps", "autofocusPoints": 779, "batteryLife": 370}'::JSONB
  );
