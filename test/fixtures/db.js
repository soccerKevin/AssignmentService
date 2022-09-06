import { faker } from '@faker-js/faker'
import Column from 'sa/mydb/table/column.js'
import Definition from 'sa/mydb/table/definition.js'

export const courseDefinition = new Definition([
  new Column({ name: 'name', unique: true, indexed: false, type: 'string' }),
  new Column({ name: 'start_date', unique: false, indexed: false, type: 'int' }),
  new Column({ name: 'end_date', unique: false, indexed: false, type: 'string' }),
  new Column({ name: 'credits', unique: false, indexed: false, type: 'int' }),
  new Column({ name: 'capacity', unique: false, indexed: false, type: 'int' }),
])

export const courseData = new Array(5).fill(0).map((i) => {
  const name       = faker.name.fullName()
  const start_date = faker.date.future(1)
  const end_date   = faker.date.future(1, start_date)
  const credits    = faker.random.numeric(1)
  const capacity   = faker.random.numeric(2)
  return { name, start_date, end_date, credits, capacity }
})
