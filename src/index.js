import 'pixi'
import 'p2'
import Phaser from 'phaser'

import GameState from './states/game'

class Game extends Phaser.Game {
  constructor() {
    super(448, 496, Phaser.AUTO, 'root', null)

    this.state.add('Game', GameState)
    this.state.start('Game')
  }
}

window.game = new Game()
