var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.post("/posts/rsvp", function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query = `INSERT INTO Rsvps (post_id, user_id, rsvp, date_responded) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE rsvp = ?, date_responded = ?`;
    const user_id = 1;
    connection.query(query, [req.body.post_id, user_id, req.body.rsvp, req.body.date_responded, req.body.rsvp, req.body.date_responded], function(qerr, rows, fields) {

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
    const user_id = 1;
    connection.query(query, [req.body.post_id, user_id], function(qerr, rows, fields) {

      connection.release();

      if (qerr) {
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
});
