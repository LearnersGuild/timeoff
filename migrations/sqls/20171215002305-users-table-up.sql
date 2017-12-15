CREATE TABLE users(
  id serial primary key,
  slack_user_id varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL
);
