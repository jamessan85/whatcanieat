var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username)
    user = "me"
    return done(null, user);
  }
));


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session)
  if(req.session) {
    console.log(req)
  }
  getDbData()
    .then(result => {
      console.log(result.Fat)
      res.render('index', {result: result});
    }).catch(e => {
      next(e)
    })
});

router.get('/login', function(req, res, next) {
  res.render('login');
})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login'
    })
);



function getDbData() {
  return new Promise(function(resolve,reject) {
    connection.query('SELECT * FROM food', function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
  })
}


module.exports = router;
