const mysql = require('mysql')

const DB = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

DB.connect((err) => {
    err ? console.log(err) : console.log("connection successfull.")
})

module.exports = DB;