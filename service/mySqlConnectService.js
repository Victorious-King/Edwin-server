var mysql = require('mysql');
var databaseOptions = require('../config/config');

module.exports.connectDB=function () {

        const connection = mysql.createConnection(databaseOptions);
        console.log("connection error-=========>",databaseOptions)
        connection.connect(function(err) {
            if (err) {
                console.log('Connect errr to the MySQL server.', err);
                return console.error('error: ' + err.message);
            }
            console.log('Connected to the MySQL server.');
        });
        return connection
    }

