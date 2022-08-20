INSERT INTO student (name, credit_capacity)
VALUES ('Kevin', 6), ('Dan', 6), ('Dave', 6), ('Aeden', 6);

INSERT INTO course (name, start_date, end_date, credits, capacity)
VALUES (
  'Design Patterns',
  'Thu Jun 30 2022 13:00:00 GMT+0000',
  'Thu Sep 01 2022 13:00:00 GMT+0000',
  3,
  20
),
(
  'Advanced Algorithms',
  'Wed Jun 29 2022 13:00:00 GMT+0000',
  'Wed Aug 31 2022 13:00:00 GMT+0000',
  3,
  20
),
(
  'Calculus I',
  'Thu Jun 30 2022 13:00:00 GMT+0000',
  'Thu Sep 01 2022 13:00:00 GMT+0000',
  2,
  30
),
(
  'Pre Calculus',
  'Wed Jun 29 2022 04:00:00 GMT+0000',
  'Mon Aug 29 2022 04:00:00 GMT+0000',
  3,
  30
),
(
  'History Civil War',
  'Tue Jun 28 2022 13:00:00 GMT+0000',
  'Fri Sep 02 2022 13:00:00 GMT+0000',
  2,
  20
);

INSERT INTO meeting_time (day, start, finish, course_id)
  SELECT 'Thursday', '18:00', '21:00', id
  FROM course
  WHERE name = 'Design Patterns';

INSERT INTO meeting_time (day, start, finish, course_id)
  SELECT 'Wednesday', '18:00', '21:00', id
  FROM course
  WHERE name = 'Advanced Algorithms';

INSERT INTO meeting_time (day, start, finish, course_id)
  SELECT 'Thursday', '18:00', '21:00', id
  FROM course
  WHERE name = 'Calculus I';

INSERT INTO meeting_time (day, start, finish, course_id)
  SELECT 'Wednesday', '09:00', '10:00', id
  FROM course
  WHERE name = 'Pre Calculus';

INSERT INTO meeting_time (day, start, finish, course_id)
  SELECT 'Monday', '09:00', '10:00', id
  FROM course
  WHERE name = 'Pre Calculus';

INSERT INTO meeting_time (day, start, finish, course_id)
  SELECT 'Tuesday', '09:00', '10:00', id
  FROM course
  WHERE name = 'History Civil War';

INSERT INTO meeting_time (day, start, finish, course_id)
  SELECT 'Friday', '09:00', '10:00', id
  FROM course
  WHERE name = 'History Civil War';

INSERT INTO course_student (course_id, student_id)
VALUES (1, 1),
  (2, 1),
  (3, 2),
  (4, 2),
  (1, 4),
  (3, 4),
  (5, 3),
  (2, 3);
