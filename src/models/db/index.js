const pgp = require("pg-promise")();
const { Map } = require('immutable');
const config = require("../../config/config").getConfig();

const connectionObject = {
  host: config.get("db").get("host"),
  port: config.get("db").get("port"),
  database: config.get("db").get("name")
};

const db = pgp(connectionObject);

db.connect()
    .then(obj => {
        console.log("db is connected");
        obj.done();
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

module.exports = db;
