class Node {
  constructor({ field, index, left=null, right=null }) {
    this.field = field
    this.index = index
    this.left = left
    this.right = right
  }

  find({ node, field }) {
    if (!node) return null
    if (node.field === field) return node.index

    if (field < node.field) {
      if (!node.left) return null
      return find({ node: node.left, field })
    } else {
      if (!node.right) return null
      return find({ node: node.right, field })
    }
  }

  add({ field, index }) {
    if (field < this.field) {
      if (!this.left)
        this.left = new Node({ field, index })
      this.left.add({ field, index })
    } else {
      if (!this.right)
        this.right = new Node({ field, index })
      this.right.add({ field, index })
    }
  }

  print() {
    if (this.left) this.left.print()
    console.log(this.field, this.index)
    if (this.right) this.right.print()
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

export class BST {
  constructor(values) {
    this.head = null

    if (values) {
      for (const { field, index } of values)
        if (!field || !index) throw new Error('values must be in the form { field, index }')

      this.values = values.sort(({ field: a }, { field: b }) => {
        if (a > b) return 1
        if (a < b) return -1
        return 0
      })

      this.head = createFromValues(this.values)
    }
  }

  add(field, index) {
    if (!this.head)
      this.head = new Node({ field, index })
    this.head.add({ field, index })
  }

  print() {
    if (!this.head) return null
    this.head.print()
  }
}

