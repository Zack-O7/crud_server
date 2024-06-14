const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",  
    database: "crud"
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