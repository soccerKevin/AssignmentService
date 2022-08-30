import {
  acceptParams,
  keys,
  vars,
  keyValues,
  values,
} from '../params.js'


describe('params', () => {
  test('keys', () => {
    expect(keys({ id: 2, simonSays: 3 })).toEqual(['id', 'simon_says'])
  })
})
