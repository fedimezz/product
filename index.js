import "dotenv/config"; // shorthand for require('dotenv').config()
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRoute from "./routes/user.router.js";
import ProduitRoute from "./routes/produit.router.js"; 
import orderRoute from "./routes/order.router.js"; 

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/user", UserRoute);
app.use("/produit", ProduitRoute);
app.use("/order", orderRoute); 

// Start server after DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to database!");
    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Connection failed:", error);
  });
