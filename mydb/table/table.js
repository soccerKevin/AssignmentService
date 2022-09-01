import BST from '../helpers/bst.js'
import Definition from './definition.js'

class Table {
  constructor(definition) {
    if (! definition instanceof Definition)
      throw new Error('Table requires a Definition')

    this.definition = definition
    this.indexes = {}
    this.triggers = {}
    this.updateIndexes(definition.indexedColumns())
    this.data = []
  }

  updateIndexes(indexes) {
    indexes.forEach((column) =>
      !this.indexes[column]
      ? this.indexes[column] = new BST()
      : null
    )
  }

  addTrigger() {

  }

  getRowByIndex({ index }) {
    return this.data[index]
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

export default Table
