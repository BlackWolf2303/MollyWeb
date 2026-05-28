const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMGS_DIR = path.join(__dirname, '../assets/imgs');
const QUALITY = 82;

function getImages(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getImages(full));
    } else if (/\.(jpe?g|png)$/i.test(entry.name) && !entry.name.startsWith('.')) {
      results.push(full);
    }
  }
  return results;
}

async function convert(filePath) {
  const outPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp');
  const before = fs.statSync(filePath).size;
  await sharp(filePath).webp({ quality: QUALITY }).toFile(outPath);
  const after = fs.statSync(outPath).size;
  const saved = (((before - after) / before) * 100).toFixed(1);
  const name = path.relative(IMGS_DIR, filePath);
  console.log(`✓ ${name}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${saved}%)`);
}

(async () => {
  const images = getImages(IMGS_DIR);
  console.log(`Converting ${images.length} images to WebP (quality ${QUALITY})...\n`);
  let totalBefore = 0, totalAfter = 0;
  for (const img of images) {
    const outPath = img.replace(/\.(jpe?g|png)$/i, '.webp');
    totalBefore += fs.statSync(img).size;
    await convert(img);
    totalAfter += fs.statSync(outPath).size;
  }
  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (-${(((totalBefore-totalAfter)/totalBefore)*100).toFixed(1)}%)`);
})();
