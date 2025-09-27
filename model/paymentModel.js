import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true 
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["COD", "Card", "UPI", "NetBanking"], default: "COD" },
  status: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
