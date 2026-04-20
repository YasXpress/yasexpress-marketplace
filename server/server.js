import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import cloudinaryConfig from "./config/cloudinary.js";
import createAdmin from "./utils/createAdmin.js";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "*"
}));

// ================= INIT =================
const startServer = async () => {
  await connectDB();        // ✅ wait for DB
  cloudinaryConfig();
  await createAdmin();      // ✅ now safe

  // ================= MIDDLEWARE =================
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));

  // ================= ROUTES =================
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/customers", customerRoutes);

  // ================= START =================
  const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();