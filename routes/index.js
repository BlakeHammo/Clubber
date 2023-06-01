var express = require('express');
const PoolCluster = require('mysql/lib/PoolCluster');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// redirect user to homepage if they make a request to this path after they have created an account
router.post('/accountCreationComplete',function(req, res, next)
{
  res.redirect("/index.html"); // bring user back to sign-in page
});

router.post('/login', function(req,res,next)
{
  if('username' in req.body && 'password' in req.body) // check if username and password variable exist in req.body
  {
    let pool = req.pool; // easy variable to query directly from req.pool connection pool
    let query = "SELECT id,username,email,passwords,profile_pic_path FROM Users WHERE username = ? AND passwords = ?";

    // query with prepared statements using username and password sent from client
    pool.query(query, [req.body.username, req.body.password], function(err, result, fields)
    {
      if(err)
      {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }

      console.log(JSON.stringify(result));

      // if result from query (returned as an array) is > 0 (it exists)
      if(result.length > 0)
      {
        req.session.username = result[0].username; // attach username to the session.username variable
        req.session.user_id = result[0].id; // attachk id to user_id session variable

        console.log('login successful for: ' + req.body.username + " " + req.session.user_id);

        res.sendStatus(200);
      }
      else
      {
        res.sendStatus(401);
      }
    });
  }
});

router.post("/signup", function(req, res, next)
{
  if('username' in req.body && 'password' in req.body && 'email' in req.body) // check if these three fields exist in req body
  {
    console.log('signup payload object recieved from ' + req.body.username + " " + req.body.email);

    let pool = req.pool;
    // query used to insert username, email and password into database
    let query = `INSERT INTO Users (
                    first_name,
                    last_name,
                    username,
                    email,
                    passwords
                ) VALUES (
                    NULL,
                    NULL,
                    ?,
                    ?,
                    ?
                );`;

    pool.query(query, [req.body.username, req.body.email, req.body.password], function(err, result, fields)
    {
      if(err)
      {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }
      res.end();
    });
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

    if (!('user_id' in req.session)) {
      if (filter === "") {
        filter += " WHERE";
      } else {
        filter += " AND";
      }
      filter += ` Posts.event_type = 'public'`;
    }

    let query = "";
    let user_id = -1;
    if (!('club_page' in req.body) && !('event_page' in req.body)) {
      if ('user_id' in req.session) {
        query = `SELECT Posts.*, Clubs.id AS club_id, Clubs.club_name, Clubs.club_color, Rsvps.rsvp, Posts_viewed.user_id AS Post_viewed FROM Posts
        INNER JOIN Clubs ON Posts.club_id = Clubs.id
        INNER JOIN Club_members ON Club_members.club_id = Clubs.id AND Club_members.user_id = ?
        LEFT JOIN Rsvps ON Posts.id = Rsvps.post_id AND Rsvps.user_id = ?
        LEFT JOIN Posts_viewed ON Posts.id = Posts_viewed.post_id AND Posts_viewed.user_id = ? ${filter}
        ORDER BY Posts.id DESC`;
        user_id = req.session.user_id;
      } else {
        query = `SELECT Posts.*, Clubs.id AS club_id, Clubs.club_name, Clubs.club_color, Rsvps.rsvp, Posts_viewed.user_id AS Post_viewed FROM Posts
        INNER JOIN Clubs ON Posts.club_id = Clubs.id
        LEFT JOIN Rsvps ON Posts.id = Rsvps.post_id AND Rsvps.user_id = ?
        LEFT JOIN Posts_viewed ON Posts.id = Posts_viewed.post_id AND Posts_viewed.user_id = ? ${filter}
        ORDER BY Posts.id DESC`;
      }
    }

    if ('user_id' in req.session && 'event_page' in req.body) {
      query = `SELECT Posts.*, Clubs.id AS club_id, Clubs.club_name, Clubs.club_color, Rsvps.rsvp, Posts_viewed.user_id AS Post_viewed FROM Posts
      INNER JOIN Clubs ON Posts.club_id = Clubs.id
      INNER JOIN Rsvps ON Posts.id = Rsvps.post_id AND Rsvps.user_id = ?
      LEFT JOIN Posts_viewed ON Posts.id = Posts_viewed.post_id AND Posts_viewed.user_id = ? ${filter}
      AND Posts.event_date_time > NOW()
      ORDER BY Posts.event_date_time`;
      user_id = req.session.user_id;
    } else if (!('user_id' in req.session) && 'event_page' in req.body) {
      query = `SELECT Posts.*, Clubs.id AS club_id, Clubs.club_name, Clubs.club_color, Rsvps.rsvp, Posts_viewed.user_id AS Post_viewed FROM Posts
      INNER JOIN Clubs ON Posts.club_id = Clubs.id
      LEFT JOIN Rsvps ON Posts.id = Rsvps.post_id AND Rsvps.user_id = ?
      LEFT JOIN Posts_viewed ON Posts.id = Posts_viewed.post_id AND Posts_viewed.user_id = ? ${filter}
      AND Posts.event_date_time > NOW()
      ORDER BY Posts.event_date_time`;
    }

    if ('club_page' in req.body) {
      if ('user_id' in req.session) {
        query = `SELECT Posts.*, Clubs.id AS club_id, Clubs.club_name, Clubs.club_color, Rsvps.rsvp, Posts_viewed.user_id AS Post_viewed FROM Posts
        INNER JOIN Clubs ON Posts.club_id = Clubs.id
        LEFT JOIN Rsvps ON Posts.id = Rsvps.post_id AND Rsvps.user_id = ?
        LEFT JOIN Posts_viewed ON Posts.id = Posts_viewed.post_id AND Posts_viewed.user_id = ? ${filter}
        ORDER BY Posts.id DESC`;
        user_id = req.session.user_id;
      } else {
        query = `SELECT Posts.*, Clubs.id AS club_id, Clubs.club_name, Clubs.club_color, Rsvps.rsvp, Posts_viewed.user_id AS Post_viewed FROM Posts
        INNER JOIN Clubs ON Posts.club_id = Clubs.id
        LEFT JOIN Rsvps ON Posts.id = Rsvps.post_id AND Rsvps.user_id = ?
        LEFT JOIN Posts_viewed ON Posts.id = Posts_viewed.post_id AND Posts_viewed.user_id = ? ${filter}
        ORDER BY Posts.id DESC`;
      }
    }

    connection.query(query, [user_id, user_id, user_id], function(qerr, rows, fields) {
      connection.release();


      if (qerr) {
        res.sendStatus(500);
        return;
      }

      let posts = rows;

      if (!('user_id' in req.session)) {
        posts = posts.map((v) => ({ ...v, notUser: true, isExpanded: false, isHovered: false, Post_viewed: 1}));
      } else {
        posts = posts.map((v) => ({ ...v, isExpanded: false, isHovered: false, notUser: false }));
      }

      function oldPosts(post) {
        if (post.Post_viewed === 1) {
          return;
        }
        if (((new Date()) - (new Date(post.creation_date_time))) / (24 * 60 * 60 * 1000) >= 7) {
          post.Post_viewed = 1;
        }
      }

      if ('user_id' in req.session) {
        posts.forEach(oldPosts);
      }

      res.json(posts);
    });
  });
});

