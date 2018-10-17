const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME || "127.0.0.1",
    port: 8889,
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_SCHEMA || "crime_app"
});

connection.connect(function(err){
    if(err){
        console.log("Mysql connection error");
        return
    }
        console.log("Connected to DB");
})


module.exports = connection;