const connection = require("./connection.js");
const bcrypt = require("bcrypt-nodejs");

const orm = {
    insertOneRegistration: function(firstName, lastName, email, username, password, cb){
        var sql = "insert into registration (first_name, last_name, email, username, password) ";
        sql += "values ('" + firstName + "', '" + lastName + "', '" + email + "', '" + username + "', '" + bcrypt.hashSync(password) + "');";
        connection.query(sql, "crime_app", function(err, result){
            if (err){
                throw err;
            }
            cb(result);
        });   

    },

    selectOne: function (username, cb){
        var sql = "Select username from registration where username = '" + username + " '; ";
        
        connection.query(sql, "crime_app", function(err, result){
            if (err){
                throw err;
            }
            cb(result);
        });   

    },

    selectLogin: function(username, cb){
        var sql = "Select username, password from registration where username = '" + username + " '; ";
        
        connection.query(sql, "crime_app", function(err, result){
            if (err){
                throw err;
            }
            cb(result);
        });
    }


}


module.exports = orm;

