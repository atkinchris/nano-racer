import Phaser from 'phaser'

import GameState from '../states/game'

class Game extends Phaser.Game {
  constructor(component) {
    super(400, 490, Phaser.AUTO, component, null)

    this.state.add('Game', GameState)
    this.state.start('Game')
  }
}

export default Game
