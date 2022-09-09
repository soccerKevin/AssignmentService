# Student Assignments
A simple app to manage students and courses

## Setup
### dev
- requires node and npm
- npm install yarn -g
- yarn install (from package main folder)
- yarn run dev

### prod
- yarn run all

## API
- student/:id (Get)
- student     (Post)
- student/:id (Put)
- student/:id/courses (Get)
- student/:id/grade/average (Get)
- student/:studentId/course/:courseId/grade (Get)

- registration (Post)
- registration/update (Put)
- registration (Delete)

- course/:id/students (Get)
- course (Post)
- course/:id (Put)

## custom db
- db is in memory only, ergo it resets when the server resets
- uses a bst for indexes
- uses hashmaps for uniqueness checks
- located in /mydb
- handles multiple where objects and left joins
- makes backups at set intervals.  
  - when creating set:
    - withBackups to true
    - backupTimeWindow to number of miliseconds between each backup.
- rollback using db.resetFrom(date)
  - you might lose data between most recent backup and from date
- did not have time for a white ahead log.  this was a looooong project

## testing
- located near the file it tests, in a /test folder
- to run "yarn run test"
- specific test "yarn run test -t 'test name'"

