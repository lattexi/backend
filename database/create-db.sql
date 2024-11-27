DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE UserLevels (
  level_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  level_name VARCHAR(50) NOT NULL
);

CREATE TABLE Comments (
  comment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Likes (
  like_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Tags (
  tag_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tag_name VARCHAR(50) NOT NULL
);

INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg'),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg'),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg');

INSERT INTO UserLevels VALUES (1, 'User');
INSERT INTO UserLevels VALUES (2, 'Admin');

INSERT INTO Comments (media_id, user_id, comment_text) 
  VALUES (1, 260, 'Nice drink!'),
         (2, 260, 'Nice photo!'),
         (3, 305, 'Nice friends!');

INSERT INTO Likes (media_id, user_id)
  VALUES (1, 260),
         (2, 260),
         (3, 305);