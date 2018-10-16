const express = require("express");
const router = express.Router();
const registration = require("./../models/registration.js");
const request = require("request");
const bcrypt = require("bcrypt-nodejs");
const session = require("express-session");

//Default Splash Page 
router.get('/',(req, res) => {
    res.render("index");
}); 

// registration page
router.get('/registration',(req, res) => {
    res.render("registration");
});

// login page
router.get('/login',(req, res) => {
    res.render("login");
});

// logout page
router.get('/logout',(req, res) => {
    
    req.session.destroy();
    res.redirect("login");
});



// Map page
router.get('/map',(req, res) => {
    if(!req.session.username){
        res.redirect("login");
    }
    else{

    
        var latitude = "51.5167";
        var longitude = "-0.0957";
        var url = "http://opendata.mybluemix.net/crimes?lat=51.5167&lon=-0.0957&radius=200";
        var jsonRequest = {
            url: url,
            json: true
        };

        var crimesList = [];
        request(jsonRequest, function(err, response, jsonResult){

            if(!err && response.statusCode === 200){
                jsonResult["features"].forEach(function(crimeData){
                    crimesList.push({
                        crime_type: crimeData["properties"]["type"],
                        crimeLatitude: crimeData["geometry"]["coordinates"][1],
                        crimeLongitude: crimeData["geometry"]["coordinates"][0]
                    });
                });
                var hbsObject = {
                    crimes: crimesList,
                    latitude: latitude,
                    longitude: longitude
                }
                res.render("map", hbsObject);

            }
        });
    }
});

// registration action page
router.post('/registration', function(req, res) {
    if(req.body.password == req.body.confirm_password){
        registration.selectOne(req.body.username, function(data){
        
            if(data.length > 0){
                console.log("user exists?");
            }
            else{
                registration.insertOneRegistration(
                    req.body.firstName, req.body.lastName, req.body.email, 
                    req.body.username, req.body.password, function(data){
                        var hbsObject = {
                            registration_success: true
                        };
                        res.redirect("login");
                });
            }
        });
    } else{
        var hbsObject = {
            password_mismatch: true
        };
        res.render("registration", hbsObject);
    }
    
});

router.post("/login", function(req, res){
    registration.selectLogin(req.body.username, function(data){
        if(data.length > 0 && bcrypt.compareSync(req.body.password, data[0]["password"])){
            req.session.username = data[0]["username"];
            res.redirect("map");
        }
        else{
            var hbsObject = {
                login_fail: true
            };
            res.render("login", hbsObject);
        }
    });
});


module.exports = router;
