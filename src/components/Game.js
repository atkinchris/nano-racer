import Phaser from 'phaser-ce'

import SplashState from '../states/splash'

class Game extends Phaser.Game {
  constructor(component) {
    super(768, 1024, Phaser.AUTO, component, null)

    this.state.add('Splash', SplashState, false)
    this.state.start('Splash')
  }
}

export default Game
