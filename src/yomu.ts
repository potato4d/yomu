#!/usr/bin/env node
import meow from 'meow'
import { exec } from './main'

const cli = meow(`
  Usage
    $ yomu <package-name>
`, {
})

exec(cli.input[0], cli.flags)
