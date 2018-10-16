const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "root",
    database: "crime_app"
});

connection.connect(function(err){
    if(err){
        console.log("Mysql connection error");
        return
    }
        console.log("Connected to DB");
})


module.exports = connection;