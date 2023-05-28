var express = require('express');
var router = express.Router();

/* TODO: check if user is admin */
router.use('/', function(req, res, next) {
    next();
});

router.get('/clubs/:club_id/club-managers', function(req, res, next) {
    req.pool.getConnection(function(cerr, connection) {
        if (cerr) {
            res.sendStatus(500);
            return;
        }

        let query = "SELECT u.id, u.username FROM Club_members cm "
        + "INNER JOIN Users u ON (cm.user_id = u.id) "
        + "WHERE cm.club_manager AND cm.club_id = ?";

        connection.query(query, [req.params.club_id], function(qerr, rows, fields) {
            connection.release();

            if (qerr) {
                res.sendStatus(500);
                return;
            }

            res.send(JSON.stringify(rows));
        });
    });
});

router.post('/clubs/:club_id/club-managers', function(req, res, next) {
    req.pool.getConnection(function(cerr, connection) {
        if (cerr) {
            res.sendStatus(500);
            return;
        }

        let query = "INSERT INTO Club_members (club_id, user_id, club_manager, date_joined) "
        + "VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE club_manager=?";

        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-"
                        + (currentdate.getMonth()+1) + "-"
                        + currentdate.getDate() + " "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":"
                        + currentdate.getSeconds();

        connection.query(
            query,
            [
                req.params.club_id,
                req.body.user_id,
                req.body.club_manager,
                datetime,
                req.body.club_manager
            ],
            function(qerr, rows, fields) {
                connection.release();

                if (qerr) {
                    res.sendStatus(500);
                    return;
                }

                res.send(JSON.stringify(rows));
            }
        );
    });
});

router.get('/clubs', function(req, res, next) {
    req.pool.getConnection(function(cerr, connection) {
        if (cerr) {
            res.sendStatus(500);
            return;
        }

        let query = "SELECT c.id as id, c.club_name as name, c.club_color as color, c.club_description as description, "
        + "GROUP_CONCAT(u.username SEPARATOR ', ') AS managers FROM Clubs c "
        + "LEFT JOIN Club_members cm ON (c.id = cm.club_id) "
        + "LEFT JOIN Users u ON (cm.user_id = u.id) "
        + "WHERE cm.club_manager OR cm.club_manager IS NULL "
        + "GROUP BY c.id;";

        connection.query(query, [], function(qerr, rows, fields) {
            connection.release();

            if (qerr) {
                res.sendStatus(500);
                return;
            }

            res.send(JSON.stringify(rows));
        });
    });
});

router.delete('/clubs/:club_id', function(req, res, next) {
    req.pool.getConnection(function(cerr, connection) {
        if (cerr) {
            res.sendStatus(500);
            return;
        }

        let query = "DELETE FROM Clubs WHERE id = ?;";

        connection.query(query, [req.params.club_id], function(qerr, rows, fields) {
            connection.release();

            if (qerr) {
                res.sendStatus(500);
                return;
            }

            res.sendStatus(200);
        });
    });
});

router.post('/clubs', function(req, res, next) {
    req.pool.getConnection(function(cerr, connection) {
        if (cerr) {
            res.sendStatus(500);
            return;
        }

        let query = "INSERT INTO Clubs (club_name, club_description, club_color) VALUES (?, ?, ?);";

        connection.query(
            query,
            [req.body.name, req.body.description, req.body.color],
            function(qerr, rows, fields) {
                if (qerr) {
                    connection.release();
                    res.sendStatus(500);
                    return;
                }

                let query2 = "SELECT LAST_INSERT_ID();";
                connection.query(query2, [], function(qerr2, rows2, fields2) {
                    connection.release();

                    if (qerr2) {
                        res.sendStatus(500);
                        return;
                    }
                    res.send(JSON.stringify(rows2));
                });
            }
        );
    });
});

router.post('/clubs/:club_id', function(req, res, next) {
    req.pool.getConnection(function(cerr, connection) {
        if (cerr) {
            res.sendStatus(500);
            return;
        }

        let query = "UPDATE Clubs SET club_name = ?, club_description = ?, club_color = ? WHERE id = ?;";

        connection.query(
            query,
            [req.body.name, req.body.description, req.body.color, req.params.club_id],
            function(qerr, rows, fields) {

                connection.release();

                if (qerr) {
                    res.sendStatus(500);
                    return;
                }

                res.sendStatus(200);
            }
        );
    });
});

router.get('/users', function(req, res, next) {
    req.pool.getConnection(function(cerr, connection) {
        if (cerr) {
            res.sendStatus(500);
            return;
        }

        let query = "SELECT * FROM Users;";

        connection.query(query, [], function(qerr, rows, fields) {
            connection.release();

            if (qerr) {
                res.sendStatus(500);
                return;
            }

            res.send(JSON.stringify(rows));
        });
    });
});

module.exports = router;
