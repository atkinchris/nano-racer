import Phaser from 'phaser'

class GameState extends Phaser.State {
  preload() {
    this.game.load.path = 'assets/'
    this.game.load.image('boat', 'images/boat.png')
  }

  create() {
    const { game } = this

    this.cursors = game.input.keyboard.createCursorKeys()

    game.stage.backgroundColor = '#71c5cf'
    game.physics.startSystem(Phaser.Physics.P2JS)
    game.time.advancedTiming = true

    const boat = game.add.sprite(100, 100, 'boat')

    game.physics.p2.enable(boat)

    this.boat = boat
    window.boat = boat
  }

  update() {
    const { boat, cursors } = this

    // console.log(new Phaser.Point(boat.body.data.velocity[0], boat.body.data.velocity[1]).getMagnitude())

    if (cursors.left.isDown) {
      boat.body.applyImpulse([1, 0])
    } else if (cursors.right.isDown) {
      boat.body.applyImpulse([-1, 0])
    } else {
      boat.body.setZeroRotation()
    }

    if (cursors.up.isDown) {
      boat.body.applyImpulse([0, 1])
    } else if (cursors.down.isDown) {
      boat.body.applyImpulse([0, -1])
    }
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00')
  }
}

export default GameState
