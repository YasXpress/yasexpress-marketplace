import Cart from "../models/Cart.js";
import User from "../models/User.js";

// ================= GET CUSTOMERS =================
export const getCustomers = async (req, res) => {
  try {
    const carts = await Cart.find().lean();

    // only customers with items
    const filtered = carts.filter(c => c.items && c.items.length > 0);

    const customers = await Promise.all(
      filtered.map(async (c) => {
        const user = await User.findById(c.userId).lean();

        return {
          userId: c.userId,
          name: user?.name || "Unknown",
          phone: user?.phone || "",
          items: c.items,
          total: c.items.reduce(
            (acc, item) => acc + item.price * item.count,
            0
          )
        };
      })
    );

    res.json(customers);
  } catch (err) {
    res.status(500).json(err);
  }
};