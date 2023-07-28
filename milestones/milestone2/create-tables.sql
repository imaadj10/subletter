CREATE TABLE Notification_Types (
  content VARCHAR(128),
  type VARCHAR(64),
  PRIMARY KEY (content)
  );

CREATE TABLE Notifications (
  nid INT AUTO_INCREMENT,
  username VARCHAR(32) NOT NULL,
  content VARCHAR(128),
  PRIMARY KEY (nid)
  );

CREATE TABLE Schools (
  school_name VARCHAR(128) PRIMARY KEY
  );

CREATE TABLE Users (
  username VARCHAR(32) PRIMARY KEY,
  `password` VARCHAR(32) NOT NULL,
  name VARCHAR(32) NOT NULL,
  school_name VARCHAR(128) NOT NULL,
  FOREIGN KEY (school_name) REFERENCES Schools(school_name)
  	ON UPDATE CASCADE
  );

CREATE TABLE Messages (
  sid VARCHAR(32),
  rid VARCHAR(32),
  mid VARCHAR(36) DEFAULT (UUID()),
  time_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  content VARCHAR(512),
  FOREIGN KEY (sid) references Users(username)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE,
  FOREIGN KEY (rid) references Users(username)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE,
  PRIMARY KEY(sid, rid, mid)
  );

CREATE TABLE Units (
  type VARCHAR(128) PRIMARY KEY
  );

CREATE TABLE `Contains` (
  res_name VARCHAR(128),
  school_name VARCHAR(128),
  type VARCHAR(128),
  price DOUBLE,
  FOREIGN KEY (res_name, school_name) REFERENCES Residences(res_name,school_name)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE,
  FOREIGN KEY (type) REFERENCES Unit_Types(type)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE,
  PRIMARY KEY(res_name, school_name, type)
  );

CREATE TABLE Listings (
  lid INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(32) NOT NULL,
  description VARCHAR(1024),
  `status` BOOL,
  name VARCHAR(128),
  price DOUBLE,
  FOREIGN KEY(username) REFERENCES Users(username)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE
  );

CREATE TABLE Sublets (
  lid INT PRIMARY KEY,
  type VARCHAR(128) NOT NULL,
  res_name VARCHAR(128) NOT NULL,
  school_name VARCHAR(128) NOT NULL,
  FOREIGN KEY (lid) REFERENCES listings(lid)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE,
  FOREIGN KEY (res_name, school_name, type) REFERENCES `Contains`(res_name, school_name, type)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE
  );

CREATE TABLE Items (
  lid INT PRIMARY KEY,
  quantity INT,
  FOREIGN KEY (lid) REFERENCES listings(lid)
  );

CREATE TABLE Comments (
  cid INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(32) NOT NULL,
  lid INT NOT NULL,
  content VARCHAR(1024),
  FOREIGN KEY (username) REFERENCES Users(username)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE,
  FOREIGN KEY (lid) REFERENCES Listings(lid)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE
  );

CREATE TABLE Written_Reviews (
  rid VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
  username VARCHAR(32) NOT NULL,
  description VARCHAR(1024),
  rating DOUBLE,
  FOREIGN KEY (username) references Users(username)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE
  );

CREATE TABLE Received_Reviews (
  rid VARCHAR(36) DEFAULT (UUID()),
  res_name VARCHAR(128),
  school_name VARCHAR(128),
  FOREIGN KEY (rid) REFERENCES Written_Reviews(rid)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE,
  FOREIGN KEY (res_name, school_name) REFERENCES Residences(res_name, school_name)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE,
  PRIMARY KEY (rid, res_name, school_name)
  );

CREATE TABLE Residences (
  res_name VARCHAR(128),
  school_name VARCHAR(128),
  street_address VARCHAR(128) UNIQUE NOT NULL,
  postal_code VARCHAR(16) NOT NULL,
  FOREIGN KEY (school_name) REFERENCES Schools(school_name)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE,
  FOREIGN KEY (street_address, postal_code) REFERENCES Addresses_Main(street_address, postal_code)
  	ON UPDATE CASCADE
  	ON DELETE CASCADE,
  UNIQUE KEY address_constraint (street_address, postal_code);
  PRIMARY KEY (res_name, school_name)
  );

CREATE TABLE Addresses_Main (
  street_address VARCHAR(128),
  postal_code VARCHAR(16),
  PRIMARY KEY (street_address, postal_code)
  );

CREATE TABLE Addresses_1 (
  postal_code VARCHAR(16),
  city VARCHAR(128),
  PRIMARY KEY (postal_code)
  );
 
CREATE TABLE Addresses_2 (
  postal_code VARCHAR(16),
  country VARCHAR(128),
  PRIMARY KEY (postal_code)
  );
 
 CREATE TABLE Addresses_3 (
  postal_code VARCHAR(16),
  province VARCHAR(128),
  PRIMARY KEY (postal_code)
  );
