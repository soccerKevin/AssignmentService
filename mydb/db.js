import { v4 as uuidv4 } from 'uuid';
import Table from './table/table.js'
import Where from './where.js'

class DB {
  #tableUUIDs
  constructor(withBackups, backupTimeWindow) {
    // create a new backup image every x minutes (defaults to 5)
    this.backupTimeWindow = backupTimeWindow || (1000 * 60 * 5)
    this.tables = {}
    this.backups = []
    this.#tableUUIDs = {}
    if (withBackups)
      this.startBackups()
  }

  // backups store the difference from the last backup and now
  createBackup() {
    const tables = {}
    let lastBackup = this.backups[this.backups.length - 1]
    Object.entries(this.tables).forEach(([name, table]) => {
      let firstIndex
      if (lastBackup) {
        const lastTable = lastBackup.tables[name]
        firstIndex = lastTable.lastIndex
      } else {
        firstIndex = 0
      }

      const {
        data,
        end: lastIndex
      } = table.getData(this.#tableUUIDs[name], firstIndex)

      tables[name] = { name, data, firstIndex, lastIndex }
    })

    const backup = { date: new Date(), tables }
    this.backups.push(backup)
  }

  // compile backups and reset table data to everything previous of date
  resetFrom(date) {
    // if no date, reset all data
    if (!date) {
      Object.keys(this.tables).forEach((name) => {
        this.tables[name].setData(this.#tableUUIDs[name], [])
      })
      return
    }

    // get relavant backups
    const backups = this.backups.filter((bu) => bu.date.getTime() < date.getTime())

    // combine all table data
    const tableData = {}
    Object.keys(this.tables).forEach((name) => tableData[name] = [])

    // combine backups from before date to get a complete set of data for each table
    backups.forEach((backup) => {
      Object.entries(backup.tables).forEach(([ name, { data } ]) => {
        tableData[name] = tableData[name].concat(data)
      })
    })

    // reset table data from backups
    Object.keys(this.tables).forEach((tableName) => {
      this.tables[tableName].setData(this.#tableUUIDs[tableName], tableData[tableName])
    })
  }

  // create a new backup every interval of set time
  startBackups() {
    this.backupInterval = setInterval((() => {
      this.createBackup()
    }).bind(this), this.backupTimeWindow)
  }

  stopBackups() {
    clearInterval(this.backupInterval)
  }

  addTable(name, table) {
    if (!(table instanceof Table) || this.tables[name])
      throw new Error(`table ${name} is not of type Table`)

    const uuid = uuidv4()
    // set table uuid so only this db can get and set the table data
    table.setUUID(uuid)
    this.#tableUUIDs[name] = uuid
    this.tables[name] = table
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
