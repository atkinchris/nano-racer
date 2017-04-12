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

    const boat = new Boat(game, 100, 100)
    window.boat = boat
  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00')
  }
}

export default GameState
