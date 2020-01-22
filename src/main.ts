import { promises as fs } from 'fs'
import path from 'path'
import { theme } from './config/theme'
import { highlight } from 'cli-highlight'
import { execSync } from 'child_process'
import meow from 'meow'

// FIXME: Improve logic (do not use child_process.execSync)
function getRootDirectory(isGlobal: boolean): string {
  return execSync(`npm root${isGlobal ? ' -g' : ''}`)
    .toString()
    .replace(/\r|\n|\r\n/g, '')
}

async function readReadme(rootDirectory: string, packageName: string) {
  const file = await fs.readFile(
    path.join(rootDirectory, packageName, 'README.md'),
    {
      encoding: 'utf-8'
    }
  )
  return file
}

function highlightRender(body: string) {
  console.log(highlight(body, { theme }))
}

function reader(body: string) {
  console.log(body)
}

function isEnableColorOutput(colorType: string) {
  return colorType !== 'never'
}

export async function exec(
  packageName: string,
  flags: meow.Result<{
    global: {
      type: 'boolean'
      alias: string
    }
    color: {
      type: 'string'
      alias: string
    }
  }>['flags']
) {
  const fileBody = await readReadme(getRootDirectory(flags.global), packageName)
  if (isEnableColorOutput(flags.color)) {
    highlightRender(fileBody)
  } else {
    reader(fileBody)
  }
  process.exit(0)
}
