import express from "express";
import {
  getCart,
  saveCart,
  deleteCart,
} from "../controllers/cartController.js";

const router = express.Router();

// ================= CART ROUTES =================
router.get("/:userId", getCart);
router.post("/", saveCart);
router.delete("/:userId", deleteCart);

export default router;