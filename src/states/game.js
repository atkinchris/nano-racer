import Phaser from 'phaser-ce'

class GameState extends Phaser.State {
  preload() {
    this.game.load.path = '../assets/'
    this.game.load.image('bird', 'images/bird.png')
    this.game.load.image('pipe', 'images/pipe.png')
  }

  create() {
    this.game.time.advancedTiming = true
    this.game.stage.backgroundColor = '#71c5cf'
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.pipes = this.game.add.group()

    this.bird = this.game.add.sprite(100, 245, 'bird')
    this.game.physics.arcade.enable(this.bird)

    this.bird.body.gravity.y = 1000
    const spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    spaceKey.onDown.add(this.jump, this)

    this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this)
    this.score = 0
    this.labelScore = this.game.add.text(20, 20, '0', {
      font: '30px Arial', fill: '#ffffff',
    })
  }

  update() {
    this.game.physics.arcade.overlap(
      this.bird,
      this.pipes,
      this.restartGame, null, this
    )

    if (this.bird.y < 0 || this.bird.y > 490) {
      this.restartGame()
    }
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00')
  }

  jump() {
    this.bird.body.velocity.y = -280
  }

  restartGame() {
    this.game.state.start('Game')
  }

  addOnePipe(x, y) {
    const pipe = this.game.add.sprite(x, y, 'pipe')

    this.pipes.add(pipe)
    this.game.physics.arcade.enable(pipe)

    pipe.body.velocity.x = -200
    pipe.checkWorldBounds = true
    pipe.outOfBoundsKill = true
  }

  addRowOfPipes() {
    const hole = Math.floor(Math.random() * 5) + 1

    this.score += 1
    this.labelScore.text = this.score

    for (let i = 0; i < 8; i += 1) {
      if (i !== hole && i !== hole + 1) {
        this.addOnePipe(400, (i * 60) + 10)
      }
    }
  }
}

export default GameState
