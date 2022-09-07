import { faker } from '@faker-js/faker'

export const fakeAddress = () => `${faker.address.buildingNumber()} ${faker.address.cityName()}`
