const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DATABASE_IP_ADDRESS,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

module.exports = db;