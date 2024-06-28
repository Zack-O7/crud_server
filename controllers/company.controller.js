// const db = require("../config/db.js");

// const addNewCompany = (req, res) => {
//   const { companyName, companyEmail, website } = req.body;
//   const defaultAvatar =
//     "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg";
//   // const logo = req?.file?.filename
//   //   ? `${req.protocol}://${req.get("host")}/storage/app/public/${
//   //       req.file.filename
//   //     }`
//   //   : defaultAvatar;

//   const logo = req?.file?.filename
//     ? `${req.protocol}://${req.get("host")}/storage/app/public/${
//         req.file.filename
//       }`
//     : null;

//   // const { companyName, companyEmail, logo, website } = req.body;

//   const sql =
//     "INSERT into company_details (companyName, companyEmail, logo, website) VALUES (?,?,?,?)";
//   db.query(sql, [companyName, companyEmail, logo, website], (err, result) => {
//     if (err) {
//       console.error("Error occurred:", err);
//       return res.status(500).send("Something went wrong");
//     }
//     return res.status(200).json({
//       status: "200",
//       message: "Query Executed",
//       data: [
//         {
//           statusMessage: "Company Created Successfully",
//           id: result.insertId,
//           companyName: companyName,
//         },
//       ],
//     });
//   });
// };

// //Get
// const getAllCompanies = (req, res) => {
//   const sql = "SELECT * FROM company_details";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error Occurred:", err);
//       return res.status(500).send("Something went wrong");
//     }
//     return res
//       .status(200)
//       .json({ status: "200", message: "Query Executed", data: results });
//   });
// };

// module.exports = {
//   addNewCompany,
//   getAllCompanies,
// };

const db = require("../config/db.js");

const addNewCompany = (req, res) => {
  const { companyName, companyEmail, website } = req.body;
  const logo = req.file ? req.file.path : null;

  if (!companyName || !companyEmail || !website || !logo) {
    return res.status(400).send({ message: "All fields are required" });
  }

  console.log("File Path: ", logo); // Debugging statement to check file path

  const query =
    "INSERT INTO company_details (companyName, companyEmail, logo, website) VALUES (?, ?, ?, ?)";

  db.query(query, [companyName, companyEmail, logo, website], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Database error" });
    }

    res.status(201).send({
      message: "Company added successfully",
      companyId: result.insertId,
    });
  });
};

const getAllCompanies = (req, res) => {
  const query = "SELECT * FROM company_details";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Database error" });
    }

    res.status(200).send(results);
  });
};

module.exports = {
  addNewCompany,
  getAllCompanies,
};
