var express = require('express');
var path = require('path');
var debug = require("debug");
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var router = express.Router();

var Pet = require('./models/animals');

var moongoose = require('mongoose');
moongoose.connect('mongodb://localhost/animal-shelter');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname)); // wtf does this do??

// root path
app.get("/", function (req, res) {
  res.render(path.join(__dirname + '/views/index.ejs'))
  })

//index
app.get("/animals", function (req, res) {
  Pet.find({}, function(err, pets) { //using the find query, make first argument blank to find all, second arg passing a function
    if (err) console.log(err) // if error comes through,  console the error
    res.json(pets) // otherwise show all pets
  })
})

app.post("/animals", function (req, res) {
  console.log(req.body);
  var pet = Pet({
    name: req.body.name,
    breed: req.body.breed,
    dob: req.body.dob,
    gender: req.body.gender,
    family: req.body.family,
    status: req.body.status
  })
  pet.save(function(error, createdPet){
    if (error) console.log(error)
    console.log("Saved animal")
    res.json([createdPet])
  })
})

app.delete("/animals/:id", function (req, res) {
  console.log(req.params.id);
  Pet.remove({_id: req.params.id}, function(err, removedPet){
      console.log("DELETE ROUTE");
      if (err) console.log(err);
      res.json(removedPet)
  })
})

app.put("/animals/:id", function (req, res) {
  console.log(req.params.id);
  Pet.update({_id: req.params.id}, {status: req.params.status}, function(err, updatedPet){
      console.log("UPDATED");
      if (err) console.log(err);
      res.json(updatedPet)
    })
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.listen(3000)