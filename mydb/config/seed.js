import { faker } from '@faker-js/faker'

const rand = (high) => Math.floor(Math.random() * high) + 1

const randomDay = () => rand(7)

const randomStartTime = () =>
  rand(14) + 7 // between 7am & 9pm

const zip = (array1, array2) => {
  const zipped = []
  for (let i = 0; i < array1.length; i++) {
    zipped.push([array1[i], array2[i]])
  }
  return zipped
}

const seedCourses = (db) => {
  let name, start_date, end_date, credits, capacity, row
  const ids = []

  for (let i = 0; i < 10; i++) {
    name       = faker.name.fullName()
    start_date = faker.date.future(1)
    end_date   = faker.date.future(1, start_date)
    credits    = faker.random.numeric(1)
    capacity   = faker.random.numeric(2)
    row = db.insert('course', { name, start_date, end_date, credits, capacity })
    ids.push(row[0].id)
  }

  return ids
}

const seedMeetings = (db, courseIds) => {
  courseIds.forEach((course_id) => {
    let day, start, finish
    day = randomDay()
    start = randomStartTime()
    finish = start + rand(3)
    db.insert('meeting_time', { day, start, finish, course_id })
  })
}

const seedStudents = (db) => {
  let name, credit_capacity, row
  const ids = []

  for (let i = 0; i < 12; i++) {
    row = db.insert('student', { name: faker.name.fullName(), credit_capacity: 12 })
    ids.push(row[0].id)
  }

  return ids
}

const seedCourseStudents = (db, ids) => {
  for (let [course_id, student_id] of ids) {
    db.insert('course_student', { course_id, student_id, grade: Math.random() * 5 })
  }
}

const seed = (db) => {
  console.log('seeding db')
  const courseIds = seedCourses(db)
  seedMeetings(db, courseIds)
  const studentIds = seedStudents(db)
  const newCourseStudents = zip(courseIds, studentIds)
  const randomCourseStudents = new Array(10).fill(0).map(() => [rand(11), rand(11)])
  seedCourseStudents(db, zip(courseIds, studentIds))
  console.log('seeding successful')
}

export default seed
