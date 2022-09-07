import Column from 'sa/mydb/table/column.js'
import Definition from 'sa/mydb/table/definition.js'
import Table from 'sa/mydb/table/table.js'

const courseDefinition = new Definition([
  new Column({ name: 'name',       unique: true,  indexed: false, type: 'string' }),
  new Column({ name: 'start_date', unique: false, indexed: false, type: 'timestamp' }),
  new Column({ name: 'end_date',   unique: false, indexed: false, type: 'timestamp' }),
  new Column({ name: 'credits',    unique: false, indexed: false, type: 'int' }),
  new Column({ name: 'capacity',   unique: false, indexed: false, type: 'int' }),
])

const meetingTimeDefinition = new Definition([
  new Column({ name: 'day',       unique: false, indexed: false, type: 'string' }),
  new Column({ name: 'start',     unique: false, indexed: false, type: 'timestamp' }),
  new Column({ name: 'finish',    unique: false, indexed: false, type: 'timestamp' }),
  new Column({ name: 'course_id', unique: false, indexed: true,  type: 'int' }),
])

const studentDefinition = new Definition([
  new Column({ name: 'name',            unique: false, indexed: false, type: 'string' }),
  new Column({ name: 'credit_capacity', unique: false, indexed: false, type: 'int' }),
])

const courseStudentDefinition = new Definition([
  new Column({ name: 'student_id', unique: false, indexed: true, type: 'int' }),
  new Column({ name: 'course_id',  unique: false, indexed: true, type: 'int' }),
  new Column({ name: 'grade',      unique: false, indexed: false, type: 'int' }),
])

const createTables = (db) => {
  db.addTable('course', new Table(courseDefinition))
  db.addTable('meeting_time', new Table(meetingTimeDefinition))
  db.addTable('student', new Table(studentDefinition))
  db.addTable('course_student', new Table(courseStudentDefinition))
}

export default createTables
