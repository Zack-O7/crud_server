const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/authRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;

app.use(bodyParser.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

