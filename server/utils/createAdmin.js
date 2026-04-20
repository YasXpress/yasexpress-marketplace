import User from "../models/User.js";

const createAdmin = async () => {
  const adminExists = await User.findOne({ email: "admin@gmail.com" });

  if (!adminExists) {
    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin",
    });

    console.log("✅ Admin created");
  }
};

export default createAdmin;