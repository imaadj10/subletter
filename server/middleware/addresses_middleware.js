const db = require('../mysql/mysql');

exports.get_address = async (req) => {
    try {
        const { postalCode, streetAddress } = req.body;
        const query = `SELECT a1.city, a1.country, a1.province
                            FROM addresses_1 a1
                            WHERE a1.postal_code=?`;
    
        const queryResult = await db.query(query, [postalCode]);
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
    const main_query = 'INSERT INTO addresses_main(street_address, postal_code, country) VALUES(?, ?, ?)';

    await db.query(main_query, [req.body.street_address, req.body.postal_code, req.body.country]);
    await this.add_address_1(req);
    await db.query(pc_query, [req.body.postal_code, req.body.country, req.body.city, req.body.province]);
};

add_address_1 = async (req) => {
  const query = 'INSERT INTO addresses_1(postal_code, country, city, province) VALUES(?, ?, ?, ?)';
}