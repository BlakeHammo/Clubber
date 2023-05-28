var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.get("/info", function(req, res, next) {
  let response = "";
  if ('user_id' in req.session) {
    response = req.session.user_id;
  }

  res.send(`${response}`);
});

router.get("/info/club-manager", function(req, res, next) {
  if ('user_id' in req.session) {
    if (req.query.club_id !== "" && req.query.club_id !== -1) {
      req.pool.getConnection(function(cerr, connection) {
        if (cerr) {
          res.sendStatus(500);
          return;
        }

        const query = `SELECT Club_members.* FROM Club_members
        WHERE Club_members.user_id = ? AND Club_members.club_id = ?;`;

        connection.query(query, [req.session.user_id, req.query.club_id], function(qerr, rows, fields) {

          connection.release();

          if (qerr) {
            res.sendStatus(500);
            return;
          }
          if (rows.length === 1) {
            res.send(true);
          } else {
            res.send(false);
          }
        });
      });
    }
  } else {
    res.send(false);
  }
});

/* The below are for users that have an account, thus we will block access if they are not a user with an account */
router.use('/', function(req, res, next) {
  if (!('user_id' in req.session)){
    res.sendStatus(403);
  } else {
    next();
  }
});

router.post("/posts/rsvp", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query = `INSERT INTO Rsvps (post_id, user_id, rsvp, date_responded) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE rsvp = ?, date_responded = ?`;

    connection.query(query, [req.body.post_id, req.session.user_id, req.body.rsvp, req.body.date_responded, req.body.rsvp, req.body.date_responded], function(qerr, rows, fields) {

      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }

      res.send();
    });
  });
});

router.post("/posts/mark-as-read", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query = `INSERT INTO Posts_viewed (post_id, user_id) VALUES (?, ?)`;

    connection.query(query, [req.body.post_id, req.session.user_id], function(qerr, rows, fields) {

      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
});

/* Will have a block if requestor is not a club admin */

router.post("/posts/create", function(req, res, next) {

});

router.get("/posts/rsvp-users", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    const query = `SELECT Users.username, Rsvps.date_responded FROM Rsvps
    INNER JOIN Users ON
    Users.id = Rsvps.user_id
    WHERE post_id = ? AND rsvp = 2;`;

    connection.query(query, [req.query.id], function(qerr, rows, fields) {
      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }

      let users = rows;
      res.json(users);
    });
  });
});

router.get("/clubs/members", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    const query = `SELECT Users.username, Club_members.date_joined FROM Club_members
    INNER JOIN Users ON
    Users.id = Club_members.user_id
    WHERE club_id = ?;`;

    connection.query(query, [req.query.id], function(qerr, rows, fields) {
      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }

      let users = rows;
      res.json(users);
    });
  });
});
