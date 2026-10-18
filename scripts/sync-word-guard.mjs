#!/usr/bin/env node
/**
 * Sync the Python word_guard module from src/ to lib/.
 *
 * The compiled entry point (lib/index.js) resolves word_guard relative to
 * lib/, so the module must live there at runtime. Keeping it in sync on every
 * build avoids the "Word tools fail after clone/build" failure mode.
 */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'src', 'word_guard')
const dest = join(root, 'lib', 'word_guard')

if (!existsSync(src)) {
  console.warn('[writing-guard] src/word_guard not found — skip sync')
  process.exit(0)
}

if (existsSync(dest)) rmSync(dest, { recursive: true, force: true })
mkdirSync(dest, { recursive: true })
cpSync(src, dest, {
  recursive: true,
  filter: (p) => !p.includes('__pycache__') && !p.endsWith('.pyc'),
})
console.log('[writing-guard] synced src/word_guard -> lib/word_guard')
