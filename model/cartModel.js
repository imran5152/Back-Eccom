import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true,
    unique: true
  },
  products: [
    {
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true
      },
      quantity: { 
        type: Number, 
        default: 1,
        required: true 
      }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
