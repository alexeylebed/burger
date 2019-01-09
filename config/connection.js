var mysql = require('mysql')

function connection(){
    if(process.env.JAWSDB_URL){
        connection = mysql.createConnection(process.env.JAWSDB_URL)
    } else {
        connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "icewinddale",
            database: "burger_db"
        });
    }
    return connection;
}


module.exports = connection()
