import mongoose from "mongoose"; // ✅

const produitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    description: {
      type: String,
      required: [true, "Please enter desc"],
    },
    price: {
      type: Number,
      required: [true, "Please enter prix"],
      default: 0,
    },
    location: {
      type: String,
      default: "",
    },
    createdP: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

const Produit = mongoose.model("Produit", produitSchema);

export default  Produit;
