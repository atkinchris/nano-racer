import { LEFT, UP } from '../../utils/directions'
import inputFactory from '../input'

describe('input', () => {
  const isDown = { isDown: true }
  let input

  beforeEach(() => {
    input = inputFactory()
  })

  it('returns the direction pressed', () => {
    const direction = input.getDirection({ left: isDown })

    expect(direction).toEqual(LEFT)
  })

  it('returns the last direction if none are pressed', () => {
    input.getDirection({ left: isDown })
    const direction = input.getDirection({})

    expect(direction).toEqual(LEFT)
  })

  it('returns the more recent direction if two are pressed', () => {
    input.getDirection({ left: isDown })
    const direction = input.getDirection({ left: isDown, up: isDown })

    expect(direction).toEqual(UP)
  })
})
