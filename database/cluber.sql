CREATE DATABASE cluber;
USE cluber;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE Users (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    passwords VARCHAR(255),
    phone_number VARCHAR(255),
    system_administrator INT,
    profile_pic_path VARCHAR(255),
    PRIMARY KEY(id)
);

/*
    use a trigger stored procedure to execute everytime an INSERT occurs
    before any INSERT on Users table set a max_id variable to the current max id in the table
    this is so that the AUTO_INCREMENT keyword will increment from the current max id in the table
    and not the previous max id (even if it was deleted).
*/
DELIMITER //
CREATE TRIGGER SetAutoIncrement
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
    DECLARE max_id INT;
    SET max_id = (SELECT COALESCE(MAX(id), 0) FROM Users);
    SET NEW.id = max_id + 1;
END //
DELIMITER ;

CREATE TABLE Clubs (
    id INT AUTO_INCREMENT,
    club_name VARCHAR(255),
    club_description TEXT,
    club_color VARCHAR(255),
    club_tag VARCHAR(20),
    PRIMARY KEY(id)
);

CREATE TABLE Club_members (
    club_id INT,
    user_id INT,
    club_manager INT,
    date_joined VARCHAR(255),
    PRIMARY KEY(club_id, user_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES Clubs(id) ON DELETE CASCADE
);

CREATE TABLE Posts (
    id INT AUTO_INCREMENT,
    title VARCHAR(255),
    content TEXT,
    creation_date_time VARCHAR(255),
    event_date_time VARCHAR(255),
    event_location VARCHAR(255),
    tag VARCHAR(255),
    event_type VARCHAR(255),
    club_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (club_id) REFERENCES Clubs(id) ON DELETE CASCADE
);

CREATE TABLE Posts_viewed (
    post_id INT,
    user_id INT,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Notification (
    club_id INT,
    user_id INT,
    notification_setting INT,
    PRIMARY KEY (club_id, user_id),
    FOREIGN KEY (club_id) REFERENCES Clubs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Rsvps (
    post_id INT,
    user_id INT,
    rsvp INT,
    date_responded VARCHAR(255),
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS = 1;
