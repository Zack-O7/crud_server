const db = require("../config/db.js");

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

//   if (!companyName || !companyEmail || !website || !logo) {
//     return res
//       .status(400)
//       .send({ message: "All fields are required, including the logo." });
//   }

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

const addNewCompany = (req, res) => {
  try {
    const { companyName, companyEmail, website } = req.body;
    const defaultAvatar =
      "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg";
    // const logo = req?.file?.filename
    //   ? `${req.protocol}://${req.get("host")}/storage/app/public/${
    //       req.file.filename
    //     }`
    //   : defaultAvatar;
    const logo = req?.file?.filename
      ? `${req.protocol}://${req.get("host")}/storage/app/public/${
          req.file.filename
        }`
      : null;

    // Validate required fields
    if (!companyName || !companyEmail || !website || !logo) {
      return res
        .status(400)
        .send({ message: "All fields are required, including the logo." });
    }

    const sql =
      "INSERT into company_details (companyName, companyEmail, logo, website) VALUES (?,?,?,?)";

    db.query(sql, [companyName, companyEmail, logo, website], (err, result) => {
      if (err) {
        console.error("Database query error:", err);

        // Differentiate between different types of database errors
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).send({ message: "Company already exists." });
        }

        return res
          .status(500)
          .send({ message: "Something went wrong while executing the query." });
      }

      return res.status(200).json({
        status: "200",
        message: "Query Executed",
        data: [
          {
            statusMessage: "Company Created Successfully",
            id: result.insertId,
            companyName: companyName,
          },
        ],
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).send({ message: "An unexpected error occurred." });
  }
};

//Update
const updateCompany = (req, res) => {
  try {
    const { id, companyName, companyEmail, website } = req.body;
    const defaultAvatar =
    "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg";
  const logo = req?.file?.filename
    ? `${req.protocol}://${req.get("host")}/storage/app/public/${
        req.file.filename
      }`
    : null;

        // Validate required fields
        if (!id || !companyName || !companyEmail || !website) {
          return res.status(400).send({ message: "All fields are required." });
        }

        // const sql = "UPDATE company_details SET companyName = ?, companyEmail = ?, website = ? WHERE id = ?";
        // const params = [companyName, companyEmail, website, id];

        let sql = "UPDATE company_details SET companyName = ?, companyEmail = ?, website = ?";
        const params = [companyName, companyEmail, website];

        if (logo) {
          sql += ", logo = ?";
          params.push(logo);
        }
    
        sql += " WHERE id = ?";
        params.push(id);

        // Execute query
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error("Database query error:", err);

        // Differentiate between different types of database errors
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).send({ message: "Company already exists." });
        }

        return res
          .status(500)
          .send({ message: "Something went wrong while executing the query." });
      }

      // if (result.affectedRows === 0) {
      //   return res.status(404).send({ message: "Company not found." });
      // }

      console.log(id);
      console.log(companyName);
      console.log(companyEmail);
      console.log(website);
      console.log(logo);

      return res.status(200).json({
        status: "200",
        message: "Query Executed",
        data: [
          {
            statusMessage: "Company Updated Successfully",
            id: id,
            companyName: companyName,
          },
        ],
      });
    });
  }
  catch(err) {
     console.error("Unexpected error:", err);
    return res.status(500).send({ message: "An unexpected error occurred." });
  }
}

//Get
const getAllCompanies = (req, res) => {
  const sql = "SELECT * FROM company_details";
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
  addNewCompany,
  getAllCompanies,
  updateCompany,
};
