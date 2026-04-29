import express from "express";
import {
  createOrder,
  getOrders,
  updateStatus,
  deleteOrder,
  dashboard
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.put("/orders/:id", updateStatus);
router.delete("/orders/:id", deleteOrder);
router.get("/dashboard", dashboard);

export default router;