/**
 * Compresse et redimensionne les images de public/img pour un chargement web rapide.
 * Usage: node scripts/optimize-images.mjs
 * Les fichiers sont écrasés par des versions optimisées (max 1400px, qualité 82).
 */
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const IMG_DIR = join(__dirname, '..', 'public', 'img')
const MAX_WIDTH = 1400
const JPEG_QUALITY = 82
const SKIP_NAMES = new Set(['favicoin.png', 'logo.png', 'logo-email.png']) // petits fichiers à ne pas toucher

const exts = ['.jpg', '.jpeg', '.png']

async function getImageFiles(dir, list = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) await getImageFiles(full, list)
    else if (exts.includes(extname(e.name).toLowerCase()) && !SKIP_NAMES.has(e.name))
      list.push(full)
  }
  return list
}

async function run() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.error('Installez sharp: npm install -D sharp')
    process.exit(1)
  }

  const files = await getImageFiles(IMG_DIR)
  console.log(`${files.length} image(s) à optimiser…`)

  for (const file of files) {
    try {
      const s = await stat(file)
      const before = s.size
      const ext = extname(file).toLowerCase()
      let pipeline = sharp(file)
        .rotate() // respect EXIF orientation
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })

      if (ext === '.png')
        pipeline = pipeline.png({ compressionLevel: 9 })
      else
        pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })

      const buf = await pipeline.toBuffer()
      const after = buf.length
      if (after >= before) {
        console.log(`  skip ${file.split(/[/\\]/).pop()} (déjà optimal)`)
        continue
      }
      await import('fs/promises').then(fs => fs.writeFile(file, buf))
      const pct = Math.round((1 - after / before) * 100)
      console.log(`  ok ${file.split(/[/\\]/).pop()}: ${(before / 1024).toFixed(0)} Ko → ${(after / 1024).toFixed(0)} Ko (-${pct}%)`)
    } catch (err) {
      console.error(`  erreur ${file}:`, err.message)
    }
  }
  console.log('Terminé.')
}

run()
