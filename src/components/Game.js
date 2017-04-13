import Phaser from 'phaser'

import GameState from '../states/game'

class Game extends Phaser.Game {
  constructor(component) {
    super(window.innerWidth, window.innerHeight, Phaser.AUTO, component, null)

    this.state.add('Game', GameState)
    this.state.start('Game')
  }
}

export default Game
