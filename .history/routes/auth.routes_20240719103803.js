// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/auth.controller.js");

import {express} from "express";
const router = express.Router();
import {userController} from "../controllers/auth.controller.js";

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/getAllUsers", userController.getAllUsers);

module.exports = router;