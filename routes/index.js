var express = require('express');
var router = express.Router();

//google ID essentials
/*-----------------------------------------------------*/
const CLIENT_ID = '526111756235-7mr4l5b07tn1snd0ahl1l768c4kf51cm.apps.googleusercontent.com'
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
/*-----------------------------------------------------*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// redirect user to homepage if they make a request to this path after they have created an account
router.post('/accountCreationComplete',function(req, res, next)
{
  res.redirect("/index.html"); // bring user back to sign-in page
});

router.post('/login', async function(req,res,next)
{
  var pool = req.pool; // easy variable to query directly from req.pool connection pool
  //google login
  /*----------------------------------------------------------- */
  if ('client_id' in req.body && 'credential in req.body')
  {
      const ticket = await client.verifyIdToken({
          idToken: req.body.credential,
          audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];

      console.log(payload['email']);
      console.log(payload['sub']);
      // If request specified a G Suite domain:
      // const domain = payload['hd'];

      //check if this user has logged into cluber with google sign in API before
      let query = "SELECT id,username,email,passwords,profile_pic_path FROM Users WHERE email = ?";

      pool.query(query, [payload['email']], function(cerr, result, fields)
      {
        if(cerr)
        {
          res.sendStatus(500);
          return;
        }
        if(result.length > 0) //if they have, set their session token
        {
          console.log('google user already exists');
          [req.session.user] = result; // using array destructuring to save all the user info to this "user variable"
          req.session.username = result[0].username; // attach username to the session.username variable
          req.session.user_id = result[0].id; // attachk id to user_id session variable
          res.sendStatus(200);
        }
        else // if is no user with that username, add them to the database since they are already verified with google (essentially sign up)
        {
          console.log('google user DOES NOT exists');
          let insertQuery = `INSERT INTO Users (
                              first_name,
                              last_name,
                              username,
                              email,
                              passwords
                            ) VALUES (
                              NULL,
                              NULL,
                              NULL,
                              ?,
                              ?
                          );`;
          /*
            !!!!!!!! NOTE, currently using sub as their password so someone else can't just use the
            traditional login with a gmail and no password to access someone elses account
          */
            pool.query(insertQuery, [payload['email'], payload['sub']], function(err, result, fields)
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
      });
  /*----------------------------------------------------------- */
  }
  else if('username' in req.body && 'password' in req.body) // check if username and password variable exist in req.body
  {
    let query = "SELECT id,username,email,profile_pic_path FROM Users WHERE username = ? AND passwords = ?";

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
        [req.session.user] = result; //using array destructuring to save all the user info to this "user variable"
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

//delete a user's user_id from the session token to log them out
router.post('/logout', function (req, res, next)
{
  if ('user_id' in req.session)
  {
      console.log("deleting user_id: " + req.session.user_id);
      delete req.session.user_id;
      console.log("logout successful for " + req.session.email);
      res.end();
  } else
  {
      res.sendStatus(403);
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

module.exports = router;
