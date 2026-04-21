import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

// ================= GET PRODUCTS =================
export const getProducts = async (req, res) => {
  const products = await Product.find().lean();

  const fixedProducts = products.map((p) => ({
    ...p,
    images: p.images || (p.image ? [p.image] : []),
  }));

  res.json(fixedProducts);
};

// ================= ADD PRODUCT =================
export const addProduct = async (req, res) => {
  try {
    const { name, price, category, images, description } = req.body;

    let imageUrls = [];

    for (let img of images) {
      if (img.startsWith("data:image")) {
        const uploaded = await cloudinary.uploader.upload(img);
        imageUrls.push(uploaded.secure_url);
      } else {
        imageUrls.push(img);
      }
    }

    const product = await Product.create({
      name,
      price,
      category,
      images: imageUrls,
      description,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};




 // ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
  try {
    const { name, price, category, images, description } = req.body;

    let imageUrls = [];

    for (let img of images) {
      if (img.startsWith("data:image")) {
        const uploaded = await cloudinary.uploader.upload(img);
        imageUrls.push(uploaded.secure_url);
      } else {
        imageUrls.push(img);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        category,
        images: imageUrls,
        description,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json("Product not found");
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};