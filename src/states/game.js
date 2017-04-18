import { State } from 'phaser'
import Player from '../actors/Player'

class GameState extends State {
  preload() {
    this.load.path = 'assets/'

    this.load.spritesheet('pacman', 'images/pacman.png', 32, 32)
    this.map = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ]
  }

  create() {
    const player = new Player({
      game: this.game,
      x: 32 + 16,
      y: 32 + 16,
      asset: 'pacman',
    })

    this.add.existing(player)

    this.map.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === 1) {
          const t = this.add.sprite((x * 32) + 16, (y * 32) + 16, 'pacman')
          t.anchor.set(0.5)
        }
      })
    })
  }

  render() {
    this.game.debug.text(this.time.fps || '--', 2, 14, '#00ff00')
  }
}

export default GameState
