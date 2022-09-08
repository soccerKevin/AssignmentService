import Table from './table/table.js'
import Where from './where.js'

class DB {
  constructor() {
    this.tables = {}
  }

  addTable(name, table) {
    if (table instanceof Table)
      this.tables[name] = table
    else
      throw new Error(`table ${name} is not of type Table`)
  }

  dropTable(name) {
    if (this.tables[name])
      this.tables[name] = null
    else
      throw new Error(`Table ${name} does not exist in this db`)
  }

  // perform a find on the db
  find(search) {
    const { table, wheres } = search.getProps()
    return this.tables[table].findRows(wheres)
  }

  // insert into table
  insert(table, rows) {
    if (!(rows instanceof Array)) rows = [rows]
    const results = []
    rows.forEach((row) => {
      results.push(this.tables[table].insertRow(row))
    })
    return results
  }

  // update rows in table
  update(search, props) {
    const { table, wheres } = search.getProps()
    return this.tables[table].updateRows(wheres, props)
  }

  // delete rows in table
  delete(search) {
    const { table, wheres } = search.getProps()
    return this.tables[table].deleteRows(wheres)
  }

  // left search = first search to execute
  // right search = second search to execute
  // will join on leftSearchResult[leftColumn] == rightSearchResult[rightColumn]
  leftJoin({ leftSearch, rightSearch, leftColumn, rightColumn }) {
    const result = []
    const leftResult = this.find(leftSearch)
    if (!leftResult.length) return []

    const rightWhere = rightSearch.getProps().wheres.find((where) => where.field === rightColumn)

    const rightSearchValue = leftResult.map((row) => row[leftColumn])
    rightWhere.value = rightSearchValue

    const rightResult = this.find(rightSearch)

    leftResult.forEach((leftRow) => {
      let foundPair = false

      for (let r = 0; r < rightResult.length; r++) {
        const rightRow = rightResult[r]

        // if values match, combine the 2 results
        if (leftRow[leftColumn] === rightRow[rightColumn]) {
          foundPair = true
          const row = { ...rightRow }
          Object.entries(leftRow).forEach(([key, leftValue]) => {
            // all left keys get added (overriding right keys)
            row[key] = leftValue

            // if both results share the same key
            if (rightRow[key] !== undefined) {
              // add right key with tableName.key as the new key
              row[`${rightSearch.getProps().table}.${key}`] = rightRow[key]
            }
          })
          result.push(row)
          break;
        }
      }

      if (!foundPair) {
        result.push(leftRow)
      }
    })

    return result
  }
}

export default DB
