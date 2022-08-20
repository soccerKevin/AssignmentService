CREATE OR REPLACE FUNCTION trigger_set_timestamp()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = NOW();
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS course (
   id         SERIAL PRIMARY KEY,
   name       VARCHAR(255) NOT NULL,
   start_date TIMESTAMP NOT NULL,
   end_date   TIMESTAMP NOT NULL,
   credits    INT NOT NULL,
   capacity   INT NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT now(),
   updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_course_updated_at
   BEFORE UPDATE ON course
   FOR EACH ROW
   EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS meeting_time (
   day        VARCHAR(255) NOT NULL,
   start      VARCHAR(255) NOT NULL,
   finish     VARCHAR(255) NOT NULL,
   course_id  SERIAL REFERENCES course(id),
   created_at TIMESTAMP NOT NULL DEFAULT now(),
   updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_meeting_time_updated_at
   BEFORE UPDATE ON meeting_time
   FOR EACH ROW
   EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS student (
   id              SERIAL PRIMARY KEY,
   name            VARCHAR(255) NOT NULL,
   credit_capacity INT,
   created_at      TIMESTAMP NOT NULL DEFAULT now(),
   updated_at      TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_student_updated_at
   BEFORE UPDATE ON student
   FOR EACH ROW
   EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS course_student (
   id         SERIAL PRIMARY KEY,
   student_id SERIAL REFERENCES student(id),
   course_id  SERIAL REFERENCES course(id),
   created_at TIMESTAMP NOT NULL DEFAULT now(),
   updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER set_course_student_updated_at
   BEFORE UPDATE ON course_student
   FOR EACH ROW
   EXECUTE PROCEDURE trigger_set_timestamp();
