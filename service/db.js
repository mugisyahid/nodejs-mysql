'use strict'

const config = require('../config');
const mysql = require('mysql');

function executeQuery (query, callback) {
	// Connect to mysql database
	let connection = mysql.createConnection(config.mysql);
	connection.connect();
	connection.query(query, function (err, result) {
    	if (err) throw callback(err, null);
        /*console.log('Retrieving data from the database');*/
        connection.end();
        callback(null, result);
  	});
}

module.exports = executeQuery;