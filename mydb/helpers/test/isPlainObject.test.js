import isPlainObject from '../isPlainObject.js'

describe('isPlainObject', () => {
  test('new obj is true', () => {
    expect(isPlainObject(new Object())).toBe(true)
  })

  test('a plain object is true', () => {
    expect(isPlainObject({})).toBe(true)
  })

  test('a function is not plain', () => {
    const a = () => {}
    expect(isPlainObject(a)).toBe(false)
  })

  test('a class is not plain', () => {
    class A {}
    const a = new A()
    expect(isPlainObject(a)).toBe(false)
  })
})
