#!/usr/bin/env node
import meow from 'meow'
import { exec } from './main'

const cli = meow(
  `
  Usage
    $ yomu <package-name>

  Global Scope
    $ yomu -g <package-name>
`,
  {
    flags: {
      global: {
        type: 'boolean',
        alias: 'g'
      }
    }
  }
)

exec(cli.input[0], cli.flags)
