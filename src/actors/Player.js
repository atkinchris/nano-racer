import { Sprite } from 'phaser'
import createInputHandler from '../utils/input'
import { directionToVector } from '../utils/directions'

class Player extends Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset, 2)

    this.anchor.setTo(0.5)
    this.inputHandler = createInputHandler()
    this.cursors = game.input.keyboard.createCursorKeys()
  }

  update() {
    const speed = 50
    const dt = this.game.time.physicsElapsed

    const direction = this.inputHandler(this.cursors)
    const heading = directionToVector(direction)

    this.x += dt * speed * heading.x
    this.y -= dt * speed * heading.y
  }
}

export default Player
