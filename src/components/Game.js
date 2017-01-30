import Phaser from 'phaser'

import SplashState from '../states/splash'
import GameState from '../states/game'

class Game extends Phaser.Game {
  constructor(component) {
    super(400, 490, Phaser.AUTO, component, null)

    this.state.add('Splash', SplashState)
    this.state.add('Game', GameState)

    this.state.start('Game')
  }
}

export default Game
