import { Sprite, Physics } from 'phaser'

class Boat extends Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'boat')

    this.cursors = game.input.keyboard.createCursorKeys()
    this.body = new Physics.P2.Body(game, this)

    game.add.existing(this)
  }

  update() {
    const { body, cursors } = this

    if (cursors.left.isDown) {
      body.rotateLeft(50)
    } else if (cursors.right.isDown) {
      body.rotateRight(50)
    } else {
      body.setZeroRotation()
    }

    if (cursors.up.isDown) {
      body.moveForward(100)
    } else if (cursors.down.isDown) {
      body.moveBackward(20)
    }
  }
}

export default Boat
