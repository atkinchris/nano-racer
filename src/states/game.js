import { State } from 'phaser'
import inputFactory from '../components/input'
import { LEFT, RIGHT, UP, DOWN } from '../constants'

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
    this.pacman = this.add.sprite(32 + 16, 32 + 16, 'pacman', 2)
    this.pacman.anchor.set(0.5)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.getDirection = inputFactory().getDirection

    this.map.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === 1) {
          const t = this.add.sprite((x * 32) + 16, (y * 32) + 16, 'pacman')
          t.anchor.set(0.5)
        }
      })
    })
  }

  update() {
    const speed = 50
    const dt = this.time.physicsElapsed

    const direction = this.getDirection(this.cursors)

    if (direction === LEFT) {
      this.pacman.x -= dt * speed
    } else if (direction === RIGHT) {
      this.pacman.x += dt * speed
    } else if (direction === UP) {
      this.pacman.y -= dt * speed
    } else if (direction === DOWN) {
      this.pacman.y += dt * speed
    }
  }

  render() {
    this.game.debug.text(this.time.fps || '--', 2, 14, '#00ff00')
  }
}

export default GameState
