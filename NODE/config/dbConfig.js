const mysql = require('mysql');
const config ={
    host: 'localhost',
    user: 'ldh',
    password: '1234',
    database: 'tp'
}
var pool = mysql.createPool(config);

module.exports = pool;