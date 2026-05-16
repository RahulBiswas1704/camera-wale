-- Step 1: Add the new structured columns
ALTER TABLE cameras
ADD COLUMN IF NOT EXISTS sensor_type TEXT,
ADD COLUMN IF NOT EXISTS megapixels NUMERIC,
ADD COLUMN IF NOT EXISTS video_res TEXT,
ADD COLUMN IF NOT EXISTS lens_mount TEXT;

-- Step 2: Backfill the existing cameras from the JSONB specs column where possible
-- (lens_mount wasn't in the original mock JSON, so we will set it manually)

UPDATE cameras SET
  sensor_type = specs->>'sensorSize',
  megapixels = (specs->>'megapixels')::numeric,
  video_res = specs->>'videoResolution',
  lens_mount = 'E-Mount'
WHERE id = 'sony-a7-iv';

UPDATE cameras SET
  sensor_type = specs->>'sensorSize',
  megapixels = (specs->>'megapixels')::numeric,
  video_res = specs->>'videoResolution',
  lens_mount = 'RF-Mount'
WHERE id = 'canon-r6-mark-ii';

UPDATE cameras SET
  sensor_type = specs->>'sensorSize',
  megapixels = (specs->>'megapixels')::numeric,
  video_res = specs->>'videoResolution',
  lens_mount = 'Z-Mount'
WHERE id = 'nikon-z6-ii';

UPDATE cameras SET
  sensor_type = specs->>'sensorSize',
  megapixels = (specs->>'megapixels')::numeric,
  video_res = specs->>'videoResolution',
  lens_mount = 'L-Mount'
WHERE id = 'panasonic-lumix-s5-ii';
