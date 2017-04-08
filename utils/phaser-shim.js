const phaser = require.resolve('phaser-ce/build/custom/phaser-split.js')
const pixi = require.resolve('phaser-ce/build/custom/pixi.js')
const p2 = require.resolve('phaser-ce/build/custom/p2.js')

const loader = 'expose-loader'

const rules = [{
  test: /pixi\.js/,
  use: [{ loader, options: 'PIXI' }],
}, {
  test: /phaser-split\.js$/,
  use: [{ loader, options: 'Phaser' }],
}, {
  test: /p2\.js/,
  use: [{ loader, options: 'p2' }],
}]

const alias = { phaser, pixi, p2 }
const noParse = [pixi, p2]

module.exports = {
  alias,
  rules,
  noParse,
}
