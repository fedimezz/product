import mongoose from "mongoose"; // ✅


const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "cancelled"],
      required: [true, "Please provide status"],
      default: "paid",
    },
    total_amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


const OrderitemSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    produitId:{
      type: String,
      
    },
    quantity: {
      type: Number,
      default: 0,
    },
    unit_price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


export const Order = mongoose.model("Order", OrderSchema);
export const OrderItem = mongoose.model("OrderItem", OrderitemSchema);