router.get("/clubs", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let filter = "";

    if (req.query.tag !== "" || req.query.club !== "") {
      let tag_added = false;
      if (req.query.tag !== "") {
        filter += ` WHERE Clubs.club_tag = '${req.query.tag}'`;
      }

      if (req.query.club !== "") {
        if (tag_added) {
          filter += " AND";
        } else {
          filter += " WHERE";
        }
        if (Number(req.query.club) === 1) {
          filter += ` Clubs.club_name IN (SELECT Clubs.club_name FROM Clubs LEFT JOIN Club_members ON Clubs.id = Club_members.club_id WHERE Club_members.user_id = ?)`;
        } else if (Number(req.query.club) === 0) {
          filter += ` Clubs.club_name NOT IN (SELECT Clubs.club_name FROM Clubs LEFT JOIN Club_members ON Clubs.id = Club_members.club_id WHERE Club_members.user_id = ?)`;
        }
      }
    }

    let query = `SELECT Clubs.*, COUNT(Club_members.club_id) AS followers FROM Clubs
    LEFT JOIN Club_members
    ON Clubs.id = Club_members.club_id ${filter}
    GROUP BY Clubs.id;`;

    connection.query(query, [req.session.user_id], function(qerr, rows, fields) {
      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }

      let clubs = rows;

      clubs = clubs.map((v) => ({ ...v, isExpanded: false }));

      res.json(clubs);
    });
  });
});

router.get("/posts/unread", function(req, res, next) {
  if (!('user_id' in req.session)) {
    res.send("?");
  } else {
    req.pool.getConnection(function(cerr, connection) {
      if (cerr) {
        res.sendStatus(500);
        return;
      }

      let query = `SELECT COUNT(Posts.id) AS count FROM Posts
      INNER JOIN Clubs ON Posts.club_id = Clubs.id
      INNER JOIN Club_members ON Club_members.club_id = Clubs.id AND Club_members.user_id = ?
      LEFT JOIN Posts_viewed ON Posts.id = Posts_viewed.post_id
      WHERE Posts_viewed.user_id IS NULL AND Posts.creation_date_time BETWEEN date_sub(NOW(),INTERVAL 1 WEEK) AND NOW();`;

      connection.query(query, [req.session.user_id], function(qerr, rows, fields) {

        connection.release();

        if (qerr) {
          res.sendStatus(500);
          return;
        }

        let number = `${rows[0].count}`;

        if (rows[0].count > 99) {
          number = "99+";
        }

        res.send(number);
      });
    });
  }
});

module.exports = router;
