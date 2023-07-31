const db = require('../mysql/mysql');

exports.retrieve_school_listings = async (username) => {
    const result = await db.query(`SELECT school_name FROM users WHERE username='${username}'`);
    const school = result[0][0].school_name;
    const joinSearchQuery = `SELECT lid, description, listings.username, price FROM listings 
                            INNER JOIN users ON listings.username = users.username 
                            WHERE status = true AND school_name = '${school}'`;
    const [res] = await db.query(joinSearchQuery);
    return res
};