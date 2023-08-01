const db = require('../mysql/mysql');
const fs = require('fs');
const path = require('path');

exports.retrieve_school_listings = async (username) => {
    const result = await db.query(`SELECT school_name FROM users WHERE username='${username}'`);
    const school = result[0][0].school_name;
    const joinSearchQuery = `SELECT lid, listings.name, listings.username, price, image FROM listings 
                            INNER JOIN users ON listings.username = users.username 
                            WHERE school_name = '${school}'`;
    const [res] = await db.query(joinSearchQuery);
    return res;
};

exports.add_new_listing = async (req) => {
    const query = `INSERT INTO listings (name, username, price, description, image)
                    VALUES('${req.body.name}', '${req.body.username}', ${req.body.price}, '${req.body.description}', '${req.file.filename}')`;
    await db.query(query);
}
