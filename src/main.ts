import { promises as fs } from 'fs'
import path from 'path'
import { theme } from './config/theme'
import { highlight } from 'cli-highlight'
import { execSync } from 'child_process'
import meow from 'meow'

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

function render(body: string) {
  console.log(highlight(body, { theme }))
}

export async function exec(
  packageName: string,
  flags: meow.Result<{
    global: {
      type: 'boolean'
      alias: string
    }
  }>['flags']
) {
  const fileBody = await readReadme(getRootDirectory(flags.global), packageName)
  await render(fileBody)
  process.exit(0)
}
