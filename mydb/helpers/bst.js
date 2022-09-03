import compareStrings from './compareStrings.js'

class Node {
  constructor({ field, index, left=null, right=null }) {
    this.field = field
    this.indexes = [index]
    this.left = left
    this.right = right
  }

  find(field) {
    if (this.field === field)
      return this.indexes
    if (field < this.field) {
      return this.left?.find(field) || null
    } else {
      return this.right?.find(field) || null
    }
  }

  add({ field, index }) {
    if (field === this.field) {
      this.indexes.push(index)
    } else if (field < this.field) {
      if (!this.left)
        this.left = new Node({ field, index })
      else
        this.left.add({ field, index })
    } else {
      if (!this.right)
        this.right = new Node({ field, index })
      else
        this.right.add({ field, index })
    }
  }

  inOrder() {
    const results = []
    const { field, indexes } = this
    if (this.left) results.push(this.left.inOrder())
    results.push({ field, indexes })
    if (this.right) results.push(this.right.inOrder())
    return results.flat()
  }
}

const createFromValues = (values, start=0, end=null) => {
  if (!end) end = values.length
  const length = end - start

  if (length < 1)
    return null
  if (length == 1) {
    return new Node(values[start])
  }

  const mid = start + parseInt(length / 2)
  const left = createFromValues(values, start, mid)
  const right = createFromValues(values, mid + 1, end)

  return new Node({ ...values[mid], left, right })
}

class BST {
  constructor(values) {
    this.head = null
    this.length = 0

    if (values) {
      for (const { field, index } of values)
        if (!field || !index) throw new Error('values must be in the form { field, index }')

      this.length = values.length
      this.values = values.sort(({ field: a }, { field: b }) => compareStrings(a, b))

      this.head = createFromValues(this.values)
    }
  }

  find(field) {
    if (!this.head) return null
    return this.head.find(field)
  }

  inOrder() {
    if (!this.head) return null
    return this.head.inOrder()
  }

  add(field, index) {
    this.length += 1
    if (!this.head)
      this.head = new Node({ field, index })
    this.head.add({ field, index })
  }
}

export default BST
