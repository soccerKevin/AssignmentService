import compareStrings from './compareStrings.js'

class Node {
  constructor({ field, id, left=null, right=null }) {
    this.field = field
    this.ids = [id]
    this.left = left
    this.right = right
  }

  find(field) {
    if (this.field === field)
      return this.ids
    if (field < this.field) {
      return this.left?.find(field) || null
    } else {
      return this.right?.find(field) || null
    }
  }

  add({ field, id }) {
    if (field === this.field) {
      this.ids.push(id)
    } else if (field < this.field) {
      if (!this.left)
        this.left = new Node({ field, id })
      else
        this.left.add({ field, id })
    } else {
      if (!this.right)
        this.right = new Node({ field, id })
      else
        this.right.add({ field, id })
    }
  }

  inOrder() {
    const results = []
    const { field, ids } = this
    if (this.left) results.push(this.left.inOrder())
    results.push({ field, ids })
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
      for (const { field, id } of values)
        if (!field || !id) throw new Error('values must be in the form { field, id }')

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

  add(field, id) {
    this.length += 1
    if (!this.head)
      this.head = new Node({ field, id })
    this.head.add({ field, id })
  }
}

export default BST
