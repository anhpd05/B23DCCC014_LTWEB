require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const todoRoutes = require("./src/routes/index");

const app = express();

// Kết nối database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Định tuyến
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy ở cổng ${PORT}`);
});
