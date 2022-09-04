import BST from '../helpers/bst.js'
import Definition from './definition.js'
import { ACTIONS as TRIGGER_ACTIONS } from './trigger.js'

class Table {
  #data
  #indexes
  #triggers

  constructor(definition) {
    if (! definition instanceof Definition)
      throw new Error('Table requires a Definition')

    this.definition = definition
    this.#indexes = {}
    this.#triggers = {}
    this.#data = []
    TRIGGER_ACTIONS.forEach((action) => this.#triggers[action] = [])
    this.updateIndexes(definition.indexedColumns())
  }

  updateIndexes(indexes) {
    indexes.forEach((column) =>
      !this.#indexes[column]
      ? this.#indexes[column] = new BST()
      : null
    )
  }

  nextGUID() {
    return this.#data.length
  }

  addTrigger(trigger) {
    if (!tigger instanceof Trigger)
      throw new Error('Must be of a Trigger')

    const { actions, func } = trigger.getProps()
    actions.forEach((action) => this.#triggers[action].push(func))
  }

  getRowByIndex(index) {
    return this.#data[index]
  }

  // returns true if row matches
  #rowDoesMatch(row, wheres) {
    for (let where of wheres) {
      if (!where.compare(row[where.field]))
        return false
    }
    return true
  }

  findRows(wheres) {
    let result = []
    let id, ids, idWhere, idsWhere
    for (let [i, where] of wheres.entries()) {
      if (where.field === 'id') {
        idWhere = where
        wheres.splice(i, 1) // don't double check id
        break
      }
      if (where.field === 'ids') {
        idsWhere = where
        wheres.splice(i, 1) // don't double check ids
        break
      }
    }

    // filter by indexed fields first (id, ids)
    if (idWhere) {
      result.push(this.getRowByIndex(idWhere.value))
    } else if (idsWhere) {
      result = idsWhere.value.map((id) => {
        return this.getRowByIndex(id)
      })
    }

    // narrow result further by looking up indexed fields
    for (let { field, value } of wheres) {
      const index = this.#indexes[field]
      if (index) {
        const foundIds = index.find(value)
        if (foundIds)
          result.concat(foundIds.map((id) => this.#data[id]))
      }
    }

    // Hopefully indexed fields have narrowed the search
    // But if not, search through everything!!!
    const toSearch = result.length ? result : this.#data
    return toSearch.filter((row) => this.#rowDoesMatch(row, wheres))

  }

  insertRow(props) {
    const clone = Object.assign({}, props)
    this.#triggers['CREATE'].forEach((trigger) => clone = trigger(clone))
    clone['id'] = this.nextGUID()

    // update indexes
    Object.entries(clone).map(([column, value]) => {
      if (this.#indexes[column])
        this.#indexes[column].add(value, clone.id)
    })

    this.#data.push(clone)
    return clone
  }

  updateRows(where, props) {
    let rowsToUpdate = this.findRows(where)
    rowsToUpdate = rowsToUpdate.map((row) => {
      this.#triggers['UPDATE'].forEach((trigger) => row = trigger(newRow))
      // update row with new props
      // check for uniqueness
      // update rows in this.#data
    })
  }

  deleteRow(where) {
    const rowsToDelete = this.findRows(where)
    const result = rowsToDelete.forEach((row) => this.#data[row.id] = null)
  }
}

export default Table
