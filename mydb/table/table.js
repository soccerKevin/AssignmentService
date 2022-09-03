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

  addTrigger(trigger) {
    if (!tigger instanceof Trigger)
      throw new Error('Must be of a Trigger')

    this.triggers[trigger.name] ||= []
    this.triggers[trigger.name].push(trigger)
  }

  getRowByIndex({ index }) {
    return this.data[index]
  }

  readRow({ filter, props }) {

  }

  createRow({ props }) {

  }

  updateRow({ filter, props }) {

  }

  deleteRow({ filter }) {

  }
}

export default Table
