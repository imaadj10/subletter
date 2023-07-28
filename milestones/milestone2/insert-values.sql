INSERT INTO Schools(school_name) 
VALUES
    ('University of British Columbia'),
    ('University of Calgary'),
    ('University of Alberta'),
    ('University of Waterloo'),
    ('University of Toronto')

INSERT INTO Schools(school_name) 
VALUES
    ('University of British Columbia'),
    ('University of Calgary'),
    ('University of Alberta'),
    ('University of Waterloo'),
    ('University of Toronto');

INSERT INTO Users(username, `password`, name, school_name) 
VALUES
    ('Andy', 'Andy', 'Andy', 'University of British Columbia'),
    ('Imaad', 'Imaad', 'Imaad', 'University of British Columbia'),
    ('Yu Cheng', 'Yu Cheng', 'Yu Cheng', 'University of British Columbia'),
    ('Bob', 'Bob', 'Bob', 'University of Calgary'),
    ('Jason', 'Jason', 'Jason', 'University of Waterloo'),
    ('Ronald', 'Ronald', 'Ronald', 'University of Toronto'),
    ('Karen', 'Karen', 'Karen', 'University of Alberta');


INSERT INTO Unit_Types(type)
VALUES
    ('Single Connected'),
    ('Two Bedroom'),
    ('Studio'),
    ('Four Bedroom'),
    ('Nano Suite'),
    ('Townhouse'),
    ('One Bedroom'),
    ('Studio-Small');

INSERT INTO Listings(username, description, `status`, name, price) 
VALUES
    ('Andy', 'lamp', TRUE, 'Lamp for sale!',1000),
    ('Imaad', 'drawing pad', TRUE, 'Drawing pad for sale!', 1259),
    ('Yu Cheng', 'old chair', TRUE, 'Chair for sale!', 1500),
    ('Jason', 'new chair', TRUE, 'Better chair for sale!', 1300),
    ('Ronald', 'best sublet deal', TRUE, 'Sublet for sale!', 1100),
    ('Ronald', 'best sublet 2', TRUE, 'Sublet2 for sale!', 1100),
    ('Ronald', 'best sublet 3', TRUE, 'Sublet3 for sale!', 1100),
    ('Ronald', 'best sublet 4', TRUE, 'Sublet4 for sale!', 1100),
    ('Ronald', 'best sublet 5', TRUE, 'Sublet5 for sale!', 1100),
    ('Ronald', 'best item', TRUE, 'Item for sale!', 1100);

INSERT INTO Addresses_Main(street_address, postal_code)
VALUES
	('2205 Lower Mall', 'V6T 1Z4'),
  ('2075 West Mall', 'V6T 1Z2'),
  ('5960 Student Union Blvd', 'V6T 1Z1'),
  ('6363 Agronomy Rd', 'V6T 1Z4'),
  ('6088 Walter Gage Rd', 'V6T 0B4'),
  ('1935 Lower Mall', 'V6T 1X1');

INSERT INTO Addresses_1(postal_code, city)
VALUES
	('V6T 1Z4', 'Vancouver'),
 	('V6T 1Z2', 'Vancouver'),
 	('V6T 1Z1', 'Vancouver'),
  ('V6T 0B4', 'Vancouver'),
  ('V6T 1X1', 'Vancouver');
 
INSERT INTO Addresses_2(postal_code, country)
VALUES
	('V6T 1Z4', 'Canada'),
 	('V6T 1Z2', 'Canada'),
 	('V6T 1Z1', 'Canada'),
  ('V6T 0B4', 'Canada'),
  ('V6T 1X1', 'Canada');
 
INSERT INTO Addresses_3(postal_code, province)
VALUES
	('V6T 1Z4', 'British Columbia'),
 	('V6T 1Z2', 'British Columbia'),
 	('V6T 1Z1', 'British Columbia'),
  ('V6T 0B4', 'British Columbia'),
  ('V6T 1X1', 'British Columbia');

INSERT INTO Residences(res_name, school_name, street_address, postal_code)
VALUES
	('Marine Drive Residence', 'University of British Columbia', '2205 Lower Mall', 'V6T 1Z4'),
  ('Ponderosa Commons', 'University of British Columbia', '2075 West Mall', 'V6T 1Z2'),
  ('Exchange Student Residence', 'University of British Columbia', '5960 Student Union Blvd', 'V6T 1Z1'),
  ('Orchard Commons', 'University of British Columbia', '6363 Agronomy Rd', 'V6T 1Z4'),
  ('Brock Commons', 'University of British Columbia', '6088 Walter Gage Rd', 'V6T 0B4'),
  ('Place Vanier', 'University of British Columbia', '1935 Lower Mall', 'V6T 1X1');

