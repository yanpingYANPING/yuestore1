/**
 * Created by bjwsl-001 on 2017/6/27.
 */
const mysql = require('mysql');

module.exports = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'yueStore',
    port: 3306,
    connectionLimit: 5
});