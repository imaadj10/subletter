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

// attachImages = (res) => {
//     res = res.map( (listing) => ({
//             ...listing,
//             image: getImage(listing.lid)
//         }));
//     return res;
// }

// getImage = (listing_id) => {
//     const imagePath = path.join(__dirname, '../images', `${listing_id}.jpg`);
//     return '58c50de7c83000232565e8ea1dd79dd5';//fs.existsSync(imagePath) ? `${listing_id}.jpg` : 'default.jpg';
// }