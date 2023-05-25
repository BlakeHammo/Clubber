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
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query = `SELECT Posts.*, Clubs.id AS Post_id, Clubs.club_name, Clubs.club_color, Rsvps.rsvp, Posts_viewed.user_id AS Post_viewed FROM Posts
    INNER JOIN Clubs ON Posts.club_id = Clubs.id
    INNER JOIN Club_members ON Club_members.club_id = Clubs.id AND Club_members.user_id = ?
    LEFT JOIN Rsvps ON Posts.id = Rsvps.post_id AND Rsvps.user_id = ?
    LEFT JOIN Posts_viewed ON Posts.id = Posts_viewed.post_id AND Posts_viewed.user_id = ?;`;
    const user_id = 1;
    connection.query(query, [user_id, user_id, user_id], function(qerr, rows, fields) {

      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }

      let posts = rows;

      posts = posts.map((v) => ({ ...v, isExpanded: false, isHovered: false }));
      posts = posts.map((item) => {
          let post = item;

          post.creation_date_time = new Date(post.creation_date_time).toLocaleString();
          if (post.tag === 'event') {
              post.event_date_time = new Date(post.event_date_time).toLocaleString();
          }

          return post;
      });

      res.json(posts);
    });
  });
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
