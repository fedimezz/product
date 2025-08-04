import { OrderItem, Order } from "../models/order.model.js";

const createOrderItem = async (req, res, next) => {
  const { quantity } = req.body;
  try {
    const item = await OrderItem.create({
      produitId: req.produit._id,
      quantity,
      unit_price:req.produit.price,
    });

    if (!item) {
      return res.status(400).json({ message: "Order item not created" });
    }

    req.orderItem = item;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const calculQuantitePrix = async (quantity, unit_price) => {
  return quantity * unit_price;
};

const createOrder = async (req, res) => {
  const { status } = req.body;
  try {
    const item = req.orderItem;

    if (!item) {
      return res.status(400).json({ message: "Missing order item data" });
    }

    const total = await calculQuantitePrix(item.quantity, item.unit_price);

    const order = await Order.create({
      userId: req.user._id,
      status,
      total_amount: total,
    });

    if (!order) {
      return res.status(400).json({ message: "Order not created" });
    }
    const name=req.produit.name

    res.status(201).json({
      message: "Order created successfully",
      name,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { createOrderItem, createOrder };
