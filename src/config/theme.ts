import chalk from 'chalk'
const ctx = new chalk.Instance({ level: 3 })

export const plain = (codePart: string) => codePart

export const theme: any = {
  keyword: ctx.blue,
  built_in: ctx.cyan,
  type: ctx.cyan.dim,
  literal: ctx.blue,
  number: ctx.green,
  regexp: ctx.red,
  string: ctx.red,
  subst: plain,
  symbol: plain,
  class: ctx.blue,
  function: ctx.yellow,
  title: plain,
  params: plain,
  comment: ctx.green,
  doctag: ctx.green,
  meta: ctx.grey,
  'meta-keyword': plain,
  'meta-string': plain,
  section: plain,
  tag: ctx.grey,
  name: ctx.blue,
  'builtin-name': plain,
  attr: ctx.cyan,
  attribute: plain,
  variable: plain,
  bullet: plain,
  code: plain,
  emphasis: ctx.italic,
  strong: ctx.bold,
  formula: plain,
  link: ctx.underline,
  quote: plain,
  'selector-tag': plain,
  'selector-id': plain,
  'selector-class': plain,
  'selector-attr': plain,
  'selector-pseudo': plain,
  'template-tag': plain,
  'template-variable': plain,
  addition: ctx.green,
  deletion: ctx.red,
  default: plain
}
