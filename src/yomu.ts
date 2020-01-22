#!/usr/bin/env node
import meow from 'meow'
import { exec } from './main'

const cli = meow(
  `
  Usage
    $ yomu <package-name>

  Global Scope
    $ yomu -g <package-name>

  Disable syntax highlight
    $ yomu -c never <package-name>
    $ yomu --color never <package-name>
  
  Enable syntax highlight(explicitly)
    $ yomu -c always <package-name>
    $ yomu --color always <package-name>
`,
  {
    flags: {
      global: {
        type: 'boolean',
        alias: 'g'
      },
      color: {
        type: 'string',
        alias: 'c'
      }
    }
  }
)

exec(cli.input[0], cli.flags)
