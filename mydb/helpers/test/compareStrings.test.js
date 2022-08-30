import compareStrings from '../compareStrings.js'

describe('compareStrings', () => {
  test('smaller returns -1', () => {
    expect(compareStrings('abe', 'zed')).toBe(-1)
  })

  test('bigger returns 1', () => {
    expect(compareStrings('zed', 'abe')).toBe(1)
  })

  test('equal returns 0', () => {
    expect(compareStrings('zed', 'zed')).toBe(0)
  })
})
