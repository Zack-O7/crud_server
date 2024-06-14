const mysql = require("mysql");

const db = mysql.createConnection({
    host: "bfczuviifz0hxqg7bc3g-mysql.services.clever-cloud.com",
    user: "ukhovr7owcm5sbxo",
    password: "zxbzstVuw2QvH2gf9E0C",  
    database: "bfczuviifz0hxqg7bc3g",
    port: 3306
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