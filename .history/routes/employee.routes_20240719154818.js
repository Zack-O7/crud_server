// const express = require("express");
// const router = express.Router();
// const employeeController = require("../controllers/employee.controller.js");


router.post("/addNewEmployee", employeeController.addNewEmployee);
router.get("/getAllEmployees", employeeController.getAllEmployees);

module.exports = router;