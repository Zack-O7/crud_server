const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const bcrypt = require("bcrypt");

const salt = 10;

//post
router.post("/signup", (req, res) => {
  console.log(req.body);
  const sql =
    "INSERT INTO user_details (`firstName`, `lastName`, `email`,`password`) VALUES (?,?,?,?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) {
          console.error("Error in hashing password: ", err);
          return res.status(500).json({ message: "Error in hashing password" });
        }
        const values = [
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          hash,
        ];
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error("Error occurred:", err);
            return res.status(400).json({ message: "Registration Failed" });
          }
          const fullName = `${req.body.firstName} ${req.body.lastName}`;
          return res.status(200).json({
            status: "200", 
            message: "Query Executed",
            data: [{ statusMessage: "Registration successful", fullName: fullName }]
          });
        });
        
      });
    });
module.exports = router;
