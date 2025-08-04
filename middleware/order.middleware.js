import Produit from "../models/produit.model.js";

export const findProduit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const produit = await Produit.findById(id);
    if (!produit) {
      return res.status(404).json({ message: "Produit not found" });
    }

    req.produit = produit;
    next();
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
