const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  //Localhost
  //   host: "localhost",
  //   user: "root",
  //   password: "root",
  //   database: "bfczuviifz0hxqg7bc3g",
  //   port: 3306,

  //Method1
  host: "bfcc3g-mysql.services.clever-cloud.com",
  user: "uk5sbxo",
  password: "zxbgf9E0C",
  database: "bfcc3g",
  port: 3306,

  //Method2
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // port: process.env.DB_PORT
});

// DB Connection
db.connect((error) => {
  if (error) {
    console.log("DB Connection Error");
    return;
  } else {
    console.log("DB Connected");
  }
});

// db.query(`SELECT * from user_details`, (err, result, fields) => {
//     if (err) {
//         console.log(err);
//     }
//     return console.log(result);
// });

module.exports = db;
