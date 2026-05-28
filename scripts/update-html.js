const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Replace all .jpg/.jpeg/.png in img src with .webp
html = html.replace(/(src="\.\/assets\/imgs\/[^"]+)\.(jpe?g|png)"/gi, '$1.webp"');

// 2. Add loading="lazy" to all <img> tags that don't already have it,
//    except the hero banner (banner.webp) which is above the fold
html = html.replace(/<img(?![^>]*loading=)([^>]*src="[^"]*assets\/imgs\/(?!banner)[^"]*"[^>]*)>/gi,
  '<img$1 loading="lazy">');

fs.writeFileSync(htmlPath, html);
console.log('✓ Updated all image src to .webp');
console.log('✓ Added loading="lazy" to below-fold images');
