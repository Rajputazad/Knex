const mysql = require('mysql2');
const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        // password: '1234',
        database: 'Userdatabase'
    }
}
const knex=require("knex")(options)
module.exports = knex;

