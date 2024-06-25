const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/auth.routes.js");
const companyRoutes = require("./routes/company.routes.js");

const app = express();
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use("/storage", express.static(__dirname + "/storage"));
const PORT = 4000;

app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
