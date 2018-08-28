var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// var connection = mysql.createPool({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'password',
//   database: 'my_db'
// });

passport.serializeUser(function(user, done) {
  console.log(user + " hello");
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  rows = {name: "james", dob: "18/06/1985"}
  console.log(rows);
  done(null, rows);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    user = "James"
    return done(null, user);
  }
));


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session)
  // console.log(req.isAuthenticated());
  if(req.isAuthenticated()) {
    console.log(req.user);
  }
  // getDbData()
  //   .then(result => {
  //     console.log(result.Fat)
  //     res.render('index', {result: result});
  //   }).catch(e => {
  //     next(e)
  //   })
  res.sendStatus(200)
});

router.get('/login', function(req, res, next) {
  console.log(req.session)
  res.render('login');
})

router.get("/test", function(req, res, next){
  if (req.session.passport) {
    console.log(req.session.passport)
    return res.send(req.session.passport);
  }
  res.redirect('/login')
})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login'
    })
);



// function getDbData() {
//   return new Promise(function(resolve,reject) {
//     connection.query('SELECT * FROM food', function (error, results, fields) {
//       if (error) reject(error);
//       resolve(results);
//     });
//   })
// }


module.exports = router;
