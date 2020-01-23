#!/usr/bin/env node
import meow from 'meow'
import { exec } from './main'

const cli = meow(
  `
  Usage
    $ yomu <package-name>

  Global Scope
    $ yomu -g <package-name>
    $ yomu --global <package-name>

  Disable syntax highlight
    $ yomu -p <package-name>
    $ yomu --plain <package-name>
`,
  {
    flags: {
      global: {
        type: 'boolean',
        alias: 'g'
      },
      plain: {
        type: 'boolean',
        alias: 'p'
      }
    }
  }
)

exec(cli.input[0], cli.flags)
