import DB from './db.js'
import createTables from './config/createTables.js'
import seed from './config/seed.js'

import Search from './search.js'
import Where from './where.js'

const db = new DB()
createTables(db)
seed(db)

export default db
