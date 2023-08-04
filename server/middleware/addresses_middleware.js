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
  await check_address_main(req);
  console.log('checked address');
  const main_query =
    'INSERT INTO addresses_main(street_address, postal_code, country) VALUES(?, ?, ?)';
  await db.query(main_query, [
    req.body.street_address,
    req.body.postal_code,
    req.body.country,
  ]);
  console.log('got past adding man');
  await add_address_1(req);
  console.log('added 1');
};

exports.update_address = async (req) => {
  prev_res = await get_previous_address(req);
  if (
    req.body.street_address !== prev_res.street_address ||
    req.body.postal_code !== prev_res.postal_code ||
    req.body.country !== prev_res.country
  ) {
    check_address_main(req);
    const query =
      'UPDATE addresses_main SET street_address = ?, postal_code = ?, country = ? WHERE street_address = ? AND postal_code = ? AND country = ?';
    await db.query(query, [
      req.body.street_address,
      req.body.postal_code,
      req.body.country,
      prev_res.street_address,
      prev_res.postal_code,
      prev_res.country,
    ]);
    add_address_1(req);
  }
};

add_address_1 = async (req) => {
  const exists_query =
    'SELECT EXISTS (SELECT 1 FROM addresses_1 WHERE postal_code = ? AND country = ?) AS pc_exists';
  const [exists_res] = await db.query(exists_query, [
    req.body.postal_code,
    req.body.country,
  ]);
  if (exists_res[0].pc_exists !== 1) {
    const query =
      'INSERT INTO addresses_1(postal_code, country, city, province) VALUES(?, ?, ?, ?)';
    await db.query(query, [
      req.body.postal_code,
      req.body.country,
      req.body.city,
      req.body.province,
    ]);
  }
};

check_address_main = async (req) => {
  const query =
    'SELECT EXISTS (SELECT 1 FROM addresses_main WHERE street_address = ? AND postal_code = ? AND country = ?) AS address_exists';
  const [exists] = await db.query(query, [
    req.body.street_address,
    req.body.postal_code,
    req.body.country,
  ]);
  if (exists[0].address_exists === 1) {
    throw Error('A residence already exists at this address!');
  }
};

get_previous_address = async (req) => {
  const query =
    'SELECT street_address, postal_code, country FROM residences WHERE res_name = ? AND school_name = ?';
  const [result] = await db.query(query, [
    req.params.residence,
    req.user.school,
  ]);
  return result[0];
};
