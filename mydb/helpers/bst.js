class Node {
  constructor({ value, index, left=null, right=null }) {
    this.value = value
    this.left = left
    this.right = right
  }

  find({ node, field }) {
    if (!node) return null
    if (node.value['field'] === field) return node.value['index']

    if (field < node.value['field']) {
      if (!node.left) return null
      return find({ node: node.left, field })
    } else {
      if (!node.right) return null
      return find({ node: node.right, field })
    }
  }
}

export const createBST = (values=[], start=0, end=null) => {
  for (const { field, index } of values)
    if (!field || !index) throw new Error('Must contain a field value and an index')

  end ||= values.length
  if (values.length < 1)
    return null

  if (values.length === 1)
    return new Node(values[0])

  const mid = values.length / 2
  const left = createBST(values, start, mid)
  const right = createBST(values, (mid + 1), end)
  return new Node(values[mid], left, right)
}
