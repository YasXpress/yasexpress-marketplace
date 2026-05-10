// routes/orderRoutes.js

import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ================= GET CUSTOMER ORDERS =================
router.get("/customer/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const orders = await Order.find({
      customerEmail: email,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

export default router;