INSERT INTO Contains(res_name, school_name, type, price) 
VALUES
    ('Ponderosa Commons', 'University of British Columbia', 'Two Bedroom', 1300),
    ('Ponderosa Commons', 'University of British Columbia', 'Studio', 1300),
    ('Ponderosa Commons', 'University of British Columbia', 'Four Bedroom', 1050),
    ('Ponderosa Commons', 'University of British Columbia', 'Studio-Small', 1300),
    ('Exchange', 'University of British Columbia', 'Two Bedroom', 1300),
    ('Exchange', 'University of British Columbia', 'Nano Suite', 1050),
    ('Exchange', 'University of British Columbia', 'Studio', 1300),
    ('Exchange', 'University of British Columbia', 'One Bedroom', 1600);

INSERT INTO Sublets(lid, type, res_name, school_name) 
VALUES
    (20, 'Studio', 'Ponderosa Commons', 'University of British Columbia'),
    (21, 'Four Bedroom', 'Ponderosa Commons', 'University of British Columbia'),
    (22, 'Nano Suite', 'Exchange Student Residence', 'University of British Columbia'),
    (23, 'One Bedroom', 'Exchange Student Residence', 'University of British Columbia'),
    (24, 'Two Bedroom', 'Exchange Student Residence', 'University of British Columbia');

INSERT INTO Items(lid, quantity) 
VALUES
    (11, 2),
    (12, 1),
    (13, 3),
    (14, 4),
    (25, 2);

INSERT INTO Comments(username, lid, content) 
VALUES
    ('Imaad', 11, 'One of the worst lamps I have ever seen'),
    ('Andy', 12, 'I am interested!'),
    ('Ronald', 13, 'Where did this chair come from?'),
    ('Karen', 14, 'I am upset because I want this chair for free!!'),
    ('Yu Cheng', 25, 'This is the best');

INSERT INTO Written_Reviews(username, description, rating) 
VALUES
    ('Imaad', 'Marine Drive is so old', 6.5),
    ('Andy', 'I enjoyed my time in Exchange!', 10),
    ('Ronald', 'Orchard is alright. My roommate smells.', 2.5),
    ('Karen', 'I am upset I have to pay rent at Brock Commons. It should be free!', 0),
    ('Yu Cheng', 'Delivery driver could not find my building', 2.3);

INSERT INTO Received_Reviews(rid, res_name, school_name) 
VALUES
    ('80cc82c3-2cbd-11ee-bef0-806d970faeec', 'Marine Drive Residence', 'University of British Columbia'),
    ('80cc8a1e-2cbd-11ee-bef0-806d970faeec', 'Exchange Student Residence', 'University of British Columbia'),
    ('80cc8ba9-2cbd-11ee-bef0-806d970faeec', 'Orchard Commons', 'University of British Columbia'),
    ('80cc8cb1-2cbd-11ee-bef0-806d970faeec', 'Brock Commons', 'University of British Columbia'),
    ('80cc8da8-2cbd-11ee-bef0-806d970faeec', 'Marine Drive Residence', 'University of British Columbia');


INSERT INTO Messages(sid, rid, content) 
VALUES
    ('Imaad', 'Yu Cheng', 'I want McDonalds'),
    ('Andy', 'Ronald', 'Sheesh'),
    ('Karen', 'Bob', 'I have a problem with you Bob'),
    ('Bob', 'Karen', 'Well I do not care'),
    ('Jason', 'Yu Cheng', 'I am not going to clean the kitchen');

INSERT INTO Notification_Types(content, type)
VALUES
	('You have a new message!', 'Message'),
  ('Welcome to the app!', 'System'),
  ('You have a new comment!', 'Listing'),
  ('There was a login attempt to your account', 'System'),
  ('New sublet available!', 'Listing');

INSERT INTO Notifications(username, content)
VALUES
	('Imaad', 'You have a new message!'),
  ('Andy', 'Welcome to the app!'),
  ('Yu Cheng', 'You have a new comment!'),
  ('Karen', 'There was a login attempt to your account'),
  ('Ronald', 'New sublet available!');
