import Table from './table/table.js'

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
    const results = []
    rows.forEach((row) => {
      results.push(this.tables[table].insertRow(row))
    })
    return results
  }

  // update rows in table
  update(search, props) {
    const results = []
    search.wheres.forEach((where) => {
      results.push(this.tables[search.table].updateRows(where, props))
    })
    return results
  }

  // delete rows in table
  delete(search) {
    const results = []
    search.wheres.forEach((where) => {
      results.push(this.tables[search.table].deleteRow(where))
    })
    return results
  }

  // left search = first search to execute
  // right search = second search to execute
  // type is one of [left, right, inner, outer]
  // will join on leftSearchResult[leftColumn] == rightSearchResult[rightColumn]
  join({ leftSearch, rightSearch, type, leftColumn, rightColumn }) {
    const leftResult = this.find(leftSearch)
    const rightResult = this.find(rightSearch)
  }
}

export default DB
