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
  // type is one of [left, right, inner, outer] (not yet working)
  // will join on leftSearchResult[leftColumn] == rightSearchResult[rightColumn]
  join({ leftSearch, rightSearch, leftColumn, rightColumn, type }) {
    const leftResult = this.find(leftSearch)
    const rightResult = this.find(rightSearch)

  }
}

export default DB
