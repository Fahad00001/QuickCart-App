import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" },
  items: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],

  amount: { type: Number, required: true },

  address: { type: Object, required: true },
  status: { type: String, required: true, default: "order placed" },
  date: { type: Number, required: true },
});
const Order = mongoose.models.order || mongoose.model("order", orderSchema);
export default Order;
