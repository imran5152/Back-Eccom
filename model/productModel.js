import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref:"Category", required:true },
    brand: { type: String },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], 
    createdAt:  { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isFeatured: { type: Boolean, default: false },
    discount: { type: Number, default: 0 }
});

export default mongoose.model("Product", productSchema);
