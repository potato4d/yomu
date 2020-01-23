import { theme } from './config/theme'
import { highlight } from 'cli-highlight'

export function render(body: string, options: { isPlainText: boolean }) {
  if (options.isPlainText) {
    console.log(body)
    return
  }
  console.log(highlight(body, { theme }))
  return
}
