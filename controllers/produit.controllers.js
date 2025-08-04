import Produit from "../models/produit.model.js";

const createProduit = async (req, res) => {
  const { name, description,  price, location } = req.body;


  if (req.user.role !== "user" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const produit = await Produit.create({
      name,
      description,
      price,
      location,
      createdP: req.user._id
    });

    res.status(201).json({
      message: "Produit created successfully",
      produit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduit = async (req, res) => {
  if (req.user.role !== "editor" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const { id } = req.params;
    const produit = await Produit.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!produit) {
      return res.status(404).json({ message: "Produit not found" });
    }

    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduit = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const { id } = req.params;
    const produit = await Produit.findByIdAndDelete(id);

    if (!produit) {
      return res.status(404).json({ message: "Produit not found" });
    }

    res.status(200).json({ message: "Produit deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProduits = async (req, res) => {
  try {
    const produits = await Produit.find({});
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export{
  createProduit,
  updateProduit,
  deleteProduit,
  getProduits,
};
