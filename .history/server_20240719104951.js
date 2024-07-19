import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import userRoutes from "./routes/auth.routes.js";
// import companyRoutes from "./routes/company.routes.js";
// import employeeRoutes from "./routes/employee.routes.js";

const app = express();
const PORT = 4000;

// CORS configuration
// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: ["Content-Type"],
// };

app.use(cors());
app.use(express.json({ limit: "5mb" }));
// app.use("/storage", express.static(__dirname + "/storage"));

app.use(bodyParser.json());
// app.use('/api/users', userRoutes);
// app.use('/api/company', companyRoutes);
// app.use('/api/employee', employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
