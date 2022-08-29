import { toLetter } from '../grade.js'

describe('grade', () => {
  test('A', () => expect(toLetter(4.7)).toBe('A'))
  test('B', () => expect(toLetter(4.4)).toBe('B'))
  test('C', () => expect(toLetter(2.9)).toBe('C'))
  test('D', () => expect(toLetter(2.2)).toBe('D'))
})
