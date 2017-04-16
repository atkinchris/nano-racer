import Phaser from 'phaser'

import GameState from '../states/game'

class Game extends Phaser.Game {
  constructor(component) {
    super(448, 496, Phaser.AUTO, component, null)

    this.state.add('Game', GameState)
    this.state.start('Game')
  }

  init() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    Phaser.Canvas.setImageRenderingCrisp(this.canvas)
  }
}

export default Game
