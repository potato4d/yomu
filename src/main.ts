import { promises as fs } from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { render } from './render'
import { CLI } from './cli'
import { READMEs } from './config/path'

// FIXME: Improve logic (do not use child_process.execSync)
function getRootDirectory(isGlobal: boolean): string {
  return execSync(`npm root${isGlobal ? ' -g' : ''}`)
    .toString()
    .replace(/\r|\n|\r\n/g, '')
}

async function readReadme(rootDirectory: string, packageName: string) {
  // FIXME: Relace to Promise.any when adoption draft
  let file
  for (const readmeFilename of READMEs) {
    try {
      file = await fs.readFile(
        path.join(rootDirectory, packageName, readmeFilename),
        {
          encoding: 'utf-8'
        }
      )
    } catch(e) {}
  }
  if (!file) {
    throw new Error('File Not Found')
  }
  return file
}

export async function exec(packageName: string, flags: CLI['flags']) {
  try {
    const fileBody = await readReadme(getRootDirectory(flags.global), packageName)
    render(fileBody, { isPlainText: flags.plain })
  } catch (e) {
    process.stderr.write(e.message + '\n')
    process.exit(1)
  }
  process.exit(0)
}
