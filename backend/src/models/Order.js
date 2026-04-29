import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  type: String,
  qty: Number,
  price: Number
});

const orderSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    items: [itemSchema],
    total: Number,
    status: {
      type: String,
      enum: ["RECEIVED", "PROCESSING", "READY", "DELIVERED"],
      default: "RECEIVED"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);