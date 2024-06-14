const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes.js");


const app = express();


app.use(express.json());
const HOST = "192.168.236.1";
const PORT = 4000;

app.use(bodyParser.json());
app.use("/api/users", userRoutes);

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT}`);
});

