import express from "express";
import dotenv from "dotenv";
// Local files
import authRoutes from "./routes/auth.route.js";
import connectDb from "./db/connect.js";

const PORT = process.env.PORT;
// global middlewares
dotenv.config();
const app = express();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on the ${process.env.PORT}😎`);
});
connectDb();
