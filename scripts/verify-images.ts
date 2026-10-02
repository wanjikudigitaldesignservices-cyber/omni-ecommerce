import fs from 'fs';
import path from 'path';

const manifestPath = path.join(process.cwd(), 'assets', 'image-manifest.json');
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(manifestPath)) {
  console.error('Manifest not found');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

let hasError = false;

for (const img of manifest) {
  const filePath = path.join(publicDir, img.filePath);
  
  if (!fs.existsSync(filePath)) {
    console.error(`[FAIL] Image missing for slot ${img.slot}: ${img.filePath}`);
    hasError = true;
    continue;
  }
  
  const stats = fs.statSync(filePath);
  if (stats.size === 0) {
    console.error(`[FAIL] Image is empty for slot ${img.slot}: ${img.filePath}`);
    hasError = true;
    continue;
  }
  
  if (!img.altText || img.altText.toLowerCase().includes('image of') || img.altText.includes('.jpg')) {
    console.error(`[FAIL] Invalid alt text for slot ${img.slot}: "${img.altText}"`);
    hasError = true;
    continue;
  }
  
  console.log(`[PASS] ${img.id} verified (${Math.round(stats.size / 1024)} KB)`);
}

if (hasError) {
  console.error('\nImage verification failed.');
  process.exit(1);
} else {
  console.log('\nAll images verified successfully.');
}
