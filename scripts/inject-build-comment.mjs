import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const date = new Date().toUTCString()
const year = new Date().getFullYear()
const comment = `<!--\n  hamidsharifi.com\n  Last published: ${date}\n  © ${year} Hamid Sharifi. All rights reserved.\n-->`

function processDir(dir) {
  for (const file of readdirSync(dir)) {
    const full = join(dir, file)
    if (statSync(full).isDirectory()) {
      processDir(full)
    } else if (file.endsWith('.html')) {
      const original = readFileSync(full, 'utf8')
      const modified = original.replace(/<!doctype html>/i, `<!DOCTYPE html>\n${comment}`)
      if (modified !== original) {
        writeFileSync(full, modified)
        console.log(`  ✓ ${full.replace(process.cwd(), '')}`)
      }
    }
  }
}

const appDir = join(process.cwd(), '.next/server/app')
console.log('\nInjecting build comment...')
processDir(appDir)
console.log('Done.\n')
