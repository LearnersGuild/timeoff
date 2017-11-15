CREATE TYPE reason AS ENUM ('vacation', 'sick', 'overtime');

DROP TABLE IF EXISTS requests;
CREATE TABLE requests(
  id serial primary key,
  username varchar(100) NOT NULL,
  type_of_timeoff REASON NOT NULL,
  date_off DATE NOT NULL,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL
);
