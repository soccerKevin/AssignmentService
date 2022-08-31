import BST from '../helpers/bst.js'
import Definition from './definition.js'

class Table {
  constructor(definition) {
    this.definition = definition
    this.data = []
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
