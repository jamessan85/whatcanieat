var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var fs =  require('fs');

var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database: 'my_db'
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  rows = {name: "james", dob: "18/06/1985"}
  done(null, rows);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   
    return done(null, username);
  }
));

router.get('/', function(req, res, next) {
  res.render('index')
})

/* GET home page. */
router.get('/info', function(req, res, next) {
  fs.readFile('food.json', function (err, data) {
    if (err) throw err
    res.send(JSON.parse(data))
  })
  // getDbData()
  //   .then(result => {
  //     res.send(result);
  //   }).catch(e => {
  //     next(e)
  //   })
});

router.get('/food/:foodid([a-zA-Z0-9])', function(req, res, next) {
  console.log(req.params)
  res.send(200)
})

router.get('/login', function(req, res, next) {
  res.render('login');
})

router.get("/test", function(req, res, next){
  if (req.session.passport) {
    return res.send(req.session.passport);
  }
  res.redirect('/login')
})

router.post('/login',
  passport.authenticate('local', { session: false}),
    function(req, res) {
      res.json(req.user)
    })

function getDbData() {
  return new Promise(function(resolve,reject) {
    connection.query('SELECT * FROM food', function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
  })
}


module.exports = router;
