const db = require("../index");

const add = (newRequest) => {
  return db.one(`
    INSERT INTO
      timeoff_requests (username, type_of_timeoff, date_off, time_start, time_end)
    VALUES
      (${username}, ${typeOfTimeoff}, ${dateOff}, ${timeStart}, ${timeEnd})
    RETURNING
      *
    `, newRequest)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

module.exports = {
  add
};
