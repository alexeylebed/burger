var express = require('express');
var mysql = require('mysql');
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8090;

var connection = require('./config/connection.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var burgers = [];
var burgersToDevour = [];
var devouredBurgers = [];


function burgersSort(burgers){
    burgersToDevour = [];
    devouredBurgers = [];

    burgers.forEach(element => {
        if(element.devoured == false){
        burgersToDevour.push(element)
        } else if(element.devoured == true){
        devouredBurgers.push(element)
        }
    });
};

app.get('/' , function(req, response){
    connection.query("SELECT * FROM burgers", function(err, res) {
        if (err) throw err;
        burgers = res;
        burgersSort(burgers)

        response.render("index" , {
            burgersToDevour: burgersToDevour,
            devouredBurgers: devouredBurgers
        });
    });
});

app.post('/addburger' , function(req, response){
    req.body.devoured = false;

    var query = "INSERT INTO burgers(burger, devoured) VALUES(" + '"' + req.body.burger + '"' +  "," +  req.body.devoured + ")";
    connection.query(query, function(err, res){
        if (err) throw err;
    });

    response.json(burgers)
});

app.post('/devour' , function(req, res){
    var query = "UPDATE  burgers SET devoured = TRUE  WHERE id =" + req.body.id;
    connection.query(query, function(err, res){
        if (err) throw err;
    });

    res.json(burgers)
});

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});






