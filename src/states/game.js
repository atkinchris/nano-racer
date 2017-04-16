import {
  State,
  Tilemap,
  Physics,
  Point,
  UP,
  LEFT,
  RIGHT,
  DOWN,
  NONE,
} from 'phaser'

class GameState extends State {
  constructor() {
    super()

    this.marker = new Point()
    this.turnPoint = new Point()

    this.directions = [null, null, null, null, null]
    this.opposites = [NONE, RIGHT, LEFT, DOWN, UP]

    this.safetile = 14
    this.gridsize = 16

    this.speed = 150
    this.threshold = 3

    this.current = NONE
    this.turning = NONE
  }

  preload() {
    this.load.path = 'assets/'

    this.load.image('dot', 'images/dot.png')
    this.load.image('tiles', 'images/pacman-tiles.png')
    this.load.spritesheet('pacman', 'images/pacman.png', 32, 32)
    this.load.tilemap('map', 'maps/pacman-map.json', null, Tilemap.TILED_JSON)
  }

  init() {
    this.physics.startSystem(Physics.ARCADE)
  }

  create() {
    this.map = this.add.tilemap('map')
    this.map.addTilesetImage('pacman-tiles', 'tiles')

    this.layer = this.map.createLayer('Pacman')
    this.dots = this.add.physicsGroup()
    this.map.createFromTiles(7, this.safetile, 'dot', this.layer, this.dots)

    this.dots.setAll('x', 6, false, false, 1)
    this.dots.setAll('y', 6, false, false, 1)

    this.map.setCollisionByExclusion([this.safetile], true, this.layer)

    this.pacman = this.add.sprite((14 * 16) + 8, (17 * 16) + 8, 'pacman', 0)
    this.pacman.anchor.set(0.5)
    this.pacman.animations.add('munch', [0, 1, 2, 1], 20, true)
    this.physics.arcade.enable(this.pacman)
    this.pacman.body.setSize(16, 16, 0, 0)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.pacman.play('munch')
    this.move(LEFT)
  }

  turn() {
    const cx = Math.floor(this.pacman.x)
    const cy = Math.floor(this.pacman.y)

    if (
      !this.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) ||
      !this.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold)
    ) {
      return false
    }

    this.pacman.x = this.turnPoint.x
    this.pacman.y = this.turnPoint.y
    this.pacman.body.reset(this.turnPoint.x, this.turnPoint.y)
    this.move(this.turning)
    this.turning = NONE
    return true
  }

  move(direction) {
    let speed = this.speed
    if (direction === LEFT || direction === UP) {
      speed = -speed
    }
    if (direction === LEFT || direction === RIGHT) {
      this.pacman.body.velocity.x = speed
    } else {
      this.pacman.body.velocity.y = speed
    }

    this.pacman.scale.x = 1
    this.pacman.angle = 0
    if (direction === LEFT) {
      this.pacman.scale.x = -1
    } else if (direction === UP) {
      this.pacman.angle = 270
    } else if (direction === DOWN) {
      this.pacman.angle = 90
    }
    this.current = direction
  }

  checkKeys() {
    if (this.cursors.left.isDown && this.current !== LEFT) {
      this.checkDirection(LEFT)
    } else if (this.cursors.right.isDown && this.current !== RIGHT) {
      this.checkDirection(RIGHT)
    } else if (this.cursors.up.isDown && this.current !== UP) {
      this.checkDirection(UP)
    } else if (this.cursors.down.isDown && this.current !== DOWN) {
      this.checkDirection(DOWN)
    } else {
      this.turning = NONE
    }
  }

  checkDirection(turnTo) {
    if (
      this.turning === turnTo ||
      this.directions[turnTo] === null ||
      this.directions[turnTo].index !== this.safetile
    ) {
      return
    }

    if (this.current === this.opposites[turnTo]) {
      this.move(turnTo)
    } else {
      this.turning = turnTo
      this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2)
      this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2)
    }
  }

  eatDot(pacman, dot) {
    dot.kill()
    if (this.dots.total === 0) {
      this.dots.callAll('revive')
    }
  }

  update() {
    this.physics.arcade.collide(this.pacman, this.layer)
    this.physics.arcade.overlap(this.pacman, this.dots, this.eatDot, null, this)
    this.marker.x = this.math.snapToFloor(Math.floor(this.pacman.x), this.gridsize) / this.gridsize
    this.marker.y = this.math.snapToFloor(Math.floor(this.pacman.y), this.gridsize) / this.gridsize

    this.directions[1] = this.map.getTileLeft(this.layer.index, this.marker.x, this.marker.y)
    this.directions[2] = this.map.getTileRight(this.layer.index, this.marker.x, this.marker.y)
    this.directions[3] = this.map.getTileAbove(this.layer.index, this.marker.x, this.marker.y)
    this.directions[4] = this.map.getTileBelow(this.layer.index, this.marker.x, this.marker.y)
    this.checkKeys()
    if (this.turning !== NONE) {
      this.turn()
    }
  }

  render() {
    this.game.debug.text(this.time.fps || '--', 2, 14, '#00ff00')
  }
}

export default GameState
