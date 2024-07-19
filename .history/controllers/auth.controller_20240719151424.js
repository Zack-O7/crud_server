// const db = require("../config/db.js");
// const bcrypt = require("bcrypt");
import {db} from "../config/db.js";
import {bcrypt} from "bcrypt";

const salt = 10;

//Post
const signup = (req, res) => {
  console.log(req.body);
  const sql =
    "INSERT INTO user_details (`firstName`, `lastName`, `email`,`password`) VALUES (?,?,?,?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) {
      console.error("Error in hashing password: ", err);
      // return res.status(500).json({ message: "Error in hashing password" });
      // Here the output will be like
      // {
      // "message": "Error in hashing password"
      // }
      return res.status(500).send("Error in hashing password");
      // Here the output will be like
      // Error in hashing password
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
        return res.status(400).send("Registration Failed");
      }
      const fullName = `${req.body.firstName} ${req.body.lastName}`;
      return res.status(200).json({
        status: "200",
        message: "Query Executed",
        data: [
          { statusMessage: "Registration Successful", fullName: fullName },
        ],
      });
    });
  });
};

//Post
const signin = (req, res) => {
  console.log(req.body);
  const sql = "SELECT * FROM user_details where email = ?";
  db.query(sql, [req.body.email], (err, result) => {
    if (err) {
      console.error("Error occurred:", err);
      // return res.status(500).json({ message: "Database query error" });
      // Here the output will be like
      // {
      // "message": "Database query error"
      // }
      return res.status(500).send("Database query error");
      // Here the output will be like
      // Database query error
    }
    if (result.length === 0) {
      return res.status(400).send("User not found");
    }

    const user = result[0];

    bcrypt.compare(
      req.body.password.toString(),
      user.password,
      (err, isMatch) => {
        if (err) {
          console.error("Error in comparing password:", err);
          return res.status(500).send("Error in comparing password");
        }
        if (!isMatch) {
          return res.status(400).send("Invalid credentials");
        }

        // const accessToken = jwt.sign(
        //   { email: req.body.email },
        //   "yourAccessTokenSecret",
        //   {
        //     expiresIn: "1d",
        //   }
        // );

        return (
          res
            .status(200)
            // .cookie("auth-token", accessToken, {
            //   maxAge: 24 * 60 * 60 * 1000,
            //   httpOnly: true,
            // })
            .json({
              // message: "Login Successful",
              // firstName: user.firstName,
              // lastName: user.lastName,
              // email: user.email

              status: "200",
              message: "Query Executed",
              data: [
                {
                  statusMessage: "Login Successful",
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                },
              ],
            })
        );
      }
    );
  });
};

//Get
const getAllUsers = (req, res) => {
  const sql = "SELECT * FROM user_details";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error Occurred:", err);
      return res.status(500).send("Something went wrong");
    }
    return res
      .status(200)
      .json({ status: "200", message: "Query Executed", data: results });
  });
};

module.exports = {
  signup,
  signin,
  getAllUsers,
};
