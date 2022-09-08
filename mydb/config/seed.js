import { faker } from '@faker-js/faker'
import zip from '../helpers/zip.js'

const rand = (high) => Math.floor(Math.random() * high) + 1

const randomDay = () => rand(7)

const randomStartTime = () =>
  rand(14) + 7 // between 7am & 9pm

const seedCourses = (db) => {
  let name, start_date, end_date, credits, capacity, row
  const courses = []

  for (let i = 0; i < 10; i++) {
    name       = faker.name.fullName()
    start_date = faker.date.future(1)
    end_date   = faker.date.future(1, start_date)
    credits    = faker.random.numeric(1)
    capacity   = faker.random.numeric(2)
    const course = { name, start_date, end_date, credits, capacity }
    row = db.insert('course', course)
    courses.push(course)
  }

  return courses
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
  const students = []

  for (let i = 0; i < 12; i++) {
    const student = { name: faker.name.fullName(), credit_capacity: 12 }
    row = db.insert('student', student)
    students.push(student)
  }

  return students
}

const seedCourseStudents = (db, ids) => {
  for (let [course_id, student_id] of ids) {
    db.insert('course_student', { course_id, student_id, grade: Math.random() * 5 })
  }
}

const seed = (db) => {
  console.log('seeding db')
  const courses = seedCourses(db)
  const courseIds = courses.map((c) => c.id)
  seedMeetings(db, courseIds)
  const students = seedStudents(db)
  const studentIds = students.map((s) => s.id)
  const newCourseStudents = zip(courseIds, studentIds)
  const randomCourseStudents = []
  new Array(10).fill(0).map((v, i) => {
    for (let k = 0; k < 5; k++) {
      randomCourseStudents.push([i, rand(11)])
    }
  })
  seedCourseStudents(db, randomCourseStudents)
  console.log('seeding successful')
  return { courses, students }
}

export default seed
