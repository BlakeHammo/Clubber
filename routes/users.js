var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'ike88@ethereal.email',
      pass: 'enDbPF1FrRWbXFAFmT'
  },
  tls: {
    rejectUnauthorized: false
  }
});

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
          if (rows.length === 1 && rows[0].club_manager === 1) {
            res.send("Both");
          } else if(rows.length === 1) {
            res.send("Member");
          } else {
            res.send("Neither");
          }
        });
      });
    }
  } else {
    res.send("Public");
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

router.post("/clubs/join", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query = "";

    if (req.body.join) {
      query = `INSERT INTO Club_members (club_id, user_id, date_joined) VALUES (?, ?, NOW())`;
    } else {
      query = `DELETE FROM Club_members WHERE user_id = ${req.session.user_id} AND club_id = ?`;
    }

    connection.query(query, [req.body.club_id, req.session.user_id], function(qerr, rows, fields) {

      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
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

router.get("/notifications", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    const query = `SELECT Clubs.id, Clubs.club_name, Notification.notification_setting FROM Clubs
    INNER JOIN Club_members ON Club_members.club_id = Clubs.id
    LEFT JOIN Notification ON Notification.club_id = Clubs.id AND Notification.user_id = Club_members.user_id WHERE Club_members.user_id = ?;`;

    connection.query(query, [req.session.user_id], function(qerr, rows, fields) {

      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }

      res.send(rows);
    });
  });
});

router.post("/notifications/update", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query = "";

    if (Number(req.query.notification_setting) === 0) {
      query = `DELETE FROM Notification WHERE user_id = ${req.session.user_id} AND club_id = ${req.query.club_id};`;
    } else if (Number(req.query.club_id) !== -1) {
      query = `INSERT INTO Notification (user_id, club_id, notification_setting) VALUES(${req.session.user_id}, ${req.query.club_id}, ${req.query.notification_setting}) ON DUPLICATE KEY UPDATE notification_setting = ${req.query.notification_setting}`;
    } else {
      query = `DELETE FROM Notification WHERE user_id = ${req.session.user_id};`;
    }

    connection.query(query, function(qerr, rows, fields) {

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

router.post("/notifications/send", function(req, res, next) {
  let recipients = [];
  let query = ``;
  if (req.body.tag === 'post') {
    query = `SELECT Users.email FROM Users
    INNER JOIN Club_members ON Club_members.user_id = Users.id
    INNER JOIN Notification ON Notification.user_id = Club_members.user_id
    INNER JOIN Clubs ON Clubs.id = Club_members.club_id
    WHERE Clubs.id = ? AND Notification.notification_setting IN (1, 3);`;
  } else {
    query = `SELECT Users.email FROM Users
    INNER JOIN Club_members ON Club_members.user_id = Users.id
    INNER JOIN Notification ON Notification.user_id = Club_members.user_id
    INNER JOIN Clubs ON Clubs.id = Club_members.club_id
    WHERE Clubs.id = ? AND Notification.notification_setting IN (2, 3);`;
  }

  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    connection.query(query, [req.body.club_id], function(qerr, rows, fields) {

      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }

      recipients = rows.map((a) => a.email);

      if (req.body.tag === 'post') {
        console.log(req.body.content);
        let mailContent = {
          from: 'ike88@ethereal.email',
          to: recipients,
          subject: req.body.title,
          html: req.body.content
        };
        transporter.sendMail(mailContent, function (err, info) {
        if(err)
          console.log(err);
        else
          console.log(info);
        });
      } else {
        let mailContent = {
          from: 'ike88@ethereal.email',
          to: recipients,
          subject: req.body.title,
          html: req.body.content
        };
        transporter.sendMail(mailContent, function (err, info) {
        if(err)
          console.log(err);
        else
          console.log(info);
        });
      }
    });
  });
  res.send();
});

router.post("/posts/create", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query = `INSERT INTO Posts (title, content, event_date_time, event_location, tag, event_type, club_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [req.body.title, req.body.content, req.body.eventDate, req.body.location, req.body.tag, req.body.type, req.body.clubId], function(qerr, rows, fields) {

      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
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
