import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoute from "./Routes/user.js";
import productRoute from "./Routes/product.js";
import adminRoute from "./Routes/admin.js";
import issueRoute from "./Routes/issue.js";
import orderRoute from "./Routes/order.js";

dotenv.config();

connectDB().then();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Server running successfully");
});

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/ecommerce/admin", adminRoute);
app.use("/api/orders", orderRoute);
app.use("/api/issues", issueRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5500;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
