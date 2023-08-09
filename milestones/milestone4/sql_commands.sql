-- DROP TABLES
DROP TABLE IF EXISTS `comments`, reviews, sublets, `contains`, items, listings, residences, addresses_1, addresses_main, messages, notifications, users, unit_types, schools;

-- CREATE TABLES

CREATE TABLE
    `schools` (
        `school_name` varchar(128) NOT NULL,
        PRIMARY KEY (`school_name`)
    );

CREATE TABLE
    `unit_types` (
        `type` varchar(128) NOT NULL,
        PRIMARY KEY (`type`)
    );

CREATE TABLE
    `users` (
        `username` varchar(32) NOT NULL,
        `password` binary(60) DEFAULT NULL,
        `name` varchar(32) NOT NULL,
        `school_name` varchar(128) NOT NULL,
        `description` varchar(1600) DEFAULT 'Write your description...',
        PRIMARY KEY (`username`),
        KEY `school_name` (`school_name`),
        CONSTRAINT `users_ibfk_1` FOREIGN KEY (`school_name`) REFERENCES `schools` (`school_name`) ON UPDATE CASCADE
    );

CREATE TABLE
    `notifications` (
        `nid` int NOT NULL AUTO_INCREMENT,
        `username` varchar(32) NOT NULL,
        `content` varchar(128) DEFAULT NULL,
        `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `title` varchar(64) DEFAULT 'Generic Notification',
        PRIMARY KEY (`nid`),
        -- KEY `fk_notifications_users` (`username`),
        CONSTRAINT `fk_notifications_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    `messages` (
        `sid` varchar(32) NOT NULL,
        `rid` varchar(32) NOT NULL,
        `mid` varchar(36) NOT NULL DEFAULT (uuid()),
        `time_sent` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `content` varchar(512) DEFAULT NULL,
        PRIMARY KEY (`sid`, `rid`, `mid`),
        KEY `rid` (`rid`),
        CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`rid`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    `addresses_main` (
        `street_address` varchar(128) NOT NULL,
        `postal_code` varchar(16) NOT NULL,
        `country` varchar(128) NOT NULL,
        PRIMARY KEY (
            `street_address`,
            `postal_code`,
            `country`
        )
    );

CREATE TABLE
    `addresses_1` (
        `postal_code` varchar(16) NOT NULL,
        `country` varchar(128) NOT NULL,
        `city` varchar(128) DEFAULT NULL,
        `province` varchar(128) DEFAULT NULL,
        PRIMARY KEY (`postal_code`, `country`)
    );

CREATE TABLE
    `residences` (
        `res_name` varchar(128) NOT NULL,
        `school_name` varchar(128) NOT NULL,
        `street_address` varchar(128) NOT NULL,
        `postal_code` varchar(16) NOT NULL,
        `country` varchar(128) DEFAULT NULL,
        `image` varchar(64) DEFAULT 'default.jpg',
        PRIMARY KEY (`res_name`, `school_name`),
        UNIQUE KEY `address_constraint` (
            `street_address`,
            `postal_code`,
            `country`
        ),
        KEY `school_name` (`school_name`),
        CONSTRAINT `fk_residences_addresses` FOREIGN KEY (
            `street_address`,
            `postal_code`,
            `country`
        ) REFERENCES `addresses_main` (
            `street_address`,
            `postal_code`,
            `country`
        ) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `residences_ibfk_1` FOREIGN KEY (`school_name`) REFERENCES `schools` (`school_name`) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    `reviews` (
        `rid` varchar(36) NOT NULL DEFAULT (uuid()),
        `username` varchar(32) NOT NULL,
        `description` varchar(1024) DEFAULT NULL,
        `res_name` varchar(128) NOT NULL,
        `school_name` varchar(128) NOT NULL,
        `rating` double DEFAULT NULL,
        PRIMARY KEY (`rid`),
        KEY `username` (`username`),
        KEY `res_name` (`res_name`, `school_name`),
        CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`res_name`, `school_name`) REFERENCES `residences` (`res_name`, `school_name`) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    `contains` (
        `res_name` varchar(128) NOT NULL,
        `school_name` varchar(128) NOT NULL,
        `type` varchar(128) NOT NULL,
        `price` double DEFAULT NULL,
        PRIMARY KEY (
            `res_name`,
            `school_name`,
            `type`
        ),
        KEY `type` (`type`),
        CONSTRAINT `contains_ibfk_1` FOREIGN KEY (`res_name`, `school_name`) REFERENCES `residences` (`res_name`, `school_name`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `contains_ibfk_2` FOREIGN KEY (`type`) REFERENCES `unit_types` (`type`) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    `listings` (
        `lid` int NOT NULL AUTO_INCREMENT,
        `username` varchar(32) NOT NULL,
        `description` varchar(1024) DEFAULT NULL,
        `name` varchar(128) DEFAULT NULL,
        `price` double DEFAULT NULL,
        `image` varchar(64) DEFAULT 'default.jpg',
        PRIMARY KEY (`lid`),
        KEY `username` (`username`),
        CONSTRAINT `listings_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    `items` (
        `lid` int NOT NULL,
        `quantity` int DEFAULT NULL,
        PRIMARY KEY (`lid`),
        CONSTRAINT `items_ibfk_1` FOREIGN KEY (`lid`) REFERENCES `listings` (`lid`) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    `comments` (
        `cid` int NOT NULL AUTO_INCREMENT,
        `username` varchar(32) NOT NULL,
        `lid` int NOT NULL,
        `content` varchar(1024) DEFAULT NULL,
        PRIMARY KEY (`cid`),
        KEY `username` (`username`),
        KEY `lid` (`lid`),
        CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`lid`) REFERENCES `listings` (`lid`) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    `sublets` (
        `lid` int NOT NULL,
        `type` varchar(128) NOT NULL,
        `res_name` varchar(128) NOT NULL,
        `school_name` varchar(128) NOT NULL,
        PRIMARY KEY (`lid`),
        KEY `res_name` (
            `res_name`,
            `school_name`,
            `type`
        ),
        CONSTRAINT `sublets_ibfk_1` FOREIGN KEY (`lid`) REFERENCES `listings` (`lid`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `sublets_ibfk_2` FOREIGN KEY (
            `res_name`,
            `school_name`,
            `type`
        ) REFERENCES `contains` (
            `res_name`,
            `school_name`,
            `type`
        ) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- INSERTIONS

INSERT INTO
    schools(school_name)
VALUES (
        'University of British Columbia'
    ), ('University of Calgary'), (
        'University of Illinois Urbana-Champaign'
    ), ('University of Toronto'), ('University of Waterloo');

INSERT INTO unit_types(`type`)
VALUES ('Four Bedroom'), ('One Bedroom'), ('Shared Room'), ('Single Connected'), ('Six Bedroom'), ('Studio'), ('Townhouse'), ('Two Bedroom');

INSERT INTO
    users(
        username,
        `password`,
        `name`,
        school_name
    )
VALUES (
        'user1',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User',
        'University of British Columbia'
    ), (
        'user2',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User2',
        'University of British Columbia'
    ), (
        'user3',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User3',
        'University of British Columbia'
    ), (
        'user4',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User4',
        'University of British Columbia'
    ), (
        'donald',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Donald Duck',
        'University of British Columbia'
    ), (
        'ham',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Ham Enjoyer',
        'University of British Columbia'
    ), (
        'saladman112',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'salad',
        'University of British Columbia'
    ), (
        'user5',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User5',
        'University of Illinois Urbana-Champaign'
    ), (
        'user6',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User6',
        'University of Illinois Urbana-Champaign'
    ), (
        'user7',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User7',
        'University of Illinois Urbana-Champaign'
    ), (
        'user8',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User8',
        'University of Illinois Urbana-Champaign'
    ), (
        'mcdonalds',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Mr. Big Mac',
        'University of Illinois Urbana-Champaign'
    ), (
        'hotdog',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Average Hot Dog Enjoyer',
        'University of Illinois Urbana-Champaign'
    ), (
        'user9',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User9',
        'University of Waterloo'
    ), (
        'user10',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User10',
        'University of Waterloo'
    ), (
        'user11',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User11',
        'University of Waterloo'
    ), (
        'user12',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User12',
        'University of Waterloo'
    ), (
        'hellokitty1123',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Michael Jordan',
        'University of Waterloo'
    ), (
        'user13',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User13',
        'University of Calgary'
    ), (
        'user14',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User14',
        'University of Calgary'
    ), (
        'user15',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User15',
        'University of Calgary'
    ), (
        'user16',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User16',
        'University of Calgary'
    ), (
        'user17',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User17',
        'University of Toronto'
    ), (
        'user18',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User18',
        'University of Toronto'
    ), (
        'user19',
        '$2b$10$NV1FJW.fOELT15EDP6oZpOzS8k1B9SI.rSHyQOJMoMDdWgBdC3Zc.',
        'Test User19',
        'University of Toronto'
    );

INSERT INTO
    notifications(username, content, title)
VALUES (
        'user1',
        'Welcome to the app!',
        'Welcome'
    ), (
        'user2',
        'Welcome to the app!',
        'Welcome'
    ), (
        'user3',
        'Welcome to the app!',
        'Welcome'
    ), (
        'user4',
        'Welcome to the app!',
        'Welcome'
    ), (
        'donald',
        'Welcome to the app!',
        'Welcome'
    );

INSERT INTO
    messages(sid, rid, content)
VALUES ('user1', 'user2', 'Hey there'), ('user2', 'user1', 'Hi!'), (
        'user1',
        'user2',
        'How are you?'
    ), ('user2', 'user1', 'Not bad'), ('user1', 'user2', 'Nice');

INSERT INTO
    addresses_main(
        street_address,
        postal_code,
        country
    )
VALUES (
        '2075 West Mall',
        'V6T 1Z2',
        'Canada'
    ), ('2205 East St', '60404', 'USA'), (
        '2205 Lower Mall',
        'V6T 0B4',
        'Canada'
    ), (
        '2205 Lower Mall',
        'V6T 1Z4',
        'Canada'
    ), ('2205 West St', '60404', 'USA'), (
        '5960 Student Union Blvd',
        'V6T 1Z1',
        'Canada'
    ), (
        '6088 Walter Gage Rd',
        'V6T 0B4',
        'Canada'
    ), (
        '6363 Agronomy Rd',
        'V6T 1Z4',
        'Canada'
    ), ('1102 Hamilton St', '60404', 'USA'), ('1935 Lower Mall', 'V6T 1X1', 'Canada');

INSERT INTO
    addresses_1(
        postal_code,
        country,
        city,
        province
    )
VALUES (
        '60404',
        'USA',
        'Champaign',
        'Illinois'
    ), (
        'V6T 0B4',
        'Canada',
        'Vancouver',
        'British Columbia'
    ), (
        'V6T 1X1',
        'Canada',
        'Vancouver',
        'British Columbia'
    ), (
        'V6T 1Z1',
        'Canada',
        'Vancouver',
        'British Columbia'
    ), (
        'V6T 1Z2',
        'Canada',
        'Vancouver',
        'British Columbia'
    ), (
        'V6T 1Z4',
        'Canada',
        'Vancouver',
        'British Columbia'
    );

INSERT INTO
    residences(
        res_name,
        school_name,
        street_address,
        postal_code,
        country,
        `image`
    )
VALUES (
        'Brock Commons',
        'University of British Columbia',
        '6088 Walter Gage Rd',
        'V6T 0B4',
        'Canada',
        '8201570ad68acc193e66bb228a76784a'
    ), (
        'Exchange Student Residence',
        'University of British Columbia',
        '5960 Student Union Blvd',
        'V6T 1Z1',
        'Canada',
        'a1a712e4b62114cac2d39e8ca1afbabe'
    ), (
        'Hopkins Hall',
        'University of Illinois Urbana-Champaign',
        '2205 East St',
        '60404',
        'USA',
        '20418c567d3ff6da149b47d9ceb4ef04'
    ), (
        'Marine Drive Residence',
        'University of British Columbia',
        '2205 Lower Mall',
        'V6T 1Z4',
        'Canada',
        'd856ac5e9ebca90d7a76ba8c84eef6ac'
    ), (
        'Nugent Hall',
        'University of Illinois Urbana-Champaign',
        '2205 West St',
        '60404',
        'USA',
        'd6111efe09138d7e2403f985a83a12fe'
    ), (
        'Orchard Commons',
        'University of British Columbia',
        '6363 Agronomy Rd',
        'V6T 1Z4',
        'Canada',
        '11f19ce6aadf49dd5febde447598a950'
    ), (
        'Place Vanier',
        'University of British Columbia',
        '1935 Lower Mall',
        'V6T 1X1',
        'Canada',
        'cb14c9eb4dc4734a6796d86b7dfa7a79'
    ), (
        'Ponderosa Commons',
        'University of British Columbia',
        '2075 West Mall',
        'V6T 1Z2',
        'Canada',
        'd48a6dca827c7aef1e2d96d33158b550'
    ), (
        'Totem Park',
        'University of British Columbia',
        '2205 Lower Mall',
        'V6T 0B4',
        'Canada',
        '861dd3eec4ff7ea525d41f85915c0839'
    ), (
        'Wassaja Hall',
        'University of Illinois Urbana-Champaign',
        '1102 Hamilton St',
        '60404',
        'USA',
        'ef8596bb0ced03dc8942f2c2944ee682'
    );

INSERT INTO
    listings(
        username,
        description,
        name,
        price,
        image
    )
VALUES (
        'user1',
        'this is a wonderful sublet at ponderosa!',
        'Ponderosa Summer Sublet',
        900,
        'fc73b5cfabe8136b8a82ef1142179e40'
    ), (
        'user2',
        'I only used this thing once tbh',
        'PS5 FOR SALE!',
        500,
        '61416080b38c05d6ce3e5bd504763a90'
    ), (
        'user3',
        'the view is epic, what more do u need me to tell u??',
        'Marine Drive Sublet',
        1200,
        '0b97918402aef73c5d91f4e8e15967fa'
    ), (
        'user4',
        'i have an old car and i what it gone, woe is me',
        'Toyota Camry for sale',
        13000,
        'a27214e1f6ea9980cc83280fbb38ffe3'
    ), (
        'donald',
        'Hello everyone! We have a whole lot of used books for sale, $15 or less! Please swing by the library to buy some books, all proceeds go towards the library!',
        'Dozens of used books for sale!',
        15,
        '31f4003c788615c1b2ee2cf52c348ff2'
    ), (
        'ham',
        'HI IM LEAVING SOON NEED TO SUBLET MY PLACE NOW PLEASE QUICK',
        'Place vanier sublet, NEED TO CLOSE QUICK!',
        700,
        '2703677fe01b7514dd7429185e2f2764'
    ), (
        'user8',
        'need to give away mah chair fr',
        'old chair for sale (herman miller)',
        350,
        'd70a7fd5314c6741fd3425aed6038e91'
    );

INSERT INTO
    items(lid, quantity)
VALUES (2, 1), (4, 1), (5, 100), (7, 1);

INSERT INTO
    `contains`(
        res_name,
        school_name,
        `type`,
        price
    )
VALUES (
        'Brock Commons',
        'University of British Columbia',
        'Shared Room',
        1000
    ), (
        'Brock Commons',
        'University of British Columbia',
        'Single Connected',
        1000
    ), (
        'Brock Commons',
        'University of British Columbia',
        'Six Bedroom',
        1000
    ), (
        'Brock Commons',
        'University of British Columbia',
        'Studio',
        1200
    ), (
        'Brock Commons',
        'University of British Columbia',
        'Townhouse',
        1000
    ), (
        'Brock Commons',
        'University of British Columbia',
        'Four Bedroom',
        1000
    ), (
        'Brock Commons',
        'University of British Columbia',
        'Two Bedroom',
        1000
    ), (
        'Brock Commons',
        'University of British Columbia',
        'One Bedroom',
        1000
    ), (
        'Marine Drive Residence',
        'University of British Columbia',
        'Studio',
        1200
    ), (
        'Place Vanier',
        'University of British Columbia',
        'Studio',
        1200
    ), (
        'Ponderosa Commons',
        'University of British Columbia',
        'Four Bedroom',
        1200
    ), (
        'Exchange Student Residence',
        'University of British Columbia',
        'Four Bedroom',
        1000
    ), (
        'Orchard Commons',
        'University of British Columbia',
        'Shared Room',
        650
    ), (
        'Hopkins Hall',
        'University of Illinois Urbana-Champaign',
        'One Bedroom',
        200
    ), (
        'Hopkins Hall',
        'University of Illinois Urbana-Champaign',
        'Single Connected',
        196
    ), (
        'Nugent Hall',
        'University of Illinois Urbana-Champaign',
        'Shared Room',
        1200
    ), (
        'Wassaja Hall',
        'University of Illinois Urbana-Champaign',
        'Shared Room',
        1200
    ), (
        'Totem Park',
        'University of British Columbia',
        'Studio',
        900
    );

INSERT INTO
    sublets(
        lid,
        `type`,
        res_name,
        school_name
    )
VALUES (
        1,
        'Four Bedroom',
        'Ponderosa Commons',
        'University of British Columbia'
    ), (
        3,
        'Studio',
        'Marine Drive Residence',
        'University of British Columbia'
    ), (
        6,
        'Studio',
        'Place Vanier',
        'University of British Columbia'
    );

INSERT INTO
    reviews(
        username,
        `description`,
        res_name,
        school_name,
        rating
    )
VALUES (
        'user1',
        'best residence ever',
        'Ponderosa Commons',
        'University of British Columbia',
        9.8
    ), (
        'user2',
        'haha ponderosa so funny',
        'Ponderosa Commons',
        'University of British Columbia',
        9.4
    ), (
        'user3',
        'I like living here',
        'Ponderosa Commons',
        'University of British Columbia',
        8.9
    ), (
        'user6',
        'I hate this residence >:(',
        'Hopkins Hall',
        'University of Illinois Urbana-Champaign',
        3.4
    ), (
        'user7',
        'Its meh',
        'Hopkins Hall',
        'University of Illinois Urbana-Champaign',
        6.5
    ), (
        'user8',
        'Its decent',
        'Hopkins Hall',
        'University of Illinois Urbana-Champaign',
        7
    ), (
        'donald',
        'My dog wouldn’t even live here',
        'Brock Commons',
        'University of British Columbia',
        0.5
    ), (
        'ham',
        'I can see my house from here',
        'Brock Commons',
        'University of British Columbia',
        8.6
    ), (
        'saladman112',
        'Great place everyone else is lying',
        'Brock Commons',
        'University of British Columbia',
        10
    );

INSERT INTO
    comments(username, lid, `content`)
VALUES (
        'user2',
        1,
        'Great post check mai msg'
    ), (
        'user3',
        2,
        'I love xbox great stuff'
    ), (
        'donald',
        3,
        'Meh I lived here'
    ), (
        'user1',
        4,
        'I hate drinking and driving'
    ), (
        'donald',
        5,
        'Its all still available'
    ), ('user2', 6, 'I eat ham'), (
        'user7',
        7,
        'Great chair I love Chicago'
    );