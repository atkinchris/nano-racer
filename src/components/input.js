import { NONE, LEFT, RIGHT, UP, DOWN } from '../constants'

function inputFactory() {
  let currentDirection = NONE

  const getDirection = (cursors) => {
    const {
      left = {},
      right = {},
      up = {},
      down = {},
    } = cursors

    if (left && left.isDown && currentDirection !== LEFT) {
      currentDirection = LEFT
    } else if (right && right.isDown && currentDirection !== RIGHT) {
      currentDirection = RIGHT
    } else if (up && up.isDown && currentDirection !== UP) {
      currentDirection = UP
    } else if (down && down.isDown && currentDirection !== DOWN) {
      currentDirection = DOWN
    }

    return currentDirection
  }

  return { getDirection }
}

export default inputFactory
