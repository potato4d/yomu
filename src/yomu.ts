#!/usr/bin/env node
import { exec } from './main'
import { cli } from './cli'

if (!cli.input[0]) {
  cli.showHelp()
  process.exit(0)
}

exec(cli.input[0], cli.flags)
