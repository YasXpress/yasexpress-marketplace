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
        const uploaded = await cloudinary.uploader.upload(img, {
          folder: "products",
        });
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
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json("Product not found");
    }

    // DELETE IMAGES FROM CLOUDINARY
    if (product.images && product.images.length > 0) {
      for (let img of product.images) {
        try {
          // Extract public_id from URL
          const parts = img.split("/");
          const fileName = parts[parts.length - 1]; // last part
          const publicId = fileName.split(".")[0]; // remove extension

          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log("Error deleting image:", err.message);
        }
      }
    }

    // DELETE PRODUCT FROM DB
    await Product.findByIdAndDelete(req.params.id);

    res.json("Product and images deleted");
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
        const uploaded = await cloudinary.uploader.upload(img, {
          folder: "products",
        });
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