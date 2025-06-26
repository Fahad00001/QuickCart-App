import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" },
  name: { type: String, required: true },
  description: { type: String, required: true },

  offerPrice: { type: String, required: true },
  price: { type: String, required: true },
  //   image: [String],
  image: {
    type: [String], // ✅ Accept an array of strings
    required: true,
  },
  category: { type: String, required: true },
  date: { type: Number, required: true },
});
const Product =
  mongoose.models.product || mongoose.model("product", productSchema);
export default Product;
