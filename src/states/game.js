import Phaser from 'phaser'

import Boat from '../actors/boat'

class GameState extends Phaser.State {
  preload() {
    this.game.load.path = 'assets/'
    this.game.load.image('boat', 'images/boat.png')
  }

  create() {
    const { game } = this

    game.stage.backgroundColor = '#71c5cf'
    game.physics.startSystem(Phaser.Physics.P2JS)
    game.time.advancedTiming = true
    game.world.setBounds(0, 0, 3000, 3000)

    const boat = new Boat({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'boat',
    })

    window.boat = boat
    this.boat = boat

    this.game.add.existing(boat)
    boat.initialize()

    game.camera.follow(boat, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00')
    this.game.debug.spriteInfo(this.boat, 32, 32)
  }
}

export default GameState
