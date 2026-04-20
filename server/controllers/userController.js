import User from "../models/User.js";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });

    if (exists) return res.status(400).json("User already exists");

    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) return res.status(400).json("Invalid login");

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};