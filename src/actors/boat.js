import { Sprite, KeyCode } from 'phaser'

const increase = (number, amount) => {
  const multiplier = number < 0 ? -1 : 1
  const ret = multiplier * (Math.abs(number) + amount)

  return ret * number <= 0 ? 0 : ret
}

class Boat extends Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.anchor.setTo(0.5)
    this.velocity = 0
    this.angularVelocity = 0
    this.turningSpeed = 8
    this.acceleration = 4
    this.maxSpeed = 200
  }

  initialize() {
    this.game.physics.p2.enable(this, false)
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  update() {
    const { keyboard } = this.game.input
    const { W, A, S, D } = KeyCode

    if (keyboard.isDown(W) && this.velocity <= this.maxSpeed) {
      this.velocity += this.acceleration
    } else if (keyboard.isDown(S) && this.velocity >= -this.maxSpeed) {
      this.velocity -= this.acceleration
    } else {
      this.velocity = increase(this.velocity, -this.acceleration)
    }

    this.body.velocity.x = this.velocity * Math.cos((this.angle - 90) * 0.01745)
    this.body.velocity.y = this.velocity * Math.sin((this.angle - 90) * 0.01745)

    if (keyboard.isDown(A)) {
      this.body.angularVelocity = -1 * this.turningSpeed * (this.velocity / 1000)
    } else if (keyboard.isDown(D)) {
      this.body.angularVelocity = this.turningSpeed * (this.velocity / 1000)
    } else {
      this.body.angularVelocity = 0
    }
  }
}

export default Boat
