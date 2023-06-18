const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    database: 'airline',
  });


  function getFlight(flightID, callback) {
    pool.query('SELECT * FROM seat ', [flightID], callback);
  }
  
  module.exports = {
    getFlight,
  };

