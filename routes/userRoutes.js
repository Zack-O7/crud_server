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
            data: [{ statusMessage: "Registration Successful", fullName: fullName }]
          });
        });
        
      });
    });


    router.post("/signin", (req, res) => {
      console.log(req.body);
      const sql =
        "SELECT * FROM user_details where email = ?";
        db.query(sql, [req.body.email], (err, result) => {
          if (err) {
            console.error("Error occurred:", err);
            return res.status(500).json({ message: "Database query error" });
          }
          if (result.length === 0) {
            return res.status(400).json({ message: "User not found" });
          }

          const user = result[0];

          bcrypt.compare(
            req.body.password.toString(),
            user.password,
            (err, isMatch) => {
              if (err) {
                console.error("Error in comparing password:", err);
                return res
                  .status(500)
                  .json({ message: "Error in comparing password" });
              }
              if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
              }
      
              // const accessToken = jwt.sign(
              //   { email: req.body.email },
              //   "yourAccessTokenSecret",
              //   {
              //     expiresIn: "1d",
              //   }
              // );
      
              return res
                .status(200)
                // .cookie("auth-token", accessToken, {
                //   maxAge: 24 * 60 * 60 * 1000,
                //   httpOnly: true,
                // })
                .json({
                  message: "Login Successful",
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email
                });
            }
          );
        });
      });


module.exports = router;
