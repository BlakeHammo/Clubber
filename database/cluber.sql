CREATE DATABASE cluber;
USE cluber;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    passwords VARCHAR(255),
    phone_number VARCHAR(255),
    system_administrator INT,
    profile_pic_path VARCHAR(255)
    PRIMARY KEY(user_id)
);


CREATE TABLE Clubs (
    club_id INT,
    club_name VARCHAR(255),
    club_description VARCHAR(255),
    club_color VARCHAR(255),
    PRIMARY KEY(club_id),
    FOREIGN KEY (club_id) REFERENCES Club_members(club_id) ON DELETE SET NULL
);

CREATE TABLE Club_members (
    club_id INT,
    user_id INT,
    club_manager INT,
    data_joined DATETIME,
    PRIMARY KEY(club_id, user_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id) ON DELETE SET NULL
);

CREATE TABLE Posts (
    post_id INT,
    title VARCHAR(255),
    content VARCHAR(255),
    creation_date_time VARCHAR(255),
    event_date_time VARCHAR(255),
    event_location VARCHAR(255),
    event_type VARCHAR(255),
    club_id INT
    PRIMARY KEY(post_id),
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id) ON DELETE SET NULL
);

CREATE TABLE Posts_viewed (
    post_id INT,
    user_id INT
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE TABLE Notification (
    club_id INT,
    user_id INT,
    notification_setting INT,
    PRIMARY KEY (club_id, user_id),
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE TABLE Rsvps (
    post_id INT,
    user_id INT,
    rsvp INT,
    date_responded DATETIME,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE SET NULL
);