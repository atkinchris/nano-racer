import Phaser from 'phaser'

class GameState extends Phaser.State {
  preload() {
    this.game.load.path = 'assets/'
    this.game.load.image('boat', 'images/boat.png')
  }

  create() {
    this.game.time.advancedTiming = true
    this.game.stage.backgroundColor = '#71c5cf'
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.boat = this.game.add.sprite(100, 245, 'boat')
    this.game.physics.arcade.enable(this.boat)
  }

  update() {
    if (this.game.input.mousePointer.isDown) {
      this.game.physics.arcade.moveToPointer(this.boat, 100)

      if (Phaser.Rectangle.contains(this.boat.body, this.game.input.x, this.game.input.y)) {
        this.boat.body.velocity.setTo(0, 0)
      }
    } else {
      this.boat.body.velocity.setTo(0, 0)
    }
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00')
  }
}

export default GameState
