import Cart from "../models/Cart.js";

// ================= GET USER CART =================
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).lean();
  res.json(cart);
};

// ================= SAVE CART =================
export const saveCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = items;
    } else {
      cart = new Cart({ userId, items });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ================= DELETE CART =================
export const deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json("Cart deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};