const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/auth.routes.js");
const companyRoutes = require("./routes/company.routes.js");

const app = express();
const PORT = 4000;

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins for testing, change this to specific domains in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "5mb" }));
app.use("/storage", express.static(__dirname + "/storage"));

app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
