const db = require("../config/db.js");

const addNewEmployee = (req, res) => {
  try {
    const { firstName, lastName, company, email, phone } = req.body;
    if (!firstName || !lastName || !company || !email || !phone) {
      return res.status(400).send({ message: "Please fill all the fields." });
    }
    const sql =
      "INSERT into employee_details (firstName, lastName, company, email, phone) VALUES (?,?,?,?,?)";
    db.query(
      sql,
      [firstName, lastName, company, email, phone],
      (err, result) => {
        if (err) {
          console.error("Database Error :", err);

          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).send({ message: "Employee already exist" });
          } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(409).send({ message: "Company not found." });
          }

          return res
            .status(500)
            .send({
              message: "Something went wrong while executing the query.",
            });
        }

        const employeeName = `${req.body.firstName} ${req.body.lastName}`;

        return res.status(200).json({
          status: "200",
          message: "Query executed successfully",
          data: [
            {
              statusMessage: "Employee added successfully.",
              employeeId: result.insertId,
              employeeName: employeeName,
            },
          ],
        });
      }
    );
  } catch (err) {
    console.error("Database Error :", err);
    return res
      .status(500)
      .send({ message: "Something went wrong while executing the query." });
  }
};

//getAllEmployees
const getAllEmployees = (req, res) => {
  const sql = "SELECT * FROM employee_details";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database Error :", err);
      return res
        .status(500)
        .send({ message: "Something went wrong while executing the query." });
    }
    return res.status(200).json({
      status: "200",
      message: "Query executed successfully.",
      data: result,
    });
  });
};

module.exports = {
  addNewEmployee,
  getAllEmployees,
};
