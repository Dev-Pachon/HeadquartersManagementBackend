const {createConnection} = require("mysql");
const dbName = "hqm-db"

const db = ()=> createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: dbName
});

module.exports = db;
