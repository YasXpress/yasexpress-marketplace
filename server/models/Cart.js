import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
      count: Number,
    },
  ],
});

export default mongoose.model("Cart", CartSchema);