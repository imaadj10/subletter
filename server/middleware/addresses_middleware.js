const db = require('../mysql/mysql');

exports.get_address = async (req) => {
    try {
        const { postalCode, streetAddress } = req.body;
        const query = `SELECT a1.city, a2.country, a3.province
                            FROM addresses_1 a1, addresses_2 a2, addresses_3 a3
                            WHERE a1.postal_code=a2.postal_code AND
                            a2.postal_code = a3.postal_code AND 
                            a1.postal_code="${postalCode}"`;
    
        const queryResult = await db.query(query);
        const info = queryResult[0][0];
        const address = {
          postalCode,
          streetAddress,
          city: info.city,
          province: info.province,
          country: info.country,
        };
        return address;
      } catch (e) {
        throw e;
      }
};

exports.add_new_address = async (req) => {
    req
};