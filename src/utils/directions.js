const NONE = 0
const LEFT = 1
const RIGHT = 2
const UP = 3
const DOWN = 4

const directionToVector = (direction = NONE) => {
  switch (direction) {
    case LEFT:
      return { x: -1, y: 0 }
    case RIGHT:
      return { x: 1, y: 0 }
    case UP:
      return { x: 0, y: 1 }
    case DOWN:
      return { x: 0, y: -1 }
    case NONE:
    default:
      return { x: 0, y: 0 }
  }
}

export {
  NONE,
  LEFT,
  RIGHT,
  UP,
  DOWN,
  directionToVector,
}
