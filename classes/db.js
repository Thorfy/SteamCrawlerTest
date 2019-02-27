const mysql = require('mysql');
const config = require('../config.js');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: config.dbHost,
            user: config.dbUsername,
            password: config.dbPassWord,
            database: config.dbName
        });
    }
    
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                return resolve(rows);
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}


module.exports = Database;