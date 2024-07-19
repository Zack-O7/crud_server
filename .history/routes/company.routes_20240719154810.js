// const express = require("express");
// const router = express.Router();
// const companyController = require("../controllers/company.controller.js");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");


const upFolder = path.join(__dirname, "../storage/app/public");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(upFolder)) {
      fs.mkdirSync(upFolder, { recursive: true });
    }
    cb(null, upFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

router.post(
  "/addNewCompany",
  upload.single("logo"),
  companyController.addNewCompany
);
router.get("/getAllCompanies", companyController.getAllCompanies);
router.put("/updateCompany", companyController.updateCompany);

module.exports = router;
