import { promises as fs } from 'fs'
import path from 'path'
import { theme } from './config/theme'
import { highlight } from 'cli-highlight'

async function readReadme(
  rootDirectory: string,
  packageName: string
) {
  const file = await fs.readFile(
    path.join(rootDirectory, 'node_modules', packageName, 'README.md'),
    {
      encoding: 'utf-8'
    }
  )
  return file
}

function render(body: string) {
  console.log(
    highlight(body, { theme })
  )
}

export async function exec(packageName: string, flags: {}) {
  const fileBody = await readReadme(
    process.cwd(),
    packageName
  )
  await render(fileBody)
  process.exit(0)
}
