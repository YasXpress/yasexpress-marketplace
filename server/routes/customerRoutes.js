import express from "express";
import { getCustomers } from "../controllers/customerController.js";

const router = express.Router();

// ================= CUSTOMER ROUTES =================
router.get("/", getCustomers);

export default router;