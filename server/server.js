import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import cloudinaryConfig from "./config/cloudinary.js";
import createAdmin from "./utils/createAdmin.js";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // ✅ ADD THIS

const app = express();

// ================= START SERVER =================
const startServer = async () => {
  try {
    // ================= DATABASE =================
    await connectDB();
    cloudinaryConfig();
    await createAdmin();

    // ================= MIDDLEWARE =================
    app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));

    // ================= API ROUTES =================
    app.use("/api/users", userRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/customers", customerRoutes);
    app.use("/api/payments", paymentRoutes);
    app.use("/api/orders", orderRoutes); // ✅ ADD THIS

    // ================= HEALTH CHECK =================
    app.get("/", (req, res) => {
      res.send("API is running successfully...");
    });

    // ================= START LISTENING =================
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Server Startup Error:", error);
    process.exit(1);
  }
};

startServer();