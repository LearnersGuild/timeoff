const db = require("../index");

const add = (newRequest) => {
  return db.oneOrNone(`
    INSERT INTO
      requests (username, type_of_timeoff, date_off, time_start, time_end)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING
      *
    `, [ newRequest.username, newRequest.typeOfTimeoff, newRequest.dateOff, newRequest.timeStart, newRequest.timeEnd ])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

module.exports = {
  add
};
