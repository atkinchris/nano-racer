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

    this.boat.body.gravity.y = 0
    const spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    spaceKey.onDown.add(this.jump, this)

    this.score = 0
    this.labelScore = this.game.add.text(20, 20, '0', {
      font: '30px Arial', fill: '#ffffff',
    })
  }

  update() {
    if (this.boat.y < 0 || this.boat.y > 490) {
      this.restartGame()
    }
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00')
  }

  jump() {
    this.boat.body.velocity.y = -100
  }

  restartGame() {
    this.game.state.start('Game')
  }
}

export default GameState
