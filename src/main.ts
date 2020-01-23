import { promises as fs } from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import meow from 'meow'
import { render } from './render'

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

export async function exec(
  packageName: string,
  flags: meow.Result<{
    global: {
      type: 'boolean'
      alias: string
    }
    plain: {
      type: 'boolean'
      alias: string
    }
  }>['flags']
) {
  const fileBody = await readReadme(getRootDirectory(flags.global), packageName)
  render(fileBody, { isPlainText: flags.plain })
  process.exit(0)
}
