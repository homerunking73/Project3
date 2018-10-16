const orm = require("./../config/orm.js");

const registration = {
    insertOneRegistration: function(firstName, lastName, email, username, password, cb){
        orm.insertOneRegistration(firstName, lastName, email, username, password, function(res){
            cb(res);
        });
    },

    selectOne: function(username, cb){
        orm.selectOne(username, function(res){
            cb(res);
        });
    },
    
    selectLogin: function(username, cb){
        orm.selectLogin(username, function(res){
            cb(res);
        });
    }
};



module.exports = registration;