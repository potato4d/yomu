import meow from 'meow'

export type CLI = meow.Result<{
  global: {
    type: 'boolean'
    alias: string
  }
  plain: {
    type: 'boolean'
    alias: string
  }
}>

export const cli: CLI = meow(
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
