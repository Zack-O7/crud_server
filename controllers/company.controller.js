const db = require("../config/db.js");

const addNewCompany = (req, res) => {
  const { companyName, companyEmail, website } = req.body;
  const defaultAvatar =
    "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg";
  // const logo = req?.file?.filename
  //   ? `${req.protocol}://${req.get("host")}/storage/app/public/${
  //       req.file.filename
  //     }`
  //   : defaultAvatar;

  const logo = `${req.protocol}://${req.get("host")}/storage/app/public/${
    req.file.filename
  }`;

  // const { companyName, companyEmail, logo, website } = req.body;

  const sql =
    "INSERT into company_details (companyName, companyEmail, logo, website) VALUES (?,?,?,?)";
  db.query(sql, [companyName, companyEmail, logo, website], (err, result) => {
    if (err) {
      console.error("Error occurred:", err);
      return res.status(500).send("Something went wrong");
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
};

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
};
