var mysql = require('mysql');
var databaseOptions = require('../config/config');

module.exports.connectDB=function () {
    const connection = mysql.createConnection(databaseOptions);
    connection.connect(function(err) {
        if (err) {
            return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');
    });
    return connection
}