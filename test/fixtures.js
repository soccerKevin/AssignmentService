import { faker } from '@faker-js/faker';

import Definition from 'sa/mydb/table/definition.js'
import Column from 'sa/mydb/table//column.js'

export const validDefinition = new Definition([
  new Column({ name: 'name', unique: true, indexed: true, type: 'string' }),
  new Column({ name: 'grade', unique: false, indexed: false, type: 'int' }),
  new Column({ name: 'address', unique: false, indexed: false, type: 'string' }),
])

const fakeAddress = () => `${faker.address.buildingNumber()} ${faker.address.cityName()}`

export const data = [
  {
    name: 'smurf',
    grade: 3,
    address: fakeAddress(),
  },
  {
    name: 'penny',
    grade: 4,
    address: fakeAddress(),
  },
  {
    name: 'sheldon',
    grade: 2,
    address: fakeAddress(),
  },
  {
    name: 'leonard',
    grade: 2,
    address: fakeAddress(),
  },
  {
    name: 'raj',
    grade: 4,
    address: fakeAddress(),
  },
  {
    name: 'howard',
    grade: 4,
    address: fakeAddress(),
  },
]
