var express = require('express');
const multer = require("multer");
var router = express.Router();
var path = require('path');


//Assure only images are uploaded
const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: File not an image");
  }
};

//setting storage engine
const storageEngine = multer.diskStorage ({
  destination: "/workspaces/23S1_WDC_PG001_enjoyable-turns-super/public/images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  }
});

//initializing multer
const upload = multer({
  storage: storageEngine,
  limits: { filesize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
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

router.post("/profile/upload", upload.single("image"), (req, res, next) => {
  if (req.file) {
    // Save the image path or filename in the SQL database
    let imagePath = req.file.path.replace('/workspaces/23S1_WDC_PG001_enjoyable-turns-super/public', '');

    req.pool.getConnection(function(cerr, connection) {
      if (cerr) {
        res.sendStatus(500);
        return;
      }

      // Update the user's profile in the database with the image path
      let query = 'UPDATE Users SET profile_pic_path = ? WHERE id = ?';

      connection.query(query, [imagePath, req.session.user_id], function(qerr, result) {
        connection.release();

        if (qerr) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    });
  } else {
    res.status(400).send("Please upload a valid image");
  }
});


router.get("/profile/image", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query= `SELECT profile_pic_path FROM Users WHERE id = ?`;

    connection.query(query, [req.session.user_id], function(qerr, rows, fields) {

      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }

      let user_data = rows;

      res.json(user_data);
    });
  });
});

router.get("/profile", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query = `SELECT first_name, last_name, username, email, phone_number, profile_pic_path FROM Users WHERE id = ?`;

    connection.query(query, [req.session.user_id], function(qerr, rows, fields) {

      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }

      let user_data = rows;

      res.json(user_data);
    });
  });
});


router.post("/profile/edit", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query = `UPDATE Users SET first_name = ?, last_name = ?, username = ?, email = ?, phone_number = ? WHERE id = ?`

    connection.query(query, [req.body.first_name, req.body.last_name, req.body.username,req.body.email, req.body.phone_number, req.session.user_id], function(qerr, rows, fields) {

      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
});


router.post("/clubs/join", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query = `INSERT INTO Club_members (club_id, user_id, date_joined) VALUES (?, ?, NOW())`;

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

/* Will have a block if requestor is not a club admin */

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
