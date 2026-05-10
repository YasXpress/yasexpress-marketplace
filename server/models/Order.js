import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // allows guest checkout
    },

    items: [
      {
        name: String,
        price: Number,
        count: Number,
        image: String,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentReference: String,

    customerEmail: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);