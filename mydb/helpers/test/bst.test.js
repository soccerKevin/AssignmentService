import BST from '../bst.js'

describe('db bst', () => {
  let values, bst;

  beforeAll(() => {
    values = [
      { field: 'kevin', index: 1 },
      { field: 'dave', index: 2 },
      { field: 'lisa', index: 3 },
      { field: 'chris', index: 4 },
      { field: 'sarah', index: 5 },
    ]
  })

  beforeEach(() => {
    bst = new BST(values)
  })

  test('adds values', () => {
    expect(bst.length).toBe(5)
  })

  test('adds a low value', () => {
    bst.add('john', 6)
    expect(bst.length).toBe(6)
    expect(bst.inOrder().map(({ field, index }) => index)).toEqual([4, 2, 6, 1, 3, 5])
  })

  test('adds a high value', () => {
    bst.add('zed', 6)
    expect(bst.length).toBe(6)

    expect(bst.inOrder().map(({ field, index }) => index)).toEqual([4, 2, 1, 3, 5, 6])
  })

  test('finds a value', () => {
    expect(bst.find('lisa')).toBe(3)
  })

  test('in order', () => {
    expect(bst.inOrder().map(({ field, index }) => index)).toEqual([4, 2, 1, 3, 5])
  })
})
