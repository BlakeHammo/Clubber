var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//temporary test "database" for user accounts - eventually store on db and use query
let users = {
  guy: {password: 'abcd', user_id: 1},
  lad: {password: 'xyz' , user_id: 2},
  peter: {password: 'hello', user_id: 3}
}

router.post('/login', function(req,res,next)
{

  if (req.body.username in users && req.body.password === users[req.body.username].password)
  {
    req.session.username = req.body.username; //link the clients session.username to the username sent from the login() post request

    req.session.user_id = users[req.body.username].user_id; //link the req.session.user_id property to the user's id (above in the users array)

    console.log('login successful for: ' + req.body.username + " " + req.session.user_id);
    res.sendStatus(200);
  }
  else
  {
    res.sendStatus(401);
  }

});


router.post("/posts", function(req, res, next) {

});

router.post("/posts/rsvp", function(req, res, next) {

});

router.get("/clubs", function(req, res, next) {

});

router.post("/posts/create", function(req, res, next) {

});

router.get("/posts/rsvp-users", function(req, res, next) {

});

router.get("/clubs/members", function(req, res, next) {

});

module.exports = router;
