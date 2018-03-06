const db = require("./index");
const pgp = require("pg-promise")();

const add = (requests) => {
  const columns = new pgp.helpers.ColumnSet(['username', 'type_of_timeoff', 'date_off', 'time_start', 'time_end'], {table: 'timeoff_requests'})
  const query = pgp.helpers.insert(requests, columns);

  return db.none(query)
    .catch(error => {
      console.error(error.message);
      throw error;
    });
};

module.exports = {
  add
};
