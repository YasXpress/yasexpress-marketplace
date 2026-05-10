import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import Order from "../models/Order.js";

dotenv.config();

const router = express.Router();

// ================= PAYSTACK INSTANCE =================
const paystack = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

// ================= INITIALIZE PAYMENT =================
router.post("/initialize", async (req, res) => {
  try {
    const {
      email,
      amount,
      cart,
      customerName,
      customerPhone,
    } = req.body;

    const response = await paystack.post(
      "/transaction/initialize",
      {
        email,
        amount: Math.round(amount * 100), // Kobo
        callback_url:
          "http://localhost:5173/checkout",
        metadata: {
          cart,
          customerName,
          customerPhone,
        },
      }
    );

    res.json({
      success: true,
      authorization_url:
        response.data.data.authorization_url,
      reference:
        response.data.data.reference,
    });
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to initialize payment.",
    });
  }
});

// ================= VERIFY PAYMENT =================
router.get("/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;

    // Prevent duplicate orders
    const existingOrder =
      await Order.findOne({
        paymentReference: reference,
      });

    if (existingOrder) {
      return res.json({
        success: true,
        order: existingOrder,
      });
    }

    const response = await paystack.get(
      `/transaction/verify/${reference}`
    );

    const payment =
      response.data.data;

    if (
      payment.status !== "success"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment was not successful.",
      });
    }

    const order =
      await Order.create({
        items:
          payment.metadata?.cart ||
          [],
        totalAmount:
          payment.amount / 100,
        paymentMethod:
          "paystack",
        paymentStatus:
          "paid",
        paymentReference:
          payment.reference,
        customerEmail:
          payment.customer
            ?.email || "",
        customerName:
          payment.metadata
            ?.customerName ||
          "",
        customerPhone:
          payment.metadata
            ?.customerPhone ||
          "",
      });

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        "Payment verification failed.",
    });
  }
});

export default router;