const db = require('../mysql/mysql');

exports.get_all_units = async () => {
    const query = 'SELECT * FROM unit_types';
    const result = await db.query(query);
    return result[0];
};