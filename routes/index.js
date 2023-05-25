var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//temporary test "database" for user accounts - eventually store on db and use query
let users = {
  guy: { password: 'abcd', user_id: 1 },
  lad: { password: 'xyz' , user_id: 2 },
  peter: { password: 'hello', user_id: 3 }
};

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

    let filter = "";

    if (req.body.tag !== "" || req.body.club_id !== "" || req.body.event_type !== "") {
      filter += `WHERE`;
      let tag_added = false;
      let club_id_added = false;

      if (req.body.tag !== "") {
        filter += ` Posts.tag = '${req.body.tag}'`;
        tag_added = true;
      }
      if (req.body.club_id !== "") {
        if (tag_added) {
          filter += " AND";
        }
        filter += ` Clubs.id = ${req.body.club_id}`;
        club_id_added = true;
      }
      if (req.body.event_type !== "" && ('user_id' in req.session)) {
        if (club_id_added || tag_added) {
          filter += " AND";
        }
        filter += ` Posts.event_type = '${req.body.event_type}'`;
      }
    }

    let query = "";
    let user_id = -1;

    if ('user_id' in req.session) {
      query = `SELECT Posts.*, Clubs.id AS club_id, Clubs.club_name, Clubs.club_color, Rsvps.rsvp, Posts_viewed.user_id AS Post_viewed FROM Posts
      INNER JOIN Clubs ON Posts.club_id = Clubs.id
      INNER JOIN Club_members ON Club_members.club_id = Clubs.id AND Club_members.user_id = ?
      LEFT JOIN Rsvps ON Posts.id = Rsvps.post_id AND Rsvps.user_id = ?
      LEFT JOIN Posts_viewed ON Posts.id = Posts_viewed.post_id AND Posts_viewed.user_id = ? ${filter}`;
      user_id = req.session.user_id;
    } else {
      query = `SELECT Posts.*, Clubs.id AS club_id, Clubs.club_name, Clubs.club_color, Rsvps.rsvp, Posts_viewed.user_id AS Post_viewed FROM Posts
      INNER JOIN Clubs ON Posts.club_id = Clubs.id
      LEFT JOIN Rsvps ON Posts.id = Rsvps.post_id AND Rsvps.user_id = ?
      LEFT JOIN Posts_viewed ON Posts.id = Posts_viewed.post_id AND Posts_viewed.user_id = ? ${filter}`;
    }

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

router.get("/clubs", function(req, res, next) {

});

router.post("/posts/create", function(req, res, next) {

});

router.get("/posts/rsvp-users", function(req, res, next) {

});

router.get("/clubs/members", function(req, res, next) {

});

module.exports = router;
