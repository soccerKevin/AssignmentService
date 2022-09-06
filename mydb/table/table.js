import BST from '../helpers/bst.js'
import Definition from './definition.js'
import { ACTIONS as TRIGGER_ACTIONS } from './trigger.js'

class Table {
  #data
  #indexes
  #triggers
  #definition
  #uniqueHashes

  constructor(definition) {
    if (! definition instanceof Definition)
      throw new Error('Table requires a Definition')

    this.#definition = definition
    this.#indexes = {}
    this.#uniqueHashes = {}
    definition.uniqueColumns().forEach((col) => this.#uniqueHashes[col] = {} )
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

  #nextGUID() {
    return this.#data.length
  }

  addTrigger(trigger) {
    if (!tigger instanceof Trigger)
      throw new Error('Must be of a Trigger')

    const { actions, func } = trigger.getProps()
    actions.forEach((action) => this.#triggers[action].push(func))
  }

  #getRowByIndex(index) {
    return this.#data[index]
  }

  // returns true if row matches
  #rowDoesMatch(row, wheres) {
    if (!wheres.length) return []
    for (let where of wheres) {
      if (!where.compare(row[where.field]))
        return false
    }
    return true
  }

  findRows(wheres) {
    let result = []
    let idWhere

    // search for id in wheres
    idWhere = wheres.find((where) => where.field === 'id')

    // filter by indexed fields first (id, ids)
    if (idWhere) {
      const id = idWhere.value
      if (id instanceof Array) {
        result = id.map((id) => this.#getRowByIndex(id))
      } else {
        result.push(this.#getRowByIndex(id))
      }
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

  // check for uniqueness
  #verifyUniqueness(row) {
    this.#definition.uniqueColumns().map((col) => {
      const value = row[col]

      const existingId = this.#uniqueHashes[col][value]
      // if this value already exists and it's not this row, then it's not unique
      if (![undefined, null, row.id].includes(existingId))
        throw new Error(`${col}: ${value} must be unique`)
      // if (existingId !== undefined && existingId !== null && existingId !== row.id)
      //   throw new Error(`${col}: ${value} must be unique`)
    })
  }

  insertRow(props) {
    const clone = this.#definition.getCols(props)
    this.#triggers.CREATE.forEach((trigger) => clone = trigger(clone))
    this.#verifyUniqueness(clone)

    clone.id = this.#nextGUID()

    Object.entries(clone).map(([column, value]) => {
      // add value to unique hash
      if (this.#uniqueHashes[column])
        this.#uniqueHashes[column][value] = clone.id

      // add value to index
      if (this.#indexes[column])
        this.#indexes[column].add(value, clone.id)
    })

    this.#data.push(clone)
    return clone
  }

  updateRows(wheres, props) {
    const foundRows = this.findRows(wheres)
    const updateData = {}
    // keep track of what is being updated
    foundRows.map((row) => updateData[row.id] = { found: row })

    const rowsToUpdate = foundRows.map((row, i) => {
      let clone = Object.assign({}, row)
      this.#triggers.UPDATE.forEach((trigger) => clone = trigger(newRow))

      // keep track of which rows are updated
      updateData[clone.id].updatedProps = props
      return this.#definition.getCols({ ...clone, ...props })
    })

    const uniques = {}
    for (let row of rowsToUpdate) {
      this.#definition.uniqueColumns().forEach((col) => {
        // verify uniqueness of new data to itself
        uniques[col] ||= {}
        const value = row[col]
        if (uniques[col][value])
          throw new Error(`${col}: ${value} is not unique`)

        uniques[col][value] = true
      })

      // verify uniqueness compared to rest of db
      this.#verifyUniqueness(row)
    }

    // all rows are valid now

    for (let row of rowsToUpdate) {
      Object.entries(updateData[row.id].updatedProps).forEach(([col, oldValue]) => {
        const value = row[col]

        // update unique hashes
        if (this.#uniqueHashes[col]) {
          this.#uniqueHashes[col][oldValue] = undefined
          this.#uniqueHashes[col][value.toString()] = row.id
        }

        // update indexes
        if (this.#indexes[col]) {
          this.#indexes[col].remove(oldValue, row.id)
          this.#indexes[col].add(value, row.id)
        }
      })

      // update rows in this.#data with new row
      this.#data[row.id] = row
    }

    return rowsToUpdate
  }

  deleteRow(where) {
    const rowsToDelete = this.findRows(where)
    for (let row of rowsToDelete) {
      Object.entries(row).forEach(([col, value]) => {
        // delete value from unique hashes
        if (this.#uniqueHashes[col])
          this.#uniqueHashes[col][value] = undefined

        // delete id from indexes
        if (this.#indexes[col])
          this.#indexes[col].remove(value, row.id)
      })

      // update rows in this.#data with new row
      this.#data[row.id] = row
    }
    const result = rowsToDelete.forEach((row) => this.#data[row.id] = null)
  }
}

export default Table
