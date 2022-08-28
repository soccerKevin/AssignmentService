import BST from '../helpers/bst.js'
import Definition from './definition.js'

class Table {
  constructor(columns) {
    this.definition = new Definition(columns)
    this.indexedCols = {}
    this.definition.getIndexes().forEach((colName) =>
      this.indexedCols[colName] = new BST()
    )
    this.data = []
  }

  addIndex(field) {
    this.indexedCols[field] = createBST([])
  }

  addTrigger() {

  }

  getRowByIndex({ index }) {

  }

  findRow({ filter }) {

  }

  addRow({ props }) {

  }

  updateRow({ props, filter }) {

  }

  removeRow({ filter }) {

  }
}

export const createTable = (definition) => {
  return new Table(definition)
}
