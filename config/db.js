const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// DB Connection
db.connect((error)=>{
    if(error) {
        console.log("DB Connection Error");
        return;
    }
    else {
        console.log("DB Connected");
    }
});

module.exports = db;