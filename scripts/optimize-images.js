const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '..', 'Website Formated Hotel content');
const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'images');

const PROPERTIES = [
  { folder: 'Lucky Arrow Retreat', slug: 'lucky-arrow' },
  { folder: 'Halcyon', slug: 'halcyon' },
  { folder: 'Portola', slug: 'portola' },
  { folder: 'Four Seasons Austin', slug: 'four-seasons' },
  { folder: 'Riu Mexico', slug: 'riu-mexico' },
];

const SIZES = [
  { suffix: '-full', width: 2400, quality: 80 },
  { suffix: '-thumb', width: 1200, quality: 75 },
];

async function optimizeImage(inputPath, outputDir, baseName) {
  for (const size of SIZES) {
    const outputName = `${baseName}${size.suffix}.jpg`;
    const outputPath = path.join(outputDir, outputName);

    if (fs.existsSync(outputPath)) {
      continue;
    }

    await sharp(inputPath)
      .resize(size.width, null, { withoutEnlargement: true })
      .jpeg({ quality: size.quality, mozjpeg: true })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const kb = Math.round(stats.size / 1024);
    console.log(`  ${outputName} (${kb} KB)`);
  }
}

async function main() {
  console.log('Optimizing images...\n');

  for (const property of PROPERTIES) {
    const srcDir = path.join(SOURCE_DIR, property.folder);
    const outDir = path.join(OUTPUT_DIR, property.slug);

    if (!fs.existsSync(srcDir)) {
      console.log(`Skipping ${property.folder} — source folder not found`);
      continue;
    }

    fs.mkdirSync(outDir, { recursive: true });
    console.log(`${property.folder} → ${property.slug}/`);

    const files = fs.readdirSync(srcDir)
      .filter(f => /\.(jpg|jpeg|png|tiff?)$/i.test(f))
      .sort();

    for (let i = 0; i < files.length; i++) {
      const inputPath = path.join(srcDir, files[i]);
      const baseName = String(i + 1).padStart(2, '0');
      await optimizeImage(inputPath, outDir, baseName);
    }

    console.log(`  ✓ ${files.length} images processed\n`);
  }

  console.log('Done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
